import { searchUser, rangeinp } from "./api.js";

let box = document.querySelector(".box");
let modal = document.querySelector(".modal");
let search = document.querySelector(".search");
const all = document.querySelector(".all");
const Ikea = document.querySelector(".Ikea");
const Marcos = document.querySelector(".Marcos");
const Caressa = document.querySelector(".Caressa");
const Liddy = document.querySelector(".Liddy");
let priceValue = document.querySelector(".priceValue");
let range = document.querySelector(".range")
let s = document.querySelector(".s");
let rakam = document.querySelector(".rakam");
let tprice = document.querySelector(".tottal-price");
const close = document.querySelector(".close");
const close2 = document.querySelector(".close2");
let corzina = document.querySelector(".corzina");




corzina.onclick = () => {
  modal.style.display = "block";
  modal.id = "show";
};



close.onclick = () => {
  modal.style.display = "none";
};


search.oninput = () => {
    searchUser(search.value);
};

Ikea.onclick = () => {
    searchUser(Ikea.innerHTML.trim());
};
Marcos.onclick = () => {
    searchUser(Marcos.innerHTML.trim());
};
Caressa.onclick = () => {
    searchUser(Caressa.innerHTML.trim());
};
Liddy.onclick = () => {
    searchUser(Liddy.innerHTML.trim());
};
all.onclick = () => {
    searchUser("");
};

priceValue.innerHTML = "?";
range.oninput = () => {
  priceValue.innerHTML = "Value : $" + range.value;
  rangeinp();
};





function get(data) {
    box.innerHTML = "";
    // Save data to local storage
    localStorage.setItem('apiData', JSON.stringify(data));
    
    data.forEach(elem => {
        let container = document.createElement("div");
        container.classList.add("container");

        let img = document.createElement("img");
        img.classList.add("img");

        elem.fields.image.forEach((e) => {
            img.src = e.url;
        });

        let name = document.createElement("h2");
        name.innerHTML = elem.fields.name;
        name.classList.add("name");
        name.style.color = "#00000061";
        name.style.fontFamily = "monospace";
        name.style.fontSize = "26px";

        let price = document.createElement("p");
        price.innerHTML = "$" + elem.fields.price;
        price.classList.add("price");
        price.style.fontWeight = "700";
        price.style.fontSize = "20px";
        price.style.fontFamily = "monospace";

        let buttonInfo = document.createElement("button");
        buttonInfo.classList.add("buttonInfo");
        let iconInfo = document.createElement("img")
        iconInfo.classList.add("iconInfo")
        iconInfo.style.width = "50px";
        iconInfo.style.height = "50px";
        iconInfo.src = "/home/img/icons8-info-50.png"
        buttonInfo.appendChild(iconInfo)
        buttonInfo.onclick = () => {
          const item = JSON.stringify(elem);
          localStorage.setItem("key", item);
          window.location.pathname = '/info-page/index.html'
        };

        let butonKorzin = document.createElement("button")
        butonKorzin.classList.add("butonKorzin")
        
        let iconKorzin = document.createElement("img")
        iconKorzin.classList.add("iconKorzin")
        iconKorzin.src = "/home/img/icons8-basket-50.png"
        iconKorzin.style.width = "50px";
        iconKorzin.style.height = "50px";
        butonKorzin.appendChild(iconKorzin)
        
        butonKorzin.onclick = () => {
          modal.style.display = "block";
          modal.id = "show";
          const i = JSON.stringify(elem);
          localStorage.setItem("elm", i);
    
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
          let l = cart.find((item) => item.id == elem.id);
          if (!l) {
            cart.push(elem);
            localStorage.setItem("cart", JSON.stringify(cart));
          } else {
            mag(cart);
            tottal();
    
            let pid = elem.id;
            let count = parseInt(localStorage.getItem(`count_${pid}`)) || 0;
            count++;
    
            localStorage.setItem(`count_${pid}`, count);
    
            return;
          }
    
          mag(cart);
        };
        
        


        container.appendChild(img);
        container.appendChild(buttonInfo);
        container.appendChild(butonKorzin);
        container.appendChild(name);
        container.appendChild(price);
        box.appendChild(container);
        
    });
}



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
      "Total Price : " + "$" + localStorage.getItem("tottalprice");
}

tottal();


close2.onclick = () => {
  modal.style.display = "none";
  localStorage.clear();
};



export { get };
