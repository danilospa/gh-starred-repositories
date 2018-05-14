import React from 'react';
import { shallow } from 'enzyme';
import Repositories from './index';

describe('Repositories Component', () => {
  let component, repositories;

  beforeEach(() => {
    repositories = ['first repository', 'second repository'];
    component = shallow(<Repositories repositories={repositories} />);
  });

  it('passes correct props to Repository children', () => {
    expect(component.find('Repository').first().props().repository).toEqual('first repository');
    expect(component.find('Repository').at(1).props().repository).toEqual('second repository');
  });
});
