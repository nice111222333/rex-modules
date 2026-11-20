function e(e, t, l, n, r, s, i) {
    try {
        var a = e[s](i), u = a.value;
    } catch (e) {
        l(e);
        return;
    }
    a.done ? t(u) : Promise.resolve(u).then(n, r);
}
function t(t) {
    return function() {
        var l = this, n = arguments;
        return new Promise(function(r, s) {
            var i = t.apply(l, n);
            function a(t) {
                e(i, r, s, a, u, "next", t);
            }
            function u(t) {
                e(i, r, s, a, u, "throw", t);
            }
            a(void 0);
        });
    };
}
WidgetMetadata = {
    id: 'bob-subtitle-aggregator',
    title: '字幕聚合',
    description: "多源字幕搜索：assrt（射手网）+ OpenSubtitles + 字幕库（srtku.com）。字幕服务由 assrt.net 提供。使用前请在全局参数中填写自己的 Assrt Token 和/或 OpenSubtitles Api-Key；字幕库无需配置，默认作为第三源补充老剧、冷门剧。注意：OpenSubtitles 下载链接需实时生成，每个搜索最多生成前 3 条，会消耗账号每日下载额度（免费账号 20 次/天）。assrt 与字幕库的下载链接均为实时生成、有效期短，若下载失败请重新运行加载字幕。",
    author: 'v7777',
    site: 'https://assrt.net',
    version: "1.1.0",
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
    return new Promise((t)=>{
        'function' == typeof setTimeout ? setTimeout(t, e) : t();
    });
}
function r(e) {
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
function s(e) {
    return String(e).padStart(2, '0');
}
let i = {
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
    let a = /(?:^|[^a-z0-9])ep?(\d{1,3})(?:[^0-9]|$)/i.exec(n);
    if (a) return Number(a[1]) === l ? 'match' : 'mismatch';
    let u = /\[(\d{1,2})\]/.exec(n);
    return u ? Number(u[1]) === l ? 'match' : 'mismatch' : 'unknown';
}
function o(e) {
    var t, l, n, r, s, i;
    return `${null != (t = null == e || null == (n = e.attributes) ? void 0 : n.release) ? t : ''} ${null != (l = null == e || null == (i = e.attributes) || null == (s = i.files) || null == (r = s[0]) ? void 0 : r.file_name) ? l : ''}`;
}
function c(e, t) {
    return /简|繁|雙|双|中文|chs|cht|zh[-_]/i.test(`${e} ${t}`);
}
let f = 'https://api.opensubtitles.com/api/v1', d = "RexSubtitleAggregator v1.1.0";
function h(e, t) {
    let l = {
        'Api-Key': e,
        'User-Agent': d,
        Accept: 'application/json'
    };
    return t && (l.Authorization = `Bearer ${t}`), l;
}
function p(e, n) {
    return t(function*() {
        var t, s, i;
        let a = (null != (t = e.osApiKey) ? t : '').trim();
        if (a && e.osUsername && e.osPassword) {
            if (!n) {
                let e = yield Widget.storage.get('os_token'), t = Number(null != (s = yield Widget.storage.get('os_token_at')) ? s : 0);
                if (e && t && Date.now() - t < 72000000) return e;
            }
            try {
                let t = null == (i = (yield Widget.http.post(`${f}/login`, {
                    username: e.osUsername,
                    password: e.osPassword
                }, {
                    headers: h(a)
                })).data) ? void 0 : i.token;
                if (t) return yield Widget.storage.set('os_token', t), yield Widget.storage.set('os_token_at', String(Date.now())), console.log(`${l} OpenSubtitles 登录成功，下载额度按账号计算`), t;
                console.warn(`${l} OpenSubtitles 登录未返回 token，改用匿名额度（5 次/天）`);
            } catch (e) {
                console.warn(`${l} OpenSubtitles 登录失败，改用匿名额度（5 次/天）: ${r(e)}`);
            }
        }
    })();
}
function m(e, n, s) {
    return t(function*() {
        let { unauthorized: c, results: d } = yield t(function*() {
            var t, l;
            let r = yield Widget.http.get(`${f}/subtitles`, {
                headers: h(n, s),
                params: ((t)=>{
                    var l, n, r, s, i, a;
                    let u = {}, o = parseInt(null != (l = e.episode) ? l : '', 10), c = parseInt(null != (n = e.season) ? n : '', 10);
                    Number.isNaN(o) || (u.episode_number = String(o));
                    let f = null == (r = e.imdbId) ? void 0 : r.replace(/^tt/i, '').replace(/^0+/, '');
                    if (f && (u.imdb_id = f), u.languages = t, u.order_by = 'download_count', u.order_direction = 'desc', !f) {
                        let t = null == (a = e.tmdbId) ? void 0 : a.replace(/^(movie|tv)\./, '');
                        t ? u.tmdb_id = t : u.query = (null != (s = null != (i = e.seriesName) ? i : e.title) ? s : '').trim().toLowerCase();
                    }
                    return Number.isNaN(c) || (u.season_number = String(c)), e.type && (u.type = 'tv' === e.type ? 'episode' : 'movie'), u;
                })('zh-cn,zh-tw')
            });
            return 401 === r.statusCode ? {
                unauthorized: !0,
                results: []
            } : {
                unauthorized: !1,
                results: null != (t = null == (l = r.data) ? void 0 : l.data) ? t : []
            };
        })();
        if (c) return {
            items: [],
            unauthorized: !0
        };
        let p = a(e), m = p ? [
            ...d
        ].sort((e, t)=>i[u(o(e), p.season, p.episode)] - i[u(o(t), p.season, p.episode)]) : d, g = [];
        for (let e of m.slice(0, 3)){
            var $, b, y, v, w, S, k, z, N, _, x, O;
            let t = null == (b = e.attributes) || null == ($ = b.files) ? void 0 : $[0];
            if (null == t ? void 0 : t.file_id) try {
                let r = yield Widget.http.post(`${f}/download`, {
                    file_id: t.file_id,
                    sub_format: 'srt'
                }, {
                    headers: h(n, s)
                });
                if (401 === r.statusCode) return {
                    items: g,
                    unauthorized: !0
                };
                if (!(null == (k = r.data) ? void 0 : k.link)) {
                    console.warn(`${l} OpenSubtitles 下载链接生成失败 (file_id=${t.file_id})`, null != (x = null == (O = r.data) ? void 0 : O.message) ? x : '');
                    continue;
                }
                'number' == typeof r.data.remaining && console.log(`${l} OpenSubtitles 今日剩余额度：${r.data.remaining}`), g.push({
                    id: `os:${t.file_id}`,
                    title: null != (y = null != (v = null != (w = r.data.file_name) ? w : t.file_name) ? v : null == (z = e.attributes) ? void 0 : z.release) ? y : '字幕',
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
                    count: null != (S = null == (_ = e.attributes) ? void 0 : _.download_count) ? S : 0,
                    url: r.data.link
                });
            } catch (e) {
                console.warn(`${l} OpenSubtitles 下载链接请求异常 (file_id=${t.file_id}): ${r(e)}`);
            }
        }
        return console.log(`${l} OpenSubtitles：命中 ${d.length} 条 → 生成 ${g.length} 条直链`), {
            items: g,
            unauthorized: !1
        };
    })();
}
class g {
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
            var l;
            let n = {
                'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
            }, r = [
                ...this.jar.entries()
            ].map(([e, t])=>`${e}=${t}`).join('; ');
            r && (n.Cookie = r), t.referer && (n.Referer = t.referer);
            let s = yield Widget.http.get(e, {
                headers: n,
                allow_redirects: null == (l = t.allowRedirects) || l
            });
            this.absorb(s.headers);
            let i = s.data;
            return {
                status: 'number' == typeof s.statusCode ? s.statusCode : 200,
                text: 'string' == typeof i ? i : String(null != i ? i : '')
            };
        }).apply(this, arguments);
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
function $(e, t) {
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
let b = RegExp("self\\.location\\s*=\\s*([\"'])(.*?)\\1\\s*\\+\\s*stringToHex\\(", "is"), y = RegExp("src\\s*=\\s*([\"'])data:image\\/[^;\"']+;base64,(.*?)\\1", "is"), v = [
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
function w(e, n, r) {
    return t(function*() {
        let t = r;
        for(let r = 0; r <= 5; r++){
            let r, s = yield e.get(n, {
                referer: t
            }), i = function(e) {
                let t = b.exec(e);
                if (!t) return null;
                let l = y.exec(e);
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
                        let a = [];
                        for(let t = r; t <= s; t++){
                            let r = 0;
                            for(let s = l; s <= n; s++)r = r << 1 | !!e[t][s];
                            a.push(r);
                        }
                        i.push({
                            w: n - l + 1,
                            h: s - r + 1,
                            rows: a
                        });
                    }
                    return i;
                }(function(e) {
                    if (e.length < 54 || 0x42 !== e[0] || 0x4d !== e[1]) throw Error('云锁验证码不是 BMP 图片');
                    let t = new DataView(e.buffer, e.byteOffset, e.byteLength), l = t.getUint32(10, !0), n = t.getInt32(18, !0), r = t.getInt32(22, !0), s = t.getUint16(28, !0), i = t.getUint32(30, !0);
                    if (n <= 0 || 0 === r || 24 !== s || 0 !== i) throw Error(`云锁验证码 BMP 格式不支持 (w=${n} h=${r} bpp=${s} comp=${i})`);
                    let a = Math.abs(r), u = 4 * Math.floor((3 * n + 3) / 4), o = [];
                    for(let t = 0; t < a; t++){
                        let s = l + (r > 0 ? a - 1 - t : t) * u, i = [];
                        for(let t = 0; t < n; t++){
                            var c, f, d;
                            let l = s + 3 * t;
                            i.push((c = e[l + 2], f = e[l + 1], d = e[l], f > c + 18 && f > d + 18 && f < 190));
                        }
                        o.push(i);
                    }
                    return o;
                }(e));
                if (5 !== t.length) throw Error(`云锁验证码数字个数异常（识别到 ${t.length} 个）`);
                let l = '';
                for (let e of t){
                    let t = v.filter((t)=>t.w === e.w && t.h === e.h), n = t.length > 0 ? t : v, r = n[0], s = 1 / 0;
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
            let a = encodeURI($(n, i.prefix + [
                ...r
            ].map((e)=>e.charCodeAt(0).toString(16)).join('')));
            try {
                yield e.get(a, {
                    referer: n,
                    allowRedirects: !1
                });
            } catch (t) {
                try {
                    yield e.get(a, {
                        referer: n
                    });
                } catch (e) {}
            }
            t = n;
        }
        throw Error('字幕库云锁验证多次未通过');
    })();
}
function S(e, l) {
    return t(function*() {
        let t = yield Widget.html.load(e), n = [], r = new Map();
        return t('tr').each((e, s)=>{
            var i, a, u, o;
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
            })(String(null != (a = c.html()) ? a : '')).filter((e)=>'eng' !== e);
            if (0 === h.length) return;
            let p = String(null != (u = null != (o = f.attr('title')) ? o : f.text()) ? u : '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().replace(/\.(srt|ass|ssa|vtt|zip|rar|7z)$/i, '');
            if (!p) return;
            let m = $(l, d), g = r.get(m);
            if (g) {
                for (let e of h)g.langs.add(e);
                return;
            }
            let b = {
                detailUrl: m,
                release: p,
                langs: new Set(h)
            };
            r.set(m, b), n.push(b);
        }), n;
    })();
}
loadSubtitle = (e)=>t(function*() {
        var o, f, d, h;
        let b = Math.max(1, Math.min(15, parseInt(null != (o = e.resultCount) ? o : '10', 10) || 10)), y = null != (f = e.sourceOrder) ? f : 'assrt-first', v = !!(null != (d = e.assrtToken) ? d : '').trim(), k = !!(null != (h = e.osApiKey) ? h : '').trim(), z = 'os-only' === y ? [
            'os'
        ] : 'assrt-only' === y ? [
            'assrt'
        ] : 'zimuku-only' === y ? [
            'zimuku'
        ] : 'os-first' === y ? [
            'os',
            'assrt',
            'zimuku'
        ] : [
            'assrt',
            'os',
            'zimuku'
        ];
        if (0 === z.filter((e)=>'zimuku' === e || ('assrt' === e ? v : k)).length) return console.error(`${l} 当前顺序下没有可用的字幕源：请在模块的全局参数中填写 Assrt Token 或 OpenSubtitles Api-Key，或把字幕源顺序改为包含字幕库，本次返回空结果`), [];
        let N = {
            assrt: 'assrt',
            os: 'OpenSubtitles',
            zimuku: '字幕库'
        }, _ = [];
        for (let o of z){
            if (_.length >= b) break;
            if ('assrt' === o && !v) {
                console.log(`${l} 跳过 assrt：未填写 Assrt Token`);
                continue;
            }
            if ('os' === o && !k) {
                console.log(`${l} 跳过 OpenSubtitles：未填写 Api-Key`);
                continue;
            }
            try {
                let f = 'assrt' === o ? yield function(e) {
                    return t(function*() {
                        var o, f, d, h, p, m, g, $, b, y, v, w, S, k, z, N, _, x, O, A, C, W, U, M;
                        let T = (null != (o = e.assrtToken) ? o : '').trim(), I = (e.assrtBaseUrl || 'https://api.assrt.net/v1').replace(/\/$/, ''), j = function(e) {
                            var t, l, n, r, i, a, u;
                            let o = (null != (t = e.seriesName) ? t : '').trim(), c = (null != (l = e.title) ? l : '').trim(), f = o || c, d = [], h = (e)=>{
                                let t = e.trim();
                                t.length >= 3 && !d.includes(t) && d.push(t);
                            };
                            if (!f) return d;
                            let p = parseInt(null != (n = e.season) ? n : '', 10), m = parseInt(null != (r = e.episode) ? r : '', 10), g = ('tv' === e.type || !Number.isNaN(m)) && !Number.isNaN(m), $ = Number.isNaN(p) ? 1 : p, b = '', y = null != (i = null != (a = e.videoUrl) ? a : e.link) ? i : '';
                            if (y) try {
                                let e = decodeURIComponent(null != (u = y.split(/[?#]/)[0].split('/').pop()) ? u : '').replace(/\.[a-z0-9]{2,5}$/i, '');
                                e.length >= 10 && (b = e);
                            } catch (e) {}
                            return g ? (h(`${f} S${s($)}E${s(m)}`), b && h(b), h(f), h(`${f} 第${$}季第${m}集`)) : (h(f), b && h(b), 'tv' !== e.type || Number.isNaN(p) || h(`${f} 第${p}季`)), c && c !== f && h(c), d.slice(0, 4);
                        }(e), P = a(e);
                        if (0 === j.length) return console.warn(`${l} assrt 跳过：没有可用的搜索关键词（标题为空）`), [];
                        let L = [], q = 0, B = !1;
                        for(let e = 0; e < j.length && !(q >= 5); e++){
                            q++;
                            let n = yield function(e, n, r) {
                                return t(function*() {
                                    var t, s, i;
                                    let a = (yield Widget.http.get(`${e}/sub/search`, {
                                        params: {
                                            token: n,
                                            q: r,
                                            cnt: '15'
                                        }
                                    })).data;
                                    return a && 'number' == typeof a.status && 0 !== a.status ? 30900 === a.status ? {
                                        subs: [],
                                        quotaHit: !0
                                    } : (console.warn(`${l} assrt 搜索失败 (q="${r}"): status=${a.status} ${null != (i = a.errmsg) ? i : ''}`), {
                                        subs: [],
                                        quotaHit: !1
                                    }) : {
                                        subs: null != (t = null == a || null == (s = a.sub) ? void 0 : s.subs) ? t : [],
                                        quotaHit: !1
                                    };
                                })();
                            }(I, T, j[e]);
                            if (n.quotaHit) {
                                B = !0;
                                break;
                            }
                            if (n.subs.length > 0) {
                                L = n.subs;
                                break;
                            }
                        }
                        if (B) return console.error(`${l} assrt 配额超限（错误 30900），本次跳过 assrt，请稍后再试`), [];
                        if (0 === L.length) return console.log(`${l} assrt 无结果（关键词：${j.join(' / ')}）`), [];
                        P && (L = [
                            ...L
                        ].sort((e, t)=>{
                            var l, n, r, s, a, o;
                            return i[u(`${null != (l = e.native_name) ? l : ''} ${null != (n = e.videoname) ? n : ''} ${null != (r = e.filename) ? r : ''}`, P.season, P.episode)] - i[u(`${null != (s = t.native_name) ? s : ''} ${null != (a = t.videoname) ? a : ''} ${null != (o = t.filename) ? o : ''}`, P.season, P.episode)];
                        }));
                        let K = [], E = new Set(), H = (e)=>{
                            !e.url || E.has(e.url) || (E.add(e.url), K.push(e));
                        }, R = 0, D = 0, J = 0;
                        for (let e of L){
                            let s = null != (f = null == (b = e.lang) ? void 0 : b.desc) ? f : '中文', i = null != (d = null != (h = null != (p = e.id) ? p : e.sub_id) ? h : e.sid) ? d : e.subId;
                            if (P && 'mismatch' === u(`${null != (m = e.native_name) ? m : ''} ${null != (g = e.videoname) ? g : ''} ${null != ($ = e.filename) ? $ : ''}`, P.season, P.episode)) {
                                D++;
                                continue;
                            }
                            if (e.url) {
                                H({
                                    id: `assrt:${null != i ? i : 'na'}`,
                                    title: e.native_name || e.videoname || e.filename || '字幕',
                                    lang: s,
                                    count: 0,
                                    url: e.url
                                });
                                continue;
                            }
                            if (null == i) {
                                if (J++, console.log(`${l} assrt 跳过无 id 的搜索结果：${null != (y = null != (v = null != (w = e.native_name) ? w : e.videoname) ? v : e.filename) ? y : '(无标题)'}`), J <= 2) {
                                    let t = '(unserializable)';
                                    try {
                                        t = JSON.stringify(e).slice(0, 600);
                                    } catch (e) {}
                                    console.log(`${l} assrt 无 id 条目探针 keys=[${Object.keys(e).join(',')}]：${t}`);
                                }
                                continue;
                            }
                            if (!(R >= 6)) {
                                R++;
                                try {
                                    R > 1 && (yield n(300));
                                    let r = yield function(e, l, r) {
                                        return t(function*() {
                                            let t = null;
                                            for(let s = 0; s < 2; s++)try {
                                                return (yield Widget.http.get(`${e}/sub/detail`, {
                                                    params: {
                                                        token: l,
                                                        id: String(r)
                                                    }
                                                })).data;
                                            } catch (l) {
                                                t = l;
                                                let e = function(e) {
                                                    var t;
                                                    if (!e) return null;
                                                    if ('number' == typeof e.statusCode) return e.statusCode;
                                                    if ('number' == typeof e.status) return e.status;
                                                    let l = /HTTP (\d{3})/.exec(String(null != (t = e.message) ? t : e));
                                                    return l ? Number(l[1]) : null;
                                                }(l);
                                                if (0 === s && null !== e && e >= 500) {
                                                    yield n(1200);
                                                    continue;
                                                }
                                                throw l;
                                            }
                                            throw t;
                                        })();
                                    }(I, T, i);
                                    if (r && 'number' == typeof r.status && 0 !== r.status) {
                                        if (30900 === r.status) {
                                            console.error(`${l} assrt 配额超限（错误 30900），停止获取详情`);
                                            break;
                                        }
                                        console.warn(`${l} assrt 详情失败 (id=${i}): status=${r.status} ${null != (_ = r.errmsg) ? _ : ''}`);
                                        continue;
                                    }
                                    let a = null == r || null == (N = r.sub) || null == (z = N.subs) ? void 0 : z[0], o = null != (S = null == a ? void 0 : a.filelist) ? S : [];
                                    o.length > 0 ? o.forEach((e, t)=>{
                                        var l, n, r;
                                        P && 'mismatch' === u(null != (l = e.f) ? l : '', P.season, P.episode) ? D++ : H({
                                            id: `assrt:${i}:${t}`,
                                            title: e.f,
                                            lang: null != (n = null == a || null == (r = a.lang) ? void 0 : r.desc) ? n : s,
                                            count: 0,
                                            url: e.url
                                        });
                                    }) : (null == a ? void 0 : a.url) && !(P && 'mismatch' === u(null != (k = a.filename) ? k : '', P.season, P.episode)) && H({
                                        id: `assrt:${i}`,
                                        title: null != (x = null != (O = null != (A = a.filename) ? A : e.native_name) ? O : e.videoname) ? x : '字幕',
                                        lang: null != (C = null == a || null == (W = a.lang) ? void 0 : W.desc) ? C : s,
                                        count: 0,
                                        url: a.url
                                    });
                                } catch (e) {
                                    console.warn(`${l} assrt 详情请求异常 (id=${i}): ${r(e)}`);
                                }
                            }
                        }
                        let V = 0;
                        if (K.some((e)=>c(e.lang, e.title))) for(let e = K.length - 1; e >= 0; e--)U = K[e].lang, !c(U, M = K[e].title) && /英|english|\beng\b/i.test(`${U} ${M}`) && (K.splice(e, 1), V++);
                        return P && K.sort((e, t)=>i[u(e.title, P.season, P.episode)] - i[u(t.title, P.season, P.episode)]), console.log(`${l} assrt：搜索 ${q} 次、详情 ${R} 次 → ${K.length} 条${P && D > 0 ? `（按集数过滤掉 ${D} 条其他集字幕）` : ''}${J > 0 ? `（跳过 ${J} 条无 id 结果）` : ''}${V > 0 ? `（过滤掉 ${V} 条纯英文字幕）` : ''}`), K;
                    })();
                }(e) : 'os' === o ? yield function(e) {
                    return t(function*() {
                        var t;
                        let n = (null != (t = e.osApiKey) ? t : '').trim(), r = yield p(e, !1), s = yield m(e, n, r);
                        return s.unauthorized && e.osUsername && e.osPassword && (console.warn(`${l} OpenSubtitles token 已失效，重新登录后重试`), yield Widget.storage.remove('os_token'), yield Widget.storage.remove('os_token_at'), r = yield p(e, !0), s = yield m(e, n, r)), s.items;
                    })();
                }(e) : yield function(e) {
                    return t(function*() {
                        let o = (e.zimukuBaseUrl || 'https://srtku.com').replace(/\/$/, ''), c = function(e) {
                            var t, l;
                            let n = [
                                ...new Set([
                                    null != (t = e.seriesName) ? t : '',
                                    null != (l = e.title) ? l : ''
                                ].map((e)=>e.trim()).filter(Boolean))
                            ], r = a(e), i = [];
                            for (let e of n)r && /[a-z]/i.test(e) && i.push(`${e}.S${s(r.season)}`), i.push(e);
                            return [
                                ...new Set(i)
                            ].slice(0, 3);
                        }(e);
                        if (0 === c.length) return console.warn(`${l} 字幕库跳过：没有可用的搜索关键词（标题为空）`), [];
                        let f = new g(), d = a(e), h = [], p = '';
                        for (let e of c){
                            let n = `${o}/search?q=${encodeURIComponent(e)}`, s = yield w(f, n, o);
                            if ((h = yield function(e, n, s, i) {
                                return t(function*() {
                                    let t = yield S(n, s);
                                    if (t.length > 0) return t;
                                    let a = yield Widget.html.load(n), u = [];
                                    a('.item a').each((e, t)=>{
                                        var l;
                                        let n = String(null != (l = a(t).attr('href')) ? l : '');
                                        !n || n.includes('/detail/') || u.includes(n) || u.push(n);
                                    });
                                    let o = [];
                                    for (let t of u.slice(0, 2)){
                                        let n = $(s, t);
                                        try {
                                            let t = yield w(e, n, i);
                                            o.push(...yield S(t, n));
                                        } catch (e) {
                                            console.warn(`${l} 字幕库：剧集页解析失败 (${t}): ${r(e)}`);
                                        }
                                        if (o.length >= 10) break;
                                    }
                                    return o;
                                })();
                            }(f, s, n, o)).length > 0) {
                                p = e;
                                break;
                            }
                        }
                        if (0 === h.length) return console.log(`${l} 字幕库：无结果（关键词：${c.join(' / ')}）`), [];
                        d && (h = h.filter((e)=>'mismatch' !== u(e.release, d.season, d.episode))).sort((e, t)=>i[u(e.release, d.season, d.episode)] - i[u(t.release, d.season, d.episode)]);
                        let m = [], b = 0;
                        for (let e of h){
                            if (b >= 5) break;
                            b++;
                            try {
                                b > 1 && (yield n(200));
                                let t = yield w(f, e.detailUrl, o), r = (yield Widget.html.load(t))('a#down1').attr('href');
                                if (!r) {
                                    console.warn(`${l} 字幕库：详情页没有下载入口 (${e.release})`);
                                    continue;
                                }
                                let s = $(e.detailUrl, String(r)), i = yield w(f, s, e.detailUrl), a = yield Widget.html.load(i), u = '';
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
                                    url: $(s, u)
                                });
                            } catch (t) {
                                console.warn(`${l} 字幕库：解析下载链接失败 (${e.release}): ${r(t)}`);
                            }
                        }
                        return console.log(`${l} 字幕库：命中 ${h.length} 条（关键词：${p}）→ 解析 ${m.length} 条直链`), m;
                    })();
                }(e);
                _.push(...f);
            } catch (e) {
                console.error(`${l} ${N[o]} 搜索异常，已忽略该源: ${r(e)}`);
            }
        }
        let x = new Set(), O = _.filter((e)=>!(!e.url || x.has(e.url)) && (x.add(e.url), !0)).slice(0, b);
        return console.log(`${l} 共返回 ${O.length} 条字幕（上限 ${b}）`), O;
    })();
let k = {
    ass: 50,
    srt: 45,
    ssa: 30,
    vtt: 15
}, z = /chs|简|zh[-_.]?cn/i, N = /cht|繁|zh[-_.]?tw|big5/i, _ = /双语|中英|bilingual|chs[&+.]?eng|cht[&+.]?eng/i, x = /\beng\b|english|英文/i;
function O(e) {
    var t;
    if (!e) return null;
    let l = null != (t = e.match(/s(\d{1,2})[\s._-]*e(\d{1,3})/i)) ? t : e.match(/(\d{1,2})x(\d{1,3})/);
    return l ? `s${l[1].padStart(2, '0')}e${l[2].padStart(2, '0')}` : null;
}
resolveSubtitleArchive = (e)=>t(function*() {
        var t, n, r, s, i;
        let a, u = null != (t = e.subtitleFiles) ? t : e.files;
        if (!u) return null;
        let o = [];
        try {
            o = JSON.parse(u);
        } catch (e) {
            return null;
        }
        let c = o.filter((e)=>e.extension in k);
        if (0 === c.length) return null;
        if (1 === c.length) return c[0].path;
        let f = (null != (n = null != (r = e.subtitleName) ? r : e.archiveName) ? n : '').toLowerCase().replace(/\.[a-z0-9]{2,5}$/, '').split(/[^a-z0-9\u4e00-\u9fff]+/).filter((e)=>e.length >= 3).slice(0, 3), d = {
            episode: null != (s = O(e.subtitleName)) ? s : O(e.archiveName),
            pref: (a = (null != (i = e.subtitleLanguage) ? i : '').toLowerCase()) ? /zh-tw|cht|繁|traditional/.test(a) ? 'cht' : /zh-cn|chs|简|simplified/.test(a) ? 'chs' : /zh|中文|chinese/.test(a) ? 'zh' : 'other' : null,
            titleTokens: f
        }, h = c.map((e)=>({
                file: e,
                score: function(e, t) {
                    var l;
                    let n = null != (l = k[e.extension]) ? l : 0, r = e.name.toLowerCase(), s = _.test(r), i = z.test(r), a = N.test(r);
                    if ('chs' === t.pref ? (i && (n += 30), s && (n += 25), !a || i || s || (n -= 15)) : 'cht' === t.pref ? (a && (n += 30), s && (n += 25), !i || a || s || (n -= 15)) : 'zh' === t.pref && ((i || a) && (n += 20), s && (n += 25)), ('chs' === t.pref || 'cht' === t.pref || 'zh' === t.pref) && !i && !a && !s && x.test(r) && (n -= 20), t.episode) {
                        let l = O(e.name);
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
