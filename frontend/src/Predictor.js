import React, { useState } from "react";
import axios from "axios";

const Predictor = () => {
  const [form, setForm] = useState({
    mark: "opel",
    model: "combo",
    year: 2015,
    fuel: "Gasoline",
    vol_engine: 1.5,
    mileage: 50000,
    city: "Warszawa",
    province: "Mazowieckie"
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const predict = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/predict", form);

      const usdToInr = 83;
      setResult(res.data.predicted_price * usdToInr);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Car Price Predictor</h2>

        {/* Brand */}
        <label style={styles.label}>Brand</label>
        <select name="mark" onChange={handleChange} style={styles.input}>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
          <option value="bmw">BMW</option>
          <option value="toyota">Toyota</option>
        </select>

        {/* Model */}
        <label style={styles.label}>Model</label>
        <input
          name="model"
          placeholder="e.g. corolla"
          onChange={handleChange}
          style={styles.input}
        />

        {/* Fuel */}
        <label style={styles.label}>Fuel Type</label>
        <select name="fuel" onChange={handleChange} style={styles.input}>
          <option value="Gasoline">Gasoline</option>
          <option value="Diesel">Diesel</option>
          <option value="CNG">CNG</option>
        </select>

        {/* Year */}
        <label style={styles.label}>Year: {form.year}</label>
        <input
          type="range"
          name="year"
          min="2000"
          max="2024"
          value={form.year}
          onChange={handleChange}
        />

        {/* Engine */}
        <label style={styles.label}>
          Engine Size: {form.vol_engine} L
        </label>
        <input
          type="range"
          name="vol_engine"
          min="1.0"
          max="3.0"
          step="0.1"
          value={form.vol_engine}
          onChange={handleChange}
        />

        {/* Mileage */}
        <label style={styles.label}>
          Mileage: {form.mileage.toLocaleString()} km
        </label>
        <input
          type="range"
          name="mileage"
          min="0"
          max="300000"
          step="1000"
          value={form.mileage}
          onChange={handleChange}
        />

        {/* City */}
        <label style={styles.label}>City</label>
        <input name="city" onChange={handleChange} style={styles.input} />

        {/* Province */}
        <label style={styles.label}>Province</label>
        <input name="province" onChange={handleChange} style={styles.input} />

        {/* Button */}
        <button onClick={predict} style={styles.button}>
          {loading ? "Calculating..." : "Predict Price"}
        </button>

        {/* Result */}
        {result !== null && (
          <h3 style={styles.result}>
            💰 ₹ {Math.round(result).toLocaleString()}
          </h3>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    backgroundImage: "url('/car.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    padding: "30px",
    borderRadius: "15px",
    width: "360px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    color: "white"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "white"
  },
  label: {
    color: "white",
    fontSize: "14px",
    marginTop: "5px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px"
  },
  result: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "20px",
    fontWeight: "bold"
  }
};

export default Predictor;