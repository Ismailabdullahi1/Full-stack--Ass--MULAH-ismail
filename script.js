// ALL JS //

document.addEventListener('DOMContentLoaded', () => {
    // --- Page 1 functionality (index.html) ---

    // Get elements for Page 1
    const countryCodeSelect = document.getElementById('countryCode');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const checkLoyaltyPointsBtn = document.getElementById('checkLoyaltyPoints');
    
    const checkIconFa = document.querySelector('.fa-solid.fa-circle-check'); 

    
    const errorModal = document.getElementById('errorModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalBackBtn = document.getElementById('modalBackBtn');

    
    const CORRECT_PHONE_NUMBER = '+60173527250';
    const MIN_PHONE_LENGTH = 9;

    
    if (mobileNumberInput && checkLoyaltyPointsBtn && countryCodeSelect && checkIconFa && errorModal && modalMessage && modalBackBtn) {

       
        const updateCheckIcon = () => {
            const value = mobileNumberInput.value.trim();
            const currentCountryCode = countryCodeSelect.value;
            const fullPhoneNumber = currentCountryCode + value;

            if (fullPhoneNumber === CORRECT_PHONE_NUMBER) {
                checkIconFa.classList.add('green'); 
            } else {
                checkIconFa.classList.remove('green'); 
            }
        };

        
        mobileNumberInput.addEventListener('input', () => {
            let value = mobileNumberInput.value;
            value = value.replace(/[^0-9]/g, ''); 
            mobileNumberInput.value = value;
            updateCheckIcon(); 
        });

        countryCodeSelect.addEventListener('change', updateCheckIcon); 

        
        updateCheckIcon(); 

        
        checkLoyaltyPointsBtn.addEventListener('click', () => {
            const selectedCountryCode = countryCodeSelect.value;
            const mobileNumber = mobileNumberInput.value.trim();
            const fullPhoneNumber = selectedCountryCode + mobileNumber;

            if (mobileNumber.length < MIN_PHONE_LENGTH) {
                modalMessage.textContent = `Invalid phone number.\nPlease ensure it is at least ${MIN_PHONE_LENGTH} characters.`;
                errorModal.style.display = 'flex';
            } else if (fullPhoneNumber === CORRECT_PHONE_NUMBER) {
                localStorage.setItem('phoneNumber', fullPhoneNumber);
                window.location.href = 'register.html';
            } else {
                modalMessage.textContent = `Invalid phone number.\nPlease enter the correct loyalty phone number.`;
                errorModal.style.display = 'flex';
            }
        });

        
        modalBackBtn.addEventListener('click', () => {
            errorModal.style.display = 'none'; 
        });
    }

    // --- Page 2 functionality ---

    
    const nameInput = document.getElementById('name');
    const ddInput = document.getElementById('dd');
    const mmInput = document.getElementById('mm');
    const yyyyInput = document.getElementById('yyyy'); 
    const emailInput = document.getElementById('email');
    const noEmailCheckbox = document.getElementById('noEmail');
    const continueBtn = document.getElementById('continueBtn');

    const nameError = document.getElementById('nameError');
    const birthdayError = document.getElementById('birthdayError');
    const emailError = document.getElementById('emailError');

    if (continueBtn) {
        
        ddInput.addEventListener('input', () => ddInput.value = ddInput.value.replace(/[^0-9]/g, ''));
        mmInput.addEventListener('input', () => mmInput.value = mmInput.value.replace(/[^0-9]/g, ''));
        yyyyInput.addEventListener('input', () => yyyyInput.value = yyyyInput.value.replace(/[^0-9]/g, '')); // Changed from `McClellanInput` for consistency

        noEmailCheckbox.addEventListener('change', () => {
            if (noEmailCheckbox.checked) {
                emailInput.value = '';
                emailInput.disabled = true;
                emailInput.placeholder = 'N/A';
                emailError.textContent = '';
            } else {
                emailInput.disabled = false;
                emailInput.placeholder = 'Email Address';
            }
        });

        continueBtn.addEventListener('click', () => {
            let isValid = true;

            
            if (nameInput.value.trim() === '') {
                nameError.textContent = '*Please insert a name.';
                isValid = false;
            } else {
                nameError.textContent = '';
            }

            
            const dd = ddInput.value.trim();
            const mm = mmInput.value.trim();
            const yyyy = yyyyInput.value.trim(); 

            if (dd === '' || mm === '' || yyyy === '') {
                birthdayError.textContent = '*Please insert your birthday.';
                isValid = false;
            } else {
                const day = parseInt(dd);
                const month = parseInt(mm);
                const year = parseInt(yyyy); 

                if (isNaN(day) || isNaN(month) || isNaN(year) ||
                    day < 1 || day > 31 ||
                    month < 1 || month > 12 ||
                    year < 1900 || year > new Date().getFullYear()) {
                    birthdayError.textContent = '*Please enter a valid birthday (DD MM YYYY).';
                    isValid = false;
                } else {
                    birthdayError.textContent = '';
                }
            }

           
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!noEmailCheckbox.checked && emailInput.value.trim() === '') {
                emailError.textContent = '*Please insert a valid email address.';
                isValid = false;
            } else if (!noEmailCheckbox.checked && !emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = '*Please insert a valid email address.';
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            if (isValid) {
                localStorage.setItem('name', nameInput.value.trim());
                localStorage.setItem('birthday', `${dd}/${mm}/${yyyy}`); 
                localStorage.setItem('email', noEmailCheckbox.checked ? 'N/A' : emailInput.value.trim());

                window.location.href = 'display.html';
            }
        });
    }
});


// END OF JS 