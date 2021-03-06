import React, {useEffect , useRef, useState} from 'react';
import { useHistory } from 'react-router';
// npm install react-responsive --save
import { useMediaQuery } from 'react-responsive'

import CanvasJSReact from '../asset/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var mqtt = require('mqtt')
var options = {
  port: 3333,
  host: "wss://ngoinhaiot.com",
  username: "Vantho15",
  password: "3759DFCEFE834F17",
  useSSL: true,
  clientId: Math.random() + ""
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
// var Gio=0, Phut=0, Giay =0;
var interval1,interval2,interval3,interval4,interval0,interval5;
// end bieu do  
function Main(){
// begin mqtt
    let history = useHistory();
    // var chart1 = useRef();
    // var chart2 = useRef();
    // var chart3 = useRef();
    // var chart4 = useRef();
    const [Data, setData] = useState({Change: "0",NhipTim: "0",LedDo:"0",NhietDo:"0",ThoiGian:"00:00:00",Spo2: "0"});
    function handleLogour()
    {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("Username");
      client.unsubscribe("Vantho15/"+ localStorage.getItem("key"),()=>{console.log("Unsubcribe th??nh c??ng")});
      localStorage.removeItem("key");
      xVal = 0;
      dps = [{x: 1, y: 10}, {x:2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, 
        {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}, {x: 11, y: 18}, {x: 12, y: 20},
         {x: 13, y: 17}, {x: 14, y: 18}, {x: 15, y: 20}, {x: 16, y: 17}, {x: 17, y: 18}, {x: 18, y: 20}, 
         {x: 19, y: 17}, {x: 20, y: 18}];
      xVal1 = 0;
      dps1 = [{x: 1, y: 10}, {x:2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, 
        {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}, {x: 11, y: 18}, {x: 12, y: 20},
         {x: 13, y: 17}, {x: 14, y: 18}, {x: 15, y: 20}, {x: 16, y: 17}, {x: 17, y: 18}, {x: 18, y: 20}, 
         {x: 19, y: 17}, {x: 20, y: 18}];
      history.replace("/");
    }
     useEffect(()=>{
      client.once('connect', function () {
         console.log('Connected');
      });
      // subscribe to topic  "Vantho15/"+localStorage.getItem("key")   'Vantho15/5C:CF:7F:39:22:AF'
      client.subscribe("Vantho15/"+ localStorage.getItem("key") ,()=>{console.log("th??nh c??ng")});
     },[]);

       useEffect(()=>
       {
        client.once('message', function (topic, message) {
        let data = JSON.parse(message.toString());
        setData(data);
        // console.log(data);
        NhietDo = Number(Data.NhietDo);
        LedDo = Number(Data.LedDo);
        
        // var Mang = Data.ThoiGian.split(":");
        // Gio = Mang[0];
        // Phut = Mang[1];
        // Giay = Mang[2];
        // console.log(Gio," ", Phut," ",Giay);
        // client.end();
        });
      });
//  end mqtt  
// begin bieu do  
  useEffect(()=>{    // C??? updateInterval ms ch???y 1 l???n
      interval1 = setInterval(()=>{
      // console.log("Click 100ms");
      upDateChart();
      upDateChart1();
      // var x1 = chart1.current;
      // var x2 = chart2.current;
      // var x3 = chart3.current;
      // var x4 = chart4.current;
      // x1.render();
      // x2.render();
      // x3.render();
      // x4.render();
      // console.log(2);
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
			dps.shift();  // Lo???i b??? ph???n t??? ?????u ti??n c???a 1 m???ng
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
			dps1.shift();  // Lo???i b??? ph???n t??? ?????u ti??n c???a 1 m???ng
		}
  }
  const optionsNhipTim = {
    theme: "dark1",
    animationEnabled: false,
    zoomEnabled: true,
    title:{
      text: " ???? Pulses ???? "
    },
    axisX: {
      title:"???? "+ HienThi100ms + "  &  " + HienThiData +" ???? ",
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
      // suffix: "??C",
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
      text: "???? Temperature (??C) ???? "
    },
    axisX: {
      title:"???? "+ HienThi100ms + "  &  " + HienThiData +" ???? ",
      // valueFormatString: "01:01:01",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY:{
      // title: "Temperature",
      suffix: "??C",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    data: [{
      type: "scatter",   
      // xValueFormatString: "01:01:01",
      markerSize: 15,
      toolTipContent: "Temperature: {y}??C",
      dataPoints: dps
    }]
  }
  
  const optionsTronOxy = {
    theme: "dark1",
    animationEnabled: true,
    title: {
      text: "???? Oxygen ???? "
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
        { name: "C??n L???i", y: 50 },
        { name: "L?????ng Oxy", y: Data.Spo2 },
        { name: "Ba Ch???m", y: 50 },
        { name: "B???n Ch???m", y: 50 },
      ]
    }]
  }
  const optionsTronNhipTim = {
    theme: "dark1",
    animationEnabled: true,
    title: {
      text: "???? Heart Rate ???? "
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
        { name: "C??n L???i", y: 50 },
        { name: "Nh???p Tim", y: Data.NhipTim },
        { name: "Ba Ch???m", y: 50 },
      ]
    }]
  }
// end bieu do 
// hi???n th??? ms gi??y
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
        // var x1 = chart1.current;
        // var x2 = chart2.current;
        // var x3 = chart3.current;
        // var x4 = chart4.current;
        // x1.render();
        // x2.render();
        // x3.render();
        // x4.render();
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
        // var x1 = chart1.current;
        // var x2 = chart2.current;
        // var x3 = chart3.current;
        // var x4 = chart4.current;
        // x1.render();
        // x2.render();
        // x3.render();
        // x4.render();
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
        // var x1 = chart1.current;
        // var x2 = chart2.current;
        // var x3 = chart3.current;
        // var x4 = chart4.current;
        // x1.render();
        // x2.render();
        // x3.render();
        // x4.render();
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
        // var x1 = chart1.current;
        // var x2 = chart2.current;
        // var x3 = chart3.current;
        // var x4 = chart4.current;
        // x1.render();
        // x2.render();
        // x3.render();
        // x4.render();
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
        // var x1 = chart1.current;
        // var x2 = chart2.current;
        // var x3 = chart3.current;
        // var x4 = chart4.current;
        // x1.render();
        // x2.render();
        // x3.render();
        // x4.render();
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
// end hi??n th??? ms 
// responsive  
const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
function HienThiMenu()
{
  if(isDesktopOrLaptop)
  { 
    return(
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
                        <div data-toggle="modal"  data-target="#myModal" className="nav-link" > <i class="fa fa-sign-out homeicon"></i> </div>
                    </li> 
                </ul>
            </div>
        </nav>
    )
  }
  else if(isTabletOrMobile)
  {
    return(
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger">	
            <div className="navbar-brand"> <i class="fa fa-user-circle">{"  " + localStorage.getItem("Username")}</i></div>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mt-2 mt-lg-0  ">
                      <li className="nav-item active">
                          <div data-toggle="modal"  data-target="#myModal" className="nav-link" > <i class="fa fa-sign-out homeicon"></i> </div>
                      </li> 
                </ul>
            </div>
        </nav>
    ) 
  }
}

function HienThiContent()
{
  if(isDesktopOrLaptop)
  { 
    return(
      <div className="container-flux to">

            <div className="row">
            <div id="cachphai"></div>
           </div>

          <div className="row ">
            <div className="col-8 to1">
            <div id="cachtrai"></div>
            {/* <h4>{dateTime.toLocaleTimeString()}</h4>        onRef={ref => (chart1.current = ref)}*/ }
            <CanvasJSChart className="so1" options = {optionsNhipTim} />
            </div>
            <div className="col-4 to1">
            <CanvasJSChart className="so2" options = {optionsTronNhipTim} />
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
            <CanvasJSChart className="so1" options = {optionsNhietDo} />
            </div>
            <div className="col-4 to1">
            <CanvasJSChart className="so2" options = {optionsTronOxy} />
            <div id="cachphai"></div>
            </div>
          </div>

          <div className="row">
            <div id="cachphai"></div>
          </div>

        </div>
     
    )
  }
  else if(isTabletOrMobile)
  {
    return(
      <div className="container-flux to">


            <div className="row">
               <div id="cachphai"></div>
            </div>
             {/* ph??n menu c???a ??i???n thoai  */}
            <div className="row phan-menu-dienthoai">
          
                  <div className="col-5 text-center">
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
                  </div>
                  <div className="col-3 text-center">
                        <i class="fa fa-clock-o iconclock"> {Data.ThoiGian}</i>
                  </div>
                  <div className="col-4 text-center">
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
                  </div>
                 
            </div>

            {/* het phan menu dien thoai  */}

            <div className="row">
               <div id="cachphai"></div>
            </div>

          <div className="row ">
            <div className="col to1">
            <div id="cachtrai"></div>
            <CanvasJSChart className="so1" options = {optionsNhipTim} />
            </div>
            <div id="cachphai"></div>
          </div>

          <div className="row">
               <div id="cachphai"></div>
          </div>

          <div className="row ">
            <div className="col to1">
            <div id="cachtrai"></div>
            <CanvasJSChart className="so2" options = {optionsTronNhipTim} />
            </div>
            <div id="cachphai"></div>
          </div>

          <div className="row">
            <div id="cachphai"></div>
          </div>

          {/* het 2 c??i   */}
         
          <div className="row ">
            <div className="col to1">
            <div id="cachtrai"></div>
            <CanvasJSChart className="so1" options = {optionsNhietDo} />
            </div>
            <div id="cachphai"></div>
          </div>

          <div className="row">
               <div id="cachphai"></div>
          </div>

          <div className="row ">
            <div className="col to1">
            <div id="cachtrai"></div>
            <CanvasJSChart className="so2" options = {optionsTronOxy} />
            </div>
            <div id="cachphai"></div>
          </div>

          <div className="row">
            <div id="cachphai"></div>
          </div>
          {/* het 2 c??i */}

        </div>
    ) 
  }
}
// end responsive  

//  MAIN 
    return (
        <div>
                {/* The Modal */}
                <div className="modal" id="myModal">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      {/* Modal Header */}
                      <div className="modal-header">
                        <h4 className="modal-title">???????????</h4>
                        <button type="button" className="close" data-dismiss="modal">??</button>
                      </div>
                      {/* Modal body */}
                      <div className="modal-body">
                       Are you sure you want to sign out !??????????
                      </div>
                      {/* Modal footer */}
                      <div className="modal-footer">
                        <button onClick={handleLogour} type="button" data-dismiss="modal" className="btn btn-danger">OK ????????</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Close ????</button>
                      </div>
                    </div>
                  </div>
                </div>
  {/* begin menu   */}
        { HienThiMenu()}
  {/* ///////////////////// */}
       {HienThiContent()}
   </div>
    );
}

export default Main;