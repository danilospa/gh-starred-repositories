import React from 'react';
import { shallow } from 'enzyme';
import RepositoriesFilter from './index';

describe('RepositoriesFilter Component', () => {
  let component, callback, languages;

  beforeEach(() => {
    callback = jest.fn();
    languages = ['ruby', 'js'];
    component = shallow(<RepositoriesFilter handleFilter={callback} languages={languages} />);
  });

  it('renders correct languages label in select', () => {
    expect(component.find('option').first().text()).toEqual('All languages');
    expect(component.find('option').at(1).text()).toEqual('ruby');
    expect(component.find('option').at(2).text()).toEqual('js');
  });

  it('renders correct languages value in select', () => {
    expect(component.find('option').first().props().value).toEqual('all');
    expect(component.find('option').at(1).props().value).toEqual('ruby');
    expect(component.find('option').at(2).props().value).toEqual('js');
  });

  describe('when changing language', () => {
    beforeEach(() => {
      component.find('select').simulate('change', { target: { value: 'lang' }});
    });

    it('invokes callback from prop', () => {
      expect(callback).toBeCalledWith({ language: 'lang' });
    });

    it('sets selected language on select', () => {
      expect(component.find('select').props().value).toEqual('lang');
    });
  });
});
