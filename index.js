const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

//application/x-www-form-urlencoded 분석 후 가져올 수 있게 함
app.use(bodyParser.urlencoded({extended:true}));

//application.json 분석 후 가져올 수 있게 함
app.use(bodyParser.json());

const { User } = require('./models/User');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lingcho:abcd1234@boilerplate.8ekmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/register', (req, res) => {
  //회원 가입 시 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);  //req.body -> json 형식
  user.save((err, userInfo) => {
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));