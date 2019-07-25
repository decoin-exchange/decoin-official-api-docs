
# SignalR


 1. Please use SignalR clients to connect with socket https://socketv1.decoin.io.
 2. For SingnalR install the package `@aspnet/signalr`.

### How to connect with Socket
- You can connect with Socket and Subcribe to channel after installing SIgnalR. 
- Here it is the JavaScript example for demonstrating the connectin to Socket and subcribing to channel.


**JavaScript Example**
   
   Install the SignnalR package by npm
          
    npm install @aspnet/signalr

For Connection to Socket.  
   
    let socketConnection = new signalR.HubConnectionBuilder()
    .withUrl("/market")
    .build();
    socketConnection.on("{channel_name}", Data => {
    console.log(Data);
     });
    socketConnection.start()
    .then(() => socketConnection.send('{JoinPairChannel}', {pairName});
    
**channel_name:** It is the name of the channel to which you want to connect like `TickerUpdates`.

**JoinPairChannel:** It is the name of the method for joining pairChannel.

**pairName:** It is the Name of the pair to which you want to subcscribe like `BTC-ETH` .  
 
## Socket Channels

### **Order Updates Channel**

It is used to get the order book updates.

**Channel Name:** OrderUpdates/{PairName}

**PairName:** like BTC-ETH

	[
	  [   // BuyOrders
	    [	
	      "0.004834",  // Quantity			
	      "9181"       // Rate			
	    ]
	    ...
	  ],								
	  [   // SellOrders
	    [								
	      "0",        // Quantity			
	      "9158"      // Rate	
	    ]
	    ...
	  ]								
	]

### **Order History Channel**

It is used to check the history of the orders.

**Channel Name:** TradeHistoryUpdates/{PairName}

**PairName:** like BTC-ETH

	[
	  [ 	
	    "9572.00000000",                // Rate
	    "0.04733500",                   // Quantity
	    "2019-07-17T14:11:32.0000000Z"  // Time
	  ] 
	  ...
	]	

### **Ticket Updates Channel**

It is used to get Ticket Updates.

**Channel Name:** TickerUpdates

    [
	  [
	    'BTC/USDT',                  // PairName
	    "9316",                      // AskPrice
	    "9284",                      // BidPrice
	    "13110.00000000",            // HighPrice
	    "9263",                      // LowPrice
	    "9310",                      // LastPrice
	    "13109.00000000",            // PrevDayPrice
	    "43027.4695700000000000",    // Volume	
	    false                        // TrendUp
	  ]
	  ...
	]
  
### **User Order Updates**

It is used to get order update after order is placed.

**Channel Name:** UserOrderUpdates

    [ 
	  [ 
	    51,                              // Id
        '11828.0',                       // Rate
        '0.000846',                      // Quantity
        '0.000846',                      // QuantityRemaining
        '0.0',                           // StopPrice
        0,                               // Status
        '2019-07-12T12:13:52.5034166Z',  // LastUpdated
        null                             // Fills
	  ]
	  ...
	]                        

### ** Wallet Update ** 

It is used to update the wallet.

**Channel Name:** WalletUpdate

	[
	  [ 
	    'USDT',             // Currency Code
	    '8359.50718000', 	// Available
	    '8000.00000000' 	// Balance
	  ]
	  ...
	]
	
### ** New Price Bar **

It is used to get price history of pair.

**Channel Name: ** NewPriceBar

	[ 
	  'BTC/USDT',	// PairName
	  '9419',       // OpenPrice
	  '9419',       // ClosePrice
	  '9419',       // HighPrice
	  '9419',       // LowPrice
	  '0',          // Volume
	  1563367545    // Time
	]	