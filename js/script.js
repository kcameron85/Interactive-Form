document.addEventListener( 'DOMContentLoaded', () => {
    
    /*
     * VARIABLES 
     */

    //Job Roles Variables
    const title = document.querySelector('#title');
    const otherTitle = document.getElementById('other-title');
    const otherLabel = document.querySelector('label[for="other-title"]')

    //Color Option Variable
    const design = document.getElementById('design');
    const color = document.getElementById('color');
    const colorOptions = document.querySelectorAll('#color option');

    //Conference Section Variables
    const confFieldset = document.querySelector('.activities');
    const checkboxes = document.querySelectorAll('.activities input[type="checkbox"]');
    const boxLables = document.querySelectorAll('.activities label');
    let actualCost = 0;
    let checkedTally = 0;

    //Payment Section Variables
    const creditCardDiv = document.getElementById('credit-card');
    const paypalDiv = document.getElementById('paypal');
    const bitcoinDiv = document.getElementById('bitcoin');
    const paymentSelect = document.querySelector('#payment');
    const paymentOptions = document.querySelectorAll('#payment option');
    
    //Form Validation Variables
    const name = document.getElementById('name');
    const mail = document.getElementById('mail');
    const creditCard = document.getElementById('cc-num');
    const zip = document.getElementById('zip');
    const cvv = document.getElementById('cvv');
    const formElement = document.querySelector('form');
    const basicInfoFieldset = document.querySelector('form').firstElementChild;
    const paymentFieldset = document.getElementById('payment').previousElementSibling.parentElement;
    const creditErrorLoc = document.getElementById('credit-card');
    const confLegend = document.querySelector('.activities legend');
    //Creating elements to hold error information
    const nameError = document.createElement('span'); 
    const mailError = document.createElement('span'); 
    const confError = document.createElement('span'); 
    const creditError = document.createElement('div'); 
    const zipError = document.createElement('div'); 
    const cvvError = document.createElement('div');

    /*
     *  Functions 
     */

    /*
    This function sets the display value of the color options and sets which 
    color option appears in the color options box first.
    */
    function setOptions(index1, index2, display, selected) {
        colorOptions[index1].style.display = display;
        colorOptions[index2].selected = selected;
    }

    /*
    This function initially hides the payment options 
    */
    function paymentInitHideShow(val) {
        creditCardDiv.style.display = val;
        paypalDiv.style.display = val;
        bitcoinDiv.style.display = val;
    }

    /*
    This function hides or shows payment options in the order specified 
    with the value specified
    */
    function paymentHideShow (opt1, opt2, opt3, val1, val2){
        opt1.style.display = val1;
        opt2.style.display = val2;
        opt3.style.display = val2;
    }

    //Tests regex agains form field 
    function isValidInput (regex, value) {
        return regex.test(value);
    }

    //function used to display validation errors
    function createError (el, fieldSet, msgSpan, elLoc, className, msgText){
        el.style.borderColor = 'red';
        fieldSet.insertBefore(msgSpan, elLoc);
        msgSpan.classList = className;
        msgSpan.textContent = msgText;
        msgSpan.style.color = 'red';
    }

    //function to remove validation errors when form has valid input
    function removeError (className, el) {
        document.querySelector(className).remove();
        el.style.borderColor = '';
    }

    /* 
        GIVES FOCUS ON PAGE LOAD TO "NAME" INPUT FIELD
    */

    //Adds focus to name element on page load
    window.onload = function() {
        document.getElementById('name').focus();
    };

    /* 
        HIDE/SHOW JOB ROLES <INPUT> FIELD
    */

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

    //creates select option prompting user to choose a theme
    const selectOption = document.createElement('option');
    selectOption.selected = true;
    selectOption.textContent = 'Please select a T-shirt theme';
    color.insertBefore(selectOption, color.firstChild);

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
                //Enabling fields if checkboxes are unchecked
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
                checkedTally++;
            } else if ( ! e.target.checked ) {
                actualCost -= cost;
                innerPElement.innerHTML = 'Cost: $' + actualCost;
                checkedTally--;
            }
            //Validation for checkboxes requiring at least one check box selected
            if ( checkedTally == 0 ) {
                createError(confFieldset, confFieldset, confError, confFieldset.firstElementChild, "confError", "It's a requirement that at least one of the available conferences be selected.");
                confLegend.style.color = 'red';
                confLegend.style.borderColor = 'red';
            } else if (checkedTally > 0) {
                const checkboxErrorSpan = document.querySelector('.confError ');
                if (typeof(checkboxErrorSpan) != 'undefined' && checkboxErrorSpan != null) {
                    removeError('.confError', confFieldset);
                    confLegend.style.color = '';
                    confLegend.style.borderColor = '';
                }
            }
        });
    }

    /*
        PAYMENT INFO OPTIONS
    */

    //Initially hiding payment containers
    paymentInitHideShow('none');
    //Setting credit card option to be selected
    paymentOptions[1].selected = true;

    //Showing credit card options container
    if (paymentSelect.value == 'credit card') {
        creditCardDiv.style.display = 'inherit';
    }


    //Showing or hiding payment options based on select box value
    paymentSelect.addEventListener('change', (e) => {
            const creditCardError = document.querySelector('.creditError');
            const creditZipError = document.querySelector('.zipError');
            const creditCvvError = document.querySelector('.cvvError');     

            if (e.target.value == "credit card") {
                paymentHideShow(creditCardDiv, paypalDiv, bitcoinDiv, 'inherit', 'none');
            } else if (e.target.value == "paypal") {
                paymentHideShow(paypalDiv, bitcoinDiv, creditCardDiv, 'inherit', 'none');
                //Removes error messages if user changes payment method to something other than credit
                if ( paymentFieldset.contains(creditCardError) == true ) {
                    removeError('.creditError', creditCard);
                } 
                if ( paymentFieldset.contains(creditZipError) == true ) {
                    removeError('.zipError', zip);
                }
                if ( paymentFieldset.contains(creditCvvError) == true ) {
                    removeError('.cvvError', cvv);
                }
            } else if (e.target.value == 'bitcoin') {
                paymentHideShow(bitcoinDiv, creditCardDiv, paypalDiv, 'inherit', 'none');
                //Removes error messages if user changes payment method to something other than credit
                if ( paymentFieldset.contains(creditCardError) == true ) {
                    removeError('.creditError', creditCard);
                } 
                if ( paymentFieldset.contains(creditZipError) == true ) {
                    removeError('.zipError', zip);
                }
                if ( paymentFieldset.contains(creditCvvError) == true ) {
                    removeError('.cvvError', cvv);
                }
            } else if (e.target.value == 'select method') {
                paymentOptions[1].selected = true;
                paymentHideShow(creditCardDiv, paypalDiv, bitcoinDiv, 'inherit', 'none');
            }
    });



    /*
        FORM VALIDATION
    */

    //Tests and displays errors for name input

    name.addEventListener('input', (e) => {
        if(isValidInput(/^[A-Za-z ]+$/, name.value) == true && name.value != '') {
            const nameErrorSpan = document.querySelector('.nameError');
            if (typeof(nameErrorSpan) != 'undefined' && nameErrorSpan != null) {
                removeError('.nameError', name);
            }
        } else {
            createError(name, basicInfoFieldset, nameError, name.previousElementSibling, 'nameError', "A name consisting of only letters is required.");
        }
    });

    //Tests and displays errors for mail input
    mail.addEventListener('input', (e) => {
        if(isValidInput(/^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([A-Za-z]{2,5})$/, mail.value) == true && mail.value != '') {
            const mailErrorSpan = document.querySelector('.mailError');
            if (typeof(mailErrorSpan) != 'undefined' && mailErrorSpan != null) {
                removeError('.mailError', mail);
            }
        } else {
            createError(mail, basicInfoFieldset, mailError, mail.previousElementSibling, 'mailError', "A valid email address is required. Ex. yourname@gmail.com");
        }
    });
    
    //Tests and displays errors for credit card input
    creditCard.addEventListener('input', (e) => {
        if(isValidInput(/^([0-9]){13,16}$/, creditCard.value) == true && creditCard.value != '') {
            const creditErrorDiv = document.querySelector('.creditError');
            if (typeof(creditErrorDiv) != 'undefined' && creditErrorDiv != null) {
                removeError('.creditError', creditCard);
            } 
        } else {
            createError(creditCard, paymentFieldset, creditError, creditErrorLoc, 'creditError', "A valid 13 to 16 digit credit card number is required.");
        }
    });

    //Tests and displays errors for zip input
    zip.addEventListener('input', (e) => {
        if(isValidInput(/^([0-9]){5}$/, zip.value) == true && zip.value != '') {
            const zipErrorDiv = document.querySelector('.zipError');
            if (typeof(zipErrorDiv) != 'undefined' && zipErrorDiv != null) {
                removeError('.zipError', zip);
            }
        } else {
            createError(zip, paymentFieldset, zipError, creditErrorLoc, 'zipError', "A valid 5 digit Zip Code is required.");
        }
    });

    //Tests and displays errors for cvv input
    cvv.addEventListener('input', (e) => {
        if(isValidInput(/^([0-9]){3}$/, cvv.value) == true && cvv.value != '') {
            const cvvErrorDiv = document.querySelector('.cvvError');
            if (typeof(cvvErrorDiv) != 'undefined' && cvvErrorDiv != null) {
                removeError('.cvvError', cvv);
            }
        } else {
            createError(cvv, paymentFieldset, cvvError, creditErrorLoc, 'cvvError', "A valid 3 digit CVV Code is required.");
        }
    });

    /*
        VALIDATING FORM ON SUBMIT
    */

    formElement.addEventListener('submit', (e) => {
        if ( name.value == "" ) {
            createError(name, basicInfoFieldset, nameError, name.previousElementSibling, 'nameError', "A name consisting of only letters is required.");
        }
        if ( mail.value == "" ) {
            createError(mail, basicInfoFieldset, mailError, mail.previousElementSibling, 'mailError', "A valid email address is required. Ex. yourname@gmail.com");
        }
        if ( checkedTally == 0 ) {
            createError(confFieldset, confFieldset, confError, confFieldset.firstElementChild, "confError", "It's a requirement that at least one of the available conferences be selected.");
        }
        if ( creditCard.value == "") {
            if (paymentSelect.value == "credit card") {
                createError(creditCard, paymentFieldset, creditError, creditErrorLoc, 'creditError', "A valid 13 to 16 digit credit card number is required.");
            }
        }
        if ( zip.value == "") {
            if (paymentSelect.value == "credit card") {
                createError(zip, paymentFieldset, zipError, creditErrorLoc, 'zipError', "A valid 5 digit Zip Code is required.");
            }
        }
        if ( cvv.value == "") {
            if (paymentSelect.value == "credit card") {
                createError(cvv, paymentFieldset, cvvError, creditErrorLoc, 'cvvError', "A valid 3 digit CVV Code is required.");
            }
        }
        e.preventDefault();
    });

});