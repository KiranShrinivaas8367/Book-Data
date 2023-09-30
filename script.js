let carticon = document.getElementById('cart-icon')
let cart = document.querySelector(".cart")

//Open-Cart
carticon.addEventListener("click",()=>{
    cart.classList.add("active");
})

//Buy-now Open-cart
let addCarts = document.getElementsByClassName('add-cart')
// console.log(addCarts)
for(let i=0;i<addCarts.length;i++){
    let  addCart = addCarts[i];
    addCart.addEventListener('click',()=>{
        console.log('hello')
        cart.classList.add('active')
    })
}

//Close-Cart
let closeCart = document.querySelector(".close-cart")

closeCart.addEventListener("click",()=>{
    cart.classList.remove('active')
})

//cart working
// console.log(document.readyState)

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready);
}
else
ready();

function ready(){
    //remove items 
    let removeItems = document.getElementsByClassName('cart-remove');
    // console.log(removeItems.length)
    for(let i=0;i<removeItems.length;i++){
        let removeBtn = removeItems[i];
        removeBtn.addEventListener('click',removeCartProduct);
    }

    //Quantity changer
    let quantityCounts = document.getElementsByClassName("cart-quantity")
    for(let i=0;i<quantityCounts.length;i++){
        let quantityCount = quantityCounts[i];
        quantityCount.addEventListener('change',quantityUpdate);
    }

    //Items to add in Cart
    let addItems = document.querySelectorAll(".add-cart");
    for(let i=0;i<addItems.length;i++){
        let addItem = addItems[i];
        addItem.addEventListener('click',cartAdded);
    }

    //Buy Btn
    let buyBtn = document.querySelector('.btn-buy');
    buyBtn.addEventListener('click',()=>{
        alert("Order is Placed");
        let cartContent = document.querySelector('.cart-content')
        while(cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild)
        }
        updateTotal();
    })
}

function removeCartProduct(event){
    let btnclicked = event.target;
    console.log(btnclicked.parentElement.parentElement)
    btnclicked.parentElement.parentElement.remove()
    updateTotal();
}

//Quantity Update function
function quantityUpdate(event){
    let input = event.target
    if(isNaN(input.value) || input.value<=0){
        input.value=1;
    }
    updateTotal();
}

//cartAdd function
function cartAdded(event){
    let input = event.target
    // console.log(input)
    let shopProducts = input.parentElement.parentElement
    let productName = shopProducts.getElementsByClassName('product-name')[0].innerText
    
    let price = input.parentElement
    let priceValue = price.querySelector('.price').innerText

    let prodImg = shopProducts.querySelector('.prod-img').src
    
    // console.log(shopProducts.querySelector(".product-name").innerText)
    console.log(productName,priceValue,prodImg);
    addProdCart(productName,priceValue,prodImg);
    updateTotal();
}

function addProdCart(productName,priceValue,prodImg){
    let cartBuyBox = document.createElement("div")
    cartBuyBox.classList.add('cart-box')

    let cartProds = document.getElementsByClassName('cart-content')[0]
    let cartProdsItems = cartProds.getElementsByClassName('cart-product-title')
    
    for(let i=0;i<cartProdsItems.length;i++){ 
        if(cartProdsItems[i].innerText == productName){
            alert('You have already added');
            return;
        }
    }

    cartBuyBox.innerHTML = `<img src="${prodImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${productName}</div>
        <div class="cart-price">${priceValue}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!--Remove Cart-->
    <!-- <i class='bx bxs-trash-alt cart-remove'></i> -->
    <svg class="cart-remove" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(28, 28, 28, 1);transform: ;msFilter:;"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
    `
    cartProds.append(cartBuyBox);
    cartBuyBox.querySelector('.cart-remove').addEventListener('click',removeCartProduct);
    cartBuyBox.querySelector('.cart-quantity').addEventListener('change',quantityUpdate);
}



//Update cart total
function updateTotal(){
    let cartContent = document.getElementsByClassName('cart-content')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    let total=0;

    for(let i=0;i<cartBoxes.length;i++){
        let cartBox = cartBoxes[i];
        let priceElt = cartBox.getElementsByClassName("cart-price")[0];
        let quantityElt = cartBox.getElementsByClassName("cart-quantity")[0];
        
        let price = parseInt(priceElt.innerText.replace("Rs.",""));
        let quantity = quantityElt.value;
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100;
    document.querySelector(".total-price").innerText = "Rs. " + total;
}
// updateTotal();

// //cart-total-Rs
// let total = document.querySelector('.total-price')
// let price = document.getElementsByClassName('cart-price')

// console.log(price.length)
// let final;

// for(let i=0;i<price.length;i++){
//     let rate = price[i];
//     // console.log(rate)
//     final = parseInt(total.textContent + rate.textContent);   
// }
// // console.log(final)
// total.textContent=final