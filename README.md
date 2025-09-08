🚀 URL Shortener Microservice – Demonstration
1. Console Output

Backend logs confirm that requests are processed and the logging middleware is functional.

Short URL creation logged with details

Stats retrieval logged when requested

<p align="center"> <img width="787" height="221" alt="Console Logs" src="https://github.com/user-attachments/assets/2ad9865d-0ac9-4003-a165-2b72ad7bb27a" /> </p>

✅ Console clearly shows the lifecycle of each request.

2. Postman Testing
🔹 (a) Shortening the URL

Endpoint: POST /shorten

Input: Long URL with optional validity

Output: Returns shortCode, shortUrl, and expiry

<p align="center"> <img width="1392" height="837" alt="Shortening URL" src="https://github.com/user-attachments/assets/d80d5099-00ba-4690-9cee-52d6e247e536" /> </p>

✅ API successfully creates a short link.

🔹 (b) Fetching Short URL Stats

Endpoint: GET /stats/:shortCode

Output: JSON with shortCode, originalUrl, createdAt, clicks, and expiry

<p align="center"> <img width="1315" height="775" alt="Short URL Stats" src="https://github.com/user-attachments/assets/f91c2884-8d0e-45d7-9ff8-ce51f7bb2402" /> </p>

✅ API correctly fetches statistics for the given short link.

3. MongoDB Storage

The database correctly stores all required fields:

shortCode (unique)

originalUrl

createdAt

expiry

clicks

<p align="center"> <img width="1572" height="776" alt="MongoDB Records" src="https://github.com/user-attachments/assets/0d435848-6b76-447e-9e37-03ee5a3cf2bc" /> </p>

✅ Data model perfectly matches the design document, and records persist as expected.

✅ Summary

📌 Console → Logs lifecycle of requests

📌 Postman → Verified shorten & stats endpoints

📌 MongoDB → Schema-compliant storage with expiry & click tracking

👉 The system is working end-to-end as intended.
