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

        if (item.querySelector('p').innerText === 'работы' ) {
            item.querySelectorAll('.cover-wrapper').forEach((elem, i) => setTimeout(() => {
                elem.classList.add('cover-animation');
            }, (i + 1) * 200));

            item.querySelectorAll('.project').forEach(elem => {
                elem.addEventListener('click', (e) => {
                    document.querySelector('.case').classList.add('case-show');
                });
            });

            item.querySelectorAll('.cover-info').forEach((elem, i) => {
                setTimeout(() => {
                    elem.classList.remove('d-none');
                }, (i + 1) * 200 + 700);
            });
        }

        if (activeEl.querySelector('p').innerText === 'работы') {
            activeEl.querySelectorAll('.cover-wrapper').forEach((elem, i, parent) => setTimeout(() => {
                elem.classList.remove('cover-animation');
            }, (parent.length - i - 1) * 80));
            activeEl.querySelectorAll('.cover-info').forEach(elem => {
                elem.classList.add('d-none');
            });
        }
    })
});

const marqueeEl = document.querySelector('.marquee');
const marqueeTextEl = marqueeEl.querySelector('.action');

for (let i = 0; i <= Math.ceil(window.innerWidth / marqueeTextEl.clientWidth); i++) {
    marqueeEl.append(marqueeTextEl.cloneNode(true));
}

document.querySelectorAll('.project img').forEach(elem => {
    elem.style.width = document.querySelector('.project').clientWidth + 'px';
})
