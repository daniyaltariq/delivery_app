# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

clone the project locally and run `npm i` to install dependencies.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `To login as seller`

use the account email: `admin@admin.com` and password: `admin`

there you can see the the parcels added by this user.

### `To login as dispatcher`

use one these accounts

email: `dispatcher1@deliver.com`, `dispatcher2@deliver.com`
passwords: `dispatcher1`, `dispatcher2`

dispatchers can only move the parcels to picked up and mark those parcels as delivered.


### `Technologies used`
1. `Tailwind` for CSS
2. `axios` for promise based HTTP client for the browser and node.js
3. `react-router-dom` for routing
4. `uuid` for random uuids for parcels
5. `MUI` for UI components
6. `Redux` or `useContext` can be used to store data as single source of truth but in current scenerio we don't need to use it.

