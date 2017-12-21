function manipulateHeader() {
	var supportedEvent = ('ontouchstart' in window ) ? 'touchstart':'mousedown';
	$('header').on({
		change: function(){
			validateSearch(false);
		},
		keypress: function(){
			validateSearch(false);
		},
		keyup: function(e) {
			if (e.which == 13) {
				$('#search_submit').removeClass('clicked');
				validateSearch(true);
			} else {
				validateSearch(false);
			}
		},
		keydown: function(e) {
			if (e.which == 13) {
				$('#search_submit').addClass('clicked');
				return false;
			} else {
				validateSearch(false);
			}
		}
	}, '#search').on({
		mouseenter: function(){
			marqueeHeading();
		},
		mouseleave: function(){
			$('h1#heading').css('textIndent','0px');
		}
	}, 'h1#heading').on('click', '#search_submit', function(){
		validateSearch(true);
	});
	$('a#nav_toggle_button').on('click', function(){
		if (!$('a#nav_toggle_button').hasClass('clicked')) {
			$('header').addClass('clicked');
			$('a#nav_toggle_button').addClass('clicked');
		} else if ($('a#nav_toggle_button').hasClass('clicked')) {
			$('header').removeClass('clicked');
			$('a#nav_toggle_button').removeClass('clicked');
		}
	});
}
function manipulateDobForm() {
	disableHyphen('dob');
	helpDobForm();
	helpFullname();
	buttonSelector = '';
	if ($('#dob_submit').length) {
		buttonSelector = '#dob_submit';
	} else if ($('#dob_create').length) {
		buttonSelector = '#dob_create';
	} else if ($('#dob_edit').length) {
		buttonSelector = '#dob_edit';
	}
	$('#name_toggle.ripple').removeClass('ripple');
	$('#dob_form').on({
		focus: function(){
			$('#dob').attr('placeholder', 'YYYY-MM-DD');
		},
		blur: function(){
			$('#dob').attr('placeholder', dobText);
		},
		change: function(){
			validateDob(false);
			helpDobForm();
		},
		keypress: function(e) {
			if (e.keyCode == 13 || e.which == 13) {
				$(buttonSelector).addClass('clicked');
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();
				return false;
			} else {
				if ($('#dob_submit').length) {
					validateDob(false);
				} else if ($('#dob_create').length) {
					validateDob(false,'create');
				} else if ($('#dob_edit').length) {
					validateDob(false,'edit');
				}
			}
			helpDobForm();
		},
		keyup: function(e) {
			if (e.which == 13) {
				$(buttonSelector).removeClass('clicked');
				if ($('#dob_submit').length) {
					validateDob(true);
				} else if ($('#dob_create').length) {
					validateDob(true,'create');
				} else if ($('#dob_edit').length) {
					validateDob(true,'edit');
				}
			} else {
				if ($('#dob_submit').length) {
					validateDob(false);
				} else if ($('#dob_create').length) {
					validateDob(false,'create');
				} else if ($('#dob_edit').length) {
					validateDob(false,'edit');
				}
			}
			helpDobForm();
		},
		keydown: function(e) {
			if (e.which == 13) {
				$(buttonSelector).addClass('clicked');
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();
				return false;
			} else {
				if ($('#dob_submit').length) {
					validateDob(false);
				} else if ($('#dob_create').length) {
					validateDob(false,'create');
				} else if ($('#dob_edit').length) {
					validateDob(false,'edit');
				}
			}
			helpDobForm();
		}
	}, '#dob').on({
		focus: function(){
			helpDobForm();
			helpFullname();
		},
		click: function(){
			helpDobForm();
			helpFullname();
		},
		hover: function(){
			helpDobForm();
			helpFullname();
		},
		change: function(){
			helpDobForm();
			helpFullname();
		},
		keypress: function(e) {
			if (e.keyCode == 13) {
				$(buttonSelector).addClass('clicked');
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();
				return false;
			} else if (e.keyCode == 27) {
				$('#name_remove').addClass('clicked');
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			helpDobForm();
			helpFullname();
		},
		keyup: function(e) {
			if (e.which == 13) {
				$(buttonSelector).removeClass('clicked');
				if ($('#dob_submit').length) {
					validateDob(true);
				} else if ($('#dob_create').length) {
					validateDob(true,'create');
				} else if ($('#dob_edit').length) {
					validateDob(true,'edit');
				}
			} else if (e.which == 27) {
				$('#name_remove').removeClass('clicked');
				hideFullname();
			}
			helpDobForm();
			helpFullname();
		},
		keydown: function(e) {
			if (e.which == 13) {
				$(buttonSelector).addClass('clicked');
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();
				return false;
			} else if (e.which == 27) {
				$('#name_remove').addClass('clicked');
				e.stopImmediatePropagation();
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			helpDobForm();
			helpFullname();
		}
	}, '#fullname').on('click', '#dob_bar', function(){
		if ($('#fullname').prop('disabled') == true || $('#dob').prop('disabled') == true) {
			enableFields(false);
		}
		helpDobForm();
	}).on('click', '#dob_submit', function(){
		validateDob(true);
		helpDobForm();
	}).on('click', '#dob_create', function(){
		validateDob(true,'create');
		helpDobForm();
	}).on('click', '#dob_edit', function(){
		validateDob(true,'edit');
		helpDobForm();
	}).on('click', '#dob_remove', function(){
		validateDob(true,'remove');
		helpDobForm();
	}).on('click', '#dob_erase', function(){
		eraseDobField();
		validateDob(false);
		helpDobForm();
	}).on('click', '#name_remove', function(){
		hideFullname();
		helpDobForm();
	}).on('click', '#name_toggle', function(){
		showFullname();
		helpDobForm();
	});
}
function manipulateProverb() {
	if (isset(dob)) {
		$('#proverb').addClass('has_dob');
	}
	$('#proverb').on('click', '#proverb_text', function(){
		copyToClipboard('#proverb_text');
		selectText('#proverb_text');
	}).on('click', 'i#proverb_refresh', function(){
		loadProverb($('body').attr('lang'));
	});
	$(document).on('keyup', jwerty.event('p/u/r', function(e){
		if (!$(e.target).is('input') && !$(e.target).is('textarea')) {
			loadProverb($('body').attr('lang'));
		}
	}));
}
function manipulateExplanation() {
	$('#explanation p.explain').each(function(){
		$(this).hover(function(){
			$(this).find('span.explain_more').addClass('hover');
		},function(){
			$(this).find('span.explain_more').removeClass('hover');
		});
	});
}
function manipulateBirthday() {
	if ($('body').hasClass('birthday')) {
		$('h1#heading').burn(false).burn();
	} else if (!$('body').hasClass('birthday')) {
		$('h1#heading').burn(false);
	}
}
function manipulateBmiLang(langCode) {
	if ($('#bmi_app').length) {
		$('input#bmi_lang').val(langCode).trigger('input');
		var appElement = document.querySelector('[data-ng-app=bmiApp]');
		var $scope = angular.element(appElement).scope();
		$scope.$apply();
	}
}
function manipulateLangBar() {	
	if ($('#lang_bar').length) {
		$('.lang_toggle.button').tsort({order:'desc',attr:'data-order'}).each(function(){
			if ($(this).attr('lang') == $('body').attr('lang')) {
				$(this).addClass('first').appendTo('#lang_bar');
			} else {
				$(this).removeClass('first');
			}
		});
	}
}
function manipulateLangEvent(langCode) {
	if ($('#lang_bar').length) {
		updateInterfaceLanguage(langCode);
		manipulateLangBar();
		manipulateBmiLang(langCode)
		loadProverb(langCode);
		loadNews(langCode);
		loadComments(langCode);
		lang = langCode;
		dobText = dobTexts[langCode];
		fullnameText = fullnameTexts[langCode];
		$('#sleep_time_hour').find('option').first().text($('#hour_text').text());
		$('#sleep_time_minute').find('option').first().text($('#minute_text').text());
		$.notify($('.lang_toggle.first').find('span.lang').text());
	}
}
function manipulateLangText() {
	updateElementLanguage($('body').attr('lang'));
	dobText = dobTexts[lang];
	fullnameText = fullnameTexts[lang];
}
function manipulateLang() {
	if ($('#lang_bar').length) {
		updateInterfaceLanguage($('body').attr('lang'));
		manipulateLangBar();
		manipulateLangText();
		$('#lang_bar').on('click', '#vi_toggle', function(){
			if (!$(this).hasClass('clicked') && !$(this).hasClass('disabled')) {
				manipulateLangEvent('vi');
			}
		}).on('click', '#en_toggle', function(){
			if (!$(this).hasClass('clicked') && !$(this).hasClass('disabled')) {
				manipulateLangEvent('en');
			}
		}).on('click', '#ru_toggle', function(){
			if (!$(this).hasClass('clicked') && !$(this).hasClass('disabled')) {
				manipulateLangEvent('ru');
			}
		}).on('click', '#es_toggle', function(){
			if (!$(this).hasClass('clicked') && !$(this).hasClass('disabled')) {
				manipulateLangEvent('es');
			}
		}).on('click', '#zh_toggle', function(){
			if (!$(this).hasClass('clicked') && !$(this).hasClass('disabled')) {
				manipulateLangEvent('zh');
			}
		}).on('click', '#ja_toggle', function(){
			if (!$(this).hasClass('clicked') && !$(this).hasClass('disabled')) {
				manipulateLangEvent('ja');
			}
		});
		$(document).on('keyup', jwerty.event('1/num-1', function(e){
			if (!$(e.target).is('input') && !$(e.target).is('textarea') && !$('#vi_toggle').hasClass('clicked') && !$('#vi_toggle').hasClass('disabled')) {
				manipulateLangEvent('vi');
			}
		})).on('keyup', jwerty.event('2/num-2', function(e){
			if (!$(e.target).is('input') && !$(e.target).is('textarea') && !$('#en_toggle').hasClass('clicked') && !$('#en_toggle').hasClass('disabled')) {
				manipulateLangEvent('en');
			}
		})).on('keyup', jwerty.event('3/num-3', function(e){
			if (!$(e.target).is('input') && !$(e.target).is('textarea') && !$('#ru_toggle').hasClass('clicked') && !$('#ru_toggle').hasClass('disabled')) {
				manipulateLangEvent('ru');
			}
		})).on('keyup', jwerty.event('4/num-4', function(e){
			if (!$(e.target).is('input') && !$(e.target).is('textarea') && !$('#es_toggle').hasClass('clicked') && !$('#es_toggle').hasClass('disabled')) {
				manipulateLangEvent('es');
			}
		})).on('keyup', jwerty.event('5/num-5', function(e){
			if (!$(e.target).is('input') && !$(e.target).is('textarea') && !$('#zh_toggle').hasClass('clicked') && !$('#zh_toggle').hasClass('disabled')) {
				manipulateLangEvent('zh');
			}
		})).on('keyup', jwerty.event('6/num-6', function(e){
			if (!$(e.target).is('input') && !$(e.target).is('textarea') && !$('#ja_toggle').hasClass('clicked') && !$('#ja_toggle').hasClass('disabled')) {
				manipulateLangEvent('ja');
			}
		}));
		if (isset(decodeURIComponent(getUrlVars()['lang'])) && (decodeURIComponent(getUrlVars()['lang']) == 'vi' || decodeURIComponent(getUrlVars()['lang']) == 'en' || decodeURIComponent(getUrlVars()['lang']) == 'ru' || decodeURIComponent(getUrlVars()['lang']) == 'es' || decodeURIComponent(getUrlVars()['lang']) == 'zh' || decodeURIComponent(getUrlVars()['lang']) == 'ja')) {
			$('#'+decodeURIComponent(getUrlVars()['lang'])+'_toggle').trigger('click');
		}
	} else {
		$(document).ready(function(){
			$.datepicker.setDefaults($.datepicker.regional[lang]);
			$('.hasDatepicker').each(function(){
				$(this).datepicker('hide');
			});
		});
		manipulateLangText();
	}
}
function manipulateVideo() {
	var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"),
	$fluidEl = $("figure");
	$allVideos.each(function(){
		$(this)
		// jQuery .data does not work on object/embed elements
		.attr('data-aspectRatio', this.height / this.width)
		.removeAttr('height')
		.removeAttr('width');
	});
	$(window).resize(function(){
		var newWidth = $fluidEl.width();
		$allVideos.each(function(){
			var $el = $(this);
			$el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio'));
		});
	}).resize();
}
function manipulateButtons() {
	rippleButtons();
}
function manipulateHelper(selector,content) {
	$(selector).on({
		mouseenter: function(){
			$(selector).find('.helper').append('<div class="helper_box">'+content+'</div>');
		},
		mouseleave: function(){
			$(selector).find('.helper_box').remove();
		}
	}, '.helper').on('click', '.helper_box', function(){
		$(selector).find('.helper_box').remove();
	});
}
function manipulateInfor(selector,content) {
	$(selector).on({
		mouseenter: function(){
			$(selector).find('.infor').append('<div class="infor_box">'+content+'</div>');
		},
		mouseleave: function(){
			$(selector).find('.infor_box').remove();
		}
	}, '.infor').on('click', '.infor_box', function(){
		$(selector).find('.infor_box').remove();
	});
}
function manipulateScroll() {
	var offset = 300, offset_opacity = 1200, scroll_top_duration = 700;
	var settings = {
		target: 'body',
		speed: 10,
		vertical: true,
		vertical_inversed: true,
		horizontal: true,
		horizontal_inversed: true
	};
	if ($(window).scrollTop() > 1) {
		$('body').addClass('scrolled');
	} else {
		$('body').removeClass('scrolled');
	}
	if ($('#apps_link').length && $('#apps').length && $('#alexa').length) {
		if ($(window).scrollTop() >= Math.floor($('#apps').offset().top-$('header').height()) && $(window).scrollTop() <= ($('#alexa').offset().top-$('header').height())) {
			$('#apps_link').addClass('clicked');
		} else {
			$('#apps_link').removeClass('clicked');
		}
	}
	animateScrollProverb();
	$(window).on('scroll mousewheel wheel DOMMouseScroll resize', function(){
		($(window).scrollTop() > offset) ? $('.to-top').addClass('is-visible') : $('.to-top').removeClass('is-visible fade-out');
		if($(window).scrollTop() > offset_opacity) {
			$('.to-top').addClass('fade-out');
		}
		if ($(window).scrollTop() > 1) {
			$('body').addClass('scrolled');
		} else {
			$('body').removeClass('scrolled');
		}
		if ($('#apps_link').length && $('#apps').length && $('#alexa').length) {
			if ($(window).scrollTop() >= Math.floor($('#apps').offset().top-$('header').height()) && $(window).scrollTop() <= ($('#alexa').offset().top-$('header').height())) {
				$('#apps_link').addClass('clicked');
			} else {
				$('#apps_link').removeClass('clicked');
			}
		}
		animateScrollProverb();
	});
	$('.to-top').on('click', function(e){
		e.preventDefault();
		$('body,html').stop().animate({scrollTop: 0}, scroll_top_duration);
	});
	if ($('#dob_list').length && $('#persons_list_h2').length) {
		$('#dob_list').on('click', function(){
			$('body, html').stop().animate({scrollTop: ($('#persons_list_h2').offset().top-$('header').height())}, scroll_top_duration);
		});
	}
	if ($('#apps_link').length && $('#apps').length && $('#alexa').length) {
		$('#apps_link').on('click', function(){
			$('body, html').stop().animate({scrollTop: ($('#apps').offset().top-$('header').height())}, scroll_top_duration);
			$('#apps_link').addClass('clicked');
		});
	}
}
function manipulateClock() {
	if ($('#clock').length) {
		var clock = new analogClock();
		window.setInterval(function(){
			clock.run();
		}, 1000);
	}
}
function manipulateNews() {
	if ($('#news').length) {
		loadNews($('body').attr('lang'));
	}
}
function manipulateAjax() {
	$(document).ajaxStart(function(){
		if (!$('body').hasClass('loading')) {
			$('body').addClass('loading');
		}
	}).ajaxStop(function(){
		if ($('body').hasClass('loading')) {
			$('body').removeClass('loading');
		}
		if ($('#proverb').length) {
			animateScrollProverb();
			$('#proverb').attr('data-ajax-triggered','no');
		}
	});
}
function manipulateShare() {
	$('#social-tabs').dcSocialTabs({
		widgets: 'facebook,fblike,fbrec,google,rss,twitter',
		rssId: 'http://nhipsinhhoc.vn/blog/feed/',
		twitterId: 'tungpham42',
		facebookId: 'bieudonhipsinhhoc',
		fblikeId: 'bieudonhipsinhhoc',
		fbrecId: 'http://nhipsinhhoc.vn/',
		googleId: 'TungPhamtungpham42',
		location: 'right',
		align: 'top',
		offset: 120,
		width: 360,
		autoClose: true,
		start: 0
	});
}
function manipulateRegisterModal() {
	//var transitions = ['blind','bounce','clip','drop','explode','fade','fold','highlight','puff','pulsate','scale','shake','size','slide'];
	//var effect = transitions[randomFromTo(0, transitions.length - 1)];
	var effect = 'fade';
	if (!isset($.cookie('NSH:member')) && $('#register_modal').length && ($('body').hasClass('home') || $('body').hasClass('intro') || $('body').hasClass('bmi') || $('body').hasClass('lunar') || $('body').hasClass('donation') || $('body').hasClass('game')) && !$('body').hasClass('member')) {
		$('#register_modal').dialog({
			autoOpen: false,
			resizable: false,
			draggable: false,
			modal: true,
			minWidth: 320,
			show: {
				effect: effect,
				duration: 800
			},
			hide: {
				effect: effect,
				duration: 800
			},
			open: function(event, ui) {
				$('.ui-widget-overlay').bind('click', function(){
					$('#register_modal').dialog('close');
				});
			},
			close: function(event, ui) {
				$('#register_modal').remove();
			}
		});
//		setTimeout(function(){
//			$('#register_modal').parent().css({position:'fixed'}).end().dialog('open');
//		}, 16000);
		var lastScrollTop = 0;
		$(window).on('scroll mousewheel wheel DOMMouseScroll resize', function(){
			var thisScrollTop = $(this).scrollTop();
			if (thisScrollTop > lastScrollTop) { // scroll down
				if ($(document).scrollTop() >= 2/3*$(document).innerHeight()) {
					$('#register_modal').parent().css({position:'fixed'}).end().dialog('open');
				}
			}
			lastScrollTop = thisScrollTop;
		});
		$('#register_form_submit').on('click', function(){
			$('#register_form').submit();
		});
	}
}
function manipulateEmbedBox() {
	if ($('#embed_box').css('display') == 'block') {
		$('#embed_box_share').jsSocials({
			url: $('#embed_box').val(),
			showCount: false,
			showLabel: false,
			shares: ['facebook', 'twitter', 'googleplus', 'linkedin', 'pinterest', 'email']
		});
	} else if ($('#embed_box').css('display') == 'none') {
		$('.jssocials-shares').remove();
	}
	$('#stats').on('click', '#embed_toggle', function(){
		if ($('#embed_box').css('display') == 'block') {
			$('#embed_box_share').jsSocials({
				url: $('#embed_box').val(),
				showCount: false,
				showLabel: false,
				shares: ['facebook', 'twitter', 'googleplus', 'linkedin', 'pinterest', 'email']
			});
		} else if ($('#embed_box').css('display') == 'none') {
			$('.jssocials-shares').remove();
		}
	});
}
function manipulateSleepTime() {
	if ($('#sleep_time').length) {
		if ($('#sleep_time_hour').val() != $('#sleep_time_hour').find('option').first().text() && $('#sleep_time_minute').val() != $('#sleep_time_minute').find('option').first().text()) {
			var setTime = new Date();
			if($('#sleep_time_hour').val() == 24) {
				$('#sleep_time_hour').val(0);
			}
			setTime.setHours($('#sleep_time_hour').val());
			setTime.setMinutes($('#sleep_time_minute').val());
			var res1 = new Date(setTime.getTime() - 360*60000);
			var res2 = new Date(res1.getTime() - 90*60000);
			var res3 = new Date(res2.getTime() - 90*60000);
			$('#sleep_time_results').html(
				'<ul>'
				+'<li>'+String(retDate(res3))+'</li>'
				+'<li>'+String(retDate(res2))+'</li>'
				+'<li>'+String(retDate(res1))+'</li>'
				+'</ul>'
			);
		} else {
			$('#sleep_time_results').html('<ul><li>N/A</li></ul>');
		}
		$('#wake_up_time_results').html('<ul><li>N/A</li></ul>');
		$('#sleep_time').on('change', 'select', function(){
			if ($('#sleep_time_hour').val() != $('#sleep_time_hour').find('option').first().text() && $('#sleep_time_minute').val() != $('#sleep_time_minute').find('option').first().text()) {
				var setTime = new Date();
				if($('#sleep_time_hour').val() == 24) {
					$('#sleep_time_hour').val(0);
				}
				setTime.setHours($('#sleep_time_hour').val());
				setTime.setMinutes($('#sleep_time_minute').val());
				var res1 = new Date(setTime.getTime() - 360*60000);
				var res2 = new Date(res1.getTime() - 90*60000);
				var res3 = new Date(res2.getTime() - 90*60000);
				$('#sleep_time_results').html(
					'<ul>'
					+'<li>'+String(retDate(res3))+'</li>'
					+'<li>'+String(retDate(res2))+'</li>'
					+'<li>'+String(retDate(res1))+'</li>'
					+'</ul>'
				);
			} else {
				$('#sleep_time_results').html('<ul><li>N/A</li></ul>');
			}
		}).on('click', '#sleep_now', function(){
			var sleepDate = new Date();
			var res1 = new Date(sleepDate.getTime() + (360+14)*60000);
			var res2 = new Date(res1.getTime() + 90*60000);
			var res3 = new Date(res2.getTime() + 90*60000);
			$('#wake_up_time_results').html(
				'<ul>'
				+'<li>'+String(retDate(res1))+'</li>'
				+'<li>'+String(retDate(res2))+'</li>'
				+'<li>'+String(retDate(res3))+'</li>'
				+'</ul>'
			);
			setTimeout(function(){
				$('#wake_up_time_results').html('<ul><li>N/A</li></ul>');
			}, 2*60000);
		});
	}
}
function manipulateDatepicker() {
	$('input.hasDatepicker').datepicker({
		beforeShowDay: function(date){
			var solarYear = date.getFullYear();
			var solarMonth = date.getMonth()+1;
			var solarDay = date.getDate();
			var lunarDate = convertSolarToLunar(solarDay,solarMonth,solarYear,7);
			return [true,'',lunarDate];
		}
	});
}
function manipulateTouch() {
	if (Modernizr.touch) {
		$('input.hasDatepicker').prop('readonly', true);
	}
}
function manipulateCommon() {
	manipulateScroll();
	manipulateLang();
	manipulateHeader();
	manipulateButtons();
}
function manipulateHome() {
	manipulateBirthday();
	manipulateDobForm();
	manipulateProverb();
	manipulateExplanation();
	manipulateClock();
	manipulateNews();
	manipulateSleepTime();
}
function manipulateEnd() {
	manipulateTouch();
	manipulateAjax();
}