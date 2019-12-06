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
        "BTC_USDT":{ 
            "last_price":"7093.21000000",
            "base_volume":"600.56790428",
            "quote_volume":"4259954.2643179388000000",
            "isFrozen":"1"
        },
        "ETH_BTC":{ 
            "last_price":"0.02039900",
            "base_volume":"1.00000000",
            "quote_volume":"0.0203990000000000",
            "isFrozen":"1"
        } ...
    }

### Get Summary

     GET /cmc/summary

  
  **Response:**
  
    { 
        "BTC-USDT":{ 
            "ask_price":"7093.21000000",
            "bid_price":"0.00000000",
            "high_price":"7093.21000000",
            "low_price":"7093.21000000",
            "last_price":"7093.21000000",
            "base_volume":"600.56790428",
            "quot_volume":"4259954.2643179388000000"
        },
        "ETH-BTC":{ 
            "ask_price":"0.00000000",
            "bid_price":"0.00000000",
            "high_price":"0.02039900",
            "low_price":"0.02039900",
            "last_price":"0.02039900",
            "base_volume":"1.00000000",
            "quot_volume":"0.0203990000000000"
        }
    }    

### Get OrderBook

     GET /cmc/orderbook

**market_pair:** like ETH-BTC

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
            "price":"0.22924000",
            "trade_timestamp":"1575016943",
            "type":"sell",
            "base_volume":"879886.107767",
            "quote_volume":"201705.09134450708",
            "tradeID":"3345483"
        },
        {
            "price":"0.22998000",
            "trade_timestamp":"1575016642",
            "type":"buy",
            "base_volume":"879886.107767",
            "quote_volume":"201705.09134450708",
            "tradeID":"3345481"
        } ...
    ]


