import React from 'react';
import { shallow } from 'enzyme';
import Repositories from './index';

describe('Repositories Component', () => {
  let component, repositories;

  beforeEach(() => {
    repositories = [
      {
        language: 'ruby',
      },
      {
        language: 'js',
      },
      {
        language: 'ruby',
      },
    ];
    component = shallow(<Repositories repositories={repositories} />);
  });

  it('passes distinct languages of repositories to RepositoriesFilter', () => {
    expect(component.find('RepositoriesFilter').props().languages).toEqual(['ruby', 'js']);
  });

  it('passes handleFilter callback to RepositoriesFilter', () => {
    expect(component.find('RepositoriesFilter').props().handleFilter).toEqual(component.instance().handleFilter);
  });

  it('passes correct props to Repository children', () => {
    expect(component.find('Repository').first().props().repository).toEqual(repositories[0]);
    expect(component.find('Repository').at(1).props().repository).toEqual(repositories[1]);
  });

  it('passes correct props to Repository children when filtering', () => {
    component.instance().handleFilter({ language: 'js' });
    component.update();
    expect(component.find('Repository').first().props().repository).toEqual({ language: 'js' });
  });
});
