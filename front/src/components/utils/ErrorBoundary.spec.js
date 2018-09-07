import React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from './ErrorBoundary';

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
  //   it('should catch errors with componentDidCatch()', () => {
  //     const wrapper = shallow(
  //       <ErrorBoundary>
  //         <div>Child content</div>
  //       </ErrorBoundary>
  //     );
  //     let err = new Error('hi');
  //     let spy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
  //     wrapper.find('div').simulateError(err);
  //     expect(wrapper.state().hasError).toBeTruthy();
  //     expect(spy).toHaveBeenCalled();
  //   });
});
