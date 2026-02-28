const fs = require('fs');

async function testUpload() {
    console.log("Creating dummy PDF...");
    fs.writeFileSync('dummy.pdf', '%PDF-1.4\n1 0 obj\n<<>>\nendobj\n%%EOF');

    // First, login to get token
    console.log("Logging in...");
    const loginRes = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: "test@profilebooster.com", password: "password123" })
    });
    const loginData = await loginRes.json();
    const token = loginData.accessToken;
    console.log("Got token:", !!token);

    if (!token) {
        console.error("Login failed", loginData);
        return;
    }

    console.log("Uploading PDF...");

    // Using simple FormData polyfill logic for Node 18+ (Fetch API)
    const formData = new FormData();
    const fileBlob = new Blob([fs.readFileSync('dummy.pdf')], { type: 'application/pdf' });
    formData.append('file', fileBlob, 'dummy.pdf');

    const uploadRes = await fetch('http://localhost:3001/profile/upload-cv-pdf', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    console.log("Status:", uploadRes.status);
    const result = await uploadRes.text();
    console.log("Response:", result);
}

testUpload();
