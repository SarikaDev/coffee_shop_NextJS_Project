export const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {
  let url = input.toString();

  // Fix: Remove /rest/v1/ from Supabase client URLs
  if (url.includes("/rest/v1/")) {
    url = url.replace("/rest/v1/", "/");
  }

  return fetch(url, init);
};
