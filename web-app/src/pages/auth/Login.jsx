import useAuth from "../../hooks/useAuth";
// useNavigate
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


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
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4 rounded">
          <h2 className="text-center mb-4">Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <div className="text-center">
              <p className="mb-0">Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>

  );
}
