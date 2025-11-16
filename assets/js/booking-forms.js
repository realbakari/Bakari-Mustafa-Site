// Booking Forms Tab Switcher
(function() {
  'use strict';

  const tabs = document.querySelectorAll('.booking-tab');
  const forms = document.querySelectorAll('.booking-form');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const formType = this.dataset.form;

      // Remove active class from all tabs and forms
      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));

      // Add active class to clicked tab and corresponding form
      this.classList.add('active');
      const targetForm = document.getElementById(`${formType}-form`);
      if (targetForm) {
        targetForm.classList.add('active');
      }
    });
  });
})();
