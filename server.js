const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to Database
connectDB();

//Init middleware
//app.use(express.json({ extended: false }));
app.use(express.json({ extended: false }), function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // keep this if your api accepts cross-origin requests
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
  );
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/coins', require('./routes/coins'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
