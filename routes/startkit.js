const express = require("express");
const router = express.Router();
var axios = require("axios").default;

var ethPrice = 0;

// A SET라면 각 엑시 애셋에 대한 SET를 만들기 
function Set(type, id1, id2, id3, price, ethereumPrice, IC, TEP, DP, AMDP, bep, CR1M, CR2M,CR4M,CR6M,CR1Y){
    const url_prefix = 'https://storage.googleapis.com/assets.axieinfinity.com/axies/';
    const url_endfix = '/axie/axie-full-transparent.png';
    const url1 = url_prefix+id1+url_endfix;
    const url2 = url_prefix+id2+url_endfix;
    const url3 = url_prefix+id3+url_endfix;
    const settype = ("set" + type); // type : A, B, C
    
    const SET = {}    
    SET[settype] = [
               {
                "item":[
                    {
                    "url": url1,
                    "id": id1,
                    },
                    {
                    "url": url2,
                    "id": id2,
                    },
                    {
                    "url": url3,
                    "id": id3,
                    }
                ],
                "price": price,
                "ethereumPrice": ethereumPrice,
                "initalCost": IC,
                "totalExpectedProfit": TEP,
                "dailyProfit": DP,
                "afterMonthDailyProfit": AMDP,
                "bep": bep,
                "cumulativRevenue1Month": CR1M,
			    "cumulativRevenue2Month": CR2M,
			    "cumulativRevenue4Month": CR4M,
			    "cumulativRevenue6Month": CR6M,
			    "cumulativRevenue1Year": CR1Y,
        }
    ];
    return SET;
}

// A, B, C 세트를 합쳐서 SET 만들기 
function SETS(SetA, SetB, SetC){
    const SETS = [
        SetA,
        SetB,
        SetC,
    ];
    return JSON.stringify(SETS,null,2);
}

router.get("/",(req, res)=> {
    res.send("api is healthy.");
})

router.post("/", async (req,res)=>{
    /*
    req
    Game : String  (Axie 하나만)
    CoinType : String  (Ethereum, BSC)
    price_range: 1 (~1000), 2(1000~2000), 3(2000~3000), 4(3000~4000), 5(4000~)
    */
    const Game = req.body.Games;
    const CoinType = req.body.CoinType;
    const price_range = req.body.price_range;


    
    // 바이낸스 기준 실시간 이더리움 가격
    const response = await axios.get('https://api.coinstats.app/public/v1/markets?coinId=ethereum');
    ethPrice = response.data[2].pairPrice;

    
    
    if(Game == "Axie"){
        switch(price_range){
            case 1: // (~1000)
                 //type, id1, id2, id3, price, ethereumPrice, IC, TEP, DP, AMDP, bep, CR1M, CR2M,CR4M,CR6M,CR1Y
                Aset = Set("A", "1386014","8185369","9974679","737",ethPrice, "737","11.55","0.385","0.455","1594","11.55","25.2","52.5","79.8","161.7");
                Bset = Set("B", "1307363","4119127","9545267","806",ethPrice, "806","11.55","0.385","0.455","1746","11.55","25.2","52.5","79.8","161.7");
                Cset = Set("C", "9257002","842593","9877382","930",ethPrice, "930","11.55","0.385","0.455","2018","11.55","25.2","52.5","79.8","161.7");
                res.send(JSON.parse(SETS(Aset, Bset, Cset)));
                break;
            case 2: // (1000~2000)
                Aset = Set("A", "8662321","6790040","10131634","1200",ethPrice, "1200","66.15","2.205","2.31","490.8","66.15","135.4","274.0","412.6","828.4");
                Bset = Set("B", "10012274","7937729","3089420","1400",ethPrice, "1400","66.15","2.205","2.31","577.4","66.15","135.4","274.0","412.6","828.4");
                Cset = Set("C", "10108469","4896240","7111102","1800",ethPrice, "1800","66.15","2.205","2.31","750.5","66.15","135.4","274.0","412.6","828.4");
                res.send(JSON.parse(SETS(Aset, Bset, Cset)));
                break;
            case 3: // (2000~3000)
                Aset = Set("A", "9117853","9241378","8220077","2200",ethPrice, "2200","163.8","5.46","5.565","365.8","163.8","330.7","664.6","998.5","2000");
                Bset = Set("B", "1869646","6876198","1684120","2600",ethPrice, "2600","163.8","5.46","5.565","437.7","163.8","330.7","664.6","998.5","2000");
                Cset = Set("C", "2748292","10250845","10236183","2800",ethPrice, "2800","163.8","5.46","5.565","473.7","163.8","330.7","664.6","998.5","2000");
                res.send(JSON.parse(SETS(Aset, Bset, Cset)));
                break;
            case 4: // (3000~4000)
                Aset = Set("A", "1489887","2195259","8376482","3100",ethPrice, "3100","303.4","10.11","10.22","273.6","303.4","610.0","1223","1836","3676");
                Bset = Set("B", "6045416","3378386","1486159","3500",ethPrice, "3500","303.4","10.11","10.22","312.7","303.4","610.0","1223","1836","3676");
                Cset = Set("C", "4700200","3089588","2442318","3800",ethPrice, "3800","303.4","10.11","10.22","342.1","303.4","610.0","1223","1836","3676");
                res.send(JSON.parse(SETS(Aset, Bset, Cset)));
                break;
            case 5: //(4000~5000)
                Aset = Set("A", "1627420","7942229","3278154","4600",ethPrice, "4600","485.1","16.17","16.27","252.8","485.1","973.3","1949","2926","5855");
                Bset = Set("B", "2395201","2493640","6204199","4900",ethPrice, "4900","485.1","16.17","16.27","271.2","485.1","973.3","1949","2926","5855");
                Cset = Set("C", "9968645","9998970","4281354","5500",ethPrice, "5500","485.1","16.17","16.27","308.1","485.1","973.3","1949","2926","5855");
                res.send(JSON.parse(SETS(Aset, Bset, Cset)));
                break;
        }
    }
    

});

module.exports = router;