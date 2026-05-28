export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  hasCompletedSetup: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NewUserData = Pick<UserData, "name" | "email" | "password"> &
  Partial<Pick<UserData, "gender" | "age" | "height" | "weight" | "hasCompletedSetup">>;

const REGISTERED_USER_STORAGE_KEY = "endureFitness.registeredUser";
const ACTIVE_USER_STORAGE_KEY = "endureFitness.activeUser";

const canUseLocalStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const createUserId = (email: string) =>
  email.trim().toLowerCase() || `user-${Date.now()}`;

export function saveUserData(userData: NewUserData): UserData {
  const now = new Date().toISOString();
  const user: UserData = {
    id: createUserId(userData.email),
    name: userData.name.trim(),
    email: userData.email.trim().toLowerCase(),
    password: userData.password,
    gender: userData.gender,
    age: userData.age,
    height: userData.height,
    weight: userData.weight,
    hasCompletedSetup: userData.hasCompletedSetup ?? false,
    createdAt: now,
    updatedAt: now,
  };

  if (canUseLocalStorage()) {
    window.localStorage.setItem(REGISTERED_USER_STORAGE_KEY, JSON.stringify(user));
    window.localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(user));
  }

  return user;
}

function loadStoredUser(storageKey: string): UserData | null {
  if (!canUseLocalStorage()) {
    return null;
  }

  const storedUser = window.localStorage.getItem(storageKey);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as UserData;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
}

export function loadUserData(): UserData | null {
  return loadStoredUser(ACTIVE_USER_STORAGE_KEY);
}

export function loadRegisteredUser(): UserData | null {
  return loadStoredUser(REGISTERED_USER_STORAGE_KEY);
}

export function loginUser(email: string, password: string): UserData | null {
  const registeredUser = loadRegisteredUser();

  if (
    !registeredUser ||
    registeredUser.email !== email.trim().toLowerCase() ||
    registeredUser.password !== password
  ) {
    return null;
  }

  if (canUseLocalStorage()) {
    window.localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(registeredUser));
  }

  return registeredUser;
}

export function updateUserData(updates: Partial<NewUserData>): UserData | null {
  const currentUser = loadUserData() ?? loadRegisteredUser();

  if (!currentUser) {
    return null;
  }

  const updatedUser: UserData = {
    ...currentUser,
    ...updates,
    name: updates.name?.trim() ?? currentUser.name,
    email: updates.email?.trim().toLowerCase() ?? currentUser.email,
    password: updates.password ?? currentUser.password,
    updatedAt: new Date().toISOString(),
  };

  if (canUseLocalStorage()) {
    window.localStorage.setItem(REGISTERED_USER_STORAGE_KEY, JSON.stringify(updatedUser));
    window.localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(updatedUser));
  }

  return updatedUser;
}

export function clearUserData() {
  if (canUseLocalStorage()) {
    window.localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
  }
}
