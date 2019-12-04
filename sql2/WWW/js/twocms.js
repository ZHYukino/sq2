//门架播放版
    function cmssetdota1(id,place,rate,check,content,speed,size,stoptime,stopplace,pic,font_color,font_style) {

        var place_zh = place;                           //上下的位置方式   1为居中 2左边  3右边
        var rate_zh = rate;                             //滑动频率  10-20-30   数字大速度慢
        var check_zh = check;                           //进入方式
        var cmsspeed_zh = speed;                       //滚动速度
         $("#"+id+"test_content").append("3123213123123");   //内容
        var font_size = size;                            //字体大小
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