export const DEFAULT_CARS = [
  {id:'car1',name:'Toyota Camry',type:'Sedan',price:2200,image:'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80',description:'Comfortable sedan for city and highway trips.',available:true},
  {id:'car2',name:'Hyundai Creta',type:'SUV',price:2800,image:'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80',description:'Spacious SUV with a smooth driving experience.',available:true},
  {id:'car3',name:'Honda Civic',type:'Sedan',price:2400,image:'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c8?auto=format&fit=crop&w=900&q=80',description:'Modern sedan with style and comfort.',available:true},
  {id:'car4',name:'Tata Nexon',type:'SUV',price:2100,image:'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80',description:'Practical SUV for everyday travel.',available:true},
  {id:'car5',name:'Maruti Swift',type:'Hatchback',price:1600,image:'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=900&q=80',description:'Compact and efficient for city driving.',available:true},
  {id:'car6',name:'BMW 3 Series',type:'Luxury',price:5500,image:'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',description:'Premium performance and comfort.',available:true}
];
const read = (key, fallback) => { try { const value=localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };
export const getCars = () => { const cars=read('driveNowCars', null); if(!cars){localStorage.setItem('driveNowCars',JSON.stringify(DEFAULT_CARS));return DEFAULT_CARS;} return cars; };
export const saveCars = value => localStorage.setItem('driveNowCars',JSON.stringify(value));
export const getUsers = () => read('driveNowUsers', []);
export const saveUsers = value => localStorage.setItem('driveNowUsers',JSON.stringify(value));
export const getBookings = () => read('driveNowBookings', []);
export const saveBookings = value => localStorage.setItem('driveNowBookings',JSON.stringify(value));
export const getCurrentUser = () => read('driveNowCurrentUser', null);
export const setCurrentUser = value => localStorage.setItem('driveNowCurrentUser',JSON.stringify(value));
export const logout = () => { localStorage.removeItem('driveNowCurrentUser'); };
