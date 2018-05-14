import React, { Component } from 'react';
import Repository from '../Repository';

class Repositories extends Component {
  render() {
    return (
      <div>
        {this.props.repositories.map((repository, i) => (
          <Repository key={i} repository={repository} />
        ))}
      </div>
    );
  }
}

export default Repositories;
