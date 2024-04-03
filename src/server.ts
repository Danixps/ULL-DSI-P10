import net from "net";
import { spawn } from "child_process";

net
  .createServer((connection) => {
    console.log("A client has connected.");

    connection.write(JSON.stringify({ type: "connection" }) + "\n");

    connection.on("data", (dataJSON) => {
      const message = JSON.parse(dataJSON.toString());

      if (message.type === "command") {
        console.log(`Received command: ${message.content}`);
        const commands = message.content.split(" ");
        const file = commands[0];
        const option = message.option;
        console.log(`File: ${file}`);
        console.log(`Option: ${option}`);

        const exe = spawn('wc', [file]);
        let commandOutput = "";
        let Output = "";

        exe.stdout.on("data", (piece) => {
          commandOutput += piece;
          if(message.option === 'line') {
             Output = commandOutput.split(' ')[1];
          } else if(message.option === 'word'){
            Output = commandOutput.split(' ')[3];
            
          }
          else if(message.option === 'character'){
            Output = commandOutput.split(' ')[4];
          } else{
            Output = 'Opcion inválida';
          }
        });

        exe.on("close", (code) => {
          console.log(`Child process exited with codee ${code}`);
          connection.write( JSON.stringify({ type: "respuesta", content: Output }) + "\n");
        });
      } else if (message.type === "respuesta") {
        console.log(`Salida:\n${message.content}`);
      } else {
        console.log(`Message type ${message.type} is not valid`);
      }
    });


    process.stdin.on("data", (data) => {
      const input = data.toString().trim(); // Obtener la entrada del usuario sin espacios en blanco

      // Enviar la entrada del usuario al servidor
      connection.write(JSON.stringify({ type: "command", content: input }) + "\n");
    });


  })
  .listen(60300, () => {
    console.log("Waiting for clients to connect.");
  });