import React, { useState } from 'react';

function Filter({ name, param }) {
  return (
    <div
      style={{
        margin: '1rem 1rem',
        padding: '0.5rem',
        backgroundColor: '#ff7f5094',
        borderRadius: '1rem'
      }}
    >
      <a href={window.location.href + `&${param}=${name}`}>{name}</a>
    </div>
  );
}

export default Filter;
