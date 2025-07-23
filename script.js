let inputBox = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
  button.addEventListener('click', () => {
    let btnValue = button.innerText.trim();

    if (button.classList.contains('ac-btn')) {
      string = "";
      inputBox.innerHTML = "";
    }
    else if (button.classList.contains('equal-btn')) {
      try {
        let evalString = string.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(evalString);
        inputBox.innerHTML = result;
        string = result.toString();
      } catch {
        inputBox.innerHTML = "Error";
        string = "";
      }
    }
    else if (button.classList.contains('del-btn')) {
      string = string.slice(0, -1);
      updateDisplay();
    }
    else if (button.classList.contains('operator')) {
      if (button.querySelector('i') && button.querySelector('i').classList.contains('ri-divide-line')) {
        string += '÷';
      } else {
        string += btnValue;
      }
      updateDisplay();
    }
    else {
      string += btnValue;
      updateDisplay();
    }
  });
});

function updateDisplay() {
  let formatted = "";
  for (let char of string) {
    if (/[+\-×÷%]/.test(char)) {
      formatted += `<span class="operator">${char}</span>`;
    } else {
      formatted += char;
    }
  }
  inputBox.innerHTML = formatted;
}
