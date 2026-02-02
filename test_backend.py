import requests
import time
import subprocess
import os
import signal

# Start the backend server
print("Starting backend server...")
proc = subprocess.Popen(['python', 'backend/app.py'], 
                        stdout=subprocess.PIPE, 
                        stderr=subprocess.PIPE,
                        text=True)

time.sleep(5) # Give it time to start

try:
    print("Testing health/index...")
    # Based on app.py, let's see what routes are available
    # It has serve_uploads
    response = requests.get('http://127.0.0.1:5000/uploads/logos/1f778ff1-d4f0-468c-b5ff-3ac258871349_receipt.jpg')
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("Backend is serving files successfully!")
    else:
        print(f"Backend failed to serve file. Status: {response.status_code}")
except Exception as e:
    print(f"Error connecting to backend: {e}")

# Kill the process
proc.terminate()
print("Backend server stopped.")
