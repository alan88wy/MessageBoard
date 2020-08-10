let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let api = express.Router();

app.use(bodyParser.json());

// app.use(express.static('public'))

let messages = [
  { text: 'Some Text', owner: 'Alan' },
  { text: 'Some Other Text', owner: 'James'},
  { text: 'Another text', owner: 'Jessie'}
];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

api.get('/messages', (req, res) => {
  res.json(messages);
});

api.post('/messages', (req, res) => {
  messages.push(req.body);
  res.sendStatus(200);
});

app.use('/api', api);

app.listen(5000, () => {
  console.info('Listening on port 5000');
});