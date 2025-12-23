import express, { Request, Response } from 'express';
import session from 'express-session';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Path to users JSON file
const USERS_FILE = path.join(__dirname, '../data/users.json');
const USER_SCORES_FILE = path.join(__dirname, '../data/user-scores.json');
const DAILY_LOGS_FILE = path.join(__dirname, '../data/daily-logs.json');
const MONTHLY_LOGS_FILE = path.join(__dirname, '../data/monthly-logs.json');

// Ensure data directory exists
const dataDir = path.dirname(USERS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// Initialize user scores file if it doesn't exist
if (!fs.existsSync(USER_SCORES_FILE)) {
  fs.writeFileSync(USER_SCORES_FILE, JSON.stringify({}, null, 2));
}

// Initialize daily logs file if it doesn't exist
if (!fs.existsSync(DAILY_LOGS_FILE)) {
  fs.writeFileSync(DAILY_LOGS_FILE, JSON.stringify({}, null, 2));
}

// Initialize monthly logs file if it doesn't exist
if (!fs.existsSync(MONTHLY_LOGS_FILE)) {
  fs.writeFileSync(MONTHLY_LOGS_FILE, JSON.stringify({}, null, 2));
}

// User interface
interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  password: string;
  createdAt: string;
}

// Helper functions for user management
function readUsers(): User[] {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

function writeUsers(users: User[]): boolean {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing users file:', error);
    return false;
  }
}

function findUserByEmailOrUsername(emailOrUsername: string): User | undefined {
  const users = readUsers();
  return users.find(
    user => user.email === emailOrUsername || user.username === emailOrUsername
  );
}

function generateUserId(): string {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

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
    secret: 'ecoguide-secret-key-change-this-in-production',
    resave: true, // Changed to true to save session on every request
    saveUninitialized: true, // Changed to true to save new sessions
    rolling: true, // Reset maxAge on every response
    cookie: { 
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      sameSite: 'lax' // Allow cookies across same-site navigation
    }
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

// Registration endpoint
app.post('/api/register', (req: Request, res: Response) => {
  const { fullName, email, username, password } = req.body;
  
  // Validation
  if (!fullName || !email || !username || !password) {
    return res.json({ success: false, message: 'All fields are required' });
  }
  
  if (fullName.trim().length < 2) {
    return res.json({ success: false, message: 'Full name must be at least 2 characters' });
  }
  
  if (username.length < 3) {
    return res.json({ success: false, message: 'Username must be at least 3 characters' });
  }
  
  if (password.length < 6) {
    return res.json({ success: false, message: 'Password must be at least 6 characters' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({ success: false, message: 'Invalid email address' });
  }
  
  // Check if user already exists
  const users = readUsers();
  const existingUser = users.find(
    user => user.email === email || user.username === username
  );
  
  if (existingUser) {
    if (existingUser.email === email) {
      return res.json({ success: false, message: 'Email already registered' });
    }
    if (existingUser.username === username) {
      return res.json({ success: false, message: 'Username already taken' });
    }
  }
  
  // Create new user
  const newUser: User = {
    id: generateUserId(),
    fullName: fullName.trim(),
    email: email.toLowerCase().trim(),
    username: username.trim(),
    password: password, // In production, hash this!
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  if (writeUsers(users)) {
    console.log(`✅ New user registered: ${username} (${email})`);
    res.json({ success: true, message: 'Account created successfully' });
  } else {
    res.json({ success: false, message: 'Failed to create account. Please try again.' });
  }
});

// Login endpoint
app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.json({ success: false, message: 'Username and password are required' });
  }
  
  const user = findUserByEmailOrUsername(username);
  
  if (user && user.password === password) {
    req.session.user = user.username;
    console.log(`✅ User logged in: ${user.username}`);
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid email/username or password' });
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

// API endpoint to save monthly log with score
app.post('/api/monthly-log', requireAuth, (req: Request, res: Response) => {
  const { month, data, score, scoreBreakdown } = req.body;
  const username = req.session.user;
  
  try {
    // Read existing scores
    const scoresData = fs.readFileSync(USER_SCORES_FILE, 'utf-8');
    const scores = JSON.parse(scoresData);
    
    // Save full monthly log data
    const monthlyLogsData = fs.readFileSync(MONTHLY_LOGS_FILE, 'utf-8');
    const monthlyLogs = JSON.parse(monthlyLogsData);
    
    if (!monthlyLogs[username]) {
      monthlyLogs[username] = [];
    }
    
    monthlyLogs[username].push({
      month: month,
      data: data,
      score: score,
      scoreBreakdown: scoreBreakdown,
      timestamp: new Date().toISOString()
    });
    
    fs.writeFileSync(MONTHLY_LOGS_FILE, JSON.stringify(monthlyLogs, null, 2));
    
    console.log(`✅ Updated monthly log for ${username}: ${score} points`);
    console.log(`   Electricity: ${scoreBreakdown?.electricity?.subtotal || 0}, Water: ${scoreBreakdown?.water?.subtotal || 0}, Travel: ${scoreBreakdown?.travel?.subtotal || 0}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving monthly log:', error);
    res.json({ success: false, message: 'Failed to save score' });
  }
});

// API endpoint to save daily log
app.post('/api/daily-log', requireAuth, (req: Request, res: Response) => {
  const { date, data, score, scoreBreakdown } = req.body;
  const username = req.session.user;
  
  try {
    const dailyLogsData = fs.readFileSync(DAILY_LOGS_FILE, 'utf-8');
    const dailyLogs = JSON.parse(dailyLogsData);
    
    if (!dailyLogs[username]) {
      dailyLogs[username] = [];
    }
    
    dailyLogs[username].push({
      date: date,
      data: data,
      score: score,
      scoreBreakdown: scoreBreakdown,
      timestamp: new Date().toISOString()
    });
    
    fs.writeFileSync(DAILY_LOGS_FILE, JSON.stringify(dailyLogs, null, 2));
    
    console.log(`✅ Saved daily log for ${username}: ${score} points`);
    console.log(`   Transport: ${scoreBreakdown?.transport?.subtotal || 0}, Energy: ${scoreBreakdown?.energy?.subtotal || 0}, Water: ${scoreBreakdown?.water?.subtotal || 0}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving daily log:', error);
    res.json({ success: false, message: 'Failed to save daily log' });
  }
});

// API endpoint to get user's monthly logs
app.get('/api/monthly-logs', requireAuth, (req: Request, res: Response) => {
  const username = req.session.user;
  
  try {
    const monthlyLogsData = fs.readFileSync(MONTHLY_LOGS_FILE, 'utf-8');
    const monthlyLogs = JSON.parse(monthlyLogsData);
    
    const userLogs = monthlyLogs[username] || [];
    res.json({ success: true, logs: userLogs });
  } catch (error) {
    console.error('Error reading monthly logs:', error);
    res.json({ success: false, logs: [] });
  }
});

// API endpoint to get user's daily logs
app.get('/api/daily-logs', requireAuth, (req: Request, res: Response) => {
  const username = req.session.user;
  
  try {
    const dailyLogsData = fs.readFileSync(DAILY_LOGS_FILE, 'utf-8');
    const dailyLogs = JSON.parse(dailyLogsData);
    
    const userLogs = dailyLogs[username] || [];
    res.json({ success: true, logs: userLogs });
  } catch (error) {
    console.error('Error reading daily logs:', error);
    res.json({ success: false, logs: []
    };
    
    // Write back to file
    fs.writeFileSync(USER_SCORES_FILE, JSON.stringify(scores, null, 2));
    
    console.log(`✅ Updated score for ${username}: ${score}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving monthly log:', error);
    res.json({ success: false, message: 'Failed to save score' });
  }
});

// API endpoint to get current user's score
app.get('/api/user-score', requireAuth, (req: Request, res: Response) => {
  const username = req.session.user;
  
  try {
    const scoresData = fs.readFileSync(USER_SCORES_FILE, 'utf-8');
    const scores = JSON.parse(scoresData);
    
    const userScore = scores[username] || { score: 0, lastUpdated: null };
    res.json({ success: true, score: userScore.score, username: username });
  } catch (error) {
    console.error('Error reading user score:', error);
    res.json({ success: false, score: 0 });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 EcoGuide server running on http://localhost:${PORT}`);
});
