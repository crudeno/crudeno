import Exception from "./exception.ts";

export default class Bag extends Exception {
  errors: Exception[];

  constructor(errors: Exception[]) {
    super();
    this.errors = errors;
  }
}
