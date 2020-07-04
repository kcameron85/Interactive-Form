//Adds focus to name element on page load
window.onload = function() {
    document.getElementById('name').focus();
};

//creates "Other" triggered "Job Role Field"

const createJobRoleField = () => {
    //Selects all the options within the "Title" <select> element
    const jobOptions = document.querySelectorAll('#title option');
    

    //creating hidden text field and setting type, id, and placeholder attributes
    const textField = document.createElement('input');
    textField.type = 'text';
    textField.id = 'other-title';
    textField.setAttribute("placeholder", "Your Job Role");


}

