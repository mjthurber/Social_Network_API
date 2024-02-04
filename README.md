# eCommerce_backend

## eCommerce backend
This is a simple backend repo that uses Express, MongoDB, and Mongoose. It is designed to work with insomnia since there is not frontend yet.

## Setup
Install dependencies:

npm install 

## Run the application:

node server.js

## Usage
The system allows you to perform the following actions as seen in this video, specifically CRUD operations.

## Video Walkthrough
https://drive.google.com/file/d/16gBP_WSzXTXPgX5xTwnSNRQ-cHu1hNQT/view

## Code Overview
index.js: Entry point of the application, prompts the user for actions and invokes corresponding functions. ./config/connection.js: Configuration for MongoDB database connection. ./models: Contains users, thoughts, and a reaction schema, which corresponds to the user model. The different actions are within the controller folder, and they are imported into the api routes folder.

