/// <reference path="../jquery-1.4.1.min.js" />
(function () {
    
    $.fn.imagelantern = function (newSetting) {
        /// <summary>图片走马灯</summary>
        /// <param name="newSetting" type="json">
        ///     movelength: 200             移动长度
        ///     pageCount:2                 页数
        ///     contentwindows: null        内容容器
        ///     cssClass: e                 当前对象样式
        ///     isFor: true                 是否循环播放
        ///     isAuto:true                 是否自动播放
        ///     nextbut: null               下一页按钮
        ///     prevbut: null               上一页按钮
        ///     pagenumbut: null            页码按钮组
        ///</param>
        /// <returns type=""></returns>
        var setting = {
            movelength: 200,
            pageCount: 2,
            contentwindows: null,
            cssClass: "e",
            isFor: true,
            isAuto: true,
            nextbut: null,
            prevbut: null,
            speed: 3000,
            pagenumbut: null
        }
        var imagelanternTime, imagelanternanim = 0, imagelanternshowscreent = 0;
        setting = $.extend(setting, newSetting);
        var itemIsFor = 1;
        if (setting.isFor) {
            itemIsFor = 2;
            setting.contentwindows.append(setting.contentwindows.children().clone());
        }
        setting.contentwindows.width((setting.pageCount * itemIsFor) * setting.movelength);
        setting.obj = $(this);
        if (setting.nextbut != null) {
            setting.nextbut.click(function () {
                if (imagelanternanim == 1) return;
                clearTimeout(imagelanternTime);
                setting.obj.animate({ scrollLeft: setting.obj.scrollLeft() + setting.movelength }, function () {
                    imagelanternanim = 0;
                    if (setting.isFor) {
                        if (setting.obj.scrollLeft() / setting.movelength == setting.pageCount) {
                            setting.obj.scrollLeft(0);
                        }
                    } else {
                        opertLantern(setting);
                    }
                    imagelanternshowscreent = setting.obj.scrollLeft() / setting.movelength;
                    if (setting.pagenumbut)
                        setting.pagenumbut.removeClass(setting.cssClass).eq(imagelanternshowscreent).addClass(setting.cssClass);
                    if (setting.isAuto)
                        autoLantern(setting);
                });
                imagelanternanim = 1;
            });
        }
        if (setting.prevbut != null) {
            setting.prevbut.click(function () {
                if (imagelanternanim == 1) return;
                clearTimeout(imagelanternTime);
                if (setting.isFor) {
                    if (setting.obj.scrollLeft() == 0) {
                        setting.obj.scrollLeft((setting.pageCount) * setting.movelength);
                    }
                }
                setting.obj.animate({ scrollLeft: setting.obj.scrollLeft() - setting.movelength }, function () {
                    imagelanternanim = 0;
                    if (!setting.isFor) {
                        opertLantern(setting)
                    }
                    imagelanternshowscreent = setting.obj.scrollLeft() / setting.movelength;
                    if (setting.pagenumbut)
                        setting.pagenumbut.removeClass(setting.cssClass).eq(imagelanternshowscreent).addClass(setting.cssClass);
                    if (setting.isAuto)
                        autoLantern(setting);
                });
                imagelanternanim = 1;
            });
        }
        if (setting.pagenumbut != null) {
            setting.pagenumbut.click(function () {
                if (imagelanternanim == 1) return;
                clearTimeout(imagelanternTime);
                imagelanternshowscreent = $(this).index();
                setting.pagenumbut.removeClass(setting.cssClass).eq(imagelanternshowscreent).addClass(setting.cssClass);
                setting.obj.animate({ scrollLeft: $(this).index() * setting.movelength }, function () {
                    imagelanternanim = 0;
                    if (!setting.isFor)
                        opertLantern(setting);
                    if (setting.isAuto)
                        autoLantern(setting);
                });
            })
        }
        if (setting.isAuto) {
            autoLantern(setting);
            setting.obj.mouseout(function () { autoLantern(setting); }).mouseover(function () { clearTimeout(imagelanternTime); });
        }
        function opertLantern(setting) {
            if (setting.obj.scrollLeft() / setting.movelength >= (setting.pageCount - 1)) {
                setting.prevbut.show();
                setting.nextbut.hide();
            } else if (setting.obj.scrollLeft() == 0) {
                setting.prevbut.hide();
                setting.nextbut.show();
            } else {
                setting.nextbut.show();
                setting.prevbut.show();
            }
        }
        function autoLantern(setting) {
            clearTimeout(imagelanternTime);
            imagelanternTime = setTimeout(function () {
                imagelanternanim = 1;
                setting.obj.animate({ scrollLeft: setting.obj.scrollLeft() + setting.movelength }, function () {
                    imagelanternanim = 0;
                    if (setting.obj.scrollLeft() / setting.movelength == setting.pageCount) {
                        setting.obj.scrollLeft(0);
                    }
                    imagelanternshowscreent = setting.obj.scrollLeft() / setting.movelength;
                    if (setting.pagenumbut)
                        setting.pagenumbut.removeClass(setting.cssClass).eq(imagelanternshowscreent).addClass(setting.cssClass);
                });
                imagelanternTime = setTimeout(arguments.callee, setting.speed);
            }, setting.speed);
        }
    }
    
})();