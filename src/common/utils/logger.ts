enum LogType {
  TRACE = "TRACE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export class Logger {
  public static createLogger(name: string) {
    return new Logger(name);
  }

  private constructor(private readonly name: string) {}

  private format(type: LogType, message: string) {
    return `${Date.now()} [${type.toUpperCase()}] ${this.name}: ${message}`;
  }

  public trace(message: string, ...args: any[]) {
    console.trace(this.format(LogType.TRACE, message), args);
  }

  public debug(message: string, ...args: any[]) {
    console.debug(this.format(LogType.DEBUG, message), args);
  }

  public info(message: string, ...args: any[]) {
    console.info(this.format(LogType.INFO, message), args);
  }

  public warn(message: string, ...args: any[]) {
    console.warn(this.format(LogType.WARN, message), args);
  }

  public error(message: string, ...args: any[]) {
    console.error(this.format(LogType.ERROR, message), args);
  }
}
