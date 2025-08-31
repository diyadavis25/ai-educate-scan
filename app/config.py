import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DB_URL = f"sqlite:///{(BASE_DIR / 'eduscan.db').as_posix()}"
MEDIA_DIR = BASE_DIR / "media"
MEDIA_DIR.mkdir(exist_ok=True)

# On Windows, set Tesseract path by env or fallback to common install path
# Set env var TESSERACT_PATH if not default.
TESSERACT_PATH = os.getenv("TESSERACT_PATH", r"C:\Program Files\Tesseract-OCR\tesseract.exe")
ALLOWED_IMAGE_EXT = {".png", ".jpg", ".jpeg"}

# CORS origins for your React app; tweak as needed
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
