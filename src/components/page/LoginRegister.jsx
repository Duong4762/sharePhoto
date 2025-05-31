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
        credentials: "include",
        body: JSON.stringify(cred),
      }
    );
    if (response.ok) {
      const user = await response.json();
      console.log(user.id);
      setUser && setUser(user);
      navigate(`/users/${user.id}`);
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
