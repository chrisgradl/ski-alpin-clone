import { render, screen, fireEvent } from '@testing-library/react-native';
import React from 'react';
import '@testing-library/react-native/extend-expect';

import { Counter } from '../Counter';

describe('Counter', () => {
  it('should have 0 as initial value and use prop as initial value if passed', () => {
    render(<Counter />);
    const counterText = screen.getByText('0');
    expect(counterText).toBeDefined();

    render(<Counter initialValue={5} />);
    const counterWithInitialValue = screen.getByText('5');
    expect(counterWithInitialValue).toBeDefined();
  });

  it('should count correctly', () => {
    render(<Counter />);
    const plusButton = screen.getByText('+');
    const minusButton = screen.getByText('-');
    fireEvent.press(plusButton);
    let textValue = screen.getByText('1');
    expect(textValue).toBeDefined();

    fireEvent.press(minusButton);
    textValue = screen.getByText('0');
    expect(textValue).toBeDefined();
  });

  it('should count correctly', () => {
    render(<Counter />);
    const minusButton = screen.getByText('-');
    fireEvent.press(minusButton);
    const infoText = screen.getByText('Value is lower than 0');
    expect(infoText).toBeDefined();
  });
});
