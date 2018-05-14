import React, { Component } from 'react';

class RepositoriesFilter extends Component {
  constructor(props) {
    super(props);

    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.state = {
      language: props.languages[0],
    };
  }

  handleLanguageChange(event) {
    const { value } = event.target;
    this.setState({ language: value});
    this.props.handleFilter({ language: value });
  }

  render() {
    return (
      <div>
        <label>Filter by language:</label>
        <select onChange={this.handleLanguageChange} value={this.state.language}>
          {this.props.languages.map((language, i) => (
            <option key={i} value={language}>{language}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default RepositoriesFilter;
