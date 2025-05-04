from ultralytics import YOLO

model = YOLO("best.pt")

def run_detection(video_path):
    results = model.predict(source=video_path, save=False)
    
    # Check if any frame has an accident detected
    accident_detected = any(len(res.boxes) > 0 for res in results)

    if accident_detected:
        return "Accident detected in video"
    else:
        return "No accident found"
