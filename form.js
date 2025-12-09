class Validator{
    static isNameValid(name){
        if(name.trim() === "" ) return "Name is required";
        if(name.length < 3 ) return "Name must be at least 3 character";
        return "";

    }

 static isEmailValid(email){
    const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.trim() === "") return "Email is required";
    if(!emailPattern.test(email)) return "Enter a Vaild email";
    return "";
 }

 static isPhoneValid(phone){
    const pattern = /^[0-9]{10}$/;
    if (phone.trim() === "") return "phone number is required";
    if (!pattern.test(phone)) return "phone must be 10 digits";
    return "";
 }

 static isPasswordValid(password, confirmPassword){
    if(password.trim() === "" ) return "Password is required";
    if(password !== confirmPassword) return "Password do not match";
    return "";
 }

 static isDOBValid(dob){
    if (dob === "") return "Date of birth is required";

    let birthDAte = new Date(dob);
    let today = new Date();

    let age = today.getFullYear() - birthDAte.getFullYear();
    let monthDiff = today.getMonth() - birthDAte.getMonth();

    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDAte.getDate())) {
        age--;
    }
    if(age < 18 )return "You must be at least 18 years old.";

   return "";
 }

static isTermsValid(isChecked){
    return isChecked ? "" : "You must agree to the terms";
}

}


class FormHandler{

    constructor(){
        this.name  = document.getElementById("name");
        this.email = document.getElementById("email");
        this.phone = document.getElementById("phone");
        this.password = document.getElementById("password");
        this.confirmPassword = document.getElementById("confirmPassword");
        this.dob =document.getElementById("dob");
        this.terms = document.getElementById("terms");

        this.strengthBar = document.querySelector("#strength span");

        this.successMessage = document.getElementById("successMessage");

        this.enablePasswordStrength();
    }

enablePasswordStrength(){
    this.password.addEventListener("input", () => {
        const p = this.password.value;
    
        if(p.length === 0){
            this.strengthBar.style.width = "0";
            this.strengthBar.style.background = "transparent";
        }else if(p.length < 4){
            this.strengthBar.style.width = "30%";
            this.strengthBar.style.background = "red";
        } else if(p.length < 7 ){
            this.strengthBar.style.width = "60%";
            this.strengthBar.style.background = "orange";
        } else{
            this.strengthBar.style.width = "100%";
            this.strengthBar.style.background = "green";
        }

});

}

validate(){
    const nameError = Validator.isNameValid(this.name.value);
    const emailError = Validator.isEmailValid(this.email.value);
    const phoneError = Validator.isPhoneValid(this.phone.value);
    const passwordError = Validator.isPasswordValid(this.password.value,this.confirmPassword.value);
    const dobError = Validator.isDOBValid(this.dob.value);
    const termsError = Validator.isTermsValid(this.terms.checked);


 document.getElementById("nameError").innerText = nameError;
 document.getElementById("emailError").innerHTML = emailError;
 document.getElementById("phoneError").innerHTML = phoneError;
 document.getElementById("passwordError").innerHTML = passwordError;
 document.getElementById("dobError").innerHTML = dobError;
 document.getElementById("termsError").innerHTML = termsError;

 if (!nameError && !emailError &&  !phoneError && !dobError && !termsError){
      alert("Registered Successfully 🎉");
      window.location.reload();
    document.getElementById("myForm").reset();
    this.strengthBar.style.width = "0";
    this.strengthBar.style.background = "transparent";
 }
}

}


const form = new FormHandler();

function validateForm(){
    form.validate();
}