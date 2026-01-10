import React from 'react';
import { render, screen } from '@testing-library/react-native';

import events from '../../data/events.json';
import CupRankingItem from '../EventItem';
import EventItem from '../EventItem';

jest.mock('expo-font');

describe('EventItem', () => {
  it('should render correctly', () => {
    const event = events[0].DayGroups[0].SportEventItems;
    console.log(event);

    render(<EventItem item={event} />);
    screen.debug();
    const text = screen.getByText(event.LocationName);
  });
});
