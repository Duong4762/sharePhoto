import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginRegister = ({ setUser }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("login");
  const [error, setError] = useState();
  const [cred, setCred] = useState({});
  const [registerInfor, setRegisterInfor] = useState({});
  const login = async () => {
    const response = await fetch(
      "https://wpzplg-8081.csb.app/api/admin/login",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cred),
      }
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      localStorage.setItem("token", result.token);
      setUser && setUser({ id: result.id, firstName: result.first_name });
      navigate(`/users/${result.id}`);
    } else {
      const result = await response.json();
      setError(result.message);
    }
  };
  const register = async () => {
    const response = await fetch(
      "https://wpzplg-8081.csb.app/api/user",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInfor),
      }
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      setRegisterInfor({
        first_name: "",
        last_name: "",
        location: "",
        description: "",
        occupation: "",
        login_name: "",
        password: "",
        check_password: ""
      });
      setError("Register completely")
    } else {
      const result = await response.json();
      setError(result.message);
    }
  };
  useEffect(()=>{
    setError()
  }, [status])
  return (<>
    {(status === "login") ? (<div>
      <span>Login name:</span>
      <br />
      <input
        type="text"
        onChange={(e) => setCred({ ...cred, login_name: e.target.value })}
      />
      <br />
      <span>Password:</span>
      <br />
      <input
        type="password"
        onChange={(e) => setCred({ ...cred, password: e.target.value })}
      />
      <br />
      {error && <p style={{color: 'red'}}>{error}</p>}
      <br />
      <button onClick={login}>Login</button>
      <span style={{marginLeft: "30px", textDecoration: "underline", cursor: "pointer"}}
        onClick={() => setStatus("register")}>Register</span>
    </div>) : (<div>
      <span>First name:</span>
      <br />
      <input
        type="text"
        onChange={(e)=>setRegisterInfor({...registerInfor, first_name: e.target.value})}
        value={registerInfor.first_name}
      />
      <br />
      <span>Last name:</span>
      <br />
      <input
        type="text"
        onChange={(e)=>setRegisterInfor({...registerInfor, last_name: e.target.value})}
        value={registerInfor.last_name}
      />
      <br />
      <span>Location:</span>
      <br />
      <input
        type="text"
        onChange={(e)=>setRegisterInfor({...registerInfor, location: e.target.value})}
        value={registerInfor.location}
      />
      <br />
      <span>Description:</span>
      <br />
      <textarea
        type="text"
        onChange={(e)=>setRegisterInfor({...registerInfor, description: e.target.value})}
        value={registerInfor.description}
      />
      <br />
      <span>Occupation:</span>
      <br />
      <input
        type="text"
        onChange={(e)=>setRegisterInfor({...registerInfor, occupation: e.target.value})}
        value={registerInfor.occupation}
      />
      <br />
      <span>Login name:</span>
      <br />
      <input
        type="text"
        onChange={(e)=>setRegisterInfor({...registerInfor, login_name: e.target.value})}
        value={registerInfor.login_name}
      />
      <br />
      <span>Password:</span>
      <br />
      <input
        type="password"
        onChange={(e)=>setRegisterInfor({...registerInfor, password: e.target.value})}
        value={registerInfor.password}
      />
      <br />
      <span>Re-check password:</span>
      <br />
      <input
        type="password"
        onChange={(e)=>{
          setRegisterInfor({...registerInfor, check_password: e.target.value})
          if (e.target.value !== registerInfor.password){
            setError("This field must be like password")
          } else {
            setError()
          }
        }}
        value={registerInfor.check_password}
      />
      <br />
      {error && <p style={{color: 'red'}}>{error}</p>}
      <br />
      <button onClick={register}>Register me</button>
      <span style={{marginLeft: "30px", textDecoration: "underline", cursor: "pointer"}}
        onClick={() => setStatus("login")}>Login</span>
    </div>)}</>
  );
};
export default LoginRegister;
