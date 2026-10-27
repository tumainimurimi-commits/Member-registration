//Grabbing the html element to update using js
const theme=document.querySelector('#theme');
const regform=document.querySelector('#regform');
const fullName=document.querySelector('#name');
const nameError=document.querySelector('#nameError');
const email=document.querySelector('#email');
const emailError=document.querySelector('#emailError');
const password=document.querySelector('#password');
const passwordError=document.querySelector('#passwordError');
const confirmPassword=document.querySelector('#confirm-password');
const confirmError=document.querySelector('#confirmError');
const gender=document.querySelector('#gender');
const genderError=document.querySelector('#genderError');
const dob=document.querySelector('#dob');
const dobError=document.querySelector('#dobError');
const country=document.querySelector('#country');
const countryError=document.querySelector('#countryError');
const phone=document.querySelector('#phone');
const phoneError=document.querySelector('#phoneError');
const bio=document.querySelector('#bio');
const bioError=document.querySelector('#bioError');
const successMsg=document.querySelector('#successMsg');
const count=document.querySelector('#count');
const memberList=document.querySelector('#memberList');

// The array that hold the user input 
const memberEntry=[];

//one that retrieves the theme colour from local storage
const root = document.documentElement;
const savedTheme=localStorage.getItem('theme');
if(savedTheme==='dark'){
    root.classList.add('dark');
}else if (savedTheme==='light'){
    root.classList.remove('dark')
}
// eventlistener handling the dark toggle button
theme.addEventListener('click',()=>{
    const isDark=root.classList.toggle('dark');
    localStorage.setItem('theme', isDark?'dark':'light')
});

//function that validate the member full name
function validateFullName(name){
    const memberName=name.trim();
    if(memberName===''){
        return 'Full name of the member is required';
    }
    if(memberName.length<=4){
        return 'Full name must be atleast 4 characters long';
    }
    
    return '';
}

//Funtion that detect error on the user input
function showFullNameError(message){
    nameError.textContent=message;
    fullName.classList.toggle('error', message!=='');
}

//Funtion that validate the user email
function validateEmail(email){
    const memberEmail=email.trim();
    const EMAIL_REGEX=/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    if(memberEmail===''){
        return 'Email of the member is required';
    }

    if(!EMAIL_REGEX.test(memberEmail)){
        return 'email should be in the format of mugo@student.kyu.ac.ke';
    }

    return '';
}

//function to show the email error
function showEmailError(message){
    emailError.textContent=message;
    email.classList.toggle('error', message!=='');
}

//function validate the member password
function validatePassword(password){
    const memberPassword=password
    if(memberPassword===''){
        return 'password is require';
    }
    if(memberPassword.length<8){
        return 'The password should be atleast 8 numeric numbers';
    }

    return '';
}
//show the user error for wrong password
function showPasswordError(message){
    passwordError.textContent=message;
    password.classList.toggle('error', message!=='');

}
//Validate and check if the password matches that is to confirm
function validateCorfirmPassword(confirm){
    if(confirm===''){
        return 'Please confirm your password'
    }
    if(confirm!==password.value){
        return 'Password do not match'
    }

    return '';
}
//show the error on the confirm password error
function showConfrimPasswordError(message){
    confirmError.textContent=message;
    confirmPassword.classList.toggle('error', message !== '')
}
//validate if the correct gender have been selected
function validateGender(value) {
    if (value === '') {
        return 'Please select your gender';
    }
    return '';
}

// show error on the gender input
function showGenderError(message) {
    genderError.textContent = message;
     gender.classList.toggle('error', message !== '');
}

//validate the date of birth input
function validateDob(value) {
    if (value === '') {
        return 'Date of birth is required';
    }
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate > today) {
        return 'Date of birth cannot be in the future';
    }
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 16) {
        return 'You must be at least 16 years old to register';
    }
    return '';
}
//show date of birth error
function showDobError(message) {
    dobError.textContent = message;
    dob.classList.toggle('error', message !== '');
}

//validate the country input
function validateCountry(value) {
    const memberCountry = value.trim();
    if (memberCountry === '') {
        return 'Country is required';
    }
    if (memberCountry.length < 3) {
        return 'Country name must be at least 3 characters long';
    }
    return '';
}
//show country error
function showCountryError(message) {
    countryError.textContent = message;
    country.classList.toggle('error', message !== '');
}

//validate the user phone number input
function validatePhone(value) {
    const memberPhone = value.trim();
    const PHONE_REGEX = /^\+?[0-9\s-]{9,15}$/;
    if (memberPhone === '') {
        return 'Phone number is required';
    }
    if (!PHONE_REGEX.test(memberPhone)) {
        return 'Phone number must be 9-15 digits, e.g. +254 700 000 000';
    }
    return '';
}
//show phone number error
function showPhoneError(message) {
    phoneError.textContent = message;
    phone.classList.toggle('error', message !== '');
}

//validate thebio input 
function validateBio(value) {
    const memberBio = value.trim();
    if (memberBio === '') {
        return 'Bio is required';
    }
    if (memberBio.length < 10) {
        return 'Bio must be at least 10 characters long';
    }
    if (memberBio.length > 300) {
        return 'Bio must be under 300 characters';
    }
    return '';
}
//show the bio error
function showBioError(message) {
    bioError.textContent = message;
    bio.classList.toggle('error', message !== '');
}

//function showing the number of registered members
function updateCounter(){
    count.textContent=memberEntry.length
}

function gettingUserInput(){
    const member={
        fullName:fullName.value.trim().toUpperCase(),
        email:email.value.trim().toLowerCase(),
        password:password.value,
        gender:gender.value,
        dob:dob.value,
        country:country.value.trim().toUpperCase(),
        phone:phone.value.trim(),
        bio:bio.value.trim()
    }
    memberEntry.push(member);
}

//rendering the member dynamically on the page
function renderContent(){
    memberList.innerHTML='';

    // show the empty note again when there are no members
    if (memberEntry.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'empty';
        emptyLi.id = 'emptyNote';
        emptyLi.textContent = 'No members yet. Register someone to begin.';
        memberList.appendChild(emptyLi);
        return;
    }

    memberEntry.forEach((member, index) => {
        const li = document.createElement('li');
        li.className = 'member-item';

        const info = document.createElement('div');
        info.className = 'info';

        const nameEl = document.createElement('strong');
        nameEl.textContent = member.fullName;

        const emailEl = document.createElement('span');
        emailEl.textContent = member.email;

        info.appendChild(nameEl);
        info.appendChild(emailEl);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove';
        removeBtn.type = 'button';           
        removeBtn.textContent = 'Remove';

     
        removeBtn.addEventListener('click', () => {
            memberEntry.splice(index, 1);
            renderContent();
            updateCounter();
        });

        
        li.appendChild(info);
        li.appendChild(removeBtn);
        memberList.appendChild(li);
    });
}
//Add event listener that handles the user full name input 
fullName.addEventListener('input',()=>{
    const inputMessage=validateFullName(fullName.value);
    showFullNameError(inputMessage);
    
})

//Add event listener that handles the email
email.addEventListener('input',()=>{
    const inputMessage=validateEmail(email.value);
    showEmailError(inputMessage);
})

//Add event listener that handle the user password
password.addEventListener('input',()=>{
    const inputMessage=validatePassword(password.value);
    showPasswordError(inputMessage)
})

confirmPassword.addEventListener('input',()=>{
    const inputMessage=validateCorfirmPassword(confirmPassword.value);
    showConfrimPasswordError(inputMessage);

    if(confirmPassword!==''){
        const confirmMessage=validateCorfirmPassword(confirmPassword.value);
        showConfrimPasswordError(confirmMessage)
    }
});

// Gender uses 'change' because it is a <select>
gender.addEventListener('change', () => {
    const inputMessage = validateGender(gender.value);
    showGenderError(inputMessage);
});

// Date input fires 'change' when the user picks a date
dob.addEventListener('change', () => {
    const inputMessage = validateDob(dob.value);
    showDobError(inputMessage);
});

country.addEventListener('input', () => {
    const inputMessage = validateCountry(country.value);
    showCountryError(inputMessage);
});

phone.addEventListener('input', () => {
    const inputMessage = validatePhone(phone.value);
    showPhoneError(inputMessage);
});

bio.addEventListener('input', () => {
    const inputMessage = validateBio(bio.value);
    showBioError(inputMessage);
});

regform.addEventListener('submit',(e)=>{
    e.preventDefault();

    // validate every field first
    const messages = [
        validateFullName(fullName.value),
        validateEmail(email.value),
        validatePassword(password.value),
        validateCorfirmPassword(confirmPassword.value),
        validateGender(gender.value),
        validateDob(dob.value),
        validateCountry(country.value),
        validatePhone(phone.value),
        validateBio(bio.value)
    ];

    // show all errors so the user sees them
    showFullNameError(messages[0]);
    showEmailError(messages[1]);
    showPasswordError(messages[2]);
    showConfrimPasswordError(messages[3]);
    showGenderError(messages[4]);
    showDobError(messages[5]);
    showCountryError(messages[6]);
    showPhoneError(messages[7]);
    showBioError(messages[8]);

    // stop here if any field is invalid
    if (!messages.every(m => m === '')) {
        return;
    }

    // all valid -> save and render
    gettingUserInput();
    renderContent();
    updateCounter();

    // clear the form using the built-in method
    regform.reset();

    // clear the error messages too
    showFullNameError('');
    showEmailError('');
    showPasswordError('');
    showConfrimPasswordError('');
    showGenderError('');
    showDobError('');
    showCountryError('');
    showPhoneError('');
    showBioError('');
});

updateCounter();
renderContent();
