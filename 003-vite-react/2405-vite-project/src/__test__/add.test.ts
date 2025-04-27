import { add } from './add';
import { describe, expect, test } from 'vitest';

describe('test add ', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
});
