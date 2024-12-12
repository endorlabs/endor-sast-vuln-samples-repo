// User registration form validation

class UserRegistration {
    constructor() {
        // ruleid: js-redos
        this.nameRegex = /^([a-zA-Z]+\s?)*$/;
        this.emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;
        // ruleid: js-redos
        this.passwordRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})*$/;  
    }

    validateName(name) {
        return this.nameRegex.test(name);
    }

    validateEmail(email) {
        return this.emailRegex.test(email);
    }

    validatePassword(password) {
        return this.passwordRegex.test(password);
    }

    validateForm(name, email, password) {
        const isNameValid = this.validateName(name);
        const isEmailValid = this.validateEmail(email);
        const isPasswordValid = this.validatePassword(password);

        if (isNameValid && isEmailValid && isPasswordValid) {
            console.log("Form is valid. Proceeding with registration.");
            this.registerUser(name, email, password);
        } else {
            console.log("Form is invalid. Please check your inputs.");
            this.displayErrors(isNameValid, isEmailValid, isPasswordValid);
        }
    }

    registerUser(name, email, password) {
        // Simulating user registration
        console.log(`Registering user: ${name}, ${email}`);
        // In a real application, you would hash the password and save to a database
    }

    displayErrors(isNameValid, isEmailValid, isPasswordValid) {
        if (!isNameValid) console.log("Invalid name format.");
        if (!isEmailValid) console.log("Invalid email format.");
        if (!isPasswordValid) console.log("Invalid password format.");
    }
}

// Usage example
const registration = new UserRegistration();

// Test with valid inputs
registration.validateForm("John Doe", "john.doe@example.com", "SecureP@ss1");

// Test with invalid inputs
registration.validateForm("John123 Doe", "invalid-email", "weakpass");

registration.validateForm("a ".repeat(1000000), "attacker@evil.com", "Malicious1!");