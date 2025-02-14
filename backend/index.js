const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const databaseConfig = require('./helper/dbConfig');
const cors = require('cors');
const userRouter = require('./routes/UserRoutes')
const postRoutes = require('./routes/postRoutes');

// config
dotenv.config();

databaseConfig();
const PORT = process.env.PORT || 5000;

const app = express()
app.use(cors());
app.use(bodyParser.json())

// app.use('/v1/api/', userRoutes)
app.use('/api/v1/users', userRouter )
app.use('/api/v1/posts', postRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`✅ Listening on PORT ${PORT}`);
  }
});

module.exports = app;