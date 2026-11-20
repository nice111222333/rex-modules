function e(e, t, l, n, r, s, i) {
    try {
        var o = e[s](i), a = o.value;
    } catch (e) {
        l(e);
        return;
    }
    o.done ? t(a) : Promise.resolve(a).then(n, r);
}
function t(t) {
    return function() {
        var l = this, n = arguments;
        return new Promise(function(r, s) {
            var i = t.apply(l, n);
            function o(t) {
                e(i, r, s, o, a, "next", t);
            }
            function a(t) {
                e(i, r, s, o, a, "throw", t);
            }
            o(void 0);
        });
    };
}
WidgetMetadata = {
    id: 'bob-subtitle-aggregator',
    title: '字幕聚合',
    description: "多源字幕搜索：assrt（射手网）+ OpenSubtitles + 字幕库（srtku.com）。字幕服务由 assrt.net 提供。使用前请在全局参数中填写自己的 Assrt Token 和/或 OpenSubtitles Api-Key；字幕库无需配置，默认作为第三源补充老剧、冷门剧。注意：OpenSubtitles 下载链接需实时生成，每个搜索最多生成前 3 条，会消耗账号每日下载额度（免费账号 20 次/天）。assrt 与字幕库的下载链接均为实时生成、有效期短，若下载失败请重新运行加载字幕。",
    author: 'v7777',
    site: 'https://assrt.net',
    version: "1.1.2",
    requiredVersion: '0.0.2',
    detailCacheDuration: 60,
    globalParams: [
        {
            name: 'assrtToken',
            title: 'Assrt Token',
            type: 'input',
            description: 'assrt.net 用户中心 API 页的 32 位密钥（需先注册并激活账号）',
            value: ''
        },
        {
            name: 'assrtBaseUrl',
            title: 'Assrt 接口地址',
            type: 'constant',
            description: '主域名不可达时可改为 https://api.makedie.me/v1',
            value: 'https://api.assrt.net/v1'
        },
        {
            name: 'osApiKey',
            title: 'OpenSubtitles Api-Key',
            type: 'input',
            description: '在 opensubtitles.com 的 API consumers 页面创建 consumer 后获得',
            value: ''
        },
        {
            name: 'osUsername',
            title: 'OpenSubtitles 用户名',
            type: 'input',
            description: '可选；填写后下载额度从 5/天 提升到 20/天',
            value: ''
        },
        {
            name: 'osPassword',
            title: 'OpenSubtitles 密码',
            type: 'input',
            description: '可选；仅用于向 OpenSubtitles 登录换取下载 token',
            value: ''
        },
        {
            name: 'zimukuBaseUrl',
            title: '字幕库地址',
            type: 'constant',
            description: '字幕库主站地址；其域名变更时可改为新域名',
            value: 'https://srtku.com'
        },
        {
            name: 'sourceOrder',
            title: '字幕源顺序',
            type: 'enumeration',
            value: 'assrt-first',
            enumOptions: [
                {
                    title: 'assrt 优先',
                    value: 'assrt-first'
                },
                {
                    title: 'OpenSubtitles 优先',
                    value: 'os-first'
                },
                {
                    title: '仅 assrt',
                    value: 'assrt-only'
                },
                {
                    title: '仅 OpenSubtitles',
                    value: 'os-only'
                },
                {
                    title: '仅字幕库',
                    value: 'zimuku-only'
                }
            ]
        },
        {
            name: 'resultCount',
            title: '字幕结果数量',
            type: 'count',
            value: '10'
        }
    ],
    modules: [
        {
            type: 'subtitle',
            id: 'loadSubtitle',
            title: '加载字幕',
            functionName: 'loadSubtitle',
            cacheDuration: 300,
            params: []
        }
    ]
};
let l = '[字幕聚合]';
function n(e) {
    var t;
    if (!e) return null;
    if ('number' == typeof e.statusCode) return e.statusCode;
    if ('number' == typeof e.status) return e.status;
    let l = /HTTP (\d{3})/.exec(String(null != (t = e.message) ? t : e));
    return l ? Number(l[1]) : null;
}
function r(e) {
    return new Promise((t)=>{
        'function' == typeof setTimeout ? setTimeout(t, e) : t();
    });
}
function s(e) {
    if (!e) return '未知错误';
    if ('string' == typeof e) return e;
    let t = [];
    if (e.name && t.push(String(e.name)), e.message && t.push(String(e.message)), e.statusCode ? t.push(`HTTP ${e.statusCode}`) : 'number' == typeof e.status && t.push(`status=${e.status}`), t.length > 0) return t.join(' ');
    try {
        return JSON.stringify(e);
    } catch (t) {
        return String(e);
    }
}
function i(e) {
    return String(e).padStart(2, '0');
}
let o = {
    match: 0,
    unknown: 1,
    mismatch: 2
};
function a(e) {
    var t, l;
    let n = parseInt(null != (t = e.episode) ? t : '', 10);
    if (Number.isNaN(n)) return null;
    let r = parseInt(null != (l = e.season) ? l : '', 10);
    return {
        season: Number.isNaN(r) ? 1 : r,
        episode: n
    };
}
function u(e, t, l) {
    let n = null != e ? e : '';
    if (/e\d{1,3}\s*[-~～]\s*(?:e|ep)?\d{1,3}/i.test(n) || /第\s*\d+\s*[-~～]\s*\d+\s*集/.test(n)) return 'unknown';
    let r = /s(\d{1,2})e(\d{1,3})/i.exec(n);
    if (r) return Number(r[2]) === l && Number(r[1]) === t ? 'match' : 'mismatch';
    let s = /(\d{1,2})x(\d{1,3})/.exec(n);
    if (s) return Number(s[2]) === l && Number(s[1]) === t ? 'match' : 'mismatch';
    let i = /第\s*(\d{1,3})\s*集/.exec(n);
    if (i) return Number(i[1]) === l ? 'match' : 'mismatch';
    let o = /(?:^|[^a-z0-9])ep?(\d{1,3})(?:[^0-9]|$)/i.exec(n);
    if (o) return Number(o[1]) === l ? 'match' : 'mismatch';
    let a = /\[(\d{1,2})\]/.exec(n);
    return a ? Number(a[1]) === l ? 'match' : 'mismatch' : 'unknown';
}
function c(e) {
    var t, l, n, r, s, i;
    return `${null != (t = null == e || null == (n = e.attributes) ? void 0 : n.release) ? t : ''} ${null != (l = null == e || null == (i = e.attributes) || null == (s = i.files) || null == (r = s[0]) ? void 0 : r.file_name) ? l : ''}`;
}
function f(e, t) {
    return /简|繁|雙|双|中文|chs|cht|zh[-_]/i.test(`${e} ${t}`);
}
let d = 'https://api.opensubtitles.com/api/v1', h = "RexSubtitleAggregator v1.1.2";
function p(e, t) {
    let l = {
        'Api-Key': e,
        'User-Agent': h,
        Accept: 'application/json'
    };
    return t && (l.Authorization = `Bearer ${t}`), l;
}
function m(e, n) {
    return t(function*() {
        var t, r, i;
        let o = (null != (t = e.osApiKey) ? t : '').trim();
        if (o && e.osUsername && e.osPassword) {
            if (!n) {
                let e = yield Widget.storage.get('os_token'), t = Number(null != (r = yield Widget.storage.get('os_token_at')) ? r : 0);
                if (e && t && Date.now() - t < 72000000) return e;
            }
            try {
                let t = null == (i = (yield Widget.http.post(`${d}/login`, {
                    username: e.osUsername,
                    password: e.osPassword
                }, {
                    headers: p(o)
                })).data) ? void 0 : i.token;
                if (t) return yield Widget.storage.set('os_token', t), yield Widget.storage.set('os_token_at', String(Date.now())), console.log(`${l} OpenSubtitles 登录成功，下载额度按账号计算`), t;
                console.warn(`${l} OpenSubtitles 登录未返回 token，改用匿名额度（5 次/天）`);
            } catch (e) {
                console.warn(`${l} OpenSubtitles 登录失败，改用匿名额度（5 次/天）: ${s(e)}`);
            }
        }
    })();
}
function g(e, n, r) {
    return t(function*() {
        let { unauthorized: i, results: f } = yield t(function*() {
            var t, l;
            let s = yield Widget.http.get(`${d}/subtitles`, {
                headers: p(n, r),
                params: ((t)=>{
                    var l, n, r, s, i, o;
                    let a = {}, u = parseInt(null != (l = e.episode) ? l : '', 10), c = parseInt(null != (n = e.season) ? n : '', 10);
                    Number.isNaN(u) || (a.episode_number = String(u));
                    let f = null == (r = e.imdbId) ? void 0 : r.replace(/^tt/i, '').replace(/^0+/, '');
                    if (f && (a.imdb_id = f), a.languages = t, a.order_by = 'download_count', a.order_direction = 'desc', !f) {
                        let t = null == (o = e.tmdbId) ? void 0 : o.replace(/^(movie|tv)\./, '');
                        t ? a.tmdb_id = t : a.query = (null != (s = null != (i = e.seriesName) ? i : e.title) ? s : '').trim().toLowerCase();
                    }
                    return Number.isNaN(c) || (a.season_number = String(c)), e.type && (a.type = 'tv' === e.type ? 'episode' : 'movie'), a;
                })('zh-cn,zh-tw')
            });
            return 401 === s.statusCode ? {
                unauthorized: !0,
                results: []
            } : {
                unauthorized: !1,
                results: null != (t = null == (l = s.data) ? void 0 : l.data) ? t : []
            };
        })();
        if (i) return {
            items: [],
            unauthorized: !0
        };
        let h = a(e), m = h ? [
            ...f
        ].sort((e, t)=>o[u(c(e), h.season, h.episode)] - o[u(c(t), h.season, h.episode)]) : f, g = [];
        for (let e of m.slice(0, 3)){
            var $, b, y, v, w, S, k, z, N, x, _, O;
            let t = null == (b = e.attributes) || null == ($ = b.files) ? void 0 : $[0];
            if (null == t ? void 0 : t.file_id) try {
                let s = yield Widget.http.post(`${d}/download`, {
                    file_id: t.file_id,
                    sub_format: 'srt'
                }, {
                    headers: p(n, r)
                });
                if (401 === s.statusCode) return {
                    items: g,
                    unauthorized: !0
                };
                if (!(null == (k = s.data) ? void 0 : k.link)) {
                    console.warn(`${l} OpenSubtitles 下载链接生成失败 (file_id=${t.file_id})`, null != (_ = null == (O = s.data) ? void 0 : O.message) ? _ : '');
                    continue;
                }
                'number' == typeof s.data.remaining && console.log(`${l} OpenSubtitles 今日剩余额度：${s.data.remaining}`), g.push({
                    id: `os:${t.file_id}`,
                    title: null != (y = null != (v = null != (w = s.data.file_name) ? w : t.file_name) ? v : null == (z = e.attributes) ? void 0 : z.release) ? y : '字幕',
                    lang: function(e) {
                        switch((null != e ? e : '').toLowerCase()){
                            case 'zh-cn':
                                return '简体中文';
                            case 'zh-tw':
                                return '繁体中文';
                            case 'en':
                                return '英语';
                            default:
                                return null != e ? e : '未知语言';
                        }
                    }(null == (N = e.attributes) ? void 0 : N.language),
                    count: null != (S = null == (x = e.attributes) ? void 0 : x.download_count) ? S : 0,
                    url: s.data.link
                });
            } catch (e) {
                console.warn(`${l} OpenSubtitles 下载链接请求异常 (file_id=${t.file_id}): ${s(e)}`);
            }
        }
        return console.log(`${l} OpenSubtitles：命中 ${f.length} 条 → 生成 ${g.length} 条直链`), {
            items: g,
            unauthorized: !1
        };
    })();
}
let $ = !1;
class b {
    absorb(e) {
        let t;
        if (!e) return;
        let l = '';
        for (let t of Object.keys(e))'set-cookie' === t.toLowerCase() && (l = e[t]);
        if (!l) return;
        let n = new Set([
            'expires',
            'path',
            'domain',
            'max-age',
            'samesite',
            'secure',
            'httponly'
        ]), r = /([A-Za-z0-9_.\-]+)=([^;,]*)/g;
        for(; t = r.exec(l);)n.has(t[1].toLowerCase()) || this.jar.set(t[1], t[2].trim());
    }
    get(e) {
        return t(function*(e, t = {}) {
            let l = {
                'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
            }, n = [
                ...this.jar.entries()
            ].map(([e, t])=>`${e}=${t}`).join('; ');
            n && (l.Cookie = n), t.referer && (l.Referer = t.referer);
            try {
                var r;
                let n = yield Widget.http.get(e, {
                    headers: l,
                    allow_redirects: null == (r = t.allowRedirects) || r
                });
                this.absorb(n.headers);
                let s = n.data;
                return {
                    status: 'number' == typeof n.statusCode ? n.statusCode : 200,
                    text: 'string' == typeof s ? s : String(null != s ? s : '')
                };
            } catch (t) {
                let e = this.recoverFromError(t);
                if (e) return e;
                throw t;
            }
        }).apply(this, arguments);
    }
    recoverFromError(e) {
        var t, r, s, i, o;
        if (!e || 'object' != typeof e) return null;
        for (let t of [
            e.headers,
            null == (r = e.response) ? void 0 : r.headers,
            e.responseHeaders
        ])t && this.absorb(t);
        let a = null != (t = n(e)) ? t : 0, u = [
            e.data,
            e.body,
            e.responseText,
            e.text,
            null == (s = e.response) ? void 0 : s.data,
            null == (i = e.response) ? void 0 : i.body,
            null == (o = e.response) ? void 0 : o.responseText
        ];
        if (!$) {
            $ = !0;
            let t = u.map((e, t)=>`#${t}:${typeof e}${'string' == typeof e ? `(${e.length})` : ''}`).join(' ');
            console.log(`${l} 字幕库：请求异常探针 keys=[${Object.keys(e).join(',')}] status=${a} 候选体 ${t}`);
        }
        for (let e of u)if ('string' == typeof e && e.length > 0) return {
            status: a,
            text: e
        };
        return null;
    }
    constructor(){
        var e;
        e = new Map(), "jar" in this ? Object.defineProperty(this, "jar", {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : this.jar = e;
    }
}
function y(e, t) {
    var l;
    if (/^https?:\/\//i.test(t)) return t;
    let n = /^(https?:\/\/[^/?#]+)(\/[^?#]*)?/.exec(e);
    if (!n) return t;
    let r = n[1];
    if (t.startsWith('//')) return `https:${t}`;
    if (t.startsWith('/')) return r + t;
    if (t.startsWith('?') || t.startsWith('#')) return e.split(/[?#]/)[0] + t;
    let s = null != (l = n[2]) ? l : '/';
    return r + (s.endsWith('/') ? s : s.slice(0, s.lastIndexOf('/') + 1)) + t;
}
let v = RegExp("self\\.location\\s*=\\s*([\"'])(.*?)\\1\\s*\\+\\s*stringToHex\\(", "is"), w = RegExp("src\\s*=\\s*([\"'])data:image\\/[^;\"']+;base64,(.*?)\\1", "is"), S = [
    [
        '0',
        8,
        '3c 7e e7 e7 c3 cb db cb c3 c3 e7 e7 7e 3c'
    ],
    [
        '1',
        7,
        '3c 7c 7c 1c 1c 1c 1c 1c 1c 1c 1c 1c 7f 7f'
    ],
    [
        '2',
        8,
        '7e fe 87 03 03 03 07 06 0c 18 30 60 ff ff'
    ],
    [
        '3',
        8,
        '7e fe 87 03 03 1f 1e 1e 03 03 03 87 ff 7e'
    ],
    [
        '4',
        9,
        '01c 01c 03c 03c 02c 06c 0cc 0cc 18c 1ff 1ff 00e 00c 00c'
    ],
    [
        '5',
        8,
        '7e 7e 60 60 7c 7e 7f 43 03 03 03 87 fe 7c'
    ],
    [
        '6',
        8,
        '3e 7e 72 e0 e0 dc fe ff c3 c3 c3 e7 7f 7e'
    ],
    [
        '7',
        8,
        'ff ff 06 06 06 0c 0c 0c 18 18 18 18 18 30'
    ],
    [
        '8',
        8,
        '7e 7e e7 c3 c3 7e 7e 7e c3 c3 c3 e7 ff 7e'
    ],
    [
        '9',
        8,
        '7e 7e e7 c3 c3 c3 ff 7f 3b 07 07 4e 7e 7c'
    ]
].map(([e, t, l])=>{
    let n = l.split(' ').map((e)=>parseInt(e, 16));
    return {
        digit: e,
        w: t,
        h: n.length,
        rows: n
    };
});
function k(e, n, r) {
    return t(function*() {
        let t = r;
        for(let r = 0; r <= 5; r++){
            let r, s = yield e.get(n, {
                referer: t
            }), i = function(e) {
                let t = v.exec(e);
                if (!t) return null;
                let l = w.exec(e);
                return {
                    prefix: t[2],
                    imageB64: l ? l[2] : ''
                };
            }(s.text);
            if (!i) {
                if (s.status >= 400) throw Error(`字幕库请求失败 HTTP ${s.status} (${n})`);
                return s.text;
            }
            i.imageB64 ? (r = function(e) {
                let t = function(e) {
                    let t = e.length, l = t > 0 ? e[0].length : 0, n = Array(l).fill(0);
                    for(let r = 0; r < l; r++)for(let l = 0; l < t; l++)e[l][r] && n[r]++;
                    let r = [], s = null;
                    for(let e = 0; e <= l; e++){
                        let t = e < l ? n[e] : 0;
                        t > 0 && null === s ? s = e : 0 === t && null !== s && (e - s >= 3 && r.push([
                            s,
                            e - 1
                        ]), s = null);
                    }
                    let i = [];
                    for (let [l, n] of r){
                        let r = t, s = -1;
                        for(let i = 0; i < t; i++)for(let t = l; t <= n; t++)e[i][t] && (i < r && (r = i), i > s && (s = i));
                        if (s < 0) continue;
                        let o = [];
                        for(let t = r; t <= s; t++){
                            let r = 0;
                            for(let s = l; s <= n; s++)r = r << 1 | !!e[t][s];
                            o.push(r);
                        }
                        i.push({
                            w: n - l + 1,
                            h: s - r + 1,
                            rows: o
                        });
                    }
                    return i;
                }(function(e) {
                    if (e.length < 54 || 0x42 !== e[0] || 0x4d !== e[1]) throw Error('云锁验证码不是 BMP 图片');
                    let t = new DataView(e.buffer, e.byteOffset, e.byteLength), l = t.getUint32(10, !0), n = t.getInt32(18, !0), r = t.getInt32(22, !0), s = t.getUint16(28, !0), i = t.getUint32(30, !0);
                    if (n <= 0 || 0 === r || 24 !== s || 0 !== i) throw Error(`云锁验证码 BMP 格式不支持 (w=${n} h=${r} bpp=${s} comp=${i})`);
                    let o = Math.abs(r), a = 4 * Math.floor((3 * n + 3) / 4), u = [];
                    for(let t = 0; t < o; t++){
                        let s = l + (r > 0 ? o - 1 - t : t) * a, i = [];
                        for(let t = 0; t < n; t++){
                            var c, f, d;
                            let l = s + 3 * t;
                            i.push((c = e[l + 2], f = e[l + 1], d = e[l], f > c + 18 && f > d + 18 && f < 190));
                        }
                        u.push(i);
                    }
                    return u;
                }(e));
                if (5 !== t.length) throw Error(`云锁验证码数字个数异常（识别到 ${t.length} 个）`);
                let l = '';
                for (let e of t){
                    let t = S.filter((t)=>t.w === e.w && t.h === e.h), n = t.length > 0 ? t : S, r = n[0], s = 1 / 0;
                    for (let t of n){
                        let l = (Math.abs(e.w - t.w) + Math.abs(e.h - t.h)) * 100, n = Math.min(e.h, t.h);
                        for(let r = 0; r < n; r++)l += function(e) {
                            let t = 0, l = e;
                            for(; l;)l &= l - 1, t++;
                            return t;
                        }(e.rows[r] ^ t.rows[r]);
                        l < s && (s = l, r = t);
                    }
                    if (s > Math.max(8, Math.floor(e.w * e.h / 3))) throw Error('云锁验证码识别置信度不足');
                    l += r.digit;
                }
                return l;
            }(function(e) {
                let t = e.replace(/[^A-Za-z0-9+/=]/g, ''), l = [], n = 0, r = 0;
                for (let e of t){
                    if ('=' === e) break;
                    let t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.indexOf(e);
                    !(t < 0) && (n = n << 6 | t, (r += 6) >= 8 && (r -= 8, l.push(n >> r & 0xff)));
                }
                return new Uint8Array(l);
            }(i.imageB64)), console.log(`${l} 字幕库：云锁图形验证已解出（${r.length} 位数字）`)) : (r = `${800 + Math.floor(1120 * Math.random())},${600 + Math.floor(480 * Math.random())}`, console.log(`${l} 字幕库：云锁坐标验证已应答`));
            let o = encodeURI(y(n, i.prefix + [
                ...r
            ].map((e)=>e.charCodeAt(0).toString(16)).join('')));
            try {
                yield e.get(o, {
                    referer: n,
                    allowRedirects: !1
                });
            } catch (t) {
                try {
                    yield e.get(o, {
                        referer: n
                    });
                } catch (e) {}
            }
            t = n;
        }
        throw Error('字幕库云锁验证多次未通过');
    })();
}
function z(e, l) {
    return t(function*() {
        let t = yield Widget.html.load(e), n = [], r = new Map();
        return t('tr').each((e, s)=>{
            var i, o, a, u;
            let c = t(s), f = c.find('a[href*="/detail/"]').first();
            if (!f || 0 === f.length) return;
            let d = String(null != (i = f.attr('href')) ? i : '');
            if (!d) return;
            let h = (function(e) {
                let t, l = [], n = (e)=>{
                    l.includes(e) || l.push(e);
                }, r = /<img\b[^>]*>/gi;
                for(; t = r.exec(e);){
                    let e = t[0].toLowerCase();
                    (e.includes('hongkong') || e.includes('cht') || e.includes('繁')) && n('zho-TW'), (e.includes('china') || e.includes('jollyroger') || e.includes('chs') || e.includes('简')) && n('zho-CN'), (e.includes('english') || e.includes('英文')) && n('eng');
                }
                let s = e.toLowerCase();
                return /cht|big5|繁体|繁體/.test(s) && n('zho-TW'), /chs|简体|簡體|\bgb\b/.test(s) && n('zho-CN'), /\beng(?:lish)?\b|英文/.test(s) && n('eng'), l;
            })(String(null != (o = c.html()) ? o : '')).filter((e)=>'eng' !== e);
            if (0 === h.length) return;
            let p = String(null != (a = null != (u = f.attr('title')) ? u : f.text()) ? a : '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().replace(/\.(srt|ass|ssa|vtt|zip|rar|7z)$/i, '');
            if (!p) return;
            let m = y(l, d), g = r.get(m);
            if (g) {
                for (let e of h)g.langs.add(e);
                return;
            }
            let $ = {
                detailUrl: m,
                release: p,
                langs: new Set(h)
            };
            r.set(m, $), n.push($);
        }), n;
    })();
}
loadSubtitle = (e)=>t(function*() {
        var c, d, h, p;
        let $ = Math.max(1, Math.min(15, parseInt(null != (c = e.resultCount) ? c : '10', 10) || 10)), v = null != (d = e.sourceOrder) ? d : 'assrt-first', w = !!(null != (h = e.assrtToken) ? h : '').trim(), S = !!(null != (p = e.osApiKey) ? p : '').trim(), N = 'os-only' === v ? [
            'os'
        ] : 'assrt-only' === v ? [
            'assrt'
        ] : 'zimuku-only' === v ? [
            'zimuku'
        ] : 'os-first' === v ? [
            'os',
            'assrt',
            'zimuku'
        ] : [
            'assrt',
            'os',
            'zimuku'
        ];
        if (0 === N.filter((e)=>'zimuku' === e || ('assrt' === e ? w : S)).length) return console.error(`${l} 当前顺序下没有可用的字幕源：请在模块的全局参数中填写 Assrt Token 或 OpenSubtitles Api-Key，或把字幕源顺序改为包含字幕库，本次返回空结果`), [];
        let x = {
            assrt: 'assrt',
            os: 'OpenSubtitles',
            zimuku: '字幕库'
        }, _ = [];
        for (let c of N){
            if (_.length >= $) break;
            if ('assrt' === c && !w) {
                console.log(`${l} 跳过 assrt：未填写 Assrt Token`);
                continue;
            }
            if ('os' === c && !S) {
                console.log(`${l} 跳过 OpenSubtitles：未填写 Api-Key`);
                continue;
            }
            try {
                let d = 'assrt' === c ? yield function(e) {
                    return t(function*() {
                        var c, d, h, p, m, g, $, b, y, v, w, S, k, z, N, x, _, O, A, C, W, T, U, M;
                        let j = (null != (c = e.assrtToken) ? c : '').trim(), I = (e.assrtBaseUrl || 'https://api.assrt.net/v1').replace(/\/$/, ''), P = function(e) {
                            var t, l, n, r, s, o, a;
                            let u = (null != (t = e.seriesName) ? t : '').trim(), c = (null != (l = e.title) ? l : '').trim(), f = u || c, d = [], h = (e)=>{
                                let t = e.trim();
                                t.length >= 3 && !d.includes(t) && d.push(t);
                            };
                            if (!f) return d;
                            let p = parseInt(null != (n = e.season) ? n : '', 10), m = parseInt(null != (r = e.episode) ? r : '', 10), g = ('tv' === e.type || !Number.isNaN(m)) && !Number.isNaN(m), $ = Number.isNaN(p) ? 1 : p, b = '', y = null != (s = null != (o = e.videoUrl) ? o : e.link) ? s : '';
                            if (y) try {
                                let e = decodeURIComponent(null != (a = y.split(/[?#]/)[0].split('/').pop()) ? a : '').replace(/\.[a-z0-9]{2,5}$/i, '');
                                e.length >= 10 && (b = e);
                            } catch (e) {}
                            return g ? (h(`${f} S${i($)}E${i(m)}`), b && h(b), h(f), h(`${f} 第${$}季第${m}集`)) : (h(f), b && h(b), 'tv' !== e.type || Number.isNaN(p) || h(`${f} 第${p}季`)), c && c !== f && h(c), d.slice(0, 4);
                        }(e), L = a(e);
                        if (0 === P.length) return console.warn(`${l} assrt 跳过：没有可用的搜索关键词（标题为空）`), [];
                        let q = [], E = 0, B = !1;
                        for(let e = 0; e < P.length && !(E >= 5); e++){
                            E++;
                            let n = yield function(e, n, r) {
                                return t(function*() {
                                    var t, s, i;
                                    let o = (yield Widget.http.get(`${e}/sub/search`, {
                                        params: {
                                            token: n,
                                            q: r,
                                            cnt: '15'
                                        }
                                    })).data;
                                    return o && 'number' == typeof o.status && 0 !== o.status ? 30900 === o.status ? {
                                        subs: [],
                                        quotaHit: !0
                                    } : (console.warn(`${l} assrt 搜索失败 (q="${r}"): status=${o.status} ${null != (i = o.errmsg) ? i : ''}`), {
                                        subs: [],
                                        quotaHit: !1
                                    }) : {
                                        subs: null != (t = null == o || null == (s = o.sub) ? void 0 : s.subs) ? t : [],
                                        quotaHit: !1
                                    };
                                })();
                            }(I, j, P[e]);
                            if (n.quotaHit) {
                                B = !0;
                                break;
                            }
                            if (n.subs.length > 0) {
                                q = n.subs;
                                break;
                            }
                        }
                        if (B) return console.error(`${l} assrt 配额超限（错误 30900），本次跳过 assrt，请稍后再试`), [];
                        if (0 === q.length) return console.log(`${l} assrt 无结果（关键词：${P.join(' / ')}）`), [];
                        L && (q = [
                            ...q
                        ].sort((e, t)=>{
                            var l, n, r, s, i, a;
                            return o[u(`${null != (l = e.native_name) ? l : ''} ${null != (n = e.videoname) ? n : ''} ${null != (r = e.filename) ? r : ''}`, L.season, L.episode)] - o[u(`${null != (s = t.native_name) ? s : ''} ${null != (i = t.videoname) ? i : ''} ${null != (a = t.filename) ? a : ''}`, L.season, L.episode)];
                        }));
                        let K = [], H = new Set(), R = (e)=>{
                            !e.url || H.has(e.url) || (H.add(e.url), K.push(e));
                        }, D = 0, F = 0, J = 0;
                        for (let e of q){
                            let i = null != (d = null == (y = e.lang) ? void 0 : y.desc) ? d : '中文', o = null != (h = null != (p = null != (m = e.id) ? m : e.sub_id) ? p : e.sid) ? h : e.subId;
                            if (L && 'mismatch' === u(`${null != (g = e.native_name) ? g : ''} ${null != ($ = e.videoname) ? $ : ''} ${null != (b = e.filename) ? b : ''}`, L.season, L.episode)) {
                                F++;
                                continue;
                            }
                            if (e.url) {
                                R({
                                    id: `assrt:${null != o ? o : 'na'}`,
                                    title: e.native_name || e.videoname || e.filename || '字幕',
                                    lang: i,
                                    count: 0,
                                    url: e.url
                                });
                                continue;
                            }
                            if (null == o) {
                                if (J++, console.log(`${l} assrt 跳过无 id 的搜索结果：${null != (v = null != (w = null != (S = e.native_name) ? S : e.videoname) ? w : e.filename) ? v : '(无标题)'}`), J <= 2) {
                                    let t = '(unserializable)';
                                    try {
                                        t = JSON.stringify(e).slice(0, 600);
                                    } catch (e) {}
                                    console.log(`${l} assrt 无 id 条目探针 keys=[${Object.keys(e).join(',')}]：${t}`);
                                }
                                continue;
                            }
                            if (!(D >= 6)) {
                                D++;
                                try {
                                    D > 1 && (yield r(300));
                                    let s = yield function(e, l, s) {
                                        return t(function*() {
                                            let t = null;
                                            for(let i = 0; i < 2; i++)try {
                                                return (yield Widget.http.get(`${e}/sub/detail`, {
                                                    params: {
                                                        token: l,
                                                        id: String(s)
                                                    }
                                                })).data;
                                            } catch (l) {
                                                t = l;
                                                let e = n(l);
                                                if (0 === i && null !== e && e >= 500) {
                                                    yield r(1200);
                                                    continue;
                                                }
                                                throw l;
                                            }
                                            throw t;
                                        })();
                                    }(I, j, o);
                                    if (s && 'number' == typeof s.status && 0 !== s.status) {
                                        if (30900 === s.status) {
                                            console.error(`${l} assrt 配额超限（错误 30900），停止获取详情`);
                                            break;
                                        }
                                        console.warn(`${l} assrt 详情失败 (id=${o}): status=${s.status} ${null != (_ = s.errmsg) ? _ : ''}`);
                                        continue;
                                    }
                                    let a = null == s || null == (x = s.sub) || null == (N = x.subs) ? void 0 : N[0], c = null != (k = null == a ? void 0 : a.filelist) ? k : [];
                                    c.length > 0 ? c.forEach((e, t)=>{
                                        var l, n, r;
                                        L && 'mismatch' === u(null != (l = e.f) ? l : '', L.season, L.episode) ? F++ : R({
                                            id: `assrt:${o}:${t}`,
                                            title: e.f,
                                            lang: null != (n = null == a || null == (r = a.lang) ? void 0 : r.desc) ? n : i,
                                            count: 0,
                                            url: e.url
                                        });
                                    }) : (null == a ? void 0 : a.url) && !(L && 'mismatch' === u(null != (z = a.filename) ? z : '', L.season, L.episode)) && R({
                                        id: `assrt:${o}`,
                                        title: null != (O = null != (A = null != (C = a.filename) ? C : e.native_name) ? A : e.videoname) ? O : '字幕',
                                        lang: null != (W = null == a || null == (T = a.lang) ? void 0 : T.desc) ? W : i,
                                        count: 0,
                                        url: a.url
                                    });
                                } catch (e) {
                                    console.warn(`${l} assrt 详情请求异常 (id=${o}): ${s(e)}`);
                                }
                            }
                        }
                        let V = 0;
                        if (K.some((e)=>f(e.lang, e.title))) for(let e = K.length - 1; e >= 0; e--)U = K[e].lang, !f(U, M = K[e].title) && /英|english|\beng\b/i.test(`${U} ${M}`) && (K.splice(e, 1), V++);
                        return L && K.sort((e, t)=>o[u(e.title, L.season, L.episode)] - o[u(t.title, L.season, L.episode)]), console.log(`${l} assrt：搜索 ${E} 次、详情 ${D} 次 → ${K.length} 条${L && F > 0 ? `（按集数过滤掉 ${F} 条其他集字幕）` : ''}${J > 0 ? `（跳过 ${J} 条无 id 结果）` : ''}${V > 0 ? `（过滤掉 ${V} 条纯英文字幕）` : ''}`), K;
                    })();
                }(e) : 'os' === c ? yield function(e) {
                    return t(function*() {
                        var t;
                        let n = (null != (t = e.osApiKey) ? t : '').trim(), r = yield m(e, !1), s = yield g(e, n, r);
                        return s.unauthorized && e.osUsername && e.osPassword && (console.warn(`${l} OpenSubtitles token 已失效，重新登录后重试`), yield Widget.storage.remove('os_token'), yield Widget.storage.remove('os_token_at'), r = yield m(e, !0), s = yield g(e, n, r)), s.items;
                    })();
                }(e) : yield function(e) {
                    return t(function*() {
                        let n = (e.zimukuBaseUrl || 'https://srtku.com').replace(/\/$/, ''), c = function(e) {
                            var t, l;
                            let n = [
                                ...new Set([
                                    null != (t = e.seriesName) ? t : '',
                                    null != (l = e.title) ? l : ''
                                ].map((e)=>e.trim()).filter(Boolean))
                            ], r = a(e), s = [];
                            for (let e of n)r && /[a-z]/i.test(e) && s.push(`${e}.S${i(r.season)}`), s.push(e);
                            return [
                                ...new Set(s)
                            ].slice(0, 3);
                        }(e);
                        if (0 === c.length) return console.warn(`${l} 字幕库跳过：没有可用的搜索关键词（标题为空）`), [];
                        let f = new b(), d = a(e), h = [], p = '';
                        for (let e of c){
                            let r = `${n}/search?q=${encodeURIComponent(e)}`, i = yield k(f, r, n);
                            if ((h = yield function(e, n, r, i) {
                                return t(function*() {
                                    let t = yield z(n, r);
                                    if (t.length > 0) return t;
                                    let o = yield Widget.html.load(n), a = [];
                                    o('.item a').each((e, t)=>{
                                        var l;
                                        let n = String(null != (l = o(t).attr('href')) ? l : '');
                                        !n || n.includes('/detail/') || a.includes(n) || a.push(n);
                                    });
                                    let u = [];
                                    for (let t of a.slice(0, 2)){
                                        let n = y(r, t);
                                        try {
                                            let t = yield k(e, n, i);
                                            u.push(...yield z(t, n));
                                        } catch (e) {
                                            console.warn(`${l} 字幕库：剧集页解析失败 (${t}): ${s(e)}`);
                                        }
                                        if (u.length >= 10) break;
                                    }
                                    return u;
                                })();
                            }(f, i, r, n)).length > 0) {
                                p = e;
                                break;
                            }
                        }
                        if (0 === h.length) return console.log(`${l} 字幕库：无结果（关键词：${c.join(' / ')}）`), [];
                        d && (h = h.filter((e)=>'mismatch' !== u(e.release, d.season, d.episode))).sort((e, t)=>o[u(e.release, d.season, d.episode)] - o[u(t.release, d.season, d.episode)]);
                        let m = [], g = 0;
                        for (let e of h){
                            if (g >= 5) break;
                            g++;
                            try {
                                g > 1 && (yield r(200));
                                let t = yield k(f, e.detailUrl, n), s = (yield Widget.html.load(t))('a#down1').attr('href');
                                if (!s) {
                                    console.warn(`${l} 字幕库：详情页没有下载入口 (${e.release})`);
                                    continue;
                                }
                                let i = y(e.detailUrl, String(s)), o = yield k(f, i, e.detailUrl), a = yield Widget.html.load(o), u = '';
                                if (a('a').each((e, t)=>{
                                    var l, n;
                                    u || 'nofollow' === String(null != (l = a(t).attr('rel')) ? l : '').toLowerCase() && (u = String(null != (n = a(t).attr('href')) ? n : ''));
                                }), !u) {
                                    console.warn(`${l} 字幕库：下载页没有最终链接 (${e.release})`);
                                    continue;
                                }
                                let c = /\/detail\/([^/?#]+)/.exec(e.detailUrl), d = c ? c[1].replace(/\.[a-z0-9]+$/i, '') : 'na';
                                m.push({
                                    id: `zimuku:${d}`,
                                    title: e.release,
                                    lang: e.langs.size > 1 ? '中文' : e.langs.has('zho-CN') ? '简体中文' : '繁体中文',
                                    count: 0,
                                    url: y(i, u)
                                });
                            } catch (t) {
                                console.warn(`${l} 字幕库：解析下载链接失败 (${e.release}): ${s(t)}`);
                            }
                        }
                        return console.log(`${l} 字幕库：命中 ${h.length} 条（关键词：${p}）→ 解析 ${m.length} 条直链`), m;
                    })();
                }(e);
                _.push(...d);
            } catch (e) {
                console.error(`${l} ${x[c]} 搜索异常，已忽略该源: ${s(e)}`);
            }
        }
        let O = new Set(), A = _.filter((e)=>!(!e.url || O.has(e.url)) && (O.add(e.url), !0)).slice(0, $);
        return console.log(`${l} 共返回 ${A.length} 条字幕（上限 ${$}）`), A;
    })();
let N = {
    ass: 50,
    srt: 45,
    ssa: 30,
    vtt: 15
}, x = /chs|简|zh[-_.]?cn/i, _ = /cht|繁|zh[-_.]?tw|big5/i, O = /双语|中英|bilingual|chs[&+.]?eng|cht[&+.]?eng/i, A = /\beng\b|english|英文/i;
function C(e) {
    var t;
    if (!e) return null;
    let l = null != (t = e.match(/s(\d{1,2})[\s._-]*e(\d{1,3})/i)) ? t : e.match(/(\d{1,2})x(\d{1,3})/);
    return l ? `s${l[1].padStart(2, '0')}e${l[2].padStart(2, '0')}` : null;
}
resolveSubtitleArchive = (e)=>t(function*() {
        var t, n, r, s, i;
        let o, a = null != (t = e.subtitleFiles) ? t : e.files;
        if (!a) return null;
        let u = [];
        try {
            u = JSON.parse(a);
        } catch (e) {
            return null;
        }
        let c = u.filter((e)=>e.extension in N);
        if (0 === c.length) return null;
        if (1 === c.length) return c[0].path;
        let f = (null != (n = null != (r = e.subtitleName) ? r : e.archiveName) ? n : '').toLowerCase().replace(/\.[a-z0-9]{2,5}$/, '').split(/[^a-z0-9\u4e00-\u9fff]+/).filter((e)=>e.length >= 3).slice(0, 3), d = {
            episode: null != (s = C(e.subtitleName)) ? s : C(e.archiveName),
            pref: (o = (null != (i = e.subtitleLanguage) ? i : '').toLowerCase()) ? /zh-tw|cht|繁|traditional/.test(o) ? 'cht' : /zh-cn|chs|简|simplified/.test(o) ? 'chs' : /zh|中文|chinese/.test(o) ? 'zh' : 'other' : null,
            titleTokens: f
        }, h = c.map((e)=>({
                file: e,
                score: function(e, t) {
                    var l;
                    let n = null != (l = N[e.extension]) ? l : 0, r = e.name.toLowerCase(), s = O.test(r), i = x.test(r), o = _.test(r);
                    if ('chs' === t.pref ? (i && (n += 30), s && (n += 25), !o || i || s || (n -= 15)) : 'cht' === t.pref ? (o && (n += 30), s && (n += 25), !i || o || s || (n -= 15)) : 'zh' === t.pref && ((i || o) && (n += 20), s && (n += 25)), ('chs' === t.pref || 'cht' === t.pref || 'zh' === t.pref) && !i && !o && !s && A.test(r) && (n -= 20), t.episode) {
                        let l = C(e.name);
                        l === t.episode ? n += 60 : l && (n -= 80);
                    }
                    for (let e of t.titleTokens)r.includes(e) && (n += 8);
                    return e.size && (n += Math.min(3, e.size / 200000)), n;
                }(e, d)
            })).sort((e, t)=>t.score - e.score), p = h[0].score, m = h.filter((e)=>e.score === p).map((e)=>e.file.path);
        return console.log(`${l} 压缩包内选字幕：${h[0].file.name}（得分 ${p}）`), 1 === m.length ? m[0] : {
            files: m
        };
    })();
