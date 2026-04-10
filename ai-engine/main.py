from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

app = FastAPI(title="Apna Karigar AI Engine")

# Allow the Next.js frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the Gemini Client
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("⚠️ WARNING: GEMINI_API_KEY is missing from .env file!")
client = genai.Client(api_key=api_key)

# --- DATA MODELS ---
class JobRequest(BaseModel):
    description: str
    category: str

class MatchRequest(BaseModel):
    budget: int
    category: str
    location: str

# --- ROUTES ---
@app.get("/")
def health_check():
    return {"status": "✅ AI Engine is running optimally"}

@app.post("/estimate-price")
def estimate_price(job: JobRequest):
    prompt = f"""
    Act as the Apna Karigar AI Estimator.
    Job Category: {job.category}
    Description: {job.description}
    Provide a realistic estimated fair price range in INR and a 1-sentence justification.
    Format exactly like this: Price: [Range] | Justification: [Text]
    """
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        parts = response.text.split('|')
        price = parts[0].replace('Price:', '').strip()
        justification = parts[1].replace('Justification:', '').strip()
        
        return {"price_range": price, "justification": justification}
    except Exception as e:
        print(f"AI Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate AI estimate")

@app.post("/recommend")
def recommend_worker(match: MatchRequest):
    # This acts as our ML mock-logic for the MVP
    # If the budget is high, recommend a contractor. Otherwise, a worker.
    recommended_tier = "Contractor" if match.budget > 15000 else "Worker"
    
    return {
        "recommended_tier": recommended_tier,
        "confidence_score": 0.94,
        "matched_profiles": [
            {"name": "Raj Kumar Gupta", "skills": [match.category, "Team Management"], "trust_score": 98},
            {"name": "Satyam Yadav", "skills": [match.category], "trust_score": 95}
        ]
    }