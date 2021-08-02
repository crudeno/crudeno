export default interface ServerContract {
  serve(host: string, port: number): void;
}
