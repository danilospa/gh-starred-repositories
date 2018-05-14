import axios from 'axios';
import _ from 'lodash';
import { GITHUB_API_BASE_URL } from '../../config'

const MAX_FETCH_SIZE = 100;

async function getStarredRepositoriesForUser(user, options = {}) {
  const { page, pageSize, fetchAll } = options;

  if (fetchAll) {
    const URL = `${GITHUB_API_BASE_URL}/users/${user}/starred?per_page=${MAX_FETCH_SIZE}`;
    const firstResponse = await axios.get(URL);
    const { headers } = firstResponse;
    if (!headers.link) {
      return firstResponse.data;
    }

    const lastPage = _getLastPage(headers.link);
    const otherResponses = await Promise.all(Array(lastPage - 1).fill().map((_, i) => {
      const page = i + 2;
      return axios.get(`${URL}&page=${page}`);
    }));

    return firstResponse.data.concat(
      _.flatten(otherResponses.map(response => response.data))
    );
  }

  const URL = `${GITHUB_API_BASE_URL}/users/${user}/starred`;
  const response = await axios.get(`${URL}?per_page=${pageSize}&page=${page}`);
  return response.data;
}

function _getLastPage(link) {
  return /<.*page=(.*)>; rel="last"/.exec(link)[1];
}

export default { getStarredRepositoriesForUser };
