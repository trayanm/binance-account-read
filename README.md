# Overview
The objective of this project is to demonstrate a practical application of `meteor`. The project highlights the following key concepts:
- `methods` - remote functions that `meteor` clients can invoke with `Meteor.call`
- `publish` and `subscribe` - `meteor` servers publish sets of records, allowing clients to subscribe to these sets
- settings - set custom configuration structure in `settings-dev.json`
- testing - simple test environment with `mocha`

# Before you start
Obtain API key and Secret key from https://testnet.binance.vision

# Tech stack
- meteor 2.12
- Node.js version >= 10 and <= 14
- react 18.2.0

# Using NVM to handle Node.js versions
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
You should see something like `v12.22.12`

# Settings
Create a file with name `settings-dev.json` with the following content and configuration:
```js
{
    "binance": {
        "baseUrl": "https://testnet.binance.vision",
        "apiKey": "YOUR_BINANCE_API_KEY",
        "secretKey": "YOUR_BINANCE_SECRET_KEY",
        "endpoints": {
            "getAccountData": "/api/v3/account"
        }
    }
}
```

# Running on dev environment

- Set the necessary settings in file `settings-dev.json`

-  Install dependencies
```
meteor npm install
```

-  Run the application
```
meteor run --settings settings-dev.json
```

# Running tests
- To execute the tests, run the following command
```
meteor test --driver-package meteortesting:mocha
```

# Running with Docker

- Update `docker-compose.yml` with Meteor settings in `environment` variable `METEOR_SETTINGS`. The value of this variable should be `JSON.stringify(...)` of the file `settings-dev.json`.
```yaml
# ...
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '80:3000'
    depends_on:
      - mongo
    environment:
      ROOT_URL: ${APP_ROOT_URL:-http://localhost}
      MONGO_URL: mongodb://mongo:27017/meteor
      METEOR_SETTINGS: '{"binance":{"baseUrl":"https://testnet.binance.vision","apiKey":"YOUR_BINANCE_API_KEY","secretKey":"YOUR_BINANCE_SECRET_KEY","endpoints":{"getAccountData":"/api/v3/account"}}}'
      PORT: 3000
# ...
```

- Build docker compose
```
docker-compose build
```

- Run docker compose
```
docker-compose up
```

- To open the docker web application, navigate to http://localhost
