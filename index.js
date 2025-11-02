const express = require('express');
const cors = require('cors');   // <--- import cors
const app = express();
const flightsRouter = require('./routes/flights');
const passengersRouter = require('./routes/passenger');
const bookingsRouter = require('./routes/bookings');

app.use(cors());  
app.use(express.json());

app.use('/flights', flightsRouter); 
app.use('/passengers', passengersRouter);
app.use('/bookings', bookingsRouter);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
