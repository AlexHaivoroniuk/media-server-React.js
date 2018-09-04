import React from 'react';
import { shallow } from 'enzyme';

import Admin from './Admin';

describe('<Admin />', () => {
  it('should be defined', () => {
    expect(Admin).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Admin />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(<Admin />);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.text()).toEqual(
      'Access is restricted only to users with Admin role.'
    );
  });
});
