const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://afeeds.orf.at/alpine-api/api';

const ENDPOINTS = {
  stories: `${BASE_URL}/sporton?osType=1`,
  broadcasts: `${BASE_URL}/broadcasts?view=next&top=100`,
  events: `${BASE_URL}/sportevents?view=grouped`,
  cupRankingsMen: `${BASE_URL}/cuprankings?genderid=1`,
  cupRankingsWomen: `${BASE_URL}/cuprankings?genderid=2`,
};

async function fetchFromAPI(url) {
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Failed to fetch ${url}: ${res.status}`);
}

// Strip stories to essential info
function cleanStories(stories) {
  if (!stories?.Items) return [];
  return stories.Items.map(item => ({
    title: item.Title,
    teaser: item.Teaser,
    keyword: item.Keyword,
  })).filter(s => s.title || s.teaser);
}

// Strip broadcasts to essential info
function cleanBroadcasts(broadcasts) {
  if (!Array.isArray(broadcasts)) return [];
  return broadcasts.map(b => ({
    title: b.Title,
    subtitle: b.Subtitle,
    start: b.Start,
    end: b.End,
    channel: b.Channel,
  })).filter(b => b.title);
}

// Strip events to essential info
function cleanEvents(events) {
  if (!Array.isArray(events)) return [];
  return events.map(group => ({
    date: group.Date,
    events: group.Events?.map(e => ({
      name: e.Name,
      discipline: e.Discipline,
      gender: e.GenderId === 1 ? 'Men' : e.GenderId === 2 ? 'Women' : 'Mixed',
      location: e.Location,
      country: e.Country,
      status: e.Status,
    })) || [],
  })).filter(g => g.events.length > 0);
}

// Strip rankings to essential info
function cleanRankings(rankingsData) {
  if (!Array.isArray(rankingsData)) return [];
  return rankingsData
    .filter(cat => cat.rankings?.PersonRankings)
    .map(cat => ({
      name: cat.CupRankingName,
      description: cat.rankings.RankingDescription,
      standings: cat.rankings.PersonRankings?.slice(0, 15).map(p => ({
        rank: p.Rank,
        name: `${p.FirstName} ${p.LastName}`,
        nation: p.NationCC3,
        points: p.Value,
      })) || [],
    }));
}

// Strip athlete data to essential info
function cleanAthlete(athlete) {
  if (!athlete) return null;
  return {
    name: `${athlete.FirstName} ${athlete.LastName}`,
    nation: athlete.NationCC3,
    birthdate: athlete.Birthdate,
    discipline: athlete.Discipline,
    worldCupWins: athlete.WorldCupWins,
    worldCupPodiums: athlete.WorldCupPodiums,
    seasonResults: athlete.SeasonResults?.slice(0, 5).map(r => ({
      event: r.EventName,
      discipline: r.Discipline,
      rank: r.Rank,
      date: r.Date,
    })),
  };
}

async function fetchCupRankingDetails(rankingCategories) {
  const details = [];
  // Only fetch person rankings, skip nation cups
  const personCups = rankingCategories.filter(c => c.CupRankingType === 'PersonCup');

  for (const category of personCups) {
    if (category.CupRankingId) {
      try {
        console.log(`  Fetching: ${category.CupRankingName}...`);
        const data = await fetchFromAPI(`${BASE_URL}/cuprankings/${category.CupRankingId}`);
        details.push({ ...category, rankings: data });
      } catch (err) {
        console.warn(`  Failed: ${category.CupRankingId}`);
      }
    }
  }
  return details;
}

async function fetchAthleteDetails(athleteIds) {
  const athletes = [];
  for (const id of athleteIds) {
    try {
      const data = await fetchFromAPI(`${BASE_URL}/person/${id}`);
      athletes.push(data);
      console.log(`  Fetched athlete ${id}`);
    } catch (err) {
      console.warn(`  Failed athlete ${id}`);
    }
  }
  return athletes;
}

function extractAthleteIds(rankingsData, limit = 20) {
  const ids = new Set();
  if (Array.isArray(rankingsData)) {
    for (const category of rankingsData) {
      const personRankings = category.rankings?.PersonRankings;
      if (Array.isArray(personRankings)) {
        for (const entry of personRankings.slice(0, 10)) {
          if (entry.PersonId) ids.add(entry.PersonId);
        }
      }
    }
  }
  return Array.from(ids).slice(0, limit);
}

async function aggregateAllData() {
  console.log('Starting API data aggregation...\n');

  const rawData = {};

  // Fetch all endpoints
  for (const [name, url] of Object.entries(ENDPOINTS)) {
    console.log(`Fetching ${name}...`);
    try {
      rawData[name] = await fetchFromAPI(url);
      console.log(`  Success`);
    } catch (err) {
      console.error(`  Error: ${err.message}`);
    }
  }

  // Fetch detailed rankings
  console.log('\nFetching men\'s rankings...');
  const menRankings = await fetchCupRankingDetails(rawData.cupRankingsMen || []);

  console.log('\nFetching women\'s rankings...');
  const womenRankings = await fetchCupRankingDetails(rawData.cupRankingsWomen || []);

  // Extract and fetch top athletes
  console.log('\nExtracting athlete IDs...');
  const menIds = extractAthleteIds(menRankings);
  const womenIds = extractAthleteIds(womenRankings);
  const allAthleteIds = [...new Set([...menIds, ...womenIds])];
  console.log(`Found ${allAthleteIds.length} athletes`);

  console.log('\nFetching athlete details...');
  const athletes = await fetchAthleteDetails(allAthleteIds);

  // Build clean output
  return {
    exportedAt: new Date().toISOString(),
    stories: cleanStories(rawData.stories),
    broadcasts: cleanBroadcasts(rawData.broadcasts),
    events: cleanEvents(rawData.events),
    mensRankings: cleanRankings(menRankings),
    womensRankings: cleanRankings(womenRankings),
    athletes: athletes.map(cleanAthlete).filter(Boolean),
  };
}

async function main() {
  try {
    const data = await aggregateAllData();

    const outputDir = path.join(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = path.join(outputDir, `chatbase-data-${timestamp}.txt`);

    const jsonContent = JSON.stringify(data);
    fs.writeFileSync(outputPath, jsonContent);

    console.log(`\nData aggregation complete!`);
    console.log(`Output saved to: ${outputPath}`);
    console.log(`File size: ${(Buffer.byteLength(jsonContent) / 1024).toFixed(2)} KB`);

  } catch (err) {
    console.error('Aggregation failed:', err);
    process.exit(1);
  }
}

main();
