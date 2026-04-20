(function() {
    /*========== DOM ELEMENTS ==========*/
    const contactForm = document.getElementById('advancedContactForm');
    const submitBtn = document.getElementById('glowSubmitBtn');
    const notificationArea = document.getElementById('notificationArea');

    /*========== HELPER: SHOW NOTIFICATION MESSAGE ==========*/
    function showNotification(message, type = 'success') {
        if (notificationArea) {
            notificationArea.innerHTML = '';
            const notifDiv = document.createElement('div');
            notifDiv.className = `form-notification ${type}`;
            
            /*========== ICON BASED ON NOTIFICATION TYPE ==========*/
            const icon = type === 'success' 
                ? '<i class="fas fa-check-circle"></i>' 
                : '<i class="fas fa-exclamation-triangle"></i>';
            
            notifDiv.innerHTML = `${icon} <span>${message}</span>`;
            notificationArea.appendChild(notifDiv);
            
            /*========== AUTO REMOVE AFTER 6 SECONDS WITH FADE EFFECT ==========*/
            setTimeout(() => {
                if (notifDiv && notifDiv.parentNode) {
                    notifDiv.style.opacity = '0';
                    notifDiv.style.transition = 'opacity 0.3s';
                    setTimeout(() => {
                        if (notifDiv.parentNode) notifDiv.remove();
                    }, 300);
                }
            }, 6000);
        } else {
            /*========== FALLBACK ALERT IF NOTIFICATION AREA MISSING ==========*/
            alert(message);
        }
    }



    /*========== RESET BUTTON TO ORIGINAL STATE ==========*/
function resetButton() {
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> SEND MESSAGE';
            submitBtn.disabled = false;
        }
}



    /*========== SET BUTTON TO LOADING STATE ==========*/
function setButtonLoading() {
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> SENDING...';
            submitBtn.disabled = true;
        }
}


    /*========== CLIENT-SIDE VALIDATION (ENHANCED) ==========*/
function validateFormData(formData) {
        const name = formData.get('name')?.trim() || '';
        const email = formData.get('email')?.trim() || '';
        const message = formData.get('message')?.trim() || '';

        if (!name) {
            showNotification('❌ Please enter your full name.', 'error');
            return false;
        }
        
        if (name.length < 2) {
            showNotification('❌ Name must be at least 2 characters.', 'error');
            return false;
        }
        
        if (!email) {
            showNotification('❌ Email address is required.', 'error');
            return false;
        }
        
        /*========== STRICT EMAIL REGEX VALIDATION ==========*/
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('❌ Please provide a valid email (e.g., name@domain.com).', 'error');
            return false;
        }
        
        if (!message) {
            showNotification('❌ Message cannot be empty. Write your inquiry.', 'error');
            return false;
        }
        
        if (message.length < 5) {
            showNotification('❌ Message is too short. Please provide more details.', 'error');
            return false;
        }
        
        return true;
}



    /*========== HANDLE FORM SUBMISSION VIA FETCH (AJAX) TO PREVENT PAGE REFRESH 
if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            /*========== COLLECT FORM DATA FOR VALIDATION ==========*/
            const formData = new FormData(contactForm);
            
            if (!validateFormData(formData)) {
                return; /*========== VALIDATION FAILED, NOTIFICATION ALREADY SHOWN ==========*/
            }

            /*========== SET LOADING STATE ==========*/
            setButtonLoading();

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    /*========== SUCCESS NOTIFICATION ==========*/
                    showNotification('✅ Message sent successfully! Our pharmacy team will reach out shortly.', 'success');
                    contactForm.reset(); // Clear all fields
                    console.log('Form submitted to Formspree successfully');
                } else {
                    /*========== ATTEMPT TO GET ERROR DETAILS FROM FORMSPREE ==========*/
                    let errorMsg = 'Failed to send message. Please check your network or try again later.';
                    try {
                        const errorData = await response.json();
                        if (errorData && errorData.errors) {
                            errorMsg = errorData.errors.map(err => err.message).join(', ');
                        }
                    } catch (e) {
                        /*========== SILENT FALLBACK ==========*/
                    }
                    showNotification(`❌ ${errorMsg}`, 'error');
                }
            } catch (netError) {
                console.error('Contact form network error:', netError);
                showNotification('⚠️ Network error — unable to reach server. Please verify your internet connection.', 'error');
            } finally {
                resetButton();
            }
        });
}


    /*========== ADDITIONAL REAL-TIME INLINE FIELD BEAUTIFICATION ==========*/
    const inputs = document.querySelectorAll('.modern-form input, .modern-form textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement?.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement?.classList.remove('focused');
        });
    });



    /*========== PAGE LOAD ANIMATION AND FOCUS EFFECTS  ==========*/
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        
        /*========== ADD FOCUS EFFECTS FOR BETTER UX  ==========*/
        const formInputs = document.querySelectorAll('.modern-form input, .modern-form textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.01)';
            });
            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
            });
        });
    });



    /*========== OPTIONAL: ADD CHARACTER COUNTER FOR MESSAGE FIELD (NICE TOUCH)  ==========*/
    const messageField = document.querySelector('textarea[name="message"]');
    if (messageField) {
        const counterDiv = document.createElement('div');
        counterDiv.style.cssText = 'font-size: 0.7rem; color: #6d8fd1; margin-top: 5px; text-align: right;';
        counterDiv.innerHTML = '<span id="charCount">0</span> characters';
        messageField.parentNode.appendChild(counterDiv);
        
        const charCountSpan = document.getElementById('charCount');
        messageField.addEventListener('input', function() {
            const count = this.value.length;
            if (charCountSpan) {
                charCountSpan.textContent = count;
                if (count > 500) {
                    charCountSpan.style.color = '#ff9f6e';
                } else {
                    charCountSpan.style.color = '#6d8fd1';
                }
            }
        });
    }
})();