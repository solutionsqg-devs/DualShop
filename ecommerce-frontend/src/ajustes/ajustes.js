document.addEventListener('DOMContentLoaded', function () {
    var offcanvasExample = document.getElementById('offcanvasExample');
    var offcanvasNavbar = document.getElementById('offcanvasNavbar');
    var navbar = document.querySelector('.navbar');

    offcanvasExample.addEventListener('show.bs.offcanvas', function () {
        navbar.classList.add('navbar-offcanvas-open');
    });

    offcanvasExample.addEventListener('hidden.bs.offcanvas', function () {
        navbar.classList.remove('navbar-offcanvas-open');
    });

    offcanvasNavbar.addEventListener('show.bs.offcanvas', function () {
        navbar.classList.add('navbar-offcanvas-open');
    });

    offcanvasNavbar.addEventListener('hidden.bs.offcanvas', function () {
        navbar.classList.remove('navbar-offcanvas-open');
    });
});
