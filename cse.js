var api_url = "https://script.google.com/macros/s/AKfycbyhPCrhbvWIC7O_O1nOlw6R2v1Qp9XvWKQB2Sy_uazQ4zQ2C0jAaMepVAy8KOZ4CngFzQ/exec";

function OnButtonClick() {
    target = document.getElementById("output");
    target.innerHTML = '<div class="loader"></div>';
    fetch(api_url)
    .then(function (fetch_data) {
    return fetch_data.json();
    })
    .then(function (json) { 
        family_name_input = document.getElementById("family_name");
        given_name_input = document.getElementById("given_name");
        year_input = document.getElementById("year");
        competition_input = document.getElementById("competition");
        event_input = document.getElementById("event");
        distance_input = document.getElementById("distance");
        team_input = document.getElementById("team");

        //checkboxの値を取得
        array_check = [];
        check2 = document.display.check1
        for (let i = 0; i < check2.length; i++) {
            if (check2[i].checked) {
                array_check.push(true);
            }else{
                array_check.push(false);
            }
        }
        array_check2 = [];
        check4 = document.radio.check3
        for (let i = 0; i < check4.length; i++) {
            if (check4[i].checked) {
                array_check2.push(true);
            }else{
                array_check2.push(false);
            }
        }

        if(family_name_input.value == ""&&given_name_input.value == ""&&year_input.value == "notselected"&&competition_input.value == "notselected"&&event_input.value == "notselected"&&distance_input.value == "notselected"&&team_input.value == ""){
            alert("検索条件を入力してください")
        }else{
            content = "";
            //検索条件でフィルター
            array = filter_family_name(json);
            array = filter_given_name(array);
            array = filter_year(array);
            array = filter_competition(array);
            array = filter_event(array);
            array = filter_distance(array);
            array = filter_team(array);

            //年順にソート
            if(array_check2[0]==true){
                array.sort(function(a,b){
                    if(a.year > b.year){
                        return -1;
                    }else{
                        return 1;
                    }
                })
            //タイム順にソート
            }else{
                for (var i in array) {                         
                    if(array[i].centisec==""){
                        array[i].time = 10000
                    }else{
                        ;
                    }
                }
                array.sort(function(a,b){
                    if(a.time > b.time){
                        return 1;
                    }else{
                        return -1;
                    }
                })
            }
            console.log(array)

            output(array,array_check)
            if(content == ""){
                alert("一致するデータはありませんでした")
            }else{
                target.innerHTML = "<table>"+content+"</table>";
            }
            
        }
    })  
}
function filter_family_name(array){
    if(family_name_input.value == ""){
        return array
    }else{
        array = array.filter(function (value) {
            return value.family_name == family_name_input.value;
        })
        return array
    }
}
function filter_given_name(array){
    if(given_name_input.value == ""){
        return array
    }else{
        array = array.filter(function (value) {
            return value.given_name == given_name_input.value;
        })
        return array
    }
}
function filter_year(array){
    if (year_input.value == "notselected"){
        return array
    }else{
        array = array.filter(function(value) {
            return value.year == year_input.value;
        })
        return array
    }
}
function filter_competition(array){
    if (competition_input.value == "notselected"){
        return array
    }else{
        array = array.filter(function(value) {
            return value.competition == competition_input.value;
        })
        return array
    }
}
function filter_event(array){
    if (event_input.value == "notselected"){
        return array
    }else{
        array = array.filter(function(value) {
            return value.event == event_input.value;
        })
        return array
    }
}
function filter_distance(array){
    if (distance_input.value == "notselected"){
        return array
    }else{
        array = array.filter(function(value) {
            return value.distance == distance_input.value;
        })
        return array
    }
}
function filter_team(array){
    if(team_input.value == ""){
        return array
    }else{
        array = array.filter(function (value) {
            return value.team == team_input.value;
        })
        return array
    }
}
function output(array,array_check){
    content ="<tr><th>名字</th><th>名前</th>"
    if(array_check[0]==true){
        content += "<th>開催年</th>"
    }
    if(array_check[1]==true){
        content += "<th>大会</th>"
    }
    if(array_check[2]==true){
        content += "<th>種目</th>"
    }
    if(array_check[3]==true){
        content += "<th>距離</th>"
    }
    if(array_check[4]==true){
        content += "<th>レース</th>"
    }
    if(array_check[5]==true){
        content += "<th>順位</th>"
    }
    if(array_check[6]==true){
        content += "<th>所属</th>"
    }
    if(array_check[7]==true){
        content += "<th>タイム</th>"
    }
    content +="</tr>"

    for (var i in array) {
        content += "<td>"+array[i].family_name+"</td>"+"<td>"+array[i].given_name+"</td>"
        if(array_check[0]==true){
            content += "<td>"+array[i].year+"年</td>"
        }
        if(array_check[1]==true){
            content += "<td>"+array[i].competition+"</td>"
        }
        if(array_check[2]==true){
            content += "<td>"+array[i].event+"</td>"
        }
        if(array_check[3]==true){
            content += "<td>"+array[i].distance+" m</td>"
        }
        if(array_check[4]==true){
            content += "<td>"+array[i].race+"</td>"
        }
        if(array_check[5]==true){
            content += "<td>"+array[i].rank+"位"
            if(array[i].race=="F"||array[i].race=="AF"){
                if (array[i].rank == 1){
                    content = content +" &#129351;</td>" //金メダル
                }else if (array[i].rank == 2){
                    content = content + " &#129352;</td>" //銀メダル
                }else if (array[i].rank == 3){
                    content = content +" &#129353;</td>" //銅メダル
                }else{
                    content +="</td>"
                }
            }
        }   
        if(array_check[6]==true){
            content += "<td>"+array[i].team+"</td>"
        }
        if(array_check[7]==true){
            if(String(array[i].sec) != ""){
                content +=  "<td>"+array[i].min+"分"+array[i].sec+"秒"+array[i].centisec+"</td>"
            }
        }
        content += "</tr>"  
    }
    return content;
}
