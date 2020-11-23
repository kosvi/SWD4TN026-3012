import React from 'react';
import TodoTable from './TodoTable.js';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('renders todotable', () => {
  const row = [{desc: 'Return exercises', date: '22.11.2020'}];
  const todotable = render(<TodoTable todos={row} />);
  expect(todotable.container).toHaveTextContent('Return exercises');
});
