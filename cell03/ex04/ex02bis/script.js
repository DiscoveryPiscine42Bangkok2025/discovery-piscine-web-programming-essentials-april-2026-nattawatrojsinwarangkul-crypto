$(document).ready(function() {

    // Every 30 seconds: "Please, use me..."
    setInterval(function() {
        alert("Please, use me...");
    }, 30000);

    // Main calculation
    $('#calculateBtn').click(function() {
        
        const num1 = $('#num1').val().trim();
        const num2 = $('#num2').val().trim();
        const operator = $('#operator').val();

        // Check if inputs are valid positive integers
        if (!num1 || !num2 || isNaN(num1) || isNaN(num2) || 
            parseInt(num1) < 0 || parseInt(num2) < 0) {
            
            alert("Error :(");
            console.log("Error :(");
            return;
        }

        const a = parseInt(num1);
        const b = parseInt(num2);
        let result;

        switch(operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                if (b === 0) {
                    alert("It's over 9000!");
                    console.log("It's over 9000!");
                    return;
                }
                result = a / b;
                break;
            case '%':
                if (b === 0) {
                    alert("It's over 9000!");
                    console.log("It's over 9000!");
                    return;
                }
                result = a % b;
                break;
            default:
                alert("Error :(");
                return;
        }

        // Show result in alert + console
        alert(result);
        console.log(result);
    });

});