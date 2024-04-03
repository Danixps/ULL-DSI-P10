
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
  }
  
  else {
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
  //mandar un fichero y linea o caracter
  });

}
// import net from 'net';
// import { spawn } from 'child_process';

// const client = net.connect({port: 60300});

// client.on('message', (message) => {
//   const message = JSON.parse(message.toString());

//   if (message.type === 'connection') {
//     console.log(`Connection established.`);
//   } else if (message.type === 'respuesta') {
//     console.log(`Salida:\n ${message.content}`);
//   }  else if (message.type === 'command') {
//     console.log(`Received command: ${message.content}`);
//     const commands = message.content.split(" ");
//     const commandprincipal = commands[0];
//     const argumentos = commands.slice(1);
//     console.log(`Command principal: ${commandprincipal}`);
//     console.log(`Arguments: ${argumentos}`);

//     const exe = spawn(commandprincipal, argumentos);
//     let commandOutput = "";

//     exe.stdout.on("message", (piece) => {
//       commandOutput += piece;
//     });

//     exe.on("close", (code) => {
//       console.log(`Child process exited with code ${code}`);

//       client.write(
//           JSON.stringify({ type: "respuesta", content: commandOutput }) +
//           "\n",
//        );
//     });
//   }
  
//   else {
//     console.log(`Message type ${message.type} is not valid`);
//   }
// });


// process.stdin.on('message', (message) => {
//     const input = message.toString().trim(); // Obtener la entrada del usuario sin espacios en blanco
  
//     // Enviar la entrada del usuario al servidor
//     client.write(JSON.stringify({ type: 'command', content: input }) + '\n');
// });

