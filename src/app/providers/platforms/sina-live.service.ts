import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SinaLiveService {

  constructor(
    private http: HttpClient
  ) { }

  base = '//ing.weibo.com/api/live/flashplayinfo';
  pKey = '22f18e62a05fb5e4fe4000e6e97ced10';
  key = '';
  uri = '';
  query = '';

  buildQueryString(userId, uid, expiresHours = 2) {
    this.query = '';
    const a = {
      id: userId,
      uid: uid,
      fr: 'h5',
      expires: Date.now() + (36e5 * expiresHours)
    };

    function d(a) {
      let b = [];
      for (let c in a) {
        (a[c] === 0 || a[c]) && b.push(c + '=' + encodeURIComponent(a[c]));
      }
      return b.join('&');
    }

    this.query = d(a);
    return this.query.trim();
  }

  getSign(userQueryString) {
    this.key = '';
    this.key = this.a(userQueryString + this.pKey, null, null);
    return this.key;
  }

  buildStreamUri() {
    return 'http:' + this.base + '?' + this.query + '&sign=' + this.key;
  }

  public getStream(uriStr: string): Observable<SinaLiveResponse.RootObject> {
    return this.http.get<SinaLiveResponse.RootObject>(uriStr);
  }


  a(a, b, c) {
    function v(a, b, c) {
      if (!b) {
        return c ? r(a) : s(a);
      }
      return c ? t(b, a) : u(b, a);
    }
    function u(a, b) {
      return p(t(a, b));
    }
    function t(a, b) {
      return o(q(a), q(b));
    }
    function s(a) {
      return p(r(a));
    }
    function r(a) {
      return n(q(a));
    }
    function q(a) {
      return unescape(encodeURIComponent(a));
    }
    function p(a) {
      let b = '0123456789abcdef', c = '', d, e;
      for (e = 0; e < a.length; e += 1) {
        d = a.charCodeAt(e);
        c += b.charAt(d >>> 4 & 15) + b.charAt(d & 15);
      }
      return c;
    }
    function o(a, b) {
      let c, d = m(a), e = [], f = [], g;
      e[15] = f[15] = undefined;
      d.length > 16 && (d = k(d, a.length * 8));
      for (c = 0; c < 16; c += 1) {
        e[c] = d[c] ^ 909522486;
        f[c] = d[c] ^ 1549556828;
      }
      g = k(e.concat(m(b)), 512 + b.length * 8);
      return l(k(f.concat(g), 640));
    }
    // tslint:disable-next-line:no-shadowed-variable
    function n(a) {
      return l(k(m(a), a.length * 8));
    }
    // tslint:disable-next-line:no-shadowed-variable
    function m(a) {
      let b, c = [];
      c[(a.length >> 2) - 1] = undefined;
      for (b = 0; b < c.length; b += 1) {
        c[b] = 0;
      }
      const d = a.length * 8;
      for (b = 0; b < d; b += 8) {
        c[b >> 5] |= (a.charCodeAt(b / 8) & 255) << b % 32;
      }
      return c;
    }
    function l(a) {
      let b, c = '', d = a.length * 32;
      for (b = 0; b < d; b += 8) {
        c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255);
      }
      return c;
    }
    function k(a, b) {
      a[b >> 5] |= 128 << b % 32;
      a[(b + 64 >>> 9 << 4) + 14] = b;
      let c, e, f, k, l, m = 1732584193, n = -271733879, o = -1732584194, p = 271733878;
      for (c = 0; c < a.length; c += 16) {
        e = m;
        f = n;
        k = o;
        l = p;
        m = g(m, n, o, p, a[c], 7, -680876936);
        p = g(p, m, n, o, a[c + 1], 12, -389564586);
        o = g(o, p, m, n, a[c + 2], 17, 606105819);
        n = g(n, o, p, m, a[c + 3], 22, -1044525330);
        m = g(m, n, o, p, a[c + 4], 7, -176418897);
        p = g(p, m, n, o, a[c + 5], 12, 1200080426);
        o = g(o, p, m, n, a[c + 6], 17, -1473231341);
        n = g(n, o, p, m, a[c + 7], 22, -45705983);
        m = g(m, n, o, p, a[c + 8], 7, 1770035416);
        p = g(p, m, n, o, a[c + 9], 12, -1958414417);
        o = g(o, p, m, n, a[c + 10], 17, -42063);
        n = g(n, o, p, m, a[c + 11], 22, -1990404162);
        m = g(m, n, o, p, a[c + 12], 7, 1804603682);
        p = g(p, m, n, o, a[c + 13], 12, -40341101);
        o = g(o, p, m, n, a[c + 14], 17, -1502002290);
        n = g(n, o, p, m, a[c + 15], 22, 1236535329);
        m = h(m, n, o, p, a[c + 1], 5, -165796510);
        p = h(p, m, n, o, a[c + 6], 9, -1069501632);
        o = h(o, p, m, n, a[c + 11], 14, 643717713);
        n = h(n, o, p, m, a[c], 20, -373897302);
        m = h(m, n, o, p, a[c + 5], 5, -701558691);
        p = h(p, m, n, o, a[c + 10], 9, 38016083);
        o = h(o, p, m, n, a[c + 15], 14, -660478335);
        n = h(n, o, p, m, a[c + 4], 20, -405537848);
        m = h(m, n, o, p, a[c + 9], 5, 568446438);
        p = h(p, m, n, o, a[c + 14], 9, -1019803690);
        o = h(o, p, m, n, a[c + 3], 14, -187363961);
        n = h(n, o, p, m, a[c + 8], 20, 1163531501);
        m = h(m, n, o, p, a[c + 13], 5, -1444681467);
        p = h(p, m, n, o, a[c + 2], 9, -51403784);
        o = h(o, p, m, n, a[c + 7], 14, 1735328473);
        n = h(n, o, p, m, a[c + 12], 20, -1926607734);
        m = i(m, n, o, p, a[c + 5], 4, -378558);
        p = i(p, m, n, o, a[c + 8], 11, -2022574463);
        o = i(o, p, m, n, a[c + 11], 16, 1839030562);
        n = i(n, o, p, m, a[c + 14], 23, -35309556);
        m = i(m, n, o, p, a[c + 1], 4, -1530992060);
        p = i(p, m, n, o, a[c + 4], 11, 1272893353);
        o = i(o, p, m, n, a[c + 7], 16, -155497632);
        n = i(n, o, p, m, a[c + 10], 23, -1094730640);
        m = i(m, n, o, p, a[c + 13], 4, 681279174);
        p = i(p, m, n, o, a[c], 11, -358537222);
        o = i(o, p, m, n, a[c + 3], 16, -722521979);
        n = i(n, o, p, m, a[c + 6], 23, 76029189);
        m = i(m, n, o, p, a[c + 9], 4, -640364487);
        p = i(p, m, n, o, a[c + 12], 11, -421815835);
        o = i(o, p, m, n, a[c + 15], 16, 530742520);
        n = i(n, o, p, m, a[c + 2], 23, -995338651);
        m = j(m, n, o, p, a[c], 6, -198630844);
        p = j(p, m, n, o, a[c + 7], 10, 1126891415);
        o = j(o, p, m, n, a[c + 14], 15, -1416354905);
        n = j(n, o, p, m, a[c + 5], 21, -57434055);
        m = j(m, n, o, p, a[c + 12], 6, 1700485571);
        p = j(p, m, n, o, a[c + 3], 10, -1894986606);
        o = j(o, p, m, n, a[c + 10], 15, -1051523);
        n = j(n, o, p, m, a[c + 1], 21, -2054922799);
        m = j(m, n, o, p, a[c + 8], 6, 1873313359);
        p = j(p, m, n, o, a[c + 15], 10, -30611744);
        o = j(o, p, m, n, a[c + 6], 15, -1560198380);
        n = j(n, o, p, m, a[c + 13], 21, 1309151649);
        m = j(m, n, o, p, a[c + 4], 6, -145523070);
        p = j(p, m, n, o, a[c + 11], 10, -1120210379);
        o = j(o, p, m, n, a[c + 2], 15, 718787259);
        n = j(n, o, p, m, a[c + 9], 21, -343485551);
        m = d(m, e);
        n = d(n, f);
        o = d(o, k);
        p = d(p, l);
      }
      return [m, n, o, p];
    }
    function j(a, b, c, d, e, g, h) {
      return f(c ^ (b | ~d), a, b, e, g, h);
    }
    function i(a, b, c, d, e, g, h) {
      return f(b ^ c ^ d, a, b, e, g, h);
    }
    function h(a, b, c, d, e, g, h) {
      return f(b & d | c & ~d, a, b, e, g, h);
    }
    function g(a, b, c, d, e, g, h) {
      return f(b & c | ~b & d, a, b, e, g, h);
    }
    function f(a, b, c, f, g, h) {
      return d(e(d(d(b, a), d(f, h)), g), c);
    }
    function e(a, b) {
      return a << b | a >>> 32 - b;
    }
    function d(a, b) {
      const c = (a & 65535) + (b & 65535)
        , d = (a >> 16) + (b >> 16) + (c >> 16);
      return d << 16 | c & 65535;
    }
    return v(a, b, c);
  }

}
