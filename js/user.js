document.addEventListener("DOMContentLoaded",()=>{
  const user=getCurrentUser();
  if(!user || user.role!=="user"){window.location.href="login.html";return;}
  document.getElementById("welcomeUser").textContent="Hi, "+user.name;
  renderCars();
  renderBookings();
  document.getElementById("carSearch").addEventListener("input",renderCars);
  document.getElementById("startDate").addEventListener("change",updatePrice);
  document.getElementById("endDate").addEventListener("change",updatePrice);
  document.getElementById("rentForm").addEventListener("submit",confirmRental);
});

function renderCars(){
  const query=(document.getElementById("carSearch").value||"").toLowerCase();
  const cars=getCars().filter(c=>c.available && (c.name.toLowerCase().includes(query)||c.type.toLowerCase().includes(query)));
  const grid=document.getElementById("carsGrid");
  grid.innerHTML=cars.map(c=>`
    <article class="car-card">
      <img class="car-image" src="${c.image}" alt="${c.name}" onerror="this.src='https://via.placeholder.com/900x500?text=DriveNow'">
      <div class="car-info">
        <h3>${escapeHtml(c.name)}</h3>
        <p class="car-type">${escapeHtml(c.type)}</p>
        <p class="muted">${escapeHtml(c.description||"Reliable car for your journey.")}</p>
        <div class="car-bottom">
          <div class="price">₹${Number(c.price).toLocaleString()} <small>/ day</small></div>
          <button class="btn btn-red" onclick="openRentModal('${c.id}')">Rent</button>
        </div>
      </div>
    </article>`).join("");
  document.getElementById("noCars").classList.toggle("hidden",cars.length>0);
}

function openRentModal(id){
  const car=getCars().find(c=>c.id===id); if(!car)return;
  document.getElementById("modalCarId").value=id;
  document.getElementById("modalCarName").textContent=car.name;
  document.getElementById("startDate").value="";
  document.getElementById("endDate").value="";
  document.getElementById("pricePreview").textContent="Select dates to calculate total.";
  document.getElementById("rentMessage").textContent="";
  document.getElementById("rentModal").classList.remove("hidden");
}
function closeRentModal(){document.getElementById("rentModal").classList.add("hidden");}

function getDays(){
  const s=new Date(document.getElementById("startDate").value);
  const e=new Date(document.getElementById("endDate").value);
  if(!isNaN(s)&&!isNaN(e)&&e>=s)return Math.ceil((e-s)/86400000)+1;
  return 0;
}
function updatePrice(){
  const days=getDays(), id=document.getElementById("modalCarId").value;
  const car=getCars().find(c=>c.id===id);
  document.getElementById("pricePreview").textContent=days&&car?`${days} day(s) × ₹${car.price.toLocaleString()} = ₹${(days*car.price).toLocaleString()}`:"Select valid dates.";
}
function confirmRental(e){
  e.preventDefault();
  const days=getDays(), id=document.getElementById("modalCarId").value;
  const start=document.getElementById("startDate").value,end=document.getElementById("endDate").value;
  const msg=document.getElementById("rentMessage");
  if(!days){msg.textContent="Please select valid dates.";return;}
  const car=getCars().find(c=>c.id===id), user=getCurrentUser();
  const bookings=getBookings();
  bookings.push({id:Date.now().toString(),userEmail:user.email,userName:user.name,carId:car.id,carName:car.name,start,end,days,total:days*Number(car.price)});
  localStorage.setItem("driveNowBookings",JSON.stringify(bookings));
  closeRentModal();
  alert(`Rental confirmed for ${car.name}! Total: ₹${(days*car.price).toLocaleString()}`);
  renderBookings();
}
function renderBookings(){
  const user=getCurrentUser();
  const bookings=getBookings().filter(b=>b.userEmail===user.email);
  const box=document.getElementById("myRentals");
  box.innerHTML=bookings.length?bookings.reverse().map(b=>`
    <div class="rental-item"><div><strong>${escapeHtml(b.carName)}</strong><br><span class="muted">${b.start} → ${b.end} (${b.days} day${b.days>1?"s":""})</span></div><strong>₹${Number(b.total).toLocaleString()}</strong></div>`).join(""):"<p class='muted'>You have no rentals yet.</p>";
}
function escapeHtml(str){return String(str).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}