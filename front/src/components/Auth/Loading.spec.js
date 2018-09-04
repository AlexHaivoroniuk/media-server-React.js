import React from 'react';
import { shallow } from 'enzyme';

import Loading from './Loading';

describe('<Loading />', () => {
  it('should be defined', () => {
    expect(Loading).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(<Loading />);
    console.log(wrapper.debug());
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.text()).toEqual('Logging you in...');
  });
});
