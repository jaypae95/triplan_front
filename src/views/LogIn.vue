<template>
<div id="LogIn">
    <p>LogIn Page</p>
    <input placeholder="ID"><br><br>
    <input placeholder="PASSWORD"><br><br>
    <button id="bu1">
    <img id="illu1" src="../assets/login.png">
    </button><br>
    <router-link to='/'>
        <img id="illu" src="../assets/gotoHome.png">
    </router-link>
</div>
</template>

<style>
#illu, #illu1, #bu1{
    width: 80px;
    height:35px;
}
#bu1{
    background-color: #ffffff
}
#LogIn{
    border:5px solid #4cbaa8;
    border-radius: 40px;
    width: 500px;
    padding:20px 20px;
    margin: auto;
}
</style>