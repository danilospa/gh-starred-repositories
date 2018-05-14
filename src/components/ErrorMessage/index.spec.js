import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from './index';

describe('ErrorMessage Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ErrorMessage message={''} />);
  });

  it('does not show p tag when message does not exist', () => {
    expect(component.find('p').length).toEqual(0);
  });

  it('does show p tag when message does exist', () => {
    component.setProps({ message: 'error message' });
    expect(component.find('p').text()).toEqual('error message');
  });
});
