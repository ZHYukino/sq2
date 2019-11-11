$(document).ready(function () {
    if ($(".date").length > 0) {
        $("#data_1 .input-group.date").datepicker({
            todayBtn: "linked",
            keyboardNavigation: !1,
            forceParse: !1,
            calendarWeeks: !0,
            autoclose: !0
        })
    }
    if ($(".chosen-select").length > 0) {
        var config = {
            ".chosen-select": {},
            ".chosen-select-deselect": {
                allow_single_deselect: !0
            },
            ".chosen-select-no-single": {
                disable_search_threshold: 10
            },
            ".chosen-select-no-results": {
                no_results_text: "Oops, nothing found!"
            },
            ".chosen-select-width": {
                width: "95%"
            }
        };
        for (var selector in config) $(selector).chosen(config[selector]);
    }
});