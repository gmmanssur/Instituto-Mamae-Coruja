// Navbar toggle functionality
const toggle = document.querySelector('.navbar-toggle');
const menu = document.querySelector('.navbar-menu');

toggle.addEventListener('click', (event) => {
  event.stopPropagation();
  const isOpen = menu.classList.toggle('active');
  toggle.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (event) => {
    const clickedOutside =
        !menu.contains(event.target) &&
        !toggle.contains(event.target);

    if (clickedOutside && menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
    }
});

// Count Hero Metrics Animation
const counters = document.querySelectorAll('.stat-value');

const animateCounter = (element) => {
    const target = +element.innerText.replace('+', '');
    let current = 0;
    const increment = target / 400;

    const update = () => {
        current += increment;
        if (current < target) {
            element.innerText = Math.floor(current) + '+';
            requestAnimationFrame(update);
        } else {
            element.innerText = target + '+';
        }
    };

    update();
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

counters.forEach(counter => observer.observe(counter));

// Popup Join Project Modal Functionality
const openBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('join');
const closeBtn = document.querySelector('.closeBtn');
const container = document.querySelector('.container');
const btnSubmitModal = document.getElementById('modal-submit-btn');

openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
    }
});

btnSubmitModal.addEventListener('click', () => {
    if (!document.getElementById('name').value || !document.getElementById('phone').value || !document.getElementById('interest').value) {
        showAlert('Por favor, preencha todos os campos antes de enviar.');
        return;
    }

    SendToWpp();
});

function SendToWpp() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const interest = document.getElementById('interest').value;
    const wppNumber = '5511983829301';

    let wppMessage = `Olá, meu nome é ${name}.\n\n`;
    wppMessage += `Gostaria de fazer parte do projeto como ${interest} do Instituto Mamãe Coruja.\n\n`;
    wppMessage += `O meu número para contato é o ${phone}.\n\n`;
    wppMessage += `Quero ajudar a transformar vidas!`;

    const encodedMessage = encodeURIComponent(wppMessage);

    const wppURL = `https://wa.me/${wppNumber}?text=${encodedMessage}`;

    showAlert('Redirecionando para o WhatsApp...', 2000);
    window.open(wppURL, '_blank');
}

// Alert customization
function showAlert(message, duration = 3000) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    alertMessage.textContent = message;
    alertBox.classList.add('show');

    setTimeout(() => {
        alertBox.classList.remove('show');
    }, duration);
}

// Donate funcionality
function openPixDonationModal(imagePath) {
    if (document.getElementById('pix-donation-modal')) return;

    const modalWrapper = document.createElement('div');
    modalWrapper.id = 'pix-donation-modal';

    modalWrapper.innerHTML = `
        <div class="pix-donation-overlay">
            <div class="pix-donation-content" role="dialog" aria-modal="true">
                <button class="pix-donation-close" aria-label="Fechar modal">&times;</button>

                <img src="${imagePath}" alt="QR Code para doação PIX">

                <p class="pix-donation-key">
                    Chave PIX: instituto.mamaecoruja@yahoo.com
                </p>
            </div>
        </div>
    `;

    document.body.appendChild(modalWrapper);
    document.body.classList.add('pix-modal-open');

    modalWrapper.querySelector('.pix-donation-close').onclick = closePixDonationModal;

    modalWrapper.querySelector('.pix-donation-overlay').onclick = (e) => {
        if (e.target.classList.contains('pix-donation-overlay')) {
            closePixDonationModal();
        }
    };
}

function closePixDonationModal() {
    const modal = document.getElementById('pix-donation-modal');
    if (modal) {
        modal.remove();
        document.body.classList.remove('pix-modal-open');
    }
}

//Gallery overlay functionality
const collectPhotos = [
    'assets/coletas/1.jpg',
    'assets/coletas/2.jpg',
    'assets/coletas/3.jpg',
    'assets/coletas/4.jpg',
    'assets/coletas/5.jpg',
    'assets/coletas/6.jpg',
    'assets/coletas/7.jpg',
    'assets/coletas/8.jpg',
    'assets/coletas/9.jpg',
    'assets/coletas/10.jpg',
    'assets/coletas/11.jpg',
    'assets/coletas/12.jpg',
    'assets/coletas/13.jpg'
]

const organizationPhotos = [
    'assets/santos/1.jpg',
    'assets/santos/2.jpg',
    'assets/santos/3.jpg',
    'assets/santos/4.jpg',
    'assets/santos/5.jpg',
]

const participationPhotos = [
    'assets/eventos/1.jpg',
    'assets/eventos/2.jpg',
    'assets/eventos/3.jpg',
    'assets/eventos/4.jpg',
    'assets/eventos/5.jpg',
    'assets/eventos/6.jpg',
    'assets/eventos/7.jpg',
    'assets/eventos/8.jpg',
    'assets/eventos/9.jpg',
    'assets/eventos/10.jpg',
    'assets/eventos/11.jpg',
    'assets/eventos/12.jpg',
    'assets/eventos/13.jpg',
    'assets/eventos/14.jpg',
    'assets/eventos/15.jpg',
    'assets/eventos/16.jpg',
]

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('collect')
        ?.addEventListener('click', () => openGalleryOverlay(collectPhotos));

    document.getElementById('organization')
        ?.addEventListener('click', () => openGalleryOverlay(organizationPhotos));

    document.getElementById('participation')
        ?.addEventListener('click', () => openGalleryOverlay(participationPhotos));
});

function openGalleryOverlay(gallery) {
    if (document.querySelector('.gallery-overlay')) return;
    
    let currentIndex = 0;

    const overlay = document.createElement('div');
    overlay.classList.add('gallery-overlay');

    overlay.innerHTML = `
        <div class="gallery-overlay-content">
            <button class="gallery-close" aria-label="Fechar galeria">&times;</button>
            <img src="${gallery[currentIndex]}" alt="Foto da galeria">
            <button class="gallery-prev" aria-label="Foto anterior">&#10094;</button>
            <button class="gallery-next" aria-label="Próxima foto">&#10095;</button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.classList.add('gallery-modal-open');

    const imgElement = overlay.querySelector('img');

    overlay.querySelector('.gallery-close').onclick = () => {
        overlay.remove();
        document.body.classList.remove('gallery-modal-open');
    };

    overlay.querySelector('.gallery-prev').onclick = () => {
        currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        imgElement.src = gallery[currentIndex];
    }

    overlay.querySelector('.gallery-next').onclick = () => {
        currentIndex = (currentIndex + 1) % gallery.length;
        imgElement.src = gallery[currentIndex];
    }
}

// Volunteer message
function sendMessageToWppOfVolunteer(volunteer) {
    let wppMessage = `Olá, gostaria de me voluntariar para ${volunteer}.\n\n`;
        wppMessage += `Quais informações preciso passar? E como posso ajudar?\n\n`;
        wppMessage += `Quero ajudar a transformar vidas!`;

    const encodedMessage = encodeURIComponent(wppMessage);

    const wppNumber = '5511983829301';

    const wppURL = `https://wa.me/${wppNumber}?text=${encodedMessage}`;

    showAlert('Redirecionando para o WhatsApp...', 2000);
    window.open(wppURL, '_blank');
}