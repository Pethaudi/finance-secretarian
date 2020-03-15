import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

    constructor() { }

    isCookieSet(): boolean {
        return document.cookie.length > 0;
    }

    setCookie(val: string) {
        const timestamp = new Date(Date.now() + 24 * 60 * 60 * 1000);
        document.cookie = "val=" + val + ";expires=" + timestamp.toUTCString();
    }

    getCookie(): string {
        return document.cookie.substr(4);
    }

    deleteCookie() {
        document.cookie = "val=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
