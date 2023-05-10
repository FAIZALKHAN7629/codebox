import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function Login() {
  function handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="w-12 h-12 text-white p-2 bg-emerald-500 rounded-full"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span class="ml-3 text-2xl text-white font-bold ">CodeBox</span>
      <button
        className="text-white font-bold text-3xl animate-pulse mt-3"
        onClick={handleSignIn}
      >
        Sign In with Google
      </button>
    </div>
  );
}

export default Login;
