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

function loadData(varName) {
    return JSON.parse(sessionStorage.getItem(varName));
}

function saveData(varName, value) {
    sessionStorage.setItem(varName, JSON.stringify(value));
}

// THÔNG SỐ KỸ THUẬT
function renderInforTable(in4Pr1, in4Pr2) {
    let html = "";
    html +=
        `<table class="table table-striped table-bordered">
                <colgroup>
                    <col span="1" style="width: 10%;">
                    <col span="1" style="width: 45%;">
                    <col span="1" style="width: 45%;">
                </colgroup>
                <tbody>`

    for (let x in in4Pr1) {
        html +=
            `<tr>
                        <th scope="row">${x}</th>
                        <td>${in4Pr1[x]}</td>
                        <td>${in4Pr2[x]}</td>
                    </tr>`
    }
    html +=
        `</tbody>
            </table>`

    // console.log(html);
    document.getElementById('add-infor-table').innerHTML = html;
}


const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function renderProduct(pro, id) {
    let k = VND.format(pro.Price);
    html =
        `<h5 class="text-secondary" style="height: 120px">${pro.Name}</h5>
        <img src=${pro.Imgs[0]} style="height: 300px; object-fit: contain">
        <div class="d-flex justify-content-between" style="width: 200px">
            <p class="text-muted">Giá chỉ từ:</p>
            <h5 class="text-danger">${k}</h5>
        </div>
        <input type="button" value="Chi tiết" class="${pro._id} btn btn-success see-but " style="width: 120px"/>`
    document.getElementById(id).innerHTML = html;
}

async function getData(id) {
    // const URL = 'https://mmt-main-dbserver.vercel.app/api/product/' + id;
    // const URL = 'https://mmt-main-dbserver.vercel.app/api/product/645089b1949d7403165740df';

    // const URL = `https://mmt-main-dbserver.vercel.app/api/category/${id}`;
    const URL = `https://db-mmt-2-nhat.vercel.app/api/category/${id}`;
    
    let response = await fetch(URL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
};

let pro1ID;
let pro2ID;
let pro1Infor;
let pro2Infor;

async function render() {
    pro1ID = loadData("Lap1Id");
    pro2ID = loadData("Lap2Id");

    pro1Infor = await getData(pro1ID);
    pro2Infor = await getData(pro2ID);
    
    pro1Infor = pro1Infor.Category;
    pro2Infor = pro2Infor.Category;

    renderInforTable(JSON.parse(pro1Infor.Desc), JSON.parse(pro2Infor.Desc))
    renderProduct(pro1Infor, "add-product-1")
    renderProduct(pro2Infor, "add-product-2")
}

async function main() {
    await render();

    let toDetail = document.querySelectorAll('.product input');

    toDetail.forEach((detail) => {
        detail.addEventListener('click', function (event) {
            // console.log("save");
            let id = this.classList.item(0);
            // console.log(className);

            // Chuyển đổi đối tượng thành một chuỗi JSON
            let idJSON = JSON.stringify(id);

            // // Lưu trữ chuỗi JSON vào localStorage với một khóa bất kỳ (ví dụ: "user")
            sessionStorage.setItem("groupID", idJSON);

            // Chuyển hướng sang trang thứ hai (ví dụ: page2.html)
            window.location.href = "../Compare_Page/compPg.html";
        });
    })
}

main();
