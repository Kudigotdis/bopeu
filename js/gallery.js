/* =====================================================
   NOTICE GALLERY (Updates / Notices tab)
   Renders the photo carousel, dots and full-screen viewer.
   ===================================================== */
(function () {
    'use strict';

    function escAttr(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function initGallery() {
        const track = document.getElementById('galleryTrack');
        const dotsEl = document.getElementById('galleryDots');
        const galleryBody = document.getElementById('photoGallery');
        const lightbox = document.getElementById('galleryLightbox');
        const lightboxImage = document.getElementById('galleryLightboxImage');

        if (!track || !dotsEl || !lightbox || !lightboxImage) return;

        const items = Array.isArray(window.BOPEU_GALLERY) ? window.BOPEU_GALLERY : [];
        if (!items.length) {
            if (galleryBody) galleryBody.hidden = true;
            return;
        }

        track.innerHTML = items.map(function (item, index) {
            const alt = item.alt || ('BOPEU notice gallery image ' + (index + 1));
            return '<button type="button" class="gallery-slide" data-index="' + index + '" aria-label="View photo ' + (index + 1) + '">' +
                '<img src="' + escAttr(item.src) + '" alt="' + escAttr(alt) + '"' +
                (index === 0 ? ' loading="eager"' : ' loading="lazy"') +
                ' decoding="async" draggable="false">' +
                '</button>';
        }).join('');

        dotsEl.innerHTML = items.map(function (_, index) {
            return '<button type="button" class="gallery-dot' + (index === 0 ? ' active' : '') + '" data-index="' + index + '"' +
                ' aria-label="Go to photo ' + (index + 1) + '"' +
                (index === 0 ? ' aria-current="true"' : '') + '></button>';
        }).join('');

        const slides = Array.prototype.slice.call(track.querySelectorAll('.gallery-slide'));
        const dots = Array.prototype.slice.call(dotsEl.querySelectorAll('.gallery-dot'));

        let activeIndex = 0;
        let lightboxIndex = 0;
        let lightboxOpen = false;
        let pointerId = null;
        let pointerStartX = 0;
        let pointerStartY = 0;
        let pointerMoved = false;

        function updateDots(index) {
            dots.forEach(function (dot, i) {
                const isActive = i === index;
                dot.classList.toggle('active', isActive);
                if (isActive) dot.setAttribute('aria-current', 'true');
                else dot.removeAttribute('aria-current');
            });
        }

        function setActive(index, shouldScroll) {
            if (!slides.length) return;
            activeIndex = (index + slides.length) % slides.length;
            updateDots(activeIndex);
            if (shouldScroll) {
                track.scrollTo({ left: slides[activeIndex].offsetLeft, behavior: 'smooth' });
            }
        }

        let scrollTicking = false;
        track.addEventListener('scroll', function () {
            if (scrollTicking) return;
            scrollTicking = true;
            window.requestAnimationFrame(function () {
                let nearest = 0;
                let smallest = Infinity;
                slides.forEach(function (slide, index) {
                    const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
                    if (distance < smallest) {
                        smallest = distance;
                        nearest = index;
                    }
                });
                if (nearest !== activeIndex) {
                    activeIndex = nearest;
                    updateDots(nearest);
                }
                scrollTicking = false;
            });
        }, { passive: true });

        dots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                setActive(Number(dot.dataset.index), true);
            });
        });

        function updateLightboxImage() {
            const item = items[lightboxIndex];
            if (!item) return;
            lightboxImage.src = item.src;
            lightboxImage.alt = item.alt || ('BOPEU notice gallery image ' + (lightboxIndex + 1));
        }

        function openLightbox(index) {
            lightboxIndex = index;
            updateLightboxImage();
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('gallery-lightbox-open');
            lightboxOpen = true;
            lightbox.focus({ preventScroll: true });
        }

        function closeLightbox() {
            if (!lightboxOpen) return;
            lightbox.classList.remove('open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('gallery-lightbox-open');
            lightboxOpen = false;
            setActive(lightboxIndex, true);
            const activeSlide = slides[activeIndex];
            if (activeSlide) activeSlide.focus({ preventScroll: true });
        }

        function moveLightbox(delta) {
            if (!items.length) return;
            lightboxIndex = (lightboxIndex + delta + items.length) % items.length;
            updateLightboxImage();
        }

        slides.forEach(function (slide) {
            slide.addEventListener('click', function () {
                openLightbox(Number(slide.dataset.index));
            });
        });

        lightbox.addEventListener('pointerdown', function (event) {
            if (!lightboxOpen) return;
            pointerId = event.pointerId;
            pointerStartX = event.clientX;
            pointerStartY = event.clientY;
            pointerMoved = false;
        });

        lightbox.addEventListener('pointermove', function (event) {
            if (!lightboxOpen || event.pointerId !== pointerId) return;
            if (Math.abs(event.clientX - pointerStartX) > 8 || Math.abs(event.clientY - pointerStartY) > 8) {
                pointerMoved = true;
            }
        });

        lightbox.addEventListener('pointerup', function (event) {
            if (!lightboxOpen || event.pointerId !== pointerId) return;
            const dx = event.clientX - pointerStartX;
            const dy = event.clientY - pointerStartY;
            pointerId = null;

            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
                moveLightbox(dx < 0 ? 1 : -1);
                return;
            }

            if (!pointerMoved && event.target === lightbox) {
                closeLightbox();
            }
        });

        lightbox.addEventListener('pointercancel', function () {
            pointerId = null;
            pointerMoved = false;
        });

        document.addEventListener('keydown', function (event) {
            if (!lightboxOpen) return;
            if (event.key === 'Escape') {
                event.preventDefault();
                closeLightbox();
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                moveLightbox(-1);
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                moveLightbox(1);
            }
        });

        window.addEventListener('resize', function () {
            const slide = slides[activeIndex];
            if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: 'auto' });
        });

        setActive(0, false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }
})();
