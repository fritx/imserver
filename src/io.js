const { toObj } = require('./util')
const io = require('socket.io')()
module.exports = io

io.on('connection', socket => {

  // override socket.emit
  enableErrorEmit(socket)

  socket.on('user-login', data => {
    if (data.username === 'admin') {
      socket.emit('user-login-success')
    }
    else {
      socket.emit(
        'user-login-failed',
        new Error('Username or password incorrect.')
      )
    }
  })
})

function enableErrorEmit (socket) {
  const _emit = socket.emit.bind(socket)
  socket.emit = (key, ...args) => {
    // cast error obj before ipc sending
    // todo: logic move to global.ipc.send
    args.forEach((v, i) => {
      args[i] = toObj(v) // replace
    })
    _emit(key, ...args)
  }
}
