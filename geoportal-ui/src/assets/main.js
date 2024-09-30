function updateCesiumContainerHeight() {
    const container = document.getElementById('cesiumHolder');
    if (container) {
      const windowHeight = window.innerHeight;
      container.style.height = `${windowHeight - 51}px`;
    }
}


window.addEventListener('resize', updateCesiumContainerHeight);
window.onload = updateCesiumContainerHeight;