const io = require("socket.io")(8000, {
    cors:{
        origin:"http://localhost:3001",
        methods:["Get", "POST"],
    },
})

io.on("connection", socket => {
    console.log("connected to server")
})