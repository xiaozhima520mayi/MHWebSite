/**
 * Created by SY on 2015/11/2.
 */
$(function () {
    $('#fullpage').fullpage({
        navigation: true,
        anchors: ['p1', 'p2', 'p3', 'p4'],
        onLeave: function(index, nextIndex){
            if(index == 1){
                $('img.lt').removeClass('rollIn');
                $('img.rt').removeClass('bounceInUp')
            }
            if(index == 2){
                $('img.te1').removeClass('bounceIn');
                $('img.fl').removeClass('bounceInLeft');
                $('img.fr').removeClass('bounceInRight');
            }
            if(index == 4){
                $('img.sw').removeClass('fadeIn');
                $('img.pl').removeClass('slideInLeft');
                $('img.pr').removeClass('slideInRight');
            }

            if(nextIndex == 1){
                $('img.lt').addClass('animated rollIn');
                $('img.rt').addClass('animated bounceInUp')
            }
            if(nextIndex == 2){
                $('img.te1').addClass('animated bounceIn');
                $('img.fl').addClass('animated bounceInLeft');
                $('img.fr').addClass('animated bounceInRight');
            }
            if(nextIndex == 4){
                $('img.sw').addClass('animated fadeIn');
                $('img.pl').addClass('animated slideInLeft');
                $('img.pr').addClass('animated slideInRight');
            }
        }
    });

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
        $(this).attr('src','img/35.png')
    });
    $('.body1 img').eq(0).mouseout(function () {
        $(this).attr('src','img/32.png')
    });
    $('.body1 img').eq(1).mouseover(function () {
        $(this).attr('src','img/36.png')
    });
    $('.body1 img').eq(1).mouseout(function () {
        $(this).attr('src','img/33.png')
    });
    $('.body1 img').eq(2).mouseover(function () {
        $(this).attr('src','img/37.png')
    });
    $('.body1 img').eq(2).mouseout(function () {
        $(this).attr('src','img/34.png')
    });
});
