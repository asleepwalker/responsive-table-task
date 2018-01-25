import React from 'react';

export const applyModifiers = data => {
  const columns = data.columns.map(column => {
    const modifications = {}
    if (column.html) {
      modifications.render = value =>
        <div dangerouslySetInnerHTML={{__html: value }} />;
    }
    return { ...column, ...modifications };
  });
  return { ...data, columns };
};
