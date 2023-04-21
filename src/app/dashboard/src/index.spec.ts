import {fake} from './index';
import {fireEvent} from '@testing-library/dom';

import 'whatwg-fetch';
describe('input after DOM content is loaded', () => {
  beforeEach(() => {
    const html = `
    <textarea id="free-textarea" rows="3"></textarea>
    <div class="form-control" id="divId"></div>
    <div id="badges">
      </div>
    <section class="checklist">
      <ul>
        <li issue-check="type">
        <svg-icon name="success-icon" size="24"></svg-icon>
        <span>Vorfall-Typ</span>
      </li>
      <li issue-check="location">
        <svg-icon name="success-icon" size="24"></svg-icon>
        <span>Ort</span>
      </li>
      </ul>
    </section>`;
    // Mock the fetch function before each test
    global.fetch = jest.fn();
    const mockResponseStreets = new Response(
        JSON.stringify({streets: ['Beispielstrasse']},
        ), {
          status: 200,
          headers: {'content-type': 'application/json; charset=UTF-8'},
        });
    const mockResponseServices = new Response(JSON.stringify([
      {
        'group': 'Ampel, Verkehrszeichen',
        'service_name': 'Ampel komplett ausgefallen',
        'service_code': 73,
      },
    ]), {
      status: 200,
      headers: {'content-type': 'text/plain;charset=UTF-8'},
      // headers: {'content-type': 'application/json; charset=UTF-8'},
    });
    // const url = 'https://example.com/data';
    // jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
    jest.spyOn(global, 'fetch').mockImplementation((url) => {
      switch (url) {
        case 'geo/streets.json':
          return Promise.resolve(mockResponseStreets);
        case 'geo/services.json':
          return Promise.resolve(mockResponseServices);
      }
    },
    );

    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    // Clear the fetch mock after each test
    (global.fetch as jest.Mock).mockClear();
    delete global.fetch;
    jest.resetModules();
    document.documentElement.innerHTML = '';
  });
  it('should allow user input', () => {
    const event = document.createEvent('Event');
    event.initEvent('DOMContentLoaded', true, true);
    document.dispatchEvent(event);
    fake();
    // ensure the input field exists
    const domTextarea = document.getElementById('free-textarea');
    const textarea = domTextarea as HTMLTextAreaElement;
    const div = document.getElementById('divId');
    expect(textarea).toBeDefined();
    fireEvent.input(textarea, {target: {value: 'XXX'}});

    expect(textarea.value).toBe('XXX');
    expect(div.innerHTML).toBe('XXX');
  });
  it('should highlight matched user input for streets', () => {
    const event = document.createEvent('Event');
    event.initEvent('DOMContentLoaded', true, true);
    document.dispatchEvent(event);
    fake();
    // ensure the input field exists
    const domTextarea = document.getElementById('free-textarea');
    const textarea = domTextarea as HTMLTextAreaElement;
    const div = document.getElementById('divId');
    expect(textarea).toBeDefined();
    fireEvent.input(textarea, {target: {value: 'In der Beispielstrasse'}});

    expect(textarea.value).toBe('In der Beispielstrasse');
    const street = 'Beispielstrasse';
    const hightlighted = `<span class=\"highlight--location\">${street}</span>`;
    const result = `In der ${hightlighted}`;
    expect(div.innerHTML).toBe(result);
  });
  it('should highlight matched user input for services', () => {
    const event = document.createEvent('Event');
    event.initEvent('DOMContentLoaded', true, true);
    document.dispatchEvent(event);
    fake();
    // ensure the input field exists
    const domTextarea = document.getElementById('free-textarea');
    const textarea = domTextarea as HTMLTextAreaElement;
    const div = document.getElementById('divId');
    expect(textarea).toBeDefined();
    const value = 'Es ist die Ampel komplett ausgefallen';
    fireEvent.input(textarea, {target: {value: value}});

    expect(textarea.value).toBe(value);
    const street = 'Ampel komplett ausgefallen';
    const hightlighted = `<span class=\"highlight--type\">${street}</span>`;
    const result = `Es ist die ${hightlighted}`;
    expect(div.innerHTML).toBe(result);
  });
});
