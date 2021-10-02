export default interface ServerContract {
  host: string,
  port: number,
  serve(): void;
}
