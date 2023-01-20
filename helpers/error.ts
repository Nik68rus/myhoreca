import { toast } from 'react-toastify';
import { NextApiResponse } from 'next';

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiError(400, message);
  }

  static notAuthenticated(message: string) {
    return new ApiError(401, message);
  }

  static notAuthorized(message: string) {
    return new ApiError(403, message);
  }

  static notFound(message: string) {
    return new ApiError(404, message);
  }

  static validation(message: string) {
    return new ApiError(422, message);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }
}

const handleServerError = (res: NextApiResponse, error: any) => {
  console.log(error);
  let message = 'Ошибка на сервере';
  let status = 500;
  if (error instanceof ApiError) {
    status = error.status;
  }
  if (error instanceof Error) {
    message = error.message;
  }
  return res.status(status).json(message);
};

const handleError = (error: any) => {
  let message = 'Что-то пошло не так!';
  if (error instanceof Error) {
    message = error.message;
  }
  toast.error(message);
};

const handleRTKQError = (error: any) => {
  let message = 'Что-то пошло не так!';
  if (error && error.data && typeof error.data === 'string') {
    message = error.data;
  }
  if (error) {
    toast.error(message);
  }
};

export { handleServerError, handleError, handleRTKQError };
export default ApiError;
