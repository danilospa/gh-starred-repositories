import React from 'react';
import { shallow } from 'enzyme';
import RepositoriesSort from './index';

describe('RepositoriesSort Component', () => {
  let component, callback, fields;

  beforeEach(() => {
    callback = jest.fn();
    fields = ['field1', 'field2'];
    component = shallow(<RepositoriesSort handleSort={callback} fields={fields} />);
  });

  it('renders correct fields label in select', () => {
    expect(component.find('option').first().text()).toEqual('field1');
    expect(component.find('option').at(1).text()).toEqual('field2');
  });

  it('renders correct fields value in select', () => {
    expect(component.find('option').first().props().value).toEqual('field1');
    expect(component.find('option').at(1).props().value).toEqual('field2');
  });

  describe('when changing field', () => {
    beforeEach(() => {
      component.find('select').simulate('change', { target: { value: 'field2' }});
    });

    it('invokes callback from prop', () => {
      expect(callback).toBeCalledWith({ field: 'field2' });
    });

    it('sets selected field on select', () => {
      expect(component.find('select').props().value).toEqual('field2');
    });
  });
});
