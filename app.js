// юзав animate.css щоб не возитись з стилями

const parent = document.body,
      url = 'https://solovey.com.ua/test/data.json';
 
// отримання данних з json
const getResource = async (url) => {
    let res = await fetch(url);

    const response = await res.json();

    if (res.ok) {
        parent.innerHTML = ''
        createElements(response);
    } else {
        throw new Error (`Could not fetch ${url}, status ${res.status}`)
    }
};
// динамічне створення слайдів банера

const createElements = (response) => {
    const {currency, sneakers : data} = response;

    data.forEach(({model, price, image_url, link}) => {
        let banner = document.createElement('a');
        banner.classList.add('banner', 'animate__animated');
        banner.setAttribute('href', link, 'target', '_blank')
        banner.setAttribute('target', '_blank')

        banner.innerHTML = `
            <img class="banner__logo" src="./img/NikeLogo.svg" alt="Logo">
            <h1 class="banner__model">${model}</h1>
            <div class="banner__wrapper">
                <div class="banner__price">${currency}${price}</div>
                <img  class="banner__model-photo" src=${image_url} alt="">
            </div>
            <button class="banner__buy">ORDER NOW!</button>
        `
        parent.prepend( banner)
    })
}

// функція додавання анімації і слайдера

let slideIndex = 1;     

const addAnimation = () => {
    const items = Array.from(document.getElementsByClassName('banner'));

    const showSlides = (n) => {
        if (n > items.length) {
            slideIndex = 1;
        }
        
        items.forEach(item => {
            item.classList.add('animate__slideInRight');
            item.style.display = 'none';
        });

        items[slideIndex - 1].style.display = 'flex';
        slideIndex++;
    } 
    
    showSlides(slideIndex);

    setInterval(() => {
        showSlides(slideIndex);
    }, 5000);

}

// ще один варіант


// const createElements = (response) => {
//     const {currency, sneakers : data} = response;

//     data.forEach(({model, price, image_url, link}) => {
//         let banner = document.createElement('a');
//         banner.classList.add('banner');
//         banner.setAttribute('href', link, 'target', '_blank')
//         banner.setAttribute('target', '_blank')

//         banner.innerHTML = `
//             <img class="banner__logo" src="./img/NikeLogo.svg" alt="Logo">
//             <h1 class="banner__model animate__animated animate__slideInLeft">${model}</h1>
//             <div class="banner__wrapper animate__animated animate__slideInRight">
//                 <div class="banner__price">${currency}${price}</div>
//                 <img  class="banner__model-photo" src=${image_url} alt="">
//             </div>
//             <button class="banner__buy">ORDER NOW!</button>
//         `
//         parent.prepend( banner)
//     })
// }

// // функція додавання анімації і слайдера

// let slideIndex = 1;     

// const addAnimation = () => {
//     const items = Array.from(document.getElementsByClassName('banner'));
//     const buy = Array.from(document.getElementsByClassName('banner__buy '));

//     const showSlides = (n) => {
//         if (n > items.length) {
//             slideIndex = 1;
//         }

//         items.forEach(item => {
//             item.style.display = 'none';
//         });

//         items[slideIndex - 1].style.display = 'flex';
//         slideIndex++;
//     } 
    
//     showSlides(slideIndex);

//     setInterval(() => {
//         showSlides(slideIndex);
//     }, 5000);

// }

// запуск всього цього діла

getResource(url)
    .then(addAnimation)



