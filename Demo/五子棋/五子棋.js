/*
 五子棋的开发步骤
 1: 造棋盘  table+背景图片就可以
 2: 开发下棋功能
 3: 判断胜负
 */


/*
 问:在225个td上,全都加上onclick呢?
 答: 不用,如果都加上,将会增加浏览器的解析负担.

 问: 如果不在td加,那在加?
 答: 根据冒泡的原理,在table上加.
 点table区域,必然也点中了某个td
 td的事件,必须会冒泡上去,被table的事件捕捉.

 这种 子元素上不绑定事件,利用冒泡原理,冒泡到父元素时再执行的特点,---称为事件委托.
 即 ---- 把子元素的事件委托给父元素.

 问: 你点table区域时, 如何判断当时点中的是哪个td呢?
 答: 利用事件对象中的srcElement


关于设备兼容的问题：
由于移动设备上，两次点击是放大，设备在收到第一次点击后会等待一会儿，确认是否有第二次点击，从而判断本次事件是点击还是放大。
故，移动设备上的click事件会存在延迟。
本次我用ontouchstart来代替移动端onclick，这种方法是不太可取的，它和真正的点击事件有着不同的触发条件。
正确的思路：
在ontouchstart和ontouchend时分别记录时间、手指的位置，在ontouchend时比较两次手指的位置是否一样（或非常小的位移值），两次时间间隔较短（一般200ms以内），且未产生ontouchmove，则认为触发了手持设备的“click”事件，一般称之为“tap”
 */
//闭包记棋
var cnt = (function(){
    var curr = "white";
    return function(){
        if(curr=="white"){
            curr = "black";
        }
        else{
            curr = "white";
        }
        var temp = curr;
        return temp;
    }
})();
window.onload = function(){
    var Iswin = false;
    document.getElementsByTagName("table")[0].onclick = function(ev) {
            play.call(ev.srcElement);
    }





//判断设备类型
    /*function IsPC(){
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod");
        var flag = true;
        for(var v = 0;v<Agents.length;v++){
            if(userAgentInfo.indexOf(Agents[v]) > 0){
                flag = false;
                break;
            }
            return flag;
        }
    }*/
    //下一颗棋
    function play(){
        if(Iswin == true){
            alert("下次再玩！");
            return;
        }
        if(this.style.background.indexOf("images")>=0){
            alert("此处已有棋");
            return;
        }
        var Chesscolor = cnt();//即将下的棋子的颜色
        this.style.background = "url(images/"+Chesscolor+".gif)";
        document.getElementById("_play").play();
        judge.call(this,Chesscolor);
    }

    //判断胜负
    function judge(color){
        //获得所有单元格
        var tds = document.getElementsByTagName("td");
        //找出当前棋子的坐标
        var current = {x:this.cellIndex,y:this.parentElement.rowIndex};
        //用于存储横竖左右棋子的颜色序列
        var line = ["","","",""];
        //循环所有单元格
        for(var i = 0;i<225;i++){
            //每个单元格的坐标
            var temp = {x:tds[i].cellIndex,y:tds[i].parentElement.rowIndex,color:"0"}
            //每个单元格的背景颜色
            if(tds[i].style.background.indexOf("black")>=0){
                temp.color = "b";
            }
            else if(tds[i].style.background.indexOf("white")>=0){
                temp.color = "w";
            }
            else{
                temp.color = "0";
            }
           //循环所有单元格，找出横竖左右与current在同一直线的棋子
            if(current.y == temp.y){//同一横线上
                line[0] += temp.color;
            }
            if(current.x == temp.x){//同一竖线上
                line[1] += temp.color;
            }
            if( (current.x+current.y) == (temp.x+temp.y) ){//同一左斜线上
                line[2] += temp.color;
            }
            if( (current.x-temp.x) == (current.y-temp.y) ){//同一右斜线上
                line[3] += temp.color;
            }
        }

        //定胜负
        var clo = color == "black" ? "bbbbb":"wwwww";
        for( var i = 0;i<4;i++){
            if(line[i].indexOf(clo)>=0){
                if(clo == "bbbbb")
                {alert("恭喜黑棋赢了!");}
                else
                {alert("恭喜白棋赢了!");}
                Iswin =true;
                break;
            }
        }

    }
}







