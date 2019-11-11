<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script src="jspackage/jquery/jquery-1.10.2.min.js"></script>
    <script src="jspackage/aes/md5.js"></script>
    <script src="jspackage/aes/rsa.js"></script>
    <script src="jspackage/aes/aes.js"></script>
    <script src="jspackage/backthemes/js/bootstrap.min.js"></script><!-- ?v=3.3.6 -->
    <script src="jspackage/jquery/jquery3.2.js"></script>
    <script src="jspackage/jquery/layer-v3.1.1/layer/layer.js"></script>
    <title>无限滚动</title>
    <style>
        .xMarquee{ width:280px;overflow:hidden;height:32px;}
        img,a{border:0px;}
        .l{ float:left; padding:20px;}

        #affiche {
            color: red;
            display: block;
            width: 96%;
            height: 30px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
        }
        .affiche_text {
            position: absolute;
            display: none;
            /*top: 0;*/
            /*right: 120%;*/
            line-height: 30px;
            /*display: block;*/
            word-break: keep-all;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        #imgpic {
            margin-top: 2px;
        }
    </style>

    <div id="affiche"  style="background: black;width: 48px;height: 48px"><div class="affiche_text" ><img id="imgpic" style=" position: absolute;" src="pic2/000.bmp">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span id="test_content"></span> <img id="imgpic" style=" position: absolute;" src="pic2/000.bmp"></div></div>

    <script type="text/javascript">
            var place = 1;                          //上下的位置方式   1为居中 2左边  3右边
            var rate = 20;                          //滑动频率  10-20-30   数字大速度慢
            var check = 2;                          //进入方式
            $("#test_content").text("情报板情报板情报板情报板s");   //内容
            var cmsspeed = 2;                       //滚动速度
            var font_size = 12;                     //字体大小
            (function () {
                var timer = setTimeout(this.marquee, 1000);
            }());
            $("#test_content").css("font-size", "" + font_size + "px");

            function marquee() {
                var scrollWidth = $('#affiche').width() + 60;       //div 长度
                var textWidth = $('.affiche_text').width() + 60;
                var textheight = $('.affiche_text').height();
                var scrollheight = $('#affiche').height();
                var j = scrollheight;            //   j高度
                var i = scrollWidth;
                switch (check) {
                    //1为 右边
                    case 1:
                        $(".affiche_text").css("left", "100%");
                        $(".affiche_text").show();
                        setInterval
                        (function () {
                            i = i - cmsspeed;
                            if (i < -textWidth) {
                                i = scrollWidth;
                            }
                            $('.affiche_text').animate({'left': i + 'px'}, rate);
                        }, 20);
                        break;
                    case 2:
                        //左
                        $(".affiche_text").css("right", "200%");
                        $(".affiche_text").show();
                        setInterval
                        (function () {
                            i = i - cmsspeed;
                            if (i < -textWidth) {
                                i = scrollWidth;
                            }
                            $('.affiche_text').animate({'right': i + 'px'}, rate);
                        }, 20);
                        break;
                    case 3:
                        //上
                        $(".affiche_text").css("top", "100%");
                        $(".affiche_text").show();
                        if (place === 1) {
                            //计算文字距离div距离  做出居中效果
                            var font_left = (scrollWidth - textWidth - 32) / 2;
                            $(".affiche_text").css("left", "" + font_left + "px")
                        } else if (place === 2) {
                            //左边效果
                            $(".affiche_text").css("left", "0");
                        } else if (place === 3) {
                            //右边效果
                            $(".affiche_text").css("right", "32px");
                        }
                        setInterval
                        (function () {
                            j = j - cmsspeed;
                            if (j < -textheight) {
                                j = scrollheight + 50;
                            }
                            $('.affiche_text').animate({'top': j + 'px'}, rate);
                        }, 20);
                        break;
                    case 4:
                        //下
                        //居中效果
                        var font_left = (scrollWidth - textWidth - 32) / 2;
                        $(".affiche_text").css("left", "" + font_left + "px");
                        //下滚动
                        $(".affiche_text").css("bottom", "10%");
                        $(".affiche_text").show();
                        setInterval
                        (function () {
                            j = j - cmsspeed;
                            if (j < -textheight) {
                                j = scrollheight + 50;
                            }
                            $('.affiche_text').animate({'bottom': j + 'px'}, rate);
                        }, 20);
                        break;
                }
            }
    </script>


<!---->
<!--    <script>-->
<!--        function xMarquee(obj,fx,temp,speed){-->
<!--            obj = document.getElementById(obj);-->
<!--            var xh = obj.innerHTML;-->
<!--            var sid = 'xScroll_'+Math.floor(Math.random()*10000);-->
<!--            var neh = '';-->
<!--            var fc ;-->
<!--            if(fx==""||fx=="right"||fx==null){-->
<!--                neh = '<div style="display:block;float:left;">'+xh+'</div>';-->
<!--                obj.innerHTML = '<div id="'+sid+'" style=" width:9900%;">'+neh+neh+'<div style="clear:both;"></div></div>';-->
<!--                fc = document.getElementById(sid).childNodes;-->
<!--                if(fc[0].offsetWidth<=obj.offsetWidth){obj.innerHTML = xh;return;}-->
<!--                document.getElementById(sid).style.width = fc[0].offsetWidth*2+'px';-->
<!--            }else if(fx=="up"||fx=="down"){-->
<!--                neh = '<div style="display:block;">'+xh+'</div>';-->
<!--                obj.innerHTML = '<div id="'+sid+'">'+neh+neh+'<div style="clear:both;"></div></div>';-->
<!--                fc = document.getElementById(sid).childNodes;-->
<!--                if(fc[0].offsetHeight<=obj.offsetHeight){obj.innerHTML = xh;return;}-->
<!--                document.getElementById(sid).style.height = fc[0].offsetHeight*2+'px';-->
<!--            }-->
<!--            var t = 0;-->
<!--            if(fx==''||typeof fx == undefined||fx==null){fx = "left";}-->
<!--            if(temp==''||typeof temp == undefined||temp==null){temp = 1;}-->
<!--            if(speed==''||typeof speed == undefined||speed==null){speed = 50;}-->
<!--            if(fx=="right"){obj.scrollLeft = fc[0].offsetWidth*2;t = fc[0].offsetWidth;}-->
<!--            if(fx=="down"){obj.scrollTop = fc[0].offsetHeight*2;t = fc[0].offsetHeight;}-->
<!--            var dos = function(speed){-->
<!--                if(fx=="left"){-->
<!--                    t=t+temp;-->
<!--                    if(obj.scrollLeft>=fc[0].offsetWidth){-->
<!--                        t = temp+3;-->
<!--                        obj.scrollLeft=temp+3;-->
<!--                    }else{-->
<!--                        obj.scrollLeft=t;-->
<!--                    }-->
<!--                }-->
<!--                if(fx=="right"){-->
<!--                    t=t-temp;-->
<!--                    if(obj.scrollLeft<=0){-->
<!--                        t = fc[0].offsetWidth+3;-->
<!--                        obj.scrollLeft=fc[0].offsetWidth+3;-->
<!--                    }else{-->
<!--                        obj.scrollLeft=t;-->
<!--                    }-->
<!--                }-->
<!--                if(fx=="up"){-->
<!--                    t=t+temp;-->
<!--                    if(obj.scrollTop>=fc[0].offsetHeight){-->
<!--                        t = temp+3;-->
<!--                        obj.scrollTop=temp+3;-->
<!--                    }else{-->
<!--                        obj.scrollTop=t;-->
<!--                    }-->
<!--                }-->
<!--                if(fx=="down"){-->
<!--                    t=t-temp;-->
<!--                    if(obj.scrollTop<=0){-->
<!--                        t = fc[0].offsetHeight-3;-->
<!--                        obj.scrollTop=fc[0].offsetHeight-3;-->
<!--                    }else{-->
<!--                        obj.scrollTop=t;-->
<!--                    }-->
<!--                }-->
<!--            }-->
<!--            var s = window.setInterval(function(){dos(speed)},speed);-->
<!--            var over = function(){-->
<!--                window.clearInterval(s);-->
<!--            }-->
<!--            var out = function(){-->
<!--                s = window.setInterval(function(){dos(speed)},speed);-->
<!--            }-->
<!--            try{-->
<!--                obj.addEventListener('mouseover',over,false);-->
<!--                obj.addEventListener('mouseout',out,false);-->
<!--            }catch(e){-->
<!--                //ie-->
<!--                obj.attachEvent('o**ouseover',over);-->
<!--                obj.attachEvent('onmouseout',out);-->
<!--            }-->
<!--        }-->
<!--        window.onload = function(){-->
<!--            xMarquee('xMarquee');-->
<!--            xMarquee('xMarquee2','right','','10');-->
<!--            xMarquee('xMarquee3','up');-->
<!--            xMarquee('xMarquee4','down');-->
<!--            xMarquee('xMarquee5');-->
<!--            xMarquee('xMarquee6','right');-->
<!--            xMarquee('xMarquee7','up');-->
<!--            xMarquee('xMarquee8','down');-->
<!--        }-->
<!--    </script>-->
<!--</head>-->
<!---->
<!--<body>-->
<!--<p style="line-height:16px;">-->
<!--    window.onload = function(){<br/>-->
<!--    xMarquee('xMarquee');<br/>-->
<!--    xMarquee('xMarquee2','right');<br/>-->
<!--    xMarquee('xMarquee3','up');<br/>-->
<!--    xMarquee('xMarquee4','down');<br/>-->
<!--    xMarquee('xMarquee5');<br/>-->
<!--    xMarquee('xMarquee6','right');<br/>-->
<!--    xMarquee('xMarquee7','up');<br/>-->
<!--    xMarquee('xMarquee8','down');<br/>-->
<!--    }<br/>-->
<!---->
<!--    使用说明：xMarquee(' 对象id ',' 滚动方向 ',' 偏移(正整数,越大滚动越快，默认 1) ',' 频率(正整数,越小滚动越快，默认 50) ');<br/>-->
<!--    根据个人需求可以对'偏移'和'频率'进行调整，达到最佳效果。-->
<!--</p>-->
<!--<br/><br/>-->
<!--<div class="l">-->
<!--    left:<br/>-->
<!--    <div id="xMarquee" class="xMarquee" style=" font-size:16px;background: black;">-->
<!--        <span  style="color: red;margin: 0 auto;" href="http://haiqiancun.com/">根据个人需求可以对'偏移'和'频率'进行调整</span>-->
<!--    </div>-->
<!--</div>-->
<!--<div class="l">-->
<!--    right:<br/>-->
<!--    <div id="xMarquee2" class="xMarquee">-->
<!--        <a href="http://haiqiancun.com/">http://haiqiancun.com/http://haiqiancun.com/http://haiqiancun.com/</a><img src="pic2/000.bmp" data-tag="simg" data-bd-imgshare-binded="1">-->
<!--    </div>-->
<!--</div>-->
<!--<div class="l">-->
<!--    up:<br/>-->
<!--    <div id="xMarquee3" class="xMarquee">-->
<!--        <br/><a href="http://haiqiancun.com/">http://haiqiancun.com/http://haiqiancun.com/http://haiqiancun.com/</a><img src="http://haiqiancun.com/application/js/xheditor_emot/default/proud.gif" data-tag="simg" data-bd-imgshare-binded="1"><br/>-->
<!--        <br/><a href="http://haiqiancun.com/">http://haiqiancun.com/http://haiqiancun.com/http://haiqiancun.com/</a><img src="http://haiqiancun.com/application/js/xheditor_emot/default/proud.gif" data-tag="simg" data-bd-imgshare-binded="1">-->
<!--    </div>-->
<!--</div>-->
<!--<div class="l">-->
<!--    down:<br/>-->
<!--    <div id="xMarquee4" class="xMarquee">-->
<!--        <br/><a href="http://haiqiancun.com/">http://haiqiancun.com/http://haiqiancun.com/http://haiqiancun.com/</a><img src="http://haiqiancun.com/application/js/xheditor_emot/default/proud.gif" data-tag="simg" data-bd-imgshare-binded="1"><br/>-->
<!--        <br/><a href="http://haiqiancun.com/">http://haiqiancun.com/http://haiqiancun.com/http://haiqiancun.com/</a><img src="http://haiqiancun.com/application/js/xheditor_emot/default/proud.gif" data-tag="simg" data-bd-imgshare-binded="1">-->
<!--    </div>-->
<!--</div>-->
<!---->
<!---->
<!---->
<!---->
<!---->
<!--<div style="clear:both;"></div>-->
<!--<br/><br/><br/><br/><br/><br/><br/>-->
<!--<div class="l">-->
<!--    left:<br/>-->
<!--    <div id="xMarquee5" class="xMarquee" style="height:150px;">-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/574e9258d109b3debf7150efcebf6c81810a4c6e.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/342ac65c103853431732c6a99113b07ecb8088bd.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/4bed2e738bd4b31c6769914e85d6277f9f2ff8ea.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/4a36acaf2edda3cc7ef6f9a803e93901213f9223.jpg" width="150" height="200" /></a>-->
<!--    </div>-->
<!---->
<!--</div>-->
<!--<div class="l">-->
<!--    right:<br/>-->
<!--    <div id="xMarquee6" class="xMarquee" style="height:150px;">-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/574e9258d109b3debf7150efcebf6c81810a4c6e.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/342ac65c103853431732c6a99113b07ecb8088bd.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/4bed2e738bd4b31c6769914e85d6277f9f2ff8ea.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/4a36acaf2edda3cc7ef6f9a803e93901213f9223.jpg" width="150" height="200" /></a>-->
<!--    </div>-->
<!--</div>-->
<!--<div class="l">-->
<!--    up:<br/>-->
<!--    <div id="xMarquee7" class="xMarquee" style="height:500px; width:150px;">-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/574e9258d109b3debf7150efcebf6c81810a4c6e.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/342ac65c103853431732c6a99113b07ecb8088bd.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/4bed2e738bd4b31c6769914e85d6277f9f2ff8ea.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/4a36acaf2edda3cc7ef6f9a803e93901213f9223.jpg" width="150" height="200" /></a>-->
<!--    </div>-->
<!--</div>-->
<!--<div class="l">-->
<!--    down:<br/>-->
<!--    <div id="xMarquee8" class="xMarquee" style="height:500px; width:150px;">-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/574e9258d109b3debf7150efcebf6c81810a4c6e.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/342ac65c103853431732c6a99113b07ecb8088bd.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/4bed2e738bd4b31c6769914e85d6277f9f2ff8ea.jpg" width="150" height="200" /></a>-->
<!--        <a href="http://haiqiancun.com/"><img src="http://haiqiancun.com/file//study/meinv/4a36acaf2edda3cc7ef6f9a803e93901213f9223.jpg" width="150" height="200" /></a>-->
<!--    </div>-->
<!--</div>-->
<!--</body>-->
