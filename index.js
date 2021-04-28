
require('dotenv').config();
const express = require('express')
const app = express()
const indexRouter = require('./routes/index')

app.use("/api", indexRouter);
app.use(express.json());

app.use('/', express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000)

