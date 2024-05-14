var tabLinks = document.querySelectorAll(".tablinks");
var tabContent =document.querySelectorAll(".tabcontent");

tabLinks.forEach(function(el) {
    el.addEventListener("click", openTabs);
});


function openTabs(el) {
    var btn = el.currentTarget;
    var electronic = btn.dataset.electronic;

    tabContent.forEach(function(el) {
        el.classList.remove("active1");
    });

    tabLinks.forEach(function(el) {
        el.classList.remove("active1");
    });

    document.querySelector("#" + electronic).classList.add("active1");


    btn.classList.add("active1");
}