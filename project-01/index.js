const express = require('express');
let users = require('./MOCK_DATA.json')
const fs = require('fs');
const { json } = require('stream/consumers');

const PORT = 8000
const app = express();

// Middleware - Pludgin
app.use(express.urlencoded({extended:false}))

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li> ${user.first_name} </li>`).join("")}
    </ul>
    `
    return res.send(html);
})

app.get('/api/users', (req, res) => {
    return res.json(users);
})
// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const data = users.filter((user) => user.id === id);

//     return res.json(data);
// });

// app.patch('/api/users/:id', (req, res) => {
//     // TODO: update user with id
//     return res.json({status: "Panding"})
// });

// app.delete('/api/users:id', (req, res) => {
//     // TODO: delete user with id
//     return res.json({status: "Panding"})
// });

app.post('/api/users', (req, res) => {
    // TODO: create new user
    const data = req.body
    // console.log(data);

    users.push({id: users.length + 1, ...data})
    fs.writeFile('./Mock_DATA.json', JSON.stringify(users), (err, result) => {
        return res.json({status: "Success", id: users.length})
    })
    // return res.json({status: "Panding"})
});

// for same paths
app
.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.filter((user) => user.id === id);
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