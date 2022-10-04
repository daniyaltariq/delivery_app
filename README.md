# Delivery App Frontend

### Demo Link
Deployed at `https://deliveronline.netlify.app`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

clone the project locally and run `npm i` to install dependencies.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
 
### `To login as Sender`

Sender can track his/her parcels in this dashboard

Emails `sender1@deliver.com`, `sender2@deliver.com`, `sender3@deliver.com`, `sender4@deliver.com`, `sender5@deliver.com`
Passwords `sender1`, `sender2`, `sender3`, `sender4`, `sender5`


### `To login as Dispatcher`

Dispatchers can only move the parcels to `picked up` from `pending` and mark those parcels as `delivered`.

Emails `dispatcher1@deliver.com`, `dispatcher2@deliver.com`, `dispatcher3@deliver.com`, `dispatcher4@deliver.com`, `dispatcher5@deliver.com`
Passwords `dispatcher1`, `dispatcher2`, `dispatcher3`, `dispatcher4`, `dispatcher5`

### `Technologies used`
1. `Tailwind` for CSS
2. `axios` for promise based HTTP client for the browser and node.js
3. `react-router-dom` for routing
4. `uuid` for random uuids for parcels
5. `MUI` for UI components
6. `Redux` or `useContext` can be used to store data as single source of truth but in current scenerio we don't need to use it.
