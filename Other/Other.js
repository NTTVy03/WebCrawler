// CATEGORIES
let categories = [
    {
        name: 'Laptop',
        linkPage: '../Laptop_Page/lapPg.html'
    },
    {
        name: 'Chuột',
        linkPage: '../Other/Other.html'
    },
    {
        name: 'Màn hình',
        linkPage: '../Other/Other.html'
    },
    {
        name: 'Ổ cứng',
        linkPage: '../Other/Other.html'
    },
    {
        name: 'Bàn phím',
        linkPage: '../Other/Other.html'
    },
    {
        name: 'RAM',
        linkPage: '../Other/Other.html'
    },
]

function renderCategories(categories) {
    let html = "";
    html +=
        `<ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">`
    
    for (let category of categories) {
        // console.log(category);
        html +=
            `<li class="nav-item">
                <a class="nav-link active" aria-current="page" href=${category.linkPage}>${category.name}</a>
            </li>`
    }
    html += `</ul>`

    html +=
        `<form class="d-flex" role="search">
            <input class="searchText form-control me-2" type="search" placeholder="Nhập vào đây nè" aria-label="Search">
            <button id="search" class="btn btn-outline-success" type="submit">Search</button>
        </form>`

    // console.log(html);
    document.getElementById('navbarScroll').innerHTML = html;
}

renderCategories(categories);

let clickCategories = document.querySelectorAll('.nav-item');

clickCategories.forEach((cate) => {
    cate.addEventListener('click', function (event) {
        // console.log("save");
        let cateName = this.querySelector("li a").innerHTML;
        // console.log(cateName);

        // Chuyển đổi đối tượng thành một chuỗi JSON
        let cateNameJSON = JSON.stringify(cateName);

        // // Lưu trữ chuỗi JSON vào localStorage với một khóa bất kỳ (ví dụ: "user")
        sessionStorage.setItem("cateName", cateNameJSON);

        // Chuyển hướng sang trang thứ hai (ví dụ: page2.html)
        // window.location.href = "../Compare_Page/compPg.html";
    });
})

function renderFooterPages(categories) {
    let html = "";
    
    for (let category of categories) {
        // console.log(category);
        html +=
            `<p class="footer-category">
                <a href=${category.linkPage} class="text-reset">${category.name}</a>
            </p>`
    }

    // console.log(html);
    document.getElementById('add-footer-pages-here').innerHTML = html;
}

renderFooterPages(categories);

let clickFooterCategories = document.querySelectorAll('.footer-category');

clickFooterCategories.forEach((cate) => {
    cate.addEventListener('click', function (event) {
        // console.log("save");
        let cateName = this.querySelector("p a").innerHTML;
        // console.log(cateName);

        // Chuyển đổi đối tượng thành một chuỗi JSON
        let cateNameJSON = JSON.stringify(cateName);

        // // Lưu trữ chuỗi JSON vào localStorage với một khóa bất kỳ (ví dụ: "user")
        sessionStorage.setItem("cateName", cateNameJSON);

        // Chuyển hướng sang trang thứ hai (ví dụ: page2.html)
        // window.location.href = "../Compare_Page/compPg.html";
    });
})

// END RENDER CATEGORIES 

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

let product;
// const brandList = ["Asus", "Lenovo", "Dell"]; // code CỨNG
let perPage = document.querySelector('#mySelect option[selected]').value;
let sortOpt = document.querySelector('#sort-select option[selected]').value;
let idPage = 1;
let start = 0;
let end = perPage;
let productArr = [];
const pageConfig = document.querySelector('.page-config select');
const sortConfig = document.querySelector('.sort-config select');
const mySelect = document.getElementById('mySelect');
const sortSelect = document.getElementById('sort-select');
const countTotalPage = document.querySelector('.total-page');
const countTotalProduct = document.querySelector('.total-item');
let totalPages;
const searchText = document.querySelector('.searchText');
const searchBtn = document.getElementById('search');
// let proArea;

function loadCateName() {
    return JSON.parse(sessionStorage.getItem("cateName"));
}

async function getData() {
    let cateName = loadCateName();
    // console.log(cateName)
    // const URL = 'https://mmt-main-dbserver.vercel.app/api/category?quantity=100&type=' + cateName;
    const URL = 'https://db-mmt-2-nhat.vercel.app/api/category?quantity=100&type=' + cateName;
    // console.log(URL);
    let response = await fetch(URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
};


function highlightText() {
    const title = document.querySelectorAll('.get-pro-title');
    title.forEach((title, index) => {
        let titleText = title.innerHTML;
        // console.log(titleText)
        let indexOf = Number(titleText.toLocaleLowerCase().indexOf(searchText.value.toLocaleLowerCase()));
        let searchTextLength = searchText.value.length;
        titleText = titleText.substring(0, indexOf) + "<span style='background-color: #FFFF00; color: red'>" + titleText.substring(indexOf, indexOf + searchTextLength)
            + "</span>" + titleText.substring(indexOf + searchTextLength, titleText.length);
        title.innerHTML = titleText;
        // console.log(titleText);
    })
}

function renderProduct(product) {
    if (productArr.length === 0) {
        $('.no-result').css('display', 'block')
    } else {
        $('.no-result').css('display', 'none')
    }
    html = '';
    const content = product.map((item, index) => {
        if (index >= start && index < end) {
            // Imgs[], Name, Price, Type, _id
            let formatedPrice = VND.format(item.Price)
            // console.log(formatedPrice)
            html +=
                `<a href="../Compare_Page/compPg.html" style="text-decoration: none;" class="col-md-12 col-lg-4 mb-4 mb-lg-0 mt-3 go-to-compare-page">
                <div class="card content__product__item" id="${item._id}">
                    <img src=${item.Imgs[0]}
                        class="card-img-top" alt=${item.Type} style="height: 250px; object-fit: contain;"/>
                    <div class="m-3">
                        <h6 class="get-pro-title mb-3"  style="height: 130px">${item.Name}</h6>

                        <div class="d-flex justify-content-between">
                            <p class="text-muted">Giá chỉ từ:</p>
                            <h5 class="text-danger">${formatedPrice}</h5>
                        </div>
                    </div>
                </div>
            </a> `
            return html;
        }
    });
    // console.log(html);
    document.getElementById('product').innerHTML = html;
    highlightText();



    // add click product listener
    proArea = document.querySelectorAll('.go-to-compare-page');

    proArea.forEach((area) => {
        area.addEventListener('click', function (event) {
            // console.log("save");
            let id = this.querySelector(".card.content__product__item").id;
            // console.log(id);

            // Chuyển đổi đối tượng thành một chuỗi JSON
            let idJSON = JSON.stringify(id);

            // Lưu trữ chuỗi JSON vào localStorage với một khóa bất kỳ (ví dụ: "user")
            sessionStorage.setItem("groupID", idJSON);

            // Chuyển hướng sang trang thứ hai (ví dụ: page2.html)
            // window.location.href = "../Compare_Page/compPg.html";
        });
    })
}

function renderListPage(totalPages) {
    // console.log(totalPages);
    let html = '';
    html += `<li class="current-page active"><a>${1}</a></li>`;
    for (let i = 2; i <= totalPages; i++) {
        html += `<li><a>${i}</a></li>`;
    }
    if (totalPages === 0) {
        html = ''
    }
    document.getElementById('number-page').innerHTML = html;

    if (totalPages === 1) {
        document.querySelector('.page .btn-next').classList.add('btn-no-active');
    }
}

function initRender(productAr, totalPage) {
    renderProduct(productAr);
    renderListPage(totalPage);
}

function getCurrentPage(indexPage) {
    start = (indexPage - 1) * perPage;
    end = indexPage * perPage;
    totalPages = Math.ceil(productArr.length / perPage);
    countTotalPage.innerHTML = `Số trang: ${totalPages}`;
    countTotalProduct.innerHTML = `Số sản phẩm:  ${productArr.length}`
}

searchBtn.addEventListener('click', (event) => {
    // console.log(1);
    event.preventDefault();
    idPage = 1;
    productArr = [];
    // console.log(product);
    product.forEach((item, index) => {
        if (item.Name.toLocaleLowerCase().indexOf(searchText.value.toLocaleLowerCase()) != -1) {
            productArr.push(item);
        }
    });
    getCurrentPage(idPage);
    initRender(productArr, totalPages);
    changePage();
    if (totalPages <= 1) {
        $('.btn-prev').addClass('btn-no-active');
        $('.btn-next').addClass('btn-no-active');
    } else {
        $('.btn-next').removeClass('btn-no-active');
    }
});

searchText.addEventListener("keyup", (event) => {
    // console.log(searchText.value)
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click();
    }
});

pageConfig.addEventListener('change', () => {
    idPage = 1;
    perPage = Number(pageConfig.value);
    getCurrentPage(idPage);
    initRender(productArr, totalPages);
    if (totalPages == 1) {
        $('.btn-prev').addClass('btn-no-active');
        $('.btn-next').addClass('btn-no-active');
    } else {
        $('.btn-next').removeClass('btn-no-active');
    }
    changePage();
});

sortConfig.addEventListener('change', () => {
    sortOtp = Number(sortConfig.value);
    // console.log('Sort option: ', sortOtp);
    productArr = productArr.sort((a, b) => {
        return (a.Price - b.Price) * sortOtp;
    })

    initRender(productArr, totalPages);
});

function changePage() {
    const idPages = document.querySelectorAll('#number-page li');
    const a = document.querySelectorAll('#number-page li a');
    for (let i = 0; i < idPages.length; i++) {
        idPages[i].onclick = function () {
            let value = i + 1;
            const current = document.querySelectorAll('#number-page .active');
            // console.log(current);
            current[0].classList.remove('active');
            this.classList.add('active');

            $('.btn-prev').removeClass('btn-no-active');
            $('.btn-next').removeClass('btn-no-active');
            if (value == 1) $('.btn-prev').addClass('btn-no-active');
            if (value == idPages.length) $('.btn-next').addClass('btn-no-active');

            idPage = value;
            getCurrentPage(idPage);
            renderProduct(productArr);
        };
    }
}

$('.btn-next').on('click', () => {
    idPage++;
    if (idPage > totalPages) {
        idPage = totalPages;
    }
    if (idPage == totalPages) {
        $('.btn-next').addClass('btn-no-active');
    } else {
        $('.btn-next').removeClass('btn-no-active');
    }
    // console.log(idPage);
    const btnPrev = document.querySelector('.btn-prev');
    if (idPage > 1) btnPrev.classList.remove('btn-no-active');
    $('.number-page li').removeClass('active');
    $(`.number-page li:eq(${idPage - 1})`).addClass('active');
    getCurrentPage(idPage);
    renderProduct(productArr);
});

$('.btn-prev').on('click', () => {
    idPage--;
    if (idPage <= 0) {
        idPage = 1;
    }
    if (idPage == 1) {
        $('.btn-prev').addClass('btn-no-active');
    } else {
        $('.btn-prev').removeClass('btn-no-active');
    }
    const btnNext = document.querySelector('.btn-next');
    if (idPage < totalPages) btnNext.classList.remove('btn-no-active');
    $('.number-page li').removeClass('active');
    $(`.number-page li:eq(${idPage - 1})`).addClass('active');
    getCurrentPage(idPage);
    renderProduct(productArr);
});

async function render() {
    product = await getData();
    // console.log(product);

    // render product --> success
    productArr = product;
    totalPages = Math.ceil(productArr.length / perPage);

    initRender(productArr, totalPages);

    getCurrentPage(1);

    changePage();

    // brandRender(brandList);

    // console.log(proArea);
    // console.log(document.querySelector(".go-to-compare-page"));
    // console.log(document.querySelector(".go-to-compare-page div"));
    // console.log(document.querySelector(".go-to-compare-page div").id);
}

async function main() {
    await render();
}

main();