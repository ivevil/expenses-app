import React from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

type ExpenseData = {
  title: string;
  amount: number;
  date: Date;
};

type NewExpenseProps = {
  onAddExpense: (expense: ExpenseData & { id: string }) => void;
  onCancelExpense: () => void;
};

const NewExpense = (props: NewExpenseProps) => {
  const saveExpenseDataHandler = (enteredExpenseData: ExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
  };

  return (
    <div className='new-expense'>
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancelExpense={props.onCancelExpense} />
    </div>
  );
};

export default NewExpense;
