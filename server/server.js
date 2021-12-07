const express = require('express');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
// //socket.io
// const { createServer } = require('http');
const socketIo = require("socket.io");

const PORT = process.env.PORT || 3001;
const app = express();
// //socket.io
// const httpServer = createServer(app);
// const io = new Server(httpServer);
// socketServer(io);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  bodyParserOptions: {limit: "128mb", type: "application/json" },
});



app.use(express.urlencoded({ extended: false, limit: "64mb"  }));
app.use(express.json({limit: '64mb'}));

server.applyMiddleware({ app });

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// //socket.io
// io.on("connection", (socket) => {
//   //we create an empty array of online users and it will be updated when a user connects to our server
//   let onlineUsers =[]

//   // from the onlineusers array we are filtering. it comes from client side
//   const addNewSocketUser = (username, soketId) => {
//   //write the conditions
//   !onlineUsers.some(userS=>userS.username === username) && onlineUsers.push({ username, socketId });
//   };

//   //disconect method 
//   const deleteSoketUser = (socketId) => {
//   onlineUsers = onlineUsers.filter(userS => userS.socketId !== socketId );
//   };

//   //find a user method
//   const getOneSocketUser = (username) => {
//   return onlineUsers.find(userS=>userS.username === username);
//   };
//   console.log("someone has connected-socket.io");

//   //send event to every client ("event name", "event content like hello!!")
//   io.emit("firstEvent", "sending a socket message during my first event")
  
//   //take event from client side adding our addNewSocketUser function
//   socket.on("newSocketUser", (username) => {
//     addNewSocketUser(username, socket.id);
//   });

//    //take event from client side
//   socket.on("sendNotification", ({senderName, receiverName, type}) =>{
//     const receiver = getUser(receiverName);
//     //send event to one client 
//     io.to(receiver.socketId).emit("getNotificationEvent", {
//       senderName,
//       type
//     });
//   });

//   // socket.on("sendMessageNotification", ({senderName, receiverName, text}) =>{
//   //   const receiver = getUser(receiverName);
//   //   //send event to one client 
//   //   io.to(receiver.socketId).emit("getNotificationEvent", {
//   //     senderName,
//   //     type
//   //   });
//   // });

//   //if i want to disconnect, we dont take anything fromclient side, we only close the browser and we'll remove that user
//   socket.on("disconnect",() => {
//     deleteSoketUser(socket.id);
//   });

//   //we filter our online users array which is gonna update our let onlineUsers array example
//   //   [
//   //     {
//   //       username:"Monika",
//   //       socketId:"socketidhere" //the events are based on this socketId and we find it thro the username
//   //     }
//   //   ]

// });

// //send event to client
// io.listen(httpServer???);
const socketMap = new Map();
db.once('open', () => {
  // httpServer.listen(PORT, () => {
  const http = app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
  const io = socketIo(http);
  let userS = [];

  io.on("connection", (socket) => {
    console.log("connecting socket.io")
    console.log(socket.id)
    socketMap.set(socket.id, null);
    socket.on("addSocketUser", function(tokenId) {
      console.log(tokenId);
      userS.push(tokenId);
    })
    //we need to get the token to initialize the socket.io
    socket.on("requestEvent", (payload) => {
      console.log("request event line 121")
      //destructure payload
      const { token, email } = payload; //, like serevice
      const secret = process.env.SECRET || "secret";
      const expiration = '2h';
      console.log("server.js line 127");
      //to get the email and username
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log("server.js line 130");
      console.log(data);
      const reqUser = data.email;
      
      
      // req.user = data;
      userS.forEach((userToken)=> {
        console.log(userToken);
        const { data: userData } = jwt.verify(userToken, secret, { maxAge: expiration });
        if(!payload.eventName &&userData.email === email) {
          console.log(email)
          console.log(userData.email)
          console.log("event emit notif push line 137");
          socket.broadcast.emit("notificationPush", {userToken, email});
        };
        socket.on("requestEventResponse", {email, userToken});
        socket.broadcast.emit("EventResponsepush", {userToken, email});
        // socket.broadcast.emit("EventResponsepush", {userToken, email});

      })
    })

    socket.on("hello", function () {
      console.log("event hello")
    })
  })
});