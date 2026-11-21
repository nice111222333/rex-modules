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
    description: '夸克网盘 AV 作品批量整理：打开「片库整理」即扫描整个网盘，按番号认出作品，去 JavDB 查女优，把文件改成番号名并按女优归类到「艺术」文件夹（可在参数里改）下的女优文件夹，整理后自动删除空的番号文件夹。播放请用 AVDB夸克版。使用前请在全局参数中填写自己的夸克网盘 Cookie。',
    author: 'v7777',
    site: 'https://pan.quark.cn',
    version: "0.1.4",
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
    var t;
    if (!e) return null;
    let r = String(e).toUpperCase(), n = null != (t = /(?:^|[^A-Z0-9])FC2[- ]?PPV[- ]?(\d{5,7})(?![0-9])/.exec(r)) ? t : /(?:^|[^A-Z0-9])FC2[- ]?(\d{5,7})(?![0-9])/.exec(r);
    if (n) return `FC2-PPV-${n[1]}`;
    let i = /(?:^|[^A-Z])([A-Z]{2,6})-(\d{2,6})(?![0-9])/.exec(r);
    if (i) return `${i[1]}-${i[2]}`;
    let l = /(?:^|[^A-Z0-9])([A-Z]{2,6})(\d{3,6})(?![0-9])/.exec(r);
    return l ? `${l[1]}-${l[2]}` : null;
}
function u(...e) {
    for (let t of e){
        if (!t) continue;
        let e = a(t);
        if (e) return e;
    }
    return null;
}
let s = 'https://javdb.com', d = 'javdb_cookie_mirror';
function c(e) {
    return t(function*() {
        try {
            if (!e || 'string' != typeof e.javdbCookie) return;
            let t = e.javdbCookie.trim();
            t ? yield Widget.storage.set(d, t) : yield Widget.storage.remove(d);
        } catch (e) {}
    })();
}
function f(e) {
    return t(function*() {
        if (e && 'string' == typeof e.javdbCookie && e.javdbCookie.trim()) return e.javdbCookie.trim();
        try {
            let e = yield Widget.storage.get(d);
            if ('string' == typeof e && e.trim()) return e.trim();
        } catch (e) {}
        return '';
    })();
}
function p(e, r) {
    return t(function*() {
        var n;
        let i, l = yield (i = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${s}/`
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
function g(e, r) {
    return t(function*() {
        let t = yield Widget.html.load(e), n = t('a.box');
        0 === n.length && (n = t('.movie-list a.box, .grid a.box'));
        let i = [], o = new Set();
        return n.each((e, n)=>{
            var s, d, c, f, p;
            let g = t(n), m = l(r, null != (s = g.attr('href')) ? s : '');
            if (!m || o.has(m)) return;
            o.add(m);
            let h = g.find('.video-title strong').first().text().trim(), y = (null != (d = g.attr('title')) ? d : '').trim(), v = g.find('.video-title').first().text().trim(), $ = null != (c = a(h)) ? c : u(y, v), k = null != (f = null != (p = g.find('img').first().attr('src')) ? p : g.find('img').first().attr('data-src')) ? f : '';
            k = l(r, k), i.push({
                code: $,
                title: y || v || $ || m,
                link: m,
                cover: k
            });
        }), i;
    })();
}
function m(e) {
    return e.replace(/[:：\s]/g, '');
}
function h(e) {
    let t = e('nav.panel.movie-panel-info').first(), r = [];
    if (0 === t.length) return r;
    let n = t.find('> div, .panel-block'), i = new Set();
    return n.each((t, n)=>{
        if (i.has(n)) return;
        i.add(n);
        let l = e(n), o = l.find('strong').first();
        if (0 === o.length) return;
        let a = m(o.text());
        if (!a) return;
        let u = l.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
        r.push({
            label: a,
            valueText: u,
            $row: l
        });
    }), r;
}
function y(e, t) {
    return e.find((e)=>t.includes(e.label));
}
function v(e, t) {
    let r = y(t, [
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
        if ('strong' === e.kind && !i && m(e.text) === r.label) {
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
let $ = 'quark_cookie_dyn', k = 'quark_cookie_base_fp';
function b(e) {
    let t = 5381;
    for(let r = 0; r < e.length; r++)t = (t << 5) + t + e.charCodeAt(r) | 0;
    return `${e.length}:${(t >>> 0).toString(16)}`;
}
let C = new Set([
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
function _(e, n, i, l, a) {
    return t(function*() {
        var u, s;
        let d, c = yield t(function*() {
            var t;
            let r = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!r) return '';
            try {
                if ((yield Widget.storage.get(k)) === b(r)) {
                    let e = yield Widget.storage.get($);
                    if ('string' == typeof e && e.trim()) return e;
                }
            } catch (e) {}
            return r;
        })();
        if (!c) throw Error('未填写夸克网盘 Cookie（模块全局参数 quarkCookie）');
        let f = o(r({
            pr: 'ucpro',
            fr: 'pc'
        }, l)), p = `https://drive.quark.cn/1/clouddrive${i}?${f}`, g = {
            Cookie: c,
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
                let l = c, o = !1;
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
                o && (yield Widget.storage.set($, l), yield Widget.storage.set(k, b(n)));
            } catch (e) {}
        })());
        let m = 'number' == typeof (null == d ? void 0 : d.statusCode) ? d.statusCode : 200;
        if (m >= 400) throw Error(`HTTP ${m}: 夸克接口 ${i}`);
        let h = function(e) {
            if (null == e) return null;
            if ('object' == typeof e) return e;
            if ('string' == typeof e) try {
                return JSON.parse(e);
            } catch (e) {}
            return null;
        }(null == d ? void 0 : d.data);
        if (!h) throw Error(`夸克接口 ${i} 返回了无法解析的内容`);
        if ('number' == typeof h.status && h.status >= 400 || void 0 !== h.code && 0 !== h.code) throw Error(`夸克接口 ${i} 出错: ${null != (s = h.message) ? s : `code=${h.code}`}`);
        return h;
    })();
}
function x(e, r) {
    return t(function*() {
        let t = [], n = 1;
        for(; n <= 20; n++){
            var i, l, o, a;
            let u = yield _(e, 'GET', '/file/sort', {
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
function j(e, r, l) {
    return t(function*() {
        let t = (yield x(e, r)).find((e)=>e.isDir && e.name === l);
        if (t) return t.fid;
        try {
            yield _(e, 'POST', '/file', {}, {
                dir_init_lock: !1,
                dir_path: '',
                file_name: l,
                pdir_fid: r
            });
        } catch (e) {
            console.log(`${n} 创建文件夹「${l}」失败（可能已有同名）: ${i(e)}`);
        }
        for(let t = 0; t < 3; t++){
            var o, a;
            let t = null != (o = null == (a = (yield x(e, r)).find((e)=>e.isDir && e.name === l)) ? void 0 : a.fid) ? o : '';
            if (t) return t;
            yield new Promise((e)=>{
                'function' == typeof setTimeout ? setTimeout(e, 800) : e();
            });
        }
        return '';
    })();
}
let O = 'org_work_';
function S(e) {
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
function P(e, r) {
    return t(function*() {
        let a = yield S(r);
        if (a) return a;
        let u = null;
        try {
            u = yield t(function*() {
                var t, n, i, a, u, d;
                let c = `${s}/search?${o({
                    q: r,
                    f: 'all'
                })}`, m = yield p(c), y = yield g(m, c);
                if (0 === y.length) return null;
                let $ = null != (t = y.find((e)=>e.code === r)) ? t : y[0], k = yield f(e), b = yield p($.link, k), C = yield Widget.html.load(b), _ = h(C), x = v(C, _), j = null != (n = C('img.video-cover').first().attr('src')) ? n : '';
                j || (j = null != (i = C('meta[property="og:image"]').attr('content')) ? i : ''), j = l($.link, j) || $.cover;
                let O = C('h2 strong.current-title').first().text().trim(), S = null != (a = C('meta[property="og:title"]').attr('content')) ? a : '';
                return {
                    actress: (null != (u = null == (d = x[0]) ? void 0 : d.name) ? u : '').replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60),
                    cover: j,
                    title: O || S || $.title,
                    link: $.link
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
        var l, o, a, s, d, f;
        yield c(e);
        let p = (null != (l = e.organizeMode) ? l : 'do') === 'report' ? 'report' : 'do', g = yield (f = 'do' === p, t(function*() {
            var t;
            let r = (null != (t = e.libraryRoot) ? t : '').trim();
            if ('/' === r) return '0';
            let n = '' === r ? '艺术' : r, i = (yield x(e, '0')).find((e)=>e.isDir && e.name === n);
            return i ? i.fid : f ? j(e, '0', n) : '';
        })()), { videos: m, folders: h } = yield t(function*() {
            let t = [
                {
                    fid: '0',
                    depth: 0
                }
            ], l = [], o = [], a = new Map(), u = new Set(), s = 0, d = 0;
            for(; t.length > 0 && s < 120 && d < 8000;){
                let f, { fid: p, depth: m } = t.shift();
                s++;
                try {
                    f = yield x(e, p);
                } catch (e) {
                    console.log(`${n} 目录 ${p} 列取失败，跳过: ${i(e)}`);
                    continue;
                }
                for (let e of f){
                    var c;
                    if (d++, e.isDir) {
                        a.set(e.fid, e.name), o.push({
                            fid: e.fid,
                            name: e.name,
                            depth: m + 1
                        }), p === g && u.add(e.fid), t.push({
                            fid: e.fid,
                            depth: m + 1
                        });
                        continue;
                    }
                    (1 === e.category || function(e) {
                        let t = e.lastIndexOf('.');
                        return !(t < 0) && C.has(e.slice(t + 1).toLowerCase());
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
                        parentName: null != (c = a.get(p)) ? c : '',
                        parentInLibrary: u.has(p)
                    }));
                }
            }
            return t.length > 0 && console.log(`${n} 扫描达到遍历上限（已走 ${s} 个目录、扫描 ${d} 项），结果可能不完整`), {
                videos: l,
                folders: o
            };
        })(), y = new Map(), v = 0;
        for (let e of m){
            let t = null != (o = u(e.name)) ? o : u(e.parentName);
            if (!t) {
                v++;
                continue;
            }
            let r = null != (a = y.get(t)) ? a : [];
            r.push(e), y.set(t, r);
        }
        let $ = [
            ...y.keys()
        ].sort();
        console.log(`${n} 扫描到 ${m.length} 个视频，识别出 ${$.length} 部作品（${v} 个无番号跳过），模式=${'do' === p ? '整理' : '只报告'}`);
        let k = 0, b = [];
        for (let r of $){
            let n, l = y.get(r), o = r.toUpperCase().replace(/[^A-Z0-9]/g, ''), a = l.every((e)=>e.parentInLibrary && e.parentName && !e.parentName.toUpperCase().replace(/[^A-Z0-9]/g, '').includes(o)), u = 1 === l.length, c = u ? null != (s = null == (d = /\.([A-Za-z0-9]{2,5})$/.exec(l[0].name)) ? void 0 : d[1]) ? s : 'mp4' : '', f = u ? `${r}.${c}` : '', m = !u || l[0].name === f, h = !!(a && m), v = yield S(r), $ = !1;
            if (h && !v && k < 15 && (k++, $ = !0, v = yield P(e, r)), h && (null == v ? void 0 : v.actress) && l.every((e)=>e.parentName === v.actress)) n = `已整理（文件夹「${l[0].parentName}」）`;
            else if (v || k < 15) if (v || $ || (k++, v = yield P(e, r)), v && v.actress) if ('report' === p) n = `将归类到「${v.actress}」` + (u && !m ? `，文件改名为 ${f}` : '') + '（只报告，未执行）';
            else {
                let r = [];
                try {
                    let n = g ? yield j(e, g, v.actress) : '';
                    if (u && !m && (yield function(e, r, n) {
                        return t(function*() {
                            yield _(e, 'POST', '/file/rename', {}, {
                                fid: r,
                                file_name: n
                            });
                        })();
                    }(e, l[0].fid, f), r.push(`文件已改名为 ${f}`)), n) {
                        for (let r of l)r.parentFid !== n && (yield function(e, r, n) {
                            return t(function*() {
                                yield _(e, 'POST', '/file/move', {}, {
                                    action_type: 1,
                                    exclude_fids: [],
                                    filelist: [
                                        r
                                    ],
                                    to_pdir_fid: n
                                });
                            })();
                        }(e, r.fid, n));
                        r.push(`已归类到「${v.actress}」`);
                    } else r.push('女优文件夹创建失败，未移动');
                } catch (e) {
                    r.push(`整理失败：${i(e)}`);
                }
                n = r.join('；');
            }
            else n = '未查到女优（JavDB 无此番号或网络问题），暂未整理';
            else n = '待整理（本次查询额度已用完，下次打开继续）';
            b.push({
                code: r,
                files: l,
                info: v,
                status: n
            });
        }
        let O = new Map();
        if ('do' === p) {
            for (let r of h.filter((e)=>{
                var t;
                let r;
                return e.fid !== g && (r = String(null != (t = e.name) ? t : '').toUpperCase(), /(?:^|[^A-Z])FC2[- ]?PPV[- ]?\d{5,7}/.test(r) || /(?:^|[^A-Z])[A-Z]{2,6}-\d{2,6}(?![0-9])/.test(r));
            }).sort((e, t)=>t.depth - e.depth).slice(0, 60))try {
                let n = yield x(e, r.fid);
                0 === n.length && (yield function(e, r) {
                    return t(function*() {
                        yield _(e, 'POST', '/file/delete', {}, {
                            action_type: 1,
                            exclude_fids: [],
                            filelist: [
                                r
                            ]
                        });
                    })();
                }(e, r.fid), O.set(r.fid, r.name));
            } catch (e) {
                console.log(`${n} 空文件夹清理跳过「${r.name}」: ${i(e)}`);
            }
            O.size > 0 && console.log(`${n} 已清理空番号文件夹 ${O.size} 个：${[
                ...O.values()
            ].join('、')}`);
        }
        let w = b.map(({ code: e, files: t, info: r, status: n })=>{
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
        return console.log(`${n} 片库整理完成：${w.length} 部作品`), w;
    })(), loadDetail = (e, r)=>t(function*() {
        var t, d, m, $, k;
        let b;
        if (!e) return null;
        yield c(r);
        let C = e, _ = null;
        if (e.startsWith('organizer:')) {
            if (!(_ = a(e.slice(10)))) return null;
            try {
                let e = `${s}/search?${o({
                    q: _,
                    f: 'all'
                })}`, r = yield p(e), n = yield g(r, e), i = null != (t = n.find((e)=>e.code === _)) ? t : n[0];
                if (!i) return null;
                C = i.link;
            } catch (e) {
                return console.log(`${n} 详情搜索失败: ${i(e)}`), null;
            }
        }
        let x = yield f(r);
        try {
            b = yield p(C, x);
        } catch (e) {
            return console.log(`${n} 详情获取失败: ${i(e)}`), null;
        }
        try {
            let e = yield Widget.html.load(b), t = h(e), r = _, n = y(t, [
                '番號',
                '番号'
            ]);
            n && (r = null != (d = a(n.valueText)) ? d : r), r || (r = u(e('title').first().text()));
            let i = e('h2 strong.current-title').first().text().trim(), o = null != (m = e('meta[property="og:title"]').attr('content')) ? m : '', s = i || o || r || C, c = null != ($ = e('img.video-cover').first().attr('src')) ? $ : '';
            c || (c = null != (k = e('meta[property="og:image"]').attr('content')) ? k : ''), c = l(C, c);
            let f = v(e, t).map((e)=>({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                })), p = [];
            return r && p.push(`番号：${r}`), f.length > 0 && p.push(`女优：${f.map((e)=>e.title).join('、')}`), p.push('播放资源由 AVDB夸克版 提供（夸克原画 / MemoJav 等）。'), {
                id: null != r ? r : C,
                type: 'detail',
                title: s,
                link: C,
                posterPath: c || void 0,
                detailPoster: c || void 0,
                coverUrl: c || void 0,
                backdropPath: c || void 0,
                peoples: f.length > 0 ? f : void 0,
                description: p.join('\n'),
                mediaType: 'movie'
            };
        } catch (e) {
            return console.log(`${n} 详情解析失败: ${i(e)}`), null;
        }
    })();
