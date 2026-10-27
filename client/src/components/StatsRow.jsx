import React from 'react';
import Reveal from './Reveal';
import Counter from './Counter';
import { stats } from '../data/content';

const StatsRow = () => (
  <Reveal variant="zoom" className="stats-row">
    {stats.map((stat) => (
      <div className="stat-item" key={stat.label}>
        <strong><Counter value={stat.value} /></strong>
        <span>{stat.label}</span>
      </div>
    ))}
  </Reveal>
);

export default StatsRow;
