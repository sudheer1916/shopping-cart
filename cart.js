let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');
let basket = JSON.parse(localStorage.getItem("data")) || [];
//console.log(shopItemsData);
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);
    //console.log(basket.map((x) => x.item).reduce((x,y) => x+y,0));
};

calculation();

let generateCartItems = () => {
    if(basket.length !== 0){
        return shoppingCart.innerHTML = basket.map((x) => {
            //console.log(x);
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || []
            return `<div class = "cart-item"> 
                <img src="${search.img}" alt="" width = "100">
                <div class = "details">
                    <div class="title-price-x">
                        <h4 class ="title-price">
                            <p> ${search.name}</p>
                            <p class ="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${search.id})" class="fa-solid fa-xmark"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${x.id})" class="fa-solid fa-minus"></i>
                        <div id=${x.id} class="quantity"> ${item} </div>
                        <i onclick="increment(${x.id})"class="fa-solid fa-plus"></i>
                    </div>
                    <h3>
                        $ ${item * search.price} </h3>
                    </h3>
                </div>
            </div>`;
            }
        ).join(""); 
    }
    else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2> Cart is empty </h2>
            <a href="index.html">
                <button class = "HomeBtn"> back to home </button>
            </a>
        `
    }
}
generateCartItems(); 

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
    generateCartItems(); 
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
    generateCartItems(); 
    localStorage.setItem("data",JSON.stringify(basket)); 
};

let update = (id) => {
    let search = basket.find((x) => {return x.id === id});
    //console.log(search);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id)=>{
    basket = basket.filter((x)=> x.id !== id);
    //console.log("item removed..."+ id);
    generateCartItems(); 
    totalAmount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
};
let clearCart = () =>{
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}
let totalAmount = () =>{
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) => x+y,0);
        label.innerHTML = `
            <h2 class = "bill"> Total Bill : $ ${amount} </h2>
            <button class="checkout"> Checkout</button>
            <button onclick="clearCart()" class="removeAll"> Remove All </button>
            `;
        //console.log(amount);
    }
    else return;
}

totalAmount();

