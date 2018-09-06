/* emphasis on functional programming - should have a 'Pure function' core ie. all the utility functions that can be reused eg. (showElement) etc.
   this should be surrounded by 'Impure functions' that interact with the outside world ie. functions that reach out and interact with files, databases,
   web services, UI's and so on

   functional programming - there is a complete separation between the data of a program, and the behaviors of a program
                          - all objects created are immutable
                          - shared state is avoided (objects do not share scope with other objects)
                          - the return value only depends on the input
                          - there are no side effects eg. network or dataase calls which could affect the return value
                          - they do not alter the data that was passed into them

   In summation - 'Pure functions' - functional programming forms the core, and 'Impure functions' more specific bespoke functions should surround the core

   The 'Module pattern' is used in this file
*/

window.onload = function () {
  FE.global.init();
  FE.pages.home.init();
  FE.external_utility.init();
  serviceWorker();
};

function serviceWorker() {
  // ServiceWorker is a progressive technology. Ignore unsupported browsers
  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('/service-worker.js').then(function() {
      console.log('CLIENT: service worker registration complete.');
    }, function() {
        console.log('CLIENT: service worker registration failure.');
    });
  } else {
      console.log('CLIENT: service worker is not supported');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if(document.querySelectorAll('#map').length > 0) {
    if(document.querySelector('html').lang) {
      lang=document.querySelector('html').lang;
    } else {
      lang = 'en';
    }

    var js_file_gmaps_api = document.createElement('script');
    js_file_gmaps_api.type = 'text/javascript';
    js_file_gmaps_api.src = 'https://maps.googleapis.com/maps/api/js?callback=FE.pages.home.locationMap&language=' + lang;
    js_file_gmaps_api.async = true;
    js_file_gmaps_api.defer = true;
    document.getElementsByTagName('head')[0].appendChild(js_file_gmaps_api);

    var js_file_gmaps = document.createElement('script');
    js_file_gmaps.type = 'text/javascript';
    js_file_gmaps.src = '../node_modules/gmaps/gmaps.min.js';
    js_file_gmaps.async = true;
    js_file_gmaps.defer = true;
    document.getElementsByTagName('head')[0].appendChild(js_file_gmaps);
  }

  if(document.querySelectorAll('.quote-form__start-end-date-wrapper').length > 0) {
    var js_file_datepicker = document.createElement('script');
    js_file_datepicker.type = 'text/javascript';
    js_file_datepicker.src = '../node_modules/pikaday/pikaday.js';
    js_file_datepicker.async = true;
    js_file_datepicker.defer = true;
    document.getElementsByTagName('head')[0].appendChild(js_file_datepicker);
  }
});

var FE = {

  pages: {
    home: {
      /*
        this function uses the Pikaday plugin, which has been customised for the specific functionality required in this instance
        two instances of Pikaday are used, one to select the start date, and the second to select the end date
        Github repository: https://github.com/dbushell/Pikaday
      */
      datePicker: function() {

        var insertElements = function(element) {

          if(element === 'start') {
            var arrivalText = document.createElement('div');
            arrivalText.className = "arrival-text";
            arrivalText.innerText = "Start on";

            var pikaLendarStart = document.querySelector('.quote-form__start-date-picker .pika-lendar');
            pikaLendarStart.parentNode.insertBefore(arrivalText, pikaLendarStart);

            var arrivalClose = document.createElement('span');
            arrivalClose.className = "ic-close";

            var arrivalTextStart = document.querySelector('.quote-form__start-date-picker .arrival-text');
            arrivalTextStart.parentNode.insertBefore(arrivalClose, arrivalTextStart);
          } else if (element === 'end') {
              var departureText = document.createElement('div');
              departureText.className = "departure-text";
              departureText.innerText = "End on";

              var pikaLendarEnd = document.querySelector('.quote-form__end-date-picker .pika-lendar');
              pikaLendarEnd.parentNode.insertBefore(departureText, pikaLendarEnd);

              var departureClose = document.createElement('span');
              departureClose.className = "ic-close";

              var departureTextEnd = document.querySelector('.quote-form__end-date-picker .departure-text');
              departureTextEnd.parentNode.insertBefore(departureClose, departureTextEnd);
          }

          FE.global.hideElement('.pika-single.quote-form__start-date-picker .ic-close', '.quote-form__start-date-picker', 'fade-in', 'fade-out');
          FE.global.hideElement('.pika-single.quote-form__end-date-picker .ic-close', '.quote-form__end-date-picker', 'fade-in', 'fade-out');
        }

        var dateArray = [];

        var fieldStart = document.querySelector('.quote-form__start-date-wrapper');
        var pickerStart = new Pikaday({
          defaultDate : new Date(),
          setDefaultDate: true,
          numberOfMonths: 4,
          minDate: new Date(),

          onSelect: function(date) {
              var pickedDate = date.getMonth();
              field = moment(pickerStart.toString()).format('MMMM DD YYYY');
              dateArray = field.split(' ');
              var startMonth = document.querySelector('.quote-form__start-month');
              var startDate = document.querySelector('.quote-form__start-date');
              var startYear = document.querySelector('.quote-form__start-year');

              startMonth.innerHTML = dateArray[0];
              startDate.innerHTML = dateArray[1];
              startYear.innerHTML = dateArray[2];

              insertElements('start');

              document.querySelector('.pika-single.quote-form__start-date-picker').classList.remove('fade-in');
              document.querySelector('.pika-single.quote-form__start-date-picker').classList.add('fade-out');

              pickerEnd.setMinDate(new Date(this.getDate().getTime() + parseInt(24*60*60*1000)));
              pickerEnd.setDate(new Date(this.getDate().getTime() + parseInt(24*60*60*1000)));
              pickerEnd.gotoMonth(pickedDate);

          }
        });
        pickerStart.el.classList.add('quote-form__start-date-picker');
        fieldStart.parentNode.insertBefore(pickerStart.el, fieldStart.nextSibling);
        pickerStart.el.classList.add('fade-out');

        FE.global.toggleElement('.quote-form__start-date-box', '.quote-form__start-date-picker', 'fade-in', 'fade-out');

        var fieldEnd = document.querySelector('.quote-form__end-date-wrapper');
        var pickerEnd = new Pikaday({
          defaultDate : new Date(),
          setDefaultDate: true,
          numberOfMonths: 4,
          minDate: new Date(),

          onSelect: function(date) {
              field = moment(pickerEnd.toString()).format('MMMM DD YYYY');
              dateArray = field.split(' ');
              var endMonth = document.querySelector('.quote-form__end-month');
              var endDate = document.querySelector('.quote-form__end-date');
              var endYear = document.querySelector('.quote-form__end-year');

              endMonth.innerHTML = dateArray[0];
              endDate.innerHTML = dateArray[1];
              endYear.innerHTML = dateArray[2];

              insertElements('end');

              document.querySelector('.pika-single.quote-form__end-date-picker').classList.remove('fade-in');
              document.querySelector('.pika-single.quote-form__end-date-picker').classList.add('fade-out');
          }
        });
        pickerEnd.el.classList.add('quote-form__end-date-picker');
        fieldEnd.parentNode.insertBefore(pickerEnd.el, fieldEnd.nextSibling);
        pickerEnd.el.classList.add('fade-out');

        insertElements('start');
        insertElements('end');

        FE.global.toggleElement('.quote-form__end-date-box', '.quote-form__end-date-picker', 'fade-in', 'fade-out');
      },

      glideSlider: function() {
        new Glide('.glide', {
          type: 'carousel',
          startAt: 0,
          perView: 1,
          gap: 0,
          transitionType: 'fade',
        }).mount();
      },

      locationMap: function() {
        var mapObj = new GMaps({
          el: '#map',
          lat: 51.492807,
          lng: -0.194050,
          click: function(e) {
            console.log('You clicked on the map');
          },
        });
        var m = mapObj.addMarker({
          lat: 51.492807,
          lng: -0.194050,
          title: 'Earls Court',
          infoWindow: {
            content: '<h5>Earls Court</h5><div>London, United Kingdom</div>',
            maxWidth: 200
          },
        });
        var gc = GMaps.geocode({
          address: 'Earls Court, United Kingdom',
          callback: function(results, status) {
            if(status == 'OK') {
              latlng = results[0].geometry.location;
              mapObj.setCenter(latlng.lat(), latlng.lng());
            } else if(status == 'ZERO_RESULTS') {
                alert('Sorry, no results found');
            }
          }
        });
        var path = [
          [51.491811, -0.200787],
          [51.494870, -0.189585],
          [51.490662, -0.186239],
          [51.487670, -0.195616]
        ];
        var pg = mapObj.drawPolygon({
          paths: path,
          strokeColor: '#f20707',
          strokeOpacity: 0.3,
          strokeWeight: 2,
          fillColor: '#00e676',
          fillOpacity: 0.4,
          mouseover: function(e) {

          }
        });
        var mc_gc = mapObj.addControl({
          position: 'top_right',
          content: 'Reload',
          style: {
            margin: '5px',
            padding: '1px 6px',
            border: 'solid 1px #717B87',
            background: '#fff'
          },
          events: {
            click: function(e) {
              FE.pages.home.locationMap();
            }
          }
        });
        var mc_gl = mapObj.addControl({
          position: 'top_right',
          content: 'Geolocate',
          style: {
            margin: '5px',
            padding: '1px 6px',
            border: 'solid 1px #717B87',
            background: '#fff'
          },
          events: {
            click: function(e) {
              GMaps.geolocate({
                success: function(position) {
                  console.log('success');
                  mapObj.setCenter(position.coords.latitude, position.coords.longitude);
                },
                error: function(error) {
                  console.log('error');
                  alert('Geolocation failed: ' + error.message);
                },
                not_supported: function() {
                  console.log('not supported');
                  alert("Your browser does not support geolocation");
                },
                always: function() {
                    console.log('always');
                }
              });
            }
          }
        });
      },

      /*
        script for lazy loading and multi-serving images (multi-serving images - you can switch the images served to the user depending on device size)
      */
      lazyLoad: function() {
        var bLazy = new Blazy({
          // optional - specify other than default property values here
          container: '.glide__slides'
        });
      },

      init: function () {
        if (document.querySelectorAll('.quote-form__start-end-date-wrapper').length > 0) {
            FE.pages.home.datePicker();
        }
        FE.pages.home.glideSlider();
        //FE.pages.home.locationMap();
        FE.pages.home.lazyLoad();
      }

    }
  },

  external_utility: {

    handleInview: function() {
      var arrElements = [{
          element: '.main-information__cover-type'
        },
        {
          element: '.glide__headline'
        },
        {
          element: '.insurance-types__headline'
        },
        {
          element: '.insurance-types__box'
        },
        {
          element: '.location__title'
        },
        {
          element: '#map'
        },
        {
          element: '.faq-accordion__title'
        },
      ];

      for (var i = 0; i < arrElements.length; i++) {
        if (document.querySelectorAll(arrElements[i].element).length > 0) {
          inView(arrElements[i].element)
            .on('enter', section => {
              section.classList.add('is-inview');
            });
        }
      }
      arrElements.splice(0, arrElements.length);
    },

    init: function () {
      FE.external_utility.handleInview();
    }

  },

  global: {

    /*
      pass an arguement containing the CSS reference to the Node or Nodes to be selected
    */
    selectElements: function(elementToSelect) {
      var selectedElement = document.querySelector(elementToSelect);
      var selectedElements = document.querySelectorAll(elementToSelect);

      if(selectedElements.length > 1) {
        return selectedElements;
      } else if (selectedElements.length === 1) {
        return selectedElement;
      }
    },

    /*
      hide an element after a specified period of time
    */
    removeElementTimeout: function(elementToRemove, timeDelay, hideStyle) {
      var elemToRemove = document.querySelector(elementToRemove);

      setTimeout( function() {
        elemToRemove.classList.add(hideStyle);
      }, timeDelay);
    },

    /*
      toggle the visiblity of an element based on the click of another element,
      depending on it's initial state ie. (if its visible or hidden)
    */
    toggleElement: function(clickedElement, elementToToggle, showStyle, hideStyle) {
      var clickedElem = document.querySelector(clickedElement);
      var elemToToggle = document.querySelector(elementToToggle);

      elemToToggle.classList.add(hideStyle);
      clickedElem.addEventListener('click', function(event) {
        if(elemToToggle.classList.contains(hideStyle)) {
            elemToToggle.classList.remove(hideStyle);
            elemToToggle.classList.add(showStyle);
        } else {
            elemToToggle.classList.remove(showStyle);
            elemToToggle.classList.add(hideStyle);
        }
      });
    },

    /*
      hide an element based on the click of any specified element. If the element to hide
      is a child of the clicked element it can hide it, also if is located anywhere else in
      the document tree it can hide it
    */
    hideElement: function(clickedElement, elementToHide, showStyle, hideStyle) {
      var clickedElem = document.querySelectorAll(clickedElement);
      var elemToHide;

      clickedElem.forEach(function(elem) {
        elem.addEventListener('click', function(event) {
          console.log('whoop');
          if(this.querySelector(elementToHide)) {
            elemToHide = this.querySelector(elementToHide);
            elemToHide.classList.remove(showStyle);
            elemToHide.classList.add(hideStyle);
          } else {
              elemToHide = document.querySelector(elementToHide);
              elemToHide.classList.remove(showStyle);
              elemToHide.classList.add(hideStyle);
          }
        });
      });
    },

    /*
      show an element based on the click of any specified element
    */
    showElement: function(clickedElement, elementToShow, showStyle, hideStyle) {
      var clickedElem = document.querySelectorAll(clickedElement);
      var elemToShow;

      clickedElem.forEach(function(elem) {
        elem.addEventListener('click', function(event) {
          if(this.querySelector(elementToShow)) {
            elemToShow = this.querySelector(elementToShow);
            elemToShow.classList.remove(hideStyle);
            elemToShow.classList.add(showStyle);
          } else {
            elemToShow = document.querySelector(elementToShow);
            elemToShow.classList.remove(hideStyle);
            elemToShow.classList.add(showStyle);
          }
        });
      });
    },

    /*
      toggle child element based on the click of it's parent element
    */
    toggleChildElement: function(clickedElement, elementToToggle, showStyle, hideStyle) {
      var clickedElem = document.querySelectorAll(clickedElement);
      var elemToToggle;

      clickedElem.forEach(function(elem) {
        elem.addEventListener('click', function(event) {
          elemToToggle = this.querySelector(elementToToggle);
          if(elemToToggle.classList.contains(hideStyle)) {
            elemToToggle.classList.remove(hideStyle);
            elemToToggle.classList.add(showStyle);
          } else {
            elemToToggle.classList.remove(showStyle);
            elemToToggle.classList.add(hideStyle);
          }
        });
      });
    },

    /*
      rotate an element by a specified number of degrees
    */
    rotateElement: function(clickedElement, elementToRotate, rotateDirection) {
      var clickedElem = document.querySelectorAll(clickedElement);
      var elemToRotate;

      clickedElem.forEach(function(elem) {
        elem.addEventListener('click', function() {
          elemToRotate = this.querySelector(elementToRotate);
          if(elemToRotate.classList.contains(rotateDirection)) {
            elemToRotate.classList.remove(rotateDirection);
          } else {
              elemToRotate.classList.add(rotateDirection);
          }
        });
      });
    },


    /*
      update the inner text of another element with the inner text of the clicked element
    */
    changeHTML: function(selectedElements, elementToUpdate) {
      var getElements = document.querySelectorAll(selectedElements);
      var selectElements = document.querySelector(elementToUpdate);

      getElements.forEach(function(elem) {
        elem.addEventListener('click', function(event) {
          event.preventDefault();
          var contentSelected = this.innerText;
          selectElements.innerText = contentSelected;
        });
      });
    },

    /*
      reuseable accordion component - click and reveal
    */
    accordion: function() {
      var accordion = document.querySelectorAll('.faq-accordion');
      if(accordion.length > 0) {
        var accordionHeader = document.querySelectorAll('.faq-accordion__header');
        var accordionOpen;
        var activeHeader;

        accordionHeader.forEach(function(elem) {
          elem.addEventListener('click', function(event) {
            activeHeader = document.querySelector('.faq-accordion__header.is-active');
            accordionOpen = document.querySelector('.faq-accordion__content.slide-down');

            activeHeader.classList.remove('is-active');
            this.classList.add('is-active');
            accordionOpen.classList.remove('slide-down');
            accordionOpen.classList.add('slide-up');
            this.nextElementSibling.classList.add('slide-down');
          });
        });
      }
    },

    /*
      initializes all the global functions
    */
    init: function () {
      // hide preloader after specifed amount of time
      FE.global.removeElementTimeout('.preloader', 2000, 'fade-out');

      // toggle the quote form fields
      FE.global.toggleElement('.quote-form__button', '.quote-form__fields', 'slide-down', 'slide-up');

      // toggle the residency popover
      FE.global.toggleElement('.quote-form__residency-select', '.quote-form__residency-popover', 'fade-in', 'fade-out');

      // close residency popover when 'X' icon in top right is clicked
      FE.global.toggleElement('.quote-form--residency-popover-intro .ic-close', '.quote-form__residency-popover', 'fade-in', 'fade-out');

      // update HTML text content of the resdency select element based on the country name selected in residency popover
      FE.global.changeHTML('.quote-form__country-name', '.quote-form__residency-select span');

      // hide residency popover when a country is selected
      FE.global.hideElement('.quote-form__country-name', '.quote-form__residency-popover', 'fade-in', 'fade-out');

      // mobile nav menu functionality
      FE.global.hideElement('.ic-menu', '.ic-menu', 'fade-in', 'fade-out');
      FE.global.showElement('.ic-menu', '.ic-close', 'fade-in', 'fade-out');
      FE.global.showElement('.ic-menu', '.mobile-menu', 'fade-in', 'fade-out');
      FE.global.hideElement('.ic-close', '.ic-close', 'fade-in', 'fade-out');
      FE.global.hideElement('.ic-close', '.mobile-menu', 'fade-in', 'fade-out');
      FE.global.showElement('.ic-close', '.ic-menu', 'fade-in', 'fade-out');
      FE.global.toggleChildElement('.mobile-menu__nav-item-title', '.mobile-menu__drop-sub', 'slide-down', 'slide-up');
      FE.global.rotateElement('.mobile-menu__nav-item-title', '.mobile-menu__slide-up-down-arrow', 'rotate-right');
      FE.global.accordion();

    }

  }

};
