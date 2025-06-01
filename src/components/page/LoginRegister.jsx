import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginRegister = ({ setUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [cred, setCred] = useState({});
  const login = async () => {
    const response = await fetch(
      "https://dnynpd-8081.csb.app/api/admin/login",
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
      localStorage.setItem("token", result.token)
      setUser && setUser({id: result.id, firstName: result.first_name});
      navigate(`/users/${result.id}`);
    } else {
      setError("Login failed");
    }
  };
  return (
    <div>
      <span>Login name:</span>
      <br />
      <input
        type="text"
        onChange={(e) => setCred({ ...cred, login_name: e.target.value })}
      />
      <br />
      {error && <p>{error}</p>}
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
};
export default LoginRegister;
