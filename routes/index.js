var express = require('express');
const {UserModel}=require('../db/modules')
const md5=require('blueimp-md5')
const filter={password:0,__v:0}

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.post('/register',function (req,res) {
//   //1.获取请求参数
//    const {username,password}=req.body
//   //2.处理
//   if(username==='admin'){
//     res.send({code:1,msg:'此用户已存在'})
//   }else{
//     res.send({code:0,data:{_id:'1234',username,password}})
//   }
// })
//注册的路由
router.post('/register',function (req,res) {
  const {username,password,type}=req.body
  UserModel.findOne({username},function (err,user) {
    if(!err){
      if(user){res.send({code:1,msg:'此用户已存在'})}else{
        new UserModel({username, password:md5(password), type}).save(function (err,user) {
            res.cookie('userid',user._id,{maxAge:1000*3600*24*7})
            const data={username,type,_id:user._id}
            res.send({code:0,data})
        })
      }
    }else{
      console.log(err)
    }
  })
})
//登录的路由
router.post('/login',function (req,res) {
    const {username,password}=req.body
    UserModel.findOne({username,password:md5(password)},filter,function (err,user) {
      if(!err){
        if(user){
          res.cookie('userid',user.id,{maxAge:1000*3600*24*7})
          res.send({code:0,data:user})
        }else{
          res.send(({code:1,msg:'用户名或密码错误，请重新输入'}))
        }
      }else{
        console.log(err)
      }

    })
})
//更新用户信息的路由
router.post('/update',function (req,res) {
    //从请求的cookies中的到userID
    const userId=req.cookies.userid
    if(!userId){
        return res.send({code:1,msg:'请先登录'})
    }
    const user=req.body
    UserModel.findByIdAndUpdate({_id:userId},user,{useFindAndModify:false},function (err,oldUser) {
        if(!oldUser){
            res.clearCookie('userid')
            return res.send({code:1,msg:'请先登录'})
        }else{
            const {_id,username,type}=oldUser
            const data=Object.assign(user,{_id,username,type})
            res.send({code:0,data})
        }
    })
})
//获取用户信息的路由
router.get("/user",function (req,res) {
    const userId=req.cookies.userid
    if(!userId){
        return res.send({code:1,msg:'请先登录'})
    }
    UserModel.findOne({_id:userId},function (err,user) {
        if(user){
            res.send({code:0,data:user})
        }
    })
})

module.exports = router;
