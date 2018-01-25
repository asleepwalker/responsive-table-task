import React, { Component } from 'react';
import cx from 'classnames';

export default class Mobile extends Component {
  state = {
    openRows: {},
  };

  toggleRow = index => {
    this.setState({
      openRows: {
        ...this.state.openRows,
        [index]: !this.state.openRows[index],
      },
    });
  };

  handleSortBy = event => {
    this.props.onSort({
      prop: event.target.value,
      order: 'ascending',
    });
  };

  renderRow = (row, index) => {
    const { columns } = this.props;
    const isOpen = this.state.openRows[index];
    const hasCollapsibleColumns = columns.some(({ collapsible }) => collapsible);
    const visibleColumns = hasCollapsibleColumns && columns.filter(({ collapsible }) => !collapsible || isOpen);

    return (
      <div className='item' key={index}>
        {visibleColumns.map(column => this.renderCell(column, row[column.prop]))}
        {hasCollapsibleColumns && this.renderDetailsButton(index)}
      </div>
    );
  };

  renderDetailsButton = index => {
    const isOpen = this.state.openRows[index];
    const className = cx('details-btn', { 'hide': isOpen });

    return (
      <span className={className} onClick={e => this.toggleRow(index)}>
        {`${isOpen ? 'Скрыть' : 'Показать'} детали`}
      </span>
    );
  }

  renderCell({ prop, title, render }, value) {
    return (
      <div className='field' key={prop}>
        <div className='title'>
          {title}
        </div>
        <div className='value'>
          {render ? render(value) : value}
        </div>
      </div>
    );
  }

  renderSortBy() {
    const { columns, sortBy } = this.props;

    return (
      <div className='sortBy'>
        <label>Сортировка:</label>
        <select
          defaultValue='none'
          onChange={this.handleSortBy}
          value={sortBy && sortBy.prop}
        >
          {!sortBy && <option key='none' value='none'>не выбрано</option>}
          {columns.map(column => (
            <option key={column.prop} value={column.prop}>
              {column.title}
            </option>
          ))}
        </select>
      </div>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <div className='list'>
        {this.renderSortBy()}
        <div className='items'>
          {data.map(this.renderRow)}
        </div>
      </div>
    );
  }
}
