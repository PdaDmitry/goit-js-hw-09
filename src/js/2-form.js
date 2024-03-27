'use strict';

const registerForm = document.querySelector('.feedback-form');

const firstElemForm = document.querySelector('label');
firstElemForm.classList.add('form-label');

const firstInput = firstElemForm.querySelector('input');
firstInput.classList.add('form-label-input');

const secondElemForm = firstElemForm.nextElementSibling;
secondElemForm.classList.add('form-label', 'form-label-second'); //

const textarea = document.querySelector('textarea');
textarea.classList.add('form-label-input', 'form-label-textarea');

const btmForm = document.querySelector('button');
btmForm.classList.add('btm-form');

const local_key = 'feedback-form-state';

registerForm.addEventListener('input', formInput);

function formInput() {
  const email = registerForm.elements.email.value.trim();
  const message = registerForm.elements.message.value.trim();

  const elem = {
    email,
    message,
  };

  saveLokStor(local_key, elem);
}

function saveLokStor(key, value) {
  const boxLocal = JSON.stringify(value);
  localStorage.setItem(key, boxLocal);
}

function downloadLokStor(key) {
  const boxLocal = localStorage.getItem(key);
  try {
    return JSON.parse(boxLocal);
  } catch {
    return boxLocal;
  }
}

function showElemLocal() {
  const elemLocalStor = downloadLokStor(local_key) || {};
  registerForm.elements.email.value = elemLocalStor.email || '';
  registerForm.elements.message.value = elemLocalStor.message || '';
}

showElemLocal();

registerForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const email = registerForm.elements.email.value.trim();
  const message = registerForm.elements.message.value.trim();

  if (email === '' || message === '') {
    return alert('All form fields must be filled in');
  }

  console.log({ Email: `${email}`, Message: `${message}` });
  registerForm.reset();
  localStorage.removeItem(local_key);
}
