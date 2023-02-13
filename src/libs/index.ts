import Cookies from 'js-cookie';

export function getUserCookie() {
  const data = Cookies.get('_UserAccess');
  return data ? JSON.parse(data) : null;
}
export function setUserCookie(val: any) {
  const data = JSON.stringify(val);
  Cookies.set('_UserAccess', data);
}
export function removeUserCookie() {
  Cookies.remove('_UserAccess');
}

// export function setUsernameCookie(val: string) {
//   Cookies.set('_Username', val);
// }
// export function getUsernameCookie() {
//   return Cookies.get('_Username');
// }
// export function removeUsernameCookie() {
//   Cookies.remove('_Username');
// }

export function jsonComparator(json1: Record<string, any>, json2: Record<string, any>) {
  if (Object.keys(json1).length !== Object.keys(json2).length) {
    return false;
  }

  return Object.keys(json1).every((key) => json1[key] === json2[key]);
}
