$(window).load(function() {

	var maxHeight = 0;
	for (var i = 0; i < $('.driver-course').length; i++) {
		if ($('.driver-course').eq(i).height() > maxHeight) {
			maxHeight = $('.driver-course').eq(i).height();
		}
	}
	$('.driver-course').height(maxHeight);

	var N = 20;
	var questionNumber = 13;
	var scale = document.getElementsByClassName('course-info-question-scale')[0];
	var k = -0.25;
	var timerSpan = document.getElementsByClassName('course-info-time')[0];
	var begin = new Date();
	var delta = 0,
		seconds = 0,
		minutes = 0,
		time = 40 * 60 * 1000;

	if (scale) {
		var timer = setInterval(function() {
			var now = new Date();
			delta = now - begin;
			if (delta < time) {
				minutes = Math.floor((time - delta) / (60 * 1000));
				seconds = Math.floor((time - delta - minutes * 60 * 1000) / 1000);
				timerSpan.innerText = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
			}
		}, 100);

		for (var i = 1; i < N + 1; i++) {
			var quantum = document.createElement('div');
			if (i < questionNumber) {
				quantum.setAttribute('style', 'background-color: rgb(255, 119, 54)');
			} else if (i > questionNumber) {
				quantum.setAttribute('style', 'background-color: #888');
			}
			scale.appendChild(quantum);
		}

		setInterval(function() {
			scale.getElementsByTagName('div')[questionNumber - 1].setAttribute('style', 'opacity: ' + (0.75 + k));
			k = -k;
		}, 1000);

		document.getElementsByClassName('question-number')[0].innerText = questionNumber;

		$('.question').click(function(event) {
			$(this).addClass('active');
			$(this).siblings().removeClass('active');

			$('.button').removeClass('disabled');
		});
	}

	var i = 1;
	var numSlides = $('.slide').length;

	if (numSlides > 1) {
		setInterval(function() {
			$('.slider').css({
				'transform': 'translate(' + (-i * 100) + '%, 0%)'
			});
			i++;
			if (i == numSlides) i = 0;
		}, 8000);
	}

	$('.q-basic').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		if (!$(this).hasClass('basic-course')) {
			$('#try-imitation-test-modal').css({
				'z-index': 999
			});
			$(this).removeClass('scale')
			$('#try-imitation-test-modal').removeClass('hidden');
			$('#try-imitation-test-modal').text($(this).children('.course-title').text());
			$('#try-imitation-test-modal').attr('href',$(this).attr('href'));
		}
	});

	$('.driver-course').mouseover(function(event) {
		$(this).addClass('scale');
	});

	$('.driver-course').mouseout(function(event) {
		$(this).removeClass('scale');
	});

	$('.burger-close').click(function(event) {
		$('.modal').addClass('hidden');
		setTimeout(function() {
			$('.modal').css({
				'z-index': 0
			});
		}, 600);
	});

	$('.q-test').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.modal').removeClass('hidden');
		$('.modal').css({
			'z-index': 999
		});
	});

	$('.person-img').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		if ($('.user-img').hasClass('show-img') && !$('.person-img').hasClass('show-img')) {
			$('.user-panel').removeClass('show-panel');
			$('.exit-img').removeClass('show-img');
			$('.user-img').removeClass('show-img');
			setTimeout(function() {
				if (!$('.user-img').hasClass('show-img')) {
					$('.person-img').addClass('show-img');
				}
			}, 200);
		} else {
			$('.user-panel').addClass('show-panel');
			$('.person-img').removeClass('show-img');
			setTimeout(function() {
				if (!$('.person-img').hasClass('show-img')) {
					$('.user-img').addClass('show-img');
					$('.exit-img').addClass('show-img');
				}
			}, 200);
		}
	});

	$('.tab').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.tab').removeClass('active')
		$(this).addClass('active');
	});

	if ($('.preloader-imitation').length > 0) {
		var i = -1;
		setInterval(function() {
			(i + 1) == 3 ? i = 0 : i++;
			$('.loader').children().removeClass('load');
			$('.loader').children('div').eq(i).addClass('load');
		}, 400);
	}

	$('#date-title').click(function(event) {
		if ($('.myCalendar').hasClass('noOpacity')) {
			$('.calendar-logo').addClass('noOpacity');
			$('.myCalendar').removeClass('noOpacity');
		} else if (!$('.myCalendar').hasClass('noOpacity')) {
			$('.calendar-logo').removeClass('noOpacity');
			$('.myCalendar').addClass('noOpacity');
		}
	});

	if ($("#myCalendar-1").length > 0) {
			$("#myCalendar-1").ionCalendar({
		    lang: "ru",                     // язык календаря
		    sundayFirst: false,             // первый день недели
		    years: "2015-2020",                    // диапазон лет
		    format: "LL",           // формат возвращаемой даты
                    format: "DDMMYYYY",
		    onClick: function(date){        // клик по дням вернет сюда дату
		        $('.date-title').html('Вы планируете завершить обучение по курсу не позднее <span class="green">' + date + '</span><br/>Обучение идет по плану');
		        $('.calendar-logo').removeClass('noOpacity');
				$('.myCalendar').addClass('noOpacity');
				$('.date-title').addClass('Opacity')
		    }
		});
	}
});
