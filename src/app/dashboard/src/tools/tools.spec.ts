import {asyncForEach} from './tools';

describe('asyncForEach', () => {
  test('calls the callback function for each element in array', async () => {
    const mockCallback = jest.fn();
    const testArray = ['a', 'b', 'c'];
    await asyncForEach(testArray, mockCallback);
    expect(mockCallback).toHaveBeenCalledTimes(testArray.length);
    expect(mockCallback).toHaveBeenCalledWith('a', 0);
    expect(mockCallback).toHaveBeenCalledWith('b', 1);
    expect(mockCallback).toHaveBeenCalledWith('c', 2);
  });

  test('does not call the callback function for an empty array', async () => {
    const mockCallback = jest.fn();
    const emptyArray = [];
    await asyncForEach(emptyArray, mockCallback);
    expect(mockCallback).not.toHaveBeenCalled();
  });
});
