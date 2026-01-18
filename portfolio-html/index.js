
import Atropos from 'https://cdn.jsdelivr.net/npm/atropos@2/atropos.min.mjs';

const customCursor = document.querySelector('.custom-cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smoothly animate cursor to mouse position
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.2; // Smooth factor
  cursorY += (mouseY - cursorY) * 0.2;
  customCursor.style.left = cursorX + 'px';
  customCursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  customCursor.style.opacity = '0';
});

// Show cursor when entering window
document.addEventListener('mouseenter', () => {
  customCursor.style.opacity = '0.8';
});

$(document).ready(function() {

  // ========================================
  // SETUP OVERLAY TEXT ELEMENTS
  // ========================================
  // Add dynamic overlay-text spans to each overlay element
  $('.overlay').each(function() {
    const text = $(this).text().trim();
    $(this).html(text); // Clear and set text
    $(this).append(`<span class="overlay-text">${text}</span>`);
  });

  // ========================================
  // REGISTER GSAP PLUGINS & SETUP SMOOTH SCROLL
  // ========================================
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // Create smooth scroll effect
  ScrollSmoother.create({
    smooth: 3, // how long (in seconds) it takes to "catch up" to native scroll
    effects: true, // looks for data-speed and data-lag attributes
    smoothTouch: 0.1 // shorter smoothing on touch devices
  });

  // ========================================
  // SMOOTH SCROLL TO SECTION
  // ========================================
  $(document).on('click', '[data-scroll-to]', function(e) {
    e.preventDefault();
    
    const sectionId = $(this).data('scroll-to');
    const $target = $('#' + sectionId);
    
    if ($target.length === 0) return;

    // Use GSAP ScrollSmoother to scroll smoothly
    ScrollSmoother.get().scrollTo('#' + sectionId, true, 'top-=0');
    setTimeout(() => {
      $(".container").addClass("animated")
    }, 600)
    
  });

  // Wait for all animations to complete (last letter at 0.4s + 0.4s animation + 0.5s pause)
  setTimeout(function() {
    $('.loader').addClass('zoom-out');
    $('body').removeClass("loading")
    
    // Remove loader from DOM after zoom out completes
    setTimeout(function() {
      $('.loader').remove();
      
    }, 1200);
  }, 1500);

  // Project Hover Effects
  // Note: Image box is positioned fixed OUTSIDE the smooth-content wrapper
  // to work properly with GSAP ScrollSmoother
  const imageBox = $('body > .projects-image-box'); // Select the fixed element outside wrapper
  const previewImage = imageBox.find('.project-preview-image');
  const projectsList = $('.projects-list');
  let animationId = null;

  function isProjectsSectionInView() {
    if (projectsList.length === 0) return false;
    
    const rect = projectsList[0].getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  function moveImageBox(targetTop) {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    const animate = () => {
      const currentTop = parseFloat(imageBox.css('top'));
      const diff = targetTop - currentTop;

      if (Math.abs(diff) > 0.5) {
        imageBox.css('top', (currentTop + diff * 0.12) + 'px');
        animationId = requestAnimationFrame(animate);
      } else {
        imageBox.css('top', targetTop + 'px');
      }
    };

    animationId = requestAnimationFrame(animate);
  }

  $(document).on('mouseenter', '.project-item', function() {
    if ($(window).width() < 1200) return;
    if (!isProjectsSectionInView()) return;

    const imageUrl = $(this).data('image');
    const itemTop = $(this).offset().top - $(window).scrollTop();
    
    // Preload and display the image
    const img = new Image();
    img.onload = function() {
      previewImage.attr('src', imageUrl);
      imageBox.css('opacity', 1);
      previewImage.css('opacity', 1);
    };
    img.onerror = function() {
      previewImage.css('opacity', 0);
    };
    img.src = imageUrl;

    // Move box to align with item
    moveImageBox(itemTop);
  });

  $(document).on('mouseleave', '.projects-list', function() {
    if ($(window).width() < 1200) return;

    imageBox.css('opacity', 0);
    previewImage.css('opacity', 0);
  });

  // Hide image box when scrolling out of view
  $(window).on('scroll', function() {
    if ($(window).width() < 1200) return;

    if (!isProjectsSectionInView()) {
      imageBox.css('opacity', 0);
      previewImage.css('opacity', 0);
    }
  });

  // Handle window resize
  $(window).on('resize', function() {
    if ($(window).width() < 1200) {
      imageBox.css('opacity', 0);
    }
  });
});

const myAtropos = Atropos({
  el: '.my-atropos',
  activeOffset: 50,
  shadowScale: 0.35,
  duration: 700
  // rest of parameters
});

$.fn.visible = function(a) {
	var e = $(this),
		t = $(window),
		s = t.scrollTop(),
		r = s + t.height(),
		i = e.offset().top,
		o = i + e.height(),
		l = a ? o : i,
		c = a ? i : o;
	return c <= r && l >= s
};
$.fn.isInViewport = function(a = 0) {
	var e = $(this).offset().top;
	var t = e + $(this).outerHeight();
	var s = $(window).scrollTop();
	var r = s + $(window).height();
	return t > s + a && e < r - a
};

function animation(){
  var a = $(".anim:not(.animated)");
  if ($(window).outerWidth() > 767 && a.length > 0) {
    $(a).each(function() {
      var a = $(this);
      if (a.visible(true) && a.isInViewport(30)) {
        a.addClass("animated")
      }
    })
  }
}

animation();
$(window).scroll(function() {
  animation()
});
$(window).on("resize", function() {
  var a = $(this);
  if (a.outerWidth() > 767) {
    animation()
  }
});

particlesJS.load('particles-js', 'assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});