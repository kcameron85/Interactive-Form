/* 
    GIVES FOCUS ON PAGE LOAD TO "NAME" INPUT FIELDGives focus on page load to "N
*/

//Adds focus to name element on page load
window.onload = function() {
    document.getElementById('name').focus();
};

/* 
    HIDE/SHOW JOB ROLES <INPUT> FIELD
*/

const title = document.querySelector('#title');
const otherTitle = document.getElementById('other-title');
const otherLabel = document.querySelector('label[for="other-title"]')

//Sets display property of hidden input/label element to "none"
otherTitle.style.display = "none";
otherLabel.style.display = "none"

//Listens for the Select option to change then sets display value of hidden text input
title.addEventListener('change', (e) => {
    if (e.target.value == 'other') {
        otherTitle.style.display = "block";
        otherLabel.style.display = "block"
    } else {
        otherTitle.style.display = "none";
        otherLabel.style.display = "none"
    }
});

/*
    HIDE/SHOW COLOR OPTIONS
*/

const design = document.getElementById('design');
const color = document.getElementById('color');
const themeOptions = document.querySelectorAll('#design option');
const colorOptions = document.querySelectorAll('#color option');

//creates select option prompting user to choose a theme
const selectOption = document.createElement('option');
selectOption.selected = true;
selectOption.textContent = 'Please select a T-shirt theme';
color.insertBefore(selectOption, color.firstChild);

/*
This function sets the display value of the color options and sets which 
color option appears in the color options box first.
*/
function setOptions(index1, index2, display, selected) {
    colorOptions[index1].style.display = display;
    colorOptions[index2].selected = selected;
}

/*
This event listener looks for changes in the theme options box
and loops through the colors displaying some and hiding others.
*/
design.addEventListener('change', (e) => {
    for(i = 0; i < colorOptions.length; i++) {
        if (e.target.value == 'js puns'){
            if (i <= 2) {
                setOptions(i, 0, 'inherit', true);
                selectOption.style.display = 'none';
            } else {
                setOptions(i, i, 'none', false);
            }
        } else if (e.target.value == 'heart js') {
            if (i > 2) {
                setOptions(i, 3, 'inherit', true);
                selectOption.style.display = 'none';
            } else {
                setOptions(i, i, 'none', false);
            }
        }
    }
    
    if (e.target.value == "Select Theme") {
        for(i = 0; i < colorOptions.length; i++) {
            colorOptions[i].style.display = 'none';
            selectOption.selected = true;
        }
    }
});

/*
    CONFERENCE SELECTION OPTIONS
*/

//Storing the checkboxes and labels in arrays that can be accessed via the variable name. Also, selecting the fieldset.
const confFieldset = document.querySelector('.activities');
const checkboxes = document.querySelectorAll('.activities input[type="checkbox"]');
const boxLables = document.querySelectorAll('.activities label');

//Setting initial cost to 0
let actualCost = 0;

//creating <div> and <p> elements to hold running cost total
const costTally = document.createElement('div');
const innerPElement = document.createElement('p');
costTally.appendChild(innerPElement);
innerPElement.innerHTML = 'Cost: $' + actualCost;
confFieldset.appendChild(costTally);

//Looping through the checkboxes and adding an event listener to each one.
for(i = 0; i < checkboxes.length; i++ ) {
    checkboxes[i].addEventListener('change', (e) => {
        const cost = parseInt(e.target.dataset.cost);
        //looping through checkboxes again once the event listener has been triggered.
        for(i = 0; i < checkboxes.length; i++){
            const timeDate = checkboxes[i].dataset.dayAndTime;
            //Disabling fields if competing time is detected
            if(e.target.dataset.dayAndTime == timeDate && e.target != checkboxes[i]) {
                checkboxes[i].disabled = true;
                boxLables[i].style.textDecoration = 'line-through';
                boxLables[i].style.color = '#656565';
            } 
            //Enabling fields id checkboxes are unchecked
            if (! e.target.checked && checkboxes[i].dataset.dayAndTime == e.target.dataset.dayAndTime) {
                checkboxes[i].disabled = false;
                boxLables[i].style.textDecoration = 'none';
                boxLables[i].style.color = '#000000';
            }
        }
        //adding or subtracting cost based on checked state
        if (e.target.checked) {
            actualCost += cost;
            innerPElement.innerHTML = 'Cost: $' + actualCost;
        } else if ( ! e.target.checked ) {
            actualCost -= cost;
            innerPElement.innerHTML = 'Cost: $' + actualCost;
        }
    });
}

/*
    PAYMENT INFO OPTIONS
*/

const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');

const paymentSelect = document.querySelector('#payment');
const paymentOptions = document.querySelectorAll('#payment option');

function paymentInitHideShow(val) {
    creditCardDiv.style.display = val;
    paypalDiv.style.display = val;
    bitcoinDiv.style.display = val;
}

function paymentHideShow (opt1, opt2, opt3, val1, val2){
    opt1.style.display = val1;
    opt2.style.display = val2;
    opt3.style.display = val2;
}

paymentInitHideShow('none');
paymentOptions[1].selected = true;

if (paymentSelect.value == 'credit card') {
    creditCardDiv.style.display = 'inherit';
}

paymentSelect.addEventListener('change', (e) => {
        if (e.target.value == "credit card") {
            paymentHideShow(creditCardDiv, paypalDiv, bitcoinDiv, 'inherit', 'none');
        } else if (e.target.value == "paypal") {
            paymentHideShow(paypalDiv, bitcoinDiv, creditCardDiv, 'inherit', 'none');
        } else if (e.target.value == 'bitcoin') {
            paymentHideShow(bitcoinDiv, creditCardDiv, paypalDiv, 'inherit', 'none');
        } else if (e.target.value == 'select method') {
            paymentOptions[1].selected = true;
            paymentHideShow(creditCardDiv, paypalDiv, bitcoinDiv, 'inherit', 'none');
        } 
});

/*
    FORM VALIDATION
 */

//selecting all fields that need validation
const name = document.getElementById('name');
const mail = document.getElementById('mail');
//other title needs to be tested but its declared in the job roles section

const creditCard = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');

const basicInfoFieldset = document.querySelector('form').firstElementChild;
const nameError = document.createElement('span'); 
const mailError = document.createElement('span'); 


function isValidInput (regex, value) {
    return regex.test(value);
}

function createError (el, elLoc, className, msgText, msgSpan){
    el.style.borderColor = 'red';
    basicInfoFieldset.insertBefore(msgSpan, elLoc);
    msgSpan.classList = className;
    msgSpan.textContent = msgText;
    msgSpan.style.color = 'red';
}

function removeError (className, el) {
    document.querySelector(className).remove();
    el.style.borderColor = '';
}

name.addEventListener('input', (e) => {
    if(isValidInput(/^[A-Za-z ]+$/, name.value) == true && name.value != '') {
        const nameErrorSpan = document.querySelector('.nameError');
        if (typeof(nameErrorSpan) != 'undefined' && nameErrorSpan != null) {
            removeError('.nameError', name);
        }
    } else {
        createError(name, name.previousElementSibling, 'nameError', "A name consisting of only letters is required.", nameError);
    }
});

mail.addEventListener('input', (e) => {
    if(isValidInput(/^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([A-Za-z]{2,5})$/, mail.value) == true && mail.value != '') {
        const mailErrorSpan = document.querySelector('.mailError');
        if (typeof(mailErrorSpan) != 'undefined' && mailErrorSpan != null) {
            removeError('.mailError', mail);
        }
    } else {
        createError(mail, mail.previousElementSibling, 'mailError', "A valid email address is required. Ex. yourname@gmail.com", mailError);
    }
});