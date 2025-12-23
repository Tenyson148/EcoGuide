// Form Elements - Login
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const alertMessage = document.getElementById('alertMessage');
const loadingOverlay = document.getElementById('loadingOverlay');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberMeCheckbox = document.getElementById('rememberMe');

// Form Elements - Registration
const registerModal = document.getElementById('registerModal');
const registerForm = document.getElementById('registerForm');
const closeModalBtn = document.getElementById('closeModal');
const showRegisterModalBtn = document.getElementById('showRegisterModal');
const showLoginLink = document.getElementById('showLoginLink');
const registerAlertMessage = document.getElementById('registerAlertMessage');
const toggleRegisterPasswordBtn = document.getElementById('toggleRegisterPassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');

// Registration Inputs
const fullNameInput = document.getElementById('fullName');
const registerEmailInput = document.getElementById('registerEmail');
const registerUsernameInput = document.getElementById('registerUsername');
const registerPasswordInput = document.getElementById('registerPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const agreeTermsCheckbox = document.getElementById('agreeTerms');

// Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateUsername(username) {
    return username.length >= 3;
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateFullName(name) {
    return name.trim().length >= 2;
}

function showError(inputElement, message) {
    const wrapper = inputElement.closest('.input-wrapper');
    const errorElement = wrapper.querySelector('.error-message');
    
    wrapper.classList.add('error');
    errorElement.textContent = message;
    
    // Auto-remove error on input
    inputElement.addEventListener('input', () => {
        wrapper.classList.remove('error');
        errorElement.textContent = '';
    }, { once: true });
}

function clearErrors() {
    document.querySelectorAll('.input-wrapper.error').forEach(wrapper => {
        wrapper.classList.remove('error');
        wrapper.querySelector('.error-message').textContent = '';
    });
}

function showAlert(message, type = 'error', isRegisterForm = false) {
    const alert = isRegisterForm ? registerAlertMessage : alertMessage;
    alert.textContent = message;
    alert.className = `alert ${type}`;
    alert.classList.remove('hidden');
    
    setTimeout(() => {
        alert.classList.add('hidden');
    }, 5000);
}

function showLoading(show) {
    if (show) {
        loadingOverlay.classList.remove('hidden');
    } else {
        loadingOverlay.classList.add('hidden');
    }
}

// Modal Functions
function openRegisterModal() {
    registerModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    // Clear form and errors
    registerForm.reset();
    clearRegisterErrors();
}

function closeRegisterModal() {
    registerModal.classList.add('hidden');
    document.body.style.overflow = '';
    registerForm.reset();
    clearRegisterErrors();
}

function clearRegisterErrors() {
    const modalWrapper = registerModal.querySelectorAll('.input-wrapper.error');
    modalWrapper.forEach(wrapper => {
        wrapper.classList.remove('error');
        wrapper.querySelector('.error-message').textContent = '';
    });
    registerAlertMessage.classList.add('hidden');
}

// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    const icon = togglePasswordBtn.querySelector('i');
    icon.className = type === 'password' ? 'bx bx-show' : 'bx bx-hide';
});

toggleRegisterPasswordBtn.addEventListener('click', () => {
    const type = registerPasswordInput.type === 'password' ? 'text' : 'password';
    registerPasswordInput.type = type;
    
    const icon = toggleRegisterPasswordBtn.querySelector('i');
    icon.className = type === 'password' ? 'bx bx-show' : 'bx bx-hide';
});

toggleConfirmPasswordBtn.addEventListener('click', () => {
    const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
    confirmPasswordInput.type = type;
    
    const icon = toggleConfirmPasswordBtn.querySelector('i');
    icon.className = type === 'password' ? 'bx bx-show' : 'bx bx-hide';
});

// Remember me functionality
window.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberMeCheckbox.checked = true;
    }
});

// LOGIN FORM SUBMISSION
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    // Validation
    let hasError = false;
    
    if (!username) {
        showError(usernameInput, 'Please enter your email or username');
        hasError = true;
    } else if (username.includes('@')) {
        if (!validateEmail(username)) {
            showError(usernameInput, 'Please enter a valid email address');
            hasError = true;
        }
    } else if (!validateUsername(username)) {
        showError(usernameInput, 'Username must be at least 3 characters');
        hasError = true;
    }
    
    if (!password) {
        showError(passwordInput, 'Please enter your password');
        hasError = true;
    } else if (!validatePassword(password)) {
        showError(passwordInput, 'Password must be at least 6 characters');
        hasError = true;
    }
    
    if (hasError) return;
    
    // Handle remember me
    if (rememberMeCheckbox.checked) {
        localStorage.setItem('rememberedUsername', username);
    } else {
        localStorage.removeItem('rememberedUsername');
    }
    
    // Submit login
    showLoading(true);
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        showLoading(false);
        
        if (data.success) {
            showAlert('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = '/home';
            }, 1000);
        } else {
            showAlert(data.message || 'Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        showLoading(false);
        showAlert('An error occurred. Please check your connection and try again.');
    }
});

// REGISTRATION FORM SUBMISSION
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearRegisterErrors();
    
    const fullName = fullNameInput.value.trim();
    const email = registerEmailInput.value.trim();
    const username = registerUsernameInput.value.trim();
    const password = registerPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const agreeTerms = agreeTermsCheckbox.checked;
    
    // Validation
    let hasError = false;
    
    if (!validateFullName(fullName)) {
        showError(fullNameInput, 'Please enter your full name (minimum 2 characters)');
        hasError = true;
    }
    
    if (!validateEmail(email)) {
        showError(registerEmailInput, 'Please enter a valid email address');
        hasError = true;
    }
    
    if (!validateUsername(username)) {
        showError(registerUsernameInput, 'Username must be at least 3 characters');
        hasError = true;
    }
    
    if (!validatePassword(password)) {
        showError(registerPasswordInput, 'Password must be at least 6 characters');
        hasError = true;
    }
    
    if (password !== confirmPassword) {
        showError(confirmPasswordInput, 'Passwords do not match');
        hasError = true;
    }
    
    if (!agreeTerms) {
        showAlert('Please agree to the Terms & Conditions', 'error', true);
        hasError = true;
    }
    
    if (hasError) return;
    
    // Submit registration
    showLoading(true);
    
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullName, email, username, password })
        });
        
        const data = await response.json();
        
        showLoading(false);
        
        if (data.success) {
            showAlert('Account created successfully! Please login.', 'success', true);
            setTimeout(() => {
                closeRegisterModal();
                usernameInput.value = username;
                passwordInput.focus();
            }, 2000);
        } else {
            showAlert(data.message || 'Registration failed. Please try again.', 'error', true);
        }
    } catch (error) {
        console.error('Registration error:', error);
        showLoading(false);
        showAlert('An error occurred. Please check your connection and try again.', 'error', true);
    }
});

// Modal Event Listeners
showRegisterModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openRegisterModal();
});

closeModalBtn.addEventListener('click', () => {
    closeRegisterModal();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeRegisterModal();
});

// Close modal when clicking outside
registerModal.addEventListener('click', (e) => {
    if (e.target === registerModal) {
        closeRegisterModal();
    }
});

// Social login handlers (implement as needed)
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const provider = btn.classList.contains('google') ? 'Google' : 'GitHub';
        showAlert(`${provider} login coming soon!`, 'info');
    });
});

// Forgot password handler
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    showAlert('Password reset feature coming soon!', 'info');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + L to focus username
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        usernameInput.focus();
    }
    
    // Escape to close modal
    if (e.key === 'Escape' && !registerModal.classList.contains('hidden')) {
        closeRegisterModal();
    }
});


// Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateUsername(username) {
    return username.length >= 3;
}

function showError(inputElement, message) {
    const wrapper = inputElement.closest('.input-wrapper');
    const errorElement = wrapper.querySelector('.error-message');
    
    wrapper.classList.add('error');
    errorElement.textContent = message;
    
    // Auto-remove error on input
    inputElement.addEventListener('input', () => {
        wrapper.classList.remove('error');
        errorElement.textContent = '';
    }, { once: true });
}

function clearErrors() {
    document.querySelectorAll('.input-wrapper.error').forEach(wrapper => {
        wrapper.classList.remove('error');
        wrapper.querySelector('.error-message').textContent = '';
    });
}

function showAlert(message, type = 'error') {
    alertMessage.textContent = message;
    alertMessage.className = `alert ${type}`;
    alertMessage.classList.remove('hidden');
    
    setTimeout(() => {
        alertMessage.classList.add('hidden');
    }, 5000);
}

function showLoading(show = true) {
    if (show) {
        loadingOverlay.classList.remove('hidden');
        submitBtn.disabled = true;
    } else {
        loadingOverlay.classList.add('hidden');
        submitBtn.disabled = false;
    }
}

// Toggle Password Visibility
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    const icon = togglePasswordBtn.querySelector('i');
    icon.className = type === 'password' ? 'bx bx-show' : 'bx bx-hide';
});

// Check for saved credentials
window.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberMeCheckbox.checked = true;
    }
});

// Form Validation and Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    
    // Client-side validation
    let isValid = true;
    
    if (!username) {
        showError(usernameInput, 'Username or email is required');
        isValid = false;
    } else if (!validateEmail(username) && !validateUsername(username)) {
        showError(usernameInput, 'Please enter a valid email or username (min 3 characters)');
        isValid = false;
    }
    
    if (!password) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading
    showLoading(true);
    
    try {
        // Simulate API call (replace with actual endpoint)
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, rememberMe })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Save username if remember me is checked
            if (rememberMe) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }
            
            // Store auth token
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }
            
            showAlert('Login successful! Redirecting...', 'success');
            
            // Redirect after short delay
            setTimeout(() => {
                window.location.href = '/home.html';
            }, 1000);
            
        } else {
            showLoading(false);
            showAlert(data.message || 'Invalid credentials. Please try again.');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showLoading(false);
        showAlert('An error occurred. Please check your connection and try again.');
    }
});

// Social login handlers (implement as needed)
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const provider = btn.classList.contains('google') ? 'Google' : 'GitHub';
        showAlert(`${provider} login coming soon!`, 'info');
    });
});

// Forgot password handler
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    showAlert('Password reset feature coming soon!', 'info');
});

// Register link handler
document.querySelector('.register-link a').addEventListener('click', (e) => {
    e.preventDefault();
    showAlert('Registration page coming soon!', 'info');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + L to focus username
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        usernameInput.focus();
    }
});
