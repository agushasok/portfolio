import {projects} from "./projects.js";

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
                        return '<div class="media-block"><div class="img-wrapper">' +
                            '<video loop playsinline data-wf-ignore="true" data-object-fit="cover" autoplay class="video" src="./projects/'
                            + item.systemName
                            + '/'
                            + contentItem.data
                            + '"></video></div></div>'
                }
            }).join('')}
            `;

            setTimeout(() => {
                document.querySelector('.case-show').scrollTo(0, 0);
            }, 10)

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

        // setTimeout(() => {
        //     project.addEventListener('mouseenter', e => {
        //         const activeProj = document.querySelector('.active-proj');
        //
        //         if (project.offsetTop > activeProj?.offsetTop) {
        //             project.querySelector('.cover-wrapper').style.width = '100%';
        //             project.querySelector('.cover-wrapper').style.transition = 'height .7s';
        //
        //             setTimeout(() => project.querySelector('.cover-wrapper').style.height = '0', 100)
        //         }
        //
        //         e.target.classList.add('active-proj')
        //         activeProj?.classList.remove('active-proj')
        //
        //         // console.log('X: ', e.offsetX);
        //         // console.log('project: ', project);
        //     })
        // }, 0);

        setTimeout(() => {
            project.querySelector('.cover-info').classList.remove('d-none');
        }, (i + 1) * 200 + 700);
    });

    document.querySelectorAll('.project img').forEach(elem => {
        elem.style.width = document.querySelector('.project').clientWidth + 'px';
    })
}

function fillAboutUs() {
    const imageNumber = Math.round(Math.random() * 2) + 1;
    document.querySelector('.about-me-img').style.backgroundImage = 'url("./about-us/Photo_' + imageNumber + '.png")';
}

function fillContacts() {
    const imageNumber = Math.round(Math.random() * 2);
    document.querySelector('.contacts-img').style.backgroundImage = 'url("./contacts/Photo_0' + imageNumber + '.png")';
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

        if (item.querySelector('p').innerText === 'работы') {
            document.querySelector('.about-me-img').style.backgroundPosition = 'center top'
            document.querySelector('.contacts-img').style.backgroundPosition = 'center bottom'
            fillProjects();
        }

        if (item.querySelector('p').innerText !== 'работы') {
            setTimeout(
                () => document.querySelector('.projects').innerHTML = '',
                700
            );
        }

        if (activeEl.querySelector('p').innerText === 'работы') {
            activeEl.querySelectorAll('.cover-wrapper')
                .forEach((elem, i, parent) => setTimeout(() => {
                    elem.classList.remove('cover-animation');
                }, (parent.length - i - 1) * 80));
            activeEl.querySelectorAll('.cover-info').forEach(elem => {
                elem.classList.add('d-none');
            });
        }

        if (item.querySelector('p').innerText === 'о нас') {
            if (activeEl.querySelector('p').innerText === 'контакты') {
                document.querySelector('.contacts-img').style.backgroundPosition = 'center top'
                document.querySelector('.about-me-img').style.backgroundPosition = 'center bottom'
            }
            fillAboutUs();
        }
        if (item.querySelector('p').innerText === 'контакты') {
            if (activeEl.querySelector('p').innerText === 'о нас') {
                document.querySelector('.contacts-img').style.backgroundPosition = 'center top'
                document.querySelector('.about-me-img').style.backgroundPosition = 'center bottom'
            }
            fillContacts();
        }
    })
});

const marqueeEl = document.querySelector('.marquee');
const marqueeTextEl = marqueeEl.querySelector('.action');

for (let i = 0; i <= Math.ceil(window.innerWidth / marqueeTextEl.clientWidth); i++) {
    marqueeEl.append(marqueeTextEl.cloneNode(true));
}

document.querySelectorAll('.about-me-img').forEach(item =>
    item.style.backgroundSize = 'auto ' + document.querySelector('.item.active').clientHeight + 'px'
)

fillAboutUs();
