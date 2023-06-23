import { BaseError } from "./base.error";
import { ERROR_CODE } from "./error-code";

export class EntityNotFoundException extends BaseError {
  constructor() {
    super(ERROR_CODE.ENTITY_NOT_FOUND, 404);
  }
}
