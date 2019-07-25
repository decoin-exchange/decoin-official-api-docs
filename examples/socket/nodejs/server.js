const signalR = require("@aspnet/signalr");
var socket_api_url ="https://socketv1.decoin.io/market";
let socketConnection = new signalR.HubConnectionBuilder()
//exchange/socket/api  
.withUrl(socket_api_url)
.build();
    var pairId = "BTC-USDT";     
    socketConnection.serverTimeoutInMilliseconds = 1000 * 60 * 10;

    // provides info when there is and update in order
    socketConnection.on('OrderUpdates/' + pairId, data => {
         console.log(data);      
      });

      // provides updated price of pair
     socketConnection.on('NewPriceBar/' + pairId, data => {
        data = JSON.parse(data);
        console.log(data);
      });

      // get updates in user ooders
    socketConnection.on('UserOrderUpdates', data => {
        data = JSON.parse(data);
        console.log(data);       
      });

      // get wallet updates
      socketConnection.on('WalletUpdate', data => {
        data = JSON.parse(data);
        console.log("WalletUpdate");
        console.log(data);
      });

      // get trade history
     socketConnection.on('TradeHistoryUpdates/' + pairId, data => {
        data = JSON.parse(data);
        console.log("TradeHistoryUpdates");
        console.log(data);
        data.forEach(historyOrders => {
          if (historyOrders.length > 60) {
            historyOrders.splice(-1, 1);
          }
        });
      });

      // get ticker updates
    socketConnection.on('TickerUpdates', data => {
      data = JSON.parse(data);
      console.log(data);            
});

// start connection with socket and get yourself authenticated with key provide
socketConnection.start()
.then(() => {
    userAuth();
   socketConnection.send('JoinPairChannel', pairId)});
   function userAuth() {
   socketConnection.send('UserAuth', "YOUR_AUTH_TOKEN");
}