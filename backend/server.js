const express = require('express');
const cors = require('cors');
const connectData = require('./db');

const app = express();
const port =5000;

connectData();
app.use(express.json());
app.use(cors())
app.use('/api/user',require('./routes/userLoginRoute'));
app.use('/api/notes',require('./routes/notesRoute'));

app.listen(port,()=>{
    console.log(`server is running at port ${port} at http://localhost:${port}`);
})