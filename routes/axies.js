const express = require("express");
const router = express.Router();



router.get("/:address", (req,res)=>{
    let walletAddress = "0x7bad5c65f2e2c53e65a5c32d330c070c337ce066"
    //let walletAddress = "0x" + req.params.address; // Ronin 지갑 주소


    var axios = require("axios").default;

    var options = {
    method: 'GET',
    url: 'https://axie-infinity.p.rapidapi.com/get-axies/' + walletAddress,
    headers: {
        'x-rapidapi-host': 'axie-infinity.p.rapidapi.com',
        'x-rapidapi-key': '353a4fbb77mshca566482b9e5a17p1d80c3jsneeecca09c9b4'
    }
    };

    axios.request(options).then((res)=> {
        const json = JSON.stringify(res.data.data.axies, null, 2);
        const axiesData = JSON.parse(json);


        console.log(axiesData.results[0].id);
        
        

    }).catch(function (error) {
        console.error(error);
    });
   
    

});

module.exports = router;



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