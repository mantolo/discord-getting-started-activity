/**
 * @param {AbortController?} abortController
 * @returns {[promise: Promise<unknown>, resolve: () => void, reject: (reason?: any) => void]}
 */
export const createPromise = (abortController) => {
  const arr = [];
  arr.unshift(new Promise(arr.push.bind(arr)));
  const [promise, , reject] = arr;
  abortController?.signal.addEventListener("abort", reject, { once: true });
  abortController &&
    promise.then(() => {
      abortController?.signal.removeEventListener("abort", reject);
    });
  return arr;
};
