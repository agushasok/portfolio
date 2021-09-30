document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        const activeEl = document.querySelector('.item.active');
        if (activeEl === item) return;

        setTimeout(() => {
            activeEl.querySelector('.content').classList.remove('content-bordered');
        }, 760)
        activeEl.classList.remove('active');
        item.querySelector('.content').classList.add('content-bordered');
        item.classList.add('active');

        if (item.querySelector('p').innerText === 'Работы' ) {
            item.querySelectorAll('.cover').forEach((elem, i) => setTimeout(() => {
                elem.classList.add('cover-animation');
            }, (i + 1) * 200));
        }

        if (activeEl.querySelector('p').innerText === 'Работы') {
            activeEl.querySelectorAll('.cover').forEach((elem, i) => setTimeout(() => {
                elem.classList.remove('cover-animation');
            }, (i + 1) * 200));
        }
    })
});

const marqueeEl = document.querySelector('.marquee');
const marqueeTextEl = marqueeEl.querySelector('.action');

for (let i = 0; i <= Math.ceil(window.innerWidth / marqueeTextEl.clientWidth); i++) {
    marqueeEl.append(marqueeTextEl.cloneNode(true));
}
