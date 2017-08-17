var TableRowCount = 14;
var TRYPRODUCT = {
    searchValues: "",
    LISTINIT: function () {
        TRYPRODUCT.listEvetBind();
        getList();
    },
    listEvetBind: function () {
        $("#txtSearch").keyup(function () {
            if (TRYPRODUCT.searchValues != $("#txtSearch").val()) {
                jQuery("#list19").jqGrid('setGridParam', { postData: { 'action': "getTryProList", searchValue: $("#txtSearch").val() } }).trigger("reloadGrid");
                TRYPRODUCT.searchValues = $("#txtSearch").val();
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
        colNames: ["姓名", "电话", "邮箱", "单位", "部门", "职务", "状态", "申请时间", "处理时间", "试用意向产品", "M_ID"],
        postData: { 'action': "getTryProList", search: TRYPRODUCT.searchValues },
        colModel: [
            { name: "M_Name", index: "M_Name", xmlmap: "M_Name" },
            { name: "M_Phone", index: "M_Phone", xmlmap: "M_Phone"},
            { name: "M_EMail", index: "M_EMail", xmlmap: "M_EMail" },
            { name: "M_School", index: "M_School", xmlmap: "M_School" },
            { name: "M_Dept", index: "M_Dept", xmlmap: "M_Dept" },
            { name: "M_Job", index: "M_Job", xmlmap: "M_Job" },
            { name: "M_Status", index: "M_Status", xmlmap: "M_Status" },
            { name: "M_ApplyTime", index: "M_ApplyTime", xmlmap: "M_ApplyTime" },
            { name: "M_ProccessTime", index: "M_ProccessTime", xmlmap: "M_ProccessTime" },
            { name: "M_ProductName", index: "M_ProductName", xmlmap: "M_ProductName" },
            { name: "M_ID", index: "M_ID", xmlmap: "M_ID", hidden: true }
        ],
        rowNum: TableRowCount,
        height: "370",
        pager: '#pager2',
        autowidth: true,
        viewrecords: true,
        emptyrecords: "无数据",
        multiselect: true,
        multiboxonly: true,
        sortable: true,
        xmlReader: {
            root: "Items",
            row: "Item",
            total: "total",
            records: "records",
            page: "page",
            repeatitems: false,
            id: "M_ID",
        },
       

    });
}

function refreshList(a) {
    jQuery("#list19").jqGrid('setGridParam', { postData: { 'action': "getTryProList", searchValue: $("#txtSearch").val() } }).trigger("reloadGrid");
    if (a[1] == "1") {
        $(".win_content_r").tipsFade({ locationPixel: 25, text: "操作成功" });
    } else {
        $(".win_content_r").tipsFade({ mode: "error", locationPixel: 25, text: "操作失败" });
    }
}