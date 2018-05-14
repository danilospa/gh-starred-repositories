import React, { Component } from 'react';
import Repositories from '../../components/Repositories';
import githubApi from '../../clients/githubApi';
import RepositoryUserInput from '../../components/RepositoryUserInput';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleUserChange = this.handleUserChange.bind(this);
    this.state = {
      repositories: [],
    };
  }

  handleUserChange(user) {
    this.fetchRepositories(user);
  }

  fetchRepositories(user) {
    githubApi.getStarredRepositoriesForUser(user, { fetchAll: true })
      .then(repositories => this.setState({ repositories }));
  }

  render() {
    return (
      <div>
        <RepositoryUserInput handleUserChange={this.handleUserChange} />
        <Repositories repositories={this.state.repositories} />
      </div>
    );
  }
}

export default App;
