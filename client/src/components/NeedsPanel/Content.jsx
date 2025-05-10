import React from 'react';
import getIconColor from './IconColor.jsx';
import ProgressBar from './ProgressBar.jsx';

const needs = [
  { name: 'Hunger', value: 100 },
  { name: 'Health', value: 100 },
  { name: 'Energy', value: 100 },
  { name: 'Hygiene', value: 100 },
  { name: 'Bladder', value: 100 },
];

// TODO: This is a identifiers for the objects for categories. Depending on the category, show different icons to display in the inventory.
const objects = ['pills', 'products', 'documents', 'cash'];

const Content1 = () => (
  <ul className='flex flex-col m-auto justify-center gap-10'>
    {needs.map(({ name, value }) => (
      <div className='flex flex-col items-center' key={name}>
        {getIconColor(name, value)}
        <li>
          {name} <ProgressBar value={value} need={name} />
        </li>
      </div>
    ))}
  </ul>
);

// TODO: Create logic for the second content
const Content2 = () => <div></div>;

export default { Content1 };
