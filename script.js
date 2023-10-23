function splitTextToSMS(text) {
  var maxSMSLength = 140;
  var words = text.split(' ');
  var processWords = function (maxLength) {
    var smsArray = [];
    var currentSMS = '';
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
      var word = words_1[_i];
      var potentialSMS = currentSMS + (currentSMS ? ' ' : '') + word;
      if (potentialSMS.length <= maxLength) {
        currentSMS = potentialSMS;
      }
      else {
        smsArray.push(currentSMS);
        currentSMS = word;
      }
    }
    smsArray.push(currentSMS);
    return smsArray;
  };
  var smsArray = processWords(maxSMSLength);
  if (smsArray.length > 1) {
    var totalFragments_1 = smsArray.length;
    var suffixLength = (' ' + totalFragments_1 + '/' + totalFragments_1).length;
    maxSMSLength -= suffixLength;
    smsArray = processWords(maxSMSLength);
    totalFragments_1 = smsArray.length;
    smsArray = smsArray.map(function (sms, index) {
      return sms + ' ' + (index + 1) + '/' + totalFragments_1;
    });
  }
  return smsArray;
}

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