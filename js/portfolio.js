// DARK MODE
document.addEventListener('DOMContentLoaded', () => {
    const darkToggle = document.querySelector("#darkmode-toggle");

    darkToggle.addEventListener('change', () => {
        if (darkToggle.checked) {
            // Dark moda geçti
            document.documentElement.style.setProperty('--main-color', '#6e6e6e');
            document.documentElement.style.setProperty('--second-color', '#1E3A8A');
            document.documentElement.style.setProperty('--accent-color', '#3B82F6');
            document.documentElement.style.setProperty('--highlight-color', '#d0cdd1');
            document.documentElement.style.setProperty('--text-color', '#000000');
            document.documentElement.style.setProperty('--bg-color', '#f5f5f5');
            document.documentElement.style.setProperty('--header-color', '#fff');

        } else {
            // Açık moda döndü
            document.documentElement.style.setProperty('--main-color', '#f2f2f2');
            document.documentElement.style.setProperty('--second-color', '#1E3A8A');
            document.documentElement.style.setProperty('--accent-color', '#3B82F6');
            document.documentElement.style.setProperty('--highlight-color', '#d0cdd1');
            document.documentElement.style.setProperty('--text-color', '#413f3f');
            document.documentElement.style.setProperty('--bg-color', '#000000');
            document.documentElement.style.setProperty('--header-color', '#fff');
        }
    });
});


//Content loading
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const contentId = urlParams.get('id');

    fetch('../data/portfolio.json')
        .then(response => response.json())
        .then(data => {
            const content = data.find(item => item.id == contentId);
            if (!content) {
                document.getElementById('portfolio-details').innerHTML = '<p>İçerik bulunamadı.</p>';
                return;
            }

            const banner = document.getElementById('banner');
            banner.innerHTML = `<img src="${content.coverPhoto}" alt="" class="banner-img">`;



            const container = document.getElementById('portfolio-details');

            if (content.mainTitle) {
                const title1 = document.createElement('h1');
                title1.classList.add('main-title');
                title1.textContent = content.mainTitle;
                container.appendChild(title1);
            }

            for (let i = 1; i <= 7; i++) {
                const subTitle = content[`subTitle${i}`];
                const description = content[`description${i}`];
                const img = content[`img${i}`];

                if (subTitle && description && img) {
                    const item = document.createElement('div');
                    item.classList.add('portfolio-item');
                    item.innerHTML = `
                        <h3>${subTitle}</h3>
                        <p>${description}</p>
                        <img src="${img}" alt="${subTitle}" />
                    `;
                    container.appendChild(item);
                }
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById('portfolio-details').innerHTML = '<p>İçerik yüklenemedi.</p>';
        });
});


// sidebar

let currentIndex2 = 0;
const itemsPerPage2 = 5;
let allItems2 = [];

fetch('../data/portfolio.json')
    .then(response => response.json())
    .then(data => {
        data = data.filter(item => item.date && !isNaN(new Date(item.date)));
        allItems2 = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        showItems2();
    });

function showItems2() {
    const sidebar = document.querySelector('.sidebar');
    const nextItems = allItems2.slice(currentIndex2, currentIndex2 + itemsPerPage2);

    nextItems.forEach(item => {
        const content = `
            <div class="recentPost-content" onclick="window.location.href='../pages/portfolio.html?id=${item.id}'" style="cursor:pointer;">
                <div class="recentPost-category">
                    <span>${item.category}</span>
                </div>
                <div class="recentContent-title">
                    <h4>${item.mainTitle}</h4>
                </div>
            </div>
        `;
        sidebar.innerHTML += content; // burada DOM'a ekleniyor
    });
}

