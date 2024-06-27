import React, { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  return (
    <>
      <div className="mt-32 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign-up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                placeholder="username"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-800"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-800"
                autocomplete="on"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-2 rounded hover:bg-gray-400 transition duration-100"
            >
              {loading ? "Signing up..." : "Sign-up"}
            </button>
            <p className="text-center text-gray-500 mt-4">
              {" "}
              Already have an account? <a href="/login">login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
