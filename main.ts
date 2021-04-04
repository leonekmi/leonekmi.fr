import './main.scss';

// Alias for document.getElementById
const EBID: typeof document.getElementById = document.getElementById.bind(document);

function scrollListener() {
    // Activate menu only after scroll
    if (EBID('bio').getBoundingClientRect().bottom < 0) {
        EBID('menu').className = 'menu active';
        let activeSection: 'passions' | 'creations' | 'competences';
        if (EBID('passions').getBoundingClientRect().top < 0) {
            activeSection = 'passions';
        } else if (EBID('creations').getBoundingClientRect().top < 0) {
            activeSection = 'creations';
        } else {
            activeSection = 'competences';
        }
        document.querySelectorAll<HTMLButtonElement>('#menu button').forEach(btn => {
            if (btn.dataset.link === activeSection) {
                btn.className = 'active';
            } else {
                btn.className = '';
            }
        });
    } else {
        EBID('menu').className = 'menu';
        document.querySelectorAll<HTMLButtonElement>('#menu button').forEach(btn => {
            btn.className = '';
        });
    }
}

function clickListener(e: MouseEvent) {
    const target = (e.target as HTMLButtonElement).dataset.link;
    console.log(EBID(target));
    window.scrollBy({ top: EBID(target).getBoundingClientRect().top+10, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.scrollY > 0) {
        document.body.className = 'skip-animation';
    }
    document.querySelectorAll<HTMLButtonElement>('#menu button').forEach(btn => {
        btn.addEventListener('click', clickListener);
    });
    scrollListener();
}, { passive: true });

document.addEventListener('scroll', scrollListener, { passive: true });
