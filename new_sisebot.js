
// 업비트 KRW 암호화폐(한글명) 시세봇 

function getCoinMark(name) {
    var data = Utils.parse("https://api.upbit.com/v1/market/all").text();
    data = JSON.parse(data);
    for (var n = 0; n < data.length; n++) {
        if (data[n].market.startsWith("KRW-") && data[n].korean_name == name) 
        return data[n].market;
    }
    return null;
};

function response(room, msg, sender, isGroupChat, replier){
    var cmd = msg.split(" ");
    if(cmd[0] == "/코인") {
        var mark = getCoinMark(cmd[1]);
        if (mark == null) {
            replier.reply(cmd[1] + "해당 암호화폐를 찾을 수 없습니다.");
        }
        else {
            var data = Utils.parse("https://api.upbit.com/v1/ticker?markets="+ mark).text();
            data = JSON.parse(data);
            replier.reply( cmd[1] + "시세: " + data[0].trade_price + "원.");
        }
            
        }
    }




