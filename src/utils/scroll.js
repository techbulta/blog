// Scroll to the element named by a URL hash such as "#topics".
// Returns false when the element is not rendered yet.
export function scrollToHash(hash) {
  const element = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!element) return false;
  element.scrollIntoView();
  return true;
}
