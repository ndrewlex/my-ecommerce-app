class ApiError {
  res;
  constructor(res) {
    this.res = res;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const handleApiError = (e) => {
  if (e instanceof ApiError) {
    return {
      errorCode: e.res.status,
    };
  }
};

export default ApiError;
