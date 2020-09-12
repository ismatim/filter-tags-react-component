import React from 'react';

function Question({ name }) {
  return (
    <div className="question">
      <button className="btn-question">{name}</button>
    </div>
  );
}

export default Question;
