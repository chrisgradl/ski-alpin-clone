import React from 'react';
import '@testing-library/react-native/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react-native';

import rankings from '../../data/cup-rankings.json';
import CupRankingItem from '../CupRankingItem';

describe('CupRankingItem', () => {
  it('should call fn on button press', () => {
    const mockFn = jest.fn();
    const cup = rankings[0];
    render(<CupRankingItem onPress={mockFn} cup={cup} />);
    const button = screen.getByText(cup.CupRankingName);
    fireEvent.press(button);
    expect(mockFn).toBeCalled();
  });
});
