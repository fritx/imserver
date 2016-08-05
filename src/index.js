const port = process.env.PORT || 9088
const io = require('./io')

io.listen(port)
