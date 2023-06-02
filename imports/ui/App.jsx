import React from 'react';
import { Hello } from './Hello.jsx';
import { Profile } from './Profile.jsx';
import { Info } from './Info.jsx';

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello/>
    <Profile/>
    <Info/>
  </div>
);
