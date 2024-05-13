    let data = JSON.parse(localStorage.getItem("key"));
    const box = document.querySelector("img");
    const n = document.querySelector(".n");   
    const img = document.querySelector(".img");
    const p1 = document.querySelector(".p1");
    const p2 = document.querySelector(".p2");
    const p3 = document.querySelector(".p3");
    const p4 = document.querySelector(".p4");
    const red = document.querySelector(".red");
    const black = document.querySelector(".black");
    const b1 = document.querySelector(".b1");
    const b2 = document.querySelector(".b2");
    const b3 = document.querySelector(".b3");
    const addtc = document.querySelector(".addtc");
    const corzina = document.querySelector(".corzina");
    const modal = document.querySelector(".modal");
    const close = document.querySelector(".close");
    const close2 = document.querySelector(".close2");
    const s = document.querySelector(".s");
    let tprice = document.querySelector(".tottal-price");
    let rakam = document.querySelector(".rakam");

    n.innerHTML = "Home / " + data.fields.name.toUpperCase();
    img.src = data.fields.image[0].url;

    corzina.onclick = () => {
    modal.style.display = "block";
    modal.id = "show";
    };

    close2.onclick = () => {
    modal.style.display = "none";
    };

    close.onclick = () => {
    modal.style.display = "none";
    };
    p1.innerHTML = data.fields.name.toUpperCase();
    p2.innerHTML = "BY " + data.fields.company.toUpperCase();
    p3.innerHTML = "$" + data.fields.price;

    b1.style.backgroundColor = data.fields.colors[0];
    b2.style.backgroundColor = data.fields.colors[1];
    b3.style.backgroundColor = data.fields.colors[2];

    if (!Array.isArray(data)) {
    data = [data];  
    }


    console.log(data);

    data.forEach((e) => {
    addtc.onclick = () => {
        modal.style.display = "block";
        modal.id = "show";
        const i = JSON.stringify(e);
        localStorage.setItem("elm", i);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let l = cart.find((item) => item.id == e.id);
        if (!l) {
        cart.push(e);
        localStorage.setItem("cart", JSON.stringify(cart));
        } else {
        mag(cart);
        tottal();

        let pid = e.id;
        let count = parseInt(localStorage.getItem(`count_${pid}`)) || 0;
        count++;

        localStorage.setItem(`count_${pid}`, count);

        return;
        }

        mag(cart);
    };
    });

    function mag(elm) {
    s.innerHTML = "";
    elm?.forEach((e) => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        let name = document.createElement("p");
        let price = document.createElement("p");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");
        let pilus = document.createElement("p");
        let x = document.createElement("p");
        x.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg>`;

        x.onclick = () => {
        let pid = e.id;
        localStorage.removeItem(`count_${pid}`);

        tottal();

        div.remove();

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart = cart.filter((item) => item.id !== pid);

        localStorage.setItem("cart", JSON.stringify(cart));
        };

        pilus.innerHTML = "+";
        let pid = e.id;
        let count = parseInt(localStorage.getItem(`count_${pid}`)) || 1;
        let totalPrice = Math.floor(Math.floor(count * e.fields.price));
        let tp = localStorage.setItem("m", Math.floor(count * e.fields.price));
        let m = localStorage.getItem("m");
        pilus.onclick = () => {
        count++;
        totalPrice = Math.floor(count * e.fields.price);
        price.innerHTML = "$" + Math.floor(count * e.fields.price);
        localStorage.setItem(`count_${pid}`, count);
        cnt.innerHTML = count;
        tottal();
        };

        let cnt = document.createElement("p");
        cnt.innerHTML = localStorage.getItem(`count_${pid}`) || 1;

        let minus = document.createElement("button");
        minus.innerHTML = "-";
        minus.onclick = () => {
        if (count > 1) {
            count--;
            totalPrice = Math.floor(count * e.fields.price);
            price.innerHTML = "$" + totalPrice.toFixed(2);
            localStorage.setItem(`count_${pid}`, count);
            cnt.innerHTML = count;
            tottal();
        }
        };
        function Rakam() {
        rakam.innerHTML = elm.length;
        }
        Rakam();

        img.src = e.fields.image[0].url;
        name.innerHTML = e.fields.name.toUpperCase();
        price.innerHTML = "$" + m;

        div3.append(pilus, cnt, minus);
        div2.append(name, price, div3);
        div.append(img, div2, x);
        s.append(div);

        div3.classList = "d3";
        div2.classList = "d2";
        div.classList = "d";
        img.classList = "c-img";
        name.classList = "c-name";
        price.classList = "c-price";
        pilus.classList = "pilus";
        cnt.classList = "cnt";
        minus.classList = "minus";
        x.classList = "x";
    });
    }

    const cart = JSON.parse(localStorage.getItem("cart"));
    mag(cart);

    function tottal() {
    const cart1 = JSON.parse(localStorage.getItem("cart"));
    let totalPrice = 0;

    cart1?.forEach((item) => {
        const count = parseInt(localStorage.getItem(`count_${item.id}`)) || 1;
        localStorage.setItem(
        "tottalprice",
        (totalPrice += Math.floor(count * item.fields.price))
        );
    });

    tprice.innerHTML =
        "Tottal Price : " + "$" + localStorage.getItem("tottalprice");
    }
    tottal();
