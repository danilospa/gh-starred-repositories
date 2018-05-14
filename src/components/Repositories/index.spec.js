import React from 'react';
import { shallow } from 'enzyme';
import Repositories from './index';

describe('Repositories Component', () => {
  let component, repositories;

  beforeEach(() => {
    repositories = [
      {
        name: 'first repo',
        language: 'ruby',
        stars: 10,
      },
      {
        name: 'second repo',
        language: 'js',
        stars: 4,
      },
      {
        name: 'third repo',
        language: 'ruby',
        stars: 2,
      },
      {
        name: 'third repo',
        language: 'c',
        stars: 3,
      },
    ];
    component = shallow(<Repositories repositories={repositories} />);
  });

  it('passes distinct languages of repositories to RepositoriesFilter', () => {
    expect(component.find('RepositoriesFilter').props().languages).toEqual(['ruby', 'js', 'c']);
  });

  it('passes handleFilter callback to RepositoriesFilter', () => {
    expect(component.find('RepositoriesFilter').props().handleFilter).toEqual(component.instance().handleFilter);
  });

  it('passes correct repositories ordered to Repository children', () => {
    expect(component.find('Repository').first().props().repository).toEqual(repositories[0]);
    expect(component.find('Repository').at(1).props().repository).toEqual(repositories[1]);
    expect(component.find('Repository').at(2).props().repository).toEqual(repositories[2]);
    expect(component.find('Repository').at(3).props().repository).toEqual(repositories[3]);
  });

  it('passes correct props to Repository children when filtering', () => {
    component.instance().handleFilter({ language: 'js' });
    component.update();
    expect(component.find('Repository').first().props().repository).toEqual(repositories[1]);
  });

  it('passes correct props to Repository children when sorting by string', () => {
    component.instance().handleSort({ field: 'language' });
    component.update();
    expect(component.find('Repository').first().props().repository).toEqual(repositories[3]);
  });

  it('passes correct props to Repository children when sorting by integer', () => {
    component.instance().handleSort({ field: 'stars' });
    component.update();
    expect(component.find('Repository').first().props().repository).toEqual(repositories[2]);
  });
});
