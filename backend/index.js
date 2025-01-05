const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Ruta pentru înregistrare
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: 'Toate câmpurile sunt obligatorii!' });
    }

    const newUser = { name, email, password };

    fs.readFile('users.json', (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).send({ message: 'Email deja înregistrat!' });
        }

        users.push(newUser);

        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ message: 'Eroare la salvarea datelor!' });
            }
            res.status(200).send({ message: 'Înregistrare reușită!' });
        });
    });
});

// Ruta pentru autentificare
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email și parola sunt obligatorii!' });
    }

    fs.readFile('users.json', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Eroare la citirea datelor!' });
        }

        const users = JSON.parse(data);

        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            return res.status(401).send({ message: 'Email sau parolă incorectă!' });
        }

        res.status(200).send({ message: 'Autentificare reușită!' });
    });
});

// Pornește serverul
app.listen(port, () => {
    console.log(`API-ul rulează pe http://localhost:${port}`);
});
