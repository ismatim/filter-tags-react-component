import React from 'react';

function Reset() {
  const clickHandler = () => {
    window.location = '/';
  };

  return (
    <button
      onClick={clickHandler}
      className="btn-reset"
    >reset</button>
  );
}

export default Reset;
