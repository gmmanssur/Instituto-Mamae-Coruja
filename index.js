const menuToggle = document.getElementById('menuToggle');
const menu = document.querySelector('nav ul');
const modal = document.getElementById('joinModal');
const form = document.getElementById('joinForm');

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const joinModal = document.getElementById("joinModal");

const qrCodes = {
    baby: "assets/qrcode_50reais.png",
    premium: "assets/qrcode_100reais.png",
    vip: "assets/qrcode_valorlivre.png"
};

openModalBtn.addEventListener("click", () => {
    joinModal.hidden = false;
    joinModal.style.display = "flex";
    document.body.style.overflow = "hidden";
});

closeModalBtn.addEventListener("click", () => {
    joinModal.style.display = "none";
    document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
    if (e.target === joinModal) joinModal.style.display = "none";
});

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !email) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const whatsappMessage = `Oi! Gostaria de participar do projeto do Instituto Mamae Coruja.%0A%0A*Nome:* ${name}%0A*Telefone:* ${phone}%0A*Email:* ${email}%0A*Mensagem:* ${message || 'Não informado'}%0A%0AAguardo retorno!`;
    const whatsappUrl = `https://wa.me/5511983829301?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');

    form.reset();
    modal.style.display = 'none';
});

function openModalDonation(qrCodePath) {
    if (document.querySelector(".modal-overlay")) return;
    createDonationModal(qrCodePath);
}

function createDonationModal(qrCodePath) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal-donation";

    modal.innerHTML = `
        <button class="close-btn">&times;</button>
        <h2 style="color: purple">Doação:</h2>
        <img src="${qrCodePath}" alt="QR Code" />
        <p>Escaneie o QR Code acima ou utilize a chave pix abaixo:</p>
        <p><strong>instituto.mamaecoruja@yahoo.com</strong></p>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector(".close-btn").addEventListener("click", () => closeDonationModal(overlay));
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeDonationModal(overlay);
    });
}

function closeDonationModal(overlay) {
    overlay.classList.add("fade-out");
    setTimeout(() => overlay.remove(), 200);
}