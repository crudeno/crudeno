export default class ValidationException extends Error {
  errors: any[];

  constructor(errors: any[]) {
    super();
    this.errors = errors;
  }
}
