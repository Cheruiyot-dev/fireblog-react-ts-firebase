import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { auth } from "../utility/firebase";

interface AuthProps {
  setActive: (active: string) => void;
}
interface initialState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth: React.FC<AuthProps> = ({ setActive }) => {
  const [state, setState] = useState<initialState>(initialState);
  const [signUp, setSignUp] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signUp) {
      // !signUp -> assuming current state is true, thus false: execute login logic.
      // Check login credentials: email and password -> state.email && state.password
      if (state.email && state.password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );

        toast.success("Login successful!");
        setActive("home");
        navigate("/");
      } else {
        // throw new Error("Login unsuccessful!")
        return toast.error("Login unsuccessful!");
      }
    } else {
      if (state.password !== state.confirmPassword) {
        return toast.error("Password do not match!");
      }

      if (state.firstName && state.lastName && state.password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );
        await updateProfile(user, {
          displayName: `${state.firstName} ${state.lastName}`,
        });
      }
      setActive("home");
      navigate("/");
    }
  }
  

return (
  <div className="container-fluid mb-4">
    <div className="container">
      <div className="col-12 text-center">
        <div className="text-center heading py-2">
          {!signUp ? "Sign-In" : "Sign-Up"}
        </div>
      </div>
      <div className="row h-100 justify-content-center aligh-items-center">
        <form className="row" onSubmit={handleAuth}>
          {signUp && (
            <>
              <div className="col-6 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  name="firstName"
                  placeholder="First Name"
                  value={state.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6 py-3">
                <input
                  type="text"
                  name="lastName"
                  className="form-control input-text-box"
                  placeholder="Last Name"
                  value={state.lastName}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="col-12 py-3">
            <input
              type="email"
              name="email"
              className="form-control input-text-box"
              placeholder="Email"
              value={state.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 py-3">
            <input
              type="password"
              name="password"
              className="form-control input-text-box"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
            />
          </div>
          {signUp && (
            <div className="col-12 py-3">
              <input
                type="password"
                name="confirmPassword"
                className="form-control input-text-box"
                placeholder="Confirm Password"
                value={state.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="col-12 py-3 text-center">
            <button
              className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
              type="submit"
            >
              {!signUp ? "Sign-In" : "Sign-Up"}
            </button>
          </div>
          {!signUp ? (
            <>
              <div className="text-center justify-content-center mt-2 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?
                </p>
                <span
                  className="link-danger"
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  onClick={() => setSignUp(true)}
                >
                  Sign Up
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="text-center justify-content-center mt-2 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?
                </p>
                <span
                  className="link-danger"
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#298af2",
                  }}
                  onClick={() => setSignUp(false)}
                >
                  Sign in
                </span>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  </div>
)};

export default Auth;
