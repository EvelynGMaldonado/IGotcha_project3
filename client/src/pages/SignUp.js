import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation } from '@apollo/client';
import { ADD_USER, QUERY_ME } from "../utils/mutations";
import "./SignUp.css";
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const SignUp = ({ setUser }) =>{
    
    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
      });
      const history = useHistory();
      const [addUser, { error, data }] = useMutation(ADD_USER);

    
      // update state based on form input changes
      const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
        ...formState,
        [name]: value,
    });
    };

    // submit form
    const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
        const { data } = await addUser({
        variables: { ...formState },
    });
    console.log(data);
    Auth.login(data.token, history);
    setUser(data.addUser.user)
    } catch (e) {
        console.error(e);
    }
    };

    return(
        <main className="base-grid home-columns">
            <section className="sign full-width">
                <form className=" signup fit stack" style={{margin:"auto", maxWidth:"70%"}}>
                    <h4 className="sig"><FormattedMessage id="signUp"/></h4>
                    <div className="empw">
                        <label><FormattedMessage id="name"/></label>
                        <input 
                            type="text"
                            placeholder="name"
                            name="first_name"
                            onChange={handleInputChange}
                            value={formState.first_name}
                        />
                        <label><FormattedMessage id="lastName"/></label>
                        <input 
                            type="text"
                            placeholder="last name"
                            name="last_name"
                            onChange={handleInputChange}
                            value={formState.last_name}
                        />
                        <label><FormattedMessage id="userName"/></label>
                        <input 
                            type="text"
                            placeholder="username"
                            name="username"
                            onChange={handleInputChange}
                            value={formState.username}
                        />
                        <label><FormattedMessage id="email"/></label>
                        <input 
                            type="text"
                            placeholder="email"
                            name="email"
                            onChange={handleInputChange}
                            value={formState.email}
                        />
                        <label><FormattedMessage id="password"/></label>
                        <input 
                            type="text"
                            placeholder="password"
                            name="password"
                            onChange={handleInputChange}
                            value={formState.password}
                        />
                    </div>
                    <button 
                        className="btnlog"
                        disabled = {!(formState.first_name && formState.last_name && formState.username && formState.email && formState.password)}
                        type = "submit"
                        onClick={handleFormSubmit}
                        variant = "success">
                        <FormattedMessage id="signUp"/>!
                    </button>
                </form>
            </section>
        </main>
    );
}
export default SignUp;