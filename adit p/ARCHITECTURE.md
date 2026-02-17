# System Architecture

## Contact Form Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                             │
└─────────────────────────────────────────────────────────────────┘

1. User visits portfolio → http://localhost:3000
                           │
                           ▼
2. User fills contact form (index.html)
   - Name
   - Email
   - Subject
   - Message
                           │
                           ▼
3. User clicks "Send" → script.js handles submission
                           │
                           ▼
4. Frontend sends POST request to backend
   → http://localhost:3000/api/contact
                           │
                           ▼
5. Backend (server.js) receives request
   ├─► Validates input data
   ├─► Saves to SQLite database (portfolio.db)
   └─► Sends email via Nodemailer
                           │
                           ▼
6. Email sent to your inbox
   - Beautiful HTML format
   - All contact details
   - Direct reply option
                           │
                           ▼
7. Success response sent to frontend
                           │
                           ▼
8. User sees "Sent! ✓" message


┌─────────────────────────────────────────────────────────────────┐
│                      SYSTEM COMPONENTS                           │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐
│   FRONTEND   │
└──────────────┘
    │
    ├─ index.html
    │  └─ Contact form UI
    │
    ├─ script.js
    │  ├─ Form validation
    │  ├─ API calls
    │  └─ User feedback
    │
    └─ style.css
       └─ Beautiful design

         │
         ▼

┌──────────────┐
│   BACKEND    │
└──────────────┘
    │
    ├─ server.js
    │  ├─ Express.js server
    │  ├─ API endpoints
    │  ├─ Database operations
    │  └─ Email sending
    │
    └─ .env
       └─ Email credentials

         │
         ▼

┌──────────────┐
│   DATABASE   │
└──────────────┘
    │
    └─ portfolio.db (SQLite)
       ├─ contacts table
       │  ├─ id
       │  ├─ name
       │  ├─ email
       │  ├─ subject
       │  ├─ message
       │  └─ created_at
       │
       └─ visitors table
          ├─ id
          ├─ ip_address
          ├─ user_agent
          ├─ page_visited
          └─ visited_at

         │
         ▼

┌──────────────┐
│    EMAIL     │
└──────────────┘
    │
    └─ Nodemailer
       ├─ Gmail SMTP
       ├─ HTML template
       └─ Send to your inbox


┌─────────────────────────────────────────────────────────────────┐
│                       API ENDPOINTS                              │
└─────────────────────────────────────────────────────────────────┘

POST   /api/contact          → Submit contact form
GET    /api/contacts         → Get all contacts
GET    /api/contacts/:id     → Get single contact
DELETE /api/contacts/:id     → Delete contact
POST   /api/track-visit      → Track page visit
GET    /api/stats            → Get statistics


┌─────────────────────────────────────────────────────────────────┐
│                      ADMIN DASHBOARD                             │
└─────────────────────────────────────────────────────────────────┘

admin.html
    │
    ├─ View all contacts
    ├─ See statistics
    │  ├─ Total messages
    │  ├─ Total visits
    │  └─ Unique visitors
    │
    ├─ Delete contacts
    └─ Auto-refresh every 30s


┌─────────────────────────────────────────────────────────────────┐
│                    EMAIL NOTIFICATION                            │
└─────────────────────────────────────────────────────────────────┘

When contact form is submitted:

1. Data saved to database ✓
2. Email composed with HTML template
3. Email sent via Gmail SMTP
4. You receive notification in inbox

Email contains:
├─ Sender's name
├─ Sender's email (clickable)
├─ Subject line
├─ Full message
└─ Professional formatting


┌─────────────────────────────────────────────────────────────────┐
│                      FILE STRUCTURE                              │
└─────────────────────────────────────────────────────────────────┘

adit-portfolio/
│
├── index.html              # Main portfolio page
├── style.css               # Styling
├── script.js               # Frontend JavaScript
├── server.js               # Backend server
├── admin.html              # Admin dashboard
│
├── package.json            # Dependencies
├── .env                    # Email config (SECRET!)
├── .env.example            # Config template
├── .gitignore              # Protect secrets
│
├── README.md               # Full documentation
├── SETUP_GUIDE.md          # Setup instructions
├── COMPLETION_SUMMARY.md   # What's implemented
│
└── portfolio.db            # SQLite database (auto-created)


┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY FEATURES                             │
└─────────────────────────────────────────────────────────────────┘

✓ Environment variables (.env)
✓ .gitignore for sensitive files
✓ App Passwords (not plain passwords)
✓ Input validation
✓ Error handling
✓ HTML escaping
✓ CORS configuration


┌─────────────────────────────────────────────────────────────────┐
│                   DEPLOYMENT READY                               │
└─────────────────────────────────────────────────────────────────┘

To deploy:
1. Choose hosting (Heroku, Railway, Render, etc.)
2. Set environment variables on platform
3. Update API URL in script.js
4. Deploy!
```

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start server (development with auto-reload)
npm run dev
```

## Access Points

- **Portfolio**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin.html
- **API Contacts**: http://localhost:3000/api/contacts
- **API Stats**: http://localhost:3000/api/stats

## Email Setup (Gmail)

1. Go to: https://myaccount.google.com/apppasswords
2. Generate App Password
3. Add to `.env` file:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

## Testing

1. Start server: `npm start`
2. Open: http://localhost:3000
3. Fill contact form
4. Check your email inbox
5. View admin dashboard: http://localhost:3000/admin.html
