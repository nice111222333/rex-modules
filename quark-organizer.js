function e(e, t, r, n, i, l, o) {
    try {
        var a = e[l](o), u = a.value;
    } catch (e) {
        r(e);
        return;
    }
    a.done ? t(u) : Promise.resolve(u).then(n, i);
}
function t(t) {
    return function() {
        var r = this, n = arguments;
        return new Promise(function(i, l) {
            var o = t.apply(r, n);
            function a(t) {
                e(o, i, l, a, u, "next", t);
            }
            function u(t) {
                e(o, i, l, a, u, "throw", t);
            }
            a(void 0);
        });
    };
}
function r(e) {
    for(var t = 1; t < arguments.length; t++){
        var r = null != arguments[t] ? arguments[t] : {}, n = Object.keys(r);
        "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(e) {
            return Object.getOwnPropertyDescriptor(r, e).enumerable;
        }))), n.forEach(function(t) {
            var n;
            n = r[t], t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n;
        });
    }
    return e;
}
WidgetMetadata = {
    id: 'v7777-quark-organizer',
    title: '夸克AV整理',
    description: '夸克网盘 AV 作品批量整理：打开「片库整理」即扫描整个网盘，按番号认出作品，去 JavDB 查女优，把文件改成番号名并按女优归类到「艺术」文件夹（可在参数里改）下的女优文件夹，整理后自动清理艺术内的垃圾文件和空文件夹。同一番号重新下载时，整理会删掉女优文件夹里的旧拷贝（进回收站）、把新文件改名归类到位。播放请用 AVDB夸克版。使用前请在全局参数中填写自己的夸克网盘 Cookie。',
    author: 'v7777',
    site: 'https://pan.quark.cn',
    version: "0.1.9",
    requiredVersion: '0.0.2',
    detailCacheDuration: 60,
    globalParams: [
        {
            name: 'quarkCookie',
            title: '夸克网盘 Cookie',
            type: 'input',
            description: '必填。登录 pan.quark.cn 后从浏览器开发者工具复制完整 Cookie',
            value: ''
        },
        {
            name: 'javdbCookie',
            title: 'JavDB Cookie',
            type: 'input',
            description: '可选。在浏览器登录 javdb.com 后复制完整 Cookie；查女优时详情页携带（与 AVDB夸克版同一份即可）',
            value: ''
        },
        {
            name: 'libraryRoot',
            title: '整理根目录',
            type: 'input',
            description: '根目录下的文件夹名，女优文件夹建在它里面。留空 = 默认「艺术」；填「/」= 女优文件夹直接放根目录',
            value: '艺术'
        },
        {
            name: 'organizeMode',
            title: '整理模式',
            type: 'enumeration',
            value: 'do',
            enumOptions: [
                {
                    title: '整理并归类（改名+移动）',
                    value: 'do'
                },
                {
                    title: '只报告（不改动网盘，先看看会整理成什么样）',
                    value: 'report'
                }
            ]
        }
    ],
    modules: [
        {
            id: 'loadLibrary',
            title: '片库整理',
            functionName: 'loadLibrary',
            cacheDuration: 0,
            params: []
        }
    ]
};
let n = '[夸克AV整理]';
function i(e) {
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
function l(e, t) {
    if (!t) return '';
    let r = String(t).trim();
    if (!r) return '';
    if (/^https?:\/\//i.test(r)) return r;
    if (r.startsWith('//')) return `https:${r}`;
    let n = /^(https?:\/\/[^/]+)/i.exec(e), i = n ? n[1] : e.replace(/\/+$/, '');
    if (r.startsWith('/')) return i + r;
    let l = e.split(/[?#]/)[0];
    return l.slice(0, l.lastIndexOf('/') + 1) + r;
}
function o(e) {
    return Object.keys(e).map((t)=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join('&');
}
function a(e) {
    return e.length > 4 ? e.replace(/^0+(?=\d)/, '') : e;
}
function u(e) {
    var t;
    if (!e) return null;
    let r = String(e).toUpperCase(), n = null != (t = /(?:^|[^A-Z0-9])FC2[- ]?PPV[- ]?(\d{5,7})(?![0-9])/.exec(r)) ? t : /(?:^|[^A-Z0-9])FC2[- ]?(\d{5,7})(?![0-9])/.exec(r);
    if (n) return `FC2-PPV-${n[1]}`;
    let i = /(?:^|[^0-9])(\d{6})([-_])(\d{3})(?![0-9])/.exec(r);
    if (i) return `${i[1]}${i[2]}${i[3]}`;
    let l = /(?:^|[^A-Z])([A-Z]{2,6})-S(\d{1,3})(?![0-9])/.exec(r);
    if (l) return `${l[1]}-S${l[2]}`;
    let o = /(?:^|[^A-Z])([A-Z]{2,6})-\s*(\d{2,6})(?![0-9])/.exec(r);
    if (o) return `${o[1]}-${a(o[2])}`;
    let u = /(?:^|[^A-Z0-9])([A-Z]{2,6})(\d{3,6})(?![0-9])/.exec(r);
    if (u) return `${u[1]}-${a(u[2])}`;
    for (let e of r.matchAll(/(?:^|[^A-Z])([A-Z]{2,6})\s+(\d{3,5})(?![0-9])/g))if (![
        '720',
        '1080',
        '1440',
        '2160'
    ].includes(e[2])) return `${e[1]}-${a(e[2])}`;
    return null;
}
function d(e) {
    let t = String(null != e ? e : '').toUpperCase();
    return /(?:^|[^A-Z])FC2[- ]?PPV[- ]?\d{5,7}/.test(t) || /(?:^|[^0-9])\d{6}[-_]\d{3}(?![0-9])/.test(t) || /(?:^|[^A-Z])[A-Z]{2,6}-S\d{1,3}(?![0-9])/.test(t) || /(?:^|[^A-Z])[A-Z]{2,6}-\s*\d{2,6}(?![0-9])/.test(t);
}
function s(...e) {
    for (let t of e){
        if (!t) continue;
        let e = u(t);
        if (e) return e;
    }
    return null;
}
function f(e) {
    return e.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
let c = 'https://javdb.com', p = 'javdb_cookie_mirror';
function g(e) {
    return t(function*() {
        try {
            if (!e || 'string' != typeof e.javdbCookie) return;
            let t = e.javdbCookie.trim();
            t ? yield Widget.storage.set(p, t) : yield Widget.storage.remove(p);
        } catch (e) {}
    })();
}
function m(e) {
    return t(function*() {
        if (e && 'string' == typeof e.javdbCookie && e.javdbCookie.trim()) return e.javdbCookie.trim();
        try {
            let e = yield Widget.storage.get(p);
            if ('string' == typeof e && e.trim()) return e.trim();
        } catch (e) {}
        return '';
    })();
}
function h(e, r) {
    return t(function*() {
        var n;
        let i, l = yield (i = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${c}/`
        }, r && (i.Cookie = r), n = i, t(function*() {
            let t = yield Widget.http.get(e, {
                headers: n
            }), r = 'number' == typeof (null == t ? void 0 : t.statusCode) ? t.statusCode : 200;
            if (r >= 400) throw Error(`HTTP ${r}: ${e}`);
            let i = null == t ? void 0 : t.data;
            return 'string' == typeof i ? i : null == i ? '' : String(i);
        })());
        if (l && (/just a moment/i.test(l) || l.includes('challenges.cloudflare.com') || l.includes('_cf_chl') || /attention required/i.test(l) || l.includes('cf-browser-verification'))) throw Error(`JavDB 返回了 Cloudflare 验证页（出口 IP 被拦截）: ${e}`);
        return l;
    })();
}
function y(e, r) {
    return t(function*() {
        let t = yield Widget.html.load(e), n = t('a.box');
        0 === n.length && (n = t('.movie-list a.box, .grid a.box'));
        let i = [], o = new Set();
        return n.each((e, n)=>{
            var a, d, f, c, p;
            let g = t(n), m = l(r, null != (a = g.attr('href')) ? a : '');
            if (!m || o.has(m)) return;
            o.add(m);
            let h = g.find('.video-title strong').first().text().trim(), y = (null != (d = g.attr('title')) ? d : '').trim(), v = g.find('.video-title').first().text().trim(), $ = null != (f = u(h)) ? f : s(y, v), b = null != (c = null != (p = g.find('img').first().attr('src')) ? p : g.find('img').first().attr('data-src')) ? c : '';
            b = l(r, b), i.push({
                code: $,
                title: y || v || $ || m,
                link: m,
                cover: b
            });
        }), i;
    })();
}
function v(e) {
    return e.replace(/[:：\s]/g, '');
}
function $(e) {
    let t = e('nav.panel.movie-panel-info').first(), r = [];
    if (0 === t.length) return r;
    let n = t.find('> div, .panel-block'), i = new Set();
    return n.each((t, n)=>{
        if (i.has(n)) return;
        i.add(n);
        let l = e(n), o = l.find('strong').first();
        if (0 === o.length) return;
        let a = v(o.text());
        if (!a) return;
        let u = l.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
        r.push({
            label: a,
            valueText: u,
            $row: l
        });
    }), r;
}
function b(e, t) {
    return e.find((e)=>t.includes(e.label));
}
function k(e, t) {
    let r = b(t, [
        '演員',
        '演员'
    ]);
    if (!r) return [];
    let n = [];
    r.$row.find('a, strong').each((t, r)=>{
        var i, l;
        let o = e(r), a = null != (i = r.tagName) ? i : '';
        'a' === a ? n.push({
            kind: 'a',
            text: o.text().trim(),
            href: null != (l = o.attr('href')) ? l : ''
        }) : 'strong' === a && n.push({
            kind: 'strong',
            text: o.text().trim(),
            href: ''
        });
    });
    let i = !1, l = [];
    for (let e of n){
        if ('strong' === e.kind && !i && v(e.text) === r.label) {
            i = !0;
            continue;
        }
        'a' === e.kind ? l.push({
            name: e.text,
            href: e.href,
            gender: ''
        }) : l.length > 0 && !l[l.length - 1].gender && (l[l.length - 1].gender = e.text);
    }
    let o = l.some((e)=>e.gender.includes('♀') || e.gender.includes('♂'));
    return l.filter((e)=>e.name && (!o || e.gender.includes('♀')));
}
let C = 'quark_cookie_dyn', x = 'quark_cookie_base_fp';
function _(e) {
    let t = 5381;
    for(let r = 0; r < e.length; r++)t = (t << 5) + t + e.charCodeAt(r) | 0;
    return `${e.length}:${(t >>> 0).toString(16)}`;
}
let j = new Set([
    'mp4',
    'mkv',
    'avi',
    'mov',
    'wmv',
    'flv',
    'm4v',
    'ts',
    'm2ts',
    'webm',
    'rmvb',
    'rm',
    'mpg',
    'mpeg',
    '3gp',
    'iso',
    'vob'
]);
function S(e, n, i, l, a) {
    return t(function*() {
        var u, d;
        let s, f = yield t(function*() {
            var t;
            let r = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!r) return '';
            try {
                if ((yield Widget.storage.get(x)) === _(r)) {
                    let e = yield Widget.storage.get(C);
                    if ('string' == typeof e && e.trim()) return e;
                }
            } catch (e) {}
            return r;
        })();
        if (!f) throw Error('未填写夸克网盘 Cookie（模块全局参数 quarkCookie）');
        let c = o(r({
            pr: 'ucpro',
            fr: 'pc'
        }, l)), p = `https://drive.quark.cn/1/clouddrive${i}?${c}`, g = {
            Cookie: f,
            Accept: 'application/json, text/plain, */*',
            Referer: 'https://pan.quark.cn',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch'
        };
        s = 'GET' === n ? yield Widget.http.get(p, {
            headers: g
        }) : yield Widget.http.post(p, null != a ? a : {}, {
            headers: g
        }), yield (u = null == s ? void 0 : s.headers, t(function*() {
            try {
                var t, r;
                let n = (null != (t = e.quarkCookie) ? t : '').trim();
                if (!n || !u) return;
                let i = null != (r = u['set-cookie']) ? r : u['Set-Cookie'];
                if (!i) return;
                Array.isArray(i) || (i = [
                    i
                ]);
                let l = f, o = !1;
                for (let e of i){
                    let t = String(e).split(';')[0], r = t.indexOf('=');
                    if (r <= 0) continue;
                    let n = t.slice(0, r).trim();
                    ('__puus' === n || '__pus' === n) && (l = function(e, t, r) {
                        let n = e.split(';').map((e)=>e.trim()).filter(Boolean), i = !1, l = n.map((e)=>{
                            let n = e.indexOf('=');
                            return n > 0 && e.slice(0, n) === t ? (i = !0, `${t}=${r}`) : e;
                        });
                        return i || l.push(`${t}=${r}`), l.join('; ');
                    }(l, n, t.slice(r + 1).trim()), o = !0);
                }
                o && (yield Widget.storage.set(C, l), yield Widget.storage.set(x, _(n)));
            } catch (e) {}
        })());
        let m = 'number' == typeof (null == s ? void 0 : s.statusCode) ? s.statusCode : 200;
        if (m >= 400) throw Error(`HTTP ${m}: 夸克接口 ${i}`);
        let h = function(e) {
            if (null == e) return null;
            if ('object' == typeof e) return e;
            if ('string' == typeof e) try {
                return JSON.parse(e);
            } catch (e) {}
            return null;
        }(null == s ? void 0 : s.data);
        if (!h) throw Error(`夸克接口 ${i} 返回了无法解析的内容`);
        if ('number' == typeof h.status && h.status >= 400 || void 0 !== h.code && 0 !== h.code) throw Error(`夸克接口 ${i} 出错: ${null != (d = h.message) ? d : `code=${h.code}`}`);
        return h;
    })();
}
function w(e, r) {
    return t(function*() {
        let t = [], n = 1;
        for(; n <= 20; n++){
            var i, l, o, a;
            let u = yield S(e, 'GET', '/file/sort', {
                pdir_fid: r,
                _page: String(n),
                _size: '100',
                _fetch_total: '1',
                fetch_all_file: '1',
                fetch_risk_file_name: '1'
            }), d = Array.isArray(null == u || null == (i = u.data) ? void 0 : i.list) ? u.data.list : [];
            for (let e of d)t.push({
                fid: String(null != (o = e.fid) ? o : ''),
                name: String(null != (a = e.file_name) ? a : ''),
                size: 'number' == typeof e.size ? e.size : 0,
                category: 'number' == typeof e.category ? e.category : 0,
                isDir: !1 === e.file
            });
            let s = null == u || null == (l = u.metadata) ? void 0 : l._total;
            if (0 === d.length || 'number' == typeof s && t.length >= s || d.length < 100) break;
        }
        return t;
    })();
}
function A(e, r, n) {
    return t(function*() {
        yield S(e, 'POST', '/file/rename', {}, {
            fid: r,
            file_name: n
        });
    })();
}
function O(e, r, n) {
    return t(function*() {
        yield S(e, 'POST', '/file/move', {}, {
            action_type: 1,
            exclude_fids: [],
            filelist: [
                r
            ],
            to_pdir_fid: n
        });
    })();
}
function P(e, r) {
    return t(function*() {
        yield S(e, 'POST', '/file/delete', {}, {
            action_type: 1,
            exclude_fids: [],
            filelist: [
                r
            ]
        });
    })();
}
function W(e, r, l) {
    return t(function*() {
        let t = (yield w(e, r)).find((e)=>e.isDir && e.name === l);
        if (t) return t.fid;
        for(let t = 0; t < 2; t++){
            var o, a, u;
            try {
                let t = yield S(e, 'POST', '/file', {}, {
                    dir_init_lock: !1,
                    dir_path: '',
                    file_name: l,
                    pdir_fid: r
                }), n = 'string' == typeof (null == t || null == (o = t.data) ? void 0 : o.fid) ? t.data.fid : '';
                if (n) return n;
            } catch (e) {
                console.log(`${n} 创建文件夹「${l}」失败（可能已有同名）: ${i(e)}`);
            }
            for(let t = 0; t < 6; t++){
                let n = null != (a = null == (u = (yield w(e, r)).find((e)=>e.isDir && e.name === l)) ? void 0 : u.fid) ? a : '';
                if (n) return n;
                yield function(e) {
                    return new Promise((t)=>{
                        'function' == typeof setTimeout ? setTimeout(t, e) : t();
                    });
                }(600 * (t + 1));
            }
        }
        return console.log(`${n} 文件夹「${l}」创建后多次确认仍未找到，本次先不移动`), '';
    })();
}
let q = 'org_work_';
function N(e) {
    return t(function*() {
        try {
            let l = yield Widget.storage.get(q + e.toUpperCase());
            if ('string' == typeof l && l) {
                let e = JSON.parse(l);
                if (e && 'object' == typeof e) {
                    var t, r, n, i;
                    return {
                        actress: String(null != (t = e.a) ? t : ''),
                        cover: String(null != (r = e.c) ? r : ''),
                        title: String(null != (n = e.t) ? n : ''),
                        link: String(null != (i = e.l) ? i : '')
                    };
                }
            }
        } catch (e) {}
        return null;
    })();
}
function T(e, r) {
    return t(function*() {
        let a = yield N(r);
        if (a) return a;
        let u = null;
        try {
            u = yield t(function*() {
                var t, n, i, a, u, d;
                let s = `${c}/search?${o({
                    q: r,
                    f: 'all'
                })}`, f = yield h(s), p = yield y(f, s);
                if (0 === p.length) return null;
                let g = null != (t = p.find((e)=>e.code === r)) ? t : p[0], v = yield m(e), b = yield h(g.link, v), C = yield Widget.html.load(b), x = $(C), _ = k(C, x), j = null != (n = C('img.video-cover').first().attr('src')) ? n : '';
                j || (j = null != (i = C('meta[property="og:image"]').attr('content')) ? i : ''), j = l(g.link, j) || g.cover;
                let S = C('h2 strong.current-title').first().text().trim(), w = null != (a = C('meta[property="og:title"]').attr('content')) ? a : '';
                return {
                    actress: (null != (u = null == (d = _[0]) ? void 0 : d.name) ? u : '').replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60),
                    cover: j,
                    title: S || w || g.title,
                    link: g.link
                };
            })();
        } catch (e) {
            console.log(`${n} JavDB 查询 ${r} 失败: ${i(e)}`);
        }
        if (u) try {
            yield Widget.storage.set(q + r.toUpperCase(), JSON.stringify({
                a: u.actress,
                c: u.cover,
                t: u.title,
                l: u.link
            }));
        } catch (e) {}
        return u;
    })();
}
loadLibrary = (e)=>t(function*() {
        var l, o, a, u, c, p, m, h;
        yield g(e);
        let y = (null != (l = e.organizeMode) ? l : 'do') === 'report' ? 'report' : 'do', v = yield (h = 'do' === y, t(function*() {
            var t;
            let r = (null != (t = e.libraryRoot) ? t : '').trim();
            if ('/' === r) return '0';
            let n = '' === r ? '艺术' : r, i = (yield w(e, '0')).find((e)=>e.isDir && e.name === n);
            return i ? i.fid : h ? W(e, '0', n) : '';
        })()), { videos: $, folders: b } = yield t(function*() {
            let t = [
                {
                    fid: '0',
                    depth: 0
                }
            ], l = [], o = [], a = new Map(), u = new Set(), d = 0, s = 0;
            for(; t.length > 0 && d < 120 && s < 8000;){
                let c, { fid: p, depth: g } = t.shift();
                d++;
                try {
                    c = yield w(e, p);
                } catch (e) {
                    console.log(`${n} 目录 ${p} 列取失败，跳过: ${i(e)}`);
                    continue;
                }
                for (let e of c){
                    var f;
                    if (s++, e.isDir) {
                        a.set(e.fid, e.name), o.push({
                            fid: e.fid,
                            name: e.name,
                            depth: g + 1,
                            parentFid: p
                        }), p === v && u.add(e.fid), t.push({
                            fid: e.fid,
                            depth: g + 1
                        });
                        continue;
                    }
                    (1 === e.category || function(e) {
                        let t = e.lastIndexOf('.');
                        return !(t < 0) && j.has(e.slice(t + 1).toLowerCase());
                    }(e.name)) && l.push(function(e, t) {
                        return t = null != t ? t : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : (function(e) {
                            var t = Object.keys(e);
                            if (Object.getOwnPropertySymbols) {
                                var r = Object.getOwnPropertySymbols(e);
                                t.push.apply(t, r);
                            }
                            return t;
                        })(Object(t)).forEach(function(r) {
                            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                        }), e;
                    }(r({}, e), {
                        parentFid: p,
                        parentName: null != (f = a.get(p)) ? f : '',
                        parentInLibrary: u.has(p)
                    }));
                }
            }
            return t.length > 0 && console.log(`${n} 扫描达到遍历上限（已走 ${d} 个目录、扫描 ${s} 项），结果可能不完整`), {
                videos: l,
                folders: o
            };
        })(), k = new Map(), C = 0;
        for (let e of $){
            let t = null != (o = s(e.name)) ? o : s(e.parentName);
            if (!t) {
                C++;
                continue;
            }
            let r = null != (a = k.get(t)) ? a : [];
            r.push(e), k.set(t, r);
        }
        let x = [
            ...k.keys()
        ].sort();
        console.log(`${n} 扫描到 ${$.length} 个视频，识别出 ${x.length} 部作品（${C} 个无番号跳过），模式=${'do' === y ? '整理' : '只报告'}`);
        let _ = 0, S = new Set(), q = [];
        for (let t of x){
            let r, n = k.get(t), l = t.toUpperCase().replace(/[^A-Z0-9]/g, ''), o = n.filter((e)=>e.parentInLibrary && e.parentName && !f(e.parentName).includes(l)), a = n.filter((e)=>!e.parentInLibrary);
            if (2 === n.length && 1 === o.length && 1 === a.length) {
                let r, l = o[0], u = a[0], d = yield N(t);
                !d && _ < 15 && (_++, d = yield T(e, t));
                let s = null != (p = null == (m = /\.([A-Za-z0-9]{2,5})$/.exec(u.name)) ? void 0 : m[1]) ? p : 'mp4', f = `${t}.${s}`;
                if ('report' === y) r = `将替换旧拷贝：删除「${l.parentName}」里的旧文件「${l.name}」，新文件改名为 ${f} 并归类到「${l.parentName}」（只报告，未执行）`;
                else {
                    let t = [];
                    try {
                        yield P(e, l.fid), t.push(`旧文件「${l.name}」已删除（在回收站，可恢复）`), u.name !== f && (yield A(e, u.fid, f), t.push(`新文件已改名为 ${f}`)), u.parentFid !== l.parentFid && (yield O(e, u.fid, l.parentFid)), t.push(`已归类到「${l.parentName}」`), r = `已替换旧拷贝：${t.join('；')}`;
                    } catch (e) {
                        r = `替换旧拷贝未完成${t.length > 0 ? `（已完成：${t.join('；')}）` : ''}：出错：${i(e)}`;
                    }
                }
                (null == d ? void 0 : d.actress) && S.add(d.actress), l.parentName && S.add(l.parentName), q.push({
                    code: t,
                    files: n,
                    info: d,
                    status: r
                });
                continue;
            }
            let d = n.every((e)=>e.parentInLibrary && e.parentName && !f(e.parentName).includes(l)), s = 1 === n.length, g = s ? null != (u = null == (c = /\.([A-Za-z0-9]{2,5})$/.exec(n[0].name)) ? void 0 : c[1]) ? u : 'mp4' : '', h = s ? `${t}.${g}` : '', $ = !s || n[0].name === h, b = !!(d && $), C = yield N(t), x = !1;
            if (b && !C && _ < 15 && (_++, x = !0, C = yield T(e, t)), b && (null == C ? void 0 : C.actress) && n.every((e)=>e.parentName === C.actress)) r = `已整理（文件夹「${n[0].parentName}」）`;
            else if (C || _ < 15) if (C || x || (_++, C = yield T(e, t)), C && C.actress) if ('report' === y) r = `将归类到「${C.actress}」` + (s && !$ ? `，文件改名为 ${h}` : '') + '（只报告，未执行）';
            else {
                let t = [];
                try {
                    let r = v ? yield W(e, v, C.actress) : '';
                    if (s && !$ && (yield A(e, n[0].fid, h), t.push(`文件已改名为 ${h}`)), r) {
                        for (let t of n)t.parentFid !== r && (yield O(e, t.fid, r));
                        t.push(`已归类到「${C.actress}」`);
                    } else t.push('女优文件夹创建失败，未移动');
                } catch (e) {
                    t.push(`整理失败：${i(e)}`);
                }
                r = t.join('；');
            }
            else r = '未查到女优（JavDB 无此番号或网络问题），暂未整理';
            else r = '待整理（本次查询额度已用完，下次打开继续）';
            (null == C ? void 0 : C.actress) && S.add(C.actress), q.push({
                code: t,
                files: n,
                info: C,
                status: r
            });
        }
        let D = new Map();
        if ('do' === y) {
            let t = new Set(v ? [
                v
            ] : []), r = !0;
            for(; r;)for (let e of (r = !1, b))t.has(e.parentFid) && !t.has(e.fid) && (t.add(e.fid), r = !0);
            let l = new Set();
            for (let e of (v && l.add(v), b))(t.has(e.fid) || d(e.name)) && !S.has(e.name) && l.add(e.fid);
            let o = [];
            for (let t of l){
                let r;
                try {
                    r = yield w(e, t);
                } catch (e) {
                    continue;
                }
                for (let t of r)if (!t.isDir && function(e) {
                    let t = String(null != e ? e : '').toLowerCase();
                    return !!(/\.(url|html?|mht|lnk)$/.test(t) || /\.txt$/.test(t) && /(最新地址|发布页|发布頁|永久地址|网址|會所|会所|论坛|論壇|\.com|\.net|\.xyz|\.top|http|www\.|@)/.test(t));
                }(t.name)) try {
                    yield P(e, t.fid), o.push(t.name);
                } catch (e) {
                    console.log(`${n} 垃圾文件删除跳过「${t.name}」: ${i(e)}`);
                }
            }
            for (let r of (o.length > 0 && console.log(`${n} 已清理垃圾文件 ${o.length} 个：${o.join('、')}`), b.filter((e)=>e.fid !== v && !!(t.has(e.fid) && !S.has(e.name) || d(e.name) || '0' === e.parentFid && S.has(e.name))).sort((e, t)=>t.depth - e.depth).slice(0, 60)))try {
                let t = yield w(e, r.fid);
                0 === t.length && (yield P(e, r.fid), D.set(r.fid, r.name));
            } catch (e) {
                console.log(`${n} 空文件夹清理跳过「${r.name}」: ${i(e)}`);
            }
            D.size > 0 && console.log(`${n} 已清理空文件夹 ${D.size} 个：${[
                ...D.values()
            ].join('、')}`);
        }
        let z = q.map(({ code: e, files: t, info: r, status: n })=>{
            var i;
            let l = n, o = t.map((e)=>{
                var t;
                return null != (t = e.parentFid) ? t : '';
            }).filter((e, t, r)=>e && D.has(e) && r.indexOf(e) === t).map((e)=>D.get(e));
            o.length > 0 && (l += `；已清理空文件夹「${o.join('」、「')}」`);
            let a = [
                `番号：${e}`,
                ...(null == r ? void 0 : r.actress) ? [
                    `女优：${r.actress}`
                ] : [],
                `状态：${l}`,
                `文件：${t.map((e)=>e.name).join('、')}`
            ];
            return {
                id: e,
                type: 'detail',
                title: (null == r ? void 0 : r.title) ? `${e} ${r.title}` : e,
                link: null != (i = null == r ? void 0 : r.link) ? i : `organizer:${e}`,
                posterPath: (null == r ? void 0 : r.cover) || void 0,
                coverUrl: (null == r ? void 0 : r.cover) || void 0,
                backdropPath: (null == r ? void 0 : r.cover) || void 0,
                description: a.join('\n'),
                mediaType: 'movie'
            };
        });
        return console.log(`${n} 片库整理完成：${z.length} 部作品`), z;
    })(), loadDetail = (e, r)=>t(function*() {
        var t, a, d, f, p;
        let v;
        if (!e) return null;
        yield g(r);
        let C = e, x = null;
        if (e.startsWith('organizer:')) {
            if (!(x = u(e.slice(10)))) return null;
            try {
                let e = `${c}/search?${o({
                    q: x,
                    f: 'all'
                })}`, r = yield h(e), n = yield y(r, e), i = null != (t = n.find((e)=>e.code === x)) ? t : n[0];
                if (!i) return null;
                C = i.link;
            } catch (e) {
                return console.log(`${n} 详情搜索失败: ${i(e)}`), null;
            }
        }
        let _ = yield m(r);
        try {
            v = yield h(C, _);
        } catch (e) {
            return console.log(`${n} 详情获取失败: ${i(e)}`), null;
        }
        try {
            let e = yield Widget.html.load(v), t = $(e), r = x, n = b(t, [
                '番號',
                '番号'
            ]);
            n && (r = null != (a = u(n.valueText)) ? a : r), r || (r = s(e('title').first().text()));
            let i = e('h2 strong.current-title').first().text().trim(), o = null != (d = e('meta[property="og:title"]').attr('content')) ? d : '', c = i || o || r || C, g = null != (f = e('img.video-cover').first().attr('src')) ? f : '';
            g || (g = null != (p = e('meta[property="og:image"]').attr('content')) ? p : ''), g = l(C, g);
            let m = k(e, t).map((e)=>({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                })), h = [];
            return r && h.push(`番号：${r}`), m.length > 0 && h.push(`女优：${m.map((e)=>e.title).join('、')}`), h.push('播放资源由 AVDB夸克版 提供（夸克原画 / MemoJav 等）。'), {
                id: null != r ? r : C,
                type: 'detail',
                title: c,
                link: C,
                posterPath: g || void 0,
                detailPoster: g || void 0,
                coverUrl: g || void 0,
                backdropPath: g || void 0,
                peoples: m.length > 0 ? m : void 0,
                description: h.join('\n'),
                mediaType: 'movie'
            };
        } catch (e) {
            return console.log(`${n} 详情解析失败: ${i(e)}`), null;
        }
    })();
