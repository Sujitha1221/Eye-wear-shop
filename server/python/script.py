import cv2
import cvzone
import sys
import numpy as np
import requests
from io import BytesIO

# Check if the correct number of command-line arguments is provided
if len(sys.argv) != 2:
    print("Usage: python script.py <image_url>")
    sys.exit(1)

image_url = sys.argv[1]

# Download the image from the URL
try:
    response = requests.get(image_url)
    response.raise_for_status()
    image_data = BytesIO(response.content)
    image = cv2.imdecode(np.frombuffer(image_data.read(), np.uint8), -1)
except Exception as e:
    print(f"Error downloading or decoding the image from {image_url}: {e}")
    sys.exit(1)

# Check if the image was loaded successfully
if image is None:
    print(f"Error loading the image from {image_url}")
    sys.exit(1)

cap = cv2.VideoCapture(0)
cascade = cv2.CascadeClassifier('xml/haarcascade_frontalface_default.xml')

exit_flag = False  # Flag to control program exit

while not exit_flag:
    _, frame = cap.read()
    gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = cascade.detectMultiScale(gray_scale)
    
    for (x, y, w, h) in faces:
        # Resize the downloaded image to match the size of the detected face
        overlay_resize = cv2.resize(image, (w, h))
        
        # Get the ROI for overlay placement
        roi = frame[y:y+h, x:x+w]

        # Extract the alpha channel from the overlay
        alpha_channel = overlay_resize[:, :, 3]

        # Create a mask for the alpha channel
        mask = cv2.cvtColor(alpha_channel, cv2.COLOR_GRAY2BGR) / 255.0

        # Multiply the overlay with the mask and the inverse of the mask with the ROI
        overlayed_roi = cv2.multiply(roi.astype(float), (1.0 - mask))
        frame[y:y+h, x:x+w] = cv2.add(overlayed_roi, overlay_resize[:, :, 0:3] * mask)

    cv2.imshow('Virtual Try On', frame)

    key = cv2.waitKey(10)
    
    if key == ord('q'):
        exit_flag = True  # Set the exit flag when 'q' is pressed
    elif cv2.getWindowProperty('Virtual Try On', cv2.WND_PROP_VISIBLE) < 1:
        exit_flag = True  # Set the exit flag if the window is closed

cap.release()
cv2.destroyAllWindows()