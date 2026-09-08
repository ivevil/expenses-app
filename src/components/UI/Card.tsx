import React from 'react';

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

const Card = (props: CardProps) => {
  const classes = 'card ' + (props.className ?? '');

  return <div className={classes}>{props.children}</div>;
};

export default Card;
