import cv2
import cvzone
import sys

# Check if the correct number of command-line arguments is provided
if len(sys.argv) != 2:
    print("Usage: python script.py <image_filename>")
    sys.exit(1)

image_filename = "assets/"+sys.argv[1]

# Load the overlay image with alpha channel
overlay = cv2.imread(image_filename, cv2.IMREAD_UNCHANGED)

# Check if the image file was loaded successfully
if overlay is None:
    print(f"Error loading the image from {image_filename}")
    sys.exit(1)

cap = cv2.VideoCapture(0)
cascade = cv2.CascadeClassifier('xml/haarcascade_frontalface_default.xml')

while True:
    _, frame = cap.read()
    gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = cascade.detectMultiScale(gray_scale)
    
    for (x, y, w, h) in faces:
        # Resize the overlay to match the size of the detected face
        overlay_resize = cv2.resize(overlay, (w, h))
        
        # Get the ROI for overlay placement
        roi = frame[y:y+h, x:x+w]

        # Extract the alpha channel from the overlay
        alpha_channel = overlay_resize[:, :, 3]

        # Create a mask for the alpha channel
        mask = cv2.cvtColor(alpha_channel, cv2.COLOR_GRAY2BGR) / 255.0

        # Multiply the overlay with the mask and the inverse of the mask with the ROI
        overlayed_roi = cv2.multiply(roi.astype(float), (1.0 - mask))
        frame[y:y+h, x:x+w] = cv2.add(overlayed_roi, overlay_resize[:, :, 0:3] * mask)

    cv2.imshow('Virtual Try On - Press "Q" to exit', frame)
    
    if cv2.waitKey(10) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
