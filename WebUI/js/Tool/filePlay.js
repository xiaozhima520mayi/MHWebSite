/// <reference path="../jquery-1.4.1.min.js" />
(function () {
    //取得网页宽高c表示当前屏a表示带滚动条的宽高
    var calculate = {
        getScreensSize: function () {
            return { cw: $(window).width(), ch: $(window).height(), aw: $(document.body).width(), ah: $(document.body).height() };
        },
        getFrameSize: function (imgWidth, imgHeight) {
            var f = { w: 0, h: 0 };
            var screens = calculate.getScreensSize();
            if (imgWidth + 100 <= screens.cw && imgHeight <= screens.ch)
                f = { w: imgWidth, h: imgHeight };
            else if (imgWidth + 100 <= screens.cw && imgHeight > screens.ch) {
                f = { w: imgWidth, h: screens.ch };
            } else if (imgWidth + 100 > screens.cw && imgHeight <= screens.ch) {
                f = { w: screens.cw - 100, h: imgHeight };
            } else {
                f = { w: screens.cw - 100, h: screens.ch };
            }
            return f;
        },
        getImageSize: function (imgWidth, imgHeight) {
            var screenSize = calculate.getScreensSize();
            var fsize = calculate.getFrameSize(imgWidth, imgHeight);
            var f = { w: fsize.w, h: fsize.h, x: (screenSize.cw - fsize.w) / 2, y: (screenSize.ch - fsize.h) / 2 };
            if (f.w > imgWidth)
                f = { w: (fsize.w), h: (f.h * (fsize.w) / f.w), x: (screenSize.cw - fsize.w) / 2, y: (screenSize.ch - (f.h * (fsize.w) / f.w)) / 2 };
            if (f.h > imgHeight)
                f = { w: (f.w * (fsize.h) / f.h), h: (fsize.h), x: (screenSize.cw - (f.w * (fsize.h) / f.h)) / 2, y: (screenSize.ch - fsize.h) / 2 };
            return f;
        }
    }
    //运行效果
    var Tween = {
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            }
        }
    }
    $.extend({
        filePlay: {
            images: function (filePlaySetting) {
                var setting = {
                    fileSrc: "",
                    defaultWidth: 630,
                    defaultHeight: 440
                };
                setting = $.extend(setting, filePlaySetting);
                createPlay("img", setting);
            },
            doc: function (filePlaySetting) {
                var setting = {
                    fileSrc: "",
                    defaultWidth: 630,
                    defaultHeight: 440
                };
                setting = $.extend(setting, filePlaySetting);
                createPlay("doc", setting);
            },
            video: function (filePlaySetting) {
                var setting = {
                    fileSrc: "",
                    defaultWidth: 630,
                    defaultHeight: 440
                };
                setting = $.extend(setting, filePlaySetting);
                createPlay("video", setting);
            },
            mp3: function (filePlaySetting) {
                var setting = {
                    fileSrc: "",
                    defaultWidth: 630,
                    defaultHeight: 440
                };
                setting = $.extend(setting, filePlaySetting);
                createPlay("mp3", setting);
            }
        }
    });
    var contentObj, file_preview;
    function createPlay(playType, setting) {
        file_preview = $("<div />").addClass("file_preview").height(setting.defaultHeight).width(setting.defaultWidth);
        var screensSize = calculate.getScreensSize();
        file_preview.css({ top: (screensSize.ch / 2 - setting.defaultHeight / 2) + "px", left: (screensSize.cw / 2 - setting.defaultWidth / 2) + "px" });
        switch (playType) {
            case "img":
                var img = new Image();
                img.src = setting.fileSrc + "?rd=" + Math.random();
                img.onload = function () {
                    setting.ImageWidth = this.width;
                    setting.ImageHeight = this.height;
                    londingImage(setting);
                }
                contentObj = $("<img />").attr("src", "/WebUI/images/Blue/londing.gif").css({ marginLeft: (((setting.defaultWidth) / 2) - (32 / 2)) + "px", marginTop: (((setting.defaultHeight) / 2) - (32 / 2)) + "px" });
                break;
            case "doc":
                contentObj = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0' width='" + setting.defaultWidth + "' height='" + setting.defaultHeight + "'>";
                contentObj += "<param name='movie' value='" + setting.fileSrc + "' />";
                contentObj += "<param name='quality' value='high' />";
                contentObj += "<embed src='" + setting.fileSrc + "' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='" + setting.defaultWidth + "'  height='" + setting.defaultHeight + "'>";
                contentObj += "</embed></object>";
                break;
            case "video":
                contentObj = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + setting.defaultWidth + '" height="' + setting.defaultHeight + '">';
                contentObj += "<param name='movie' value='/WebUI/swf/Flvplayer.swf'>";
                contentObj += "<param name='quality' value='high'>";
                contentObj += "<param name='allowFullScreen' value='true'>";
                contentObj += "<param name='FlashVars' value='vcastr_file=" + setting.fileSrc + "'>";
                contentObj += '<embed src="/WebUI/swf/Flvplayer.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" FlashVars="vcastr_file=' + setting.fileSrc + '" type="application/x-shockwave-flash" width="' + setting.defaultWidth + '" height="' + setting.defaultHeight + '"></embed>';
                contentObj += '</object>';
                break;
            case "mp3":
                contentObj = '<object data="/WebUI/swf/dewplayer-bubble-vol.swf" width="250" height="65" name="dewplayer" id="dewplayer" type="application/x-shockwave-flash">';
                contentObj += '<param name="movie" value="/WebUI/swf/dewplayer-bubble-vol.swf" />';
                contentObj += '<param name="flashvars" value="mp3=' + setting.fileSrc + '" />';
                contentObj += '<param name="wmode" value="transparent" /></object>';
                file_preview.height(108).width(325).css({ "padding-left": "75px", "padding-top": "42px", top: (screensSize.ch / 2 - 150 / 2) + "px", left: (screensSize.cw / 2 - 400 / 2) + "px" });
                break;
        }
        var file_close = $("<span />").addClass("file_close");
        file_close.click(function () {
            file_preview.remove();
        })
        file_preview.append(contentObj).append(file_close);
        $(document.body).append(file_preview);
    }
    function londingImage(setting) {
        var imageSize = calculate.getImageSize(setting.ImageWidth, setting.ImageHeight);
        var Speed = 20;
        setTimeout(function () {
            var current = 0;
            function _run() {
                if (current < Speed) {
                    current++;
                    var w = Math.ceil(Tween.Cubic.easeIn(current, setting.defaultWidth, (imageSize.w - setting.defaultWidth), Speed));
                    var h = Math.ceil(Tween.Cubic.easeIn(current, setting.defaultHeight, (imageSize.h - setting.defaultHeight), Speed));
                    contentObj.css({ marginLeft: (w / 2 - 32 / 2) + "px", marginTop: (h / 2 - 32 / 2) + "px" });
                    file_preview.width(w).height(h).css({
                        top: ((calculate.getScreensSize().ch / 2) - (h / 2) + $(document.documentElement).scrollTop()),
                        left: (calculate.getScreensSize().cw / 2) - (w / 2)
                    });
                    setTimeout(_run, 10);
                } else {
                    contentObj.attr("src", "");
                    contentObj.attr("src", setting.fileSrc).width(imageSize.w).height(imageSize.h).css({ marginLeft: 0, marginTop: 0 });
                }
            }
            _run();
        }, 2000);
    }
})();