import {expect, afterEach} from 'vitest';
import {cleanup} from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// extends from react-testing-library
expect.extend(matchers);

afterEach(() => {
  cleanup();
});
