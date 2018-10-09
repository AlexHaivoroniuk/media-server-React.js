import React from 'react';
import { shallow } from 'enzyme';

import TV from './TV';

describe('<TV />', () => {
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
    Language: 'Lorem',
    Actors: 'Ipsum Ullamcorper, Nunc Aliquet, Viverra Tellus',
    Writer: 'Blandit Aliquam',
    Production: 'Augue neque gravida',
    NumberOf: {
      Seasons: '2',
      Episodes: '16'
    },
    Seasons: [
      {
        _id: '5bbb646223068e039355fd4a',
        Number: '1',
        Name: 'Season 1',
        EpisodeCount: '12',
        Year: '2001',
        Overview:
          'Neque ornare aenean euismod elementum nisi quis. Sed risus pretium quam vulputate dignissim.',
        Poster: '/poster1.jpg'
      },
      {
        _id: '5bbb646223068e039355fd49',
        Number: '2',
        Name: 'Season 2',
        EpisodeCount: '16',
        Year: '2002',
        Owerview:
          'Diam maecenas ultricies mi eget. Mauris ultrices eros in cursus turpis massa tincidunt dui.',
        Poster: '/poster2.jpg'
      }
    ],
    _id: '321'
  };

  it('should be defined', () => {
    expect(TV).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<TV tv={stubTV} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(<TV tv={stubTV} />);
    expect(wrapper.find('.MovieContainer').length).toEqual(1);
  });

  it('should have backlink', () => {
    const wrapper = shallow(<TV tv={stubTV} />);
    expect(wrapper.find('.MovieContainer').find('.BackLink').length).toEqual(1);
    const link = wrapper
      .find('.MovieContainer')
      .find('.BackLink')
      .find('Link');
    expect(link.length).toEqual(1);
    expect(link.prop('to')).toEqual('/');
    expect(link.prop('replace')).toEqual(false);
    expect(link.find('Button').length).toEqual(1);
    expect(
      link
        .find('Button')
        .find('Icon')
        .prop('children')
    ).toEqual('fa fa-chevron-left');
  });

  it('should have movie block', () => {
    const wrapper = shallow(<TV tv={stubTV} />);
    expect(wrapper.find('.MovieContainer').find('.Movie').length).toEqual(1);
  });

  it('should have edit icon', () => {
    const wrapper = shallow(<TV tv={stubTV} />);
    expect(wrapper.find('.Movie').find('.EditIcon').length).toEqual(1);
    expect(wrapper.find('.EditIcon').find('Button').length).toEqual(1);
    expect(
      wrapper
        .find('.MovieContainer')
        .find('.Movie')
        .find('.EditIcon')
        .find('Button')
        .find('Icon')
        .prop('children')
    ).toEqual('fas fa-edit');
  });

  it('should have left side', () => {
    const wrapper = shallow(<TV tv={stubTV} />);
    expect(wrapper.find('.MovieContainer').find('.LeftSide').length).toEqual(1);
    const ls = wrapper.find('.MovieContainer').find('.LeftSide');
    expect(ls.find('.Poster').length).toEqual(1);
    expect(
      ls
        .find('.Poster')
        .find('img')
        .prop('src')
    ).toEqual('posterTV.img');
    expect(ls.find('.WatchButton').length).toEqual(1);
    expect(ls.find('.WatchButton').find('Button').length).toEqual(1);
    expect(
      ls
        .find('.WatchButton')
        .find('Button')
        .prop('children')
    ).toEqual('Watch');
  });

  describe('AllInfomation block', () => {
    const wrapper = shallow(<TV tv={stubTV} />);
    const ai = wrapper.find('.Movie').find('.AllInformation');

    it('should have AllInformation block', () => {
      expect(ai.length).toEqual(1);
    });

    it('should have title', () => {
      expect(ai.find('.Topside').length).toEqual(1);
      expect(ai.find('.Topside').text()).toEqual('Malesuada pellentesque');
    });

    it('should have several About blocks', () => {
      expect(ai.find('.About').length).toEqual(11);
    });

    const points = [
      {
        name: 'Description',
        text:
          'Facilisis mauris sit amet massa vitae tortor condimentum. Egestas sed tempus urna et pharetra pharetra.'
      },
      { name: 'Year', text: '2000-2002' },
      { name: 'Genre', text: 'Lacus, Vestibulum' },
      { name: 'Run time', text: '50, 60 min' },
      { name: 'Director', text: 'Tincidunt Eget' },
      { name: 'Country', text: 'Odio' },
      {
        name: 'Actors',
        text: 'Ipsum Ullamcorper, Nunc Aliquet, Viverra Tellus'
      },
      { name: 'Writer', text: 'Blandit Aliquam' },
      { name: 'Language', text: 'Lorem' },
      { name: 'Production', text: 'Augue neque gravida' }
    ];
    points.forEach((point, index) => {
      it('should display about ' + point.name, () => {
        const b = ai.find('.About').at(index);
        expect(b.find('.Subtitle').length).toEqual(1);
        expect(b.find('.Subtitle').text()).toEqual(`${point.name}:`);
        expect(b.find('.SubValue').length).toEqual(1);
        expect(b.find('.SubValue').text()).toEqual(point.text);
      });
    });

    describe('should display about Seasons', () => {
      it('title', () => {
        const b = ai.find('.About').at(10);
        expect(
          b
            .find('.Subtitle')
            .at(0)
            .text()
        ).toEqual('Seasons: 2 (16 episodes)');
      });
      describe('should display about Seasons Title properly', () => {
        it('when NumberOf Episodes is present', () => {
          const stubTVn = Object.assign({}, stubTV);
          stubTVn.NumberOf.Episodes = '55';
          const ai = shallow(<TV tv={stubTVn} />);
          const b = ai.find('.About').at(10);
          expect(
            b
              .find('.Subtitle')
              .at(0)
              .text()
          ).toEqual('Seasons: 2 (55 episodes)');
        });
        it('when NumberOf Episodes is absent', () => {
          const stubTVn = Object.assign({}, stubTV);
          stubTVn.NumberOf.Episodes = undefined;
          const ai = shallow(<TV tv={stubTVn} />);
          const b = ai.find('.About').at(10);
          expect(
            b
              .find('.Subtitle')
              .at(0)
              .text()
          ).toEqual('Seasons: 2');
        });
      });

      it('should display about Seasons Info properly', () => {
        const b = ai
          .find('.About')
          .at(10)
          .find('.SubValue')
          .at(0)
          .find('.Subtitle');
        expect(b.length).toEqual(2);
      });
    });
  });
});
