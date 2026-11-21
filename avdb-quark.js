function e(e, t, l, r, n, i, o) {
    try {
        var a = e[i](o), u = a.value;
    } catch (e) {
        l(e);
        return;
    }
    a.done ? t(u) : Promise.resolve(u).then(r, n);
}
function t(t) {
    return function() {
        var l = this, r = arguments;
        return new Promise(function(n, i) {
            var o = t.apply(l, r);
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
function l(e) {
    for(var t = 1; t < arguments.length; t++){
        var l = null != arguments[t] ? arguments[t] : {}, r = Object.keys(l);
        "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(l).filter(function(e) {
            return Object.getOwnPropertyDescriptor(l, e).enumerable;
        }))), r.forEach(function(t) {
            var r;
            r = l[t], t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r;
        });
    }
    return e;
}
WidgetMetadata = {
    id: 'v7777-avdb-quark',
    title: 'AVDB夸克版',
    description: "JavDB 浏览（最新/Top250/热播与分类榜单/搜索/详情）+ 夸克网盘播放：先按番号搜自己的网盘，未命中时自动搜分享索引并转存到网盘再播，另有 MemoJav / Jable 外部源兜底。使用前请在全局参数中填写自己的夸克网盘 Cookie；如需 JavDB 磁力，请填「JavDB Cookie」（从已登录的浏览器复制）。JavDB 本站对部分地区 IP 有限制，若列表为空请检查代理节点地区（建议非日本节点）。",
    author: 'v7777',
    site: 'https://javdb.com',
    version: "0.3.8",
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
            description: '可选（磁力需要）。在浏览器登录 javdb.com 后，从开发者工具复制完整 Cookie。详情页取磁力时携带；列表/搜索/榜单默认匿名请求，仅当匿名解析为空时（如无码榜对匿名返回登录页）才带 Cookie 重试一次，降低账号被封风险',
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
        },
        {
            name: 'quarkAutoRename',
            title: '夸克网盘自动整理',
            type: 'enumeration',
            value: 'on',
            enumOptions: [
                {
                    title: '开启（按女优归类到根目录同名文件夹，文件改番号名）',
                    value: 'on'
                },
                {
                    title: '关闭',
                    value: 'off'
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
            id: 'loadPlayback',
            title: '热播榜',
            functionName: 'loadPlayback',
            cacheDuration: 3600,
            params: []
        },
        {
            id: 'loadCensored',
            title: '有码榜',
            functionName: 'loadCensored',
            cacheDuration: 3600,
            params: []
        },
        {
            id: 'loadUncensored',
            title: '无码榜',
            functionName: 'loadUncensored',
            cacheDuration: 3600,
            params: []
        },
        {
            id: 'loadFC2',
            title: 'FC2榜',
            functionName: 'loadFC2',
            cacheDuration: 3600,
            params: []
        },
        {
            id: 'loadWestern',
            title: '欧美榜',
            functionName: 'loadWestern',
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
let r = '[AVDB夸克版]', n = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
function i(e) {
    return new Promise((t)=>{
        'function' == typeof setTimeout ? setTimeout(t, e) : t();
    });
}
function o(e) {
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
function a(e, t) {
    if (!t) return '';
    let l = String(t).trim();
    if (!l) return '';
    if (/^https?:\/\//i.test(l)) return l;
    if (l.startsWith('//')) return `https:${l}`;
    let r = /^(https?:\/\/[^/]+)/i.exec(e), n = r ? r[1] : e.replace(/\/+$/, '');
    if (l.startsWith('/')) return n + l;
    let i = e.split(/[?#]/)[0];
    return i.slice(0, i.lastIndexOf('/') + 1) + l;
}
function u(e) {
    return Object.keys(e).map((t)=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join('&');
}
function s(e, l) {
    return t(function*() {
        let t = yield Widget.http.get(e, {
            headers: l
        }), r = 'number' == typeof (null == t ? void 0 : t.statusCode) ? t.statusCode : 200;
        if (r >= 400) throw Error(`HTTP ${r}: ${e}`);
        let n = null == t ? void 0 : t.data;
        return 'string' == typeof n ? n : null == n ? '' : String(n);
    })();
}
function d(e) {
    if (null == e) return null;
    if ('object' == typeof e) return e;
    if ('string' == typeof e) try {
        return JSON.parse(e);
    } catch (e) {}
    return null;
}
function c(e) {
    if (!e) return null;
    let t = String(e).toUpperCase().replace(/[^A-Z0-9-]/g, ''), l = /FC2(?:-PPV)?-?(\d{5,7})/.exec(t);
    if (l) return `FC2-PPV-${l[1]}`;
    let r = /([A-Z]{2,6})-?(\d{2,5})/.exec(t);
    return r ? `${r[1]}-${r[2]}` : null;
}
function f(e) {
    return e.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
function p(...e) {
    for (let t of e){
        if (!t) continue;
        let e = c(t);
        if (e) return e;
    }
    return null;
}
let g = 'https://javdb.com', h = 'javdb_cookie_mirror';
function m(e) {
    return t(function*() {
        try {
            if (!e || 'string' != typeof e.javdbCookie) return;
            let t = e.javdbCookie.trim();
            t ? yield Widget.storage.set(h, t) : yield Widget.storage.remove(h);
        } catch (e) {}
    })();
}
function y(e) {
    return t(function*() {
        if (e && 'string' == typeof e.javdbCookie && e.javdbCookie.trim()) return e.javdbCookie.trim();
        try {
            let e = yield Widget.storage.get(h);
            if ('string' == typeof e && e.trim()) return e.trim();
        } catch (e) {}
        return '';
    })();
}
function v(e) {
    return !!e && (/just a moment/i.test(e) || e.includes('challenges.cloudflare.com') || e.includes('_cf_chl') || /attention required/i.test(e) || e.includes('cf-browser-verification'));
}
class $ extends Error {
    constructor(e){
        super(`JavDB 返回了 Cloudflare 验证页（出口 IP 被拦截）: ${e}`), this.name = 'JavdbChallengeError';
    }
}
function k(e, l) {
    return t(function*() {
        let t, r = yield s(e, (t = {
            'User-Agent': n,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${g}/`
        }, l && (t.Cookie = l), t));
        if (v(r)) throw new $(e);
        return r;
    })();
}
function b(e, l) {
    return t(function*() {
        let t = yield Widget.html.load(e), r = t('a.box');
        0 === r.length && (r = t('.movie-list a.box, .grid a.box'));
        let n = [], i = new Set();
        return r.each((e, r)=>{
            var o, u, s, d, f;
            let g = t(r), h = a(l, null != (o = g.attr('href')) ? o : '');
            if (!h || i.has(h)) return;
            i.add(h);
            let m = g.find('.video-title strong').first().text().trim(), y = (null != (u = g.attr('title')) ? u : '').trim(), v = g.find('.video-title').first().text().trim(), $ = null != (s = c(m)) ? s : p(y, v), k = y || v || $ || h, b = null != (d = null != (f = g.find('img').first().attr('src')) ? f : g.find('img').first().attr('data-src')) ? d : '';
            b = a(l, b);
            let _ = g.find('.score').first().text(), x = /(\d+(?:\.\d+)?)\s*分/.exec(_), C = g.find('.meta').first().text().trim(), w = /(\d{4}-\d{2}-\d{2})/.exec(C);
            n.push({
                id: null != $ ? $ : h,
                type: 'detail',
                title: k,
                link: h,
                posterPath: b || void 0,
                coverUrl: b || void 0,
                backdropPath: b || void 0,
                rating: x ? x[1] : void 0,
                releaseDate: w ? w[1] : void 0,
                mediaType: 'movie'
            });
        }), n;
    })();
}
function _(e) {
    var t;
    let l = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(e), r = (null != (t = null == l ? void 0 : l[1]) ? t : '').replace(/\s+/g, ' ').trim().slice(0, 60) || '(无标题)', n = e.includes('/login') || e.includes('sign_in') || e.includes('登录');
    return `title=${r}, login标记=${n ? '有' : '无'}`;
}
function x(e, l) {
    return t(function*() {
        try {
            let t = yield k(e), n = yield b(t, e);
            if (console.log(`${r} JavDB ${l}：${n.length} 条`), n.length > 0) return n;
            let i = yield y();
            if (i) {
                console.log(`${r} JavDB ${l} 匿名解析为空，带 Cookie 重试`);
                try {
                    let t = yield k(e, i), n = yield b(t, e);
                    return console.log(`${r} JavDB ${l}(Cookie重试)：${n.length} 条`), 0 === n.length && console.log(`${r} JavDB ${l}未解析到条目：页面结构可能已变化，或该页需要登录/VIP（页面提示：${_(t)}）`), n;
                } catch (e) {
                    return console.log(`${r} JavDB ${l}(Cookie重试)失败，已降级为空: ${o(e)}`), [];
                }
            }
            return console.log(`${r} JavDB ${l}未解析到条目：页面结构可能已变化，或该页需要登录/VIP（页面提示：${_(t)}）`), n;
        } catch (e) {
            return console.log(`${r} JavDB ${l}失败，已降级为空: ${o(e)}`), [];
        }
    })();
}
function C(e) {
    let t = (null != e ? e : '').trim().toLowerCase();
    return 'weekly' === t || 'monthly' === t ? t : 'daily';
}
function w(e, l, r) {
    return t(function*() {
        yield m(e);
        let t = C(e.period);
        return x(`${g}/rankings/movies?${u({
            p: t,
            t: l
        })}`, `${r}(${t})`);
    })();
}
function D(e) {
    return e.replace(/[:：\s]/g, '');
}
function S(e) {
    let t = e('nav.panel.movie-panel-info').first(), l = [];
    if (0 === t.length) return l;
    let r = t.find('> div, .panel-block'), n = new Set();
    return r.each((t, r)=>{
        if (n.has(r)) return;
        n.add(r);
        let i = e(r), o = i.find('strong').first();
        if (0 === o.length) return;
        let a = D(o.text());
        if (!a) return;
        let u = i.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
        l.push({
            label: a,
            valueText: u,
            $row: i
        });
    }), l;
}
function A(e, t) {
    return e.find((e)=>t.includes(e.label));
}
function j(e, t) {
    let l = A(t, [
        '演員',
        '演员'
    ]);
    if (!l) return [];
    let r = [];
    l.$row.find('a, strong').each((t, l)=>{
        var n, i;
        let o = e(l), a = null != (n = l.tagName) ? n : '';
        'a' === a ? r.push({
            kind: 'a',
            text: o.text().trim(),
            href: null != (i = o.attr('href')) ? i : ''
        }) : 'strong' === a && r.push({
            kind: 'strong',
            text: o.text().trim(),
            href: ''
        });
    });
    let n = !1, i = [];
    for (let e of r){
        if ('strong' === e.kind && !n && D(e.text) === l.label) {
            n = !0;
            continue;
        }
        'a' === e.kind ? i.push({
            name: e.text,
            href: e.href,
            gender: ''
        }) : i.length > 0 && !i[i.length - 1].gender && (i[i.length - 1].gender = e.text);
    }
    let o = i.some((e)=>e.gender.includes('♀') || e.gender.includes('♂'));
    return i.filter((e)=>e.name && (!o || e.gender.includes('♀')));
}
loadHome = (e)=>t(function*() {
        yield m(e);
        let t = e.genreId || e.peopleId || '';
        return t ? x(a(g, t), '分类/演员列表') : x(`${g}/`, '首页最新');
    })(), loadTop250 = (e)=>t(function*() {
        var t;
        yield m(e);
        let l = (null != (t = e.ranking_type) ? t : '').trim();
        return l && 'all' !== l && console.log(`${r} Top250 ranking_type=${l}：年份筛选形式无公开出处，按全部年份处理`), x(`${g}/rankings/top`, 'Top250');
    })(), loadPlayback = (e)=>t(function*() {
        yield m(e);
        let t = C(e.period);
        if ('monthly' !== t) return x(`${g}/rankings/playback`, `热播榜(${t})`);
        let l = yield x(`${g}/rankings/playback?p=monthly`, '热播榜(monthly)');
        return l.length > 0 ? l : (console.log(`${r} 热播榜(monthly) ?p=monthly 无结果，回退裸路径 /rankings/playback`), x(`${g}/rankings/playback`, '热播榜(monthly回退)'));
    })(), loadCensored = (e)=>t(function*() {
        return w(e, 'censored', '有码榜');
    })(), loadUncensored = (e)=>t(function*() {
        return w(e, 'uncensored', '无码榜');
    })(), loadWestern = (e)=>t(function*() {
        return w(e, 'western', '欧美榜');
    })(), loadFC2 = (e)=>t(function*() {
        yield m(e);
        let t = C(e.period);
        return x(`${g}/rankings/movies?${u({
            p: t,
            t: 'fc2'
        })}`, `FC2榜(${t})`);
    })(), searchVideos = (e)=>t(function*() {
        var t, l, n;
        yield m(e);
        let i = (null != (t = null != (l = null != (n = e.keyword) ? n : e.title) ? l : e.query) ? t : '').trim();
        return i ? x(`${g}/search?${u({
            q: i,
            f: 'all'
        })}`, `搜索「${i}」`) : (console.log(`${r} 搜索关键词为空`), []);
    })(), loadDetail = (e, l)=>t(function*() {
        let t;
        if (!e) return null;
        yield m(l);
        let n = yield y(l);
        try {
            t = yield k(e, n);
        } catch (e) {
            return console.log(`${r} JavDB 详情获取失败: ${o(e)}`), null;
        }
        try {
            var i, u, s, d, f, g, h, v, $;
            let l, o, m, y = yield Widget.html.load(t), k = S(y), b = null, _ = A(k, [
                '番號',
                '番号'
            ]);
            if (_ && (b = c(_.valueText)), !b) {
                let e = y('nav.panel.movie-panel-info div span').first().text();
                b = c(e);
            }
            b || (b = p(y('title').first().text()));
            let x = y('h2 strong.current-title').first().text().trim(), C = y('h2 span.origin-title').first().text().trim(), w = null != (i = y('meta[property="og:title"]').attr('content')) ? i : '', D = x || w || b || e, q = null != (u = y('img.video-cover').first().attr('src')) ? u : '';
            q || (q = null != (s = y('meta[property="og:image"]').attr('content')) ? s : ''), q = a(e, q);
            let P = A(k, [
                '日期'
            ]), T = P ? null == (h = /(\d{4}-\d{2}-\d{2})/.exec(P.valueText)) ? void 0 : h[1] : void 0, J = A(k, [
                '時長',
                '时长'
            ]);
            if (J) {
                o = J.valueText;
                let e = /(\d+)\s*分/.exec(J.valueText);
                e && (l = 60 * Number(e[1]));
            }
            let O = y('.score-stars').first();
            if (O.length > 0) {
                let e = (O.parent().text() || '').replace(/\s+/g, ' ');
                m = null == (v = /(\d+(?:\.\d+)?)\s*分/.exec(e)) ? void 0 : v[1];
            }
            if (!m) {
                let e = A(k, [
                    '評分',
                    '评分'
                ]);
                e && (m = null == ($ = /(\d+(?:\.\d+)?)/.exec(e.valueText)) ? void 0 : $[1]);
            }
            let B = [], W = A(k, [
                '類別',
                '类别'
            ]);
            W && W.$row.find('a').each((e, t)=>{
                var l;
                let r = y(t), n = null != (l = r.attr('href')) ? l : '', i = r.text().trim();
                i && B.push({
                    id: n || i,
                    title: i
                });
            });
            let I = j(y, k).map((e)=>({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                })), z = new Set();
            y('a[href^="magnet:"]').each((e, t)=>{
                var l;
                let r = (null != (l = y(t).attr('href')) ? l : '').replace(/\[javdb\.com\]$/i, '');
                r && z.add(r);
            });
            let U = [
                ...z
            ], N = [];
            y('a.tile-item[data-fancybox="gallery"]').each((t, l)=>{
                let r = a(e, y(l).attr('href'));
                r && N.push(r);
            });
            let E = null != (d = y('video#preview-video source').first().attr('src')) ? d : '';
            E.startsWith('//') && (E = `https:${E}`);
            let R = [];
            b && R.push(`番号：${b}`), C && C !== D && R.push(`原标题：${C}`);
            let M = A(k, [
                '片商',
                '賣家',
                '卖家'
            ]);
            (null == M ? void 0 : M.valueText) && R.push(`片商：${M.valueText}`);
            let V = A(k, [
                '發行',
                '发行'
            ]);
            (null == V ? void 0 : V.valueText) && R.push(`发行：${V.valueText}`);
            let L = A(k, [
                '系列'
            ]);
            (null == L ? void 0 : L.valueText) && R.push(`系列：${L.valueText}`);
            let H = A(k, [
                '導演',
                '导演'
            ]);
            if ((null == H ? void 0 : H.valueText) && R.push(`导演：${H.valueText}`), U.length > 0) for (let e of (R.push(`磁力链接：共 ${U.length} 条`), U.slice(0, 3)))R.push(e);
            else n ? R.push('磁力链接：未获取（已带 JavDB Cookie，仍无磁力——该条目可能无磁力，或 Cookie 已失效）') : R.push('磁力链接：未获取（JavDB 仅对登录用户展示磁力，请在全局参数填写「JavDB Cookie」）');
            let G = {
                id: null != b ? b : e,
                type: 'detail',
                title: D,
                link: e,
                posterPath: q || void 0,
                detailPoster: q || void 0,
                coverUrl: q || void 0,
                backdropPath: null != (f = null != (g = N[0]) ? g : q) ? f : void 0,
                backdropPaths: N.length > 0 ? N : void 0,
                releaseDate: T,
                rating: m,
                duration: l,
                durationText: o,
                genreTitle: B.map((e)=>e.title).join(' · ') || void 0,
                genreItems: B.length > 0 ? B : void 0,
                peoples: I.length > 0 ? I : void 0,
                previewUrl: E || void 0,
                trailers: E ? [
                    {
                        url: E,
                        coverUrl: q || void 0
                    }
                ] : void 0,
                description: R.join('\n'),
                mediaType: 'movie'
            };
            if (b && I.length > 0) try {
                yield Widget.storage.set(F(b), I[0].title);
            } catch (e) {}
            return console.log(`${r} JavDB 详情完成：${null != b ? b : '(番号未知)'}，演员 ${I.length}，类别 ${B.length}，磁力 ${U.length}`), G;
        } catch (e) {
            return console.log(`${r} JavDB 详情解析失败: ${o(e)}`), null;
        }
    })();
let q = 'https://drive-h.quark.cn/1/clouddrive', P = 'https://drive-pc.quark.cn/1/clouddrive', T = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch', J = 'https://pan.quark.cn', O = 'quark_cookie_dyn', B = 'quark_cookie_base_fp';
function W(e) {
    let t = 5381;
    for(let l = 0; l < e.length; l++)t = (t << 5) + t + e.charCodeAt(l) | 0;
    return `${e.length}:${(t >>> 0).toString(16)}`;
}
let I = new Set([
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
function z(e, r, n, i, o, a, s) {
    return t(function*() {
        var c, f;
        let p, g = yield t(function*() {
            var t;
            let l = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!l) return '';
            try {
                if ((yield Widget.storage.get(B)) === W(l)) {
                    let e = yield Widget.storage.get(O);
                    if ('string' == typeof e && e.trim()) return e;
                }
            } catch (e) {}
            return l;
        })();
        if (!g) throw Error('未填写夸克网盘 Cookie（模块全局参数 quarkCookie）');
        let h = u(l({
            pr: 'ucpro',
            fr: 'pc'
        }, o)), m = `${r}${i}?${h}`, y = {
            Cookie: g,
            Accept: 'application/json, text/plain, */*',
            Referer: null != s ? s : J,
            'User-Agent': T
        };
        p = 'GET' === n ? yield Widget.http.get(m, {
            headers: y
        }) : yield Widget.http.post(m, null != a ? a : {}, {
            headers: y
        }), yield (c = null == p ? void 0 : p.headers, t(function*() {
            try {
                var t, l;
                let r = (null != (t = e.quarkCookie) ? t : '').trim();
                if (!r || !c) return;
                let n = null != (l = c['set-cookie']) ? l : c['Set-Cookie'];
                if (!n) return;
                Array.isArray(n) || (n = [
                    n
                ]);
                let i = g, o = !1;
                for (let e of n){
                    let t = String(e).split(';')[0], l = t.indexOf('=');
                    if (l <= 0) continue;
                    let r = t.slice(0, l).trim();
                    ('__puus' === r || '__pus' === r) && (i = function(e, t, l) {
                        let r = e.split(';').map((e)=>e.trim()).filter(Boolean), n = !1, i = r.map((e)=>{
                            let r = e.indexOf('=');
                            return r > 0 && e.slice(0, r) === t ? (n = !0, `${t}=${l}`) : e;
                        });
                        return n || i.push(`${t}=${l}`), i.join('; ');
                    }(i, r, t.slice(l + 1).trim()), o = !0);
                }
                o && (yield Widget.storage.set(O, i), yield Widget.storage.set(B, W(r)));
            } catch (e) {}
        })());
        let v = 'number' == typeof (null == p ? void 0 : p.statusCode) ? p.statusCode : 200;
        if (v >= 400) throw Error(`HTTP ${v}: 夸克接口 ${i}`);
        let $ = d(null == p ? void 0 : p.data);
        if (!$) throw Error(`夸克接口 ${i} 返回了无法解析的内容`);
        if ('number' == typeof $.status && $.status >= 400 || void 0 !== $.code && 0 !== $.code) throw Error(`夸克接口 ${i} 出错: ${null != (f = $.message) ? f : `code=${$.code}`}`);
        return {
            json: $,
            cookieSent: g
        };
    })();
}
function U(e, l, r, n, i) {
    return t(function*() {
        return z(e, 'https://drive.quark.cn/1/clouddrive', l, r, n, i);
    })();
}
function N(e, l) {
    return t(function*() {
        let t = [], r = 1;
        for(; r <= 20; r++){
            var n, i, o, a;
            let { json: u } = yield U(e, 'GET', '/file/sort', {
                pdir_fid: l,
                _page: String(r),
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
function E(e) {
    let t = e.lastIndexOf('.');
    return !(t < 0) && I.has(e.slice(t + 1).toLowerCase());
}
function R(e) {
    return e.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
let M = {
    '4k': 6,
    '2k': 5,
    super: 4,
    high: 3,
    normal: 2,
    low: 1
};
function V(e, l, r) {
    return t(function*() {
        yield U(e, 'POST', '/file/rename', {}, {
            fid: l,
            file_name: r
        });
    })();
}
function F(e) {
    return 'avdb_actress_' + e.toUpperCase();
}
function L(e) {
    return e.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60);
}
function H(e, l, n, a) {
    return t(function*() {
        var u, s, d, c, p;
        let g = [];
        if (n && (null != (u = e.quarkAutoRename) ? u : 'on') !== 'off') {
            let u = yield t(function*() {
                try {
                    let e = yield Widget.storage.get(F(n));
                    if ('string' == typeof e && e.trim()) return e.trim();
                } catch (e) {}
                if (!a || !/^https?:\/\//.test(a) || !a.includes('javdb')) return '';
                try {
                    var t, l;
                    let r = yield y(e), i = yield k(a, r), o = yield Widget.html.load(i), u = j(o, S(o)), s = L(null != (t = null == (l = u[0]) ? void 0 : l.name) ? t : '');
                    if (s) {
                        try {
                            yield Widget.storage.set(F(n), s);
                        } catch (e) {}
                        return s;
                    }
                } catch (e) {
                    console.log(`${r} 女优名获取失败（${n}）: ${o(e)}`);
                }
                return '';
            })();
            yield t(function*() {
                var a, s, d, c;
                let p = null != (a = null == (d = /\.([A-Za-z0-9]{2,5})$/.exec(l.name)) ? void 0 : d[1]) ? a : 'mp4', g = `${n}.${p}`;
                if (l.name !== g) try {
                    yield V(e, l.fid, g), console.log(`${r} 夸克自动改名：${l.name} → ${g}`), l.name = g;
                } catch (e) {
                    console.log(`${r} 夸克文件改名失败（${l.name}）: ${o(e)}`);
                }
                let h = L(u);
                if (h) {
                    try {
                        let n = yield t(function*() {
                            let t = (yield N(e, '0')).find((e)=>e.isDir && e.name === h);
                            if (t) return t.fid;
                            try {
                                yield U(e, 'POST', '/file', {}, {
                                    dir_init_lock: !1,
                                    dir_path: '',
                                    file_name: h,
                                    pdir_fid: '0'
                                });
                            } catch (e) {
                                console.log(`${r} 创建文件夹「${h}」失败（可能已有同名）: ${o(e)}`);
                            }
                            for(let t = 0; t < 3; t++){
                                var l, n;
                                let t = null != (l = null == (n = (yield N(e, '0')).find((e)=>e.isDir && e.name === h)) ? void 0 : n.fid) ? l : '';
                                if (t) return t;
                                yield i(800);
                            }
                            return '';
                        })();
                        n && l.parentFid !== n && (yield (c = l.fid, t(function*() {
                            yield U(e, 'POST', '/file/move', {}, {
                                action_type: 1,
                                exclude_fids: [],
                                filelist: [
                                    c
                                ],
                                to_pdir_fid: n
                            });
                        })()), console.log(`${r} 夸克归类：${l.name} → 文件夹「${h}」`), l.parentFid = n);
                    } catch (e) {
                        console.log(`${r} 夸克按女优归类失败（${l.name}）: ${o(e)}`);
                    }
                    return;
                }
                let m = l.parentFid;
                if (m && '0' !== m && l.parentName && l.parentName !== n && (null != (s = l.parentVideoCount) ? s : 1) <= 1 && R(l.parentName).includes(f(n))) try {
                    yield V(e, m, n), console.log(`${r} 夸克自动改名（文件夹）：${l.parentName} → ${n}`);
                } catch (e) {
                    console.log(`${r} 夸克文件夹改名失败（${l.parentName}）: ${o(e)}`);
                }
            })();
        }
        let h = '';
        try {
            let { json: t } = yield U(e, 'POST', '/file/v2/play/project', {}, {
                fid: l.fid,
                resolutions: 'low,normal,high,super,2k,4k',
                supports: 'fmp4_av,m3u8,dolby_vision'
            }), r = (Array.isArray(null == t || null == (s = t.data) ? void 0 : s.video_list) ? t.data.video_list : []).filter((e)=>{
                var t;
                return null == e || null == (t = e.video_info) ? void 0 : t.url;
            });
            if (r.length > 0) for (let e of r.sort((e, t)=>{
                var l, r, n, i;
                return (null != (l = M[String(null != (r = null == t ? void 0 : t.resolution) ? r : '').toLowerCase()]) ? l : 0) - (null != (n = M[String(null != (i = null == e ? void 0 : e.resolution) ? i : '').toLowerCase()]) ? n : 0);
            }).slice(0, 3))g.push({
                name: `夸克转码 ${String(null != (d = e.resolution) ? d : '').toUpperCase()}`,
                description: l.name,
                url: String(e.video_info.url)
            });
            else h = '转码已关闭（夸克接口变更）';
        } catch (e) {
            h = '转码已关闭（夸克接口变更）';
        }
        try {
            let { json: t, cookieSent: r } = yield U(e, 'POST', '/file/download', {}, {
                fids: [
                    l.fid
                ]
            }), n = null == t || null == (p = t.data) || null == (c = p[0]) ? void 0 : c.download_url;
            n && g.push({
                name: '夸克原画',
                description: [
                    l.name,
                    function(e) {
                        if (!e) return '';
                        let t = e / 1073741824;
                        return t >= 1 ? `${t.toFixed(2)} GB` : `${(e / 1048576).toFixed(1)} MB`;
                    }(l.size),
                    h
                ].filter(Boolean).join(' · '),
                url: String(n),
                customHeaders: {
                    Cookie: r,
                    Referer: J,
                    'User-Agent': T
                }
            });
        } catch (e) {
            console.log(`${r} 夸克原画链接获取失败（${l.name}）: ${o(e)}`);
        }
        return g;
    })();
}
let G = 'quark_avdb_folder_fid';
function Z(e, l, r, n) {
    return t(function*() {
        let t = [];
        for(let u = 1; u <= 4; u++){
            var i, o, a;
            let { json: s } = yield z(e, q, 'GET', '/share/sharepage/detail', {
                pwd_id: l.pwdId,
                stoken: r,
                pdir_fid: n,
                force: '0',
                _page: String(u),
                _size: '50',
                _fetch_banner: '1',
                _fetch_share: '1',
                _fetch_total: '1',
                _sort: 'file_type:asc,file_name:asc'
            }, void 0, `https://pan.quark.cn/s/${l.pwdId}`), d = Array.isArray(null == s || null == (i = s.data) ? void 0 : i.list) ? s.data.list : [];
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
let K = 'https://jable.tv', Q = 'https://memojav.org';
loadResource = (e)=>t(function*() {
        var c, g, h, y, $, k;
        let b, _;
        console.log(`${r} loadResource 被调用（id=${null != (c = e.id) ? c : ''}，title=${null != (g = e.title) ? g : ''}，link=${null != (h = e.link) ? h : ''}）`);
        let x = {
            quark: '',
            share: '',
            jable: '',
            memo: ''
        }, C = p(e.id, e.title, e.seriesName, e.link);
        if (!C) return console.log(`${r} loadResource 未能从参数中提取番号（id=${null != (y = e.id) ? y : ''}，title=${null != ($ = e.title) ? $ : ''}），返回空`), [
            {
                name: '诊断·番号：未能识别',
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != (k = e.link) ? k : 'https://javdb.com'
            }
        ];
        yield m(e);
        let w = 'external-first' === e.sourcePriority, D = [], S = [], A = ()=>t(function*() {
                var a;
                try {
                    if (!(null != (a = e.quarkCookie) ? a : '').trim()) {
                        console.log(`${r} 未填写夸克 Cookie，跳过夸克网盘源`), x.quark = '未填Cookie';
                        return;
                    }
                    let n = yield t(function*() {
                        var t, n, i, a;
                        let u = new Set([
                            f(C)
                        ]), s = /FC2-PPV-(\d+)/.exec(C);
                        s && u.add(`FC2${s[1]}`);
                        let d = [
                            '0'
                        ], c = [], p = new Map(), g = new Map(), h = 0, m = 0;
                        for(; d.length > 0 && h < 60 && m < 4000;){
                            let i, a = d.shift();
                            h++;
                            try {
                                i = yield N(e, a);
                            } catch (e) {
                                console.log(`${r} 夸克目录 ${a} 列取失败，跳过: ${o(e)}`);
                                continue;
                            }
                            for (let e of i){
                                if (m++, e.isDir) {
                                    p.set(e.fid, e.name), d.push(e.fid);
                                    continue;
                                }
                                if (1 !== e.category && !E(e.name)) continue;
                                g.set(a, (null != (t = g.get(a)) ? t : 0) + 1);
                                let r = R(e.name);
                                for (let t of u)if (t && r.includes(t)) {
                                    c.push(function(e, t) {
                                        return t = null != t ? t : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : (function(e) {
                                            var t = Object.keys(e);
                                            if (Object.getOwnPropertySymbols) {
                                                var l = Object.getOwnPropertySymbols(e);
                                                t.push.apply(t, l);
                                            }
                                            return t;
                                        })(Object(t)).forEach(function(l) {
                                            Object.defineProperty(e, l, Object.getOwnPropertyDescriptor(t, l));
                                        }), e;
                                    }(l({}, e), {
                                        parentFid: a,
                                        parentName: null != (n = p.get(a)) ? n : ''
                                    }));
                                    break;
                                }
                            }
                        }
                        for (let e of c)e.parentVideoCount = null != (i = g.get(null != (a = e.parentFid) ? a : '')) ? i : 1;
                        return d.length > 0 && console.log(`${r} 夸克搜索达到遍历上限（已走 ${h} 个目录、扫描 ${m} 项），结果可能不完整`), c.sort((e, t)=>{
                            let l = +(1 !== e.category), r = +(1 !== t.category);
                            return l !== r ? l - r : t.size - e.size;
                        }), c;
                    })();
                    if (n.length > 0) {
                        console.log(`${r} 夸克命中 ${n.length} 个文件，解析最优文件：${n[0].name}`), D.push(...yield H(e, n[0], C, e.link)), 0 === D.length && (x.quark = '命中但解析失败');
                        return;
                    }
                    console.log(`${r} 夸克网盘中未找到与 ${C} 匹配的视频文件，尝试分享转存`), x.quark = '网盘未搜到';
                } catch (e) {
                    console.log(`${r} 夸克源失败，已降级: ${o(e)}`), x.quark = '出错';
                    return;
                }
                try {
                    D.push(...yield t(function*() {
                        let l;
                        if ('off' === e.shareIndexEnabled) return console.log(`${r} 分享索引搜索已关闭，跳过转存`), [];
                        try {
                            l = yield t(function*() {
                                var t, l, r, i, o;
                                let a = (null != (t = e.shareIndexBase) ? t : '').trim().replace(/\/+$/, '') || 'https://pansou.app', s = `${a}/api/search?${u({
                                    kw: C,
                                    res: 'all',
                                    src: 'all'
                                })}`, c = yield Widget.http.get(s, {
                                    headers: {
                                        'User-Agent': n,
                                        Accept: 'application/json, */*'
                                    }
                                }), p = 'number' == typeof (null == c ? void 0 : c.statusCode) ? c.statusCode : 200;
                                if (p >= 400) throw Error(`HTTP ${p}: 分享索引 ${a}`);
                                let g = d(null == c ? void 0 : c.data);
                                if (!g) throw Error(`分享索引 ${a} 返回了无法解析的内容`);
                                if ('number' == typeof g.code && 0 !== g.code) throw Error(`分享索引出错: ${null != (i = g.message) ? i : `code=${g.code}`}`);
                                let h = null != (l = g.data) ? l : g, m = f(C), y = new Map(), v = (e, t, l)=>{
                                    if (y.size >= 12) return;
                                    let r = String(null != e ? e : '');
                                    if (!r.includes('quark')) return;
                                    let n = function(e) {
                                        var t, l;
                                        if (!e) return null;
                                        let r = /\/s\/([A-Za-z0-9_-]{4,})/.exec(e);
                                        if (!r) return null;
                                        let n = null != (t = null == (l = /[?&]pwd=([A-Za-z0-9]+)/.exec(e)) ? void 0 : l[1]) ? t : '';
                                        return {
                                            pwdId: r[1],
                                            passcode: n
                                        };
                                    }(r);
                                    if (!n) return;
                                    let i = String(null != l ? l : '').trim(), o = +!R(i).includes(m), a = y.get(n.pwdId);
                                    a && a.tier <= o || y.set(n.pwdId, {
                                        url: r,
                                        pwdId: n.pwdId,
                                        passcode: String(null != t ? t : '') || n.passcode,
                                        title: i,
                                        tier: o
                                    });
                                }, $ = null == h || null == (r = h.merged_by_type) ? void 0 : r.quark;
                                if (Array.isArray($)) for (let e of $)v(null == e ? void 0 : e.url, null == e ? void 0 : e.password, null != (o = null == e ? void 0 : e.note) ? o : '');
                                let k = null == h ? void 0 : h.results;
                                if (Array.isArray(k)) {
                                    let e = 0;
                                    for (let t of k){
                                        if (e++ >= 300 || y.size >= 12) break;
                                        for (let e of Array.isArray(null == t ? void 0 : t.links) ? t.links : [])null != e && e.type && 'quark' !== e.type || v(null == e ? void 0 : e.url, null == e ? void 0 : e.password, (null == e ? void 0 : e.work_title) || (null == t ? void 0 : t.title) || '');
                                    }
                                }
                                return [
                                    ...y.values()
                                ].sort((e, t)=>e.tier - t.tier);
                            })();
                        } catch (e) {
                            return console.log(`${r} 分享索引搜索失败，已跳过转存: ${o(e)}`), [];
                        }
                        if (0 === l.length) return console.log(`${r} 分享索引未找到 ${C} 的夸克分享`), [];
                        console.log(`${r} 分享索引找到 ${l.length} 个 ${C} 的夸克分享候选`);
                        let a = yield t(function*() {
                            var t, l, n, a, u;
                            let s = (null != (t = e.quarkSaveFid) ? t : '').trim();
                            if (s) return s;
                            try {
                                let e = yield Widget.storage.get(G);
                                if ('string' == typeof e && e) return e;
                            } catch (e) {}
                            try {
                                let t = (yield N(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name);
                                if (t) {
                                    try {
                                        yield Widget.storage.set(G, t.fid);
                                    } catch (e) {}
                                    return t.fid;
                                }
                                let s = '';
                                try {
                                    let { json: t } = yield U(e, 'POST', '/file', {}, {
                                        dir_init_lock: !1,
                                        dir_path: '',
                                        file_name: 'AVDB',
                                        pdir_fid: '0'
                                    });
                                    s = String(null != (l = null == t || null == (n = t.data) ? void 0 : n.fid) ? l : '');
                                } catch (e) {
                                    console.log(`${r} 创建 AVDB 文件夹失败（可能已有同名）: ${o(e)}`);
                                }
                                for(let t = 0; t < 3 && !s; t++)yield i(1000), s = null != (a = null == (u = (yield N(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name)) ? void 0 : u.fid) ? a : '';
                                if (s) {
                                    try {
                                        yield Widget.storage.set(G, s);
                                    } catch (e) {}
                                    return console.log(`${r} 转存目标：网盘根目录下的 AVDB 文件夹`), s;
                                }
                            } catch (e) {
                                console.log(`${r} 解析转存目标目录失败: ${o(e)}`);
                            }
                            return console.log(`${r} 转存目标文件夹 AVDB 不可用，改存网盘根目录`), '0';
                        })(), s = Math.min(3, l.length);
                        for(let n = 0; n < s; n++){
                            let u = l[n];
                            try {
                                let l = yield function(e, l) {
                                    return t(function*() {
                                        var t;
                                        let r = Date.now(), { json: n } = yield z(e, q, 'POST', '/share/sharepage/token', {
                                            __dt: String(r % 1000),
                                            __t: String(r)
                                        }, {
                                            pwd_id: l.pwdId,
                                            passcode: l.passcode
                                        }, `https://pan.quark.cn/s/${l.pwdId}`), i = null == n || null == (t = n.data) ? void 0 : t.stoken;
                                        if (!i) throw Error('分享 token 接口未返回 stoken（分享可能已失效或需要提取码）');
                                        return String(i);
                                    })();
                                }(e, u), s = yield function(e, l, n, i) {
                                    return t(function*() {
                                        let t = yield Z(e, l, n, '0'), a = t.filter((e)=>!e.isDir);
                                        for (let i of t.filter((e)=>e.isDir).slice(0, 10))try {
                                            let t = yield Z(e, l, n, i.fid);
                                            a.push(...t.filter((e)=>!e.isDir));
                                        } catch (e) {
                                            console.log(`${r} 分享子目录 ${i.name} 列取失败，跳过: ${o(e)}`);
                                        }
                                        let u = a.filter((e)=>1 === e.category || E(e.name)), s = f(i), d = u.filter((e)=>R(e.name).includes(s));
                                        return (d.length > 0 ? d : [
                                            ...u
                                        ].sort((e, t)=>t.size - e.size).slice(0, 3)).slice(0, 10);
                                    })();
                                }(e, u, l, C);
                                if (0 === s.length) {
                                    console.log(`${r} 分享候选 ${n + 1}（${u.title || u.pwdId}）内无视频文件，尝试下一个`);
                                    continue;
                                }
                                console.log(`${r} 转存候选 ${n + 1}：${u.title || u.url} → ${s.length} 个文件`);
                                let d = yield function(e, l, n, a, u) {
                                    return t(function*() {
                                        var t, s, d;
                                        let c = Date.now(), { json: f } = yield z(e, P, 'POST', '/share/sharepage/save', {
                                            __dt: String(c % 1000),
                                            __t: String(c)
                                        }, {
                                            fid_list: a.map((e)=>e.fid),
                                            fid_token_list: a.map((e)=>e.token),
                                            pdir_fid: '0',
                                            pwd_id: l.pwdId,
                                            scene: 'link',
                                            stoken: n,
                                            to_pdir_fid: u
                                        }), p = null != (t = null == f ? void 0 : f.data) ? t : {};
                                        if (!0 === p.task_sync) return 'done';
                                        let g = p.task_id ? String(p.task_id) : '';
                                        if (!g) return 'done';
                                        let h = Date.now();
                                        for(let t = 1; t <= 20 && !(Date.now() - h > 55000); t++){
                                            let l = 3000;
                                            try {
                                                let { json: r } = yield z(e, P, 'GET', '/task', {
                                                    uc_param_str: '',
                                                    task_id: g,
                                                    retry_index: String(t)
                                                }), n = null == r || null == (s = r.data) ? void 0 : s.status;
                                                if (2 === n) return 'done';
                                                if (3 === n) return 'failed';
                                                let i = null == r || null == (d = r.metadata) ? void 0 : d.tq_gap;
                                                'number' == typeof i && i > 0 && (l = Math.min(5000, Math.max(1500, i)));
                                            } catch (e) {
                                                console.log(`${r} 转存任务查询出错（第 ${t} 次），继续等待: ${o(e)}`);
                                            }
                                            t < 20 && (yield i(l));
                                        }
                                        return 'pending';
                                    })();
                                }(e, u, l, s, a);
                                if ('failed' === d) {
                                    console.log(`${r} 分享候选 ${n + 1} 转存任务失败，尝试下一个`);
                                    continue;
                                }
                                if ('pending' === d) return console.log(`${r} 转存任务仍在进行中（${C}）：本次先用其他源播放，文件落盘后下次打开将直接命中网盘`), [];
                                let c = yield function(e, l, n, a) {
                                    return t(function*() {
                                        let t = new Set(n.map((e)=>R(e))), u = f(a), s = (e)=>{
                                            let l = e.filter((e)=>!e.isDir && (1 === e.category || E(e.name))), r = l.filter((e)=>t.has(R(e.name))), n = r.length > 0 ? r : l.filter((e)=>R(e.name).includes(u));
                                            return 0 === n.length ? null : (n.sort((e, t)=>t.size - e.size), n[0]);
                                        };
                                        for(let t = 0; t < 3; t++){
                                            t > 0 && (yield i(1500));
                                            try {
                                                let t = yield N(e, l), r = s(t);
                                                if (r) return r;
                                                for (let l of t.filter((e)=>e.isDir).slice(0, 10)){
                                                    let t = yield N(e, l.fid), r = s(t);
                                                    if (r) return r;
                                                }
                                            } catch (e) {
                                                console.log(`${r} 转存后定位文件失败（第 ${t + 1} 次）: ${o(e)}`);
                                            }
                                        }
                                        return null;
                                    })();
                                }(e, a, s.map((e)=>e.name), C);
                                if (!c) return console.log(`${r} 转存已完成但暂未在网盘定位到文件（${C}），下次打开应可直接命中`), [];
                                return console.log(`${r} 转存完成并定位到文件：${c.name}`), yield H(e, c, C);
                            } catch (e) {
                                console.log(`${r} 分享候选 ${n + 1} 转存失败，尝试下一个: ${o(e)}`);
                            }
                        }
                        return console.log(`${r} 分享转存全部候选失败（${C}）`), [];
                    })()), 0 === D.length && (x.share = 'off' === e.shareIndexEnabled ? '未开启' : '索引无此片');
                } catch (e) {
                    console.log(`${r} 分享转存失败，已降级: ${o(e)}`), x.share = '出错';
                }
            })(), j = ()=>t(function*() {
                try {
                    let e = yield t(function*() {
                        var e;
                        let t, { sig: l, sts: i } = function() {
                            let e = function(e) {
                                let t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', l = '';
                                for(let r = 0; r < e.length; r += 3){
                                    let n = e.charCodeAt(r), i = r + 1 < e.length, o = r + 2 < e.length, a = i ? e.charCodeAt(r + 1) : 0, u = o ? e.charCodeAt(r + 2) : 0;
                                    l += t[n >> 2], l += t[(3 & n) << 4 | a >> 4], l += i ? t[(15 & a) << 2 | u >> 6] : '=', l += o ? t[63 & u] : '=';
                                }
                                return l;
                            }(String(Date.now())), t = e.substr(e.length - 12, 10), l = 1;
                            for(let e = 0; e < 10; e++)l += t.charCodeAt(e) * e * 1743;
                            return {
                                sig: t,
                                sts: l
                            };
                        }(), o = `${Q}/hls/get_video_info.php?id=${encodeURIComponent(C)}&sig=${l}&sts=${i}`, a = yield s(o, {
                            'User-Agent': n,
                            Accept: 'application/json,text/plain,*/*',
                            Referer: `${Q}/embed/${encodeURIComponent(C)}`
                        }), u = a.includes('for (;;);') ? a.split('for (;;);')[1] : a;
                        try {
                            t = JSON.parse(u);
                        } catch (e) {
                            return console.log(`${r} MemoJav 接口返回无法解析: ${a.slice(0, 120)}`), [];
                        }
                        if (!t.success || !t.url) return console.log(`${r} MemoJav 无 ${C}${t.reason ? `（${t.reason}）` : ''}`), [];
                        let d = decodeURIComponent(t.url);
                        return 'mp4' === t.type && (d += '=m37'), console.log(`${r} MemoJav 命中 ${C}（${null != (e = t.type) ? e : 'hls'}）`), [
                            {
                                name: 'MemoJav',
                                description: `${Q}/video/${C}`,
                                url: d
                            }
                        ];
                    })();
                    S.push(...e), 0 === e.length && (x.memo = '无此片');
                } catch (e) {
                    console.log(`${r} MemoJav 源失败，已降级: ${o(e)}`), x.memo = '出错';
                }
                try {
                    let e = yield t(function*() {
                        var e, t, l, i, o;
                        let u, d = C.toLowerCase(), c = d.replace(/-/g, ''), f = `${K}/search/${encodeURIComponent(d)}/`, p = yield s(f, {
                            'User-Agent': n,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: `${K}/`
                        });
                        if (v(p)) return console.log(`${r} Jable 搜索被 Cloudflare 验证页拦截`), [];
                        let g = new Set(), h = /href\s*=\s*["']((?:https:\/\/jable\.tv)?\/videos\/[\w-]+\/?)["']/gi;
                        for(; null !== (u = h.exec(p));)g.add(a(K, u[1]));
                        let m = [
                            ...g
                        ], y = null != (e = null != (t = m.find((e)=>e.toLowerCase().includes(d))) ? t : m.find((e)=>e.toLowerCase().replace(/-/g, '').includes(c))) ? e : m[0];
                        if (!y) return console.log(`${r} Jable 未找到 ${C} 的视频页`), [];
                        let $ = yield s(y, {
                            'User-Agent': n,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: f
                        });
                        if (v($)) return console.log(`${r} Jable 视频页被 Cloudflare 验证页拦截`), [];
                        let k = null != (l = null == (i = /var\s+hlsUrl\s*=\s*'([^']+)'/.exec($)) ? void 0 : i[1]) ? l : null == (o = /var\s+hlsUrl\s*=\s*"([^"]+)"/.exec($)) ? void 0 : o[1];
                        return k ? [
                            {
                                name: 'Jable',
                                description: y,
                                url: k,
                                customHeaders: {
                                    Referer: y,
                                    'User-Agent': n
                                }
                            }
                        ] : (console.log(`${r} Jable 视频页未解析到 hlsUrl: ${y}`), []);
                    })();
                    S.push(...e), 0 === e.length && (x.jable = '无结果或被拦');
                } catch (e) {
                    console.log(`${r} Jable 源失败，已降级: ${o(e)}`), x.jable = '出错';
                }
            })();
        w ? (yield j(), yield A()) : (yield A(), yield j());
        let T = w ? [
            ...S,
            ...D
        ] : [
            ...D,
            ...S
        ];
        return console.log(`${r} loadResource ${C}：共 ${T.length} 条播放线路`), T.length > 0 ? T : (b = (t)=>{
            var l;
            return {
                name: t,
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != (l = e.link) ? l : 'https://javdb.com'
            };
        }, _ = [], x.quark && _.push(b(`诊断·夸克：${x.quark}`)), x.share && _.push(b(`诊断·转存：${x.share}`)), x.jable && _.push(b(`诊断·Jable：${x.jable}`)), x.memo && _.push(b(`诊断·MemoJav：${x.memo}`)), _);
    })();
