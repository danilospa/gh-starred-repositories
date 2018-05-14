import React from 'react';
import { shallow } from 'enzyme';
import App from './index';
import githubApi from '../../clients/githubApi';

jest.mock('../../clients/githubApi');

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('App Container', () => {
  let component, repositoriesMock;

  beforeEach(() => {
    repositoriesMock = ['first repository', 'second repository'];
    githubApi.getStarredRepositoriesForUser.mockReturnValue(new Promise((resolve) => resolve(repositoriesMock)));
    component = shallow(<App />);
  });

  it('fetches repositories from github api when user changes', () => {
    component.instance().handleUserChange('user');
    expect(githubApi.getStarredRepositoriesForUser).toBeCalledWith('user', { fetchAll: true });
  });

  fit('passes correct props to Repositories when user changes', async () => {
    component.instance().handleUserChange('user');
    await flushPromises();
    component.update();
    expect(component.find('Repositories').props().repositories).toEqual(repositoriesMock);
  });
});
