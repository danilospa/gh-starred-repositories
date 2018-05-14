import React, { Component } from 'react';

class Repository extends Component {
  render() {
    const { repository } = this.props;
    return (<p>{repository.name} - {repository.open_issues_count} - {repository.stargazers_count}</p>);
  }
}

export default Repository;
