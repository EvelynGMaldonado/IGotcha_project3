import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import {QUERY_FINDSERVICE, QUERY_ME} from '../utils/queries';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import "./ServicePost.css"

// const ServicePost = (socket, userS) =>{
const ServicePost = ({socket}) =>{
    // const [socket, setSocket] = useState(null);
    const { location, type } = useParams();
    const [service, setService] = useState({location: '', description: '', type: '', hourly_rate: '', user: {first_name: '', last_name: '', email:'', username:''}})
    const QueryMultiple = () => {
        const res1 = useQuery(QUERY_FINDSERVICE, {
            fetchPolicy: "no-cache",
            variables: {
                type: type,
                location: location,
            }
        });
        const res2 = useQuery(QUERY_ME)
        return [res1, res2];
    }
    const [
        {loading: loading1, data: data1},
        {loading: loading2, data: data2}
    ] = QueryMultiple();
    
    const userData = data2?.me || {};
    // const { loading, data, error } = useQuery(QUERY_FINDSERVICE, {
    //     fetchPolicy: "no-cache",
    //     variables: {
    //         type: type,
    //         location: location,
    //     }
    // });

    useEffect(() => {
        console.log('params: ', location, type)
        if (!loading1 && data1 && data1.findServicePost) {
            setService(data1.findServicePost[0])
        }
    }, [data1])
    console.log('data: ', data1);
    console.log('service: ', service);

    //socket.io
    // const [message, setMessage] = useState(false);
    const [hireService, setHireService] = useState(false);
    const handleNotification = async (event) => {
        event.preventDefault();
        setHireService(true);
        console.log(userData);
        socket.emit("requestEvent", {
            token: localStorage.getItem("id_token"),
            email: userData.email,
            username: userData.username,
            //here i can add more like service name
        });
    }
    
    
    // const handleNotification = async (type) => {
    //     // event.preventDefault();
    //     setHireService(true);
    //     socket?.emit("sendNotification", {
    //         senderName: userS,    //senderName: user's username
    //         receiverName: service.user.first_name,
    //         type
    //     })
    // };


    return(
        <main className="base-grid home-columns">
            <nav className="full-width nav-columns distribute-even fit">
                <Link to="/profile">
                <button className="btn">Profile</button>
                </Link>
                <Link to="/find-service">
                <button className="btn">Find Service</button>
                </Link>
                <Link to="/offer-service">
                <button className="btn">Offer Service</button>
                </Link>
                <button className="btn">Language</button>
                <button onClick={Auth.logout}className="btn">Logout</button>
            </nav>
            <section className="edit full-width">
                <form className="editprof fit stack" style={{margin:"auto", maxWidth:"70%"}}>
                    <h4 className="ed">Service Name: {service.type} </h4>
                    <div className="empw">
                        <img/>
                        <h6>by: {service.user.first_name} {service.user.last_name}</h6>
                    
                        <p>Location: {service.location}</p>
                        <p>Description: {service.description}</p>
                        <p>Hourly Rate: {service.hourly_rate}</p>
                    </div>
                    <button 
                        className="editprof-btn"
                        onClick={handleNotification}
                        >
                        Hire Service! 
                    </button>
                    <button 
                        className="editprof-btn"
                        // onClick={()=>handleNotification(2)}
                        >
                        Send a message 
                    </button>
                </form>
            </section>
        </main>
    );
}
export default ServicePost;