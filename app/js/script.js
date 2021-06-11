document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,

    breakpoints: {

      1440: {
        slidesPerView: 6,
      }
    }
  });

	const accordions = document.querySelectorAll('.accordion__item');

	accordions.forEach(el => {
		el.addEventListener('click', (e) => {
			const self = e.currentTarget;
			const control = self.querySelector('.accordion__control');
			const content = self.querySelector('.accordion__content');

			self.classList.toggle('open');

			// если открыт аккордеон
			if (self.classList.contains('open')) {
				control.setAttribute('aria-expanded', true);
				content.setAttribute('aria-hidden', false);
				content.style.maxHeight = content.scrollHeight + 'px';
			} else {
				control.setAttribute('aria-expanded', false);
				content.setAttribute('aria-hidden', true);
				content.style.maxHeight = null;
			}
		});
	});

  const filterMobile = document.querySelector('.filter-mobile')
  const filter = document.querySelector('.filter')

  filterMobile.addEventListener('click', () => {
    filter.classList.toggle('filter-active')
  })


});
