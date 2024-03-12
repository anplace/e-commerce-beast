const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


//Mycode
// Sync Sequelize models to the MySQL database on server start
sequelize.sync({ force: false }) // Set force to true to drop tables and recreate them (use with caution in production)
  .then(() => {
    console.log('Sequelize models synced to the database');
    // Start the server after syncing
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error('Error syncing Sequelize models:', error);
  });
