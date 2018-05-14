import React from 'react';
import { shallow } from 'enzyme';
import Repository from './index';

describe('Repository Component', () => {
  let component, repository;

  beforeEach(() => {
    repository = { name: 'repo name' };
    component = shallow(<Repository repository={repository} />);
  });

  it('renders correct name', () => {
    expect(component.find('p').text()).toEqual('repo name');
  });
});
