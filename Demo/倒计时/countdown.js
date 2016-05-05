var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var RADIUS = Math.round(WIDTH*4/5/108)-1;
var MarginLeft=WIDTH/10;
var MarginTop=HEIGHT/5;

const endTime = new Date("2016/5/20,20:30:45");//倒计时截止时间
var curRestTimeSeconds = curRestTime();

var balls=[];
var colors =["#FF4040","#FF1493","#9932CC","#7FFFD4","#00FF7F","#FFD700","#A1A1A1","#00FF00"];

window.onload = function() {
    var audio = document.getElementById("audio");
    audio.play();
    var canvas = document.getElementById("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    var context = canvas.getContext("2d");
    setInterval(
        function(){
            render(context);
            update();
        },50
    );
}
function curRestTime(){
    var cur = new Date();//获取当前时间
    var rest = Math.round((endTime.getTime()-cur.getTime())/1000);
    return rest>0?rest:0;
}

function update(){
    var nextRestTimeSeconds = curRestTime();

    var nexthour = parseInt(nextRestTimeSeconds/3600);
    var nextminute = parseInt((nextRestTimeSeconds-nexthour*3600)/60);
    var nextsecond = parseInt(nextRestTimeSeconds%60);

    var hour = parseInt(curRestTimeSeconds/3600);
    var minute = parseInt((curRestTimeSeconds-hour*3600)/60);
    var second = parseInt(curRestTimeSeconds%60);

    if(nextsecond!=second){
        //六个数字是否有变化
        if(parseInt(nexthour/10)!=parseInt(hour/10)){
            addBall(MarginLeft,MarginTop,parseInt(hour/10));
        }
        if(parseInt(nexthour%10)!=parseInt(hour%10)){
            addBall(MarginLeft+15*(RADIUS+1),MarginTop,parseInt(hour%10));
        }
        if(parseInt(nextminute/10)!=parseInt(minute/10)){
            addBall(MarginLeft+39*(RADIUS+1),MarginTop,parseInt(minute/10));
        }
        if(parseInt(nextminute%10)!=parseInt(minute%10)){
            addBall(MarginLeft+54*(RADIUS+1),MarginTop,parseInt(minute%10));
        }
        if(parseInt(nextsecond/10)!=parseInt(second/10)){
            addBall(MarginLeft+78*(RADIUS+1),MarginTop,parseInt(second/10));
        }
        if(parseInt(nextsecond%10)!=parseInt(second%10)){
            addBall(MarginLeft+93*(RADIUS+1),MarginTop,parseInt(second%10));
        }
        curRestTimeSeconds=nextRestTimeSeconds;
    }

    updateBall();
}

function updateBall() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        //碰撞检测
        if (balls[i].y >= HEIGHT - RADIUS) {
            balls[i].y = HEIGHT - RADIUS;//让小球触地
            balls[i].vy = -balls[i].vy * 0.7;//减速
        }
    }
     var cnt = 0;
     for (var i = 0; i < balls.length; i++) {
         if ((balls[i].x + RADIUS) > 0 && (balls[i].x - RADIUS) < WIDTH)
             balls[cnt++] = balls[i];
     }
     while (balls.length > cnt) {
         balls.pop();
     }
}

function addBall(x,y,num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall={
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5*(Math.random()+1),
                    vx:4*Math.pow(-1,Math.ceil(Math.random()*1000)),
                    vy:5*Math.pow(-1,Math.ceil(Math.random()*1000)),
                    color:colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}

function render(cxt) {
    cxt.clearRect(0,0,WIDTH,HEIGHT);
    var hour = parseInt(curRestTimeSeconds/3600);
    var minute = parseInt((curRestTimeSeconds-hour*3600)/60);
    var second = parseInt(curRestTimeSeconds%60);

    renderDigit(MarginLeft, MarginTop, parseInt(hour/10), cxt);
    renderDigit(MarginLeft+15*(RADIUS+1), MarginTop, parseInt(hour%10), cxt);
    renderDigit(MarginLeft+30*(RADIUS+1), MarginTop, 10, cxt);
    renderDigit(MarginLeft+39*(RADIUS+1), MarginTop, parseInt(minute/10), cxt);
    renderDigit(MarginLeft+54*(RADIUS+1), MarginTop, parseInt(minute%10), cxt);
    renderDigit(MarginLeft+69*(RADIUS+1), MarginTop, 10, cxt);
    renderDigit(MarginLeft+78*(RADIUS+1), MarginTop, parseInt(second/10), cxt);
    renderDigit(MarginLeft+93*(RADIUS+1), MarginTop, parseInt(second%10), cxt);

    for(var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
        cxt.closePath();
        cxt.fill();
    }

}

function renderDigit(x,y,num,cxt){//x、y是整个数字矩阵的起始坐标
    cxt.fillStyle="rgb(0,102,153)";
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                var X = x+j*2*(RADIUS+1)+(RADIUS+1);
                var Y = y+i*2*(RADIUS+1)+(RADIUS+1);
                cxt.beginPath();
                cxt.arc(X,Y,RADIUS,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}












