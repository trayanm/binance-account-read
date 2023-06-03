# Overview
The objective of this project is to showcase the practical application of `meteor`. The project highlights the following key concepts:
- `methods` - remote functions that `meteor` clients can invoke with `Meteor.call`
- `publish` and `subscribe` - `meteor` servers publish sets of records, allowing clients to subscribe to these sets
- settings - set a `settings.json` structure to handle app configuration and settings

# Tech stack
- meteor
- Node.js version >= 10 and <= 14
- react 18.2.0

# Using NVM to handle Node.js version
You can handle different Node.js version with `nvm`.

- Install Node.js version 12 (or other version >= 10 and <= 14)
```
nvm install 12
```

- set the current version of Node.js to 12
```
nvm use 12
```

- confirm the usage of Node.js. 
```
node -v
```
You should se something like `v12.22.12`

# Settings
Create a file with name `settings.json` with the following content and configuration:
```js
{
    "binanceApiKey": "YOUR_BINANCE_API_KEY", // your binance API key, that is obtained via
    "binanceSecretKey": "YOUR_BINANCE_SECRET_KEY"
}
```


# Running the application

- install dependencies
```
meteor npm install
```

- Run the application
```
meteor run --settings settings.json
```
