const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

let ticketControl = new TicketControl()

io.on('connection', (client) => {

    client.on('siguienteTicket',(data,callback)=>{

        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente)
    })

    client.emit('estadoActual',{
        actual : ticketControl.getUltimo(),
        ultimos4 : ticketControl.getUltimos4()
    })

    client.on('atenderTicket',(data,callback)=>{
         if(!data.escritorio){
             return callback({
                err:true,
                mensaje: "El escritorio es necesario"
             })
         }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar notificar cambios en los ULTIMOS 4
        client.broadcast.emit('ultimos4',{
            ultimos4 : ticketControl.getUltimos4()
        })
    })

    
    //client.broadcast.emit('ultimos4',{
    //    ultimos4 : ticketControl.getUltimos4()
    //}) se ejecuta una vez al recagar la pagina que lo emite
    



});