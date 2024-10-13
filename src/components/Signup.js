import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""}) 
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
   const {name,email,password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken); 
       navigate("/");
       props.showAlert("Account Created Successfully", "Success")
      }
      else{
          props.showAlert("Invalid Credentials", "danger")
      }
  
}

const onchange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div className='mt-3'>
            <h2  className='mt-2'> <i class="fa-solid fa-book"></i> Create an Account to use iNotebook </h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            value={credentials.name}
            id="name"
            name="name"
            onChange={onchange}
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            value={credentials.email}
            id="email"
            name="email"
            onChange={onchange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="Password" class="form-label">
            Password
          </label>
          <input type="password" class="form-control" value={credentials.password} id="Password" name="password" onChange={onchange} minLength={5}required />
        </div>
        <div class="mb-3">
          <label for="cPassword" class="form-label">
            Confirm Password
          </label>
          <input type="password" class="form-control" id="cPassword"  name="cpassword"onChange={onchange} minLength={5}require/>
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
