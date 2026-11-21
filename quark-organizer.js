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
    description: '夸克网盘 AV 作品批量整理：打开「片库整理」即扫描整个网盘，按番号认出作品，去 JavDB 查女优，把文件改成番号名并按女优归类到「艺术」文件夹（可在参数里改）下的女优文件夹，整理后自动清理艺术内的垃圾文件和空文件夹。播放请用 AVDB夸克版。使用前请在全局参数中填写自己的夸克网盘 Cookie。',
    author: 'v7777',
    site: 'https://pan.quark.cn',
    version: "0.1.7",
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
function s(e) {
    let t = String(null != e ? e : '').toUpperCase();
    return /(?:^|[^A-Z])FC2[- ]?PPV[- ]?\d{5,7}/.test(t) || /(?:^|[^0-9])\d{6}[-_]\d{3}(?![0-9])/.test(t) || /(?:^|[^A-Z])[A-Z]{2,6}-S\d{1,3}(?![0-9])/.test(t) || /(?:^|[^A-Z])[A-Z]{2,6}-\s*\d{2,6}(?![0-9])/.test(t);
}
function d(...e) {
    for (let t of e){
        if (!t) continue;
        let e = u(t);
        if (e) return e;
    }
    return null;
}
let f = 'https://javdb.com', c = 'javdb_cookie_mirror';
function p(e) {
    return t(function*() {
        try {
            if (!e || 'string' != typeof e.javdbCookie) return;
            let t = e.javdbCookie.trim();
            t ? yield Widget.storage.set(c, t) : yield Widget.storage.remove(c);
        } catch (e) {}
    })();
}
function g(e) {
    return t(function*() {
        if (e && 'string' == typeof e.javdbCookie && e.javdbCookie.trim()) return e.javdbCookie.trim();
        try {
            let e = yield Widget.storage.get(c);
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
            Referer: `${f}/`
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
function m(e, r) {
    return t(function*() {
        let t = yield Widget.html.load(e), n = t('a.box');
        0 === n.length && (n = t('.movie-list a.box, .grid a.box'));
        let i = [], o = new Set();
        return n.each((e, n)=>{
            var a, s, f, c, p;
            let g = t(n), h = l(r, null != (a = g.attr('href')) ? a : '');
            if (!h || o.has(h)) return;
            o.add(h);
            let m = g.find('.video-title strong').first().text().trim(), y = (null != (s = g.attr('title')) ? s : '').trim(), v = g.find('.video-title').first().text().trim(), $ = null != (f = u(m)) ? f : d(y, v), k = null != (c = null != (p = g.find('img').first().attr('src')) ? p : g.find('img').first().attr('data-src')) ? c : '';
            k = l(r, k), i.push({
                code: $,
                title: y || v || $ || h,
                link: h,
                cover: k
            });
        }), i;
    })();
}
function y(e) {
    return e.replace(/[:：\s]/g, '');
}
function v(e) {
    let t = e('nav.panel.movie-panel-info').first(), r = [];
    if (0 === t.length) return r;
    let n = t.find('> div, .panel-block'), i = new Set();
    return n.each((t, n)=>{
        if (i.has(n)) return;
        i.add(n);
        let l = e(n), o = l.find('strong').first();
        if (0 === o.length) return;
        let a = y(o.text());
        if (!a) return;
        let u = l.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
        r.push({
            label: a,
            valueText: u,
            $row: l
        });
    }), r;
}
function $(e, t) {
    return e.find((e)=>t.includes(e.label));
}
function k(e, t) {
    let r = $(t, [
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
        if ('strong' === e.kind && !i && y(e.text) === r.label) {
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
let b = 'quark_cookie_dyn', C = 'quark_cookie_base_fp';
function x(e) {
    let t = 5381;
    for(let r = 0; r < e.length; r++)t = (t << 5) + t + e.charCodeAt(r) | 0;
    return `${e.length}:${(t >>> 0).toString(16)}`;
}
let _ = new Set([
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
        var u, s;
        let d, f = yield t(function*() {
            var t;
            let r = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!r) return '';
            try {
                if ((yield Widget.storage.get(C)) === x(r)) {
                    let e = yield Widget.storage.get(b);
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
        d = 'GET' === n ? yield Widget.http.get(p, {
            headers: g
        }) : yield Widget.http.post(p, null != a ? a : {}, {
            headers: g
        }), yield (u = null == d ? void 0 : d.headers, t(function*() {
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
                o && (yield Widget.storage.set(b, l), yield Widget.storage.set(C, x(n)));
            } catch (e) {}
        })());
        let h = 'number' == typeof (null == d ? void 0 : d.statusCode) ? d.statusCode : 200;
        if (h >= 400) throw Error(`HTTP ${h}: 夸克接口 ${i}`);
        let m = function(e) {
            if (null == e) return null;
            if ('object' == typeof e) return e;
            if ('string' == typeof e) try {
                return JSON.parse(e);
            } catch (e) {}
            return null;
        }(null == d ? void 0 : d.data);
        if (!m) throw Error(`夸克接口 ${i} 返回了无法解析的内容`);
        if ('number' == typeof m.status && m.status >= 400 || void 0 !== m.code && 0 !== m.code) throw Error(`夸克接口 ${i} 出错: ${null != (s = m.message) ? s : `code=${m.code}`}`);
        return m;
    })();
}
function j(e, r) {
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
            }), s = Array.isArray(null == u || null == (i = u.data) ? void 0 : i.list) ? u.data.list : [];
            for (let e of s)t.push({
                fid: String(null != (o = e.fid) ? o : ''),
                name: String(null != (a = e.file_name) ? a : ''),
                size: 'number' == typeof e.size ? e.size : 0,
                category: 'number' == typeof e.category ? e.category : 0,
                isDir: !1 === e.file
            });
            let d = null == u || null == (l = u.metadata) ? void 0 : l._total;
            if (0 === s.length || 'number' == typeof d && t.length >= d || s.length < 100) break;
        }
        return t;
    })();
}
function w(e, r) {
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
function A(e, r, l) {
    return t(function*() {
        let t = (yield j(e, r)).find((e)=>e.isDir && e.name === l);
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
                let n = null != (a = null == (u = (yield j(e, r)).find((e)=>e.isDir && e.name === l)) ? void 0 : u.fid) ? a : '';
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
let O = 'org_work_';
function P(e) {
    return t(function*() {
        try {
            let l = yield Widget.storage.get(O + e.toUpperCase());
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
function W(e, r) {
    return t(function*() {
        let a = yield P(r);
        if (a) return a;
        let u = null;
        try {
            u = yield t(function*() {
                var t, n, i, a, u, s;
                let d = `${f}/search?${o({
                    q: r,
                    f: 'all'
                })}`, c = yield h(d), p = yield m(c, d);
                if (0 === p.length) return null;
                let y = null != (t = p.find((e)=>e.code === r)) ? t : p[0], $ = yield g(e), b = yield h(y.link, $), C = yield Widget.html.load(b), x = v(C), _ = k(C, x), S = null != (n = C('img.video-cover').first().attr('src')) ? n : '';
                S || (S = null != (i = C('meta[property="og:image"]').attr('content')) ? i : ''), S = l(y.link, S) || y.cover;
                let j = C('h2 strong.current-title').first().text().trim(), w = null != (a = C('meta[property="og:title"]').attr('content')) ? a : '';
                return {
                    actress: (null != (u = null == (s = _[0]) ? void 0 : s.name) ? u : '').replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60),
                    cover: S,
                    title: j || w || y.title,
                    link: y.link
                };
            })();
        } catch (e) {
            console.log(`${n} JavDB 查询 ${r} 失败: ${i(e)}`);
        }
        if (u) try {
            yield Widget.storage.set(O + r.toUpperCase(), JSON.stringify({
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
        var l, o, a, u, f, c;
        yield p(e);
        let g = (null != (l = e.organizeMode) ? l : 'do') === 'report' ? 'report' : 'do', h = yield (c = 'do' === g, t(function*() {
            var t;
            let r = (null != (t = e.libraryRoot) ? t : '').trim();
            if ('/' === r) return '0';
            let n = '' === r ? '艺术' : r, i = (yield j(e, '0')).find((e)=>e.isDir && e.name === n);
            return i ? i.fid : c ? A(e, '0', n) : '';
        })()), { videos: m, folders: y } = yield t(function*() {
            let t = [
                {
                    fid: '0',
                    depth: 0
                }
            ], l = [], o = [], a = new Map(), u = new Set(), s = 0, d = 0;
            for(; t.length > 0 && s < 120 && d < 8000;){
                let c, { fid: p, depth: g } = t.shift();
                s++;
                try {
                    c = yield j(e, p);
                } catch (e) {
                    console.log(`${n} 目录 ${p} 列取失败，跳过: ${i(e)}`);
                    continue;
                }
                for (let e of c){
                    var f;
                    if (d++, e.isDir) {
                        a.set(e.fid, e.name), o.push({
                            fid: e.fid,
                            name: e.name,
                            depth: g + 1,
                            parentFid: p
                        }), p === h && u.add(e.fid), t.push({
                            fid: e.fid,
                            depth: g + 1
                        });
                        continue;
                    }
                    (1 === e.category || function(e) {
                        let t = e.lastIndexOf('.');
                        return !(t < 0) && _.has(e.slice(t + 1).toLowerCase());
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
            return t.length > 0 && console.log(`${n} 扫描达到遍历上限（已走 ${s} 个目录、扫描 ${d} 项），结果可能不完整`), {
                videos: l,
                folders: o
            };
        })(), v = new Map(), $ = 0;
        for (let e of m){
            let t = null != (o = d(e.name)) ? o : d(e.parentName);
            if (!t) {
                $++;
                continue;
            }
            let r = null != (a = v.get(t)) ? a : [];
            r.push(e), v.set(t, r);
        }
        let k = [
            ...v.keys()
        ].sort();
        console.log(`${n} 扫描到 ${m.length} 个视频，识别出 ${k.length} 部作品（${$} 个无番号跳过），模式=${'do' === g ? '整理' : '只报告'}`);
        let b = 0, C = new Set(), x = [];
        for (let r of k){
            let n, l = v.get(r), o = r.toUpperCase().replace(/[^A-Z0-9]/g, ''), a = l.every((e)=>e.parentInLibrary && e.parentName && !e.parentName.toUpperCase().replace(/[^A-Z0-9]/g, '').includes(o)), s = 1 === l.length, d = s ? null != (u = null == (f = /\.([A-Za-z0-9]{2,5})$/.exec(l[0].name)) ? void 0 : f[1]) ? u : 'mp4' : '', c = s ? `${r}.${d}` : '', p = !s || l[0].name === c, m = !!(a && p), y = yield P(r), $ = !1;
            if (m && !y && b < 15 && (b++, $ = !0, y = yield W(e, r)), m && (null == y ? void 0 : y.actress) && l.every((e)=>e.parentName === y.actress)) n = `已整理（文件夹「${l[0].parentName}」）`;
            else if (y || b < 15) if (y || $ || (b++, y = yield W(e, r)), y && y.actress) if ('report' === g) n = `将归类到「${y.actress}」` + (s && !p ? `，文件改名为 ${c}` : '') + '（只报告，未执行）';
            else {
                let r = [];
                try {
                    let n = h ? yield A(e, h, y.actress) : '';
                    if (s && !p && (yield function(e, r, n) {
                        return t(function*() {
                            yield S(e, 'POST', '/file/rename', {}, {
                                fid: r,
                                file_name: n
                            });
                        })();
                    }(e, l[0].fid, c), r.push(`文件已改名为 ${c}`)), n) {
                        for (let r of l)r.parentFid !== n && (yield function(e, r, n) {
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
                        }(e, r.fid, n));
                        r.push(`已归类到「${y.actress}」`);
                    } else r.push('女优文件夹创建失败，未移动');
                } catch (e) {
                    r.push(`整理失败：${i(e)}`);
                }
                n = r.join('；');
            }
            else n = '未查到女优（JavDB 无此番号或网络问题），暂未整理';
            else n = '待整理（本次查询额度已用完，下次打开继续）';
            (null == y ? void 0 : y.actress) && C.add(y.actress), x.push({
                code: r,
                files: l,
                info: y,
                status: n
            });
        }
        let O = new Map();
        if ('do' === g) {
            let t = new Set(h ? [
                h
            ] : []), r = !0;
            for(; r;)for (let e of (r = !1, y))t.has(e.parentFid) && !t.has(e.fid) && (t.add(e.fid), r = !0);
            let l = new Set();
            for (let e of (h && l.add(h), y))(t.has(e.fid) || s(e.name)) && !C.has(e.name) && l.add(e.fid);
            let o = [];
            for (let t of l){
                let r;
                try {
                    r = yield j(e, t);
                } catch (e) {
                    continue;
                }
                for (let t of r)if (!t.isDir && function(e) {
                    let t = String(null != e ? e : '').toLowerCase();
                    return !!(/\.(url|html?|mht|lnk)$/.test(t) || /\.txt$/.test(t) && /(最新地址|发布页|发布頁|永久地址|网址|會所|会所|论坛|論壇|\.com|\.net|\.xyz|\.top|http|www\.|@)/.test(t));
                }(t.name)) try {
                    yield w(e, t.fid), o.push(t.name);
                } catch (e) {
                    console.log(`${n} 垃圾文件删除跳过「${t.name}」: ${i(e)}`);
                }
            }
            for (let r of (o.length > 0 && console.log(`${n} 已清理垃圾文件 ${o.length} 个：${o.join('、')}`), y.filter((e)=>e.fid !== h && !!(t.has(e.fid) && !C.has(e.name) || s(e.name) || '0' === e.parentFid && C.has(e.name))).sort((e, t)=>t.depth - e.depth).slice(0, 60)))try {
                let t = yield j(e, r.fid);
                0 === t.length && (yield w(e, r.fid), O.set(r.fid, r.name));
            } catch (e) {
                console.log(`${n} 空文件夹清理跳过「${r.name}」: ${i(e)}`);
            }
            O.size > 0 && console.log(`${n} 已清理空文件夹 ${O.size} 个：${[
                ...O.values()
            ].join('、')}`);
        }
        let q = x.map(({ code: e, files: t, info: r, status: n })=>{
            var i;
            let l = n, o = t.map((e)=>{
                var t;
                return null != (t = e.parentFid) ? t : '';
            }).filter((e, t, r)=>e && O.has(e) && r.indexOf(e) === t).map((e)=>O.get(e));
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
        return console.log(`${n} 片库整理完成：${q.length} 部作品`), q;
    })(), loadDetail = (e, r)=>t(function*() {
        var t, a, s, c, y;
        let b;
        if (!e) return null;
        yield p(r);
        let C = e, x = null;
        if (e.startsWith('organizer:')) {
            if (!(x = u(e.slice(10)))) return null;
            try {
                let e = `${f}/search?${o({
                    q: x,
                    f: 'all'
                })}`, r = yield h(e), n = yield m(r, e), i = null != (t = n.find((e)=>e.code === x)) ? t : n[0];
                if (!i) return null;
                C = i.link;
            } catch (e) {
                return console.log(`${n} 详情搜索失败: ${i(e)}`), null;
            }
        }
        let _ = yield g(r);
        try {
            b = yield h(C, _);
        } catch (e) {
            return console.log(`${n} 详情获取失败: ${i(e)}`), null;
        }
        try {
            let e = yield Widget.html.load(b), t = v(e), r = x, n = $(t, [
                '番號',
                '番号'
            ]);
            n && (r = null != (a = u(n.valueText)) ? a : r), r || (r = d(e('title').first().text()));
            let i = e('h2 strong.current-title').first().text().trim(), o = null != (s = e('meta[property="og:title"]').attr('content')) ? s : '', f = i || o || r || C, p = null != (c = e('img.video-cover').first().attr('src')) ? c : '';
            p || (p = null != (y = e('meta[property="og:image"]').attr('content')) ? y : ''), p = l(C, p);
            let g = k(e, t).map((e)=>({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                })), h = [];
            return r && h.push(`番号：${r}`), g.length > 0 && h.push(`女优：${g.map((e)=>e.title).join('、')}`), h.push('播放资源由 AVDB夸克版 提供（夸克原画 / MemoJav 等）。'), {
                id: null != r ? r : C,
                type: 'detail',
                title: f,
                link: C,
                posterPath: p || void 0,
                detailPoster: p || void 0,
                coverUrl: p || void 0,
                backdropPath: p || void 0,
                peoples: g.length > 0 ? g : void 0,
                description: h.join('\n'),
                mediaType: 'movie'
            };
        } catch (e) {
            return console.log(`${n} 详情解析失败: ${i(e)}`), null;
        }
    })();
