function t(t, e, i, n, r, l, o) {
    try {
        var u = t[l](o), a = u.value;
    } catch (t) {
        i(t);
        return;
    }
    u.done ? e(a) : Promise.resolve(a).then(n, r);
}
function e(e) {
    return function() {
        var i = this, n = arguments;
        return new Promise(function(r, l) {
            var o = e.apply(i, n);
            function u(e) {
                t(o, r, l, u, a, "next", e);
            }
            function a(e) {
                t(o, r, l, u, a, "throw", e);
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
    version: "0.1.1",
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
function n(t) {
    if (!t) return '未知错误';
    if ('string' == typeof t) return t;
    let e = [];
    if (t.name && e.push(String(t.name)), t.message && e.push(String(t.message)), t.statusCode ? e.push(`HTTP ${t.statusCode}`) : 'number' == typeof t.status && e.push(`status=${t.status}`), e.length > 0) return e.join(' ');
    try {
        return JSON.stringify(t);
    } catch (e) {
        return String(t);
    }
}
function r(t, e) {
    if (!e) return '';
    let i = String(e).trim();
    if (!i) return '';
    if (/^https?:\/\//i.test(i)) return i;
    if (i.startsWith('//')) return `https:${i}`;
    let n = /^(https?:\/\/[^/]+)/i.exec(t), r = n ? n[1] : t.replace(/\/+$/, '');
    if (i.startsWith('/')) return r + i;
    let l = t.split(/[?#]/)[0];
    return l.slice(0, l.lastIndexOf('/') + 1) + i;
}
function l(t) {
    return Object.keys(t).map((e)=>`${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`).join('&');
}
function o(t) {
    var e;
    if (!t) return null;
    let i = String(t).toUpperCase(), n = null != (e = /(?:^|[^A-Z0-9])FC2[- ]?PPV[- ]?(\d{5,7})(?![0-9])/.exec(i)) ? e : /(?:^|[^A-Z0-9])FC2[- ]?(\d{5,7})(?![0-9])/.exec(i);
    if (n) return `FC2-PPV-${n[1]}`;
    let r = /(?:^|[^A-Z])([A-Z]{2,6})-(\d{2,6})(?![0-9])/.exec(i);
    if (r) return `${r[1]}-${r[2]}`;
    let l = /(?:^|[^A-Z0-9])([A-Z]{2,6})(\d{3,6})(?![0-9])/.exec(i);
    return l ? `${l[1]}-${l[2]}` : null;
}
function u(t) {
    return t.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
function a(...t) {
    for (let e of t){
        if (!e) continue;
        let t = o(e);
        if (t) return t;
    }
    return null;
}
function s(t) {
    return t.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
let d = 'https://javdb.com', c = 'javdb_cookie_mirror';
function f(t) {
    return e(function*() {
        try {
            if (!t || 'string' != typeof t.javdbCookie) return;
            let e = t.javdbCookie.trim();
            e ? yield Widget.storage.set(c, e) : yield Widget.storage.remove(c);
        } catch (t) {}
    })();
}
function p(t) {
    return e(function*() {
        if (t && 'string' == typeof t.javdbCookie && t.javdbCookie.trim()) return t.javdbCookie.trim();
        try {
            let t = yield Widget.storage.get(c);
            if ('string' == typeof t && t.trim()) return t.trim();
        } catch (t) {}
        return '';
    })();
}
function h(t, i) {
    return e(function*() {
        var n;
        let r, l = yield (r = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${d}/`
        }, i && (r.Cookie = i), n = r, e(function*() {
            let e = yield Widget.http.get(t, {
                headers: n
            }), i = 'number' == typeof (null == e ? void 0 : e.statusCode) ? e.statusCode : 200;
            if (i >= 400) throw Error(`HTTP ${i}: ${t}`);
            let r = null == e ? void 0 : e.data;
            return 'string' == typeof r ? r : null == r ? '' : String(r);
        })());
        if (l && (/just a moment/i.test(l) || l.includes('challenges.cloudflare.com') || l.includes('_cf_chl') || /attention required/i.test(l) || l.includes('cf-browser-verification'))) throw Error(`JavDB 返回了 Cloudflare 验证页（出口 IP 被拦截）: ${t}`);
        return l;
    })();
}
function m(t, i) {
    return e(function*() {
        let e = yield Widget.html.load(t), n = e('a.box');
        0 === n.length && (n = e('.movie-list a.box, .grid a.box'));
        let l = [], u = new Set();
        return n.each((t, n)=>{
            var s, d, c, f, p;
            let h = e(n), m = r(i, null != (s = h.attr('href')) ? s : '');
            if (!m || u.has(m)) return;
            u.add(m);
            let g = h.find('.video-title strong').first().text().trim(), v = (null != (d = h.attr('title')) ? d : '').trim(), y = h.find('.video-title').first().text().trim(), $ = null != (c = o(g)) ? c : a(v, y), A = null != (f = null != (p = h.find('img').first().attr('src')) ? p : h.find('img').first().attr('data-src')) ? f : '';
            A = r(i, A), l.push({
                code: $,
                title: v || y || $ || m,
                link: m,
                cover: A
            });
        }), l;
    })();
}
function g(t) {
    return t.replace(/[:：\s]/g, '');
}
function v(t) {
    let e = t('nav.panel.movie-panel-info').first(), i = [];
    if (0 === e.length) return i;
    let n = e.find('> div, .panel-block'), r = new Set();
    return n.each((e, n)=>{
        if (r.has(n)) return;
        r.add(n);
        let l = t(n), o = l.find('strong').first();
        if (0 === o.length) return;
        let u = g(o.text());
        if (!u) return;
        let a = l.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
        i.push({
            label: u,
            valueText: a,
            $row: l
        });
    }), i;
}
function y(t, e) {
    return t.find((t)=>e.includes(t.label));
}
function $(t, e) {
    let i = y(e, [
        '演員',
        '演员'
    ]);
    if (!i) return [];
    let n = [];
    i.$row.find('a, strong').each((e, i)=>{
        var r, l;
        let o = t(i), u = null != (r = i.tagName) ? r : '';
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
    for (let t of n){
        if ('strong' === t.kind && !r && g(t.text) === i.label) {
            r = !0;
            continue;
        }
        'a' === t.kind ? l.push({
            name: t.text,
            href: t.href,
            gender: ''
        }) : l.length > 0 && !l[l.length - 1].gender && (l[l.length - 1].gender = t.text);
    }
    let o = l.some((t)=>t.gender.includes('♀') || t.gender.includes('♂'));
    return l.filter((t)=>t.name && (!o || t.gender.includes('♀')));
}
let A = 'qw_work_';
function b(t) {
    return e(function*() {
        try {
            let l = yield Widget.storage.get(A + t.toUpperCase());
            if ('string' == typeof l && l) {
                let t = JSON.parse(l);
                if (t && 'object' == typeof t) {
                    var e, i, n, r;
                    return {
                        actress: String(null != (e = t.a) ? e : ''),
                        cover: String(null != (i = t.c) ? i : ''),
                        title: String(null != (n = t.t) ? n : ''),
                        link: String(null != (r = t.l) ? r : '')
                    };
                }
            }
        } catch (t) {}
        return null;
    })();
}
function C(t) {
    var e, i;
    return '' !== (null != (e = t.alistBase) ? e : '').trim() && '' !== (null != (i = t.alistToken) ? i : '').trim();
}
function k(t) {
    var e;
    let i = (null != (e = t.alistBase) ? e : '').trim().replace(/\/+$/, '');
    return i && !/^https?:\/\//i.test(i) && (i = `http://${i}`), i;
}
function x(t) {
    var e;
    let i = (null != (e = t.alistRoot) ? e : '').trim();
    return '' === i ? '/夸克/艺术' : '/' === i ? '/' : (i.startsWith('/') ? i : `/${i}`).replace(/\/+$/, '');
}
function L(t, i, r) {
    return e(function*() {
        var e, l;
        let o, u = `${k(t)}${i}`;
        try {
            o = yield Widget.http.post(u, r, {
                headers: {
                    Authorization: (null != (e = t.alistToken) ? e : '').trim(),
                    'Content-Type': 'application/json'
                }
            });
        } catch (t) {
            throw Error(`AList 请求失败 ${u}: ${n(t)}`);
        }
        let a = 'number' == typeof (null == o ? void 0 : o.statusCode) ? o.statusCode : 200;
        if (a >= 400) throw Error(`AList HTTP ${a}: ${i}`);
        let s = function(t) {
            if (null == t) return null;
            if ('object' == typeof t) return t;
            if ('string' == typeof t) try {
                return JSON.parse(t);
            } catch (t) {}
            return null;
        }(null == o ? void 0 : o.data);
        if (!s || 200 !== s.code) throw Error(`AList 接口错误（${i}）：${null != (l = null == s ? void 0 : s.message) ? l : '无响应'}`);
        return s.data;
    })();
}
function w(t, i) {
    return e(function*() {
        let e = [], n = 1;
        for(;;){
            var r, l, o, u, a;
            let s = yield L(t, '/api/fs/list', {
                path: i,
                password: '',
                page: n,
                per_page: 100,
                refresh: !1
            }), d = Array.isArray(null == s ? void 0 : s.content) ? s.content : [];
            for (let t of d){
                let n = String(null != (l = null == t ? void 0 : t.name) ? l : '');
                n && e.push({
                    path: `${'/' === i ? '' : i}/${n}`,
                    name: n,
                    size: Number(null != (o = null == t ? void 0 : t.size) ? o : 0) || 0,
                    sign: String(null != (u = null == t ? void 0 : t.sign) ? u : ''),
                    isDir: (null == t ? void 0 : t.is_dir) === !0,
                    modified: String(null != (a = null == t ? void 0 : t.modified) ? a : '')
                });
            }
            let c = Number(null != (r = null == s ? void 0 : s.total) ? r : e.length);
            if (0 === d.length || e.length >= c || d.length < 100 || ++n > 50) break;
        }
        return e;
    })();
}
let S = new Set([
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
function W(t) {
    let e = t.lastIndexOf('.');
    return !(e < 0) && S.has(t.slice(e + 1).toLowerCase());
}
function j(t) {
    if (!t) return '';
    let e = t / 1073741824;
    return e >= 1 ? `${e.toFixed(2)} GB` : `${(t / 1048576).toFixed(1)} MB`;
}
loadLibrary = (t)=>e(function*() {
        let o;
        if (!C(t)) return console.log(`${i} 未填写 AList 地址/令牌，片库为空`), [];
        yield f(t);
        try {
            o = yield e(function*() {
                let e = x(t), r = [
                    e
                ], l = new Map([
                    [
                        e,
                        e
                    ]
                ]), o = new Map(), u = 0, s = 0;
                for(; r.length > 0 && u < 120 && s < 4000;){
                    let e, f = r.shift();
                    u++;
                    try {
                        e = yield w(t, f);
                    } catch (t) {
                        console.log(`${i} 目录 ${f} 列取失败，跳过: ${n(t)}`);
                        continue;
                    }
                    for (let t of e){
                        var d, c;
                        if (s++, t.isDir) {
                            l.set(t.path, t.name), r.push(t.path);
                            continue;
                        }
                        if (!W(t.name)) continue;
                        let e = null != (d = a(t.name)) ? d : a(l.get(f));
                        if (!e) continue;
                        let i = null != (c = o.get(e)) ? c : [];
                        i.push(t), o.set(e, i);
                    }
                }
                r.length > 0 && console.log(`${i} 片库扫描达到遍历上限（已走 ${u} 个目录、扫描 ${s} 项），结果可能不完整`);
                let f = [];
                for (let [t, e] of o){
                    let i = [
                        ...e
                    ].sort((t, e)=>e.size - t.size), n = '';
                    for (let t of e)t.modified > n && (n = t.modified);
                    f.push({
                        code: t,
                        files: i,
                        primary: i[0],
                        modified: n
                    });
                }
                return f.sort((t, e)=>t.modified !== e.modified ? t.modified < e.modified ? 1 : -1 : t.code < e.code ? -1 : 1), f;
            })();
        } catch (t) {
            return console.log(`${i} 片库扫描失败: ${n(t)}`), [];
        }
        console.log(`${i} 扫描到 ${o.length} 部作品`);
        let u = 0, s = [];
        for (let a of o){
            let o = yield b(a.code);
            !o && u < 15 && (u++, o = yield function(t, o) {
                return e(function*() {
                    let u = yield b(o);
                    if (u) return u;
                    let a = null;
                    try {
                        a = yield e(function*() {
                            var e, i, n, u, a, s;
                            let c = `${d}/search?${l({
                                q: o,
                                f: 'all'
                            })}`, f = yield h(c), g = yield m(f, c);
                            if (0 === g.length) return null;
                            let y = null != (e = g.find((t)=>t.code === o)) ? e : g[0], A = yield p(t), b = yield h(y.link, A), C = yield Widget.html.load(b), k = v(C), x = $(C, k), L = null != (i = C('img.video-cover').first().attr('src')) ? i : '';
                            L || (L = null != (n = C('meta[property="og:image"]').attr('content')) ? n : ''), L = r(y.link, L) || y.cover;
                            let w = C('h2 strong.current-title').first().text().trim(), S = null != (u = C('meta[property="og:title"]').attr('content')) ? u : '';
                            return {
                                actress: (null != (a = null == (s = x[0]) ? void 0 : s.name) ? a : '').replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60),
                                cover: L,
                                title: w || S || y.title,
                                link: y.link
                            };
                        })();
                    } catch (t) {
                        console.log(`${i} JavDB 查询 ${o} 失败: ${n(t)}`);
                    }
                    if (a) try {
                        yield Widget.storage.set(A + o.toUpperCase(), JSON.stringify({
                            a: a.actress,
                            c: a.cover,
                            t: a.title,
                            l: a.link
                        }));
                    } catch (t) {}
                    return a;
                })();
            }(t, a.code));
            let c = [
                `番号：${a.code}`
            ];
            (null == o ? void 0 : o.actress) && c.push(`女优：${o.actress}`), c.push(`文件：${a.primary.name}${a.files.length > 1 ? `（共 ${a.files.length} 个文件）` : ''}`);
            let f = j(a.primary.size);
            f && c.push(`大小：${f}`), s.push({
                id: a.code,
                type: 'detail',
                title: (null == o ? void 0 : o.title) ? `${a.code} ${o.title}` : a.code,
                link: `qwebdav:${encodeURIComponent(a.primary.path)}`,
                posterPath: (null == o ? void 0 : o.cover) || void 0,
                coverUrl: (null == o ? void 0 : o.cover) || void 0,
                backdropPath: (null == o ? void 0 : o.cover) || void 0,
                description: c.join('\n'),
                mediaType: 'movie'
            });
        }
        return s;
    })(), searchVideos = (t)=>e(function*() {
        var e, i, n;
        let r = (null != (e = null != (i = null != (n = t.keyword) ? n : t.title) ? i : t.query) ? e : '').trim();
        if (!r) return [];
        let l = yield loadLibrary(t), o = u(r);
        return l.filter((t)=>{
            var e;
            return !!(o.length >= 3 && u(t.id).includes(o) || t.title.includes(r) || (null != (e = t.description) ? e : '').includes(r));
        });
    })(), loadDetail = (t, u)=>e(function*() {
        var e, s, c, g, A;
        let b;
        if (!t) return null;
        let C = null != u ? u : {};
        yield f(C);
        let k = t, x = null, L = '';
        if (t.startsWith('qwebdav:')) {
            let r, o = t.slice(8);
            try {
                o = decodeURIComponent(o);
            } catch (t) {}
            if (!(x = a(o))) return null;
            let u = o.slice(o.lastIndexOf('/') + 1);
            u && (L = `文件：${u}（WebDAV 片库）`);
            try {
                let t = `${d}/search?${l({
                    q: x,
                    f: 'all'
                })}`, i = yield h(t), n = yield m(i, t);
                r = null != (e = n.find((t)=>t.code === x)) ? e : n[0];
            } catch (t) {
                console.log(`${i} 详情搜索失败: ${n(t)}`);
            }
            if (!r) return {
                id: x,
                type: 'detail',
                title: x,
                link: t,
                description: [
                    `番号：${x}`,
                    L
                ].filter(Boolean).join('\n'),
                mediaType: 'movie'
            };
            k = r.link;
        }
        let w = yield p(C);
        try {
            b = yield h(k, w);
        } catch (t) {
            return console.log(`${i} 详情获取失败: ${n(t)}`), null;
        }
        try {
            let e = yield Widget.html.load(b), i = v(e), n = x, l = y(i, [
                '番號',
                '番号'
            ]);
            l && (n = null != (s = o(l.valueText)) ? s : n), n || (n = a(e('title').first().text()));
            let u = e('h2 strong.current-title').first().text().trim(), d = null != (c = e('meta[property="og:title"]').attr('content')) ? c : '', f = u || d || n || k, p = null != (g = e('img.video-cover').first().attr('src')) ? g : '';
            p || (p = null != (A = e('meta[property="og:image"]').attr('content')) ? A : ''), p = r(k, p);
            let h = $(e, i).map((t)=>({
                    id: t.href || t.name,
                    title: t.name,
                    role: '演员'
                })), m = [];
            return n && m.push(`番号：${n}`), h.length > 0 && m.push(`女优：${h.map((t)=>t.title).join('、')}`), L && m.push(L), {
                id: null != n ? n : k,
                type: 'detail',
                title: f,
                link: t,
                posterPath: p || void 0,
                detailPoster: p || void 0,
                coverUrl: p || void 0,
                backdropPath: p || void 0,
                peoples: h.length > 0 ? h : void 0,
                description: m.join('\n'),
                mediaType: 'movie'
            };
        } catch (t) {
            return console.log(`${i} 详情解析失败: ${n(t)}`), null;
        }
    })(), loadResource = (t)=>e(function*() {
        var r, l, o, d, c, f, p;
        console.log(`${i} loadResource 被调用（id=${null != (r = t.id) ? r : ''}，title=${null != (l = t.title) ? l : ''}，link=${null != (o = t.link) ? o : ''}）`);
        let h = (t)=>[
                {
                    name: t,
                    description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                    url: 'https://pan.quark.cn'
                }
            ], m = a(t.id, t.title, t.seriesName, t.link);
        if (!m) return h('诊断·番号：未能识别');
        if (!C(t)) return h('诊断·AList：未配置');
        try {
            let r = null, l = null != (d = t.link) ? d : '';
            if (l.startsWith('qwebdav:')) {
                let i = l.slice(8);
                try {
                    i = decodeURIComponent(i);
                } catch (t) {}
                r = yield (f = i, e(function*() {
                    let e = f.lastIndexOf('/'), i = e > 0 ? f.slice(0, e) : '/', n = f.slice(e + 1), r = {
                        path: f,
                        name: n,
                        size: 0,
                        sign: '',
                        isDir: !1,
                        modified: ''
                    };
                    try {
                        var l;
                        return null != (l = (yield w(t, i)).find((t)=>!t.isDir && t.name === n)) ? l : r;
                    } catch (t) {
                        return r;
                    }
                })());
            } else r = null != (c = (yield e(function*() {
                let e = new Set([
                    u(m)
                ]), r = /FC2-PPV-(\d+)/.exec(m);
                r && e.add(`FC2${r[1]}`);
                let l = x(t), o = [
                    l
                ], a = new Map([
                    [
                        l,
                        l
                    ]
                ]), d = [], c = [], f = 0, p = 0;
                for(; o.length > 0 && f < 120 && p < 4000;){
                    let r, l = o.shift();
                    f++;
                    try {
                        r = yield w(t, l);
                    } catch (t) {
                        console.log(`${i} AList 目录 ${l} 列取失败，跳过: ${n(t)}`);
                        continue;
                    }
                    for (let t of r){
                        var h;
                        if (p++, t.isDir) {
                            a.set(t.path, t.name), o.push(t.path);
                            continue;
                        }
                        if (!W(t.name)) continue;
                        let i = s(t.name), n = !1;
                        for (let t of e)if (t && i.includes(t)) {
                            n = !0;
                            break;
                        }
                        if (n) {
                            d.push(t);
                            continue;
                        }
                        let r = s(null != (h = a.get(l)) ? h : '');
                        if (r) {
                            for (let i of e)if (i && r.includes(i)) {
                                c.push(t);
                                break;
                            }
                        }
                    }
                }
                return (d.sort((t, e)=>e.size - t.size), d.length > 0) ? d : (c.sort((t, e)=>e.size - t.size), c.slice(0, 3));
            })())[0]) ? c : null;
            if (!r) return h('诊断·AList：未找到');
            let o = yield (p = r, e(function*() {
                var e, r, l;
                let o = k(t), u = p.path.split('/').map((t)=>encodeURIComponent(t)).join('/'), a = j(p.size), s = `${p.name}${a ? ` · ${a}` : ''}`, d = [], c = (null != (e = t.alistUser) ? e : '').trim();
                c && d.push({
                    name: 'WebDAV原画',
                    description: `${s} · 经 AList WebDAV 播放`,
                    url: `${o}/dav${u}`,
                    customHeaders: {
                        Authorization: `Basic ${function(t) {
                            let e = '';
                            for(let i = 0; i < t.length; i++){
                                let n = t.charCodeAt(i);
                                n < 0x80 ? e += String.fromCharCode(n) : n < 0x800 ? e += String.fromCharCode(0xc0 | n >> 6, 0x80 | 0x3f & n) : n >= 0xd800 && n <= 0xdbff && i + 1 < t.length ? e += String.fromCharCode(0xf0 | (n = 0x10000 + ((n - 0xd800) * 0x400 + (t.charCodeAt(++i) - 0xdc00))) >> 18, 0x80 | n >> 12 & 0x3f, 0x80 | n >> 6 & 0x3f, 0x80 | 0x3f & n) : e += String.fromCharCode(0xe0 | n >> 12, 0x80 | n >> 6 & 0x3f, 0x80 | 0x3f & n);
                            }
                            return function(t) {
                                let e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', i = '';
                                for(let n = 0; n < t.length; n += 3){
                                    let r = t.charCodeAt(n), l = n + 1 < t.length, o = n + 2 < t.length, u = l ? t.charCodeAt(n + 1) : 0, a = o ? t.charCodeAt(n + 2) : 0;
                                    i += e[r >> 2], i += e[(3 & r) << 4 | u >> 4], i += l ? e[(15 & u) << 2 | a >> 6] : '=', i += o ? e[63 & a] : '=';
                                }
                                return i;
                            }(e);
                        }(`${c}:${null != (r = t.alistPass) ? r : ''}`)}`
                    }
                }), p.sign && d.push({
                    name: 'AList代理原画',
                    description: `${s} · 经 AList 代理播放`,
                    url: `${o}/p${u}?sign=${encodeURIComponent(p.sign)}`
                });
                try {
                    let e = yield L(t, '/api/fs/get', {
                        path: p.path,
                        password: ''
                    }), i = String(null != (l = null == e ? void 0 : e.raw_url) ? l : '');
                    i && d.push({
                        name: 'AList直链原画',
                        description: `${s} · AList 给出的源文件直链`,
                        url: i
                    });
                } catch (t) {
                    console.log(`${i} AList fs/get 失败（直链跳过）: ${n(t)}`);
                }
                return d;
            })());
            if (0 === o.length) return h('诊断·AList：命中但无可用链接');
            return console.log(`${i} loadResource ${m}：共 ${o.length} 条播放线路`), o;
        } catch (t) {
            return console.log(`${i} AList 源失败: ${n(t)}`), h('诊断·AList：出错');
        }
    })();
