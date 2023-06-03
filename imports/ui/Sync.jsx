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
    <div>
      <h2>Profile</h2>
      <button onClick={handleSyncProfile}>Sync Profile</button>
      <span>Error:{""}</span>
    </div>
  );
};
