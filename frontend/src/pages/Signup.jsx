import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side  */}
        <div className="flex-1">
          <Link to="/" className="text-sm sm:text-xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Blogify
            </span>
          </Link>
          <p className="text-sm mt-5">
            You can signup with your email and password.
          </p>
        </div>
        {/* right side  */}

        <div className="flex-1">
          <form className="flex flex-col gp-4">
            <div>
              <Label value="Your Username" />
              <TextInput type="text" placeholder="username" id="Username" />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="text" placeholder="Email" id="email" />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="mt-2"
            >
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
