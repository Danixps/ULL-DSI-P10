
import { MessageEventEmitterClient } from './eventEmitterClient.js';
import net from 'net';
const client = new MessageEventEmitterClient(net.connect({port: 60300}));

if (process.argv.length !== 4) {
  console.log('Please, provide a filename and de option (line, caracter or word).');
} else{
/**
 * Descripcion: cuando se ejecute un evento mensaje en el cliente analizara los parametros del mensaje recibido
 * @param mensaje Es el mensaje recibido del servidor
 */
client.on('message', (message) => {

  if (message.type === 'connection') {
    console.log(`Connection established.`);
    const file = process.argv[2];
    const option1 = process.argv[3];

    console.log(file);
    console.log(option1);
    client.getsocket().write(JSON.stringify({ type: 'command', content: file, option : option1 }) + '\n');
  } else if (message.type === 'respuesta') {
    console.log(`Salida:\n ${message.content}`);
    client.getsocket().end();
  } else if(message.type === "error_file"){
    console.log(`El archivo no existe o ha ocurrido un error al procesarlo`);
  } else {
    console.log(`Message type ${message.type} is not valid`);
  }
});


/**
 * Descripcion: se encuentre una entrada de datos en el cliente se mandara el mensaje al servidor
 * @param data manejador donde se enviara los datos obtenidos de la terminal al servidor
 */
process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    client.getsocket().write(JSON.stringify({ type: 'command', content: input }) + '\n');
  });

}