import Provider from "./provider.ts";
import Config from "../contracts/config.ts";
import Server from "../infrastructure/http/server.ts";
import ServerContract from "../contracts/server.ts";

export default class ServerProvider extends Provider {
  static provide(config: Config): ServerContract {
    return new Server(config);
  }
}
