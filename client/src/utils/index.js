export const statusCheck = function statusCheck(res) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res;
};
