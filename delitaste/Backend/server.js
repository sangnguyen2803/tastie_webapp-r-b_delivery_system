const express = require('express');

const app = express();

//Init Middleware
app.use(express.json({ extended: false}));

app.get('/', (req, res) => res.send('API running'));

//Define Routes
app.use('/api/v1/users', require('./routes/api/users'));


const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));