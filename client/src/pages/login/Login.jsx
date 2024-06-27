import { useState } from "react";
import React from "react";
import useLogin from "../../hooks/useLogin";
const Login = () => {
  const { loading, login } = useLogin();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };
  return (
    <>
      <div className="mt-32 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="username"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-800"
                value={inputs.username}
                onChange={(e) => {
                  setInputs({ ...inputs, username: e.target.value });
                }}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-800"
                value={inputs.password}
                onChange={(e) => {
                  setInputs({ ...inputs, password: e.target.value });
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-2 rounded hover:bg-gray-400 transition duration-100"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-center text-gray-500 mt-4">
              {" "}
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
