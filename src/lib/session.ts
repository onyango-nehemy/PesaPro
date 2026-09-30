
import { useSyncExternalStore } from "react";


const STORAGE_KEY = "pesapro_user_name";

export function setUserName(name: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, name);
    // Let any open tab/component know the value changed.
    window.dispatchEvent(new Event("pesapro-user-name-changed"));
  } catch {

  }
}

export function clearUserName(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("pesapro-user-name-changed"));
  } catch {
    // see note in setUserName
  }
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  // No localStorage on the server, so there's no name to report yet.
  return null;
}

function subscribe(callback: () => void) {
  window.addEventListener("pesapro-user-name-changed", callback);
  return () => window.removeEventListener("pesapro-user-name-changed", callback);
}


export function useUserName(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}