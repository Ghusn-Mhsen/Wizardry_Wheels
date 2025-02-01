import { Request, Response, NextFunction } from "express";

/**
 * Global error handler for Express application.
 * This middleware is used to catch unhandled errors in the application.
 * It logs the error stack, determines the error status and message, 
 * and sends an appropriate response to the client.
 * 
 * @param {Error} err - The error object, typically passed from a route handler or middleware.
 * @param {Request} req - The Express request object, representing the HTTP request.
 * @param {Response} res - The Express response object, used to send the HTTP response.
 * @param {NextFunction} next - The next middleware function in the stack (not used in this case).
 * 
 * @returns {void} Sends an error response with a status code and error message.
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle and log the error
  console.error(err.stack);

  // Determine the response status and message based on the error
  const status = (err as any).status || 500;
  const message = err.message || "Internal Server Error";

  // Respond with the appropriate error message and status code
  res.status(status).json({ status: status, error: message });
};

export default errorHandler;
