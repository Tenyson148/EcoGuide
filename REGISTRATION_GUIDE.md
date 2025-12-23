# EcoGuide Registration System

## Overview
EcoGuide now includes a complete user registration and authentication system with JSON-based storage.

## Features Added

### ✅ User Registration
- **Registration Modal**: Beautiful modal popup for creating new accounts
- **Form Validation**: Real-time validation for all fields
- **Required Fields**:
  - Full Name (minimum 2 characters)
  - Email Address (valid email format)
  - Username (minimum 3 characters)
  - Password (minimum 6 characters)
  - Confirm Password (must match)
  - Terms & Conditions agreement

### ✅ User Authentication
- **Login System**: Secure login with email or username
- **Session Management**: Express session-based authentication
- **Remember Me**: Option to save username for future logins
- **Password Visibility Toggle**: Show/hide password feature

### ✅ Data Storage
- **JSON File Storage**: User data stored in `data/users.json`
- **User Data Structure**:
  ```json
  {
    "id": "user_1234567890_abc123def",
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "securepass123",
    "createdAt": "2024-12-22T21:48:00.000Z"
  }
  ```

## Files Modified/Created

### Modified Files
1. **public/login.html**
   - Added registration modal with complete form
   - Updated register link to open modal

2. **public/css/login.css**
   - Added modal styles and animations
   - Responsive design for registration form
   - Custom scrollbar for modal content

3. **public/js/login.js**
   - Complete rewrite with registration functionality
   - Form validation for both login and registration
   - Modal management (open/close/events)
   - API integration for registration

4. **src/server.ts**
   - Added user management functions
   - New `/api/register` endpoint
   - Updated `/api/login` endpoint to check against users.json
   - File system integration for JSON storage

### Created Files
1. **data/users.json** - User database file (initially empty array)
2. **REGISTRATION_GUIDE.md** - This documentation file

## API Endpoints

### POST /api/register
Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "securepass123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Account created successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

### POST /api/login
Authenticate a user.

**Request Body:**
```json
{
  "username": "johndoe",  // Can be email or username
  "password": "securepass123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid email/username or password"
}
```

## Usage

### For Users

1. **Creating an Account**:
   - Click "Create Account" on the login page
   - Fill in all required fields
   - Agree to Terms & Conditions
   - Click "Create Account" button
   - Wait for success message
   - Login with your new credentials

2. **Logging In**:
   - Enter your email or username
   - Enter your password
   - Optionally check "Remember me"
   - Click "Sign In"

### For Developers

1. **Start the Server**:
   ```bash
   npm run dev
   ```

2. **Access the Application**:
   - Open browser to `http://localhost:3000`
   - Server runs on port 3000

3. **View Registered Users**:
   - Check `data/users.json` file
   - Users are stored in JSON array format

## Security Notes

⚠️ **IMPORTANT - Current Implementation**

This is a **development/prototype** implementation with the following security considerations:

### Current State (Development Only)
- ✅ Form validation on client and server
- ✅ Duplicate email/username prevention
- ✅ Session-based authentication
- ❌ **Passwords stored in plain text**
- ❌ No password hashing
- ❌ No HTTPS enforcement
- ❌ No rate limiting
- ❌ No CSRF protection

### Before Production
**MUST implement**:

1. **Password Hashing**:
   ```javascript
   // Install bcrypt
   npm install bcrypt
   
   // Hash password before storing
   const bcrypt = require('bcrypt');
   const hashedPassword = await bcrypt.hash(password, 10);
   
   // Verify password on login
   const isValid = await bcrypt.compare(password, user.password);
   ```

2. **Environment Variables**:
   ```javascript
   // Use .env file for secrets
   SESSION_SECRET=your-secret-key-here
   ```

3. **HTTPS**: Use SSL certificates for production

4. **Database**: Replace JSON file with proper database (MongoDB, PostgreSQL, etc.)

5. **Input Sanitization**: Add additional validation and sanitization

6. **Rate Limiting**: Prevent brute force attacks

7. **CSRF Tokens**: Add CSRF protection for forms

## Validation Rules

### Client-Side Validation
- Full Name: Minimum 2 characters
- Email: Valid email format (regex validated)
- Username: Minimum 3 characters, alphanumeric
- Password: Minimum 6 characters
- Confirm Password: Must match password
- Terms: Must be checked

### Server-Side Validation
- All fields required
- Email format validation
- Username/email uniqueness check
- Password length validation
- Full name length validation

## User Experience Features

### Modal Interactions
- ✅ Click "Create Account" to open modal
- ✅ Click "X" button to close
- ✅ Click outside modal to close
- ✅ Press ESC key to close
- ✅ "Already have account? Sign In" closes modal

### Form Features
- ✅ Real-time validation
- ✅ Inline error messages
- ✅ Password visibility toggle
- ✅ Loading spinner during submission
- ✅ Success/error alerts
- ✅ Auto-clear errors on input
- ✅ Keyboard shortcuts (Alt+L for login)

### Visual Feedback
- ✅ Animated modal entry
- ✅ Smooth transitions
- ✅ Color-coded alerts (red=error, green=success, blue=info)
- ✅ Form field focus states
- ✅ Button hover effects
- ✅ Loading overlay with spinner

## Responsive Design
- ✅ Mobile-friendly modal (95vh on small screens)
- ✅ Touch-friendly buttons
- ✅ Scrollable modal content
- ✅ Adaptive padding and spacing

## Browser Compatibility
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Requires JavaScript enabled
- ✅ CSS Grid and Flexbox support

## Testing the Registration System

### Test Scenario 1: Successful Registration
1. Open login page
2. Click "Create Account"
3. Fill in valid data:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Username: "testuser"
   - Password: "test123"
   - Confirm Password: "test123"
   - Check Terms & Conditions
4. Submit form
5. Should see success message
6. Check `data/users.json` for new user

### Test Scenario 2: Duplicate Email
1. Try registering with same email
2. Should see "Email already registered" error

### Test Scenario 3: Validation Errors
1. Try submitting with:
   - Empty fields → "Field is required"
   - Short name → "Minimum 2 characters"
   - Invalid email → "Valid email required"
   - Short username → "Minimum 3 characters"
   - Short password → "Minimum 6 characters"
   - Mismatched passwords → "Passwords do not match"
   - Unchecked terms → "Agree to Terms"

### Test Scenario 4: Login with New Account
1. After registration, close modal
2. Username should be pre-filled
3. Enter password
4. Should login successfully
5. Should redirect to /home

## Troubleshooting

### Issue: Modal doesn't open
- Check browser console for JavaScript errors
- Verify login.js is loaded
- Check if modal element exists in HTML

### Issue: Registration doesn't save
- Check server console for errors
- Verify `data/` directory exists
- Check file permissions on users.json
- Verify server.ts has fs module imported

### Issue: Users.json not found
- Server will auto-create on first run
- Check `data/users.json` exists
- Check path is correct in server.ts

### Issue: Login fails after registration
- Verify user is in users.json
- Check password matches exactly
- Try using email instead of username
- Check server console for authentication logs

## Future Enhancements

### Planned Features
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Profile management
- [ ] Avatar upload
- [ ] Social login (Google, GitHub)
- [ ] Two-factor authentication
- [ ] Password strength meter
- [ ] User activity logs
- [ ] Account deletion
- [ ] Admin dashboard

### Database Migration
When ready for production:
1. Choose database (MongoDB, PostgreSQL, MySQL)
2. Create user schema/model
3. Migrate users.json data
4. Update API endpoints
5. Add connection pooling
6. Implement transactions

## Console Logging

The server logs important events:

```
✅ New user registered: johndoe (john@example.com)
✅ User logged in: johndoe
```

Monitor these logs for debugging and user activity tracking.

## Support

For issues or questions:
1. Check browser console for errors
2. Check server console for logs
3. Review this documentation
4. Check data/users.json for user data
5. Verify all files are correctly modified

---

**Created**: December 22, 2024
**Version**: 1.0.0
**Status**: ✅ Development Ready (⚠️ NOT Production Ready - Security enhancements needed)
