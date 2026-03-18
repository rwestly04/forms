const form = document.getElementById("registrationForm");

const confirmModal = document.getElementById("confirmModal");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");
const modalTerms = document.getElementById("modalTerms");
const modalTermsError = document.getElementById("modalTermsError");

const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

const firstName = document.getElementById("firstName");
const middleName = document.getElementById("middleName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

/* 👁️ TOGGLE PASSWORD */
const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

togglePassword.addEventListener("click", () => {
  const isHidden = password.type === "password";
  password.type = isHidden ? "text" : "password";
  togglePassword.textContent = isHidden ? "🙈" : "👁️";
});

toggleConfirmPassword.addEventListener("click", () => {
  const isHidden = confirmPassword.type === "password";
  confirmPassword.type = isHidden ? "text" : "password";
  toggleConfirmPassword.textContent = isHidden ? "🙈" : "👁️";
});

const nameRegex = /^[A-Za-z]+$/;

/* NAME FORMAT + VALIDATION */
function formatName(input) {
  input.value = input.value.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

function validateName(input) {
  const formGroup = input.closest(".form-group");
  if (input.value === "") {
    formGroup.classList.remove("error");
    formGroup.querySelector(".error").textContent = "";
    return;
  }
  if (!nameRegex.test(input.value)) {
    formGroup.classList.add("error");
    formGroup.querySelector(".error").textContent = "Only letters allowed";
  } else {
    formGroup.classList.remove("error");
    formGroup.querySelector(".error").textContent = "";
  }
}

[firstName, middleName, lastName].forEach(input => {
  input.addEventListener("input", () => {
    formatName(input);
    validateName(input);
  });
});

/* PASSWORD STRENGTH */
password.addEventListener("input", () => {
  const value = password.value;
  let strength = 0;

  if (value.length >= 8) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/\d/.test(value)) strength++;
  if (/[@$!%*?&]/.test(value)) strength++;

  if (strength <= 1) {
    strengthBar.style.width = "25%";
    strengthBar.style.background = "red";
    strengthText.textContent = "Weak";
  } else if (strength <= 3) {
    strengthBar.style.width = "60%";
    strengthBar.style.background = "orange";
    strengthText.textContent = "Medium";
  } else {
    strengthBar.style.width = "100%";
    strengthBar.style.background = "green";
    strengthText.textContent = "Strong";
  }
});

/* FORM VALIDATION */
form.addEventListener("submit", function(e){
  e.preventDefault();

  let isValid = true;
  const course = document.getElementById("course");
  const gender = document.getElementsByName("gender");

  document.querySelectorAll(".form-group").forEach(group=>{
    group.classList.remove("error");
    group.querySelector(".error").textContent="";
  });

  if(!nameRegex.test(firstName.value)) { showError(firstName,"Only letters allowed"); isValid=false; }
  if(middleName.value && !nameRegex.test(middleName.value)) { showError(middleName,"Only letters allowed"); isValid=false; }
  if(!nameRegex.test(lastName.value)) { showError(lastName,"Only letters allowed"); isValid=false; }
  if(course.value==="") { showError(course,"Select course"); isValid=false; }
  if(!password.value) { showError(password,"Enter password"); isValid=false; }
  if(!confirmPassword.value) { showError(confirmPassword,"Confirm password"); isValid=false; }

  if(password.value !== confirmPassword.value) {
    showError(confirmPassword,"Passwords do not match");
    isValid=false;
  }

  let genderSelected=false;
  gender.forEach(g=>{ if(g.checked) genderSelected=true; });

  if(!genderSelected) { showError(gender[0],"Select gender"); isValid=false; }

  if(isValid){
    modalTerms.checked = false;
    modalTermsError.textContent="";
    confirmModal.style.display="flex";
  }
});

/* MODAL ACTIONS */
confirmYes.addEventListener("click", () => {
  if(!modalTerms.checked){
    modalTermsError.textContent = "You must accept Terms & Conditions";
    return;
  }

  confirmModal.style.display="none";
  successModal.style.display="flex";

  form.reset();
  strengthBar.style.width="0%";
  strengthText.textContent="";
});

confirmNo.addEventListener("click", ()=>{
  confirmModal.style.display="none";
});

function showError(input,message){
  const formGroup = input.closest(".form-group");
  formGroup.classList.add("error");
  formGroup.querySelector(".error").textContent=message;
}

closeModal.addEventListener("click",()=>{
  successModal.style.display="none";
});
