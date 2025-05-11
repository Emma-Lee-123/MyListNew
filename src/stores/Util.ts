const appendParameterToUrl = (
  baseUrl: string,
  parameter: string,
  value: string
): string => {
  if (baseUrl.indexOf("?") >= 0) {
    if (baseUrl.indexOf("?") === baseUrl.length - 1) {
      return (baseUrl += parameter + "=" + encodeURIComponent(value));
    }
    return (baseUrl += "&" + parameter + "=" + encodeURIComponent(value));
  } else {
    return (baseUrl += "?" + parameter + "=" + encodeURIComponent(value));
  }
};

export { appendParameterToUrl };
