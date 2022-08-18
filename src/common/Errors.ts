export const HTTP_STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  DUPLICATE: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

type Info = Record<PropertyKey, unknown>;

export class HTTPError extends Error {
  constructor(public readonly status: number, message?: string, public readonly info?: Info) {
    super(message);
  }
}

export class BadRequestError extends HTTPError {
  constructor(message?: string, info?: Info) {
    super(HTTP_STATUS_CODE.BAD_REQUEST, message, info);
  }
}

export class NotFoundError extends HTTPError {
  constructor(message?: string, info?: Info) {
    super(HTTP_STATUS_CODE.NOT_FOUND, message, info);
  }
}

export class UnauthorizedError extends HTTPError {
  constructor(message?: string, info?: Info) {
    super(HTTP_STATUS_CODE.UNAUTHORIZED, message, info);
  }
}

export class DuplicateError extends HTTPError {
  constructor(message?: string) {
    super(HTTP_STATUS_CODE.DUPLICATE, message);
  }
}
