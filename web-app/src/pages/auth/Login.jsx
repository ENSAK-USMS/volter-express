import useAuth from "../../hooks/useAuth";
// useNavigate
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    const good = await login(data);
    if (good)
    navigate("/");
    else
    alert("Invalid credentials");
  };
  // check if user is authenticated then redirect to home page
  useEffect(() => {
    const initialize = async () => {
      const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) {
        navigate("/");
      }
    };
    initialize();
  }, []);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-75">
        <div className="card shadow p-5 rounded-4">
          <h2 className="text-center mb-4">Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit({
                username: e.target.username.value,
                password: e.target.pass.value,
              });
            }}
          >
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" >
                Password
              </label>
              <input type="password" className="form-control" name="pass" id="password" />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="text-center">
              <p className="mb-0">
                Don't have an account? <a href="signup">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
