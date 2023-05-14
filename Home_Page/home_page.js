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
    let html = 
        `<ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">`
    
    for (let category of categories) {
        html +=
            `<li class="nav-item">
                <a class="nav-link active" aria-current="page" href=${category.linkPage}>${category.name}</a>
            </li>`
    }
    html += `</ul>`

    // html +=
    //     `<form class="d-flex" role="search">
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

function renderButtons(categories) {
    let html = "";

    for (x of categories) {
        html +=
            `<input type="button" onclick="window.location.href='${x.linkPage}';" value="${x.name}"
                class="my-4 mx-2 btn btn-success"/>`
    }

    document.getElementById("add-buttons-here").innerHTML = html;
}

renderButtons(categories);

let clickCategoryButtons = document.querySelectorAll('#add-buttons-here input');

clickCategoryButtons.forEach((cate) => {
    cate.addEventListener('click', function (event) {
        // console.log("save");
        let cateName = this.value;
        console.log(cateName);

        // Chuyển đổi đối tượng thành một chuỗi JSON
        let cateNameJSON = JSON.stringify(cateName);

        // // Lưu trữ chuỗi JSON vào localStorage với một khóa bất kỳ (ví dụ: "user")
        sessionStorage.setItem("cateName", cateNameJSON);

        // Chuyển hướng sang trang thứ hai (ví dụ: page2.html)
        // window.location.href = "../Compare_Page/compPg.html";
    });
})