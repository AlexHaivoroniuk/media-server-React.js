import React from 'react';
import { shallow } from 'enzyme';

import Spinner from './Spinner';

describe('<Spinner />', () => {
  it('should be defined', () => {
    expect(Spinner).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('.ldsRing').length).toEqual(1);
    expect(wrapper.find('.ldsRing').find('.ldsRing__Child').length).toEqual(4);
  });
});
