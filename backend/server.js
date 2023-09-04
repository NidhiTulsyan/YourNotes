const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectData = require('./db');
// const port = process.env.PORT || 5000;

const app = express();
const port = process.env.PORT;

connectData();
app.use(express.json());
app.use(cors())
app.use('/api/user',require('./routes/userLoginRoute'));
app.use('/api/notes',require('./routes/notesRoute'));

app.listen(port,()=>{
    console.log(`server is running at port ${port} at http://localhost:${port}`);
})