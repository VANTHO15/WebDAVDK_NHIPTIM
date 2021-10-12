import React, {useEffect , useState} from 'react';
import { useHistory } from 'react-router';

import CanvasJSReact from '../asset/canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var mqtt = require('mqtt')
var options = {
  port: 3333,
  host: "wss://ngoinhaiot.com",
  username: "Vantho15",
  password: "3759DFCEFE834F17",
  useSSL: true,
  clientId: 'Tho2k'
}
const client = mqtt.connect("wss://ngoinhaiot.com", options);

// begin bieudo
var dps = [{x: 1, y: 10}, {x:2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, 
            {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}, {x: 11, y: 18}, {x: 12, y: 20},
             {x: 13, y: 17}, {x: 14, y: 18}, {x: 15, y: 20}, {x: 16, y: 17}, {x: 17, y: 18}, {x: 18, y: 20}, 
             {x: 19, y: 17}, {x: 20, y: 18}]; 
var xVal = dps.length + 1;
var dps1 = [{x: 1, y: 10}, {x:2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, 
            {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}, {x: 11, y: 18}, {x: 12, y: 20},
             {x: 13, y: 17}, {x: 14, y: 18}, {x: 15, y: 20}, {x: 16, y: 17}, {x: 17, y: 18}, {x: 18, y: 20}, 
             {x: 19, y: 17}, {x: 20, y: 18}]; 
var xVal1 = dps.length + 1;
var NhietDo = 0;
var LedDo = 0;
var HienThi100ms="100 ms";
var HienThiData ="Last 50 data"
var SOLUONGDATA = 50;
var THOIGIANUPDATE = 100;
var Gio=0, Phut=0, Giay =0;
var interval1,interval2,interval3,interval4,interval0,interval5;
// var dataPointNhipTim = [];
// var dataPointNhietDo = [];
// end bieu do  
function Main() {
// begin mqtt
    let history = useHistory();
    const [Data, setData] = useState({Change: "0",NhipTim: "0",LedDo:"0",NhietDo:"0",ThoiGian:"0",Spo2: "0"});
    function handleLogour()
    {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("Username");
      localStorage.removeItem("key");
      history.replace("/");
    }
     useEffect(()=>{
      client.once('connect', function () {
         console.log('Connected');
      });
      // subscribe to topic  "Vantho15/"+localStorage.getItem("key")   'Vantho15/5C:CF:7F:39:22:AF'
      client.subscribe("Vantho15/"+ localStorage.getItem("key") ,()=>{console.log("thành công")});
     },[]);

     useEffect(()=>{
      client.once('message', function (topic, message) {
        let data = JSON.parse(message.toString());
        setData(data);
        // console.log(Data);
        NhietDo = Number(Data.NhietDo);
        LedDo = Number(Data.LedDo);
        var Mang = Data.ThoiGian.split(":");
        Gio = Mang[0];
        Phut = Mang[1];
        Giay = Mang[2];
        // console.log(Gio," ", Phut," ",Giay);
        // client.end();
      },[Data]);
     });
//  end mqtt  
// begin bieu do  
  useEffect(()=>{    // Cứ updateInterval ms chạy 1 lần
      interval1 = setInterval(()=>{
      // console.log("Click 100ms");
      upDateChart();
      upDateChart1();
    },THOIGIANUPDATE);
  },[]);
  function upDateChart()
  {
    if(xVal>999999) 
    {
      xVal = 0;
      dps=[];
    }
    dps.push({x: xVal,y: NhietDo});
    xVal++;
    if (dps.length >  SOLUONGDATA ) {
			dps.shift();  // Loại bỏ phần tử đầu tiên của 1 mảng
		}
  }
  function upDateChart1()
  {
    if(xVal1>999999) 
    {
      xVal1 = 0;
      dps1=[];
    }
    dps1.push({x:xVal1, y: LedDo});
    xVal1++;
    // console.log(dataPointNhipTim);
    if (dps1.length >  SOLUONGDATA ) {
			dps1.shift();  // Loại bỏ phần tử đầu tiên của 1 mảng
		}
  }
  const optionsNhipTim = {
    theme: "dark1",
    animationEnabled: false,
    zoomEnabled: true,
    title:{
      text: " 💘 Pulses 🔔 "
    },
    axisX: {
      title:"💲 "+ HienThi100ms + "  &  " + HienThiData +" 🤪 ",
      // interval: 100,   
      // intervalType: "millisecond",
      // valueFormatString: "HH:mm:ss",
      markerSize: 0,
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY:{
      // title: "Temperature",
      // suffix: "°C",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    data: [{
      type: "spline",
      // xValueFormatString: "01:01:01",
      markerSize: 0,
      toolTipContent: "Pubses: {y}",
      dataPoints: dps1
    }]
  }
  const optionsNhietDo = {
    theme: "dark1",
    animationEnabled: false,
    zoomEnabled: true,
    title:{
      text: "🔆 Temperature (°C) 🥰 "
    },
    axisX: {
      title:"🕘 "+ HienThi100ms + "  &  " + HienThiData +" 😂 ",
      // valueFormatString: "01:01:01",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY:{
      // title: "Temperature",
      suffix: "°C",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    data: [{
      type: "scatter",   
      // xValueFormatString: "01:01:01",
      markerSize: 15,
      toolTipContent: "Temperature: {y}°C",
      dataPoints: dps
    }]
  }
  
  const optionsTronOxy = {
    theme: "dark1",
    animationEnabled: true,
    title: {
      text: "💣 Oxygen 🧨 "
    },
    subtitles: [{
      text: Data.Spo2,
      verticalAlign: "center",
      fontSize: 24,
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      radius:  "90%", 
      // indexLabelPlacement: "inside",  
      showInLegend: true,
      indexLabel: "{name}: {y}",
      // yValueFormatString: "#,###'%'",
      dataPoints: [
        { name: "Còn Lại", y: 50 },
        { name: "Lượng Oxy", y: Data.Spo2 },
        { name: "Ba Chấm", y: 50 },
        { name: "Bốn Chấm", y: 50 },
      ]
    }]
  }
  const optionsTronNhipTim = {
    theme: "dark1",
    animationEnabled: true,
    title: {
      text: "💓 Heart Rate 🩸 "
    },
    subtitles: [{
      text: Data.NhipTim + "  BPM",
      verticalAlign: "center",
      fontSize: 24,
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",   
      radius:  "90%", 
      // indexLabelPlacement: "inside",  
      showInLegend: true,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'%'",
      dataPoints: [
        { name: "Còn Lại", y: 50 },
        { name: "Nhịp Tim", y: Data.NhipTim },
        { name: "Ba Chấm", y: 50 },
      ]
    }]
  }
// end bieu do 
// hiển thị ms giây
    function handle10ms()
    {
      HienThi100ms="10 ms";
      THOIGIANUPDATE =10;
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
      interval0=setInterval(()=>{
        // console.log("Click 10ms");
        upDateChart();
        upDateChart1();
      },THOIGIANUPDATE);
    }
    function handle50ms()
    {
      HienThi100ms="50 ms";
      THOIGIANUPDATE =50;
      clearInterval(interval0);
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
      interval5=setInterval(()=>{
        // console.log("Click 10ms");
        upDateChart();
        upDateChart1();
      },THOIGIANUPDATE);
    }
    function handle100ms()
    {
       HienThi100ms="100 ms";
       THOIGIANUPDATE =100;
       clearInterval(interval5);
       clearInterval(interval0);
       clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
       interval1=setInterval(()=>{
        // console.log("Click 100ms");
        upDateChart();
        upDateChart1();
      },THOIGIANUPDATE);
    }
    function handle200ms()
    {
      HienThi100ms="200 ms";
      THOIGIANUPDATE =200;
      clearInterval(interval5);
      clearInterval(interval0);
      clearInterval(interval1);
      clearInterval(interval3);
      clearInterval(interval4);
      interval2=setInterval(()=>{
        // console.log("Click 200ms");
        upDateChart();
        upDateChart1();
      },THOIGIANUPDATE);
    }
    function handle500ms()
    {
      HienThi100ms="500 ms";
      THOIGIANUPDATE =500;
      clearInterval(interval5);
      clearInterval(interval0);
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval4);
       interval3= setInterval(()=>{
        // console.log("Click 500ms");
        upDateChart();
        upDateChart1();
      },THOIGIANUPDATE);
    }
    function handle1000ms()
    {
      HienThi100ms="1000 ms";
      THOIGIANUPDATE =1000;
      clearInterval(interval5);
      clearInterval(interval0);
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      interval4=setInterval(()=>{
        // console.log("Click 1000ms");
        upDateChart();
        upDateChart1();
      },THOIGIANUPDATE);
    }
    function handle10data()
    {
      HienThiData="Last 10 data";
      SOLUONGDATA=10;
      xVal = 0;
      dps=[];
      xVal1 = 0;
      dps1=[];
    }
    function handle25data()
    {
      HienThiData="Last 25 data";
      SOLUONGDATA=25;
      xVal = 0;
      dps=[];
      xVal1 = 0;
      dps1=[];
    }
    function handle50data()
    {
      HienThiData="Last 50 data";
      SOLUONGDATA=50;
      xVal = 0;
      dps=[];
      xVal1 = 0;
      dps1=[];
    }
    function handle75data()
    {
      HienThiData="Last 75 data";
      SOLUONGDATA=75;
      xVal = 0;
      dps=[];
      xVal1 = 0;
      dps1=[];
    }
    function handle100data()
    {
      HienThiData="Last 100 data";
      SOLUONGDATA=100;
      xVal = 0;
      dps=[];
      xVal1 = 0;
      dps1=[];
    }
// end hiên thị ms 
    return (
        <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-danger">	
           <div className="navbar-brand"> <i class="fa fa-user-circle">{"  " + localStorage.getItem("Username")}</i></div>
           <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
           <div className="collapse navbar-collapse" id="collapsibleNavId">
               <ul className="navbar-nav mt-2 mt-lg-0  ">
               <li className="nav-item active">
                   <div className="nav-link" > <i class="fa fa-clock-o iconclock"> {Data.ThoiGian}</i> </div>
               </li>
               <li className="nav-item active">
                  <div className="btn-group">
                    <div  className="btn dropdown-toggle" data-toggle="dropdown" >
                      {HienThiData}
                    </div>
                    <div className="dropdown-menu dropdown-menu-right">
                     <div onClick={handle10data}   className="dropdown-item" type="button">Last 10 data</div>
                      <div onClick={handle25data}  className="dropdown-item" type="button">Last 25 data</div>
                      <div onClick={handle50data}  className="dropdown-item" type="button">Last 50 data</div>
                      <div onClick={handle75data}  className="dropdown-item" type="button">Last 75 data</div>
                      <div onClick={handle100data}  className="dropdown-item" type="button">Last 100 data</div>
                    </div>
                  </div>
               </li>
               <li className="nav-item active">
                   <div className="nav-link" ><i class="fa fa-save homeiconsave" ></i> </div>
               </li>
               <li className="nav-item active">
                  <div className="btn-group">
                    <div  className="btn dropdown-toggle" data-toggle="dropdown" >
                      {HienThi100ms}
                    </div>
                    <div className="dropdown-menu dropdown-menu-right">
                       <div onClick={handle10ms}   className="dropdown-item" type="button">10 ms</div>
                       <div onClick={handle50ms}   className="dropdown-item" type="button">50 ms</div>
                       <div onClick={handle100ms}   className="dropdown-item" type="button">100 ms</div>
                       <div onClick={handle200ms}  className="dropdown-item" type="button">200 ms</div>
                       <div onClick={handle500ms}  className="dropdown-item" type="button">500 ms</div>
                       <div onClick={handle1000ms}  className="dropdown-item" type="button">1000 ms</div>
                    </div>
                  </div>
               </li>
               <li className="nav-item active">
                   <div className="nav-link" ><i class="fa fa-home homeicon" ></i> </div>
               </li>
               <li className="nav-item active">
                   <div onClick={handleLogour} className="nav-link" > <i class="fa fa-sign-out homeicon"></i> </div>
               </li> 
               </ul>
           </div>
       </nav>
   {/* ///////////////////// */}
       <div className="container-flux to">

      <div className="row">
       <div id="cachphai"></div>
     </div>

     <div className="row ">
       <div className="col-8 to1">
       <div id="cachtrai"></div>
       {/* <h4>{dateTime.toLocaleTimeString()}</h4> */}
       <CanvasJSChart className="so1" options = {optionsNhipTim}/>
       </div>
       <div className="col-4 to1">
       <CanvasJSChart className="so2" options = {optionsTronNhipTim}/>
       <div id="cachphai"></div>
       </div>
     </div>

     <div className="row">
       <div id="cachphai"></div>
     </div>

     <div className="row">
       <div className="col-8 to1">
       <div id="cachtrai"></div>
       {/* <h4>{dateTime.toLocaleTimeString()}</h4> */}
       <CanvasJSChart className="so1" options = {optionsNhietDo}/>
       </div>
       <div className="col-4 to1">
       <CanvasJSChart className="so2" options = {optionsTronOxy}/>
       <div id="cachphai"></div>
       </div>
     </div>

     <div className="row">
       <div id="cachphai"></div>
     </div>

   </div>
   </div>
    );
}

export default Main;