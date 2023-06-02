import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ProfileCollection } from '../api/profile';

export const Profile = () => {
  // if(isLoading()) {
  //   return <div>Loading...</div>;
  // }

  handleGetProfile = () =>{
    Meteor.call('binance.getAccountData', (error, result) => {
      if (error) {
        console.error(error);
      } else {
        //this.accountData.set(result);

        console.log(result);
      }
    });
  };

  return (
    <div>
      <h2>Profile!</h2>
      <button onClick={handleGetProfile}>Get Profile</button>
    </div>
  );
};
