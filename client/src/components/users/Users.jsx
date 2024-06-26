import React from "react";

const Users = () => {
  return (
    <>
      <form className="flex items-center w-1/2 mx-auto mt-10">
        <input
          type="text"
          placeholder="Search users"
          className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-slate-800"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-slate-800 text-white rounded-r hover:bg-gray-400 transition duration-200 flex items-center"
        >
          <p>Search</p>
        </button>
      </form>
    </>
  );
};

export default Users;
