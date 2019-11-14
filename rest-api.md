

# Rest API for Decoin Exchange
## General API related Information
 - The base endpoint is:  **[https://apiv1.decoin.io](https://apiv1.decoin.io/)**
 - All endpoints return either a JSON object or array.
 - All time and timestamp related fields are in milliseconds.

## There are two Main EndPoints

 1. Public EndPoints.
 2. Authenticated EndPoints.

### 1. Public EndPoints
 - Public EndPoints accessed through `GET` method.
 - For Public EndPoints, parameters must be sent as a `query string`.
 - Public EndPoints response in case of error will have the following structure.
 
**Example**
  
    {
      "Message": String,
      "Status": Boolean
    }

 - **Message:** Message is about the `API` reponse.
  
 - **Status:** It show status of the response either it is `True` or `False`. `True` shows the request is successfully processed and `False` shows request could not be processed by the server.
 
 
### 2. Authenticated EndPoints
 - All authenticated endpoints can be accessed through only `POST` request.
 - All request must have API key for accessing data from Authenticated EndPoints.
 - Public EndPoints response in case of error will have the following structure.

        {
         "Message": String,
         "Status": Boolean,
         "Result": ObjectArray | JsonArray
        }
		
 - **Message:** Message is about the `API` reponse.

 - **Status:** it show status of the response either it is `True` or `False`. `True` shows the request is successfully processed and `False` shows request could not be processed by the server.

- **Result:** Result has the response data against the API request.

###  Endpoint Security
 - How you interact with each EndPoint depends on the security type.
 - `API-KEYS` passed to the Rest api via request headers.
 - `API-KEYS` can be configured to acccess only certain type of authenticated EndPoints.
 - `API-KEYS` can access all Authenticated EndPoints.

### Signed EndPoints Security
 
 - An additional parameter `signature` is required for `SIGNED` EndPoints.
 - `signature` can be send in the `query string` or `request body`.
 - `signature` is not case sensitive.
 - `SIGNED` Endpoints use `HMAC SHA256` signatures. 
 - `HMACSHA256` uses **key** + **url** + **body** + **time** ( Time at which the request creted) + **exp** (Expiry time after that the request will not be processed).
 - `signature` creation function  will get these  parameters for `signature` creation. 
- `singnature` creation function will get these parameters.

**Parameters**
 
|Name|Type|Mandatory|Description|
| ------------- | ------------- | ------------- |-------------|
|ApiKey|STRING|YES|e.g `0d1cbde2e45c3dd47660cc2da2ca34f9a7777dcc3ee11b80185ed54ab3df50ad`
|SecretKey|STRING|YES|e.g `b2c29281a85b2f06ee4d8e2c9565ff97baba8c29b2c74696b50fc5c049dc41ab`
|Url|STRING|YES|Current url of the request
|Method|STRING|YES| Method `GET` or `POST` 
|Body|STRING|YES| Body of the requested url
|Time|STRING|YES| Current time in `UTC`
|Exp|STRING|YES | Expiry time of the request

### Timing Security 

Trading is about timing some time due to network problem request take too much time to reach to the server so that expiry time specify that after that time request will not be processed by the server.

-   `Signed`  endpoint  requires a parameter `time`, to be sent which should be the millisecond, it is the time of the request when it was created and sent.
- `Exp` parameter is an additional parameter for expiry time it specify the time in milliseconds after that request will be expired its default value is 5000.
- How time security function work is given below.

        if (time < (serverTime + 1000) && (serverTime - timestamp) <= exp)  {
           // request processed 
        } else {
           // reject requested  
        }

## Public EndPoints

### Get Currencies

     GET /market/get-currencies

**Response:**

	[
	  {
	   "Name": "Bitcoin",
	   "Symbol": "BTC"
	  },
	  {
	   "Name": "Decoin",
	   "Symbol": "DTEP"
	  }
	  ...
	]

### Get-OrderBook

     GET /market/get-orderbook/{PairName}

**PairName:** like ETH-BTC
      
**Parameters:**
  
|Name|Type|Mandatory|Description  
| ------------- | ------------- | ------------- |-------------|
| Limit | INTEGER | NO | Default 30, Max 100

  **Response:**
  
    {
      "SellOrders": [
         {
          "Quantity": 0.001,
          "Rate": 6649.3
         }
         ...
       ],
       "BuyOrders": [
         {
          "Quantity": 0.001,
          "Rate": 6549.2
         }
         ...
       ]
    }

### Get-Market History

     GET /market/get-market-history/{PairName}

   **PairName:** like ETH-BTC

   **Parameters:**
  
| Name  | Type   | Mandatory | Description  
| ------------- | ------------- | ------------- |-------------|
| Limit | INTEGER | NO | Default 30, Max 100.
| LastDate | DOUBLE | NO | Default UtcNow Unix time stamp in milliseconds
   
  **Response:**

    [
	    {
	     "Rate": 11449.00000000,
	     "Amount": 0.33711800,
	     "Date": "2019-07-08T12:55:32"
	    }, 
        { 
	     "Rate": 11447.00000000,
	     "Amount": 0.29374200,
	     "Date": "2019-07-08T12:55:32"
	    }
      ...
    ]

### Get-Ticker

     GET /market/get-ticker/{PairName}
  
  **PairName:** like BTC-USDT

  **Parameters:**
  
| Name  | Type   | Mandatory | Description  
| ------------- | ------------- | ------------- |-------------|
| PairName | STRING | NO | Return ticker of given pair if provided. If not, returns all pairs data
  
  **Response:**
  
    [
	    {
	     "Name": "BTC/USDT",
	     "AskPrice": 11865.00000000,
	     "BidPrice": 11606.00000000,
	     "HighPrice": 11846.00000000,
	     "LowPrice": 11164.00000000,
	     "LastPrice": 11828.00000000,
	     "PrevDayPrice": 11304.00000000,
	     "Volume": 43724.23740900
	    }, 
        {
	     "Name": "ETH/BTC",
	     "AskPrice": 0.02954900,
	     "BidPrice": 0.02801894,
	     "HighPrice": 0.02939100,
	     "LowPrice": 0.02839100,
	     "LastPrice": 0.02939100,
	     "PrevDayPrice": 0.02922500,
	     "Volume": 5.26630040
	    }
      ...
	]
### Get-ChartData
  
     GET /market/get-chart-data/{PairName}

  **PairName:** like ETH-BTC

  **Parameters:**
  
| Name  | Type   | Mandatory | Description  
| ------------- | ------------- | ------------- |-------------|
| PairName | String | YES | `BTC-USDT` or `LTC-BTC`
| From | DOUBLE | YES | UNIX Timestamp in miliseconds like `1556188959`
| To | DOUBLE | YES | UNIX Timestamp in miliseconds like `1561457480`
| Tick | STRING | YES | Can be 1, 2, 3... for days, 1min, 2min, 3min... for specifying mins and 1h, 2h, 3h... for specifying hours
  
  **Response:**

    {
      "t":[1559214171,1559215482],
      "h":[0.00000000,0.00000000,0.00000000],
      "l":[0.00000000,0.00000000,0.00000000],
      "o":[0.00000000,0.00000000,0.00000000],
      "c":[0.00000000,0.00000000,0.00000000],
      "v":[0.00000000,0.00000000,0.00000000]
    } 

### How to limit on no of records fetched

### Get Pairs

     GET /market/get-pairs

   **Response:**

     [
       {
        "Name": "ETH-BTC",
        "Base": "Tether",
        "Market": "Bitcoin"
       },
       {
        "Name": "BTC-DTEP",
        "Base": "Bitcoin",
        "Market": "Decoin"
       }
       ...
     ]
 
### Get 24hr Ticker

   GET api/ticker/24hr

   **Parameters:**
  
|Name|Type|Mandatory|Description  
| ------------- | ------------- | ------------- |-------------|
| Symbol |STRING| YES | Symbol like `BTC-USDT`

  **Response:**

    {
      "BTC-USDT": 
      {
        "Ask": 10075.00000000,
        "Bid": 10061.00000000,
        "High": 10159.00000000,
        "Low": 9572.00000000,
        "Last": 10067.00000000,
        "Volume": 36454.40181200
      }
      ...
    }

### Get Exchange Info

   GET market/exchangeInfo
  
  **Response**

    {
    "Timezone": "UTC",
    "ServerTime": 1564043157616,
    "Symbols": [{
    		"Symbol": "BTC/USDT",
    		"Status": 1,
    		"BaseAsset": "Tether",
    		"BaseAssetPrecision": 2,
    		"QuoteAsset": "Bitcoin",
    		"QuotePrecision": 6
    	}, {
    		"Symbol": "ETH-BTC",
    		"Status": 1,
    		"BaseAsset": "Bitcoin",
    		"BaseAssetPrecision": 6,
    		"QuoteAsset": "Ethereum",
    		"QuotePrecision": 6
    	}
      ...
    ],
    "IcebergAllowed": false
    }
    
### Get Market Ticker Price

     GET /market/ticker/price

**Parameters:**
  
|Name|Type|Mandatory|Description  
| ------------- | ------------- | ------------- |-------------|
| Symbol |STRING| NO | Like `BTC-USDT`


**Response:**        

    [
      {
        "Symbol": "BTC/USDT",
        "Price": 10067.00000000
      }, 
      {
        "Symbol": "ETH/BTC",
        "Price": 0.02200200
      }, 
      {
        "Symbol": "DTEP/BTC",
        "Price": 0.05000000
      }
      ...
    ]


## Authenticated EndPoints

### Create Order

     POST /order/create-order

**Parameters for Market Order:**

|Name|Type|Mandatory|Description|
| ------------- | ------------- | ------------- |-------------|
|PairName|STRING|YES|PairName is like `ETH-BTC`, `BTC-LTC`, `USDT-LTC` etc
|Quantity|DECIMAL|YES|Quantity of order to be created
|Rate|STRING|NO|Required only if `Type` is `LimitOrder`, `StopOrder`
|Type|STRING|YES|`MarketOrder`, `LimitOrder`, `StopOrder`
|OrderType|STRING|YES|OrderType is of type `Buy` or `Sell` 
|Stop|DECIMAL|NO| Required only if `Type` is `StopOrder`

**Response:**

    {
      "Status": true,
      "Message": "Order is successfully created",
      "Result": 
      {
        OrderId: 123456
      }
    }

 - **Status:** Status can be `True` or `False`.

 - **Message:** Message is about the response which is returned by the `API`.

 - **Result:** Result has the data which is returned by API.

### Cancel Order

     POST /order/cancel-order

**Parameters:**

| Name  | Type   | Mandatory | Description  
| ------------- | ------------- | ------------- |-------------|
| Id| STRING | YES | `Id` of the order which you want to cancel

**Response:**

    {
      "Status": true,
      "Message": "Order Successfully Cancelled",
      "Result": null
    }
**Status:** Status can be `True` or `False`.

**Message:** Message is about the response which is returned by the `API`.

**Result:** Result has the data which is returned by API.

### Get all Orders

     POST /order/getall
    
 **Parameters:**

| Name  | Type   | Mandatory | Description  
| ------------- | ------------- | ------------- |-------------|
| PairName| STRING | YES | PairName is like `ETH-BTC`, `BTC-LTC`, `USDT-LTC` etc
| Status| STRING | NO| Status like `Open`, `History`, `All`. Default `All`

**Response:**

    [
      {
        "DateAdded": "10/19/2018 12:35",
        "Rate": 6549.2,
        "Quantity": 0.001,
        "Id": 31,
        "QuantityRemaining": 0.001,
        "Status": 0,
        "OrderType": 0,
        "TotalFill": 0
      },
      {
        "DateAdded": "10/11/2018 0:31",
        "Rate": 6549,
        "Quantity": 0.001,
        "Id": 9,
        "QuantityRemaining": 0.001,
        "Status": 0,
        "OrderType": 0,
        "TotalFill": 0
       }
       ...
    ]

### Withdraw Funds

     POST /wallet/withdraw-funds

**Parameters:**

|Name|Type|Mandatory|Description|
| ------------- | ------------- | ------------- |-------------|
|Currency|STRING|YES|Currency like `Bitcoin`, `Litecoin`, etc
|Amount|STRING|YES|Amount is like `0.001`
|Address|STRING|YES|Address of the currency which you are going to withdraw like `1Hz96kJKF2HLPGY15JWLB5m9qGNxvt8tHJ`
|Label|STRING|YES|Label of address

**Response**

	 {
	   "Status": true,
	   "Message": "We have successfully received your withdraw request of 1BTC",
	   "Result": null
	 }
	 
 
### Get Wallets

     GET /wallet/get-wallets

**Parameters:**


| Name  | Type   | Mandatory | Description  
| ------------- | ------------- | ------------- |-------------|
| Currency| STRING | YES | Currency has two condition either it is `All` for getting all Wallets or specific currency Name like `Bitcoin`, `Litecoin` etc

**Response:**

    [
      {
        "Available": 1000.0047838,
        "Balance": 1000.0047838,
        "Name": "Bitcoin",
        "Address": "1Hz96kJKF2HLPGY15JWLB5m9qGNxvt8tHJ"
      },
      {
        "Available": 999.94,
        "Balance": 999.94,
        "Name": "Ethereum",
        "Address": "0x62B2Fd68800820a9fE3eCa3548e59721ce6E3022"
      }
      ...
    ]

### Start user data stream

     POST /api/v1/userdatastream
     
Start a new user data stream. The stream will close after 60 minutes unless a keepalive is sent.

**Response**

	 {
	   "ListenKey": "pqia91ma19a5s61cv6a81va65sdf19v8a65a1a5s61cv6a81va65sdf19v8a65a1"
	 }
	 
### Keepalive user data stream

     PUT  /api/v1/userdatastream
     
Keepalive a user data stream to prevent a time out. User data streams will close after 60 minutes.
It's recommended to send a ping about every 30 minutes.

**Parameters:**

|Name|Type|Mandatory|Description|
| ------------- | ------------- | ------------- |-------------|
|PrivateKey|STRING|YES|

**Response**

	 {
	   "Status": true
	 }

### Close user data stream

     DELETE  /api/v1/userdatastream
     
Close out a user data stream.

**Parameters:**

|Name|Type|Mandatory|Description|
| ------------- | ------------- | ------------- |-------------|
|ListenKey|STRING|YES|

**Response**

	 {
	   "Status": true
	 }

### Get Wallet History

     GET  /trade/get-wallet-history

**Response**
	
         [ 
          { 
            ToAddress: '1NwwgPz1F5n34noui9Pa85YbmfCpsfaxAC',
            Status: 0,
            Amount: 0.002,
            Date: '2019-07-29T08:17:18',
            Txid: 'N/A',
            Currency: 'Bitcoin' 
          },
          { 
            ToAddress: '1NwwgPz1F5n34noui9Pa85YbmfCpsfaxAC',
            Status: 0,
            Amount: 0.002,
            Date: '2019-07-29T08:15:26',
            Txid: 'N/A',
            Currency: 'Bitcoin' 
          }
         ]

### Get Deposit History

     GET  /trade/get-deposit-history

**Response**

	 { Status: true,
       Message: null,
       Result:
         [ 
          { 
            ToAddress: 'LPzKbmNhG9vD4U89PyAg6XkmLS2CNfVSju',
            Status: 'Confirmed',
            Amount: 0.01,
            Date: '2019-05-30T19:38:39',
            Txid:
            '439e9f1df47d7ff132441e919fe1054a7f8484221d43666de20d659a8f891197',
            Currency: 'Litecoin'
          }
         ]

### Get Order Fills Fee

     GET  /trade/get-order-fills-fees
     
 **PairName:** like BTC-USDT
     
**Parameters:**

|Name|Type|Mandatory|Description|
| ------------- | ------------- | ------------- |-------------|
|PairName |STRING|NO|    

**Response**

         [ 
           {
             Date: '2019-08-29T10:28:35',
            TradingPrice: 0.009487,
            Amount: 0.394526,
            Fee: '0.00003341 BTC'
          },
         {
           Date: '2019-08-29T10:28:35',
           TradingPrice: 0.008823,
           Amount: 0.081363,
           Fee: '0.00008411 BTC'
         }
       ]

### Actual Fee Rates

     GET  /trade/actual-fee-rates    

**Response**

         [ 
           { 
              Name: '1', Level: 1, MakerFee: '0.15%', TakerFee: '0.15%'
           },
           { 
             Name: '2', Level: 2, MakerFee: '0.1%', TakerFee: '0.11%' 
           },
           { 
             Name: '3', Level: 3, MakerFee: '0.09%', TakerFee: '0.1%' 
           },
           {
             Name: '4', Level: 4, MakerFee: '0.08%', TakerFee: '0.09%'
           },
           { 
             Name: '5', Level: 5, MakerFee: '0.07%', TakerFee: '0.08%' 
          }
       ]
     

