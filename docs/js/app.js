/* Проверка поддержка webp, добавление класса webp или no-webp для HTML */
function isWebp() {
    // Проверка поддержки webp
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onnerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Добавление класса _webp или _no-webp для HTML
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}
let modalItems = {
    call_back: {
        title: "Обратный звонок",
        comment_1: "Оставьте свои контакты и наш менеджер свяжется с вами ближайшее время",
        input: {
            input_1: "Введите имя",
            input_2: "Введите телефон",
        },
        type: {
            input_1: "name",
            input_2: "phone",
        },
        button: "Заказать обратный звонок",
        comment_2: "Нажимая на кнопку “Заказать обратный звонок” вы соглашаетесь с нашей <b>политикой конфиденциальности</b>",
    },
    entry: {
        title: "Вход",
        input: {
            input_1: "Введите E-mail",
            input_2: "Введите пароль",
        },
        type: {
            input_1: "email",
            input_2: "password",
        },
        button: "Войти",
        button_2: "Забыли пароль?",
        question: "Впервые на нашем сайте?",
        button_3: "Зарегистрироваться",
    },
    registration: {
        title: "Регистрация",
        input: {
            input_1: "Введите E-mail",
            input_2: "Введите пароль",
        },
        type: {
            input_1: "email",
            input_2: "password",
        },
        button: "Зарегистрироваться",
        question: "Уже есть аккаунт на нашем сайте?",
        button_3: "Войти",
    },
    recovery: {
        title: "Восстановление пароля",
        input: {
            input_1: "Введите логин или E-mail",
        },
        type: {
            input_1: "email",
        },
        button: "Восстановить пароль",
        comment_2: "Я вспомнил пароль",
    },
}
// Определение устройсва (pc/mob)
 
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
}

const body = document.querySelector('body');
if (isMobile.any()) {
	body.classList.add('_touch');
} else {
	body.classList.add('_pc');
}

//_______________________________________________

// Изменение header при мобильной версии

const logo = document.querySelector('.header__center_logo');
const phone = document.querySelector('.header__center_phone');
const form = document.querySelector('.header__center_form');

let menuHandler = function() {
   $('.header__top_conteiner').append(logo, phone);
   $('.header__top').after(form);
}

if ( $(body).hasClass("body _pc") ) {
	if ($(window).width() > 304 && $(window).width() < 774) { menuHandler(); }

	$(window).on('resize', function() {
		if ($(window).width() > 304 && $(window).width() < 774) {
			menuHandler();
		} else {
			$('.header__center').prepend(logo, form, phone);
		}
	});
} else {
	if ($(window).width() > 320 && $(window).width() < 790) { menuHandler(); }

	$(window).on('resize', function() {
		if ($(window).width() > 320 && $(window).width() < 790) {
			menuHandler();
		} else {
			$('.header__center').prepend(logo, form, phone);
		}
	});
}

//_______________________________________________

// Фиксация header

const header = document.querySelector('.header__bottom');
const topBtn = document.querySelector('.header__top_btn');
const iconBtn = document.querySelector('.header__top_btnIcon');
const sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add('_sticky');
	topBtn.classList.add('_sticky');
	iconBtn.classList.add('_sticky');
  } else {
    header.classList.remove('_sticky');
	topBtn.classList.remove('_sticky');
	iconBtn.classList.remove('_sticky');
  }
}

window.onscroll = function() {myFunction()};

//_______________________________________________

// Выпадающий список для поиcка

$(document).on('click', '.form-select_choice', function() {
	$('.form-select_choiceBtn').toggleClass('_active');
	$('.form-select_items').toggleClass('_active');
});

$(document).on('click', '.form-select_item', function(event) {
	$('.form-select_item').toggleClass('_active');
	$('.form-select_choiceBtn').toggleClass('_active');
	$('.form-select_items').toggleClass('_active');
	$(".form-select_choiceText").text($('#'.concat(event.target.id),'').text());
});

//_________________________________________________

// Выпадающее меню

$(document).on('click', '.header__btn', function() {
	$(body).toggleClass('_scroll');
	$('.header__bottom').toggleClass('_active');
	$('.header__top').toggleClass('_hidden');
	$('.header__btn').toggleClass('_sticky');
	$('.header__btn_btnIcon').toggleClass('_sticky');
});

//_________________________________________________

// Модальное окно

 	// Открытие окна "Обратный звонок"
$(document).on('click', '.header__top_call', function() {
    $('.modal').addClass("_visible");
	let id = $(this).attr("id");
	addItem(id);

	// Маска для номера телефона
	$("#phone").click(function(){
		$(this).setCursorPosition(3);
	}).mask("+7(999) 999-99-99");
});

	// Открытие окна "Вход"
$(document).on('click', '#entry', function() {
	$('.modal__form').html('');
    $('.modal').addClass("_visible");
	let id = $(this).attr("id");
	addItem(id);
});

 	// Открытие окна "Регистрация"
$(document).on('click', '#registration', function() {
	$('.modal__form').html('');
    $('.modal').addClass("_visible");
	let id = $(this).attr("id");
	addItem(id);
});

 	// Открытие окна "Восстановление пароля"
$(document).on('click', '#recovery', function() {
	$('.modal__form').html('');
    $('.modal').addClass("_visible");
	let id = $(this).attr("id");
	addItem(id);
});
  
  	// Закрытие модального окна
$(".modal__close").on("click", function() {
	$(".modal").removeClass("_visible");
	setTimeout(remove, 400);
});	

  	// Закрытие модального окна при клике вне его контентной области
$('.modal').mouseup(function (e) {
	let modalContent = $(".modal__content");
	if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
		$(".modal").removeClass("_visible");
		setTimeout(remove, 400);
	}
});

function remove() {
	$('.modal__form').html('')
}

function addItem(id) {
	$('.modal__form').append('<h2 class="modal__form_header">'.concat(modalItems[id].title,'</h2><div class="modal__form_body"></div>'));

	for (let value in modalItems[id].input) {
		let type;
		if (modalItems[id].type[value] == "name") { type = "text" } else { type = modalItems[id].type[value]};
		$('.modal__form_body').append('<div class="modal__form_item"><label for="'
		    .concat(modalItems[id].type[value],'"></label><input required id="'
			.concat(modalItems[id].type[value],'" type="'.concat(type,'" placeholder="'.concat(modalItems[id].input[value],'">')))));
	};
	
	$('.modal__form_body').append('<input class="modal__form_mainBtn" type="submit" value="'.concat(modalItems[id].button,'">'));

	if (id == 'call_back') {
		$('.modal__form_header').after('<div class="modal__form_comment_1">'.concat(modalItems[id].comment_1),'</div>');
		$('.modal__form_body').after('<div class="modal__form_comment_2">'.concat(modalItems[id].comment_2),'</div>');	
	} else if (id == 'entry') {
		$('.modal__form_body').after('<button class="modal__form_btn" id="recovery">'.concat(modalItems[id].button_2),'</button>');
		$('.modal__form').append('<div class="modal__form_link"><p>'.concat(modalItems[id].question,'</p><button class="modal__form_linkBtn" id="registration">'
		  .concat(modalItems[id].button_3),'</button>'));
	} else if (id == 'registration') {
		$('.modal__form').append('<div class="modal__form_link"><p>'.concat(modalItems[id].question,'</p><button class="modal__form_linkBtn" id="entry">'
		  .concat(modalItems[id].button_3),'</button>'));
	} else if (id == 'recovery') {
		$('.modal__form_body').after('<button class="modal__form_btn" id="entry">'.concat(modalItems[id].comment_2),'</button>');
	}
}

//_________________________________________________

// Маска для номера телефона
$.fn.setCursorPosition = function(pos) {
  if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
  } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};

//_________________________________________________

// Слайдер

$(".slider").slick({

});