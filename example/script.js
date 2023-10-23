import { splitTextToSMS } from '../index.js';
console.log("🚀 ~ file: script.js:2 ~ splitTextToSMS:", splitTextToSMS)

function splitAndDisplay() {
  const inputContainer = document.querySelector('#inputText');
  const inputText = inputContainer.value;
  const smsArray = splitTextToSMS(inputText);
  const output = document.querySelector('#output');
  const newMessages = smsArray.map(sms => `<div class="message">${sms}</div>`).join('');
  output.innerHTML += newMessages + '</br>';
  inputContainer.value = '';
}

document.querySelector('#submitBtn').addEventListener('click', splitAndDisplay);