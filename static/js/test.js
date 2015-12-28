scale = document.getElementsByClassName('course-info-question-scale')[0];
var undoneQuestionBackground = '#888';
var doneQuestionBackground = 'rgb(255, 119, 54)';
var highlightedQuestionBackground = '#00f';
var activeQuestion = 0;


function compareArrays(ar1, ar2) {
  eq = new Array();
  if(ar1.length == ar2.length){
    for (i = 0; i < ar1.length; i++) {
      if(ar1[i] != ar2[i])
	eq.push(i + 1);
    }
  }
  return eq;
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

function isAnswered (questionNumber) {
  if (userAnswers[questionNumber])
    return true;
  return false;
}

function highlightQuestionBar (questionNumber){
  chosenQuestion = $('#question' + questionNumber);
  chosenQuestion.css('background-color', highlightedQuestionBackground);

}

function dehighlightQuestionBar (questionNumber){
  if (activeQuestion == questionNumber) {
    return;
  }
  chosenQuestion = $('#question' + questionNumber);
  if (!userAnswers[questionNumber]) {
    chosenQuestion.css('background-color', undoneQuestionBackground);
  } else {
    chosenQuestion.css('background-color', doneQuestionBackground);
  }
}

function initialHighlightQuestionBar(questionNumber) {
  chosenQuestion = $('#question' + questionNumber);
  if (userAnswers[questionNumber]) {
    chosenQuestion.css('background-color', doneQuestionBackground);
  } else {
    chosenQuestion.css('background-color', undoneQuestionBackground);
  }
}

function showQuestion(question, questionNumber) {
	
  var questionId = 'question' + questionNumber;
  var questionNumberElement = $('.question-number');
  var questionContentElement = $('.question-content');
  var variantElement = $('.question-variant');
  var variantNumberElement = $('.question-number-variant');
  var questionContentArr = question.answers;
  questionNumberElement.text(questionNumber + 1);
  questionContentElement.text(question.text);
  
  for (i = 0; i < questionContentArr.length; i++)
  {
    variantElement[i].textContent = questionContentArr[i];
    variantNumberElement[i].textContent = i+1;
  }
  
  $('.button').addClass('disabled');
  variants = $('.question');
  variants.removeClass('active');
  var answerNumber = userAnswers[questionNumber];
  
  if (answerNumber!=undefined) {
    variants[answerNumber-1].attributes[0].textContent = "question active";
    $('.button').removeClass('disabled');
  }
  
  variants.click( function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    $('.button').removeClass('disabled');
  });
  
  initialHighlightQuestionBar(activeQuestion);
  activeQuestion = questionNumber;
  
  scale.find('div:eq('+ activeQuestion +')').css('background-color', '#00f');
}

function setActive (questionNumber) {
  activeQuestion = questionNumber;
}

function loadQuestionsToSite ()
{
  var questions = [];
  /*for (var i = 1; i < 11; i++) {8*/
    i=14;
    questions.push({text: 'Какое международное соглашение определяет требования к осуществлению международной дорожной перевозки опасных грузов автомобильным транспортом?', answers: ['а) ВОПОГ', 'б) МК МПОГ.', 'в) ИКАО ТИ']});
    questions.push({text: 'Выполнение положений ДОПОГ обязательно при осуществлении:', answers: ['а) любых международных перевозок опасных грузов;', 'перевозок опасных грузов между государствами - участниками ДОПОГ', 'перевозок опасных грузов между государствами – участниками СНГ']});
    questions.push({text: 'Каким документом установлен порядок перевозки опасных грузов автомобильным транспортом на территории Российской Федерации для собственных нужд?', answers: ['постановлением Правительства Российской Федерации от 23 апреля 1994 г. № 372 "О мерах по обеспечению безопасности при перевозке опасных грузов автомобильным транспортом', 'ПОГАТ', 'инструкцией по обеспечению безопасности перевозки опасных грузов автомобильным транспортом, утвержденной приказом МВД СССР от 23 сентября 1985 г. № 181']});
    questions.push({text: 'Рассматривается ли согласно ДОПОГ перевозка в контейнере твердых неупакованных веществ в качестве перевозки навалом/насыпью?', answers: ['да', 'нет', ' ']});
    questions.push({text: 'Какая группа упаковки согласно ДОПОГ назначается для веществ с низкой степенью опасности?', answers: ['I', 'II', 'III']});

    questions.push({text: 'Согласно ДОПОГ контейнер средней грузоподъемности для массовых грузов представляет собой:', answers: ['жесткую тару, являющеюся частью транспортного средства', 'жесткую или мягкую переносную тару', ' ']});
    questions.push({text: 'Согласно ДОПОГ термин «тара аварийная» означает:', answers: ['тару, восстановленную после аварии', 'тару, в которую помещаются поврежденные упаковки с опасными грузами', 'тару, предназначенную для перевозки опасных грузов, представляющих значительную опасность в случае аварии']});
    questions.push({text: 'Какая перевозка может рассматриваться как перевозка неопасного груза на одной транспортной единице?', answers: ['10 баллонов с пропаном по 50 кг в каждом (2-я транспортная категория)', '10 баллонов с кислородом по 50 л в каждом (3-я транспортная категория) и 4 баллона с пропаном по 50 кг в каждом (2-я транспортная категория)', '* 15 баллонов с кислородом по 50 л в каждом (3-я транспортная категория)']});
    questions.push({text: 'Кто согласно ПОГАТ заполняет аварийную карточку системы информации об опасности?', answers: [' ', ' ', ' ']});
    questions.push({text: 'Каким цветом согласно ПОГАТ выполняется отметка «Опасный груз» в путевом листе автомобиля?', answers: ['синим', 'черным', 'красным']});
  
  return questions;
}

$( window ).load(function() {
  scale = $('#course-info-question-scale');
  k = -0.25;
  var begin = new Date();
  var delta = 0, seconds = 0, minutes = 0, time = 5 * 60 * 1000;
  var redirectUrlAfterTimeIsOut = "http://example.com/?shit_happens=1";
  
  var timer = setInterval(function() {
    var now = new Date();
    delta = now - begin;
    if (delta < time) {
      minutes = Math.floor((time - delta) / (60 * 1000));
      seconds = Math.floor((time - delta - minutes * 60 * 1000) / 1000);
      $('.course-info-time').text((minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
    }
  }, 100);
  
  var questionId = 0; 
  
  questions = loadQuestionsToSite();
  
  userAnswers = new Array(questions.length);
  
  corrAnswers = ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1"];
  
  questions.forEach(function(question, questionNumber, questions) {
    var $quantum = $('<div id="question'+ questionNumber +'">');
    $quantum.click(function(){showQuestion(question, questionNumber)});
    $quantum.mouseover(function(){highlightQuestionBar(questionNumber)});
    $quantum.mouseout(function(){dehighlightQuestionBar(questionNumber)});
    scale.append($quantum);
    initialHighlightQuestionBar(questionNumber);
  });

  scale.find('div:eq('+ activeQuestion +')').css('background-color', '#00f');

  var maxHeight = 0;
  for (var i = 0; i < $('.driver-course').length; i++) {
    if ($('.driver-course').eq(i).height() > maxHeight) {
      maxHeight = $('.driver-course').eq(i).height();
    }
  }
  $('.driver-course').height(maxHeight);
  
  $('#submitAnswer').click(function () {
    if($(this).hasClass('disabled')){
      return false;
    }
    curQNumber = parseInt($('.question-number').text());
    if(curQNumber <= 10){
      if(curQNumber == 10) {
	$(this).addClass('disabled');
      }
      userAnswers[curQNumber-1] = $('.question.active').find('.question-number-variant').text();
      showQuestion(questions[curQNumber], curQNumber);
    }
  });
  
  $('#send').click(function () {
    result = compareArrays(userAnswers, corrAnswers);
    if(result.length == 0)
      alert('Все ответы правильны!');
    else {
      alert('Неправильный ответ в вопросах ' + result.join());
    }
      
  });
  
  
  showQuestion(questions[activeQuestion], activeQuestion);
  window.setTimeout(function(){ window.location = redirectUrlAfterTimeIsOut; },time);
});
