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
          connection.write(
            JSON.stringify({ type: "respuesta", content: commandOutput }) +
              "\n",
          );
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
