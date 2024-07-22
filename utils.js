import { Client } from "exaroton";
import "dotenv/config";
const client = new Client(process.env.EXAROTON_KEY);
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
      console.log("Cannot detect status");
  }
}
export async function startServer() {
  let server = client.server(process.env.SERVER);
  try {
    await server.start();
  } catch (err) {
    console.log(err);
  }
}
export async function stopServer() {
  let server = client.server(process.env.SERVER);
  try {
    await server.stop();
  } catch (err) {
    console.log(err);
  }
}
export async function execCommand(cmd) {
  let server = client.server(process.env.SERVER);
  await server.executeCommand(cmd);
}
export async function getStatus() {
  let server = client.server(process.env.SERVER);
  await server.get();
  return server.status;
}

export async function getAddress() {
  let server = client.server(process.env.SERVER);
  await server.get();
  return server.address;
}
export async function getCredits() {
  let account = await client.getAccount();
  return account.credits.toString();
}
