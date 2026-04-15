from fastapi import FastAPI
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model & preprocessor
model = joblib.load("model.pkl")
preprocessor = joblib.load("preprocessor.pkl")


@app.get("/")
def home():
    return {"message": "Car Price Predictor API running 🚗"}


@app.post("/predict")
def predict(data: dict):
    try:
        import pandas as pd

        # Default values (match your dataset columns)
        default_data = {
            "province": "Unknown",
            "mark": "toyota",
            "model": "corolla",
            "year": 2015,
            "fuel": "petrol",
            "vol_engine": 1.5,
            "mileage": 50000,
            "city": "Unknown"
        }

        # Override with user input
        default_data.update(data)

        input_df = pd.DataFrame([default_data])

        processed = preprocessor.transform(input_df)
        prediction = model.predict(processed)

        return {"predicted_price": float(prediction[0])}

    except Exception as e:
        return {"error": str(e)}

