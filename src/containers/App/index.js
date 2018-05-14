import React, { Component } from 'react';
import Repositories from '../../components/Repositories';
import githubApi from '../../clients/githubApi';
import RepositoryUserInput from '../../components/RepositoryUserInput';
import ErrorMessage from '../../components/ErrorMessage';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleUserChange = this.handleUserChange.bind(this);
    this.state = {
      repositories: [],
      error: null,
    };
  }

  handleUserChange(user) {
    this.fetchRepositories(user);
  }

  fetchRepositories(user) {
    githubApi.getStarredRepositoriesForUser(user, { fetchAll: true })
      .then(repositories => this.setState({ repositories, error: null }))
      .catch(err => this.setState({ repositories: [], error: err.response.data.message }));
  }

  render() {
    return (
      <div>
        <RepositoryUserInput handleUserChange={this.handleUserChange} />
        <ErrorMessage message={this.state.error} />
        <Repositories repositories={this.state.repositories} />
      </div>
    );
  }
}

export default App;
