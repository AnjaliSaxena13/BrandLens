
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="BrandLens API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://anjalisaxena13.github.io",
        "http://localhost:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class ReviewRequest(BaseModel):
    content: str
    approved_words: list[str] = []
    avoid_words: list[str] = []


@app.get("/")
def home():
    return {"message": "BrandLens API is running"}


@app.get("/api/health")
def health():
    return {"status": "online", "product": "BrandLens"}


@app.post("/api/reviews")
def review_content(request: ReviewRequest):
    content = request.content
    content_lower = content.lower()

    approved_found = [
        word for word in request.approved_words
        if word.lower() in content_lower
    ]

    avoid_found = [
        word for word in request.avoid_words
        if word.lower() in content_lower
    ]

    return {
        "content": content,
        "approved_words_found": approved_found,
        "avoid_words_found": avoid_found,
        "passed": len(avoid_found) == 0,
    }
