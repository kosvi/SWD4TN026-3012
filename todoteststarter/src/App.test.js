import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('add todo', () => {
  const { container, getByText, getByPlaceholderText } = render(<App />);

  // use variable to avoid mispelling in one test
  // mispelling could lead to false pass in a test
  const todoString = 'Return exercises';
  const todoString2 = 'Return nothing';

  const desc = getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: todoString } });
  const date = getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '22.11.2020' } });
  const button = getByText('Add');
  fireEvent.click(button);

  expect(container).toHaveTextContent(todoString);
  // it shouldn't contain whatever content you may test it with!
  expect(container).not.toHaveTextContent(todoString2);

  const clearButton = getByText('Clear');
  fireEvent.click(clearButton);

  expect(container).not.toHaveTextContent(todoString);
});
