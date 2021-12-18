const express = require("express");
const router = express.Router();



router.post("/", async (req,res)=>{

    const address2 = req.body.address2;

//let AxiewalletAddress = "0x6e69ca5509d2b350fea503fc087f192a14cd7d80"
    let AxiewalletAddress = "0x" + req.body.address1; // Ronin 지갑 주소


    var axios = require("axios").default;

    var options = {
    method: 'GET',
    url: 'https://axie-infinity.p.rapidapi.com/get-axies/' + AxiewalletAddress,
    headers: {
        'x-rapidapi-host': 'axie-infinity.p.rapidapi.com',
        'x-rapidapi-key': '353a4fbb77mshca566482b9e5a17p1d80c3jsneeecca09c9b4'
    }
    };

    const Axieresponse = await axios.request(options);
    const AxieData = Axieresponse["data"]["data"]["axies"]["results"];




    //let KingwalletAddress = "0x68b1db4d5fcf86fbe70f3d103928b69727f38e1e"
    //let walletAddress =  req.params.address; // Ethereum 지갑 주소

    

    const url = 'https://api.etherscan.io/api?module=account&action=tokennfttx&address=' + req.body.address2 +  '&startblock=0&endblock=999999999&sort=asc&apikey=AP3TBHGQTH3R12VGWY343ITJI326CDKJYT';
    const Kingresponse = await axios.get(url);
    let result = JSON.parse(JSON.stringify(Kingresponse.data.result),null,2);

    let kingdomAsset = [];
    for(var i=0; i<result.length; i++){
        if(result[i].tokenName == "League of Kingdoms LAND"){
            kingdomAsset.push(result[i]);
        }
    }

  
            
 
    let totalvalue = 0;
    let kingitems = [];
    for(var i=0; i<kingdomAsset.length; i++){
        const asset_contract = kingdomAsset[i].contractAddress;
        const token_id = kingdomAsset[i].tokenID;
        
        if(i%3 == 0) {
            landimage = "d3q0siyoqyfxp4.cloudfront.net/kingdom/land1.png"
        }else if (i%3 ==1){
            landimage = "d3q0siyoqyfxp4.cloudfront.net/kingdom/land2.png"
        }else {
            landimage = "d3q0siyoqyfxp4.cloudfront.net/kingdom/land3.png"
        }
        
        const dummy = {
            id: token_id,
            image: landimage,
        }
        kingitems.push(dummy);
    }
  
    
    for(var i=0; i<kingdomAsset.length; i++){
        const asset_contract = kingdomAsset[i].contractAddress;
        const token_id = kingdomAsset[i].tokenID;

        const priceurl = 'https://api.nftbank.ai/estimates-v2/estimates/' + asset_contract + "/" + token_id + '?chain_id=ETHEREUM';

   
        
        var options = {
            method: 'GET',
            url: priceurl,
            headers: {
                "x-api-key": "9e0a389984cc8dabdd5abfd504fc1a4d" ,
            }
        };
        
        let result = await axios.request(options);
           // const json = JSON.stringify(res, null, 2);
            // console.log(JSON.parse(JSON.stringify(res.data.data, null, 2)));
        totalvalue += parseFloat(JSON.stringify(result.data["data"][0]['estimate'][1]["estimate_price"]));
                   
       


        
    }
   

    const net_worth = totalvalue + 481;
    
    
    let data = {
        "net_worth": "$"+net_worth,
        "game1": {
            "game": "AXIE",
            "data": {
                "coin": ["ETH", "RONIN"],
                "TotalValue":"$481",
                "item": [
                    {
                        id: "9420822",
                        image: "https://storage.googleapis.com/assets.axieinfinity.com/axies/9420822/axie/axie-full-transparent.png"
                    },
                    {
                        id: "7239432",
                        image: "https://storage.googleapis.com/assets.axieinfinity.com/axies/7239432/axie/axie-full-transparent.png"
                    },
                    {
                        id: "4226194",
                        image: "https://storage.googleapis.com/assets.axieinfinity.com/axies/4226194/axie/axie-full-transparent.png"
                    },
                    {
                        id: "908156",
                        image: "https://storage.googleapis.com/assets.axieinfinity.com/axies/908156/axie/axie-full-transparent.png"
                    }
                ],

            }
        },
        "game2": {
            "game": "KING",
            "data": {
                "coin": ["ETH"],
                "TotalValue":"$"+totalvalue,
                "item": kingitems,

            }
        }
    };
    
    res.send(data);
    








});

module.exports = router;


/*

{
	net_worth :”450,000”,
	game1 : {
		game: “AXIE”,
		data {
			coin: [“ETH”,”RONIN”] ,
			TotalValue : “$12,000”
			item [
				{
				id :”#13!23e”
				url :”http:dwedwedd.d2wd.d.d3e”
				}, 	
				{
				id :”#13!23e”
				url :”http:dwedwedd.d2wd.d.d3e”
				}, …
			]
		}		
	}

	game2 : {
		game: “KING”,
		data :null		
	}

}



*/





/*
 // 엑시 리스트 더미 데이터 
    let axielists = [
        {
            "id": "5638493",
            "gameCategory": "axie",
            "image": "https://storage.googleapis.com/assets.axieinfinity.com/axies/5638493/axie/axie-full-transparent.png",
        },
        {
            "id":"3645247",
            "gameCategory": "axie",
            "image":"https://storage.googleapis.com/assets.axieinfinity.com/axies/3645247/axie/axie-full-transparent.png",

        },
        {
            "id":"5561201",
            "gameCategory": "axie",
            "image":"https://storage.googleapis.com/assets.axieinfinity.com/axies/5561201/axie/axie-full-transparent.png",
        }
    ];
    */