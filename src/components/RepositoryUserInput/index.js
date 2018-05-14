import React, { Component } from 'react';
import './index.css';

class RepositoryUserInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      user: 'rodrigorm',
    };
  }

  componentDidMount() {
    this.props.handleUserChange(this.state.user);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ user: value });
  }

  handleClick() {
    this.props.handleUserChange(this.state.user);
  }

  render() {
    return (
      <div className="repository-user-input">
        <label className="repository-user-input__label">User:</label>
        <input className="repository-user-input__input" type="text" value={this.state.user} onChange={this.handleChange} />
        <button className="repository-user-input__button" onClick={this.handleClick}>Fetch</button>
      </div>
    );
  }
}

export default RepositoryUserInput;
