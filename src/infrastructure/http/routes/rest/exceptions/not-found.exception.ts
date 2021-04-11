import Exception from "./exception.ts";

export default class NotFoundException extends Exception {
  status = 404;

  constructor(message = "The resource was not found") {
    super(message);
  }
}
