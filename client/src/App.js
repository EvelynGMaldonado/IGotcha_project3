import React, {useEffect, useState} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import ServicePost from './pages/ServicePost';
import OfferService from './pages/OfferService';
import FindService from './pages/FindService';
import NotFound from './pages/NotFound';
import "./App.css";
import { io } from "socket.io-client";

import Navbar from './components/Navbar'

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
  
  
// function App({socket}) {
function App({updateLocal}) {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [serviceResponse, setServiceResponse] = useState();
  

  useEffect(()=> {
    const newSocket = io();

    setSocket(newSocket);

    // return () => newSocket.close();
  },[]);

  socket?.on("notificationPush", (payload) =>{
    // console.log('notification pushed: ', email, userToken)
    if (payload.userToken === localStorage.getItem("id_token")) {
      console.log(payload);
      const {userToken, email, reqUser} =payload;
      console.log("a service has been requested");
      setNotifications([...notifications,  {userToken, email, reqUser} ]);
      setServiceResponse({ reqUser, userToken });
    }
    // if(userToken && email ) {
    //       console.log(userToken, email);
    //       console.log("a service has been requested")
    //       setNotifications([...notifications, {userToken, email}])
    //       setServiceResponse({email, userToken})
    // }
    
  })
  // socket?.on('requestEventResponse', () => {
  //   console.log('workkkeedd')
  // })
    const displayNotification = ({userToken, reqUser}) => {
    return (
      <span key="list" className="notificationReturn" data-token={userToken}> {reqUser} has sent you a service request </span>
    );
  };

  const handleResponse = async (event, action) => {
    event.preventDefault();
    console.log('action', action);
    // setHireService(true);
    socket.emit("requestEventResponse", {
        action: {...action, eventName: 'requestEvent'},
    });
    socket.on('EventResponsepush', ({userToken, email}) => {
  console.log('workkkeedd')
})
}



  // useEffect(()=> {
  //   socket?.on("notificationPush", (token) =>{
  //     console.log(token);
  //   })
  // },[socket]);

  // //socket.io
  // //if I want to send event to server then I use socket.emit
  // //if I want to taje event from server then I use socket.on
  // const [username, setUsername] = useState("");
  // const [userS, setUserS] = useState("");

  


  // useEffect(()=> {
  //   //we pass the event name, the username
  //   socket.emmit("newSocketUser", userS)

  // }, [socket, userS]);

  // useEffect(()=> {
  //   setSocket(io("httpServer"));
  //   const socket = io("httpServer"); 
  //   socket.on("getNotificationEvent", data => {
  //     setNotifications((prev) => [...prev, data]);
  //   });
  // }, [socket]);
  // console.log(notifications);

  // const displayNotification = ({senderName, type}) => {
  //   let action;
  //   if (type===1) {
  //     action="requested a service"
  //   } else { 
  //     action="messaged you"
  //   }
  //   return (
  //     <span className="notificationReturn"> {`${senderName} has ${action}`}</span>
  //   );
  // };

  // const handleRead = ()=> {
  //   setNotifications([]);
    // setOpen(false);
  // }

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
        <header className="center">
          <h1 >
            <img src={require("./assets/gotchu-logo.png").default} alt="pp" style={{maxWidth:"10%"}}/>
            <p style={{fontSize:"3rem"}}>IGotcha!</p>
          </h1>
        </header>
        <div 
        // socket={socket} 
        className="notifications">
            <div 
              onClick={() => setOpen(!open)} 
              className="messages">
                <img src={require("./assets/circleletter.png").default} alt="pp" style={{maxWidth:"40px"}}/>
                {notifications.length > 0 &&
                <p className="counter"> 
                  {notifications.length} 
                </p>
                }
            </div>
            <div 
              // onClick={() => setOpen(!open)} 
              className="jobrequests">
                <img src={require("./assets/notificaticon.png").default} alt="pp" style={{maxWidth:"40px"}}/>
                {/* {notifications.length > 0 && */}
                <p className="counter"> 
                  {/* {notifications.length}  */}
                </p>
                {/* } */}
            </div>
            {open && (
              <div className= "notification"> 
                {notifications.map((n) => displayNotification(n))} 
                <button 
                // className="acceptBtn"
                  onClick={(event)=>handleResponse(event, "accept")} 
                >
                  Accept
                </button> 
                <button 
                // className="declineBtn"
                onClick={(event)=>handleResponse(event, "decline")} 
                >
                  Decline
                </button> 
                <button 
                // className="readBtn"
                onClick={(event)=>handleResponse(event, "read")} 
                >
                  Mark as read
                </button> 
              </div> 
            )} 
          </div>
          <Navbar updateLocal={updateLocal}/>
          <Switch>
            <Route exact path="/signup">
              <SignUp setUser={setUser} updateLocal={updateLocal}/>
            </Route>
            <Route exact path="/profile">
              <UserProfile user={user} updateLocal={updateLocal}/>
            </Route>
            <Route exact path="/edit-profile">
              <EditProfile setUser={setUser} updateLocal={updateLocal}/>
            </Route>
            <Route exact path="/service-post/:location/:type">
              <ServicePost 
              updateLocal={updateLocal} 
              socket={socket}
              // socket={socket} userS={userS}
              />
            </Route>
            <Route exact path="/offer-service">
              <OfferService updateLocal={updateLocal}/>
            </Route>
            <Route exact path="/find-service">
              <FindService updateLocal={updateLocal} />
            </Route>
            <Route exact path="/">
              <Home setUser={setUser} updateLocal={updateLocal} socket={socket}/>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <footer className="">
            <p> {new Date().getFullYear()} - IGotcha!</p>
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

