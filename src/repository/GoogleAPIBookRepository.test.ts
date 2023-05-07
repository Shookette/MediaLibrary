import {formatMediaFromGoogleBookAPIResponseAndUserId} from './GoogleAPIBookRepository';

describe('GoogleAPIBookRepository test', () => {
  it('should return empty media when formatting GoogleAPIResponse without data and userID', () => {
    const result = formatMediaFromGoogleBookAPIResponseAndUserId();
    expect(result.title).toEqual('');
    expect(result.userUID).toEqual('');
  });
});
