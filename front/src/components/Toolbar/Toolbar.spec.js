import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from './Toolbar';

describe('<Toolbar />', () => {
  it('should be defined', () => {
    expect(Toolbar).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper.find('.Toolbar').length).toEqual(1);
  });

  it('should have menu', () => {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper.find('.Toolbar').find('.Toolbar__menu').length).toEqual(1);
  });

  it('should have logo', () => {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper.find('.Toolbar').find('.Logo').length).toEqual(1);
  });

  it('should have title', () => {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper.find('.Toolbar').find('.Toolbar__title').length).toEqual(1);
    expect(wrapper.find('.Toolbar__title').text()).toEqual('MediaServer');
  });

  it('should handle the click event', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<Toolbar toggle={mockFn} />);
    wrapper.find('.Toolbar__menu').simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
