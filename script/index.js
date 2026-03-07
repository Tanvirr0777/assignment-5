const loginPass = () => {
    const login = document.getElementById("login");
    const main = document.getElementById("main");

    const username = document.getElementById("Username");
    const password = document.getElementById("password");

    console.log("username :" + username.value);
    console.log("pasword :" + password.value);

    if(username.value === "admin" && password.value === "admin123"){
        login.classList.add("hidden");
        main.classList.remove("hidden");
    }
    else{
        alert("Invalid Username or Password");
    }
}