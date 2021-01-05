var login=document.getElementById("loginbtn");
var username=document.getElementById("username");
var pass=document.getElementById("password");
var label = document.getElementById("incorrect")

login.addEventListener("click",function(event){
    if(username.value==""||pass.value=="")
        alert("Please insert all values");
    else{
        var user=new Object();
        user.email=username.value;
        user.password=pass.value;
        console.log(user);
        fetch('/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            if(data == "admin"){
                window.location="/admin";
            } else if (data == "community_builder"){
                window.location="/community_builder"
            }
            else if(data == "user"){
                window.location="/user";
            }
            else if(data == "not found"){
                alert("User Not Registered");
            }else if(data == "incorrect"){
                label.style.visibility="visible";
            }else{
                alert("You are not able to login kindly infor your issue on socialhub@gmail.com ");
            }
        })
        .catch(error=>{
            console.log(error);
            // alert(error)
        });
    }
});