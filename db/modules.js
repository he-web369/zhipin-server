const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost:27017/zhipin',{ useNewUrlParser: true,useUnifiedTopology: true })
const conn=mongoose.connection
conn.on('connected',function () {
    console.log('linking success')
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
const UserModel = mongoose.model('user',userSchema)
exports.UserModel=UserModel