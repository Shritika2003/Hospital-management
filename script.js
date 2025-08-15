document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            const name = document.getElementById('name').value.trim();
            const age = document.getElementById('age').value.trim();
            const date = document.getElementById('date').value;
            const doctor = document.getElementById('doctor').value;

            if (!name || !age || !date || !doctor) {
                e.preventDefault();
                alert('Please fill all required fields!');
            }
        });
    }
});
