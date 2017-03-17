(function() {

  "use strict";

  var body = document.querySelector('body'),
      isMobile = false,
      scrollTopPosition,
      browserYou,
      swiper4,
      swiper5,
      calendar;
  var genFunc = {

    initialized: false,

    initialize: function() {

      if (this.initialized) return;

      this.initialized = true;

      this.build();
    },

    build: function() {
      // preloader
      this.pagePreloader();
      // browser
      browserYou = this.getBrowser();
      if (browserYou.platform == 'mobile') { isMobile = true;document.documentElement.classList.add('mobile')}else {document.documentElement.classList.add('desktop')}
      if ((browserYou.browser == 'ie')) {document.documentElement.classList.add('ie');}
      if ((browserYou.browser == 'ie' &&  browserYou.versionShort < +'9') || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < +'18') || (browserYou.browser == 'firefox' &&  browserYou.versionShort < +'30')) {
          alert('Обновите браузер','')
      }
      // materialPlagin
      this.materialPlagins();
      // map
      if(document.getElementById('map') !== null) {
        this.mapFunction();
      }
      // swiper
      this.swiperSliders();
      // validate
      this.validateForm();
      // header dropDownFunction
      this.dropDownFunction();
      //appear
      this.appearFunction();
      //menuMobile
      this.menuMobile();
      //sliderRange
      if(document.getElementById('range1') !== null) {
        this.sliderRange();
      }
      //previewCatalog
      this.previewCatalog();
      //inputOnlyNumber
      if(document.querySelector('.js_only_number') !== null) {
        this.inputOnlyNumber();
      }
      //productSlider
      if(document.querySelector('.product-one-slider__thumb') !== null) {
        this.productSlider();
      }
      //testimonialsRange
      if(document.querySelector('.testimonials-item_rating') !== null) {
        this.testimonialsRange();
      }
      //productCalculator
      if(document.querySelector('.change-product-over') !== null) {
        this.productCalculator();
      }
      //changeImages
      if(document.querySelector('.js_prew_images') !== null) {
        this.changeImages();
      }
      //quantityFunc
      if(document.querySelector('.quantity-wrap') !== null) {
        this.quantityFunc();
      }
      //orderFunction
      if(document.querySelector('.order-item') !== null) {
        this.orderFunction();
      }
      //datepickerFunc
      if(document.querySelector('.filter-orders') !== null) {
        this.datepickerFunc();
      }
      this.goToTop();
      this.searchFunction();
    },
    searchFunction: function(){
      function onFocus() {
        document.querySelector('.search_input').focus();
      }
      var searchCont = document.querySelector('.search-container'),
          searchInput = searchCont.getElementsByTagName('input');
      document.querySelector('.js_search').addEventListener('click',function() {
        searchCont.classList.add('active-search');
        setTimeout(function(){
          onFocus();
        },2000)
        return false;
      });
      document.querySelector('.js_cl_search').addEventListener('click',function() {
        searchCont.classList.remove('active-search');
      });
      document.onkeydown = function(evt) {
        if (evt.keyCode == 27) {
          searchCont.classList.remove('active-search');
        }
      }
    },
    goToTop: function(){
      $(document).on('click','.go-to-top',function(){
        $('html, body').animate({scrollTop: 0}, 500);
      });
    },
    datepickerFunc: function(){
      document.querySelector('.js_reset_day').addEventListener('click',function(){
        [].slice.call( document.querySelectorAll('.datepicker')).forEach(function(item,i){
          item.value = '';
          return false;
        });
      });
    },
    orderFunction: function(){
      $('.order-item').each(function(){
        if($(this).find('.order-table-cont .order-row').length > 1){
         $(this).find('.order-table-cont .order-row:gt(0)').hide() 
        } else {
          $(this).find('.js_view_all_order').addClass('hidden-butt');
        }
      });
      $(document).on('click','.js_view_all_order',function(){

        if($(this).hasClass('active')) {
          $(this).parents('.order-item').find('.order-table-cont .order-row:gt(0)').hide() ;
          $(this).removeClass('active');
          
        }else {
          $(this).addClass('active');
          $(this).parents('.order-item').find('.order-table-cont .order-row').show();
        }
      });
    },
    inputOnlyNumber: function(){
      document.querySelector('.js_only_number').addEventListener('input',function(){
        this.value = this.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
      });
    },
    quantityFunc: function(){
      var qty;
      $('.quantity-wrap').find('.quantity').on('input',function(){
        this.value = this.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
      });
      $('.plus-icon').click(function(){
          qty = parseFloat($(this).parents('.quantity-wrap').find('.quantity').val());
          qty = qty + 0.5;
          $(this).parents('.quantity-wrap').find('.quantity').val(qty);
      });

      $('.minus-icon').click(function(){
          qty = parseFloat($(this).parents('.quantity-wrap').find('.quantity').val());
          qty = qty - 0.5;
          if(qty < 1){
            qty = 0;
          }
          $(this).parents('.quantity-wrap').find('.quantity').val(qty);
      });

    
      var totalPrice;
      totalCart()
      $('.js_total_price').text(totalPrice);
      $(document).on('click','.quantity-wrap .fa' ,function(){
        //total price item
        var priceItem = parseInt($(this).parents('.cart-row').find('.cart-col--6').text().replace(/\D+/g,"")),
            col_vo = parseInt($('.quantity').text().replace(/\D+/g,"")),
            totalPrice = 0;
        $(this).parents('.cart-row').find('.js_item_total').text(priceItem * qty )
        totalCart();
      });
      $('.quantity-wrap').find('.quantity').on('blur',function(){
        var priceItem = parseFloat($(this).parents('.cart-row').find('.cart-col--6').text().replace(/\D+/g,"")),
            thisValue = parseFloat($(this).val());
        console.log(priceItem, thisValue)
        $(this).parents('.cart-row').find('.js_item_total').text(priceItem * thisValue )
        totalCart();
      });
      $(document).on('click','.js_remove_item' ,function(){
        $(this).parents('.cart-row').remove();
        totalCart();
        console.log($('.cart-row').length)
        if($('.cart-row').length == 1) {
          $('.cart-container-box').html('<div class="heading-section align-center">Корзина пуста</div>')
        }
      });
      function totalCart() {
        totalPrice = 0;
        $('.js_item_total').each(function(i,item){
          var thisPrice = parseInt($(item).text().replace(/\D+/g,""));
          totalPrice = totalPrice + thisPrice;
        });
        $('.js_total_price').text(totalPrice);
      }
    },
    changeImages:function() {
      document.querySelector('select.js_change_images').onchange = function(){
        var imgSrc = this.selectedOptions[0].getAttribute('data-image-category');
        document.querySelector('.js_prew_images').setAttribute('src',imgSrc);
      };
    },
    productCalculator: function() {
      var totalPrice = 0, elemPrice;
      document.querySelector('.change-product-over table').addEventListener('click',function(e){
        var elem = e.target;        
        if(elem.hasAttribute('data-price')) {
          elemPrice = +(elem.getAttribute('data-price'));
          if(elem.classList.contains('active') == true) {
            elem.classList.remove('active');
            if(totalPrice - elemPrice < 0) {
              totalPrice = 0
            } else {
              totalPrice = totalPrice - elemPrice;
            }
            document.querySelector('.js_total').innerHTML = totalPrice;
          } else {
            elem.classList.add('active');
            totalPrice = totalPrice + elemPrice;
            document.querySelector('.js_total').innerHTML = totalPrice;
          }
        }
      })
    },
    previewCatalog: function() {
      $('.infobar__select-butt').on('click',function(){
        $('.infobar__select-butt').removeClass('active');
        $(this).addClass('active');
        if($(this).hasClass('view-list')) {
          $('.category-container').removeClass('view-table');
          $('.category-container').addClass('view-list');
        }
        if($(this).hasClass('view-table')) {
          $('.category-container').removeClass('view-list');
          $('.category-container').addClass('view-table');
        }
      })
    },
    menuMobile: function(){
      document.addEventListener('click',function(e) {
        if ($(e.target).closest(".head-nav,.hamburger--collapse").length) {
          return
        }
        document.querySelector('.hamburger--collapse').classList.remove('is-active');
        document.querySelector('.head-nav').classList.remove('visible');
      });
      document.querySelector('.hamburger--collapse').addEventListener('click',function(){
        this.classList.toggle('is-active');
        document.querySelector('.head-nav').classList.toggle('visible');
      });
    },
    getBrowser: function() {
      var ua = navigator.userAgent;
      var bName = function () {
          if (ua.search(/Edge/) > -1) return "edge";
          if (ua.search(/MSIE/) > -1) return "ie";
          if (ua.search(/Trident/) > -1) return "ie11";
          if (ua.search(/Firefox/) > -1) return "firefox";
          if (ua.search(/Opera/) > -1) return "opera";
          if (ua.search(/OPR/) > -1) return "operaWebkit";
          if (ua.search(/YaBrowser/) > -1) return "yabrowser";
          if (ua.search(/Chrome/) > -1) return "chrome";
          if (ua.search(/Safari/) > -1) return "safari";
          if (ua.search(/maxHhon/) > -1) return "maxHhon";
      }();
                                                                                                                                                                        
      var version;
      switch (bName) {
          case "edge":
              version = (ua.split("Edge")[1]).split("/")[1];
              break;
          case "ie":
              version = (ua.split("MSIE ")[1]).split(";")[0];
              break;
          case "ie11":
              bName = "ie";
              version = (ua.split("; rv:")[1]).split(")")[0];
              break;
          case "firefox":
              version = ua.split("Firefox/")[1];
              break;
          case "opera":
              version = ua.split("Version/")[1];
              break;
          case "operaWebkit":
              bName = "opera";
              version = ua.split("OPR/")[1];
              break;
          case "yabrowser":
              version = (ua.split("YaBrowser/")[1]).split(" ")[0];
              break;
          case "chrome":
              version = (ua.split("Chrome/")[1]).split(" ")[0];
              break;
          case "safari":
              version = ua.split("Safari/")[1].split("")[0];
              break;
          case "maxHhon":
              version = ua.split("maxHhon/")[1];
              break;
      }
      var platform = 'desktop';
      if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
      var browsrObj;
      try {
          browsrObj = {
              platform: platform,
              browser: bName,
              versionFull: version,
              versionShort: version.split(".")[0]
          };
      } catch (err) {
          browsrObj = {
              platform: platform,
              browser: 'unknown',
              versionFull: 'unknown',
              versionShort: 'unknown'
          };
      }
      return browsrObj;
    },
    heightBlock: function (ell){
      var elem = document.querySelectorAll(ell);
      var maxH = 0;
      for (var i = 0; i < elem.length; ++i) {
        elem[i].style.height = "";
        elem[i].removeAttribute("style");
        if (maxH < elem[i].offsetHeight) {
          maxH = elem[i].offsetHeight; 
        }
        elem[i].style.height = maxH + "px";
      }
    },
    swiperSliders: function(){
      var swiper = new Swiper('.general-slider .swiper-container', {
          loop:true,
          // autoplay: 2000,
          speed: 1500,
          parallax:true,
          slidesPerView: 1,
          nextButton: ".general-slider .swiper-button-next",
          prevButton: ".general-slider .swiper-button-prev",
      });
      var swiper2 = new Swiper('.hit-section-slider .swiper-container', {
          slidesPerView: 4,
          autoplay: 3000,
          speed: 1500,
          nextButton: ".hit-section-slider .swiper-button-next",
          prevButton: ".hit-section-slider .swiper-button-prev",
          spaceBetween: 75,
          breakpoints: {
           1100: {
               slidesPerView: 4,
               spaceBetween: 30
           },
           768: {
               slidesPerView: 3,
               spaceBetween: 30
           },
           640: {
               slidesPerView: 2,
               spaceBetween: 20
           },
           320: {
               slidesPerView: 1,
               spaceBetween: 0
           }
       }
      });
      var swiper3 = new Swiper('.testimonials-slider .swiper-container', {
          loop:true,
          // autoplay: 2000,
          speed: 1500,
          parallax:true,
          slidesPerView: 1,
          nextButton: ".testimonials-slider .swiper-button-next",
          prevButton: ".testimonials-slider .swiper-button-prev",
      });
      var settings = {
        loop:false,
        direction: 'vertical', 
        nextButton: '.product-one-slider__thumb .swiper-button-next',
        prevButton: '.product-one-slider__thumb .swiper-button-prev',
        speed:1000,
        slidesPerView:4,
        breakpoints: {
          767: {
            direction: 'horizontal',
            slidesPerView:3
          },
          600: {
           direction: 'horizontal',
           slidesPerView:2
          }
        }
       },
      swiper4 = new Swiper('.product-one-slider__thumb .swiper-container', settings);
      window.addEventListener('resize',function(){
       if(document.querySelector('.product-one-slider__thumb .swiper-container') != undefined) {
         swiper4.destroy(true, true);
         swiper4 = new Swiper('.product-one-slider__thumb .swiper-container', settings);
       }
      });
      swiper5 = new Swiper('.product-one-slider__img .swiper-container', {
          loop:false,
          speed: 1500,
          slidesPerView: 1,
          simulateTouch: false,
          grabCursor: false,
          centeredSlides: false,
      });
      var swiper6 = new Swiper('.brands-slider', {
          loop:true,
          slidesPerView: 7,
          autoplay: 3000,
          speed: 1000,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          breakpoints: {
           1100: {
               slidesPerView: 6
           },
           768: {
               slidesPerView: 5
           },
           640: {
               slidesPerView: 3
           },
           320: {
               slidesPerView: 1
           }
       }
      });
    },
    pagePreloader: function() {
      window.addEventListener('load',function(){
        setTimeout(function(){body.classList.add('loaded')},500);
        setTimeout(function(){document.querySelector('.preloader').style.display = 'none';},1000);
      })
    },
    validateForm : function(){
      $('.js_validate button[type="submit"]').on("click", function(){
        return validate($(this).parent(".js_validate"));
      }); 
      function validate(form) {
        var error_class = "error";
        var norma_class = "pass";
        var item        = form.find("[required]");
        var e           = 0;
        var reg         = undefined;
        var pass        = form.find('.password').val();
        var pass_1      = form.find('.password_1').val();
        var email       = false;
        var password    = false;
        var phone       = false;
        function mark (object, expression) {
            if (expression) {
                object.parents('.required-field').addClass(error_class).removeClass(norma_class);
                e++;
            } else
                object.parents('.required-field').addClass(norma_class).removeClass(error_class);
        }
        form.find("[required]").each(function(){
            switch($(this).attr("data-validate")) {
                case undefined:
                    mark ($(this), $.trim($(this).val()).length === 0);
                break;
                case "email":
                    email = true;
                    reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    mark ($(this), !reg.test($.trim($(this).val())));
                    email = false;
                break;
                case "phone":
                    phone = true;
                    reg = /[0-9 -()+]{10}$/;
                    mark ($(this), !reg.test($.trim($(this).val())));
                    phone = false;
                break;
                case "pass":
                    password = true;
                    reg = /^[a-zA-Z0-9_-]{6,}$/;
                    mark ($(this), !reg.test($.trim($(this).val())));
                    password = false;
                break;
                case "pass1":
                    mark ($(this), (pass_1 !== pass || $.trim($(this).val()).length === 0));
                break;
                default:
                    reg = new RegExp($(this).attr("data-validate"), "g");
                    mark ($(this), !reg.test($.trim($(this).val())));
                break;
            }
        })
        $('.js_valid_radio').each(function(){
            var inp = $(this).find('input.required');
            var rezalt = 0;
            for (var i = 0; i < inp.length; i++) {
                if ($(inp[i]).is(':checked') === true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
               $(this).addClass(error_class).removeClass(norma_class);
                e=1;
            } else {
                $(this).addClass(norma_class).removeClass(error_class);
            }
        })
        if (e === 0) {
         return true;
        }
        else {
            form.find("."+error_class+" input:first").focus();
            return false;
        }
      }
    },
    materialPlagins: function() {
      //$('input[data-validate="phone"]').mask("+380(99)999 99 99");
      $('input[data-validate="phone"]').intlTelInput({
         nationalMode: false,
         preventInvalidDialCodes: true,
         initialCountry: "auto",
         geoIpLookup: function(callback) {
           $.get('//ipinfo.io', function() {}, "jsonp").always(function(resp) {
             var countryCode = (resp && resp.country) ? resp.country : "";
             callback(countryCode);
             
           });
         }
       }); 
      $('.dropdown-button').dropdown();
      $('ul.tabs').tabs({
        onShow: function(_this){
         var _thisTab = _this.selector.toString();
          if(_thisTab === '#tab3') {
            
            $('.datepicker').glDatePicker({
              showAlways: false,
              dowOffset: 1,
              cssName: 'flatwhite',
            });
          }
        }
      });
      $('select').not('.my_select_box,.rating').material_select();
      $('.collapsible').collapsible();
      $('.modal').modal({
          opacity: 1
      });
    },
    mapFunction: function() {
      var myLatlng = new google.maps.LatLng(51.605270, 4.722437);
      var myCenter = new google.maps.LatLng(51.605270, 4.722437);
      var mapOptions = {
        zoom: 15,
        center: myCenter,
        scrollwheel: false,
        disableDefaultUI: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: 'images/ico-16.png'
      });
    },
    dropDownFunction: function(){
      $('.head-nav li.with-drop').hover(
       function(){
         var drop = $(this);
         $('.header-bottom').find('.drop-menu').removeClass('visible');
         $(drop).find('.drop-menu').show();
         setTimeout(function(){
           $(drop).find('.drop-menu').addClass('visible');
         },300);
       },
       function(){
         $('.header-bottom').find('.drop-menu').hide();
         $('.header-bottom').find('.drop-menu').removeClass('visible');
       }
     );
      if(isMobile == true) {
        $('.with-drop .fa-caret-down').on('click',function() {
          if($(this).parent().find('.drop-menu').hasClass('visible')) {
            $(this).parent().find('.drop-menu').hide()
            $(this).parent().find('.drop-menu').removeClass('visible')
          }else {
            $('.header-bottom').find('.drop-menu').removeClass('visible');
            $(this).parent().find('.drop-menu').show();
            $(this).parent().find('.drop-menu').addClass('visible');
          }
        });
      }
    },
    appearFunction: function() {
      if(isMobile == false) {
        $('.animated').appear(function() {
          var elem = $(this);
          var animation = elem.data('animation');
          if (!elem.hasClass('visible')) {
            var animationDelay = elem.data('animation-delay');
            if (animationDelay) {
              setTimeout(function() {
                  elem.addClass(animation + " visible");
              }, animationDelay);
            } else {
              elem.addClass(animation + " visible");
            }
          }
        },{accX: 0, accY: -250});
      } else {
        $('.animated').each(function(){
          var animation = $(this).data('animation');
          $(this).addClass(animation + " visible");                                                                                                                                                                
        });
      }
    },
    sliderRange: function(){
      var slider = document.getElementById('range1');
        noUiSlider.create(slider, {
          start: [100, 9900],
          connect: true,
          step: 1,
          range: {
            'min': 0,
            'max': 10000
          },
          format: wNumb({
            decimals: 0
          }),
          tooltips: [true, wNumb({ decimals: 0 })],
      });
    },
    productSlider: function(){
      var elem = document.querySelectorAll('.product-one-slider__thumb .swiper-slide');
      for (var i = 0; i < elem.length; i++) {
        elem[i].addEventListener('click',function(){
          var indexSlide = parseInt(this.getAttribute('data-slide') - 1);
          for (var k = 0; k < elem.length; k++) {
            elem[k].classList.remove('active');
          }
          this.classList.add('active');
          swiper5.slideTo(indexSlide);
        });
      }
    },
    testimonialsRange: function(){
      $('.rating').barrating({
         theme: 'fontawesome-stars'
      });
    }
  };

  genFunc.initialize();
  //resize document
  window.addEventListener('scroll',function(){
    scrollTopPosition = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    if(scrollTopPosition > 300) {
      document.querySelector('.go-to-top').classList.add('visible');
    }else {
      document.querySelector('.go-to-top').classList.remove('visible');
    }
  })
  window.addEventListener('resize',function(){

  })
})();
