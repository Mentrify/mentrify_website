/**
 * Format API errors into user-friendly messages
 */
export default function formatApiError(error: any): string {
  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Handle array of errors
  if (Array.isArray(error)) {
    return error
      .map((e: any) => {
        if (typeof e === 'string') return e;
        if (e.msg) return e.msg;
        if (e.message) return e.message;
        return JSON.stringify(e);
      })
      .filter(Boolean)
      .join('; ');
  }

  // Handle axios error objects
  if (error.response?.data) {
    const data = error.response.data;

    // Handle error object
    if (data.error) {
      if (typeof data.error === 'string') return data.error;
      if (data.error.message) return data.error.message;
    }

    // Handle detail field
    if (data.detail) {
      if (typeof data.detail === 'string') return data.detail;
      if (Array.isArray(data.detail)) {
        return data.detail
          .map((d: any) => d.msg || d.message || JSON.stringify(d))
          .join('; ');
      }
    }

    // Handle message field
    if (data.message) return data.message;
  }

  // Handle error with message property
  if (error.message) {
    return error.message;
  }

  // Handle error object
  if (typeof error === 'object') {
    return JSON.stringify(error);
  }

  return 'An unexpected error occurred. Please try again.';
}
