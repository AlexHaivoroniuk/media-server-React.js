import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import Settings from './Settings';

const mockStore = configureMockStore([thunk]);
let mockAxios = new AxiosMockAdapter(axios);

const settingsState = {
  user: {
    id: '5b8e87953d843c24a101ce6b',
    name: 'm1',
    role: 'Admin',
    isLoading: false
  },
  libraries: [
    {
      _id: '5b8fcbb02e6ea338fa4e28dd',
      name: 'MyFolder',
      path: '/home/myFolder',
      userId: '5b8e87953d843c24a101ce6b'
    },
    {
      _id: '5b8fcbb02e6ea338fa4e28dd',
      name: 'mov2011',
      path: '/home/mov',
      userId: '5b8e87953d843c24a101ce6b'
    }
  ]
};

describe('<Settings/>', () => {
  let store;
  beforeAll(() => {
    store = mockStore({
      ...settingsState
    });
  });

  it('should be defined', () => {
    expect(Settings).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = mount(<Settings store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should handleAddLibInput()', () => {
    const wrapper = mount(shallow(<Settings store={store} />).get(0));
    wrapper
      .find('Settings')
      .instance()
      .handleAddLibInput('MyLib', 'name');
    wrapper
      .find('Settings')
      .instance()
      .handleAddLibInput('/home/MyLib', 'path');
    expect(wrapper.state('addLib').name).toMatch('MyLib');
    expect(wrapper.state('addLib').path).toMatch('/home/MyLib');
  });
  it('should handle addLibrary()', () => {
    const wrapper = mount(<Settings store={store} />);
    let spy = jest.spyOn(wrapper.find('Settings').instance(), 'addLibrary');
    wrapper
      .find('Settings')
      .instance()
      .addLibrary({ name: 'MyLib', path: '/home/myLib', uId: 'fgdfgdf44' });
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });
  it('should handle deleteLibrary()', () => {
    const wrapper = mount(<Settings store={store} />);
    let spy = jest.spyOn(wrapper.find('Settings').instance(), 'toggleModal');
    wrapper
      .find('.Settings__Libraries__LibrariesList__item__delete')
      .last()
      .simulate('click');
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });
  describe('should have correct structure', () => {
    let store, wrapper;

    beforeEach(() => {
      store = mockStore({
        ...settingsState
      });
      wrapper = mount(<Settings store={store} />);
    });
    it('should have Title and Subtitle', () => {
      expect(wrapper.find('h2').length).toEqual(1);
      expect(wrapper.find('h3').length).toEqual(2);
    });
    it('Settings__User with 2 Inputs', () => {
      expect(wrapper.find('.Settings__User').length).toEqual(1);
      expect(wrapper.find('.Settings__User').find('Input').length).toEqual(2);
    });
    describe('Settings__Libraries', () => {
      it('shold have List & Add Libraries', () => {
        expect(
          wrapper.find('.Settings__Libraries__LibrariesList').length
        ).toEqual(1);
        expect(
          wrapper.find('.Settings__Libraries__AddLibraries').length
        ).toEqual(1);
      });
      describe('Settings__Libraries__List', () => {
        it('should have LibrariesList__Item', () => {
          expect(
            wrapper.find('.Settings__Libraries__LibrariesList__item')
          ).toBeDefined();
          describe('Item', () => {
            it('should have Item name', () => {
              expect(
                wrapper.find('.Settings__Libraries__LibrariesList__item__name')
                  .length
              ).toEqual(1);
            });
            it('should have Item delete', () => {
              expect(
                wrapper.find(
                  '.Settings__Libraries__LibrariesList__item__delete'
                ).length
              ).toEqual(1);
            });
          });
        });
      });
      describe('Settings__Libraries__AddLibraries', () => {
        it('should have 2 Inputs and Button', () => {
          expect(
            wrapper.find('.Settings__Libraries__AddLibraries').find('Input')
              .length
          ).toEqual(2);
          expect(
            wrapper.find('.Settings__Libraries__AddLibraries').find('Button')
              .length
          ).toEqual(1);
        });
      });
    });
  });
});
