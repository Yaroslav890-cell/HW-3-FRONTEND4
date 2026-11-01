

const images = document.querySelectorAll('.lazy-image');

const buttons = document.querySelectorAll('.load-btn');


function loadImage(img) {

    if (img.dataset.loading === 'true' || img.dataset.loaded === 'true') {
        return;
    }


    img.dataset.loading = 'true';


    const tempImage = new Image();


    tempImage.onload = function () {

        img.src = img.dataset.src;


        img.classList.add('loaded');

        img.dataset.loaded = 'true';
        delete img.dataset.loading;


        const button = img.parentElement.querySelector('.load-btn');
        button.textContent = 'Завантажено';
        button.disabled = true;
    };


    tempImage.onerror = function () {
        img.dataset.loading = 'false';
        img.alt = 'Не вдалося завантажити зображення';
    };


    tempImage.src = img.dataset.src;
}
const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {

            const img = entry.target;


            loadImage(img);


            observer.unobserve(img);
        }

    });

}, {

    rootMargin: '100px'
});
images.forEach(img => {
    observer.observe(img);
});

buttons.forEach(button => {

    button.addEventListener('click', function () {

        const img = button.parentElement.querySelector('.lazy-image');
        loadImage(img);

        observer.unobserve(img);

    });

});
