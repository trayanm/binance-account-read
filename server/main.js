import { Meteor } from 'meteor/meteor';
import { CryptoJS } from 'meteor/jparker:crypto-hmac';
import crypto from 'crypto';
import { LinksCollection } from '/imports/api/links';
import { ProfileCollection } from '/imports/api/profile';



async function insertLink({ title, url }) {
  console.log({ title, url });
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

function sendAuthenticatedRequest(apiPath) {

  // config
  const apiKey = Meteor.settings.binanceApiKey;
  const secretKey = Meteor.settings.binanceSecretKey;

  const timestamp = new Date().getTime();
  const queryString = `timestamp=${timestamp}`;
  // const signature = CryptoJS.HmacSHA256(queryString, secretKey).toString(CryptoJS.enc.Hex);
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(queryString)
    .digest('hex');

  const requestOptions = {
    headers: { 'X-MBX-APIKEY': apiKey },
  };

  const url = `https://testnet.binance.vision/${apiPath}?${queryString}&signature=${signature}`;

  return fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        console.log("response", response);
        throw new Error('API request failed', response.error);
      }
      return response.json();
    })
    .catch(error => {
      throw new Meteor.Error('api-request-failed', error.message);
    });
}

Meteor.startup(async () => {
  // Check configuration
  if (!Meteor.settings.binanceApiKey) {
    throw new Meteor.Error("Config binanceApiKey is not set");
  }

  if (!Meteor.settings.binanceSecretKey) {
    throw new Meteor.Error("Config binanceSecretKey is not set");
  }

  // If the Links collection is empty, add some data.
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  console.log("settings", Meteor.settings);

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", async function () {

    // await insertLink({
    //   title: 'sumo',
    //   url: 'https://mega_sh.com',
    // });

    return LinksCollection.find();
  });

  Meteor.methods({
    'binance.getAccountData'() {
      try {
        const accountData = sendAuthenticatedRequest('api/v3/account');

        accountData.then(sss => {
          // console.log("accountData", sss);
          // ProfileCollection.insert({ key: 'accountData', value: sss });

          ProfileCollection.upsert({ _id: 'uniqueId' }, { $set: { key: 'accountData', value: sss, dateSync: new Date() } });
        }).catch(error => {
          throw new Error('Database access failed', error.error);
        });


        return accountData;
      } catch (error) {
        throw new Meteor.Error('binance-api-error', error.message);
      }
    },
  });

});
