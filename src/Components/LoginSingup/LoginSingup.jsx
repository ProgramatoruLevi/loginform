import React, {useState} from 'react';
import './LoginSingup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSingup = () => {
    const[action,setAction]=useState("Sing Up");
    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? <div></div> : <div className="input">
                    <img src={user_icon} alt="User icon"/>
                    <input type="text" placeholder="Name"/>
                </div>}
                <div className="input">
                    <img src={email_icon} alt="Email icon"/>
                    <input type="email" placeholder="Email Id"/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="Password icon"/>
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
            {action === "Sing Up" ? <div></div> :
                <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            }
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => {
                    setAction("Sing Up")
                }}>Sing Up
                </div>
                <div className={action === "Sing Up" ? "submit gray" : "submit"} onClick={() => {
                    setAction("Login")
                }}>Log In
                </div>
            </div>
        </div>
    );
};

export default LoginSingup;
