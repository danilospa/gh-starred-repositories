import React, { Component } from 'react';
import Repositories from '../../components/Repositories';
import githubApi from '../../clients/githubApi';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
    };
  }

  componentWillMount() {
    githubApi.getStarredRepositoriesForUser('rodrigorm', { fetchAll: true })
      .then(repositories => this.setState({ repositories }));
  }

  render() {
    return (
      <Repositories repositories={this.state.repositories} />
    );
  }
}

export default App;
