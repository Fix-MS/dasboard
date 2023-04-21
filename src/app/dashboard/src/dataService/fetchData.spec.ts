import {fetchData} from './fetchData';
// import fetch from 'node-fetch';
import 'whatwg-fetch';
// import {enableFetchMocks} from 'jest-fetch-mock';
// enableFetchMocks();

describe('test fetchData', () => {
  beforeEach(() => {
    // Mock the fetch function before each test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // Clear the fetch mock after each test
    (global.fetch as jest.Mock).mockClear();
    delete global.fetch;
  });
  it('should call parseData function with response data as object', (done) => {
    // jest.mock('global');
    const mockResponse = new Response(JSON.stringify({data: 'some data'}), {
      status: 200,
      headers: {'content-type': 'application/json; charset=UTF-8'},
    });
    const parseData = jest.fn((data) => {
      try {
        expect(typeof data).toEqual(typeof {'data': 'some data'});
        expect(data).toEqual({'data': 'some data'});
        done();
      } catch (error) {
        done(error);
      }
    });
    const url = 'https://example.com/data';
    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    fetchData(url, parseData);
    expect(global.fetch).toHaveBeenCalledWith(url);

    (global.fetch as jest.Mock).mockRestore();
  });
  it('should call parseData function with response data as string', (done) => {
    const mockResponse = new Response(JSON.stringify({data: 'some data'}), {
      status: 200,
      headers: {'content-type': 'text/plain;charset=UTF-8'},
    });
    const parseData = jest.fn((data) => {
      try {
        expect(typeof data).toEqual(typeof {'data': 'some data'});
        expect(data).toEqual({'data': 'some data'});
        done();
      } catch (error) {
        done(error);
      }
    });
    const url = 'https://example.com/data';
    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    fetchData(url, parseData);
    expect(global.fetch).toHaveBeenCalledWith(url);

    (global.fetch as jest.Mock).mockRestore();
  });
  it('should call parseData function with invalid response', (done) => {
    // jest.mock('global');
    const mockResponse = new Response('{"data"', {
      status: 200,
      headers: {'content-type': 'text/plain;charset=UTF-8'},
    });
    const spy = jest.spyOn(console, 'warn');
    const parseData = jest.fn((data) => {
      try {
        expect(typeof data).toEqual('undefined');
        expect(data).toEqual(undefined);
        expect(spy).toHaveBeenCalled();
        const result = 'SyntaxError: Unexpected end of JSON input';
        expect(spy.mock.calls[0][0].toString()).toEqual(result);
        done();
      } catch (error) {
        done(error);
      }
    });
    const url = 'https://example.com/data';
    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    fetchData(url, parseData);
    expect(global.fetch).toHaveBeenCalledWith(url);

    (global.fetch as jest.Mock).mockRestore();
  });
});
