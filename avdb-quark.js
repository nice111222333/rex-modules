function e(e, t, r, l, n, i, o) {
    try {
        var a = e[i](o), u = a.value;
    } catch (e) {
        r(e);
        return;
    }
    a.done ? t(u) : Promise.resolve(u).then(l, n);
}
function t(t) {
    return function() {
        var r = this, l = arguments;
        return new Promise(function(n, i) {
            var o = t.apply(r, l);
            function a(t) {
                e(o, n, i, a, u, "next", t);
            }
            function u(t) {
                e(o, n, i, a, u, "throw", t);
            }
            a(void 0);
        });
    };
}
WidgetMetadata = {
    id: 'v7777-avdb-quark',
    title: 'AVDB夸克版',
    description: "JavDB 浏览（最新/Top250/搜索/详情）+ 夸克网盘播放：先按番号搜自己的网盘，未命中时自动搜分享索引并转存到网盘再播，另有 Jable 外部源兜底。使用前请在全局参数中填写自己的夸克网盘 Cookie；如需 JavDB 磁力，请填「JavDB Cookie」（从已登录的浏览器复制）。JavDB 本站对部分地区 IP 有限制，若列表为空请检查代理节点地区（建议非日本节点）。",
    author: 'v7777',
    site: 'https://javdb.com',
    version: "0.2.0",
    requiredVersion: '0.0.2',
    detailCacheDuration: 60,
    globalParams: [
        {
            name: 'javdbUsername',
            title: 'JavDB 账号',
            type: 'input',
            description: '可选（不使用）。模块无法用账号密码登录 JavDB，需要登录态请填下方「JavDB Cookie」',
            value: ''
        },
        {
            name: 'javdbPassword',
            title: 'JavDB 密码',
            type: 'input',
            description: '可选（不使用，也不会被记录）。同上，登录请用「JavDB Cookie」',
            value: ''
        },
        {
            name: 'javdbCookie',
            title: 'JavDB Cookie',
            type: 'input',
            description: '可选（磁力需要）。在浏览器登录 javdb.com 后，从开发者工具复制完整 Cookie；填入后详情页可显示磁力链接',
            value: ''
        },
        {
            name: 'quarkCookie',
            title: '夸克网盘 Cookie',
            type: 'input',
            description: '必填（网盘播放/转存）。登录 pan.quark.cn 后从浏览器开发者工具复制完整 Cookie',
            value: ''
        },
        {
            name: 'quarkSaveFid',
            title: '转存目标目录 fid',
            type: 'input',
            description: '可选。留空 = 自动使用网盘根目录下的「AVDB」文件夹（不存在时自动创建）；填 0 = 根目录；也可填指定文件夹的 fid',
            value: ''
        },
        {
            name: 'shareIndexEnabled',
            title: '分享索引搜索',
            type: 'enumeration',
            value: 'on',
            enumOptions: [
                {
                    title: '开启（网盘未命中时搜分享并转存）',
                    value: 'on'
                },
                {
                    title: '关闭（只播网盘已有文件）',
                    value: 'off'
                }
            ]
        },
        {
            name: 'shareIndexBase',
            title: '分享索引地址',
            type: 'input',
            description: 'PanSou 兼容的网盘分享索引服务地址。默认官方公共实例；搜不到时可换其他实例或自建地址，如 https://so.252035.xyz',
            value: 'https://pansou.app'
        },
        {
            name: 'sourcePriority',
            title: '播放源顺序',
            type: 'enumeration',
            value: 'quark-first',
            enumOptions: [
                {
                    title: '夸克网盘优先',
                    value: 'quark-first'
                },
                {
                    title: '外部源优先',
                    value: 'external-first'
                }
            ]
        }
    ],
    modules: [
        {
            id: 'loadHome',
            title: '最新',
            functionName: 'loadHome',
            cacheDuration: 600,
            params: []
        },
        {
            id: 'loadTop250',
            title: 'Top250',
            functionName: 'loadTop250',
            cacheDuration: 3600,
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
        title: '搜索',
        functionName: 'searchVideos',
        params: [
            {
                name: 'keyword',
                title: '关键词',
                type: 'input',
                description: '番号或关键词，如 SSIS-001',
                value: ''
            }
        ]
    }
};
let r = '[AVDB夸克版]', l = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
function n(e) {
    return new Promise((t)=>{
        'function' == typeof setTimeout ? setTimeout(t, e) : t();
    });
}
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
function o(e, t) {
    if (!t) return '';
    let r = String(t).trim();
    if (!r) return '';
    if (/^https?:\/\//i.test(r)) return r;
    if (r.startsWith('//')) return `https:${r}`;
    let l = /^(https?:\/\/[^/]+)/i.exec(e), n = l ? l[1] : e.replace(/\/+$/, '');
    if (r.startsWith('/')) return n + r;
    let i = e.split(/[?#]/)[0];
    return i.slice(0, i.lastIndexOf('/') + 1) + r;
}
function a(e) {
    return Object.keys(e).map((t)=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join('&');
}
function u(e, r) {
    return t(function*() {
        let t = yield Widget.http.get(e, {
            headers: r
        }), l = 'number' == typeof (null == t ? void 0 : t.statusCode) ? t.statusCode : 200;
        if (l >= 400) throw Error(`HTTP ${l}: ${e}`);
        let n = null == t ? void 0 : t.data;
        return 'string' == typeof n ? n : null == n ? '' : String(n);
    })();
}
function s(e) {
    if (null == e) return null;
    if ('object' == typeof e) return e;
    if ('string' == typeof e) try {
        return JSON.parse(e);
    } catch (e) {}
    return null;
}
function d(e) {
    if (!e) return null;
    let t = String(e).toUpperCase().replace(/[^A-Z0-9-]/g, ''), r = /FC2(?:-PPV)?-?(\d{5,7})/.exec(t);
    if (r) return `FC2-PPV-${r[1]}`;
    let l = /([A-Z]{2,6})-?(\d{2,5})/.exec(t);
    return l ? `${l[1]}-${l[2]}` : null;
}
function c(e) {
    return e.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
function f(...e) {
    for (let t of e){
        if (!t) continue;
        let e = d(t);
        if (e) return e;
    }
    return null;
}
let p = 'https://javdb.com', g = 'javdb_cookie_mirror';
function h(e) {
    return t(function*() {
        try {
            if (!e || 'string' != typeof e.javdbCookie) return;
            let t = e.javdbCookie.trim();
            t ? yield Widget.storage.set(g, t) : yield Widget.storage.remove(g);
        } catch (e) {}
    })();
}
function v(e) {
    return t(function*() {
        if (e && 'string' == typeof e.javdbCookie && e.javdbCookie.trim()) return e.javdbCookie.trim();
        try {
            let e = yield Widget.storage.get(g);
            if ('string' == typeof e && e.trim()) return e.trim();
        } catch (e) {}
        return '';
    })();
}
function m(e) {
    return !!e && (/just a moment/i.test(e) || e.includes('challenges.cloudflare.com') || e.includes('_cf_chl') || /attention required/i.test(e) || e.includes('cf-browser-verification'));
}
class y extends Error {
    constructor(e){
        super(`JavDB 返回了 Cloudflare 验证页（出口 IP 被拦截）: ${e}`), this.name = 'JavdbChallengeError';
    }
}
function $(e, r) {
    return t(function*() {
        let t, n = yield u(e, (t = {
            'User-Agent': l,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${p}/`
        }, r && (t.Cookie = r), t));
        if (m(n)) throw new y(e);
        return n;
    })();
}
function k(e, l, n) {
    return t(function*() {
        try {
            let i = yield $(e, n), a = yield t(function*() {
                let t = yield Widget.html.load(i), r = t('a.box');
                0 === r.length && (r = t('.movie-list a.box, .grid a.box'));
                let l = [], n = new Set();
                return r.each((r, i)=>{
                    var a, u, s, c, p;
                    let g = t(i), h = o(e, null != (a = g.attr('href')) ? a : '');
                    if (!h || n.has(h)) return;
                    n.add(h);
                    let v = g.find('.video-title strong').first().text().trim(), m = (null != (u = g.attr('title')) ? u : '').trim(), y = g.find('.video-title').first().text().trim(), $ = null != (s = d(v)) ? s : f(m, y), k = m || y || $ || h, _ = null != (c = null != (p = g.find('img').first().attr('src')) ? p : g.find('img').first().attr('data-src')) ? c : '';
                    _ = o(e, _);
                    let x = g.find('.score').first().text(), b = /(\d+(?:\.\d+)?)\s*分/.exec(x), w = g.find('.meta').first().text().trim(), C = /(\d{4}-\d{2}-\d{2})/.exec(w);
                    l.push({
                        id: null != $ ? $ : h,
                        type: 'detail',
                        title: k,
                        link: h,
                        posterPath: _ || void 0,
                        coverUrl: _ || void 0,
                        backdropPath: _ || void 0,
                        rating: b ? b[1] : void 0,
                        releaseDate: C ? C[1] : void 0,
                        mediaType: 'movie'
                    });
                }), l;
            })();
            return console.log(`${r} JavDB ${l}：${a.length} 条`), 0 === a.length && console.log(`${r} JavDB ${l}未解析到条目：页面结构可能已变化，或该页需要登录/VIP`), a;
        } catch (e) {
            return console.log(`${r} JavDB ${l}失败，已降级为空: ${i(e)}`), [];
        }
    })();
}
function _(e) {
    return e.replace(/[:：\s]/g, '');
}
function x(e, t) {
    return e.find((e)=>t.includes(e.label));
}
loadHome = (e)=>t(function*() {
        yield h(e);
        let t = yield v(e), r = e.genreId || e.peopleId || '';
        return r ? k(o(p, r), '分类/演员列表', t) : k(`${p}/`, '首页最新', t);
    })(), loadTop250 = (e)=>t(function*() {
        return yield h(e), k(`${p}/top250`, 'Top250', (yield v(e)));
    })(), searchVideos = (e)=>t(function*() {
        var t, l, n;
        yield h(e);
        let i = yield v(e), o = (null != (t = null != (l = null != (n = e.keyword) ? n : e.title) ? l : e.query) ? t : '').trim();
        return o ? k(`${p}/search?${a({
            q: o,
            f: 'all'
        })}`, `搜索「${o}」`, i) : (console.log(`${r} 搜索关键词为空`), []);
    })(), loadDetail = (e, l)=>t(function*() {
        let t;
        if (!e) return null;
        yield h(l);
        let n = yield v(l);
        try {
            t = yield $(e, n);
        } catch (e) {
            return console.log(`${r} JavDB 详情获取失败: ${i(e)}`), null;
        }
        try {
            var a, u, s, c, p, g, m, y, k;
            let l, i, h, v = yield Widget.html.load(t), $ = function(e) {
                let t = e('nav.panel.movie-panel-info').first(), r = [];
                if (0 === t.length) return r;
                let l = t.find('> div, .panel-block'), n = new Set();
                return l.each((t, l)=>{
                    if (n.has(l)) return;
                    n.add(l);
                    let i = e(l), o = i.find('strong').first();
                    if (0 === o.length) return;
                    let a = _(o.text());
                    if (!a) return;
                    let u = i.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
                    r.push({
                        label: a,
                        valueText: u,
                        $row: i
                    });
                }), r;
            }(v), b = null, w = x($, [
                '番號',
                '番号'
            ]);
            if (w && (b = d(w.valueText)), !b) {
                let e = v('nav.panel.movie-panel-info div span').first().text();
                b = d(e);
            }
            b || (b = f(v('title').first().text()));
            let C = v('h2 strong.current-title').first().text().trim(), S = v('h2 span.origin-title').first().text().trim(), D = null != (a = v('meta[property="og:title"]').attr('content')) ? a : '', A = C || D || b || e, T = null != (u = v('img.video-cover').first().attr('src')) ? u : '';
            T || (T = null != (s = v('meta[property="og:image"]').attr('content')) ? s : ''), T = o(e, T);
            let q = x($, [
                '日期'
            ]), P = q ? null == (m = /(\d{4}-\d{2}-\d{2})/.exec(q.valueText)) ? void 0 : m[1] : void 0, B = x($, [
                '時長',
                '时长'
            ]);
            if (B) {
                i = B.valueText;
                let e = /(\d+)\s*分/.exec(B.valueText);
                e && (l = 60 * Number(e[1]));
            }
            let j = v('.score-stars').first();
            if (j.length > 0) {
                let e = (j.parent().text() || '').replace(/\s+/g, ' ');
                h = null == (y = /(\d+(?:\.\d+)?)\s*分/.exec(e)) ? void 0 : y[1];
            }
            if (!h) {
                let e = x($, [
                    '評分',
                    '评分'
                ]);
                e && (h = null == (k = /(\d+(?:\.\d+)?)/.exec(e.valueText)) ? void 0 : k[1]);
            }
            let J = [], z = x($, [
                '類別',
                '类别'
            ]);
            z && z.$row.find('a').each((e, t)=>{
                var r;
                let l = v(t), n = null != (r = l.attr('href')) ? r : '', i = l.text().trim();
                i && J.push({
                    id: n || i,
                    title: i
                });
            });
            let I = [], W = x($, [
                '演員',
                '演员'
            ]);
            if (W) {
                let e = [];
                W.$row.find('a, strong').each((t, r)=>{
                    var l, n;
                    let i = v(r), o = null != (l = r.tagName) ? l : '';
                    'a' === o ? e.push({
                        kind: 'a',
                        text: i.text().trim(),
                        href: null != (n = i.attr('href')) ? n : ''
                    }) : 'strong' === o && e.push({
                        kind: 'strong',
                        text: i.text().trim(),
                        href: ''
                    });
                });
                let t = !1, r = [];
                for (let l of e){
                    if ('strong' === l.kind && !t && _(l.text) === W.label) {
                        t = !0;
                        continue;
                    }
                    'a' === l.kind ? r.push({
                        name: l.text,
                        href: l.href,
                        gender: ''
                    }) : r.length > 0 && !r[r.length - 1].gender && (r[r.length - 1].gender = l.text);
                }
                let l = r.some((e)=>e.gender.includes('♀') || e.gender.includes('♂'));
                for (let e of r)e.name && (!l || e.gender.includes('♀')) && I.push({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                });
            }
            let U = new Set();
            v('a[href^="magnet:"]').each((e, t)=>{
                var r;
                let l = (null != (r = v(t).attr('href')) ? r : '').replace(/\[javdb\.com\]$/i, '');
                l && U.add(l);
            });
            let O = [
                ...U
            ], E = [];
            v('a.tile-item[data-fancybox="gallery"]').each((t, r)=>{
                let l = o(e, v(r).attr('href'));
                l && E.push(l);
            });
            let V = null != (c = v('video#preview-video source').first().attr('src')) ? c : '';
            V.startsWith('//') && (V = `https:${V}`);
            let N = [];
            b && N.push(`番号：${b}`), S && S !== A && N.push(`原标题：${S}`);
            let R = x($, [
                '片商',
                '賣家',
                '卖家'
            ]);
            (null == R ? void 0 : R.valueText) && N.push(`片商：${R.valueText}`);
            let H = x($, [
                '發行',
                '发行'
            ]);
            (null == H ? void 0 : H.valueText) && N.push(`发行：${H.valueText}`);
            let L = x($, [
                '系列'
            ]);
            (null == L ? void 0 : L.valueText) && N.push(`系列：${L.valueText}`);
            let M = x($, [
                '導演',
                '导演'
            ]);
            if ((null == M ? void 0 : M.valueText) && N.push(`导演：${M.valueText}`), O.length > 0) for (let e of (N.push(`磁力链接：共 ${O.length} 条`), O.slice(0, 3)))N.push(e);
            else n ? N.push('磁力链接：未获取（已带 JavDB Cookie，仍无磁力——该条目可能无磁力，或 Cookie 已失效）') : N.push('磁力链接：未获取（JavDB 仅对登录用户展示磁力，请在全局参数填写「JavDB Cookie」）');
            let F = {
                id: null != b ? b : e,
                type: 'url',
                title: b ? `${b} 播放` : `${A} 播放`,
                link: e,
                coverUrl: T || void 0,
                posterPath: T || void 0,
                mediaType: 'movie'
            }, G = {
                id: null != b ? b : e,
                type: 'detail',
                title: A,
                link: e,
                posterPath: T || void 0,
                detailPoster: T || void 0,
                coverUrl: T || void 0,
                backdropPath: null != (p = null != (g = E[0]) ? g : T) ? p : void 0,
                backdropPaths: E.length > 0 ? E : void 0,
                releaseDate: P,
                rating: h,
                duration: l,
                durationText: i,
                genreTitle: J.map((e)=>e.title).join(' · ') || void 0,
                genreItems: J.length > 0 ? J : void 0,
                peoples: I.length > 0 ? I : void 0,
                previewUrl: V || void 0,
                trailers: V ? [
                    {
                        url: V,
                        coverUrl: T || void 0
                    }
                ] : void 0,
                description: N.join('\n'),
                mediaType: 'movie',
                episodeItems: [
                    F
                ]
            };
            return console.log(`${r} JavDB 详情完成：${null != b ? b : '(番号未知)'}，演员 ${I.length}，类别 ${J.length}，磁力 ${O.length}`), G;
        } catch (e) {
            return console.log(`${r} JavDB 详情解析失败: ${i(e)}`), null;
        }
    })();
let b = 'https://drive-h.quark.cn/1/clouddrive', w = 'https://drive-pc.quark.cn/1/clouddrive', C = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch', S = 'https://pan.quark.cn', D = 'quark_cookie_dyn', A = 'quark_cookie_base_fp';
function T(e) {
    let t = 5381;
    for(let r = 0; r < e.length; r++)t = (t << 5) + t + e.charCodeAt(r) | 0;
    return `${e.length}:${(t >>> 0).toString(16)}`;
}
let q = new Set([
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
function P(e, r, l, n, i, o, u) {
    return t(function*() {
        var d, c;
        let f, p = yield t(function*() {
            var t;
            let r = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!r) return '';
            try {
                if ((yield Widget.storage.get(A)) === T(r)) {
                    let e = yield Widget.storage.get(D);
                    if ('string' == typeof e && e.trim()) return e;
                }
            } catch (e) {}
            return r;
        })();
        if (!p) throw Error('未填写夸克网盘 Cookie（模块全局参数 quarkCookie）');
        let g = a(function(e) {
            for(var t = 1; t < arguments.length; t++){
                var r = null != arguments[t] ? arguments[t] : {}, l = Object.keys(r);
                "function" == typeof Object.getOwnPropertySymbols && (l = l.concat(Object.getOwnPropertySymbols(r).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(r, e).enumerable;
                }))), l.forEach(function(t) {
                    var l;
                    l = r[t], t in e ? Object.defineProperty(e, t, {
                        value: l,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = l;
                });
            }
            return e;
        }({
            pr: 'ucpro',
            fr: 'pc'
        }, i)), h = `${r}${n}?${g}`, v = {
            Cookie: p,
            Accept: 'application/json, text/plain, */*',
            Referer: null != u ? u : S,
            'User-Agent': C
        };
        f = 'GET' === l ? yield Widget.http.get(h, {
            headers: v
        }) : yield Widget.http.post(h, null != o ? o : {}, {
            headers: v
        }), yield (d = null == f ? void 0 : f.headers, t(function*() {
            try {
                var t, r;
                let l = (null != (t = e.quarkCookie) ? t : '').trim();
                if (!l || !d) return;
                let n = null != (r = d['set-cookie']) ? r : d['Set-Cookie'];
                if (!n) return;
                Array.isArray(n) || (n = [
                    n
                ]);
                let i = p, o = !1;
                for (let e of n){
                    let t = String(e).split(';')[0], r = t.indexOf('=');
                    if (r <= 0) continue;
                    let l = t.slice(0, r).trim();
                    ('__puus' === l || '__pus' === l) && (i = function(e, t, r) {
                        let l = e.split(';').map((e)=>e.trim()).filter(Boolean), n = !1, i = l.map((e)=>{
                            let l = e.indexOf('=');
                            return l > 0 && e.slice(0, l) === t ? (n = !0, `${t}=${r}`) : e;
                        });
                        return n || i.push(`${t}=${r}`), i.join('; ');
                    }(i, l, t.slice(r + 1).trim()), o = !0);
                }
                o && (yield Widget.storage.set(D, i), yield Widget.storage.set(A, T(l)));
            } catch (e) {}
        })());
        let m = 'number' == typeof (null == f ? void 0 : f.statusCode) ? f.statusCode : 200;
        if (m >= 400) throw Error(`HTTP ${m}: 夸克接口 ${n}`);
        let y = s(null == f ? void 0 : f.data);
        if (!y) throw Error(`夸克接口 ${n} 返回了无法解析的内容`);
        if ('number' == typeof y.status && y.status >= 400 || void 0 !== y.code && 0 !== y.code) throw Error(`夸克接口 ${n} 出错: ${null != (c = y.message) ? c : `code=${y.code}`}`);
        return {
            json: y,
            cookieSent: p
        };
    })();
}
function B(e, r, l, n, i) {
    return t(function*() {
        return P(e, 'https://drive.quark.cn/1/clouddrive', r, l, n, i);
    })();
}
function j(e, r) {
    return t(function*() {
        let t = [], l = 1;
        for(; l <= 20; l++){
            var n, i, o, a;
            let { json: u } = yield B(e, 'GET', '/file/sort', {
                pdir_fid: r,
                _page: String(l),
                _size: '100',
                _fetch_total: '1',
                fetch_all_file: '1',
                fetch_risk_file_name: '1'
            }), s = Array.isArray(null == u || null == (n = u.data) ? void 0 : n.list) ? u.data.list : [];
            for (let e of s)t.push({
                fid: String(null != (o = e.fid) ? o : ''),
                name: String(null != (a = e.file_name) ? a : ''),
                size: 'number' == typeof e.size ? e.size : 0,
                category: 'number' == typeof e.category ? e.category : 0,
                isDir: !1 === e.file
            });
            let d = null == u || null == (i = u.metadata) ? void 0 : i._total;
            if (0 === s.length || 'number' == typeof d && t.length >= d || s.length < 100) break;
        }
        return t;
    })();
}
function J(e) {
    let t = e.lastIndexOf('.');
    return !(t < 0) && q.has(e.slice(t + 1).toLowerCase());
}
function z(e) {
    return e.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
let I = {
    '4k': 6,
    '2k': 5,
    super: 4,
    high: 3,
    normal: 2,
    low: 1
};
function W(e, l) {
    return t(function*() {
        var t, n, o, a;
        let u = [];
        try {
            let { json: r } = yield B(e, 'POST', '/file/v2/play/project', {}, {
                fid: l.fid,
                resolutions: 'low,normal,high,super,2k,4k',
                supports: 'fmp4_av,m3u8,dolby_vision'
            });
            for (let e of (Array.isArray(null == r || null == (t = r.data) ? void 0 : t.video_list) ? r.data.video_list : []).filter((e)=>{
                var t;
                return null == e || null == (t = e.video_info) ? void 0 : t.url;
            }).sort((e, t)=>{
                var r, l, n, i;
                return (null != (r = I[String(null != (l = null == t ? void 0 : t.resolution) ? l : '').toLowerCase()]) ? r : 0) - (null != (n = I[String(null != (i = null == e ? void 0 : e.resolution) ? i : '').toLowerCase()]) ? n : 0);
            }).slice(0, 3))u.push({
                name: `夸克转码 ${String(null != (n = e.resolution) ? n : '').toUpperCase()}`,
                description: l.name,
                url: String(e.video_info.url)
            });
        } catch (e) {
            console.log(`${r} 夸克转码获取失败（${l.name}），仅尝试原画: ${i(e)}`);
        }
        try {
            let { json: t, cookieSent: r } = yield B(e, 'POST', '/file/download', {}, {
                fids: [
                    l.fid
                ]
            }), n = null == t || null == (a = t.data) || null == (o = a[0]) ? void 0 : o.download_url;
            n && u.push({
                name: '夸克原画',
                description: [
                    l.name,
                    function(e) {
                        if (!e) return '';
                        let t = e / 1073741824;
                        return t >= 1 ? `${t.toFixed(2)} GB` : `${(e / 1048576).toFixed(1)} MB`;
                    }(l.size)
                ].filter(Boolean).join(' · '),
                url: String(n),
                customHeaders: {
                    Cookie: r,
                    Referer: S,
                    'User-Agent': C
                }
            });
        } catch (e) {
            console.log(`${r} 夸克原画链接获取失败（${l.name}）: ${i(e)}`);
        }
        return u;
    })();
}
let U = 'quark_avdb_folder_fid';
function O(e, r, l, n) {
    return t(function*() {
        let t = [];
        for(let u = 1; u <= 4; u++){
            var i, o, a;
            let { json: s } = yield P(e, b, 'GET', '/share/sharepage/detail', {
                pwd_id: r.pwdId,
                stoken: l,
                pdir_fid: n,
                force: '0',
                _page: String(u),
                _size: '50',
                _fetch_banner: '1',
                _fetch_share: '1',
                _fetch_total: '1',
                _sort: 'file_type:asc,file_name:asc'
            }, void 0, `https://pan.quark.cn/s/${r.pwdId}`), d = Array.isArray(null == s || null == (i = s.data) ? void 0 : i.list) ? s.data.list : [];
            for (let e of d)(null == e ? void 0 : e.fid) && t.push({
                fid: String(e.fid),
                token: String(null != (o = e.share_fid_token) ? o : ''),
                name: String(null != (a = e.file_name) ? a : ''),
                size: 'number' == typeof e.size ? e.size : 0,
                category: 'number' == typeof e.category ? e.category : 0,
                isDir: !1 === e.file
            });
            if (d.length < 50) break;
        }
        return t;
    })();
}
let E = 'https://jable.tv';
loadResource = (e)=>t(function*() {
        let d = f(e.id, e.title, e.seriesName, e.link);
        if (!d) {
            var p, g;
            return console.log(`${r} loadResource 未能从参数中提取番号（id=${null != (p = e.id) ? p : ''}，title=${null != (g = e.title) ? g : ''}），返回空`), [];
        }
        yield h(e);
        let v = 'external-first' === e.sourcePriority, y = [], $ = [], k = ()=>t(function*() {
                try {
                    var o;
                    if (!(null != (o = e.quarkCookie) ? o : '').trim()) return void console.log(`${r} 未填写夸克 Cookie，跳过夸克网盘源`);
                    let u = yield t(function*() {
                        let t = new Set([
                            c(d)
                        ]), l = /FC2-PPV-(\d+)/.exec(d);
                        l && t.add(`FC2${l[1]}`);
                        let n = [
                            '0'
                        ], o = [], a = 0, u = 0;
                        for(; n.length > 0 && a < 60 && u < 4000;){
                            let l, s = n.shift();
                            a++;
                            try {
                                l = yield j(e, s);
                            } catch (e) {
                                console.log(`${r} 夸克目录 ${s} 列取失败，跳过: ${i(e)}`);
                                continue;
                            }
                            for (let e of l){
                                if (u++, e.isDir) {
                                    n.push(e.fid);
                                    continue;
                                }
                                if (1 !== e.category && !J(e.name)) continue;
                                let r = z(e.name);
                                for (let l of t)if (l && r.includes(l)) {
                                    o.push(e);
                                    break;
                                }
                            }
                        }
                        return n.length > 0 && console.log(`${r} 夸克搜索达到遍历上限（已走 ${a} 个目录、扫描 ${u} 项），结果可能不完整`), o.sort((e, t)=>{
                            let r = +(1 !== e.category), l = +(1 !== t.category);
                            return r !== l ? r - l : t.size - e.size;
                        }), o;
                    })();
                    if (u.length > 0) {
                        console.log(`${r} 夸克命中 ${u.length} 个文件，解析最优文件：${u[0].name}`), y.push(...yield W(e, u[0]));
                        return;
                    }
                    console.log(`${r} 夸克网盘中未找到与 ${d} 匹配的视频文件，尝试分享转存`), y.push(...yield t(function*() {
                        let o;
                        if ('off' === e.shareIndexEnabled) return console.log(`${r} 分享索引搜索已关闭，跳过转存`), [];
                        try {
                            o = yield t(function*() {
                                var t, r, n, i, o;
                                let u = (null != (t = e.shareIndexBase) ? t : '').trim().replace(/\/+$/, '') || 'https://pansou.app', f = `${u}/api/search?${a({
                                    kw: d,
                                    res: 'all',
                                    src: 'all'
                                })}`, p = yield Widget.http.get(f, {
                                    headers: {
                                        'User-Agent': l,
                                        Accept: 'application/json, */*'
                                    }
                                }), g = 'number' == typeof (null == p ? void 0 : p.statusCode) ? p.statusCode : 200;
                                if (g >= 400) throw Error(`HTTP ${g}: 分享索引 ${u}`);
                                let h = s(null == p ? void 0 : p.data);
                                if (!h) throw Error(`分享索引 ${u} 返回了无法解析的内容`);
                                if ('number' == typeof h.code && 0 !== h.code) throw Error(`分享索引出错: ${null != (i = h.message) ? i : `code=${h.code}`}`);
                                let v = null != (r = h.data) ? r : h, m = c(d), y = new Map(), $ = (e, t, r)=>{
                                    if (y.size >= 12) return;
                                    let l = String(null != e ? e : '');
                                    if (!l.includes('quark')) return;
                                    let n = function(e) {
                                        var t, r;
                                        if (!e) return null;
                                        let l = /\/s\/([A-Za-z0-9_-]{4,})/.exec(e);
                                        if (!l) return null;
                                        let n = null != (t = null == (r = /[?&]pwd=([A-Za-z0-9]+)/.exec(e)) ? void 0 : r[1]) ? t : '';
                                        return {
                                            pwdId: l[1],
                                            passcode: n
                                        };
                                    }(l);
                                    if (!n) return;
                                    let i = String(null != r ? r : '').trim(), o = +!z(i).includes(m), a = y.get(n.pwdId);
                                    a && a.tier <= o || y.set(n.pwdId, {
                                        url: l,
                                        pwdId: n.pwdId,
                                        passcode: String(null != t ? t : '') || n.passcode,
                                        title: i,
                                        tier: o
                                    });
                                }, k = null == v || null == (n = v.merged_by_type) ? void 0 : n.quark;
                                if (Array.isArray(k)) for (let e of k)$(null == e ? void 0 : e.url, null == e ? void 0 : e.password, null != (o = null == e ? void 0 : e.note) ? o : '');
                                let _ = null == v ? void 0 : v.results;
                                if (Array.isArray(_)) {
                                    let e = 0;
                                    for (let t of _){
                                        if (e++ >= 300 || y.size >= 12) break;
                                        for (let e of Array.isArray(null == t ? void 0 : t.links) ? t.links : [])null != e && e.type && 'quark' !== e.type || $(null == e ? void 0 : e.url, null == e ? void 0 : e.password, (null == e ? void 0 : e.work_title) || (null == t ? void 0 : t.title) || '');
                                    }
                                }
                                return [
                                    ...y.values()
                                ].sort((e, t)=>e.tier - t.tier);
                            })();
                        } catch (e) {
                            return console.log(`${r} 分享索引搜索失败，已跳过转存: ${i(e)}`), [];
                        }
                        if (0 === o.length) return console.log(`${r} 分享索引未找到 ${d} 的夸克分享`), [];
                        console.log(`${r} 分享索引找到 ${o.length} 个 ${d} 的夸克分享候选`);
                        let u = yield t(function*() {
                            var t, l, o, a, u;
                            let s = (null != (t = e.quarkSaveFid) ? t : '').trim();
                            if (s) return s;
                            try {
                                let e = yield Widget.storage.get(U);
                                if ('string' == typeof e && e) return e;
                            } catch (e) {}
                            try {
                                let t = (yield j(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name);
                                if (t) {
                                    try {
                                        yield Widget.storage.set(U, t.fid);
                                    } catch (e) {}
                                    return t.fid;
                                }
                                let s = '';
                                try {
                                    let { json: t } = yield B(e, 'POST', '/file', {}, {
                                        dir_init_lock: !1,
                                        dir_path: '',
                                        file_name: 'AVDB',
                                        pdir_fid: '0'
                                    });
                                    s = String(null != (l = null == t || null == (o = t.data) ? void 0 : o.fid) ? l : '');
                                } catch (e) {
                                    console.log(`${r} 创建 AVDB 文件夹失败（可能已有同名）: ${i(e)}`);
                                }
                                for(let t = 0; t < 3 && !s; t++)yield n(1000), s = null != (a = null == (u = (yield j(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name)) ? void 0 : u.fid) ? a : '';
                                if (s) {
                                    try {
                                        yield Widget.storage.set(U, s);
                                    } catch (e) {}
                                    return console.log(`${r} 转存目标：网盘根目录下的 AVDB 文件夹`), s;
                                }
                            } catch (e) {
                                console.log(`${r} 解析转存目标目录失败: ${i(e)}`);
                            }
                            return console.log(`${r} 转存目标文件夹 AVDB 不可用，改存网盘根目录`), '0';
                        })(), f = Math.min(3, o.length);
                        for(let l = 0; l < f; l++){
                            let a = o[l];
                            try {
                                let o = yield function(e, r) {
                                    return t(function*() {
                                        var t;
                                        let l = Date.now(), { json: n } = yield P(e, b, 'POST', '/share/sharepage/token', {
                                            __dt: String(l % 1000),
                                            __t: String(l)
                                        }, {
                                            pwd_id: r.pwdId,
                                            passcode: r.passcode
                                        }, `https://pan.quark.cn/s/${r.pwdId}`), i = null == n || null == (t = n.data) ? void 0 : t.stoken;
                                        if (!i) throw Error('分享 token 接口未返回 stoken（分享可能已失效或需要提取码）');
                                        return String(i);
                                    })();
                                }(e, a), s = yield function(e, l, n, o) {
                                    return t(function*() {
                                        let t = yield O(e, l, n, '0'), a = t.filter((e)=>!e.isDir);
                                        for (let o of t.filter((e)=>e.isDir).slice(0, 10))try {
                                            let t = yield O(e, l, n, o.fid);
                                            a.push(...t.filter((e)=>!e.isDir));
                                        } catch (e) {
                                            console.log(`${r} 分享子目录 ${o.name} 列取失败，跳过: ${i(e)}`);
                                        }
                                        let u = a.filter((e)=>1 === e.category || J(e.name)), s = c(o), d = u.filter((e)=>z(e.name).includes(s));
                                        return (d.length > 0 ? d : [
                                            ...u
                                        ].sort((e, t)=>t.size - e.size).slice(0, 3)).slice(0, 10);
                                    })();
                                }(e, a, o, d);
                                if (0 === s.length) {
                                    console.log(`${r} 分享候选 ${l + 1}（${a.title || a.pwdId}）内无视频文件，尝试下一个`);
                                    continue;
                                }
                                console.log(`${r} 转存候选 ${l + 1}：${a.title || a.url} → ${s.length} 个文件`);
                                let f = yield function(e, l, o, a, u) {
                                    return t(function*() {
                                        var t, s, d;
                                        let c = Date.now(), { json: f } = yield P(e, w, 'POST', '/share/sharepage/save', {
                                            __dt: String(c % 1000),
                                            __t: String(c)
                                        }, {
                                            fid_list: a.map((e)=>e.fid),
                                            fid_token_list: a.map((e)=>e.token),
                                            pdir_fid: '0',
                                            pwd_id: l.pwdId,
                                            scene: 'link',
                                            stoken: o,
                                            to_pdir_fid: u
                                        }), p = null != (t = null == f ? void 0 : f.data) ? t : {};
                                        if (!0 === p.task_sync) return 'done';
                                        let g = p.task_id ? String(p.task_id) : '';
                                        if (!g) return 'done';
                                        let h = Date.now();
                                        for(let t = 1; t <= 20 && !(Date.now() - h > 55000); t++){
                                            let l = 3000;
                                            try {
                                                let { json: r } = yield P(e, w, 'GET', '/task', {
                                                    uc_param_str: '',
                                                    task_id: g,
                                                    retry_index: String(t)
                                                }), n = null == r || null == (s = r.data) ? void 0 : s.status;
                                                if (2 === n) return 'done';
                                                if (3 === n) return 'failed';
                                                let i = null == r || null == (d = r.metadata) ? void 0 : d.tq_gap;
                                                'number' == typeof i && i > 0 && (l = Math.min(5000, Math.max(1500, i)));
                                            } catch (e) {
                                                console.log(`${r} 转存任务查询出错（第 ${t} 次），继续等待: ${i(e)}`);
                                            }
                                            t < 20 && (yield n(l));
                                        }
                                        return 'pending';
                                    })();
                                }(e, a, o, s, u);
                                if ('failed' === f) {
                                    console.log(`${r} 分享候选 ${l + 1} 转存任务失败，尝试下一个`);
                                    continue;
                                }
                                if ('pending' === f) return console.log(`${r} 转存任务仍在进行中（${d}）：本次先用其他源播放，文件落盘后下次打开将直接命中网盘`), [];
                                let p = yield function(e, l, o, a) {
                                    return t(function*() {
                                        let t = new Set(o.map((e)=>z(e))), u = c(a), s = (e)=>{
                                            let r = e.filter((e)=>!e.isDir && (1 === e.category || J(e.name))), l = r.filter((e)=>t.has(z(e.name))), n = l.length > 0 ? l : r.filter((e)=>z(e.name).includes(u));
                                            return 0 === n.length ? null : (n.sort((e, t)=>t.size - e.size), n[0]);
                                        };
                                        for(let t = 0; t < 3; t++){
                                            t > 0 && (yield n(1500));
                                            try {
                                                let t = yield j(e, l), r = s(t);
                                                if (r) return r;
                                                for (let r of t.filter((e)=>e.isDir).slice(0, 10)){
                                                    let t = yield j(e, r.fid), l = s(t);
                                                    if (l) return l;
                                                }
                                            } catch (e) {
                                                console.log(`${r} 转存后定位文件失败（第 ${t + 1} 次）: ${i(e)}`);
                                            }
                                        }
                                        return null;
                                    })();
                                }(e, u, s.map((e)=>e.name), d);
                                if (!p) return console.log(`${r} 转存已完成但暂未在网盘定位到文件（${d}），下次打开应可直接命中`), [];
                                return console.log(`${r} 转存完成并定位到文件：${p.name}`), yield W(e, p);
                            } catch (e) {
                                console.log(`${r} 分享候选 ${l + 1} 转存失败，尝试下一个: ${i(e)}`);
                            }
                        }
                        return console.log(`${r} 分享转存全部候选失败（${d}）`), [];
                    })());
                } catch (e) {
                    console.log(`${r} 夸克源失败，已降级: ${i(e)}`);
                }
            })(), _ = ()=>t(function*() {
                try {
                    $.push(...yield t(function*() {
                        var e, t, n, i, a;
                        let s, c = d.toLowerCase(), f = c.replace(/-/g, ''), p = `${E}/search/${encodeURIComponent(c)}/`, g = yield u(p, {
                            'User-Agent': l,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: `${E}/`
                        });
                        if (m(g)) return console.log(`${r} Jable 搜索被 Cloudflare 验证页拦截`), [];
                        let h = new Set(), v = /href\s*=\s*["']((?:https:\/\/jable\.tv)?\/videos\/[\w-]+\/?)["']/gi;
                        for(; null !== (s = v.exec(g));)h.add(o(E, s[1]));
                        let y = [
                            ...h
                        ], $ = null != (e = null != (t = y.find((e)=>e.toLowerCase().includes(c))) ? t : y.find((e)=>e.toLowerCase().replace(/-/g, '').includes(f))) ? e : y[0];
                        if (!$) return console.log(`${r} Jable 未找到 ${d} 的视频页`), [];
                        let k = yield u($, {
                            'User-Agent': l,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: p
                        });
                        if (m(k)) return console.log(`${r} Jable 视频页被 Cloudflare 验证页拦截`), [];
                        let _ = null != (n = null == (i = /var\s+hlsUrl\s*=\s*'([^']+)'/.exec(k)) ? void 0 : i[1]) ? n : null == (a = /var\s+hlsUrl\s*=\s*"([^"]+)"/.exec(k)) ? void 0 : a[1];
                        return _ ? [
                            {
                                name: 'Jable',
                                description: $,
                                url: _,
                                customHeaders: {
                                    Referer: $,
                                    'User-Agent': l
                                }
                            }
                        ] : (console.log(`${r} Jable 视频页未解析到 hlsUrl: ${$}`), []);
                    })());
                } catch (e) {
                    console.log(`${r} Jable 源失败，已降级: ${i(e)}`);
                }
                $.push(...yield t(function*() {
                    return console.log(`${r} MemoJav 源尚未实现（取流需逆向其播放器 JS），跳过 ${d}`), [];
                })());
            })();
        v ? (yield _(), yield k()) : (yield k(), yield _());
        let x = v ? [
            ...$,
            ...y
        ] : [
            ...y,
            ...$
        ];
        return console.log(`${r} loadResource ${d}：共 ${x.length} 条播放线路`), x;
    })();
