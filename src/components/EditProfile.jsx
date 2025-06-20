import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user?.firstName || "");
  const [lastName, setlastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [showAlert, setAlert] = useState(false);

  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  useEffect(() => {
    setfirstName(user?.firstName || "");
    setlastName(user?.lastName || "");
    setAbout(user?.about || "");
    setAge(user?.age || "");
    setGender(user?.gender || "");
    setPhotoUrl(user?.photoUrl || "");
  }, [user]);

  return (
    <>
      <div className="flex justify-center my-20">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input text-gray-500"
                    placeholder="abc@gmail.com"
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input text-gray-500"
                    placeholder="Abc@123"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    value={age}
                    className="input text-gray-500"
                    placeholder="7-110"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    value={gender}
                    className="input text-gray-500"
                    placeholder="Male/Female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    value={about}
                    className="input text-gray-500"
                    placeholder="23"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input text-gray-500"
                    placeholder="23"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-400">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
        {showAlert && (
          <div
            role="alert"
            className="fixed top-4 right-150 z-50 alert alert-success"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Profile saved successfully</span>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
