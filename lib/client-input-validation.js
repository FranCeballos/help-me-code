export function validatePassword(password) {
  // At least 8 characters
  if (password.length < 8) {
    return false;
  }

  // At least one uppercase letter, one lowercase letter, and one number
  var hasUpperCase = /[A-Z]/.test(password);
  var hasLowerCase = /[a-z]/.test(password);
  var hasNumber = /\d/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumber) {
    return false;
  }

  // Password is valid
  return true;
}

export function matchPasswords(password1, password2) {
  return String(password1.trim()) === String(password2.trim());
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}
