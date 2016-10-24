
/*---- 自販機データ ----*/
var data1 = [];
data1 =  [
    {number:20, pos:[139.715370, 35.563758], datetime:"20161020160000"},
    {number:50, pos:[139.715370, 35.563758], datetime:"20161020160001"},
    {number:30, pos:[139.715370, 35.563758], datetime:"20161020160002"},
    {number:10, pos:[139.715370, 35.563758], datetime:"20161020160003"},
    {number:5, pos:[139.715370, 35.563758], datetime:"20161020160004"},
    {number:80, pos:[139.715370, 35.563758], datetime:"20161020160005"},
    {number:60, pos:[139.715370, 35.563758], datetime:"20161020160006"},
    {number:40, pos:[139.715370, 35.563758], datetime:"20161020160007"},
    {number:10, pos:[139.715370, 35.563758], datetime:"20161020160008"},
    {number:10, pos:[139.715370, 35.563758], datetime:"20161020160009"},
    {number:5, pos:[139.715370, 35.563758], datetime:"20161020160010"}
];

var data2 = [];
data2 =  [
    {number:10, pos:[139.714469, 35.563217], datetime:"20161020160000"},
    {number:5, pos:[139.714469, 35.563217], datetime:"20161020160001"},
    {number:60, pos:[139.714469, 35.563217], datetime:"20161020160002"},
    {number:80, pos:[139.714469, 35.563217], datetime:"20161020160003"},
    {number:30, pos:[139.714469, 35.563217], datetime:"20161020160004"},
    {number:5, pos:[139.714469, 35.563217], datetime:"20161020160005"},   
    {number:5, pos:[139.714469, 35.563217], datetime:"20161020160006"},
    {number:10, pos:[139.714469, 35.563217], datetime:"20161020160007"},
    {number:30, pos:[139.714469, 35.563217], datetime:"20161020160008"},
    {number:50, pos:[139.714469, 35.563217], datetime:"20161020160009"},
    {number:5, pos:[139.714469, 35.563217], datetime:"20161020160010"}
];

var data3 = [];
data3 =  [
    {number:20, pos:[139.715197, 35.561949], datetime:"20161020160000"},
    {number:10, pos:[139.715197, 35.561949], datetime:"20161020160001"},
    {number:80, pos:[139.715197, 35.561949], datetime:"20161020160002"},
    {number:90, pos:[139.715197, 35.561949], datetime:"20161020160003"},
    {number:5, pos:[139.715197, 35.561949], datetime:"20161020160004"},
    {number:10, pos:[139.715197, 35.561949], datetime:"20161020160005"},
    {number:20, pos:[139.715197, 35.561949], datetime:"20161020160006"},
    {number:10, pos:[139.715197, 35.561949], datetime:"20161020160007"},
    {number:50, pos:[139.715197, 35.561949], datetime:"20161020160008"},
    {number:10, pos:[139.715197, 35.561949], datetime:"20161020160009"},
    {number:5, pos:[139.715197, 35.561949], datetime:"20161020160010"}
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

/*---- ヒートマップ表示処理 ----*/
function display() {

/*---- ヒートマップ、マーカー、サークルクリア処理 ----*/
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

/*---- サークルを描画 ----*/
for(var i=0; i < pass_list.length; i++){
// 通過人数が100人未満の場合
/*  
if(pass_list[i].weight > 0 && pass_list[i].weight < 100){
     var circle = new google.maps.Circle({
         strokeColor: '#0066FF',
         strokeOpacity: 0.35,
         strokeWeight: 1,
         fillColor: '#0066FF',
         fillOpacity: 0.35,
         map: map_canvas,
         center: pass_list[i].location,
         radius: Math.sqrt(pass_list[i].weight) * 2
     });
     circle_list.push(circle);
// 通過人数が100人以上200人未満の場合
/*
}else if(pass_list[i].weight >= 100 && pass_list[i].weight < 200 ){
     var circle = new google.maps.Circle({
        strokeColor: '#FFCC00',
        strokeOpacity: 0.35,
        strokeWeight: 1,
        fillColor: '#FFCC00',
        fillOpacity: 0.35,
        map: map_canvas,
        center: pass_list[i].location,
        radius: Math.sqrt(pass_list[i].weight) * 2
     });
     circle_list.push(circle);
// 通過人数が200人以上の場合
/*
}else{
      var circle = new google.maps.Circle({
        strokeColor: '#FF3200',
        strokeOpacity: 0.35,
        strokeWeight: 1,
        fillColor: '#FF3200',
        fillOpacity: 0.35,
        map: map_canvas,
        center: pass_list[i].location,
        radius: Math.sqrt(pass_list[i].weight) * 2
      });
      circle_list.push(circle);
}
*/
/*---- 通過人数のマーカーを表示 ----*/
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
  var bounds = new google.maps.LatLngBounds();

//data1
  var number1 = 0;
  var pos1 = new google.maps.LatLng(data1[0].pos[1], data1[0].pos[0]);

  for (i=0; i < data1.length; i++) {
      if(data1[i].datetime === start_date){
            start_address = i;
      }else if(data1[i].datetime === end_date){
            end_address = i;
      }
   }

  for (i=start_address; i < end_address + 1; i++) {
        number1 = number1 + data1[i].number;
   }

  list.push({
        location : pos1,
        weight : number1
    });

  bounds.extend(pos1);
 
//data2
  var number2 = 0;
  var pos2 = new google.maps.LatLng(data2[0].pos[1], data2[0].pos[0]);

  for (i=0; i < data2.length; i++) {
      if(data2[i].datetime === start_date){
            start_address = i;
      }else if(data2[i].datetime === end_date){
            end_address = i;
      }
   }

  for (i=start_address; i < end_address + 1; i++) {
          number2 = number2 + data2[i].number;
     }

  list.push({
          location : pos2,
          weight : number2
      });

  bounds.extend(pos2);

//data3
  var number3 = 0;
  var pos3 = new google.maps.LatLng(data3[0].pos[1], data3[0].pos[0]);

  for (i=0; i < data3.length; i++) {
      if(data3[i].datetime === start_date){
            start_address = i;
      }else if(data3[i].datetime === end_date){
            end_address = i;
      }
   }

  for (i=start_address; i < end_address + 1; i++) {
          number3 = number3 + data3[i].number;
     }

  list.push({
          location : pos3,
          weight : number3
      });

  bounds.extend(pos3);

  return list;
}
