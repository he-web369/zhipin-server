const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost:27017/zhipin',{ useNewUrlParser: true,useUnifiedTopology: true })
const conn=mongoose.connection
conn.on('connected',function () {
    console.log('database-linking success')
})
const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required: true},
    type:{type:String,required:true},
    header:{type:String},//头像名称
    post:{type:String},//职位
    personalInfo:{type:String},//个人信息
    company:{type:String},//公司
    salary:{type:String}//工资
})
const chatSchema=mongoose.Schema({
    from:{type:String,required:true},//发送用户的id
    to:{type:String,required:true},//接收用户的id
    chat_id:{type:String,required:true},//from和to 组成的字符串
    content:{type:String,required:true},//内容
    read:{type:Boolean,default:false},//是否已读
    create_time:{type:String}//创建时间
})
const UserModel = mongoose.model('user',userSchema)
const ChatModel=mongoose.model('chat',chatSchema)
exports.UserModel=UserModel
exports.ChatModel=ChatModel