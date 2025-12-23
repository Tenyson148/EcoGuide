# Quick Test Guide - Registration Feature

## 🚀 Quick Start

1. **Server should be running** (nodemon auto-restart)
   - Check terminal for: `🌱 EcoGuide server running on http://localhost:3000`

2. **Open your browser**
   - Navigate to: `http://localhost:3000`
   - You'll see the login page

## 📝 Test Registration

### Step 1: Open Registration Modal
- Click the **"Create Account"** link at the bottom of the login form

### Step 2: Fill in the Registration Form
```
Full Name:        John Doe
Email:           john@example.com
Username:        johndoe
Password:        test123456
Confirm Password: test123456
☑ Terms & Conditions
```

### Step 3: Submit
- Click **"Create Account"** button
- Wait for success message
- Modal will close automatically
- Username will be pre-filled in login form

### Step 4: Verify Registration
Check the file: `data/users.json`
```json
[
  {
    "id": "user_1703282880000_abc123def",
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "test123456",
    "createdAt": "2024-12-22T21:48:00.000Z"
  }
]
```

### Step 5: Login with New Account
- Enter username: `johndoe`
- Enter password: `test123456`
- Click **"Sign In"**
- Should redirect to `/home`

## ✅ Features to Test

### 1. Registration Validation
Try these to see error messages:

❌ **Empty fields**
- Leave any field empty → "Field is required"

❌ **Short name**
- Enter "J" → "Full name must be at least 2 characters"

❌ **Invalid email**
- Enter "notanemail" → "Please enter a valid email address"

❌ **Short username**
- Enter "ab" → "Username must be at least 3 characters"

❌ **Short password**
- Enter "12345" → "Password must be at least 6 characters"

❌ **Mismatched passwords**
- Different passwords → "Passwords do not match"

❌ **Unchecked terms**
- Don't check terms → "Please agree to the Terms & Conditions"

### 2. Duplicate Prevention
Try registering twice with same:
- Email → "Email already registered"
- Username → "Username already taken"

### 3. Password Toggle
- Click the eye icon to show/hide password
- Works in both password fields

### 4. Modal Interactions
- ✅ Click "X" to close
- ✅ Click outside modal to close
- ✅ Press ESC key to close
- ✅ Click "Sign In" link to close and return to login

### 5. Login After Registration
- Use email OR username to login
- Both should work!

## 🎨 UI Features

### Visual Feedback
- ✅ Loading spinner during submission
- ✅ Green success alerts
- ✅ Red error alerts
- ✅ Inline error messages under fields
- ✅ Smooth modal animations
- ✅ Form field highlights on focus

### Keyboard Shortcuts
- `Alt + L` → Focus username field (login form)
- `ESC` → Close registration modal

## 📊 Monitor Server Logs

Watch your terminal for:

```
✅ New user registered: johndoe (john@example.com)
✅ User logged in: johndoe
```

## 🐛 Common Issues

### Issue: Modal doesn't appear
**Solution**: Check browser console (F12) for errors

### Issue: Registration doesn't save
**Solution**: 
1. Check if `data/users.json` was created
2. Check server console for errors
3. Verify server restarted after changes

### Issue: Can't login after registration
**Solution**:
1. Check `data/users.json` has your user
2. Verify password matches exactly
3. Try using email instead of username

### Issue: "ENOENT" file error
**Solution**: Server should auto-create `data/` directory, but if not:
```bash
mkdir data
echo [] > data/users.json
```

## 🔥 Quick Reset

To start fresh:
1. Stop server (Ctrl+C)
2. Delete or clear `data/users.json`:
   ```json
   []
   ```
3. Restart server

## 📸 What You Should See

### Login Page (Initial)
- Clean two-column layout
- Branding on left with animated waves
- Login form on right
- "Create Account" link at bottom

### Registration Modal
- Pops up over login page
- 6 form fields
- Terms & Conditions checkbox
- "Create Account" button
- "Already have account? Sign In" link

### After Registration Success
- Green success message
- Modal closes after 2 seconds
- Username pre-filled in login form
- Ready to login

### After Login Success
- Green success message
- Redirects to `/home` page
- Session is active

## 🎯 Success Criteria

Registration is working if:
1. ✅ Modal opens smoothly
2. ✅ Form validation shows errors
3. ✅ New user saved in `users.json`
4. ✅ Can login with new account
5. ✅ Redirects to home after login
6. ✅ Duplicate users prevented
7. ✅ All UI interactions work

## 📝 Next Steps After Testing

Once registration works:
1. ✅ Add more users
2. ⏳ Implement password hashing (bcrypt)
3. ⏳ Add email verification
4. ⏳ Add password reset
5. ⏳ Add profile page
6. ⏳ Migrate to real database

---

**Happy Testing! 🚀**

If everything works, you now have a complete authentication system!
