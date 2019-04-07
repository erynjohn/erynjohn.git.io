$(document).ready(function () {

    $('.portfolio-link').on('click', function () {
        $('.flip-box-back').css('opacity', '1');
        $('.flip-box-inner').css('transform', 'rotateX(180deg)');
    });
    $('.about-link').on('click', function () {
        $('.flip-box-back').css('opacity', '1');
        $('.flip-box-inner').css('transform', 'rotateX(360deg)');

    });
    $('.contact-link').on('click', function () {
        $('.flip-box-inner').css('transform', 'rotateX(-90deg)');
        $('.flip-box-back').delay('1000').queue(function (next) {
            $(this).css('opacity', '0').next();
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));;
  
    if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
  
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }
  });