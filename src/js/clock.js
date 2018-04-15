let  canvas = document.getElementById('canvas');
// let  locText = document.getElementById('location');
let  ctx=canvas.getContext("2d");

//圆心坐标
let  a = canvas.width/2;
let  b = canvas.height/2;

// function strokeCircle(r,width,color){ // 表盘
//     ctx.beginPath();
//     ctx.strokeStyle = color;
//     ctx.lineWidth = width;
//     ctx.arc(a,b,r,0,2*Math.PI);
//     ctx.stroke();
//     ctx.closePath();
// }

function strokeLine(r,width,color,sec){ // 线条
    let  t,u;
    ctx.beginPath();
    ctx.lineCap="round";
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.shadowColor="rgba(0,0,0,0.6)";
    ctx.shadowOffsetX=2;
    ctx.shadowOffsetY=2;
    ctx.shadowBlur=3;
    ctx.moveTo(a,b);
    t=a+r*Math.cos(2*Math.PI/360*sec);
    u=b+r*Math.sin(2*Math.PI/360*sec);
    ctx.lineTo(t,u);
    ctx.stroke();
    ctx.closePath();
}

function fillCircle(r,color){ // 填充圆
    ctx.beginPath();
    ctx.shadowColor="#ffffff";
    ctx.shadowOffsetX=0;
    ctx.shadowOffsetY=0;
    ctx.shadowBlur=0;
    ctx.arc(a,b,r,0,2*Math.PI);
    ctx.fillStyle=color;
    ctx.fill();
    ctx.closePath();
}

function grdCircle(r,color1,color2){ // 空心圆
    ctx.beginPath();
    let  grd=ctx.createLinearGradient(150,0,150,300);
    grd.addColorStop(0,color1);
    grd.addColorStop(1,color2);
    ctx.shadowColor="#ffffff";
    ctx.shadowOffsetX=0;
    ctx.shadowOffsetY=0;
    ctx.shadowBlur=0;
    ctx.arc(a,b,r,0,2*Math.PI);
    ctx.fillStyle=grd;
    ctx.fill();
    ctx.closePath();
}


function clockNumber(r,color,fontStyle){ // 表盘数字
    ctx.beginPath();
    ctx.shadowColor="#ffffff";
    ctx.shadowOffsetX=0;
    ctx.shadowOffsetY=0;
    ctx.shadowBlur=0;
    ctx.font = fontStyle;
    for(let  p=1;p<=60;p++) {
        let  o = (p-15)*6;
        let t=a+r*Math.cos(2*Math.PI/360*o);
        let u=b+r*Math.sin(2*Math.PI/360*o);
        if(isInteger(p/5)){
            ctx.fillStyle=color;
            let  text = ""+p/5+"";
            let  w=ctx.measureText(text).width/2;
            ctx.fillText(String(p/5),t-w,u+9);
        }
        ctx.closePath();
    }
}

function fillText(x,y,fontcolor,fontStyle,text,align){ // 文字
    ctx.beginPath();
    ctx.shadowColor=fontcolor;
    ctx.shadowOffsetX=0;
    ctx.shadowOffsetY=0;
    ctx.shadowBlur=0;
    ctx.fillStyle=fontcolor;
    ctx.font=fontStyle;
    text = ""+text+"";
    if(align==="center") {
        ctx.fillText(text,x-(ctx.measureText(text).width/2),y);
    } else {
        ctx.fillText(text,x,y);
    }
    ctx.closePath();
}



function isInteger(obj) { // 判断整数
    return Math.floor(obj) === obj;
}

function scale(r,width){ // 刻度
    let v, c, t, u, o;
    for(let  p=1;p<=60;p++) {
         o=p*6;
        t=a+r*Math.cos(2*Math.PI/360*o);
        u=b+r*Math.sin(2*Math.PI/360*o);
        if(isInteger(o/5)){
            ctx.lineWidth=2*width;
            v=a+(r-12)*Math.cos(2*Math.PI/360*o);
            c=b+(r-12)*Math.sin(2*Math.PI/360*o);
        } else {
            ctx.lineWidth=width;
            v=a+(r-6)*Math.cos(2*Math.PI/360*o);
            c=b+(r-6)*Math.sin(2*Math.PI/360*o);
        }
        ctx.beginPath();
        ctx.strokeStyle="#000000";
        ctx.lineCap="round";
        ctx.moveTo(t,u);
        ctx.lineTo(v,c);
        ctx.stroke();
        ctx.closePath();
    }
}

function second(s,l){ // 秒针
    let  sec = (s-15)*6;
    strokeLine(l,4,"red",sec);
}
function minute(rot,s,l){ // 分针
    rot = rot+s/60-15;
    let  sec = rot*6;
    strokeLine(l,10,"#222222",sec);
    strokeLine(l-2,2,"#ffffff",sec);
}
function hour(rot,m,l){ // 时针
    rot = rot*5+(m/60)*5-15;
    let  sec = rot*6;
    strokeLine(l,10,"#222222",sec);
    strokeLine(l-2,2,"#ffffff",sec);
}

function strokeRect(x,y,a,b,width,color){ // 矩形
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.lineWidth=width;
    ctx.strokeRect(x,y,a,b);
    ctx.closePath();
}

function fillRect(x,y,a,b,width,color){ // 矩形
    ctx.beginPath();
    ctx.fillStyle=color;
    ctx.lineWidth=width;
    ctx.fillRect(x,y,a,b);
    ctx.closePath();
}

function getTime(){ // 获取时间
    let  myDate = new Date();
    let  myDay = myDate.getDate()
    let  myWeek = myDate.getDay();
    let  timeSec = myDate.getSeconds();
    let  timeMin = myDate.getMinutes();
    let  timeHour = myDate.getHours();
    let  millSec = myDate.getMilliseconds()/1000;
    let  arr_week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    myDate = {
        "myDay":myDay,
        "myWeek":arr_week[myWeek],
        "timeSec":timeSec,
        "timeMin":timeMin,
        "timeHour":timeHour,
        "millSec":millSec
    };
    return myDate;
}

function CanvasScale(n){ // 缩放
    n = n/350;
    canvas.width=350*n;
    canvas.height=350*n;
    ctx.scale(n,n);
}

function clock(){
    let  s = getTime().timeSec;
    let  m = getTime().timeMin;
    let  h = getTime().timeHour;
    let  ms = getTime().millSec;
    let  myWeek = getTime().myWeek;
    let  myDay = getTime().myDay;
    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    fillCircle(150,"#222");
    grdCircle(144,"#999","#ccc");
    grdCircle(134,"#222","#666");
    grdCircle(133,"#fff","#ccc");
    scale(131,1);
    fillText(175,123,"#222","16px Georgia bold","CITIZEN","center");
    fillText(175,236,"#222","10px Tahoma bold","AUTOMATIC","center");
    strokeRect(208,167,52,17,1,"#000");
    fillRect(209,168,50,16,1,"#fff");
    let weekColor
    if (myWeek==="SUN"){
        weekColor = "red";
    } else {
        weekColor = "#222";
    }
    fillText(225,181,weekColor,"14px Tahoma bold",myWeek,"center");
    fillText(248,181,"#222","14px Tahoma bold",myDay,"center");
    clockNumber(102,"#222","24px Arial  bold");
    fillCircle(10,"#999");

    hour(h,m,70);
    minute(m,s,92);
    second(s+ms,120);
    second(s+ms+30,18);
    fillCircle(5,"red");
    fillCircle(3,"#e2d8a1");
}
self.setInterval(clock,200);
CanvasScale(300);// 缩放
