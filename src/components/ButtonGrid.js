import React from 'react';
import './ButtonGrid.css';

export default function ButtonGrid(props) {
  return <div className='button-grid'>{props.children}</div>;
}
