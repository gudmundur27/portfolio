// Lightbox with navigation for album images
(function () {
  function setupLightbox() {
    const galleryLinks = Array.from(document.querySelectorAll(".gallery-link"));
    if (!galleryLinks.length) return;
    let currentIndex = 0;
    let modal = document.getElementById("lightbox-modal");
    let modalImg = document.getElementById("lightbox-img");
    let closeBtn = document.getElementById("lightbox-close");
    let prevBtn = document.getElementById("lightbox-prev");
    let nextBtn = document.getElementById("lightbox-next");

    function showModal(index) {
      currentIndex = index;
      modal.style.display = "block";
      modalImg.src = galleryLinks[currentIndex].href;
    }

    galleryLinks.forEach((link, idx) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        showModal(idx);
      });
    });

    closeBtn.onclick = function () {
      modal.style.display = "none";
      modalImg.src = "";
    };
    prevBtn.onclick = function (e) {
      e.stopPropagation();
      currentIndex =
        (currentIndex - 1 + galleryLinks.length) % galleryLinks.length;
      modalImg.src = galleryLinks[currentIndex].href;
    };
    nextBtn.onclick = function (e) {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % galleryLinks.length;
      modalImg.src = galleryLinks[currentIndex].href;
    };
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        modalImg.src = "";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (modal.style.display === "block") {
        if (e.key === "ArrowLeft") {
          prevBtn.click();
        } else if (e.key === "ArrowRight") {
          nextBtn.click();
        } else if (e.key === "Escape") {
          closeBtn.click();
        }
      }
    });
  }
  // Wait for DOM
  document.addEventListener("DOMContentLoaded", function () {
    setupLightbox();
  });
})();
