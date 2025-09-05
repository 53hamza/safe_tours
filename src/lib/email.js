import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'safe.tourstravels52@gmail.com',
    pass: process.env.EMAIL_PASS, // App password for Gmail
  },
});

// Function to send email
export const sendBookingEmail = async (bookingData) => {
  const { fullName, email, mobile, bookingType, ...otherData } = bookingData;

  // Determine email subject and content based on type
  let subject, htmlContent;

  if (bookingType === 'enquiry') {
    subject = `New Enquiry from ${fullName}`;
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Enquiry Received</h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Enquiry:</strong></p>
          <p>${otherData.enquiry || 'N/A'}</p>
          ${otherData.carType ? `<p><strong>Car Type:</strong> ${otherData.carType}</p>` : ''}
        </div>
        <p style="color: #666; font-size: 12px;">This email was sent from your website contact form.</p>
      </div>
    `;
  } else {
    // Booking
    subject = `New Booking Request from ${fullName} - ${bookingType}`;
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Booking Request</h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Booking Type:</strong> ${bookingType}</p>
          <p><strong>Car Type:</strong> ${otherData.carType || 'N/A'}</p>
          <p><strong>From:</strong> ${otherData.from || 'N/A'}</p>
          <p><strong>To:</strong> ${otherData.to || 'N/A'}</p>
          <p><strong>Departure Date:</strong> ${otherData.departureDate || 'N/A'}</p>
          <p><strong>Departure Time:</strong> ${otherData.departureTime || 'N/A'}</p>
          ${otherData.returnDate ? `<p><strong>Return Date:</strong> ${otherData.returnDate}</p>` : ''}
          ${otherData.pickupTime ? `<p><strong>Pickup Time:</strong> ${otherData.pickupTime}</p>` : ''}
          ${otherData.estimateDistance ? `<p><strong>Estimated Distance:</strong> ${otherData.estimateDistance}</p>` : ''}
        </div>
        <p style="color: #666; font-size: 12px;">This email was sent from your website booking form.</p>
      </div>
    `;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER || 'safe.tourstravels52@gmail.com',
    to: 'safe.tourstravels52@gmail.com',
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};