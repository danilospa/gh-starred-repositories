import React from 'react';
import { shallow } from 'enzyme';
import Repository from './index';

describe('Repository Component', () => {
  let component, repository;

  beforeEach(() => {
    repository = {
      name: 'repo name',
      open_issues_count: 'open issues count',
      stargazers_count: 'stargazers count',
    };
    component = shallow(<Repository repository={repository} />);
  });

  it('renders correct name', () => {
    expect(component.find('p').text()).toMatch('repo name');
  });

  it('renders correct open_issues_count', () => {
    expect(component.find('p').text()).toMatch('open issues count');
  });

  it('renders correct stargazers_count', () => {
    expect(component.find('p').text()).toMatch('stargazers count');
  });
});
