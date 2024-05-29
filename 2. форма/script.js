document.getElementById('passwordForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const fio = document.getElementById('fio');
  const password = document.getElementById('password');
  const fioError = document.getElementById('fioError');
  const passwordError = document.getElementById('passwordError');
  
  let isValid = true;

  fio.classList.remove('error');
  password.classList.remove('error');
  fioError.textContent = '';
  passwordError.textContent = '';

  if (!/^[a-zA-Z\s]+$/.test(fio.value)) {
    fio.classList.add('error');
    fioError.textContent = 'FIO should only contain letters: a-zA-Z';
    isValid = false;
  }

  const passwordValue = password.value;
  const errors = [];
  if (passwordValue.length < 5) {
    errors.push('Password must be at least 5 characters long');
  }
  if (!/[a-zA-Z]/.test(passwordValue)) {
    errors.push('Password must contain at least one letter: a-zA-Z');
  }
  if (!/\d/.test(passwordValue)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[-*/\\_]/.test(passwordValue)) {
    errors.push('Password must contain at least one special characte: -*/\\_ ');
  }

  if (errors.length > 0) {
    password.classList.add('error');
    passwordError.innerHTML = errors.join('<br>');
    isValid = false;
  }

  if (isValid) {
    alert('Form submitted successfully!');
  }
});
