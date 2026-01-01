const menuToggle = document.getElementById('menuToggle');
const menu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
});
