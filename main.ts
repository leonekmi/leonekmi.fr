import './main.scss';

// Alias for document.getElementById
const EBID: typeof document.getElementById = document.getElementById.bind(document);
// WebP images are only supported on Safari > 13
const isOldSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && parseInt(/Version\/([0-9]{2})/.exec(navigator.userAgent)[1]) <= 13;

function scrollListener() {
    // Activate menu only after scroll
    if (EBID('bio').getBoundingClientRect().bottom < 20) {
        EBID('menu').className = 'menu active';
        let activeSection: 'passions' | 'creations' | 'activites';
        if (EBID('passions').getBoundingClientRect().top < 20) {
            activeSection = 'passions';
        } else if (EBID('creations').getBoundingClientRect().top < 20) {
            activeSection = 'creations';
        } else {
            activeSection = 'activites';
        }
        document.querySelectorAll<HTMLButtonElement>('#menu button').forEach(btn => {
            if (btn.dataset.link === activeSection) {
                btn.className = 'active';
                EBID('menu').scrollBy({ left: btn.getBoundingClientRect().left - 10, behavior: 'smooth' });
            } else {
                btn.className = '';
            }
        });
    } else {
        EBID('menu').className = 'menu';
        document.querySelectorAll<HTMLButtonElement>('#menu button').forEach(btn => {
            btn.className = '';
        });
        EBID('menu').scrollTo({ left: 0, behavior: 'smooth' });
    }
}

function buttonClickListener(e: MouseEvent) {
    e.preventDefault();
    const target = (e.target as HTMLButtonElement).dataset.link;
    console.log(EBID(target));
    window.scrollBy({ top: EBID(target).getBoundingClientRect().top - 15, behavior: 'smooth' });
}

function imageClickListener(e: MouseEvent) {
    const target = (e.target as HTMLImageElement);
    document.querySelector<HTMLImageElement>('#modal img').src = target.src;
    document.querySelector<HTMLImageElement>('#modal img').srcset = target.srcset;
    document.querySelector<HTMLImageElement>('#modal img').alt = target.alt;
    EBID('modal').className = 'modal active';
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.scrollY > 0) {
        document.body.className = 'skip-animation';
    }
    document.querySelectorAll<HTMLButtonElement>('#menu button').forEach(btn => {
        btn.addEventListener('click', buttonClickListener);
    });
    document.querySelectorAll<HTMLImageElement>('*:not(.header):not(.modal) > img').forEach(img => {
        img.addEventListener('click', imageClickListener, { passive: true });
    });
    // WebP images are only supported on Safari > 13
    if (isOldSafari) {
        document.querySelectorAll<HTMLImageElement>('img').forEach(img => {
            img.removeAttribute('srcset');
        });
    }
    EBID('modal').addEventListener('click', () => {
        EBID('modal').className = 'modal';
    });
    scrollListener();
}, { passive: true });

document.addEventListener('scroll', scrollListener, { passive: true });
