import React from 'react';
import { shallow } from 'enzyme';
import App from './index';
import githubApi from '../../clients/githubApi';

jest.mock('../../clients/githubApi');

describe('App Container', () => {
  let component, repositoriesMock;

  beforeEach(() => {
    repositoriesMock = ['first repository', 'second repository'];
    githubApi.getStarredRepositoriesForUser.mockReturnValue(new Promise((resolve) => resolve(repositoriesMock)));
    component = shallow(<App />);
  });

  it('fetches repositories from github api', () => {
    expect(githubApi.getStarredRepositoriesForUser).toBeCalledWith('rodrigorm', { fetchAll: true });
  });

  it('passes correct props to Repositories', () => {
    component.update();
    expect(component.find('Repositories').props().repositories).toEqual(repositoriesMock);
  });
});
