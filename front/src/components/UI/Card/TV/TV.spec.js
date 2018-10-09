import React from 'react';
import { shallow } from 'enzyme';

import CardTV from './TV';

describe('<CardTV />', () => {
  const stubTV = {
    Poster: 'posterTV.img',
    Title: 'Malesuada pellentesque',
    OriginalTitle: 'Excepteur sint',
    Runtime: '50, 60 min',
    Plot:
      'Facilisis mauris sit amet massa vitae tortor condimentum. Egestas sed tempus urna et pharetra pharetra.',
    Year: {
      First: '2000',
      Last: '2002'
    },
    Genre: 'Lacus, Vestibulum',
    Director: 'Tincidunt Eget',
    Country: 'Odio',
    Actors: 'Ipsum Ullamcorper, Nunc Aliquet, Viverra Tellus',
    NumberOf: {
      Seasons: '2',
      Episodes: '16'
    },
    Seasons: [],
    _id: '321'
  };
  it('should be defined', () => {
    expect(CardTV).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<CardTV tv={stubTV} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(<CardTV tv={stubTV} />);
    expect(wrapper.find('.Card').length).toEqual(1);
  });

  it('should display options', () => {
    const wrapper = shallow(<CardTV tv={stubTV} />);
    expect(wrapper.find('.Card').find('.Options').length).toEqual(1);
  });

  it('should display watch button', () => {
    const wrapper = shallow(<CardTV tv={stubTV} />);
    const options = wrapper.find('.Options');
    expect(options.find('button').length).toEqual(1);
    expect(options.find('button').text()).toEqual('Watch');
  });

  it('should display "Read more..." link', () => {
    const wrapper = shallow(<CardTV tv={stubTV} />);
    const options = wrapper.find('.Options');
    expect(options.find('Link').length).toEqual(1);
    expect(options.find('Link').prop('to')).toEqual('/tv/321');
    expect(options.find('Link').prop('replace')).toEqual(false);
    expect(options.find('Link').prop('children')).toEqual('Read more...');
  });

  it('should display card container', () => {
    const wrapper = shallow(<CardTV tv={stubTV} />);
    expect(wrapper.find('.Card').find('.CardContainer').length).toEqual(1);
  });

  it('should display info', () => {
    const wrapper = shallow(<CardTV tv={stubTV} />);
    expect(wrapper.find('.CardContainer').find('.Info').length).toEqual(1);
  });

  it('should display poster', () => {
    const wrapper = shallow(<CardTV tv={stubTV} />);
    const info = wrapper.find('.CardContainer').find('.Info');
    expect(info.find('.Poster').length).toEqual(1);
    expect(
      info
        .find('.Poster')
        .find('img')
        .prop('src')
    ).toEqual('posterTV.img');
  });

  it('should display topside', () => {
    const wrapper = shallow(<CardTV tv={stubTV} />);
    const info = wrapper.find('.CardContainer').find('.Info');
    expect(info.find('.Topside').length).toEqual(1);
    expect(info.find('.Topside').text()).toEqual('Malesuada pellentesque');
  });

  it('should display about', () => {
    const wrapper = shallow(<CardTV tv={stubTV} />);
    const info = wrapper.find('.CardContainer').find('.Info');
    expect(info.find('.About').length).toEqual(8);
  });

  const points = [
    { name: 'Original Title', text: 'Excepteur sint' },
    { name: 'Seasons', text: '2 (16 episodes)' },
    { name: 'Run time', text: '50, 60 min' },
    {
      name: 'Description',
      text:
        'Facilisis mauris sit amet massa vitae tortor condimentum. Egestas sed tempus urna et pharetra pharetra.'
    },
    { name: 'Years', text: '2000-2002' },
    { name: 'Genre', text: 'Lacus, Vestibulum' },
    { name: 'Country', text: 'Odio' },
    { name: 'Actors', text: 'Ipsum Ullamcorper, Nunc Aliquet, Viverra Tellus' }
  ];
  points.forEach((point, index) => {
    it('should display about ' + point.name, () => {
      const wrapper = shallow(<CardTV tv={stubTV} />);
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

  describe('should display original title properly', () => {
    it('when OriginalTitle and Title are the same', () => {
      const stubTVn = Object.assign({}, stubTV);
      stubTVn.OriginalTitle = stubTVn.Title;
      const wrapper = shallow(<CardTV tv={stubTVn} />);
      const b = wrapper
        .find('.Info')
        .find('.About')
        .at(0);
      expect(b.find('label').text()).toEqual('Seasons:');
    });

    it('when OriginalTitle and Title are different', () => {
      const stubTVn = Object.assign({}, stubTV);
      stubTVn.OriginalTitle = 'Placerat duis ultricies';
      const wrapper = shallow(<CardTV tv={stubTVn} />);
      const b = wrapper
        .find('.Info')
        .find('.About')
        .at(0);
      expect(b.find('label').text()).toEqual('Original Title:');
    });
  });

  describe('should display seasons properly', () => {
    it('when NumberOf Episodes is present', () => {
      const stubTVn = Object.assign({}, stubTV);
      stubTVn.NumberOf.Episodes = '55';
      const wrapper = shallow(<CardTV tv={stubTVn} />);
      const b = wrapper
        .find('.Info')
        .find('.About')
        .at(1);
      expect(b.find('span').text()).toEqual('2 (55 episodes)');
    });

    it('when NumberOf Episodes is absent', () => {
      const stubTVn = Object.assign({}, stubTV);
      stubTVn.NumberOf.Episodes = undefined;
      const wrapper = shallow(<CardTV tv={stubTVn} />);
      const b = wrapper
        .find('.Info')
        .find('.About')
        .at(1);
      expect(b.find('span').text()).toEqual('2');
    });
  });
});
