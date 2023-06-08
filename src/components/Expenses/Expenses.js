import React, { useState } from 'react';

import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesChart from './ExpensesChart';
import './Expenses.css';

const DATA =
{
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

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('0');
  const [filteredMonth, setFilteredMonth] = useState('0');
  const [data] = useState(DATA);

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filterMonthChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };

  const filteredExpenses = props.items.filter((expense) => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (filteredYear !== "0" && filteredMonth !== "0") {
      return expense.date.getFullYear().toString() === filteredYear && month[expense.date.getMonth()] === filteredMonth;
    }
    if (filteredYear !== "0" && filteredMonth === "0") {
      return expense.date.getFullYear().toString() === filteredYear;
    }
    if (filteredMonth !== "0" && filteredYear === "0") {
      return month[expense.date.getMonth()] === filteredMonth;
    }
    return null;

  });

  let expensesContent = <p className="empty-label">No expenses found.</p>;

  if (filteredExpenses.length > 0) {
    expensesContent = filteredExpenses.map((expense) => (
      <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
      />
    ));
  }

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
          data={data.years}
        />
        <ExpensesFilter
          selected={filteredMonth}
          onChangeFilter={filterMonthChangeHandler}
          data={data.months}
        />
        <ExpensesChart expenses={filteredExpenses} />
        {expensesContent}
      </Card>
    </div>
  );
};

export default Expenses;
