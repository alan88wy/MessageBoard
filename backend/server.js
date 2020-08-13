let express = require('express');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');

let app = express();
let api = express.Router();
let auth = express.Router();

app.use(bodyParser.json());

// app.use(express.static('public'))

let users = [];

let messages = [
  { text: 'Some Text', owner: 'Alan' },
  { text: 'Some Other Text', owner: 'James'},
  { text: 'Another text', owner: 'Jessie'}
];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

api.get('/messages', (req, res) => {
  res.json(messages);
});

api.get('/messages/:user', (req, res) => {
  var user = req.params.user;
  var result = messages.filter(message => message.owner == user)
  res.json(result);
});

api.post('/messages', (req, res) => {
  // console.log('body: ', req.body);
  messages.push(req.body);
  res.json(req.body);
});

auth.post('/register', (req, res) => {

  let index = users.push(req.body) - 1;
  let user = users[index];

  user.id = index;

  let token = jwt.sign(user.id, 'abc123'); // for security reason, you put the secret somewhere else.

  res.json({firstName: user.firstName, token});
});

app.use('/api', api);
app.use('/auth', auth);

app.listen(5000, () => {
  console.info('Listening on port 5000');
});