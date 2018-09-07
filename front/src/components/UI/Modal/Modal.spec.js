import React, { Fragment } from 'react';
import { shallow, mount } from 'enzyme';

import Modal from './Modal';

const mockProps = {
  show: true,
  close: jest.fn(),
  children: (
    <Fragment>
      <div>Children content</div>
      <button>Action button</button>
    </Fragment>
  )
};

describe('<Modal/>', () => {
  it('should be defined', () => {
    expect(Modal).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = shallow(<Modal {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should has correct structure', () => {
    const wrapper = shallow(<Modal {...mockProps} />);
    expect(wrapper.find('.ModalBackdrop').length).toEqual(1);
    expect(wrapper.find('.Modal').length).toEqual(1);
    expect(wrapper.find('.Modal_Close').length).toEqual(1);
  });
  it('should have `show` prop', () => {
    const wrapper = shallow(
      <div>
        <Modal {...mockProps} />
      </div>
    );
    expect(wrapper.find('Modal').prop('show')).toBeTruthy();
  });
  it('should have `close` prop', () => {
    const wrapper = shallow(
      <div>
        <Modal {...mockProps} />
      </div>
    );
    expect(wrapper.find('Modal').prop('close')).toBe(mockProps.close);
  });
  it('.ModalBackdrop should handle close()', () => {
    const wrapper = mount(
      <div>
        <Modal {...mockProps} />
      </div>
    );
    wrapper.find('.ModalBackdrop').simulate('click');
    expect(mockProps.close).toHaveBeenCalled();
  });
  it('.Modal_Close should handle close()', () => {
    const wrapper = mount(
      <div>
        <Modal {...mockProps} />
      </div>
    );
    wrapper.find('.Modal_Close').simulate('click');
    expect(mockProps.close).toHaveBeenCalled();
  });
  it('should have `children` prop', () => {
    const wrapper = shallow(<Modal {...mockProps} />);
    expect(wrapper.children()).toBeDefined();
  });
});
