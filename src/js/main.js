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





  // tabs

  // if (tabs) {
  //   tabs.addEventListener('click', (e) => {
  //     if (e.target.classList.contains('tabs__btn')) {
  //       const tabsPath = e.target.dataset.tabsPath;
  //       tabsHandler(tabsPath);
  //     }
  //   })

  //   const tabsHandler = (path) => {
  //     tabsBtn.forEach(el => {el.classList.remove('tabs__btn-active')})
  //     document.querySelector(`[data-tabs-path="${path}"]`).classList.add('tabs__btn-active')

  //     tabsContent.forEach(el => {el.classList.remove('tabs-content-active')})
  //     document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs-content-active')
  //   }
  // }
