import { convertRankToColor } from '../Util';
import { Avatar, useTheme } from 'react-native-paper';
import React from 'react';

export default function RankIcon({ rank, ...rest }) {
  const {
    colors: { inversePrimary },
  } = useTheme();

  const convertedNumber = Number(rank);
  if (isNaN(convertedNumber)) {
    return (
      <Avatar.Text
        {...rest}
        labelStyle={{ fontSize: 20 }}
        label={rank}
        color={inversePrimary}
      />
    );
  }

  if (convertedNumber < 4) {
    return (
      <Avatar.Icon {...rest} color={convertRankToColor(rank)} icon="medal" />
    );
  }

  return <Avatar.Text {...rest} label={rank} color={inversePrimary} />;
}
