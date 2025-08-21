// justified-gallery.js
// Lightweight script to create justified rows in a gallery
// Usage: include after your images are rendered in the gallery-grid

(function() {
  const container = document.querySelector('.gallery-grid');
  if (!container) return;
  const images = Array.from(container.querySelectorAll('img'));
  if (!images.length) return;

  // Settings
  const rowHeight = 340; // px, matches your CSS
  const gap = 8; // px, matches your CSS gap
  const containerWidth = container.clientWidth;
  let row = [], rowAspect = 0;

  function flushRow(isLastRow = false) {
    if (!row.length) return;
    // Calculate total aspect ratio for the row
    const totalAspect = row.reduce((sum, img) => sum + img.naturalWidth / img.naturalHeight, 0);
    // Calculate height to make row fit exactly
    let targetHeight = (containerWidth - gap * (row.length - 1)) / totalAspect;
    // Only scale up to 1.25x rowHeight for a more filled look
    if (!isLastRow && targetHeight > rowHeight * 1.25) targetHeight = rowHeight * 1.25;
    // Never shrink below 80% of rowHeight
    if (targetHeight < rowHeight * 0.8) targetHeight = rowHeight * 0.8;
    row.forEach(img => {
      img.style.height = `${targetHeight}px`;
      img.style.width = `${targetHeight * (img.naturalWidth / img.naturalHeight)}px`;
      img.style.objectFit = 'cover';
      img.style.marginBottom = '0.5rem';
      img.style.marginRight = '0.5rem';
    });
    row = [];
    rowAspect = 0;
  }

  images.forEach((img, i) => {
    // Wait for images to load
    if (!img.complete) {
      img.onload = () => location.reload();
    }
    const aspect = img.naturalWidth / img.naturalHeight;
    row.push(img);
    rowAspect += aspect;
    // If row is full, flush
    if ((containerWidth - gap * (row.length - 1)) / rowAspect < rowHeight * 1.15) {
      flushRow();
    }
  });
  // Flush any remaining images, allow last row to be less than full width
  flushRow(true);
})();
