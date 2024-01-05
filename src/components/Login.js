import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';


const WhichButton = () => {
    if ((document.getElementById("userid") === document.activeElement) === false) {
        if (document.getElementById("userid").value === "") {
            document.querySelector("#useridd").classList.remove("focus-input")
        }
    }
    if ((document.getElementById("psw") === document.activeElement) == false) {
        if (document.getElementById("psw").value === "") {
            document.querySelector("#psww").classList.remove("focus-input")
        }
    }
}


const Login = ({ api_url }) => {
    const [user_details, updateuser_details] = useState('');
    document.getElementsByTagName("html")[0].style.height = "100%";
    document.getElementsByTagName("body")[0].style.background = "linear-gradient(#141e30, #243b55)";
    const [regdata, setregdata] = useState({
        userid: '',
        psw: '',
        enp: '',
        rnp: ''
    });
    const [loginstatus, setloginstatus] = useState('');
    const [users, setUsers] = useState([]);


    useEffect(() => {
        console.log('Effect triggered');
        axios.get(api_url)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        console.log('aaa', users);
    }, [users])


    const handleChange = (e) => {
        setregdata({ ...regdata, [e.target.name]: e.target.value });
    }

    const Loginn = () => {
        if (regdata.userid === "") {
            setloginstatus("Username Missing");
        }
        else if (regdata.psw === "") {
            setloginstatus("Password Missing");
        }
        else {
            setloginstatus("");
            users.forEach((user) => {
                if (user['email'] === regdata.userid && user['password'] === regdata.psw) {
                    let user_get_detalils = {
                        'id': user['id'],
                        'user_id': user['user_id'],
                        'email': user['email'],
                        'mobile': user['mobile'],
                        'role': user['role'],
                        'skills': user['skills'],
                        'img_path': ''
                    }
                    updateuser_details(user_get_detalils);
                    let str_user = user_get_detalils;
                    str_user = JSON.stringify(str_user);
                    sessionStorage.setItem("user_details", str_user);

                    setloginstatus("Successfully Logged In....");
                    window.location.href = "/usersprofile";
                }
                else {
                    setloginstatus("Please do Register..!");

                }
            });


        }

    }
    const Registerdirection = () => {
        window.location.href = '/';
    }


    return (
        <div>
            <div onClick={WhichButton} className="login-box">
                <h2>Login</h2>
                <form>
                    <div className="user-box">
                        <input onFocus={() => { document.querySelector("#useridd").classList = "focus-input" }} type="text" name="userid" required="" id='userid' onChange={handleChange} value={regdata.user} />
                        <label id='useridd'>Email</label>
                    </div>
                    <div className="user-box">
                        <input onFocus={() => { document.querySelector("#psww").classList = "focus-input" }} type="password" name="psw" required="" id='psw' onChange={handleChange} value={regdata.psw} />
                        <label id='psww'>Password</label>
                    </div>
                    <div className='status-msg' id='loginstatus'>{loginstatus}</div>
                    <a onClick={Loginn} >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Login
                    </a>&nbsp;&nbsp;
                    <a onClick={Registerdirection} >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Register
                    </a>
                </form>
            </div>
        </div>
    )
}

export default Login;