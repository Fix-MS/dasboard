import {Badge} from './badge';

describe('test badge web component', () => {
  const htmlDefault = document.documentElement.innerHTML;
  afterEach(() => {
    document.documentElement.innerHTML = htmlDefault; // reset
    jest.resetModules();
  });
  it('it should load the specified bdage', () => {
    const html = `<badge-element type="foo" label="Lorem"></badge-element>`;
    const iconBefore = document.querySelector(`badge-element`);
    document.documentElement.innerHTML = html;
    expect(iconBefore).toBeNull(); // before not exists
    customElements.define('badge-element', Badge);
    const element = document.querySelector(`badge-element`);
    expect(element).toBeDefined();
    expect(element.innerHTML.length > 0).toEqual(true);
    const testPart = `
    <span issue-type="foo" class="badge bg-success">
        <svg-icon name="foo-icon" size="14"></svg-icon>
        <span issue-value="">Lorem</span>
    </span>`;
    expect(element.innerHTML.indexOf(testPart) !== -1).toEqual(true);

    // test change of label
    element.setAttribute('label', 'blubber');
    const newTestPart = '<span issue-value="">blubber</span>';
    expect(element.innerHTML.indexOf(testPart) !== -1).toEqual(false);
    expect(element.innerHTML.indexOf(newTestPart) !== -1).toEqual(true);
    element.setAttribute('type', 'bar');
    expect(element.innerHTML.indexOf('issue-type="foo"') !== -1).toEqual(false);
    expect(element.innerHTML.indexOf('issue-type="bar"') !== -1).toEqual(true);
  });
});
