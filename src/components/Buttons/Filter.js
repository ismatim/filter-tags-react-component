import React from 'react';

function Filter({ paramName, value, active, params}) {
  const clickHandler = e => {
    e.preventDefault();
    let newSearchParamsToFilter;
    let result;

    if (params.has(value)) {
      newSearchParamsToFilter = [...params]
        .filter(s => s !== value)
        .join();
    } else {
      newSearchParamsToFilter = [...params, value].join();
    }

    let newParamsUrl = `${paramName}=${newSearchParamsToFilter.replace(/ /g, '+')}`;

    let newUrl = window.location.href
      .split('&')
      .filter(p => !p.includes(`${paramName}=`));

    newUrl.push(newParamsUrl);

    result = newUrl.join('&');
    window.location = result;
  };

  return (
    <button
      className={`filter sky ${active ? 'filter-active' : ''}`}
      onClick={clickHandler}
    >
      {value}
    </button>
  );
}

export default Filter;
