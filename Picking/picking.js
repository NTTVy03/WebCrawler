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

async function getData() {
    // const URL = 'https://mmt-main-dbserver.vercel.app/api/category?quantity=100&type=laptop';
    const URL = 'https://db-mmt-2-nhat.vercel.app/api/category?quantity=100&type=laptop';
    
    let response = await fetch(URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
};

let products;
let productsName = [];

function getInfor(products, lapName) {
    for (let pro of products) {
        if (lapName == pro.Name) {
            return pro._id;
        }
    }

    return null;
}

function save(varName, value) {
    console.log(value);
    sessionStorage.setItem(varName, JSON.stringify(value));
}

async function render() {
    products = await getData();

    for (let product of products) {
        productsName.push(product.Name);
    }
    
    renderLaptopList(productsName);
}

async function main() {
    await render();

    document.getElementById('go-to-two-laptops').addEventListener('click', function(event) {
        let lap1 = document.getElementById("laptop-1").value;
        let lap2 = document.getElementById("laptop-2").value;

        if (lap1.length == 0 || lap2.length == 0 ) {
            alert('Vui lòng nhập đủ tên 2 laptop');
            return;
        }

        if (lap1 == lap2) {
            alert('Tên 2 laptop phải khác nhau');
            return;
        }

        let lap1Id = getInfor(products, lap1);
        if (!lap1Id) {
            alert('Tên laptop 1 không hợp lệ!');
            return;
        }

        let lap2Id = getInfor(products, lap2);
        if (!lap2Id) {
            alert('Tên laptop 2 không hợp lệ!');
            return;
        }

        save("Lap1Id", lap1Id);
        save("Lap2Id", lap2Id);
        
        window.location.href = "../Two_Products/two_products.html";
    })

}

main();

function renderLaptopList(laptopName) {
    let html = "";

    for (x of laptopName) {
        html += `<option value='${x}'></option>`
    }

    // console.log(html);
    document.getElementById("laptop-list").innerHTML = html;
}

