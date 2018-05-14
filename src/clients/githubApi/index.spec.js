import subject from './index';
import axios from 'axios';
import { GITHUB_API_BASE_URL } from '../../config'

jest.mock('axios');

describe('githubApi client', () => {
  describe('get starred repositories for user', () => {
    describe('when fetching all repositores', () => {
      describe('when there is no link header', () => {
        let responseMock, result;

        beforeEach(() => {
          responseMock = {
            headers: {},
            data: 'response',
          };
          axios.get.mockReturnValue(responseMock);
          result = subject.getStarredRepositoriesForUser('user', { fetchAll: true });
        });

        it('performs correct request', () => {
          expect(axios.get).toBeCalledWith(`${GITHUB_API_BASE_URL}/users/user/starred?per_page=100`);
        });

        it('returns correct value', async () => {
          const response = await result;
          expect(response).toEqual(responseMock.data);
        });
      });

      describe('when there is a link header', () => {
        let firstResponseMock, secondResponseMock, result;

        beforeEach(() => {
          firstResponseMock = {
            headers: {
              link: '<https://api.github.com/user/23070/starred?page=2>; rel="next", <https://api.github.com/user/23070/starred?page=2>; rel="last"',
            },
            data: [1],
          };
          secondResponseMock = {
            data: [2],
          };

          axios.get.mockReturnValueOnce(firstResponseMock);
          axios.get.mockReturnValueOnce(secondResponseMock);
          result = subject.getStarredRepositoriesForUser('user', { fetchAll: true });
        });

        it('performs correct requests', () => {
          expect(axios.get).toBeCalledWith(`${GITHUB_API_BASE_URL}/users/user/starred?per_page=100`);
          expect(axios.get).toBeCalledWith(`${GITHUB_API_BASE_URL}/users/user/starred?per_page=100&page=2`);
        });

        it('returns all responses concatened', async () => {
          const response = await result;
          expect(response).toEqual(firstResponseMock.data.concat(secondResponseMock.data));
        });
      });
    });

    describe('when fetching a single page', () => {
      let responseMock, result;

      beforeEach(() => {
        responseMock = {
          headers: {},
          data: 'response',
        };
        axios.get.mockReturnValue(responseMock);
        result = subject.getStarredRepositoriesForUser('user', { page: 2, pageSize: 10 });
      });

      it('performs correct request', () => {
        expect(axios.get).toBeCalledWith(`${GITHUB_API_BASE_URL}/users/user/starred?per_page=10&page=2`);
      });

      it('returns correct value', async () => {
        const response = await result;
        expect(response).toEqual(responseMock.data);
      });
    });
  });
});
