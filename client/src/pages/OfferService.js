import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import "./OfferService.css";
import { useQuery } from '@apollo/client';
import {ADD_SERVICEPOST, REMOVE_SERVICE_POST} from '../utils/mutations';
import { QUERY_SERVICES, QUERY_ME } from '../utils/queries'

import { IoIosAddCircleOutline } from "react-icons/io";
import { FormattedMessage } from 'react-intl';

const OfferService = () =>{
    const { loading, data:userData } = useQuery(QUERY_ME, {
        fetchPolicy: "no-cache"
    });
    const user= loading?null:userData.me;
    
    const [image, setImage] = useState(null);

    const history = useHistory();
    const [formState, setFormState] = useState({ 
        name: '', 
        description: '', 
        type: '',
        email: '', 
        location: '', 
        hourly_rate: '', 
        phone_number: '', 
    });

    const [addServicePost, { error, data }] = useMutation(ADD_SERVICEPOST);
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
            const { data } = await addServicePost({ 
                variables: {
                    // ...formState,
                    name : formState.name,
                    description: formState.description,
                    location: formState.location,
                    type: formState.type,
                    hourly_rate: formState.hourly_rate,
                    phone_number: formState.phone_number,
                    image: image,
                    user: Auth.getUser()
                },
            });
            history.go(0);
        } 
        catch (err) {
            
            console.error(err);
        }
    };
    const [removeServicePost, { error:err, data:rmvdata }] = useMutation(REMOVE_SERVICE_POST);
    const handleDelete = async (_id) => {
        console.log(_id)
        const { data } = await removeServicePost ({
            
            variables: {
                _id,
                user: Auth.getUser()
            }
        })
        history.go(0);
    }

    // this code pertains to the images
    const handleChange = (event) =>{
        if (event.target.files[0]){
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.onload = function() {
                setImage(reader.result)
            };
            reader.onerror = function(error) {
                console.error(error);
            };
        }
    } 


    return(
        <main className="base-grid home-columns">
        <div className="full-width">
        <h1 className="center simple-header"><FormattedMessage id="addAService"/></h1>
            </div>
        <section className="login">
            <form onSubmit={handleFormSubmit} className=" signin fit stack" style={{margin:"auto", maxWidth:"65%"}}>
                <h2 className="log"><FormattedMessage id="addNewService"/> <IoIosAddCircleOutline/></h2>
                <div className="empw">
                    <label><FormattedMessage id="serviceName"/></label>
                    <input 
                        placeholder="service name"
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={formState.name}
                        style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}}
                    />
                    <label><FormattedMessage id="location"/></label>
                    <input 
                        placeholder="location"
                        type="text"
                        name="location"
                        onChange={handleInputChange}
                        value={formState.location}
                        style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}} 
                    />
                    
                    <label><FormattedMessage id="hourlyRate"/></label>
                    <input 
                        placeholder="hourly rate"
                        type="text"
                        name="hourly_rate"
                        onChange={handleInputChange}
                        value={formState.hourly_rate}
                        style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}} 
                    />
                    <label><FormattedMessage id="phoneNumber"/></label>
                    <input 
                        placeholder="phone number"
                        type="text"
                        name="phone_number"
                        onChange={handleInputChange}
                        value={formState.phone_number}
                        style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}} 
                    />
                    <label><FormattedMessage id="email"/></label>
                    <input 
                        placeholder="email"
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        value={formState.email}
                        style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}} 
                    />
                    <label><FormattedMessage id="description"/></label>
                    <input 
                        placeholder="service desciption"
                        type="text"
                        name="description"
                        onChange={handleInputChange}
                        value={formState.description}
                        style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}} 
                    />
                    <label><FormattedMessage id="addAnImage"/></label>
                    <input 
                        type="file"
                        name="image"
                        onChange={handleChange}
                        value={formState.image}
                        style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}}
                    /> 
                    <label><FormattedMessage id="typeOfService"/></label>
                    <select 
                        // className="select"
                        // placeholder="type of service"
                        name="type"
                        onChange={handleInputChange}
                        value={formState.type}
                        style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}}
                    >
                        <option>Adult Care</option>
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
                        <option>Pet Walking</option>
                        <option>Photography</option>
                        <option>Translations</option>
                        <option>Tutoring</option>
                        <option>Web Design</option>                    
                    </select>
                </div>                
                <div className="full-width distribute-even fit">
                    {/* <button
                        className="add fit"
                        disabled = {!(formState.image)}
                        type = "submit"
                        onClick={handleFormSubmit}
                        variant = "success">
                        Add photo
                    </button> */}
                    <button 
                        className="save"
                        disabled = {!(formState.name && formState.type && formState.location && formState.hourly_rate && formState.phone_number && formState.email && formState.description)}
                        type = "submit"
                        onClick={handleFormSubmit}
                        variant = "success">
                        <FormattedMessage id="addMyService"/>
                    </button>
                    <button className="cancel"><FormattedMessage id="cancel"/></button>
                </div>
            </form>
        </section>
        <section className="intro">
            {
                user?.servicePost.map((post) => ( 
                    <div className="" key={post._id}>
                        <div className="find">
                        <img id="profpic" src="" alt="Profile Picture" src={post.image} style={{ maxHeight: '150px' }} />
                            <div>
                                <h6><FormattedMessage id="serviceName"/>: {post.name}</h6>
                                <p><FormattedMessage id="typeOfService"/>:{post.type}</p>
                                <p><FormattedMessage id="location"/>:{post.location}</p>
                                <p><FormattedMessage id="hourlyRate"/>:{post.hourly_rate}</p>
                            </div>
                            <button className="btn-delete" onClick={()=>handleDelete(post._id)}><FormattedMessage id="delete"/></button>
                        </div>
                    </div>        
                ))
            }
        
        </section>
    </main>
    );
}
export default OfferService;