//树
toastr.options = {
    "closeButton": false,
    "debug": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "onclick": null,
    "showDuration": "200",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

//提醒
function doremind(str, method, target, url) {

    switch (method) {
        case 1:
            toastr.success(str);
            break;
        case 2:
            toastr.info(str);
            break;
        case 3:
            toastr.warning(str);
            break;
        case 4:
            toastr.error(str);
            break;
    }

    $("iframe[data-id='" + target + "']").attr("src", url);
}

//警示
function msgwarning(str, method, target, url) {

    switch (method) {
        case 1:
            toastr.success(str);
            break;
        case 2:
            toastr.info(str);
            break;
        case 3:
            toastr.warning(str);
            break;
        case 4:
            toastr.error(str);
            break;
    }

    $("iframe[data-id='" + target + "']").attr("src", url);
}






