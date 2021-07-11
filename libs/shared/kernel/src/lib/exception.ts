export class ApplicationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    // Cleaner stack trace for v8
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (Error as any).captureStackTrace === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Error as any).captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export class ApplicationExtendedException extends ApplicationException {
  public originalError: Error | unknown;

  constructor(message: string, error: Error | unknown) {
    super(message);
    this.originalError = error;
    const message_lines = (this.message.match(/\n/g) || []).length + 1;
    this.stack = this.stack
      ?.split('\n')
      .slice(0, message_lines + 1)
      .join('\n');
    if (error && error instanceof Error) this.stack += `\n${error.stack}`;
  }
}
