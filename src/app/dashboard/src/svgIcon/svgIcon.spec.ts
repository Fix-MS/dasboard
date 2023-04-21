import {SvgIcon} from './svgIcon';

describe('test svg-icon', () => {
  const htmlDefault = document.documentElement.innerHTML;
  afterEach(() => {
    document.documentElement.innerHTML = htmlDefault; // reset
    jest.resetModules();
  });
  it('it should load the specified icon', () => {
    const html = `<svg-icon name="success-icon" size="24"></svg-icon>`;
    const iconBefore = document.querySelector(`svg-icon`);
    document.documentElement.innerHTML = html;
    expect(iconBefore).toBeNull(); // before not exists
    customElements.define('svg-icon', SvgIcon);
    const iconAfter = document.querySelector(`svg-icon`);
    expect(iconAfter).toBeDefined();
    expect(iconAfter.innerHTML.length > 0).toEqual(true);
    const testPart = 'polyline class="success-tick"'; // correct icon
    expect(iconAfter.innerHTML.indexOf(testPart) !== -1).toEqual(true);

    // test changing of icon type
    const svg = iconAfter.querySelector('svg');
    expect(svg.getAttribute('width')).toEqual('24');
    expect(svg.getAttribute('height')).toEqual('24');
    iconAfter.setAttribute('name', 'location-icon');
    expect(iconAfter.innerHTML.indexOf(testPart) !== -1).toEqual(false);
    // test changing of size
    iconAfter.setAttribute('size', '40');
    const svg2 = document.querySelector(`svg-icon svg`);
    expect(svg2.getAttribute('width')).toEqual('40');
    expect(svg2.getAttribute('height')).toEqual('40');
  });
  it('it should not load the specified icon because not exists', () => {
    const html = `<svg-icon name="sucess-icon" size="24"></svg-icon>`;
    document.documentElement.innerHTML = html;
    const iconAfter = document.querySelector(`svg-icon`);
    expect(iconAfter.innerHTML).toEqual('');
  });
});
