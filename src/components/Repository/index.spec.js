import React from 'react';
import { shallow } from 'enzyme';
import Repository from './index';

describe('Repository Component', () => {
  let component, repository;

  beforeEach(() => {
    repository = {
      name: 'repo name',
      description: 'repo description',
      language: 'repo language',
      open_issues_count: 'open issues count',
      stargazers_count: 'stargazers count',
    };
    component = shallow(<Repository repository={repository} />);
  });

  it('renders correct name', () => {
    expect(component.find('h3').text()).toMatch('repo name');
  });

  it('renders correct description', () => {
    expect(component.find('p').at(0).text()).toMatch('repo description');
  });

  it('renders correct language', () => {
    expect(component.find('p').at(1).text()).toMatch('language');
  });

  it('renders correct open_issues_count', () => {
    expect(component.find('p').at(2).text()).toMatch('open issues count');
  });

  it('renders correct stargazers_count', () => {
    expect(component.find('p').at(3).text()).toMatch('stargazers count');
  });
});
