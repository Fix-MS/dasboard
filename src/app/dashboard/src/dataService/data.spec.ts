import {loadStreets, loadServices, getStreets, getServices} from './data';
import 'whatwg-fetch';

describe('search', () => {
  beforeEach(() => {
    // Mock the fetch function before each test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockRestore();
    // Clear the fetch mock after each test
    (global.fetch as jest.Mock).mockClear();
    delete global.fetch;
  });
  describe('loadStreets', () => {
    const sampleData = {streets: ['Main St', 'Second Ave']};
    beforeEach(() => {
      const mockResponse = new Response(JSON.stringify(sampleData), {
        status: 200,
        headers: {'content-type': 'application/json; charset=UTF-8'},
      });
      jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
      const url = 'https://api.com/streets.json';
      loadStreets(url);
    });

    afterEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it('should load and index streets from the given URL', () => {
      expect(getStreets()).toEqual(['main st', 'second ave']);
    });
  });

  describe('loadServices', () => {
    beforeEach(() => {
      const sampleData = [
        {service_name: 'Service A'}, {service_name: 'Service B'}];
      const mockResponse = new Response(JSON.stringify(sampleData), {
        status: 200,
        headers: {'content-type': 'application/json; charset=UTF-8'},
      });
      jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
      const url = 'https://example.com/services.json';
      loadServices(url);
    });

    afterEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it('should load and index services from the given URL', () => {
      expect(getServices()).toEqual(['service a', 'service b']);
    });
  });
});
