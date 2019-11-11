<?php

    //远程调用类
    class CurlCalss{
         public function __construct()
        {

        }



        protected  static  function http_request_xml($url,$data = null,$arr_header = null){
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, $url);
            if(!empty($arr_header)){
                curl_setopt($curl, CURLOPT_HTTPHEADER, $arr_header);
            }
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            $output = curl_exec($curl);
            curl_close($curl);
            unset($curl);
            $output = mb_convert_encoding($output, 'utf-8', 'GBK,UTF-8,ASCII');
            return $output;
        }


        /**
         * 使用curl 获取
         *
         * $num = 端口号
         * $postdata = 前台数据传递
         * $path = 网址域名路径
         *
         */
       static function curl($num,$postdata,$path,$url = 0){
            $num = ($num == 5)?5:6;
            if(!$url) {
                $url = "http://127.0.0.1:885" . $num . "/" . $path . ".html?" . $postdata;
            }
            $arr_header[] = "Content-Type:application/json";
            $arr_header[] = "Authorization: Basic ".base64_encode("root:web12345"); //添加头，在data处填写对应账号密码
            $data['para'] = "1111";
            $res = self::http_request_xml($url,json_encode($data), $arr_header);
            return $res;
        }
        //cms 上传类
       protected static function cmsupload($furl, $url,$arr_header){
            //  初始化
            $ch = curl_init();
            // 要上传的本地文件地址"@F:/xampp/php/php.ini"上传时候，上传路径前面要有@符号
            $post_data = array(
                "upload" => $furl
            );
            //CURLOPT_URL 是指提交到哪里？相当于表单里的“action”指定的路径
            //$url = "http://localhost/DemoIndex/curl_pos/";
            //  设置变量
            curl_setopt($ch, CURLOPT_URL, $url);
            if(!empty($arr_header)){
                curl_setopt($ch, CURLOPT_HTTPHEADER, $arr_header);
            }
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//执行结果是否被返回，0是返回，1是不返回

            curl_setopt($ch, CURLOPT_HEADER, 0);//参数设置，是否显示头部信息，1为显示，0为不显示
            //表单数据，是正规的表单设置值为非0

            curl_setopt($ch, CURLOPT_POST, 1);

            curl_setopt($ch, CURLOPT_TIMEOUT, 10);//设置curl执行超时时间最大是多少

            //使用数组提供post数据时，CURL组件大概是为了兼容@filename这种上传文件的写法，

            //默认把content_type设为了multipart/form-data。虽然对于大多数web服务器并

            //没有影响，但是还是有少部分服务器不兼容。本文得出的结论是，在没有需要上传文件的

            //情况下，尽量对post提交的数据进行http_build_query，然后发送出去，能实现更好的兼容性，更小的请求数据包。
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
            //   执行并获取结果
            $output = curl_exec($ch);
            //转码
            $output = mb_convert_encoding($output, 'utf-8', 'GBK,UTF-8,ASCII');
            if (curl_exec($ch) === FALSE) {
                echo "<br/>", " curl 错误:" . curl_error($ch);
            }
            //  释放cURL句柄
            curl_close($ch);
            return $output;
        }
        public static function usecmsupload($furl,$url){
            $arr_header[] = "Content-Type:application/json";
            $arr_header[] = "Authorization: Basic ".base64_encode("root:web12345"); //添加头，在data处填写对应账号密码
            $res = self::cmsupload($furl, $url,$arr_header);
            return $res;
        }
    }

    /**使用方法
    *$path = "RoadTunnelInfo";
    *$result = CurlCalss::curl(5/6,'',$path);
    *echo $result;
    */
