var TableRowCount = 14;
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
        url: "/ASHX/ImageUploadHanlder.aspx",
        datatype: "xml",
        colNames: ["文件名","上传时间"],
        postData: { 'action': "GetImageList", search: MESSAGEL.searchValues },
        colModel: [
            { name: "M_Title", index: "M_Title", xmlmap: "M_Title" },
            { name: "M_Time", index: "M_Time", xmlmap: "M_Time" }
        ],
        rowNum: TableRowCount,
        height: "370",
        pager: '#pager2',
        autowidth: true,
        viewrecords: true,
        emptyrecords: "无数据",
        multiselect: true,
        multiboxonly: true,
        xmlReader: {
            root: "Items",
            row: "Item",
            total: "total",
            records: "records",
            page: "page",
            repeatitems: false,
            id: "M_ID"
        }
    });
}

function refreshList(a) {
    jQuery("#list19").jqGrid('setGridParam', { postData: { 'action': "getMessageList", searchValue: $("#txtSearch").val() } }).trigger("reloadGrid");
    if (a[1] == "1") {
        $(".win_content_r").tipsFade({ locationPixel: 25, text: "操作成功" });
    } else {
        $(".win_content_r").tipsFade({ mode: "error", locationPixel: 25, text: "操作失败" });
    }
}