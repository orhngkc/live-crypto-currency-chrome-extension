chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg == "startSocket") startSocket();
    }
)

const SocketBridge = {
    socket: null,
    list: [],
    connectUrl: "wss://stream.binance.com:9443/stream?streams=adausdt@ticker/algousdt@ticker/bnbusdt@ticker/btcusdt@ticker/bttusdt@ticker/dotusdt@ticker/ethusdt@ticker/solusdt@ticker/xrpusdt@ticker/bttusdt@ticker"
}

function startSocket() {
    const ws = new WebSocket(SocketBridge.connectUrl);

    ws.onopen = function() {
        console.log("Binance connected.");
    };

    ws.onmessage = function(evt) {
        let msg = JSON.parse(evt.data);

        chrome.runtime.sendMessage({ e: msg });
    }
}