# CMC Standard Rest API Documentation
## General API related Information
 - The base endpoint is:  **[https://apiv1.decoin.io](https://apiv1.decoin.io/)**
 - All endpoints return either a JSON object or array.
 

## There Are Four Public EndPoints

 - EndPoints accessed through `GET` method.
 - For EndPoints, parameters must be sent as a `query string`.
 - Public EndPoints response in case of error will have the following structure.
 
**Example**
  
    {
      "Message": String,
      "Status": Boolean
    }

 - **Message:** Message is about the `API` reponse.
  
 - **Status:** It show status of the response either it is `True` or `False`. `True` shows the request is successfully processed and `False` shows request could not be processed by the server.
 
 

## EndPoints 

### Get Ticker

     GET /cmc/ticker

**Response:**

	{ 
        "BTC_USDT": {
            "last_price": "7136.0",
            "base_volume": "1154058.95060033",
            "quote_volume": "8235364671.483954880",
            "isFrozen": "1"
        },
        "ETH_BTC": {
            "last_price": "0.020003",
            "base_volume": "0.352754536147",
            "quote_volume": "0.007056148986548441",
            "isFrozen": "1"
        } ...
    }

### Get Summary

     GET /cmc/summary

  
  **Response:**
  
    { 
        "BTC_USDT": {
            "ask_price": "7507",
            "bid_price": "7504.99",
            "high_price": "7549.73",
            "low_price": "7445.61",
            "last_price": "7504.99",
            "base_volume": "398925.16918557",
            "quote_volume": "2993929405.4860109943"
        },
        "ETH_BTC": {
            "ask_price": "0.019964",
            "bid_price": "0.019960",
            "high_price": "0.020105",
            "low_price": "0.019735",
            "last_price": "0.019962",
            "base_volume": "27.562146380841",
            "quote_volume": "0.550195566054348042"
        },...
    }    

### Get OrderBook

     GET /cmc/orderbook

**market_pair:** like ETH_BTC

**Example:** https://apiv1.decoin.io/cmc/orderbook/?market_pair=XRP_USDT
      
**Parameters:**
  
|Name|Type|Mandatory|Description  
| ------------- | ------------- | ------------- |-------------|
| market_pair | STRING | YES | The order book endpoint is to provide a complete order book by (asks/bids) with full depth returned for a given market pair.


  **Response:**
  
    { 
        "timestamp":1575015267,
        "bids":[ 
                    [ 
                        "4712.40000000",
                        "0.22773000"
                    ],
                    [ 
                        "537.70000000",
                        "0.22768000"
                    ] ...
        ],
        "asks":[ 
                    [ 
                        "501.40000000",
                        "0.22783000"
                    ],
                    [ 
                        "460.80000000",
                        "0.22792000"
                    ] ...
                ]
    }

### Get Trades

     GET /cmc/trades

   **market_pair:** like XRP_USDT

   **type:**  like buy,sell

   **Example:** https://apiv1.decoin.io/cmc/trades/?market_pair=XRP_USDT&type=buy

   **Parameters:**
  
| Name  | Type   | Mandatory | Description  
| ------------- | ------------- | ------------- |-------------|
| market_pair | STRING | YES | Provide pair 
| type | STRING | NO | Specifiy to get specific trades
   
  **Response:**

    [
        {
            "price": "0.22907000",
            "trade_timestamp": "1575898378",
            "type": "buy",
            "base_volume": "32247.342033",
            "quote_volume": "7370.13002164215",
            "tradeID": 2783886
        },
        {
            "price": "0.22816000",
            "trade_timestamp": "1575896610",
            "type": "buy",
            "base_volume": "32247.342033",
            "quote_volume": "7370.13002164215",
            "tradeID": 2783576
        },...
    ]


