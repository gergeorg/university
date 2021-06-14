
  // map

  ymaps.ready(init);
  function init(){
    var myMap = new ymaps.Map("map", {
      center: [53.51148807097356,49.4163145],
      zoom: 17
    });

    var myPlacemark = new ymaps.Placemark([53.51148807097356,49.4163145], {}, {
      iconLayout: 'default#image',
      // iconImageHref: 'img/placemark.svg',
      iconImageSize: [28, 40],
      iconImageOffset: [-3, -42]
    });

  myMap.geoObjects.add(myPlacemark);
  }
