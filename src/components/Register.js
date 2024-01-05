import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Register = ({ api_url }) => {
  document.getElementsByTagName("html")[0].style.height = "144%";
  document.getElementsByTagName("body")[0].style.background = "linear-gradient(#141e30, #243b55)";


  const [records, setrecords] = useState({
    username: '',
    mobile: '',
    image: '',
    role: '',
    skills: '',
    email: '',
    password: ''
  })
  const [users, setUsers] = useState([]);
  const [status, setstatus] = useState('');

  useEffect(() => {
    // Fetch data from the API
    axios.get(api_url)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // useEffect(()=>{
  //   console.log('aaa',users);
  // },[users])
  const handleChange = (e) => {
    setrecords({ ...records, [e.target.name]: e.target.value });
  }
  const registerForm = () => {
    console.log(records);
    if (records.username === '') {
      setstatus('Username is missing..!')
      setTimeout(() => {
        setstatus("");
      }, 3000)
    }
    else if (records.mobile === '') {
      setstatus('Phone number is missing..!')
      setTimeout(() => {
        setstatus("");
      }, 3000)
    }
    else if (records.password === '') {
      setstatus('Password is missing..!')
      setTimeout(() => {
        setstatus("");
      }, 3000)
    }
    else if (records.role === '') {
      setstatus('role  is missing..!')
      setTimeout(() => {
        setstatus("");
      }, 3000)
    }
    else if (records.skills === '') {
      setstatus('skills is missing..!')
      setTimeout(() => {
        setstatus("");
      }, 3000)
    }
    else if (records.email === '') {
      setstatus('Email is missing..!')
      setTimeout(() => {
        setstatus("");
      }, 3000)
    }

    else {
      let flag=0;
      users.forEach((user) => {
        if (user['email'] === records.email) {
          setstatus('Email already exist');
          flag=1;
        }
      });
      if(flag==0){
          axios.post(api_url, records)
            .then((result) => {
              setrecords([]);
              setstatus("Registration Successfully");
              window.location.href = "/login";

            })
            .catch((error) => {
              console.error("Error while making the API call:", error);
            });

      }

    }

  }

  const WhichButton = () => {
    if ((document.getElementById("username") === document.activeElement) === false) {
      if (document.getElementById("username").value === "") {
        document.querySelector("#usernamee").classList.remove("focus-input")
      }
      else {
        document.querySelector("#usernamee").classList = "focus-input";
      }
    }
    if ((document.getElementById("mobile") === document.activeElement) === false) {
      if (document.getElementById("mobile").value === "") {
        document.querySelector("#mobilee").classList.remove("focus-input")
      }
      else {
        document.querySelector("#mobilee").classList = "focus-input";
      }
    }

    if ((document.getElementById("email") === document.activeElement) === false) {
      if (document.getElementById("email").value === "") {
        document.querySelector("#emaill").classList.remove("focus-input")
      }
      else {
        document.querySelector("#emaill").classList = "focus-input";
      }
    }
    if ((document.getElementById("skills") === document.activeElement) === false) {
      if (document.getElementById("skills").value === "") {
        document.querySelector("#skillsn").classList.remove("focus-input")
      }
      else {
        document.querySelector("#skillsn").classList = "focus-input";
      }
    }
    if ((document.getElementById("password") === document.activeElement) === false) {
      if (document.getElementById("password").value === "") {
        document.querySelector("#passwordd").classList.remove("focus-input")
      }
      else {
        document.querySelector("#passwordd").classList = "focus-input";
      }
    }

  }
  const loginform = () => {
    window.location.href = '/login';
  }

  return (
    <div onClick={WhichButton} className="login-box-reg login-box">
      <h2>Register</h2>
      <form>
        <div className="user-box">
          <input
            onFocus={() => {
              document.querySelector("#usernamee").classList = "focus-input";
            }}
            type="text"
            name="username"
            required=""
            id='username'
            onChange={handleChange}
            value={setrecords.username}
          />
          <label id='usernamee'>User Name</label>
        </div>
        <div className="user-box">
          <input
            onFocus={() => {
              document.querySelector("#mobilee").classList = "focus-input";
            }}
            type="text"
            name="mobile"
            required=""
            id='mobile'
            onChange={handleChange}
            value={setrecords.mobile}
          />
          <label id='mobilee'>Phone Number</label>
        </div>
        <div className="user-box">
          <input
            onFocus={() => {
              document.querySelector("#emaill").classList = "focus-input";
            }}
            type="email"
            name="email"
            required=""
            id='email'
            onChange={handleChange}
            value={records.email}
          />
          <label id='emaill'>Email</label>
        </div>
        <div className="user-box">
          <input
            onFocus={() => {
              document.querySelector("#passwordd").classList = "focus-input";
            }}
            type="password"
            name="password"
            required=""
            id='password'
            onChange={handleChange}
            value={setrecords.password}
          />
          <label id='passwordd'>Password</label>
        </div>
        <div className="user-box">
          <input
            onFocus={() => {
              document.querySelector("#skillsn").classList = "focus-input";
            }}
            type="text"
            name="skills"
            required=""
            id='skills'
            onChange={handleChange}
            value={setrecords.skills}
          />
          <label id='skillsn'>Skills</label>
        </div>
      
        <div className="user-box">
          <select
            name='role'
            id='rolee'
            //  value={selectedOption} 
            onChange={handleChange}>
            <option className='hidden'>Role</option>
            <option value="1">Admin</option>
            <option value="2">Manager</option>
            <option value="3">Employee</option>
          </select>
        </div>


        <div className='status-msg' id='status'>{status}</div>
        <a onClick={registerForm}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Register
        </a>
        &nbsp;&nbsp;
        <a onClick={loginform}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </a>
      </form>
    </div>
  )
}

export default Register;