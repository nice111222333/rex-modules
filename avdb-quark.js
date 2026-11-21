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
WidgetMetadata = {
    id: 'v7777-avdb-quark',
    title: 'AVDB夸克版',
    description: "JavDB 浏览（最新/Top250/热播与分类榜单/搜索/详情）+ 夸克网盘播放：先按番号搜自己的网盘，未命中时自动搜分享索引并转存到网盘再播，另有 MemoJav / Jable 外部源兜底。使用前请在全局参数中填写自己的夸克网盘 Cookie；如需 JavDB 磁力，请填「JavDB Cookie」（从已登录的浏览器复制）。JavDB 本站对部分地区 IP 有限制，若列表为空请检查代理节点地区（建议非日本节点）。",
    author: 'v7777',
    site: 'https://javdb.com',
    version: "0.3.7",
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
            title: '夸克文件自动改名',
            type: 'enumeration',
            value: 'on',
            enumOptions: [
                {
                    title: '开启（命中后把文件夹和文件改成番号）',
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
let n = '[AVDB夸克版]', r = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
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
    let n = /^(https?:\/\/[^/]+)/i.exec(e), r = n ? n[1] : e.replace(/\/+$/, '');
    if (l.startsWith('/')) return r + l;
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
        }), n = 'number' == typeof (null == t ? void 0 : t.statusCode) ? t.statusCode : 200;
        if (n >= 400) throw Error(`HTTP ${n}: ${e}`);
        let r = null == t ? void 0 : t.data;
        return 'string' == typeof r ? r : null == r ? '' : String(r);
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
    let n = /([A-Z]{2,6})-?(\d{2,5})/.exec(t);
    return n ? `${n[1]}-${n[2]}` : null;
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
function v(e) {
    return t(function*() {
        if (e && 'string' == typeof e.javdbCookie && e.javdbCookie.trim()) return e.javdbCookie.trim();
        try {
            let e = yield Widget.storage.get(h);
            if ('string' == typeof e && e.trim()) return e.trim();
        } catch (e) {}
        return '';
    })();
}
function y(e) {
    return !!e && (/just a moment/i.test(e) || e.includes('challenges.cloudflare.com') || e.includes('_cf_chl') || /attention required/i.test(e) || e.includes('cf-browser-verification'));
}
class $ extends Error {
    constructor(e){
        super(`JavDB 返回了 Cloudflare 验证页（出口 IP 被拦截）: ${e}`), this.name = 'JavdbChallengeError';
    }
}
function k(e, l) {
    return t(function*() {
        let t, n = yield s(e, (t = {
            'User-Agent': r,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${g}/`
        }, l && (t.Cookie = l), t));
        if (y(n)) throw new $(e);
        return n;
    })();
}
function b(e, l) {
    return t(function*() {
        let t = yield Widget.html.load(e), n = t('a.box');
        0 === n.length && (n = t('.movie-list a.box, .grid a.box'));
        let r = [], i = new Set();
        return n.each((e, n)=>{
            var o, u, s, d, f;
            let g = t(n), h = a(l, null != (o = g.attr('href')) ? o : '');
            if (!h || i.has(h)) return;
            i.add(h);
            let m = g.find('.video-title strong').first().text().trim(), v = (null != (u = g.attr('title')) ? u : '').trim(), y = g.find('.video-title').first().text().trim(), $ = null != (s = c(m)) ? s : p(v, y), k = v || y || $ || h, b = null != (d = null != (f = g.find('img').first().attr('src')) ? f : g.find('img').first().attr('data-src')) ? d : '';
            b = a(l, b);
            let x = g.find('.score').first().text(), _ = /(\d+(?:\.\d+)?)\s*分/.exec(x), C = g.find('.meta').first().text().trim(), w = /(\d{4}-\d{2}-\d{2})/.exec(C);
            r.push({
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
        }), r;
    })();
}
function x(e) {
    var t;
    let l = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(e), n = (null != (t = null == l ? void 0 : l[1]) ? t : '').replace(/\s+/g, ' ').trim().slice(0, 60) || '(无标题)', r = e.includes('/login') || e.includes('sign_in') || e.includes('登录');
    return `title=${n}, login标记=${r ? '有' : '无'}`;
}
function _(e, l) {
    return t(function*() {
        try {
            let t = yield k(e), r = yield b(t, e);
            if (console.log(`${n} JavDB ${l}：${r.length} 条`), r.length > 0) return r;
            let i = yield v();
            if (i) {
                console.log(`${n} JavDB ${l} 匿名解析为空，带 Cookie 重试`);
                try {
                    let t = yield k(e, i), r = yield b(t, e);
                    return console.log(`${n} JavDB ${l}(Cookie重试)：${r.length} 条`), 0 === r.length && console.log(`${n} JavDB ${l}未解析到条目：页面结构可能已变化，或该页需要登录/VIP（页面提示：${x(t)}）`), r;
                } catch (e) {
                    return console.log(`${n} JavDB ${l}(Cookie重试)失败，已降级为空: ${o(e)}`), [];
                }
            }
            return console.log(`${n} JavDB ${l}未解析到条目：页面结构可能已变化，或该页需要登录/VIP（页面提示：${x(t)}）`), r;
        } catch (e) {
            return console.log(`${n} JavDB ${l}失败，已降级为空: ${o(e)}`), [];
        }
    })();
}
function C(e) {
    let t = (null != e ? e : '').trim().toLowerCase();
    return 'weekly' === t || 'monthly' === t ? t : 'daily';
}
function w(e, l, n) {
    return t(function*() {
        yield m(e);
        let t = C(e.period);
        return _(`${g}/rankings/movies?${u({
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
        yield m(e);
        let t = e.genreId || e.peopleId || '';
        return t ? _(a(g, t), '分类/演员列表') : _(`${g}/`, '首页最新');
    })(), loadTop250 = (e)=>t(function*() {
        var t;
        yield m(e);
        let l = (null != (t = e.ranking_type) ? t : '').trim();
        return l && 'all' !== l && console.log(`${n} Top250 ranking_type=${l}：年份筛选形式无公开出处，按全部年份处理`), _(`${g}/rankings/top`, 'Top250');
    })(), loadPlayback = (e)=>t(function*() {
        yield m(e);
        let t = C(e.period);
        if ('monthly' !== t) return _(`${g}/rankings/playback`, `热播榜(${t})`);
        let l = yield _(`${g}/rankings/playback?p=monthly`, '热播榜(monthly)');
        return l.length > 0 ? l : (console.log(`${n} 热播榜(monthly) ?p=monthly 无结果，回退裸路径 /rankings/playback`), _(`${g}/rankings/playback`, '热播榜(monthly回退)'));
    })(), loadCensored = (e)=>t(function*() {
        return w(e, 'censored', '有码榜');
    })(), loadUncensored = (e)=>t(function*() {
        return w(e, 'uncensored', '无码榜');
    })(), loadWestern = (e)=>t(function*() {
        return w(e, 'western', '欧美榜');
    })(), loadFC2 = (e)=>t(function*() {
        yield m(e);
        let t = C(e.period);
        return _(`${g}/rankings/movies?${u({
            p: t,
            t: 'fc2'
        })}`, `FC2榜(${t})`);
    })(), searchVideos = (e)=>t(function*() {
        var t, l, r;
        yield m(e);
        let i = (null != (t = null != (l = null != (r = e.keyword) ? r : e.title) ? l : e.query) ? t : '').trim();
        return i ? _(`${g}/search?${u({
            q: i,
            f: 'all'
        })}`, `搜索「${i}」`) : (console.log(`${n} 搜索关键词为空`), []);
    })(), loadDetail = (e, l)=>t(function*() {
        let t;
        if (!e) return null;
        yield m(l);
        let r = yield v(l);
        try {
            t = yield k(e, r);
        } catch (e) {
            return console.log(`${n} JavDB 详情获取失败: ${o(e)}`), null;
        }
        try {
            var i, u, s, d, f, g, h, y, $;
            let l, o, m, v = yield Widget.html.load(t), k = function(e) {
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
            }(v), b = null, x = S(k, [
                '番號',
                '番号'
            ]);
            if (x && (b = c(x.valueText)), !b) {
                let e = v('nav.panel.movie-panel-info div span').first().text();
                b = c(e);
            }
            b || (b = p(v('title').first().text()));
            let _ = v('h2 strong.current-title').first().text().trim(), C = v('h2 span.origin-title').first().text().trim(), w = null != (i = v('meta[property="og:title"]').attr('content')) ? i : '', A = _ || w || b || e, j = null != (u = v('img.video-cover').first().attr('src')) ? u : '';
            j || (j = null != (s = v('meta[property="og:image"]').attr('content')) ? s : ''), j = a(e, j);
            let q = S(k, [
                '日期'
            ]), P = q ? null == (h = /(\d{4}-\d{2}-\d{2})/.exec(q.valueText)) ? void 0 : h[1] : void 0, T = S(k, [
                '時長',
                '时长'
            ]);
            if (T) {
                o = T.valueText;
                let e = /(\d+)\s*分/.exec(T.valueText);
                e && (l = 60 * Number(e[1]));
            }
            let J = v('.score-stars').first();
            if (J.length > 0) {
                let e = (J.parent().text() || '').replace(/\s+/g, ' ');
                m = null == (y = /(\d+(?:\.\d+)?)\s*分/.exec(e)) ? void 0 : y[1];
            }
            if (!m) {
                let e = S(k, [
                    '評分',
                    '评分'
                ]);
                e && (m = null == ($ = /(\d+(?:\.\d+)?)/.exec(e.valueText)) ? void 0 : $[1]);
            }
            let B = [], O = S(k, [
                '類別',
                '类别'
            ]);
            O && O.$row.find('a').each((e, t)=>{
                var l;
                let n = v(t), r = null != (l = n.attr('href')) ? l : '', i = n.text().trim();
                i && B.push({
                    id: r || i,
                    title: i
                });
            });
            let I = [], z = S(k, [
                '演員',
                '演员'
            ]);
            if (z) {
                let e = [];
                z.$row.find('a, strong').each((t, l)=>{
                    var n, r;
                    let i = v(l), o = null != (n = l.tagName) ? n : '';
                    'a' === o ? e.push({
                        kind: 'a',
                        text: i.text().trim(),
                        href: null != (r = i.attr('href')) ? r : ''
                    }) : 'strong' === o && e.push({
                        kind: 'strong',
                        text: i.text().trim(),
                        href: ''
                    });
                });
                let t = !1, l = [];
                for (let n of e){
                    if ('strong' === n.kind && !t && D(n.text) === z.label) {
                        t = !0;
                        continue;
                    }
                    'a' === n.kind ? l.push({
                        name: n.text,
                        href: n.href,
                        gender: ''
                    }) : l.length > 0 && !l[l.length - 1].gender && (l[l.length - 1].gender = n.text);
                }
                let n = l.some((e)=>e.gender.includes('♀') || e.gender.includes('♂'));
                for (let e of l)e.name && (!n || e.gender.includes('♀')) && I.push({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                });
            }
            let W = new Set();
            v('a[href^="magnet:"]').each((e, t)=>{
                var l;
                let n = (null != (l = v(t).attr('href')) ? l : '').replace(/\[javdb\.com\]$/i, '');
                n && W.add(n);
            });
            let U = [
                ...W
            ], N = [];
            v('a.tile-item[data-fancybox="gallery"]').each((t, l)=>{
                let n = a(e, v(l).attr('href'));
                n && N.push(n);
            });
            let E = null != (d = v('video#preview-video source').first().attr('src')) ? d : '';
            E.startsWith('//') && (E = `https:${E}`);
            let R = [];
            b && R.push(`番号：${b}`), C && C !== A && R.push(`原标题：${C}`);
            let M = S(k, [
                '片商',
                '賣家',
                '卖家'
            ]);
            (null == M ? void 0 : M.valueText) && R.push(`片商：${M.valueText}`);
            let V = S(k, [
                '發行',
                '发行'
            ]);
            (null == V ? void 0 : V.valueText) && R.push(`发行：${V.valueText}`);
            let F = S(k, [
                '系列'
            ]);
            (null == F ? void 0 : F.valueText) && R.push(`系列：${F.valueText}`);
            let L = S(k, [
                '導演',
                '导演'
            ]);
            if ((null == L ? void 0 : L.valueText) && R.push(`导演：${L.valueText}`), U.length > 0) for (let e of (R.push(`磁力链接：共 ${U.length} 条`), U.slice(0, 3)))R.push(e);
            else r ? R.push('磁力链接：未获取（已带 JavDB Cookie，仍无磁力——该条目可能无磁力，或 Cookie 已失效）') : R.push('磁力链接：未获取（JavDB 仅对登录用户展示磁力，请在全局参数填写「JavDB Cookie」）');
            let H = {
                id: null != b ? b : e,
                type: 'detail',
                title: A,
                link: e,
                posterPath: j || void 0,
                detailPoster: j || void 0,
                coverUrl: j || void 0,
                backdropPath: null != (f = null != (g = N[0]) ? g : j) ? f : void 0,
                backdropPaths: N.length > 0 ? N : void 0,
                releaseDate: P,
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
                        coverUrl: j || void 0
                    }
                ] : void 0,
                description: R.join('\n'),
                mediaType: 'movie'
            };
            return console.log(`${n} JavDB 详情完成：${null != b ? b : '(番号未知)'}，演员 ${I.length}，类别 ${B.length}，磁力 ${U.length}`), H;
        } catch (e) {
            return console.log(`${n} JavDB 详情解析失败: ${o(e)}`), null;
        }
    })();
let A = 'https://drive-h.quark.cn/1/clouddrive', j = 'https://drive-pc.quark.cn/1/clouddrive', q = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch', P = 'https://pan.quark.cn', T = 'quark_cookie_dyn', J = 'quark_cookie_base_fp';
function B(e) {
    let t = 5381;
    for(let l = 0; l < e.length; l++)t = (t << 5) + t + e.charCodeAt(l) | 0;
    return `${e.length}:${(t >>> 0).toString(16)}`;
}
let O = new Set([
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
function I(e, n, r, i, o, a, s) {
    return t(function*() {
        var c, f;
        let p, g = yield t(function*() {
            var t;
            let l = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!l) return '';
            try {
                if ((yield Widget.storage.get(J)) === B(l)) {
                    let e = yield Widget.storage.get(T);
                    if ('string' == typeof e && e.trim()) return e;
                }
            } catch (e) {}
            return l;
        })();
        if (!g) throw Error('未填写夸克网盘 Cookie（模块全局参数 quarkCookie）');
        let h = u(l({
            pr: 'ucpro',
            fr: 'pc'
        }, o)), m = `${n}${i}?${h}`, v = {
            Cookie: g,
            Accept: 'application/json, text/plain, */*',
            Referer: null != s ? s : P,
            'User-Agent': q
        };
        p = 'GET' === r ? yield Widget.http.get(m, {
            headers: v
        }) : yield Widget.http.post(m, null != a ? a : {}, {
            headers: v
        }), yield (c = null == p ? void 0 : p.headers, t(function*() {
            try {
                var t, l;
                let n = (null != (t = e.quarkCookie) ? t : '').trim();
                if (!n || !c) return;
                let r = null != (l = c['set-cookie']) ? l : c['Set-Cookie'];
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
                o && (yield Widget.storage.set(T, i), yield Widget.storage.set(J, B(n)));
            } catch (e) {}
        })());
        let y = 'number' == typeof (null == p ? void 0 : p.statusCode) ? p.statusCode : 200;
        if (y >= 400) throw Error(`HTTP ${y}: 夸克接口 ${i}`);
        let $ = d(null == p ? void 0 : p.data);
        if (!$) throw Error(`夸克接口 ${i} 返回了无法解析的内容`);
        if ('number' == typeof $.status && $.status >= 400 || void 0 !== $.code && 0 !== $.code) throw Error(`夸克接口 ${i} 出错: ${null != (f = $.message) ? f : `code=${$.code}`}`);
        return {
            json: $,
            cookieSent: g
        };
    })();
}
function z(e, l, n, r, i) {
    return t(function*() {
        return I(e, 'https://drive.quark.cn/1/clouddrive', l, n, r, i);
    })();
}
function W(e, l) {
    return t(function*() {
        let t = [], n = 1;
        for(; n <= 20; n++){
            var r, i, o, a;
            let { json: u } = yield z(e, 'GET', '/file/sort', {
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
    return !(t < 0) && O.has(e.slice(t + 1).toLowerCase());
}
function N(e) {
    return e.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
let E = {
    '4k': 6,
    '2k': 5,
    super: 4,
    high: 3,
    normal: 2,
    low: 1
};
function R(e, l, n) {
    return t(function*() {
        yield z(e, 'POST', '/file/rename', {}, {
            fid: l,
            file_name: n
        });
    })();
}
function M(e, l, r) {
    return t(function*() {
        var i, a, u, s, d;
        let c = [];
        r && (null != (i = e.quarkAutoRename) ? i : 'on') !== 'off' && (yield t(function*() {
            var t, i, a;
            let u = null != (t = null == (a = /\.([A-Za-z0-9]{2,5})$/.exec(l.name)) ? void 0 : a[1]) ? t : 'mp4', s = `${r}.${u}`;
            if (l.name !== s) try {
                yield R(e, l.fid, s), console.log(`${n} 夸克自动改名：${l.name} → ${s}`), l.name = s;
            } catch (e) {
                console.log(`${n} 夸克文件改名失败（${l.name}）: ${o(e)}`);
            }
            let d = l.parentFid;
            if (d && '0' !== d && l.parentName && l.parentName !== r && (null != (i = l.parentVideoCount) ? i : 1) <= 1 && N(l.parentName).includes(f(r))) try {
                yield R(e, d, r), console.log(`${n} 夸克自动改名（文件夹）：${l.parentName} → ${r}`);
            } catch (e) {
                console.log(`${n} 夸克文件夹改名失败（${l.parentName}）: ${o(e)}`);
            }
        })());
        let p = '';
        try {
            let { json: t } = yield z(e, 'POST', '/file/v2/play/project', {}, {
                fid: l.fid,
                resolutions: 'low,normal,high,super,2k,4k',
                supports: 'fmp4_av,m3u8,dolby_vision'
            }), n = (Array.isArray(null == t || null == (a = t.data) ? void 0 : a.video_list) ? t.data.video_list : []).filter((e)=>{
                var t;
                return null == e || null == (t = e.video_info) ? void 0 : t.url;
            });
            if (n.length > 0) for (let e of n.sort((e, t)=>{
                var l, n, r, i;
                return (null != (l = E[String(null != (n = null == t ? void 0 : t.resolution) ? n : '').toLowerCase()]) ? l : 0) - (null != (r = E[String(null != (i = null == e ? void 0 : e.resolution) ? i : '').toLowerCase()]) ? r : 0);
            }).slice(0, 3))c.push({
                name: `夸克转码 ${String(null != (u = e.resolution) ? u : '').toUpperCase()}`,
                description: l.name,
                url: String(e.video_info.url)
            });
            else p = '转码已关闭（夸克接口变更）';
        } catch (e) {
            p = '转码已关闭（夸克接口变更）';
        }
        try {
            let { json: t, cookieSent: n } = yield z(e, 'POST', '/file/download', {}, {
                fids: [
                    l.fid
                ]
            }), r = null == t || null == (d = t.data) || null == (s = d[0]) ? void 0 : s.download_url;
            r && c.push({
                name: '夸克原画',
                description: [
                    l.name,
                    function(e) {
                        if (!e) return '';
                        let t = e / 1073741824;
                        return t >= 1 ? `${t.toFixed(2)} GB` : `${(e / 1048576).toFixed(1)} MB`;
                    }(l.size),
                    p
                ].filter(Boolean).join(' · '),
                url: String(r),
                customHeaders: {
                    Cookie: n,
                    Referer: P,
                    'User-Agent': q
                }
            });
        } catch (e) {
            console.log(`${n} 夸克原画链接获取失败（${l.name}）: ${o(e)}`);
        }
        return c;
    })();
}
let V = 'quark_avdb_folder_fid';
function F(e, l, n, r) {
    return t(function*() {
        let t = [];
        for(let u = 1; u <= 4; u++){
            var i, o, a;
            let { json: s } = yield I(e, A, 'GET', '/share/sharepage/detail', {
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
let L = 'https://jable.tv', H = 'https://memojav.org';
loadResource = (e)=>t(function*() {
        var c, g, h, v, $, k;
        let b, x;
        console.log(`${n} loadResource 被调用（id=${null != (c = e.id) ? c : ''}，title=${null != (g = e.title) ? g : ''}，link=${null != (h = e.link) ? h : ''}）`);
        let _ = {
            quark: '',
            share: '',
            jable: '',
            memo: ''
        }, C = p(e.id, e.title, e.seriesName, e.link);
        if (!C) return console.log(`${n} loadResource 未能从参数中提取番号（id=${null != (v = e.id) ? v : ''}，title=${null != ($ = e.title) ? $ : ''}），返回空`), [
            {
                name: '诊断·番号：未能识别',
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != (k = e.link) ? k : 'https://javdb.com'
            }
        ];
        yield m(e);
        let w = 'external-first' === e.sourcePriority, D = [], S = [], q = ()=>t(function*() {
                var a;
                try {
                    if (!(null != (a = e.quarkCookie) ? a : '').trim()) {
                        console.log(`${n} 未填写夸克 Cookie，跳过夸克网盘源`), _.quark = '未填Cookie';
                        return;
                    }
                    let r = yield t(function*() {
                        var t, r, i, a;
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
                                i = yield W(e, a);
                            } catch (e) {
                                console.log(`${n} 夸克目录 ${a} 列取失败，跳过: ${o(e)}`);
                                continue;
                            }
                            for (let e of i){
                                if (m++, e.isDir) {
                                    p.set(e.fid, e.name), d.push(e.fid);
                                    continue;
                                }
                                if (1 !== e.category && !U(e.name)) continue;
                                g.set(a, (null != (t = g.get(a)) ? t : 0) + 1);
                                let n = N(e.name);
                                for (let t of u)if (t && n.includes(t)) {
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
                                        parentName: null != (r = p.get(a)) ? r : ''
                                    }));
                                    break;
                                }
                            }
                        }
                        for (let e of c)e.parentVideoCount = null != (i = g.get(null != (a = e.parentFid) ? a : '')) ? i : 1;
                        return d.length > 0 && console.log(`${n} 夸克搜索达到遍历上限（已走 ${h} 个目录、扫描 ${m} 项），结果可能不完整`), c.sort((e, t)=>{
                            let l = +(1 !== e.category), n = +(1 !== t.category);
                            return l !== n ? l - n : t.size - e.size;
                        }), c;
                    })();
                    if (r.length > 0) {
                        console.log(`${n} 夸克命中 ${r.length} 个文件，解析最优文件：${r[0].name}`), D.push(...yield M(e, r[0], C)), 0 === D.length && (_.quark = '命中但解析失败');
                        return;
                    }
                    console.log(`${n} 夸克网盘中未找到与 ${C} 匹配的视频文件，尝试分享转存`), _.quark = '网盘未搜到';
                } catch (e) {
                    console.log(`${n} 夸克源失败，已降级: ${o(e)}`), _.quark = '出错';
                    return;
                }
                try {
                    D.push(...yield t(function*() {
                        let l;
                        if ('off' === e.shareIndexEnabled) return console.log(`${n} 分享索引搜索已关闭，跳过转存`), [];
                        try {
                            l = yield t(function*() {
                                var t, l, n, i, o;
                                let a = (null != (t = e.shareIndexBase) ? t : '').trim().replace(/\/+$/, '') || 'https://pansou.app', s = `${a}/api/search?${u({
                                    kw: C,
                                    res: 'all',
                                    src: 'all'
                                })}`, c = yield Widget.http.get(s, {
                                    headers: {
                                        'User-Agent': r,
                                        Accept: 'application/json, */*'
                                    }
                                }), p = 'number' == typeof (null == c ? void 0 : c.statusCode) ? c.statusCode : 200;
                                if (p >= 400) throw Error(`HTTP ${p}: 分享索引 ${a}`);
                                let g = d(null == c ? void 0 : c.data);
                                if (!g) throw Error(`分享索引 ${a} 返回了无法解析的内容`);
                                if ('number' == typeof g.code && 0 !== g.code) throw Error(`分享索引出错: ${null != (i = g.message) ? i : `code=${g.code}`}`);
                                let h = null != (l = g.data) ? l : g, m = f(C), v = new Map(), y = (e, t, l)=>{
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
                                    let i = String(null != l ? l : '').trim(), o = +!N(i).includes(m), a = v.get(r.pwdId);
                                    a && a.tier <= o || v.set(r.pwdId, {
                                        url: n,
                                        pwdId: r.pwdId,
                                        passcode: String(null != t ? t : '') || r.passcode,
                                        title: i,
                                        tier: o
                                    });
                                }, $ = null == h || null == (n = h.merged_by_type) ? void 0 : n.quark;
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
                            return console.log(`${n} 分享索引搜索失败，已跳过转存: ${o(e)}`), [];
                        }
                        if (0 === l.length) return console.log(`${n} 分享索引未找到 ${C} 的夸克分享`), [];
                        console.log(`${n} 分享索引找到 ${l.length} 个 ${C} 的夸克分享候选`);
                        let a = yield t(function*() {
                            var t, l, r, a, u;
                            let s = (null != (t = e.quarkSaveFid) ? t : '').trim();
                            if (s) return s;
                            try {
                                let e = yield Widget.storage.get(V);
                                if ('string' == typeof e && e) return e;
                            } catch (e) {}
                            try {
                                let t = (yield W(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name);
                                if (t) {
                                    try {
                                        yield Widget.storage.set(V, t.fid);
                                    } catch (e) {}
                                    return t.fid;
                                }
                                let s = '';
                                try {
                                    let { json: t } = yield z(e, 'POST', '/file', {}, {
                                        dir_init_lock: !1,
                                        dir_path: '',
                                        file_name: 'AVDB',
                                        pdir_fid: '0'
                                    });
                                    s = String(null != (l = null == t || null == (r = t.data) ? void 0 : r.fid) ? l : '');
                                } catch (e) {
                                    console.log(`${n} 创建 AVDB 文件夹失败（可能已有同名）: ${o(e)}`);
                                }
                                for(let t = 0; t < 3 && !s; t++)yield i(1000), s = null != (a = null == (u = (yield W(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name)) ? void 0 : u.fid) ? a : '';
                                if (s) {
                                    try {
                                        yield Widget.storage.set(V, s);
                                    } catch (e) {}
                                    return console.log(`${n} 转存目标：网盘根目录下的 AVDB 文件夹`), s;
                                }
                            } catch (e) {
                                console.log(`${n} 解析转存目标目录失败: ${o(e)}`);
                            }
                            return console.log(`${n} 转存目标文件夹 AVDB 不可用，改存网盘根目录`), '0';
                        })(), s = Math.min(3, l.length);
                        for(let r = 0; r < s; r++){
                            let u = l[r];
                            try {
                                let l = yield function(e, l) {
                                    return t(function*() {
                                        var t;
                                        let n = Date.now(), { json: r } = yield I(e, A, 'POST', '/share/sharepage/token', {
                                            __dt: String(n % 1000),
                                            __t: String(n)
                                        }, {
                                            pwd_id: l.pwdId,
                                            passcode: l.passcode
                                        }, `https://pan.quark.cn/s/${l.pwdId}`), i = null == r || null == (t = r.data) ? void 0 : t.stoken;
                                        if (!i) throw Error('分享 token 接口未返回 stoken（分享可能已失效或需要提取码）');
                                        return String(i);
                                    })();
                                }(e, u), s = yield function(e, l, r, i) {
                                    return t(function*() {
                                        let t = yield F(e, l, r, '0'), a = t.filter((e)=>!e.isDir);
                                        for (let i of t.filter((e)=>e.isDir).slice(0, 10))try {
                                            let t = yield F(e, l, r, i.fid);
                                            a.push(...t.filter((e)=>!e.isDir));
                                        } catch (e) {
                                            console.log(`${n} 分享子目录 ${i.name} 列取失败，跳过: ${o(e)}`);
                                        }
                                        let u = a.filter((e)=>1 === e.category || U(e.name)), s = f(i), d = u.filter((e)=>N(e.name).includes(s));
                                        return (d.length > 0 ? d : [
                                            ...u
                                        ].sort((e, t)=>t.size - e.size).slice(0, 3)).slice(0, 10);
                                    })();
                                }(e, u, l, C);
                                if (0 === s.length) {
                                    console.log(`${n} 分享候选 ${r + 1}（${u.title || u.pwdId}）内无视频文件，尝试下一个`);
                                    continue;
                                }
                                console.log(`${n} 转存候选 ${r + 1}：${u.title || u.url} → ${s.length} 个文件`);
                                let d = yield function(e, l, r, a, u) {
                                    return t(function*() {
                                        var t, s, d;
                                        let c = Date.now(), { json: f } = yield I(e, j, 'POST', '/share/sharepage/save', {
                                            __dt: String(c % 1000),
                                            __t: String(c)
                                        }, {
                                            fid_list: a.map((e)=>e.fid),
                                            fid_token_list: a.map((e)=>e.token),
                                            pdir_fid: '0',
                                            pwd_id: l.pwdId,
                                            scene: 'link',
                                            stoken: r,
                                            to_pdir_fid: u
                                        }), p = null != (t = null == f ? void 0 : f.data) ? t : {};
                                        if (!0 === p.task_sync) return 'done';
                                        let g = p.task_id ? String(p.task_id) : '';
                                        if (!g) return 'done';
                                        let h = Date.now();
                                        for(let t = 1; t <= 20 && !(Date.now() - h > 55000); t++){
                                            let l = 3000;
                                            try {
                                                let { json: n } = yield I(e, j, 'GET', '/task', {
                                                    uc_param_str: '',
                                                    task_id: g,
                                                    retry_index: String(t)
                                                }), r = null == n || null == (s = n.data) ? void 0 : s.status;
                                                if (2 === r) return 'done';
                                                if (3 === r) return 'failed';
                                                let i = null == n || null == (d = n.metadata) ? void 0 : d.tq_gap;
                                                'number' == typeof i && i > 0 && (l = Math.min(5000, Math.max(1500, i)));
                                            } catch (e) {
                                                console.log(`${n} 转存任务查询出错（第 ${t} 次），继续等待: ${o(e)}`);
                                            }
                                            t < 20 && (yield i(l));
                                        }
                                        return 'pending';
                                    })();
                                }(e, u, l, s, a);
                                if ('failed' === d) {
                                    console.log(`${n} 分享候选 ${r + 1} 转存任务失败，尝试下一个`);
                                    continue;
                                }
                                if ('pending' === d) return console.log(`${n} 转存任务仍在进行中（${C}）：本次先用其他源播放，文件落盘后下次打开将直接命中网盘`), [];
                                let c = yield function(e, l, r, a) {
                                    return t(function*() {
                                        let t = new Set(r.map((e)=>N(e))), u = f(a), s = (e)=>{
                                            let l = e.filter((e)=>!e.isDir && (1 === e.category || U(e.name))), n = l.filter((e)=>t.has(N(e.name))), r = n.length > 0 ? n : l.filter((e)=>N(e.name).includes(u));
                                            return 0 === r.length ? null : (r.sort((e, t)=>t.size - e.size), r[0]);
                                        };
                                        for(let t = 0; t < 3; t++){
                                            t > 0 && (yield i(1500));
                                            try {
                                                let t = yield W(e, l), n = s(t);
                                                if (n) return n;
                                                for (let l of t.filter((e)=>e.isDir).slice(0, 10)){
                                                    let t = yield W(e, l.fid), n = s(t);
                                                    if (n) return n;
                                                }
                                            } catch (e) {
                                                console.log(`${n} 转存后定位文件失败（第 ${t + 1} 次）: ${o(e)}`);
                                            }
                                        }
                                        return null;
                                    })();
                                }(e, a, s.map((e)=>e.name), C);
                                if (!c) return console.log(`${n} 转存已完成但暂未在网盘定位到文件（${C}），下次打开应可直接命中`), [];
                                return console.log(`${n} 转存完成并定位到文件：${c.name}`), yield M(e, c, C);
                            } catch (e) {
                                console.log(`${n} 分享候选 ${r + 1} 转存失败，尝试下一个: ${o(e)}`);
                            }
                        }
                        return console.log(`${n} 分享转存全部候选失败（${C}）`), [];
                    })()), 0 === D.length && (_.share = 'off' === e.shareIndexEnabled ? '未开启' : '索引无此片');
                } catch (e) {
                    console.log(`${n} 分享转存失败，已降级: ${o(e)}`), _.share = '出错';
                }
            })(), P = ()=>t(function*() {
                try {
                    let e = yield t(function*() {
                        var e;
                        let t, { sig: l, sts: i } = function() {
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
                        }(), o = `${H}/hls/get_video_info.php?id=${encodeURIComponent(C)}&sig=${l}&sts=${i}`, a = yield s(o, {
                            'User-Agent': r,
                            Accept: 'application/json,text/plain,*/*',
                            Referer: `${H}/embed/${encodeURIComponent(C)}`
                        }), u = a.includes('for (;;);') ? a.split('for (;;);')[1] : a;
                        try {
                            t = JSON.parse(u);
                        } catch (e) {
                            return console.log(`${n} MemoJav 接口返回无法解析: ${a.slice(0, 120)}`), [];
                        }
                        if (!t.success || !t.url) return console.log(`${n} MemoJav 无 ${C}${t.reason ? `（${t.reason}）` : ''}`), [];
                        let d = decodeURIComponent(t.url);
                        return 'mp4' === t.type && (d += '=m37'), console.log(`${n} MemoJav 命中 ${C}（${null != (e = t.type) ? e : 'hls'}）`), [
                            {
                                name: 'MemoJav',
                                description: `${H}/video/${C}`,
                                url: d
                            }
                        ];
                    })();
                    S.push(...e), 0 === e.length && (_.memo = '无此片');
                } catch (e) {
                    console.log(`${n} MemoJav 源失败，已降级: ${o(e)}`), _.memo = '出错';
                }
                try {
                    let e = yield t(function*() {
                        var e, t, l, i, o;
                        let u, d = C.toLowerCase(), c = d.replace(/-/g, ''), f = `${L}/search/${encodeURIComponent(d)}/`, p = yield s(f, {
                            'User-Agent': r,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: `${L}/`
                        });
                        if (y(p)) return console.log(`${n} Jable 搜索被 Cloudflare 验证页拦截`), [];
                        let g = new Set(), h = /href\s*=\s*["']((?:https:\/\/jable\.tv)?\/videos\/[\w-]+\/?)["']/gi;
                        for(; null !== (u = h.exec(p));)g.add(a(L, u[1]));
                        let m = [
                            ...g
                        ], v = null != (e = null != (t = m.find((e)=>e.toLowerCase().includes(d))) ? t : m.find((e)=>e.toLowerCase().replace(/-/g, '').includes(c))) ? e : m[0];
                        if (!v) return console.log(`${n} Jable 未找到 ${C} 的视频页`), [];
                        let $ = yield s(v, {
                            'User-Agent': r,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: f
                        });
                        if (y($)) return console.log(`${n} Jable 视频页被 Cloudflare 验证页拦截`), [];
                        let k = null != (l = null == (i = /var\s+hlsUrl\s*=\s*'([^']+)'/.exec($)) ? void 0 : i[1]) ? l : null == (o = /var\s+hlsUrl\s*=\s*"([^"]+)"/.exec($)) ? void 0 : o[1];
                        return k ? [
                            {
                                name: 'Jable',
                                description: v,
                                url: k,
                                customHeaders: {
                                    Referer: v,
                                    'User-Agent': r
                                }
                            }
                        ] : (console.log(`${n} Jable 视频页未解析到 hlsUrl: ${v}`), []);
                    })();
                    S.push(...e), 0 === e.length && (_.jable = '无结果或被拦');
                } catch (e) {
                    console.log(`${n} Jable 源失败，已降级: ${o(e)}`), _.jable = '出错';
                }
            })();
        w ? (yield P(), yield q()) : (yield q(), yield P());
        let T = w ? [
            ...S,
            ...D
        ] : [
            ...D,
            ...S
        ];
        return console.log(`${n} loadResource ${C}：共 ${T.length} 条播放线路`), T.length > 0 ? T : (b = (t)=>{
            var l;
            return {
                name: t,
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != (l = e.link) ? l : 'https://javdb.com'
            };
        }, x = [], _.quark && x.push(b(`诊断·夸克：${_.quark}`)), _.share && x.push(b(`诊断·转存：${_.share}`)), _.jable && x.push(b(`诊断·Jable：${_.jable}`)), _.memo && x.push(b(`诊断·MemoJav：${_.memo}`)), x);
    })();
