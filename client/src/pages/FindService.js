import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import "./FindService.css";
import { useQuery } from '@apollo/client';
import {QUERY_FINDSERVICE} from '../utils/queries';
import { QUERY_SERVICES} from '../utils/queries'
import { Redirect, useParams } from 'react-router-dom';

import { IoIosSearch } from "react-icons/io";
import { FormattedMessage } from 'react-intl';

const FindServicePost = () =>{
    
    const [formState, setFormState] = useState({ 
        type: '',
        location: '', 
    });
    const [service, setService] = useState([])

    const { loading, data, error } = useQuery(QUERY_FINDSERVICE, {
        fetchPolicy: "no-cache",
        variables: {
            type: formState.type,
            location: formState.location,
        }
    });
    console.log('outsideUseEffect: ', loading, error)
    // useEffect(() => {
        
    // }, [data])
    // console.log('data: ', data)
    // console.log("service: ", service);
    // console.log(findServicePost);
    // const service= loading?null:data.findServicePost;
    // console.log(service)

    const history = useHistory();
    
    // const [findServicePost] = useQuery(QUERY_FINDSERVICE);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState, [name]: value
    });
    console.log(formState)
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('gql data: ', loading, error)
            if (!loading && data && data.findServicePost) {
                console.log('useEffect: ', data.findServicePost);
                setService(data.findServicePost)
            }
        } catch(e) {
            console.log('useEffectError: ', e)
        }
    };
    

    return(
        <main className="base-grid home-columns">
            <div className="full-width">
                <h1 className="center simple-header"><IoIosSearch/> <FormattedMessage id="findService"/></h1>
            </div>
            <form  className="fit options full-width">
                <select 
                type="text"
                className="select"
                name="type"
                onChange={handleInputChange}
                value={formState.type}
                style={{minWidth:"20%",marginRight:"1em",fontSize:"large", borderRadius:"5px"}}
                >
                    <option value="Adult Care">Adult Care</option>
                    <option>Art</option>
                    <option>Beauty</option>
                    <option>ChildCare</option>
                    <option>Event Planning</option>
                    <option>Graphic Design</option>
                    <option>Handy man</option>
                    <option>House Cleaning</option>
                    <option>Make up</option>
                    <option>Personal Assistant</option>
                    <option>Personal Training</option>
                    <option>Pet Care</option>
                    <option>Photography</option>
                    <option>Translations</option>
                    <option>Tutoring</option>
                    <option>Web Design</option>                    
                </select>
                <input 
                className="zipcode" 
                placeholder="zipcode"
                type="text"
                name="location"
                onChange={handleInputChange}
                value={formState.location}
                style={{marginRight:"1em", borderRadius:"5px"}}/>
                <button 
                    className="btn"
                    disabled={!(formState.type && formState.location)}
                    type="submit"
                    onClick={handleFormSubmit}
                    variant="success">
                    <FormattedMessage id="go"/>!
                </button>
            </form>
            <section className="edit full-width">
                {
                    // data && data.findServicePost ? ( data.findServicePost.map((post) => (
                    service.map((post) => (
                <div className="editprof fit stack" key={post.type} style={{margin:"auto", maxWidth:"70%"}}>
                    <h2 className="ed"><FormattedMessage id="results"/></h2>
                    <div className="find">
                    <div className="container">
                    <img id="profpic" src="" alt="Profile Picture" src={post?.image} style={{ maxHeight: '150px' }} />
                            <h6><FormattedMessage id="serviceName"/>: {post?.name}</h6>
                            <p><FormattedMessage id="description"/>: {post?.description}</p>
                            <p><FormattedMessage id="location"/>: {post?.location}</p>
                            <p><FormattedMessage id="hourlyRate"/>: {post?.hourly_rate}</p>
                        <Link className='btn' style={{padding:"0.5rem", backgroundColor:"white",color:"rgb(6, 93, 122)"}} to={`/service-post/${post?.location}/${post?.type}`}>
                        <FormattedMessage id="moreInfo"/>
                        </Link>
                        </div>
                    </div>
                </div>
                    ))
                    // ) : null
    }
            </section>
        </main>
    );
}
export default FindServicePost;