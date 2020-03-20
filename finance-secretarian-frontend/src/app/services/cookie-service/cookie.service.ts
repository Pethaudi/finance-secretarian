import { Injectable } from '@angular/core';

/**
 * this services manages the set cookies
 */
@Injectable({
  providedIn: 'root'
})
export class CookieService {

    constructor() { }

    /**
     * checks if a cookie is set
     */
    isCookieSet(): boolean {
        return document.cookie.length > 0;
    }

    /**
     * sets the cookie and overwrites the old one
     * @param val value to set
     */
    setCookie(val: string) {
        const timestamp = new Date(Date.now() + 24 * 60 * 60 * 1000);
        document.cookie = "val=" + val + ";expires=" + timestamp.toUTCString();
    }

    /**
     * returns the value of the cookie
     */
    getCookie(): string {
        return document.cookie.substr(4);
    }

    /**
     * deletes the cookie by setting the expires date to 1970
     */
    deleteCookie() {
        document.cookie = "val=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
