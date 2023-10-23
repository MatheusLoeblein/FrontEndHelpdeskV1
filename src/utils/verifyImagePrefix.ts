export function verifyImagePrefix(originalURL:string){

  const prefix = "http://127.0.0.1:8000";

  if (!originalURL.startsWith(prefix)) {

    const finalURL = `${prefix}${originalURL}`;
    return finalURL
  } else {

    return originalURL
  }
    }
