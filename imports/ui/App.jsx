import React from 'react';
import { Sync } from './Sync.jsx';
import { Profile } from './Profile.jsx';

export const App = () => (
  <div className='row'>
    <div className='col'>
      <h1>Binance Profile Sync</h1>
      <Sync/>
      <Profile/>
    </div>
  </div>
);
