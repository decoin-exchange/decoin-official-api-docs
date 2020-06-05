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

 - **Message:** Message is about the `API` response.
  
 - **Status:** It shows the status of the response either it is `True` or `False`. `True` shows the request is successfully processed and `False` shows request could not be processed by the server.
 
 

## EndPoints 

### Get Ticker

     GET /cmc/ticker

**Response:**

	{ 
        "BTC_USDT": {
            "quote_id": 825,
            "base_id": 1,
            "last_price": "9779.03",
            "quote_volume": "1873727.31",
            "base_volume": "191.607251",
            "open_interest": 97,
            "type": "spot",
            "isFrozen": "0"
        },
        "ETH_BTC": {
            "quote_id": 1
            "base_id": 1027,
            "last_price": "0.020003",
            "quote_volume": "34.538524",
            "base_volume": "1386.810839",
            "open_interest": 66,
            "type": "spot",
            "isFrozen": "1"
        } ...
    }

### Get Summary

     GET /cmc/summary

  
  **Response:**
  
    { 
        "BTC_USDT": {
            "ask_price": "7507.00",
            "bid_price": "7504.99",
            "high_price": "7549.73",
            "low_price": "7445.61",
            "last_price": "7504.99",
            "quote_volume": "1866520.31",
            "base_volume": "190.830650",
        },
        "ETH_BTC": {
            "ask_price": "0.019964",
            "bid_price": "0.019960",
            "high_price": "0.020105",
            "low_price": "0.019735",
            "last_price": "0.019962",
            "quote_volume": "34.483552",
            "base_volume": "1381.441855",
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
| depth | INT | NO | Orders depth quantity.
| level | INT | NO | Level 1 for only 1 best Bid and 1 best Ask. Level 2 for all aggregated Bids and Asks. Level 3 for all Bids and Asks.


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

   **type:**  like buy, sell

   **Example:** https://apiv1.decoin.io/cmc/trades/?market_pair=BTC_USDT&type=buy

   **Parameters:**
  
| Name  | Type   | Mandatory | Description  
| ------------- | ------------- | ------------- |-------------|
| market_pair | STRING | YES | Provide pair 
| type | STRING | NO | Specifiy to get specific trades
   
  **Response:**

    [
        {
            "price": "0.78",
            "timestamp": "1575898378",
            "type": "buy",
            "quote_volume": "32247.31",
            "base_volume": "7370.830650",
            "trade_id": 2783886
        },
        {
            "price": "0.78",
            "timestamp": "1575896610",
            "type": "buy",
            "quote_volume": "1866520.31",
            "base_volume": "190.830650",
            "trade_id": 2783576
        },...
    ]
### Get Assets

     GET /cmc/assets

**Response:**

	{ 
        "BTC": {
            "name": "Bitcoin",
            "unified_cryptoasset_id": 1,
            "can_withdraw": true,
            "can_deposit": true,
            "min_withdraw": "0.00200000",
            "max_withdraw": "100",
            "maker_fee": "0.15000000",
            "taker_fee": "0.15000000"
        },
        "DTEP": {
            "name": "Decoin",
            "unified_cryptoasset_id": 4277,
            "can_withdraw": true,
            "can_deposit": true,
            "min_withdraw": "1.00000000",
            "max_withdraw": "2274795.27",
            "maker_fee": "0.15000000",
            "taker_fee": "0.15000000"
        } ...
    }


