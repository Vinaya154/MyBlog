function doSignUp(){
    let formData={}
    formData.name=document.getElementById("name").value
    formData.email=document.getElementById("email").value
    formData.password=document.getElementById("password").value
    console.log(formData)
    fetch('/register',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    }).then((response)=>response.json())
    .then((data)=>{
        window.location.href='/'
    })
}
function doLogin(){
    let loginData={}
    loginData.email=document.getElementById('email').value
    loginData.password=document.getElementById('password').value
    fetch('/login',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
    })
    .then((response)=>response.json())
    .then(data=>{
        if(data.login){
window.location.href='/home'
        }else{
            document.getElementById('warning').innerHTML="invalid credentials"
            setTimeout(()=>{
                document.getElementById('warning').innerHTML=""
            },3000)
        }
    })
}
const logout=()=>{
    localStorage.clear()
    sessionStorage.clear()
    location.assign('/logout')
}