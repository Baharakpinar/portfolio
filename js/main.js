// DARK MODE
document.addEventListener('DOMContentLoaded', () => {
    const darkToggle = document.querySelector("#darkmode-toggle");

    darkToggle.addEventListener('change', () => {
        if (darkToggle.checked) {
            // Dark moda geçti
            document.documentElement.style.setProperty('--main-color', '#a3a3a3ff');
            document.documentElement.style.setProperty('--second-color', '#1E3A8A');
            document.documentElement.style.setProperty('--accent-color', '#1E3A8A');
            document.documentElement.style.setProperty('--highlight-color', '#d0cdd1');
            document.documentElement.style.setProperty('--text-color', '#000000');
            document.documentElement.style.setProperty('--bg-color', '#f5f5f5');
            document.documentElement.style.setProperty('--header-color', '#fff');
            document.documentElement.style.setProperty('--portfolio-color', 'rgba(107, 107, 107, 1)');

        } else {
            // Açık moda döndü
            document.documentElement.style.setProperty('--main-color', '#f2f2f2');
            document.documentElement.style.setProperty('--second-color', '#1E3A8A');
            document.documentElement.style.setProperty('--accent-color', '#1E3A8A');
            document.documentElement.style.setProperty('--highlight-color', '#d0cdd1');
            document.documentElement.style.setProperty('--text-color', '#413f3f');
            document.documentElement.style.setProperty('--bg-color', '#000000');
            document.documentElement.style.setProperty('--portfolio-color', 'rgb(202, 202, 202)');
            document.documentElement.style.setProperty('--header-color', '#fff');
        }
    });
});

// Responsive menü navbar

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.querySelector(".navlist");
    const menuIcon = document.getElementById("menu-icon");
    const header = document.querySelector(".header");

    // Menü açma/kapatma
    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("open");

        // Menü ikonunu değiştir (bars <-> x)
        if (navList.classList.contains("open")) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-x");
        } else {
            menuIcon.classList.remove("fa-x");
            menuIcon.classList.add("fa-bars");
        }
    });

    // Scroll ile gizle/göster
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll) {
            // Aşağı kaydırma → gizle
            header.style.top = "-60px"; // header yüksekliğine göre ayarla
        } else {
            // Yukarı kaydırma → göster
            header.style.top = "0";
        }

        lastScroll = currentScroll;
    });
});

// skills
document.addEventListener("DOMContentLoaded", () => {
    const skillCards = document.querySelectorAll(".skills-content");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // gecikmeli görünme efekti
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 200); // her kutu 0.2sn arayla açılır
            }
        });
    }, {
        threshold: 0.2   // %20 görünür olunca tetikle
    });

    skillCards.forEach(card => observer.observe(card));
});


// portfolio
let currentIndex = 0;
const itemsPerPage = 6;
let allItems = [];
let observer; // global observer referansı

// Intersection Observer oluştur
function initObserver() {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 150); // sırayla 0.15 sn aralıkla açılır
            }
        });
    }, {
        threshold: 0.2
    });
}

fetch('data/portfolio.json')
    .then(response => response.json())
    .then(data => {
        data = data.filter(item => item.date && !isNaN(new Date(item.date)));
        allItems = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        initObserver(); // observer başlat
        showItems();
    });

function showItems() {
    const container = document.querySelector('.portfolio-container');
    const nextItems = allItems.slice(currentIndex, currentIndex + itemsPerPage);

    nextItems.forEach(item => {
        const content = document.createElement('div');
        content.className = 'portfolio-content';
        content.setAttribute('onclick', `window.location.href='pages/portfolio.html?id=${item.id}'`);
        content.style.cursor = 'pointer';
        content.innerHTML = `
            <div class="image-wrapper">
                <img src="${item.coverPhoto}" alt="" />
                <div class="overlay">
                    <h3>${item.mainTitle}</h3>
                    <p>${item.subTitle1}</p>
                </div>
            </div>
        `;
        container.appendChild(content);
        observer.observe(content); // yeni eklenen kartı gözlemle
    });

    currentIndex += itemsPerPage;
    if (currentIndex >= allItems.length) {
        document.getElementById('portfolio-btn').style.display = 'none';
    }
}

document.getElementById('portfolio-btn').addEventListener('click', function (e) {
    e.preventDefault();
    showItems();
});
