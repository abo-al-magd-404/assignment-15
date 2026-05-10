import { ApplicationException } from "./application.exception";

/**
 * HTTP Status Codes for better readability and maintenance.
 */
enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export class BadRequestException extends ApplicationException {
  constructor(message: string = "Bad Request", cause?: unknown) {
    super(message, HttpStatus.BAD_REQUEST, cause);
  }
}

export class UnauthorizedException extends ApplicationException {
  constructor(message: string = "Unauthorized", cause?: unknown) {
    super(message, HttpStatus.UNAUTHORIZED, cause);
  }
}

export class ForbiddenException extends ApplicationException {
  constructor(message: string = "Forbidden", cause?: unknown) {
    super(message, HttpStatus.FORBIDDEN, cause);
  }
}

export class NotFoundException extends ApplicationException {
  constructor(message: string = "Not Found", cause?: unknown) {
    super(message, HttpStatus.NOT_FOUND, cause);
  }
}

export class ConflictException extends ApplicationException {
  constructor(message: string = "Conflict", cause?: unknown) {
    super(message, HttpStatus.CONFLICT, cause);
  }
}
