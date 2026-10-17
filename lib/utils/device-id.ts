const DEVICE_ID_COOKIE = "ws_device_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

function generateFallbackUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getDeviceId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  // 1. Try reading from cookie
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${DEVICE_ID_COOKIE}=([^;]+)`));
  if (match && match[2]) {
    const cookieVal = decodeURIComponent(match[2]);
    try {
      localStorage.setItem(DEVICE_ID_COOKIE, cookieVal);
    } catch {
      // ignore localStorage errors (e.g. private browsing restrictions)
    }
    return cookieVal;
  }

  // 2. Try reading from localStorage fallback
  try {
    const localVal = localStorage.getItem(DEVICE_ID_COOKIE);
    if (localVal) {
      document.cookie = `${DEVICE_ID_COOKIE}=${encodeURIComponent(localVal)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
      return localVal;
    }
  } catch {
    // ignore
  }

  // 3. Generate a new UUID
  const newId = generateFallbackUUID();
  try {
    localStorage.setItem(DEVICE_ID_COOKIE, newId);
  } catch {
    // ignore
  }
  document.cookie = `${DEVICE_ID_COOKIE}=${encodeURIComponent(newId)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  return newId;
}
