import React, { Component } from 'react';

class Repository extends Component {
  render() {
    return (<p>{this.props.repository.name}</p>);
  }
}

export default Repository;
