
/*---- 自販機データ ----*/
var data =
[
  {
    "pos":[139.715370, 35.563758],
    "passengers":[
                       {"number":20, "datetime":"20161020160000"},
                       {"number":50, "datetime":"20161020160001"},
                       {"number":30, "datetime":"20161020160002"},
                       {"number":10, "datetime":"20161020160003"},
                       {"number":5, "datetime":"20161020160004"},
                       {"number":80, "datetime":"20161020160005"},
                       {"number":60, "datetime":"20161020160006"},
                       {"number":40, "datetime":"20161020160007"},
                       {"number":10, "datetime":"20161020160008"},
                       {"number":10, "datetime":"20161020160009"}
                       ]
   },
   {
    "pos":[139.714469, 35.563217],
    "passengers":[
                       {"number":10, "datetime":"20161020160000"},
                       {"number":5, "datetime":"20161020160001"},
                       {"number":60, "datetime":"20161020160002"},
                       {"number":80, "datetime":"20161020160003"},
                       {"number":30, "datetime":"20161020160004"},
                       {"number":5, "datetime":"20161020160005"},
                       {"number":5, "datetime":"20161020160006"},
                       {"number":10, "datetime":"20161020160007"},
                       {"number":30, "datetime":"20161020160008"},
                       {"number":50, "datetime":"20161020160009"}
                       ]
   },
   {
    "pos":[139.715197, 35.561949],
    "passengers":[
                       {"number":20, "datetime":"20161020160000"},
                       {"number":10, "datetime":"20161020160001"},
                       {"number":80, "datetime":"20161020160002"},
                       {"number":90, "datetime":"20161020160003"},
                       {"number":5, "datetime":"20161020160004"},
                       {"number":10, "datetime":"20161020160005"},
                       {"number":20, "datetime":"20161020160006"},
                       {"number":10, "datetime":"20161020160007"},
                       {"number":50, "datetime":"20161020160008"},
                       {"number":10, "datetime":"20161020160009"}
                       ]
   },
   {
    "pos":[139.716934, 35.563361],
    "passengers":[
                       {"number":20, "datetime":"20161020160000"},
                       {"number":90, "datetime":"20161020160001"},
                       {"number":60, "datetime":"20161020160002"},
                       {"number":10, "datetime":"20161020160003"},
                       {"number":40, "datetime":"20161020160004"},
                       {"number":0, "datetime":"20161020160005"},
                       {"number":30, "datetime":"20161020160006"},
                       {"number":0, "datetime":"20161020160007"},
                       {"number":70, "datetime":"20161020160008"},
                       {"number":5, "datetime":"20161020160009"}
                       ]
   },   
   {
    "pos":[139.713209, 35.562354],
    "passengers":[
                       {"number":20, "datetime":"20161020160000"},
                       {"number":40, "datetime":"20161020160001"},
                       {"number":0, "datetime":"20161020160002"},
                       {"number":5, "datetime":"20161020160003"},
                       {"number":70, "datetime":"20161020160004"},
                       {"number":10, "datetime":"20161020160005"},
                       {"number":90, "datetime":"20161020160006"},
                       {"number":50, "datetime":"20161020160007"},
                       {"number":30, "datetime":"20161020160008"},
                       {"number":5, "datetime":"20161020160009"}
                       ]
   },
   {
    "pos":[139.713418, 35.564226],
    "passengers":[
                       {"number":0, "datetime":"20161020160000"},
                       {"number":10, "datetime":"20161020160001"},
                       {"number":40, "datetime":"20161020160002"},
                       {"number":5, "datetime":"20161020160003"},
                       {"number":90, "datetime":"20161020160004"},
                       {"number":30, "datetime":"20161020160005"},
                       {"number":50, "datetime":"20161020160006"},
                       {"number":0, "datetime":"20161020160007"},
                       {"number":80, "datetime":"20161020160008"},
                       {"number":20, "datetime":"20161020160009"}
                       ]
   }
];

var map_canvas;
var heatmap;
var marker_list = [];
var circle_list = [];

/*---- 画面初期化処理 ----*/
function initialize() {
  var initPos = new google.maps.LatLng(35.562798, 139.715724);
  var myOptions = {
      noClear : true,
      center : initPos,
      zoom : 17,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    };
  map_canvas = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    }

/*---- 人数表示処理 ----*/
function display() {

/*---- ヒートマップ、人数マーカークリア処理 ----*/
if(heatmap != null){
heatmap.setMap(null);
}
if(marker_list != null){
  marker_list.forEach(function(marker, idx) {
        marker.setMap(null);
      });
}
if(circle_list != null){
  circle_list.forEach(function(circle, idx) {
        circle.setMap(null);
      });
}

/*---- 日付取得 ----*/
// 開始日
var start_year = document.form1.start_year.value;
var start_month = document.form1.start_month.value;
var start_day = document.form1.start_day.value;
var start_hour = document.form1.start_hour.value;
var start_minute = document.form1.start_minute.value;
var start_second = document.form1.start_second.value;

// 終了日
var end_year = document.form1.end_year.value;
var end_month = document.form1.end_month.value;
var end_day = document.form1.end_day.value;
var end_hour = document.form1.end_hour.value;
var end_minute = document.form1.end_minute.value;
var end_second = document.form1.end_second.value;

var start_date =  String(start_year)+String(start_month)+String(start_day)+String(start_hour)+String(start_minute)+String(start_second);
var end_date = String(end_year)+String(end_month)+String(end_day)+String(end_hour)+String(end_minute)+String(end_second);

/*---- 通過人数データを取得 ----*/
var pass_list = [];
pass_list = calc(start_date, end_date);

/*---- ヒートマップを描画 ----*/
heatmap = new google.maps.visualization.HeatmapLayer({
        radius:25 //ヒートマップの各ポイントの大きさ
    });
heatmap.setData(pass_list);
heatmap.setMap(map_canvas);

/*---- 通過人数のマーカーを表示 ----*/
for(var i=0; i < pass_list.length; i++){
var marker = new google.maps.Marker({
              position : pass_list[i].location,
              clickable : false,
              icon : 'http://chart.apis.google.com/chart?chst=d_text_outline&chld=404040|14|h|ffffff||'+pass_list[i].weight.toString()
              });
marker.prototype = new google.maps.OverlayView();
marker.setMap(map_canvas);
marker_list.push(marker);
    }
}

/*---- 指定した期間の通過人数を取得する処理 ----*/   
function calc(start_date, end_date){
  var list = [];
  var start_address;
  var end_address;
  var i;
  var j;
  var bounds = new google.maps.LatLngBounds();

  var number;
  var check = false;
  var pos;

  for (i=0; i < data.length; i++) {
     number = 0;
     pos = new google.maps.LatLng(data[i].pos[1], data[i].pos[0]);

    for(j = 0; j < data[i].passengers.length; j++){
        if(data[i].passengers[j].datetime == start_date){
              start_address = j;
        }if(data[i].passengers[j].datetime == end_date){
              end_address = j;
              check = true;
        }        
     }
    if(check == false){
          end_address = data[i].passengers.length - 1;
    }
  
    for (j=start_address; j < end_address + 1; j++) {
          number = number + data[i].passengers[j].number;
    }

    list.push({
          location : pos,
          weight : number
    });

    bounds.extend(pos);
  }

  return list;
}
