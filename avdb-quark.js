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
function r(e) {
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
}
function l(e, t) {
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
}
WidgetMetadata = {
    id: 'v7777-avdb-quark',
    title: 'AVDB夸克版',
    description: "JavDB 浏览（最新/Top250/热播与分类榜单/搜索/详情）+ 夸克网盘播放：先按番号搜自己的网盘，未命中时自动搜分享索引并转存到网盘再播，另有 MemoJav / Jable 外部源兜底。使用前请在全局参数中填写自己的夸克网盘 Cookie；如需 JavDB 磁力，请填「JavDB Cookie」（从已登录的浏览器复制）。JavDB 本站对部分地区 IP 有限制，若列表为空请检查代理节点地区（建议非日本节点）。",
    author: 'v7777',
    site: 'https://javdb.com',
    version: "0.3.10",
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
let n = '[AVDB夸克版]', i = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
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
    let r = String(t).trim();
    if (!r) return '';
    if (/^https?:\/\//i.test(r)) return r;
    if (r.startsWith('//')) return `https:${r}`;
    let l = /^(https?:\/\/[^/]+)/i.exec(e), n = l ? l[1] : e.replace(/\/+$/, '');
    if (r.startsWith('/')) return n + r;
    let i = e.split(/[?#]/)[0];
    return i.slice(0, i.lastIndexOf('/') + 1) + r;
}
function s(e) {
    return Object.keys(e).map((t)=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join('&');
}
function d(e, r) {
    return t(function*() {
        let t = yield Widget.http.get(e, {
            headers: r
        }), l = 'number' == typeof (null == t ? void 0 : t.statusCode) ? t.statusCode : 200;
        if (l >= 400) throw Error(`HTTP ${l}: ${e}`);
        let n = null == t ? void 0 : t.data;
        return 'string' == typeof n ? n : null == n ? '' : String(n);
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
    let t = String(e).toUpperCase().replace(/[^A-Z0-9-]/g, ''), r = /FC2(?:-PPV)?-?(\d{5,7})/.exec(t);
    if (r) return `FC2-PPV-${r[1]}`;
    let l = /([A-Z]{2,6})-?(\d{2,5})/.exec(t);
    return l ? `${l[1]}-${l[2]}` : null;
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
function v(e) {
    return t(function*() {
        try {
            if (!e || 'string' != typeof e.javdbCookie) return;
            let t = e.javdbCookie.trim();
            t ? yield Widget.storage.set(m, t) : yield Widget.storage.remove(m);
        } catch (e) {}
    })();
}
function y(e) {
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
function b(e, r) {
    return t(function*() {
        let t, l = yield d(e, (t = {
            'User-Agent': i,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${h}/`
        }, r && (t.Cookie = r), t));
        if ($(l)) throw new k(e);
        return l;
    })();
}
function x(e, r) {
    return t(function*() {
        let t = yield Widget.html.load(e), l = t('a.box');
        0 === l.length && (l = t('.movie-list a.box, .grid a.box'));
        let n = [], i = new Set();
        return l.each((e, l)=>{
            var o, a, s, d, c;
            let p = t(l), h = u(r, null != (o = p.attr('href')) ? o : '');
            if (!h || i.has(h)) return;
            i.add(h);
            let m = p.find('.video-title strong').first().text().trim(), v = (null != (a = p.attr('title')) ? a : '').trim(), y = p.find('.video-title').first().text().trim(), $ = null != (s = f(m)) ? s : g(v, y), k = v || y || $ || h, b = null != (d = null != (c = p.find('img').first().attr('src')) ? c : p.find('img').first().attr('data-src')) ? d : '';
            b = u(r, b);
            let x = p.find('.score').first().text(), _ = /(\d+(?:\.\d+)?)\s*分/.exec(x), C = p.find('.meta').first().text().trim(), w = /(\d{4}-\d{2}-\d{2})/.exec(C);
            n.push({
                id: null != $ ? $ : h,
                type: 'detail',
                title: k,
                link: h,
                posterPath: b || void 0,
                coverUrl: b || void 0,
                backdropPath: b || void 0,
                rating: _ ? _[1] : void 0,
                releaseDate: w ? w[1] : void 0,
                mediaType: 'movie'
            });
        }), n;
    })();
}
function _(e) {
    var t;
    let r = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(e), l = (null != (t = null == r ? void 0 : r[1]) ? t : '').replace(/\s+/g, ' ').trim().slice(0, 60) || '(无标题)', n = e.includes('/login') || e.includes('sign_in') || e.includes('登录');
    return `title=${l}, login标记=${n ? '有' : '无'}`;
}
function C(e, r) {
    return t(function*() {
        try {
            let t = yield b(e), l = yield x(t, e);
            if (console.log(`${n} JavDB ${r}：${l.length} 条`), l.length > 0) return l;
            let i = yield y();
            if (i) {
                console.log(`${n} JavDB ${r} 匿名解析为空，带 Cookie 重试`);
                try {
                    let t = yield b(e, i), l = yield x(t, e);
                    return console.log(`${n} JavDB ${r}(Cookie重试)：${l.length} 条`), 0 === l.length && console.log(`${n} JavDB ${r}未解析到条目：页面结构可能已变化，或该页需要登录/VIP（页面提示：${_(t)}）`), l;
                } catch (e) {
                    return console.log(`${n} JavDB ${r}(Cookie重试)失败，已降级为空: ${a(e)}`), [];
                }
            }
            return console.log(`${n} JavDB ${r}未解析到条目：页面结构可能已变化，或该页需要登录/VIP（页面提示：${_(t)}）`), l;
        } catch (e) {
            return console.log(`${n} JavDB ${r}失败，已降级为空: ${a(e)}`), [];
        }
    })();
}
function w(e) {
    let t = (null != e ? e : '').trim().toLowerCase();
    return 'weekly' === t || 'monthly' === t ? t : 'daily';
}
function D(e, r, l) {
    return t(function*() {
        yield v(e);
        let t = w(e.period);
        return C(`${h}/rankings/movies?${s({
            p: t,
            t: r
        })}`, `${l}(${t})`);
    })();
}
function S(e) {
    return e.replace(/[:：\s]/g, '');
}
function A(e, t) {
    return e.find((e)=>t.includes(e.label));
}
loadHome = (e)=>t(function*() {
        yield v(e);
        let t = e.genreId || e.peopleId || '';
        return t ? C(u(h, t), '分类/演员列表') : C(`${h}/`, '首页最新');
    })(), loadTop250 = (e)=>t(function*() {
        var t;
        yield v(e);
        let r = (null != (t = e.ranking_type) ? t : '').trim();
        return r && 'all' !== r && console.log(`${n} Top250 ranking_type=${r}：年份筛选形式无公开出处，按全部年份处理`), C(`${h}/rankings/top`, 'Top250');
    })(), loadPlayback = (e)=>t(function*() {
        yield v(e);
        let t = w(e.period);
        if ('monthly' !== t) return C(`${h}/rankings/playback`, `热播榜(${t})`);
        let r = yield C(`${h}/rankings/playback?p=monthly`, '热播榜(monthly)');
        return r.length > 0 ? r : (console.log(`${n} 热播榜(monthly) ?p=monthly 无结果，回退裸路径 /rankings/playback`), C(`${h}/rankings/playback`, '热播榜(monthly回退)'));
    })(), loadCensored = (e)=>t(function*() {
        return D(e, 'censored', '有码榜');
    })(), loadUncensored = (e)=>t(function*() {
        return D(e, 'uncensored', '无码榜');
    })(), loadWestern = (e)=>t(function*() {
        return D(e, 'western', '欧美榜');
    })(), loadFC2 = (e)=>t(function*() {
        yield v(e);
        let t = w(e.period);
        return C(`${h}/rankings/movies?${s({
            p: t,
            t: 'fc2'
        })}`, `FC2榜(${t})`);
    })(), searchVideos = (e)=>t(function*() {
        var t, r, l;
        yield v(e);
        let i = (null != (t = null != (r = null != (l = e.keyword) ? l : e.title) ? r : e.query) ? t : '').trim();
        return i ? C(`${h}/search?${s({
            q: i,
            f: 'all'
        })}`, `搜索「${i}」`) : (console.log(`${n} 搜索关键词为空`), []);
    })(), loadDetail = (e, r)=>t(function*() {
        let t;
        if (!e) return null;
        yield v(r);
        let l = yield y(r);
        try {
            t = yield b(e, l);
        } catch (e) {
            return console.log(`${n} JavDB 详情获取失败: ${a(e)}`), null;
        }
        try {
            var i, o, s, d, c, p, h, m, $;
            let r, a, v, y = yield Widget.html.load(t), k = function(e) {
                let t = e('nav.panel.movie-panel-info').first(), r = [];
                if (0 === t.length) return r;
                let l = t.find('> div, .panel-block'), n = new Set();
                return l.each((t, l)=>{
                    if (n.has(l)) return;
                    n.add(l);
                    let i = e(l), o = i.find('strong').first();
                    if (0 === o.length) return;
                    let a = S(o.text());
                    if (!a) return;
                    let u = i.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
                    r.push({
                        label: a,
                        valueText: u,
                        $row: i
                    });
                }), r;
            }(y), b = null, x = A(k, [
                '番號',
                '番号'
            ]);
            if (x && (b = f(x.valueText)), !b) {
                let e = y('nav.panel.movie-panel-info div span').first().text();
                b = f(e);
            }
            b || (b = g(y('title').first().text()));
            let _ = y('h2 strong.current-title').first().text().trim(), C = y('h2 span.origin-title').first().text().trim(), w = null != (i = y('meta[property="og:title"]').attr('content')) ? i : '', D = _ || w || b || e, j = null != (o = y('img.video-cover').first().attr('src')) ? o : '';
            j || (j = null != (s = y('meta[property="og:image"]').attr('content')) ? s : ''), j = u(e, j);
            let q = A(k, [
                '日期'
            ]), P = q ? null == (h = /(\d{4}-\d{2}-\d{2})/.exec(q.valueText)) ? void 0 : h[1] : void 0, T = A(k, [
                '時長',
                '时长'
            ]);
            if (T) {
                a = T.valueText;
                let e = /(\d+)\s*分/.exec(T.valueText);
                e && (r = 60 * Number(e[1]));
            }
            let J = y('.score-stars').first();
            if (J.length > 0) {
                let e = (J.parent().text() || '').replace(/\s+/g, ' ');
                v = null == (m = /(\d+(?:\.\d+)?)\s*分/.exec(e)) ? void 0 : m[1];
            }
            if (!v) {
                let e = A(k, [
                    '評分',
                    '评分'
                ]);
                e && (v = null == ($ = /(\d+(?:\.\d+)?)/.exec(e.valueText)) ? void 0 : $[1]);
            }
            let B = [], O = A(k, [
                '類別',
                '类别'
            ]);
            O && O.$row.find('a').each((e, t)=>{
                var r;
                let l = y(t), n = null != (r = l.attr('href')) ? r : '', i = l.text().trim();
                i && B.push({
                    id: n || i,
                    title: i
                });
            });
            let I = (function(e, t) {
                let r = A(t, [
                    '演員',
                    '演员'
                ]);
                if (!r) return [];
                let l = [];
                r.$row.find('a, strong').each((t, r)=>{
                    var n, i;
                    let o = e(r), a = null != (n = r.tagName) ? n : '';
                    'a' === a ? l.push({
                        kind: 'a',
                        text: o.text().trim(),
                        href: null != (i = o.attr('href')) ? i : ''
                    }) : 'strong' === a && l.push({
                        kind: 'strong',
                        text: o.text().trim(),
                        href: ''
                    });
                });
                let n = !1, i = [];
                for (let e of l){
                    if ('strong' === e.kind && !n && S(e.text) === r.label) {
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
            })(y, k).map((e)=>({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                })), z = new Set();
            y('a[href^="magnet:"]').each((e, t)=>{
                var r;
                let l = (null != (r = y(t).attr('href')) ? r : '').replace(/\[javdb\.com\]$/i, '');
                l && z.add(l);
            });
            let W = [
                ...z
            ], U = [];
            y('a.tile-item[data-fancybox="gallery"]').each((t, r)=>{
                let l = u(e, y(r).attr('href'));
                l && U.push(l);
            });
            let E = null != (d = y('video#preview-video source').first().attr('src')) ? d : '';
            E.startsWith('//') && (E = `https:${E}`);
            let N = [];
            b && N.push(`番号：${b}`), C && C !== D && N.push(`原标题：${C}`);
            let M = A(k, [
                '片商',
                '賣家',
                '卖家'
            ]);
            (null == M ? void 0 : M.valueText) && N.push(`片商：${M.valueText}`);
            let R = A(k, [
                '發行',
                '发行'
            ]);
            (null == R ? void 0 : R.valueText) && N.push(`发行：${R.valueText}`);
            let V = A(k, [
                '系列'
            ]);
            (null == V ? void 0 : V.valueText) && N.push(`系列：${V.valueText}`);
            let F = A(k, [
                '導演',
                '导演'
            ]);
            if ((null == F ? void 0 : F.valueText) && N.push(`导演：${F.valueText}`), W.length > 0) for (let e of (N.push(`磁力链接：共 ${W.length} 条`), W.slice(0, 3)))N.push(e);
            else l ? N.push('磁力链接：未获取（已带 JavDB Cookie，仍无磁力——该条目可能无磁力，或 Cookie 已失效）') : N.push('磁力链接：未获取（JavDB 仅对登录用户展示磁力，请在全局参数填写「JavDB Cookie」）');
            let L = {
                id: null != b ? b : e,
                type: 'detail',
                title: D,
                link: e,
                posterPath: j || void 0,
                detailPoster: j || void 0,
                coverUrl: j || void 0,
                backdropPath: null != (c = null != (p = U[0]) ? p : j) ? c : void 0,
                backdropPaths: U.length > 0 ? U : void 0,
                releaseDate: P,
                rating: v,
                duration: r,
                durationText: a,
                genreTitle: B.map((e)=>e.title).join(' · ') || void 0,
                genreItems: B.length > 0 ? B : void 0,
                peoples: I.length > 0 ? I : void 0,
                previewUrl: E || void 0,
                trailers: E ? [
                    {
                        url: E,
                        coverUrl: j || void 0
                    }
                ] : void 0,
                description: N.join('\n'),
                mediaType: 'movie'
            };
            return console.log(`${n} JavDB 详情完成：${null != b ? b : '(番号未知)'}，演员 ${I.length}，类别 ${B.length}，磁力 ${W.length}`), L;
        } catch (e) {
            return console.log(`${n} JavDB 详情解析失败: ${a(e)}`), null;
        }
    })();
let j = 'https://drive-h.quark.cn/1/clouddrive', q = 'https://drive-pc.quark.cn/1/clouddrive', P = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch', T = 'https://pan.quark.cn', J = 'quark_cookie_dyn', B = 'quark_cookie_base_fp';
function O(e) {
    let t = 5381;
    for(let r = 0; r < e.length; r++)t = (t << 5) + t + e.charCodeAt(r) | 0;
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
function z(e, l, n, i, o, a, u) {
    return t(function*() {
        var d, f;
        let p, g = yield t(function*() {
            var t;
            let r = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!r) return '';
            try {
                if ((yield Widget.storage.get(B)) === O(r)) {
                    let e = yield Widget.storage.get(J);
                    if ('string' == typeof e && e.trim()) return e;
                }
            } catch (e) {}
            return r;
        })();
        if (!g) throw Error('未填写夸克网盘 Cookie（模块全局参数 quarkCookie）');
        let h = s(r({
            pr: 'ucpro',
            fr: 'pc'
        }, o)), m = `${l}${i}?${h}`, v = {
            Cookie: g,
            Accept: 'application/json, text/plain, */*',
            Referer: null != u ? u : T,
            'User-Agent': P
        };
        p = 'GET' === n ? yield Widget.http.get(m, {
            headers: v
        }) : yield Widget.http.post(m, null != a ? a : {}, {
            headers: v
        }), yield (d = null == p ? void 0 : p.headers, t(function*() {
            try {
                var t, r;
                let l = (null != (t = e.quarkCookie) ? t : '').trim();
                if (!l || !d) return;
                let n = null != (r = d['set-cookie']) ? r : d['Set-Cookie'];
                if (!n) return;
                Array.isArray(n) || (n = [
                    n
                ]);
                let i = g, o = !1;
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
                o && (yield Widget.storage.set(J, i), yield Widget.storage.set(B, O(l)));
            } catch (e) {}
        })());
        let y = 'number' == typeof (null == p ? void 0 : p.statusCode) ? p.statusCode : 200;
        if (y >= 400) throw Error(`HTTP ${y}: 夸克接口 ${i}`);
        let $ = c(null == p ? void 0 : p.data);
        if (!$) throw Error(`夸克接口 ${i} 返回了无法解析的内容`);
        if ('number' == typeof $.status && $.status >= 400 || void 0 !== $.code && 0 !== $.code) throw Error(`夸克接口 ${i} 出错: ${null != (f = $.message) ? f : `code=${$.code}`}`);
        return {
            json: $,
            cookieSent: g
        };
    })();
}
function W(e, r, l, n, i) {
    return t(function*() {
        return z(e, 'https://drive.quark.cn/1/clouddrive', r, l, n, i);
    })();
}
function U(e, r) {
    return t(function*() {
        let t = [], l = 1;
        for(; l <= 20; l++){
            var n, i, o, a;
            let { json: u } = yield W(e, 'GET', '/file/sort', {
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
function E(e) {
    let t = e.lastIndexOf('.');
    return !(t < 0) && I.has(e.slice(t + 1).toLowerCase());
}
function N(e) {
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
function R(e, r) {
    return t(function*() {
        var t, l, i, o;
        let u = [], s = '';
        try {
            let { json: n } = yield W(e, 'POST', '/file/v2/play/project', {}, {
                fid: r.fid,
                resolutions: 'low,normal,high,super,2k,4k',
                supports: 'fmp4_av,m3u8,dolby_vision'
            }), i = (Array.isArray(null == n || null == (t = n.data) ? void 0 : t.video_list) ? n.data.video_list : []).filter((e)=>{
                var t;
                return null == e || null == (t = e.video_info) ? void 0 : t.url;
            });
            if (i.length > 0) for (let e of i.sort((e, t)=>{
                var r, l, n, i;
                return (null != (r = M[String(null != (l = null == t ? void 0 : t.resolution) ? l : '').toLowerCase()]) ? r : 0) - (null != (n = M[String(null != (i = null == e ? void 0 : e.resolution) ? i : '').toLowerCase()]) ? n : 0);
            }).slice(0, 3))u.push({
                name: `夸克转码 ${String(null != (l = e.resolution) ? l : '').toUpperCase()}`,
                description: r.name,
                url: String(e.video_info.url)
            });
            else s = '转码已关闭（夸克接口变更）';
        } catch (e) {
            s = '转码已关闭（夸克接口变更）';
        }
        try {
            let { json: t, cookieSent: l } = yield W(e, 'POST', '/file/download', {}, {
                fids: [
                    r.fid
                ]
            }), n = null == t || null == (o = t.data) || null == (i = o[0]) ? void 0 : i.download_url;
            n && u.push({
                name: '夸克原画',
                description: [
                    r.name,
                    function(e) {
                        if (!e) return '';
                        let t = e / 1073741824;
                        return t >= 1 ? `${t.toFixed(2)} GB` : `${(e / 1048576).toFixed(1)} MB`;
                    }(r.size),
                    s
                ].filter(Boolean).join(' · '),
                url: String(n),
                customHeaders: {
                    Cookie: l,
                    Referer: T,
                    'User-Agent': P
                }
            });
        } catch (e) {
            console.log(`${n} 夸克原画链接获取失败（${r.name}）: ${a(e)}`);
        }
        return u;
    })();
}
let V = 'quark_avdb_folder_fid';
function F(e, r, l, n) {
    return t(function*() {
        let t = [];
        for(let u = 1; u <= 4; u++){
            var i, o, a;
            let { json: s } = yield z(e, j, 'GET', '/share/sharepage/detail', {
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
let L = 'https://jable.tv', H = 'https://memojav.org';
loadResource = (e)=>t(function*() {
        var f, h, m, y, k, b;
        let x, _;
        console.log(`${n} loadResource 被调用（id=${null != (f = e.id) ? f : ''}，title=${null != (h = e.title) ? h : ''}，link=${null != (m = e.link) ? m : ''}）`);
        let C = {
            quark: '',
            share: '',
            jable: '',
            memo: ''
        }, w = g(e.id, e.title, e.seriesName, e.link);
        if (!w) return console.log(`${n} loadResource 未能从参数中提取番号（id=${null != (y = e.id) ? y : ''}，title=${null != (k = e.title) ? k : ''}），返回空`), [
            {
                name: '诊断·番号：未能识别',
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != (b = e.link) ? b : 'https://javdb.com'
            }
        ];
        yield v(e);
        let D = 'external-first' === e.sourcePriority, S = [], A = [], P = ()=>t(function*() {
                var u;
                try {
                    if (!(null != (u = e.quarkCookie) ? u : '').trim()) {
                        console.log(`${n} 未填写夸克 Cookie，跳过夸克网盘源`), C.quark = '未填Cookie';
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
                        ], v = [], y = [], $ = new Map(), k = new Map(), b = 0, x = 0;
                        for(; m.length > 0 && b < 60 && x < 4000;){
                            let s, d = m.shift();
                            b++;
                            try {
                                s = yield U(e, d);
                            } catch (e) {
                                console.log(`${n} 夸克目录 ${d} 列取失败，跳过: ${a(e)}`);
                                continue;
                            }
                            for (let e of s){
                                if (x++, e.isDir) {
                                    $.set(e.fid, e.name), m.push(e.fid);
                                    continue;
                                }
                                if (1 !== e.category && !E(e.name)) continue;
                                k.set(d, (null != (t = k.get(d)) ? t : 0) + 1);
                                let n = N(e.name), a = !1;
                                for (let e of g)if (e && n.includes(e)) {
                                    a = !0;
                                    break;
                                }
                                if (a) {
                                    v.push(l(r({}, e), {
                                        parentFid: d,
                                        parentName: null != (o = $.get(d)) ? o : ''
                                    }));
                                    continue;
                                }
                                let s = N(null != (i = $.get(d)) ? i : '');
                                if (s) {
                                    for (let t of g)if (t && s.includes(t)) {
                                        y.push(l(r({}, e), {
                                            parentFid: d,
                                            parentName: null != (u = $.get(d)) ? u : ''
                                        }));
                                        break;
                                    }
                                }
                            }
                        }
                        for (let e of v)e.parentVideoCount = null != (s = k.get(null != (d = e.parentFid) ? d : '')) ? s : 1;
                        for (let e of y)e.parentVideoCount = null != (c = k.get(null != (f = e.parentFid) ? f : '')) ? c : 1;
                        return (m.length > 0 && console.log(`${n} 夸克搜索达到遍历上限（已走 ${b} 个目录、扫描 ${x} 项），结果可能不完整`), v.sort((e, t)=>{
                            let r = +(1 !== e.category), l = +(1 !== t.category);
                            return r !== l ? r - l : t.size - e.size;
                        }), v.length > 0) ? v : y.length > 0 ? (console.log(`${n} 夸克搜索：文件名无番号，靠文件夹名命中 ${y.length} 个文件`), y.sort((e, t)=>t.size - e.size || (e.name < t.name ? -1 : +(e.name > t.name))), y.slice(0, 3)) : v;
                    })();
                    if (i.length > 0) {
                        console.log(`${n} 夸克命中 ${i.length} 个文件，解析最优文件：${i[0].name}`), S.push(...yield R(e, i[0])), 0 === S.length && (C.quark = '命中但解析失败');
                        return;
                    }
                    console.log(`${n} 夸克网盘中未找到与 ${w} 匹配的视频文件，尝试分享转存`), C.quark = '网盘未搜到';
                } catch (e) {
                    console.log(`${n} 夸克源失败，已降级: ${a(e)}`), C.quark = '出错';
                    return;
                }
                try {
                    S.push(...yield t(function*() {
                        let r;
                        if ('off' === e.shareIndexEnabled) return console.log(`${n} 分享索引搜索已关闭，跳过转存`), [];
                        try {
                            r = yield t(function*() {
                                var t, r, l, n, o;
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
                                if ('number' == typeof g.code && 0 !== g.code) throw Error(`分享索引出错: ${null != (n = g.message) ? n : `code=${g.code}`}`);
                                let h = null != (r = g.data) ? r : g, m = p(w), v = new Map(), y = (e, t, r)=>{
                                    if (v.size >= 12) return;
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
                                    let i = String(null != r ? r : '').trim(), o = +!N(i).includes(m), a = v.get(n.pwdId);
                                    a && a.tier <= o || v.set(n.pwdId, {
                                        url: l,
                                        pwdId: n.pwdId,
                                        passcode: String(null != t ? t : '') || n.passcode,
                                        title: i,
                                        tier: o
                                    });
                                }, $ = null == h || null == (l = h.merged_by_type) ? void 0 : l.quark;
                                if (Array.isArray($)) for (let e of $)y(null == e ? void 0 : e.url, null == e ? void 0 : e.password, null != (o = null == e ? void 0 : e.note) ? o : '');
                                let k = null == h ? void 0 : h.results;
                                if (Array.isArray(k)) {
                                    let e = 0;
                                    for (let t of k){
                                        if (e++ >= 300 || v.size >= 12) break;
                                        for (let e of Array.isArray(null == t ? void 0 : t.links) ? t.links : [])null != e && e.type && 'quark' !== e.type || y(null == e ? void 0 : e.url, null == e ? void 0 : e.password, (null == e ? void 0 : e.work_title) || (null == t ? void 0 : t.title) || '');
                                    }
                                }
                                return [
                                    ...v.values()
                                ].sort((e, t)=>e.tier - t.tier);
                            })();
                        } catch (e) {
                            return console.log(`${n} 分享索引搜索失败，已跳过转存: ${a(e)}`), [];
                        }
                        if (0 === r.length) return console.log(`${n} 分享索引未找到 ${w} 的夸克分享`), [];
                        console.log(`${n} 分享索引找到 ${r.length} 个 ${w} 的夸克分享候选`);
                        let l = yield t(function*() {
                            var t, r, l, i, u;
                            let s = (null != (t = e.quarkSaveFid) ? t : '').trim();
                            if (s) return s;
                            try {
                                let e = yield Widget.storage.get(V);
                                if ('string' == typeof e && e) return e;
                            } catch (e) {}
                            try {
                                let t = (yield U(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name);
                                if (t) {
                                    try {
                                        yield Widget.storage.set(V, t.fid);
                                    } catch (e) {}
                                    return t.fid;
                                }
                                let s = '';
                                try {
                                    let { json: t } = yield W(e, 'POST', '/file', {}, {
                                        dir_init_lock: !1,
                                        dir_path: '',
                                        file_name: 'AVDB',
                                        pdir_fid: '0'
                                    });
                                    s = String(null != (r = null == t || null == (l = t.data) ? void 0 : l.fid) ? r : '');
                                } catch (e) {
                                    console.log(`${n} 创建 AVDB 文件夹失败（可能已有同名）: ${a(e)}`);
                                }
                                for(let t = 0; t < 3 && !s; t++)yield o(1000), s = null != (i = null == (u = (yield U(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name)) ? void 0 : u.fid) ? i : '';
                                if (s) {
                                    try {
                                        yield Widget.storage.set(V, s);
                                    } catch (e) {}
                                    return console.log(`${n} 转存目标：网盘根目录下的 AVDB 文件夹`), s;
                                }
                            } catch (e) {
                                console.log(`${n} 解析转存目标目录失败: ${a(e)}`);
                            }
                            return console.log(`${n} 转存目标文件夹 AVDB 不可用，改存网盘根目录`), '0';
                        })(), u = Math.min(3, r.length);
                        for(let i = 0; i < u; i++){
                            let u = r[i];
                            try {
                                let r = yield function(e, r) {
                                    return t(function*() {
                                        var t;
                                        let l = Date.now(), { json: n } = yield z(e, j, 'POST', '/share/sharepage/token', {
                                            __dt: String(l % 1000),
                                            __t: String(l)
                                        }, {
                                            pwd_id: r.pwdId,
                                            passcode: r.passcode
                                        }, `https://pan.quark.cn/s/${r.pwdId}`), i = null == n || null == (t = n.data) ? void 0 : t.stoken;
                                        if (!i) throw Error('分享 token 接口未返回 stoken（分享可能已失效或需要提取码）');
                                        return String(i);
                                    })();
                                }(e, u), s = yield function(e, r, l, i) {
                                    return t(function*() {
                                        let t = yield F(e, r, l, '0'), o = t.filter((e)=>!e.isDir);
                                        for (let i of t.filter((e)=>e.isDir).slice(0, 10))try {
                                            let t = yield F(e, r, l, i.fid);
                                            o.push(...t.filter((e)=>!e.isDir));
                                        } catch (e) {
                                            console.log(`${n} 分享子目录 ${i.name} 列取失败，跳过: ${a(e)}`);
                                        }
                                        let u = o.filter((e)=>1 === e.category || E(e.name)), s = p(i), d = u.filter((e)=>N(e.name).includes(s));
                                        return (d.length > 0 ? d : [
                                            ...u
                                        ].sort((e, t)=>t.size - e.size).slice(0, 3)).slice(0, 10);
                                    })();
                                }(e, u, r, w);
                                if (0 === s.length) {
                                    console.log(`${n} 分享候选 ${i + 1}（${u.title || u.pwdId}）内无视频文件，尝试下一个`);
                                    continue;
                                }
                                console.log(`${n} 转存候选 ${i + 1}：${u.title || u.url} → ${s.length} 个文件`);
                                let d = yield function(e, r, l, i, u) {
                                    return t(function*() {
                                        var t, s, d;
                                        let c = Date.now(), { json: f } = yield z(e, q, 'POST', '/share/sharepage/save', {
                                            __dt: String(c % 1000),
                                            __t: String(c)
                                        }, {
                                            fid_list: i.map((e)=>e.fid),
                                            fid_token_list: i.map((e)=>e.token),
                                            pdir_fid: '0',
                                            pwd_id: r.pwdId,
                                            scene: 'link',
                                            stoken: l,
                                            to_pdir_fid: u
                                        }), p = null != (t = null == f ? void 0 : f.data) ? t : {};
                                        if (!0 === p.task_sync) return 'done';
                                        let g = p.task_id ? String(p.task_id) : '';
                                        if (!g) return 'done';
                                        let h = Date.now();
                                        for(let t = 1; t <= 20 && !(Date.now() - h > 55000); t++){
                                            let r = 3000;
                                            try {
                                                let { json: l } = yield z(e, q, 'GET', '/task', {
                                                    uc_param_str: '',
                                                    task_id: g,
                                                    retry_index: String(t)
                                                }), n = null == l || null == (s = l.data) ? void 0 : s.status;
                                                if (2 === n) return 'done';
                                                if (3 === n) return 'failed';
                                                let i = null == l || null == (d = l.metadata) ? void 0 : d.tq_gap;
                                                'number' == typeof i && i > 0 && (r = Math.min(5000, Math.max(1500, i)));
                                            } catch (e) {
                                                console.log(`${n} 转存任务查询出错（第 ${t} 次），继续等待: ${a(e)}`);
                                            }
                                            t < 20 && (yield o(r));
                                        }
                                        return 'pending';
                                    })();
                                }(e, u, r, s, l);
                                if ('failed' === d) {
                                    console.log(`${n} 分享候选 ${i + 1} 转存任务失败，尝试下一个`);
                                    continue;
                                }
                                if ('pending' === d) return console.log(`${n} 转存任务仍在进行中（${w}）：本次先用其他源播放，文件落盘后下次打开将直接命中网盘`), [];
                                let c = yield function(e, r, l, i) {
                                    return t(function*() {
                                        let t = new Set(l.map((e)=>N(e))), u = p(i), s = (e)=>{
                                            let r = e.filter((e)=>!e.isDir && (1 === e.category || E(e.name))), l = r.filter((e)=>t.has(N(e.name))), n = l.length > 0 ? l : r.filter((e)=>N(e.name).includes(u));
                                            return 0 === n.length ? null : (n.sort((e, t)=>t.size - e.size), n[0]);
                                        };
                                        for(let t = 0; t < 3; t++){
                                            t > 0 && (yield o(1500));
                                            try {
                                                let t = yield U(e, r), l = s(t);
                                                if (l) return l;
                                                for (let r of t.filter((e)=>e.isDir).slice(0, 10)){
                                                    let t = yield U(e, r.fid), l = s(t);
                                                    if (l) return l;
                                                }
                                            } catch (e) {
                                                console.log(`${n} 转存后定位文件失败（第 ${t + 1} 次）: ${a(e)}`);
                                            }
                                        }
                                        return null;
                                    })();
                                }(e, l, s.map((e)=>e.name), w);
                                if (!c) return console.log(`${n} 转存已完成但暂未在网盘定位到文件（${w}），下次打开应可直接命中`), [];
                                return console.log(`${n} 转存完成并定位到文件：${c.name}`), yield R(e, c);
                            } catch (e) {
                                console.log(`${n} 分享候选 ${i + 1} 转存失败，尝试下一个: ${a(e)}`);
                            }
                        }
                        return console.log(`${n} 分享转存全部候选失败（${w}）`), [];
                    })()), 0 === S.length && (C.share = 'off' === e.shareIndexEnabled ? '未开启' : '索引无此片');
                } catch (e) {
                    console.log(`${n} 分享转存失败，已降级: ${a(e)}`), C.share = '出错';
                }
            })(), T = ()=>t(function*() {
                try {
                    let e = yield t(function*() {
                        var e;
                        let t, { sig: r, sts: l } = function() {
                            let e = function(e) {
                                let t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', r = '';
                                for(let l = 0; l < e.length; l += 3){
                                    let n = e.charCodeAt(l), i = l + 1 < e.length, o = l + 2 < e.length, a = i ? e.charCodeAt(l + 1) : 0, u = o ? e.charCodeAt(l + 2) : 0;
                                    r += t[n >> 2], r += t[(3 & n) << 4 | a >> 4], r += i ? t[(15 & a) << 2 | u >> 6] : '=', r += o ? t[63 & u] : '=';
                                }
                                return r;
                            }(String(Date.now())), t = e.substr(e.length - 12, 10), r = 1;
                            for(let e = 0; e < 10; e++)r += t.charCodeAt(e) * e * 1743;
                            return {
                                sig: t,
                                sts: r
                            };
                        }(), o = `${H}/hls/get_video_info.php?id=${encodeURIComponent(w)}&sig=${r}&sts=${l}`, a = yield d(o, {
                            'User-Agent': i,
                            Accept: 'application/json,text/plain,*/*',
                            Referer: `${H}/embed/${encodeURIComponent(w)}`
                        }), u = a.includes('for (;;);') ? a.split('for (;;);')[1] : a;
                        try {
                            t = JSON.parse(u);
                        } catch (e) {
                            return console.log(`${n} MemoJav 接口返回无法解析: ${a.slice(0, 120)}`), [];
                        }
                        if (!t.success || !t.url) return console.log(`${n} MemoJav 无 ${w}${t.reason ? `（${t.reason}）` : ''}`), [];
                        let s = decodeURIComponent(t.url);
                        return 'mp4' === t.type && (s += '=m37'), console.log(`${n} MemoJav 命中 ${w}（${null != (e = t.type) ? e : 'hls'}）`), [
                            {
                                name: 'MemoJav',
                                description: `${H}/video/${w}`,
                                url: s
                            }
                        ];
                    })();
                    A.push(...e), 0 === e.length && (C.memo = '无此片');
                } catch (e) {
                    console.log(`${n} MemoJav 源失败，已降级: ${a(e)}`), C.memo = '出错';
                }
                try {
                    let e = yield t(function*() {
                        var e, t, r, l, o;
                        let a, s = w.toLowerCase(), c = s.replace(/-/g, ''), f = `${L}/search/${encodeURIComponent(s)}/`, p = yield d(f, {
                            'User-Agent': i,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: `${L}/`
                        });
                        if ($(p)) return console.log(`${n} Jable 搜索被 Cloudflare 验证页拦截`), [];
                        let g = new Set(), h = /href\s*=\s*["']((?:https:\/\/jable\.tv)?\/videos\/[\w-]+\/?)["']/gi;
                        for(; null !== (a = h.exec(p));)g.add(u(L, a[1]));
                        let m = [
                            ...g
                        ], v = null != (e = null != (t = m.find((e)=>e.toLowerCase().includes(s))) ? t : m.find((e)=>e.toLowerCase().replace(/-/g, '').includes(c))) ? e : m[0];
                        if (!v) return console.log(`${n} Jable 未找到 ${w} 的视频页`), [];
                        let y = yield d(v, {
                            'User-Agent': i,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: f
                        });
                        if ($(y)) return console.log(`${n} Jable 视频页被 Cloudflare 验证页拦截`), [];
                        let k = null != (r = null == (l = /var\s+hlsUrl\s*=\s*'([^']+)'/.exec(y)) ? void 0 : l[1]) ? r : null == (o = /var\s+hlsUrl\s*=\s*"([^"]+)"/.exec(y)) ? void 0 : o[1];
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
                        ] : (console.log(`${n} Jable 视频页未解析到 hlsUrl: ${v}`), []);
                    })();
                    A.push(...e), 0 === e.length && (C.jable = '无结果或被拦');
                } catch (e) {
                    console.log(`${n} Jable 源失败，已降级: ${a(e)}`), C.jable = '出错';
                }
            })();
        D ? (yield T(), yield P()) : (yield P(), yield T());
        let J = D ? [
            ...A,
            ...S
        ] : [
            ...S,
            ...A
        ];
        return console.log(`${n} loadResource ${w}：共 ${J.length} 条播放线路`), J.length > 0 ? J : (x = (t)=>{
            var r;
            return {
                name: t,
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != (r = e.link) ? r : 'https://javdb.com'
            };
        }, _ = [], C.quark && _.push(x(`诊断·夸克：${C.quark}`)), C.share && _.push(x(`诊断·转存：${C.share}`)), C.jable && _.push(x(`诊断·Jable：${C.jable}`)), C.memo && _.push(x(`诊断·MemoJav：${C.memo}`)), _);
    })();
