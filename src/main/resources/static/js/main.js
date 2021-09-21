
let btnAdmin = document.getElementById("v-pills-home-tab");
let btnUser = document.getElementById("v-pills-profile-tab");
let pillUser = document.getElementById("v-pills-profile");

if (!btnAdmin) {
    btnUser.classList.add("active");
    pillUser.classList.add("show", "active");
}
