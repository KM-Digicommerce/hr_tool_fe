import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Paper,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import loginGif from "../../assets/login.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value) {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_IP}app/login_user/`,
        { email, password }
      );
      const { data } = response.data;      
      if (data.valid) {
        localStorage.setItem("token", data._c1);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("UserId", data.id);
        switch (data.role_name) {
          case "HR":
            console.log("HR");
            navigate("/hr/dashboard");
            break;
          case "Employee":
              try {
                const employeeResponse = await axios.get(
                  `${process.env.REACT_APP_IP}app/getEmployeeId/`,
                  { params: { user_id: data.id } }
                );
                localStorage.setItem("employeeId", employeeResponse.data.data.employee_id);
                navigate("/employee/dashboard");
              } catch (employeeError) {
                console.error("Error fetching employee ID:", employeeError);
                alert("Error fetching employee ID");
              }
            break;
          default:
            alert("Role not recognized");
            navigate("/");
        }
      } else {
        setPasswordError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box display="flex" height="100vh" sx={{ backgroundColor: "#f4f7fb" }}>
      {/* Left side */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "#ffffff" }}
      >
        <Box
          component={Paper}
          sx={{
            pt: 6,
            pb: 6,
            gap: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "450px",
            mx: "auto",
            px: 4,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" color="primary" gutterBottom>
            Sign In to Your Account
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            variant="outlined"
            error={!!emailError}
            helperText={emailError}
            autoComplete="email"
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            variant="outlined"
            error={!!passwordError}
            helperText={passwordError}
            autoComplete="current-password"
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
            label="Remember Me"
            sx={{ alignSelf: "flex-start", marginBottom: 2 }}
          />

          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer", alignSelf: "flex-end", marginBottom: 2 }}
          >
            Forgot Password?
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
            sx={{
              padding: "12px 0",
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Box>
      </Box>

      {/* Right side */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "#0074d9",
          color: "white",
          textAlign: "center",
          padding: 4,
          height:"auto"
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Welcome to Your HR Dashboard
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 3 }}>
          Manage employee information and HR tasks effortlessly. Log in to access your portal.
        </Typography>
        <img
          src={loginGif}
          alt="Login Animation"
          style={{
            maxWidth: "80%",
            height: "auto",
            borderRadius: "8px",
            marginTop: "0rem",
          }}
        />
      </Box>
    </Box>
  );
};
export default Login;