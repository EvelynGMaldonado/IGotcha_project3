import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Auth from '../utils/auth';
// import { useMutation } from '@apollo/react-hooks';
import { useMutation } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import {LOGIN_USER} from '../utils/mutations';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { io } from "socket.io-client";

import "./Home.css"; 

import Modal from '../components/Modal'
import ContactusModal from '../components/ContactusModal'

const Home = ({ setUser, updateLocal, socket }) => {
 
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const history = useHistory();
  // const [socket, setSocket] = useState(null);

  // useEffect(()=> {
  //   const newSocket = io();
    
  //   setSocket(newSocket);
  // },[]);

  //update state based on input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState, [name]: value
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login ({
        variables: {...formState},
      });
      console.log(data);
      Auth.login(data.login.token, history);
      socket.emit("addSocketUser", data.login.token);
      setUser(data.login.user);
    } catch(err) {
      console.log(err);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  const [showContactusModal, setShowContactusModal] = useState(false);

  const openContactusModal = () => {
    setShowContactusModal(prev => !prev);
  };  

  return (
    <main className="home base-grid home-columns" >
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <ContactusModal showContactusModal={showContactusModal} setShowContactusModal={setShowContactusModal} />
      <div className="mission full-width">
        <h5 className="miss"><FormattedMessage id="missionSatement"/></h5>
        <p><FormattedMessage id="missionStateText"/></p>
        <div className="center">
        <img src={require("../assets/fb.png").default} style={{width:"30px"}} alt="pp"/>
        <img src={require("../assets/instagram.png").default} style={{width:"30px"}} alt="pp"/>
        <img src={require("../assets/pinterest.png").default} style={{width:"30px"}} alt="pp"/>
        <img src={require("../assets/twitter.png").default} style={{width:"30px"}} alt="pp"/>
        </div>
      </div>
      <div className="images full-width distribute-even fit">
        <img src={require("../assets/babysitter.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/caregiver.jpeg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/cleaning1.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/handyman.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/petsitter.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/photographer.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/remote.png").default} style={{maxWidth:"10%"}} alt="pp"/>
        <img src={require("../assets/tutoring.jpg").default} style={{maxWidth:"10%"}} alt="pp"/>
      </div >
      <section className="login">
          <form onSubmit={handleFormSubmit} className=" signin fit stack" style={{margin:"auto", maxWidth:"65%"}}>
            <h4 className="log"><FormattedMessage id="login"/></h4>
            <div className="empw full-width">
              <label><FormattedMessage id="email"/></label>
              <input 
                style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}}
                type="text" 
                placeholder="email"
                name ="email"
                onChange = {handleInputChange}
                value = {formState.email}
              />
              <label><FormattedMessage id="password"/></label>
              <input 
                style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)"}}  
                type= "password"
                placeholder="pasword"
                name= "password"
                onChange = {handleInputChange}
                value = {formState.password}
              />
            </div>
            <button 
              className="btnlog"
              disabled = {!(formState.email && formState.password)}
              type = "submit"
              onClick={handleFormSubmit}
              variant = "success">
              <FormattedMessage id="login1"/>
            </button>
          </form>
          <Link to="/signup">
            <button className="btnsign full-width"><FormattedMessage id="signUp"/>!</button>
          </Link>
      </section>
      <section className="intro">
        <div className="">
          <img className="screen" src={require("../assets/screens.png").default} style={{maxWidth:"50%"}}alt="pp"/>
          <div>
            <h2 className="works"><FormattedMessage id="howItWorks"/>:</h2>
            <h4><FormattedMessage id="howItWorksText"/></h4>
          </div>
        <div className="full-width distribute-even fit">
        <button className="btnmore " onClick={openModal}><FormattedMessage id="aboutUs"/></button>
        <button className="btnmore" onClick={openContactusModal}><FormattedMessage id="contactUs"/></button>
        </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
