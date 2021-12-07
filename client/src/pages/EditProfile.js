import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { UPDATE_USER } from "../utils/mutations";

import "./EditProfile.css";
import { FormattedMessage } from 'react-intl';

const EditProfile = ({ setUser }) =>{
    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        aboutme: '',
        profpic: '',
    });
    const history = useHistory();
    const [updateUser, { error, data }] = useMutation(UPDATE_USER);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({
        ...formState, [name]: value
    });
        };

        const [image, setImage] = useState(null);

        const handleFormSubmit = async (event) => {
            event.preventDefault();
            console.log(formState);
            console.log(formState.aboutme);
            try {
                console.log("handle form submit = edit profile")
            const { data } = await updateUser({
                
            variables: {

                first_name: formState.first_name,
                last_name: formState.last_name,
                aboutme: formState.aboutme,
                profpic: image,
                user: Auth.getUser()
            },
            });
            console.log(data);
            await setUser(data.updateUser);
            history.push("/profile")


        }
        catch(err) {
            console.error(err);
        }};

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
            <section className="edit full-width">
                <form className="editprof fit stack" style={{margin:"auto", maxWidth:"70%"}}>
                    <h2 className="ed"><FormattedMessage id="editMyProfile"/></h2>
                    <div className="empw">
                        <label><FormattedMessage id="name"/></label>
                        <input 
                            placeholder="name"
                            type="text"
                            placeholder="name"
                            name="first_name"
                            onChange={handleInputChange}
                            value={formState.first_name}
                            style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}}
                        />
                        <label><FormattedMessage id="lastName"/></label>
                        <input 
                            type="text"
                            placeholder="last name"
                            name="last_name"
                            onChange={handleInputChange}
                            value={formState.last_name}
                            style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}}
                        />
                        <label><FormattedMessage id="biography"/></label>
                        <input 
                            placeholder="about me"
                            type="text"
                            name="aboutme"
                            onChange={handleInputChange}
                            value={formState.aboutme}
                            style={{minWidth:"70%",padding:"10px",borderRadius:"5px",border:"2px, solid, var(--green)",marginBottom:"1rem"}}
                        />
                        <label><FormattedMessage id="updateProfPic"/></label>
                        <input 
                        className="profpic"
                        style={{padding:"10px"}} 
                        placeholder="upload profile picture"
                        type="file"
                        name="profpic"
                        onChange={handleChange}
                    />
                    </div>
                        <div className="full-width distribute-even fit">
                            {/* <button className="add fit">Add photo</button> */}
                            <button 
                                className="save"
                                disabled = {!(formState.first_name && formState.last_name && formState.aboutme)}
                                type = "submit"
                                onClick={handleFormSubmit}
                                variant = "success">
                                <FormattedMessage id="saveChanges"/>
                            </button>
                            <button className="cancel"><FormattedMessage id="cancel"/></button>
                        </div>
                </form>
            </section>
        </main>
    );
}
export default EditProfile;