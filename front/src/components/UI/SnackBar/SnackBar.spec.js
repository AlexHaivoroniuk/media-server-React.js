import React from 'react';
import { shallow, mount } from 'enzyme';

import SnackBar from './SnackBar';

const mockRequiredPropsSnackBar = {
  message: 'Message',
  type: 'info',
  clicked: jest.fn()
};

describe('<SnackBar/>', () => {
  it('should be defined', () => {
    expect(SnackBar).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = shallow(<SnackBar {...mockRequiredPropsSnackBar} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should have correct struture', () => {
    const wrapper = mount(<SnackBar {...mockRequiredPropsSnackBar} />);
    expect(wrapper.find('.SnackBar').length).toEqual(1);
    expect(wrapper.find('.SnackBar_Close').length).toEqual(1);
  });
  it('should have `messsage` prop', () => {
    const wrapper = shallow(
      <div>
        <SnackBar {...mockRequiredPropsSnackBar} />
      </div>
    );
    expect(wrapper.find('SnackBar').prop('message')).toMatch(/Message/);
  });
  it('should have `type` prop', () => {
    const wrapper = shallow(
      <div>
        <SnackBar {...mockRequiredPropsSnackBar} />
      </div>
    );
    expect(wrapper.find('SnackBar').prop('type')).toMatch(/info/);
  });
  it('should have `clicked` prop', () => {
    const wrapper = shallow(
      <div>
        <SnackBar {...mockRequiredPropsSnackBar} />
      </div>
    );
    expect(wrapper.find('SnackBar').prop('clicked')).toBe(
      mockRequiredPropsSnackBar.clicked
    );
  });
  it('should hide SnackBar when clicked SnackBar_Close', () => {
    const wrapper = mount(<SnackBar {...mockRequiredPropsSnackBar} />);
    wrapper.find('.SnackBar_Close').simulate('click');
    expect(wrapper.state.show).not.toBeTruthy();
  });
  it('should handle classess due to type prop', () => {
    const types = ['success', 'info', 'warn', 'error'];
    const typedClasses = {
      success: 'SnackBar__Success',
      info: 'SnackBar__Info',
      warn: 'SnackBar__Warn',
      error: 'SnackBar__Error'
    };
    types.forEach(type => {
      const wrapper = mount(
        <SnackBar {...mockRequiredPropsSnackBar} type={type} />
      );
      expect(
        wrapper.find('.SnackBar').hasClass(typedClasses[type])
      ).toBeTruthy();
    });
  });
});
