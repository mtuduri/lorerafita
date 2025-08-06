const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// Create Gmail transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};

// Email template
const createEmailHTML = (bookingData) => {
  const { name, email, selectedSeats, guests, phone, dietary, confirmationNumber } = bookingData;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .label { font-weight: bold; color: #667eea; }
        .footer { text-align: center; margin-top: 30px; color: #666; }
        .plane { font-size: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="plane">✈️💕</div>
          <h1>¡Confirmación de Reserva!</h1>
          <p>Vuelo ADA2024 - Destino: Para Siempre</p>
        </div>
        
        <div class="content">
          <p>Hola <strong>${name}</strong>,</p>
          <p>¡Tu reserva ha sido confirmada exitosamente!</p>
          
          <div class="details">
            <h3>📋 DETALLES DE LA RESERVA</h3>
            <div class="detail-row">
              <span class="label">🎫 Número de Confirmación:</span>
              <span><strong>${confirmationNumber}</strong></span>
            </div>
            <div class="detail-row">
              <span class="label">🛫 Vuelo:</span>
              <span>ADA2024</span>
            </div>
            <div class="detail-row">
              <span class="label">👤 Pasajero:</span>
              <span>${name}</span>
            </div>
            <div class="detail-row">
              <span class="label">💺 Asientos:</span>
              <span><strong>${selectedSeats.join(', ')}</strong></span>
            </div>
            <div class="detail-row">
              <span class="label">👥 Número de invitados:</span>
              <span>${guests}</span>
            </div>
            <div class="detail-row">
              <span class="label">📞 Teléfono:</span>
              <span>${phone || 'No proporcionado'}</span>
            </div>
            <div class="detail-row">
              <span class="label">🍽️ Restricciones alimentarias:</span>
              <span>${dietary || 'Ninguna'}</span>
            </div>
          </div>
          
          <p><strong>¡Esperamos verte pronto a bordo!</strong></p>
          <p>Por favor, guarda este email como comprobante de tu reserva.</p>
          
          <div class="footer">
            <p>Con amor,<br>
            <strong>${process.env.SENDER_NAME || 'El equipo de Wedding ADA2024'}</strong> ✈️💕</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Wedding email server is running' });
});

// Send confirmation email endpoint
app.post('/send-confirmation', async (req, res) => {
  console.log('📨 Received email request:', req.body);
  
  try {
    const { name, email, selectedSeats, guests, phone, dietary, confirmationNumber } = req.body;

    // Validate required fields
    if (!name || !email || !selectedSeats || !confirmationNumber) {
      console.error('❌ Missing required fields');
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, selectedSeats, confirmationNumber' 
      });
    }

    console.log('✅ All required fields present');
    console.log('🔧 Creating transporter...');

    // Create transporter
    const transporter = createTransporter();

    // Email options
    const mailOptions = {
      from: `"${process.env.SENDER_NAME || 'Wedding ADA2024'}" <${process.env.GMAIL_USER}>`,
      to: 'inmobiliaria1920@gmail.com',
      subject: `✈️ Confirmación de Reserva - Vuelo ADA2024 (${confirmationNumber})`,
      html: createEmailHTML({
        name,
        email,
        selectedSeats,
        guests,
        phone,
        dietary,
        confirmationNumber
      })
    };

    console.log('📧 Attempting to send email to:', mailOptions.to);
    console.log('📝 Subject:', mailOptions.subject);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('📨 Message ID:', info.messageId);
    
    res.json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Confirmation email sent successfully' 
    });

  } catch (error) {
    console.error('❌ Error sending email:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    res.status(500).json({ 
      error: 'Failed to send confirmation email',
      details: error.message,
      code: error.code 
    });
  }
});

// Test email configuration on startup
const testEmailConfig = () => {
  if (!process.env.GMAIL_USER) {
    console.error('❌ GMAIL_USER not configured in .env file');
    return false;
  }
  if (!process.env.GMAIL_APP_PASSWORD) {
    console.error('❌ GMAIL_APP_PASSWORD not configured in .env file');
    return false;
  }
  console.log('✅ Email configuration looks good');
  return true;
};

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Wedding email server running on http://localhost:${PORT}`);
  console.log('📧 Gmail user:', process.env.GMAIL_USER || 'Not configured');
  console.log('🔑 App password:', process.env.GMAIL_APP_PASSWORD ? 'Configured' : 'Not configured');
  console.log('📧 Emails will be sent to: tuduri.matias@gmail.com');
  console.log('');
  testEmailConfig();
  console.log('');
  console.log('🔍 To test: POST http://localhost:3001/send-confirmation');
});

module.exports = app;