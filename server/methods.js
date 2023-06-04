import { Meteor } from 'meteor/meteor';
import crypto from 'crypto';
import { ProfileCollection } from '/imports/api/profile';
import { getAccountDataAsync } from './services/binanceClient';

export async function syncProfileMethod() {
    try {
        const accountData = await getAccountDataAsync();

         // Fetch only one record from the collection
         const existingRecord = ProfileCollection.findOne({ key: 'accountData' });

         if (existingRecord) {
           // If record exists, update value
           ProfileCollection.update(existingRecord._id, { $set: { value: accountData, dateSync: new Date() } });
         } else {
           // If record not exists, insert new
           ProfileCollection.insert({ key: 'accountData', value: accountData, dateSync: new Date() });
         }

        return accountData
    } catch (error) {
        throw new Meteor.Error('Error:syncProfileMethod', error.message);
    }
}