
// export default function (req, res, next) {
//     console.log(req.url);
//     next()
//   }



// export default (req, res) => {
//   const data = { message: 'This is some data from the server!' }
//   res.status(200).json(data)
// }
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

const express = require('express')
const axios = require('axios')

const app = express();
const { excuteQuery } = require('../lib/db');
var cron = require('node-cron');
const http = require('http').Server(app);
const cors = require("cors");

const io = require('socket.io')(http,{
  cors:true,
  origins: ['http://localhost:3000'],
});


app.use(express.json());



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());




// socketIO.on('connection', (socket) => {
//   console.log('connected');

//   socket.on('hello', data => {
//     console.log(data.message); // "Hello, server!"
//     socket.emit('world', { message: 'Hello, client!' });
//   });

// });
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('rotate',async(data)=>{
    console.log(data);

  


  //store new generated id in game_id table

        var month = new Date().getMonth();
        var date = new Date().getDate();
        if (date < 9) {
            var date = "0" + date;
        }
        if (month < 9) {
            var month = "0" + month;
        }
        var year = new Date().getFullYear();

        var game_id = String(year) + String(month) + String(date) + "0001";
        var con = await excuteQuery({
          query: `Select * from game_ids where game_id='${game_id}'`
        });
        if(con.length == 0){
          await excuteQuery({
            query: 'INSERT INTO game_ids(game_id) values(?)',
            value: [[game_id]],
          });
        }


        var games =await excuteQuery({
          query: "Select * from game_ids  order by id desc limit 1"
        });

        await excuteQuery({ query: `Update  game_ids SET expire=1 where expire=0` });
        var prev_game_id  = game_id;
        if(games.length >0){
           prev_game_id  = games[0].game_id;
           console.log("prev_game_id"+prev_game_id);
           game_id = Number(games[0].game_id) + 1;
           console.log("game_id"+game_id);
        }




        await excuteQuery({
          query: 'INSERT INTO game_ids(game_id) values(?)',
          value: [[game_id]],
        });




  let Num = Math.floor(Math.random() * 3+1);
  console.log("Num"+Num);

  var result = await excuteQuery({
    query: `Select * from results  where game_id ='${prev_game_id}'`
  });
  if(result.length > 0){
    Num = result[0].result;
  }

   let color = [];
   color[1] = "Blue";
   color[2] = "Red";
   color[3] = "Yellow";
 
  var user_games =await excuteQuery({
    query: `Select * from games  where game_id ='${prev_game_id}'`
  });
  await excuteQuery({
    query: 'INSERT INTO results(game_id,result,color) values(?)',
    value: [[prev_game_id,Num,color[Num]]],
  });


  for(let i=0;i<user_games.length;i++){
    if(Num == user_games[i].type){
        var games = user_games[i];
        var amount = user_games[i].bet+(user_games[i].bet - user_games[i].bet * 0.2);
        await excuteQuery({
          query: 'INSERT INTO wallets(user_id,game_id,userId,type,wallet_type,transaction_type,amount) values(?)',
          value: [[games.user_id,games.game_id,games.user_id,'credit','epin','win_amount',amount]],
        });
        await excuteQuery({
          query:`Update games set profit =${amount} where id = ${games.id}`
        });
      }
      else{
        console.log('else');
        await excuteQuery({
          query:`Update games set loss =${user_games[i].bet} where id = ${user_games[i].id}`
        });
    }
  }
  console.log("no."+Num);
      io.emit('spin-rotate', { message: Num ,prev_game_id:prev_game_id});
    });
});





// cron.schedule('*/1 * * * *', async() => {  
//   console.log('running a task every  minutes11');

//   let No = Math.floor(Math.random() * 3+1);
      

//   io.emit('spin-rotate', { message: No });
// });

cron.schedule('*/2 * * * *', async() => {  
  console.log('running a task every  minutes11');

  //store start time and end time in db
  var date = new Date();
  var start_time = date.getTime();
  var end_time = new Date().setSeconds(date.getSeconds() + 120);
  await excuteQuery({
    query: 'INSERT INTO timers(start_time,end_time) values(?)',
    value: [[start_time, end_time]],
  });

  io.emit('game-result', { message: 'message' });
});

// Define your API endpoints here
// app.get('/posts', async (req, res) => {
// 	let users = await excuteQuery({ query: 'SELECT * FROM users' });
//   let user = users[0];
//   res.json(users);
  
// });
app.post('/api/auth/register', async (req, res) => {

    var { email, password,name,spid } = req.body;
    var uid = Math.floor(Math.random()*100000);

    var whilee = true;
    while(whilee==true){
      var check_uid =await excuteQuery({
        query: "Select * from users where uid='"+uid+ "'"
      });
      if(check_uid == 0){
        uid = uid;
        whilee = false;
        break;
      }
    }

    console.log(req.body);
    if(email == undefined || password == undefined || spid == undefined || name == undefined ){
      res.status(500).json({message:'All Fields Are Required!'});
      return false;
    }
    if(email == "" || password == "" || spid == "" || name == "" ){
      res.status(500).json({message:'All Fields Are Required!'});
      return false;
    }
    var sp =await excuteQuery({
      query: "Select * from users where uid='"+spid+ "'"
    });
    if(sp.length == 0){
      res.status(500).json({message:'Invalid Sponser!'});
      return false;
    }

    var user =await excuteQuery({
      query: "Select * from users where email='"+email+ "'"
    });


    if(user.length > 0){
      res.status(500).json({message:'User Already Exist,Please Login!'});
      return false;
    }
    bcrypt.hash(password,2, async(err, hash)=> {

    await excuteQuery({
      query: 'INSERT INTO users(name,email,password,showPass,uid,spid) values(?)',
      value: [[name, email, hash,password,uid,spid]],
    });
  });

        var tagsp = spid;
        var sppp = spid;
        var user_id = uid;
        var whileee = true;
        var lv = 1;

        while (whileee == true) {
          var udata =await excuteQuery({
            query: "Select * from users where uid='"+tagsp+ "'"
          });
            // $udata = User::where("uid",$tagsp)->where("is_admin","!=",1)->get();
            if(udata.length < 1 || tagsp == 'admin' ){
                whileee = false;
                break;
            }
            await excuteQuery({
              query: 'INSERT INTO downlines(tagsp,user_id,spid,level) values(?)',
              value: [[tagsp, user_id, sppp,lv]],
            });
            var userdata = udata[0];
            tagsp = userdata['spid'];
            lv++;
        }

    res.json({message:"Registration Successfully, Please Login"});
});

app.post('/api/auth/login', async (req, res) => {
// console.log(req.body);
  var { email, password } = req.body;
  
  // Check if user exists
  var user = await excuteQuery({ query: `SELECT * FROM users where email='${email}'` });
  user = user[0];
  if (!user) {
    return res.status(401).send({message:'Invalid email or password',status:500});
  }

  // console.log(user.password);
  // Check if password is correct
  var isMatch = await bcrypt.compare(password, user.password);
  // console.log(isMatch);
  if (!isMatch) {
    return res.status(401).send({message:'Invalid email or password',status:500})
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, 'bVEPduYKOiGRHQUdeIgAZVKjryj7Zm9oekbJteku5XGN90WG1cRkfXAshXbiquXC')
  res.json({ token:token,status:200 })
});


http.listen(4000, () => {
  console.log(`Server listening on port 4000`);
});

// app.post("/api/userDetail",async(req,res)=>{
//     let {id} = req.body;
//       var user = await excuteQuery({ query: `SELECT * FROM users where id='${id}'` });
//       if(user.length == 0){
//         res.send({status:500,message:"No User Found,Please Register"});
//         return false;
//       }

//       var credit = await excuteQuery({ query: `SELECT sum(amount) as credit FROM wallets where userId='${id}' and wallet_type='epin' and type='credit'` });
//       var debit = await excuteQuery({ query: `SELECT sum(amount) as debit FROM wallets where userId='${id}' and wallet_type='epin' and type='debit'` });
      
//       var balance = credit[0].credit-debit[0].debit;

//      user = user[0];
//      res.send({status:200,data:user,balance:balance});
// });

app.post("/api/myOrders",async(req,res)=>{
  let {user_id} = req.body;
    var orders = await excuteQuery({ query: `SELECT * FROM games where user_id='${user_id}' order by id desc` });
   res.send({status:200,orders:orders});
});
app.post("/api/allOrders",async(req,res)=>{
    var orders = await excuteQuery({ query: `SELECT * FROM games order by id desc` });
   res.send({status:200,orders:orders});
});

app.get('/api/getTime', async (req, res) => {
  var timer = await excuteQuery({ query: `SELECT * FROM timers order by id desc limit 1` });
  timer = timer[0];
  res.send({timer:timer});
});

app.get('/api/getGameId', async (req, res) => {
  var game_id = await excuteQuery({ query: `SELECT * FROM game_ids where expire = 0 order by id desc limit 1` });
  game_id = game_id[0];
  res.send({game_id:game_id});
});

app.post('/api/submitBet', async (req, res) => {
  var { user_id, amount,type,color,game_id } = req.body;
  console.log(req.body);

  if(color=="" && type == ""){
    res.send({status:500,message:"Please Select Valid Color"});
    return false;
  }
  if(amount == ""){
    res.send({status:500,message:"Please Select Bet Amount"});
    return false;
  }


  var credit = await excuteQuery({ query: `SELECT sum(amount) as credit FROM wallets where userId='${user_id}' and wallet_type='epin' and type='credit'` });
  var debit = await excuteQuery({ query: `SELECT sum(amount) as debit FROM wallets where userId='${user_id}' and wallet_type='epin' and type='debit'` });
  
  var balance = credit[0].credit-debit[0].debit;
  if(balance < amount)
  {
    res.send({status:500,message:"Insufficient Balance"});
    return false;
  }
  var user = await excuteQuery({ query: `SELECT * FROM users where id='${user_id}'` });
  user = user[0];

  await excuteQuery({
    query: 'INSERT INTO wallets(userId,user_id,description,wallet_type,transaction_type,type,amount,game_id) values(?)',
    value: [[user.id, user.id, 'game bet','epin','game','debit',amount,game_id]],
  });
  
  await excuteQuery({
    query: 'INSERT INTO games(game_id,user_id,bet,type,color) values(?)',
    value: [[game_id, user.id, amount,type,color]],
  });


  res.json({message:"Bet Submitted successfully"});
});

// Export the Express app
export default app