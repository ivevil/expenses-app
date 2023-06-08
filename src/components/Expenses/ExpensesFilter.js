import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value="0">Select here</option>
          {props.data.map((item) => {
            return (
              <option value={item.title} key={item.id}>{item.title}</option>
            )
          })}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
