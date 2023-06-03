import { Meteor } from 'meteor/meteor';
import crypto from 'crypto';
import { ProfileCollection } from '/imports/api/profile';
import { getAccountDataAsync } from './services/binanceClient';

export async function syncProfileMethod() {
    try {
        const accountData = await getAccountDataAsync();

        ProfileCollection.upsert({ _id: 'uniqueId' }, { $set: { key: 'accountData', value: accountData, dateSync: new Date() } });

        return accountData
    } catch (error) {
        throw new Meteor.Error('Error:syncProfileMethod', error.message);
    }
}