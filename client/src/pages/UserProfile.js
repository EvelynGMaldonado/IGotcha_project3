import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { QUERY_ME, QUERY_FIND_USER } from '../utils/queries';
import { Redirect, useParams } from 'react-router-dom';

import "./UserProfile.css";
import { FormattedMessage } from 'react-intl';

const UserProfile =() => {
    
    const { loading, data } = useQuery(QUERY_ME, {
        fetchPolicy: "no-cache"
        });
    const user= loading?null:data.me
    console.log(user);
    return(
        <main className="base-grid home-columns">
        <section className="edit full-width">
            <form className="editprof fit stack" style={{margin:"auto", maxWidth:"70%"}}>
                <h2 className="ed"><FormattedMessage id="myProfile"/></h2>
                <div className="empw">
                    <div className="center">
                    <img id="profpic" src="" alt="Profile Picture" src={user?.profpic} style={{ maxHeight: '200px' }} />
                    <h2>{`${user?.first_name} ${user?.last_name}`} </h2>
                    <p>Email: {user?.email}</p>
                    <p><FormattedMessage id="biography"/>: {user?.aboutme}</p> 
                    <p><FormattedMessage id="myServices"/>:</p>
                    <ul>
                        {user?.servicePost.map((post) => ( 
                        <li key={post._id}>
                            {post.name}
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
                <div style={{display:'flex', justifyContent: 'center'}}>
                <Link to="/edit-profile">
                <button className="btn"><FormattedMessage id="editMyProfile"/></button>
                </Link>
                </div>
            </form>
        </section>
        </main>
    );
}
export default UserProfile;