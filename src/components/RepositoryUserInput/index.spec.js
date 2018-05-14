import React from 'react';
import { shallow } from 'enzyme';
import RepositoryUserInput from './index';

describe('RepositoryUserInput Component', () => {
  let component, callback;

  beforeEach(() => {
    callback = jest.fn();
    component = shallow(<RepositoryUserInput handleUserChange={callback} />);
  });

  describe('when changing user', () => {
    beforeEach(() => {
      component.find('input').simulate('change', { target: { value: 'new user' }});
    });

    it('sets new value on input', () => {
      expect(component.find('input').props().value).toEqual('new user');
    });
  });

  describe('when clicking on button', () => {
    beforeEach(() => {
      component.find('button').simulate('click');
    });

    it('invokes callback from prop with correct default value', () => {
      expect(callback).toBeCalledWith('rodrigorm');
    });
  });

  describe('when clicking on button after changing user', () => {
    beforeEach(() => {
      component.find('input').simulate('change', { target: { value: 'new user' }});
      component.find('button').simulate('click');
    });

    it('invokes callback from prop with correct default value', () => {
      expect(callback).toBeCalledWith('new user');
    });
  });
});
