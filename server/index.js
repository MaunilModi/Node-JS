const express = require('express')

const app = express();

app.get('/', (req, res) => {
    res.send("Hello from Home Page");
})

app.get('/about', (req, res) => {
    res.send("Hello from About page" + ' hi ' + req.query.name + '  You are ' + req.query.age)
})

app.listen(8000, () => console.log('Server Started'))
// myServer = http.createServer(app)

// myServer.listen(8000, () => console.log('Server Stated'))