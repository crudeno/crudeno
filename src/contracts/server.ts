import Config from "./config.ts";

export default abstract class Server {
  protected readonly config: Config;

  constructor(config: Config) {
    this.config = config;
    this.build();
  }

  abstract serve(): any;

  protected abstract build(): void;
}
