/**
 * 公共socket io事件
 * User: 姜伟
 * Date: 2020/12/30 0030
 * Time: 10:23
 */
module.exports = {
    'connection': function (socket) {
        socket.emit('message',{text:'你上线了'});
        socket.broadcast.emit('message', {text: '你的好某XXX上线了'});
    }
}
