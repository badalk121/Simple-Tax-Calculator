$(document).ready(function () {
    $('#taxForm').submit(function (event) {
        event.preventDefault();
        var age = $('#age').val();
        var income = parseFloat($('#income').val());
        var extraIncome = parseFloat($('#extraIncome').val() || 0);
        var deductions = parseFloat($('#deductions').val());

        if (!age) {
            $('#age').addClass('is-invalid');
            return;
        } else {
            $('#age').removeClass('is-invalid');
        }

        if (isNaN(income)) {
            $('#income').addClass('is-invalid');
            return;
        } else {
            $('#income').removeClass('is-invalid');
        }

        if (isNaN(extraIncome)) {
            $('#extraIncome').addClass('is-invalid');
            return;
        } else {
            $('#extraIncome').removeClass('is-invalid');
        }

        if (isNaN(deductions)) {
            $('#deductions').addClass('is-invalid');
            return;
        } else {
            $('#deductions').removeClass('is-invalid');
        }

        var totalIncome = income + extraIncome;
        var tax = calculateTax(age, totalIncome, deductions);
        $('#resultModal').modal('show');
        $('#resultBody').html('Your current tax liability is: ' + tax.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }));
    });

    $('.form-control').hover(function () {
        $(this).next('.fa-question-circle').css('visibility', 'visible');
    }, function () {
        $(this).next('.fa-question-circle').css('visibility', 'hidden');
    });

    function calculateTax(age, income, deductions) {
        var taxableIncome = income - deductions;
        if (taxableIncome <= 800000) {
            return 0;
        } else {
            var taxRate;
            if (age === '<40') {
                taxRate = 0.3;
            } else if (age === '>=40 <60') {
                taxRate = 0.4;
            } else {
                taxRate = 0.1;
            }
            return (taxableIncome - 800000) * taxRate;
        }
    }
});
