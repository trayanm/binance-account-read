import React from 'react';
import { toast } from "react-toastify";

export const Sync = () => {

  // if(isLoading()) {
  //   return <div>Loading...</div>;
  // }

  handleSyncProfile = () =>{
    Meteor.call('syncProfile', (error, result) => {
      if (error) {
        toast.error(error);
        console.error(error);
      } else {
        //this.accountData.set(result);

        // console.log(result);
      }
    });
  };

  return (
    <div className='row'>
      <div className='col-12'>
      <button onClick={handleSyncProfile} className='btn btn-primary'>Sync Profile</button>
      </div>        
    </div>
  );
};
