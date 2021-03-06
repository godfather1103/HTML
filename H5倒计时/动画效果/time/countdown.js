/**
 * Created by godfa on 2016/3/28.
 */
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var R = 6;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2016, 2, 29, 18, 42, 59);
var curShowTimeSeconds = 0;


window.onload = function () {

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurShowTimeSeconds();
    setInterval(
        function () {
            render(context);
            update();
        }
        ,
        50
    );

    //render(context);

};

function getCurShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret / 1000);

    return ret >= 0 ? ret : 0;
}

function update() {
    var nextShowTimeSeconds = getCurShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;


    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if(nextSeconds!=curSeconds){
        curShowTimeSeconds = nextShowTimeSeconds;
    }

}

function render(cxt) {

    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    //小时
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (R + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
    renderDigit(MARGIN_LEFT + 30 * (R + 1), MARGIN_TOP, 10, cxt);
    //分钟
    renderDigit(MARGIN_LEFT + 39 * (R + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (R + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (R + 1), MARGIN_TOP, 10, cxt);
    //秒钟
    renderDigit(MARGIN_LEFT + 78 * (R + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (R + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

}

function renderDigit(x, y, num, cxt) {

    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc((x + j * 2 * (R + 1) + (R + 1)), (y + i * 2 * (R + 1) + (R + 1)), R, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill();
            }


}