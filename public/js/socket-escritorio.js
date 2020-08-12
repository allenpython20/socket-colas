//comando para establecer conexion 
var socket = io();

var searchParams = new URLSearchParams(window.location.search);//obtener parametros opcionales

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}

var label = $('small')

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio '+escritorio)

$('button').on('click',function(){
    socket.emit('atenderTicket',{escritorio:escritorio},function(resp){
        label.text(resp.numero)
    })
})