import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ProfileCollection } from '../api/profile';

export const Profile = () => {
  const { profile, loading } = useTracker(() => {
    const handle = Meteor.subscribe('profile');
    const profile = ProfileCollection.findOne({ key: 'accountData' });

    return {
      profile,
      loading: !handle.ready() || !profile,
    };
  });

  useEffect(() => {
    if (!loading && profile) {
      console.log(profile);
    }
  }, [loading, profile]);


  return (
    <div>
      <h2>Profile</h2>
      {profile &&
        <div className='row'>
          <div className='col-12'>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </div>
        </div>
      }
    </div>
  );
};
