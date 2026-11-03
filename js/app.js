const DEFAULT_CARS = [
  {id:"car1",name:"Toyota Camry",type:"Sedan",price:2200,image:"https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80",description:"Comfortable sedan for city and highway trips.",available:true},
  {id:"car2",name:"Hyundai Creta",type:"SUV",price:2800,image:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",description:"Spacious SUV with a smooth driving experience.",available:true},
  {id:"car3",name:"Honda Civic",type:"Sedan",price:2400,image:"https://images.unsplash.com/photo-1605559424843-9e4c228bf1c8?auto=format&fit=crop&w=900&q=80",description:"Modern sedan with style and comfort.",available:true},
  {id:"car4",name:"Tata Nexon",type:"SUV",price:2100,image:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",description:"Practical SUV for everyday travel.",available:true},
  {id:"car5",name:"Maruti Swift",type:"Hatchback",price:1600,image:"https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=900&q=80",description:"Compact and efficient for city driving.",available:true},
  {id:"car6",name:"BMW 3 Series",type:"Luxury",price:5500,image:"https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",description:"Premium performance and comfort.",available:true}
];

function getCars(){ 
  if(!localStorage.getItem("driveNowCars")) localStorage.setItem("driveNowCars", JSON.stringify(DEFAULT_CARS));
  return JSON.parse(localStorage.getItem("driveNowCars"));
}
function saveCars(cars){localStorage.setItem("driveNowCars",JSON.stringify(cars));}
function getUsers(){return JSON.parse(localStorage.getItem("driveNowUsers")||"[]");}
function getBookings(){return JSON.parse(localStorage.getItem("driveNowBookings")||"[]");}
function getCurrentUser(){return JSON.parse(localStorage.getItem("driveNowCurrentUser")||"null");}

function logout(){
  localStorage.removeItem("driveNowCurrentUser");
  window.location.href="login.html";
}

document.addEventListener("DOMContentLoaded",()=>{
  getCars();
  const registerForm=document.getElementById("registerForm");
  if(registerForm) registerForm.addEventListener("submit",registerUser);
  const loginForm=document.getElementById("loginForm");
  if(loginForm) loginForm.addEventListener("submit",loginUser);
});

function registerUser(e){
  e.preventDefault();
  const name=document.getElementById("registerName").value.trim();
  const email=document.getElementById("registerEmail").value.trim().toLowerCase();
  const password=document.getElementById("registerPassword").value;
  const confirm=document.getElementById("confirmPassword").value;
  const msg=document.getElementById("registerMessage");
  if(password!==confirm){msg.textContent="Passwords do not match.";return;}
  const users=getUsers();
  if(users.some(u=>u.email===email)){msg.textContent="An account with this email already exists.";return;}
  users.push({id:Date.now().toString(),name,email,password});
  localStorage.setItem("driveNowUsers",JSON.stringify(users));
  localStorage.setItem("driveNowCurrentUser",JSON.stringify({name,email,role:"user"}));
  window.location.href="user-dashboard.html";
}

function loginUser(e){
  e.preventDefault();
  const email=document.getElementById("loginEmail").value.trim().toLowerCase();
  const password=document.getElementById("loginPassword").value;
  const msg=document.getElementById("loginMessage");
  if(email==="admin@drivenow.com" && password==="admin123"){
    localStorage.setItem("driveNowCurrentUser",JSON.stringify({name:"Administrator",email,role:"admin"}));
    window.location.href="admin.html"; return;
  }
  const user=getUsers().find(u=>u.email===email && u.password===password);
  if(!user){msg.textContent="Invalid email or password.";return;}
  localStorage.setItem("driveNowCurrentUser",JSON.stringify({name:user.name,email:user.email,role:"user"}));
  window.location.href="user-dashboard.html";
}