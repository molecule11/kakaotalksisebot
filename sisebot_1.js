
let Run_time = new Date(); // 맨위에 선언

let msg_arr = {};
msg_arr["zzz"] = "good night";
msg_arr["hello"] = "hello world";


/*   봇 컴파일   */
function recompile_bot_func(){
    let compile_result = Api.compile("sisebot");
    if(compile_result == true){
        return "Compile Complete";
    }
    else{
        return "Compile Failed";
    }
}

/*   명령어 저장   */
function dict_init(dict_nat, dict_cmd, dict_inc){       

    /*   단순명령어 저장부   */
    dict_cmd["/컴파일"] = dict_cmd["/compile"] = dict_cmd["/cc"] = "/compile";
    dict_cmd["/info"] = dict_cmd["/정보"] = dict_cmd["/상태"] = "/info";
    dict_cmd["/help"] = dict_cmd["/도움"] = dict_cmd["/명령어"] = "/help";
    dict_cmd["/time"] = dict_cmd["/시간"] = dict_cmd["/현재시간"] = dict_cmd["/현재시각"] = "/time";
    
    /*   혼합 명령어 저장부   */
    dict_cmd["/한영"] = "/한영 (번역할 문장)";
    dict_cmd["/영한"] = "/영한 (번역할 문장)";
    dict_cmd["/한일"] = "/한일 (번역할 문장)";
    dict_cmd["/일한"] = "/일한 (번역할 문장)";
    dict_cmd["/검색"] = dict_cmd["/search"] = dict_cmd["/네이버검색"] = dict_cmd["/naver"] = dict_cmd["/네이버"] = "/네이버 (검색할 문장)";
    dict_cmd["/구글검색"] = dict_cmd["/google"] = dict_cmd["/구글"] = "/구글 (검색할 문장)";
    dict_cmd["/랜덤"] = "/랜덤 (옵션1) (옵션2) (옵션3)...";
    dict_cmd["/날씨"] = dict_cmd["/미세먼지"] = "/날씨 (지역)";
    dict_cmd["/업비트"] = dict_cmd["/upbit"] = "/업비트 (코인심볼)";

    /*   자연어 저장부   */
    dict_nat["자러감"] = dict_nat["잘게"] = dict_nat["자야지"] = "잘자";
    dict_nat["퇴근"] = "ㅊㅊ~";

    if(dict_cmd[msg] == "/compile"){
        replier.reply(dict_init());
    }



    
}

/*   랜덤  
if(dict_cmd[str_split_Arr[0]] == "/랜덤"){
    if(str_split_Arr.length == 1){
        replier.reply("ERR");
    }

    else{
        str_split_Arr.shift();
        replier.reply(str_split_Arr[Math.floor(Math.random() * str_split_Arr.length)]);
    }
}
 */



// str_split_Arr = [];
// str_split_Arr = msg.split("  ");
// if(str_split_Arr[0] == "/날씨"){...}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    

    if(msg_arr[msg]){
        replier.reply(msg_arr[msg]);
    }

    if(msg == "/현재시간"){
        now = new Date();
        replier.reply("현재시간: " + now.toLocaleString() + " KST");
    }

     /* 봇 컴파일 */ 
     if(msg == "/컴파일") {
        replier.reply(recompile_bot_func());
    }


    /*  기기 정보  */
    if(msg == "/info"){               
        info_msg_sender = "";
        batt_health = "";
        batt_status = "";
        info_msg_sender += "sisebot " + " LIVE\n\n";
        info_msg_sender += "마지막 컴파일 : ";
        info_msg_sender += Run_time.toLocaleString() + "\n\n";
        info_msg_sender += Device.getBuild();
        info_msg_sender += "\nAndroid_Ver : " + Utils.getAndroidVersionCode() + ", " + Utils.getAndroidVersionName() + "OS : \n";
        info_msg_sender += (Utils.getPhoneBrand() + "  " + Utils.getPhoneModel() + "\n\n").toUpperCase();
    
        if(Device.isCharging()){
            info_msg_sender += "충전중  ";
        }
        else{
            info_msg_sender += "전원사용중  ";
        }
        info_msg_sender += Device.getBatteryLevel() + "%  " + Device.getBatteryVoltage() + "mV\n";
        info_msg_sender += "현재 온도 : " + Device.getBatteryTemperature()/10 + "\n";
    
        replier.reply(info_msg_sender);
    }
}