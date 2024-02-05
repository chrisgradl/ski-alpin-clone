import React from 'react';
import { Divider, List, Subheading } from 'react-native-paper';

import RankIcon from './RankIcon';
import { formatDate } from '../Util';

function ResultsGroup({ item }) {
  return (
    <List.Section>
      <List.Subheader>{item.GroupName}</List.Subheader>
      {item.PersonResults.map((result) => (
        <List.Item
          left={(props) => <RankIcon {...props} rank={result.Rank} />}
          title={result.LocationName}
          description={formatDate(result.EventDate)}
        />
      ))}
      <Divider />
    </List.Section>
  );
}

export default function WcPlacing({ data }) {
  console.log(data);
  return (
    <>
      <Subheading style={{ paddingHorizontal: 12 }}>
        LETZTE DREI WELTCUP PLATZIERUNGEN
      </Subheading>
      {data.PersonResultGroups.map((item, index) => (
        <ResultsGroup item={item} key={item.GroupName + index} />
      ))}
    </>
  );
}
