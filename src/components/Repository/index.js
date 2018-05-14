import React, { Component } from 'react';
import './index.css';

class Repository extends Component {
  render() {
    const { repository } = this.props;
    return (
      <a href={repository.url} target="_blank" className="repository">
        <h3 className="repository__header">{repository.name}</h3>
        <div className="repository__content">
          <p><strong>Description</strong>: {repository.description}</p>
          <p><strong>Language</strong>: {repository.language}</p>
          <p><strong>Open issues count</strong>: {repository.open_issues_count}</p>
          <p><strong>Stargazers count</strong>: {repository.stargazers_count}</p>
        </div>
      </a>
    );
  }
}

export default Repository;
