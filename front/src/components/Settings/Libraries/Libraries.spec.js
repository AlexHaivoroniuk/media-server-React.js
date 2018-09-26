import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import Libraries from './Libraries';

let mockAxios = new AxiosMockAdapter(axios);
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
  ],
  fetchLib: jest.fn(),
  notifyMsg: jest.fn()
};

const postUrl = 'http://localhost:4000/libraries';
const deleteUrl = `http://localhost:4000/libraries/${
  librariesState.libraries[0]._id
}`;

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
  it('should call handleAddLibInput() on Inputs change', () => {
    const wrapper = mount(<Libraries store={store} />);
    const spy = jest.spyOn(
      wrapper.find('Libraries').instance(),
      'handleAddLibInput'
    );
    wrapper
      .find('.Libraries__AddLibraries')
      .find('input.InputElement')
      .at(0)
      .simulate('change');
    wrapper
      .find('.Libraries__AddLibraries')
      .find('input.InputElement')
      .at(1)
      .simulate('change');
    expect(spy).toHaveBeenCalledTimes(2);
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
  it('should call addLibrary() on Button click ', () => {
    mockAxios.onPost(postUrl).reply(200);
    const wrapper = mount(<Libraries store={store} />, { disable: false });
    const spy = jest.spyOn(wrapper.find('Libraries').instance(), 'addLibrary');
    wrapper.setState({
      addLib: {
        name: 'myFolder',
        path: '/home/mock'
      }
    });
    wrapper.update();
    wrapper
      .find('.Libraries__AddLibraries')
      .find('button.Button')
      .simulate('click');
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
  // it('deleteLibrary() should call fetchLib() on successfull deletion', () => {
  //   mockAxios.onDelete(deleteUrl).reply(200);
  //   const mock = jest.fn();
  //   const wrapper = mount(<Libraries store={store} fetchLib={mock} />);
  //   wrapper
  //     .find('.Libraries__LibrariesList__item')
  //     .at(0)
  //     .find('.Libraries__LibrariesList__item__content__delete')
  //     .simulate('click');
  //   wrapper.setState({
  //     libraryToDeleteId: librariesState.libraries[0]._id
  //   });
  //   wrapper.update();
  //   expect(wrapper.find('Modal')).toBeDefined();
  //   wrapper
  //     .find('Modal')
  //     .find('button.Button')
  //     .at(0)
  //     .simulate('click');
  //   expect(mock).toHaveBeenCalled();
  // });
  // it('deleteLibrary() should call throw Error on unsuccessfull deletion', () => {
  //   mockAxios.onDelete(deleteUrl).reply(500);
  //   console.error = jest.fn();
  //   const wrapper = mount(<Libraries store={store} />);
  //   wrapper
  //     .find('.Libraries__LibrariesList__item')
  //     .at(0)
  //     .find('.Libraries__LibrariesList__item__content__delete')
  //     .simulate('click');
  //   wrapper.setState({
  //     libraryToDeleteId: librariesState.libraries[0]._id
  //   });
  //   wrapper.update();
  //   expect(wrapper.find('Modal')).toBeDefined();
  //   wrapper
  //     .find('Modal')
  //     .find('button.Button')
  //     .at(0)
  //     .simulate('click');
  //   expect(console.error).toHaveBeenCalled();
  // });
  it('should fetchLib() on componentDidMount()', () => {
    const spy = jest.spyOn(Libraries.prototype, 'componentDidMount');
    mount(<Libraries store={store} />);
    expect(spy).toHaveBeenCalled();
  });
  it('should toggleModal()', () => {
    const wrapper = mount(<Libraries store={store} />);
    wrapper
      .find('.Libraries__LibrariesList__item__content__delete')
      .last()
      .simulate('click');
    expect(wrapper.find('Modal')).toBeDefined();
  });
  it('should pass toggle funciton  to Modal and it`s content ', () => {
    const wrapper = mount(<Libraries store={store} />);
    wrapper
      .find('.Libraries__LibrariesList__item__content__delete')
      .last()
      .simulate('click');
    expect(wrapper.find('Modal')).toBeDefined();
    const spy = jest.spyOn(wrapper.find('Libraries').instance(), 'toggleModal');
    wrapper
      .find('Modal')
      .find('button.Button')
      .at(0)
      .simulate('click');
    wrapper
      .find('Modal')
      .find('button.Button')
      .at(1)
      .simulate('click');
    expect(spy).toHaveBeenCalledTimes(2);
  });
  it('should have correct Modal structure', () => {
    const wrapper = mount(<Libraries store={store} />);
    wrapper
      .find('.Libraries__LibrariesList__item__content__delete')
      .last()
      .simulate('click');
    expect(wrapper.find('Modal')).toBeDefined();
    expect(wrapper.find('Modal').find('Button').length).toEqual(2);
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
