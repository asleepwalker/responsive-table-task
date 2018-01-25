import React, { Component } from 'react';
import Responsive from 'react-responsive';
import { orderBy } from 'lodash';

import Desktop from './Desktop';
import Mobile from './Mobile';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    fetch('/data.json')
      .then(res => res.json())
      .then(this.applyModifiers)
      .then(data => this.setState(data));
  }

  applyModifiers(data) {
    const columns = data.columns.map(column => {
      const modifications = {}
      if (column.html) {
        modifications.render = value =>
          <div dangerouslySetInnerHTML={{__html: value }} />;
      }
      return { ...column, ...modifications };
    });
    return { ...data, columns };
  }

  handleSort = sortBy => {
    const { prop, order } = sortBy;
    this.setState({
      data: orderBy(
        this.state.data,
        prop,
        order === 'descending' ? 'desc' : 'asc',
      ),
      sortBy,
    });
  };

  renderDesktop(props) {
    return (
      <Responsive minWidth={768}>
        <Desktop {...props} />
      </Responsive>
    );
  }

  renderMobile(props) {
    return (
      <Responsive maxWidth={767}>
        <Mobile {...props} />
      </Responsive>
    );
  }

  render() {
    const { columns, data, sortBy } = this.state;

    if (!columns || !data) {
      return null;
    }

    const dataProps = {
      columns,
      data,
      onSort: this.handleSort,
      sortBy,
    };

    return (
      <div className="App">
        {this.renderDesktop(dataProps)}
        {this.renderMobile(dataProps)}
      </div>
    );
  }
}
