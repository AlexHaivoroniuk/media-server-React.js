import React from 'react';
import { shallow } from 'enzyme';

import SetupUsers from './setupUsers';

describe('<setupUsers />', () => {
  it('should be defined', () => {
    expect(SetupUsers).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<SetupUsers />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<SetupUsers />);
    });

    it('should have .setupUsers', () => {
      expect(wrapper.find('.setupUsers').length).toEqual(1);
    });

    it('should have .navbar', () => {
      expect(wrapper.find('.setupUsers').find('.navbar').length).toEqual(1);
      expect(
        wrapper
          .find('.setupUsers')
          .find('.navbar')
          .text()
      ).toEqual('Users setup');
    });

    it('should have List component', () => {
      expect(wrapper.find('.setupUsers').find('Connect(List)').length).toEqual(
        1
      );
    });

    it('should have Add component', () => {
      expect(wrapper.find('.setupUsers').find('Connect(Add)').length).toEqual(
        1
      );
    });
  });
});
