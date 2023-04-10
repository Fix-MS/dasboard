/**
 * @jest-environment jsdom
 */
import {overwriteElementPrototypes} from './dom';

// TODO: battle test also against mulitple nodes
describe('test prototypes', () => {
  it('should test addClass', () => {
    document.documentElement.innerHTML = '<div id="test"></div>';
    const element = document.querySelector('#test');
    expect(element.getAttribute('class')).toEqual(null);
    expect(typeof element.addClass).toEqual('undefined');
    overwriteElementPrototypes();
    expect(typeof element.addClass).toEqual('function');
    element.addClass('foobar');
    expect(element.getAttribute('class')).toEqual('foobar');
    element.removeClass('foobar');
    expect(element.getAttribute('class')).toEqual('');
    element.toggleClass('foor', true);
    expect(element.getAttribute('class')).toEqual('foor');
    element.toggleClass('foor', false);
    expect(element.getAttribute('class')).toEqual('');
    element.addClass('blubber');
    element.changeClass('blubber', 'newClass');
    expect(element.getAttribute('class')).toEqual('newClass');
    expect(true).toEqual(true);
  });
});
