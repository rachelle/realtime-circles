document.addEventListener("DOMContentLoaded", function() { 
  
  // assigns our connection to the server and then console.log
  // and has the code run and is loaded on the browser
  var socket = io();
  // looking for add circle event and executes the function to grab the data
  socket.on('add-circle', function(data) {
   /* console.log(data);*/
   // using the addCircle function to execute
   addCircle(data);
  });
    socket.on('clear-display', function() {
    circles.innerHTML= '';
  }); 

  var circles = document.getElementById('circles');
  var initials = '';

  circles.addEventListener('click', function(evt) {
    /*addCircle(evt.clientX, evt.clientY, randomBetween(10,125), getRandomRGBA());*/
    socket.emit('clear-display', {
      // why we use as a object because it can hold alot of data
      initials: initials,
      x: evt.clientX, 
      y: evt.clientY, 
      dia: randomBetween(10,125),
      rgba: getRandomRGBA()
    }); 
  });

  document.getElementsByTagName('button')[0].addEventListener('click', function() {
    // clear all displays of the circle
    socket.emit('clear-display');
   /* circles.innerHTML = '';*/

  });

  while (initials.length < 2 || initials.length > 3) {
    initials = prompt("Please enter your initials").toUpperCase();
  }



  function addCircle(data) {
    var el = document.createElement('div');
    el.style.left = data.x - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.top = data.y - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.width = el.style.height = data.dia + 'px';
    el.style.backgroundColor = data.rgba;
    el.style.fontSize = Math.floor(data.dia / 3) + 'px';
    el.style.color = 'white';
    el.style.textAlign = 'center';
    el.style.lineHeight = data.dia + 'px';
    el.innerHTML = data.initials;
    circles.appendChild(el);
  }

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomRGBA() {
    return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
      randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join(''); 
  }

});
