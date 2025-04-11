import React from "react";

const Navigation = () => {
  return (
    <div className="fixed top-0 w-full flex items-center justify-center z-50">
      <div className="flex font-mono text-xl w-[40%] justify-evenly mt-[30px] border-2  bg-white/20 backdrop-blur-md border border-white/20 shadow-lg text-slate-600 p-2 rounded-2xl">
        <button className="navbutton">Home</button>
        <button className="navbutton">Overview</button>
        <button className="navbutton">Skills</button>
        <button className="navbutton">Projects</button>
        <button className="navbutton">Contact me</button>
      </div>
    </div>
  );
};

export default Navigation;
