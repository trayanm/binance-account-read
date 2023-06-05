import React from 'react';

export const Sync = () => {

  handleSyncProfile = () =>{
    Meteor.call('syncProfile', (error, result) => {});
  };

  return (
    <div className='row'>
      <div className='col-12'>
      <button onClick={handleSyncProfile} className='btn btn-primary'>Sync Profile</button>
      </div>        
    </div>
  );
};
