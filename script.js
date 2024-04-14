$(document).ready(function () {
    $('#taxForm').submit(function (event) {
        event.preventDefault();
        var age = $('#age').val();
        var income = $('#income').val().trim();
        var extraIncome = $('#extraIncome').val().trim();
        var deductions = $('#deductions').val().trim();

        if (!age) {
            $('#ageError').find('i').css('visibility', 'visible');
            $('#age').addClass('is-invalid');
            return;
        } else {
            $('#ageError').find('i').css('visibility', 'hidden');
            $('#age').removeClass('is-invalid');
        }

        if (!isValidNumber(income)) {
            $('#incomeError').find('i').css('visibility', 'visible');
            $('#income').addClass('is-invalid');
            return;
        } else {
            $('#incomeError').find('i').css('visibility', 'hidden');
            $('#income').removeClass('is-invalid');
        }

        if (!isValidNumber(extraIncome)) {
            $('#extraIncomeError').find('i').css('visibility', 'visible');
            $('#extraIncome').addClass('is-invalid');
            return;
        } else {
            $('#extraIncomeError').find('i').css('visibility', 'hidden');
            $('#extraIncome').removeClass('is-invalid');
        }

        if (!isValidNumber(deductions)) {
            $('#deductionsError').find('i').css('visibility', 'visible');
            $('#deductions').addClass('is-invalid');
            return;
        } else {
            $('#deductionsError').find('i').css('visibility', 'hidden');
            $('#deductions').removeClass('is-invalid');
        }

        var totalIncome = parseFloat(income) + parseFloat(extraIncome);
        var tax = calculateTax(age, totalIncome, parseFloat(deductions));
        $('#resultModal').modal('show');
        $('#resultBody').html('Your current tax liability is: ' + tax.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }));
    });

    $('.form-control').hover(function () {
        $(this).next('.fa-question-circle').css('visibility', 'visible');
    }, function () {
        $(this).next('.fa-question-circle').css('visibility', 'hidden');
    });

    function isValidNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

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
