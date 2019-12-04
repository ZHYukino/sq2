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

    <div id="affiche"  style="background: black;width: 320px;height: 32px"><div class="affiche_text" ><img id="imgpic" style=" position: absolute;" src="pic2/000.bmp"><span id="test_content"></span> <img id="imgpic" style=" position: absolute;" src="pic2/000.bmp"></div></div>

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
                        // $(".affiche_text").css("left", "50%");
                        // $(".affiche_text").show();
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