/*------------ 导航栏变色 Start ----------------*/

function scroll() {
    var scrollTop = $(window).scrollTop();//获取当前窗口距顶部的高度
    if (scrollTop < 700) {
        var x = scrollTop / 700;
        $('#navigation-background').css('opacity', x);
    } else {
        $('#navigation-background').css('opacity', '1');
    }
}

$(window).on('scroll', function () {
    scroll();
});

$(function () {
    scroll();
});

/*------------- 导航栏变色 End ---------------*/


/*------------- 平滑滚动到锚点 Start ---------------*/

function topClickLink() {
    $("#navigation .top-link").click(function () {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 66 + "vh"
        }, {
            duration: 300,
            easing: "linear"
        });
        return false;
    });
}

$(function () {
    topClickLink();
});

/*------------- 平滑滚动到锚点 End -----------------*/


/*------------- 轮播图 Start -------------*/

var autoLb = true;         //autoLb=true为开启自动轮播
var autoLbtime = 10;         //autoLbtime为轮播间隔时间（单位秒）
var touch = true;           //touch=true为开启触摸滑动
var slideBt = true;         //slideBt=true为开启滚动按钮

var slideNub;               //轮播图片数量

/**
 * 窗口大小改变时改变轮播图宽高
 */
$(window).resize(function () {
    $(".slide").height($(".slide").width() * 0.56);
});

$(function () {
    $(".slide").height($(".slide").width() * 0.56);
    slideNub = $(".slide .img").size();             //获取轮播图片数量
    for (i = 0; i < slideNub; i++) {
        $(".slide .img:eq(" + i + ")").attr("data-slide-imgId", i);
    }

    //根据轮播图片数量设定图片位置对应的class
    if (slideNub == 1) {
        for (i = 0; i < slideNub; i++) {
            $(".slide .img:eq(" + i + ")").addClass("img3");
        }
    }
    if (slideNub == 2) {
        for (i = 0; i < slideNub; i++) {
            $(".slide .img:eq(" + i + ")").addClass("img" + (i + 3));
        }
    }
    if (slideNub == 3) {
        for (i = 0; i < slideNub; i++) {
            $(".slide .img:eq(" + i + ")").addClass("img" + (i + 2));
        }
    }
    if (slideNub > 3 && slideNub < 6) {
        for (i = 0; i < slideNub; i++) {
            $(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
        }
    }
    if (slideNub >= 6) {
        for (i = 0; i < slideNub; i++) {
            if (i < 5) {
                $(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
            } else {
                $(".slide .img:eq(" + i + ")").addClass("img5");
            }
        }
    }

    //自动轮播
    if (autoLb) {
        setInterval(function () {
            rightSlide();
        }, autoLbtime * 1000);
    }

    if (touch) {
        kTouch();
    }
    slideLi();
    imgClickFy();
})

/**
 * 右滑动
 */
function rightSlide() {
    var fy = new Array();
    for (i = 0; i < slideNub; i++) {
        fy[i] = $(".slide .img[data-slide-imgId=" + i + "]").attr("class");
    }
    for (i = 0; i < slideNub; i++) {
        if (i == 0) {
            $(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[slideNub - 1]);
        } else {
            $(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i - 1]);
        }
    }
    imgClickFy();
    slideLi();
}

/**
 * 左滑动
 */
function leftSlide() {
    var fy = new Array();
    for (i = 0; i < slideNub; i++) {
        fy[i] = $(".slide .img[data-slide-imgId=" + i + "]").attr("class");
    }
    for (i = 0; i < slideNub; i++) {
        if (i == (slideNub - 1)) {
            $(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[0]);
        } else {
            $(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i + 1]);
        }
    }
    imgClickFy();
    slideLi();
}

/**
 * 轮播图片左右图片点击翻页
 */
function imgClickFy() {
    $(".slide .img").removeAttr("onclick");
    $(".slide .img2").attr("onclick", "leftSlide()");
    $(".slide .img4").attr("onclick", "rightSlide()");
}

/**
 * 修改当前最中间图片对应按钮选中状态
 */
function slideLi() {
    var slideList = parseInt($(".slide .img3").attr("data-slide-imgId")) + 1;

    $('#rpa-property-slide button').each(function () {
        this.style.backgroundColor = 'white';
    });
    var slideButtonId = '#slide-button-' + slideList;
    $(slideButtonId).css('background-color', '#e8e8e8');
}

/**
 * 轮播按钮点击翻页
 * @param {*} id 
 */
function tz(id) {
    var tzcs = id - (parseInt($(".slide .img3").attr("data-slide-imgId")) + 1);
    if (tzcs > 0) {
        for (i = 0; i < tzcs; i++) {
            setTimeout(function () {
                rightSlide();
            }, 1);
        }
    }
    if (tzcs < 0) {
        tzcs = (-tzcs);
        for (i = 0; i < tzcs; i++) {
            setTimeout(function () {
                leftSlide();
            }, 1);
        }
    }
    slideLi();
}

/**
 * 触摸滑动模块
 */
function kTouch() {
    var _start = 0, _end = 0, _content = document.getElementById("rpa-property-slide");
    _content.addEventListener("touchstart", touchStart, false);
    _content.addEventListener("touchmove", touchMove, false);
    _content.addEventListener("touchend", touchEnd, false);
    function touchStart(event) {
        var touch = event.targetTouches[0];
        _start = touch.pageX;
    }
    function touchMove(event) {
        var touch = event.targetTouches[0];
        _end = (_start - touch.pageX);
    }

    function touchEnd(event) {
        if (_end < -100) {
            leftSlide();
            _end = 0;
        } else if (_end > 100) {
            rightSlide();
            _end = 0;
        }
    }
}

/*------------- 轮播图 End -------------*/


/*------------ UniStudio Start ------------*/

var programUnitContentList = {
    'uni-studio': {
        'title': 'Uni Studio',
        'description': [
            '我爱你中国我爱你中国',
            '我爱你 Uni Studio我爱你 Uni Studio',
            '我爱你中国我爱你中国',
            '我爱你 Uni Studio我爱你 Uni Studio',
            '……'
        ]
    },
    'project': {
        'title': '项目及流程管理区域',
        'description': [
            '我爱你中国',
            '我爱你项目',
            '……'
        ]
    },
    'activities': {
        'title': '工具箱区域',
        'description': [
            '我爱你中国',
            '我爱你活动',
            '……'
        ]
    },
    'edit': {
        'title': '流程设计区域',
        'description': [
            '我爱你中国',
            '我爱你编辑区',
            '……'
        ]
    },
    'outline': {
        'title': '项目大纲及属性配置区域',
        'description': [
            '我爱你中国',
            '我爱你大纲与',
            '……'
        ]
    },
    'console': {
        'title': '开发者监控区域',
        'description': [
            '我爱你中国',
            '我爱你控制台',
            '……'
        ]
    }
}

/**
 * 设置程序模块内容
 * @param {*} item 
 */
function setProgramModelContent(item) {
    $('#uni-studio button').text(item.title);
    $('#uni-studio ul').empty();
    item.description.forEach(function (item) {
        $('#uni-studio ul').append('<li style="padding: 17px;"><span class="glyphicon glyphicon-play small" style="color: #00a3ae;"></span>&nbsp;&nbsp;&nbsp;' + item + '</li>');
    });
}

/**
 * 设置默认程序模块内容
 */
function setDefaultProgramModelContent() {
    setProgramModelContent(programUnitContentList['uni-studio']);
}

$(function () {
    setDefaultProgramModelContent();
    $('#uni-studio .program-model').mouseover(function (event) {
        $('#uni-studio .program-model').each(function () {
            this.style.opacity = 0.6;
        });
        event.currentTarget.style.opacity = 1;
        event.currentTarget.style.transform = 'scale(1.6)';
        event.currentTarget.style.zIndex = 20;
        event.currentTarget.style.boxShadow = '12px 12px 500px #888888';
        event.currentTarget.style.borderWidth = '1.5px';
        event.currentTarget.style.borderRadius = '3%';
        setProgramModelContent(programUnitContentList[event.currentTarget.alt]);
    });
    $('#uni-studio .program-model').mouseout(function (event) {
        $('#uni-studio .program-model').each(function () {
            this.style.opacity = 1;
        });
        event.currentTarget.style.transform = 'scale(1)';
        event.currentTarget.style.zIndex = 0;
        event.currentTarget.style.boxShadow = '0px 0px 0px #888888';
        event.currentTarget.style.borderWidth = '0px';
        event.currentTarget.style.borderRadius = '0%';
        setDefaultProgramModelContent();
    })
});

/*------------ UniStudio End ------------*/


/*----------- 解决方案鼠标悬停 Start -----------*/

var solutionContentList = {
    '财务': {
        'title': '财务行业',
        'img': 'img/solution-finance.png',
        'paragraphs': [
            '我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国我爱你中国',
            '我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务我亲爱的财务',
            '……'
        ]
    },
    '电信': {
        'title': '电信行业',
        'img': 'img/solution-telecom.png',
        'paragraphs': [
            '我爱你中国',
            '我爱你电信',
            '……'
        ]
    },
    '保险': {
        'title': '保险行业',
        'img': 'img/solution-insurance.png',
        'paragraphs': [
            '我爱你中国',
            '我爱你保险',
            '……'
        ]
    },
    '金融与银行': {
        'title': '金融与银行',
        'img': 'img/solution-bank.png',
        'paragraphs': [
            '我爱你中国',
            '我爱你金融与银行',
            '……'
        ]
    },
    '软件与运维': {
        'title': '软件与运维',
        'img': 'img/solution-software.png',
        'paragraphs': [
            '我爱你中国',
            '我爱你软件与运维',
            '……'
        ]
    },
    '零售与快消': {
        'title': '零售与快消',
        'img': 'img/solution-retail.png',
        'paragraphs': [
            '我爱你中国',
            '我爱你零售与快消',
            '……'
        ]
    },
    '制造业': {
        'title': '制造业',
        'img': 'img/solution-manufacturing.png',
        'paragraphs': [
            '我爱你中国',
            '我爱你制造业',
            '……'
        ]
    }
};

/**
 * 重置解决方案选择状态
 */
function resetSolutionSelector() {
    $('#solution button').each(function () {
        this.style.backgroundColor = '#ffffff';
    });
}

/**
 * 设置解决方案内容
 * @param {*} item 
 */
function setSolutionContent(item) {
    $('#solution .title p').text(item.title);
    $('#solution img').attr('src', item.img);
    $('#solution ul').empty();
    item.paragraphs.forEach(function (item) {
        $('#solution ul').append('<li style="padding: 17px; line-height: 200%;"><span class="glyphicon glyphicon-play small" style="color: #00a3ae;"></span>&nbsp;&nbsp;&nbsp;' + item + '</li>');
    });
}

/**
 * 设置默认解决方案内容
 */
function setDefaultSolutionContent() {
    setSolutionContent(solutionContentList['财务']);
    $('#solution button')[0].style.backgroundColor = '#e6e6e6'
}

$(function () {
    setDefaultSolutionContent();
    $('#solution button').mouseover(function (event) {
        resetSolutionSelector();
        event.currentTarget.style.backgroundColor = '#e6e6e6';
        setSolutionContent(solutionContentList[event.currentTarget.innerText]);
    });
});

/*----------- 解决方案鼠标悬停 End ------------*/