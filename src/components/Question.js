import React, { useState } from 'react';

function Question({ name }) {
  return (
    <div
      style={{
        margin: '1rem 1rem',
        padding: '0.5rem',
        backgroundColor: 'white',
        borderRadius: '1rem'
      }}
    >
      <p>{name}</p>
    </div>
  );
}

export default Question;
