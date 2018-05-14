import React, { Component } from 'react';
import Repository from '../Repository';
import RepositoriesFilter from '../RepositoriesFilter';

class Repositories extends Component {
  constructor(props) {
    super(props);

    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      filter: {}
    };
  }

  handleFilter(filter) {
    this.setState({ filter });
  }

  render() {
    const { repositories } = this.props;
    const { filter } = this.state;

    const languages = repositories.map(r => r.language);
    const distinctLanguages = languages.filter((lang, i) => languages.indexOf(lang) === i)
    const filteredRepositories = filter.language
      ? repositories.filter(r => r.language === filter.language)
      : repositories;

    return (
      <div>
        <RepositoriesFilter handleFilter={this.handleFilter} languages={distinctLanguages} />
        <div>
          {filteredRepositories.map((repository, i) => (
            <Repository key={i} repository={repository} />
          ))}
        </div>
      </div>
    );
  }
}

export default Repositories;
