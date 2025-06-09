import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Login = (props) => {
  const [emailId, setEmailId] = useState("gogs@gmail.com");
  const [password, setPassword] = useState("Arsh@1234");
  const [error, setError] = useState("");
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

  return (
    <>
      <NavBar />
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input
                  type="text"
                  value={emailId}
                  className="input text-gray-500"
                  placeholder="abc@gmail.com"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="text"
                  value={password}
                  className="input text-gray-500"
                  placeholder="Abc@123"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-400">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleLogin}>
                Submit
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
