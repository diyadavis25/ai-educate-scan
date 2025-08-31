from PIL import Image
import pytesseract
from .config import TESSERACT_PATH

# Configure Tesseract path on Windows if present
if TESSERACT_PATH and isinstance(TESSERACT_PATH, str):
    pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

def image_to_text(image_path: str) -> str:
    # Open image and run OCR
    with Image.open(image_path) as img:
        # Convert to grayscale to improve OCR stability
        img = img.convert("L")
        text = pytesseract.image_to_string(img)
    return text.strip()
