const express = require('express');
const formRoute = require('./routes/formRoute');
const { errorHanlder } = require('./middleware/errorMiddleware');
require('dotenv').config();
const PORT = 5001;
const app = express();
app.use(express.json());
// home url check
app.get('/', (req, res) => {
    res.send('Lead oqvest api working fine...');
});
app.use('/api/v1', formRoute);
app.use(errorHanlder);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
