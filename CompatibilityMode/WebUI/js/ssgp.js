/**
 * Created by SY on 2015/11/2.
 */
$(function () {
  $('#menu div.circle').hover(function () {
        $(this).css('border', '1px solid dodgerblue')
        .find('a').animate({ left: "-110px" }, 700)
               .next().addClass('animated bounce').css('color','dodgerblue');
    }, function () {
        $(this).css('border', '1px solid grey')
        .find('a').animate({ left: "-10px" }, 700)
               .next().removeClass('bounce').css('color','grey');
    });
    $('.body1 img').eq(0).mouseover(function () {
        $(this).attr('src','../WebUI/images/ssgp/35.png')
    });
    $('.body1 img').eq(0).mouseout(function () {
        $(this).attr('src','../WebUI/images/ssgp/32.png')
    });
    $('.body1 img').eq(1).mouseover(function () {
        $(this).attr('src','../WebUI/images/ssgp/36.png')
    });
    $('.body1 img').eq(1).mouseout(function () {
        $(this).attr('src','../WebUI/images/ssgp/33.png')
    });
    $('.body1 img').eq(2).mouseover(function () {
        $(this).attr('src','../WebUI/images/ssgp/37.png')
    });
    $('.body1 img').eq(2).mouseout(function () {
        $(this).attr('src','../WebUI/images/ssgp/34.png')
    });
});
