import React from 'react';
import { shallow } from 'enzyme';

import Card from './Card';

describe('<Card />', () => {
  const stubMovie = {
    Poster: 'poster.img',
    Title: 'Gravida dictum',
    Plot: 'Fames ac turpis egestas integer eget aliquet nibh.',
    Year: '1234',
    Genre: 'Semper',
    Director: 'Eget Nullam',
    Country: 'Quam',
    Actors: 'Viverra, Ipsum, Nunc Aliquet',
    _id: '321'
  };
  it('should be defined', () => {
    expect(Card).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Card movie={stubMovie} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(<Card movie={stubMovie} />);
    expect(wrapper.find('.Card').length).toEqual(1);
  });

  it('should display options', () => {
    const wrapper = shallow(<Card movie={stubMovie} />);
    expect(wrapper.find('.Card').find('.Options').length).toEqual(1);
  });

  it('should display watch button', () => {
    const wrapper = shallow(<Card movie={stubMovie} />);
    const options = wrapper.find('.Options');
    expect(options.find('button').length).toEqual(1);
    expect(options.find('button').text()).toEqual('Watch');
  });

  it('should display "Read more..." link', () => {
    const wrapper = shallow(<Card movie={stubMovie} />);
    const options = wrapper.find('.Options');
    expect(options.find('Link').length).toEqual(1);
    expect(options.find('Link').prop('to')).toEqual('/321');
    expect(options.find('Link').prop('replace')).toEqual(false);
    expect(options.find('Link').prop('children')).toEqual('Read more...');
  });

  it('should display card container', () => {
    const wrapper = shallow(<Card movie={stubMovie} />);
    expect(wrapper.find('.Card').find('.CardContainer').length).toEqual(1);
  });

  it('should display info', () => {
    const wrapper = shallow(<Card movie={stubMovie} />);
    expect(wrapper.find('.CardContainer').find('.Info').length).toEqual(1);
  });

  it('should display poster', () => {
    const wrapper = shallow(<Card movie={stubMovie} />);
    const info = wrapper.find('.CardContainer').find('.Info');
    expect(info.find('.Poster').length).toEqual(1);
    expect(
      info
        .find('.Poster')
        .find('img')
        .prop('src')
    ).toEqual('poster.img');
  });

  it('should display topside', () => {
    const wrapper = shallow(<Card movie={stubMovie} />);
    const info = wrapper.find('.CardContainer').find('.Info');
    expect(info.find('.Topside').length).toEqual(1);
    expect(info.find('.Topside').text()).toEqual('Gravida dictum');
  });

  it('should display about', () => {
    const wrapper = shallow(<Card movie={stubMovie} />);
    const info = wrapper.find('.CardContainer').find('.Info');
    expect(info.find('.About').length).toEqual(6);
  });

  it('should display about description', () => {
    const wrapper = shallow(<Card movie={stubMovie} />);
    const b = wrapper
      .find('.Info')
      .find('.About')
      .at(0);
    expect(b.find('label').length).toEqual(1);
    expect(b.find('label').text()).toEqual('Description:');
    expect(b.find('span').length).toEqual(1);
    expect(b.find('span').text()).toEqual(
      'Fames ac turpis egestas integer eget aliquet nibh.'
    );
  });

  const points = [
    {
      name: 'Description',
      text: 'Fames ac turpis egestas integer eget aliquet nibh.'
    },
    { name: 'Year', text: '1234' },
    { name: 'Genre', text: 'Semper' },
    { name: 'Director', text: 'Eget Nullam' },
    { name: 'Country', text: 'Quam' },
    { name: 'Actors', text: 'Viverra, Ipsum, Nunc Aliquet' }
  ];
  points.forEach((point, index) => {
    it('should display about ' + point.name, () => {
      const wrapper = shallow(<Card movie={stubMovie} />);
      const b = wrapper
        .find('.Info')
        .find('.About')
        .at(index);
      expect(b.find('label').length).toEqual(1);
      expect(b.find('label').text()).toEqual(`${point.name}:`);
      expect(b.find('span').length).toEqual(1);
      expect(b.find('span').text()).toEqual(point.text);
    });
  });
});
