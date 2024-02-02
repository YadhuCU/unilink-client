import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdKey } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

Auth.propTypes = {
  signup: PropTypes.bool,
};

export function Auth({ signup }) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [usernameError, setUsernameError] = useState(false);
  const [show, setShow] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  // auto focusing input box
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  // google oauth
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          },
        )
        .then((res) => setProfile(res.data))
        .catch((error) => console.log("Error axios: -> ", error));
    }
  }, [user]);

  const handleEmailChange = (e) => {
    const { value } = e.target;
    if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
    setUserData({ ...userData, email: value });
  };

  const showPassword = () => {
    setShow((prev) => !prev);
  };

  const handleLogin = () => {
    console.log("userData", userData);
    navigate("/home");
  };

  const handlSignup = () => {
    console.log("userData", userData);
    navigate("/home");
  };

  const loginUsingGoogle = useGoogleLogin({
    onSuccess: (res) => setUser(res),
    onError: (error) => console.log("Error", error),
  });

  const logout = () => {
    googleLogout();
    setProfile({});
  };

  console.log("user", user);
  console.log("profile", profile);
  console.log("useData", userData);

  return (
    <div className="col-span-3">
      <div className="md:min-w-[500px] md:max-w-[500px] mx-auto p-5 flex flex-col gap-5">
        <p className="animation text-center text-3xl font-[var(--fw-600)] tracking-widest">
          {signup ? "Sign Up" : "Sing In"}
        </p>
        {/* firstName */}
        {signup && (
          <div className="animation w-full">
            <div
              className={`w-full px-5 flex items-center   rounded-[var(--br)] ${
                userData.firstName
                  ? "border-[2pt] border-[var(--clr-blue-medium)]"
                  : "border-[2pt] border-slate-500"
              }`}
            >
              <FaUser />
              <input
                type="text"
                placeholder="First Name"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                autoComplete="false"
                onKeyDown={(e) =>
                  e.key == "Enter" && passwordRef.current.focus()
                }
                className="bg-transparent w-full px-5 py-4 outline-none font-[var(--fw-400)] tracking-widest placeholder:tracking-widest placeholder:text-[var(--clr-white)]"
              />
            </div>
          </div>
        )}
        {/* lastName */}
        {signup && (
          <div className="animation w-full">
            <div
              className={`w-full px-5 flex items-center   rounded-[var(--br)] ${
                userData.lastName
                  ? "border-[2pt] border-[var(--clr-blue-medium)]"
                  : "border-[2pt] border-slate-500"
              }`}
            >
              <FaUser />
              <input
                type="text"
                placeholder="Last Name"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                autoComplete="false"
                onKeyDown={(e) =>
                  e.key == "Enter" && passwordRef.current.focus()
                }
                className="bg-transparent w-full px-5 py-4 outline-none font-[var(--fw-400)] tracking-widest placeholder:tracking-widest placeholder:text-[var(--clr-white)]"
              />
            </div>
          </div>
        )}
        {/* email */}
        <div className="animation w-full">
          <div
            className={`w-full px-5 flex items-center   rounded-[var(--br)] ${
              userData.email
                ? "border-[2pt] border-[var(--clr-blue-medium)]"
                : "border-[2pt] border-slate-500"
            }`}
          >
            <FaUser />
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) => handleEmailChange(e)}
              autoComplete="false"
              onKeyDown={(e) => e.key == "Enter" && passwordRef.current.focus()}
              className="bg-transparent w-full px-5 py-4 outline-none font-[var(--fw-400)] tracking-widest placeholder:tracking-widest placeholder:text-[var(--clr-white)]"
            />
          </div>
          {/* username error */}
          {usernameError && (
            <p className="px-7 py-2 text-xs text-[var(--clr-blue-light)]">
              *Invalid email
            </p>
          )}
        </div>
        {/* password */}
        <div
          className={`animation w-full px-5 flex items-center  rounded-[var(--br)] ${
            userData.password
              ? "border-[2pt] border-[var(--clr-blue-medium)]"
              : "border-[2pt] border-slate-500"
          }`}
        >
          <MdKey className="text-[1.5rem]" />
          <input
            ref={passwordRef}
            type={show ? `password` : "text"}
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            onKeyDown={(e) =>
              e.key == "Enter" &&
              userData.password &&
              userData.email &&
              handleLogin()
            }
            className="bg-transparent w-full px-5 py-4 outline-none font-[var(--fw-400)] tracking-widest placeholder:tracking-widest placeholder:text-[var(--clr-white)]"
          />
          {show ? (
            <BsFillEyeSlashFill
              onClick={showPassword}
              className="text-[1.5rem] cursor-pointer"
            />
          ) : (
            <BsFillEyeFill
              onClick={showPassword}
              className="text-[1.5rem] cursor-pointer"
            />
          )}
        </div>
        {signup ? (
          <button
            disabled={userData.email && userData.password ? false : true}
            className={`${
              userData.email && userData.password && userData.firstName
                ? "cursor-pointer "
                : "cursor-not-allowed bg-[var(--clr-blue-medium-50)] text-slate-500"
            } animation w-ful lpx-5 py-4 bg-[var(--clr-blue-medium)] rounded-[var(--br)] tracking-widest`}
            onClick={handlSignup}
          >
            Sign Up
          </button>
        ) : (
          <button
            disabled={userData.email && userData.password ? false : true}
            className={`${
              userData.email && userData.password
                ? "cursor-pointer "
                : "cursor-not-allowed bg-[var(--clr-blue-medium-50)] text-slate-500"
            } animation w-ful lpx-5 py-4 bg-[var(--clr-blue-medium)] rounded-[var(--br)] tracking-widest`}
            onClick={handleLogin}
          >
            Sign In
          </button>
        )}
        <div className="or animation flex justify-center text-center tracking-widest font-[var(--fw-400)] relative">
          <p>or</p>
        </div>
        <button
          onClick={loginUsingGoogle}
          className="animation w-ful flex items-center justify-center gap-5 lpx-5 py-4 bg-[var(--clr-white)] text-[var(--clr-blue-dark)] rounded-[var(--br)] tracking-widest"
        >
          <FcGoogle className="text-[2rem]" />
          Sign In with Google
        </button>
        {signup ? (
          <Link to="/">
            <p>
              Already have an account?{" "}
              <span className="text-[var(--clr-blue-medium)]">Sign In.</span>
            </p>
          </Link>
        ) : (
          <Link to="/signup">
            <p>
              Don&apos;t have an account?{" "}
              <span className="text-[var(--clr-blue-medium)]">
                Create account!
              </span>
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
