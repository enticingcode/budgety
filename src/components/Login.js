import React from "react";

const Login = () => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  return (
    <div>
      <section className="login-design"></section>
      <section className="login-container">
        <form>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email"></input>

          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password"></input>
        </form>
      </section>
    </div>
  );
};

export default Login;
