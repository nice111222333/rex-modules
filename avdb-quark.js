function e(e, t, l, n, r, i, o) {
    try {
        var a = e[i](o), u = a.value;
    } catch (e) {
        l(e);
        return;
    }
    a.done ? t(u) : Promise.resolve(u).then(n, r);
}
function t(t) {
    return function() {
        var l = this, n = arguments;
        return new Promise(function(r, i) {
            var o = t.apply(l, n);
            function a(t) {
                e(o, r, i, a, u, "next", t);
            }
            function u(t) {
                e(o, r, i, a, u, "throw", t);
            }
            a(void 0);
        });
    };
}
function l(e) {
    for(var t = 1; t < arguments.length; t++){
        var l = null != arguments[t] ? arguments[t] : {}, n = Object.keys(l);
        "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(l).filter(function(e) {
            return Object.getOwnPropertyDescriptor(l, e).enumerable;
        }))), n.forEach(function(t) {
            var n;
            n = l[t], t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n;
        });
    }
    return e;
}
function n(e, t) {
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
}
WidgetMetadata = {
    id: 'v7777-avdb-quark',
    title: 'AVDB夸克版',
    description: "JavDB 浏览（最新/Top250/热播与分类榜单/搜索/详情）+ 夸克网盘播放：先按番号搜自己的网盘，未命中时自动搜分享索引并转存到网盘再播，另有 MemoJav / Jable 外部源兜底。使用前请在全局参数中填写自己的夸克网盘 Cookie；如需 JavDB 磁力，请填「JavDB Cookie」（从已登录的浏览器复制）。JavDB 本站对部分地区 IP 有限制，若列表为空请检查代理节点地区（建议非日本节点）。",
    author: 'v7777',
    site: 'https://javdb.com',
    version: "0.3.9",
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
let r = '[AVDB夸克版]', i = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
function o(e) {
    return new Promise((t)=>{
        'function' == typeof setTimeout ? setTimeout(t, e) : t();
    });
}
function a(e) {
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
function u(e, t) {
    if (!t) return '';
    let l = String(t).trim();
    if (!l) return '';
    if (/^https?:\/\//i.test(l)) return l;
    if (l.startsWith('//')) return `https:${l}`;
    let n = /^(https?:\/\/[^/]+)/i.exec(e), r = n ? n[1] : e.replace(/\/+$/, '');
    if (l.startsWith('/')) return r + l;
    let i = e.split(/[?#]/)[0];
    return i.slice(0, i.lastIndexOf('/') + 1) + l;
}
function s(e) {
    return Object.keys(e).map((t)=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join('&');
}
function d(e, l) {
    return t(function*() {
        let t = yield Widget.http.get(e, {
            headers: l
        }), n = 'number' == typeof (null == t ? void 0 : t.statusCode) ? t.statusCode : 200;
        if (n >= 400) throw Error(`HTTP ${n}: ${e}`);
        let r = null == t ? void 0 : t.data;
        return 'string' == typeof r ? r : null == r ? '' : String(r);
    })();
}
function c(e) {
    if (null == e) return null;
    if ('object' == typeof e) return e;
    if ('string' == typeof e) try {
        return JSON.parse(e);
    } catch (e) {}
    return null;
}
function f(e) {
    if (!e) return null;
    let t = String(e).toUpperCase().replace(/[^A-Z0-9-]/g, ''), l = /FC2(?:-PPV)?-?(\d{5,7})/.exec(t);
    if (l) return `FC2-PPV-${l[1]}`;
    let n = /([A-Z]{2,6})-?(\d{2,5})/.exec(t);
    return n ? `${n[1]}-${n[2]}` : null;
}
function p(e) {
    return e.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
function g(...e) {
    for (let t of e){
        if (!t) continue;
        let e = f(t);
        if (e) return e;
    }
    return null;
}
let h = 'https://javdb.com', m = 'javdb_cookie_mirror';
function y(e) {
    return t(function*() {
        try {
            if (!e || 'string' != typeof e.javdbCookie) return;
            let t = e.javdbCookie.trim();
            t ? yield Widget.storage.set(m, t) : yield Widget.storage.remove(m);
        } catch (e) {}
    })();
}
function v(e) {
    return t(function*() {
        if (e && 'string' == typeof e.javdbCookie && e.javdbCookie.trim()) return e.javdbCookie.trim();
        try {
            let e = yield Widget.storage.get(m);
            if ('string' == typeof e && e.trim()) return e.trim();
        } catch (e) {}
        return '';
    })();
}
function $(e) {
    return !!e && (/just a moment/i.test(e) || e.includes('challenges.cloudflare.com') || e.includes('_cf_chl') || /attention required/i.test(e) || e.includes('cf-browser-verification'));
}
class k extends Error {
    constructor(e){
        super(`JavDB 返回了 Cloudflare 验证页（出口 IP 被拦截）: ${e}`), this.name = 'JavdbChallengeError';
    }
}
function b(e, l) {
    return t(function*() {
        let t, n = yield d(e, (t = {
            'User-Agent': i,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${h}/`
        }, l && (t.Cookie = l), t));
        if ($(n)) throw new k(e);
        return n;
    })();
}
function _(e, l) {
    return t(function*() {
        let t = yield Widget.html.load(e), n = t('a.box');
        0 === n.length && (n = t('.movie-list a.box, .grid a.box'));
        let r = [], i = new Set();
        return n.each((e, n)=>{
            var o, a, s, d, c;
            let p = t(n), h = u(l, null != (o = p.attr('href')) ? o : '');
            if (!h || i.has(h)) return;
            i.add(h);
            let m = p.find('.video-title strong').first().text().trim(), y = (null != (a = p.attr('title')) ? a : '').trim(), v = p.find('.video-title').first().text().trim(), $ = null != (s = f(m)) ? s : g(y, v), k = y || v || $ || h, b = null != (d = null != (c = p.find('img').first().attr('src')) ? c : p.find('img').first().attr('data-src')) ? d : '';
            b = u(l, b);
            let _ = p.find('.score').first().text(), x = /(\d+(?:\.\d+)?)\s*分/.exec(_), C = p.find('.meta').first().text().trim(), w = /(\d{4}-\d{2}-\d{2})/.exec(C);
            r.push({
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
        }), r;
    })();
}
function x(e) {
    var t;
    let l = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(e), n = (null != (t = null == l ? void 0 : l[1]) ? t : '').replace(/\s+/g, ' ').trim().slice(0, 60) || '(无标题)', r = e.includes('/login') || e.includes('sign_in') || e.includes('登录');
    return `title=${n}, login标记=${r ? '有' : '无'}`;
}
function C(e, l) {
    return t(function*() {
        try {
            let t = yield b(e), n = yield _(t, e);
            if (console.log(`${r} JavDB ${l}：${n.length} 条`), n.length > 0) return n;
            let i = yield v();
            if (i) {
                console.log(`${r} JavDB ${l} 匿名解析为空，带 Cookie 重试`);
                try {
                    let t = yield b(e, i), n = yield _(t, e);
                    return console.log(`${r} JavDB ${l}(Cookie重试)：${n.length} 条`), 0 === n.length && console.log(`${r} JavDB ${l}未解析到条目：页面结构可能已变化，或该页需要登录/VIP（页面提示：${x(t)}）`), n;
                } catch (e) {
                    return console.log(`${r} JavDB ${l}(Cookie重试)失败，已降级为空: ${a(e)}`), [];
                }
            }
            return console.log(`${r} JavDB ${l}未解析到条目：页面结构可能已变化，或该页需要登录/VIP（页面提示：${x(t)}）`), n;
        } catch (e) {
            return console.log(`${r} JavDB ${l}失败，已降级为空: ${a(e)}`), [];
        }
    })();
}
function w(e) {
    let t = (null != e ? e : '').trim().toLowerCase();
    return 'weekly' === t || 'monthly' === t ? t : 'daily';
}
function D(e, l, n) {
    return t(function*() {
        yield y(e);
        let t = w(e.period);
        return C(`${h}/rankings/movies?${s({
            p: t,
            t: l
        })}`, `${n}(${t})`);
    })();
}
function S(e) {
    return e.replace(/[:：\s]/g, '');
}
function A(e) {
    let t = e('nav.panel.movie-panel-info').first(), l = [];
    if (0 === t.length) return l;
    let n = t.find('> div, .panel-block'), r = new Set();
    return n.each((t, n)=>{
        if (r.has(n)) return;
        r.add(n);
        let i = e(n), o = i.find('strong').first();
        if (0 === o.length) return;
        let a = S(o.text());
        if (!a) return;
        let u = i.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
        l.push({
            label: a,
            valueText: u,
            $row: i
        });
    }), l;
}
function j(e, t) {
    return e.find((e)=>t.includes(e.label));
}
function q(e, t) {
    let l = j(t, [
        '演員',
        '演员'
    ]);
    if (!l) return [];
    let n = [];
    l.$row.find('a, strong').each((t, l)=>{
        var r, i;
        let o = e(l), a = null != (r = l.tagName) ? r : '';
        'a' === a ? n.push({
            kind: 'a',
            text: o.text().trim(),
            href: null != (i = o.attr('href')) ? i : ''
        }) : 'strong' === a && n.push({
            kind: 'strong',
            text: o.text().trim(),
            href: ''
        });
    });
    let r = !1, i = [];
    for (let e of n){
        if ('strong' === e.kind && !r && S(e.text) === l.label) {
            r = !0;
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
        yield y(e);
        let t = e.genreId || e.peopleId || '';
        return t ? C(u(h, t), '分类/演员列表') : C(`${h}/`, '首页最新');
    })(), loadTop250 = (e)=>t(function*() {
        var t;
        yield y(e);
        let l = (null != (t = e.ranking_type) ? t : '').trim();
        return l && 'all' !== l && console.log(`${r} Top250 ranking_type=${l}：年份筛选形式无公开出处，按全部年份处理`), C(`${h}/rankings/top`, 'Top250');
    })(), loadPlayback = (e)=>t(function*() {
        yield y(e);
        let t = w(e.period);
        if ('monthly' !== t) return C(`${h}/rankings/playback`, `热播榜(${t})`);
        let l = yield C(`${h}/rankings/playback?p=monthly`, '热播榜(monthly)');
        return l.length > 0 ? l : (console.log(`${r} 热播榜(monthly) ?p=monthly 无结果，回退裸路径 /rankings/playback`), C(`${h}/rankings/playback`, '热播榜(monthly回退)'));
    })(), loadCensored = (e)=>t(function*() {
        return D(e, 'censored', '有码榜');
    })(), loadUncensored = (e)=>t(function*() {
        return D(e, 'uncensored', '无码榜');
    })(), loadWestern = (e)=>t(function*() {
        return D(e, 'western', '欧美榜');
    })(), loadFC2 = (e)=>t(function*() {
        yield y(e);
        let t = w(e.period);
        return C(`${h}/rankings/movies?${s({
            p: t,
            t: 'fc2'
        })}`, `FC2榜(${t})`);
    })(), searchVideos = (e)=>t(function*() {
        var t, l, n;
        yield y(e);
        let i = (null != (t = null != (l = null != (n = e.keyword) ? n : e.title) ? l : e.query) ? t : '').trim();
        return i ? C(`${h}/search?${s({
            q: i,
            f: 'all'
        })}`, `搜索「${i}」`) : (console.log(`${r} 搜索关键词为空`), []);
    })(), loadDetail = (e, l)=>t(function*() {
        let t;
        if (!e) return null;
        yield y(l);
        let n = yield v(l);
        try {
            t = yield b(e, n);
        } catch (e) {
            return console.log(`${r} JavDB 详情获取失败: ${a(e)}`), null;
        }
        try {
            var i, o, s, d, c, p, h, m, $;
            let l, a, y, v = yield Widget.html.load(t), k = A(v), b = null, _ = j(k, [
                '番號',
                '番号'
            ]);
            if (_ && (b = f(_.valueText)), !b) {
                let e = v('nav.panel.movie-panel-info div span').first().text();
                b = f(e);
            }
            b || (b = g(v('title').first().text()));
            let x = v('h2 strong.current-title').first().text().trim(), C = v('h2 span.origin-title').first().text().trim(), w = null != (i = v('meta[property="og:title"]').attr('content')) ? i : '', D = x || w || b || e, S = null != (o = v('img.video-cover').first().attr('src')) ? o : '';
            S || (S = null != (s = v('meta[property="og:image"]').attr('content')) ? s : ''), S = u(e, S);
            let P = j(k, [
                '日期'
            ]), T = P ? null == (h = /(\d{4}-\d{2}-\d{2})/.exec(P.valueText)) ? void 0 : h[1] : void 0, J = j(k, [
                '時長',
                '时长'
            ]);
            if (J) {
                a = J.valueText;
                let e = /(\d+)\s*分/.exec(J.valueText);
                e && (l = 60 * Number(e[1]));
            }
            let O = v('.score-stars').first();
            if (O.length > 0) {
                let e = (O.parent().text() || '').replace(/\s+/g, ' ');
                y = null == (m = /(\d+(?:\.\d+)?)\s*分/.exec(e)) ? void 0 : m[1];
            }
            if (!y) {
                let e = j(k, [
                    '評分',
                    '评分'
                ]);
                e && (y = null == ($ = /(\d+(?:\.\d+)?)/.exec(e.valueText)) ? void 0 : $[1]);
            }
            let B = [], W = j(k, [
                '類別',
                '类别'
            ]);
            W && W.$row.find('a').each((e, t)=>{
                var l;
                let n = v(t), r = null != (l = n.attr('href')) ? l : '', i = n.text().trim();
                i && B.push({
                    id: r || i,
                    title: i
                });
            });
            let z = q(v, k).map((e)=>({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                })), I = new Set();
            v('a[href^="magnet:"]').each((e, t)=>{
                var l;
                let n = (null != (l = v(t).attr('href')) ? l : '').replace(/\[javdb\.com\]$/i, '');
                n && I.add(n);
            });
            let U = [
                ...I
            ], N = [];
            v('a.tile-item[data-fancybox="gallery"]').each((t, l)=>{
                let n = u(e, v(l).attr('href'));
                n && N.push(n);
            });
            let E = null != (d = v('video#preview-video source').first().attr('src')) ? d : '';
            E.startsWith('//') && (E = `https:${E}`);
            let R = [];
            b && R.push(`番号：${b}`), C && C !== D && R.push(`原标题：${C}`);
            let F = j(k, [
                '片商',
                '賣家',
                '卖家'
            ]);
            (null == F ? void 0 : F.valueText) && R.push(`片商：${F.valueText}`);
            let V = j(k, [
                '發行',
                '发行'
            ]);
            (null == V ? void 0 : V.valueText) && R.push(`发行：${V.valueText}`);
            let M = j(k, [
                '系列'
            ]);
            (null == M ? void 0 : M.valueText) && R.push(`系列：${M.valueText}`);
            let H = j(k, [
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
                posterPath: S || void 0,
                detailPoster: S || void 0,
                coverUrl: S || void 0,
                backdropPath: null != (c = null != (p = N[0]) ? p : S) ? c : void 0,
                backdropPaths: N.length > 0 ? N : void 0,
                releaseDate: T,
                rating: y,
                duration: l,
                durationText: a,
                genreTitle: B.map((e)=>e.title).join(' · ') || void 0,
                genreItems: B.length > 0 ? B : void 0,
                peoples: z.length > 0 ? z : void 0,
                previewUrl: E || void 0,
                trailers: E ? [
                    {
                        url: E,
                        coverUrl: S || void 0
                    }
                ] : void 0,
                description: R.join('\n'),
                mediaType: 'movie'
            };
            if (b && z.length > 0) try {
                yield Widget.storage.set(L(b), z[0].title);
            } catch (e) {}
            return console.log(`${r} JavDB 详情完成：${null != b ? b : '(番号未知)'}，演员 ${z.length}，类别 ${B.length}，磁力 ${U.length}`), G;
        } catch (e) {
            return console.log(`${r} JavDB 详情解析失败: ${a(e)}`), null;
        }
    })();
let P = 'https://drive-h.quark.cn/1/clouddrive', T = 'https://drive-pc.quark.cn/1/clouddrive', J = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch', O = 'https://pan.quark.cn', B = 'quark_cookie_dyn', W = 'quark_cookie_base_fp';
function z(e) {
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
function U(e, n, r, i, o, a, u) {
    return t(function*() {
        var d, f;
        let p, g = yield t(function*() {
            var t;
            let l = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!l) return '';
            try {
                if ((yield Widget.storage.get(W)) === z(l)) {
                    let e = yield Widget.storage.get(B);
                    if ('string' == typeof e && e.trim()) return e;
                }
            } catch (e) {}
            return l;
        })();
        if (!g) throw Error('未填写夸克网盘 Cookie（模块全局参数 quarkCookie）');
        let h = s(l({
            pr: 'ucpro',
            fr: 'pc'
        }, o)), m = `${n}${i}?${h}`, y = {
            Cookie: g,
            Accept: 'application/json, text/plain, */*',
            Referer: null != u ? u : O,
            'User-Agent': J
        };
        p = 'GET' === r ? yield Widget.http.get(m, {
            headers: y
        }) : yield Widget.http.post(m, null != a ? a : {}, {
            headers: y
        }), yield (d = null == p ? void 0 : p.headers, t(function*() {
            try {
                var t, l;
                let n = (null != (t = e.quarkCookie) ? t : '').trim();
                if (!n || !d) return;
                let r = null != (l = d['set-cookie']) ? l : d['Set-Cookie'];
                if (!r) return;
                Array.isArray(r) || (r = [
                    r
                ]);
                let i = g, o = !1;
                for (let e of r){
                    let t = String(e).split(';')[0], l = t.indexOf('=');
                    if (l <= 0) continue;
                    let n = t.slice(0, l).trim();
                    ('__puus' === n || '__pus' === n) && (i = function(e, t, l) {
                        let n = e.split(';').map((e)=>e.trim()).filter(Boolean), r = !1, i = n.map((e)=>{
                            let n = e.indexOf('=');
                            return n > 0 && e.slice(0, n) === t ? (r = !0, `${t}=${l}`) : e;
                        });
                        return r || i.push(`${t}=${l}`), i.join('; ');
                    }(i, n, t.slice(l + 1).trim()), o = !0);
                }
                o && (yield Widget.storage.set(B, i), yield Widget.storage.set(W, z(n)));
            } catch (e) {}
        })());
        let v = 'number' == typeof (null == p ? void 0 : p.statusCode) ? p.statusCode : 200;
        if (v >= 400) throw Error(`HTTP ${v}: 夸克接口 ${i}`);
        let $ = c(null == p ? void 0 : p.data);
        if (!$) throw Error(`夸克接口 ${i} 返回了无法解析的内容`);
        if ('number' == typeof $.status && $.status >= 400 || void 0 !== $.code && 0 !== $.code) throw Error(`夸克接口 ${i} 出错: ${null != (f = $.message) ? f : `code=${$.code}`}`);
        return {
            json: $,
            cookieSent: g
        };
    })();
}
function N(e, l, n, r, i) {
    return t(function*() {
        return U(e, 'https://drive.quark.cn/1/clouddrive', l, n, r, i);
    })();
}
function E(e, l) {
    return t(function*() {
        let t = [], n = 1;
        for(; n <= 20; n++){
            var r, i, o, a;
            let { json: u } = yield N(e, 'GET', '/file/sort', {
                pdir_fid: l,
                _page: String(n),
                _size: '100',
                _fetch_total: '1',
                fetch_all_file: '1',
                fetch_risk_file_name: '1'
            }), s = Array.isArray(null == u || null == (r = u.data) ? void 0 : r.list) ? u.data.list : [];
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
function R(e) {
    let t = e.lastIndexOf('.');
    return !(t < 0) && I.has(e.slice(t + 1).toLowerCase());
}
function F(e) {
    return e.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
let V = {
    '4k': 6,
    '2k': 5,
    super: 4,
    high: 3,
    normal: 2,
    low: 1
};
function M(e, l, n) {
    return t(function*() {
        yield N(e, 'POST', '/file/rename', {}, {
            fid: l,
            file_name: n
        });
    })();
}
function L(e) {
    return 'avdb_actress_' + e.toUpperCase();
}
function H(e) {
    return e.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60);
}
function G(e, l, n, i) {
    return t(function*() {
        var u, s, d, c, f;
        let g = [];
        if (n && (null != (u = e.quarkAutoRename) ? u : 'on') !== 'off') {
            let u = yield t(function*() {
                try {
                    let e = yield Widget.storage.get(L(n));
                    if ('string' == typeof e && e.trim()) return e.trim();
                } catch (e) {}
                if (!i || !/^https?:\/\//.test(i) || !i.includes('javdb')) return '';
                try {
                    var t, l;
                    let r = yield v(e), o = yield b(i, r), a = yield Widget.html.load(o), u = q(a, A(a)), s = H(null != (t = null == (l = u[0]) ? void 0 : l.name) ? t : '');
                    if (s) {
                        try {
                            yield Widget.storage.set(L(n), s);
                        } catch (e) {}
                        return s;
                    }
                } catch (e) {
                    console.log(`${r} 女优名获取失败（${n}）: ${a(e)}`);
                }
                return '';
            })();
            yield t(function*() {
                var i, s, d, c;
                let f = null != (i = null == (d = /\.([A-Za-z0-9]{2,5})$/.exec(l.name)) ? void 0 : d[1]) ? i : 'mp4', g = `${n}.${f}`;
                if (l.name !== g) try {
                    yield M(e, l.fid, g), console.log(`${r} 夸克自动改名：${l.name} → ${g}`), l.name = g;
                } catch (e) {
                    console.log(`${r} 夸克文件改名失败（${l.name}）: ${a(e)}`);
                }
                let h = H(u);
                if (h) {
                    try {
                        let n = yield t(function*() {
                            let t = (yield E(e, '0')).find((e)=>e.isDir && e.name === h);
                            if (t) return t.fid;
                            try {
                                yield N(e, 'POST', '/file', {}, {
                                    dir_init_lock: !1,
                                    dir_path: '',
                                    file_name: h,
                                    pdir_fid: '0'
                                });
                            } catch (e) {
                                console.log(`${r} 创建文件夹「${h}」失败（可能已有同名）: ${a(e)}`);
                            }
                            for(let t = 0; t < 3; t++){
                                var l, n;
                                let t = null != (l = null == (n = (yield E(e, '0')).find((e)=>e.isDir && e.name === h)) ? void 0 : n.fid) ? l : '';
                                if (t) return t;
                                yield o(800);
                            }
                            return '';
                        })();
                        n && l.parentFid !== n && (yield (c = l.fid, t(function*() {
                            yield N(e, 'POST', '/file/move', {}, {
                                action_type: 1,
                                exclude_fids: [],
                                filelist: [
                                    c
                                ],
                                to_pdir_fid: n
                            });
                        })()), console.log(`${r} 夸克归类：${l.name} → 文件夹「${h}」`), l.parentFid = n);
                    } catch (e) {
                        console.log(`${r} 夸克按女优归类失败（${l.name}）: ${a(e)}`);
                    }
                    return;
                }
                let m = l.parentFid;
                if (m && '0' !== m && l.parentName && l.parentName !== n && (null != (s = l.parentVideoCount) ? s : 1) <= 1 && F(l.parentName).includes(p(n))) try {
                    yield M(e, m, n), console.log(`${r} 夸克自动改名（文件夹）：${l.parentName} → ${n}`);
                } catch (e) {
                    console.log(`${r} 夸克文件夹改名失败（${l.parentName}）: ${a(e)}`);
                }
            })();
        }
        let h = '';
        try {
            let { json: t } = yield N(e, 'POST', '/file/v2/play/project', {}, {
                fid: l.fid,
                resolutions: 'low,normal,high,super,2k,4k',
                supports: 'fmp4_av,m3u8,dolby_vision'
            }), n = (Array.isArray(null == t || null == (s = t.data) ? void 0 : s.video_list) ? t.data.video_list : []).filter((e)=>{
                var t;
                return null == e || null == (t = e.video_info) ? void 0 : t.url;
            });
            if (n.length > 0) for (let e of n.sort((e, t)=>{
                var l, n, r, i;
                return (null != (l = V[String(null != (n = null == t ? void 0 : t.resolution) ? n : '').toLowerCase()]) ? l : 0) - (null != (r = V[String(null != (i = null == e ? void 0 : e.resolution) ? i : '').toLowerCase()]) ? r : 0);
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
            let { json: t, cookieSent: n } = yield N(e, 'POST', '/file/download', {}, {
                fids: [
                    l.fid
                ]
            }), r = null == t || null == (f = t.data) || null == (c = f[0]) ? void 0 : c.download_url;
            r && g.push({
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
                url: String(r),
                customHeaders: {
                    Cookie: n,
                    Referer: O,
                    'User-Agent': J
                }
            });
        } catch (e) {
            console.log(`${r} 夸克原画链接获取失败（${l.name}）: ${a(e)}`);
        }
        return g;
    })();
}
let Z = 'quark_avdb_folder_fid';
function K(e, l, n, r) {
    return t(function*() {
        let t = [];
        for(let u = 1; u <= 4; u++){
            var i, o, a;
            let { json: s } = yield U(e, P, 'GET', '/share/sharepage/detail', {
                pwd_id: l.pwdId,
                stoken: n,
                pdir_fid: r,
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
let Q = 'https://jable.tv', X = 'https://memojav.org';
loadResource = (e)=>t(function*() {
        var f, h, m, v, k, b;
        let _, x;
        console.log(`${r} loadResource 被调用（id=${null != (f = e.id) ? f : ''}，title=${null != (h = e.title) ? h : ''}，link=${null != (m = e.link) ? m : ''}）`);
        let C = {
            quark: '',
            share: '',
            jable: '',
            memo: ''
        }, w = g(e.id, e.title, e.seriesName, e.link);
        if (!w) return console.log(`${r} loadResource 未能从参数中提取番号（id=${null != (v = e.id) ? v : ''}，title=${null != (k = e.title) ? k : ''}），返回空`), [
            {
                name: '诊断·番号：未能识别',
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != (b = e.link) ? b : 'https://javdb.com'
            }
        ];
        yield y(e);
        let D = 'external-first' === e.sourcePriority, S = [], A = [], j = ()=>t(function*() {
                var u;
                try {
                    if (!(null != (u = e.quarkCookie) ? u : '').trim()) {
                        console.log(`${r} 未填写夸克 Cookie，跳过夸克网盘源`), C.quark = '未填Cookie';
                        return;
                    }
                    let i = yield t(function*() {
                        var t, i, o, u, s, d, c, f;
                        let g = new Set([
                            p(w)
                        ]), h = /FC2-PPV-(\d+)/.exec(w);
                        h && g.add(`FC2${h[1]}`);
                        let m = [
                            '0'
                        ], y = [], v = [], $ = new Map(), k = new Map(), b = 0, _ = 0;
                        for(; m.length > 0 && b < 60 && _ < 4000;){
                            let s, d = m.shift();
                            b++;
                            try {
                                s = yield E(e, d);
                            } catch (e) {
                                console.log(`${r} 夸克目录 ${d} 列取失败，跳过: ${a(e)}`);
                                continue;
                            }
                            for (let e of s){
                                if (_++, e.isDir) {
                                    $.set(e.fid, e.name), m.push(e.fid);
                                    continue;
                                }
                                if (1 !== e.category && !R(e.name)) continue;
                                k.set(d, (null != (t = k.get(d)) ? t : 0) + 1);
                                let r = F(e.name), a = !1;
                                for (let e of g)if (e && r.includes(e)) {
                                    a = !0;
                                    break;
                                }
                                if (a) {
                                    y.push(n(l({}, e), {
                                        parentFid: d,
                                        parentName: null != (o = $.get(d)) ? o : ''
                                    }));
                                    continue;
                                }
                                let s = F(null != (i = $.get(d)) ? i : '');
                                if (s) {
                                    for (let t of g)if (t && s.includes(t)) {
                                        v.push(n(l({}, e), {
                                            parentFid: d,
                                            parentName: null != (u = $.get(d)) ? u : ''
                                        }));
                                        break;
                                    }
                                }
                            }
                        }
                        for (let e of y)e.parentVideoCount = null != (s = k.get(null != (d = e.parentFid) ? d : '')) ? s : 1;
                        for (let e of v)e.parentVideoCount = null != (c = k.get(null != (f = e.parentFid) ? f : '')) ? c : 1;
                        return (m.length > 0 && console.log(`${r} 夸克搜索达到遍历上限（已走 ${b} 个目录、扫描 ${_} 项），结果可能不完整`), y.sort((e, t)=>{
                            let l = +(1 !== e.category), n = +(1 !== t.category);
                            return l !== n ? l - n : t.size - e.size;
                        }), y.length > 0) ? y : v.length > 0 ? (console.log(`${r} 夸克搜索：文件名无番号，靠文件夹名命中 ${v.length} 个文件`), v.sort((e, t)=>t.size - e.size || (e.name < t.name ? -1 : +(e.name > t.name))), v.slice(0, 3)) : y;
                    })();
                    if (i.length > 0) {
                        console.log(`${r} 夸克命中 ${i.length} 个文件，解析最优文件：${i[0].name}`), S.push(...yield G(e, i[0], w, e.link)), 0 === S.length && (C.quark = '命中但解析失败');
                        return;
                    }
                    console.log(`${r} 夸克网盘中未找到与 ${w} 匹配的视频文件，尝试分享转存`), C.quark = '网盘未搜到';
                } catch (e) {
                    console.log(`${r} 夸克源失败，已降级: ${a(e)}`), C.quark = '出错';
                    return;
                }
                try {
                    S.push(...yield t(function*() {
                        let l;
                        if ('off' === e.shareIndexEnabled) return console.log(`${r} 分享索引搜索已关闭，跳过转存`), [];
                        try {
                            l = yield t(function*() {
                                var t, l, n, r, o;
                                let a = (null != (t = e.shareIndexBase) ? t : '').trim().replace(/\/+$/, '') || 'https://pansou.app', u = `${a}/api/search?${s({
                                    kw: w,
                                    res: 'all',
                                    src: 'all'
                                })}`, d = yield Widget.http.get(u, {
                                    headers: {
                                        'User-Agent': i,
                                        Accept: 'application/json, */*'
                                    }
                                }), f = 'number' == typeof (null == d ? void 0 : d.statusCode) ? d.statusCode : 200;
                                if (f >= 400) throw Error(`HTTP ${f}: 分享索引 ${a}`);
                                let g = c(null == d ? void 0 : d.data);
                                if (!g) throw Error(`分享索引 ${a} 返回了无法解析的内容`);
                                if ('number' == typeof g.code && 0 !== g.code) throw Error(`分享索引出错: ${null != (r = g.message) ? r : `code=${g.code}`}`);
                                let h = null != (l = g.data) ? l : g, m = p(w), y = new Map(), v = (e, t, l)=>{
                                    if (y.size >= 12) return;
                                    let n = String(null != e ? e : '');
                                    if (!n.includes('quark')) return;
                                    let r = function(e) {
                                        var t, l;
                                        if (!e) return null;
                                        let n = /\/s\/([A-Za-z0-9_-]{4,})/.exec(e);
                                        if (!n) return null;
                                        let r = null != (t = null == (l = /[?&]pwd=([A-Za-z0-9]+)/.exec(e)) ? void 0 : l[1]) ? t : '';
                                        return {
                                            pwdId: n[1],
                                            passcode: r
                                        };
                                    }(n);
                                    if (!r) return;
                                    let i = String(null != l ? l : '').trim(), o = +!F(i).includes(m), a = y.get(r.pwdId);
                                    a && a.tier <= o || y.set(r.pwdId, {
                                        url: n,
                                        pwdId: r.pwdId,
                                        passcode: String(null != t ? t : '') || r.passcode,
                                        title: i,
                                        tier: o
                                    });
                                }, $ = null == h || null == (n = h.merged_by_type) ? void 0 : n.quark;
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
                            return console.log(`${r} 分享索引搜索失败，已跳过转存: ${a(e)}`), [];
                        }
                        if (0 === l.length) return console.log(`${r} 分享索引未找到 ${w} 的夸克分享`), [];
                        console.log(`${r} 分享索引找到 ${l.length} 个 ${w} 的夸克分享候选`);
                        let n = yield t(function*() {
                            var t, l, n, i, u;
                            let s = (null != (t = e.quarkSaveFid) ? t : '').trim();
                            if (s) return s;
                            try {
                                let e = yield Widget.storage.get(Z);
                                if ('string' == typeof e && e) return e;
                            } catch (e) {}
                            try {
                                let t = (yield E(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name);
                                if (t) {
                                    try {
                                        yield Widget.storage.set(Z, t.fid);
                                    } catch (e) {}
                                    return t.fid;
                                }
                                let s = '';
                                try {
                                    let { json: t } = yield N(e, 'POST', '/file', {}, {
                                        dir_init_lock: !1,
                                        dir_path: '',
                                        file_name: 'AVDB',
                                        pdir_fid: '0'
                                    });
                                    s = String(null != (l = null == t || null == (n = t.data) ? void 0 : n.fid) ? l : '');
                                } catch (e) {
                                    console.log(`${r} 创建 AVDB 文件夹失败（可能已有同名）: ${a(e)}`);
                                }
                                for(let t = 0; t < 3 && !s; t++)yield o(1000), s = null != (i = null == (u = (yield E(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name)) ? void 0 : u.fid) ? i : '';
                                if (s) {
                                    try {
                                        yield Widget.storage.set(Z, s);
                                    } catch (e) {}
                                    return console.log(`${r} 转存目标：网盘根目录下的 AVDB 文件夹`), s;
                                }
                            } catch (e) {
                                console.log(`${r} 解析转存目标目录失败: ${a(e)}`);
                            }
                            return console.log(`${r} 转存目标文件夹 AVDB 不可用，改存网盘根目录`), '0';
                        })(), u = Math.min(3, l.length);
                        for(let i = 0; i < u; i++){
                            let u = l[i];
                            try {
                                let l = yield function(e, l) {
                                    return t(function*() {
                                        var t;
                                        let n = Date.now(), { json: r } = yield U(e, P, 'POST', '/share/sharepage/token', {
                                            __dt: String(n % 1000),
                                            __t: String(n)
                                        }, {
                                            pwd_id: l.pwdId,
                                            passcode: l.passcode
                                        }, `https://pan.quark.cn/s/${l.pwdId}`), i = null == r || null == (t = r.data) ? void 0 : t.stoken;
                                        if (!i) throw Error('分享 token 接口未返回 stoken（分享可能已失效或需要提取码）');
                                        return String(i);
                                    })();
                                }(e, u), s = yield function(e, l, n, i) {
                                    return t(function*() {
                                        let t = yield K(e, l, n, '0'), o = t.filter((e)=>!e.isDir);
                                        for (let i of t.filter((e)=>e.isDir).slice(0, 10))try {
                                            let t = yield K(e, l, n, i.fid);
                                            o.push(...t.filter((e)=>!e.isDir));
                                        } catch (e) {
                                            console.log(`${r} 分享子目录 ${i.name} 列取失败，跳过: ${a(e)}`);
                                        }
                                        let u = o.filter((e)=>1 === e.category || R(e.name)), s = p(i), d = u.filter((e)=>F(e.name).includes(s));
                                        return (d.length > 0 ? d : [
                                            ...u
                                        ].sort((e, t)=>t.size - e.size).slice(0, 3)).slice(0, 10);
                                    })();
                                }(e, u, l, w);
                                if (0 === s.length) {
                                    console.log(`${r} 分享候选 ${i + 1}（${u.title || u.pwdId}）内无视频文件，尝试下一个`);
                                    continue;
                                }
                                console.log(`${r} 转存候选 ${i + 1}：${u.title || u.url} → ${s.length} 个文件`);
                                let d = yield function(e, l, n, i, u) {
                                    return t(function*() {
                                        var t, s, d;
                                        let c = Date.now(), { json: f } = yield U(e, T, 'POST', '/share/sharepage/save', {
                                            __dt: String(c % 1000),
                                            __t: String(c)
                                        }, {
                                            fid_list: i.map((e)=>e.fid),
                                            fid_token_list: i.map((e)=>e.token),
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
                                                let { json: n } = yield U(e, T, 'GET', '/task', {
                                                    uc_param_str: '',
                                                    task_id: g,
                                                    retry_index: String(t)
                                                }), r = null == n || null == (s = n.data) ? void 0 : s.status;
                                                if (2 === r) return 'done';
                                                if (3 === r) return 'failed';
                                                let i = null == n || null == (d = n.metadata) ? void 0 : d.tq_gap;
                                                'number' == typeof i && i > 0 && (l = Math.min(5000, Math.max(1500, i)));
                                            } catch (e) {
                                                console.log(`${r} 转存任务查询出错（第 ${t} 次），继续等待: ${a(e)}`);
                                            }
                                            t < 20 && (yield o(l));
                                        }
                                        return 'pending';
                                    })();
                                }(e, u, l, s, n);
                                if ('failed' === d) {
                                    console.log(`${r} 分享候选 ${i + 1} 转存任务失败，尝试下一个`);
                                    continue;
                                }
                                if ('pending' === d) return console.log(`${r} 转存任务仍在进行中（${w}）：本次先用其他源播放，文件落盘后下次打开将直接命中网盘`), [];
                                let c = yield function(e, l, n, i) {
                                    return t(function*() {
                                        let t = new Set(n.map((e)=>F(e))), u = p(i), s = (e)=>{
                                            let l = e.filter((e)=>!e.isDir && (1 === e.category || R(e.name))), n = l.filter((e)=>t.has(F(e.name))), r = n.length > 0 ? n : l.filter((e)=>F(e.name).includes(u));
                                            return 0 === r.length ? null : (r.sort((e, t)=>t.size - e.size), r[0]);
                                        };
                                        for(let t = 0; t < 3; t++){
                                            t > 0 && (yield o(1500));
                                            try {
                                                let t = yield E(e, l), n = s(t);
                                                if (n) return n;
                                                for (let l of t.filter((e)=>e.isDir).slice(0, 10)){
                                                    let t = yield E(e, l.fid), n = s(t);
                                                    if (n) return n;
                                                }
                                            } catch (e) {
                                                console.log(`${r} 转存后定位文件失败（第 ${t + 1} 次）: ${a(e)}`);
                                            }
                                        }
                                        return null;
                                    })();
                                }(e, n, s.map((e)=>e.name), w);
                                if (!c) return console.log(`${r} 转存已完成但暂未在网盘定位到文件（${w}），下次打开应可直接命中`), [];
                                return console.log(`${r} 转存完成并定位到文件：${c.name}`), yield G(e, c, w);
                            } catch (e) {
                                console.log(`${r} 分享候选 ${i + 1} 转存失败，尝试下一个: ${a(e)}`);
                            }
                        }
                        return console.log(`${r} 分享转存全部候选失败（${w}）`), [];
                    })()), 0 === S.length && (C.share = 'off' === e.shareIndexEnabled ? '未开启' : '索引无此片');
                } catch (e) {
                    console.log(`${r} 分享转存失败，已降级: ${a(e)}`), C.share = '出错';
                }
            })(), q = ()=>t(function*() {
                try {
                    let e = yield t(function*() {
                        var e;
                        let t, { sig: l, sts: n } = function() {
                            let e = function(e) {
                                let t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', l = '';
                                for(let n = 0; n < e.length; n += 3){
                                    let r = e.charCodeAt(n), i = n + 1 < e.length, o = n + 2 < e.length, a = i ? e.charCodeAt(n + 1) : 0, u = o ? e.charCodeAt(n + 2) : 0;
                                    l += t[r >> 2], l += t[(3 & r) << 4 | a >> 4], l += i ? t[(15 & a) << 2 | u >> 6] : '=', l += o ? t[63 & u] : '=';
                                }
                                return l;
                            }(String(Date.now())), t = e.substr(e.length - 12, 10), l = 1;
                            for(let e = 0; e < 10; e++)l += t.charCodeAt(e) * e * 1743;
                            return {
                                sig: t,
                                sts: l
                            };
                        }(), o = `${X}/hls/get_video_info.php?id=${encodeURIComponent(w)}&sig=${l}&sts=${n}`, a = yield d(o, {
                            'User-Agent': i,
                            Accept: 'application/json,text/plain,*/*',
                            Referer: `${X}/embed/${encodeURIComponent(w)}`
                        }), u = a.includes('for (;;);') ? a.split('for (;;);')[1] : a;
                        try {
                            t = JSON.parse(u);
                        } catch (e) {
                            return console.log(`${r} MemoJav 接口返回无法解析: ${a.slice(0, 120)}`), [];
                        }
                        if (!t.success || !t.url) return console.log(`${r} MemoJav 无 ${w}${t.reason ? `（${t.reason}）` : ''}`), [];
                        let s = decodeURIComponent(t.url);
                        return 'mp4' === t.type && (s += '=m37'), console.log(`${r} MemoJav 命中 ${w}（${null != (e = t.type) ? e : 'hls'}）`), [
                            {
                                name: 'MemoJav',
                                description: `${X}/video/${w}`,
                                url: s
                            }
                        ];
                    })();
                    A.push(...e), 0 === e.length && (C.memo = '无此片');
                } catch (e) {
                    console.log(`${r} MemoJav 源失败，已降级: ${a(e)}`), C.memo = '出错';
                }
                try {
                    let e = yield t(function*() {
                        var e, t, l, n, o;
                        let a, s = w.toLowerCase(), c = s.replace(/-/g, ''), f = `${Q}/search/${encodeURIComponent(s)}/`, p = yield d(f, {
                            'User-Agent': i,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: `${Q}/`
                        });
                        if ($(p)) return console.log(`${r} Jable 搜索被 Cloudflare 验证页拦截`), [];
                        let g = new Set(), h = /href\s*=\s*["']((?:https:\/\/jable\.tv)?\/videos\/[\w-]+\/?)["']/gi;
                        for(; null !== (a = h.exec(p));)g.add(u(Q, a[1]));
                        let m = [
                            ...g
                        ], y = null != (e = null != (t = m.find((e)=>e.toLowerCase().includes(s))) ? t : m.find((e)=>e.toLowerCase().replace(/-/g, '').includes(c))) ? e : m[0];
                        if (!y) return console.log(`${r} Jable 未找到 ${w} 的视频页`), [];
                        let v = yield d(y, {
                            'User-Agent': i,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: f
                        });
                        if ($(v)) return console.log(`${r} Jable 视频页被 Cloudflare 验证页拦截`), [];
                        let k = null != (l = null == (n = /var\s+hlsUrl\s*=\s*'([^']+)'/.exec(v)) ? void 0 : n[1]) ? l : null == (o = /var\s+hlsUrl\s*=\s*"([^"]+)"/.exec(v)) ? void 0 : o[1];
                        return k ? [
                            {
                                name: 'Jable',
                                description: y,
                                url: k,
                                customHeaders: {
                                    Referer: y,
                                    'User-Agent': i
                                }
                            }
                        ] : (console.log(`${r} Jable 视频页未解析到 hlsUrl: ${y}`), []);
                    })();
                    A.push(...e), 0 === e.length && (C.jable = '无结果或被拦');
                } catch (e) {
                    console.log(`${r} Jable 源失败，已降级: ${a(e)}`), C.jable = '出错';
                }
            })();
        D ? (yield q(), yield j()) : (yield j(), yield q());
        let J = D ? [
            ...A,
            ...S
        ] : [
            ...S,
            ...A
        ];
        return console.log(`${r} loadResource ${w}：共 ${J.length} 条播放线路`), J.length > 0 ? J : (_ = (t)=>{
            var l;
            return {
                name: t,
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != (l = e.link) ? l : 'https://javdb.com'
            };
        }, x = [], C.quark && x.push(_(`诊断·夸克：${C.quark}`)), C.share && x.push(_(`诊断·转存：${C.share}`)), C.jable && x.push(_(`诊断·Jable：${C.jable}`)), C.memo && x.push(_(`诊断·MemoJav：${C.memo}`)), x);
    })();
