import React, { useState } from 'react';

import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesChart from './ExpensesChart';
import './Expenses.css';

type Expense = {
  id: string;
  title: string;
  amount: number;
  date: Date;
};

type DataOption = {
  id: string;
  title: string;
};

type ExpensesProps = {
  items: Expense[];
};

const DATA: { years: DataOption[]; months: DataOption[] } = {
  "years": [
    {
      id: 'y1',
      title: '2023',
    },
    {
      id: 'y2',
      title: '2022',
    },
    {
      id: 'y3',
      title: '2021',
    },
    {
      id: 'y4',
      title: '2020',
    },
    {
      id: 'y5',
      title: '2019',
    }
  ],
  "months": [
    {
      id: 'm1',
      title: 'January',
    },
    {
      id: 'm2',
      title: 'February',
    },
    {
      id: 'm3',
      title: 'March',
    },
    {
      id: 'm4',
      title: 'April',
    },
    {
      id: 'm5',
      title: 'May',
    },
    {
      id: 'm6',
      title: 'June',
    },
    {
      id: 'm7',
      title: 'July',
    },
    {
      id: 'm8',
      title: 'August',
    },
    {
      id: 'm9',
      title: 'September',
    },
    {
      id: 'm10',
      title: 'October',
    },
    {
      id: 'm11',
      title: 'November',
    },
    {
      id: 'm12',
      title: 'December',
    }
  ]
};

const Expenses = (props: ExpensesProps) => {
  const [filteredYear, setFilteredYear] = useState<string>('0');
  const [filteredMonth, setFilteredMonth] = useState<string>('0');
  const [data] = useState(DATA);

  const availableYears = [...new Set(props.items.map((expense) => expense.date.getFullYear()))].sort((a: number, b: number) => b - a);
  const yearOptions: DataOption[] = availableYears.map((year) => ({ id: `year-${year}`, title: String(year) }));
  const monthOptions: DataOption[] = data.months.map((month) => ({ ...month }));

  const filterChangeHandler = (selectedYear: string) => {
    setFilteredYear(selectedYear);
  };

  const filterMonthChangeHandler = (selectedMonth: string) => {
    setFilteredMonth(selectedMonth);
  };

  const resetFilters = () => {
    setFilteredYear('0');
    setFilteredMonth('0');
  };

  const filteredExpenses = props.items.filter((expense: Expense) => {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (filteredYear !== '0' && filteredMonth !== '0') {
      return expense.date.getFullYear().toString() === filteredYear && month[expense.date.getMonth()] === filteredMonth;
    }
    if (filteredYear !== '0' && filteredMonth === '0') {
      return expense.date.getFullYear().toString() === filteredYear;
    }
    if (filteredMonth !== '0' && filteredYear === '0') {
      return month[expense.date.getMonth()] === filteredMonth;
    }

    return true;
  });

  const totalSpent = filteredExpenses.reduce((sum: number, expense: Expense) => sum + expense.amount, 0);

  let expensesContent: React.ReactNode = (
    <p className='empty-label'>No expenses found for the selected filters. Try resetting the filters or adding a new item.</p>
  );

  if (filteredExpenses.length > 0) {
    expensesContent = filteredExpenses.map((expense: Expense) => (
      <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
      />
    ));
  }

  const activeFilterLabel =
    filteredYear !== '0' || filteredMonth !== '0'
      ? `${filteredYear !== '0' ? filteredYear : 'All years'} • ${filteredMonth !== '0' ? filteredMonth : 'All months'}`
      : 'All time';

  return (
    <div>
      <Card className='expenses'>
        <div className='expenses-header'>
          <div>
            <p className='expenses-header__eyebrow'>Expense tracker</p>
            <h3>{activeFilterLabel}</h3>
          </div>
          <div className='expenses-header__meta'>
            <span>{filteredExpenses.length} items</span>
            <strong>${totalSpent.toFixed(2)}</strong>
          </div>
        </div>

        <div className='expenses-filters'>
          <ExpensesFilter
            label='Year'
            selected={filteredYear}
            onChangeFilter={filterChangeHandler}
            data={yearOptions}
            placeholder='Select year'
          />
          <ExpensesFilter
            label='Month'
            selected={filteredMonth}
            onChangeFilter={filterMonthChangeHandler}
            data={monthOptions}
            placeholder='Select month'
          />
          {(filteredYear !== '0' || filteredMonth !== '0') && (
            <button type='button' className='reset-button' onClick={resetFilters}>
              Reset filters
            </button>
          )}
        </div>

        <ExpensesChart expenses={filteredExpenses} />
        {expensesContent}
      </Card>
    </div>
  );
};

export default Expenses;
