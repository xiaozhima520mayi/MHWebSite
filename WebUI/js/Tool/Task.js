var taskObjGroup = new Array();
function Task(arg) {
    this.taskObj = new AddTaskInfo(arg);
    this.taskObj.dialog = arg.Dialog;
    var obj = this;
    this.taskObj.TaskGroup.onclick = function () {
        obj.taskObj.dialog.style.display = "block";
        obj.taskObj.dialog.style.zIndex = ++zIndexs;
        RangeSelectedStatus(obj.taskObj);
        deskMove(arg.desklocation);
        deskwrapper(arg.desklocation);
    }
    taskObjGroup.push(this.taskObj);
    BottomBarWidth();
    this.RangeSelectedStatus = RangeSelectedStatus;
    this.RangeSelectedzIndexStatus = RangeSelectedzIndexStatus;
    this.DeleteTaskInfo = DeleteTaskInfo;
    this.RangeSelectedStatus(this.taskObj);
}
//创建任务栏单个窗口
function AddTaskInfo(arg) {
    this.TaskGroup = document.createElement("div");
    this.TaskGroup.className = "fleft taskGroup taske";

    this.taskItemIcon = document.createElement("div");
    this.taskItemIcon.className = "taskItemIcon";

    this.taskItemIconImg = document.createElement("img");
    this.taskItemIconImg.src = arg.src;
    this.taskItemIcon.appendChild(this.taskItemIconImg);

    this.taskItemText = document.createElement("div");
    this.taskItemText.className = "taskItemText";
    this.taskItemText.innerHTML = arg.Text;

    this.TaskGroup.appendChild(this.taskItemIcon);
    this.TaskGroup.appendChild(this.taskItemText);

    sl(".task")[0].appendChild(this.TaskGroup);
}
//排列选中状态
function RangeSelectedStatus(obj) {
    if (taskObjGroup.length > 0) {
        for (var i = 0; i < taskObjGroup.length; i++) {
            if (taskObjGroup[i] == obj) {
                taskObjGroup[i].TaskGroup.className = "fleft taskGroup taske";
            } else {
                taskObjGroup[i].TaskGroup.className = "fleft taskGroup";
            }
        }
    }
}
//排列选中状态
function RangeSelectedzIndexStatus() {
    var objg = null;
    var objdialog = null;
    var count = 0;
    for (var i = 0; i < taskObjGroup.length; i++) {
        var obj = taskObjGroup[i].dialog;
        if (obj.style.display == "" || obj.style.display == "block" || obj.style.display == null) {
            var zindex = parseInt(obj.style.zIndex);
            if (zindex > count) {
                count = zindex;
                objg = taskObjGroup[i];
                objdialog = taskObjGroup[i].dialog;
            }
        }
    }
    RangeSelectedStatus(objg);
    return objdialog;
}
//删除
function DeleteTaskInfo(obj) {
    obj.taskObj.TaskGroup.parentNode.removeChild(obj.taskObj.TaskGroup);
    for (var i = 0; i < taskObjGroup.length; i++) {
        if (taskObjGroup[i] == obj.taskObj) {
            taskObjGroup.splice(i, 1);
        }
    }
    BottomBarWidth();
}
//计算宽度
function BottomBarWidth() {
    sl(".task")[0].parentNode.style.width = (taskObjGroup.length * 121) + "px";
    sl(".task")[0].style.width = (taskObjGroup.length * 121) + "px";
}
//显示桌面
function ShowDesk() {
    for (var i = 0; i < taskObjGroup.length; i++) {
        var obj = taskObjGroup[i].dialog
        if (obj.style.display == "" || obj.style.display == "block" || obj.style.display == null) {
            obj.style.display = "none";
        }
    }
}