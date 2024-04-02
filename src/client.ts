import net from 'net';
import { spawn } from 'child_process';

const client = net.connect({port: 60300});

client.on('data', (dataJSON) => {
  const message = JSON.parse(dataJSON.toString());

  if (message.type === 'connection') {
    console.log(`Connection established.`);
  } else if (message.type === 'respuesta') {
    console.log(`Salida:\n ${message.content}`);
  }  else if (message.type === 'command') {
    console.log(`Received command: ${message.content}`);
    const commands = message.content.split(" ");
    const commandprincipal = commands[0];
    const argumentos = commands.slice(1);
    console.log(`Command principal: ${commandprincipal}`);
    console.log(`Arguments: ${argumentos}`);

    const exe = spawn(commandprincipal, argumentos);
    let commandOutput = "";

    exe.stdout.on("data", (piece) => {
      commandOutput += piece;
    });

    exe.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);

      client.write(
          JSON.stringify({ type: "respuesta", content: commandOutput }) +
          "\n",
       );
    });
  }
  
  else {
    console.log(`Message type ${message.type} is not valid`);
  }
});


process.stdin.on('data', (data) => {
    const input = data.toString().trim(); // Obtener la entrada del usuario sin espacios en blanco
  
    // Enviar la entrada del usuario al servidor
    client.write(JSON.stringify({ type: 'command', content: input }) + '\n');
});

