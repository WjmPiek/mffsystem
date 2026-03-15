import { useState } from "react";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email === "wjm@martinsdirect.com" &&
      password === "Renette7"
    ) {
      onLogin("admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <img
          src="/logo.png"
          alt="Logo"
          style={styles.logo}
        />

        <h1 style={styles.heading}>Martin's System</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
    fontFamily: "Arial, sans-serif",
  },

  loginBox: {
    width: "320px",
    padding: "40px",
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  logo: {
    width: "80px",
    marginBottom: "10px",
  },

  heading: {
    marginBottom: "25px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "10px",
    fontSize: "14px",
  },

  button: {
    padding: "10px",
    background: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  error: {
    color: "red",
    fontSize: "12px",
  },
};