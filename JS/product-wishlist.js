
var wishListProduct = []

const btnWishlist = document.querySelectorAll('.product-page .product-quality--like')
btnWishlist.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
        var btnItem = event.target
        var product = btnItem.parentElement
        var product2 = product.parentElement

        var productImg = product2.querySelector('img').src
        var productName = product2.querySelector('h3').innerText
        var productPrice = product2.querySelector('.product__price span').innerText
    
        var productArray = [productImg, productName, productPrice]

        var check = 0
        for (var i = 0; i < wishListProduct.length; i++) {
            if ( wishListProduct[i][1] == productName) {
                check = 1; 
                product.classList.remove('like')
                wishListProduct.splice(i, 1)
                showWishListProduct_Page()
                break
            }
        }
        if (check == 0) {
            product.classList.add('like')
            wishListProduct.push(productArray);
            sessionStorage.setItem("wishListProduct", JSON.stringify(wishListProduct))
        }
        
        showCountWishProduct()
    })
})

showWishListProduct_Page()
wishDelete()
showCountWishProduct()

function showCountWishProduct() {
    document.querySelector("#header .m-favourites").innerHTML = wishListProduct.length
}

function showWishListProduct_Page() {
    var wishList =sessionStorage.getItem("wishListProduct")
    var wishListProduct = JSON.parse(wishList)
    var wishProduct = ""
    for (let i = 0; i < wishListProduct.length; i++) {
        wishProduct += '<tr><td><div class="cart-product-content"><img src="'+ wishListProduct[i][0] +'" width="100px" height="100px" alt=""><div class="product-content"><h4 class="wish-title">' + wishListProduct[i][1] + '</h4><span>Estimated delivery within 5 working days</span><div class="product-content-btn"><button class="btn-remove" type="button">Remove</button></div></div></div></td><td><div class="cart-avai-content"><span style="opacity: 0.7;">100 in stock</span></div></td><td class="unit-discount"><p>$<span>0</span></p></td><td class="unit-price"><p>$<span>' + wishListProduct[i][2] + '</span></p></td><td><button id="add-cart--wl" class="add-cart"">ADD TO CART</button></td></tr>'
    }

    document.querySelector(".wish-list tbody").innerHTML = wishProduct
}


function wishDelete () {
    var wishList =sessionStorage.getItem("wishListProduct")
    var wishListProduct = JSON.parse(wishList)
    var wishItem = document.querySelectorAll('.wish-list tbody tr')
    for (var i = 0; i < wishItem.length; i++) {
        var wishProduct = document.querySelectorAll('.wish-list .btn-remove')
        wishProduct[i].addEventListener("click", function(event) {
            var wishDelete = event.target
            var wishItemDelete = wishDelete.parentElement.parentElement.parentElement
            var wishItemDelete2 = wishItemDelete.parentElement.parentElement
            var productName = wishItemDelete.querySelector(".wish-title").innerHTML
            wishItemDelete2.remove()
            for (var j = 0; j < wishListProduct.length; j++) {
                if (wishListProduct[j][1] == productName) {
                    wishListProduct.splice(j, 1)
                }
            }
        })
    }
}





