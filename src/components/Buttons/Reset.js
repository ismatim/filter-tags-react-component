import React, { useState } from 'react';

function Reset() {
  const clickHandler = () => {
    window.location = '/';
  };

  return (
    <input
      onClick={clickHandler}
      style={{
        padding: '1rem',
        margin: '0 2rem',
        width: '6rem',
        height: '0.5rem',
        textAlign: 'center',
        '&:hover': { backgroundColor: 'red;' }
      }}
      value="reset"
    />
  );
}

export default Reset;
