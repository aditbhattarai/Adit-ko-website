# Adit Bhattarai - Portfolio Website

A modern, professional portfolio website with backend functionality and email notifications.

## Features

- ✨ Modern, responsive design with smooth animations
- 📧 Contact form with email notifications
- 💾 SQLite database for storing contact submissions
- 📊 Visitor tracking and analytics
- 🎨 Beautiful UI with custom cursor effects

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Email**: Nodemailer

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

To receive email notifications when someone contacts you, you need to configure your email settings:

1. Open the `.env` file in the project root
2. Fill in your email credentials:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
RECIPIENT_EMAIL=your-email@gmail.com
```

#### For Gmail Users:

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password and paste it in the `.env` file as `EMAIL_PASSWORD`

**Important**: Use an App Password, NOT your regular Gmail password!

#### For Other Email Providers:

- **Outlook/Hotmail**: Set `EMAIL_SERVICE=outlook`
- **Yahoo**: Set `EMAIL_SERVICE=yahoo`
- **Other**: Check [Nodemailer's list of supported services](https://nodemailer.com/smtp/well-known/)

### 3. Start the Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## How It Works

### Contact Form Flow

1. User fills out the contact form on your website
2. Form data is sent to the backend API (`/api/contact`)
3. Data is saved to the SQLite database
4. An email notification is sent to your configured email address
5. User receives a success message

### Email Notification

When someone contacts you, you'll receive a beautifully formatted email with:
- Sender's name
- Sender's email address
- Subject line
- Full message content
- Direct reply capability

### Database

All contact submissions are stored in `portfolio.db` with the following information:
- Name, email, subject, message
- Timestamp of submission

You can view all contacts by accessing: `http://localhost:3000/api/contacts`

## API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/contacts` - Get all contacts
- **GET** `/api/contacts/:id` - Get single contact
- **DELETE** `/api/contacts/:id` - Delete contact

### Analytics
- **POST** `/api/track-visit` - Track page visit
- **GET** `/api/stats` - Get visitor statistics

## Project Structure

```
adit-portfolio/
├── index.html          # Main HTML file
├── style.css           # Styling
├── script.js           # Frontend JavaScript
├── server.js           # Backend server
├── package.json        # Dependencies
├── .env                # Email configuration (DO NOT COMMIT!)
├── .env.example        # Example configuration
├── .gitignore          # Git ignore rules
└── portfolio.db        # SQLite database (auto-generated)
```

## Security Notes

- ⚠️ Never commit your `.env` file to version control
- ⚠️ Use App Passwords, not your actual email password
- ⚠️ Keep your email credentials secure

## Troubleshooting

### Email Not Sending?

1. Check that your `.env` file is properly configured
2. Verify you're using an App Password (for Gmail)
3. Check the server console for error messages
4. Ensure 2-Step Verification is enabled (for Gmail)

### Database Issues?

The database is automatically created when you first start the server. If you encounter issues, delete `portfolio.db` and restart the server.

### Port Already in Use?

Change the `PORT` in your `.env` file to a different number (e.g., 3001, 8080)

## Deployment

When deploying to production:

1. Set environment variables on your hosting platform
2. Update the API URL in `script.js` from `http://localhost:3000` to your production URL
3. Ensure your `.env` file is not deployed (it should be in `.gitignore`)

## License

MIT License - feel free to use this for your own portfolio!

## Author

**Adit Bhattarai**
- Email: aditbhattarai@gmail.com
- Phone: +977 9864396814
- Location: Kathmandu, Nepal

---

Built with ❤️ by Adit Bhattarai
