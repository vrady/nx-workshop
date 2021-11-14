import { formatRating } from './store-util-formatters';

describe('formatRating', () => {
  it('should work', () => {
    expect(formatRating(10)).toEqual('100 / 10');
  });
});
