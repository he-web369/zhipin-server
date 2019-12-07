const {ChatModel}=require('../db/modules')

module.exports=function (server) {
    const io=require('socket.io')(server)
    io.on('connection',function (socket) {
        console.log('socket connected')
        socket.on('sendMsg',function ({from,to,content}) {
            const chat_id=[from,to].sort().join('_')
            const create_time=Date.now()
            new ChatModel({from,to,content,chat_id,create_time}).save(function (err,chatMsg) {
                io.emit('receiveMsg',chatMsg)
            })
        })
    })
}