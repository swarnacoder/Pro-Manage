import React, { useState, useEffect } from "react";
import { WelcomePage } from "../../components/WelcomePage/WelcomePage";
import styles from "./Register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  { useAuth } from "../../Context/auth"

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
  });


  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth()
  
  //Handelling the input value 
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!user.name.trim()) {
      errors.name = "Name field is required";
    }

    if (!user.email.trim()) {
      errors.email = "Email field is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Invalid email format";
    }

    if (!user.confirmPassword.trim() || user.confirmPassword.length < 8) {
      errors.confirmPassword = "Confirm password must be at least 8 characters";
    }

    if (!user.password.trim() || user.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (user.confirmPassword !== user.password) {
      errors.confirmPassword = "Password and confirm password do not match";
    }

    return errors;
  };

  //Handling the form Submission
const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
     
      try {
        const response = await fetch(
          `https://swarnapprava5426-gmail-com-cuvette-final-ea3b.onrender.com/api/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        if (response.ok) {
          alert("Registration successful!")
          const res_data = await response.json()
          console.log("res from server", res_data)
          storeTokenInLS(res_data.token) 
          setUser({ name: "", email: "", confirmPassword: "", password: "" });

          navigate("/login");
          
        }
        console.log(response);
      } catch (error) {
        console.log("Register: ", error);
      }
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
      <section className={styles.register_mainContainer}>
        <WelcomePage />

        <section className={styles.register_container}>
          <div>
            <p className={styles.heading}> Register</p>
          </div>
          <br />
          <form className={styles.register_form} onSubmit={handleSubmit}>
            <label htmlFor="name" className={styles.labels}>
              <i className=" fa-regular fa-user"></i>
              <input
                placeholder="Name"
                className={styles.register_form_input}
                type="text"
                name="name"
                id="name"
                required
                autoComplete="off"
                value={user.name}
                onChange={handleInput}
              />
            </label>

            {validationErrors.name && (
              <span className={styles.error}>{validationErrors.name}</span>
            )}
            <label htmlFor="email" className={styles.labels}>
              <i className="icon fa-regular fa-envelope"></i>
              <input
                placeholder="Email"
                className={styles.register_form_input}
                type="email"
                name="email"
                id="email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
            </label>

            {validationErrors.email && (
              <span className={styles.error}>{validationErrors.email}</span>
            )}

            <label htmlFor="confirmPassword" className={styles.labels}>
              <i className="fa-solid fa-lock"></i>
              <input
                placeholder="Confirm Password"
                className={styles.register_form_input}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                required
                autoComplete="off"
                value={user.confirmPassword}
                onChange={handleInput}
              />
              <i
                className={`fa-regular fa-eye eye-icon ${
                  showConfirmPassword ? "visible" : ""
                }`}
                onClick={toggleConfirmPasswordVisibility}
              ></i>
            </label>

            {validationErrors.confirmPassword && (
              <span className={styles.error}>
                {validationErrors.confirmPassword}
              </span>
            )}

            <label htmlFor="password" className={styles.labels}>
              <i className="fa-solid fa-lock"></i>
              <input
                placeholder="Password"
                className={styles.register_form_input}
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
            
            {validationErrors.password && (
              <span className={styles.error}>{validationErrors.password}</span>
            )}

            <button className={styles.register_btn}> Register</button>
          </form>
          <div className={styles.register_buttom}>
            <p className={styles.buttom_text}>Have an account? </p>
            <button className={styles.register_login_btn}>
              <NavLink
                className={styles.register_login_btn_navlink}
                to="/login"
              >
                Log in
              </NavLink>
            </button>
          </div>
        </section>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
    </>
  );
};
