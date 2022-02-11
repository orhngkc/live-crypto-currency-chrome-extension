chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
    let element = response.e.data;
    let CHANGE = document.querySelectorAll(`[data-change]`);
    let PRICE = document.querySelectorAll(`[data-price]`);

    CHANGE.forEach(rows => {
        if (rows.dataset.change == element.s) {

            let previous = rows.getAttribute("data-previous-change");

            rows.innerHTML = fixedPrice((parseFloat(element.P))) + ' %';

            if (previous > element.P) {
                rows.classList.add("blink-down");
                setTimeout(function() {
                    rows.classList.remove("blink-down");
                }, 1000);
            } else {
                rows.classList.add("blink-up");
                setTimeout(function() {
                    rows.classList.remove("blink-up");
                }, 1000);
            }

            rows.setAttribute("data-previous-change", element.P);
        }
    });

    PRICE.forEach(rows => {
        if (rows.dataset.price == element.s) {
            let previous = rows.getAttribute("data-previous-value");

            rows.innerHTML = formattedOutput(fixedPrice((parseFloat(element.c)), 2)) + ' USDT';


            if (previous > element.c) {
                rows.classList.add("blink-down");
                setTimeout(function() {
                    rows.classList.remove("blink-down");
                }, 1000);
            } else {
                rows.classList.add("blink-up");
                setTimeout(function() {
                    rows.classList.remove("blink-up");
                }, 1000);
            }

            rows.setAttribute("data-previous-value", element.c);
        }
    });
})

function fixedPrice(x, y = 2) {
    return Number.parseFloat(x).toFixed(y) == 0.00 ? Number.parseFloat(x).toFixed(6) : Number.parseFloat(x).toFixed(y);
}

function formattedOutput(price) {
    // console.log(typeof price)
    if (typeof price === 'string') {
        var positive = price.split('.');
        var leftside = positive[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        var full = leftside + '' + (positive[1] ? ',' + positive[1] : '');
        return full;
    } else {
        return price;
    }
}