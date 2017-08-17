(function () {
    var topHeight = 40;
    var bottomHeight = 83;
    var IconAdnMarginHeight = 110;
    var IconAdnMarginWidth = 130;
    sl.fn.DeskIconRange = function () {
        var setting = {};
        setting.selectObj = this;
        setting.RangeHeightIcon = RangeHeightIcon;
        RangeHeightIcon(setting);
        return setting;
    };
    function Range(setting) {
        var deskw = document.documentElement.clientWidth;
        var deskh = document.documentElement.clientHeight;
    }
    function RangeHeightIcon(setting) {
        setting.deskh = document.documentElement.clientHeight;
        setting.deskw = document.documentElement.clientWidth;
        if (setting.deskh < (bottomHeight + topHeight)) {
            return;
        }
        var rangeHeight = setting.deskh - (bottomHeight + topHeight);
        var rangeWidth = setting.deskw;
        var rangeHeightCount = parseInt(rangeHeight / IconAdnMarginHeight);
        var rangeWidthCount = parseInt(rangeWidth / IconAdnMarginWidth);
        rangeHeightCount = rangeHeightCount <= 0 ? 1 : rangeHeightCount;
        rangeWidthCount = rangeWidthCount <= 0 ? 1 : rangeWidthCount;
        for (var i = 0; i < setting.selectObj.length; i++) {
            var icon = sl(">.icon", setting.selectObj[i]);
            for (var j = 0; j < icon.length; j++) {
                var leftCon = parseInt(j / rangeHeightCount);
                var topRow = j < rangeHeightCount ? j : j - (leftCon * rangeHeightCount);
                icon[j].style.left = (leftCon * IconAdnMarginWidth) + "px";
                icon[j].style.top = (topRow * IconAdnMarginHeight) + "px";
            }
        }
    }
})();