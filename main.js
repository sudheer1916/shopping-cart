let shop = document.getElementById('shop');

//let basket = [];.
let basket = JSON.parse(localStorage.getItem("data")) || [];

// function abcd(){}        //regular function declaration
let generateShop = ()  => {          //es6 arrow function declaration
    return (shop.innerHTML = shopItemsData.map((x) => {
        // let {id, name, price, desc, img} = x;    //destructuing
        let search = basket.find((k) => k.id === x.id) || [];
        return `
        <div id = product-${x.id} class="item">
        <img width="218px" src="${x.img}" alt="" />
        <div class="item-details">
          <h3>${x.name}</h3>
          <p>
            ${x.desc}
          </p>
          <div class="price-quantity">
            <h2>$ ${x.price}</h2>
            <div class="buttons">
              <i onclick="decrement(${x.id})" class="fa-solid fa-minus"></i>
              <div id=${x.id} class="quantity"> 
                    ${search.item === undefined ? 0 : search.item} 
              </div>
              <i onclick="increment(${x.id})"class="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
    `
    }).join("")); 
};        
generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    if(search === undefined){
        
        basket.push({
        id: selectedItem,
        item: 1,
    });
    }
    else{
        search.item += 1;
    }
    
    //console.log(basket);
    update(selectedItem);
    localStorage.setItem("data",JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
    
    if(search === undefined || search.item === 0){
        return ;
    }
    else{
        search.item -= 1;
    }
    update(selectedItem);
    basket = basket.filter((k) => k.item !== 0 ); 
    //console.log(basket);
    
    localStorage.setItem("data",JSON.stringify(basket)); 
};

let update = (id) => {
    let search = basket.find((x) => {return x.id === id});
    //console.log(search);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);
    //console.log(basket.map((x) => x.item).reduce((x,y) => x+y,0));
    
    // let sum = 0;
    // console.log(basket.map((x) => {
    //     sum += x.item;
    //     return sum;
    // }));
};

calculation();