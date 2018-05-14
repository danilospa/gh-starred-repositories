import React, { Component } from 'react';
import './index.css';

class RepositoriesSort extends Component {
  constructor(props) {
    super(props);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {
      field: props.fields[0],
    };
  }

  handleFieldChange(event) {
    const { value } = event.target;
    this.setState({ field: value });
    this.props.handleSort({ field: value });
  }

  render() {
    return (
      <div>
        <label className="repositories-sort__label">Sort by:</label>
        <select onChange={this.handleFieldChange} value={this.state.field}>
          {this.props.fields.map((field, i) => (
            <option key={i} value={field}>{field}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default RepositoriesSort;
