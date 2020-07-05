/* 
    Give focus on page load to "Name" input field
*/

//Adds focus to name element on page load
window.onload = function() {
    document.getElementById('name').focus();
};

/* 
    Hide/Show Job Roles <input> field
*/

const jobOptions = document.querySelector('#title');
const otherInputBox = document.getElementById('other-title');
const inputLabel = document.querySelector('label[for="other-title"]')

//Sets display property of hidden input element to "none"
otherInputBox.style.display = "none";
inputLabel.style.display = "none"

//Listens for the Select option to change then sets display value of hidden text input
jobOptions.addEventListener('change', (e) => {
    if (e.target.value == 'other') {
        otherInputBox.style.display = "block";
        inputLabel.style.display = "block"
    } else {
        otherInputBox.style.display = "none";
        inputLabel.style.display = "none"
    }
});
