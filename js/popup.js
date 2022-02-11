const ticker = {
    url: 'https://api.binance.com/api/v3/exchangeInfo?symbols=%5B%22ADAUSDT%22%2C%22ALGOUSDT%22%2C%22BNBUSDT%22%2C%22BTCUSDT%22%2C%22BTTUSDT%22%2C%22DOTUSDT%22%2C%22ETHUSDT%22%2C%22SOLUSDT%22%2C%22XRPUSDT%22%5D'
}

let tbody = document.getElementById('tbody');
let elements = [];

fetch(ticker.url)
    .then(response => {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("hata");
        }
        return response.json();
    })
    .then(res => {
        for (const [key, value] of Object.entries(res.symbols)) {
            elements[key] = [value];
        }

        for (const [key, value] of Object.entries(elements)) {
            let val = value[0];

            tbody.innerHTML +=
                `<tr id='tr_change__${val.baseAsset}' class='clickable' data-href=''>
                <td><div class="td-items name"><img class="td-icon" width="24" height="24" src="/images/${val.baseAsset.toLowerCase()}.png"></img>${val.baseAsset}</div>
                </td>
                <td><div id="change__${val.baseAsset}" data-change="${val.symbol}" data-change-last="${val.symbol}">-</div></td>
                <td><div id="price__${val.baseAsset}" class="td-items number f-right" data-price="${val.symbol}" data-price-last="${val.symbol}">-</div></td>
            </tr>`;
        }


        let tableRows = document.getElementsByClassName('clickable');
        for (let i = 0, ln = tableRows.length; i < ln; i++) {
            tableRows[i].addEventListener('click', function() {
                window.open(this.getAttribute('data-href'));
            });
        }

        let input = document.getElementById('searchBar');
        input.onkeyup = function search() {
            // Declare variables
            let input, filter, table, tr, td, i, j, tds, ths, matched;
            input = document.getElementById("searchBar");
            filter = input.value.toUpperCase();
            tr = document.getElementsByTagName("tr");

            for (i = 0; i < tr.length; i++) {
                tds = tr[i].getElementsByTagName("td");
                ths = tr[i].getElementsByTagName("th");
                matched = false;

                // leave the row header 
                if (ths.length > 0) {
                    matched = true;
                } else {
                    for (j = 0; j < tds.length; j++) {
                        td = tds[j];
                        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                            matched = true;
                            break;
                        }

                    }
                }
                if (matched == true) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

    })

chrome.runtime.sendMessage({ msg: "startSocket" });