/**
 * The IndexNow key.
 *
 * This is not a secret. The protocol requires the same value to be served at
 * https://www.bonggy.com/<key>.txt, because fetching that file is how the
 * endpoint proves we control the domain. Anyone can read it off the live site,
 * so keeping it out of the repo would buy nothing and only make the key file
 * and the script easy to get out of step.
 *
 * What it does grant is the ability to submit URLs *on this domain* for
 * recrawl. That is the whole blast radius: no content changes, no access to
 * anything. If it is ever abused, rotate it — generate a new one, replace
 * public/<key>.txt, and update this constant.
 *
 *   node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
 */
export const INDEXNOW_KEY = "69fc766757fb5b45c16348b7a4e50278";

/** Where the endpoint looks for the key, to check we own the host. */
export const indexNowKeyPath = `/${INDEXNOW_KEY}.txt`;
