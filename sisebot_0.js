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


/*   업비트 코인가격   */
        if(str_split_Arr[0] == "/업비트"){
            try{
                let upbit_coin_symbol = "BTC";
                if(str_split_Arr.length != 1){
                    upbit_coin_symbol = splited_data;

                    let coin_symbol_krw = JSON.parse(org.jsoup.Jsoup.connect("https://api.upbit.com/v1/market/all").ignoreContentType(true).get().text());
                    for (let i in coin_symbol_krw) {
                        let keywordData = coin_symbol_krw[i];
                        let keywordData_replaced = keywordData["korean_name"].replace(/(<([^>]+)>)/ig, " ");
        
                        if (keywordData_replaced == splited_data) {
                            upbit_coin_symbol = keywordData["market"].replace(/(<([^>]+)>)/ig, " ").split("-")[1];
                        }
                    }
                }

                upbit_coin_symbol = upbit_coin_symbol.toUpperCase();
                let upbit_json = upbit_func(upbit_coin_symbol);

                output_text += "[UPBIT API]\n";
                output_text += "<" + upbit_coin_symbol + "/KRW>\n";
                output_text += numberWithCommas(upbit_json[0].trade_price) + " (" + ((upbit_json[0].signed_change_rate)*100).toFixed(2) + "%)\n\n";
                output_text += "24H 고가 : " + numberWithCommas(upbit_json[0].high_price) + " KRW\n";
                output_text += "24H 저가 : " + numberWithCommas(upbit_json[0].low_price) + " KRW\n";
                output_text += "24H 종가 : " + numberWithCommas(upbit_json[0].prev_closing_price) + " KRW";
                replier.reply(output_text);

            }

            catch(error){
                replier.reply("해당 코인이 존재하지 않습니다\n" + error);
            }

        }
        
        
        
        /*   업비트 JSON 함수   */
        function upbit_func(coin_symbol){
            let upbit_url = "https://api.upbit.com/v1/ticker?markets=KRW-";
            upbit_url += coin_symbol;
            return JSON.parse(org.jsoup.Jsoup.connect(upbit_url).ignoreContentType(true).get().text());
        }



        /*   화폐단위 컴마출력   */
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }