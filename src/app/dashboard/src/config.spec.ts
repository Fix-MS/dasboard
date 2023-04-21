import {CONFIG} from './config';

describe('test highlight()', () => {
  it('should have an API flag', () => {
    expect(CONFIG.useAPI).toEqual(false);
  });
});
