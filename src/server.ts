import express, { Request, Response } from 'express';
import session from 'express-session';
import path from 'path';

const app = express();
const PORT = 3000;

// Extend session type
declare module 'express-session' {
  interface SessionData {
    user: string;
  }
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Session configuration
app.use(
  session({
    secret: 'ecoguide-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }) as any
);

// Authentication middleware
const requireAuth = (req: Request, res: Response, next: any) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Public routes
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  if (username && password) {
    req.session.user = username;
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/logout', (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Protected routes
app.get('/home', requireAuth, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/home.html'));
});

app.get('/daily-logs', requireAuth, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/daily-logs.html'));
});

app.get('/monthly-logs', requireAuth, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/monthly-logs.html'));
});

app.get('/leaderboard', requireAuth, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/leaderboard.html'));
});

app.get('/faq-contact', requireAuth, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/faq-contact.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 EcoGuide server running on http://localhost:${PORT}`);
});
