import { Client } from "exaroton";
import "dotenv/config"

export class Exaroton {
  constructor() {
    this.client = new Client(process.env.EXAROTON_KEY);
    this.server = this.client.server(process.env.SERVER);
    this.dataFetch = false;
    this.status = ""
    this.address = ""
  }
  getInstance() {
    return this.server;
  }

  handleStatus(status) {
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
  async startServer() {
    try {
      await this.server.start();
    } catch (error) {
      throw error
    }
  }

  async stopServer() {
    try {
      await this.server.stop();
    } catch (error) {
      throw error
    }
  }
  async execCommand(cmd) {
    // send command directly to Websocket
    try {
      await this.server.executeCommand(cmd);
    } catch (error) {
      throw error;
    }
  }
  async getStatus() {
    await this.server.get()
    return this.server.status;
  }

  async getAddress() {
    if (!this.dataFetch) {
      await this.server.get()
      this.address = this.server.address
      this.dataFetch = true
    }
    return this.address;
  }
  async getCredits() {
    let account = await this.client.getAccount();
    try {
      return account.credits.toString();
    } catch (error) {
      throw error;
    }
  }
  async setRAM(amount) {
    try {
      await this.server.setRAM(amount);
    } catch (error) {
      throw error;
    }
  }
}

