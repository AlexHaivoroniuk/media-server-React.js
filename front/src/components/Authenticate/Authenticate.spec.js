import React from 'react';
import { shallow, mount } from 'enzyme';

import Authenticate from './Authenticate';

const mockInputProps = {
  usernameInput: {
    type: 'text',
    label: 'Username',
    placeholder: 'username',
    value: '',
    changed: jest.fn()
  },
  passwordInput: {
    type: 'password',
    label: 'Password',
    placeholder: 'password',
    value: '',
    changed: jest.fn()
  }
};

describe('<Authenticate/>', () => {
  it('should be defined', () => {
    expect(Authenticate).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = shallow(<Authenticate />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should has correct structure', () => {
    const wrapper = shallow(<Authenticate />);
    expect(wrapper.find('.Authenticate').length).toEqual(1);
    expect(wrapper.find('.Authenticate__Title').length).toEqual(1);
    expect(wrapper.find('ToggleSwitch').length).toEqual(1);
  });
  it('should have 2 Inputs & Button', () => {
    const wrapper = shallow(<Authenticate />);
    expect(wrapper.find('Input').length).toEqual(2);
    expect(wrapper.find('Button').length).toEqual(1);
  });
  it('should handleInput()', () => {
    const wrapper = mount(<Authenticate />);
    wrapper.instance().handleInput('Username', 'username');
    wrapper.instance().handleInput('super_strong_pass', 'password');
    expect(wrapper.state('username')).toMatch('Username');
    expect(wrapper.state('password')).toMatch('super_strong_pass');
  });
  it('should handleInput() on change', () => {
    const wrapper = mount(<Authenticate />);
    const spy = jest.spyOn(wrapper.instance(), 'handleInput');
    wrapper
      .find('input.InputElement')
      .at(0)
      .simulate('change');
    wrapper
      .find('input.InputElement')
      .at(1)
      .simulate('change');
    expect(spy).toHaveBeenCalledTimes(2);
  });
  it('should handleToggleSignIn()', () => {
    const wrapper = mount(<Authenticate />);
    wrapper.instance().handleToggleSignIn();
    expect(wrapper.state('toggleSignIn')).toEqual(true);
  });
  it('should pass Input Username correct props', () => {
    const wrapper = shallow(<Authenticate />);
    expect(mockInputProps.usernameInput.type).toEqual(
      wrapper
        .find('Input')
        .first()
        .props().type
    );
    expect(mockInputProps.usernameInput.label).toEqual(
      wrapper
        .find('Input')
        .first()
        .props().label
    );
    expect(mockInputProps.usernameInput.placeholder).toEqual(
      wrapper
        .find('Input')
        .first()
        .props().placeholder
    );
    expect(mockInputProps.usernameInput.value).toEqual(
      wrapper
        .find('Input')
        .first()
        .props().value
    );
    expect(mockInputProps.passwordInput.type).toEqual(
      wrapper
        .find('Input')
        .last()
        .props().type
    );
    expect(mockInputProps.passwordInput.label).toEqual(
      wrapper
        .find('Input')
        .last()
        .props().label
    );
    expect(mockInputProps.passwordInput.placeholder).toEqual(
      wrapper
        .find('Input')
        .last()
        .props().placeholder
    );
    expect(mockInputProps.passwordInput.value).toEqual(
      wrapper
        .find('Input')
        .last()
        .props().value
    );
  });
  it("should change Button's btnColor props", () => {
    const wrapper = mount(<Authenticate />);
    expect(wrapper.find('Button').props().btnColor).toMatch('success');
    wrapper.instance().handleToggleSignIn();
    wrapper.update();
    expect(wrapper.find('Button').props().btnColor).toMatch('info');
  });
});
