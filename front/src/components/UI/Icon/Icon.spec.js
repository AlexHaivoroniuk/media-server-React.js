import React from 'react';
import { shallow } from 'enzyme';

import Icon from './Icon';

describe('<Icon />', () => {
  it('should be defined', () => {
    expect(Icon).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Icon />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(
      <Icon iconSize="md" iconColor="danger">
        fa fa-trash
      </Icon>
    );
    expect(wrapper.find('.md').length).toEqual(1);
    expect(wrapper.find('.danger').length).toEqual(1);
    expect(wrapper.find('.fa').length).toEqual(1);
    expect(wrapper.find('.fa-trash').length).toEqual(1);
  });
});
