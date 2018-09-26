import React from 'react';
import { mount, shallow } from 'enzyme';

import ErrorBoundary from './ErrorBoundary';
import SnackBar from './../UI/SnackBar/SnackBar';

const snackBarProps = {
  message: 'Test message',
  type: 'info',
  clicked: jest.fn()
};

describe('ErrorBoundary', () => {
  it('should be defined', async () => {
    expect(ErrorBoundary).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = shallow(<ErrorBoundary />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should have `show` prop', () => {
    const child = <div>Child content</div>;
    const wrapper = shallow(
      <div>
        <ErrorBoundary children={child} />
      </div>
    );
    expect(wrapper.find('ErrorBoundary').children()).toBeTruthy();
  });
  it('should catch errors with componentDidCatch()', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <SnackBar {...snackBarProps} />
      </ErrorBoundary>
    );
    let err = new Error('hi');
    let spy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    wrapper.find('SnackBar').simulateError(err);
    expect(wrapper.state().hasError).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
});
