/* HarvestGH shared site behavior */
(function () {
  function openDrawer() {
    var d = document.getElementById('mobDrawer');
    var b = document.getElementById('mobBackdrop');
    if (d) d.classList.add('open');
    if (b) b.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    var d = document.getElementById('mobDrawer');
    var b = document.getElementById('mobBackdrop');
    if (d) d.classList.remove('open');
    if (b) b.classList.remove('open');
    document.body.style.overflow = '';
  }
  window.openDrawer = openDrawer;
  window.closeDrawer = closeDrawer;

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.getElementById('mainNav');
    if (nav && nav.classList.contains('nav-hero')) {
      window.addEventListener('scroll', function () {
        nav.classList.toggle('scrolled', window.scrollY > 60);
      }, { passive: true });
    }
  });
})();
