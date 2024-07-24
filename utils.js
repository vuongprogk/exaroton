import { Client } from "exaroton";
import "dotenv/config";

const client = new Client(process.env.EXAROTON_KEY);
const server = client.server(process.env.SERVER);
await server.get();
let status = server.status;
let address = server.address;
server.subscribe();
server.subscribe("console");
server.on("status", function (server) {
  status = server.status;
});

export function handleStatus(status) {
  switch (status) {
    case 0:
      return "Server is offline";
    case 1:
      return "Server is online";
    case 2:
      return "Server is starting";
    case 3:
      return "Server is stopping";
    case 4:
      return "Server is restarting";
    case 5:
      return "Server is saving";
    case 6:
      return "Server is loading";
    case 7:
      return "Server is crashed";
    case 8:
      return "Server is pending";
    case 10:
      return "Server is preparing";
    default:
      return "Cannot detect status";
  }
}
export async function startServer() {
  try {
    await server.start();
  } catch (error) {
    throw error.response.body.error;
  }
}
export async function stopServer() {
  try {
    await server.stop();
  } catch (error) {
    throw error.response.body.error;
  }
}
export async function execCommand(cmd) {
  // send command directly to Websocket
  try {
    await server.executeCommand(cmd);
  } catch (error) {
    throw error.response.body.error;
  }
}
export function getStatus() {
  return status;
}

export function getAddress() {
  return address;
}
export async function getCredits() {
  let account = await client.getAccount();
  try {
    return account.credits.toString();
  } catch (error) {
    throw error.response.body.error;
  }
}
export async function setRAM(amount) {
  try {
    await server.setRAM(amount);
  } catch (e) {
    throw e.response.body.error;
  }
}
