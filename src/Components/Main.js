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
var yVal = 15;
var updateInterval = 100;

var dps1 = [{x: 1, y: 10}, {x:2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, 
            {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}, {x: 11, y: 18}, {x: 12, y: 20},
             {x: 13, y: 17}, {x: 14, y: 18}, {x: 15, y: 20}, {x: 16, y: 17}, {x: 17, y: 18}, {x: 18, y: 20}, 
             {x: 19, y: 17}, {x: 20, y: 18}]; 
var xVal1 = dps.length + 1;
var yVal1 = 15;
// end bieu do  
function Main() {
// begin mqtt
    let history = useHistory();
    let [Data, setData] = useState({Change: "0",NhipTim: "0",Spo2: "0"});
    function handleLogour()
    {
      localStorage.removeItem("AccessToken");
      history.replace("/");
    }
     useEffect(()=>{
      client.once('connect', function () {
         console.log('Connected');
      });
      // subscribe to topic 'Vantho15/5C:CF:7F:39:22:AF'
      client.subscribe('Vantho15/5C:CF:7F:39:22:AF',()=>{console.log("thành công")});
     },[]);

     useEffect(()=>{
      client.once('message', function (topic, message) {
        let data = JSON.parse(message.toString());
        setData(data);
        console.log(Data);
        // client.end();
      },[Data]);
     });
//  end mqtt  
// begin bieu do  
const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {  // Tạo thời gian
    // const id = setInterval(() => setDateTime(new Date()), updateInterval);
    return () => {
        // clearInterval(id);
    }
  }, []);
  useEffect(()=>{    // Cứ 1S chạy 1 lần
    setInterval(()=>{
      upDateChart();
      upDateChart1();
    },updateInterval);
  },[]);
  function upDateChart()
  {
    yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
    dps.push({x: xVal,y: yVal});
    xVal++;
    if (dps.length >  20 ) {
			dps.shift();  // Loại bỏ phần tử đầu tiên của 1 mảng
		}
  }
  function upDateChart1()
  {
    yVal1 = yVal1 +  Math.round(5 + Math.random() *(-5-5));
    dps1.push({x: xVal1,y: yVal1});
    xVal1++;
    if (dps1.length >  20 ) {
			dps1.shift();  // Loại bỏ phần tử đầu tiên của 1 mảng
		}
  }
  const optionsNhipTim = {
    theme: "dark1",
    animationEnabled: false,
    zoomEnabled: true,
    title:{
      text: "Pulses 💘 🌐"
    },
    axisX: {
      title:"Time 🔔 🕑 🤪 ",
      // valueFormatString: "01:01:01",
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
      text: "Temperature (°C)  🪔 🧪 "
    },
    axisX: {
      title:"Time 🕘 🔊 😂 ",
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
      text: "Oxygen 🧨 "
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
        { name: "Lượng Oxy", y: 50 },
        { name: "Ba Chấm", y: 50 },
        { name: "Bốn Chấm", y: 50 },
      ]
    }]
  }
  const optionsTronNhipTim = {
    theme: "dark1",
    animationEnabled: true,
    title: {
      text: "Heart Rate 💓 💘 ❤️"
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
        { name: "Nhịp Tim", y: 50 },
        { name: "Ba Chấm", y: 50 },
      ]
    }]
  }
// end bieu do 
   function checkConnect()
   {

   }

    return (
        // <div>
        //     <h2>Nhịp tim: {Data.NhipTim}</h2>
        //     <h2>Spo2: {Data.Spo2}</h2>
        //     <h2>Change: {Data.Change}</h2>
        //      <button onClick={handleLogour}>Log out</button>
        // </div>
        <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-danger">	
           <div className="navbar-brand">ChuMuc15</div>
           <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
           <div className="collapse navbar-collapse" id="collapsibleNavId">
               <ul className="navbar-nav mt-2 mt-lg-0  ">
               <li className="nav-item active">
                   <div className="nav-link" >Connect: {Data.Change} </div>
               </li>
               <li className="nav-item active">
                   <div className="nav-link" >Home </div>
               </li>
               <li className="nav-item active">
                   <div onClick={handleLogour} className="nav-link" >Logout </div>
               </li>
               </ul>
           </div>
       </nav>
   {/* ///////////////////// */}
       <div className="container-flux to">

      <div className="row">
       <div id="cachphai"></div>
     </div>

     <div className="row">
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

     <div className="row ">
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