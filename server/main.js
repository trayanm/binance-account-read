import { Meteor } from 'meteor/meteor';
import { profilePublish } from './publishes';
import { syncProfileMethod } from './methods';

Meteor.startup(async () => {
  // Check configuration
  checkSettings();

  Meteor.publish("profile", async function () {
    return await profilePublish();
  });

  Meteor.methods({
    syncProfile() {
      syncProfileMethod().then(res => {
        // ...
      }).catch(error => {
        throw new Meteor.Error('Error:syncProfile', error.message);
      });
    },
  });
});

function checkSettings() {
  if (!Meteor.settings.binance) {
    throw new Meteor.Error("Config binance is not set");
  }

  if (!Meteor.settings.binance.apiKey) {
    throw new Meteor.Error("Config binance.ApiKey is not set");
  }

  if (!Meteor.settings.binance.secretKey) {
    throw new Meteor.Error("Config binance.SecretKey is not set");
  }

  // ...
}

