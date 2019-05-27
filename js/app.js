const url = "http://api.openweathermap.org/data/2.5/weather?";
const appid = "appid=9b28775a1ba1639f86562bc0680320f6";
const threeDay = 'http://api.openweathermap.org/data/2.5/forecast?appid=9b28775a1ba1639f86562bc0680320f6&units=imperial&q=';
var zip = document.getElementById('search').value; 
var city = "&q=Wickes";
var comp_url = url + appid + "&units=imperial" ;
var mycity = 'wickes';

async function getData(url) {
  const res = await fetch(url);

  return res.json();
}

async function main(url){
  const data = await getData(url);
  console.log(data);
  setData(data);
}

async function fiveDay(url){
  const forecast = await getData(url);
  console.log(forecast);
  var days = forecast.list;
  console.log(days[1])
  console.log(days[0].main.temp)
  setWeek(days);
}

async function search(city){
  var city_search = '&q=' + city;
  const newData = await getData(comp_url + city_search );
  const forecast = await getData(threeDay + city)
  var days = forecast.list;
  console.log(newData);
  setData(newData);
  setWeek(days);
  document.getElementById('search').value = '';
}

function setData(data){
  var temp = Math.round(data.main.temp);
  var high = Math.round(data.main.temp_max);
  var low = Math.round(data.main.temp_min);
  var wind = Math.round(data.wind.speed);
  var hum = Math.round(data.main.humidity);
  
  document.getElementById('mainTemp').innerHTML = temp + 'F';
  document.getElementById('high_low').innerHTML = high + 'F/' + low +'F';
  document.getElementById('wind_speed').innerHTML = wind +' mph';
  document.getElementById('humitity').innerHTML = hum + '%';
  document.getElementById('cityName').innerHTML = data.name;

}

function setWeek(data){
  var high = 0;
  var low = 0;
  var desc = "n/a";
  
  for(var i = 0; i <= 2; i++){
    high = Math.round(data[i].main.temp_max);
    low = Math.round(data[i].main.temp_min);
    desc = data[i].weather[0].main;
   
    document.getElementById('day_' + (i+1) + '_temp').innerHTML = high +"/" + low;
    document.getElementById('day_' + (i + 1)+ '_desc').innerHTML = desc;
  }
}

main(comp_url + city);
fiveDay(threeDay + mycity);

