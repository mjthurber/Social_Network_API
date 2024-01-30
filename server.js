const express = require('express');
const db = require('./config/connection');
// Require model
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const activity = cwd.includes('CHALLENGES_AND_PROJECTS')
  ? cwd.split('CHALLENGES_AND_PROJECTS')[1]
  : cwd;

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running ${activity} on port ${PORT}!`);
  });
});
