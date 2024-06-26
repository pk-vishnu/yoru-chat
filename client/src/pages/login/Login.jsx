import React from "react";

const Login = () => {
  return (
    <>
      <div className="mt-32 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="username"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-800"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-800"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-2 rounded hover:bg-gray-400 transition duration-100"
            >
              Login
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
