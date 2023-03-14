const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
const mongoUrl = 'mongodb+srv://vinh:123123aA@cluster0.uojtt91.mongodb.net/?retryWrites=true&w=majority';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "daljda;slkfpqwe'a]],';asdikqww]ta";
mongoose.connect(mongoUrl);

const User = require('./userDetails');
const User2 = mongoose.model('UserInfo');
app.post('/register', async (req, res) => {
	let email2 = req.body.email2;
	let password2 = req.body.password2;
	const encryptedPassword = await bcrypt.hash(password2, 10);
	try {
		const oldUser = await User2.findOne({ email2 });
		if (oldUser) {
			res.send({ status: 'User Exists' });
		}
		const user = new User({
			email: email2,
			password: encryptedPassword,
		});
		user.save();
		res.send({ status: 'sucess' });
	} catch (error) {
		console.log(error);
		res.send({ status: 'failed' });
	}
});

app.post('/login-user', async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	const user = await User2.findOne({ email });
	if (!user) {
		return res.json({ status: 'User Not Found' });
	}
	if (await bcrypt.compare(password, user.password)) {
		const token = jwt.sign({ email: user.email }, JWT_SECRET);
		if (res.status(201)) {
			return res.json({ status: 'sucess', data: token });
		} else {
			return res.json({ status: 'failed' });
		}
	}
	res.json({ status: 'failed', error: 'Invalid Password' });
});

app.post('/userData', async (req, res) => {
	const token = req.body.token;
	try {
		const user = jwt.verify(token, JWT_SECRET);
		const useremail = user.email;
		User2.findOne({ email: useremail })
			.then((data) => {
				res.send({ status: 'sucess', data: data });
			})
			.catch((error) => {
				res.send({ status: 'failed', data: error });
			});
	} catch (error) {
		console.log(error);
	}
});

app.get('/', async (req, res) => {
	res.json({ url: 'api 1: .../login-user , api 2: .../register , api 3: .../userData' });
});

app.listen(80, () => {
	console.log('Server Started');
});
