export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function formatDateWithCurrentDay(date) {
  return new Date(date).toLocaleDateString('de-AT', {
    dateStyle: 'full',
  });
}

export function convertRankToColor(rank) {
  switch (rank) {
    case '1':
      return '#FFD700'; // Gold color code
    case '2':
      return '#C0C0C0'; // Silver color code
    case '3':
      return '#CD7F32'; // Bronze color code
    default:
      return null;
  }
}

export const formatTime = (timeString) => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('de-AT', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export function getIndexOfNextEvent(events) {
  if (!events) {
    return 0;
  }
  const now = new Date();
  let nearestIndex = -1;
  let smallestDifference = Infinity;
  events.forEach((event, index) => {
    const eventDate = new Date(event.EventDate);
    const difference = eventDate - now;
    if (difference > 0 && difference < smallestDifference) {
      smallestDifference = difference;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}
