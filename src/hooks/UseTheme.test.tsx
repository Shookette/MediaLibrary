import {act, renderHook} from '../test-utils';
import useTheme from './UseTheme';

describe('UseTheme custom hook', () => {
  it('should have light as theme by default', () => {
    const {result} = renderHook(() => useTheme());
    const bodyTheme = document.body.getAttribute('data-theme');

    expect(bodyTheme).toEqual('dark');
    expect(result.current.theme).toBe('dark');
  });

  it('should have light theme when calling invertTheme function with default value', () => {
    const {result} = renderHook(() => useTheme());

    act(() => {
      result.current.invertTheme();
    });

    expect(result.current.theme).toBe('light');
  });

  it('should have dark as theme when prefers-color-scheme is set as dark', () => {
    // (prefers-color-scheme: dark) to return true
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    renderHook(() => useTheme());
    const bodyTheme = document.body.getAttribute('data-theme');

    expect(bodyTheme).toEqual('dark');
  });
});
