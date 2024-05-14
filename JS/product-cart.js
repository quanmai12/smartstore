

var checkOutProduct = new Array()


function checkOutClick() {
    var btnCheckout = document.querySelector('#check-out')
    var product = btnCheckout.parentElement
    var product2 = product.parentElement

    var productItem = product2.querySelectorAll('.cart-list tbody tr')

    for (let i = 0; i < productItem.length; i++) {
        var productImg = productItem[i].querySelector('.cart-list img').src
        var productName = productItem[i].querySelector('.cart-list h4').innerHTML
        var productQuantity = productItem[i].querySelector('.cart-list input').value
        var productPrice = productItem[i].querySelector('.cart-list .price-value').innerHTML

        var productArray = new Array({productImg, productName, productQuantity, productPrice})
        checkOutProduct.push(productArray);
        sessionStorage.setItem("checkOutProduct", JSON.stringify(checkOutProduct))
    }
    showCheckOutProduct_Page()

}

checkOutClick()
showCheckOutProduct_Page()

function showCheckOutProduct_Page() {
    var checkOutList = sessionStorage.getItem("checkOutProduct")
    var checkOutProduct = JSON.parse(checkOutList)
    var checkOutProductItem = ""
    var subTotal = 0;
    for (let i = 0; i < checkOutProduct.length; i++) {
        var total = checkOutProduct[i][0].productQuantity*checkOutProduct[i][0].productPrice
        subTotal +=  total
        checkOutProductItem += '<div class="product-box box-form"><img src="'+ checkOutProduct[i][0].productImg +'" width="90px" height="90px" alt=""><div class="product-title"><h3>'+checkOutProduct[i][0].productName +'</h3><Span>Quantity:</Span><span class="number-item">'+ checkOutProduct[i][0].productQuantity +'</span></div><div class="product-price">$<span>'+ checkOutProduct[i][0].productPrice +'</span></div></div>'
    }

    document.querySelector(".product-check-item").innerHTML = checkOutProductItem
    document.querySelector(".total-number").innerHTML = subTotal

}
