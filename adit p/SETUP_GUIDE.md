# Quick Setup Guide

## ✅ What's Been Completed

Your portfolio website now has:
1. ✅ Backend server with Express.js
2. ✅ SQLite database for storing contacts
3. ✅ Email notification system using Nodemailer
4. ✅ Contact form connected to the backend
5. ✅ Visitor tracking and analytics

## 🚀 Next Steps to Get Everything Running

### Step 1: Install Node.js (if not already installed)

1. Download Node.js from: https://nodejs.org/
2. Install the LTS (Long Term Support) version
3. Restart your terminal/command prompt after installation

### Step 2: Install Dependencies

Open a terminal in your project folder and run:

```bash
npm install
```

This will install:
- express (web server)
- sqlite3 (database)
- cors (cross-origin requests)
- nodemailer (email sending)
- dotenv (environment variables)
- nodemon (development auto-reload)

### Step 3: Configure Email Settings

1. Open the `.env` file in your project folder
2. Add your email credentials:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
RECIPIENT_EMAIL=your-email@gmail.com
```

#### 📧 How to Get Gmail App Password:

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in to your Google Account
3. Select "Mail" as the app
4. Select "Windows Computer" as the device
5. Click "Generate"
6. Copy the 16-character password (remove spaces)
7. Paste it as `EMAIL_PASSWORD` in your `.env` file

**Important**: You need 2-Step Verification enabled on your Google Account to use App Passwords!

### Step 4: Start the Server

Run one of these commands:

```bash
# Production mode
npm start

# Development mode (auto-restarts on file changes)
npm run dev
```

### Step 5: Open Your Website

Open your browser and go to:
```
http://localhost:3000
```

## 🎉 Testing the Contact Form

1. Navigate to the Contact section on your website
2. Fill out the form with test data
3. Click "Send"
4. You should:
   - See a success message on the website
   - Receive an email notification at your configured email address
   - See the contact saved in the database

## 📊 Viewing Contacts

To see all contact form submissions, visit:
```
http://localhost:3000/api/contacts
```

This will show you all contacts in JSON format.

## 🔧 Troubleshooting

### "npm is not recognized"
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### Email not sending?
- Check your `.env` file is properly configured
- Make sure you're using an App Password, not your regular password
- Verify 2-Step Verification is enabled on your Google Account
- Check the server console for error messages

### Port already in use?
- Change `PORT=3000` to `PORT=3001` in your `.env` file
- Update the URL in `script.js` line 122 to match the new port

### Database errors?
- Delete `portfolio.db` file and restart the server
- The database will be automatically recreated

## 📁 Important Files

- **server.js** - Backend server code
- **script.js** - Frontend JavaScript (connects form to backend)
- **.env** - Your email configuration (KEEP THIS SECRET!)
- **portfolio.db** - SQLite database (auto-created)
- **package.json** - Project dependencies

## 🔒 Security Reminders

- ⚠️ NEVER commit your `.env` file to Git/GitHub
- ⚠️ Use App Passwords, not your actual email password
- ⚠️ The `.gitignore` file is already configured to protect sensitive files

## 🌐 Deploying to Production

When you're ready to deploy:

1. Choose a hosting platform (Heroku, Railway, Render, etc.)
2. Set environment variables on the platform (same as `.env` file)
3. Update `script.js` line 122 to use your production URL instead of `localhost`
4. Deploy your code

## 📞 Need Help?

If you encounter any issues:
1. Check the server console for error messages
2. Check the browser console (F12) for frontend errors
3. Verify all dependencies are installed (`npm install`)
4. Make sure the `.env` file is properly configured

---

**Your portfolio is ready! Just install dependencies and configure your email settings to start receiving contact notifications! 🎊**
