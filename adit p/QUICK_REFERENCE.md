# 🚀 Quick Reference Card

## ⚡ Quick Start (3 Steps)

```bash
# 1. Install dependencies
npm install

# 2. Configure email in .env file
# (Edit .env and add your Gmail credentials)

# 3. Start server
npm start
```

## 🌐 URLs

| What | URL |
|------|-----|
| **Portfolio Website** | http://localhost:3000 |
| **Admin Dashboard** | http://localhost:3000/admin.html |
| **All Contacts (JSON)** | http://localhost:3000/api/contacts |
| **Statistics (JSON)** | http://localhost:3000/api/stats |

## 📧 Email Setup (Gmail)

1. **Enable 2-Step Verification**: https://myaccount.google.com/security
2. **Generate App Password**: https://myaccount.google.com/apppasswords
3. **Edit `.env` file**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   RECIPIENT_EMAIL=your-email@gmail.com
   ```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `server.js` | Backend server (Express + SQLite + Nodemailer) |
| `script.js` | Frontend JavaScript (connects form to API) |
| `.env` | **SECRET** - Your email credentials |
| `admin.html` | Dashboard to view/manage contacts |
| `portfolio.db` | SQLite database (auto-created) |

## 🔧 Commands

```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start server (development - auto-reload)
npm run dev

# Stop server
Ctrl + C
```

## 🎯 What Happens When Someone Contacts You

1. ✅ Form data saved to SQLite database
2. ✅ Email sent to your inbox with all details
3. ✅ User sees success message
4. ✅ You can view/manage in admin dashboard

## 📊 API Endpoints

### Contact Management
```
POST   /api/contact          → Submit contact form
GET    /api/contacts         → Get all contacts
GET    /api/contacts/:id     → Get single contact
DELETE /api/contacts/:id     → Delete contact
```

### Analytics
```
POST   /api/track-visit      → Track page visit
GET    /api/stats            → Get statistics
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "npm is not recognized" | Install Node.js from https://nodejs.org/ |
| Email not sending | Check `.env` file, use App Password, enable 2-Step Verification |
| Port already in use | Change `PORT=3000` to `PORT=3001` in `.env` |
| Database error | Delete `portfolio.db` and restart server |
| CORS error | Make sure server is running on port 3000 |

## 🔒 Security Checklist

- ✅ `.env` file is in `.gitignore`
- ✅ Using App Password (not regular password)
- ✅ Never commit `.env` to Git
- ✅ Keep `portfolio.db` private

## 📚 Documentation Files

| File | What's Inside |
|------|---------------|
| `README.md` | Complete documentation |
| `SETUP_GUIDE.md` | Step-by-step setup |
| `COMPLETION_SUMMARY.md` | What's implemented |
| `ARCHITECTURE.md` | System architecture |
| `QUICK_REFERENCE.md` | This file! |

## 🎨 Features Implemented

✅ Contact form with validation
✅ SQLite database storage
✅ Email notifications (HTML formatted)
✅ Admin dashboard
✅ Visitor tracking
✅ Statistics API
✅ Delete contacts
✅ Auto-refresh dashboard
✅ Error handling
✅ Security best practices

## 📞 Testing Your Setup

1. Start server: `npm start`
2. Open: http://localhost:3000
3. Scroll to contact form
4. Fill in test data:
   - Name: Test User
   - Email: test@example.com
   - Subject: Testing
   - Message: This is a test message
5. Click "Send"
6. Check your email inbox
7. Open admin dashboard: http://localhost:3000/admin.html
8. Verify contact appears

## 🚀 Deployment Checklist

When ready to deploy:

- [ ] Choose hosting platform (Heroku, Railway, Render, etc.)
- [ ] Set environment variables on platform
- [ ] Update API URL in `script.js` (line 122)
- [ ] Test contact form on production
- [ ] Verify emails are being sent
- [ ] Check admin dashboard works

## 💡 Pro Tips

1. **Keep server running** while testing
2. **Check browser console** (F12) for errors
3. **Check server console** for backend logs
4. **Use admin dashboard** to manage contacts easily
5. **Backup `.env` file** securely (don't commit to Git!)
6. **Test email** before going live

## 📧 Email Template Preview

Your email notifications will look like:

```
┌────────────────────────────────────┐
│ New Contact Form Submission        │
├────────────────────────────────────┤
│ Name: John Doe                     │
│ Email: john@example.com            │
│ Subject: Project Inquiry           │
│                                    │
│ Message:                           │
│ ┌────────────────────────────────┐ │
│ │ Hi Adit, I'd like to discuss...│ │
│ └────────────────────────────────┘ │
│                                    │
│ 💡 Reply directly to:              │
│    john@example.com                │
└────────────────────────────────────┘
```

## 🎊 You're Ready!

Everything is set up and ready to go. Just:
1. Configure your email in `.env`
2. Run `npm install`
3. Run `npm start`
4. Test the contact form!

**Questions?** Check the other documentation files for detailed help.

---

**Made with ❤️ for Adit Bhattarai's Portfolio**
