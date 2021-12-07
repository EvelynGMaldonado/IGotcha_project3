import React, {useRef, useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Auth from '../../utils/auth';
import { IoIosBody, IoIosSearch, IoMdConstruct, IoMdGlobe, IoMdLogOut } from "react-icons/io";


const Navbar = ({ updateLocal }) =>{

    const handleLanguageChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        updateLocal(value);
    }


    return (
        <>
        <nav className="full-width nav-columns fit">
        <Link to="/profile">
            <button className="btn"><IoIosBody/><FormattedMessage id="profile"/></button>
        </Link>
        <Link to="/find-service">
        <button className="btn"><IoIosSearch/><FormattedMessage id="findService"/></button>
        </Link>
        <Link to="/offer-service">
        <button className="btn"><IoMdConstruct/><FormattedMessage id="offerService"/></button>
        </Link>
        {/* <button className="btn"><IoMdGlobe/>Language</button> */}
        <select  type="text" className="btn select" name="language" onChange={handleLanguageChange}>
            <option>English</option>
            <option>Spanish</option>
        </select>
        <button onClick={Auth.logout}className="btn"><IoMdLogOut/><FormattedMessage id="logout"/></button>
        </nav>
        </>
    )
}

export default Navbar;