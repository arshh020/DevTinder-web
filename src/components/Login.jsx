import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Login = (props) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showLoginCard, setShowLoginCard] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));

      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {showLoginCard ? "Login" : "Sign Up"}
            </h2>
            <div>
              {!showLoginCard && (
                <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      First Name<span className="text-red-500">*</span>
                    </legend>
                    <input
                      type="text"
                      value={firstName}
                      className={
                        "input" + (firstName.length > 0 ? "" : " text-gray-500")
                      }
                      placeholder="Abc"
                      onChange={(e) => setfirstName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input
                      type="text"
                      value={lastName}
                      className={
                        "input" + (lastName.length > 0 ? "" : " text-gray-500")
                      }
                      placeholder="Abc"
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </fieldset>{" "}
                </>
              )}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Email ID
                  {!showLoginCard && <span className="text-red-500">*</span>}
                </legend>
                <input
                  type="text"
                  value={emailId}
                  className={
                    "input" + (emailId.length > 0 ? "" : " text-gray-500")
                  }
                  placeholder="abc@gmail.com"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Password
                  {!showLoginCard && <span className="text-red-500">*</span>}
                </legend>
                <div className="join">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    className={
                      "input" +
                      " join-item" +
                      (password.length > 0 ? "" : " text-gray-500")
                    }
                    placeholder="Abc@1234"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="btn join-item"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </fieldset>
            </div>
            {!showLoginCard && (
              <p className="text-xs">
                Password must be at least 8 characters long and include: one
                uppercase letter (A-Z), one number (0-9), and one special
                character (!@#$%^&*)
              </p>
            )}
            <p className="text-red-400">{error}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={showLoginCard ? handleLogin : handleSignUp}
              >
                {showLoginCard ? "Login" : "Sign Up"}
              </button>
              <button
                className="btn flex-none"
                onClick={() => setShowLoginCard((value) => !value)}
              >
                {showLoginCard
                  ? "New to DevTinder? Sign Up"
                  : "Existing User? Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
