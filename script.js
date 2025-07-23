let inputBox = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let btnValue = button.innerText.trim();

        if (button.classList.contains('ac-btn')) {
            string = "";
            inputBox.value = string;
        } 
        else if (button.classList.contains('equal-btn')) {
            try {
                string = string.replace(/×/g, '*').replace(/÷/g, '/');
                inputBox.value = eval(string);
                string = inputBox.value;
            } catch {
                inputBox.value = "Error";
                string = "";
            }
        } 
        else if (button.classList.contains('del-btn')) {
            string = string.slice(0, -1);
            inputBox.value = string;
        } 
        else if (button.classList.contains('operator') && button.querySelector('i')) {
            // For operator buttons with icons
            if (button.querySelector('i').classList.contains('ri-divide-line')) {
                string += '÷';
            }
            inputBox.value = string;
        } 
        else {
            string += btnValue;
            inputBox.value = string;
        }
    });
});
