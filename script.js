let inputBox = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let historyDiv = document.getElementById('history');
let sciPanel = document.querySelector('.sci-panel');
let historyPanel = document.querySelector('.history-panel');

let string = "";

// 🔑 Keyboard Support
document.addEventListener('keydown', (e) => {
  let key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '%', '.', 'Enter', 'Backspace'].includes(key)) {
    if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      string = string.slice(0, -1);
      updateDisplay();
    } else {
      string += key === '*' ? '×' : key === '/' ? '÷' : key;
      updateDisplay();
    }
  }
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    let btnValue = button.innerText.trim();

    if (button.classList.contains('ac-btn')) {
      string = "";
      inputBox.innerHTML = "";
    }
    else if (button.classList.contains('equal-btn')) {
      calculate();
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
    else if (button.classList.contains('func-btn')) {
      if (btnValue === '√') {
        string = Math.sqrt(eval(string.replace(/×/g, '*').replace(/÷/g, '/'))).toString();
        updateDisplay();
      }
      else if (btnValue === '^') {
        string += '**';
        updateDisplay();
      }
      else if (['sin', 'cos', 'tan'].includes(btnValue)) {
        let val = eval(string.replace(/×/g, '*').replace(/÷/g, '/'));
        let res = Math[btnValue](val * Math.PI / 180).toFixed(4);
        string = res.toString();
        updateDisplay();
      }
    }
    else if (button.classList.contains('mode-toggle')) {
      document.body.classList.toggle('light');
    }
    else if (button.classList.contains('sci-toggle')) {
      sciPanel.classList.toggle('hidden');
    }
    else if (button.classList.contains('history-toggle')) {
      historyPanel.classList.toggle('hidden');
    }
    else {
      string += btnValue;
      updateDisplay();
    }
  });
});

function calculate(){
  try {
    let evalString = string.replace(/×/g, '*').replace(/÷/g, '/');
    let result = eval(evalString);
    historyDiv.innerHTML += `<div>${string} = ${result}</div>`;
    inputBox.innerHTML = result;
    string = result.toString();
  } catch {
    inputBox.innerHTML = "Error";
    string = "";
  }
}

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
