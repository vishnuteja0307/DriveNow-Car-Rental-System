document.addEventListener("DOMContentLoaded",()=>{
  const user=getCurrentUser();
  if(!user || user.role!=="admin"){window.location.href="login.html";return;}
  renderAdmin();
  document.getElementById("carForm").addEventListener("submit",saveCar);
});

function renderAdmin(){
  const cars=getCars(), bookings=getBookings(), users=getUsers();
  document.getElementById("totalCars").textContent=cars.length;
  document.getElementById("availableCars").textContent=cars.filter(c=>c.available).length;
  document.getElementById("totalBookings").textContent=bookings.length;
  document.getElementById("totalUsers").textContent=users.length;
  document.getElementById("adminCarsTable").innerHTML=cars.map(c=>`
    <tr>
      <td><div class="car-mini"><img src="${c.image}" alt=""><strong>${escapeHtml(c.name)}</strong></div></td>
      <td>${escapeHtml(c.type)}</td><td>₹${Number(c.price).toLocaleString()}</td>
      <td><span class="status">${c.available?"Available":"Unavailable"}</span></td>
      <td><button class="action-btn" onclick="editCar('${c.id}')">Edit</button><button class="action-btn delete-btn" onclick="deleteCar('${c.id}')">Delete</button></td>
    </tr>`).join("");
  document.getElementById("bookingsTable").innerHTML=bookings.length?bookings.map(b=>`
    <tr><td>${escapeHtml(b.userName)}<br><span class="muted">${escapeHtml(b.userEmail)}</span></td><td>${escapeHtml(b.carName)}</td><td>${b.start} → ${b.end}</td><td>₹${Number(b.total).toLocaleString()}</td></tr>`).join(""):"<tr><td colspan='4'>No bookings yet.</td></tr>";
}
function openCarForm(){
  document.getElementById("carFormTitle").textContent="Add Car";
  document.getElementById("editCarId").value="";
  document.getElementById("carForm").reset();
  document.getElementById("carFormMessage").textContent="";
  document.getElementById("carFormModal").classList.remove("hidden");
}
function closeCarForm(){document.getElementById("carFormModal").classList.add("hidden");}
function editCar(id){
  const c=getCars().find(x=>x.id===id);if(!c)return;
  document.getElementById("carFormTitle").textContent="Edit Car";
  document.getElementById("editCarId").value=c.id;
  document.getElementById("carName").value=c.name;
  document.getElementById("carType").value=c.type;
  document.getElementById("carPrice").value=c.price;
  document.getElementById("carImage").value=c.image;
  document.getElementById("carDescription").value=c.description||"";
  document.getElementById("carFormMessage").textContent="";
  document.getElementById("carFormModal").classList.remove("hidden");
}
function saveCar(e){
  e.preventDefault();
  const id=document.getElementById("editCarId").value;
  const cars=getCars();
  const data={name:document.getElementById("carName").value.trim(),type:document.getElementById("carType").value,price:Number(document.getElementById("carPrice").value),image:document.getElementById("carImage").value.trim()||"https://via.placeholder.com/900x500?text=DriveNow",description:document.getElementById("carDescription").value.trim(),available:true};
  if(id){const index=cars.findIndex(c=>c.id===id);data.id=id;data.available=cars[index].available;cars[index]=data;}
  else{data.id="car"+Date.now();cars.push(data);}
  saveCars(cars);closeCarForm();renderAdmin();
}
function deleteCar(id){
  const car=getCars().find(c=>c.id===id);
  if(confirm(`Delete ${car.name}?`)){saveCars(getCars().filter(c=>c.id!==id));renderAdmin();}
}
function escapeHtml(str){return String(str).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}