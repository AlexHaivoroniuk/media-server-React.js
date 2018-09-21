import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Libraries from './Libraries';

const mockStore = configureMockStore([thunk]);
const librariesState = {
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

describe('<Libraries/>', () => {
  let store;
  beforeAll(() => {
    store = mockStore({
      ...librariesState
    });
  });

  it('should be defined', () => {
    expect(Libraries).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = mount(<Libraries store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should handleAddLibInput()', () => {
    const wrapper = mount(shallow(<Libraries store={store} />).get(0));
    wrapper
      .find('Libraries')
      .instance()
      .handleAddLibInput('MyLib', 'name');
    wrapper
      .find('Libraries')
      .instance()
      .handleAddLibInput('/home/MyLib', 'path');
    expect(wrapper.state('addLib').name).toMatch('MyLib');
    expect(wrapper.state('addLib').path).toMatch('/home/MyLib');
  });
  it('should handle addLibrary()', () => {
    const wrapper = mount(<Libraries store={store} />);
    let spy = jest.spyOn(wrapper.find('Libraries').instance(), 'addLibrary');
    wrapper
      .find('Libraries')
      .instance()
      .addLibrary({ name: 'MyLib', path: '/home/myLib', uId: 'fgdfgdf44' });
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });
  it('should handle deleteLibrary()', () => {
    const wrapper = mount(<Libraries store={store} />);
    let spy = jest.spyOn(wrapper.find('Libraries').instance(), 'toggleModal');
    wrapper
      .find('.Libraries__LibrariesList__item__content__delete')
      .last()
      .simulate('click');
    wrapper.update();
    expect(spy).toHaveBeenCalled();
  });
  describe('should have correct structure', () => {
    let store, wrapper;

    beforeEach(() => {
      store = mockStore({
        ...librariesState
      });
      wrapper = mount(<Libraries store={store} />);
    });
    describe('Libraries__Libraries', () => {
      it('shold have List & Add Libraries', () => {
        expect(wrapper.find('.Libraries__LibrariesList').length).toEqual(1);
        expect(wrapper.find('.Libraries__AddLibraries').length).toEqual(1);
      });
      describe('Libraries__List', () => {
        it('should have LibrariesList__Item', () => {
          expect(wrapper.find('.Libraries__LibrariesList__item')).toBeDefined();
        });
        describe('LibrariesList__Item', () => {
          it('should have Libraries__LibrariesList__item__content', () => {
            expect(
              wrapper.find('.Libraries__LibrariesList__item__content').length
            ).toEqual(2);
          });
          describe('Libraries__LibrariesList__item__content', () => {
            it('should have Libraries__LibrariesList__item__content__name', () => {
              expect(
                wrapper.find('.Libraries__LibrariesList__item__content__name')
                  .length
              ).toEqual(2);
            });
            it('should have Libraries__LibrariesList__item__content__delete', () => {
              expect(
                wrapper.find('.Libraries__LibrariesList__item__content__delete')
                  .length
              ).toEqual(2);
            });
            it('Libraries__LibrariesList__item__content__delete should call Modal onClick', () => {
              const wrapper = mount(
                shallow(<Libraries store={store} />).get(0)
              );
              wrapper
                .find('.Libraries__LibrariesList__item__content__delete')
                .last()
                .simulate('click');
              expect(wrapper.state().libraryToDeleteId).not.toBeNull();
              expect(wrapper.state().showModal).toBeTruthy();
              expect(wrapper.find('Modal')).toBeDefined();
            });
          });
        });
      });
      describe('Libraries__Libraries__AddLibraries', () => {
        it('should have 2 Inputs and Button', () => {
          expect(
            wrapper.find('.Libraries__AddLibraries').find('Input').length
          ).toEqual(2);
          expect(
            wrapper.find('.Libraries__AddLibraries').find('Button').length
          ).toEqual(1);
        });
      });
    });
  });
});
