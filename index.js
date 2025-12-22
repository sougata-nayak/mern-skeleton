const express = require('express');
const fs = require('fs');
let users = require('./users.json');
const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // Good Practice: Always use X- to start of a custom header
    res.setHeader('X-dev-name', 'sougata');
    next();
});

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} request received for ${req.url} at ${new Date().toLocaleString()}`)
    fs.appendFile('log.txt', `${req.method} request received for ${req.url} at ${new Date().toLocaleString()}\n`, (err) => {
        if (err) console.log('Error logging request => ', err);
    });
    next()
});

app.get('/', (req, res) => {
    return res.send(`
        <h1>Hello User</h1>
        <p>Welcome to Home page</p>
        `);
});

app.get('/users', (req, res) => {
    return res.send(`
        <h1>Users Page</h1>
        <ul>
            ${users.map(user => '<li>' + user.name + '</li>').join('')}
        </ul>`);
});


app.get('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (user) return res.json(user);
    return res.status(404).json({ 'User not found': parseInt(req.params.id) });
});

app.get('/api/users', (req, res) => {
    return res.json(users);
})
    .post('/api/users', (req, res) => {
        if (!req.body.name) {
            return res.status(400).send("Please send name to add user");
        }
        const newUser = {
            "id": users[users.length - 1].id + 1,
            "name": req.body.name,
            "age": Number(req.body.age)
        };
        users.push(newUser);
        fs.writeFile('./users.json', JSON.stringify(users), (err, data) => {
            if (err) {
                return res.send("Couldn't add user");
            }
            res.statusCode = 201;
            return res.json(users);
        });

    })
    .patch('/api/users', (req, res) => {
        const user = users.find(user => user.id === parseInt(req.body.id));
        // Update values in user
        if (req.body.name) user.name = req.body.name;
        if (req.body.age) user.age = Number(req.body.age);
        fs.writeFile('./users.json', JSON.stringify(users), (err, data) => {
            if (err) {
                return res.send("Couldn't edit user");
            }
            return res.json(users);
        });
    })
    .delete('/api/users', (req, res) => {
        const length = users.length;
        users = users.filter(user => user.id !== Number(req.query.id));
        if (length === users.length) return res.send("User not found")
        fs.writeFile('./users.json', JSON.stringify(users), (err, data) => {
            if (err) {
                return res.send("Couldn't delete user");
            }
            return res.json(users);
        });
    });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))