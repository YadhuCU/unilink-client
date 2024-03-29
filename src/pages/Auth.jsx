import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdKey } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { loginAPI, registerAPI } from "../service/allAPI";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  updateAuthentication,
  updateCurrentUserReducer,
} from "../redux/userProfileSlice";

Auth.propTypes = {
  signup: PropTypes.bool,
};

export function Auth({ signup }) {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    googlePicture: "",
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailError, setEmailError] = useState(false);
  const [show, setShow] = useState(true);
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(updateAuthentication(true));
    }
  }, []);

  // google oauth
  useEffect(() => {
    if (googleUser) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
              Accept: "application/json",
            },
          },
        )
        .then((res) => signupWithGoogle(res.data))
        .catch((error) => console.log("Error axios: -> ", error));
    }
  }, [googleUser]);

  const showPassword = () => setShow((prev) => !prev);

  const handleEmailChange = (e) => {
    const { value } = e.target;
    if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    setUserData({ ...userData, email: value });
  };

  // login
  const handleLogin = async ({ googleUserData }) => {
    const data = {
      email: googleUserData ? googleUserData.email : userData.email,
      password: googleUserData ? googleUserData.password : userData.password,
    };

    const result = await loginAPI(data);

    if (result.status === 201) {
      sessionStorage.setItem("user", JSON.stringify(result.data.user, null, 4));
      sessionStorage.setItem("token", result.data.token);
      dispatch(updateCurrentUserReducer(result.data.user));
      dispatch(updateAuthentication(true));
      navigate("/home");
    } else {
      console.log("Error", result);
      toast({
        title: "Error",
        description: result.response.data,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // register
  const handleSignup = async (prop) => {
    const { google, googleUserData } = prop;
    const data = google ? googleUserData : userData;

    const result = await registerAPI(data);

    if (result.status === 201) {
      handleLogin({ googleUserData: result.data });
    } else {
      if (google) {
        handleLogin({ googleUserData: data });
      } else {
        toast({
          title: "Error",
          description: result.response.data,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const authUsingGoogle = useGoogleLogin({
    onSuccess: (res) => setGoogleUser(res),
    onError: (error) => console.log("Error", error),
  });

  const signupWithGoogle = async (data) => {
    const { email, name, picture, id } = data;
    const username = email.split("@")[0];
    const google = true;

    setUserData({
      email,
      name,
      password: id,
      username,
      googlePicture: picture,
    });

    const newUserData = {
      email,
      name,
      password: id,
      username,
      googlePicture: picture,
    };

    handleSignup({ google, googleUserData: newUserData });
  };

  const clearState = () => {
    setUserData({
      name: "",
      username: "",
      email: "",
      password: "",
    });
    setEmailError(false);
  };

  return (
    <>
      <div className="col-span-3 place-content-center grid">
        <div className="md:min-w-[500px] md:max-w-[500px] mx-auto p-5 flex flex-col gap-5">
          <h1 className="text-6xl font-bold text-center tracking-widest text-slate-500">
            Welcome to{" "}
            <span className="text-slate-50 font-black text-7xl">UniLink</span>
          </h1>
          <p className="animation text-center text-3xl font-[var(--fw-600)] tracking-widest">
            {signup ? "Sign Up" : "Sing In"}
          </p>
          {/* name */}
          {signup && (
            <div className="animation w-full">
              <div
                className={`w-full px-5 flex items-center   rounded-[var(--br)] ${
                  userData.name
                    ? "border-[2pt] border-[var(--clr-blue-medium)]"
                    : "border-[2pt] border-slate-500"
                }`}
              >
                <FaUser />
                <input
                  type="text"
                  placeholder="Name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  autoComplete="false"
                  className="bg-transparent w-full px-5 py-4 outline-none font-[var(--fw-400)] tracking-widest placeholder:tracking-widest placeholder:text-[var(--clr-white)]"
                />
              </div>
            </div>
          )}
          {/* username */}
          {signup && (
            <div className="animation w-full">
              <div
                className={`w-full px-5 flex items-center   rounded-[var(--br)] ${
                  userData.username
                    ? "border-[2pt] border-[var(--clr-blue-medium)]"
                    : "border-[2pt] border-slate-500"
                }`}
              >
                <FaUser />
                <input
                  type="text"
                  placeholder="Username"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                  autoComplete="false"
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
                className="bg-transparent w-full px-5 py-4 outline-none font-[var(--fw-400)] tracking-widest placeholder:tracking-widest placeholder:text-[var(--clr-white)]"
              />
            </div>
            {/* email error */}
            {emailError && userData.email && (
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
              disabled={
                userData.email &&
                userData.password &&
                userData.username &&
                userData.name
                  ? false
                  : true
              }
              className={`${
                userData.email &&
                userData.password &&
                userData.name &&
                userData.username
                  ? "cursor-pointer "
                  : "cursor-not-allowed bg-[var(--clr-blue-medium-50)] text-slate-500"
              } animation w-ful lpx-5 py-4 bg-[var(--clr-blue-medium)] rounded-[var(--br)] tracking-widest`}
              onClick={(e) => handleSignup(e)}
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
            onClick={authUsingGoogle}
            className="animation w-ful flex items-center justify-center gap-5 lpx-5 py-4 bg-[var(--clr-white)] text-[var(--clr-blue-dark)] rounded-[var(--br)] tracking-widest"
          >
            <FcGoogle className="text-[2rem]" />
            Sign In with Google
          </button>
          {signup ? (
            <Link to="/" onClick={clearState}>
              <p>
                Already have an account?{" "}
                <span className="text-[var(--clr-blue-medium)]">Sign In.</span>
              </p>
            </Link>
          ) : (
            <Link to="/signup" onClick={clearState}>
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
      <DummyUsers />
    </>
  );
}

function DummyUsers() {
  const array = [
    {
      email: "peter@email.com",
      password: "peter",
    },
    {
      email: "loki@email.com",
      password: "loki",
    },
    {
      email: "thanos@email.com",
      password: "thanos",
    },
    {
      email: "deadpool@email.com",
      password: "deadpool",
    },
  ];

  return (
    <div className="absolute py-4 md:py-9 top-0 md:bottom-0 right-0 md:right-5 flex flex-wrap md:flex-col gap-2">
      <p className="text-slate-500">You can also use this dummy credentials.</p>
      {array.map((item, index) => (
        <div
          key={index}
          className="border-2 p-4 text-slate-500 border-slate-800 rounded-lg"
        >
          <p className="tracking-widest">e : {item?.email}</p>
          <p className="tracking-widest">p : {item?.password}</p>
        </div>
      ))}
    </div>
  );
}
