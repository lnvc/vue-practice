import { test, expect } from 'vitest';

import { testSum } from '../utils/functions';

test('test testSum', () => {
  expect(testSum(1, 2)).toBe(3);
});
