//=> Hamburger menu functionality
var hamburger = document.getElementById("hamburger"),
  hamMenuOpen = document.querySelector(".menu"),
  menuBarBackground = document.querySelector(".main-bar-url");
hamburger.addEventListener("click", cross);
//Hambuger functiom to open and close menu
function cross() {
  document.body.classList.toggle("body"); //to stop scrolling when menu open
  hamburger.classList.toggle("activeHam");
  hamMenuOpen.classList.toggle("hamMenuOpen");
  if (document.URL.includes("photo.html")) {
  menuBarBackground.classList.toggle("menuBarBackground");
  }
}



//=> Display error msg for forms 
var node,
  textnode;
function errorFunc(errorId, msg, errorClass) {
  if (!document.querySelector("." + errorClass)) {
    //Give error message
    node = document.createElement("Span");
    textnode = document.createTextNode(msg);
    node.appendChild(textnode);
    node.setAttribute("class", errorClass);
    document.getElementById(errorId).appendChild(node);
  }
}

//=> To see which html page is currently accessing javascript

  //set autocomplete => off for location and email
  document.getElementById("location").setAttribute("autocomplete", "off");
  document.getElementById("email").setAttribute("autocomplete", "off");
  var submit = document.getElementById("submit"),
    letters = /^[A-Za-z\s]+$/;

  //=> display default city as mumbai
  document.addEventListener("DOMContentLoaded", function() {
    cardDisplay("mumbai");
  });

  //=> display user submitted city weather information
  submit.addEventListener("click", function(e) {
    e.preventDefault();
    // to get user submitted value
    var location = document.forms["RegForm"]["location"].value;
    //to add fading animation while changing data
    document.querySelector(".weather-body").className += " weather-fade";
    //calling the cardDisplay function to show weather of city
    cardDisplay(location);
    //resetting the form input value
    document.getElementById("location").value = null;
  });

  //=> Function to display weather information on card
  function cardDisplay(location) {
    var nameValue,
      timestamp,
      time,
      date,
      months,
      month,
      days,
      day,
      humidity,
      wind,
      direction,
      tempValue,
      weatherIcon;
    //to check wether entered data is not empty or incorrect
    if (location.length == 0 || !letters.test(location)) {
      errorFunc("formBar", "Please enter correct city name", "errorMsg");
    } else {
      //Get weather information from openWeather api
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=83810246bd176b904dafa20374e15bec"
        )
        .then((response) => response.json())
        .then((data) => {
          nameValue = data["name"];
          timestamp = data["dt"];
          time = new Date(parseInt(timestamp) * 1000);
          date = time.getDate();
          months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          month = months[time.getMonth()];
          days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          day = days[time.getDay()];
          humidity = data["main"]["humidity"];
          wind = data["wind"]["speed"];
          direction = data["wind"]["deg"];
          tempValue = (data["main"]["temp"] - 273).toFixed(0);
          weatherIcon = data["weather"][0]["main"];

          //Display weather information on html weather card
          document.querySelector(".day").innerHTML = day;
          document.querySelector(".date").innerHTML = date + " " + month;
          document.querySelector(".location").innerHTML = nameValue;
          document.querySelector(".num").innerHTML = tempValue + "<sup>o</sup>C";
          document.querySelector(".humidity").innerHTML = humidity + "%";
          document.querySelector(".wind").innerHTML = wind + "m/sec";
          document.querySelector(".direction").innerHTML = direction + " &#7506;";

          var urlSnap; //To load correct weather icon
          switch (weatherIcon) {
            case "Mist":
              urlSnap = "7";
              break;
            case "Smoke":
              urlSnap = "7";
              break;
            case "Haze":
              urlSnap = "7";
              break;
            case "Broken-clouds":
              urlSnap = "3";
              break;
            case "Clouds":
              urlSnap = "5";
              break;
            case "Clear":
              urlSnap = "1";
              break;
            case "Rain":
              urlSnap = "14";
              break;
            case "Thunderstorm":
              urlSnap = "12";
              break;
            case "Drizzle":
              urlSnap = "13";
              break;
            default:
              urlSnap = "1";
          }
          document.getElementById("weather-icon").src = "assets/images/icons/icon-" + urlSnap + ".svg";
          document.querySelector(".weather-body").classList.remove("weather-fade");

          if (document.querySelector(".errorMsg")) {
            document.querySelector(".errorMsg").remove();
          }
        })
        //To display error message when api fails or the value submitted by user is not equivalent to any city name
        .catch(function(err) {
          errorFunc("formBar", "Error fetching the data or incorrect city name", "errorMsg");
        });
    }
  }

  //=> Modal
  var modal = document.getElementById("myModal"),
    span = document.querySelector(".close"),
    video = document.getElementById("myVideo"),
    videoSelect = document.querySelectorAll(".live-camera-cover"),
    spanImg = document.querySelector(".closeImg"),
    imgId = document.getElementById("myModal-img"),
    img = document.getElementById("myImg"),
    imgModal = document.querySelectorAll(".img-modal");

  // Function to display modal image
  imgModal.forEach(imgFunction);
  function imgFunction(item, index) {
    imgModal[index].addEventListener("click", function() {
      var imgSrc = parseInt(index) + 1;
      img.src = "assets/images/img" + imgSrc + ".jpg";
      imgId.classList.add("modalToggle");
      document.body.classList.add("body");
    });
  }
  
  // Function to display modal video
  videoSelect.forEach(videoFunction);
  function videoFunction(item, index) {
    videoSelect[index].addEventListener("click", function() {
      if (item.id == "video1") {
        video.src = "https://www.youtube.com/embed/JlqrHo-Rsi0";
      } else if(item.id == "video2"){
        video.src = "https://www.youtube.com/embed/EEIk7gwjgIM";
      }else if(item.id == "video3"){
        video.src = "https://www.youtube.com/embed/3rgiSK9MXgA";
      }else if(item.id == "video4"){
        video.src = "https://www.youtube.com/embed/XBPjVzSoepo";
      }
      modal.classList.add("modalToggle");
      document.body.classList.add("body");
    });
  }

  //close opened modal
  span.onclick = function() {
    video.src = "";
    modal.classList.remove("modalToggle");
    document.body.classList.remove("body");
  };
  spanImg.onclick = function() {
    imgId.classList.remove("modalToggle");
    document.body.classList.remove("body");
  };












  document.getElementById("coll1").onclick = function () {
    document.getElementById("collapse1").classList.toggle("collapse1")
  }
  document.getElementById("coll2").onclick = function () {
    document.getElementById("collapse2").classList.toggle("collapse2")
  }
  document.getElementById("coll3").onclick = function () {
    document.getElementById("collapse3").classList.toggle("collapse3")
  }












//=> redirect user to mail client with information filled when user wants to subscribe
var subscribe = document.getElementById("subscribe");
subscribe.addEventListener("click", function(e) {
  var body = document.getElementById("email").value,
    emailLetters = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    sub = "Subscribe to Weather Check news letter";
  //to gives error msg if the naming of email is not correct
  if (!emailLetters.test(body)) {
    errorFunc("emailBar", "Please enter correct email", "errorMsgEmail");
  } else {
    //Remove error msg if email is correct
    if (document.querySelector(".errorMsgEmail")) {
      document.querySelector(".errorMsgEmail").remove();
    }
    //redirect user to email client in new tab for subscription
    window.open(
      "mailto:KBMOSweatherDummy.com?Subject=" +
      encodeURIComponent(sub) +
      "&body=" +
      encodeURIComponent(body)
    );
  }
  //reset the email value in form
  document.getElementById("email").value = null;
  e.preventDefault();
});


document.getElementById('liveId').onclick= function (e){
  document.querySelector(
document.getElementById('liveId').getAttribute('href')).scrollIntoView({
  behavior: 'smooth'
  })

  document.body.classList.remove("body");
  hamburger.classList.remove("activeHam");
  hamMenuOpen.classList.remove("hamMenuOpen");

  e.preventDefault()
}


document.getElementById('newsArticle').onclick= function (e){
  document.querySelector(
document.getElementById('newsArticle').getAttribute('href')).scrollIntoView({
  behavior: 'smooth'
  })

  document.body.classList.remove("body");
  hamburger.classList.remove("activeHam");
  hamMenuOpen.classList.remove("hamMenuOpen");

  e.preventDefault()
}

document.getElementById('UsefulLink').onclick= function (e){
  document.querySelector(
document.getElementById('UsefulLink').getAttribute('href')).scrollIntoView({
  behavior: 'smooth'
  })

  document.body.classList.remove("body");
  hamburger.classList.remove("activeHam");
  hamMenuOpen.classList.remove("hamMenuOpen");

  e.preventDefault()
}

document.getElementById('photoGallery').onclick= function (e){
  document.querySelector(
document.getElementById('photoGallery').getAttribute('href')).scrollIntoView({
  behavior: 'smooth'
  })

  document.body.classList.remove("body");
  hamburger.classList.remove("activeHam");
  hamMenuOpen.classList.remove("hamMenuOpen");

  e.preventDefault()
}

