import React, { useEffect, useState } from 'react';
import Reset from './components/Buttons/Reset.js';
import Filter from './components/Buttons/Filter.js';
import Question from './components/Question.js';
import fakeData from './data/fake-data.js';

const getFiltersButtons = data => (coSet, posSet) => {
  data.forEach(q => {
    q.companies.forEach(c => {
      coSet.add(c);
    });
    q.positions.forEach(p => {
      posSet.add(p);
    });
  });
  return Array.from([...coSet, ...posSet]);
};

const filterQuestionsByTitle = data => question => {
  if (question.length === 0) return data;

  let result = data.filter(q => q.title.includes(question));

  return result;
};

const filterQuestionsByCompanies = data => co => {
  if (co.length === 0) return data;

  let result = data.filter(q => {
    let hasCompanies = co.every(c => q.companies.some(cq => cq === c));

    return hasCompanies;
  });

  return result;
};

const filterQuestionsByPositions = data => pos => {
  if (pos.length === 0) return data;

  let result = data.filter(q => {
    let hasPositions = pos.every(p => q.positions.some(pq => pq === p));

    return hasPositions;
  });

  return result;
};

const filterQuestions = data => (qTitle, co, pos) => {
  let resultByTitles = filterQuestionsByTitle(data)(qTitle);
  let resultByTitlesAndCompanies = filterQuestionsByCompanies(resultByTitles)(
    Array.from(co)
  );
  let resultByTitlesAndCompaniesAndPositions = filterQuestionsByPositions(
    resultByTitlesAndCompanies
  )(Array.from(pos));

  return resultByTitlesAndCompaniesAndPositions;
};

function App() {
  const [data, setData] = useState();
  let searchParams = new URLSearchParams(window.location.href);
  let coSet = new Set();
  let posSet = new Set();
  let pos = new Set();
  let co = new Set();
  let qTitle = '';

  searchParams.forEach(function(value, key) {
    //multiple options are comma separated
    if (key === 'pos') {
      let posSearched = value.split(',');
      if (posSearched[0] !== '') posSearched.forEach(p => pos.add(p));
    }
    if (key === 'co') {
      let cosSearched = value.split(',');
      if (cosSearched[0] !== '') cosSearched.forEach(c => co.add(c));
    }
    if (key === window.location.origin + '/?q') qTitle = value;
  });

  useEffect(() => {
    function getData() {
      let callServer = Promise.resolve(fakeData);
      callServer.then(function(data) {
        setData(data);
      });
    }
    getData();
  }, []);

  if (!data) return 'loading..';

  let questions = filterQuestions(data)(qTitle, co, pos);
  let filters = getFiltersButtons(data)(coSet, posSet);

  return (
    <article className="App">
      <h1 style={{ textAlign: 'left', marginLeft: '4%' }}>Query Questions</h1>
      <section className="section-filters">
        <div
          style={{
            display: 'flex',
            width: '90%',
            flexWrap: 'wrap',
            justifyContent: 'start-between'
          }}
        >
          {filters.map((f, i) => {
            return (
              <Filter
                key={i}
                paramName={coSet.has(f) ? 'co' : 'pos'}
                value={f}
                params={coSet.has(f) ? co : pos}
                active={co.has(f) || pos.has(f)}
              ></Filter>
            );
          })}
        </div>
        <Reset></Reset>
      </section>
      <section className="section-questions">
        {questions.map((q, i) => {
          return <Question key={i} name={q.title}></Question>;
        })}
      </section>
    </article>
  );
}

export default App;
