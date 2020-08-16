import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

let app = express();
let api = express.Router();
let auth = express.Router();
let PORT = 5000;

app.use(bodyParser.json());

// app.use(express.static('public'))

let users = [];

let messages = [{
    text: 'Some Text',
    owner: 'Alan'
  },
  {
    text: 'Some Other Text',
    owner: 'James'
  },
  {
    text: 'Another text',
    owner: 'Jessie'
  }
];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

api.get('/messages', (req, res) => {
  res.json(messages);
});

api.get('/messages/:user', (req, res) => {
  var user = req.params.user;
  var result = messages.filter(message => message.owner == user);
  res.json(result);
});

api.post('/messages', (req, res) => {
  // console.log('body: ', req.body);
  messages.push(req.body);
  res.json(req.body);
});

api.get('/users/me', checkAuthenticated, (req, res) => {

  let user = users[req.user];

  delete user.password;
  delete user.confirmPassword;

  res.send(user);

});

api.post('/users/me', checkAuthenticated, (req, res) => {

  let user = users[req.user];

  delete user.password;
  delete user.confirmPassword;

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  res.json(user);

});

auth.post('/login', (req, res) => {

  var user = users.find(user => user.email == req.body.email);

  if (!user) {
    sendAuthError(res);
  }

  if (user.password == req.body.password) {
    sendToken(user, res);
  } else {
    sendAuthError(res);
  }
});

auth.post('/register', (req, res) => {

  let index = users.push(req.body) - 1;
  let user = users[index];

  user.id = index;

  sendToken(user, res);

});

function sendAuthError(res) {
  res.send({
    success: false,
    message: 'Email or password incorrect'
  });
}

function sendToken(user, res) {
  let token = jwt.sign({
    id: user.id,
    email: user.email
  }, 'abc123'); // for security reason, you put the secret somewhere else.

  res.json({
    success: true,
    firstName: user.firstName,
    token
  });
}

function checkAuthenticated(req, res, next) {

  if (!req.headers.authorization)
    return res.status(401).send({
      message: 'Unauthorized request. Missing authentication header'
    });

  let token = req.headers.authorization.split(' ')[1];

  let payload = jwt.decode(token);

  if (!payload)
    return res.status(401).send({
      message: 'Unauthorize request. Authorization header invalid'
    });

  req.user = payload.id;

  next();

}

app.use('/api', api);
app.use('/auth', auth);

app.listen(PORT, () => {
  console.info('Listening on port 5000');
});
