import React from 'react';
import { shallow } from 'enzyme';

import SideNav from './SideNav';

describe('<SideNav />', () => {
  it('should be defined', () => {
    expect(SideNav).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<SideNav />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(<SideNav />);
    expect(wrapper.find('.SideNav').length).toEqual(1);
  });

  it('should have items', () => {
    const items = ['Home', 'Movies', 'Music'];
    const wrapper = shallow(<SideNav />);
    expect(wrapper.find('.SideNav').find('.SideNav__item').length).toEqual(3);
    items.forEach((el, i) => {
      expect(
        wrapper
          .find('.SideNav__item')
          .at(i)
          .text()
      ).toEqual(el);
    });
  });
});
