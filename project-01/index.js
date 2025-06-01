const express = require('express');
let users = require('./MOCK_DATA.json')
const fs = require('fs');
const { json } = require('stream/consumers');

const PORT = 8000
const app = express();

// Middleware - Pludgin
app.use(express.urlencoded({extended:false}))

app.use((req, res, next) => {
    // console.log('Hello From Middleware 1');
    // // return res.json({msg: 'Hello From Middleware 1'});  // ending request here and return response
    // next(); // my work is done and call next

    fs.appendFile('log.txt', `${Date.now()} : ${req.method}`, (err, result) => {
        next();
    });
});

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li> ${user.first_name} </li>`).join("")}
    </ul>
    `
    return res.send(html);
})

app.get('/api/users', (req, res) => {
    res.setHeader('myName', 'Maunil Modi');
    return res.json(users);
});


app.post('/api/users', (req, res) => {
    // TODO: create new user
    const data = req.body

    if(!data.first_name || !data.last_name || !data.email || !data.gender || !data.job_title){
        return res.status(400).json({msg : 'All Fields are req...'});
    }
    users.push({id: users.length + 1, ...data})
    fs.writeFile('./Mock_DATA.json', JSON.stringify(users), (err, result) => {
        return res.status(201).json({status: "Success", id: users.length})
    })
});

// for same paths
app
.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.filter((user) => user.id === id);

    if(user.length === 0)
        return res.status(404).json({error: `Not Found data with id: ${id}`});

    return res.json(user);
})
.patch((req, res) => {})
.delete((req, res) => {
    const id = Number(req.params.id);
    users = users.filter((user) => user.id != id);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, result) => {
        return res.json(users);
    });
})

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))