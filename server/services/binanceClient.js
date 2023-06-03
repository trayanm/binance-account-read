import crypto from 'crypto';

export async function getAccountDataAsync() {
  try {
    const timestamp = new Date().getTime();
    const queryString = `timestamp=${timestamp}`;

    const signature = crypto
      .createHmac('sha256', Meteor.settings.binance.secretKey)
      .update(queryString)
      .digest('hex');

    const requestOptions = {
      headers: { 'X-MBX-APIKEY': Meteor.settings.binance.apiKey },
    };

    const url = `${Meteor.settings.binance.baseUrl}${Meteor.settings.binance.endpoints.getAccountData}?${queryString}&signature=${signature}`

    const response = await fetch(url, requestOptions);
    const jsonData = await response.json();

    if (response.ok) {
      return jsonData;
    }
    else {
      throw new Error(jsonData.msg ?? "Unknown error while processing binance API");
    }

  } catch (error) {
    throw new Meteor.Error('Error:getAccountDataAsync', error.message);
  }
}