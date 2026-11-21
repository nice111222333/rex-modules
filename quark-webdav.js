function e(e, t, i, n, r, l, o) {
    try {
        var u = e[l](o), a = u.value;
    } catch (e) {
        i(e);
        return;
    }
    u.done ? t(a) : Promise.resolve(a).then(n, r);
}
function t(t) {
    return function() {
        var i = this, n = arguments;
        return new Promise(function(r, l) {
            var o = t.apply(i, n);
            function u(t) {
                e(o, r, l, u, a, "next", t);
            }
            function a(t) {
                e(o, r, l, u, a, "throw", t);
            }
            u(void 0);
        });
    };
}
WidgetMetadata = {
    id: 'v7777-quark-webdav',
    title: '夸克片库',
    description: '你的夸克网盘片库（经 AList WebDAV 播放）：按番号列出网盘「艺术」里的作品，封面和信息取自 JavDB，播放走 AList WebDAV（流畅）。需先把夸克挂载到 AList，并在全局参数中填写 AList 地址、令牌和账号密码。把「我的片库」添加到首页即可当片库分区用。',
    author: 'v7777',
    site: 'https://pan.quark.cn',
    version: "0.1.4",
    requiredVersion: '0.0.2',
    detailCacheDuration: 60,
    globalParams: [
        {
            name: 'alistBase',
            title: 'AList 地址',
            type: 'input',
            description: '必填。你 AList 的访问地址，手机能打开的那个，如 http://192.168.1.10:5244',
            value: ''
        },
        {
            name: 'alistToken',
            title: 'AList 令牌',
            type: 'input',
            description: '必填。AList 后台 → 设置 → 其他 → 令牌，复制填入（不要发给任何人）',
            value: ''
        },
        {
            name: 'alistUser',
            title: 'AList 账号',
            type: 'input',
            description: '必填（WebDAV 线路）。就是你在 Rex 里添加 WebDAV 时用的那个 AList 账号',
            value: ''
        },
        {
            name: 'alistPass',
            title: 'AList 密码',
            type: 'input',
            description: '必填（WebDAV 线路）。同上，那个账号的密码',
            value: ''
        },
        {
            name: 'alistRoot',
            title: '片库路径',
            type: 'input',
            description: '可选。片库在 AList 里的路径，留空 = /夸克/艺术；放的位置不同就改成对应路径，如 /夸克',
            value: ''
        },
        {
            name: 'javdbCookie',
            title: 'JavDB Cookie',
            type: 'input',
            description: '可选。在浏览器登录 javdb.com 后复制完整 Cookie；补作品信息时详情页携带（与夸克AV整理里填的同一份即可）',
            value: ''
        }
    ],
    modules: [
        {
            id: 'loadLibrary',
            title: '我的片库',
            functionName: 'loadLibrary',
            cacheDuration: 0,
            params: []
        },
        {
            type: 'stream',
            id: 'loadResource',
            title: '播放资源',
            functionName: 'loadResource',
            cacheDuration: 0,
            params: []
        }
    ],
    search: {
        title: '片库搜索',
        functionName: 'searchVideos',
        params: [
            {
                name: 'keyword',
                title: '关键词',
                type: 'input',
                description: '番号或女优名，如 SSIS-338',
                value: ''
            }
        ]
    }
};
let i = '[夸克片库]';
function n(e) {
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
function r(e, t) {
    if (!t) return '';
    let i = String(t).trim();
    if (!i) return '';
    if (/^https?:\/\//i.test(i)) return i;
    if (i.startsWith('//')) return `https:${i}`;
    let n = /^(https?:\/\/[^/]+)/i.exec(e), r = n ? n[1] : e.replace(/\/+$/, '');
    if (i.startsWith('/')) return r + i;
    let l = e.split(/[?#]/)[0];
    return l.slice(0, l.lastIndexOf('/') + 1) + i;
}
function l(e) {
    return Object.keys(e).map((t)=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join('&');
}
function o(e) {
    return e.length > 4 ? e.replace(/^0+(?=\d)/, '') : e;
}
function u(e) {
    var t;
    if (!e) return null;
    let i = String(e).toUpperCase(), n = null != (t = /(?:^|[^A-Z0-9])FC2[- ]?PPV[- ]?(\d{5,7})(?![0-9])/.exec(i)) ? t : /(?:^|[^A-Z0-9])FC2[- ]?(\d{5,7})(?![0-9])/.exec(i);
    if (n) return `FC2-PPV-${n[1]}`;
    let r = /(?:^|[^0-9])(\d{6})([-_])(\d{3})(?![0-9])/.exec(i);
    if (r) return `${r[1]}${r[2]}${r[3]}`;
    let l = /(?:^|[^A-Z])([A-Z]{2,6})-S(\d{1,3})(?![0-9])/.exec(i);
    if (l) return `${l[1]}-S${l[2]}`;
    let u = /(?:^|[^A-Z])([A-Z]{2,6})-\s*(\d{2,6})(?![0-9])/.exec(i);
    if (u) return `${u[1]}-${o(u[2])}`;
    let a = /(?:^|[^A-Z0-9])([A-Z]{2,6})(\d{3,6})(?![0-9])/.exec(i);
    if (a) return `${a[1]}-${o(a[2])}`;
    for (let e of i.matchAll(/(?:^|[^A-Z])([A-Z]{2,6})\s+(\d{3,5})(?![0-9])/g))if (![
        '720',
        '1080',
        '1440',
        '2160'
    ].includes(e[2])) return `${e[1]}-${o(e[2])}`;
    return null;
}
function a(e) {
    return e.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
function s(...e) {
    for (let t of e){
        if (!t) continue;
        let e = u(t);
        if (e) return e;
    }
    return null;
}
function d(e) {
    return e.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
let c = 'https://javdb.com', f = 'javdb_cookie_mirror';
function p(e) {
    return t(function*() {
        try {
            if (!e || 'string' != typeof e.javdbCookie) return;
            let t = e.javdbCookie.trim();
            t ? yield Widget.storage.set(f, t) : yield Widget.storage.remove(f);
        } catch (e) {}
    })();
}
function h(e) {
    return t(function*() {
        if (e && 'string' == typeof e.javdbCookie && e.javdbCookie.trim()) return e.javdbCookie.trim();
        try {
            let e = yield Widget.storage.get(f);
            if ('string' == typeof e && e.trim()) return e.trim();
        } catch (e) {}
        return '';
    })();
}
function g(e, i) {
    return t(function*() {
        var n;
        let r, l = yield (r = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${c}/`
        }, i && (r.Cookie = i), n = r, t(function*() {
            let t = yield Widget.http.get(e, {
                headers: n
            }), i = 'number' == typeof (null == t ? void 0 : t.statusCode) ? t.statusCode : 200;
            if (i >= 400) throw Error(`HTTP ${i}: ${e}`);
            let r = null == t ? void 0 : t.data;
            return 'string' == typeof r ? r : null == r ? '' : String(r);
        })());
        if (l && (/just a moment/i.test(l) || l.includes('challenges.cloudflare.com') || l.includes('_cf_chl') || /attention required/i.test(l) || l.includes('cf-browser-verification'))) throw Error(`JavDB 返回了 Cloudflare 验证页（出口 IP 被拦截）: ${e}`);
        return l;
    })();
}
function m(e, i) {
    return t(function*() {
        let t = yield Widget.html.load(e), n = t('a.box');
        0 === n.length && (n = t('.movie-list a.box, .grid a.box'));
        let l = [], o = new Set();
        return n.each((e, n)=>{
            var a, d, c, f, p;
            let h = t(n), g = r(i, null != (a = h.attr('href')) ? a : '');
            if (!g || o.has(g)) return;
            o.add(g);
            let m = h.find('.video-title strong').first().text().trim(), v = (null != (d = h.attr('title')) ? d : '').trim(), $ = h.find('.video-title').first().text().trim(), y = null != (c = u(m)) ? c : s(v, $), A = null != (f = null != (p = h.find('img').first().attr('src')) ? p : h.find('img').first().attr('data-src')) ? f : '';
            A = r(i, A), l.push({
                code: y,
                title: v || $ || y || g,
                link: g,
                cover: A
            });
        }), l;
    })();
}
function v(e) {
    return e.replace(/[:：\s]/g, '');
}
function $(e) {
    let t = e('nav.panel.movie-panel-info').first(), i = [];
    if (0 === t.length) return i;
    let n = t.find('> div, .panel-block'), r = new Set();
    return n.each((t, n)=>{
        if (r.has(n)) return;
        r.add(n);
        let l = e(n), o = l.find('strong').first();
        if (0 === o.length) return;
        let u = v(o.text());
        if (!u) return;
        let a = l.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
        i.push({
            label: u,
            valueText: a,
            $row: l
        });
    }), i;
}
function y(e, t) {
    return e.find((e)=>t.includes(e.label));
}
function A(e, t) {
    let i = y(t, [
        '演員',
        '演员'
    ]);
    if (!i) return [];
    let n = [];
    i.$row.find('a, strong').each((t, i)=>{
        var r, l;
        let o = e(i), u = null != (r = i.tagName) ? r : '';
        'a' === u ? n.push({
            kind: 'a',
            text: o.text().trim(),
            href: null != (l = o.attr('href')) ? l : ''
        }) : 'strong' === u && n.push({
            kind: 'strong',
            text: o.text().trim(),
            href: ''
        });
    });
    let r = !1, l = [];
    for (let e of n){
        if ('strong' === e.kind && !r && v(e.text) === i.label) {
            r = !0;
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
let b = 'qw_work_';
function C(e) {
    return t(function*() {
        try {
            let l = yield Widget.storage.get(b + e.toUpperCase());
            if ('string' == typeof l && l) {
                let e = JSON.parse(l);
                if (e && 'object' == typeof e) {
                    var t, i, n, r;
                    return {
                        actress: String(null != (t = e.a) ? t : ''),
                        cover: String(null != (i = e.c) ? i : ''),
                        title: String(null != (n = e.t) ? n : ''),
                        link: String(null != (r = e.l) ? r : '')
                    };
                }
            }
        } catch (e) {}
        return null;
    })();
}
function k(e) {
    var t, i;
    return '' !== (null != (t = e.alistBase) ? t : '').trim() && '' !== (null != (i = e.alistToken) ? i : '').trim();
}
function x(e) {
    var t;
    let i = (null != (t = e.alistBase) ? t : '').trim().replace(/\/+$/, '');
    return i && !/^https?:\/\//i.test(i) && (i = `http://${i}`), i;
}
function L(e) {
    var t;
    let i = (null != (t = e.alistRoot) ? t : '').trim();
    return '' === i ? '/夸克/艺术' : '/' === i ? '/' : (i.startsWith('/') ? i : `/${i}`).replace(/\/+$/, '');
}
function S(e, i, r) {
    return t(function*() {
        var t, l;
        let o, u = `${x(e)}${i}`;
        try {
            o = yield Widget.http.post(u, r, {
                headers: {
                    Authorization: (null != (t = e.alistToken) ? t : '').trim(),
                    'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            throw Error(`AList 请求失败 ${u}: ${n(e)}`);
        }
        let a = 'number' == typeof (null == o ? void 0 : o.statusCode) ? o.statusCode : 200;
        if (a >= 400) throw Error(`AList HTTP ${a}: ${i}`);
        let s = function(e) {
            if (null == e) return null;
            if ('object' == typeof e) return e;
            if ('string' == typeof e) try {
                return JSON.parse(e);
            } catch (e) {}
            return null;
        }(null == o ? void 0 : o.data);
        if (!s || 200 !== s.code) throw Error(`AList 接口错误（${i}）：${null != (l = null == s ? void 0 : s.message) ? l : '无响应'}`);
        return s.data;
    })();
}
function w(e, i) {
    return t(function*() {
        let t = [], n = 1;
        for(;;){
            var r, l, o, u, a;
            let s = yield S(e, '/api/fs/list', {
                path: i,
                password: '',
                page: n,
                per_page: 100,
                refresh: !1
            }), d = Array.isArray(null == s ? void 0 : s.content) ? s.content : [];
            for (let e of d){
                let n = String(null != (l = null == e ? void 0 : e.name) ? l : '');
                n && t.push({
                    path: `${'/' === i ? '' : i}/${n}`,
                    name: n,
                    size: Number(null != (o = null == e ? void 0 : e.size) ? o : 0) || 0,
                    sign: String(null != (u = null == e ? void 0 : e.sign) ? u : ''),
                    isDir: (null == e ? void 0 : e.is_dir) === !0,
                    modified: String(null != (a = null == e ? void 0 : e.modified) ? a : '')
                });
            }
            let c = Number(null != (r = null == s ? void 0 : s.total) ? r : t.length);
            if (0 === d.length || t.length >= c || d.length < 100 || ++n > 50) break;
        }
        return t;
    })();
}
let W = new Set([
    'mp4',
    'mkv',
    'avi',
    'mov',
    'wmv',
    'flv',
    'ts',
    'm2ts',
    'webm',
    'rmvb',
    'rm',
    'mpg',
    'mpeg',
    'm4v',
    '3gp',
    'iso'
]);
function j(e) {
    let t = e.lastIndexOf('.');
    return !(t < 0) && W.has(e.slice(t + 1).toLowerCase());
}
function D(e) {
    if (!e) return '';
    let t = e / 1073741824;
    return t >= 1 ? `${t.toFixed(2)} GB` : `${(e / 1048576).toFixed(1)} MB`;
}
loadLibrary = (e)=>t(function*() {
        let o;
        if (!k(e)) return console.log(`${i} 未填写 AList 地址/令牌，片库为空`), [];
        yield p(e);
        try {
            o = yield t(function*() {
                let t = L(e), r = [
                    t
                ], l = new Map([
                    [
                        t,
                        t
                    ]
                ]), o = new Map(), u = 0, a = 0;
                for(; r.length > 0 && u < 120 && a < 4000;){
                    let t, f = r.shift();
                    u++;
                    try {
                        t = yield w(e, f);
                    } catch (e) {
                        console.log(`${i} 目录 ${f} 列取失败，跳过: ${n(e)}`);
                        continue;
                    }
                    for (let e of t){
                        var d, c;
                        if (a++, e.isDir) {
                            l.set(e.path, e.name), r.push(e.path);
                            continue;
                        }
                        if (!j(e.name)) continue;
                        let t = null != (d = s(e.name)) ? d : s(l.get(f));
                        if (!t) continue;
                        let i = null != (c = o.get(t)) ? c : [];
                        i.push(e), o.set(t, i);
                    }
                }
                r.length > 0 && console.log(`${i} 片库扫描达到遍历上限（已走 ${u} 个目录、扫描 ${a} 项），结果可能不完整`);
                let f = [];
                for (let [e, t] of o){
                    let i = [
                        ...t
                    ].sort((e, t)=>t.size - e.size), n = '';
                    for (let e of t)e.modified > n && (n = e.modified);
                    f.push({
                        code: e,
                        files: i,
                        primary: i[0],
                        modified: n
                    });
                }
                return f.sort((e, t)=>e.modified !== t.modified ? e.modified < t.modified ? 1 : -1 : e.code < t.code ? -1 : 1), f;
            })();
        } catch (e) {
            return console.log(`${i} 片库扫描失败: ${n(e)}`), [];
        }
        console.log(`${i} 扫描到 ${o.length} 部作品`);
        let u = 0, a = [];
        for (let s of o){
            let o = yield C(s.code);
            !o && u < 15 && (u++, o = yield function(e, o) {
                return t(function*() {
                    let u = yield C(o);
                    if (u) return u;
                    let a = null;
                    try {
                        a = yield t(function*() {
                            var t, i, n, u, a, s;
                            let d = `${c}/search?${l({
                                q: o,
                                f: 'all'
                            })}`, f = yield g(d), p = yield m(f, d);
                            if (0 === p.length) return null;
                            let v = null != (t = p.find((e)=>e.code === o)) ? t : p[0], y = yield h(e), b = yield g(v.link, y), C = yield Widget.html.load(b), k = $(C), x = A(C, k), L = null != (i = C('img.video-cover').first().attr('src')) ? i : '';
                            L || (L = null != (n = C('meta[property="og:image"]').attr('content')) ? n : ''), L = r(v.link, L) || v.cover;
                            let S = C('h2 strong.current-title').first().text().trim(), w = null != (u = C('meta[property="og:title"]').attr('content')) ? u : '';
                            return {
                                actress: (null != (a = null == (s = x[0]) ? void 0 : s.name) ? a : '').replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60),
                                cover: L,
                                title: S || w || v.title,
                                link: v.link
                            };
                        })();
                    } catch (e) {
                        console.log(`${i} JavDB 查询 ${o} 失败: ${n(e)}`);
                    }
                    if (a) try {
                        yield Widget.storage.set(b + o.toUpperCase(), JSON.stringify({
                            a: a.actress,
                            c: a.cover,
                            t: a.title,
                            l: a.link
                        }));
                    } catch (e) {}
                    return a;
                })();
            }(e, s.code));
            let d = [
                `番号：${s.code}`
            ];
            (null == o ? void 0 : o.actress) && d.push(`女优：${o.actress}`), d.push(`文件：${s.primary.name}${s.files.length > 1 ? `（共 ${s.files.length} 个文件）` : ''}`);
            let f = D(s.primary.size);
            f && d.push(`大小：${f}`), a.push({
                id: s.code,
                type: 'detail',
                title: (null == o ? void 0 : o.title) ? `${s.code} ${o.title}` : s.code,
                link: `qwebdav:${encodeURIComponent(s.primary.path)}`,
                posterPath: (null == o ? void 0 : o.cover) || void 0,
                coverUrl: (null == o ? void 0 : o.cover) || void 0,
                backdropPath: (null == o ? void 0 : o.cover) || void 0,
                description: d.join('\n'),
                mediaType: 'movie'
            });
        }
        return a;
    })(), searchVideos = (e)=>t(function*() {
        var t, i, n;
        let r = (null != (t = null != (i = null != (n = e.keyword) ? n : e.title) ? i : e.query) ? t : '').trim();
        if (!r) return [];
        let l = yield loadLibrary(e), o = a(r);
        return l.filter((e)=>{
            var t;
            return !!(o.length >= 3 && a(e.id).includes(o) || e.title.includes(r) || (null != (t = e.description) ? t : '').includes(r));
        });
    })(), loadDetail = (e, o)=>t(function*() {
        var t, a, d, f, v;
        let b;
        if (!e) return null;
        let C = null != o ? o : {};
        yield p(C);
        let k = e, x = null, L = '';
        if (e.startsWith('qwebdav:')) {
            let r, o = e.slice(8);
            try {
                o = decodeURIComponent(o);
            } catch (e) {}
            if (!(x = s(o))) return null;
            let u = o.slice(o.lastIndexOf('/') + 1);
            u && (L = `文件：${u}（WebDAV 片库）`);
            try {
                let e = `${c}/search?${l({
                    q: x,
                    f: 'all'
                })}`, i = yield g(e), n = yield m(i, e);
                r = null != (t = n.find((e)=>e.code === x)) ? t : n[0];
            } catch (e) {
                console.log(`${i} 详情搜索失败: ${n(e)}`);
            }
            if (!r) return {
                id: x,
                type: 'detail',
                title: x,
                link: e,
                description: [
                    `番号：${x}`,
                    L
                ].filter(Boolean).join('\n'),
                mediaType: 'movie'
            };
            k = r.link;
        }
        let S = yield h(C);
        try {
            b = yield g(k, S);
        } catch (e) {
            return console.log(`${i} 详情获取失败: ${n(e)}`), null;
        }
        try {
            let t = yield Widget.html.load(b), i = $(t), n = x, l = y(i, [
                '番號',
                '番号'
            ]);
            l && (n = null != (a = u(l.valueText)) ? a : n), n || (n = s(t('title').first().text()));
            let o = t('h2 strong.current-title').first().text().trim(), c = null != (d = t('meta[property="og:title"]').attr('content')) ? d : '', p = o || c || n || k, h = null != (f = t('img.video-cover').first().attr('src')) ? f : '';
            h || (h = null != (v = t('meta[property="og:image"]').attr('content')) ? v : ''), h = r(k, h);
            let g = A(t, i).map((e)=>({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                })), m = [];
            return n && m.push(`番号：${n}`), g.length > 0 && m.push(`女优：${g.map((e)=>e.title).join('、')}`), L && m.push(L), {
                id: null != n ? n : k,
                type: 'detail',
                title: p,
                link: e,
                posterPath: h || void 0,
                detailPoster: h || void 0,
                coverUrl: h || void 0,
                backdropPath: h || void 0,
                peoples: g.length > 0 ? g : void 0,
                description: m.join('\n'),
                mediaType: 'movie'
            };
        } catch (e) {
            return console.log(`${i} 详情解析失败: ${n(e)}`), null;
        }
    })(), loadResource = (e)=>t(function*() {
        var r, l, o, u, c, f, p;
        console.log(`${i} loadResource 被调用（id=${null != (r = e.id) ? r : ''}，title=${null != (l = e.title) ? l : ''}，link=${null != (o = e.link) ? o : ''}）`);
        let h = (e)=>[
                {
                    name: e,
                    description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                    url: 'https://pan.quark.cn'
                }
            ], g = s(e.id, e.title, e.seriesName, e.link);
        if (!g) return h('诊断·番号：未能识别');
        if (!k(e)) return h('诊断·AList：未配置');
        try {
            let r = null, l = null != (u = e.link) ? u : '';
            if (l.startsWith('qwebdav:')) {
                let i = l.slice(8);
                try {
                    i = decodeURIComponent(i);
                } catch (e) {}
                r = yield (f = i, t(function*() {
                    let t = f.lastIndexOf('/'), i = t > 0 ? f.slice(0, t) : '/', n = f.slice(t + 1), r = {
                        path: f,
                        name: n,
                        size: 0,
                        sign: '',
                        isDir: !1,
                        modified: ''
                    };
                    try {
                        var l;
                        return null != (l = (yield w(e, i)).find((e)=>!e.isDir && e.name === n)) ? l : r;
                    } catch (e) {
                        return r;
                    }
                })());
            } else r = null != (c = (yield t(function*() {
                let t = new Set([
                    a(g)
                ]), r = /FC2-PPV-(\d+)/.exec(g);
                r && t.add(`FC2${r[1]}`);
                let l = L(e), o = [
                    l
                ], u = new Map([
                    [
                        l,
                        l
                    ]
                ]), s = [], c = [], f = 0, p = 0;
                for(; o.length > 0 && f < 120 && p < 4000;){
                    let r, l = o.shift();
                    f++;
                    try {
                        r = yield w(e, l);
                    } catch (e) {
                        console.log(`${i} AList 目录 ${l} 列取失败，跳过: ${n(e)}`);
                        continue;
                    }
                    for (let e of r){
                        var h;
                        if (p++, e.isDir) {
                            u.set(e.path, e.name), o.push(e.path);
                            continue;
                        }
                        if (!j(e.name)) continue;
                        let i = d(e.name), n = !1;
                        for (let e of t)if (e && i.includes(e)) {
                            n = !0;
                            break;
                        }
                        if (n) {
                            s.push(e);
                            continue;
                        }
                        let r = d(null != (h = u.get(l)) ? h : '');
                        if (r) {
                            for (let i of t)if (i && r.includes(i)) {
                                c.push(e);
                                break;
                            }
                        }
                    }
                }
                return (s.sort((e, t)=>t.size - e.size), s.length > 0) ? s : (c.sort((e, t)=>t.size - e.size), c.slice(0, 3));
            })())[0]) ? c : null;
            if (!r) return h('诊断·AList：未找到');
            let o = yield (p = r, t(function*() {
                var t, r, l;
                let o = x(e), u = p.path.split('/').map((e)=>encodeURIComponent(e)).join('/'), a = D(p.size), s = `${p.name}${a ? ` · ${a}` : ''}`, d = [], c = (null != (t = e.alistUser) ? t : '').trim();
                c && d.push({
                    name: 'WebDAV原画',
                    description: `${s} · 经 AList WebDAV 播放`,
                    url: `${o}/dav${u}`,
                    customHeaders: {
                        Authorization: `Basic ${function(e) {
                            let t = '';
                            for(let i = 0; i < e.length; i++){
                                let n = e.charCodeAt(i);
                                n < 0x80 ? t += String.fromCharCode(n) : n < 0x800 ? t += String.fromCharCode(0xc0 | n >> 6, 0x80 | 0x3f & n) : n >= 0xd800 && n <= 0xdbff && i + 1 < e.length ? t += String.fromCharCode(0xf0 | (n = 0x10000 + ((n - 0xd800) * 0x400 + (e.charCodeAt(++i) - 0xdc00))) >> 18, 0x80 | n >> 12 & 0x3f, 0x80 | n >> 6 & 0x3f, 0x80 | 0x3f & n) : t += String.fromCharCode(0xe0 | n >> 12, 0x80 | n >> 6 & 0x3f, 0x80 | 0x3f & n);
                            }
                            return function(e) {
                                let t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', i = '';
                                for(let n = 0; n < e.length; n += 3){
                                    let r = e.charCodeAt(n), l = n + 1 < e.length, o = n + 2 < e.length, u = l ? e.charCodeAt(n + 1) : 0, a = o ? e.charCodeAt(n + 2) : 0;
                                    i += t[r >> 2], i += t[(3 & r) << 4 | u >> 4], i += l ? t[(15 & u) << 2 | a >> 6] : '=', i += o ? t[63 & a] : '=';
                                }
                                return i;
                            }(t);
                        }(`${c}:${null != (r = e.alistPass) ? r : ''}`)}`
                    }
                }), p.sign && d.push({
                    name: 'AList代理原画',
                    description: `${s} · 经 AList 代理播放`,
                    url: `${o}/p${u}?sign=${encodeURIComponent(p.sign)}`
                });
                try {
                    let t = yield S(e, '/api/fs/get', {
                        path: p.path,
                        password: ''
                    }), i = String(null != (l = null == t ? void 0 : t.raw_url) ? l : '');
                    i && d.push({
                        name: 'AList直链原画',
                        description: `${s} · AList 给出的源文件直链`,
                        url: i
                    });
                } catch (e) {
                    console.log(`${i} AList fs/get 失败（直链跳过）: ${n(e)}`);
                }
                return d;
            })());
            if (0 === o.length) return h('诊断·AList：命中但无可用链接');
            return console.log(`${i} loadResource ${g}：共 ${o.length} 条播放线路`), o;
        } catch (e) {
            return console.log(`${i} AList 源失败: ${n(e)}`), h('诊断·AList：出错');
        }
    })();
