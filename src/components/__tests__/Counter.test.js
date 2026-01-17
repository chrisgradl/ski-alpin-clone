import { render, screen, fireEvent } from '@testing-library/react-native';
import React from 'react';

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
    screen.debug();
    const plusButton = screen.getByText('+');
    const minusButton = screen.getByText('-');
    fireEvent.press(plusButton);
    screen.debug();
    let textValue = screen.getByText('1');
    expect(textValue).toBeDefined();

    fireEvent.press(minusButton);
    screen.debug();
    textValue = screen.getByText('0');
    expect(textValue).toBeDefined();
  });

  it('should display info message if counter value is lower than 0', () => {
    render(<Counter />);
    const minusButton = screen.getByText('-');
    fireEvent.press(minusButton);
    const infoText = screen.getByText('Value is lower than 0');
    expect(infoText).toBeDefined();
  });

  it('should render correctly', () => {
    render(<Counter />);
    const jsonTree = screen.toJSON();
    expect(jsonTree).toMatchSnapshot();
  });
});
