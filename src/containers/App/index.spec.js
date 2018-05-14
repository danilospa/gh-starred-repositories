import React from 'react';
import { shallow } from 'enzyme';
import App from './index';
import githubApi from '../../clients/githubApi';

jest.mock('../../clients/githubApi');

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('App Container', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  describe('when user changes and when request is successfull', () => {
    let repositoriesMock;

    beforeEach(() => {
      repositoriesMock = ['first repository', 'second repository'];
      githubApi.getStarredRepositoriesForUser.mockReturnValue(new Promise((resolve) => resolve(repositoriesMock)));
      component.instance().handleUserChange('user');
    });

    it('fetches repositories from github api', () => {
      expect(githubApi.getStarredRepositoriesForUser).toBeCalledWith('user', { fetchAll: true });
    });

    it('passes correct props to Repositories', async () => {
      await flushPromises();
      component.update();
      expect(component.find('Repositories').props().repositories).toEqual(repositoriesMock);
    });

    it('passes no message to ErrorMessage', async () => {
      await flushPromises();
      component.update();
      expect(component.find('ErrorMessage').props().message).toEqual(null);
    });
  });

  describe('when user changes and when request fails', () => {
    beforeEach(() => {
      const failedResponse = {
        response: {
          data: {
            message: 'error message',
          },
        },
      };
      githubApi.getStarredRepositoriesForUser.mockReturnValue(new Promise((_, reject) => reject(failedResponse)));
      component.instance().handleUserChange('user');
    });

    it('passes correct props to Repositories', async () => {
      await flushPromises();
      component.update();
      expect(component.find('Repositories').props().repositories).toEqual([]);
    });

    it('passes no message to ErrorMessage', async () => {
      await flushPromises();
      component.update();
      expect(component.find('ErrorMessage').props().message).toEqual('error message');
    });
  });
});
