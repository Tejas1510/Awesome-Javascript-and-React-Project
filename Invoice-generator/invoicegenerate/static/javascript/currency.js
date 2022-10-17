
function currencyFunction() {
    var co = document.getElementById("currency-option");
    var subtotal = document.getElementById("subtotal");
    var discount = document.getElementById("discount");
    var tax = document.getElementById("tax");
    var shipping = document.getElementById("shipping");
    var total = document.getElementById("total");
    var amountPaid = document.getElementById("amountPaid");
    var balance = document.getElementById("balance");
    var rate = document.getElementById("rate");
    var amount = document.getElementById("amount");

    // For Rate
    if (co.options[co.selectedIndex].value == "USD") {
        rate.innerHTML = "$"
    }
    if (co.options[co.selectedIndex].value == "INR") {
        rate.innerHTML = "Rs."
    }
    if (co.options[co.selectedIndex].value == "EUR") {
        rate.innerHTML = "&euro;"
    }
    if (co.options[co.selectedIndex].value == "YEN") {
        rate.innerHTML = "&#165;"
    }
    if (co.options[co.selectedIndex].value == "GBP") {
        rate.innerHTML = "&#163;"
    }
    if (co.options[co.selectedIndex].value == "AUD") {
        rate.innerHTML = "A$"
    }
    if (co.options[co.selectedIndex].value == "CAD") {
        rate.innerHTML = "C$"
    }
    // For Amount
    if (co.options[co.selectedIndex].value == "USD") {
        amount.innerHTML = "$"
    }
    if (co.options[co.selectedIndex].value == "INR") {
        amount.innerHTML = "Rs."
    }
    if (co.options[co.selectedIndex].value == "EUR") {
        amount.innerHTML = "&euro;"
    }
    if (co.options[co.selectedIndex].value == "YEN") {
        amount.innerHTML = "&#165;"
    }
    if (co.options[co.selectedIndex].value == "GBP") {
        amount.innerHTML = "&#163;"
    }
    if (co.options[co.selectedIndex].value == "AUD") {
        amount.innerHTML = "A$"
    }
    if (co.options[co.selectedIndex].value == "CAD") {
        amount.innerHTML = "C$"
    }
    // For Subtotal
    if (co.options[co.selectedIndex].value == "USD") {
        subtotal.innerHTML = "$"
    }
    if (co.options[co.selectedIndex].value == "INR") {
        subtotal.innerHTML = "Rs."
    }
    if (co.options[co.selectedIndex].value == "EUR") {
        subtotal.innerHTML = "&euro;"
    }
    if (co.options[co.selectedIndex].value == "YEN") {
        subtotal.innerHTML = "&#165;"
    }
    if (co.options[co.selectedIndex].value == "GBP") {
        subtotal.innerHTML = "&#163;"
    }
    if (co.options[co.selectedIndex].value == "AUD") {
        subtotal.innerHTML = "A$"
    }
    if (co.options[co.selectedIndex].value == "CAD") {
        subtotal.innerHTML = "C$"
    }

    // For Discount
    if (co.options[co.selectedIndex].value == "USD") {
        discount.innerHTML = "$"
    }
    if (co.options[co.selectedIndex].value == "INR") {
        discount.innerHTML = "Rs."
    }
    if (co.options[co.selectedIndex].value == "EUR") {
        discount.innerHTML = "&euro;"
    }
    if (co.options[co.selectedIndex].value == "YEN") {
        discount.innerHTML = "&#165;"
    }
    if (co.options[co.selectedIndex].value == "GBP") {
        discount.innerHTML = "&#163;"
    }
    if (co.options[co.selectedIndex].value == "AUD") {
        discount.innerHTML = "A$"
    }
    if (co.options[co.selectedIndex].value == "CAD") {
        discount.innerHTML = "C$"
    }

    // For Tax
    if (co.options[co.selectedIndex].value == "USD") {
        tax.innerHTML = "$"
    }
    if (co.options[co.selectedIndex].value == "INR") {
        tax.innerHTML = "Rs."
    }
    if (co.options[co.selectedIndex].value == "EUR") {
        tax.innerHTML = "&euro;"
    }
    if (co.options[co.selectedIndex].value == "YEN") {
        tax.innerHTML = "&#165;"
    }
    if (co.options[co.selectedIndex].value == "GBP") {
        tax.innerHTML = "&#163;"
    }
    if (co.options[co.selectedIndex].value == "AUD") {
        tax.innerHTML = "A$"
    }
    if (co.options[co.selectedIndex].value == "CAD") {
        tax.innerHTML = "C$"
    }

    // For Shipping
    if (co.options[co.selectedIndex].value == "USD") {
        shipping.innerHTML = "$"
    }
    if (co.options[co.selectedIndex].value == "INR") {
        shipping.innerHTML = "Rs."
    }
    if (co.options[co.selectedIndex].value == "EUR") {
        shipping.innerHTML = "&euro;"
    }
    if (co.options[co.selectedIndex].value == "YEN") {
        shipping.innerHTML = "&#165;"
    }
    if (co.options[co.selectedIndex].value == "GBP") {
        shipping.innerHTML = "&#163;"
    }
    if (co.options[co.selectedIndex].value == "AUD") {
        shipping.innerHTML = "A$"
    }
    if (co.options[co.selectedIndex].value == "CAD") {
        shipping.innerHTML = "C$"
    }

    // For Total
    if (co.options[co.selectedIndex].value == "USD") {
        total.innerHTML = "$"
    }
    if (co.options[co.selectedIndex].value == "INR") {
        total.innerHTML = "Rs."
    }
    if (co.options[co.selectedIndex].value == "EUR") {
        total.innerHTML = "&euro;"
    }
    if (co.options[co.selectedIndex].value == "YEN") {
        total.innerHTML = "&#165;"
    }
    if (co.options[co.selectedIndex].value == "GBP") {
        total.innerHTML = "&#163;"
    }
    if (co.options[co.selectedIndex].value == "AUD") {
        total.innerHTML = "A$"
    }
    if (co.options[co.selectedIndex].value == "CAD") {
        total.innerHTML = "C$"
    }

    // For Amount Paid
    if (co.options[co.selectedIndex].value == "USD") {
        amountPaid.innerHTML = "$"
    }
    if (co.options[co.selectedIndex].value == "INR") {
        amountPaid.innerHTML = "Rs."
    }
    if (co.options[co.selectedIndex].value == "EUR") {
        amountPaid.innerHTML = "&euro;"
    }
    if (co.options[co.selectedIndex].value == "YEN") {
        amountPaid.innerHTML = "&#165;"
    }
    if (co.options[co.selectedIndex].value == "GBP") {
        amountPaid.innerHTML = "&#163;"
    }
    if (co.options[co.selectedIndex].value == "AUD") {
        amountPaid.innerHTML = "A$"
    }
    if (co.options[co.selectedIndex].value == "CAD") {
        amountPaid.innerHTML = "C$"
    }

    // For Balance
    if (co.options[co.selectedIndex].value == "USD") {
        balance.innerHTML = "$"
    }
    if (co.options[co.selectedIndex].value == "INR") {
        balance.innerHTML = "Rs."
    }
    if (co.options[co.selectedIndex].value == "EUR") {
        balance.innerHTML = "&euro;"
    }
    if (co.options[co.selectedIndex].value == "YEN") {
        balance.innerHTML = "&#165;"
    }
    if (co.options[co.selectedIndex].value == "GBP") {
        balance.innerHTML = "&#163;"
    }
    if (co.options[co.selectedIndex].value == "AUD") {
        balance.innerHTML = "A$"
    }
    if (co.options[co.selectedIndex].value == "CAD") {
        balance.innerHTML = "C$"
    }
}
