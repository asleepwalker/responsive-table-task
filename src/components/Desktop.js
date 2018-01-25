import React from 'react';
import { Table } from 'react-data-components';

export default ({ columns, data, onSort, sortBy }) => (
  <div className='table'>
    <Table
      columns={columns}
      dataArray={data}
      keys="id"
      onSort={onSort}
      sortBy={sortBy}
    />
  </div>
);
