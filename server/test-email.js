// Test script to send a test email
require('dotenv').config();

const testEmailData = {
  name: "Test User",
  email: "test@example.com",
  selectedSeats: ["A1", "A2"],
  guests: 2,
  phone: "+598 96 109 982",
  dietary: "Vegetariano",
  confirmationNumber: "ADA123456"
};

console.log('🧪 Testing email sending...');
console.log('📧 Gmail user:', process.env.GMAIL_USER || 'Not configured');
console.log('🔑 App password:', process.env.GMAIL_APP_PASSWORD ? 'Configured' : 'Not configured');

fetch('http://localhost:3001/send-confirmation', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testEmailData),
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('✅ Email test successful!');
    console.log('📨 Message ID:', data.messageId);
  } else {
    console.log('❌ Email test failed:');
    console.log('Error:', data.error);
    console.log('Details:', data.details);
  }
  process.exit(0);
})
.catch(error => {
  console.error('❌ Request failed:', error.message);
  process.exit(1);
});