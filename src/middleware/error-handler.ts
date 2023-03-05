import { NextFunction, Response, Request } from "express";

export const errorHandler = (
  err: any | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = (err?.statusCode as number) || 500;
  const message = err?.message || "Something went wrong";

  res.status(status).json({
    message: message,
    success: false,
    stack: process.env.NODE_ENV === "production" ? err.stack : {},
  });
};
