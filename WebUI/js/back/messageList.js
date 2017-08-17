var TableRowCount = 14;
var sid;
var MESSAGEL = {
    searchValues: "",
    LISTINIT: function () {
        MESSAGEL.listEvetBind();
        getList();
    },
    listEvetBind: function () {
        $("#txtSearch").keyup(function () {
            if (MESSAGEL.searchValues != $("#txtSearch").val()) {
                jQuery("#list19").jqGrid('setGridParam', { postData: { 'action': "getMessageList", searchValue: $("#txtSearch").val() } }).trigger("reloadGrid");
                MESSAGEL.searchValues = $("#txtSearch").val();
            }
        });
    },
    eventBind: function () {
        $("#butcancel").click(function () {
            $.tips.Alert.tops = top.window.document.body;
            //            $.tips.UI.ExecMethod(window);
            $.tips.UI.Remove(true);
        });
    }
};
function getList() {
    jQuery("#list19").jqGrid({
        url: "/ASHX/BackWebHanlder.aspx",
        datatype: "xml",
        colNames: ["M_ID", "姓名", "留言主题", "电话", "邮箱", "单位", "职务", "状态", "留言时间", "处理时间", "留言内容"],
        postData: { 'action': "getMessageList",  search: MESSAGEL.searchValues },
        colModel: [
            { name: "M_ID", index: "M_ID", xmlmap: "M_ID", hidden: true },
            { name: "M_Name", index: "M_Name", xmlmap: "M_Name" },
            { name: "M_Title", index: "M_Title", xmlmap: "M_Title" },
            { name: "M_Phone", index: "M_Phone", xmlmap: "M_Phone" },
            { name: "M_EMail", index: "M_EMail", xmlmap: "M_EMail" },
            { name: "M_School", index: "M_School", xmlmap: "M_School" },
            { name: "M_Job", index: "M_Job", xmlmap: "M_Job" },
            { name: "M_Status", index: "M_Status", xmlmap: "M_Status" },
            { name: "M_MsgTime", index: "M_MsgTime", xmlmap: "M_MsgTime" },
            { name: "M_ProccessTime", index: "M_ProccessTime", xmlmap: "M_ProccessTime" },
            { name: "M_Context", index: "M_Context", xmlmap: "M_Context" }
        ],
        rowNum: 14,
        height: "370",
        pager: '#pager2',
        autowidth: true,
        viewrecords: true,
        emptyrecords: "无数据",
        multiselect: true,
        multiboxonly: true,
        pagerpos: "center",
        xmlReader: {
            root: "Items",
            row: "Item",
            total: "total",
            records: "records",
            page: "page",
            repeatitems: false,
            id: "M_ID"
        },
        rowList: [14, 30, 100],
        sortable: true,
        sortname: "M_Context",
        sortorder: "desc",
        loadtext: "别着急，多等会",
        loadonce: false,
        //ondblClickRow: function (id) { sid = id; }
    });
    jQuery("#list19").jqGrid("navGrid", "#pager2");
}
$(function () {

    $(window).resize(function () {

        $("#list19").setGridWidth($(window).width() * 0.99); $("#list19").setGridWidth(document.body.clientWidth * 0.99);

    });

});
//function btnclick() {
//    if (sid == null || sid == "") {
//        $(".win_content_r").tipsFade({ mode: "error", locationPixel: 25, text: "请选择一条数据" });
//    }

//    else {

//    }
//}
function refreshList(a) {
    jQuery("#list19").jqGrid('setGridParam', { postData: { 'action': "getMessageList", searchValue: $("#txtSearch").val() } }).trigger("reloadGrid");
    if (a[1] == "1") {
        $(".win_content_r").tipsFade({ locationPixel: 25, text: "操作成功" });
    } else {
        $(".win_content_r").tipsFade({ mode: "error", locationPixel: 25, text: "操作失败" });
    }
}