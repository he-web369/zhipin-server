/*
测试使用 mongoose操作mongodb数据库
 */
const md5=require('blueimp-md5')

const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/zhipin_test',{ useNewUrlParser: true,useUnifiedTopology: true })
const conn=mongoose.connection
conn.on('connected',function () {
    console.log('success')
})
const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required: true},
    type:{type:String,required:true}
})

const UserModel=mongoose.model('user',userSchema)
function testSave(){
    const userModel=new UserModel({
        username:'josh',
        password:md5('55553'),
        type:'laoban'
    })
    userModel.save(function (err,user) {
        if(!err){console.log(user)}
    })
}
function testQuery() {
    UserModel.findOne({username:'tom'},function (err,user) {
        console.log(err,user)
    })
    UserModel.find(function (err,users) {
        console.log(err,users)
    })
}
function testUpdate() {
    UserModel.findByIdAndUpdate({_id:'5de639a72c8b1525103684d8'},{username:'bob'},{useFindAndModify:false},function (err,olduser) {
        console.log(err,olduser)
    })
}
function testRemove() {
    UserModel.deleteOne({_id:'5de639a72c8b1525103684d8'},function (err,doc) {
        console.log(err ,doc)
    })
}
