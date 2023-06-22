const express = require('express');
const formRoute = require('./routes/formRoute');
const { errorHanlder } = require('./middleware/errorMiddleware');

require('dotenv').config();
const app = express();
app.use(express.json());
// home url check
app.get('/', (req, res) => {
    res.send('Lead oqvest api working fine...');
});
app.use('/api/v1', formRoute);
app.use(errorHanlder);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});










// app.use((req, res, next)=>{
//     const err = new Error("Not found");
//     err.status = 404;
//     next(err);
// });

// app.use((err, req, res, next)=>{
//     if(err.isJoi) err.status = 422;
//     return res
//     .status(err.status || 500)
//     .send({
//         error: {
//             status : err.status || 500,
//             message : err.message
//         }
//     });
// })