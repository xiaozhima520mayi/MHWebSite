/**
 * Created by SY on 2015/11/2.
 */
$(function () {
    $('.tp').typed({
        strings:['<p>涵盖了当今商业领域的重要主题^500</p><p>为管理学教学与学习提供强大高效的课程资源</p>'],
        showCursor:false
    });
    $('#fullpage').fullpage({
        navigation:true,

        onLeave: function(index, nextIndex){
//                   if(index == 1){
//                       alert( jQuery.browser.version )
//                   }
            if(index == 2){
                $('.part1 .text, .part3 .text').removeClass('slideInLeft');
                $('.part2 .text').removeClass('slideInRight');
                $('img.img').removeClass('fadeIn')
            }
            if(index == 3){
                $('img.m').removeClass('fadeIn');
                $('img.lt').removeClass('rotateInDownRight');
                $('img.rt').removeClass('rotateInDownLeft');
                $('img.lb').removeClass('rotateInUpRight');
                $('img.rb').removeClass('rotateInUpLeft');
            }


            if(nextIndex == 2){
                $('.part1 .text, .part3 .text').addClass('animated slideInLeft');
                $('.part2 .text').addClass('animated  slideInRight');
                $('img.img').addClass('animated fadeIn')
            }
            if(nextIndex == 3){
                $('img.m').addClass('animated fadeIn');
                $('img.lt').addClass('animated rotateInDownRight');
                $('img.rt').addClass('animated rotateInDownLeft');
                $('img.lb').addClass('animated rotateInUpRight');
                $('img.rb').addClass('animated rotateInUpLeft');
            }
            if(nextIndex == 4){
                $('img.showwidth').removeAttr('src','img/47.png');
                $('div.blank div').removeClass('ftr')
            }

        },
        afterLoad: function(anchorLink, index){
            if(index == 4){
                $('img.showwidth').attr('src','img/47.png');
                $('div.blank div').addClass('ftr');
//                       if(brow.msie){
//                           if( $.browser.version > 8 )
//                               $('div.blank div').removeClass('ftr')
//                       }
            }
        }
    })


})