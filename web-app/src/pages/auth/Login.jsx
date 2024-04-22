import useAuth from "../../hooks/useAuth";
// useNavigate
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    await login(data);
    navigate("/dashboard");
  };
  // check if user is authenticated then redirect to home page
    useEffect(() => {
      const initialize = async () => {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken) {
          navigate("/dashboard");
        }
      };
      initialize();
    }, []);
    
        
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div
            className="login100-form-title"
            style={{ backgroundImage: "url(images/bg-01.jpg)" }}
          >
            <span className="login100-form-title-1">Sign In</span>
          </div>

          <form
            className="login100-form validate-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit({
                email: e.target.email.value,
                password: e.target.pass.value,
              });
            }}
          >
            <div
              className="wrap-input100 validate-input m-b-26"
              data-validate="Email is required"
            >
              <span className="label-input100">Email</span>
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Enter email"
              />
              <span className="focus-input100"></span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-18"
              data-validate="Password is required"
            >
              <span className="label-input100">Password</span>
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Enter password"
              />
              <span className="focus-input100"></span>
            </div>

            <div className="flex-sb-m w-full p-b-30">
              <div className="contact100-form-checkbox">
                <input
                  className="input-checkbox100"
                  id="ckb1"
                  type="checkbox"
                  name="remember-me"
                />
                <label className="label-checkbox100" htmlFor="ckb1">
                  Remember me
                </label>
              </div>

              <div>
                <a href="#" className="txt1">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
