import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ProfileCollection } from '../api/profile';

export const Profile = () => {
  const isLoading = useSubscribe('profile');
  const profile = useFind(() => ProfileCollection.find());

  if(isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <pre>{JSON.stringify(profile)}</pre>
    </div>
  );
};
