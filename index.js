var path = require('path'),
    express = require('express'),
    app = express()

app.use(express.static(path.join(__dirname, 'public')));