import './modal.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Usersprofile = ({ api_url }) => {
  // const api_url = "https://crudcrud.com/api/059581f518d94a9d85bdb69e69353173/reg";
  const [overalldetails, setoveralldetails] = useState([]);
  const [edit_id, set_edit_id] = useState('');
  const [edit_row_id, set_edit_row_id] = useState('');
  const Imgupload = () => {
    // const formData = new FormData();
    // formData.append("image",document.getElementById("file").files[0]);
    // formData.append("details",JSON.stringify(currdetails));
    // formData.append("editing",sessionStorage.getItem("editing"));
    axios.put(api_url + '/' + edit_id, currdetails).
      then((result) => {
        let overalldetailss = [];
        overalldetailss = overalldetails;
        overalldetailss[edit_row_id].email = currdetails.email;
        overalldetailss[edit_row_id].mobile = currdetails.mobile;
        overalldetailss[edit_row_id].role = currdetails.role;
        overalldetailss[edit_row_id].skills = currdetails.skills;
        window.sessionStorage.setItem("user_details", JSON.stringify(overalldetailss));
        setoveralldetails(overalldetailss);
        design();
        document.querySelector(".close").click();
      });
  }
  document.getElementsByTagName("html")[0].style.height = "100%";
  document.getElementsByTagName("body")[0].style.background = "linear-gradient(#141e30, #243b55)";
  const [designn, setdesignn] = useState('');
  const [currdetails, setcurrdetails] = useState({
    username:"",
    mobile: "",
    email: "",
    role: "",
    skills: "",
    photo: ""
  });

  const View = (e) => {
    let overalldetailss = [];
    overalldetailss = overalldetails;
    if (overalldetails.length === 0) {
      setoveralldetails(JSON.parse(localStorage.getItem("overalldetails")));
      overalldetailss = JSON.parse(localStorage.getItem("overalldetails"));
    }
    setcurrdetails({

      username:overalldetailss[e].username,
      mobile: overalldetailss[e].mobile,
      email: overalldetailss[e].email,
      role: overalldetailss[e].role,
      skills: overalldetailss[e].skills,
      photo: overalldetailss[e].img_path
    })
    // document.getElementById('viewdetail').classList.remove('hidden')
    document.getElementById('myBtnn').click();


  }
  useEffect(() => {
    console.log(overalldetails);
  }, [overalldetails])
  const Edit = (e, dbid) => {
    set_edit_id(dbid);
    set_edit_row_id(e);
    let overalldetailss = [];
    overalldetailss = overalldetails;
    console.log(overalldetails);
    // document.getElementById('viewdetail').classList.add('hidden');
    if (overalldetails.length === 0) {
      setoveralldetails(JSON.parse(localStorage.getItem("overalldetails")));
      overalldetailss = JSON.parse(localStorage.getItem("overalldetails"));
    }
    console.log(overalldetails);
    sessionStorage.setItem("editing", "");
    if (sessionStorage.getItem("edit") === 'emp') {
      sessionStorage.setItem("editing", "1");
      let details = JSON.parse(window.sessionStorage.user_details);
      setcurrdetails({
        // user_id:details.user_id,
        username: details.username,
        mobile: details.mobile,
        email: details.email,
        role: details.role,
        skills: details.skills,
        photo: details.img_path
      })
    }
    else {
      console.log(overalldetailss[e].username,'yyy');
      console.log(e);
      setcurrdetails({
        username: overalldetailss[e].username,
        mobile: overalldetailss[e].mobile,
        email: overalldetailss[e].email,
        role: overalldetailss[e].role,
        skills: overalldetailss[e].skills,
        photo: ''
      })
    }

    document.getElementById('myBtn').click();

  }
  const handlemodalchange = (e) => {
    setcurrdetails({ ...currdetails, [e.target.name]: e.target.value });
    console.log(e.target.name);
  }
  // const Update = () => {
  //   axios.put(api_url + '/reg', currdetails).
  //     then((result) => {
  //     });
  // }
  const Delete = (id, dbid) => {
    let overalldetailss = [];
    overalldetailss = overalldetails;
    if (overalldetails.length === 0) {
      setoveralldetails(JSON.parse(localStorage.getItem("overalldetails")));
      overalldetailss = JSON.parse(localStorage.getItem("overalldetails"));
    }

    axios.delete(api_url +'/'+ dbid)
      .then((result) => {
        let details = overalldetailss;
        console.log(details);
        details.splice(parseInt(id), 1);
        console.log(details);
        localStorage.setItem("overalldetails", JSON.stringify(details));
        setoveralldetails(details);
        design();
      });
  }
  const design = () => {
    let details = JSON.parse(window.sessionStorage.user_details);
    console.log(details);
    axios.get(api_url, details).
      then((result) => {
        console.log(result.data,'ddd');
        let d = result.data.map((a, i) => {

          return (
            <tbody><tr><td>{i + 1}</td><td>{a.username}</td><td>{a.email}</td><td>{a.mobile}</td> <td>
            {a.role == 1
              ? 'Admin'
              : a.role == 2
              ? 'Manager'
              : 'Employee'}
          </td><td>{a.skills}</td><td ><i rowid={i} dbid={a._id} onClick={(e) => View(e.target.getAttribute("rowid"),)} className="fa fa-eye"></i></td><td ><i rowid={i} dbid={a._id} onClick={(e) => Edit(e.target.getAttribute("rowid"), e.target.getAttribute("dbid"))} className="fa fa-edit"></i></td><td><i dbid={a._id} rowid={i} onClick={(e) => Delete(e.target.getAttribute("rowid"), e.target.getAttribute("dbid"))} className="fa fa-trash-o"></i></td></tr></tbody>
          )

        });
        setdesignn(() => {
          return (
            <table className='table table-striped'><thead><tr><th>Sno</th><th>User Name</th><th>Email</th><th>Mobile</th><th>Role</th><th>Skills</th><th>View</th><th>Edit</th><th>Delete</th></tr></thead>
              {d}
            </table>
          )
        });
        if (result.data.length !== 0) {
          localStorage.setItem("overalldetails", JSON.stringify(result.data));
          setoveralldetails(result.data);
          console.log(result.data);
        }
        //setoveralldetails(result);
        // console.log(overalldetails);
      })


  }
  useEffect(() => {
    design();
  }, [])


  var modal = document.getElementById("myModal");
  var modall = document.getElementById("myModall");



  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modall.style.display = "none"
    }
  }
  const spann = () => {
    modal.style.display = "none";
  }
  const btnn = () => {
    modal.style.display = "block";
  }
  const spannn = () => {
    modall.style.display = "none";
  }
  const btnnn = () => {
    modall.style.display = "block";
  }


  return (
    <div>
      <a className='right register' href='/'>Register</a>
      <a className='right login' href='/login'>Log Out</a>
      <div>
        <div className='users'>

          {designn}


          <button className='hidden' id="myBtn" onClick={btnn}>Open Modal</button>
          <button className='hidden' id="myBtnn" onClick={btnnn}>Open Modal</button>



          <div id="myModal" className="modal">
            <div className="modal-content">
              <div >
              </div>
              <div className="modal-body">
                <span onClick={spann} className="close">&times;</span>
                <div className='row'>
                  <div className='col-md-6 adjustment'>
                    <label htmlFor=""> User Name </label>
                  </div>
                  <div className='col-md-6 adjustment'>
                    <input className="form-control tooltippie" type="text" id="user_id" name="user_id" onChange={(e) => handlemodalchange(e)} value={currdetails.username} />
                  </div>
                  <div className='col-md-6 adjustment'>
                  <label htmlFor=""> Mobile </label>

                  </div>
                  <div className='col-md-6 adjustment'>
                    <input className="form-control" type="text" name='mobile' onChange={(e) => handlemodalchange(e)} value={currdetails.mobile} id="mobile" />
                  </div>
                  <div className='col-md-6 adjustment'>
                    <label htmlFor=""> Email </label>

                  </div>
                  <div className='col-md-6 adjustment'>
                    <input className="form-control" type="text" id="email" name='email' onChange={(e) => handlemodalchange(e)} value={currdetails.email} />

                  </div>
                  <div className='col-md-6 adjustment'>
                    <label htmlFor=""> Role </label>
                  </div>
                  <div className='col-md-6 adjustment'>
                    <select className='form-control tooltippie' onChange={(e) => handlemodalchange(e)} value={currdetails.role} disabled>
                      <option value=''>Select Role</option>
                      <option value='1'>Admin</option>
                      <option value='2'>Manager</option>
                      <option value='3'>Employee</option>
                    </select>
                  </div>
                  <div className='col-md-6 adjustment'>
                    <label htmlFor=""> Skills </label>
                  </div>
                  <div className='col-md-6 adjustment'>
                    <input className="form-control" onChange={(e) => handlemodalchange(e)} value={currdetails.skills} name='skills' type="text" id="skills" />;
                  </div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <input className='hidden' id='file' type="file" name="image" />
              </div>
              <div className="modal-footer">
                <button id='imggg' onClick={Imgupload} alt="Avatar" > Update </button>
              </div>
            </div>

          </div>

          <div id="myModall" className="modal">
            <div className="modal-content">
              <div >
              </div>
              <div className="modal-body">
                <span onClick={spannn} className="close">&times;</span>
                <div className='row'>
                  <div className='col-md-6 adjustment'>
                    <label htmlFor=""> User Name </label>
                  </div>
                  <div className='col-md-6 adjustment'>
                    <input className="form-control" type="text" id="user_id" name="user_id" onChange={(e) => handlemodalchange(e)} value={currdetails.username} readOnly
                    />
                  </div>
                  <div className='col-md-6 adjustment'>
                  <label htmlFor=""> Mobile </label>

                  </div>
                  <div className='col-md-6 adjustment'>
                    <input className="form-control" type="text" name='mobile' onChange={(e) => handlemodalchange(e)} value={currdetails.mobile} id="mobile" readOnly/>
                  </div>
                  <div className='col-md-6 adjustment'>
                    <label htmlFor=""> Email </label>

                  </div>
                  <div className='col-md-6 adjustment'>
                    <input className="form-control" type="text" id="email" name='email' onChange={(e) => handlemodalchange(e)} value={currdetails.email} readOnly/>

                  </div>
                  <div className='col-md-6 adjustment'>
                    <label htmlFor=""> Role </label>
                  </div>
                  <div className='col-md-6 adjustment'>
                    <select className='form-control' onChange={(e) => handlemodalchange(e)} value={currdetails.role} disabled>
                      <option value=''>Select Role</option>
                      <option value='1'>Admin</option>
                      <option value='2'>Manager</option>
                      <option value='3'>Employee</option>
                    </select>
                  </div>
                  <div className='col-md-6 adjustment'>
                    <label htmlFor=""> Skills </label>
                  </div>
                  <div className='col-md-6 adjustment'>
                    <input className="form-control" onChange={(e) => handlemodalchange(e)} value={currdetails.skills} name='skills' type="text" id="skills" readOnly/>;
                  </div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <input className='hidden' id='file' type="file" name="image" />
              </div>
              <div className="modal-footer">
                {/* <button id='imggg' onClick={Imgupload} alt="Avatar" > Update </button> */}
              </div>
            </div>

          </div>


        </div>
      </div>
      <br></br>

      <div id='viewdetail' className='employeee hidden'>
        <span onClick={() => document.getElementById('viewdetail').classList.add('hidden')} id='viewclose' className='closee'>x</span>
        <div className="screen__content justify-content-center">
          <br /> <br />
          <div className='emp'>

            <div className='row'><div className='col lbl' style={{ fontWeight: "700", fontSize: "18px" }}>User Name</div><div className='col lbl'>{currdetails.username}</div></div> <br />
            <div className='row'><div className='col lbl' style={{ fontWeight: "700", fontSize: "18px" }}>Email</div><div className='col lbl'>{currdetails.email}</div></div> <br />
            <div className='row'><div className='col lbl' style={{ fontWeight: "700", fontSize: "18px" }}>Mobile</div><div className='col lbl'>{currdetails.mobile}</div></div> <br />
            <div className='row'><div className='col lbl' style={{ fontWeight: "700", fontSize: "18px" }}>Role</div><div className='col lbl'>{currdetails.role == 1
              ? 'Admin'
              : currdetails.role == 2
              ? 'Manager'
              : 'Employee'}</div></div> <br />
            <div className='row'><div className='col lbl' style={{ fontWeight: "700", fontSize: "18px" }}>Skills</div><div className='col lbl'>{currdetails.skills}</div></div> <br />
          </div>
        </div>
      </div>


    </div>


  )
}

export default Usersprofile;