import React from 'react';
import { shallow } from 'enzyme';

import Movie from './Movie';

describe('<Movie />', () => {
  const stubMovie = {
    Poster: 'poster.img',
    Title: 'Gravida dictum',
    Plot: 'Fames ac turpis egestas integer eget aliquet nibh.',
    Year: '1234',
    Genre: 'Semper',
    Director: 'Eget Nullam',
    Country: 'Quam',
    Actors: 'Viverra, Ipsum, Nunc Aliquet',
    Rated: '5.5',
    Writer: 'Mauris Volutpat',
    Language: 'Lorem',
    Awards: 'Justo',
    imdbRating: '7.7',
    Production: 'Eros donec',
    Released: '1356',
    _id: 321
  };

  it('should be defined', () => {
    expect(Movie).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Movie movie={stubMovie} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(<Movie movie={stubMovie} />);
    expect(wrapper.find('.MovieContainer').length).toEqual(1);
  });

  it('should have backlink', () => {
    const wrapper = shallow(<Movie movie={stubMovie} />);
    expect(wrapper.find('.MovieContainer').find('.BackLink').length).toEqual(1);
    const link = wrapper
      .find('.MovieContainer')
      .find('.BackLink')
      .find('Link');
    expect(link.length).toEqual(1);
    expect(link.prop('to')).toEqual('/');
    expect(link.prop('replace')).toEqual(false);
    expect(link.find('button').length).toEqual(1);
    expect(
      link
        .find('button')
        .find('i')
        .prop('className')
    ).toEqual('fa fa-chevron-left');
  });

  it('should have movie block', () => {
    const wrapper = shallow(<Movie movie={stubMovie} />);
    expect(wrapper.find('.MovieContainer').find('.Movie').length).toEqual(1);
  });

  it('should have edit icon', () => {
    const wrapper = shallow(<Movie movie={stubMovie} />);
    expect(wrapper.find('.Movie').find('.EditIcon').length).toEqual(1);
    expect(wrapper.find('.EditIcon').find('button').length).toEqual(1);
    expect(
      wrapper
        .find('.EditIcon')
        .find('button')
        .find('i')
        .prop('className')
    ).toEqual('fas fa-edit');
  });

  it('should have left side', () => {
    const wrapper = shallow(<Movie movie={stubMovie} />);
    expect(wrapper.find('.MovieContainer').find('.LeftSide').length).toEqual(1);
    const ls = wrapper.find('.MovieContainer').find('.LeftSide');
    expect(ls.find('.Poster').length).toEqual(1);
    expect(
      ls
        .find('.Poster')
        .find('img')
        .prop('src')
    ).toEqual('poster.img');
    expect(ls.find('.WatchButton').length).toEqual(1);
    expect(ls.find('.WatchButton').find('button').length).toEqual(1);
    expect(
      ls
        .find('.WatchButton')
        .find('button')
        .text()
    ).toEqual('Watch');
  });

  describe('AllInfomation block', () => {
    const wrapper = shallow(<Movie movie={stubMovie} />);
    const ai = wrapper.find('.Movie').find('.AllInformation');

    it('should have AllInformation block', () => {
      expect(ai.length).toEqual(1);
    });

    it('should have title', () => {
      expect(ai.find('.Topside').length).toEqual(1);
      expect(ai.find('.Topside').text()).toEqual('Gravida dictum');
    });

    it('should have several About blocks', () => {
      expect(ai.find('.About').length).toEqual(13);
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
      { name: 'Actors', text: 'Viverra, Ipsum, Nunc Aliquet' },
      { name: 'Rated', text: '5.5' },
      { name: 'Writer', text: 'Mauris Volutpat' },
      { name: 'Language', text: 'Lorem' },
      { name: 'Awards', text: 'Justo' },
      { name: 'IMDBRating', text: '7.7' },
      { name: 'Production', text: 'Eros donec' },
      { name: 'Released', text: '1356' }
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
  });
});
