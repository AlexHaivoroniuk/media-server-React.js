import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

describe('<Button />', () => {
  it('should be defined', () => {
    expect(Button).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Button btnSize="lg" btnColor="warning" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(
      <Button btnSize="md" btnColor="danger" disabled>
        Inner text
      </Button>
    );
    expect(wrapper.find('.Button').length).toEqual(1);
  });

  it('should display button size', () => {
    const wrapper = shallow(<Button btnSize="md" />);
    expect(wrapper.find('.md').length).toEqual(1);
  });

  it('should display button color', () => {
    const wrapper = shallow(<Button btnColor="danger" />);
    expect(wrapper.find('.danger').length).toEqual(1);
  });

  it('should display child elements', () => {
    const wrapper = shallow(
      <Button btnSize="xs" btnColor="primary">
        Inner <b>text</b>
      </Button>
    );
    expect(wrapper.find('.Button').hasClass('Button')).toBeTruthy();
    expect(wrapper.find('.Button').hasClass('xs')).toBeTruthy();
    expect(wrapper.find('.Button').hasClass('primary')).toBeTruthy();
  });

  it('should display disabled', () => {
    const wrapper = shallow(
      <Button btnSize="xs" btnColor="primary" disabled />
    );
    expect(wrapper.find('.Button').prop('disabled')).toBeTruthy();
  });

  it('should handle the click event', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<Button clicked={mockFn} />);
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
