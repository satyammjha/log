const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const ddosLoginModel = require('./models/LoginData');
const Details = require('./models/Details');
require('dotenv').config();

const PORT = 3001;
const MONGO_URI = "mongodb+srv://satyammjha0:zjQMYG2gqOszfDYz@cluster0.bqjw3mz.mongodb.net/ddos?retryWrites=true&w=majority&appName=Cluster0"

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    ddosLoginModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered")
            }
            else {
                ddosLoginModel.create(req.body)
                    .then(log_reg_form => res.json(log_reg_form))
                    .catch(err => res.json(err))
            }
        })

})
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    ddosLoginModel.findOne({ email: email })
        .then(user => {
            if (user) {

                if (user.password === password) {
                    res.json("Success");
                }
                else {
                    res.json("Wrong password");
                }
            }
            else {
                res.json("No records found! ");
            }
        })
})
app.get('/details', async (req, res) => {
    try {
        const users = await Details.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.listen(PORT, () => {
    console.log(`Server listining on http://127.0.0.1:${PORT}`);

})