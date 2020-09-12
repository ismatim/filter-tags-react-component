import React, { useState } from 'react';
import Reset from './components/Buttons/Reset.js';
import Filter from './components/Buttons/Filter.js';
import Question from './components/Question.js';
import './App.css';

const data = [
  {
    title: 'a hard interview question',
    tags: ['sql', 'probability', 'modelling'],
    companies: ['facebook', 'linkedin', 'netflix'],
    positions: ['software engineer', 'Business Analyst', 'Data Scientist']
  },
  {
    title: 'hard question to solve',
    tags: ['sql', 'probability', 'statistics'],
    companies: ['facebook', 'linkedin', 'amazon' ],
    positions: [
      'software engineer',
      'marketing Analyst',
      'Data Scientist',
      'ML Engineer'
    ]
  },
  {
    title: 'easy question to solve',
    tags: ['sql', 'probability', 'statistics'],
    companies: ['facebook', 'linkedin', 'amazon', 'google'],
    positions: [
      'software engineer',
      'marketing Analyst',
      'Data Scientist',
      'ML Engineer'
    ]
  }
];

// TODO: render position and companies with filter
// <11-09-20, yourname> //
//
const coSet = new Set();
const posSet = new Set();
const getFiltersButtons = () => {
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

const filters = getFiltersButtons();

const filterQuestionsByTitle = data => question => {
  if(question.length===0)
    return data;

  let result = data.filter(q => q.title.includes(question));

  return result;
};

const filterQuestionsByCompanies = data => co => {
  if(co.length===0)
    return data;

  let result = data.filter(q => {
    let hasCompanies = q.companies.some(cq => co.some(c => c === cq));

    return hasCompanies;
  });
  return result;
};

const filterQuestionsByPositions = data => pos => {
  if(pos.length===0)
    return data;

  let result = data.filter(q => {
    let hasPositions = q.positions.some(pq => pos.some(p => p === pq));

    return hasPositions ;
  });
  return result;
};

const filterQuestions = (qTitle, co, pos) => {
  let resultByTitles = filterQuestionsByTitle(data)(qTitle);
  let resultByTitlesAndCompanies = filterQuestionsByCompanies(resultByTitles)(
    Array.from(co)
  );
  let resultByTitlesAndCompaniesAndPositions = filterQuestionsByPositions(
    resultByTitlesAndCompanies
  )(Array.from(pos));

  console.log('resultByTitlesAndCompanies', resultByTitlesAndCompanies);
  console.log(
    'resultByTitlesAndCompaniesAndPositions ',
    resultByTitlesAndCompaniesAndPositions
  );

  return resultByTitlesAndCompaniesAndPositions;
};

function App() {
  var searchParams = new URLSearchParams(window.location.href);
  let pos = new Set();
  let co = new Set();
  let qTitle = '';
  searchParams.forEach(function(value, key) {
    if (key === 'pos') pos.add(value);
    if (key === 'co') co.add(value);
    if (key === window.location.origin + '/?q') qTitle = value;
  });

  console.log('q', qTitle);
  console.log('co', co);
  console.log('pos', pos);

  let questions = filterQuestions(qTitle, co, pos);

  return (
    <article className="App">
      <section
        style={{ margin: '4%', display: 'flex', alignItems: 'baseline' }}
      >
        <div
          style={{
            display: 'flex',
            width: '90%',
            flexWrap: 'wrap',
            justifyContent: 'start-between'
          }}
        >
          {filters.map(f => {
            return (
              <Filter name={f} param={coSet.has(f) ? 'co' : 'pos'}></Filter>
            );
          })}
        </div>
        <Reset></Reset>
      </section>
      <section>
        {questions.map(q => {
          return <Question name={q.title}></Question>;
        })}
      </section>
    </article>
  );
}

export default App;
