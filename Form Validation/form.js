var username = document.querySelector("#username");
var form = document.querySelector("#form");
var mail = document.querySelector("#email");
var pas1 = document.querySelector("#password");
var pas2 = document.querySelector("#password2");


function showError(input, message){
	var formControl = input.parentElement;
	formControl.classList.add("error");
	const small = formControl.querySelector("small");
	small.textContent = message;
}
function showSuccess(input){
	var formControl = input.parentElement;
	formControl.classList.add("success");
}

 function validate(mail) {

            var reg =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return reg.test(mail);
 }

 function match(pas1, pas2){
 	if( pas1.value === pas2.value){
 		return true;
 		console.log("true");
 	}
 	else{
 		return false;
 		console.log("false");
 	}
 }

form.addEventListener("submit", function(e){
	e.preventDefault();
	len = username.value.length;
	if( username.value === ""){
		showError(username, "Username required");

	}
	if ( len < 3){
		showError(username, "Length must be atleast 3 characters");
	}
    else{
    	showSuccess(username);
    }
	if(mail.value === ""){
		showError(mail, "Email required");
	}
	else if(validate(mail.value) == false){
		showError(mail, "Email is not valid")
	}
    else {
    	showSuccess(mail);
    }
    if(pas1.value === ""){
		showError(pas1, "Password required");
    }
    else{
    	showSuccess(pas1);
    }
    if(pas2.value === ""){
		showError(pas2, "Password required");
    }
    else if(!match(pas1, pas2)){
    	showError(pas2, "passwords dont match");
    }
    else{
    	showSuccess(pas2);
    }
    
});

