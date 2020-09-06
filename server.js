const express = require('express');
const app = express();
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/*',(req, res) => {
  res.sendFile(path.join(__dirname + `/dist/weather/index.html`))
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
