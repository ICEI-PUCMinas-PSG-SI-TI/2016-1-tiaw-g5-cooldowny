lucide.createIcons();

const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (items.length > 0) {
    let currentIndex = 0;

    function updateCarousel(index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.remove('opacity-0', 'scale-95', 'z-0');
                item.classList.add('opacity-100', 'scale-100', 'z-10');
            } else {
                item.classList.remove('opacity-100', 'scale-100', 'z-10');
                item.classList.add('opacity-0', 'scale-95', 'z-0');
            }
        });
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.remove('bg-zinc-700');
                dot.classList.add('bg-amber-500', 'w-4');
            } else {
                dot.classList.remove('bg-amber-500', 'w-4');
                dot.classList.add('bg-zinc-700');
            }
        });
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % items.length; updateCarousel(currentIndex); });
    if (prevBtn) prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + items.length) % items.length; updateCarousel(currentIndex); });

    updateCarousel(currentIndex);
}

function atualizarUsuarioSidebar() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const loginLink = document.getElementById('loginLink');
    if (!loginLink) return;

    if (usuarioLogado) {
        loginLink.innerHTML = `
            <i data-lucide="user-check" class="w-6 h-6 p-1 bg-zinc-800 rounded-full"></i>
            <span class="text-sm">${usuarioLogado.nome}</span>
        `;
        loginLink.href = '#';
        loginLink.title = 'Clique para sair';
        loginLink.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem('usuarioLogado');
            window.location.href = 'login.html';
        };
    } else {
        loginLink.innerHTML = `
            <i data-lucide="user" class="w-6 h-6 p-1 bg-zinc-800 rounded-full"></i> Login
        `;
        loginLink.href = 'login.html';
        loginLink.onclick = null;
    }

    lucide.createIcons();
}

atualizarUsuarioSidebar();
