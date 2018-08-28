import React from 'react';
import { shallow, mount } from 'enzyme';

import ContentContainer from './ContentContainer';

describe('<ContentContainer />', () => {
  it('should be defined', () => {
    expect(ContentContainer).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<ContentContainer />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('should have correct structure', () => {
    it('should have div', () => {
      const wrapper = shallow(<ContentContainer />);
      expect(wrapper.find('.ContentContainer').length).toEqual(1);
    });

    it('should have button', () => {
      const wrapper = shallow(<ContentContainer />);
      const button = wrapper.find('.ContentContainer').find('Button');
      expect(button.length).toEqual(1);
      expect(button.prop('clicked')).toEqual(wrapper.instance().goToTop);
    });

    it('scroolTo wheh click on button', () => {
      const mockFn = jest.fn();
      global.scrollTo = mockFn;
      const wrapper = mount(<ContentContainer />);
      const button = wrapper.find('.ContentContainer').find('Button');
      button.simulate('click');
      expect(mockFn).toHaveBeenCalledWith(0, 0);
    });
  });

  it('should display child elements', () => {
    const wrapper = shallow(
      <ContentContainer>
        Inner <b>text</b>
      </ContentContainer>
    );
    expect(wrapper.find('.ContentContainer').prop('children')[0]).toEqual([
      'Inner ',
      <b>text</b>
    ]);
  });
});
