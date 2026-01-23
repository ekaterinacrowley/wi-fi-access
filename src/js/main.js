
document.addEventListener('DOMContentLoaded', function () {
	if (typeof Swiper === 'undefined') return;

	new Swiper('.locations-block__list.swiper', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		watchOverflow: false,
		navigation: {
			nextEl: '.locations-block__next',
			prevEl: '.locations-block__prev',
		},
		grabCursor: true,
	});
});

document.addEventListener('DOMContentLoaded', function () {
	const headerNavIcon = document.querySelector('.header__nav-icon');
	const headerContent = document.querySelector('.header__content');
	const header = document.querySelector('.header');

	if (headerNavIcon && headerContent) {
		headerNavIcon.addEventListener('click', function (e) {
			e.preventDefault();
			console.log('Clicked nav icon');
			header.classList.toggle('header--open');
			headerContent.classList.toggle('header__content--open');
			headerNavIcon.classList.toggle('header__nav-icon--open');
		});
	} else {
		console.warn('Nav icon or content not found');
	}

		// Close mobile menu when any nav item is clicked
		const navItems = document.querySelectorAll('.header__content .nav__item');
		if (navItems && navItems.length) {
			navItems.forEach(function (item) {
				item.addEventListener('click', function () {
					header.classList.remove('header--open');
					headerContent.classList.remove('header__content--open');
					headerNavIcon.classList.remove('header__nav-icon--open');
				});
			});
		}
});