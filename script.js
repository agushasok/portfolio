import { projects } from "./projects.js";

const caseEl = document.querySelector('.case');
const backBtnFunc = () => {
    caseEl.classList.remove('case-show');
    caseEl.classList.add('case-hide');
    setTimeout(() => {
        caseEl.classList.remove('case-hide');
        caseEl.classList.add('d-none');
    }, 500)
};

function fillProjects() {
    projects.forEach((item, i) => {
        const project = document.createElement('div');
        project.classList.add('project')
        project.innerHTML = `
            <div class="cover-info d-none">
                <h2>${item.tile.title}</h2>
                <p> ${item.tile.description} </p>
            </div>
            <div class="cover-wrapper">
                <img src="./projects/${item.tile.coverImgUrl}" alt="Обложка Чайка">
            </div>
        `

        document.querySelector('.projects').append(project);

        project.addEventListener('click', () => {
            document.querySelector('.case-content').innerHTML = `
                <img class="back-btn" src="./icons/arrow.svg" alt="arrow">
                <div class="header" style="background-image: url('./projects/${item.systemName}/${item.case.mainImgUrl}')"></div>
                <h1 class="case-title"> ${item.case.title} </h1>
                <p class="description"> ${item.case.description} </p>
                ${item.case.content.map(contentItem => {
                    switch (contentItem.type) {
                        case 'text':
                            return '<p class="info">' + contentItem.data + '</p>'
                        case 'images':
                            return '<div class="media-block">' + contentItem.data.map(imgUrl => 
                                '<div class="img-wrapper"><img class="image" src="./projects/'
                                + item.systemName
                                + '/'
                                + imgUrl
                                + '" alt=""></div>'
                            ).join('') + '</div>'
                            case 'video':
                                return '<div class="media-block"><div class="img-wrapper"><video loop autoplay class="video" src="./projects/'
                                    + item.systemName
                                    + '/'
                                    + contentItem.data
                                    + '"></video></div></div>'
                    }
                }).join('')}
            `;

            document.querySelector('.back-btn').removeEventListener('click', backBtnFunc);
            document.querySelector('.back-btn').addEventListener('click', backBtnFunc);
        });

        project.addEventListener('click', () => {
            caseEl.classList.remove('d-none');
            setTimeout(() => caseEl.classList.add('case-show'), 0);
        });

        setTimeout(() => {
            project.querySelector('.cover-wrapper').classList.add('cover-animation');
        }, (i + 1) * 200);

        setTimeout(() => {
            project.querySelector('.cover-info').classList.remove('d-none');
        }, (i + 1) * 200 + 700);
    });

    document.querySelectorAll('.project img').forEach(elem => {
        elem.style.width = document.querySelector('.project').clientWidth + 'px';
    })
}

document.querySelectorAll('.item').forEach(item => {
    item.querySelector('.label-wrapper').addEventListener('click', () => {
        const activeEl = document.querySelector('.item.active');
        if (activeEl === item) {
            if (activeEl.querySelector('p').innerText === 'работы') {
                document.querySelector('.back-btn').click();
            }
            return;
        }

        setTimeout(() => {
            activeEl.querySelector('.content').classList.remove('content-bordered');
        }, 760)
        activeEl.classList.remove('active');
        item.querySelector('.content').classList.add('content-bordered');
        item.classList.add('active');

        if (item.querySelector('p').innerText === 'работы' ) {
            fillProjects();
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
