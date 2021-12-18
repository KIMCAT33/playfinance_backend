const express = require("express");
const router = express.Router();
var axios = require("axios").default;



router.get("/:address", async (req,res)=>{


    let walletAddress = "0x68b1db4d5fcf86fbe70f3d103928b69727f38e1e"
    //let walletAddress =  req.params.address; // Ethereum 지갑 주소

    

    const url = 'https://api.etherscan.io/api?module=account&action=tokennfttx&address=' + walletAddress +  '&startblock=0&endblock=999999999&sort=asc&apikey=AP3TBHGQTH3R12VGWY343ITJI326CDKJYT';
    const response = await axios.get(url);
    let result = JSON.parse(JSON.stringify(response.data.result),null,2);

    let kingdomAsset = [];
    for(var i=0; i<result.length; i++){
        if(result[i].tokenName == "League of Kingdoms LAND"){
            kingdomAsset.push(result[i]);
        }
    }

  
            
 
    let totalvalue = 0;
    
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
    console.log(totalvalue);
   
   
    

});

module.exports = router;
