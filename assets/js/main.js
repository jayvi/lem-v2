var isSafari = window.safari !== undefined;
var mediaQueries = {
  sm: window.matchMedia('(min-width: 576px)'),
  md: window.matchMedia('(min-width: 768px)'),
  lg: window.matchMedia('(min-width: 992px)'),
  xl: window.matchMedia('(min-width: 1200px)'),
};
var isScrolling;
var interactionDisabled = !1;
let mouse = { x: 0, y: 0 };
var breakpointChecker = function () {
  console.log(
    mediaQueries.md.matches
      ? 'desktop — bigger than 768px'
      : 'mobile — smaller than 768px'
  );
};
let swup;
var coverDrag;
var customCursor;
var textWave;
var footerWave;
var smalllWave;
var whatWeDo;
var genericBlobs;
var lastScrollTop;
var st;
jQuery(document).ready(function ($) {
  'use strict';
  if (!jQuery('body').hasClass('is-mobile')) {
    swup = new Swup({
      animateScroll: !0,
      cache: !0,
      preload: !0,
      animationSelector: '[class*="swup-transition-"]',
      linkSelector: [
        'a[href^="' + themeVars.siteUrl + '"]:not([data-no-swup])',
        'a[href^="#"]:not([data-no-swup])',
      ].join(', '),
    });
    jQuery(document).on('swup:pageView', initPageThings);
  }
  initPageThings();
});
function initPageThings() {
  jQuery(document).off('click', '.nav-toggle');
  jQuery(document).off('click', '.filters-toggle');
  jQuery(document).off('click', '.collapsible-vertical-toggle');
  jQuery(document).off('mouseover', '.collapsible-vertical-hover');
  jQuery(document).off('mouseleave', '.collapsible-vertical-hover');
  jQuery(window).off('scroll');
  jQuery(window).on('scroll', function () {
    st = jQuery(this).scrollTop();
    if (
      st > jQuery(window).height() &&
      jQuery(document).height() > jQuery(window).height() * 3 &&
      !jQuery('body').hasClass('mobile-body')
    ) {
      if (st > lastScrollTop) {
        if (!jQuery('#sticky-header').hasClass('disabled')) {
          jQuery('#sticky-header').addClass('disabled');
        }
      } else {
        if (jQuery('#sticky-header').hasClass('disabled')) {
          jQuery('#sticky-header').removeClass('disabled');
        }
      }
    } else {
      if (!jQuery('#sticky-header').hasClass('disabled')) {
        jQuery('#sticky-header').addClass('disabled');
      }
    }
    lastScrollTop = st;
  });
  if (
    !jQuery('body').hasClass('is-mobile') ||
    (jQuery('body').hasClass('is-mobile') && jQuery(window).width() > 900)
  ) {
    window.addEventListener(
      'scroll',
      function (event) {
        interactionDisabled = !0;
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function () {
          interactionDisabled = !1;
        }, 50);
      },
      !1
    );
    (function () {
      let morphs = [
        'M395,222.9c0,101.9-92.5,163.5-194.4,163.5S5,314.9,5,213S137.1,13.6,239,13.6S395,121,395,222.9z',
        'M389.5,188.9c0,101.9-98.7,194.4-200.6,194.4S10.5,290.8,10.5,188.9S86.9,16.7,188.9,16.7S389.5, 86.9, 389.5, 188.9z',
        'M400,245.8C400,347.7,317.4,382,215.5,382S0,326.7,0,224.8S113.6,18,215.5,18S400,143.9,400,245.8z',
      ];
      gsap.registerPlugin(MorphSVGPlugin);
      document.querySelectorAll('.button-morph').forEach((el) => {
        let tl = gsap.timeline({ yoyo: !0, paused: !0, repeat: -1 });
        let tempMorphs = gsap.utils.shuffle(morphs);
        let p = el.querySelector('path');
        tempMorphs.forEach((shape) => {
          tl.add(
            gsap.to(p, {
              ease: 'linear',
              duration: 1.5,
              morphSVG: { type: 'rotational', shape },
            })
          );
        });
        tl.play();
        gsap.to(el, { autoAlpha: 1, duration: 0.5 });
      });
      document.querySelectorAll('[cursor-magnetic]').forEach((el) => {
        var hover = !1;
        var offsetHoverMax = 1;
        var offsetHoverMin = 0.75;
        window.addEventListener('mousemove', (e) => {
          var hoverArea = hover ? offsetHoverMax : offsetHoverMin;
          var cursor = { x: e.clientX, y: e.clientY };
          var rect = el.getBoundingClientRect();
          var width = rect.width;
          var height = rect.height;
          var elPos = {
            x: rect.left + width * 0.5,
            y: rect.top + height * 0.5,
          };
          var x = cursor.x - elPos.x;
          var y = cursor.y - elPos.y;
          var dist = Math.sqrt(x * x + y * y);
          var mutHover = !1;
          if (dist < width * hoverArea) {
            mutHover = !0;
            if (!hover) {
              hover = !0;
            }
            onHover(x, y);
          }
          if (!mutHover && hover) {
            onLeave();
            hover = !1;
          }
        });
        var onHover = function (x, y) {
          gsap.to(el.querySelector('svg'), {
            duration: 0.8,
            x: x * 0.8,
            y: y * 0.8,
            rotation: x * 0.05,
            ease: 'power2.easeOut',
          });
        };
        var onLeave = function () {
          gsap.to(el.querySelector('svg'), {
            duration: 0.8,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            ease: 'elastic.out(1.1, 0.4)',
          });
        };
      });
    })();
    coverDrag = new CoverDrag();
    genericBlobs = new Blobs();
    customCursor = new CustomCursor();
    textWave = new TextWave();
    footerWave = new SvgWave({
      el: document.querySelector('svg.footer-wave path'),
      duration: 15,
      waves: 3,
    });
    smalllWave = new SvgWave({
      el: document.querySelector('svg.small-wave path'),
      duration: 16,
      waves: 8,
    });
    whatWeDo = new ImagesWWD();
    let textPaths = document.querySelectorAll('.trigger-next-question');
    if (textPaths.length) {
      textPaths.forEach((el) => {
        let trigger = el;
        let options = { trigger },
          textInPath = new TextInPath(options);
      });
    }
    let wavePathItem = document.querySelectorAll('.trigger-wave-path-item');
    if (wavePathItem.length) {
      wavePathItem.forEach((el) => {
        new WavePathItem(el);
      });
    }
    const animate = () => {
      requestAnimationFrame(animate);
      if (!jQuery('body').hasClass('is-mobile')) {
        customCursor.render();
      }
      coverDrag.updateTail();
      whatWeDo.updateTail();
      genericBlobs.render();
    };
    animate();
  }
  ScrollReveal().reveal('.fadein', {
    duration: 800,
    delay: 0,
    interval: 20,
    origin: 'bottom',
    distance: '50px',
    opacity: 0,
    viewFactor: 0,
  });
  jQuery(document).on('click', '.advisory-toggle', function () {
    jQuery('.advisory-item').removeClass('clip');
    jQuery(this).hide();
  });
  jQuery(document).on('click', '.nav-toggle', function () {
    jQuery('body').toggleClass('menu-opened');
    jQuery('#mob-nav').toggleClass('opacity-0 pointer-events-none');
  });
  jQuery(document).on('click', '.filters-toggle', function () {
    jQuery(this).parent().find('ul').slideToggle();
    jQuery(this).find('.large-plus').toggleClass('hidden');
    jQuery('.filter-title').toggleClass('text-lightgrey');
  });
  jQuery(document).on('click', '.collapsible-vertical-toggle', function () {
    jQuery(this).parent().find('.collapsible-vertical').slideToggle();
    jQuery(this).parent().find('.icon').toggleClass('clip');
    if (jQuery('line.plus').css('visibility') == 'hidden') {
      jQuery('line.plus').css('visibility', 'inherit');
      jQuery('line.plus').css('opacity', '1');
      jQuery('line.minus').css('visibility', 'inherit');
      jQuery('line.minus').css('opacity', '1');
    } else {
      jQuery('line.minus').css('visibility', 'inherit');
      jQuery('line.minus').css('opacity', '1');
      jQuery('line.plus').css('visibility', 'hidden');
      jQuery('line.plus').css('opacity', '0');
    }
    if (jQuery(this).parent().attr('cursor-stat') == 'plus') {
      jQuery(this).parent().attr('cursor-stat', 'minus');
    } else {
      if (jQuery(this).parent().attr('cursor-stat') == 'minus') {
        jQuery(this).parent().attr('cursor-stat', 'plus');
      }
    }
  });
  var currentI;
  var currentO;
  if (!jQuery('body').hasClass('is-mobile')) {
    jQuery(document).on(
      'mouseover',
      '.collapsible-vertical-hover',
      function () {
        if (!interactionDisabled) {
          currentI = jQuery(this);
          if (currentI.find('.collapsible-vertical').css('display') == 'none') {
            jQuery('.collapsible-vertical').slideUp();
            currentI.find('.collapsible-vertical').slideDown();
          }
        }
      }
    );
    jQuery(document).on(
      'mouseleave',
      '.collapsible-vertical-hover',
      function () {
        currentO = jQuery(this);
        if (currentO.find('.collapsible-vertical').css('display') != 'none') {
          currentO.find('.collapsible-vertical').slideUp();
        }
      }
    );
    var current;
    jQuery('#news, #events').hover(
      function () {
        jQuery('#custom-cursor text').css('fill', '#ffffff');
      },
      function () {
        jQuery('#custom-cursor text').css('fill', '#000000');
      }
    );
  } else {
    jQuery(document).on('click', '.collapsible-vertical-hover', function () {
      jQuery(this).find('.collapsible-vertical').slideToggle();
      jQuery(this).find('.icon').toggleClass('clip');
    });
  }
  if (!jQuery('body').hasClass('is-mobile')) {
    jQuery('.collapsible-horizontal').hover(
      function () {
        current = jQuery(this);
        jQuery('.collapsible-horizontal').removeClass('active current');
        jQuery(this).addClass('active');
        current.addClass('current');
      },
      function () {
        jQuery('.collapsible-horizontal').not('.current').removeClass('active');
      }
    );
  }
  var swiper = new Swiper('.swiper-flip-container', {
    slidesPerView: 1,
    effect: 'flip',
    flipEffect: { rotate: 30, slideShadows: !1 },
    loop: !0,
    navigation: { nextEl: '.swiper-next' },
  });
  if (!jQuery('body').hasClass('is-mobile')) {
    var aboutSwiper = new Swiper('.swiper-overflow-container', {
      slidesPerView: 'auto',
    });
  }
  var aboutSwiper = new Swiper('.swiper-programm-container', {
    slidesPerView: 1,
    autoHeight: !0,
    pagination: { el: '.swiper-pagination' },
  });
  initMarquees();
  function initMarquees() {
    jQuery('.marquee ').each(function () {
      var element = jQuery(this).find('.marquee-child');
      jQuery(this).css('width', element.width() * 5);
      element.addClass('animate-nohover');
      for (var i = 0; i < 4; i++) {
        element.clone().insertAfter(element);
      }
    });
  }
}
class CustomCursor {
  constructor() {
    gsap.registerPlugin(MorphSVGPlugin);
    this.stats = !0;
    this.currentStat = 'default';
    this.statTransition = !1;
    this.statTransitionDuration = 0.5;
    this.cursor = document.getElementById('custom-cursor');
    this.allPieces = document.querySelectorAll('.cursor-tail');
    this.allPiecesPath = document.querySelectorAll('.cursor-tail path');
    if (this.cursor === undefined || this.cursor === null) return;
    this.inner = this.cursor.getElementById('inner');
    this.text = this.cursor.querySelector('text');
    this.minus = this.cursor.querySelector('.minus');
    this.plus = this.cursor.querySelector('.plus');
    this.arrow = this.cursor.querySelector('.arrow');
    this.circle = this.cursor.querySelector('.circle');
    this.slide = this.cursor.querySelector('.slide');
    this.drag = this.cursor.querySelector('.drag');
    this.sizes = {
      x: this.cursor.getBoundingClientRect().width / 2,
      y: this.cursor.getBoundingClientRect().height / 2,
    };
    this.offsets = { inner: 0.9, pieces: [0.45, 0.3, 0.25, 0.2] };
    this.gravity = { el: null, active: !1, x: 0, y: 0 };
    this.piecesPositions = [];
    this.allPieces.forEach((el) => {
      let item = { prevX: 0, prevY: 0 };
      this.piecesPositions.push(item);
    });
    this.innerPiecePosition = { prevX: 0, x: 0, prevY: 0, y: 0 };
    this.previousMouse = { x: 0, y: 0 };
    this.morphs = {
      default: [
        'M30.4,19.6c0,7.7-6.3,10.4-14,10.4S0,25.8,0,18S8.6,2.3,16.4,2.3S30.4,11.9,30.4,19.6z',
        'M29.6,15.3c0,7.7-7.5,14.8-15.2,14.8s-13.6-7-13.6-14.8S6.6,2.2,14.4,2.2S29.6,7.6,29.6,15.3z',
        'M30,17.9c0,7.7-7,12.4-14.8,12.4S0.4,24.9,0.4,17.2S10.4,2,18.2,2S30,10.2,30,17.9z ',
      ],
    };
    this.mouseStill;
    this.stat = { active: !1, prevActive: !1 };
    this.color = '#58FFB8';
    this.MathUtils = { lerp: (a, b, n) => (1 - n) * a + n * b };
    this.continuousTl = '';
    this.continuousAnimation();
    this.changeStat(this.currentStat, null);
    this.bind();
    this.bindStats();
    this.changeColor();
    this.showCursor();
  }
  continuousAnimation() {
    let pieces = gsap.utils.toArray(this.allPiecesPath);
    pieces.unshift(this.inner);
    this.continuousTl = gsap.timeline({ paused: !0, repeat: -1, yoyo: !0 });
    this.continuousTl.add(
      gsap.to(pieces, {
        ease: 'linear',
        duration: 0.5,
        morphSVG: {
          type: 'rotational',
          shape:
            'M30,15.4c0,8.2-6.6,14.8-14.8,14.8S0.4,23.6,0.4,15.4S7,0.6,15.2,0.6S30,7.2,30,15.4z',
        },
      })
    );
    this.morphs.default.forEach((shape) => {
      this.continuousTl.add(
        gsap.to(pieces, {
          ease: 'linear',
          duration: 1.5,
          morphSVG: { type: 'rotational', shape },
        })
      );
    });
  }
  updateGravity() {
    if (!this.gravity.active) return;
    this.gravity.x =
      this.gravity.el.getBoundingClientRect().x +
      this.gravity.el.getBoundingClientRect().width / 2;
    this.gravity.y =
      this.gravity.el.getBoundingClientRect().y +
      this.gravity.el.getBoundingClientRect().height / 2;
  }
  showCursor() {
    gsap.to([this.cursor, this.allPieces], { duration: 0.3, autoAlpha: 1 });
  }
  hideCursor() {
    gsap.to([this.cursor, this.allPieces], { duration: 0.3, autoAlpha: 0 });
  }
  changeColor() {
    let pieces = gsap.utils.toArray(this.allPiecesPath);
    pieces.unshift(this.inner);
    gsap.to(pieces, {
      attr: { fill: this.color },
      duration: 0.3,
      ease: 'power1.inOut',
    });
  }
  findColor(el) {
    if (el.tagName === 'body') return !1;
    const stat = el.getAttribute('cursor-color');
    if (stat != null && stat != undefined) {
      if (stat === this.color) return !1;
      this.color = stat;
      this.changeColor();
      return;
    } else {
      return this.findColor(el.closest('[cursor-color]'));
    }
  }
  bind() {
    let _this = this;
    _this.initTimeout(_this);
    window.addEventListener('mousemove', (ev) => {
      mouse.x = ev.clientX;
      mouse.y = ev.clientY;
    });
  }
  initTimeout(_this) {
    // _this.mouseStill = setTimeout(() => {
    //   _this.stat.active = !1;
    // }, 3000);
  }
  stopTimeout(_this) {
    clearTimeout(_this.mouseStill);
  }
  bindStats() {
    let _this = this;
    document.querySelectorAll('[cursor-stat], [cursor-color]').forEach((el) => {
      el.addEventListener('mousemove', (ev) => {
        if (this.statTransition) return;
        if (!this.allowFind) return;
        this.allowFind = !1;
        this.findStat(
          ev.target.hasAttribute('cursor-stat')
            ? ev.target
            : ev.target.closest('[cursor-stat]')
        );
        this.findColor(
          ev.target.hasAttribute('cursor-color')
            ? ev.target
            : ev.target.closest('[cursor-color]')
        );
      });
      window.addEventListener('scroll', (ev) => {
        if (this.currentStat !== 'default') {
          _this.changeStat('default');
        }
      });
    });
  }
  changeStat(stat, t = !1) {
    this.currentStat = stat;
    this.statTransition = !0;
    let pieces = gsap.utils.toArray(this.allPiecesPath);
    pieces.unshift(this.inner);
    gsap.to(
      [
        this.text,
        this.minus,
        this.plus,
        this.arrow,
        this.circle,
        this.drag,
        this.slide,
      ],
      {
        scale: 0,
        overwrite: 'all',
        autoAlpha: 0,
        duration: this.statTransitionDuration / 4,
        transformOrigin: 'center',
        ease: 'power1.out',
        onComplete: () => {
          this.continueAnimation(pieces, stat, t);
        },
      }
    );
  }
  continueAnimation(pieces, stat, t) {
    if (t !== null) this.text.innerHTML = t;
    if (t === null) this.text.innerHTML = '';
    if (t == 'false') this.text.innerHTML = '';
    if (t == !1) this.text.innerHTML = '';
    if (this.currentStat === 'default') {
      gsap.to(pieces, {
        scale: 1,
        overwrite: 'all',
        duration: this.statTransitionDuration,
        transformOrigin: 'center',
        ease: 'power1.out',
        onComplete: () => {
          this.statTransition = !1;
        },
      });
      this.continuousTl.progress(0);
      this.continuousTl.pause(0);
      return;
    }
    if (this.currentStat === 'hover' || this.currentStat === 'hover-xl') {
      gsap.to(this.text, {
        scale: 1,
        autoAlpha: 1,
        duration: this.statTransitionDuration,
        transformOrigin: 'center',
        ease: 'power1.out',
      });
      gsap.to(pieces, {
        scale: function () {
          if (t !== null) {
            let c = 4.2 * t.length,
              cc = 10,
              total = c / cc;
            return total > 6 ? 6 : total <= 2 ? 2 : total;
          } else {
            return 1.5;
          }
        },
        transformOrigin: 'center',
        duration: this.statTransitionDuration * 1.5,
        ease: 'bounce.out',
        onComplete: () => {
          this.statTransition = !1;
        },
      });
      this.continuousTl.play(0);
      return;
    }
    if (this.currentStat === 'minus' || this.currentStat === 'plus') {
      gsap.to(pieces, {
        scale: 2,
        transformOrigin: 'center',
        duration: this.statTransitionDuration * 2,
        ease: 'elastic.out',
        onComplete: () => {
          this.statTransition = !1;
        },
      });
      gsap.to(
        this.currentStat == 'minus' ? this.minus : [this.minus, this.plus],
        {
          scale: 1,
          autoAlpha: 1,
          duration: this.statTransitionDuration,
          transformOrigin: 'center',
          ease: 'power1.out',
        }
      );
      this.continuousTl.progress(0);
      this.continuousTl.pause(0);
      return;
    }
    if (this.currentStat === 'arrow') {
      gsap.to(pieces, {
        scale: 2,
        transformOrigin: 'center',
        duration: this.statTransitionDuration * 2,
        ease: 'elastic.out',
        onComplete: () => {
          this.statTransition = !1;
        },
      });
      gsap.to(this.arrow, {
        scale: 1,
        autoAlpha: 1,
        duration: this.statTransitionDuration,
        transformOrigin: 'center',
        ease: 'power1.out',
      });
      this.continuousTl.progress(0);
      this.continuousTl.pause(0);
      return;
    }
    if (this.currentStat === 'circle') {
      gsap.to(pieces, {
        scale: 2,
        transformOrigin: 'center',
        duration: this.statTransitionDuration * 2,
        ease: 'elastic.out',
        onComplete: () => {
          this.statTransition = !1;
        },
      });
      gsap.to(this.circle, {
        scale: 1.3,
        autoAlpha: 1,
        duration: this.statTransitionDuration,
        transformOrigin: 'center',
        ease: 'power1.out',
      });
      this.continuousTl.progress(0);
      this.continuousTl.pause(0);
      return;
    }
    if (this.currentStat === 'drag') {
      gsap.to(pieces, {
        scale: 2,
        transformOrigin: 'center',
        duration: this.statTransitionDuration * 2,
        ease: 'elastic.out',
        onComplete: () => {
          this.statTransition = !1;
        },
      });
      gsap.to(this.drag, {
        scale: 1.3,
        autoAlpha: 1,
        duration: this.statTransitionDuration,
        transformOrigin: 'center',
        ease: 'power1.out',
      });
      this.continuousTl.progress(0);
      this.continuousTl.pause(0);
      return;
    }
    if (this.currentStat === 'slide') {
      gsap.to(pieces, {
        scale: 2,
        transformOrigin: 'center',
        duration: this.statTransitionDuration * 2,
        ease: 'elastic.out',
        onComplete: () => {
          this.statTransition = !1;
        },
      });
      gsap.to(this.slide, {
        scale: 1.3,
        autoAlpha: 1,
        duration: this.statTransitionDuration,
        transformOrigin: 'center',
        ease: 'power1.out',
      });
      this.continuousTl.progress(0);
      this.continuousTl.pause(0);
      return;
    }
    if (this.currentStat === 'hover-magnetic') {
      gsap.to(pieces, {
        scale: 0,
        transformOrigin: 'center',
        duration: this.statTransitionDuration * 0.5,
        ease: 'linear',
        onComplete: () => {
          this.statTransition = !1;
        },
      });
      return;
    }
  }
  findStat(el) {
    if (el.tagName === 'body') return !1;
    const stat = el.getAttribute('cursor-stat');
    if (stat !== null && stat !== undefined) {
      let t = el.getAttribute('cursor-text');
      if (stat === this.currentStat && t !== this.text) {
        this.gravity.active = !1;
        return !1;
      }
      if (el.hasAttribute('cursor-gravity')) {
        this.gravity.active = !0;
        this.gravity.el = el;
        this.updateGravity();
      } else {
        this.gravity.active = !1;
      }
      this.changeStat(stat, t);
      return;
    } else {
      return this.findStat(el.closest('[cursor-stat]'));
    }
  }
  render() {
    this.allowFind = !0;
    // if (this.stat.active != undefined) {
    //   if (this.stat.active) this.showCursor();
    //   if (!this.stat.active) this.hideCursor();
    //   this.stat.prevActive = this.stat.active;
    // }
    // if (mouse.x !== this.previousMouse.x || mouse.y !== this.previousMouse.y) {
    //   this.previousMouse.x = mouse.x;
    //   this.previousMouse.yPercent = mouse.yPercent;
    //   this.stat.active = !0;
    //   this.stopTimeout(this);
    //   this.initTimeout(this);
    // }
    // this.innerPiecePosition.x = mouse.x;
    // this.innerPiecePosition.y = mouse.y;
    // if (this.gravity.active) {
    //   this.innerPiecePosition.x = this.gravity.x;
    //   this.innerPiecePosition.y = this.gravity.y;
    // }
    this.allPieces.forEach((piece, i) => {
      this.piecesPositions[i].prevX = this.MathUtils.lerp(
        this.piecesPositions[i].prevX,
        this.innerPiecePosition.x,
        this.offsets.pieces[i]
      );
      this.piecesPositions[i].prevY = this.MathUtils.lerp(
        this.piecesPositions[i].prevY,
        this.innerPiecePosition.y,
        this.offsets.pieces[i]
      );
      let x = this.piecesPositions[i].prevX - this.sizes.x,
        y = this.piecesPositions[i].prevY - this.sizes.y;
      piece.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    // this.innerPiecePosition.prevX = this.MathUtils.lerp(
    //   this.innerPiecePosition.prevX,
    //   this.innerPiecePosition.x,
    //   this.offsets.inner
    // );
    // this.innerPiecePosition.prevY = this.MathUtils.lerp(
    //   this.innerPiecePosition.prevY,
    //   this.innerPiecePosition.y,
    //   this.offsets.inner
    // );
    // let x = this.innerPiecePosition.prevX - this.sizes.x,
    //   y = this.innerPiecePosition.prevY - this.sizes.y;
   // this.cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
}
class TextWave {
  constructor() {
    this.texts = document.querySelectorAll(
      '[animation-wave], [animation-wave-child]'
    );
    if (this.texts === null || this.texts === undefined) return;
    gsap.registerPlugin(SplitText);
    this.splittedTexts = [];
    this.setup();
    this.bind();
  }
  setup() {
    let _this = this;
    this.texts.forEach((el) => {
      let text = {
        split: new SplitText(el, { type: 'chars,words,lines' }),
        progress: !1,
      };
      text.tl = gsap.timeline({
        paused: !0,
        yoyo: !0,
        onComplete: () => {
          text.progress = !1;
        },
      });
      text.tl
        .addLabel('start')
        .to(
          text.split.chars,
          { yPercent: -30, duration: 0.3, stagger: 0.1, ease: 'power1.inOut' },
          'start'
        )
        .to(
          text.split.chars,
          { yPercent: 0, duration: 0.3, stagger: 0.1, ease: 'power1.inOut' },
          'start+=0.3'
        );
      text.tl.timeScale(1.2);
      _this.splittedTexts.push(text);
    });
  }
  bind() {
    let _this = this;
    this.texts.forEach((el, i) => {
      let trigger = el;
      if (el.hasAttribute('animation-wave-child')) {
        trigger = el.closest('[animation-wave-trigger]');
      }
      trigger.addEventListener('mouseenter', () => {
        if (_this.splittedTexts[i].progress) return;
        _this.splittedTexts[i].progress = !0;
        _this.splittedTexts[i].tl.play(0);
      });
      trigger.addEventListener('mouseleave', () => {
        if (!_this.splittedTexts[i].progress) return;
        _this.splittedTexts[i].progress = !1;
        _this.splittedTexts[i].tl.progress(0);
        _this.splittedTexts[i].tl.pause();
      });
    });
  }
}
class SvgWave {
  constructor(opts) {
    let _this = this;
    this.el = opts.el;
    if (this.el === null || this.el === undefined) return;
    this.duration = opts.duration || 5;
    this.waves = opts.waves || 2;
    this.tl = gsap.timeline({ repeat: -1 });
    this.tl.to(_this.el, {
      duration: _this.duration,
      ease: 'linear',
      xPercent: -50,
    });
    this.tl2 = gsap.timeline({ repeat: -1, yoyo: !0 });
    this.tl2.to(_this.el, {
      duration: _this.duration / _this.waves,
      ease: 'power1.inOut',
      yPercent: -10,
    });
  }
}
class TextInPath {
  constructor(opts) {
    let _this = this;
    this.MathUtils = {
      map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
    };
    this.item = opts.trigger.querySelector('svg text');
    this.spans = this.item.querySelectorAll('textPath');
    this.questions = this.spans.length;
    this.current = 0;
    this.trigger = opts.trigger;
    this.percents = [];
    this.tl = gsap.timeline({ paused: !0 });
    this.setup();
  }
  setup() {
    let _this = this;
    let prev = !1;
    let _alpha = isSafari ? 0 : 1;
    this.spans.forEach((el, i) => {
      gsap.set(el, { autoAlpha: _alpha });
      let label = `question-${i}`;
      _this.tl.addLabel(label, '>');
      _this.tl.add(
        gsap.to(el, {
          duration: 2,
          autoAlpha: 1,
          attr: { startOffset: '0%' },
          ease: 'power1.inOut',
          onComplete: function () {
            if (i === _this.spans.length / 2) {
              _this.tl.seek('question-1');
              _this.current = 1;
            }
          },
        }),
        label
      );
      if (prev) {
        _this.tl.add(
          gsap.to(prev, {
            duration: 2,
            autoAlpha: 0,
            attr: { startOffset: '-100%' },
            ease: 'power1.inOut',
          }),
          label
        );
      }
      prev = el;
    });
    this.bind();
    this.next();
  }
  next() {
    let from = `question-${this.current}`,
      to = '';
    this.current++;
    to = `question-${this.current}`;
    this.tl.tweenFromTo(from, to);
  }
  reverse() {
    this.tl.tweenTo('question-2');
  }
  bind() {
    let _this = this;
    this.trigger.addEventListener('click', () => {
      _this.next();
    });
  }
}
class CoverDrag {
  constructor(opts) {
    let _this = this;
    this.item = document.querySelector('.mask-images-drag');
    if (this.item === null || this.item === undefined) return;
    this.parent = document.querySelector('.cover-wrapper');
    this.tempWrapper = this.parent.querySelector('.temp-scale');
    this.MathUtils = { lerp: (a, b, n) => (1 - n) * a + n * b };
    gsap.registerPlugin(Draggable);
    gsap.registerPlugin(InertiaPlugin);
    gsap.registerPlugin(MorphSVGPlugin);
    this.current = 0;
    this.images = this.item.querySelectorAll('.mask-img-item');
    this.count = this.images.length - 1;
    this.morph = [
      'M400,245.8C400,347.7,317.4,382,215.5,382S0,326.7,0,224.8S113.6,18,215.5,18S400,143.9,400,245.8z',
      'M200,319.2c46.3,0,58.5,80.7,126.1,80.7c34.9,0,58.6-23.8,63.6-53.5C400,284.5,400,51.8,400,40.8C400,13.1,390.4,0,373,0c-42.4,0-25.3,88.1-79.3,88.1C240.6,88.1,252.9,0,200,0s-40.6,88.1-93.7,88.1c-54,0-37-88.1-79.4-88.1C9.6,0,0,13.1,0,40.8c0,11,0,243.7,10.3,305.7C15.2,376.2,39,400,73.8,400C141.5,400,153.3,319.2,200,319.2z',
      'M3.7,252.6c10,37.4,39.3,66.6,76.7,76.5c25.6,6.8,48.9,20.2,67.6,39c42.1,42.3,110.6,42.5,152.9,0.4c13.6-13.5,23.4-30.4,28.3-49c6.8-25.6,20.3-48.9,39-67.5c42.3-42.1,42.5-110.6,0.4-152.9c-13.5-13.6-30.4-23.4-49-28.3C294,64,270.7,50.6,252,31.8c-42.2-42.3-110.7-42.4-153-0.3C85.5,45.1,75.7,61.9,70.8,80.4C64,106,50.6,129.3,31.8,148C4.4,175.3-6.3,215.2,3.7,252.6z',
    ];
    this.currentMorph = 0;
    this.countMorph = this.morph.length - 1;
    this.maskMorph = this.item.querySelector('#cover-mask-item path');
    this.maskTail = document.querySelectorAll('.cover-mask-tail');
    this.maskTailPaths = document.querySelectorAll('.cover-mask-tail path');
    this.tailSizes = {
      x: this.maskTail[0].getBoundingClientRect().width,
      y: this.maskTail[0].getBoundingClientRect().height,
    };
    this.tailOffsets = [0.2, 0.1, 0.06, 0.03];
    this.tailOffset = 5;
    this.duration = 0.8;
    this.previousPositions = [];
    this.previousPositionsWhatWeDo = [];
    this.position = { x: 0, y: 0 };
    this.updateTailValues();
    this.setup();
    this.bind();
  }
  setup() {
    let _this = this;
    gsap.set(this.images, { autoAlpha: 0 });
    gsap.set(this.images[0], { autoAlpha: 1 });
    _this.constantTl = gsap.timeline({ paused: !0, yoyo: !0, repeat: -1 });
    gsap.set(this.item, { y: '+=100', x: '+=100', autoAlpha: 0 });
    gsap.set(this.maskTail, { autoAlpha: 0 });
    _this.updateTailValues();
    gsap.to([this.item, this.maskTail], {
      autoAlpha: 1,
      duration: 0.8,
      delay: 1,
      ease: 'power1.out',
      onStart: () => {
        gsap.to(_this.item, {
          x: 0,
          y: 0,
          ease: 'power4.out',
          duration: 2,
          onUpdate() {
            _this.updateTailValues();
          },
          onComplete: () => {
            _this.constantTl.to(this.item, {
              y: '-=30',
              ease: 'power1.inOut',
              duration: 4,
              onUpdate: function () {
                _this.updateTailValues();
              },
            });
            _this.constantTl.play();
            initDrag();
          },
        });
      },
    });
    function initDrag() {
      Draggable.create(_this.item, {
        type: 'x,y',
        inertia: !0,
        bounds: _this.item.parentNode,
        edgeResistance: 0.1,
        dragResistance: 0.5,
        zIndexBoost: !1,
        onDrag: (event) => {
          _this.updateTailValues();
          _this.constantTl.pause();
          mouse.x = event.clientX;
          mouse.y = event.clientY;
        },
        onThrowUpdate: () => {
          _this.updateTailValues();
          _this.constantTl.pause();
        },
      });
    }
    _this.maskTail.forEach((el) => {
      let item = { item: el, prevX: _this.position.x, prevY: _this.position.y };
      _this.previousPositions.push(item);
    });
    _this.parent.classList.add('active');
  }
  bind() {
    let _this = this;
    setInterval(() => {
      _this.nextImage();
    }, 4000);
    window.addEventListener('resize', checkSize);
    function checkSize() {
      _this.tailSizes = {
        x: _this.maskTail[0].getBoundingClientRect().width,
        y: _this.maskTail[0].getBoundingClientRect().height,
      };
    }
  }
  nextImage() {
    this.current = this.current + 1 > this.count ? 0 : this.current + 1;
    gsap.to(this.images, {
      autoAlpha: 0,
      duration: this.duration,
      ease: 'power1.inOut',
    });
    gsap.to(this.images[this.current], {
      autoAlpha: 1,
      duration: this.duration,
      ease: 'power1.inOut',
    });
    this.currentMorph =
      this.currentMorph + 1 > this.countMorph ? 0 : this.currentMorph + 1;
    gsap.to([this.maskMorph, this.maskTailPaths], {
      duration: this.duration,
      morphSVG: { type: 'rotational', shape: this.morph[this.currentMorph] },
      ease: 'power1.inOut',
    });
  }
  updateTailValues() {
    this.position.x = gsap.getProperty(this.item, 'x');
    this.position.y = gsap.getProperty(this.item, 'y');
  }
  updateTail() {
    if (this.maskTail) {
      this.maskTail.forEach((item, i) => {
        this.previousPositions[i].prevX = this.MathUtils.lerp(
          this.previousPositions[i].prevX,
          this.position.x,
          this.tailOffsets[i]
        );
        this.previousPositions[i].prevY = this.MathUtils.lerp(
          this.previousPositions[i].prevY,
          this.position.y,
          this.tailOffsets[i]
        );
        let x = this.previousPositions[i].prevX + i * this.tailOffset,
          y = this.previousPositions[i].prevY + i * this.tailOffset;
        item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    }
  }
}
class ImagesWWD {
  constructor(opts) {
    let _this = this;
    this.item = document.querySelector('.what_we_do-images');
    if (this.item === null || this.item === undefined) return;
    this.MathUtils = {
      lerp: (a, b, n) => (1 - n) * a + n * b,
      map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
    };
    gsap.registerPlugin(Draggable);
    gsap.registerPlugin(InertiaPlugin);
    gsap.registerPlugin(MorphSVGPlugin);
    this.current = 0;
    this.images = this.item.querySelectorAll('.what_we_do-img-item');
    this.count = this.images.length - 1;
    this.morph = [
      'M400,245.8C400,347.7,317.4,382,215.5,382S0,326.7,0,224.8S113.6,18,215.5,18S400,143.9,400,245.8z',
      'M200,319.2c46.3,0,58.5,80.7,126.1,80.7c34.9,0,58.6-23.8,63.6-53.5C400,284.5,400,51.8,400,40.8C400,13.1,390.4,0,373,0c-42.4,0-25.3,88.1-79.3,88.1C240.6,88.1,252.9,0,200,0s-40.6,88.1-93.7,88.1c-54,0-37-88.1-79.4-88.1C9.6,0,0,13.1,0,40.8c0,11,0,243.7,10.3,305.7C15.2,376.2,39,400,73.8,400C141.5,400,153.3,319.2,200,319.2z',
      'M3.7,252.6c10,37.4,39.3,66.6,76.7,76.5c25.6,6.8,48.9,20.2,67.6,39c42.1,42.3,110.6,42.5,152.9,0.4c13.6-13.5,23.4-30.4,28.3-49c6.8-25.6,20.3-48.9,39-67.5c42.3-42.1,42.5-110.6,0.4-152.9c-13.5-13.6-30.4-23.4-49-28.3C294,64,270.7,50.6,252,31.8c-42.2-42.3-110.7-42.4-153-0.3C85.5,45.1,75.7,61.9,70.8,80.4C64,106,50.6,129.3,31.8,148C4.4,175.3-6.3,215.2,3.7,252.6z',
    ];
    this.currentMorph = 0;
    this.countMorph = this.morph.length - 1;
    this.maskMorph = this.item.querySelector('#cover-mask-item-wwd path');
    this.maskTail = document.querySelectorAll('.what_we_do-tail');
    this.maskTailPaths = document.querySelectorAll('.what_we_do-tail path');
    this.tailSizes = {
      x: this.maskTail[0].getBoundingClientRect().width,
      y: this.maskTail[0].getBoundingClientRect().height,
    };
    this.tailOffsets = [0.3, 0.2, 0.1, 0.06];
    this.tailOffset = 5;
    this.duration = 0.8;
    this.previousPositions = [];
    this.position = { y: 0, x: 0 };
    this.updateTailValues();
    this.setup();
  }
  setup() {
    let _this = this;
    gsap.set(this.images, { autoAlpha: 0 });
    gsap.set(this.images[0], { autoAlpha: 1 });
    if (this.maskTail) {
      this.maskTail.forEach((el) => {
        let item = {
          item: el,
          prevY: _this.position.y,
          prevX: _this.position.x,
        };
        this.previousPositions.push(item);
      });
    }
    let follow = document.querySelector('.what_we_do-mouse-follow');
    follow.addEventListener('mouseenter', () => {
      _this.showHide(!0);
    });
    follow.addEventListener('mouseleave', () => {
      _this.showHide();
    });
    this.showHide();
  }
  nextImage() {
    gsap.to(this.images, {
      autoAlpha: 0,
      duration: this.duration,
      ease: 'power1.inOut',
    });
    gsap.to(this.images[this.current], {
      autoAlpha: 1,
      duration: this.duration,
      ease: 'power1.inOut',
    });
    this.currentMorph =
      this.currentMorph + 1 > this.countMorph ? 0 : this.currentMorph + 1;
    gsap.to([this.maskMorph, this.maskTailPaths], {
      duration: this.duration,
      overwrite: !0,
      morphSVG: { type: 'rotational', shape: this.morph[this.currentMorph] },
      ease: 'power1.inOut',
    });
  }
  updateTailValues() {
    let _this = this;
    document
      .querySelectorAll('.what_we_do-mouse-follow li')
      .forEach((el, i) => {
        el.addEventListener('mouseenter', (ev) => {
          _this.current = i;
          _this.nextImage();
        });
      });
    let parent = document.querySelector('.what_we_do-mouse-follow');
    parent.addEventListener('mousemove', (ev) => {
      _this.position.y =
        ev.clientY - parent.getBoundingClientRect().top - _this.tailSizes.y / 2;
      let tempX = ev.clientX;
      _this.position.x = _this.MathUtils.map(
        tempX,
        0,
        window.innerWidth,
        -150,
        150
      );
    });
  }
  showHide(show = !1) {
    if (this.isVisible === show) return;
    this.isVisible = show;
    if (!this.isVisible) {
      gsap.to(this.item, { autoAlpha: 0, duration: 0.5 });
    } else {
      gsap.to(this.item, { autoAlpha: 1, duration: 0.5 });
    }
  }
  updateTail() {
    if (!this.isVisible) return;
    if (this.maskTail) {
      this.maskTail.forEach((item, i) => {
        this.previousPositions[i].prevY = this.MathUtils.lerp(
          this.previousPositions[i].prevY,
          this.position.y,
          this.tailOffsets[i]
        );
        this.previousPositions[i].prevX = this.MathUtils.lerp(
          this.previousPositions[i].prevX,
          this.position.x,
          this.tailOffsets[i]
        );
        let y =
            this.previousPositions[i].prevY +
            i * 5 -
            item.parentNode.getBoundingClientRect().height / 3,
          x = this.previousPositions[i].prevX + i * 5;
        item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (i === 0) {
          document.querySelector(
            '.what_we_do-images'
          ).style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    }
  }
}
class WavePathItem {
  constructor(el) {
    this.el = el;
    this.svg = el.querySelector('.wave-path-item');
    this.g = this.svg.querySelectorAll('g');
    this.paths = this.svg.querySelectorAll('path');
    this.duration = 3;
    this.waves = [
      'M404.3,15.4c-20.3,0-20.3-14.9-40.5-14.9s-20.2,14.9-40.5,14.9S303.1,0.5,282.8,0.5s-20.2,14.9-40.5,14.9S222.1,0.5,201.8,0.5s-20.3,14.9-40.5,14.9l0.7,0c-20.2,0-20.2-14.9-40.5-14.9S101.2,15.4,81,15.4S60.7,0.5,40.5,0.5S20.2,15.4,0,15.4',
      'M808.6,15.4c-20.3,0-20.3-14.9-40.5-14.9s-20.2,14.9-40.5,14.9S707.4,0.5,687.1,0.5s-20.2,14.9-40.5,14.9S626.4,0.5,606.1,0.5s-20.3,14.9-40.5,14.9l0.7,0C546,15.4,546,0.5,525.8,0.5c-20.2,0-20.3,14.9-40.5,14.9c-20.2,0-20.2-14.9-40.5-14.9s-20.3,14.9-40.5,14.9',
      'M1212.9,15.4c-20.3,0-20.3-14.9-40.5-14.9s-20.2,14.9-40.5,14.9s-20.3-14.9-40.5-14.9s-20.2,14.9-40.5,14.9s-20.3-14.9-40.5-14.9c-20.3,0-20.3,14.9-40.5,14.9l0.7,0c-20.2,0-20.2-14.9-40.5-14.9c-20.2,0-20.3,14.9-40.5,14.9S869.4,0.5,849.1,0.5c-20.2,0-20.3,14.9-40.5,14.9',
    ];
    gsap.registerPlugin(MorphSVGPlugin);
    this.tl = '';
    this.tlMorph = '';
    this.setup();
    this.bind();
  }
  setup() {
    let _this = this;
    this.tl = gsap.timeline({ paused: !0, repeat: -1 });
    this.tl.to(_this.g, {
      xPercent: -100,
      duration: _this.duration,
      ease: 'linear',
    });
    this.tlMorph = gsap.timeline({ paused: !0 });
    this.tlMorph.to(this.paths, {
      morphSVG: {
        shape: function (i) {
          return _this.waves[i];
        },
      },
      duration: 1,
      ease: 'linear',
    });
  }
  bind() {
    let _this = this;
    if (this.el.classList.contains('vertical-wave-path-item')) {
      _this.tl.timeScale(1);
      let scrolling = !1,
        started = TextTrackCue,
        top = this.el.getBoundingClientRect().top;
      setTimeout(() => {
        _this.tl.play();
        _this.tlMorph.play();
      }, 2000);
      window.addEventListener(
        'scroll',
        function (event) {
          window.clearTimeout(scrolling);
          if (!started) {
            started = !0;
          }
          if (window.scrollY + window.innerHeight * 0.25 > top) {
            scrolling = setTimeout(function () {
              _this.tl.pause();
              _this.tlMorph.reverse();
              started = !1;
            }, 50);
          }
        },
        !1
      );
    } else {
      this.el.addEventListener('mouseenter', () => {
        _this.tl.play();
        _this.tlMorph.play();
      });
      this.el.addEventListener('mouseleave', () => {
        _this.tl.pause();
        _this.tlMorph.reverse();
      });
    }
  }
}
class Blobs {
  constructor() {
    let _this = this;
    gsap.registerPlugin(MorphSVGPlugin);
    this.morph = [
      'M400,245.8C400,347.7,317.4,382,215.5,382S0,326.7,0,224.8S113.6,18,215.5,18S400,143.9,400,245.8z',
      'M3.7,252.6c10,37.4,39.3,66.6,76.7,76.5c25.6,6.8,48.9,20.2,67.6,39c42.1,42.3,110.6,42.5,152.9,0.4c13.6-13.5,23.4-30.4,28.3-49c6.8-25.6,20.3-48.9,39-67.5c42.3-42.1,42.5-110.6,0.4-152.9c-13.5-13.6-30.4-23.4-49-28.3C294,64,270.7,50.6,252,31.8c-42.2-42.3-110.7-42.4-153-0.3C85.5,45.1,75.7,61.9,70.8,80.4C64,106,50.6,129.3,31.8,148C4.4,175.3-6.3,215.2,3.7,252.6z',
      'M200,319.2c46.3,0,58.5,80.7,126.1,80.7c34.9,0,58.6-23.8,63.6-53.5C400,284.5,400,51.8,400,40.8C400,13.1,390.4,0,373,0c-42.4,0-25.3,88.1-79.3,88.1C240.6,88.1,252.9,0,200,0s-40.6,88.1-93.7,88.1c-54,0-37-88.1-79.4-88.1C9.6,0,0,13.1,0,40.8c0,11,0,243.7,10.3,305.7C15.2,376.2,39,400,73.8,400C141.5,400,153.3,319.2,200,319.2z',
      'M200,319.2c46.3,0,58.5,80.7,126.1,80.7c34.9,0,58.6-23.8,63.6-53.5C400,284.5,400,51.8,400,40.8C400,13.1,390.4,0,373,0c-42.4,0-25.3,88.1-79.3,88.1C240.6,88.1,252.9,0,200,0s-40.6,88.1-93.7,88.1c-54,0-37-88.1-79.4-88.1C9.6,0,0,13.1,0,40.8c0,11,0,243.7,10.3,305.7C15.2,376.2,39,400,73.8,400C141.5,400,153.3,319.2,200,319.2z',
      'M200,319.2c46.3,0,58.5,80.7,126.1,80.7c34.9,0,58.6-23.8,63.6-53.5C400,284.5,400,51.8,400,40.8C400,13.1,390.4,0,373,0c-42.4,0-25.3,88.1-79.3,88.1C240.6,88.1,252.9,0,200,0s-40.6,88.1-93.7,88.1c-54,0-37-88.1-79.4-88.1C9.6,0,0,13.1,0,40.8c0,11,0,243.7,10.3,305.7C15.2,376.2,39,400,73.8,400C141.5,400,153.3,319.2,200,319.2z',
      'M3.7,252.6c10,37.4,39.3,66.6,76.7,76.5c25.6,6.8,48.9,20.2,67.6,39c42.1,42.3,110.6,42.5,152.9,0.4c13.6-13.5,23.4-30.4,28.3-49c6.8-25.6,20.3-48.9,39-67.5c42.3-42.1,42.5-110.6,0.4-152.9c-13.5-13.6-30.4-23.4-49-28.3C294,64,270.7,50.6,252,31.8c-42.2-42.3-110.7-42.4-153-0.3C85.5,45.1,75.7,61.9,70.8,80.4C64,106,50.6,129.3,31.8,148C4.4,175.3-6.3,215.2,3.7,252.6z',
      'M400,245.8C400,347.7,317.4,382,215.5,382S0,326.7,0,224.8S113.6,18,215.5,18S400,143.9,400,245.8z',
      'M3.7,252.6c10,37.4,39.3,66.6,76.7,76.5c25.6,6.8,48.9,20.2,67.6,39c42.1,42.3,110.6,42.5,152.9,0.4c13.6-13.5,23.4-30.4,28.3-49c6.8-25.6,20.3-48.9,39-67.5c42.3-42.1,42.5-110.6,0.4-152.9c-13.5-13.6-30.4-23.4-49-28.3C294,64,270.7,50.6,252,31.8c-42.2-42.3-110.7-42.4-153-0.3C85.5,45.1,75.7,61.9,70.8,80.4C64,106,50.6,129.3,31.8,148C4.4,175.3-6.3,215.2,3.7,252.6z',
      'M200,319.2c46.3,0,58.5,80.7,126.1,80.7c34.9,0,58.6-23.8,63.6-53.5C400,284.5,400,51.8,400,40.8C400,13.1,390.4,0,373,0c-42.4,0-25.3,88.1-79.3,88.1C240.6,88.1,252.9,0,200,0s-40.6,88.1-93.7,88.1c-54,0-37-88.1-79.4-88.1C9.6,0,0,13.1,0,40.8c0,11,0,243.7,10.3,305.7C15.2,376.2,39,400,73.8,400C141.5,400,153.3,319.2,200,319.2z',
      'M200,319.2c46.3,0,58.5,80.7,126.1,80.7c34.9,0,58.6-23.8,63.6-53.5C400,284.5,400,51.8,400,40.8C400,13.1,390.4,0,373,0c-42.4,0-25.3,88.1-79.3,88.1C240.6,88.1,252.9,0,200,0s-40.6,88.1-93.7,88.1c-54,0-37-88.1-79.4-88.1C9.6,0,0,13.1,0,40.8c0,11,0,243.7,10.3,305.7C15.2,376.2,39,400,73.8,400C141.5,400,153.3,319.2,200,319.2z',
      'M200,319.2c46.3,0,58.5,80.7,126.1,80.7c34.9,0,58.6-23.8,63.6-53.5C400,284.5,400,51.8,400,40.8C400,13.1,390.4,0,373,0c-42.4,0-25.3,88.1-79.3,88.1C240.6,88.1,252.9,0,200,0s-40.6,88.1-93.7,88.1c-54,0-37-88.1-79.4-88.1C9.6,0,0,13.1,0,40.8c0,11,0,243.7,10.3,305.7C15.2,376.2,39,400,73.8,400C141.5,400,153.3,319.2,200,319.2z',
      'M3.7,252.6c10,37.4,39.3,66.6,76.7,76.5c25.6,6.8,48.9,20.2,67.6,39c42.1,42.3,110.6,42.5,152.9,0.4c13.6-13.5,23.4-30.4,28.3-49c6.8-25.6,20.3-48.9,39-67.5c42.3-42.1,42.5-110.6,0.4-152.9c-13.5-13.6-30.4-23.4-49-28.3C294,64,270.7,50.6,252,31.8c-42.2-42.3-110.7-42.4-153-0.3C85.5,45.1,75.7,61.9,70.8,80.4C64,106,50.6,129.3,31.8,148C4.4,175.3-6.3,215.2,3.7,252.6z',
      'M400,245.8C400,347.7,317.4,382,215.5,382S0,326.7,0,224.8S113.6,18,215.5,18S400,143.9,400,245.8z',
      'M3.7,252.6c10,37.4,39.3,66.6,76.7,76.5c25.6,6.8,48.9,20.2,67.6,39c42.1,42.3,110.6,42.5,152.9,0.4c13.6-13.5,23.4-30.4,28.3-49c6.8-25.6,20.3-48.9,39-67.5c42.3-42.1,42.5-110.6,0.4-152.9c-13.5-13.6-30.4-23.4-49-28.3C294,64,270.7,50.6,252,31.8c-42.2-42.3-110.7-42.4-153-0.3C85.5,45.1,75.7,61.9,70.8,80.4C64,106,50.6,129.3,31.8,148C4.4,175.3-6.3,215.2,3.7,252.6z',
      'M200,319.2c46.3,0,58.5,80.7,126.1,80.7c34.9,0,58.6-23.8,63.6-53.5C400,284.5,400,51.8,400,40.8C400,13.1,390.4,0,373,0c-42.4,0-25.3,88.1-79.3,88.1C240.6,88.1,252.9,0,200,0s-40.6,88.1-93.7,88.1c-54,0-37-88.1-79.4-88.1C9.6,0,0,13.1,0,40.8c0,11,0,243.7,10.3,305.7C15.2,376.2,39,400,73.8,400C141.5,400,153.3,319.2,200,319.2z',
      'M200,319.2c46.3,0,58.5,80.7,126.1,80.7c34.9,0,58.6-23.8,63.6-53.5C400,284.5,400,51.8,400,40.8C400,13.1,390.4,0,373,0c-42.4,0-25.3,88.1-79.3,88.1C240.6,88.1,252.9,0,200,0s-40.6,88.1-93.7,88.1c-54,0-37-88.1-79.4-88.1C9.6,0,0,13.1,0,40.8c0,11,0,243.7,10.3,305.7C15.2,376.2,39,400,73.8,400C141.5,400,153.3,319.2,200,319.2z',
      'M200,319.2c46.3,0,58.5,80.7,126.1,80.7c34.9,0,58.6-23.8,63.6-53.5C400,284.5,400,51.8,400,40.8C400,13.1,390.4,0,373,0c-42.4,0-25.3,88.1-79.3,88.1C240.6,88.1,252.9,0,200,0s-40.6,88.1-93.7,88.1c-54,0-37-88.1-79.4-88.1C9.6,0,0,13.1,0,40.8c0,11,0,243.7,10.3,305.7C15.2,376.2,39,400,73.8,400C141.5,400,153.3,319.2,200,319.2z',
      'M3.7,252.6c10,37.4,39.3,66.6,76.7,76.5c25.6,6.8,48.9,20.2,67.6,39c42.1,42.3,110.6,42.5,152.9,0.4c13.6-13.5,23.4-30.4,28.3-49c6.8-25.6,20.3-48.9,39-67.5c42.3-42.1,42.5-110.6,0.4-152.9c-13.5-13.6-30.4-23.4-49-28.3C294,64,270.7,50.6,252,31.8c-42.2-42.3-110.7-42.4-153-0.3C85.5,45.1,75.7,61.9,70.8,80.4C64,106,50.6,129.3,31.8,148C4.4,175.3-6.3,215.2,3.7,252.6z',
    ];
    this.add();
  }
  add() {
    let _this = this;
    this.items = document.querySelectorAll('.blob-wrapper');
    if (this.items === null || this.items === undefined) return;
    this.blobs = [];
    this.items.forEach((el) => {
      let color = el.getAttribute('color')
        ? el.getAttribute('color'): '#58FFB8';
      this.blobs.push(
        new Blob({ el, morphs: gsap.utils.shuffle(_this.morph), color })
      );
    });
    if (swup) {
      swup.on('willReplaceContent', () => {
        _this.blobs = [];
      });
      swup.on('contentReplaced', () => {
        _this.add();
      });
    }
  }
  render() {
    if (!this.blobs) return;
    this.blobs.forEach((b) => {
      b.update();
    });
  }
}
class Blob {
  constructor(opts) {
    this.color = opts.color;
    this.MathUtils = { lerp: (a, b, n) => (1 - n) * a + n * b };
    (this.morph = opts.morphs), (this.wrap = opts.el);
    this.currentMorph = 0;
    this.countMorph = this.morph.length - 1;
    this.tails = this.wrap.querySelectorAll('.blob-tail');
    this.tailsPaths = this.wrap.querySelectorAll('path');
    this.item = this.tails[0];
    this.tailSizes = {
      x: this.tails[0].getBoundingClientRect().width,
      y: this.tails[0].getBoundingClientRect().height,
    };
    this.tailOffsets = [1, 0.2, 0.1, 0.06, 0.03];
    this.tailOffset = 5;
    this.duration = 0.8;
    this.previousPositions = [];
    this.previousPositionsWhatWeDo = [];
    this.position = { x: 0, y: 0 };
    this.updateTailValues();
    this.setup();
    this.bind();
  }
  setup() {
    let _this = this;
    this.tailsPaths.forEach((el) => {
      el.style.fill = this.color;
    });
    this.tails.forEach((el) => {
      let item = { item: el, prevX: _this.position.x, prevY: _this.position.y };
      this.previousPositions.push(item);
    });
  }
  bind() {
    let _this = this;
    setInterval(() => {
      _this.nextMorph();
    }, 4000);
    window.addEventListener('resize', checkSize);
    function checkSize() {
      _this.tailSizes = {
        x: _this.tails[0].getBoundingClientRect().width,
        y: _this.tails[0].getBoundingClientRect().height,
      };
    }
  }
  nextMorph() {
    this.currentMorph =
      this.currentMorph + 1 > this.countMorph ? 0 : this.currentMorph + 1;
    gsap.to(this.tailsPaths, {
      duration: this.duration,
      morphSVG: { type: 'rotational', shape: this.morph[this.currentMorph] },
      ease: 'power1.inOut',
    });
  }
  updateTailValues() {
    this.position.x = mouse.x * 0.1;
    this.position.y = mouse.y * -0.05;
  }
  update() {
    this.updateTailValues();
    if (this.tails) {
      this.tails.forEach((item, i) => {
        this.previousPositions[i].prevX = this.MathUtils.lerp(
          this.previousPositions[i].prevX,
          this.position.x,
          this.tailOffsets[i]
        );
        this.previousPositions[i].prevY = this.MathUtils.lerp(
          this.previousPositions[i].prevY,
          this.position.y,
          this.tailOffsets[i]
        );
        let x = this.previousPositions[i].prevX + i * this.tailOffset,
          y = this.previousPositions[i].prevY + i * this.tailOffset;
        item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    }
  }
}
