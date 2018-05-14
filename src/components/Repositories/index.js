import React, { Component } from 'react';
import Repository from '../Repository';
import RepositoriesFilter from '../RepositoriesFilter';
import RepositoriesSort from '../RepositoriesSort';
import './index.css';

class Repositories extends Component {
  constructor(props) {
    super(props);

    this.handleFilter = this.handleFilter.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      filter: {},
      sortBy: {
        field: 'name',
      },
    };
  }

  handleFilter(filter) {
    this.setState({ filter });
  }

  handleSort(field) {
    this.setState({ sortBy: field });
  }

  render() {
    const { repositories } = this.props;
    const { filter } = this.state;

    const languages = repositories.map(r => r.language);
    const distinctLanguages = languages.filter((lang, i) => languages.indexOf(lang) === i)
    const filteredRepositories = filter.language
      ? repositories.filter(r => r.language === filter.language)
      : repositories;
    const orderedRepositories = filteredRepositories.slice().sort((a, b) => {
      return a[this.state.sortBy.field].toString().localeCompare(b[this.state.sortBy.field].toString());
    });

    const sortableFields = ['name', 'open_issues_count', 'stargazers_count'];

    return (
      <div className="repositories">
        <h1 className="repositories-header">Github Starred Repositories</h1>
        <div className="repositories-header__options">
          <RepositoriesFilter handleFilter={this.handleFilter} languages={distinctLanguages} />
          <div className="repositories-header__sort-wrapper">
            <RepositoriesSort handleSort={this.handleSort} fields={sortableFields} />
          </div>
        </div>
        <div className="repositories__list">
          {orderedRepositories.map((repository, i) => (
            <Repository key={i} repository={repository} />
          ))}
        </div>
      </div>
    );
  }
}

export default Repositories;
