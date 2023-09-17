import React from 'react';
import './Card.css';

type CardProps = {
  name: string,
  url: string
}

export const Card = ({name, url}: CardProps) => {
  return (
    <div className="Card">
      <a href={url}>{name}</a>
    </div>
  );
}