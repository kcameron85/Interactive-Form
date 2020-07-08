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

//Storing the checkboxes and labels in arrays that can be accessed via the variable name.
const confFieldset = document.querySelector('.activities');
const checkboxes = document.querySelectorAll('.activities input[type="checkbox"]');
const boxLables = document.querySelectorAll('.activities label');
let actualCost = 0;

const costTally = document.createElement('div');
const innerPElement = document.createElement('p');
costTally.appendChild(innerPElement);
innerPElement.innerHTML = 'Cost: $' + actualCost;
confFieldset.appendChild(costTally);

//Looping through the checkboxes and adding an event listener to each one.
for(i = 0; i < checkboxes.length; i++ ) {
    checkboxes[i].addEventListener('change', (e) => {
        const cost = parseInt(e.target.dataset.cost);

        for(i = 0; i < checkboxes.length; i++){
            const timeDate = checkboxes[i].dataset.dayAndTime;

            if(e.target.dataset.dayAndTime == timeDate && e.target != checkboxes[i]) {
                checkboxes[i].disabled = true;
                boxLables[i].style.textDecoration = 'line-through';
                boxLables[i].style.color = '#656565';
            } 
            
            if (! e.target.checked && checkboxes[i].dataset.dayAndTime == e.target.dataset.dayAndTime) {
                checkboxes[i].disabled = false;
                boxLables[i].style.textDecoration = 'none';
                boxLables[i].style.color = '#000000';
            }
        }

        if (e.target.checked) {
            actualCost += cost;
            innerPElement.innerHTML = 'Cost: $' + actualCost;
            console.log(actualCost);
        } else if ( ! e.target.checked ) {
            actualCost -= cost;
            innerPElement.innerHTML = 'Cost: $' + actualCost;
            console.log(actualCost);
        }
    });
}


