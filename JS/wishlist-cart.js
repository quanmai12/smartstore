var cartListProduct = []

const btnCartList = document.querySelectorAll('.wish-list tbody')
btnCartList.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
        var btnItem = event.target
        var product = btnItem.parentElement.parentElement

        var productImg = product.querySelector('img').src
        var productName = product.querySelector('.product-content h4').innerHTML
        var productPriceUnit = product.querySelector('.unit-price p span').innerHTML
        var productPriceDiscount = product.querySelector('.unit-discount p span').innerHTML
        var productNumber = 1
        
        var productArray = [productImg, productName, productPriceUnit, productPriceDiscount, productNumber]
        

        cartListProduct.push(productArray);
        sessionStorage.setItem("cartListProduct", JSON.stringify(cartListProduct))
        product.remove()
    })
})

const btnCartDetail = document.querySelectorAll(".product .buy--btn")
btnCartDetail.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
        var btnItem = event.target
        var product = btnItem.parentElement.parentElement

        console.log(product)

        var productImg = product.querySelector('.product .photo-main img').src
        var productName = product.querySelector('.product .product__info h1').innerHTML
        var productPriceUnit = product.querySelector('.product .product__info .price-number').innerHTML
        var productPriceDiscount = 0
        var productNumber = 1
        
        var productArray = new Array(productImg, productName, productPriceUnit, productPriceDiscount, productNumber)
        
        
        

        var check = 0
        for (var i = 0; i < cartListProduct.length; i++) {
            if ( cartListProduct[i][1] == productName) {
                check = 1; 
                productNumber +=  cartListProduct[i][4] 
                cartListProduct[i][4] = productNumber
                sessionStorage.setItem("cartListProduct", JSON.stringify(cartListProduct))
                break
            }
        }
        if (check == 0) {
            cartListProduct.push(productArray);
            sessionStorage.setItem("cartListProduct", JSON.stringify(cartListProduct))
        }
        showCountCartProduct()
    })
})

showCartListProduct_Page()
cartDelete()
cartTotal()
showCountCartProduct()


function showCountCartProduct() {
    document.querySelector("#header .m-basket").innerHTML = cartListProduct.length
}



function showCartListProduct_Page() {
    var cartList =sessionStorage.getItem("cartListProduct")
    var cartListProduct = JSON.parse(cartList)
    var cartProduct = "";
    for (let i = 0; i < cartListProduct.length; i++) { 
        cartProduct += '<tr><td><div class="cart-product-content"><img src="'+ cartListProduct[i][0] +'" width="100px" height="100px" alt=""><div class="product-content"><h4>'+ cartListProduct[i][1] +'</h4><span>Estimated delivery within 5 working days</span><div class="product-content-btn"><button class="btn-remove" type="button">Remove</button></div></div></div></td><td><div class="cart-qty-content"><input class="cart-input" min="1" type="number" onblur="cartTotal(this)" onclick="cartTotal(this)" value="'+ parseInt(cartListProduct[i][4]) +'"></div></td><td><p>$'+ cartListProduct[i][3] +'</p></td><td><p>$<span class="price-value">'+ cartListProduct[i][2] +'</span></p></td></tr>'
    }

    document.querySelector(".cart-list tbody").innerHTML = cartProduct
}

function cartTotal() {
    var cartProductTotal = "";
    let subTotal = 0

    var cartItem = document.querySelectorAll('.cart-list tbody tr')
    for (let i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input").value
        var priceValue = cartItem[i].querySelector(".price-value").innerHTML

        var total = inputValue*priceValue
        subTotal += total
    }
    cartProductTotal += '<div><span>'+ cartItem.length +'</span></div><div><span>$0</span></div><div><span>$'+ subTotal +'</span></div>'
    document.querySelector(".cart-list .total-number").innerHTML = cartProductTotal

}

function cartDelete () {
    var cartItem = document.querySelectorAll('.cart-list tbody tr')
    for (var i = 0; i < cartItem.length; i++) {
        var cartProduct = document.querySelectorAll('.cart-list .btn-remove')
        cartProduct[i].addEventListener("click", function(event) {
            var cartDelete = event.target
            var cartItemDelete = cartDelete.parentElement.parentElement.parentElement.parentElement.parentElement

            cartItemDelete.remove()
            cartTotal()
        })
    }
}



