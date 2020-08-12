//comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect',function(){
    console.log('Conectado al servidor')
})

socket.on('disconnect',function(){
    console.log('Desconectado del servidor')
})

$('button').on('click',function(){

    socket.emit('siguienteTicket',null,function(siguienteTicket){
      label.text(siguienteTicket)  
    })
})

socket.on('estadoActual',function(mensaje){
    label.text(mensaje.actual) 
})