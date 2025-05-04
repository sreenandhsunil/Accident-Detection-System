from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from ultralytics import YOLO
import os
import shutil
import cv2
import time
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("best.pt")  # Load your trained YOLOv8 model

UPLOAD_DIR = "uploads"
SCREENSHOT_DIR = "screenshots"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

@app.post("/analyze")
async def analyze(video: UploadFile = File(...)):
    timestamp = int(time.time())
    filename = f"{timestamp}_{video.filename}"
    video_path = os.path.join(UPLOAD_DIR, filename)

    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)

    # Run detection
    results = model(video_path, stream=False)
    accident_detected = False
    confidence = 0.0
    frame_screenshot = None

    for result in results:
        if len(result.boxes) > 0:
            accident_detected = True
            confidence = result.boxes.conf[0].item()
            # Save a frame as screenshot
            cap = cv2.VideoCapture(video_path)
            ret, frame = cap.read()
            if ret:
                screenshot_path = os.path.join(SCREENSHOT_DIR, f"snap_{timestamp}.jpg")
                cv2.imwrite(screenshot_path, frame)
                frame_screenshot = screenshot_path
            break

    # Mock location & alerts
    location = "Main Street Junction, Kochi"
    alert_sent = accident_detected  # Simulate alert sent if accident

    result = {
        "accident_detected": accident_detected,
        "confidence": confidence,
        "timestamp": datetime.now().isoformat(),
        "location": location,
        "screenshot_path": frame_screenshot,
        "alert_sent": alert_sent
    }

    return JSONResponse(content=result)
