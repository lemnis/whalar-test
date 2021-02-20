/**
 * I had some issues with CORS, as the api return http: urls.
 * This little functions converts it to a https: url so that no cors issues are occuring.
 */
export function httpToHttps(url: string) {
    const parsedUrl = new URL(url);
    parsedUrl.protocol = 'https:';
    return parsedUrl.href;
}

/**
 * API is missing a id, this extracts it from the url
 */
export function getIdFromUrl(url: string) {
    const parsedUrl = url.split('/');
    return parsedUrl[parsedUrl.length - 2];
}