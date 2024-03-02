import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { WelcomePage } from "../../components/WelcomePage/WelcomePage";
import { NavLink, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { useAuth } from "../../Context/auth"

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth()

  //Handling the Input Values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };
  //Handling the form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert("Login successful!")
        const res_data = await response.json()
        console.log("res from server", res_data)
        storeTokenInLS(res_data.token) 
        setUser({ email: "", password: "" });

        navigate("/dashboard");
        
      }

      else {
        alert("INVALID CREDENTIALS")
      }
    } catch (error) {
      console.log("Login: ", error);
    
    }
  
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <MoonLoader color="#474444" />
      </div>
    );
   
  }
  return (
    <>
      <section className={styles.login_mainContainer}>
        <WelcomePage />
        <section className={styles.login_container}>
          <div>
            <p className={styles.heading}> Login</p>
          </div>
          <br />
          <form className={styles.login_form} onSubmit={handleSubmit}>
            <label htmlFor="email" className={styles.labels}>
              <i className=" fa-regular fa-envelope"></i>

              <input
                placeholder="Email"
                className={styles.login_form_input}
                type="email"
                name="email"
                id="email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
            </label>
            <label htmlFor="password" className={styles.labels}>
              <i className="fa-solid fa-lock"></i>
              <input
                placeholder="Password"
                className={styles.login_form_input}
                type={showPassword ? "text" : "password"} 
                name="password"
                id="password"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
              />
              <i
                className={`fa-regular fa-eye eye-icon ${
                  showPassword ? "visible" : ""
                }`}
                onClick={togglePasswordVisibility}
              ></i>
            </label>
            <button className={styles.login_btn}>
            Log in
             
            </button>
          </form>
          <div className={styles.login_buttom}>
            <p className={styles.buttom_text}>Have no account yet ? </p>
            <button className={styles.login_register_btn}>
              <NavLink
                className={styles.login_register_btn_navlink}
                to="/register"
              >
                Register
              </NavLink>
            </button>
          </div>
        </section>
      </section>
      <ToastContainer />

    </>
  );
};
