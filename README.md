URL Shortener Microservice – Demonstration
1. Console

Backend logs confirm that requests are processed and logging middleware is working:

Short URL creation logged with details.

Stats retrieval logged when requested.

<img width="787" height="221" alt="image" src="https://github.com/user-attachments/assets/2ad9865d-0ac9-4003-a165-2b72ad7bb27a" />


✅ Console clearly shows the lifecycle of each request.

2. Postman
(a) Shortening the URL

Endpoint: POST /shorten

Input: Long URL with optional validity.

Output: Returns generated shortCode, full shortUrl, and expiry time.

<img width="1392" height="837" alt="image" src="https://github.com/user-attachments/assets/d80d5099-00ba-4690-9cee-52d6e247e536" />



✅ API successfully creates a short link.

(b) Short URL Stats

Endpoint: GET /stats/:shortCode

Output: JSON with shortCode, originalUrl, createdAt, clicks, and expiry.

<img width="1315" height="775" alt="image" src="https://github.com/user-attachments/assets/f91c2884-8d0e-45d7-9ff8-ce51f7bb2402" />



✅ API correctly fetches statistics for the given short link.

3. MongoDB

Database stores records with all required fields:

shortCode (unique)

originalUrl

createdAt

expiry

clicks

<img width="1572" height="776" alt="image" src="https://github.com/user-attachments/assets/0d435848-6b76-447e-9e37-03ee5a3cf2bc" />


✅ Data model matches the design document, and records persist as expected.

//ok it is fine but make it look beautiful like headinf and all
