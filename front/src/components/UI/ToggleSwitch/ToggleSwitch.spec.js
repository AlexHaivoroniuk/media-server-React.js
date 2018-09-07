import React from 'react';
import { shallow, mount } from 'enzyme';

import ToggleSwitch from './ToggleSwitch';

const mockProps = {
  toggleValue: true,
  changed: jest.fn()
};

describe('<ToggleSwitch/>', () => {
  it('should be defined', () => {
    expect(ToggleSwitch).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = shallow(
      <ToggleSwitch value={mockProps.toggleValue} changed={mockProps.changed} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should has correct structure', () => {
    const wrapper = shallow(
      <ToggleSwitch value={mockProps.toggleValue} changed={mockProps.changed} />
    );
    expect(wrapper.find('.ToggleSwitch').length).toEqual(1);
    expect(wrapper.find('.ToggleSlider').length).toEqual(1);
  });
});
