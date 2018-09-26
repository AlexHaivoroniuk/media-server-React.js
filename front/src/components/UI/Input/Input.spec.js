import React from 'react';
import { shallow } from 'enzyme';

import Input from './Input';

const mockRequiredPropsInput = {
  type: 'text',
  value: '',
  changed: jest.fn()
};

describe('<input />', () => {
  it('should be defined', () => {
    expect(Input).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Input {...mockRequiredPropsInput} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct structure', () => {
    const wrapper = shallow(<Input {...mockRequiredPropsInput} />);
    expect(wrapper.find('.Input').length).toEqual(1);
    expect(wrapper.find('.Input').find('label.Label').length).toEqual(1);
  });

  it('should have display label', () => {
    const wrapper = shallow(
      <Input
        label="Malesuada"
        type={mockRequiredPropsInput.type}
        value={mockRequiredPropsInput.value}
        changed={mockRequiredPropsInput.changed}
      />
    );
    expect(wrapper.find('.Input').text()).toEqual('Malesuada');
  });

  describe('default input type', () => {
    it('should have correct structure', () => {
      const wrapper = shallow(<Input {...mockRequiredPropsInput} />);
      const ie = wrapper.find('.Input').find('.InputElement');
      expect(ie.length).toEqual(1);
      expect(ie.prop('autoComplete')).toEqual('on');
    });

    it('should handle the change event', () => {
      const mockFn = jest.fn();
      const wrapper = shallow(
        <Input
          changed={mockFn}
          value={mockRequiredPropsInput.value}
          type={mockRequiredPropsInput.type}
        />
      );
      const ie = wrapper.find('.Input').find('.InputElement');
      ie.simulate('change');
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('text input type', () => {
    const type = 'text';

    it('should have correct structure', () => {
      const wrapper = shallow(
        <Input
          type={type}
          value="vestibulum"
          changed={mockRequiredPropsInput.changed}
          placeholder="faucibus"
        />
      );
      const ie = wrapper.find('.Input').find('.InputElement');
      expect(ie.length).toEqual(1);
      expect(ie.prop('autoComplete')).toEqual('on');
      expect(ie.prop('value')).toEqual('vestibulum');
      expect(ie.prop('placeholder')).toEqual('faucibus');
    });

    it('should handle the change event', () => {
      const mockFn = jest.fn();
      const wrapper = shallow(
        <Input
          type={type}
          changed={mockFn}
          value={mockRequiredPropsInput.value}
        />
      );
      const ie = wrapper.find('.Input').find('.InputElement');
      ie.simulate('change');
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('textarea input type', () => {
    const type = 'textarea';

    it('should have correct structure', () => {
      const wrapper = shallow(
        <Input
          type={type}
          value="vestibulum"
          changed={mockRequiredPropsInput.changed}
          placeholder="faucibus"
        />
      );
      const ie = wrapper.find('.Input').find('.InputElement');
      expect(ie.length).toEqual(1);
      expect(ie.prop('autoComplete')).toEqual('on');
      expect(ie.prop('value')).toEqual('vestibulum');
      expect(ie.prop('placeholder')).toEqual('faucibus');
    });

    it('should handle the change event', () => {
      const mockFn = jest.fn();
      const wrapper = shallow(
        <Input type={type} changed={mockFn} value={mockRequiredPropsInput} />
      );
      const ie = wrapper.find('.Input').find('.InputElement');
      ie.simulate('change');
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('select input type', () => {
    const type = 'select';
    const options = [
      { value: 'Cmd', displayValue: 'Comodo' },
      { value: 'sedb', displayValue: 'Sed blandit' }
    ];

    it('should have correct structure', () => {
      const wrapper = shallow(
        <Input
          type={type}
          value="vestibulum"
          placeholder="faucibus"
          changed={mockRequiredPropsInput.changed}
          options={options}
        />
      );
      const ie = wrapper.find('.Input').find('.InputElement');
      expect(ie.length).toEqual(1);
      expect(ie.prop('autoComplete')).toEqual('on');
      expect(ie.prop('value')).toEqual('vestibulum');
      expect(
        ie
          .find('option')
          .at(0)
          .props()
      ).toEqual({ children: 'faucibus', disabled: true, value: true });
      expect(
        ie
          .find('option')
          .at(1)
          .props()
      ).toEqual({ children: 'Comodo', value: 'Cmd' });
      expect(
        ie
          .find('option')
          .at(2)
          .props()
      ).toEqual({ children: 'Sed blandit', value: 'sedb' });
    });

    it('should handle the change event', () => {
      const mockFn = jest.fn();
      const wrapper = shallow(
        <Input
          type={type}
          changed={mockFn}
          options={options}
          value={mockRequiredPropsInput}
        />
      );
      const ie = wrapper.find('.Input').find('.InputElement');
      ie.simulate('change');
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('checkbox input type', () => {
    const type = 'checkbox';

    it('should have correct structure', () => {
      const wrapper = shallow(
        <Input
          type={type}
          value="vestibulum"
          changed={mockRequiredPropsInput.changed}
        />
      );
      const ie = wrapper.find('.Input').find('input');
      expect(ie.length).toEqual(1);
      expect(ie.prop('autoComplete')).toEqual('on');
      expect(ie.prop('value')).toEqual('vestibulum');
      expect(wrapper.find('.Input').find('span.Checkmark').length).toEqual(1);
    });

    it('should handle the change event', () => {
      const mockFn = jest.fn();
      const wrapper = shallow(
        <Input
          type={type}
          changed={mockFn}
          value={mockRequiredPropsInput.value}
        />
      );
      const ie = wrapper.find('.Input').find('input');
      ie.simulate('change');
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe('range input type', () => {
    const type = 'range';

    it('should have slider container', () => {
      const wrapper = shallow(
        <Input
          type={type}
          value="vestibulum"
          changed={mockRequiredPropsInput.changed}
        />
      );
      expect(wrapper.find('.Input').find('.SliderContainer').length).toEqual(1);
    });

    it('should have correct structure', () => {
      const wrapper = shallow(
        <Input
          type={type}
          min="2"
          max="9"
          value="7"
          changed={mockRequiredPropsInput.changed}
        />
      );
      const ie = wrapper.find('.SliderContainer').find('input');
      expect(ie.length).toEqual(1);
      expect(ie.prop('autoComplete')).toEqual('on');
      expect(ie.prop('className')).toEqual('Slider');
      expect(ie.prop('min')).toEqual('2');
      expect(ie.prop('max')).toEqual('9');
      expect(ie.prop('value')).toEqual('7');
    });

    it('should handle the change event', () => {
      const mockFn = jest.fn();
      const wrapper = shallow(
        <Input
          type={type}
          changed={mockFn}
          value={mockRequiredPropsInput.value}
        />
      );
      const ie = wrapper.find('.SliderContainer').find('input');
      ie.simulate('change');
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
