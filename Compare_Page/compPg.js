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

    // html +=
    //     `<form class="d-flex" role="searchw">
    //         <input class="searchText form-control me-2" type="search" placeholder="Nhập vào đây nè" aria-label="Search">
    //         <button id="search" class="btn btn-outline-success" type="submit">Search</button>
    //     </form>`

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

let proGroup;


// THÔNG SỐ KỸ THUẬT
function renderInforTable(product) {
    let html = "";
    html +=
        `<h2 class="infor-header card-title">Thông số kỹ thuật</h2>
            <table class="table table-striped table-bordered">
                <colgroup>
                    <col span="1" style="width: 15%;">
                    <col span="1" style="width: 35%;">
                </colgroup>
                <tbody>`
    for (let x in product) {
        html +=
            `<tr>
                        <th scope="row">${x}</th>
                        <td>${product[x]}</td>
                    </tr>`
    }
    html +=
        `</tbody>
            </table>`

    document.getElementById('add-infor-table').innerHTML = html;
}

// SHOW HÌNH ẢNH
function renderImgShow(proImgs) {
    let html = "";

    html +=
        `<div class="mt-4 w3-content">
            <div class="row ms-0 show-img" style="width: 100%; height: 300px; overflow: hidden;">
                <img class="rounded-5 mySlides" src=${proImgs[0]} style="height: 100%; object-fit: contain;">`

    let numImgs = 5;
    if (proImgs.length < 5) numImgs = proImgs.length;

    // console.log(numImgs);

    for (let x = 1; x <= numImgs ; x++) {
        html +=
            `<img class="rounded-5 mySlides" src=${proImgs[x]} style="height: 100%; object-fit: contain; display:none">`
    }

    html +=
        `</div>`

    html +=
        `<div class="row ms-0 w3-section" style="width: 100%; height: 50px">`

    for (let x = 0; x < numImgs; x++) {
        html +=
            `<img class="demo rounded-3 w3-opacity w3-hover-opacity-off" src=${proImgs[x]} style="height: 100%; width:20%; cursor:pointer" onclick="currentDiv(${x + 1})">`
    }

    html +=
        `</div>
        </div>`

    // console.log(html);
    document.getElementById("add-imgs-show").innerHTML = html;
}

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    let i;
    let x = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-opacity-off";
}

// RENDER LIST PRODUCT

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function renderListProduct(listPro) {
    html = "";

    for (let pro of listPro) {
        let k = VND.format(pro.Price);
        try{
            html +=
                `<a style="width: 12rem; text-decoration: none; align-items: center;" class="card border-3 border-secondary m-3"
                href=${pro.Url}>
                    <img style="object-fit: contain; height: 40px;" class="card-img-top mt-1 mb-1"
                        src=${pro.WebsiteID.Icon}>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h5 class="text-danger">${k}</h5>
                        </li>
                    </ul>
                </a>`
        }
        catch(error) {
            console.log("productID = ", pro._id);
            console.log("error = ", error);
        }
    }

    // console.log(html);
    document.getElementById('add-list-products').innerHTML = html;
}

function renderProductName(proName, _id) {
    html = `<h3 class="text-dark my-4 mx-0" id=${_id}>${proName}</h3>`;
    document.getElementById('add-product-name').innerHTML = html;
}

async function getData(id) {
    // const URL = `https://mmt-main-dbserver.vercel.app/api/category/${id}`;
    const URL = `https://db-mmt-2-nhat.vercel.app/api/category/${id}`;
    
    // console.log(URL);
    let response = await fetch(URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
};

function loadData() {
    let groupIDJSON = sessionStorage.getItem("groupID");
    return JSON.parse(groupIDJSON);
}

async function main() {
    _id = loadData();
    console.log("Cmp = ", _id);
    proGroup = await getData(_id);
    
    let products = proGroup.Products;
    // console.log(products)
    proGroup = proGroup.Category;

    
    renderProductName(proGroup.Name, _id);
    renderListProduct(products);
    renderImgShow(proGroup.Imgs);
    renderInforTable(JSON.parse(proGroup.Desc));
};

main();




