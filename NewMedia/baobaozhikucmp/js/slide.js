(function($) {
	$.fn.slide = function(options) {
		var defaults = {
			slideContainer: $('.slideInner a'),
			effect: 'easeInQuint', //轮播图切换动画风格
			imgEffectOut: 'easeInExpo', //里面元素动画离开风格
			autoRunTime: 2000,
			slideSpeed: 1000,
			imgSlideSpeed: 1000,
			imgDelay: 50, //里面小元素动画延长时间执行
			nav: true, //点点列表
			autoRun: true,
			prevBtn: $('a.prev'),
			nextBtn: $('a.next')
		};
		var el = $(this),
			settings = $.extend({}, defaults, options),
			leftPos = 0,
			navlist = "",
			timer = null,
			imgpos = '',
			isMove = true;
		/*
		 *slides 移动方法
		 * */
		$.fn.changeSlide = function(settings, pos) {
			$(this).animate({
				left: pos + "%"
			}, {
				duration: settings.slideSpeed,
				easing: settings.effect,
				complete: function() {
						isMove = true;
				}
			});
		};
		$.fn.clickChangeSlide = function(settings, pos) {
			$(this).css({
				'left': pos + "%",
				opacity: .9
			}).delay(10).animate({
				opacity: '1'
			}, {
				duration: settings.slideSpeed,
				easing: settings.effect,
				complete: function() {
					isMove = true;
				}
			});
		};
		/*
		 * 小元素动画
		 *
		 * */
		$.fn.imgAnimate = function(delayTime, imgEffectIn, pos, where, settings) {
			var el = $(this);
			switch (where) {
				case 'right':
					el.stop(true).css({
						'left': '100%',
						'opacity': '0'
					}).delay(delayTime+15).animate({
						left: pos,
						opacity: '1'
					}, {
						duration: settings.imgSlideSpeed,
						easing: imgEffectIn,
						complete: function() {
							el.css('left', pos);
						}
					});
					el.parent().siblings().children().animate({
						left: '20%',
						opacity: '0'
					}, {
						duration: 500,
						easing: settings.imgEffectOut,
						complete: function() {
							el.css('left', pos);
						}
					});
					break;
				case 'left':
					el.stop(true).css({
						'left': '0%',
						'opacity': '0'
					}).delay(delayTime+15).animate({
						left: pos,
						opacity: '1'
					}, {
						duration: settings.imgSlideSpeed,
						easing: imgEffectIn,
						complete: function() {
							el.css('left', pos);
						}
					});
					el.parent().siblings().children().animate({
						left: '50%',
						opacity: '0'
					}, {
						duration: 500,
						easing: settings.imgEffectOut,
						complete: function() {
							el.css('left', pos);
						}
					});
					break;
			};
		};
		/*
		 * 向左移动方法
		 * */
		$.fn.moveLeft = function() {
			if (!isMove) {
				return;
			};
			isMove = false;
			var el = $(this);
			index = $(settings.slideContainer).parent().find('.active').attr("data-index");
			if (index <= total && index > 1) {
				current = $(settings.slideContainer).eq(index - 1);
				next = $(settings.slideContainer).eq(index - 2);
				if (next) {
					current.removeClass("active");
					next.addClass("active");
					changeNavList();
				};
				pos = ((Number(index) - 2) * 100) * -1;
				el.changeSlide(settings, pos);
				el.find('.active').imgMoveSetting('left');
			} else {
				toLast('first');
			}
		};
		/*
		 * 向右移动方法
		 * */
		$.fn.moveRight = function() {
			if (!isMove) {
				return;
			};
			isMove = false;
			var el = $(this);
			index = $(settings.slideContainer).parent().find('.active').attr("data-index");
			if (index >= 1 && index < total) {
				current = $(settings.slideContainer).eq(index - 1);
				next = $(settings.slideContainer).eq(index);
				if (next) {
					current.removeClass("active");
					next.addClass("active");
					changeNavList();
				};
				pos = ((Number(next.attr("data-index")) - 1) * 100) * -1;
				el.changeSlide(settings, pos);
				el.find('.active').imgMoveSetting('right');
			} else {
				toLast('last');
			}
		};
		//切换点列表
		function changeNavList() {
			if (settings.nav) {
				var index = el.find('.active').attr("data-index");
				$(".navListBox li a").removeClass("active").eq(index - 1).addClass("active");
			}
		};
		//自动切换
		function autoRun() {
			if (settings.autoRun) {
				clearInterval(timer);
				timer = setInterval(function() {
					el.moveRight();
				}, settings.autoRunTime);
			}
		};
		/*
		 * 根据索引值切换 
		 * */
		$.fn.moveTo = function(index) {
			var el = $(this),
				moveWhere = '';
			el.children().eq(index - 1).addClass('active').siblings().removeClass('active');
			pos = ((index - 1) * 100) * -1;
			el.clickChangeSlide(settings, pos);
			var nowIndex = $(".navListBox li a.active").attr('data-index');
			if (index < nowIndex) {
				moveWhere = 'left';
			} else {
				moveWhere = 'right';
			};
			$(".navListBox li").eq(index - 1).children().addClass('active').parent().siblings().children().removeClass('active');
			el.find('.active').imgMoveSetting(moveWhere);
		};
		$.fn.imgMoveSetting = function(moveW) {
			var el = $(this);
			if (moveW) {
				$.each(el.children('.moveElem'), function(i) {
					var arr = $(this).attr('rel').split(',');
					var thisDelay = arr[0] - 0;
					var imgEffectIn = arr[1];
					var thisImgpos = $(this).attr('offsetLeft');
					$(this).imgAnimate(thisDelay, imgEffectIn, thisImgpos, moveW, settings);
				});
			};
		};
		function toLast(move) {
			switch (move) {
				case 'last':
					el.find('a:first').css('margin-left', (el.children().length * 100) + "%");
					el.changeSlide(settings, -el.children().length * 100);
					el.find('a:first').imgMoveSetting('right');
					setTimeout(function() {
						el.css('left', '0%');
						el.find('a:first').css('margin-left', '0');
						el.find('a:first').addClass('active').siblings().removeClass('active');
						changeNavList();
					}, settings.slideSpeed + 50);
					break;
				case 'first':
					el.find('a:last').css('margin-left', -(el.children().length * 100) + "%");
					el.changeSlide(settings, 100);
					el.find('a:last').imgMoveSetting('left');
					setTimeout(function() {
						el.css('left', -((el.children().length - 1) * 100) + "%");
						el.find('a:last').css('margin-left', '0');
						el.find('a:last').addClass('active').siblings().removeClass('active');
						changeNavList();
					}, settings.slideSpeed + 50);
					break;
			}
		};
		settings.prevBtn.hover(function() {
			$(this).css('opacity', '.5');
		}, function() {
			$(this).css('opacity', '.2');
		});
		settings.nextBtn.hover(function() {
			$(this).css('opacity', '.5');
		}, function() {
			$(this).css('opacity', '.2');
		});
		settings.nextBtn.click(function() {
			el.moveRight();
		});
		settings.prevBtn.click(function() {
			el.moveLeft();
		});
		el.parent().hover(function() {
			clearInterval(timer);
			settings.prevBtn.parent().show();
		}, function() {
			autoRun();
			settings.prevBtn.parent().hide();
		});
		var total = $(settings.slideContainer).length;
		$.fn.init(autoRun());
		$.each($(settings.slideContainer), function(i) {
			$(this).css({
				width: $(window).width(),
				position: "absolute",
				left: leftPos + "%"
			}).attr("data-index", i + 1);
			leftPos = leftPos + 100;
			if (settings.nav) {
				navlist += "<li style='cursor: pointer'><a data-index='" + (i + 1) + "' id='color"+ (i + 1) + "'></a></li>";
			};
			$.each($(this).children(), function(i) {
				$(this).attr('offsetLeft', $(this).css('left'));
			});
		});
		$("<ul style='width:" + /*/($(settings.slideContainer).length * 12 + ($(settings.slideContainer).length - 1) * 5)/*/300 + "px;margin-left:-" + ($(settings.slideContainer).length * 12 + (($(settings.slideContainer).length - 1) * 5)) / 2 + "px' class='navListBox'>" + navlist + "</ul>").appendTo(el.parent());
		$(settings.slideContainer).eq(0).addClass("active");
		if (settings.nav) $(".navListBox li a" + "[data-index=1]").addClass("active");
		$(".navListBox li a").bind({
			click: function() {
				if (!isMove) {
					return;
				};
				isMove = false;
				var index = $(this).attr('data-index');
				el.moveTo(index);
			},
			mouseover: function() {
				$(this).parent().css('box-shadow', '0 0 5px #fff');
			},
			mouseout: function() {
				$(this).parent().css('box-shadow', 'none');
			}
		});
	};
})(jQuery);
/*
 *
 * 扩展jquery 动画组件
 * */
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
	def: 'easeOutQuad',
	swing: function(x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function(x, t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOutQuad: function(x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeInOutQuad: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInCubic: function(x, t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	easeOutCubic: function(x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
	easeInOutCubic: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	},
	easeInQuart: function(x, t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutQuart: function(x, t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeInOutQuart: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	easeInQuint: function(x, t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	easeOutQuint: function(x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	easeInOutQuint: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	},
	easeInSine: function(x, t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	},
	easeOutSine: function(x, t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	},
	easeInOutSine: function(x, t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	},
	easeInExpo: function(x, t, b, c, d) {
		return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},
	easeOutExpo: function(x, t, b, c, d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	easeInOutExpo: function(x, t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function(x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	easeOutCirc: function(x, t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	},
	easeInOutCirc: function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},
	easeInElastic: function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	easeOutElastic: function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	easeInOutElastic: function(x, t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + c;
		if (!p) p = d * (.3 * 1.5);
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	},
	easeInBack: function(x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	easeOutBack: function(x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	easeInOutBack: function(x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	easeInBounce: function(x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
	},
	easeOutBounce: function(x, t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	},
	easeInOutBounce: function(x, t, b, c, d) {
		if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	}
});