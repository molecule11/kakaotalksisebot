function response(room, msg, sender, isGroupChat, replier){
    var cmd = msg.split(" ");
    if(cmd[0] == "/코인"){
        var data = Utils.parse("https://api.upbit.com/v1/ticker?markets="+ cmd[1]).text();
        data = JSON.parse(data);
        replier.reply(data[0].trade_price);        
    }
    
}