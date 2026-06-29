import * as crypto$1 from 'crypto';
import { EventEmitter } from 'events';
import * as http_ from 'http';
import * as https_ from 'https';
import { exec } from 'child_process';
export { renderers } from '../../renderers.mjs';

/**
 * Interface encapsulating the various crypto computations used by the library,
 * allowing pluggable underlying crypto implementations.
 */
class CryptoProvider {
    /**
     * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
     * The output HMAC should be encoded in hexadecimal.
     *
     * Sample values for implementations:
     * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
     * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
     */
    computeHMACSignature(payload, secret) {
        throw new Error('computeHMACSignature not implemented.');
    }
    /**
     * Asynchronous version of `computeHMACSignature`. Some implementations may
     * only allow support async signature computation.
     *
     * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
     * The output HMAC should be encoded in hexadecimal.
     *
     * Sample values for implementations:
     * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
     * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
     */
    computeHMACSignatureAsync(payload, secret) {
        throw new Error('computeHMACSignatureAsync not implemented.');
    }
    /**
     * Computes a SHA-256 hash of the data.
     */
    computeSHA256Async(data) {
        throw new Error('computeSHA256 not implemented.');
    }
}
/**
 * If the crypto provider only supports asynchronous operations,
 * throw CryptoProviderOnlySupportsAsyncError instead of
 * a generic error so that the caller can choose to provide
 * a more helpful error message to direct the user to use
 * an asynchronous pathway.
 */
class CryptoProviderOnlySupportsAsyncError extends Error {
}

/**
 * `CryptoProvider which uses the Node `crypto` package for its computations.
 */
class NodeCryptoProvider extends CryptoProvider {
    /** @override */
    computeHMACSignature(payload, secret) {
        return crypto$1
            .createHmac('sha256', secret)
            .update(payload, 'utf8')
            .digest('hex');
    }
    /** @override */
    async computeHMACSignatureAsync(payload, secret) {
        const signature = await this.computeHMACSignature(payload, secret);
        return signature;
    }
    /** @override */
    async computeSHA256Async(data) {
        return new Uint8Array(await crypto$1
            .createHash('sha256')
            .update(data)
            .digest());
    }
}

/**
 * Encapsulates the logic for issuing a request to the Stripe API.
 *
 * A custom HTTP client should should implement:
 * 1. A response class which extends HttpClientResponse and wraps around their
 *    own internal representation of a response.
 * 2. A client class which extends HttpClient and implements all methods,
 *    returning their own response class when making requests.
 */
class HttpClient {
    /** The client name used for diagnostics. */
    getClientName() {
        throw new Error('getClientName not implemented.');
    }
    makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        throw new Error('makeRequest not implemented.');
    }
    /** Helper to make a consistent timeout error across implementations. */
    static makeTimeoutError() {
        const timeoutErr = new TypeError(HttpClient.TIMEOUT_ERROR_CODE);
        timeoutErr.code = HttpClient.TIMEOUT_ERROR_CODE;
        return timeoutErr;
    }
}
// Public API accessible via Stripe.HttpClient
HttpClient.CONNECTION_CLOSED_ERROR_CODES = ['ECONNRESET', 'EPIPE'];
HttpClient.TIMEOUT_ERROR_CODE = 'ETIMEDOUT';
class HttpClientResponse {
    constructor(statusCode, headers) {
        this._statusCode = statusCode;
        this._headers = headers;
    }
    getStatusCode() {
        return this._statusCode;
    }
    getHeaders() {
        return this._headers;
    }
    getRawResponse() {
        throw new Error('getRawResponse not implemented.');
    }
    toStream(streamCompleteCallback) {
        throw new Error('toStream not implemented.');
    }
    toJSON() {
        throw new Error('toJSON not implemented.');
    }
}

// `import * as http_ from 'http'` creates a "Module Namespace Exotic Object"
// which is immune to monkey-patching, whereas http_.default (in an ES Module context)
// will resolve to the same thing as require('http'), which is
// monkey-patchable. We care about this because users in their test
// suites might be using a library like "nock" which relies on the ability
// to monkey-patch and intercept calls to http.request.
const http = http_.default || http_;
const https = https_.default || https_;
const defaultHttpAgent = new http.Agent({ keepAlive: true });
const defaultHttpsAgent = new https.Agent({ keepAlive: true });
/**
 * HTTP client which uses the Node `http` and `https` packages to issue
 * requests.`
 */
class NodeHttpClient extends HttpClient {
    constructor(agent) {
        super();
        this._agent = agent;
    }
    /** @override. */
    getClientName() {
        return 'node';
    }
    makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        const isInsecureConnection = protocol === 'http';
        let agent = this._agent;
        if (!agent) {
            agent = isInsecureConnection ? defaultHttpAgent : defaultHttpsAgent;
        }
        const requestPromise = new Promise((resolve, reject) => {
            const req = (isInsecureConnection ? http : https).request({
                host: host,
                port: port,
                path,
                method,
                agent,
                headers,
                ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5',
            });
            req.setTimeout(timeout, () => {
                req.destroy(HttpClient.makeTimeoutError());
            });
            req.on('response', (res) => {
                resolve(new NodeHttpClientResponse(res));
            });
            req.on('error', (error) => {
                reject(error);
            });
            req.once('socket', (socket) => {
                if (socket.connecting) {
                    socket.once(isInsecureConnection ? 'connect' : 'secureConnect', () => {
                        // Send payload; we're safe:
                        req.write(requestData);
                        req.end();
                    });
                }
                else {
                    // we're already connected
                    req.write(requestData);
                    req.end();
                }
            });
        });
        return requestPromise;
    }
}
class NodeHttpClientResponse extends HttpClientResponse {
    constructor(res) {
        // @ts-ignore
        super(res.statusCode, res.headers || {});
        this._res = res;
    }
    getRawResponse() {
        return this._res;
    }
    toStream(streamCompleteCallback) {
        // The raw response is itself the stream, so we just return that. To be
        // backwards compatible, we should invoke the streamCompleteCallback only
        // once the stream has been fully consumed.
        this._res.once('end', () => streamCompleteCallback());
        return this._res;
    }
    toJSON() {
        return new Promise((resolve, reject) => {
            let response = '';
            this._res.setEncoding('utf8');
            this._res.on('data', (chunk) => {
                response += chunk;
            });
            this._res.once('end', () => {
                try {
                    resolve(JSON.parse(response));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}

const OPTIONS_KEYS = [
    'apiKey',
    'idempotencyKey',
    'stripeAccount',
    'apiVersion',
    'maxNetworkRetries',
    'timeout',
    'host',
    'authenticator',
    'stripeContext',
    'additionalHeaders',
    'streaming',
];
function isOptionsHash(o) {
    return (o &&
        typeof o === 'object' &&
        OPTIONS_KEYS.some((prop) => Object.prototype.hasOwnProperty.call(o, prop)));
}
/**
 * Stringifies an Object, accommodating nested objects
 * (forming the conventional key 'parent[child]=value')
 */
function queryStringifyRequestData(data, 
/** @deprecated Will be removed in a future release. */
_apiMode) {
    return stringifyRequestData(data);
}
/**
 * Encodes a value for use in a query string, keeping brackets unencoded
 * for readability (the server accepts both encoded and unencoded brackets).
 */
function encodeQueryValue(value) {
    return (encodeURIComponent(value)
        // Encode characters not encoded by encodeURIComponent but encoded by qs
        .replace(/!/g, '%21')
        .replace(/\*/g, '%2A')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/'/g, '%27')
        // Decode brackets for readability (server accepts both)
        .replace(/%5B/g, '[')
        .replace(/%5D/g, ']'));
}
/**
 * Converts a value to a string representation for query string encoding.
 * Dates are converted to Unix timestamps.
 */
function valueToString(value) {
    if (value instanceof Date) {
        return Math.floor(value.getTime() / 1000).toString();
    }
    if (value === null) {
        return '';
    }
    return String(value);
}
/**
 * Custom query string stringifier that handles nested objects and arrays.
 * Produces output compatible with the qs library's indexed array format.
 */
function stringifyRequestData(data) {
    const pairs = [];
    function encode(key, value) {
        if (value === undefined) {
            return;
        }
        if (value === null || typeof value !== 'object' || value instanceof Date) {
            // Primitive value (including null and Date)
            pairs.push(encodeQueryValue(key) + '=' + encodeQueryValue(valueToString(value)));
            return;
        }
        if (Array.isArray(value)) {
            // Array: use indexed format arr[0], arr[1], etc.
            for (let i = 0; i < value.length; i++) {
                if (value[i] !== undefined) {
                    encode(key + '[' + i + ']', value[i]);
                }
            }
            return;
        }
        // Object: recurse with bracket notation
        for (const k of Object.keys(value)) {
            encode(key + '[' + k + ']', value[k]);
        }
    }
    // Handle top-level object
    if (typeof data === 'object' && data !== null) {
        for (const key of Object.keys(data)) {
            encode(key, data[key]);
        }
    }
    return pairs.join('&');
}
/**
 * Outputs a new function with interpolated object property values.
 * Use like so:
 *   const fn = makeURLInterpolator('some/url/{param1}/{param2}');
 *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
 */
const makeURLInterpolator = (() => {
    const rc = {
        '\n': '\\n',
        '"': '\\"',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029',
    };
    return (str) => {
        const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0]);
        return (outputs) => {
            return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) => {
                const output = outputs[$1];
                if (isValidEncodeUriComponentType(output))
                    return encodeURIComponent(output);
                return '';
            });
        };
    };
})();
function isValidEncodeUriComponentType(value) {
    return ['number', 'string', 'boolean'].includes(typeof value);
}
function extractUrlParams(path) {
    const params = path.match(/\{\w+\}/g);
    if (!params) {
        return [];
    }
    return params.map((param) => param.replace(/[{}]/g, ''));
}
/**
 * Return the data argument from a list of arguments
 *
 * @param {object[]} args
 * @returns {object}
 */
function getDataFromArgs(args) {
    if (!Array.isArray(args) || !args[0] || typeof args[0] !== 'object') {
        return {};
    }
    if (!isOptionsHash(args[0])) {
        return args.shift();
    }
    const argKeys = Object.keys(args[0]);
    const optionKeysInArgs = argKeys.filter((key) => OPTIONS_KEYS.includes(key));
    // In some cases options may be the provided as the first argument.
    // Here we're detecting a case where there are two distinct arguments
    // (the first being args and the second options) and with known
    // option keys in the first so that we can warn the user about it.
    if (optionKeysInArgs.length > 0 &&
        optionKeysInArgs.length !== argKeys.length) {
        emitWarning(`Options found in arguments (${optionKeysInArgs.join(', ')}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`);
    }
    return {};
}
/**
 * Return the options hash from a list of arguments
 */
function getOptionsFromArgs(args) {
    const opts = {
        host: null,
        headers: {},
        settings: {},
        streaming: false,
    };
    if (args.length > 0) {
        const arg = args[args.length - 1];
        if (typeof arg === 'string') {
            opts.authenticator = createApiKeyAuthenticator(args.pop());
        }
        else if (isOptionsHash(arg)) {
            const params = Object.assign({}, args.pop());
            const extraKeys = Object.keys(params).filter((key) => !OPTIONS_KEYS.includes(key));
            if (extraKeys.length) {
                emitWarning(`Invalid options found (${extraKeys.join(', ')}); ignoring.`);
            }
            if (params.apiKey) {
                opts.authenticator = createApiKeyAuthenticator(params.apiKey);
            }
            if (params.idempotencyKey) {
                opts.headers['Idempotency-Key'] = params.idempotencyKey;
            }
            if (params.stripeAccount) {
                opts.headers['Stripe-Account'] = params.stripeAccount;
            }
            if (params.stripeContext) {
                if (opts.headers['Stripe-Account']) {
                    throw new Error("Can't specify both stripeAccount and stripeContext.");
                }
                opts.headers['Stripe-Context'] = params.stripeContext;
            }
            if (params.apiVersion) {
                opts.headers['Stripe-Version'] = params.apiVersion;
            }
            if (Number.isInteger(params.maxNetworkRetries)) {
                opts.settings.maxNetworkRetries = params.maxNetworkRetries;
            }
            if (Number.isInteger(params.timeout)) {
                opts.settings.timeout = params.timeout;
            }
            if (params.host) {
                opts.host = params.host;
            }
            if (params.authenticator) {
                if (params.apiKey) {
                    throw new Error("Can't specify both apiKey and authenticator.");
                }
                if (typeof params.authenticator !== 'function') {
                    throw new Error('The authenticator must be a function ' +
                        'receiving a request as the first parameter.');
                }
                opts.authenticator = params.authenticator;
            }
            if (params.additionalHeaders) {
                opts.headers = params.additionalHeaders;
            }
            if (params.streaming) {
                opts.streaming = true;
            }
        }
    }
    return opts;
}
/**
 * Provide simple "Class" extension mechanism.
 * <!-- Public API accessible via Stripe.StripeResource.extend -->
 */
function protoExtend(sub) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const Super = this;
    const Constructor = Object.prototype.hasOwnProperty.call(sub, 'constructor')
        ? sub.constructor
        : function (...args) {
            Super.apply(this, args);
        };
    // This initialization logic is somewhat sensitive to be compatible with
    // divergent JS implementations like the one found in Qt. See here for more
    // context:
    //
    // https://github.com/stripe/stripe-node/pull/334
    Object.assign(Constructor, Super);
    Constructor.prototype = Object.create(Super.prototype);
    Object.assign(Constructor.prototype, sub);
    return Constructor;
}
/**
 * Remove empty values from an object
 */
function removeNullish(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Argument must be an object');
    }
    return Object.keys(obj).reduce((result, key) => {
        if (obj[key] != null) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}
/**
 * Normalize standard HTTP Headers:
 * {'foo-bar': 'hi'}
 * becomes
 * {'Foo-Bar': 'hi'}
 */
function normalizeHeaders(obj) {
    if (!(obj && typeof obj === 'object')) {
        return obj;
    }
    return Object.keys(obj).reduce((result, header) => {
        result[normalizeHeader(header)] = obj[header];
        return result;
    }, {});
}
/**
 * Stolen from https://github.com/marten-de-vries/header-case-normalizer/blob/master/index.js#L36-L41
 * without the exceptions which are irrelevant to us.
 */
function normalizeHeader(header) {
    return header
        .split('-')
        .map((text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase())
        .join('-');
}
function callbackifyPromiseWithTimeout(promise, callback) {
    if (callback) {
        // Ensure callback is called outside of promise stack.
        return promise.then((res) => {
            setTimeout(() => {
                callback(null, res);
            }, 0);
        }, (err) => {
            setTimeout(() => {
                callback(err, null);
            }, 0);
        });
    }
    return promise;
}
/**
 * Allow for special capitalization cases (such as OAuth)
 */
function pascalToCamelCase(name) {
    if (name === 'OAuth') {
        return 'oauth';
    }
    else {
        return name[0].toLowerCase() + name.substring(1);
    }
}
function emitWarning(warning) {
    if (typeof process.emitWarning !== 'function') {
        return console.warn(`Stripe: ${warning}`); /* eslint-disable-line no-console */
    }
    return process.emitWarning(warning, 'Stripe');
}
function isObject(obj) {
    const type = typeof obj;
    return (type === 'function' || type === 'object') && !!obj;
}
// For use in multipart requests
function flattenAndStringify(data) {
    const result = {};
    const step = (obj, prevKey) => {
        Object.entries(obj).forEach(([key, value]) => {
            const newKey = prevKey ? `${prevKey}[${key}]` : key;
            if (isObject(value)) {
                if (!(value instanceof Uint8Array) &&
                    !Object.prototype.hasOwnProperty.call(value, 'data')) {
                    // Non-buffer non-file Objects are recursively flattened
                    return step(value, newKey);
                }
                else {
                    // Buffers and file objects are stored without modification
                    result[newKey] = value;
                }
            }
            else {
                // Primitives are converted to strings
                result[newKey] = String(value);
            }
        });
    };
    step(data, null);
    return result;
}
function validateInteger(name, n, defaultVal) {
    if (!Number.isInteger(n)) {
        if (defaultVal !== undefined) {
            return defaultVal;
        }
        else {
            throw new Error(`${name} must be an integer`);
        }
    }
    return n;
}
function determineProcessUserAgentProperties() {
    return typeof process === 'undefined'
        ? {}
        : {
            lang_version: process.version,
            platform: process.platform,
        };
}
function createApiKeyAuthenticator(apiKey) {
    const authenticator = (request) => {
        request.headers.Authorization = 'Bearer ' + apiKey;
        return Promise.resolve();
    };
    // For testing
    authenticator._apiKey = apiKey;
    return authenticator;
}
/**
 * Joins an array of Uint8Arrays into a single Uint8Array
 */
function concat(arrays) {
    const totalLength = arrays.reduce((len, array) => len + array.length, 0);
    const merged = new Uint8Array(totalLength);
    let offset = 0;
    arrays.forEach((array) => {
        merged.set(array, offset);
        offset += array.length;
    });
    return merged;
}
/**
 * Replaces Date objects with Unix timestamps
 */
function dateTimeReplacer(key, value) {
    if (this[key] instanceof Date) {
        return Math.floor(this[key].getTime() / 1000).toString();
    }
    return value;
}
/**
 * JSON stringifies an Object, replacing Date objects with Unix timestamps
 */
function jsonStringifyRequestData(data) {
    return JSON.stringify(data, dateTimeReplacer);
}
/**
 * Inspects the given path to determine if the endpoint is for v1 or v2 API
 */
function getAPIMode(path) {
    if (!path) {
        return 'v1';
    }
    return path.startsWith('/v2') ? 'v2' : 'v1';
}
function parseHttpHeaderAsString(header) {
    if (Array.isArray(header)) {
        return header.join(', ');
    }
    return String(header);
}
function parseHttpHeaderAsNumber(header) {
    const number = Array.isArray(header) ? header[0] : header;
    return Number(number);
}
function parseHeadersForFetch(headers) {
    return Object.entries(headers).map(([key, value]) => {
        return [key, parseHttpHeaderAsString(value)];
    });
}

/**
 * HTTP client which uses a `fetch` function to issue requests.
 *
 * By default relies on the global `fetch` function, but an optional function
 * can be passed in. If passing in a function, it is expected to match the Web
 * Fetch API. As an example, this could be the function provided by the
 * node-fetch package (https://github.com/node-fetch/node-fetch).
 */
class FetchHttpClient extends HttpClient {
    constructor(fetchFn) {
        super();
        // Default to global fetch if available
        if (!fetchFn) {
            if (!globalThis.fetch) {
                throw new Error('fetch() function not provided and is not defined in the global scope. ' +
                    'You must provide a fetch implementation.');
            }
            fetchFn = globalThis.fetch;
        }
        // Both timeout behaviors differs from Node:
        // - Fetch uses a single timeout for the entire length of the request.
        // - Node is more fine-grained and resets the timeout after each stage of the request.
        if (globalThis.AbortController) {
            // Utilise native AbortController if available
            // AbortController was added in Node v15.0.0, v14.17.0
            this._fetchFn = FetchHttpClient.makeFetchWithAbortTimeout(fetchFn);
        }
        else {
            // Fall back to racing against a timeout promise if not available in the runtime
            // This does not actually cancel the underlying fetch operation or resources
            this._fetchFn = FetchHttpClient.makeFetchWithRaceTimeout(fetchFn);
        }
    }
    static makeFetchWithRaceTimeout(fetchFn) {
        return (url, init, timeout) => {
            let pendingTimeoutId;
            const timeoutPromise = new Promise((_, reject) => {
                pendingTimeoutId = setTimeout(() => {
                    pendingTimeoutId = null;
                    reject(HttpClient.makeTimeoutError());
                }, timeout);
            });
            const fetchPromise = fetchFn(url, init);
            return Promise.race([fetchPromise, timeoutPromise]).finally(() => {
                if (pendingTimeoutId) {
                    clearTimeout(pendingTimeoutId);
                }
            });
        };
    }
    static makeFetchWithAbortTimeout(fetchFn) {
        return async (url, init, timeout) => {
            // Use AbortController because AbortSignal.timeout() was added later in Node v17.3.0, v16.14.0
            const abort = new AbortController();
            let timeoutId = setTimeout(() => {
                timeoutId = null;
                abort.abort(HttpClient.makeTimeoutError());
            }, timeout);
            try {
                return await fetchFn(url, Object.assign(Object.assign({}, init), { signal: abort.signal }));
            }
            catch (err) {
                // Some implementations, like node-fetch, do not respect the reason passed to AbortController.abort()
                // and instead it always throws an AbortError
                // We catch this case to normalise all timeout errors
                if (err.name === 'AbortError') {
                    throw HttpClient.makeTimeoutError();
                }
                else {
                    throw err;
                }
            }
            finally {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        };
    }
    /** @override. */
    getClientName() {
        return 'fetch';
    }
    async makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        const isInsecureConnection = protocol === 'http';
        const url = new URL(path, `${isInsecureConnection ? 'http' : 'https'}://${host}`);
        url.port = port;
        // For methods which expect payloads, we should always pass a body value
        // even when it is empty. Without this, some JS runtimes (eg. Deno) will
        // inject a second Content-Length header. See https://github.com/stripe/stripe-node/issues/1519
        // for more details.
        const methodHasPayload = method == 'POST' || method == 'PUT' || method == 'PATCH';
        const body = requestData || (methodHasPayload ? '' : undefined);
        const res = await this._fetchFn(url.toString(), {
            method,
            headers: parseHeadersForFetch(headers),
            body: body,
        }, timeout);
        return new FetchHttpClientResponse(res);
    }
}
class FetchHttpClientResponse extends HttpClientResponse {
    constructor(res) {
        super(res.status, FetchHttpClientResponse._transformHeadersToObject(res.headers));
        this._res = res;
    }
    getRawResponse() {
        return this._res;
    }
    toStream(streamCompleteCallback) {
        // Unfortunately `fetch` does not have event handlers for when the stream is
        // completely read. We therefore invoke the streamCompleteCallback right
        // away. This callback emits a response event with metadata and completes
        // metrics, so it's ok to do this without waiting for the stream to be
        // completely read.
        streamCompleteCallback();
        // Fetch's `body` property is expected to be a readable stream of the body.
        return this._res.body;
    }
    toJSON() {
        return this._res.json();
    }
    static _transformHeadersToObject(headers) {
        // Fetch uses a Headers instance so this must be converted to a barebones
        // JS object to meet the HttpClient interface.
        const headersObj = {};
        for (const entry of headers) {
            if (!Array.isArray(entry) || entry.length != 2) {
                throw new Error('Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.');
            }
            headersObj[entry[0]] = entry[1];
        }
        return headersObj;
    }
}

/**
 * `CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
 *
 * This only supports asynchronous operations.
 */
class SubtleCryptoProvider extends CryptoProvider {
    constructor(subtleCrypto) {
        super();
        // If no subtle crypto is interface, default to the global namespace. This
        // is to allow custom interfaces (eg. using the Node webcrypto interface in
        // tests).
        this.subtleCrypto = subtleCrypto || crypto.subtle;
    }
    /** @override */
    computeHMACSignature(payload, secret) {
        throw new CryptoProviderOnlySupportsAsyncError('SubtleCryptoProvider cannot be used in a synchronous context.');
    }
    /** @override */
    async computeHMACSignatureAsync(payload, secret) {
        const encoder = new TextEncoder();
        const key = await this.subtleCrypto.importKey('raw', encoder.encode(secret), {
            name: 'HMAC',
            hash: { name: 'SHA-256' },
        }, false, ['sign']);
        const signatureBuffer = await this.subtleCrypto.sign('hmac', key, encoder.encode(payload));
        // crypto.subtle returns the signature in base64 format. This must be
        // encoded in hex to match the CryptoProvider contract. We map each byte in
        // the buffer to its corresponding hex octet and then combine into a string.
        const signatureBytes = new Uint8Array(signatureBuffer);
        const signatureHexCodes = new Array(signatureBytes.length);
        for (let i = 0; i < signatureBytes.length; i++) {
            signatureHexCodes[i] = byteHexMapping[signatureBytes[i]];
        }
        return signatureHexCodes.join('');
    }
    /** @override */
    async computeSHA256Async(data) {
        return new Uint8Array(await this.subtleCrypto.digest('SHA-256', data));
    }
}
// Cached mapping of byte to hex representation. We do this once to avoid re-
// computing every time we need to convert the result of a signature to hex.
const byteHexMapping = new Array(256);
for (let i = 0; i < byteHexMapping.length; i++) {
    byteHexMapping[i] = i.toString(16).padStart(2, '0');
}

/**
 * Interface encapsulating various utility functions whose
 * implementations depend on the platform / JS runtime.
 */
class PlatformFunctions {
    constructor() {
        this._fetchFn = null;
        this._agent = null;
    }
    /**
     * Gets uname with Node's built-in `exec` function, if available.
     */
    getUname() {
        throw new Error('getUname not implemented.');
    }
    /**
     * Generates a v4 UUID. See https://stackoverflow.com/a/2117523
     */
    uuid4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    /**
     * Compares strings in constant time.
     */
    secureCompare(a, b) {
        // return early here if buffer lengths are not equal
        if (a.length !== b.length) {
            return false;
        }
        const len = a.length;
        let result = 0;
        for (let i = 0; i < len; ++i) {
            result |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return result === 0;
    }
    /**
     * Creates an event emitter.
     */
    createEmitter() {
        throw new Error('createEmitter not implemented.');
    }
    /**
     * Checks if the request data is a stream. If so, read the entire stream
     * to a buffer and return the buffer.
     */
    tryBufferData(data) {
        throw new Error('tryBufferData not implemented.');
    }
    /**
     * Creates an HTTP client which uses the Node `http` and `https` packages
     * to issue requests.
     */
    createNodeHttpClient(agent) {
        throw new Error('createNodeHttpClient not implemented.');
    }
    /**
     * Creates an HTTP client for issuing Stripe API requests which uses the Web
     * Fetch API.
     *
     * A fetch function can optionally be passed in as a parameter. If none is
     * passed, will default to the default `fetch` function in the global scope.
     */
    createFetchHttpClient(fetchFn) {
        return new FetchHttpClient(fetchFn);
    }
    /**
     * Creates an HTTP client using runtime-specific APIs.
     */
    createDefaultHttpClient() {
        throw new Error('createDefaultHttpClient not implemented.');
    }
    /**
     * Creates a CryptoProvider which uses the Node `crypto` package for its computations.
     */
    createNodeCryptoProvider() {
        throw new Error('createNodeCryptoProvider not implemented.');
    }
    /**
     * Creates a CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
     */
    createSubtleCryptoProvider(subtleCrypto) {
        return new SubtleCryptoProvider(subtleCrypto);
    }
    createDefaultCryptoProvider() {
        throw new Error('createDefaultCryptoProvider not implemented.');
    }
}

/* eslint-disable camelcase */
/* eslint-disable no-warning-comments */
const generateV1Error = (rawStripeError) => {
    switch (rawStripeError.type) {
        case 'card_error':
            return new StripeCardError(rawStripeError);
        case 'invalid_request_error':
            return new StripeInvalidRequestError(rawStripeError);
        case 'api_error':
            return new StripeAPIError(rawStripeError);
        case 'authentication_error':
            return new StripeAuthenticationError(rawStripeError);
        case 'rate_limit_error':
            return new StripeRateLimitError(rawStripeError);
        case 'idempotency_error':
            return new StripeIdempotencyError(rawStripeError);
        case 'invalid_grant':
            return new StripeInvalidGrantError(rawStripeError);
        default:
            return new StripeUnknownError(rawStripeError);
    }
};
// eslint-disable-next-line complexity
const generateV2Error = (rawStripeError) => {
    switch (rawStripeError.type) {
        // switchCases: The beginning of the section generated from our OpenAPI spec
        case 'temporary_session_expired':
            return new TemporarySessionExpiredError(rawStripeError);
        // switchCases: The end of the section generated from our OpenAPI spec
    }
    // Special handling for requests with missing required fields in V2 APIs.
    // invalid_field response in V2 APIs returns the field 'code' instead of 'type'.
    switch (rawStripeError.code) {
        case 'invalid_fields':
            return new StripeInvalidRequestError(rawStripeError);
    }
    return generateV1Error(rawStripeError);
};
/**
 * StripeError is the base error from which all other more specific Stripe errors derive.
 * Specifically for errors returned from Stripe's REST API.
 */
class StripeError extends Error {
    constructor(raw = {}, type = null) {
        var _a;
        super(raw.message);
        this.type = type || this.constructor.name;
        this.raw = raw;
        this.rawType = raw.type;
        this.code = raw.code;
        this.doc_url = raw.doc_url;
        this.param = raw.param;
        this.detail = raw.detail;
        this.headers = raw.headers;
        this.requestId = raw.requestId;
        this.statusCode = raw.statusCode;
        this.message = (_a = raw.message) !== null && _a !== void 0 ? _a : '';
        this.userMessage = raw.user_message;
        this.charge = raw.charge;
        this.decline_code = raw.decline_code;
        this.payment_intent = raw.payment_intent;
        this.payment_method = raw.payment_method;
        this.payment_method_type = raw.payment_method_type;
        this.setup_intent = raw.setup_intent;
        this.source = raw.source;
    }
}
/**
 * Helper factory which takes raw stripe errors and outputs wrapping instances
 */
StripeError.generate = generateV1Error;
// Specific Stripe Error types:
/**
 * CardError is raised when a user enters a card that can't be charged for
 * some reason.
 */
class StripeCardError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeCardError');
    }
}
/**
 * InvalidRequestError is raised when a request is initiated with invalid
 * parameters.
 */
class StripeInvalidRequestError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeInvalidRequestError');
    }
}
/**
 * APIError is a generic error that may be raised in cases where none of the
 * other named errors cover the problem. It could also be raised in the case
 * that a new error has been introduced in the API, but this version of the
 * Node.JS SDK doesn't know how to handle it.
 */
class StripeAPIError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeAPIError');
    }
}
/**
 * AuthenticationError is raised when invalid credentials are used to connect
 * to Stripe's servers.
 */
class StripeAuthenticationError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeAuthenticationError');
    }
}
/**
 * PermissionError is raised in cases where access was attempted on a resource
 * that wasn't allowed.
 */
class StripePermissionError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripePermissionError');
    }
}
/**
 * RateLimitError is raised in cases where an account is putting too much load
 * on Stripe's API servers (usually by performing too many requests). Please
 * back off on request rate.
 */
class StripeRateLimitError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeRateLimitError');
    }
}
/**
 * StripeConnectionError is raised in the event that the SDK can't connect to
 * Stripe's servers. That can be for a variety of different reasons from a
 * downed network to a bad TLS certificate.
 */
class StripeConnectionError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeConnectionError');
    }
}
/**
 * SignatureVerificationError is raised when the signature verification for a
 * webhook fails
 */
class StripeSignatureVerificationError extends StripeError {
    constructor(header, payload, raw = {}) {
        super(raw, 'StripeSignatureVerificationError');
        this.header = header;
        this.payload = payload;
    }
}
/**
 * IdempotencyError is raised in cases where an idempotency key was used
 * improperly.
 */
class StripeIdempotencyError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeIdempotencyError');
    }
}
/**
 * InvalidGrantError is raised when a specified code doesn't exist, is
 * expired, has been used, or doesn't belong to you; a refresh token doesn't
 * exist, or doesn't belong to you; or if an API key's mode (live or test)
 * doesn't match the mode of a code or refresh token.
 */
class StripeInvalidGrantError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeInvalidGrantError');
    }
}
/**
 * Any other error from Stripe not specifically captured above
 */
class StripeUnknownError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeUnknownError');
    }
}
// classDefinitions: The beginning of the section generated from our OpenAPI spec
class TemporarySessionExpiredError extends StripeError {
    constructor(rawStripeError = {}) {
        super(rawStripeError, 'TemporarySessionExpiredError');
    }
}
// classDefinitions: The end of the section generated from our OpenAPI spec

const _Error = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    StripeAPIError,
    StripeAuthenticationError,
    StripeCardError,
    StripeConnectionError,
    StripeError,
    StripeIdempotencyError,
    StripeInvalidGrantError,
    StripeInvalidRequestError,
    StripePermissionError,
    StripeRateLimitError,
    StripeSignatureVerificationError,
    StripeUnknownError,
    TemporarySessionExpiredError,
    generateV1Error,
    generateV2Error
}, Symbol.toStringTag, { value: 'Module' }));

class StreamProcessingError extends StripeError {
}
/**
 * Specializes WebPlatformFunctions using APIs available in Node.js.
 */
class NodePlatformFunctions extends PlatformFunctions {
    constructor() {
        super();
        this._exec = exec;
        this._UNAME_CACHE = null;
    }
    /** @override */
    uuid4() {
        // available in: v14.17.x+
        if (crypto$1.randomUUID) {
            return crypto$1.randomUUID();
        }
        return super.uuid4();
    }
    /**
     * @override
     * Node's built in `exec` function sometimes throws outright,
     * and sometimes has a callback with an error,
     * depending on the type of error.
     *
     * This unifies that interface by resolving with a null uname
     * if an error is encountered.
     */
    getUname() {
        if (!this._UNAME_CACHE) {
            this._UNAME_CACHE = new Promise((resolve, reject) => {
                try {
                    this._exec('uname -a', (err, uname) => {
                        if (err) {
                            return resolve(null);
                        }
                        resolve(uname);
                    });
                }
                catch (e) {
                    resolve(null);
                }
            });
        }
        return this._UNAME_CACHE;
    }
    /**
     * @override
     * Secure compare, from https://github.com/freewil/scmp
     */
    secureCompare(a, b) {
        if (!a || !b) {
            throw new Error('secureCompare must receive two arguments');
        }
        // return early here if buffer lengths are not equal since timingSafeEqual
        // will throw if buffer lengths are not equal
        if (a.length !== b.length) {
            return false;
        }
        // use crypto.timingSafeEqual if available (since Node.js v6.6.0),
        // otherwise use our own scmp-internal function.
        if (crypto$1.timingSafeEqual) {
            const textEncoder = new TextEncoder();
            const aEncoded = textEncoder.encode(a);
            const bEncoded = textEncoder.encode(b);
            return crypto$1.timingSafeEqual(aEncoded, bEncoded);
        }
        return super.secureCompare(a, b);
    }
    createEmitter() {
        return new EventEmitter();
    }
    /** @override */
    tryBufferData(data) {
        if (!(data.file.data instanceof EventEmitter)) {
            return Promise.resolve(data);
        }
        const bufferArray = [];
        return new Promise((resolve, reject) => {
            data.file.data
                .on('data', (line) => {
                bufferArray.push(line);
            })
                .once('end', () => {
                // @ts-ignore
                const bufferData = Object.assign({}, data);
                bufferData.file.data = concat(bufferArray);
                resolve(bufferData);
            })
                .on('error', (err) => {
                reject(new StreamProcessingError({
                    message: 'An error occurred while attempting to process the file for upload.',
                    detail: err,
                }));
            });
        });
    }
    /** @override */
    createNodeHttpClient(agent) {
        return new NodeHttpClient(agent);
    }
    /** @override */
    createDefaultHttpClient() {
        return new NodeHttpClient();
    }
    /** @override */
    createNodeCryptoProvider() {
        return new NodeCryptoProvider();
    }
    /** @override */
    createDefaultCryptoProvider() {
        return this.createNodeCryptoProvider();
    }
}

const MAX_RETRY_AFTER_WAIT = 60;
class RequestSender {
    constructor(stripe, maxBufferedRequestMetric) {
        this._stripe = stripe;
        this._maxBufferedRequestMetric = maxBufferedRequestMetric;
    }
    _normalizeStripeContext(optsContext, clientContext) {
        if (optsContext) {
            return optsContext.toString() || null; // return null for empty strings
        }
        return (clientContext === null || clientContext === void 0 ? void 0 : clientContext.toString()) || null; // return null for empty strings
    }
    _addHeadersDirectlyToObject(obj, headers) {
        // For convenience, make some headers easily accessible on
        // lastResponse.
        // NOTE: Stripe responds with lowercase header names/keys.
        obj.requestId = headers['request-id'];
        obj.stripeAccount = obj.stripeAccount || headers['stripe-account'];
        obj.apiVersion = obj.apiVersion || headers['stripe-version'];
        obj.idempotencyKey = obj.idempotencyKey || headers['idempotency-key'];
    }
    _makeResponseEvent(requestEvent, statusCode, headers) {
        const requestEndTime = Date.now();
        const requestDurationMs = requestEndTime - requestEvent.request_start_time;
        return removeNullish({
            api_version: headers['stripe-version'],
            account: headers['stripe-account'],
            idempotency_key: headers['idempotency-key'],
            method: requestEvent.method,
            path: requestEvent.path,
            status: statusCode,
            request_id: this._getRequestId(headers),
            elapsed: requestDurationMs,
            request_start_time: requestEvent.request_start_time,
            request_end_time: requestEndTime,
        });
    }
    _getRequestId(headers) {
        return headers['request-id'];
    }
    /**
     * Used by methods with spec.streaming === true. For these methods, we do not
     * buffer successful responses into memory or do parse them into stripe
     * objects, we delegate that all of that to the user and pass back the raw
     * http.Response object to the callback.
     *
     * (Unsuccessful responses shouldn't make it here, they should
     * still be buffered/parsed and handled by _jsonResponseHandler -- see
     * makeRequest)
     */
    _streamingResponseHandler(requestEvent, usage, callback) {
        return (res) => {
            const headers = res.getHeaders();
            const streamCompleteCallback = () => {
                const responseEvent = this._makeResponseEvent(requestEvent, res.getStatusCode(), headers);
                this._stripe._emitter.emit('response', responseEvent);
                this._recordRequestMetrics(this._getRequestId(headers), responseEvent.elapsed, usage);
            };
            const stream = res.toStream(streamCompleteCallback);
            // This is here for backwards compatibility, as the stream is a raw
            // HTTP response in Node and the legacy behavior was to mutate this
            // response.
            this._addHeadersDirectlyToObject(stream, headers);
            return callback(null, stream);
        };
    }
    /**
     * Default handler for Stripe responses. Buffers the response into memory,
     * parses the JSON and returns it (i.e. passes it to the callback) if there
     * is no "error" field. Otherwise constructs/passes an appropriate Error.
     */
    _jsonResponseHandler(requestEvent, apiMode, usage, callback) {
        return (res) => {
            const headers = res.getHeaders();
            const requestId = this._getRequestId(headers);
            const statusCode = res.getStatusCode();
            const responseEvent = this._makeResponseEvent(requestEvent, statusCode, headers);
            this._stripe._emitter.emit('response', responseEvent);
            res
                .toJSON()
                .then((jsonResponse) => {
                if (jsonResponse.error) {
                    let err;
                    // Convert OAuth error responses into a standard format
                    // so that the rest of the error logic can be shared
                    if (typeof jsonResponse.error === 'string') {
                        jsonResponse.error = {
                            type: jsonResponse.error,
                            message: jsonResponse.error_description,
                        };
                    }
                    jsonResponse.error.headers = headers;
                    jsonResponse.error.statusCode = statusCode;
                    jsonResponse.error.requestId = requestId;
                    if (statusCode === 401) {
                        err = new StripeAuthenticationError(jsonResponse.error);
                    }
                    else if (statusCode === 403) {
                        err = new StripePermissionError(jsonResponse.error);
                    }
                    else if (statusCode === 429) {
                        err = new StripeRateLimitError(jsonResponse.error);
                    }
                    else if (apiMode === 'v2') {
                        err = generateV2Error(jsonResponse.error);
                    }
                    else {
                        err = generateV1Error(jsonResponse.error);
                    }
                    throw err;
                }
                return jsonResponse;
            }, (e) => {
                throw new StripeAPIError({
                    message: 'Invalid JSON received from the Stripe API',
                    exception: e,
                    requestId: headers['request-id'],
                });
            })
                .then((jsonResponse) => {
                this._recordRequestMetrics(requestId, responseEvent.elapsed, usage);
                // Expose raw response object.
                const rawResponse = res.getRawResponse();
                this._addHeadersDirectlyToObject(rawResponse, headers);
                Object.defineProperty(jsonResponse, 'lastResponse', {
                    enumerable: false,
                    writable: false,
                    value: rawResponse,
                });
                callback(null, jsonResponse);
            }, (e) => callback(e, null));
        };
    }
    static _generateConnectionErrorMessage(requestRetries) {
        return `An error occurred with our connection to Stripe.${requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ''}`;
    }
    // For more on when and how to retry API requests, see https://stripe.com/docs/error-handling#safely-retrying-requests-with-idempotency
    static _shouldRetry(res, numRetries, maxRetries, error) {
        if (error &&
            numRetries === 0 &&
            HttpClient.CONNECTION_CLOSED_ERROR_CODES.includes(error.code)) {
            return true;
        }
        // Do not retry if we are out of retries.
        if (numRetries >= maxRetries) {
            return false;
        }
        // Retry on connection error.
        if (!res) {
            return true;
        }
        // The API may ask us not to retry (e.g., if doing so would be a no-op)
        // or advise us to retry (e.g., in cases of lock timeouts); we defer to that.
        if (res.getHeaders()['stripe-should-retry'] === 'false') {
            return false;
        }
        if (res.getHeaders()['stripe-should-retry'] === 'true') {
            return true;
        }
        // Retry on conflict errors.
        if (res.getStatusCode() === 409) {
            return true;
        }
        // Retry on 500, 503, and other internal errors.
        //
        // Note that we expect the stripe-should-retry header to be false
        // in most cases when a 500 is returned, since our idempotency framework
        // would typically replay it anyway.
        if (res.getStatusCode() >= 500) {
            return true;
        }
        return false;
    }
    _getSleepTimeInMS(numRetries, retryAfter = null) {
        const initialNetworkRetryDelay = this._stripe.getInitialNetworkRetryDelay();
        const maxNetworkRetryDelay = this._stripe.getMaxNetworkRetryDelay();
        // Apply exponential backoff with initialNetworkRetryDelay on the
        // number of numRetries so far as inputs. Do not allow the number to exceed
        // maxNetworkRetryDelay.
        let sleepSeconds = Math.min(initialNetworkRetryDelay * Math.pow(2, numRetries - 1), maxNetworkRetryDelay);
        // Apply some jitter by randomizing the value in the range of
        // (sleepSeconds / 2) to (sleepSeconds).
        sleepSeconds *= 0.5 * (1 + Math.random());
        // But never sleep less than the base sleep seconds.
        sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);
        // And never sleep less than the time the API asks us to wait, assuming it's a reasonable ask.
        if (Number.isInteger(retryAfter) && retryAfter <= MAX_RETRY_AFTER_WAIT) {
            sleepSeconds = Math.max(sleepSeconds, retryAfter);
        }
        return sleepSeconds * 1000;
    }
    // Max retries can be set on a per request basis. Favor those over the global setting
    _getMaxNetworkRetries(settings = {}) {
        return settings.maxNetworkRetries !== undefined &&
            Number.isInteger(settings.maxNetworkRetries)
            ? settings.maxNetworkRetries
            : this._stripe.getMaxNetworkRetries();
    }
    _defaultIdempotencyKey(method, settings, apiMode) {
        // If this is a POST and we allow multiple retries, ensure an idempotency key.
        const maxRetries = this._getMaxNetworkRetries(settings);
        const genKey = () => `stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;
        // more verbose than it needs to be, but gives clear separation between V1 and V2 behavior
        if (apiMode === 'v2') {
            if (method === 'POST' || method === 'DELETE') {
                return genKey();
            }
        }
        else if (apiMode === 'v1') {
            if (method === 'POST' && maxRetries > 0) {
                return genKey();
            }
        }
        return null;
    }
    _makeHeaders({ contentType, contentLength, apiVersion, clientUserAgent, method, userSuppliedHeaders, userSuppliedSettings, stripeAccount, stripeContext, apiMode, }) {
        const defaultHeaders = {
            Accept: 'application/json',
            'Content-Type': contentType,
            'User-Agent': this._getUserAgentString(apiMode),
            'X-Stripe-Client-User-Agent': clientUserAgent,
            'X-Stripe-Client-Telemetry': this._getTelemetryHeader(),
            'Stripe-Version': apiVersion,
            'Stripe-Account': stripeAccount,
            'Stripe-Context': stripeContext,
            'Idempotency-Key': this._defaultIdempotencyKey(method, userSuppliedSettings, apiMode),
        };
        // As per https://datatracker.ietf.org/doc/html/rfc7230#section-3.3.2:
        //   A user agent SHOULD send a Content-Length in a request message when
        //   no Transfer-Encoding is sent and the request method defines a meaning
        //   for an enclosed payload body.  For example, a Content-Length header
        //   field is normally sent in a POST request even when the value is 0
        //   (indicating an empty payload body).  A user agent SHOULD NOT send a
        //   Content-Length header field when the request message does not contain
        //   a payload body and the method semantics do not anticipate such a
        //   body.
        //
        // These method types are expected to have bodies and so we should always
        // include a Content-Length.
        const methodHasPayload = method == 'POST' || method == 'PUT' || method == 'PATCH';
        // If a content length was specified, we always include it regardless of
        // whether the method semantics anticipate such a body. This keeps us
        // consistent with historical behavior. We do however want to warn on this
        // and fix these cases as they are semantically incorrect.
        if (methodHasPayload || contentLength) {
            if (!methodHasPayload) {
                emitWarning(`${method} method had non-zero contentLength but no payload is expected for this verb`);
            }
            defaultHeaders['Content-Length'] = contentLength;
        }
        return Object.assign(removeNullish(defaultHeaders), 
        // If the user supplied, say 'idempotency-key', override instead of appending by ensuring caps are the same.
        normalizeHeaders(userSuppliedHeaders));
    }
    _getUserAgentString(apiMode) {
        const packageVersion = this._stripe.getConstant('PACKAGE_VERSION');
        const appInfo = this._stripe._appInfo
            ? this._stripe.getAppInfoAsString()
            : '';
        return `Stripe/${apiMode} NodeBindings/${packageVersion} ${appInfo}`.trim();
    }
    _getTelemetryHeader() {
        if (this._stripe.getTelemetryEnabled() &&
            this._stripe._prevRequestMetrics.length > 0) {
            const metrics = this._stripe._prevRequestMetrics.shift();
            return JSON.stringify({
                last_request_metrics: metrics,
            });
        }
    }
    _recordRequestMetrics(requestId, requestDurationMs, usage) {
        if (this._stripe.getTelemetryEnabled() && requestId) {
            if (this._stripe._prevRequestMetrics.length > this._maxBufferedRequestMetric) {
                emitWarning('Request metrics buffer is full, dropping telemetry message.');
            }
            else {
                const m = {
                    request_id: requestId,
                    request_duration_ms: requestDurationMs,
                };
                if (usage && usage.length > 0) {
                    m.usage = usage;
                }
                this._stripe._prevRequestMetrics.push(m);
            }
        }
    }
    _rawRequest(method, path, params, options, usage) {
        const requestPromise = new Promise((resolve, reject) => {
            let opts;
            try {
                const requestMethod = method.toUpperCase();
                if (requestMethod !== 'POST' &&
                    params &&
                    Object.keys(params).length !== 0) {
                    throw new Error('rawRequest only supports params on POST requests. Please pass null and add your parameters to path.');
                }
                const args = [].slice.call([params, options]);
                // Pull request data and options (headers, auth) from args.
                const dataFromArgs = getDataFromArgs(args);
                const data = requestMethod === 'POST' ? Object.assign({}, dataFromArgs) : null;
                const calculatedOptions = getOptionsFromArgs(args);
                const headers = calculatedOptions.headers;
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const authenticator = calculatedOptions.authenticator;
                opts = {
                    requestMethod,
                    requestPath: path,
                    bodyData: data,
                    queryData: {},
                    authenticator,
                    headers,
                    host: calculatedOptions.host,
                    streaming: !!calculatedOptions.streaming,
                    settings: {},
                    // We use this for thin event internals, so we should record the more specific `usage`, when available
                    usage: usage || ['raw_request'],
                };
            }
            catch (err) {
                reject(err);
                return;
            }
            function requestCallback(err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }
            const { headers, settings } = opts;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const authenticator = opts.authenticator;
            this._request(opts.requestMethod, opts.host, path, opts.bodyData, authenticator, { headers, settings, streaming: opts.streaming }, opts.usage, requestCallback);
        });
        return requestPromise;
    }
    _getContentLength(data) {
        // if we calculate this wrong, the server treats it as invalid json
        // or if content length is too big, the request never finishes and it
        // times out.
        return typeof data === 'string'
            ? new TextEncoder().encode(data).length
            : data.length;
    }
    _request(method, host, path, data, authenticator, options, usage = [], callback, requestDataProcessor = null) {
        var _a;
        let requestData;
        authenticator = (_a = authenticator !== null && authenticator !== void 0 ? authenticator : this._stripe._authenticator) !== null && _a !== void 0 ? _a : null;
        const apiMode = getAPIMode(path);
        const retryRequest = (requestFn, apiVersion, headers, requestRetries, retryAfter) => {
            return setTimeout(requestFn, this._getSleepTimeInMS(requestRetries, retryAfter), apiVersion, headers, requestRetries + 1);
        };
        const makeRequest = (apiVersion, headers, numRetries) => {
            // timeout can be set on a per-request basis. Favor that over the global setting
            const timeout = options.settings &&
                options.settings.timeout &&
                Number.isInteger(options.settings.timeout) &&
                options.settings.timeout >= 0
                ? options.settings.timeout
                : this._stripe.getApiField('timeout');
            const request = {
                host: host || this._stripe.getApiField('host'),
                port: this._stripe.getApiField('port'),
                path: path,
                method: method,
                headers: Object.assign({}, headers),
                body: requestData,
                protocol: this._stripe.getApiField('protocol'),
            };
            authenticator(request)
                .then(() => {
                const req = this._stripe
                    .getApiField('httpClient')
                    .makeRequest(request.host, request.port, request.path, request.method, request.headers, request.body, request.protocol, timeout);
                const requestStartTime = Date.now();
                const requestEvent = removeNullish({
                    api_version: apiVersion,
                    account: parseHttpHeaderAsString(headers['Stripe-Account']),
                    idempotency_key: parseHttpHeaderAsString(headers['Idempotency-Key']),
                    method,
                    path,
                    request_start_time: requestStartTime,
                });
                const requestRetries = numRetries || 0;
                const maxRetries = this._getMaxNetworkRetries(options.settings || {});
                this._stripe._emitter.emit('request', requestEvent);
                req
                    .then((res) => {
                    if (RequestSender._shouldRetry(res, requestRetries, maxRetries)) {
                        return retryRequest(makeRequest, apiVersion, headers, requestRetries, parseHttpHeaderAsNumber(res.getHeaders()['retry-after']));
                    }
                    else if (options.streaming && res.getStatusCode() < 400) {
                        return this._streamingResponseHandler(requestEvent, usage, callback)(res);
                    }
                    else {
                        return this._jsonResponseHandler(requestEvent, apiMode, usage, callback)(res);
                    }
                })
                    .catch((error) => {
                    if (RequestSender._shouldRetry(null, requestRetries, maxRetries, error)) {
                        return retryRequest(makeRequest, apiVersion, headers, requestRetries, null);
                    }
                    else {
                        const isTimeoutError = error.code && error.code === HttpClient.TIMEOUT_ERROR_CODE;
                        return callback(new StripeConnectionError({
                            message: isTimeoutError
                                ? `Request aborted due to timeout being reached (${timeout}ms)`
                                : RequestSender._generateConnectionErrorMessage(requestRetries),
                            detail: error,
                        }));
                    }
                });
            })
                .catch((e) => {
                throw new StripeError({
                    message: 'Unable to authenticate the request',
                    exception: e,
                });
            });
        };
        const prepareAndMakeRequest = (error, data) => {
            if (error) {
                return callback(error);
            }
            requestData = data;
            this._stripe.getClientUserAgent((clientUserAgent) => {
                var _a, _b, _c;
                const apiVersion = this._stripe.getApiField('version');
                const headers = this._makeHeaders({
                    contentType: apiMode == 'v2'
                        ? 'application/json'
                        : 'application/x-www-form-urlencoded',
                    contentLength: this._getContentLength(data),
                    apiVersion: apiVersion,
                    clientUserAgent,
                    method,
                    // other callers expect null, but .headers being optional means it's undefined if not supplied. So we normalize to null.
                    userSuppliedHeaders: (_a = options.headers) !== null && _a !== void 0 ? _a : null,
                    userSuppliedSettings: (_b = options.settings) !== null && _b !== void 0 ? _b : {},
                    stripeAccount: (_c = options.stripeAccount) !== null && _c !== void 0 ? _c : this._stripe.getApiField('stripeAccount'),
                    stripeContext: this._normalizeStripeContext(options.stripeContext, this._stripe.getApiField('stripeContext')),
                    apiMode: apiMode,
                });
                makeRequest(apiVersion, headers, 0);
            });
        };
        if (requestDataProcessor) {
            requestDataProcessor(method, data, options.headers, prepareAndMakeRequest);
        }
        else {
            let stringifiedData;
            if (apiMode == 'v2') {
                stringifiedData = data ? jsonStringifyRequestData(data) : '';
            }
            else {
                stringifiedData = queryStringifyRequestData(data || {});
            }
            prepareAndMakeRequest(null, stringifiedData);
        }
    }
}

class V1Iterator {
    constructor(firstPagePromise, requestArgs, spec, stripeResource) {
        this.index = 0;
        this.pagePromise = firstPagePromise;
        this.promiseCache = { currentPromise: null };
        this.requestArgs = requestArgs;
        this.spec = spec;
        this.stripeResource = stripeResource;
    }
    async iterate(pageResult) {
        if (!(pageResult &&
            pageResult.data &&
            typeof pageResult.data.length === 'number')) {
            throw Error('Unexpected: Stripe API response does not have a well-formed `data` array.');
        }
        const reverseIteration = isReverseIteration(this.requestArgs);
        if (this.index < pageResult.data.length) {
            const idx = reverseIteration
                ? pageResult.data.length - 1 - this.index
                : this.index;
            const value = pageResult.data[idx];
            this.index += 1;
            return { value, done: false };
        }
        else if (pageResult.has_more) {
            // Reset counter, request next page, and recurse.
            this.index = 0;
            this.pagePromise = this.getNextPage(pageResult);
            const nextPageResult = await this.pagePromise;
            return this.iterate(nextPageResult);
        }
        return { done: true, value: undefined };
    }
    /** @abstract */
    getNextPage(_pageResult) {
        throw new Error('Unimplemented');
    }
    async _next() {
        return this.iterate(await this.pagePromise);
    }
    next() {
        /**
         * If a user calls `.next()` multiple times in parallel,
         * return the same result until something has resolved
         * to prevent page-turning race conditions.
         */
        if (this.promiseCache.currentPromise) {
            return this.promiseCache.currentPromise;
        }
        const nextPromise = (async () => {
            const ret = await this._next();
            this.promiseCache.currentPromise = null;
            return ret;
        })();
        this.promiseCache.currentPromise = nextPromise;
        return nextPromise;
    }
}
class V1ListIterator extends V1Iterator {
    getNextPage(pageResult) {
        const reverseIteration = isReverseIteration(this.requestArgs);
        const lastId = getLastId(pageResult, reverseIteration);
        return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            [reverseIteration ? 'ending_before' : 'starting_after']: lastId,
        });
    }
}
class V1SearchIterator extends V1Iterator {
    getNextPage(pageResult) {
        if (!pageResult.next_page) {
            throw Error('Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.');
        }
        return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            page: pageResult.next_page,
        });
    }
}
class V2ListIterator {
    constructor(firstPagePromise, requestArgs, spec, stripeResource) {
        this.firstPagePromise = firstPagePromise;
        this.currentPageIterator = null;
        this.nextPageUrl = null;
        this.requestArgs = requestArgs;
        this.spec = spec;
        this.stripeResource = stripeResource;
    }
    async initFirstPage() {
        if (this.firstPagePromise) {
            const page = await this.firstPagePromise;
            this.firstPagePromise = null;
            this.currentPageIterator = page.data[Symbol.iterator]();
            this.nextPageUrl = page.next_page_url || null;
        }
    }
    async turnPage() {
        if (!this.nextPageUrl)
            return null;
        this.spec.fullPath = this.nextPageUrl;
        const page = await this.stripeResource._makeRequest([], this.spec, {});
        this.nextPageUrl = page.next_page_url || null;
        this.currentPageIterator = page.data[Symbol.iterator]();
        return this.currentPageIterator;
    }
    async next() {
        await this.initFirstPage();
        if (this.currentPageIterator) {
            const result = this.currentPageIterator.next();
            if (!result.done)
                return { done: false, value: result.value };
        }
        const nextPageIterator = await this.turnPage();
        if (!nextPageIterator) {
            return { done: true, value: undefined };
        }
        const result = nextPageIterator.next();
        if (!result.done)
            return { done: false, value: result.value };
        return { done: true, value: undefined };
    }
}
const makeAutoPaginationMethods = (stripeResource, requestArgs, spec, firstPagePromise) => {
    const apiMode = getAPIMode(spec.fullPath || spec.path);
    if (apiMode !== 'v2' && spec.methodType === 'search') {
        return makeAutoPaginationMethodsFromIterator(new V1SearchIterator(firstPagePromise, requestArgs, spec, stripeResource));
    }
    if (apiMode !== 'v2' && spec.methodType === 'list') {
        return makeAutoPaginationMethodsFromIterator(new V1ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
    }
    if (apiMode === 'v2' && spec.methodType === 'list') {
        return makeAutoPaginationMethodsFromIterator(new V2ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
    }
    return null;
};
const makeAutoPaginationMethodsFromIterator = (iterator) => {
    const autoPagingEach = makeAutoPagingEach((...args) => iterator.next(...args));
    const autoPagingToArray = makeAutoPagingToArray(autoPagingEach);
    const autoPaginationMethods = {
        autoPagingEach,
        autoPagingToArray,
        // Async iterator functions:
        next: () => iterator.next(),
        return: () => {
            // This is required for `break`.
            return {};
        },
        [getAsyncIteratorSymbol()]: () => {
            return autoPaginationMethods;
        },
    };
    return autoPaginationMethods;
};
/**
 * ----------------
 * Private Helpers:
 * ----------------
 */
function getAsyncIteratorSymbol() {
    if (typeof Symbol !== 'undefined' && Symbol.asyncIterator) {
        return Symbol.asyncIterator;
    }
    // Follow the convention from libraries like iterall: https://github.com/leebyron/iterall#asynciterator-1
    return '@@asyncIterator';
}
function getDoneCallback(args) {
    if (args.length < 2) {
        return null;
    }
    const onDone = args[1];
    if (typeof onDone !== 'function') {
        throw Error(`The second argument to autoPagingEach, if present, must be a callback function; received ${typeof onDone}`);
    }
    return onDone;
}
/**
 * We allow four forms of the `onItem` callback (the middle two being equivalent),
 *
 *   1. `.autoPagingEach((item) => { doSomething(item); return false; });`
 *   2. `.autoPagingEach(async (item) => { await doSomething(item); return false; });`
 *   3. `.autoPagingEach((item) => doSomething(item).then(() => false));`
 *   4. `.autoPagingEach((item, next) => { doSomething(item); next(false); });`
 *
 * In addition to standard validation, this helper
 * coalesces the former forms into the latter form.
 */
function getItemCallback(args) {
    if (args.length === 0) {
        return undefined;
    }
    const onItem = args[0];
    if (typeof onItem !== 'function') {
        throw Error(`The first argument to autoPagingEach, if present, must be a callback function; received ${typeof onItem}`);
    }
    // 4. `.autoPagingEach((item, next) => { doSomething(item); next(false); });`
    if (onItem.length === 2) {
        return onItem;
    }
    if (onItem.length > 2) {
        throw Error(`The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${onItem}`);
    }
    // This magically handles all three of these usecases (the latter two being functionally identical):
    // 1. `.autoPagingEach((item) => { doSomething(item); return false; });`
    // 2. `.autoPagingEach(async (item) => { await doSomething(item); return false; });`
    // 3. `.autoPagingEach((item) => doSomething(item).then(() => false));`
    return function _onItem(item, next) {
        const shouldContinue = onItem(item);
        next(shouldContinue);
    };
}
function getLastId(listResult, reverseIteration) {
    const lastIdx = reverseIteration ? 0 : listResult.data.length - 1;
    const lastItem = listResult.data[lastIdx];
    const lastId = lastItem && lastItem.id;
    if (!lastId) {
        throw Error('Unexpected: No `id` found on the last item while auto-paging a list.');
    }
    return lastId;
}
function makeAutoPagingEach(asyncIteratorNext) {
    return function autoPagingEach( /* onItem?, onDone? */) {
        const args = [].slice.call(arguments);
        const onItem = getItemCallback(args);
        const onDone = getDoneCallback(args);
        if (args.length > 2) {
            throw Error(`autoPagingEach takes up to two arguments; received ${args}`);
        }
        const autoPagePromise = wrapAsyncIteratorWithCallback(asyncIteratorNext, 
        // @ts-ignore we might need a null check
        onItem);
        return callbackifyPromiseWithTimeout(autoPagePromise, onDone);
    };
}
function makeAutoPagingToArray(autoPagingEach) {
    return function autoPagingToArray(opts, onDone) {
        const limit = opts && opts.limit;
        if (!limit) {
            throw Error('You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.');
        }
        if (limit > 10000) {
            throw Error('You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.');
        }
        const promise = new Promise((resolve, reject) => {
            const items = [];
            autoPagingEach((item) => {
                items.push(item);
                if (items.length >= limit) {
                    return false;
                }
            })
                .then(() => {
                resolve(items);
            })
                .catch(reject);
        });
        // @ts-ignore
        return callbackifyPromiseWithTimeout(promise, onDone);
    };
}
function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
    return new Promise((resolve, reject) => {
        function handleIteration(iterResult) {
            if (iterResult.done) {
                resolve();
                return;
            }
            const item = iterResult.value;
            return new Promise((next) => {
                // Bit confusing, perhaps; we pass a `resolve` fn
                // to the user, so they can decide when and if to continue.
                // They can return false, or a promise which resolves to false, to break.
                onItem(item, next);
            }).then((shouldContinue) => {
                if (shouldContinue === false) {
                    return handleIteration({ done: true, value: undefined });
                }
                else {
                    return asyncIteratorNext().then(handleIteration);
                }
            });
        }
        asyncIteratorNext()
            .then(handleIteration)
            .catch(reject);
    });
}
function isReverseIteration(requestArgs) {
    const args = [].slice.call(requestArgs);
    const dataFromArgs = getDataFromArgs(args);
    return !!dataFromArgs.ending_before;
}

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
 *  the instance's path (e.g. 'charges' or 'customers')
 * @param [spec.fullPath=''] Fully qualified path to the method (eg. /v1/a/b/c).
 *  If this is specified, path should not be specified.
 * @param [spec.urlParams=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  (preceding the also-optional callback argument
 * @param [spec.encode] Function for mutating input parameters to a method.
 *  Usefully for applying transforms to data on a per-method basis.
 * @param [spec.host] Hostname for the request.
 *
 * <!-- Public API accessible via Stripe.StripeResource.method -->
 */
function stripeMethod$2a(spec) {
    if (spec.path !== undefined && spec.fullPath !== undefined) {
        throw new Error(`Method spec specified both a 'path' (${spec.path}) and a 'fullPath' (${spec.fullPath}).`);
    }
    return function (...args) {
        const callback = typeof args[args.length - 1] == 'function' && args.pop();
        spec.urlParams = extractUrlParams(spec.fullPath || this.createResourcePathWithSymbols(spec.path || ''));
        const requestPromise = callbackifyPromiseWithTimeout(this._makeRequest(args, spec, {}), callback);
        Object.assign(requestPromise, makeAutoPaginationMethods(this, args, spec, requestPromise));
        return requestPromise;
    };
}

// Provide extension mechanism for Stripe Resource Sub-Classes
StripeResource.extend = protoExtend;
// Expose method-creator
StripeResource.method = stripeMethod$2a;
StripeResource.MAX_BUFFERED_REQUEST_METRICS = 100;
/**
 * Encapsulates request logic for a Stripe Resource
 */
function StripeResource(stripe, deprecatedUrlData) {
    this._stripe = stripe;
    if (deprecatedUrlData) {
        throw new Error('Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.');
    }
    this.basePath = makeURLInterpolator(
    // @ts-ignore changing type of basePath
    this.basePath || stripe.getApiField('basePath'));
    // @ts-ignore changing type of path
    this.resourcePath = this.path;
    // @ts-ignore changing type of path
    this.path = makeURLInterpolator(this.path);
    this.initialize(...arguments);
}
StripeResource.prototype = {
    _stripe: null,
    // @ts-ignore the type of path changes in ctor
    path: '',
    resourcePath: '',
    // Methods that don't use the API's default '/v1' path can override it with this setting.
    basePath: null,
    initialize() { },
    // Function to override the default data processor. This allows full control
    // over how a StripeResource's request data will get converted into an HTTP
    // body. This is useful for non-standard HTTP requests. The function should
    // take method name, data, and headers as arguments.
    requestDataProcessor: null,
    // Function to add a validation checks before sending the request, errors should
    // be thrown, and they will be passed to the callback/promise.
    validateRequest: null,
    createFullPath(commandPath, urlData) {
        const urlParts = [this.basePath(urlData), this.path(urlData)];
        if (typeof commandPath === 'function') {
            const computedCommandPath = commandPath(urlData);
            // If we have no actual command path, we just omit it to avoid adding a
            // trailing slash. This is important for top-level listing requests, which
            // do not have a command path.
            if (computedCommandPath) {
                urlParts.push(computedCommandPath);
            }
        }
        else {
            urlParts.push(commandPath);
        }
        return this._joinUrlParts(urlParts);
    },
    // Creates a relative resource path with symbols left in (unlike
    // createFullPath which takes some data to replace them with). For example it
    // might produce: /invoices/{id}
    createResourcePathWithSymbols(pathWithSymbols) {
        // If there is no path beyond the resource path, we want to produce just
        // /<resource path> rather than /<resource path>/.
        if (pathWithSymbols) {
            return `/${this._joinUrlParts([this.resourcePath, pathWithSymbols])}`;
        }
        else {
            return `/${this.resourcePath}`;
        }
    },
    _joinUrlParts(parts) {
        // Replace any accidentally doubled up slashes. This previously used
        // path.join, which would do this as well. Unfortunately we need to do this
        // as the functions for creating paths are technically part of the public
        // interface and so we need to preserve backwards compatibility.
        return parts.join('/').replace(/\/{2,}/g, '/');
    },
    _getRequestOpts(requestArgs, spec, overrideData) {
        var _a;
        // Extract spec values with defaults.
        const requestMethod = (spec.method || 'GET').toUpperCase();
        const usage = spec.usage || [];
        const urlParams = spec.urlParams || [];
        const encode = spec.encode || ((data) => data);
        const isUsingFullPath = !!spec.fullPath;
        const commandPath = makeURLInterpolator(isUsingFullPath ? spec.fullPath : spec.path || '');
        // When using fullPath, we ignore the resource path as it should already be
        // fully qualified.
        const path = isUsingFullPath
            ? spec.fullPath
            : this.createResourcePathWithSymbols(spec.path);
        // Don't mutate args externally.
        const args = [].slice.call(requestArgs);
        // Generate and validate url params.
        const urlData = urlParams.reduce((urlData, param) => {
            const arg = args.shift();
            if (typeof arg !== 'string') {
                throw new Error(`Stripe: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`);
            }
            urlData[param] = arg;
            return urlData;
        }, {});
        // Pull request data and options (headers, auth) from args.
        const dataFromArgs = getDataFromArgs(args);
        const data = encode(Object.assign({}, dataFromArgs, overrideData));
        const options = getOptionsFromArgs(args);
        const host = options.host || spec.host;
        const streaming = !!spec.streaming || !!options.streaming;
        // Validate that there are no more args.
        if (args.filter((x) => x != null).length) {
            throw new Error(`Stripe: Unknown arguments (${args}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${requestMethod} \`${path}\`)`);
        }
        // When using full path, we can just invoke the URL interpolator directly
        // as we don't need to use the resource to create a full path.
        const requestPath = isUsingFullPath
            ? commandPath(urlData)
            : this.createFullPath(commandPath, urlData);
        const headers = Object.assign(options.headers, spec.headers);
        if (spec.validator) {
            spec.validator(data, { headers });
        }
        const dataInQuery = spec.method === 'GET' || spec.method === 'DELETE';
        const bodyData = dataInQuery ? null : data;
        const queryData = dataInQuery ? data : {};
        return {
            requestMethod,
            requestPath,
            bodyData,
            queryData,
            authenticator: (_a = options.authenticator) !== null && _a !== void 0 ? _a : null,
            headers,
            host: host !== null && host !== void 0 ? host : null,
            streaming,
            settings: options.settings,
            usage,
        };
    },
    _makeRequest(requestArgs, spec, overrideData) {
        return new Promise((resolve, reject) => {
            var _a;
            let opts;
            try {
                opts = this._getRequestOpts(requestArgs, spec, overrideData);
            }
            catch (err) {
                reject(err);
                return;
            }
            function requestCallback(err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(spec.transformResponseData
                        ? spec.transformResponseData(response)
                        : response);
                }
            }
            const emptyQuery = Object.keys(opts.queryData).length === 0;
            const path = [
                opts.requestPath,
                emptyQuery ? '' : '?',
                queryStringifyRequestData(opts.queryData),
            ].join('');
            const { headers, settings } = opts;
            this._stripe._requestSender._request(opts.requestMethod, opts.host, path, opts.bodyData, opts.authenticator, {
                headers,
                settings,
                streaming: opts.streaming,
            }, opts.usage, requestCallback, (_a = this.requestDataProcessor) === null || _a === void 0 ? void 0 : _a.bind(this));
        });
    },
};

/**
 * The StripeContext class provides an immutable container and convenience methods for interacting with the `Stripe-Context` header. All methods return a new instance of StripeContext.
 * You can use it whenever you're initializing a `Stripe` instance or sending `stripeContext` with a request. It's also found in the `EventNotification.context` property.
 */
class StripeContext {
    /**
     * Creates a new StripeContext with the given segments.
     */
    constructor(segments = []) {
        this._segments = [...segments];
    }
    /**
     * Gets a copy of the segments of this Context.
     */
    get segments() {
        return [...this._segments];
    }
    /**
     * Creates a new StripeContext with an additional segment appended.
     */
    push(segment) {
        if (!segment) {
            throw new Error('Segment cannot be null or undefined');
        }
        return new StripeContext([...this._segments, segment]);
    }
    /**
     * Creates a new StripeContext with the last segment removed.
     * If there are no segments, throws an error.
     */
    pop() {
        if (this._segments.length === 0) {
            throw new Error('Cannot pop from an empty context');
        }
        return new StripeContext(this._segments.slice(0, -1));
    }
    /**
     * Converts this context to its string representation.
     */
    toString() {
        return this._segments.join('/');
    }
    /**
     * Parses a context string into a StripeContext instance.
     */
    static parse(contextStr) {
        if (!contextStr) {
            return new StripeContext([]);
        }
        return new StripeContext(contextStr.split('/'));
    }
}

function createWebhooks(platformFunctions) {
    const Webhook = {
        DEFAULT_TOLERANCE: 300,
        signature: null,
        constructEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
            try {
                if (!this.signature) {
                    throw new Error('ERR: missing signature helper, unable to verify');
                }
                this.signature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
            }
            catch (e) {
                if (e instanceof CryptoProviderOnlySupportsAsyncError) {
                    e.message +=
                        '\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`';
                }
                throw e;
            }
            const jsonPayload = payload instanceof Uint8Array
                ? JSON.parse(new TextDecoder('utf8').decode(payload))
                : JSON.parse(payload);
            return jsonPayload;
        },
        async constructEventAsync(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
            if (!this.signature) {
                throw new Error('ERR: missing signature helper, unable to verify');
            }
            await this.signature.verifyHeaderAsync(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
            const jsonPayload = payload instanceof Uint8Array
                ? JSON.parse(new TextDecoder('utf8').decode(payload))
                : JSON.parse(payload);
            return jsonPayload;
        },
        /**
         * Generates a header to be used for webhook mocking
         *
         * @typedef {object} opts
         * @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
         * @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
         * @property {string} secret - Stripe webhook secret 'whsec_...'
         * @property {string} scheme - Version of API to hit. Defaults to 'v1'.
         * @property {string} signature - Computed webhook signature
         * @property {CryptoProvider} cryptoProvider - Crypto provider to use for computing the signature if none was provided. Defaults to NodeCryptoProvider.
         */
        generateTestHeaderString: function (opts) {
            const preparedOpts = prepareOptions(opts);
            const signature = preparedOpts.signature ||
                preparedOpts.cryptoProvider.computeHMACSignature(preparedOpts.payloadString, preparedOpts.secret);
            return preparedOpts.generateHeaderString(signature);
        },
        generateTestHeaderStringAsync: async function (opts) {
            const preparedOpts = prepareOptions(opts);
            const signature = preparedOpts.signature ||
                (await preparedOpts.cryptoProvider.computeHMACSignatureAsync(preparedOpts.payloadString, preparedOpts.secret));
            return preparedOpts.generateHeaderString(signature);
        },
    };
    const signature = {
        EXPECTED_SCHEME: 'v1',
        verifyHeader(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
            const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType, } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
            const secretContainsWhitespace = /\s/.test(secret);
            cryptoProvider = cryptoProvider || getCryptoProvider();
            const expectedSignature = cryptoProvider.computeHMACSignature(makeHMACContent(payload, details), secret);
            validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
            return true;
        },
        async verifyHeaderAsync(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
            const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType, } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
            const secretContainsWhitespace = /\s/.test(secret);
            cryptoProvider = cryptoProvider || getCryptoProvider();
            const expectedSignature = await cryptoProvider.computeHMACSignatureAsync(makeHMACContent(payload, details), secret);
            return validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
        },
    };
    function makeHMACContent(payload, details) {
        return `${details.timestamp}.${payload}`;
    }
    function parseEventDetails(encodedPayload, encodedHeader, expectedScheme) {
        if (!encodedPayload) {
            throw new StripeSignatureVerificationError(encodedHeader, encodedPayload, {
                message: 'No webhook payload was provided.',
            });
        }
        const suspectPayloadType = typeof encodedPayload != 'string' &&
            !(encodedPayload instanceof Uint8Array);
        const textDecoder = new TextDecoder('utf8');
        const decodedPayload = encodedPayload instanceof Uint8Array
            ? textDecoder.decode(encodedPayload)
            : encodedPayload;
        // Express's type for `Request#headers` is `string | []string`
        // which is because the `set-cookie` header is an array,
        // but no other headers are an array (docs: https://nodejs.org/api/http.html#http_message_headers)
        // (Express's Request class is an extension of http.IncomingMessage, and doesn't appear to be relevantly modified: https://github.com/expressjs/express/blob/master/lib/request.js#L31)
        if (Array.isArray(encodedHeader)) {
            throw new Error('Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.');
        }
        if (encodedHeader == null || encodedHeader == '') {
            throw new StripeSignatureVerificationError(encodedHeader, encodedPayload, {
                message: 'No stripe-signature header value was provided.',
            });
        }
        const decodedHeader = encodedHeader instanceof Uint8Array
            ? textDecoder.decode(encodedHeader)
            : encodedHeader;
        const details = parseHeader(decodedHeader, expectedScheme);
        if (!details || details.timestamp === -1) {
            throw new StripeSignatureVerificationError(decodedHeader, decodedPayload, {
                message: 'Unable to extract timestamp and signatures from header',
            });
        }
        if (!details.signatures.length) {
            throw new StripeSignatureVerificationError(decodedHeader, decodedPayload, {
                message: 'No signatures found with expected scheme',
            });
        }
        return {
            decodedPayload,
            decodedHeader,
            details,
            suspectPayloadType,
        };
    }
    function validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt) {
        const signatureFound = !!details.signatures.filter(platformFunctions.secureCompare.bind(platformFunctions, expectedSignature)).length;
        const docsLocation = '\nLearn more about webhook signing and explore webhook integration examples for various frameworks at ' +
            'https://docs.stripe.com/webhooks/signature';
        const whitespaceMessage = secretContainsWhitespace
            ? '\n\nNote: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value'
            : '';
        if (!signatureFound) {
            if (suspectPayloadType) {
                throw new StripeSignatureVerificationError(header, payload, {
                    message: 'Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.' +
                        'Payload was provided as a parsed JavaScript object instead. \n' +
                        'Signature verification is impossible without access to the original signed material. \n' +
                        docsLocation +
                        '\n' +
                        whitespaceMessage,
                });
            }
            throw new StripeSignatureVerificationError(header, payload, {
                message: 'No signatures found matching the expected signature for payload.' +
                    ' Are you passing the raw request body you received from Stripe? \n' +
                    ' If a webhook request is being forwarded by a third-party tool,' +
                    ' ensure that the exact request body, including JSON formatting and new line style, is preserved.\n' +
                    docsLocation +
                    '\n' +
                    whitespaceMessage,
            });
        }
        const timestampAge = Math.floor((typeof receivedAt === 'number' ? receivedAt : Date.now()) / 1000) - details.timestamp;
        if (tolerance > 0 && timestampAge > tolerance) {
            throw new StripeSignatureVerificationError(header, payload, {
                message: 'Timestamp outside the tolerance zone',
            });
        }
        return true;
    }
    function parseHeader(header, scheme) {
        if (typeof header !== 'string') {
            return null;
        }
        return header.split(',').reduce((accum, item) => {
            const kv = item.split('=');
            if (kv[0] === 't') {
                accum.timestamp = parseInt(kv[1], 10);
            }
            if (kv[0] === scheme) {
                accum.signatures.push(kv[1]);
            }
            return accum;
        }, {
            timestamp: -1,
            signatures: [],
        });
    }
    let webhooksCryptoProviderInstance = null;
    /**
     * Lazily instantiate a CryptoProvider instance. This is a stateless object
     * so a singleton can be used here.
     */
    function getCryptoProvider() {
        if (!webhooksCryptoProviderInstance) {
            webhooksCryptoProviderInstance = platformFunctions.createDefaultCryptoProvider();
        }
        return webhooksCryptoProviderInstance;
    }
    function prepareOptions(opts) {
        if (!opts) {
            throw new StripeError({
                message: 'Options are required',
            });
        }
        const timestamp = Math.floor(opts.timestamp) || Math.floor(Date.now() / 1000);
        const scheme = opts.scheme || signature.EXPECTED_SCHEME;
        const cryptoProvider = opts.cryptoProvider || getCryptoProvider();
        const payloadString = `${timestamp}.${opts.payload}`;
        const generateHeaderString = (signature) => {
            return `t=${timestamp},${scheme}=${signature}`;
        };
        return Object.assign(Object.assign({}, opts), { timestamp,
            scheme,
            cryptoProvider,
            payloadString,
            generateHeaderString });
    }
    Webhook.signature = signature;
    return Webhook;
}

// File generated from our OpenAPI spec
const ApiVersion = '2026-02-25.clover';

// ResourceNamespace allows you to create nested resources, i.e. `stripe.issuing.cards`.
// It also works recursively, so you could do i.e. `stripe.billing.invoicing.pay`.
function ResourceNamespace(stripe, resources) {
    for (const name in resources) {
        if (!Object.prototype.hasOwnProperty.call(resources, name)) {
            continue;
        }
        const camelCaseName = name[0].toLowerCase() + name.substring(1);
        const resource = new resources[name](stripe);
        this[camelCaseName] = resource;
    }
}
function resourceNamespace(namespace, resources) {
    return function (stripe) {
        return new ResourceNamespace(stripe, resources);
    };
}

// File generated from our OpenAPI spec
const stripeMethod$29 = StripeResource.method;
const AccountLinks$1 = StripeResource.extend({
    create: stripeMethod$29({ method: 'POST', fullPath: '/v2/core/account_links' }),
});

// File generated from our OpenAPI spec
const stripeMethod$28 = StripeResource.method;
const AccountTokens = StripeResource.extend({
    create: stripeMethod$28({ method: 'POST', fullPath: '/v2/core/account_tokens' }),
    retrieve: stripeMethod$28({
        method: 'GET',
        fullPath: '/v2/core/account_tokens/{id}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$27 = StripeResource.method;
const Accounts$2 = StripeResource.extend({
    retrieve: stripeMethod$27({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts/{account}',
    }),
    list: stripeMethod$27({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts',
        methodType: 'list',
    }),
    disconnect: stripeMethod$27({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/disconnect',
    }),
    listOwners: stripeMethod$27({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts/{account}/owners',
        methodType: 'list',
    }),
    refresh: stripeMethod$27({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/refresh',
    }),
    subscribe: stripeMethod$27({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/subscribe',
    }),
    unsubscribe: stripeMethod$27({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/unsubscribe',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$26 = StripeResource.method;
const Persons = StripeResource.extend({
    create: stripeMethod$26({
        method: 'POST',
        fullPath: '/v2/core/accounts/{account_id}/persons',
    }),
    retrieve: stripeMethod$26({
        method: 'GET',
        fullPath: '/v2/core/accounts/{account_id}/persons/{id}',
    }),
    update: stripeMethod$26({
        method: 'POST',
        fullPath: '/v2/core/accounts/{account_id}/persons/{id}',
    }),
    list: stripeMethod$26({
        method: 'GET',
        fullPath: '/v2/core/accounts/{account_id}/persons',
        methodType: 'list',
    }),
    del: stripeMethod$26({
        method: 'DELETE',
        fullPath: '/v2/core/accounts/{account_id}/persons/{id}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$25 = StripeResource.method;
const PersonTokens = StripeResource.extend({
    create: stripeMethod$25({
        method: 'POST',
        fullPath: '/v2/core/accounts/{account_id}/person_tokens',
    }),
    retrieve: stripeMethod$25({
        method: 'GET',
        fullPath: '/v2/core/accounts/{account_id}/person_tokens/{id}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$24 = StripeResource.method;
const Accounts$1 = StripeResource.extend({
    constructor: function (...args) {
        StripeResource.apply(this, args);
        this.persons = new Persons(...args);
        this.personTokens = new PersonTokens(...args);
    },
    create: stripeMethod$24({ method: 'POST', fullPath: '/v2/core/accounts' }),
    retrieve: stripeMethod$24({ method: 'GET', fullPath: '/v2/core/accounts/{id}' }),
    update: stripeMethod$24({ method: 'POST', fullPath: '/v2/core/accounts/{id}' }),
    list: stripeMethod$24({
        method: 'GET',
        fullPath: '/v2/core/accounts',
        methodType: 'list',
    }),
    close: stripeMethod$24({
        method: 'POST',
        fullPath: '/v2/core/accounts/{id}/close',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$23 = StripeResource.method;
const ActiveEntitlements = StripeResource.extend({
    retrieve: stripeMethod$23({
        method: 'GET',
        fullPath: '/v1/entitlements/active_entitlements/{id}',
    }),
    list: stripeMethod$23({
        method: 'GET',
        fullPath: '/v1/entitlements/active_entitlements',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$22 = StripeResource.method;
const Alerts = StripeResource.extend({
    create: stripeMethod$22({ method: 'POST', fullPath: '/v1/billing/alerts' }),
    retrieve: stripeMethod$22({ method: 'GET', fullPath: '/v1/billing/alerts/{id}' }),
    list: stripeMethod$22({
        method: 'GET',
        fullPath: '/v1/billing/alerts',
        methodType: 'list',
    }),
    activate: stripeMethod$22({
        method: 'POST',
        fullPath: '/v1/billing/alerts/{id}/activate',
    }),
    archive: stripeMethod$22({
        method: 'POST',
        fullPath: '/v1/billing/alerts/{id}/archive',
    }),
    deactivate: stripeMethod$22({
        method: 'POST',
        fullPath: '/v1/billing/alerts/{id}/deactivate',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$21 = StripeResource.method;
const Associations = StripeResource.extend({
    find: stripeMethod$21({ method: 'GET', fullPath: '/v1/tax/associations/find' }),
});

// File generated from our OpenAPI spec
const stripeMethod$20 = StripeResource.method;
const Authorizations$1 = StripeResource.extend({
    retrieve: stripeMethod$20({
        method: 'GET',
        fullPath: '/v1/issuing/authorizations/{authorization}',
    }),
    update: stripeMethod$20({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}',
    }),
    list: stripeMethod$20({
        method: 'GET',
        fullPath: '/v1/issuing/authorizations',
        methodType: 'list',
    }),
    approve: stripeMethod$20({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}/approve',
    }),
    decline: stripeMethod$20({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}/decline',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1$ = StripeResource.method;
const Authorizations = StripeResource.extend({
    create: stripeMethod$1$({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations',
    }),
    capture: stripeMethod$1$({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/capture',
    }),
    expire: stripeMethod$1$({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/expire',
    }),
    finalizeAmount: stripeMethod$1$({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount',
    }),
    increment: stripeMethod$1$({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/increment',
    }),
    respond: stripeMethod$1$({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond',
    }),
    reverse: stripeMethod$1$({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/reverse',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1_ = StripeResource.method;
const Calculations = StripeResource.extend({
    create: stripeMethod$1_({ method: 'POST', fullPath: '/v1/tax/calculations' }),
    retrieve: stripeMethod$1_({
        method: 'GET',
        fullPath: '/v1/tax/calculations/{calculation}',
    }),
    listLineItems: stripeMethod$1_({
        method: 'GET',
        fullPath: '/v1/tax/calculations/{calculation}/line_items',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1Z = StripeResource.method;
const Cardholders = StripeResource.extend({
    create: stripeMethod$1Z({ method: 'POST', fullPath: '/v1/issuing/cardholders' }),
    retrieve: stripeMethod$1Z({
        method: 'GET',
        fullPath: '/v1/issuing/cardholders/{cardholder}',
    }),
    update: stripeMethod$1Z({
        method: 'POST',
        fullPath: '/v1/issuing/cardholders/{cardholder}',
    }),
    list: stripeMethod$1Z({
        method: 'GET',
        fullPath: '/v1/issuing/cardholders',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1Y = StripeResource.method;
const Cards$1 = StripeResource.extend({
    create: stripeMethod$1Y({ method: 'POST', fullPath: '/v1/issuing/cards' }),
    retrieve: stripeMethod$1Y({ method: 'GET', fullPath: '/v1/issuing/cards/{card}' }),
    update: stripeMethod$1Y({ method: 'POST', fullPath: '/v1/issuing/cards/{card}' }),
    list: stripeMethod$1Y({
        method: 'GET',
        fullPath: '/v1/issuing/cards',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1X = StripeResource.method;
const Cards = StripeResource.extend({
    deliverCard: stripeMethod$1X({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/deliver',
    }),
    failCard: stripeMethod$1X({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/fail',
    }),
    returnCard: stripeMethod$1X({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/return',
    }),
    shipCard: stripeMethod$1X({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/ship',
    }),
    submitCard: stripeMethod$1X({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/submit',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1W = StripeResource.method;
const Configurations$1 = StripeResource.extend({
    create: stripeMethod$1W({
        method: 'POST',
        fullPath: '/v1/billing_portal/configurations',
    }),
    retrieve: stripeMethod$1W({
        method: 'GET',
        fullPath: '/v1/billing_portal/configurations/{configuration}',
    }),
    update: stripeMethod$1W({
        method: 'POST',
        fullPath: '/v1/billing_portal/configurations/{configuration}',
    }),
    list: stripeMethod$1W({
        method: 'GET',
        fullPath: '/v1/billing_portal/configurations',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1V = StripeResource.method;
const Configurations = StripeResource.extend({
    create: stripeMethod$1V({
        method: 'POST',
        fullPath: '/v1/terminal/configurations',
    }),
    retrieve: stripeMethod$1V({
        method: 'GET',
        fullPath: '/v1/terminal/configurations/{configuration}',
    }),
    update: stripeMethod$1V({
        method: 'POST',
        fullPath: '/v1/terminal/configurations/{configuration}',
    }),
    list: stripeMethod$1V({
        method: 'GET',
        fullPath: '/v1/terminal/configurations',
        methodType: 'list',
    }),
    del: stripeMethod$1V({
        method: 'DELETE',
        fullPath: '/v1/terminal/configurations/{configuration}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1U = StripeResource.method;
const ConfirmationTokens$1 = StripeResource.extend({
    create: stripeMethod$1U({
        method: 'POST',
        fullPath: '/v1/test_helpers/confirmation_tokens',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1T = StripeResource.method;
const ConnectionTokens = StripeResource.extend({
    create: stripeMethod$1T({
        method: 'POST',
        fullPath: '/v1/terminal/connection_tokens',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1S = StripeResource.method;
const CreditBalanceSummary = StripeResource.extend({
    retrieve: stripeMethod$1S({
        method: 'GET',
        fullPath: '/v1/billing/credit_balance_summary',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1R = StripeResource.method;
const CreditBalanceTransactions = StripeResource.extend({
    retrieve: stripeMethod$1R({
        method: 'GET',
        fullPath: '/v1/billing/credit_balance_transactions/{id}',
    }),
    list: stripeMethod$1R({
        method: 'GET',
        fullPath: '/v1/billing/credit_balance_transactions',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1Q = StripeResource.method;
const CreditGrants = StripeResource.extend({
    create: stripeMethod$1Q({ method: 'POST', fullPath: '/v1/billing/credit_grants' }),
    retrieve: stripeMethod$1Q({
        method: 'GET',
        fullPath: '/v1/billing/credit_grants/{id}',
    }),
    update: stripeMethod$1Q({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}',
    }),
    list: stripeMethod$1Q({
        method: 'GET',
        fullPath: '/v1/billing/credit_grants',
        methodType: 'list',
    }),
    expire: stripeMethod$1Q({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}/expire',
    }),
    voidGrant: stripeMethod$1Q({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}/void',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1P = StripeResource.method;
const CreditReversals = StripeResource.extend({
    create: stripeMethod$1P({
        method: 'POST',
        fullPath: '/v1/treasury/credit_reversals',
    }),
    retrieve: stripeMethod$1P({
        method: 'GET',
        fullPath: '/v1/treasury/credit_reversals/{credit_reversal}',
    }),
    list: stripeMethod$1P({
        method: 'GET',
        fullPath: '/v1/treasury/credit_reversals',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1O = StripeResource.method;
const Customers$1 = StripeResource.extend({
    fundCashBalance: stripeMethod$1O({
        method: 'POST',
        fullPath: '/v1/test_helpers/customers/{customer}/fund_cash_balance',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1N = StripeResource.method;
const DebitReversals = StripeResource.extend({
    create: stripeMethod$1N({
        method: 'POST',
        fullPath: '/v1/treasury/debit_reversals',
    }),
    retrieve: stripeMethod$1N({
        method: 'GET',
        fullPath: '/v1/treasury/debit_reversals/{debit_reversal}',
    }),
    list: stripeMethod$1N({
        method: 'GET',
        fullPath: '/v1/treasury/debit_reversals',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1M = StripeResource.method;
const Disputes$1 = StripeResource.extend({
    create: stripeMethod$1M({ method: 'POST', fullPath: '/v1/issuing/disputes' }),
    retrieve: stripeMethod$1M({
        method: 'GET',
        fullPath: '/v1/issuing/disputes/{dispute}',
    }),
    update: stripeMethod$1M({
        method: 'POST',
        fullPath: '/v1/issuing/disputes/{dispute}',
    }),
    list: stripeMethod$1M({
        method: 'GET',
        fullPath: '/v1/issuing/disputes',
        methodType: 'list',
    }),
    submit: stripeMethod$1M({
        method: 'POST',
        fullPath: '/v1/issuing/disputes/{dispute}/submit',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1L = StripeResource.method;
const EarlyFraudWarnings = StripeResource.extend({
    retrieve: stripeMethod$1L({
        method: 'GET',
        fullPath: '/v1/radar/early_fraud_warnings/{early_fraud_warning}',
    }),
    list: stripeMethod$1L({
        method: 'GET',
        fullPath: '/v1/radar/early_fraud_warnings',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1K = StripeResource.method;
const EventDestinations = StripeResource.extend({
    create: stripeMethod$1K({
        method: 'POST',
        fullPath: '/v2/core/event_destinations',
    }),
    retrieve: stripeMethod$1K({
        method: 'GET',
        fullPath: '/v2/core/event_destinations/{id}',
    }),
    update: stripeMethod$1K({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}',
    }),
    list: stripeMethod$1K({
        method: 'GET',
        fullPath: '/v2/core/event_destinations',
        methodType: 'list',
    }),
    del: stripeMethod$1K({
        method: 'DELETE',
        fullPath: '/v2/core/event_destinations/{id}',
    }),
    disable: stripeMethod$1K({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/disable',
    }),
    enable: stripeMethod$1K({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/enable',
    }),
    ping: stripeMethod$1K({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/ping',
    }),
});

// This file is manually maintained
const stripeMethod$1J = StripeResource.method;
const Events$1 = StripeResource.extend({
    retrieve(...args) {
        const transformResponseData = (response) => {
            return this.addFetchRelatedObjectIfNeeded(response);
        };
        return stripeMethod$1J({
            method: 'GET',
            fullPath: '/v2/core/events/{id}',
            transformResponseData,
        }).apply(this, args);
    },
    list(...args) {
        const transformResponseData = (response) => {
            return Object.assign(Object.assign({}, response), { data: response.data.map(this.addFetchRelatedObjectIfNeeded.bind(this)) });
        };
        return stripeMethod$1J({
            method: 'GET',
            fullPath: '/v2/core/events',
            methodType: 'list',
            transformResponseData,
        }).apply(this, args);
    },
    /**
     * @private
     *
     * For internal use in stripe-node.
     *
     * @param pulledEvent The retrieved event object
     * @returns The retrieved event object with a fetchRelatedObject method,
     * if pulledEvent.related_object is valid (non-null and has a url)
     */
    addFetchRelatedObjectIfNeeded(pulledEvent) {
        if (!pulledEvent.related_object || !pulledEvent.related_object.url) {
            return pulledEvent;
        }
        return Object.assign(Object.assign({}, pulledEvent), { fetchRelatedObject: () => 
            // call stripeMethod with 'this' resource to fetch
            // the related object. 'this' is needed to construct
            // and send the request, but the method spec controls
            // the url endpoint and method, so it doesn't matter
            // that 'this' is an Events resource object here
            stripeMethod$1J({
                method: 'GET',
                fullPath: pulledEvent.related_object.url,
            }).apply(this, [
                {
                    stripeContext: pulledEvent.context,
                },
            ]) });
    },
});

// File generated from our OpenAPI spec
const stripeMethod$1I = StripeResource.method;
const Features = StripeResource.extend({
    create: stripeMethod$1I({ method: 'POST', fullPath: '/v1/entitlements/features' }),
    retrieve: stripeMethod$1I({
        method: 'GET',
        fullPath: '/v1/entitlements/features/{id}',
    }),
    update: stripeMethod$1I({
        method: 'POST',
        fullPath: '/v1/entitlements/features/{id}',
    }),
    list: stripeMethod$1I({
        method: 'GET',
        fullPath: '/v1/entitlements/features',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1H = StripeResource.method;
const FinancialAccounts = StripeResource.extend({
    create: stripeMethod$1H({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts',
    }),
    retrieve: stripeMethod$1H({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}',
    }),
    update: stripeMethod$1H({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}',
    }),
    list: stripeMethod$1H({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts',
        methodType: 'list',
    }),
    close: stripeMethod$1H({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}/close',
    }),
    retrieveFeatures: stripeMethod$1H({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}/features',
    }),
    updateFeatures: stripeMethod$1H({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}/features',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1G = StripeResource.method;
const InboundTransfers$1 = StripeResource.extend({
    fail: stripeMethod$1G({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/fail',
    }),
    returnInboundTransfer: stripeMethod$1G({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/return',
    }),
    succeed: stripeMethod$1G({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/succeed',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1F = StripeResource.method;
const InboundTransfers = StripeResource.extend({
    create: stripeMethod$1F({
        method: 'POST',
        fullPath: '/v1/treasury/inbound_transfers',
    }),
    retrieve: stripeMethod$1F({
        method: 'GET',
        fullPath: '/v1/treasury/inbound_transfers/{id}',
    }),
    list: stripeMethod$1F({
        method: 'GET',
        fullPath: '/v1/treasury/inbound_transfers',
        methodType: 'list',
    }),
    cancel: stripeMethod$1F({
        method: 'POST',
        fullPath: '/v1/treasury/inbound_transfers/{inbound_transfer}/cancel',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1E = StripeResource.method;
const Locations = StripeResource.extend({
    create: stripeMethod$1E({ method: 'POST', fullPath: '/v1/terminal/locations' }),
    retrieve: stripeMethod$1E({
        method: 'GET',
        fullPath: '/v1/terminal/locations/{location}',
    }),
    update: stripeMethod$1E({
        method: 'POST',
        fullPath: '/v1/terminal/locations/{location}',
    }),
    list: stripeMethod$1E({
        method: 'GET',
        fullPath: '/v1/terminal/locations',
        methodType: 'list',
    }),
    del: stripeMethod$1E({
        method: 'DELETE',
        fullPath: '/v1/terminal/locations/{location}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1D = StripeResource.method;
const MeterEventAdjustments$1 = StripeResource.extend({
    create: stripeMethod$1D({
        method: 'POST',
        fullPath: '/v1/billing/meter_event_adjustments',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1C = StripeResource.method;
const MeterEventAdjustments = StripeResource.extend({
    create: stripeMethod$1C({
        method: 'POST',
        fullPath: '/v2/billing/meter_event_adjustments',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1B = StripeResource.method;
const MeterEventSession = StripeResource.extend({
    create: stripeMethod$1B({
        method: 'POST',
        fullPath: '/v2/billing/meter_event_session',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1A = StripeResource.method;
const MeterEventStream = StripeResource.extend({
    create: stripeMethod$1A({
        method: 'POST',
        fullPath: '/v2/billing/meter_event_stream',
        host: 'meter-events.stripe.com',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1z = StripeResource.method;
const MeterEvents$1 = StripeResource.extend({
    create: stripeMethod$1z({ method: 'POST', fullPath: '/v1/billing/meter_events' }),
});

// File generated from our OpenAPI spec
const stripeMethod$1y = StripeResource.method;
const MeterEvents = StripeResource.extend({
    create: stripeMethod$1y({ method: 'POST', fullPath: '/v2/billing/meter_events' }),
});

// File generated from our OpenAPI spec
const stripeMethod$1x = StripeResource.method;
const Meters = StripeResource.extend({
    create: stripeMethod$1x({ method: 'POST', fullPath: '/v1/billing/meters' }),
    retrieve: stripeMethod$1x({ method: 'GET', fullPath: '/v1/billing/meters/{id}' }),
    update: stripeMethod$1x({ method: 'POST', fullPath: '/v1/billing/meters/{id}' }),
    list: stripeMethod$1x({
        method: 'GET',
        fullPath: '/v1/billing/meters',
        methodType: 'list',
    }),
    deactivate: stripeMethod$1x({
        method: 'POST',
        fullPath: '/v1/billing/meters/{id}/deactivate',
    }),
    listEventSummaries: stripeMethod$1x({
        method: 'GET',
        fullPath: '/v1/billing/meters/{id}/event_summaries',
        methodType: 'list',
    }),
    reactivate: stripeMethod$1x({
        method: 'POST',
        fullPath: '/v1/billing/meters/{id}/reactivate',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1w = StripeResource.method;
const OnboardingLinks = StripeResource.extend({
    create: stripeMethod$1w({
        method: 'POST',
        fullPath: '/v1/terminal/onboarding_links',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1v = StripeResource.method;
const Orders = StripeResource.extend({
    create: stripeMethod$1v({ method: 'POST', fullPath: '/v1/climate/orders' }),
    retrieve: stripeMethod$1v({
        method: 'GET',
        fullPath: '/v1/climate/orders/{order}',
    }),
    update: stripeMethod$1v({
        method: 'POST',
        fullPath: '/v1/climate/orders/{order}',
    }),
    list: stripeMethod$1v({
        method: 'GET',
        fullPath: '/v1/climate/orders',
        methodType: 'list',
    }),
    cancel: stripeMethod$1v({
        method: 'POST',
        fullPath: '/v1/climate/orders/{order}/cancel',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1u = StripeResource.method;
const OutboundPayments$1 = StripeResource.extend({
    update: stripeMethod$1u({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}',
    }),
    fail: stripeMethod$1u({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/fail',
    }),
    post: stripeMethod$1u({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/post',
    }),
    returnOutboundPayment: stripeMethod$1u({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/return',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1t = StripeResource.method;
const OutboundPayments = StripeResource.extend({
    create: stripeMethod$1t({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_payments',
    }),
    retrieve: stripeMethod$1t({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_payments/{id}',
    }),
    list: stripeMethod$1t({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_payments',
        methodType: 'list',
    }),
    cancel: stripeMethod$1t({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_payments/{id}/cancel',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1s = StripeResource.method;
const OutboundTransfers$1 = StripeResource.extend({
    update: stripeMethod$1s({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}',
    }),
    fail: stripeMethod$1s({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail',
    }),
    post: stripeMethod$1s({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post',
    }),
    returnOutboundTransfer: stripeMethod$1s({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1r = StripeResource.method;
const OutboundTransfers = StripeResource.extend({
    create: stripeMethod$1r({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_transfers',
    }),
    retrieve: stripeMethod$1r({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_transfers/{outbound_transfer}',
    }),
    list: stripeMethod$1r({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_transfers',
        methodType: 'list',
    }),
    cancel: stripeMethod$1r({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_transfers/{outbound_transfer}/cancel',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1q = StripeResource.method;
const PaymentEvaluations = StripeResource.extend({
    create: stripeMethod$1q({
        method: 'POST',
        fullPath: '/v1/radar/payment_evaluations',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1p = StripeResource.method;
const PersonalizationDesigns$1 = StripeResource.extend({
    create: stripeMethod$1p({
        method: 'POST',
        fullPath: '/v1/issuing/personalization_designs',
    }),
    retrieve: stripeMethod$1p({
        method: 'GET',
        fullPath: '/v1/issuing/personalization_designs/{personalization_design}',
    }),
    update: stripeMethod$1p({
        method: 'POST',
        fullPath: '/v1/issuing/personalization_designs/{personalization_design}',
    }),
    list: stripeMethod$1p({
        method: 'GET',
        fullPath: '/v1/issuing/personalization_designs',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1o = StripeResource.method;
const PersonalizationDesigns = StripeResource.extend({
    activate: stripeMethod$1o({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate',
    }),
    deactivate: stripeMethod$1o({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate',
    }),
    reject: stripeMethod$1o({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1n = StripeResource.method;
const PhysicalBundles = StripeResource.extend({
    retrieve: stripeMethod$1n({
        method: 'GET',
        fullPath: '/v1/issuing/physical_bundles/{physical_bundle}',
    }),
    list: stripeMethod$1n({
        method: 'GET',
        fullPath: '/v1/issuing/physical_bundles',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1m = StripeResource.method;
const Products$1 = StripeResource.extend({
    retrieve: stripeMethod$1m({
        method: 'GET',
        fullPath: '/v1/climate/products/{product}',
    }),
    list: stripeMethod$1m({
        method: 'GET',
        fullPath: '/v1/climate/products',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1l = StripeResource.method;
const Readers$1 = StripeResource.extend({
    create: stripeMethod$1l({ method: 'POST', fullPath: '/v1/terminal/readers' }),
    retrieve: stripeMethod$1l({
        method: 'GET',
        fullPath: '/v1/terminal/readers/{reader}',
    }),
    update: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}',
    }),
    list: stripeMethod$1l({
        method: 'GET',
        fullPath: '/v1/terminal/readers',
        methodType: 'list',
    }),
    del: stripeMethod$1l({
        method: 'DELETE',
        fullPath: '/v1/terminal/readers/{reader}',
    }),
    cancelAction: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/cancel_action',
    }),
    collectInputs: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/collect_inputs',
    }),
    collectPaymentMethod: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/collect_payment_method',
    }),
    confirmPaymentIntent: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/confirm_payment_intent',
    }),
    processPaymentIntent: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/process_payment_intent',
    }),
    processSetupIntent: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/process_setup_intent',
    }),
    refundPayment: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/refund_payment',
    }),
    setReaderDisplay: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/set_reader_display',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1k = StripeResource.method;
const Readers = StripeResource.extend({
    presentPaymentMethod: stripeMethod$1k({
        method: 'POST',
        fullPath: '/v1/test_helpers/terminal/readers/{reader}/present_payment_method',
    }),
    succeedInputCollection: stripeMethod$1k({
        method: 'POST',
        fullPath: '/v1/test_helpers/terminal/readers/{reader}/succeed_input_collection',
    }),
    timeoutInputCollection: stripeMethod$1k({
        method: 'POST',
        fullPath: '/v1/test_helpers/terminal/readers/{reader}/timeout_input_collection',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1j = StripeResource.method;
const ReceivedCredits$1 = StripeResource.extend({
    create: stripeMethod$1j({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/received_credits',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1i = StripeResource.method;
const ReceivedCredits = StripeResource.extend({
    retrieve: stripeMethod$1i({
        method: 'GET',
        fullPath: '/v1/treasury/received_credits/{id}',
    }),
    list: stripeMethod$1i({
        method: 'GET',
        fullPath: '/v1/treasury/received_credits',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1h = StripeResource.method;
const ReceivedDebits$1 = StripeResource.extend({
    create: stripeMethod$1h({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/received_debits',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1g = StripeResource.method;
const ReceivedDebits = StripeResource.extend({
    retrieve: stripeMethod$1g({
        method: 'GET',
        fullPath: '/v1/treasury/received_debits/{id}',
    }),
    list: stripeMethod$1g({
        method: 'GET',
        fullPath: '/v1/treasury/received_debits',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1f = StripeResource.method;
const Refunds$1 = StripeResource.extend({
    expire: stripeMethod$1f({
        method: 'POST',
        fullPath: '/v1/test_helpers/refunds/{refund}/expire',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1e = StripeResource.method;
const Registrations = StripeResource.extend({
    create: stripeMethod$1e({ method: 'POST', fullPath: '/v1/tax/registrations' }),
    retrieve: stripeMethod$1e({
        method: 'GET',
        fullPath: '/v1/tax/registrations/{id}',
    }),
    update: stripeMethod$1e({
        method: 'POST',
        fullPath: '/v1/tax/registrations/{id}',
    }),
    list: stripeMethod$1e({
        method: 'GET',
        fullPath: '/v1/tax/registrations',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1d = StripeResource.method;
const ReportRuns = StripeResource.extend({
    create: stripeMethod$1d({ method: 'POST', fullPath: '/v1/reporting/report_runs' }),
    retrieve: stripeMethod$1d({
        method: 'GET',
        fullPath: '/v1/reporting/report_runs/{report_run}',
    }),
    list: stripeMethod$1d({
        method: 'GET',
        fullPath: '/v1/reporting/report_runs',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1c = StripeResource.method;
const ReportTypes = StripeResource.extend({
    retrieve: stripeMethod$1c({
        method: 'GET',
        fullPath: '/v1/reporting/report_types/{report_type}',
    }),
    list: stripeMethod$1c({
        method: 'GET',
        fullPath: '/v1/reporting/report_types',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1b = StripeResource.method;
const Requests = StripeResource.extend({
    create: stripeMethod$1b({ method: 'POST', fullPath: '/v1/forwarding/requests' }),
    retrieve: stripeMethod$1b({
        method: 'GET',
        fullPath: '/v1/forwarding/requests/{id}',
    }),
    list: stripeMethod$1b({
        method: 'GET',
        fullPath: '/v1/forwarding/requests',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$1a = StripeResource.method;
const ScheduledQueryRuns = StripeResource.extend({
    retrieve: stripeMethod$1a({
        method: 'GET',
        fullPath: '/v1/sigma/scheduled_query_runs/{scheduled_query_run}',
    }),
    list: stripeMethod$1a({
        method: 'GET',
        fullPath: '/v1/sigma/scheduled_query_runs',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$19 = StripeResource.method;
const Secrets = StripeResource.extend({
    create: stripeMethod$19({ method: 'POST', fullPath: '/v1/apps/secrets' }),
    list: stripeMethod$19({
        method: 'GET',
        fullPath: '/v1/apps/secrets',
        methodType: 'list',
    }),
    deleteWhere: stripeMethod$19({
        method: 'POST',
        fullPath: '/v1/apps/secrets/delete',
    }),
    find: stripeMethod$19({ method: 'GET', fullPath: '/v1/apps/secrets/find' }),
});

// File generated from our OpenAPI spec
const stripeMethod$18 = StripeResource.method;
const Sessions$2 = StripeResource.extend({
    create: stripeMethod$18({
        method: 'POST',
        fullPath: '/v1/billing_portal/sessions',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$17 = StripeResource.method;
const Sessions$1 = StripeResource.extend({
    create: stripeMethod$17({ method: 'POST', fullPath: '/v1/checkout/sessions' }),
    retrieve: stripeMethod$17({
        method: 'GET',
        fullPath: '/v1/checkout/sessions/{session}',
    }),
    update: stripeMethod$17({
        method: 'POST',
        fullPath: '/v1/checkout/sessions/{session}',
    }),
    list: stripeMethod$17({
        method: 'GET',
        fullPath: '/v1/checkout/sessions',
        methodType: 'list',
    }),
    expire: stripeMethod$17({
        method: 'POST',
        fullPath: '/v1/checkout/sessions/{session}/expire',
    }),
    listLineItems: stripeMethod$17({
        method: 'GET',
        fullPath: '/v1/checkout/sessions/{session}/line_items',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$16 = StripeResource.method;
const Sessions = StripeResource.extend({
    create: stripeMethod$16({
        method: 'POST',
        fullPath: '/v1/financial_connections/sessions',
    }),
    retrieve: stripeMethod$16({
        method: 'GET',
        fullPath: '/v1/financial_connections/sessions/{session}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$15 = StripeResource.method;
const Settings = StripeResource.extend({
    retrieve: stripeMethod$15({ method: 'GET', fullPath: '/v1/tax/settings' }),
    update: stripeMethod$15({ method: 'POST', fullPath: '/v1/tax/settings' }),
});

// File generated from our OpenAPI spec
const stripeMethod$14 = StripeResource.method;
const Suppliers = StripeResource.extend({
    retrieve: stripeMethod$14({
        method: 'GET',
        fullPath: '/v1/climate/suppliers/{supplier}',
    }),
    list: stripeMethod$14({
        method: 'GET',
        fullPath: '/v1/climate/suppliers',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$13 = StripeResource.method;
const TestClocks = StripeResource.extend({
    create: stripeMethod$13({
        method: 'POST',
        fullPath: '/v1/test_helpers/test_clocks',
    }),
    retrieve: stripeMethod$13({
        method: 'GET',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}',
    }),
    list: stripeMethod$13({
        method: 'GET',
        fullPath: '/v1/test_helpers/test_clocks',
        methodType: 'list',
    }),
    del: stripeMethod$13({
        method: 'DELETE',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}',
    }),
    advance: stripeMethod$13({
        method: 'POST',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}/advance',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$12 = StripeResource.method;
const Tokens$1 = StripeResource.extend({
    retrieve: stripeMethod$12({
        method: 'GET',
        fullPath: '/v1/issuing/tokens/{token}',
    }),
    update: stripeMethod$12({
        method: 'POST',
        fullPath: '/v1/issuing/tokens/{token}',
    }),
    list: stripeMethod$12({
        method: 'GET',
        fullPath: '/v1/issuing/tokens',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$11 = StripeResource.method;
const TransactionEntries = StripeResource.extend({
    retrieve: stripeMethod$11({
        method: 'GET',
        fullPath: '/v1/treasury/transaction_entries/{id}',
    }),
    list: stripeMethod$11({
        method: 'GET',
        fullPath: '/v1/treasury/transaction_entries',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$10 = StripeResource.method;
const Transactions$4 = StripeResource.extend({
    retrieve: stripeMethod$10({
        method: 'GET',
        fullPath: '/v1/financial_connections/transactions/{transaction}',
    }),
    list: stripeMethod$10({
        method: 'GET',
        fullPath: '/v1/financial_connections/transactions',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$$ = StripeResource.method;
const Transactions$3 = StripeResource.extend({
    retrieve: stripeMethod$$({
        method: 'GET',
        fullPath: '/v1/issuing/transactions/{transaction}',
    }),
    update: stripeMethod$$({
        method: 'POST',
        fullPath: '/v1/issuing/transactions/{transaction}',
    }),
    list: stripeMethod$$({
        method: 'GET',
        fullPath: '/v1/issuing/transactions',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$_ = StripeResource.method;
const Transactions$2 = StripeResource.extend({
    retrieve: stripeMethod$_({
        method: 'GET',
        fullPath: '/v1/tax/transactions/{transaction}',
    }),
    createFromCalculation: stripeMethod$_({
        method: 'POST',
        fullPath: '/v1/tax/transactions/create_from_calculation',
    }),
    createReversal: stripeMethod$_({
        method: 'POST',
        fullPath: '/v1/tax/transactions/create_reversal',
    }),
    listLineItems: stripeMethod$_({
        method: 'GET',
        fullPath: '/v1/tax/transactions/{transaction}/line_items',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$Z = StripeResource.method;
const Transactions$1 = StripeResource.extend({
    createForceCapture: stripeMethod$Z({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/transactions/create_force_capture',
    }),
    createUnlinkedRefund: stripeMethod$Z({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/transactions/create_unlinked_refund',
    }),
    refund: stripeMethod$Z({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/transactions/{transaction}/refund',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$Y = StripeResource.method;
const Transactions = StripeResource.extend({
    retrieve: stripeMethod$Y({
        method: 'GET',
        fullPath: '/v1/treasury/transactions/{id}',
    }),
    list: stripeMethod$Y({
        method: 'GET',
        fullPath: '/v1/treasury/transactions',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$X = StripeResource.method;
const ValueListItems = StripeResource.extend({
    create: stripeMethod$X({
        method: 'POST',
        fullPath: '/v1/radar/value_list_items',
    }),
    retrieve: stripeMethod$X({
        method: 'GET',
        fullPath: '/v1/radar/value_list_items/{item}',
    }),
    list: stripeMethod$X({
        method: 'GET',
        fullPath: '/v1/radar/value_list_items',
        methodType: 'list',
    }),
    del: stripeMethod$X({
        method: 'DELETE',
        fullPath: '/v1/radar/value_list_items/{item}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$W = StripeResource.method;
const ValueLists = StripeResource.extend({
    create: stripeMethod$W({ method: 'POST', fullPath: '/v1/radar/value_lists' }),
    retrieve: stripeMethod$W({
        method: 'GET',
        fullPath: '/v1/radar/value_lists/{value_list}',
    }),
    update: stripeMethod$W({
        method: 'POST',
        fullPath: '/v1/radar/value_lists/{value_list}',
    }),
    list: stripeMethod$W({
        method: 'GET',
        fullPath: '/v1/radar/value_lists',
        methodType: 'list',
    }),
    del: stripeMethod$W({
        method: 'DELETE',
        fullPath: '/v1/radar/value_lists/{value_list}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$V = StripeResource.method;
const VerificationReports = StripeResource.extend({
    retrieve: stripeMethod$V({
        method: 'GET',
        fullPath: '/v1/identity/verification_reports/{report}',
    }),
    list: stripeMethod$V({
        method: 'GET',
        fullPath: '/v1/identity/verification_reports',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$U = StripeResource.method;
const VerificationSessions = StripeResource.extend({
    create: stripeMethod$U({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions',
    }),
    retrieve: stripeMethod$U({
        method: 'GET',
        fullPath: '/v1/identity/verification_sessions/{session}',
    }),
    update: stripeMethod$U({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}',
    }),
    list: stripeMethod$U({
        method: 'GET',
        fullPath: '/v1/identity/verification_sessions',
        methodType: 'list',
    }),
    cancel: stripeMethod$U({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}/cancel',
    }),
    redact: stripeMethod$U({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}/redact',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$T = StripeResource.method;
// Since path can either be `account` or `accounts`, support both through stripeMethod path
const Accounts = StripeResource.extend({
    create: stripeMethod$T({ method: 'POST', fullPath: '/v1/accounts' }),
    retrieve(id, ...args) {
        // No longer allow an api key to be passed as the first string to this function due to ambiguity between
        // old account ids and api keys. To request the account for an api key, send null as the id
        if (typeof id === 'string') {
            return stripeMethod$T({
                method: 'GET',
                fullPath: '/v1/accounts/{id}',
            }).apply(this, [id, ...args]);
        }
        else {
            if (id === null || id === undefined) {
                // Remove id as stripeMethod would complain of unexpected argument
                [].shift.apply([id, ...args]);
            }
            return stripeMethod$T({
                method: 'GET',
                fullPath: '/v1/account',
            }).apply(this, [id, ...args]);
        }
    },
    update: stripeMethod$T({ method: 'POST', fullPath: '/v1/accounts/{account}' }),
    list: stripeMethod$T({
        method: 'GET',
        fullPath: '/v1/accounts',
        methodType: 'list',
    }),
    del: stripeMethod$T({ method: 'DELETE', fullPath: '/v1/accounts/{account}' }),
    createExternalAccount: stripeMethod$T({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/external_accounts',
    }),
    createLoginLink: stripeMethod$T({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/login_links',
    }),
    createPerson: stripeMethod$T({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/persons',
    }),
    deleteExternalAccount: stripeMethod$T({
        method: 'DELETE',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}',
    }),
    deletePerson: stripeMethod$T({
        method: 'DELETE',
        fullPath: '/v1/accounts/{account}/persons/{person}',
    }),
    listCapabilities: stripeMethod$T({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/capabilities',
        methodType: 'list',
    }),
    listExternalAccounts: stripeMethod$T({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/external_accounts',
        methodType: 'list',
    }),
    listPersons: stripeMethod$T({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/persons',
        methodType: 'list',
    }),
    reject: stripeMethod$T({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/reject',
    }),
    retrieveCurrent: stripeMethod$T({ method: 'GET', fullPath: '/v1/account' }),
    retrieveCapability: stripeMethod$T({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/capabilities/{capability}',
    }),
    retrieveExternalAccount: stripeMethod$T({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}',
    }),
    retrievePerson: stripeMethod$T({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/persons/{person}',
    }),
    updateCapability: stripeMethod$T({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/capabilities/{capability}',
    }),
    updateExternalAccount: stripeMethod$T({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}',
    }),
    updatePerson: stripeMethod$T({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/persons/{person}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$S = StripeResource.method;
const AccountLinks = StripeResource.extend({
    create: stripeMethod$S({ method: 'POST', fullPath: '/v1/account_links' }),
});

// File generated from our OpenAPI spec
const stripeMethod$R = StripeResource.method;
const AccountSessions = StripeResource.extend({
    create: stripeMethod$R({ method: 'POST', fullPath: '/v1/account_sessions' }),
});

// File generated from our OpenAPI spec
const stripeMethod$Q = StripeResource.method;
const ApplePayDomains = StripeResource.extend({
    create: stripeMethod$Q({ method: 'POST', fullPath: '/v1/apple_pay/domains' }),
    retrieve: stripeMethod$Q({
        method: 'GET',
        fullPath: '/v1/apple_pay/domains/{domain}',
    }),
    list: stripeMethod$Q({
        method: 'GET',
        fullPath: '/v1/apple_pay/domains',
        methodType: 'list',
    }),
    del: stripeMethod$Q({
        method: 'DELETE',
        fullPath: '/v1/apple_pay/domains/{domain}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$P = StripeResource.method;
const ApplicationFees = StripeResource.extend({
    retrieve: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/application_fees/{id}',
    }),
    list: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/application_fees',
        methodType: 'list',
    }),
    createRefund: stripeMethod$P({
        method: 'POST',
        fullPath: '/v1/application_fees/{id}/refunds',
    }),
    listRefunds: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/application_fees/{id}/refunds',
        methodType: 'list',
    }),
    retrieveRefund: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/application_fees/{fee}/refunds/{id}',
    }),
    updateRefund: stripeMethod$P({
        method: 'POST',
        fullPath: '/v1/application_fees/{fee}/refunds/{id}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$O = StripeResource.method;
const Balance = StripeResource.extend({
    retrieve: stripeMethod$O({ method: 'GET', fullPath: '/v1/balance' }),
});

// File generated from our OpenAPI spec
const stripeMethod$N = StripeResource.method;
const BalanceSettings = StripeResource.extend({
    retrieve: stripeMethod$N({ method: 'GET', fullPath: '/v1/balance_settings' }),
    update: stripeMethod$N({ method: 'POST', fullPath: '/v1/balance_settings' }),
});

// File generated from our OpenAPI spec
const stripeMethod$M = StripeResource.method;
const BalanceTransactions = StripeResource.extend({
    retrieve: stripeMethod$M({
        method: 'GET',
        fullPath: '/v1/balance_transactions/{id}',
    }),
    list: stripeMethod$M({
        method: 'GET',
        fullPath: '/v1/balance_transactions',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$L = StripeResource.method;
const Charges = StripeResource.extend({
    create: stripeMethod$L({ method: 'POST', fullPath: '/v1/charges' }),
    retrieve: stripeMethod$L({ method: 'GET', fullPath: '/v1/charges/{charge}' }),
    update: stripeMethod$L({ method: 'POST', fullPath: '/v1/charges/{charge}' }),
    list: stripeMethod$L({
        method: 'GET',
        fullPath: '/v1/charges',
        methodType: 'list',
    }),
    capture: stripeMethod$L({
        method: 'POST',
        fullPath: '/v1/charges/{charge}/capture',
    }),
    search: stripeMethod$L({
        method: 'GET',
        fullPath: '/v1/charges/search',
        methodType: 'search',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$K = StripeResource.method;
const ConfirmationTokens = StripeResource.extend({
    retrieve: stripeMethod$K({
        method: 'GET',
        fullPath: '/v1/confirmation_tokens/{confirmation_token}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$J = StripeResource.method;
const CountrySpecs = StripeResource.extend({
    retrieve: stripeMethod$J({
        method: 'GET',
        fullPath: '/v1/country_specs/{country}',
    }),
    list: stripeMethod$J({
        method: 'GET',
        fullPath: '/v1/country_specs',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$I = StripeResource.method;
const Coupons = StripeResource.extend({
    create: stripeMethod$I({ method: 'POST', fullPath: '/v1/coupons' }),
    retrieve: stripeMethod$I({ method: 'GET', fullPath: '/v1/coupons/{coupon}' }),
    update: stripeMethod$I({ method: 'POST', fullPath: '/v1/coupons/{coupon}' }),
    list: stripeMethod$I({
        method: 'GET',
        fullPath: '/v1/coupons',
        methodType: 'list',
    }),
    del: stripeMethod$I({ method: 'DELETE', fullPath: '/v1/coupons/{coupon}' }),
});

// File generated from our OpenAPI spec
const stripeMethod$H = StripeResource.method;
const CreditNotes = StripeResource.extend({
    create: stripeMethod$H({ method: 'POST', fullPath: '/v1/credit_notes' }),
    retrieve: stripeMethod$H({ method: 'GET', fullPath: '/v1/credit_notes/{id}' }),
    update: stripeMethod$H({ method: 'POST', fullPath: '/v1/credit_notes/{id}' }),
    list: stripeMethod$H({
        method: 'GET',
        fullPath: '/v1/credit_notes',
        methodType: 'list',
    }),
    listLineItems: stripeMethod$H({
        method: 'GET',
        fullPath: '/v1/credit_notes/{credit_note}/lines',
        methodType: 'list',
    }),
    listPreviewLineItems: stripeMethod$H({
        method: 'GET',
        fullPath: '/v1/credit_notes/preview/lines',
        methodType: 'list',
    }),
    preview: stripeMethod$H({ method: 'GET', fullPath: '/v1/credit_notes/preview' }),
    voidCreditNote: stripeMethod$H({
        method: 'POST',
        fullPath: '/v1/credit_notes/{id}/void',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$G = StripeResource.method;
const CustomerSessions = StripeResource.extend({
    create: stripeMethod$G({ method: 'POST', fullPath: '/v1/customer_sessions' }),
});

// File generated from our OpenAPI spec
const stripeMethod$F = StripeResource.method;
const Customers = StripeResource.extend({
    create: stripeMethod$F({ method: 'POST', fullPath: '/v1/customers' }),
    retrieve: stripeMethod$F({ method: 'GET', fullPath: '/v1/customers/{customer}' }),
    update: stripeMethod$F({ method: 'POST', fullPath: '/v1/customers/{customer}' }),
    list: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers',
        methodType: 'list',
    }),
    del: stripeMethod$F({ method: 'DELETE', fullPath: '/v1/customers/{customer}' }),
    createBalanceTransaction: stripeMethod$F({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/balance_transactions',
    }),
    createFundingInstructions: stripeMethod$F({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/funding_instructions',
    }),
    createSource: stripeMethod$F({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources',
    }),
    createTaxId: stripeMethod$F({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/tax_ids',
    }),
    deleteDiscount: stripeMethod$F({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/discount',
    }),
    deleteSource: stripeMethod$F({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/sources/{id}',
    }),
    deleteTaxId: stripeMethod$F({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/tax_ids/{id}',
    }),
    listBalanceTransactions: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/balance_transactions',
        methodType: 'list',
    }),
    listCashBalanceTransactions: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance_transactions',
        methodType: 'list',
    }),
    listPaymentMethods: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/payment_methods',
        methodType: 'list',
    }),
    listSources: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/sources',
        methodType: 'list',
    }),
    listTaxIds: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/tax_ids',
        methodType: 'list',
    }),
    retrieveBalanceTransaction: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/balance_transactions/{transaction}',
    }),
    retrieveCashBalance: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance',
    }),
    retrieveCashBalanceTransaction: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance_transactions/{transaction}',
    }),
    retrievePaymentMethod: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/payment_methods/{payment_method}',
    }),
    retrieveSource: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/sources/{id}',
    }),
    retrieveTaxId: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/tax_ids/{id}',
    }),
    search: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/customers/search',
        methodType: 'search',
    }),
    updateBalanceTransaction: stripeMethod$F({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/balance_transactions/{transaction}',
    }),
    updateCashBalance: stripeMethod$F({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/cash_balance',
    }),
    updateSource: stripeMethod$F({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources/{id}',
    }),
    verifySource: stripeMethod$F({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources/{id}/verify',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$E = StripeResource.method;
const Disputes = StripeResource.extend({
    retrieve: stripeMethod$E({ method: 'GET', fullPath: '/v1/disputes/{dispute}' }),
    update: stripeMethod$E({ method: 'POST', fullPath: '/v1/disputes/{dispute}' }),
    list: stripeMethod$E({
        method: 'GET',
        fullPath: '/v1/disputes',
        methodType: 'list',
    }),
    close: stripeMethod$E({
        method: 'POST',
        fullPath: '/v1/disputes/{dispute}/close',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$D = StripeResource.method;
const EphemeralKeys = StripeResource.extend({
    create: stripeMethod$D({
        method: 'POST',
        fullPath: '/v1/ephemeral_keys',
        validator: (data, options) => {
            if (!options.headers || !options.headers['Stripe-Version']) {
                throw new Error('Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node');
            }
        },
    }),
    del: stripeMethod$D({ method: 'DELETE', fullPath: '/v1/ephemeral_keys/{key}' }),
});

// File generated from our OpenAPI spec
const stripeMethod$C = StripeResource.method;
const Events = StripeResource.extend({
    retrieve: stripeMethod$C({ method: 'GET', fullPath: '/v1/events/{id}' }),
    list: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/events',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$B = StripeResource.method;
const ExchangeRates = StripeResource.extend({
    retrieve: stripeMethod$B({
        method: 'GET',
        fullPath: '/v1/exchange_rates/{rate_id}',
    }),
    list: stripeMethod$B({
        method: 'GET',
        fullPath: '/v1/exchange_rates',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$A = StripeResource.method;
const FileLinks = StripeResource.extend({
    create: stripeMethod$A({ method: 'POST', fullPath: '/v1/file_links' }),
    retrieve: stripeMethod$A({ method: 'GET', fullPath: '/v1/file_links/{link}' }),
    update: stripeMethod$A({ method: 'POST', fullPath: '/v1/file_links/{link}' }),
    list: stripeMethod$A({
        method: 'GET',
        fullPath: '/v1/file_links',
        methodType: 'list',
    }),
});

// Method for formatting HTTP body for the multipart/form-data specification
// Mostly taken from Fermata.js
// https://github.com/natevw/fermata/blob/5d9732a33d776ce925013a265935facd1626cc88/fermata.js#L315-L343
const multipartDataGenerator = (method, data, headers) => {
    const segno = (Math.round(Math.random() * 1e16) + Math.round(Math.random() * 1e16)).toString();
    headers['Content-Type'] = `multipart/form-data; boundary=${segno}`;
    const textEncoder = new TextEncoder();
    let buffer = new Uint8Array(0);
    const endBuffer = textEncoder.encode('\r\n');
    function push(l) {
        const prevBuffer = buffer;
        const newBuffer = l instanceof Uint8Array ? l : new Uint8Array(textEncoder.encode(l));
        buffer = new Uint8Array(prevBuffer.length + newBuffer.length + 2);
        buffer.set(prevBuffer);
        buffer.set(newBuffer, prevBuffer.length);
        buffer.set(endBuffer, buffer.length - 2);
    }
    function q(s) {
        return `"${s.replace(/"|"/g, '%22').replace(/\r\n|\r|\n/g, ' ')}"`;
    }
    const flattenedData = flattenAndStringify(data);
    for (const k in flattenedData) {
        if (!Object.prototype.hasOwnProperty.call(flattenedData, k)) {
            continue;
        }
        const v = flattenedData[k];
        push(`--${segno}`);
        if (Object.prototype.hasOwnProperty.call(v, 'data')) {
            const typedEntry = v;
            push(`Content-Disposition: form-data; name=${q(k)}; filename=${q(typedEntry.name || 'blob')}`);
            push(`Content-Type: ${typedEntry.type || 'application/octet-stream'}`);
            push('');
            push(typedEntry.data);
        }
        else {
            push(`Content-Disposition: form-data; name=${q(k)}`);
            push('');
            push(v);
        }
    }
    push(`--${segno}--`);
    return buffer;
};
function multipartRequestDataProcessor(method, data, headers, callback) {
    data = data || {};
    if (method !== 'POST') {
        return callback(null, queryStringifyRequestData(data));
    }
    this._stripe._platformFunctions
        .tryBufferData(data)
        .then((bufferedData) => {
        const buffer = multipartDataGenerator(method, bufferedData, headers);
        return callback(null, buffer);
    })
        .catch((err) => callback(err, null));
}

// File generated from our OpenAPI spec
const stripeMethod$z = StripeResource.method;
const Files = StripeResource.extend({
    create: stripeMethod$z({
        method: 'POST',
        fullPath: '/v1/files',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        host: 'files.stripe.com',
    }),
    retrieve: stripeMethod$z({ method: 'GET', fullPath: '/v1/files/{file}' }),
    list: stripeMethod$z({
        method: 'GET',
        fullPath: '/v1/files',
        methodType: 'list',
    }),
    requestDataProcessor: multipartRequestDataProcessor,
});

// File generated from our OpenAPI spec
const stripeMethod$y = StripeResource.method;
const InvoiceItems = StripeResource.extend({
    create: stripeMethod$y({ method: 'POST', fullPath: '/v1/invoiceitems' }),
    retrieve: stripeMethod$y({
        method: 'GET',
        fullPath: '/v1/invoiceitems/{invoiceitem}',
    }),
    update: stripeMethod$y({
        method: 'POST',
        fullPath: '/v1/invoiceitems/{invoiceitem}',
    }),
    list: stripeMethod$y({
        method: 'GET',
        fullPath: '/v1/invoiceitems',
        methodType: 'list',
    }),
    del: stripeMethod$y({
        method: 'DELETE',
        fullPath: '/v1/invoiceitems/{invoiceitem}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$x = StripeResource.method;
const InvoicePayments = StripeResource.extend({
    retrieve: stripeMethod$x({
        method: 'GET',
        fullPath: '/v1/invoice_payments/{invoice_payment}',
    }),
    list: stripeMethod$x({
        method: 'GET',
        fullPath: '/v1/invoice_payments',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$w = StripeResource.method;
const InvoiceRenderingTemplates = StripeResource.extend({
    retrieve: stripeMethod$w({
        method: 'GET',
        fullPath: '/v1/invoice_rendering_templates/{template}',
    }),
    list: stripeMethod$w({
        method: 'GET',
        fullPath: '/v1/invoice_rendering_templates',
        methodType: 'list',
    }),
    archive: stripeMethod$w({
        method: 'POST',
        fullPath: '/v1/invoice_rendering_templates/{template}/archive',
    }),
    unarchive: stripeMethod$w({
        method: 'POST',
        fullPath: '/v1/invoice_rendering_templates/{template}/unarchive',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$v = StripeResource.method;
const Invoices = StripeResource.extend({
    create: stripeMethod$v({ method: 'POST', fullPath: '/v1/invoices' }),
    retrieve: stripeMethod$v({ method: 'GET', fullPath: '/v1/invoices/{invoice}' }),
    update: stripeMethod$v({ method: 'POST', fullPath: '/v1/invoices/{invoice}' }),
    list: stripeMethod$v({
        method: 'GET',
        fullPath: '/v1/invoices',
        methodType: 'list',
    }),
    del: stripeMethod$v({ method: 'DELETE', fullPath: '/v1/invoices/{invoice}' }),
    addLines: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/add_lines',
    }),
    attachPayment: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/attach_payment',
    }),
    createPreview: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoices/create_preview',
    }),
    finalizeInvoice: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/finalize',
    }),
    listLineItems: stripeMethod$v({
        method: 'GET',
        fullPath: '/v1/invoices/{invoice}/lines',
        methodType: 'list',
    }),
    markUncollectible: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/mark_uncollectible',
    }),
    pay: stripeMethod$v({ method: 'POST', fullPath: '/v1/invoices/{invoice}/pay' }),
    removeLines: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/remove_lines',
    }),
    search: stripeMethod$v({
        method: 'GET',
        fullPath: '/v1/invoices/search',
        methodType: 'search',
    }),
    sendInvoice: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/send',
    }),
    updateLines: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/update_lines',
    }),
    updateLineItem: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/lines/{line_item_id}',
    }),
    voidInvoice: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/void',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$u = StripeResource.method;
const Mandates = StripeResource.extend({
    retrieve: stripeMethod$u({ method: 'GET', fullPath: '/v1/mandates/{mandate}' }),
});

const stripeMethod$t = StripeResource.method;
const oAuthHost = 'connect.stripe.com';
const OAuth = StripeResource.extend({
    basePath: '/',
    authorizeUrl(params, options) {
        params = params || {};
        options = options || {};
        let path = 'oauth/authorize';
        // For Express accounts, the path changes
        if (options.express) {
            path = `express/${path}`;
        }
        if (!params.response_type) {
            params.response_type = 'code';
        }
        if (!params.client_id) {
            params.client_id = this._stripe.getClientId();
        }
        if (!params.scope) {
            params.scope = 'read_write';
        }
        return `https://${oAuthHost}/${path}?${queryStringifyRequestData(params)}`;
    },
    token: stripeMethod$t({
        method: 'POST',
        path: 'oauth/token',
        host: oAuthHost,
    }),
    deauthorize(spec, ...args) {
        if (!spec.client_id) {
            spec.client_id = this._stripe.getClientId();
        }
        return stripeMethod$t({
            method: 'POST',
            path: 'oauth/deauthorize',
            host: oAuthHost,
        }).apply(this, [spec, ...args]);
    },
});

// File generated from our OpenAPI spec
const stripeMethod$s = StripeResource.method;
const PaymentAttemptRecords = StripeResource.extend({
    retrieve: stripeMethod$s({
        method: 'GET',
        fullPath: '/v1/payment_attempt_records/{id}',
    }),
    list: stripeMethod$s({
        method: 'GET',
        fullPath: '/v1/payment_attempt_records',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$r = StripeResource.method;
const PaymentIntents = StripeResource.extend({
    create: stripeMethod$r({ method: 'POST', fullPath: '/v1/payment_intents' }),
    retrieve: stripeMethod$r({
        method: 'GET',
        fullPath: '/v1/payment_intents/{intent}',
    }),
    update: stripeMethod$r({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}',
    }),
    list: stripeMethod$r({
        method: 'GET',
        fullPath: '/v1/payment_intents',
        methodType: 'list',
    }),
    applyCustomerBalance: stripeMethod$r({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/apply_customer_balance',
    }),
    cancel: stripeMethod$r({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/cancel',
    }),
    capture: stripeMethod$r({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/capture',
    }),
    confirm: stripeMethod$r({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/confirm',
    }),
    incrementAuthorization: stripeMethod$r({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/increment_authorization',
    }),
    listAmountDetailsLineItems: stripeMethod$r({
        method: 'GET',
        fullPath: '/v1/payment_intents/{intent}/amount_details_line_items',
        methodType: 'list',
    }),
    search: stripeMethod$r({
        method: 'GET',
        fullPath: '/v1/payment_intents/search',
        methodType: 'search',
    }),
    verifyMicrodeposits: stripeMethod$r({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/verify_microdeposits',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$q = StripeResource.method;
const PaymentLinks = StripeResource.extend({
    create: stripeMethod$q({ method: 'POST', fullPath: '/v1/payment_links' }),
    retrieve: stripeMethod$q({
        method: 'GET',
        fullPath: '/v1/payment_links/{payment_link}',
    }),
    update: stripeMethod$q({
        method: 'POST',
        fullPath: '/v1/payment_links/{payment_link}',
    }),
    list: stripeMethod$q({
        method: 'GET',
        fullPath: '/v1/payment_links',
        methodType: 'list',
    }),
    listLineItems: stripeMethod$q({
        method: 'GET',
        fullPath: '/v1/payment_links/{payment_link}/line_items',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$p = StripeResource.method;
const PaymentMethodConfigurations = StripeResource.extend({
    create: stripeMethod$p({
        method: 'POST',
        fullPath: '/v1/payment_method_configurations',
    }),
    retrieve: stripeMethod$p({
        method: 'GET',
        fullPath: '/v1/payment_method_configurations/{configuration}',
    }),
    update: stripeMethod$p({
        method: 'POST',
        fullPath: '/v1/payment_method_configurations/{configuration}',
    }),
    list: stripeMethod$p({
        method: 'GET',
        fullPath: '/v1/payment_method_configurations',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$o = StripeResource.method;
const PaymentMethodDomains = StripeResource.extend({
    create: stripeMethod$o({
        method: 'POST',
        fullPath: '/v1/payment_method_domains',
    }),
    retrieve: stripeMethod$o({
        method: 'GET',
        fullPath: '/v1/payment_method_domains/{payment_method_domain}',
    }),
    update: stripeMethod$o({
        method: 'POST',
        fullPath: '/v1/payment_method_domains/{payment_method_domain}',
    }),
    list: stripeMethod$o({
        method: 'GET',
        fullPath: '/v1/payment_method_domains',
        methodType: 'list',
    }),
    validate: stripeMethod$o({
        method: 'POST',
        fullPath: '/v1/payment_method_domains/{payment_method_domain}/validate',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$n = StripeResource.method;
const PaymentMethods = StripeResource.extend({
    create: stripeMethod$n({ method: 'POST', fullPath: '/v1/payment_methods' }),
    retrieve: stripeMethod$n({
        method: 'GET',
        fullPath: '/v1/payment_methods/{payment_method}',
    }),
    update: stripeMethod$n({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}',
    }),
    list: stripeMethod$n({
        method: 'GET',
        fullPath: '/v1/payment_methods',
        methodType: 'list',
    }),
    attach: stripeMethod$n({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}/attach',
    }),
    detach: stripeMethod$n({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}/detach',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$m = StripeResource.method;
const PaymentRecords = StripeResource.extend({
    retrieve: stripeMethod$m({ method: 'GET', fullPath: '/v1/payment_records/{id}' }),
    reportPayment: stripeMethod$m({
        method: 'POST',
        fullPath: '/v1/payment_records/report_payment',
    }),
    reportPaymentAttempt: stripeMethod$m({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_payment_attempt',
    }),
    reportPaymentAttemptCanceled: stripeMethod$m({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_payment_attempt_canceled',
    }),
    reportPaymentAttemptFailed: stripeMethod$m({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_payment_attempt_failed',
    }),
    reportPaymentAttemptGuaranteed: stripeMethod$m({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_payment_attempt_guaranteed',
    }),
    reportPaymentAttemptInformational: stripeMethod$m({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_payment_attempt_informational',
    }),
    reportRefund: stripeMethod$m({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_refund',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$l = StripeResource.method;
const Payouts = StripeResource.extend({
    create: stripeMethod$l({ method: 'POST', fullPath: '/v1/payouts' }),
    retrieve: stripeMethod$l({ method: 'GET', fullPath: '/v1/payouts/{payout}' }),
    update: stripeMethod$l({ method: 'POST', fullPath: '/v1/payouts/{payout}' }),
    list: stripeMethod$l({
        method: 'GET',
        fullPath: '/v1/payouts',
        methodType: 'list',
    }),
    cancel: stripeMethod$l({
        method: 'POST',
        fullPath: '/v1/payouts/{payout}/cancel',
    }),
    reverse: stripeMethod$l({
        method: 'POST',
        fullPath: '/v1/payouts/{payout}/reverse',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$k = StripeResource.method;
const Plans = StripeResource.extend({
    create: stripeMethod$k({ method: 'POST', fullPath: '/v1/plans' }),
    retrieve: stripeMethod$k({ method: 'GET', fullPath: '/v1/plans/{plan}' }),
    update: stripeMethod$k({ method: 'POST', fullPath: '/v1/plans/{plan}' }),
    list: stripeMethod$k({
        method: 'GET',
        fullPath: '/v1/plans',
        methodType: 'list',
    }),
    del: stripeMethod$k({ method: 'DELETE', fullPath: '/v1/plans/{plan}' }),
});

// File generated from our OpenAPI spec
const stripeMethod$j = StripeResource.method;
const Prices = StripeResource.extend({
    create: stripeMethod$j({ method: 'POST', fullPath: '/v1/prices' }),
    retrieve: stripeMethod$j({ method: 'GET', fullPath: '/v1/prices/{price}' }),
    update: stripeMethod$j({ method: 'POST', fullPath: '/v1/prices/{price}' }),
    list: stripeMethod$j({
        method: 'GET',
        fullPath: '/v1/prices',
        methodType: 'list',
    }),
    search: stripeMethod$j({
        method: 'GET',
        fullPath: '/v1/prices/search',
        methodType: 'search',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$i = StripeResource.method;
const Products = StripeResource.extend({
    create: stripeMethod$i({ method: 'POST', fullPath: '/v1/products' }),
    retrieve: stripeMethod$i({ method: 'GET', fullPath: '/v1/products/{id}' }),
    update: stripeMethod$i({ method: 'POST', fullPath: '/v1/products/{id}' }),
    list: stripeMethod$i({
        method: 'GET',
        fullPath: '/v1/products',
        methodType: 'list',
    }),
    del: stripeMethod$i({ method: 'DELETE', fullPath: '/v1/products/{id}' }),
    createFeature: stripeMethod$i({
        method: 'POST',
        fullPath: '/v1/products/{product}/features',
    }),
    deleteFeature: stripeMethod$i({
        method: 'DELETE',
        fullPath: '/v1/products/{product}/features/{id}',
    }),
    listFeatures: stripeMethod$i({
        method: 'GET',
        fullPath: '/v1/products/{product}/features',
        methodType: 'list',
    }),
    retrieveFeature: stripeMethod$i({
        method: 'GET',
        fullPath: '/v1/products/{product}/features/{id}',
    }),
    search: stripeMethod$i({
        method: 'GET',
        fullPath: '/v1/products/search',
        methodType: 'search',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$h = StripeResource.method;
const PromotionCodes = StripeResource.extend({
    create: stripeMethod$h({ method: 'POST', fullPath: '/v1/promotion_codes' }),
    retrieve: stripeMethod$h({
        method: 'GET',
        fullPath: '/v1/promotion_codes/{promotion_code}',
    }),
    update: stripeMethod$h({
        method: 'POST',
        fullPath: '/v1/promotion_codes/{promotion_code}',
    }),
    list: stripeMethod$h({
        method: 'GET',
        fullPath: '/v1/promotion_codes',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$g = StripeResource.method;
const Quotes = StripeResource.extend({
    create: stripeMethod$g({ method: 'POST', fullPath: '/v1/quotes' }),
    retrieve: stripeMethod$g({ method: 'GET', fullPath: '/v1/quotes/{quote}' }),
    update: stripeMethod$g({ method: 'POST', fullPath: '/v1/quotes/{quote}' }),
    list: stripeMethod$g({
        method: 'GET',
        fullPath: '/v1/quotes',
        methodType: 'list',
    }),
    accept: stripeMethod$g({ method: 'POST', fullPath: '/v1/quotes/{quote}/accept' }),
    cancel: stripeMethod$g({ method: 'POST', fullPath: '/v1/quotes/{quote}/cancel' }),
    finalizeQuote: stripeMethod$g({
        method: 'POST',
        fullPath: '/v1/quotes/{quote}/finalize',
    }),
    listComputedUpfrontLineItems: stripeMethod$g({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/computed_upfront_line_items',
        methodType: 'list',
    }),
    listLineItems: stripeMethod$g({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/line_items',
        methodType: 'list',
    }),
    pdf: stripeMethod$g({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/pdf',
        host: 'files.stripe.com',
        streaming: true,
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$f = StripeResource.method;
const Refunds = StripeResource.extend({
    create: stripeMethod$f({ method: 'POST', fullPath: '/v1/refunds' }),
    retrieve: stripeMethod$f({ method: 'GET', fullPath: '/v1/refunds/{refund}' }),
    update: stripeMethod$f({ method: 'POST', fullPath: '/v1/refunds/{refund}' }),
    list: stripeMethod$f({
        method: 'GET',
        fullPath: '/v1/refunds',
        methodType: 'list',
    }),
    cancel: stripeMethod$f({
        method: 'POST',
        fullPath: '/v1/refunds/{refund}/cancel',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$e = StripeResource.method;
const Reviews = StripeResource.extend({
    retrieve: stripeMethod$e({ method: 'GET', fullPath: '/v1/reviews/{review}' }),
    list: stripeMethod$e({
        method: 'GET',
        fullPath: '/v1/reviews',
        methodType: 'list',
    }),
    approve: stripeMethod$e({
        method: 'POST',
        fullPath: '/v1/reviews/{review}/approve',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$d = StripeResource.method;
const SetupAttempts = StripeResource.extend({
    list: stripeMethod$d({
        method: 'GET',
        fullPath: '/v1/setup_attempts',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$c = StripeResource.method;
const SetupIntents = StripeResource.extend({
    create: stripeMethod$c({ method: 'POST', fullPath: '/v1/setup_intents' }),
    retrieve: stripeMethod$c({
        method: 'GET',
        fullPath: '/v1/setup_intents/{intent}',
    }),
    update: stripeMethod$c({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}',
    }),
    list: stripeMethod$c({
        method: 'GET',
        fullPath: '/v1/setup_intents',
        methodType: 'list',
    }),
    cancel: stripeMethod$c({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/cancel',
    }),
    confirm: stripeMethod$c({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/confirm',
    }),
    verifyMicrodeposits: stripeMethod$c({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/verify_microdeposits',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$b = StripeResource.method;
const ShippingRates = StripeResource.extend({
    create: stripeMethod$b({ method: 'POST', fullPath: '/v1/shipping_rates' }),
    retrieve: stripeMethod$b({
        method: 'GET',
        fullPath: '/v1/shipping_rates/{shipping_rate_token}',
    }),
    update: stripeMethod$b({
        method: 'POST',
        fullPath: '/v1/shipping_rates/{shipping_rate_token}',
    }),
    list: stripeMethod$b({
        method: 'GET',
        fullPath: '/v1/shipping_rates',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$a = StripeResource.method;
const Sources = StripeResource.extend({
    create: stripeMethod$a({ method: 'POST', fullPath: '/v1/sources' }),
    retrieve: stripeMethod$a({ method: 'GET', fullPath: '/v1/sources/{source}' }),
    update: stripeMethod$a({ method: 'POST', fullPath: '/v1/sources/{source}' }),
    listSourceTransactions: stripeMethod$a({
        method: 'GET',
        fullPath: '/v1/sources/{source}/source_transactions',
        methodType: 'list',
    }),
    verify: stripeMethod$a({
        method: 'POST',
        fullPath: '/v1/sources/{source}/verify',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$9 = StripeResource.method;
const SubscriptionItems = StripeResource.extend({
    create: stripeMethod$9({ method: 'POST', fullPath: '/v1/subscription_items' }),
    retrieve: stripeMethod$9({
        method: 'GET',
        fullPath: '/v1/subscription_items/{item}',
    }),
    update: stripeMethod$9({
        method: 'POST',
        fullPath: '/v1/subscription_items/{item}',
    }),
    list: stripeMethod$9({
        method: 'GET',
        fullPath: '/v1/subscription_items',
        methodType: 'list',
    }),
    del: stripeMethod$9({
        method: 'DELETE',
        fullPath: '/v1/subscription_items/{item}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$8 = StripeResource.method;
const SubscriptionSchedules = StripeResource.extend({
    create: stripeMethod$8({
        method: 'POST',
        fullPath: '/v1/subscription_schedules',
    }),
    retrieve: stripeMethod$8({
        method: 'GET',
        fullPath: '/v1/subscription_schedules/{schedule}',
    }),
    update: stripeMethod$8({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}',
    }),
    list: stripeMethod$8({
        method: 'GET',
        fullPath: '/v1/subscription_schedules',
        methodType: 'list',
    }),
    cancel: stripeMethod$8({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}/cancel',
    }),
    release: stripeMethod$8({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}/release',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$7 = StripeResource.method;
const Subscriptions = StripeResource.extend({
    create: stripeMethod$7({ method: 'POST', fullPath: '/v1/subscriptions' }),
    retrieve: stripeMethod$7({
        method: 'GET',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}',
    }),
    update: stripeMethod$7({
        method: 'POST',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}',
    }),
    list: stripeMethod$7({
        method: 'GET',
        fullPath: '/v1/subscriptions',
        methodType: 'list',
    }),
    cancel: stripeMethod$7({
        method: 'DELETE',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}',
    }),
    deleteDiscount: stripeMethod$7({
        method: 'DELETE',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}/discount',
    }),
    migrate: stripeMethod$7({
        method: 'POST',
        fullPath: '/v1/subscriptions/{subscription}/migrate',
    }),
    resume: stripeMethod$7({
        method: 'POST',
        fullPath: '/v1/subscriptions/{subscription}/resume',
    }),
    search: stripeMethod$7({
        method: 'GET',
        fullPath: '/v1/subscriptions/search',
        methodType: 'search',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$6 = StripeResource.method;
const TaxCodes = StripeResource.extend({
    retrieve: stripeMethod$6({ method: 'GET', fullPath: '/v1/tax_codes/{id}' }),
    list: stripeMethod$6({
        method: 'GET',
        fullPath: '/v1/tax_codes',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$5 = StripeResource.method;
const TaxIds = StripeResource.extend({
    create: stripeMethod$5({ method: 'POST', fullPath: '/v1/tax_ids' }),
    retrieve: stripeMethod$5({ method: 'GET', fullPath: '/v1/tax_ids/{id}' }),
    list: stripeMethod$5({
        method: 'GET',
        fullPath: '/v1/tax_ids',
        methodType: 'list',
    }),
    del: stripeMethod$5({ method: 'DELETE', fullPath: '/v1/tax_ids/{id}' }),
});

// File generated from our OpenAPI spec
const stripeMethod$4 = StripeResource.method;
const TaxRates = StripeResource.extend({
    create: stripeMethod$4({ method: 'POST', fullPath: '/v1/tax_rates' }),
    retrieve: stripeMethod$4({ method: 'GET', fullPath: '/v1/tax_rates/{tax_rate}' }),
    update: stripeMethod$4({ method: 'POST', fullPath: '/v1/tax_rates/{tax_rate}' }),
    list: stripeMethod$4({
        method: 'GET',
        fullPath: '/v1/tax_rates',
        methodType: 'list',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod$3 = StripeResource.method;
const Tokens = StripeResource.extend({
    create: stripeMethod$3({ method: 'POST', fullPath: '/v1/tokens' }),
    retrieve: stripeMethod$3({ method: 'GET', fullPath: '/v1/tokens/{token}' }),
});

// File generated from our OpenAPI spec
const stripeMethod$2 = StripeResource.method;
const Topups = StripeResource.extend({
    create: stripeMethod$2({ method: 'POST', fullPath: '/v1/topups' }),
    retrieve: stripeMethod$2({ method: 'GET', fullPath: '/v1/topups/{topup}' }),
    update: stripeMethod$2({ method: 'POST', fullPath: '/v1/topups/{topup}' }),
    list: stripeMethod$2({
        method: 'GET',
        fullPath: '/v1/topups',
        methodType: 'list',
    }),
    cancel: stripeMethod$2({ method: 'POST', fullPath: '/v1/topups/{topup}/cancel' }),
});

// File generated from our OpenAPI spec
const stripeMethod$1 = StripeResource.method;
const Transfers = StripeResource.extend({
    create: stripeMethod$1({ method: 'POST', fullPath: '/v1/transfers' }),
    retrieve: stripeMethod$1({ method: 'GET', fullPath: '/v1/transfers/{transfer}' }),
    update: stripeMethod$1({ method: 'POST', fullPath: '/v1/transfers/{transfer}' }),
    list: stripeMethod$1({
        method: 'GET',
        fullPath: '/v1/transfers',
        methodType: 'list',
    }),
    createReversal: stripeMethod$1({
        method: 'POST',
        fullPath: '/v1/transfers/{id}/reversals',
    }),
    listReversals: stripeMethod$1({
        method: 'GET',
        fullPath: '/v1/transfers/{id}/reversals',
        methodType: 'list',
    }),
    retrieveReversal: stripeMethod$1({
        method: 'GET',
        fullPath: '/v1/transfers/{transfer}/reversals/{id}',
    }),
    updateReversal: stripeMethod$1({
        method: 'POST',
        fullPath: '/v1/transfers/{transfer}/reversals/{id}',
    }),
});

// File generated from our OpenAPI spec
const stripeMethod = StripeResource.method;
const WebhookEndpoints = StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/webhook_endpoints' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/webhook_endpoints',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}',
    }),
});

// File generated from our OpenAPI spec
const Apps = resourceNamespace('apps', { Secrets: Secrets });
const Billing = resourceNamespace('billing', {
    Alerts: Alerts,
    CreditBalanceSummary: CreditBalanceSummary,
    CreditBalanceTransactions: CreditBalanceTransactions,
    CreditGrants: CreditGrants,
    MeterEventAdjustments: MeterEventAdjustments$1,
    MeterEvents: MeterEvents$1,
    Meters: Meters,
});
const BillingPortal = resourceNamespace('billingPortal', {
    Configurations: Configurations$1,
    Sessions: Sessions$2,
});
const Checkout = resourceNamespace('checkout', {
    Sessions: Sessions$1,
});
const Climate = resourceNamespace('climate', {
    Orders: Orders,
    Products: Products$1,
    Suppliers: Suppliers,
});
const Entitlements = resourceNamespace('entitlements', {
    ActiveEntitlements: ActiveEntitlements,
    Features: Features,
});
const FinancialConnections = resourceNamespace('financialConnections', {
    Accounts: Accounts$2,
    Sessions: Sessions,
    Transactions: Transactions$4,
});
const Forwarding = resourceNamespace('forwarding', {
    Requests: Requests,
});
const Identity = resourceNamespace('identity', {
    VerificationReports: VerificationReports,
    VerificationSessions: VerificationSessions,
});
const Issuing = resourceNamespace('issuing', {
    Authorizations: Authorizations$1,
    Cardholders: Cardholders,
    Cards: Cards$1,
    Disputes: Disputes$1,
    PersonalizationDesigns: PersonalizationDesigns$1,
    PhysicalBundles: PhysicalBundles,
    Tokens: Tokens$1,
    Transactions: Transactions$3,
});
const Radar = resourceNamespace('radar', {
    EarlyFraudWarnings: EarlyFraudWarnings,
    PaymentEvaluations: PaymentEvaluations,
    ValueListItems: ValueListItems,
    ValueLists: ValueLists,
});
const Reporting = resourceNamespace('reporting', {
    ReportRuns: ReportRuns,
    ReportTypes: ReportTypes,
});
const Sigma = resourceNamespace('sigma', {
    ScheduledQueryRuns: ScheduledQueryRuns,
});
const Tax = resourceNamespace('tax', {
    Associations: Associations,
    Calculations: Calculations,
    Registrations: Registrations,
    Settings: Settings,
    Transactions: Transactions$2,
});
const Terminal = resourceNamespace('terminal', {
    Configurations: Configurations,
    ConnectionTokens: ConnectionTokens,
    Locations: Locations,
    OnboardingLinks: OnboardingLinks,
    Readers: Readers$1,
});
const TestHelpers = resourceNamespace('testHelpers', {
    ConfirmationTokens: ConfirmationTokens$1,
    Customers: Customers$1,
    Refunds: Refunds$1,
    TestClocks: TestClocks,
    Issuing: resourceNamespace('issuing', {
        Authorizations: Authorizations,
        Cards: Cards,
        PersonalizationDesigns: PersonalizationDesigns,
        Transactions: Transactions$1,
    }),
    Terminal: resourceNamespace('terminal', {
        Readers: Readers,
    }),
    Treasury: resourceNamespace('treasury', {
        InboundTransfers: InboundTransfers$1,
        OutboundPayments: OutboundPayments$1,
        OutboundTransfers: OutboundTransfers$1,
        ReceivedCredits: ReceivedCredits$1,
        ReceivedDebits: ReceivedDebits$1,
    }),
});
const Treasury = resourceNamespace('treasury', {
    CreditReversals: CreditReversals,
    DebitReversals: DebitReversals,
    FinancialAccounts: FinancialAccounts,
    InboundTransfers: InboundTransfers,
    OutboundPayments: OutboundPayments,
    OutboundTransfers: OutboundTransfers,
    ReceivedCredits: ReceivedCredits,
    ReceivedDebits: ReceivedDebits,
    TransactionEntries: TransactionEntries,
    Transactions: Transactions,
});
const V2 = resourceNamespace('v2', {
    Billing: resourceNamespace('billing', {
        MeterEventAdjustments: MeterEventAdjustments,
        MeterEventSession: MeterEventSession,
        MeterEventStream: MeterEventStream,
        MeterEvents: MeterEvents,
    }),
    Core: resourceNamespace('core', {
        AccountLinks: AccountLinks$1,
        AccountTokens: AccountTokens,
        Accounts: Accounts$1,
        EventDestinations: EventDestinations,
        Events: Events$1,
    }),
});

const resources = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    Account: Accounts,
    AccountLinks,
    AccountSessions,
    Accounts,
    ApplePayDomains,
    ApplicationFees,
    Apps,
    Balance,
    BalanceSettings,
    BalanceTransactions,
    Billing,
    BillingPortal,
    Charges,
    Checkout,
    Climate,
    ConfirmationTokens,
    CountrySpecs,
    Coupons,
    CreditNotes,
    CustomerSessions,
    Customers,
    Disputes,
    Entitlements,
    EphemeralKeys,
    Events,
    ExchangeRates,
    FileLinks,
    Files,
    FinancialConnections,
    Forwarding,
    Identity,
    InvoiceItems,
    InvoicePayments,
    InvoiceRenderingTemplates,
    Invoices,
    Issuing,
    Mandates,
    OAuth,
    PaymentAttemptRecords,
    PaymentIntents,
    PaymentLinks,
    PaymentMethodConfigurations,
    PaymentMethodDomains,
    PaymentMethods,
    PaymentRecords,
    Payouts,
    Plans,
    Prices,
    Products,
    PromotionCodes,
    Quotes,
    Radar,
    Refunds,
    Reporting,
    Reviews,
    SetupAttempts,
    SetupIntents,
    ShippingRates,
    Sigma,
    Sources,
    SubscriptionItems,
    SubscriptionSchedules,
    Subscriptions,
    Tax,
    TaxCodes,
    TaxIds,
    TaxRates,
    Terminal,
    TestHelpers,
    Tokens,
    Topups,
    Transfers,
    Treasury,
    V2,
    WebhookEndpoints
}, Symbol.toStringTag, { value: 'Module' }));

const DEFAULT_HOST = 'api.stripe.com';
const DEFAULT_PORT = '443';
const DEFAULT_BASE_PATH = '/v1/';
const DEFAULT_API_VERSION = ApiVersion;
const DEFAULT_TIMEOUT = 80000;
const MAX_NETWORK_RETRY_DELAY_SEC = 5;
const INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;
const APP_INFO_PROPERTIES = ['name', 'version', 'url', 'partner_id'];
const ALLOWED_CONFIG_PROPERTIES = [
    'authenticator',
    'apiVersion',
    'typescript',
    'maxNetworkRetries',
    'httpAgent',
    'httpClient',
    'timeout',
    'host',
    'port',
    'protocol',
    'telemetry',
    'appInfo',
    'stripeAccount',
    'stripeContext',
];
const defaultRequestSenderFactory = (stripe) => new RequestSender(stripe, StripeResource.MAX_BUFFERED_REQUEST_METRICS);
function createStripe(platformFunctions, requestSender = defaultRequestSenderFactory) {
    Stripe.PACKAGE_VERSION = '20.4.0';
    Stripe.API_VERSION = ApiVersion;
    Stripe.USER_AGENT = Object.assign({ bindings_version: Stripe.PACKAGE_VERSION, lang: 'node', publisher: 'stripe', uname: null, typescript: false }, determineProcessUserAgentProperties());
    Stripe.StripeResource = StripeResource;
    Stripe.StripeContext = StripeContext;
    Stripe.resources = resources;
    Stripe.HttpClient = HttpClient;
    Stripe.HttpClientResponse = HttpClientResponse;
    Stripe.CryptoProvider = CryptoProvider;
    Stripe.webhooks = createWebhooks(platformFunctions);
    function Stripe(key, config = {}) {
        if (!(this instanceof Stripe)) {
            return new Stripe(key, config);
        }
        const props = this._getPropsFromConfig(config);
        this._platformFunctions = platformFunctions;
        Object.defineProperty(this, '_emitter', {
            value: this._platformFunctions.createEmitter(),
            enumerable: false,
            configurable: false,
            writable: false,
        });
        this.VERSION = Stripe.PACKAGE_VERSION;
        this.on = this._emitter.on.bind(this._emitter);
        this.once = this._emitter.once.bind(this._emitter);
        this.off = this._emitter.removeListener.bind(this._emitter);
        const agent = props.httpAgent || null;
        this._api = {
            host: props.host || DEFAULT_HOST,
            port: props.port || DEFAULT_PORT,
            protocol: props.protocol || 'https',
            basePath: DEFAULT_BASE_PATH,
            version: props.apiVersion || DEFAULT_API_VERSION,
            timeout: validateInteger('timeout', props.timeout, DEFAULT_TIMEOUT),
            maxNetworkRetries: validateInteger('maxNetworkRetries', props.maxNetworkRetries, 2),
            agent: agent,
            httpClient: props.httpClient ||
                (agent
                    ? this._platformFunctions.createNodeHttpClient(agent)
                    : this._platformFunctions.createDefaultHttpClient()),
            dev: false,
            stripeAccount: props.stripeAccount || null,
            stripeContext: props.stripeContext || null,
        };
        const typescript = props.typescript || false;
        if (typescript !== Stripe.USER_AGENT.typescript) {
            // The mutation here is uncomfortable, but likely fastest;
            // serializing the user agent involves shelling out to the system,
            // and given some users may instantiate the library many times without switching between TS and non-TS,
            // we only want to incur the performance hit when that actually happens.
            Stripe.USER_AGENT.typescript = typescript;
        }
        if (props.appInfo) {
            this._setAppInfo(props.appInfo);
        }
        this._prepResources();
        this._setAuthenticator(key, props.authenticator);
        this.errors = _Error;
        this.webhooks = Stripe.webhooks;
        this._prevRequestMetrics = [];
        this._enableTelemetry = props.telemetry !== false;
        this._requestSender = requestSender(this);
        // Expose StripeResource on the instance too
        // @ts-ignore
        this.StripeResource = Stripe.StripeResource;
    }
    Stripe.errors = _Error;
    Stripe.createNodeHttpClient = platformFunctions.createNodeHttpClient;
    /**
     * Creates an HTTP client for issuing Stripe API requests which uses the Web
     * Fetch API.
     *
     * A fetch function can optionally be passed in as a parameter. If none is
     * passed, will default to the default `fetch` function in the global scope.
     */
    Stripe.createFetchHttpClient = platformFunctions.createFetchHttpClient;
    /**
     * Create a CryptoProvider which uses the built-in Node crypto libraries for
     * its crypto operations.
     */
    Stripe.createNodeCryptoProvider = platformFunctions.createNodeCryptoProvider;
    /**
     * Creates a CryptoProvider which uses the Subtle Crypto API from the Web
     * Crypto API spec for its crypto operations.
     *
     * A SubtleCrypto interface can optionally be passed in as a parameter. If none
     * is passed, will default to the default `crypto.subtle` object in the global
     * scope.
     */
    Stripe.createSubtleCryptoProvider =
        platformFunctions.createSubtleCryptoProvider;
    Stripe.prototype = {
        // Properties are set in the constructor above
        _appInfo: undefined,
        on: null,
        off: null,
        once: null,
        VERSION: null,
        StripeResource: null,
        webhooks: null,
        errors: null,
        _api: null,
        _prevRequestMetrics: null,
        _emitter: null,
        _enableTelemetry: null,
        _requestSender: null,
        _platformFunctions: null,
        rawRequest(method, path, params, options) {
            return this._requestSender._rawRequest(method, path, params, options);
        },
        /**
         * @private
         */
        _setAuthenticator(key, authenticator) {
            if (key && authenticator) {
                throw new Error("Can't specify both apiKey and authenticator");
            }
            if (!key && !authenticator) {
                throw new Error('Neither apiKey nor config.authenticator provided');
            }
            this._authenticator = key
                ? createApiKeyAuthenticator(key)
                : authenticator;
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setAppInfo(info) {
            if (info && typeof info !== 'object') {
                throw new Error('AppInfo must be an object.');
            }
            if (info && !info.name) {
                throw new Error('AppInfo.name is required');
            }
            info = info || {};
            this._appInfo = APP_INFO_PROPERTIES.reduce((accum, prop) => {
                if (typeof info[prop] == 'string') {
                    accum = accum || {};
                    accum[prop] = info[prop];
                }
                return accum;
            }, {});
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setApiField(key, value) {
            this._api[key] = value;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getApiField(key) {
            return this._api[key];
        },
        setClientId(clientId) {
            this._clientId = clientId;
        },
        getClientId() {
            return this._clientId;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getConstant: (c) => {
            switch (c) {
                case 'DEFAULT_HOST':
                    return DEFAULT_HOST;
                case 'DEFAULT_PORT':
                    return DEFAULT_PORT;
                case 'DEFAULT_BASE_PATH':
                    return DEFAULT_BASE_PATH;
                case 'DEFAULT_API_VERSION':
                    return DEFAULT_API_VERSION;
                case 'DEFAULT_TIMEOUT':
                    return DEFAULT_TIMEOUT;
                case 'MAX_NETWORK_RETRY_DELAY_SEC':
                    return MAX_NETWORK_RETRY_DELAY_SEC;
                case 'INITIAL_NETWORK_RETRY_DELAY_SEC':
                    return INITIAL_NETWORK_RETRY_DELAY_SEC;
            }
            return Stripe[c];
        },
        getMaxNetworkRetries() {
            return this.getApiField('maxNetworkRetries');
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setApiNumberField(prop, n, defaultVal) {
            const val = validateInteger(prop, n, defaultVal);
            this._setApiField(prop, val);
        },
        getMaxNetworkRetryDelay() {
            return MAX_NETWORK_RETRY_DELAY_SEC;
        },
        getInitialNetworkRetryDelay() {
            return INITIAL_NETWORK_RETRY_DELAY_SEC;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         *
         * Gets a JSON version of a User-Agent and uses a cached version for a slight
         * speed advantage.
         */
        getClientUserAgent(cb) {
            return this.getClientUserAgentSeeded(Stripe.USER_AGENT, cb);
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         *
         * Gets a JSON version of a User-Agent by encoding a seeded object and
         * fetching a uname from the system.
         */
        getClientUserAgentSeeded(seed, cb) {
            this._platformFunctions.getUname().then((uname) => {
                var _a;
                const userAgent = {};
                for (const field in seed) {
                    if (!Object.prototype.hasOwnProperty.call(seed, field)) {
                        continue;
                    }
                    userAgent[field] = encodeURIComponent((_a = seed[field]) !== null && _a !== void 0 ? _a : 'null');
                }
                // URI-encode in case there are unusual characters in the system's uname.
                userAgent.uname = encodeURIComponent(uname || 'UNKNOWN');
                const client = this.getApiField('httpClient');
                if (client) {
                    userAgent.httplib = encodeURIComponent(client.getClientName());
                }
                if (this._appInfo) {
                    userAgent.application = this._appInfo;
                }
                cb(JSON.stringify(userAgent));
            });
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getAppInfoAsString() {
            if (!this._appInfo) {
                return '';
            }
            let formatted = this._appInfo.name;
            if (this._appInfo.version) {
                formatted += `/${this._appInfo.version}`;
            }
            if (this._appInfo.url) {
                formatted += ` (${this._appInfo.url})`;
            }
            return formatted;
        },
        getTelemetryEnabled() {
            return this._enableTelemetry;
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _prepResources() {
            for (const name in resources) {
                if (!Object.prototype.hasOwnProperty.call(resources, name)) {
                    continue;
                }
                // @ts-ignore
                this[pascalToCamelCase(name)] = new resources[name](this);
            }
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _getPropsFromConfig(config) {
            // If config is null or undefined, just bail early with no props
            if (!config) {
                return {};
            }
            // config can be an object or a string
            const isString = typeof config === 'string';
            const isObject = config === Object(config) && !Array.isArray(config);
            if (!isObject && !isString) {
                throw new Error('Config must either be an object or a string');
            }
            // If config is a string, we assume the old behavior of passing in a string representation of the api version
            if (isString) {
                return {
                    apiVersion: config,
                };
            }
            // If config is an object, we assume the new behavior and make sure it doesn't contain any unexpected values
            const values = Object.keys(config).filter((value) => !ALLOWED_CONFIG_PROPERTIES.includes(value));
            if (values.length > 0) {
                throw new Error(`Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(', ')}`);
            }
            return config;
        },
        parseEventNotification(payload, header, secret, tolerance, cryptoProvider, receivedAt
        // this return type is ignored?? picks up types from `types/index.d.ts` instead
        ) {
            // parses and validates the event payload all in one go
            const eventNotification = this.webhooks.constructEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt);
            // Parse string context into StripeContext object if present
            if (eventNotification.context) {
                eventNotification.context = StripeContext.parse(eventNotification.context);
            }
            eventNotification.fetchEvent = () => {
                return this._requestSender._rawRequest('GET', `/v2/core/events/${eventNotification.id}`, undefined, {
                    stripeContext: eventNotification.context,
                }, ['fetch_event']);
            };
            eventNotification.fetchRelatedObject = () => {
                if (!eventNotification.related_object) {
                    return Promise.resolve(null);
                }
                return this._requestSender._rawRequest('GET', eventNotification.related_object.url, undefined, {
                    stripeContext: eventNotification.context,
                }, ['fetch_related_object']);
            };
            return eventNotification;
        },
    };
    return Stripe;
}

const Stripe = createStripe(new NodePlatformFunctions());

const prerender = false;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const GHL_WEBHOOK = "https://services.leadconnectorhq.com/hooks/qS83M3cJvj01NjchLqjy/webhook-trigger/2d374217-8302-4e79-95c9-4786777a4a29";
const POST = async ({ request }) => {
  try {
    const { amount, currency, metadata } = await request.json();
    const stripeMetadata = {};
    if (metadata?.company_name) stripeMetadata.company_name = String(metadata.company_name).slice(0, 200);
    if (metadata?.invoice_number) stripeMetadata.invoice_number = String(metadata.invoice_number).slice(0, 500);
    if (metadata?.invoice_amount) stripeMetadata.invoice_amount = String(metadata.invoice_amount).slice(0, 50);
    if (metadata?.convenience_fee) stripeMetadata.convenience_fee = String(metadata.convenience_fee).slice(0, 50);
    if (metadata?.service_type) stripeMetadata.service_type = String(metadata.service_type).slice(0, 100);
    if (metadata?.notes) stripeMetadata.notes = String(metadata.notes).slice(0, 500);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: stripeMetadata
    });
    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const PUT = async ({ request }) => {
  try {
    const { company_name, invoice_number, service_needed, notes, amount, invoice_amount, convenience_fee } = await request.json();
    fetch(GHL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company_name: String(company_name || "").slice(0, 200),
        invoice_number: String(invoice_number || "").slice(0, 500),
        service_needed: String(service_needed || "").slice(0, 100),
        notes: String(notes || "").slice(0, 500),
        amount: String(amount || ""),
        invoice_amount: String(invoice_amount || ""),
        convenience_fee: String(convenience_fee || "")
      })
    }).catch(() => {
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    PUT,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
