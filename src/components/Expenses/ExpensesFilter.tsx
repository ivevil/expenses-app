import React from 'react';

import './ExpensesFilter.css';

type FilterOption = {
  id: string;
  title: string;
};

type ExpensesFilterProps = {
  label?: string;
  selected: string;
  placeholder?: string;
  data: FilterOption[];
  onChangeFilter: (value: string) => void;
};

const ExpensesFilter = (props: ExpensesFilterProps) => {
  const dropdownChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>{props.label || 'Filter by'}</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='0'>{props.placeholder || 'All'}</option>
          {props.data.map((item: FilterOption) => (
            <option value={item.title} key={item.id}>{item.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
