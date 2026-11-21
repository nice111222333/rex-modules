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
    description: "JavDB 浏览（最新/Top250/热播与分类榜单/搜索/详情）+ 夸克网盘播放：先按番号搜自己的网盘，未命中时自动搜分享索引并转存到网盘再播，另有 MemoJav / Jable 外部源兜底。可选：把夸克挂载到 AList 并填下方 AList 参数后，详情页会多出经 AList WebDAV 的原画线路（实测流畅，优于夸克直链）。使用前请在全局参数中填写自己的夸克网盘 Cookie；如需 JavDB 磁力，请填「JavDB Cookie」（从已登录的浏览器复制）。JavDB 本站对部分地区 IP 有限制，若列表为空请检查代理节点地区（建议非日本节点）。",
    author: 'v7777',
    site: 'https://javdb.com',
    version: "0.3.11",
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
            name: 'alistBase',
            title: 'AList 地址',
            type: 'input',
            description: '可选（AList 播放）。你 AList 的访问地址，手机能打开的那个，如 http://192.168.1.10:5244。填了地址+令牌才会启用 AList 源',
            value: ''
        },
        {
            name: 'alistToken',
            title: 'AList 令牌',
            type: 'input',
            description: '可选（AList 播放）。AList 后台 → 设置 → 其他 → 令牌，复制填入（不要发给任何人）',
            value: ''
        },
        {
            name: 'alistUser',
            title: 'AList 账号',
            type: 'input',
            description: '可选（WebDAV 线路）。就是你在 Rex 里添加 WebDAV 时用的那个 AList 账号',
            value: ''
        },
        {
            name: 'alistPass',
            title: 'AList 密码',
            type: 'input',
            description: '可选（WebDAV 线路）。同上，那个账号的密码',
            value: ''
        },
        {
            name: 'alistRoot',
            title: 'AList 挂载路径',
            type: 'input',
            description: '可选。夸克在 AList 里的挂载路径，留空 = /夸克；挂载名不同就改成 /你的挂载名',
            value: ''
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
function h(...e) {
    for (let t of e){
        if (!t) continue;
        let e = f(t);
        if (e) return e;
    }
    return null;
}
let g = 'https://javdb.com', m = 'javdb_cookie_mirror';
function v(e) {
    return t(function*() {
        try {
            if (!e || 'string' != typeof e.javdbCookie) return;
            let t = e.javdbCookie.trim();
            t ? yield Widget.storage.set(m, t) : yield Widget.storage.remove(m);
        } catch (e) {}
    })();
}
function $(e) {
    return t(function*() {
        if (e && 'string' == typeof e.javdbCookie && e.javdbCookie.trim()) return e.javdbCookie.trim();
        try {
            let e = yield Widget.storage.get(m);
            if ('string' == typeof e && e.trim()) return e.trim();
        } catch (e) {}
        return '';
    })();
}
function y(e) {
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
            Referer: `${g}/`
        }, l && (t.Cookie = l), t));
        if (y(n)) throw new k(e);
        return n;
    })();
}
function C(e, l) {
    return t(function*() {
        let t = yield Widget.html.load(e), n = t('a.box');
        0 === n.length && (n = t('.movie-list a.box, .grid a.box'));
        let r = [], i = new Set();
        return n.each((e, n)=>{
            var o, a, s, d, c;
            let p = t(n), g = u(l, null != (o = p.attr('href')) ? o : '');
            if (!g || i.has(g)) return;
            i.add(g);
            let m = p.find('.video-title strong').first().text().trim(), v = (null != (a = p.attr('title')) ? a : '').trim(), $ = p.find('.video-title').first().text().trim(), y = null != (s = f(m)) ? s : h(v, $), k = v || $ || y || g, b = null != (d = null != (c = p.find('img').first().attr('src')) ? c : p.find('img').first().attr('data-src')) ? d : '';
            b = u(l, b);
            let C = p.find('.score').first().text(), x = /(\d+(?:\.\d+)?)\s*分/.exec(C), A = p.find('.meta').first().text().trim(), _ = /(\d{4}-\d{2}-\d{2})/.exec(A);
            r.push({
                id: null != y ? y : g,
                type: 'detail',
                title: k,
                link: g,
                posterPath: b || void 0,
                coverUrl: b || void 0,
                backdropPath: b || void 0,
                rating: x ? x[1] : void 0,
                releaseDate: _ ? _[1] : void 0,
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
function A(e, l) {
    return t(function*() {
        try {
            let t = yield b(e), n = yield C(t, e);
            if (console.log(`${r} JavDB ${l}：${n.length} 条`), n.length > 0) return n;
            let i = yield $();
            if (i) {
                console.log(`${r} JavDB ${l} 匿名解析为空，带 Cookie 重试`);
                try {
                    let t = yield b(e, i), n = yield C(t, e);
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
function _(e) {
    let t = (null != e ? e : '').trim().toLowerCase();
    return 'weekly' === t || 'monthly' === t ? t : 'daily';
}
function w(e, l, n) {
    return t(function*() {
        yield v(e);
        let t = _(e.period);
        return A(`${g}/rankings/movies?${s({
            p: t,
            t: l
        })}`, `${n}(${t})`);
    })();
}
function D(e) {
    return e.replace(/[:：\s]/g, '');
}
function S(e, t) {
    return e.find((e)=>t.includes(e.label));
}
loadHome = (e)=>t(function*() {
        yield v(e);
        let t = e.genreId || e.peopleId || '';
        return t ? A(u(g, t), '分类/演员列表') : A(`${g}/`, '首页最新');
    })(), loadTop250 = (e)=>t(function*() {
        var t;
        yield v(e);
        let l = (null != (t = e.ranking_type) ? t : '').trim();
        return l && 'all' !== l && console.log(`${r} Top250 ranking_type=${l}：年份筛选形式无公开出处，按全部年份处理`), A(`${g}/rankings/top`, 'Top250');
    })(), loadPlayback = (e)=>t(function*() {
        yield v(e);
        let t = _(e.period);
        if ('monthly' !== t) return A(`${g}/rankings/playback`, `热播榜(${t})`);
        let l = yield A(`${g}/rankings/playback?p=monthly`, '热播榜(monthly)');
        return l.length > 0 ? l : (console.log(`${r} 热播榜(monthly) ?p=monthly 无结果，回退裸路径 /rankings/playback`), A(`${g}/rankings/playback`, '热播榜(monthly回退)'));
    })(), loadCensored = (e)=>t(function*() {
        return w(e, 'censored', '有码榜');
    })(), loadUncensored = (e)=>t(function*() {
        return w(e, 'uncensored', '无码榜');
    })(), loadWestern = (e)=>t(function*() {
        return w(e, 'western', '欧美榜');
    })(), loadFC2 = (e)=>t(function*() {
        yield v(e);
        let t = _(e.period);
        return A(`${g}/rankings/movies?${s({
            p: t,
            t: 'fc2'
        })}`, `FC2榜(${t})`);
    })(), searchVideos = (e)=>t(function*() {
        var t, l, n;
        yield v(e);
        let i = (null != (t = null != (l = null != (n = e.keyword) ? n : e.title) ? l : e.query) ? t : '').trim();
        return i ? A(`${g}/search?${s({
            q: i,
            f: 'all'
        })}`, `搜索「${i}」`) : (console.log(`${r} 搜索关键词为空`), []);
    })(), loadDetail = (e, l)=>t(function*() {
        let t;
        if (!e) return null;
        yield v(l);
        let n = yield $(l);
        try {
            t = yield b(e, n);
        } catch (e) {
            return console.log(`${r} JavDB 详情获取失败: ${a(e)}`), null;
        }
        try {
            var i, o, s, d, c, p, g, m, y;
            let l, a, v, $ = yield Widget.html.load(t), k = function(e) {
                let t = e('nav.panel.movie-panel-info').first(), l = [];
                if (0 === t.length) return l;
                let n = t.find('> div, .panel-block'), r = new Set();
                return n.each((t, n)=>{
                    if (r.has(n)) return;
                    r.add(n);
                    let i = e(n), o = i.find('strong').first();
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
            }($), b = null, C = S(k, [
                '番號',
                '番号'
            ]);
            if (C && (b = f(C.valueText)), !b) {
                let e = $('nav.panel.movie-panel-info div span').first().text();
                b = f(e);
            }
            b || (b = h($('title').first().text()));
            let x = $('h2 strong.current-title').first().text().trim(), A = $('h2 span.origin-title').first().text().trim(), _ = null != (i = $('meta[property="og:title"]').attr('content')) ? i : '', w = x || _ || b || e, j = null != (o = $('img.video-cover').first().attr('src')) ? o : '';
            j || (j = null != (s = $('meta[property="og:image"]').attr('content')) ? s : ''), j = u(e, j);
            let T = S(k, [
                '日期'
            ]), P = T ? null == (g = /(\d{4}-\d{2}-\d{2})/.exec(T.valueText)) ? void 0 : g[1] : void 0, q = S(k, [
                '時長',
                '时长'
            ]);
            if (q) {
                a = q.valueText;
                let e = /(\d+)\s*分/.exec(q.valueText);
                e && (l = 60 * Number(e[1]));
            }
            let B = $('.score-stars').first();
            if (B.length > 0) {
                let e = (B.parent().text() || '').replace(/\s+/g, ' ');
                v = null == (m = /(\d+(?:\.\d+)?)\s*分/.exec(e)) ? void 0 : m[1];
            }
            if (!v) {
                let e = S(k, [
                    '評分',
                    '评分'
                ]);
                e && (v = null == (y = /(\d+(?:\.\d+)?)/.exec(e.valueText)) ? void 0 : y[1]);
            }
            let J = [], z = S(k, [
                '類別',
                '类别'
            ]);
            z && z.$row.find('a').each((e, t)=>{
                var l;
                let n = $(t), r = null != (l = n.attr('href')) ? l : '', i = n.text().trim();
                i && J.push({
                    id: r || i,
                    title: i
                });
            });
            let L = (function(e, t) {
                let l = S(t, [
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
                    if ('strong' === e.kind && !r && D(e.text) === l.label) {
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
            })($, k).map((e)=>({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                })), W = new Set();
            $('a[href^="magnet:"]').each((e, t)=>{
                var l;
                let n = (null != (l = $(t).attr('href')) ? l : '').replace(/\[javdb\.com\]$/i, '');
                n && W.add(n);
            });
            let O = [
                ...W
            ], I = [];
            $('a.tile-item[data-fancybox="gallery"]').each((t, l)=>{
                let n = u(e, $(l).attr('href'));
                n && I.push(n);
            });
            let U = null != (d = $('video#preview-video source').first().attr('src')) ? d : '';
            U.startsWith('//') && (U = `https:${U}`);
            let V = [];
            b && V.push(`番号：${b}`), A && A !== w && V.push(`原标题：${A}`);
            let E = S(k, [
                '片商',
                '賣家',
                '卖家'
            ]);
            (null == E ? void 0 : E.valueText) && V.push(`片商：${E.valueText}`);
            let N = S(k, [
                '發行',
                '发行'
            ]);
            (null == N ? void 0 : N.valueText) && V.push(`发行：${N.valueText}`);
            let R = S(k, [
                '系列'
            ]);
            (null == R ? void 0 : R.valueText) && V.push(`系列：${R.valueText}`);
            let M = S(k, [
                '導演',
                '导演'
            ]);
            if ((null == M ? void 0 : M.valueText) && V.push(`导演：${M.valueText}`), O.length > 0) for (let e of (V.push(`磁力链接：共 ${O.length} 条`), O.slice(0, 3)))V.push(e);
            else n ? V.push('磁力链接：未获取（已带 JavDB Cookie，仍无磁力——该条目可能无磁力，或 Cookie 已失效）') : V.push('磁力链接：未获取（JavDB 仅对登录用户展示磁力，请在全局参数填写「JavDB Cookie」）');
            let F = {
                id: null != b ? b : e,
                type: 'detail',
                title: w,
                link: e,
                posterPath: j || void 0,
                detailPoster: j || void 0,
                coverUrl: j || void 0,
                backdropPath: null != (c = null != (p = I[0]) ? p : j) ? c : void 0,
                backdropPaths: I.length > 0 ? I : void 0,
                releaseDate: P,
                rating: v,
                duration: l,
                durationText: a,
                genreTitle: J.map((e)=>e.title).join(' · ') || void 0,
                genreItems: J.length > 0 ? J : void 0,
                peoples: L.length > 0 ? L : void 0,
                previewUrl: U || void 0,
                trailers: U ? [
                    {
                        url: U,
                        coverUrl: j || void 0
                    }
                ] : void 0,
                description: V.join('\n'),
                mediaType: 'movie'
            };
            return console.log(`${r} JavDB 详情完成：${null != b ? b : '(番号未知)'}，演员 ${L.length}，类别 ${J.length}，磁力 ${O.length}`), F;
        } catch (e) {
            return console.log(`${r} JavDB 详情解析失败: ${a(e)}`), null;
        }
    })();
let j = 'https://drive-h.quark.cn/1/clouddrive', T = 'https://drive-pc.quark.cn/1/clouddrive', P = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch', q = 'https://pan.quark.cn', B = 'quark_cookie_dyn', J = 'quark_cookie_base_fp';
function z(e) {
    let t = 5381;
    for(let l = 0; l < e.length; l++)t = (t << 5) + t + e.charCodeAt(l) | 0;
    return `${e.length}:${(t >>> 0).toString(16)}`;
}
let L = new Set([
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
function W(e, n, r, i, o, a, u) {
    return t(function*() {
        var d, f;
        let p, h = yield t(function*() {
            var t;
            let l = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!l) return '';
            try {
                if ((yield Widget.storage.get(J)) === z(l)) {
                    let e = yield Widget.storage.get(B);
                    if ('string' == typeof e && e.trim()) return e;
                }
            } catch (e) {}
            return l;
        })();
        if (!h) throw Error('未填写夸克网盘 Cookie（模块全局参数 quarkCookie）');
        let g = s(l({
            pr: 'ucpro',
            fr: 'pc'
        }, o)), m = `${n}${i}?${g}`, v = {
            Cookie: h,
            Accept: 'application/json, text/plain, */*',
            Referer: null != u ? u : q,
            'User-Agent': P
        };
        p = 'GET' === r ? yield Widget.http.get(m, {
            headers: v
        }) : yield Widget.http.post(m, null != a ? a : {}, {
            headers: v
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
                let i = h, o = !1;
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
                o && (yield Widget.storage.set(B, i), yield Widget.storage.set(J, z(n)));
            } catch (e) {}
        })());
        let $ = 'number' == typeof (null == p ? void 0 : p.statusCode) ? p.statusCode : 200;
        if ($ >= 400) throw Error(`HTTP ${$}: 夸克接口 ${i}`);
        let y = c(null == p ? void 0 : p.data);
        if (!y) throw Error(`夸克接口 ${i} 返回了无法解析的内容`);
        if ('number' == typeof y.status && y.status >= 400 || void 0 !== y.code && 0 !== y.code) throw Error(`夸克接口 ${i} 出错: ${null != (f = y.message) ? f : `code=${y.code}`}`);
        return {
            json: y,
            cookieSent: h
        };
    })();
}
function O(e, l, n, r, i) {
    return t(function*() {
        return W(e, 'https://drive.quark.cn/1/clouddrive', l, n, r, i);
    })();
}
function I(e, l) {
    return t(function*() {
        let t = [], n = 1;
        for(; n <= 20; n++){
            var r, i, o, a;
            let { json: u } = yield O(e, 'GET', '/file/sort', {
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
function U(e) {
    let t = e.lastIndexOf('.');
    return !(t < 0) && L.has(e.slice(t + 1).toLowerCase());
}
function V(e) {
    return e.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
function E(e) {
    if (!e) return '';
    let t = e / 1073741824;
    return t >= 1 ? `${t.toFixed(2)} GB` : `${(e / 1048576).toFixed(1)} MB`;
}
let N = {
    '4k': 6,
    '2k': 5,
    super: 4,
    high: 3,
    normal: 2,
    low: 1
};
function R(e, l) {
    return t(function*() {
        var t, n, i, o;
        let u = [], s = '';
        try {
            let { json: r } = yield O(e, 'POST', '/file/v2/play/project', {}, {
                fid: l.fid,
                resolutions: 'low,normal,high,super,2k,4k',
                supports: 'fmp4_av,m3u8,dolby_vision'
            }), i = (Array.isArray(null == r || null == (t = r.data) ? void 0 : t.video_list) ? r.data.video_list : []).filter((e)=>{
                var t;
                return null == e || null == (t = e.video_info) ? void 0 : t.url;
            });
            if (i.length > 0) for (let e of i.sort((e, t)=>{
                var l, n, r, i;
                return (null != (l = N[String(null != (n = null == t ? void 0 : t.resolution) ? n : '').toLowerCase()]) ? l : 0) - (null != (r = N[String(null != (i = null == e ? void 0 : e.resolution) ? i : '').toLowerCase()]) ? r : 0);
            }).slice(0, 3))u.push({
                name: `夸克转码 ${String(null != (n = e.resolution) ? n : '').toUpperCase()}`,
                description: l.name,
                url: String(e.video_info.url)
            });
            else s = '转码已关闭（夸克接口变更）';
        } catch (e) {
            s = '转码已关闭（夸克接口变更）';
        }
        try {
            let { json: t, cookieSent: n } = yield O(e, 'POST', '/file/download', {}, {
                fids: [
                    l.fid
                ]
            }), r = null == t || null == (o = t.data) || null == (i = o[0]) ? void 0 : i.download_url;
            r && u.push({
                name: '夸克原画',
                description: [
                    l.name,
                    E(l.size),
                    s
                ].filter(Boolean).join(' · '),
                url: String(r),
                customHeaders: {
                    Cookie: n,
                    Referer: q,
                    'User-Agent': P
                }
            });
        } catch (e) {
            console.log(`${r} 夸克原画链接获取失败（${l.name}）: ${a(e)}`);
        }
        return u;
    })();
}
let M = 'quark_avdb_folder_fid';
function F(e, l, n, r) {
    return t(function*() {
        let t = [];
        for(let u = 1; u <= 4; u++){
            var i, o, a;
            let { json: s } = yield W(e, j, 'GET', '/share/sharepage/detail', {
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
let H = 'https://jable.tv';
function G(e) {
    var t;
    return (null != (t = e.alistBase) ? t : '').trim().replace(/\/+$/, '');
}
function Z(e, l, n) {
    return t(function*() {
        var t, r;
        let i = yield Widget.http.post(`${G(e)}${l}`, n, {
            headers: {
                Authorization: (null != (t = e.alistToken) ? t : '').trim(),
                'Content-Type': 'application/json'
            }
        }), o = 'number' == typeof (null == i ? void 0 : i.statusCode) ? i.statusCode : 200;
        if (o >= 400) throw Error(`AList HTTP ${o}: ${l}`);
        let a = c(null == i ? void 0 : i.data);
        if (!a || 200 !== a.code) throw Error(`AList 接口错误（${l}）：${null != (r = null == a ? void 0 : a.message) ? r : '无响应'}`);
        return a.data;
    })();
}
let K = 'https://memojav.org';
function Q(e) {
    let t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', l = '';
    for(let n = 0; n < e.length; n += 3){
        let r = e.charCodeAt(n), i = n + 1 < e.length, o = n + 2 < e.length, a = i ? e.charCodeAt(n + 1) : 0, u = o ? e.charCodeAt(n + 2) : 0;
        l += t[r >> 2], l += t[(3 & r) << 4 | a >> 4], l += i ? t[(15 & a) << 2 | u >> 6] : '=', l += o ? t[63 & u] : '=';
    }
    return l;
}
loadResource = (e)=>t(function*() {
        var f, g, m, $, k, b;
        let C, x;
        console.log(`${r} loadResource 被调用（id=${null != (f = e.id) ? f : ''}，title=${null != (g = e.title) ? g : ''}，link=${null != (m = e.link) ? m : ''}）`);
        let A = {
            alist: '',
            quark: '',
            share: '',
            jable: '',
            memo: ''
        }, _ = h(e.id, e.title, e.seriesName, e.link);
        if (!_) return console.log(`${r} loadResource 未能从参数中提取番号（id=${null != ($ = e.id) ? $ : ''}，title=${null != (k = e.title) ? k : ''}），返回空`), [
            {
                name: '诊断·番号：未能识别',
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != (b = e.link) ? b : 'https://javdb.com'
            }
        ];
        yield v(e);
        let w = 'external-first' === e.sourcePriority, D = [], S = [], P = [], q = ()=>t(function*() {
                var u;
                try {
                    if (!(null != (u = e.quarkCookie) ? u : '').trim()) {
                        console.log(`${r} 未填写夸克 Cookie，跳过夸克网盘源`), A.quark = '未填Cookie';
                        return;
                    }
                    let i = yield t(function*() {
                        var t, i, o, u, s, d, c, f;
                        let h = new Set([
                            p(_)
                        ]), g = /FC2-PPV-(\d+)/.exec(_);
                        g && h.add(`FC2${g[1]}`);
                        let m = [
                            '0'
                        ], v = [], $ = [], y = new Map(), k = new Map(), b = 0, C = 0;
                        for(; m.length > 0 && b < 60 && C < 4000;){
                            let s, d = m.shift();
                            b++;
                            try {
                                s = yield I(e, d);
                            } catch (e) {
                                console.log(`${r} 夸克目录 ${d} 列取失败，跳过: ${a(e)}`);
                                continue;
                            }
                            for (let e of s){
                                if (C++, e.isDir) {
                                    y.set(e.fid, e.name), m.push(e.fid);
                                    continue;
                                }
                                if (1 !== e.category && !U(e.name)) continue;
                                k.set(d, (null != (t = k.get(d)) ? t : 0) + 1);
                                let r = V(e.name), a = !1;
                                for (let e of h)if (e && r.includes(e)) {
                                    a = !0;
                                    break;
                                }
                                if (a) {
                                    v.push(n(l({}, e), {
                                        parentFid: d,
                                        parentName: null != (o = y.get(d)) ? o : ''
                                    }));
                                    continue;
                                }
                                let s = V(null != (i = y.get(d)) ? i : '');
                                if (s) {
                                    for (let t of h)if (t && s.includes(t)) {
                                        $.push(n(l({}, e), {
                                            parentFid: d,
                                            parentName: null != (u = y.get(d)) ? u : ''
                                        }));
                                        break;
                                    }
                                }
                            }
                        }
                        for (let e of v)e.parentVideoCount = null != (s = k.get(null != (d = e.parentFid) ? d : '')) ? s : 1;
                        for (let e of $)e.parentVideoCount = null != (c = k.get(null != (f = e.parentFid) ? f : '')) ? c : 1;
                        return (m.length > 0 && console.log(`${r} 夸克搜索达到遍历上限（已走 ${b} 个目录、扫描 ${C} 项），结果可能不完整`), v.sort((e, t)=>{
                            let l = +(1 !== e.category), n = +(1 !== t.category);
                            return l !== n ? l - n : t.size - e.size;
                        }), v.length > 0) ? v : $.length > 0 ? (console.log(`${r} 夸克搜索：文件名无番号，靠文件夹名命中 ${$.length} 个文件`), $.sort((e, t)=>t.size - e.size || (e.name < t.name ? -1 : +(e.name > t.name))), $.slice(0, 3)) : v;
                    })();
                    if (i.length > 0) {
                        console.log(`${r} 夸克命中 ${i.length} 个文件，解析最优文件：${i[0].name}`), S.push(...yield R(e, i[0])), 0 === S.length && (A.quark = '命中但解析失败');
                        return;
                    }
                    console.log(`${r} 夸克网盘中未找到与 ${_} 匹配的视频文件，尝试分享转存`), A.quark = '网盘未搜到';
                } catch (e) {
                    console.log(`${r} 夸克源失败，已降级: ${a(e)}`), A.quark = '出错';
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
                                    kw: _,
                                    res: 'all',
                                    src: 'all'
                                })}`, d = yield Widget.http.get(u, {
                                    headers: {
                                        'User-Agent': i,
                                        Accept: 'application/json, */*'
                                    }
                                }), f = 'number' == typeof (null == d ? void 0 : d.statusCode) ? d.statusCode : 200;
                                if (f >= 400) throw Error(`HTTP ${f}: 分享索引 ${a}`);
                                let h = c(null == d ? void 0 : d.data);
                                if (!h) throw Error(`分享索引 ${a} 返回了无法解析的内容`);
                                if ('number' == typeof h.code && 0 !== h.code) throw Error(`分享索引出错: ${null != (r = h.message) ? r : `code=${h.code}`}`);
                                let g = null != (l = h.data) ? l : h, m = p(_), v = new Map(), $ = (e, t, l)=>{
                                    if (v.size >= 12) return;
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
                                    let i = String(null != l ? l : '').trim(), o = +!V(i).includes(m), a = v.get(r.pwdId);
                                    a && a.tier <= o || v.set(r.pwdId, {
                                        url: n,
                                        pwdId: r.pwdId,
                                        passcode: String(null != t ? t : '') || r.passcode,
                                        title: i,
                                        tier: o
                                    });
                                }, y = null == g || null == (n = g.merged_by_type) ? void 0 : n.quark;
                                if (Array.isArray(y)) for (let e of y)$(null == e ? void 0 : e.url, null == e ? void 0 : e.password, null != (o = null == e ? void 0 : e.note) ? o : '');
                                let k = null == g ? void 0 : g.results;
                                if (Array.isArray(k)) {
                                    let e = 0;
                                    for (let t of k){
                                        if (e++ >= 300 || v.size >= 12) break;
                                        for (let e of Array.isArray(null == t ? void 0 : t.links) ? t.links : [])null != e && e.type && 'quark' !== e.type || $(null == e ? void 0 : e.url, null == e ? void 0 : e.password, (null == e ? void 0 : e.work_title) || (null == t ? void 0 : t.title) || '');
                                    }
                                }
                                return [
                                    ...v.values()
                                ].sort((e, t)=>e.tier - t.tier);
                            })();
                        } catch (e) {
                            return console.log(`${r} 分享索引搜索失败，已跳过转存: ${a(e)}`), [];
                        }
                        if (0 === l.length) return console.log(`${r} 分享索引未找到 ${_} 的夸克分享`), [];
                        console.log(`${r} 分享索引找到 ${l.length} 个 ${_} 的夸克分享候选`);
                        let n = yield t(function*() {
                            var t, l, n, i, u;
                            let s = (null != (t = e.quarkSaveFid) ? t : '').trim();
                            if (s) return s;
                            try {
                                let e = yield Widget.storage.get(M);
                                if ('string' == typeof e && e) return e;
                            } catch (e) {}
                            try {
                                let t = (yield I(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name);
                                if (t) {
                                    try {
                                        yield Widget.storage.set(M, t.fid);
                                    } catch (e) {}
                                    return t.fid;
                                }
                                let s = '';
                                try {
                                    let { json: t } = yield O(e, 'POST', '/file', {}, {
                                        dir_init_lock: !1,
                                        dir_path: '',
                                        file_name: 'AVDB',
                                        pdir_fid: '0'
                                    });
                                    s = String(null != (l = null == t || null == (n = t.data) ? void 0 : n.fid) ? l : '');
                                } catch (e) {
                                    console.log(`${r} 创建 AVDB 文件夹失败（可能已有同名）: ${a(e)}`);
                                }
                                for(let t = 0; t < 3 && !s; t++)yield o(1000), s = null != (i = null == (u = (yield I(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name)) ? void 0 : u.fid) ? i : '';
                                if (s) {
                                    try {
                                        yield Widget.storage.set(M, s);
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
                                        let n = Date.now(), { json: r } = yield W(e, j, 'POST', '/share/sharepage/token', {
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
                                        let t = yield F(e, l, n, '0'), o = t.filter((e)=>!e.isDir);
                                        for (let i of t.filter((e)=>e.isDir).slice(0, 10))try {
                                            let t = yield F(e, l, n, i.fid);
                                            o.push(...t.filter((e)=>!e.isDir));
                                        } catch (e) {
                                            console.log(`${r} 分享子目录 ${i.name} 列取失败，跳过: ${a(e)}`);
                                        }
                                        let u = o.filter((e)=>1 === e.category || U(e.name)), s = p(i), d = u.filter((e)=>V(e.name).includes(s));
                                        return (d.length > 0 ? d : [
                                            ...u
                                        ].sort((e, t)=>t.size - e.size).slice(0, 3)).slice(0, 10);
                                    })();
                                }(e, u, l, _);
                                if (0 === s.length) {
                                    console.log(`${r} 分享候选 ${i + 1}（${u.title || u.pwdId}）内无视频文件，尝试下一个`);
                                    continue;
                                }
                                console.log(`${r} 转存候选 ${i + 1}：${u.title || u.url} → ${s.length} 个文件`);
                                let d = yield function(e, l, n, i, u) {
                                    return t(function*() {
                                        var t, s, d;
                                        let c = Date.now(), { json: f } = yield W(e, T, 'POST', '/share/sharepage/save', {
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
                                        let h = p.task_id ? String(p.task_id) : '';
                                        if (!h) return 'done';
                                        let g = Date.now();
                                        for(let t = 1; t <= 20 && !(Date.now() - g > 55000); t++){
                                            let l = 3000;
                                            try {
                                                let { json: n } = yield W(e, T, 'GET', '/task', {
                                                    uc_param_str: '',
                                                    task_id: h,
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
                                if ('pending' === d) return console.log(`${r} 转存任务仍在进行中（${_}）：本次先用其他源播放，文件落盘后下次打开将直接命中网盘`), [];
                                let c = yield function(e, l, n, i) {
                                    return t(function*() {
                                        let t = new Set(n.map((e)=>V(e))), u = p(i), s = (e)=>{
                                            let l = e.filter((e)=>!e.isDir && (1 === e.category || U(e.name))), n = l.filter((e)=>t.has(V(e.name))), r = n.length > 0 ? n : l.filter((e)=>V(e.name).includes(u));
                                            return 0 === r.length ? null : (r.sort((e, t)=>t.size - e.size), r[0]);
                                        };
                                        for(let t = 0; t < 3; t++){
                                            t > 0 && (yield o(1500));
                                            try {
                                                let t = yield I(e, l), n = s(t);
                                                if (n) return n;
                                                for (let l of t.filter((e)=>e.isDir).slice(0, 10)){
                                                    let t = yield I(e, l.fid), n = s(t);
                                                    if (n) return n;
                                                }
                                            } catch (e) {
                                                console.log(`${r} 转存后定位文件失败（第 ${t + 1} 次）: ${a(e)}`);
                                            }
                                        }
                                        return null;
                                    })();
                                }(e, n, s.map((e)=>e.name), _);
                                if (!c) return console.log(`${r} 转存已完成但暂未在网盘定位到文件（${_}），下次打开应可直接命中`), [];
                                return console.log(`${r} 转存完成并定位到文件：${c.name}`), yield R(e, c);
                            } catch (e) {
                                console.log(`${r} 分享候选 ${i + 1} 转存失败，尝试下一个: ${a(e)}`);
                            }
                        }
                        return console.log(`${r} 分享转存全部候选失败（${_}）`), [];
                    })()), 0 === S.length && (A.share = 'off' === e.shareIndexEnabled ? '未开启' : '索引无此片');
                } catch (e) {
                    console.log(`${r} 分享转存失败，已降级: ${a(e)}`), A.share = '出错';
                }
            })(), B = ()=>t(function*() {
                try {
                    let e = yield t(function*() {
                        var e;
                        let t, { sig: l, sts: n } = function() {
                            let e = Q(String(Date.now())), t = e.substr(e.length - 12, 10), l = 1;
                            for(let e = 0; e < 10; e++)l += t.charCodeAt(e) * e * 1743;
                            return {
                                sig: t,
                                sts: l
                            };
                        }(), o = `${K}/hls/get_video_info.php?id=${encodeURIComponent(_)}&sig=${l}&sts=${n}`, a = yield d(o, {
                            'User-Agent': i,
                            Accept: 'application/json,text/plain,*/*',
                            Referer: `${K}/embed/${encodeURIComponent(_)}`
                        }), u = a.includes('for (;;);') ? a.split('for (;;);')[1] : a;
                        try {
                            t = JSON.parse(u);
                        } catch (e) {
                            return console.log(`${r} MemoJav 接口返回无法解析: ${a.slice(0, 120)}`), [];
                        }
                        if (!t.success || !t.url) return console.log(`${r} MemoJav 无 ${_}${t.reason ? `（${t.reason}）` : ''}`), [];
                        let s = decodeURIComponent(t.url);
                        return 'mp4' === t.type && (s += '=m37'), console.log(`${r} MemoJav 命中 ${_}（${null != (e = t.type) ? e : 'hls'}）`), [
                            {
                                name: 'MemoJav',
                                description: `${K}/video/${_}`,
                                url: s
                            }
                        ];
                    })();
                    P.push(...e), 0 === e.length && (A.memo = '无此片');
                } catch (e) {
                    console.log(`${r} MemoJav 源失败，已降级: ${a(e)}`), A.memo = '出错';
                }
                try {
                    let e = yield t(function*() {
                        var e, t, l, n, o;
                        let a, s = _.toLowerCase(), c = s.replace(/-/g, ''), f = `${H}/search/${encodeURIComponent(s)}/`, p = yield d(f, {
                            'User-Agent': i,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: `${H}/`
                        });
                        if (y(p)) return console.log(`${r} Jable 搜索被 Cloudflare 验证页拦截`), [];
                        let h = new Set(), g = /href\s*=\s*["']((?:https:\/\/jable\.tv)?\/videos\/[\w-]+\/?)["']/gi;
                        for(; null !== (a = g.exec(p));)h.add(u(H, a[1]));
                        let m = [
                            ...h
                        ], v = null != (e = null != (t = m.find((e)=>e.toLowerCase().includes(s))) ? t : m.find((e)=>e.toLowerCase().replace(/-/g, '').includes(c))) ? e : m[0];
                        if (!v) return console.log(`${r} Jable 未找到 ${_} 的视频页`), [];
                        let $ = yield d(v, {
                            'User-Agent': i,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: f
                        });
                        if (y($)) return console.log(`${r} Jable 视频页被 Cloudflare 验证页拦截`), [];
                        let k = null != (l = null == (n = /var\s+hlsUrl\s*=\s*'([^']+)'/.exec($)) ? void 0 : n[1]) ? l : null == (o = /var\s+hlsUrl\s*=\s*"([^"]+)"/.exec($)) ? void 0 : o[1];
                        return k ? [
                            {
                                name: 'Jable',
                                description: v,
                                url: k,
                                customHeaders: {
                                    Referer: v,
                                    'User-Agent': i
                                }
                            }
                        ] : (console.log(`${r} Jable 视频页未解析到 hlsUrl: ${v}`), []);
                    })();
                    P.push(...e), 0 === e.length && (A.jable = '无结果或被拦');
                } catch (e) {
                    console.log(`${r} Jable 源失败，已降级: ${a(e)}`), A.jable = '出错';
                }
            })();
        yield t(function*() {
            var l, n, i;
            if ('' !== (null != (l = e.alistBase) ? l : '').trim() && '' !== (null != (n = e.alistToken) ? n : '').trim()) try {
                let l = yield t(function*() {
                    var l, n;
                    let i, o = new Set([
                        p(_)
                    ]), u = /FC2-PPV-(\d+)/.exec(_);
                    u && o.add(`FC2${u[1]}`);
                    let s = (i = (null != (l = e.alistRoot) ? l : '').trim(), '' === i ? '/夸克' : '/' === i ? '/' : (i.startsWith('/') ? i : `/${i}`).replace(/\/+$/, '')), d = [
                        s
                    ], c = new Map([
                        [
                            s,
                            s
                        ]
                    ]), f = [], h = [], g = 0, m = 0;
                    for(; d.length > 0 && g < 120 && m < 4000;){
                        let l, i = d.shift();
                        g++;
                        try {
                            l = yield function(e, l) {
                                return t(function*() {
                                    let t = [], n = 1;
                                    for(;;){
                                        var r, i, o, a;
                                        let u = yield Z(e, '/api/fs/list', {
                                            path: l,
                                            password: '',
                                            page: n,
                                            per_page: 100,
                                            refresh: !1
                                        }), s = Array.isArray(null == u ? void 0 : u.content) ? u.content : [];
                                        for (let e of s){
                                            let n = String(null != (i = null == e ? void 0 : e.name) ? i : '');
                                            n && t.push({
                                                path: `${'/' === l ? '' : l}/${n}`,
                                                name: n,
                                                size: Number(null != (o = null == e ? void 0 : e.size) ? o : 0) || 0,
                                                sign: String(null != (a = null == e ? void 0 : e.sign) ? a : ''),
                                                isDir: (null == e ? void 0 : e.is_dir) === !0
                                            });
                                        }
                                        let d = Number(null != (r = null == u ? void 0 : u.total) ? r : t.length);
                                        if (0 === s.length || t.length >= d || s.length < 100 || ++n > 50) break;
                                    }
                                    return t;
                                })();
                            }(e, i);
                        } catch (e) {
                            console.log(`${r} AList 目录 ${i} 列取失败，跳过: ${a(e)}`);
                            continue;
                        }
                        for (let e of l){
                            if (m++, e.isDir) {
                                c.set(e.path, e.name), d.push(e.path);
                                continue;
                            }
                            if (!U(e.name)) continue;
                            let t = V(e.name), l = !1;
                            for (let e of o)if (e && t.includes(e)) {
                                l = !0;
                                break;
                            }
                            if (l) {
                                f.push(e);
                                continue;
                            }
                            let r = V(null != (n = c.get(i)) ? n : '');
                            if (r) {
                                for (let t of o)if (t && r.includes(t)) {
                                    h.push(e);
                                    break;
                                }
                            }
                        }
                    }
                    return (f.sort((e, t)=>t.size - e.size), f.length > 0) ? f : (h.sort((e, t)=>t.size - e.size), h.slice(0, 3));
                })();
                if (0 === l.length) {
                    console.log(`${r} AList 库中未找到与 ${_} 匹配的视频文件`), A.alist = '未找到';
                    return;
                }
                console.log(`${r} AList 命中 ${l.length} 个文件，解析最优文件：${l[0].path}`), D.push(...yield (i = l[0], t(function*() {
                    var t, l, n;
                    let o = G(e), u = i.path.split('/').map((e)=>encodeURIComponent(e)).join('/'), s = E(i.size), d = `${i.name}${s ? ` · ${s}` : ''}`, c = [], f = (null != (t = e.alistUser) ? t : '').trim();
                    f && c.push({
                        name: 'WebDAV原画',
                        description: `${d} · 经 AList WebDAV 播放`,
                        url: `${o}/dav${u}`,
                        customHeaders: {
                            Authorization: `Basic ${function(e) {
                                let t = '';
                                for(let l = 0; l < e.length; l++){
                                    let n = e.charCodeAt(l);
                                    n < 0x80 ? t += String.fromCharCode(n) : n < 0x800 ? t += String.fromCharCode(0xc0 | n >> 6, 0x80 | 0x3f & n) : n >= 0xd800 && n <= 0xdbff && l + 1 < e.length ? t += String.fromCharCode(0xf0 | (n = 0x10000 + ((n - 0xd800) * 0x400 + (e.charCodeAt(++l) - 0xdc00))) >> 18, 0x80 | n >> 12 & 0x3f, 0x80 | n >> 6 & 0x3f, 0x80 | 0x3f & n) : t += String.fromCharCode(0xe0 | n >> 12, 0x80 | n >> 6 & 0x3f, 0x80 | 0x3f & n);
                                }
                                return Q(t);
                            }(`${f}:${null != (l = e.alistPass) ? l : ''}`)}`
                        }
                    }), i.sign && c.push({
                        name: 'AList代理原画',
                        description: `${d} · 经 AList 代理播放`,
                        url: `${o}/p${u}?sign=${encodeURIComponent(i.sign)}`
                    });
                    try {
                        let t = yield Z(e, '/api/fs/get', {
                            path: i.path,
                            password: ''
                        }), l = String(null != (n = null == t ? void 0 : t.raw_url) ? n : '');
                        l && c.push({
                            name: 'AList直链原画',
                            description: `${d} · AList 给出的源文件直链`,
                            url: l
                        });
                    } catch (e) {
                        console.log(`${r} AList fs/get 失败（直链跳过）: ${a(e)}`);
                    }
                    return c;
                })())), 0 === D.length && (A.alist = '命中但无可用链接');
            } catch (e) {
                console.log(`${r} AList 源失败，已降级: ${a(e)}`), A.alist = '出错';
            }
        })(), w ? (yield B(), yield q()) : (yield q(), yield B());
        let J = [
            ...D,
            ...S
        ], z = w ? [
            ...P,
            ...J
        ] : [
            ...J,
            ...P
        ];
        return console.log(`${r} loadResource ${_}：共 ${z.length} 条播放线路`), z.length > 0 ? z : (C = (t)=>{
            var l;
            return {
                name: t,
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != (l = e.link) ? l : 'https://javdb.com'
            };
        }, x = [], A.alist && x.push(C(`诊断·AList：${A.alist}`)), A.quark && x.push(C(`诊断·夸克：${A.quark}`)), A.share && x.push(C(`诊断·转存：${A.share}`)), A.jable && x.push(C(`诊断·Jable：${A.jable}`)), A.memo && x.push(C(`诊断·MemoJav：${A.memo}`)), x);
    })();
