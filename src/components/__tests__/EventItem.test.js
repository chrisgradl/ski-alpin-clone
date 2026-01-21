import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';

import events from '../../data/events.json';
import EventItem from '../EventItem';

describe('EventItem', () => {
  it('should render correctly', () => {
    const event = events[0].DayGroups[0].SportEventItems[0];

    render(
        <EventItem item={event} />
    );
    const text = screen.getByText(event.LocationName);
  });
});
