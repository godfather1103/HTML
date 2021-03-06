/**
 * Created by godfa on 2016/3/28.
 */
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var R = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2016, 6, 1, 0, 0, 0);
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000",];

window.onload = function () {

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    R = Math.round(WINDOW_WIDTH * 4 / 5 / 153) - 1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
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

    var nextDay = parseInt(nextShowTimeSeconds / (3600 * 24));
    var nextHours = parseInt((nextShowTimeSeconds / 3600) % 24);
    var nextMinutes = parseInt((nextShowTimeSeconds / 60) % 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curDay = parseInt(curShowTimeSeconds / (3600 * 24));
    var curHours = parseInt((curShowTimeSeconds / 3600) % 24);
    var curMinutes = parseInt((curShowTimeSeconds / 60) % 60);
    var curSeconds = curShowTimeSeconds % 60;

    if (curShowTimeSeconds != nextShowTimeSeconds) {

        //天的10位数
        if(parseInt(curDay / 10) != parseInt(nextDay / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curDay / 10));
        }

        if(parseInt(curDay / 10) != parseInt(nextDay / 10)) {
            addBalls(MARGIN_LEFT + 15, MARGIN_TOP, parseInt(curDay / 10));
        }

        //小时的10位数
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 45, MARGIN_TOP, parseInt(curHours / 10));
        }

        //小时的个位数
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 60 * (R + 1), MARGIN_TOP, parseInt(curHours % 10));
        }


        //分钟的10位数
        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 84 * (R + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }

        //分钟的个位数
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 99 * (R + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }

        //秒钟的10位数
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 123 * (R + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }

        //秒钟的个位数
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 138 * (R + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - R) {
            balls[i].y = WINDOW_HEIGHT - R;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + R > 0 && balls[i].x - R < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }
    }
    while (balls.length > cnt)
        balls.pop();
}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (R + 1) + (R + 1),
                    y: y + i * 2 * (R + 1) + (R + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                };
                balls.push(aBall);

            }
        }

}

function render(cxt) {

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    var day = parseInt(curShowTimeSeconds / (3600 * 24));
    var hours = parseInt((curShowTimeSeconds / 3600) % 24);
    var minutes = parseInt((curShowTimeSeconds / 60) % 60);
    var seconds = curShowTimeSeconds % 60;

    //天
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(day / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (R + 1), MARGIN_TOP, parseInt(day % 10), cxt);
    renderDigit(MARGIN_LEFT + 30 * (R + 1), MARGIN_TOP, 11, cxt);

    //小时
    renderDigit(MARGIN_LEFT + 45 * (R + 1), MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARGIN_LEFT + 60 * (R + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
    renderDigit(MARGIN_LEFT + 75 * (R + 1), MARGIN_TOP, 10, cxt);
    //分钟
    renderDigit(MARGIN_LEFT + 84 * (R + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 99 * (R + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
    renderDigit(MARGIN_LEFT + 114 * (R + 1), MARGIN_TOP, 10, cxt);
    //秒钟
    renderDigit(MARGIN_LEFT + 123 * (R + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 138 * (R + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);


    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, R, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }


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