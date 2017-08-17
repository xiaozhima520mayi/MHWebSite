var currenlocation = 0;
function wrapper() {
    sl(".productname").addEventst("click", function () {
        deskwrapper(this.index);
        deskMove(this.index);
    })
}
function deskMove(desklocation) {
    if (currenlocation == desklocation)
        return;
    var pl = sl(".pagelist");
    if (currenlocation < desklocation) {
        pl[currenlocation].className = "pagelist desktop_show_prepare2";
    } else {
        pl[currenlocation].className = "pagelist";
    }
    pl[desklocation].className = "pagelist desktop_current";
    currenlocation = desklocation;
}
function deskwrapper(current) {
    sl(".productname").execCustomizeMethods(function () { this.className = "productname"; });
    sl(".productname")[current].className = "productname e";
}