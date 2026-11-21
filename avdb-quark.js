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
    description: "JavDB 浏览（最新/Top250/热播与分类榜单/搜索/详情）+ 夸克网盘播放：先按番号搜自己的网盘，未命中时自动搜分享索引并转存到网盘再播，另有 Jable 外部源兜底。使用前请在全局参数中填写自己的夸克网盘 Cookie；如需 JavDB 磁力，请填「JavDB Cookie」（从已登录的浏览器复制）。JavDB 本站对部分地区 IP 有限制，若列表为空请检查代理节点地区（建议非日本节点）。",
    author: 'v7777',
    site: 'https://javdb.com',
    version: "0.3.0",
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
            description: '可选（磁力需要）。在浏览器登录 javdb.com 后，从开发者工具复制完整 Cookie。仅在打开详情页时携带（用于显示磁力），列表/搜索/榜单一律匿名请求，降低账号被封风险',
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
function d(e) {
    if (null == e) return null;
    if ('object' == typeof e) return e;
    if ('string' == typeof e) try {
        return JSON.parse(e);
    } catch (e) {}
    return null;
}
function s(e) {
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
        let e = s(t);
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
    return !!e && (/just a moment/i.test(e) || e.includes('challenges.cloudflare.com') || e.includes('_cf_chl') || /attention required/i.test(e) || e.includes('cf-browser-verification'));
}
class m extends Error {
    constructor(e){
        super(`JavDB 返回了 Cloudflare 验证页（出口 IP 被拦截）: ${e}`), this.name = 'JavdbChallengeError';
    }
}
function y(e, r) {
    return t(function*() {
        let t, n = yield u(e, (t = {
            'User-Agent': l,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${p}/`
        }, r && (t.Cookie = r), t));
        if (v(n)) throw new m(e);
        return n;
    })();
}
function $(e, l) {
    return t(function*() {
        try {
            let n = yield y(e), i = yield t(function*() {
                let t = yield Widget.html.load(n), r = t('a.box');
                0 === r.length && (r = t('.movie-list a.box, .grid a.box'));
                let l = [], i = new Set();
                return r.each((r, n)=>{
                    var a, u, d, c, p;
                    let g = t(n), h = o(e, null != (a = g.attr('href')) ? a : '');
                    if (!h || i.has(h)) return;
                    i.add(h);
                    let v = g.find('.video-title strong').first().text().trim(), m = (null != (u = g.attr('title')) ? u : '').trim(), y = g.find('.video-title').first().text().trim(), $ = null != (d = s(v)) ? d : f(m, y), k = m || y || $ || h, _ = null != (c = null != (p = g.find('img').first().attr('src')) ? p : g.find('img').first().attr('data-src')) ? c : '';
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
            return console.log(`${r} JavDB ${l}：${i.length} 条`), 0 === i.length && console.log(`${r} JavDB ${l}未解析到条目：页面结构可能已变化，或该页需要登录/VIP`), i;
        } catch (e) {
            return console.log(`${r} JavDB ${l}失败，已降级为空: ${i(e)}`), [];
        }
    })();
}
function k(e) {
    let t = (null != e ? e : '').trim().toLowerCase();
    return 'weekly' === t || 'monthly' === t ? t : 'daily';
}
function _(e, r, l) {
    return t(function*() {
        yield h(e);
        let t = k(e.period);
        return $(`${p}/rankings/movies?${a({
            p: t,
            t: r
        })}`, `${l}(${t})`);
    })();
}
function x(e) {
    return e.replace(/[:：\s]/g, '');
}
function b(e, t) {
    return e.find((e)=>t.includes(e.label));
}
loadHome = (e)=>t(function*() {
        yield h(e);
        let t = e.genreId || e.peopleId || '';
        return t ? $(o(p, t), '分类/演员列表') : $(`${p}/`, '首页最新');
    })(), loadTop250 = (e)=>t(function*() {
        var t;
        yield h(e);
        let l = (null != (t = e.ranking_type) ? t : '').trim();
        l && 'all' !== l && console.log(`${r} Top250 ranking_type=${l}：年份筛选形式无公开出处，按全部年份处理`);
        let n = `${p}/advanced_search?handleTop=1&handleType=all&type_value=&page=1`, i = yield $(n, 'Top250');
        return i.length > 0 ? i : (console.log(`${r} Top250 主路径无结果，尝试旧路径 /top250 兜底`), $(`${p}/top250`, 'Top250(旧路径)'));
    })(), loadPlayback = (e)=>t(function*() {
        yield h(e);
        let t = k(e.period);
        return $(`${p}/advanced_search?${a({
            handlePlayback: '1',
            period: t
        })}`, `热播榜(${t})`);
    })(), loadCensored = (e)=>t(function*() {
        return _(e, 'censored', '有码榜');
    })(), loadUncensored = (e)=>t(function*() {
        return _(e, 'uncensored', '无码榜');
    })(), loadWestern = (e)=>t(function*() {
        return _(e, 'western', '欧美榜');
    })(), loadFC2 = (e)=>t(function*() {
        return yield h(e), $(`${p}/advanced_search?type=3&score_min=0&d=1`, 'FC2榜');
    })(), searchVideos = (e)=>t(function*() {
        var t, l, n;
        yield h(e);
        let i = (null != (t = null != (l = null != (n = e.keyword) ? n : e.title) ? l : e.query) ? t : '').trim();
        return i ? $(`${p}/search?${a({
            q: i,
            f: 'all'
        })}`, `搜索「${i}」`) : (console.log(`${r} 搜索关键词为空`), []);
    })(), loadDetail = (e, l)=>t(function*() {
        var n, a, u, d, c, p, v, m, $;
        let k;
        if (!e) return null;
        yield h(l);
        let _ = yield t(function*() {
            if (l && 'string' == typeof l.javdbCookie && l.javdbCookie.trim()) return l.javdbCookie.trim();
            try {
                let e = yield Widget.storage.get(g);
                if ('string' == typeof e && e.trim()) return e.trim();
            } catch (e) {}
            return '';
        })();
        try {
            k = yield y(e, _);
        } catch (e) {
            return console.log(`${r} JavDB 详情获取失败: ${i(e)}`), null;
        }
        try {
            let t, l, i, g = yield Widget.html.load(k), h = function(e) {
                let t = e('nav.panel.movie-panel-info').first(), r = [];
                if (0 === t.length) return r;
                let l = t.find('> div, .panel-block'), n = new Set();
                return l.each((t, l)=>{
                    if (n.has(l)) return;
                    n.add(l);
                    let i = e(l), o = i.find('strong').first();
                    if (0 === o.length) return;
                    let a = x(o.text());
                    if (!a) return;
                    let u = i.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
                    r.push({
                        label: a,
                        valueText: u,
                        $row: i
                    });
                }), r;
            }(g), y = null, w = b(h, [
                '番號',
                '番号'
            ]);
            if (w && (y = s(w.valueText)), !y) {
                let e = g('nav.panel.movie-panel-info div span').first().text();
                y = s(e);
            }
            y || (y = f(g('title').first().text()));
            let C = g('h2 strong.current-title').first().text().trim(), S = g('h2 span.origin-title').first().text().trim(), D = null != (n = g('meta[property="og:title"]').attr('content')) ? n : '', T = C || D || y || e, A = null != (a = g('img.video-cover').first().attr('src')) ? a : '';
            A || (A = null != (u = g('meta[property="og:image"]').attr('content')) ? u : ''), A = o(e, A);
            let q = b(h, [
                '日期'
            ]), P = q ? null == (v = /(\d{4}-\d{2}-\d{2})/.exec(q.valueText)) ? void 0 : v[1] : void 0, B = b(h, [
                '時長',
                '时长'
            ]);
            if (B) {
                l = B.valueText;
                let e = /(\d+)\s*分/.exec(B.valueText);
                e && (t = 60 * Number(e[1]));
            }
            let j = g('.score-stars').first();
            if (j.length > 0) {
                let e = (j.parent().text() || '').replace(/\s+/g, ' ');
                i = null == (m = /(\d+(?:\.\d+)?)\s*分/.exec(e)) ? void 0 : m[1];
            }
            if (!i) {
                let e = b(h, [
                    '評分',
                    '评分'
                ]);
                e && (i = null == ($ = /(\d+(?:\.\d+)?)/.exec(e.valueText)) ? void 0 : $[1]);
            }
            let J = [], W = b(h, [
                '類別',
                '类别'
            ]);
            W && W.$row.find('a').each((e, t)=>{
                var r;
                let l = g(t), n = null != (r = l.attr('href')) ? r : '', i = l.text().trim();
                i && J.push({
                    id: n || i,
                    title: i
                });
            });
            let z = [], I = b(h, [
                '演員',
                '演员'
            ]);
            if (I) {
                let e = [];
                I.$row.find('a, strong').each((t, r)=>{
                    var l, n;
                    let i = g(r), o = null != (l = r.tagName) ? l : '';
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
                    if ('strong' === l.kind && !t && x(l.text) === I.label) {
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
                for (let e of r)e.name && (!l || e.gender.includes('♀')) && z.push({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                });
            }
            let U = new Set();
            g('a[href^="magnet:"]').each((e, t)=>{
                var r;
                let l = (null != (r = g(t).attr('href')) ? r : '').replace(/\[javdb\.com\]$/i, '');
                l && U.add(l);
            });
            let O = [
                ...U
            ], E = [];
            g('a.tile-item[data-fancybox="gallery"]').each((t, r)=>{
                let l = o(e, g(r).attr('href'));
                l && E.push(l);
            });
            let N = null != (d = g('video#preview-video source').first().attr('src')) ? d : '';
            N.startsWith('//') && (N = `https:${N}`);
            let V = [];
            y && V.push(`番号：${y}`), S && S !== T && V.push(`原标题：${S}`);
            let R = b(h, [
                '片商',
                '賣家',
                '卖家'
            ]);
            (null == R ? void 0 : R.valueText) && V.push(`片商：${R.valueText}`);
            let F = b(h, [
                '發行',
                '发行'
            ]);
            (null == F ? void 0 : F.valueText) && V.push(`发行：${F.valueText}`);
            let L = b(h, [
                '系列'
            ]);
            (null == L ? void 0 : L.valueText) && V.push(`系列：${L.valueText}`);
            let H = b(h, [
                '導演',
                '导演'
            ]);
            if ((null == H ? void 0 : H.valueText) && V.push(`导演：${H.valueText}`), O.length > 0) for (let e of (V.push(`磁力链接：共 ${O.length} 条`), O.slice(0, 3)))V.push(e);
            else _ ? V.push('磁力链接：未获取（已带 JavDB Cookie，仍无磁力——该条目可能无磁力，或 Cookie 已失效）') : V.push('磁力链接：未获取（JavDB 仅对登录用户展示磁力，请在全局参数填写「JavDB Cookie」）');
            let M = {
                id: null != y ? y : e,
                type: 'url',
                title: y ? `${y} 播放` : `${T} 播放`,
                link: e,
                coverUrl: A || void 0,
                posterPath: A || void 0,
                mediaType: 'movie'
            }, G = {
                id: null != y ? y : e,
                type: 'detail',
                title: T,
                link: e,
                posterPath: A || void 0,
                detailPoster: A || void 0,
                coverUrl: A || void 0,
                backdropPath: null != (c = null != (p = E[0]) ? p : A) ? c : void 0,
                backdropPaths: E.length > 0 ? E : void 0,
                releaseDate: P,
                rating: i,
                duration: t,
                durationText: l,
                genreTitle: J.map((e)=>e.title).join(' · ') || void 0,
                genreItems: J.length > 0 ? J : void 0,
                peoples: z.length > 0 ? z : void 0,
                previewUrl: N || void 0,
                trailers: N ? [
                    {
                        url: N,
                        coverUrl: A || void 0
                    }
                ] : void 0,
                description: V.join('\n'),
                mediaType: 'movie',
                episodeItems: [
                    M
                ]
            };
            return console.log(`${r} JavDB 详情完成：${null != y ? y : '(番号未知)'}，演员 ${z.length}，类别 ${J.length}，磁力 ${O.length}`), G;
        } catch (e) {
            return console.log(`${r} JavDB 详情解析失败: ${i(e)}`), null;
        }
    })();
let w = 'https://drive-h.quark.cn/1/clouddrive', C = 'https://drive-pc.quark.cn/1/clouddrive', S = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch', D = 'https://pan.quark.cn', T = 'quark_cookie_dyn', A = 'quark_cookie_base_fp';
function q(e) {
    let t = 5381;
    for(let r = 0; r < e.length; r++)t = (t << 5) + t + e.charCodeAt(r) | 0;
    return `${e.length}:${(t >>> 0).toString(16)}`;
}
let P = new Set([
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
function B(e, r, l, n, i, o, u) {
    return t(function*() {
        var s, c;
        let f, p = yield t(function*() {
            var t;
            let r = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!r) return '';
            try {
                if ((yield Widget.storage.get(A)) === q(r)) {
                    let e = yield Widget.storage.get(T);
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
            Referer: null != u ? u : D,
            'User-Agent': S
        };
        f = 'GET' === l ? yield Widget.http.get(h, {
            headers: v
        }) : yield Widget.http.post(h, null != o ? o : {}, {
            headers: v
        }), yield (s = null == f ? void 0 : f.headers, t(function*() {
            try {
                var t, r;
                let l = (null != (t = e.quarkCookie) ? t : '').trim();
                if (!l || !s) return;
                let n = null != (r = s['set-cookie']) ? r : s['Set-Cookie'];
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
                o && (yield Widget.storage.set(T, i), yield Widget.storage.set(A, q(l)));
            } catch (e) {}
        })());
        let m = 'number' == typeof (null == f ? void 0 : f.statusCode) ? f.statusCode : 200;
        if (m >= 400) throw Error(`HTTP ${m}: 夸克接口 ${n}`);
        let y = d(null == f ? void 0 : f.data);
        if (!y) throw Error(`夸克接口 ${n} 返回了无法解析的内容`);
        if ('number' == typeof y.status && y.status >= 400 || void 0 !== y.code && 0 !== y.code) throw Error(`夸克接口 ${n} 出错: ${null != (c = y.message) ? c : `code=${y.code}`}`);
        return {
            json: y,
            cookieSent: p
        };
    })();
}
function j(e, r, l, n, i) {
    return t(function*() {
        return B(e, 'https://drive.quark.cn/1/clouddrive', r, l, n, i);
    })();
}
function J(e, r) {
    return t(function*() {
        let t = [], l = 1;
        for(; l <= 20; l++){
            var n, i, o, a;
            let { json: u } = yield j(e, 'GET', '/file/sort', {
                pdir_fid: r,
                _page: String(l),
                _size: '100',
                _fetch_total: '1',
                fetch_all_file: '1',
                fetch_risk_file_name: '1'
            }), d = Array.isArray(null == u || null == (n = u.data) ? void 0 : n.list) ? u.data.list : [];
            for (let e of d)t.push({
                fid: String(null != (o = e.fid) ? o : ''),
                name: String(null != (a = e.file_name) ? a : ''),
                size: 'number' == typeof e.size ? e.size : 0,
                category: 'number' == typeof e.category ? e.category : 0,
                isDir: !1 === e.file
            });
            let s = null == u || null == (i = u.metadata) ? void 0 : i._total;
            if (0 === d.length || 'number' == typeof s && t.length >= s || d.length < 100) break;
        }
        return t;
    })();
}
function W(e) {
    let t = e.lastIndexOf('.');
    return !(t < 0) && P.has(e.slice(t + 1).toLowerCase());
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
function U(e, l) {
    return t(function*() {
        var t, n, o, a;
        let u = [];
        try {
            let { json: r } = yield j(e, 'POST', '/file/v2/play/project', {}, {
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
            let { json: t, cookieSent: r } = yield j(e, 'POST', '/file/download', {}, {
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
                    Referer: D,
                    'User-Agent': S
                }
            });
        } catch (e) {
            console.log(`${r} 夸克原画链接获取失败（${l.name}）: ${i(e)}`);
        }
        return u;
    })();
}
let O = 'quark_avdb_folder_fid';
function E(e, r, l, n) {
    return t(function*() {
        let t = [];
        for(let u = 1; u <= 4; u++){
            var i, o, a;
            let { json: d } = yield B(e, w, 'GET', '/share/sharepage/detail', {
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
            }, void 0, `https://pan.quark.cn/s/${r.pwdId}`), s = Array.isArray(null == d || null == (i = d.data) ? void 0 : i.list) ? d.data.list : [];
            for (let e of s)(null == e ? void 0 : e.fid) && t.push({
                fid: String(e.fid),
                token: String(null != (o = e.share_fid_token) ? o : ''),
                name: String(null != (a = e.file_name) ? a : ''),
                size: 'number' == typeof e.size ? e.size : 0,
                category: 'number' == typeof e.category ? e.category : 0,
                isDir: !1 === e.file
            });
            if (s.length < 50) break;
        }
        return t;
    })();
}
let N = 'https://jable.tv';
loadResource = (e)=>t(function*() {
        let s = f(e.id, e.title, e.seriesName, e.link);
        if (!s) {
            var p, g;
            return console.log(`${r} loadResource 未能从参数中提取番号（id=${null != (p = e.id) ? p : ''}，title=${null != (g = e.title) ? g : ''}），返回空`), [];
        }
        yield h(e);
        let m = 'external-first' === e.sourcePriority, y = [], $ = [], k = ()=>t(function*() {
                try {
                    var o;
                    if (!(null != (o = e.quarkCookie) ? o : '').trim()) return void console.log(`${r} 未填写夸克 Cookie，跳过夸克网盘源`);
                    let u = yield t(function*() {
                        let t = new Set([
                            c(s)
                        ]), l = /FC2-PPV-(\d+)/.exec(s);
                        l && t.add(`FC2${l[1]}`);
                        let n = [
                            '0'
                        ], o = [], a = 0, u = 0;
                        for(; n.length > 0 && a < 60 && u < 4000;){
                            let l, d = n.shift();
                            a++;
                            try {
                                l = yield J(e, d);
                            } catch (e) {
                                console.log(`${r} 夸克目录 ${d} 列取失败，跳过: ${i(e)}`);
                                continue;
                            }
                            for (let e of l){
                                if (u++, e.isDir) {
                                    n.push(e.fid);
                                    continue;
                                }
                                if (1 !== e.category && !W(e.name)) continue;
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
                        console.log(`${r} 夸克命中 ${u.length} 个文件，解析最优文件：${u[0].name}`), y.push(...yield U(e, u[0]));
                        return;
                    }
                    console.log(`${r} 夸克网盘中未找到与 ${s} 匹配的视频文件，尝试分享转存`), y.push(...yield t(function*() {
                        let o;
                        if ('off' === e.shareIndexEnabled) return console.log(`${r} 分享索引搜索已关闭，跳过转存`), [];
                        try {
                            o = yield t(function*() {
                                var t, r, n, i, o;
                                let u = (null != (t = e.shareIndexBase) ? t : '').trim().replace(/\/+$/, '') || 'https://pansou.app', f = `${u}/api/search?${a({
                                    kw: s,
                                    res: 'all',
                                    src: 'all'
                                })}`, p = yield Widget.http.get(f, {
                                    headers: {
                                        'User-Agent': l,
                                        Accept: 'application/json, */*'
                                    }
                                }), g = 'number' == typeof (null == p ? void 0 : p.statusCode) ? p.statusCode : 200;
                                if (g >= 400) throw Error(`HTTP ${g}: 分享索引 ${u}`);
                                let h = d(null == p ? void 0 : p.data);
                                if (!h) throw Error(`分享索引 ${u} 返回了无法解析的内容`);
                                if ('number' == typeof h.code && 0 !== h.code) throw Error(`分享索引出错: ${null != (i = h.message) ? i : `code=${h.code}`}`);
                                let v = null != (r = h.data) ? r : h, m = c(s), y = new Map(), $ = (e, t, r)=>{
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
                        if (0 === o.length) return console.log(`${r} 分享索引未找到 ${s} 的夸克分享`), [];
                        console.log(`${r} 分享索引找到 ${o.length} 个 ${s} 的夸克分享候选`);
                        let u = yield t(function*() {
                            var t, l, o, a, u;
                            let d = (null != (t = e.quarkSaveFid) ? t : '').trim();
                            if (d) return d;
                            try {
                                let e = yield Widget.storage.get(O);
                                if ('string' == typeof e && e) return e;
                            } catch (e) {}
                            try {
                                let t = (yield J(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name);
                                if (t) {
                                    try {
                                        yield Widget.storage.set(O, t.fid);
                                    } catch (e) {}
                                    return t.fid;
                                }
                                let d = '';
                                try {
                                    let { json: t } = yield j(e, 'POST', '/file', {}, {
                                        dir_init_lock: !1,
                                        dir_path: '',
                                        file_name: 'AVDB',
                                        pdir_fid: '0'
                                    });
                                    d = String(null != (l = null == t || null == (o = t.data) ? void 0 : o.fid) ? l : '');
                                } catch (e) {
                                    console.log(`${r} 创建 AVDB 文件夹失败（可能已有同名）: ${i(e)}`);
                                }
                                for(let t = 0; t < 3 && !d; t++)yield n(1000), d = null != (a = null == (u = (yield J(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name)) ? void 0 : u.fid) ? a : '';
                                if (d) {
                                    try {
                                        yield Widget.storage.set(O, d);
                                    } catch (e) {}
                                    return console.log(`${r} 转存目标：网盘根目录下的 AVDB 文件夹`), d;
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
                                        let l = Date.now(), { json: n } = yield B(e, w, 'POST', '/share/sharepage/token', {
                                            __dt: String(l % 1000),
                                            __t: String(l)
                                        }, {
                                            pwd_id: r.pwdId,
                                            passcode: r.passcode
                                        }, `https://pan.quark.cn/s/${r.pwdId}`), i = null == n || null == (t = n.data) ? void 0 : t.stoken;
                                        if (!i) throw Error('分享 token 接口未返回 stoken（分享可能已失效或需要提取码）');
                                        return String(i);
                                    })();
                                }(e, a), d = yield function(e, l, n, o) {
                                    return t(function*() {
                                        let t = yield E(e, l, n, '0'), a = t.filter((e)=>!e.isDir);
                                        for (let o of t.filter((e)=>e.isDir).slice(0, 10))try {
                                            let t = yield E(e, l, n, o.fid);
                                            a.push(...t.filter((e)=>!e.isDir));
                                        } catch (e) {
                                            console.log(`${r} 分享子目录 ${o.name} 列取失败，跳过: ${i(e)}`);
                                        }
                                        let u = a.filter((e)=>1 === e.category || W(e.name)), d = c(o), s = u.filter((e)=>z(e.name).includes(d));
                                        return (s.length > 0 ? s : [
                                            ...u
                                        ].sort((e, t)=>t.size - e.size).slice(0, 3)).slice(0, 10);
                                    })();
                                }(e, a, o, s);
                                if (0 === d.length) {
                                    console.log(`${r} 分享候选 ${l + 1}（${a.title || a.pwdId}）内无视频文件，尝试下一个`);
                                    continue;
                                }
                                console.log(`${r} 转存候选 ${l + 1}：${a.title || a.url} → ${d.length} 个文件`);
                                let f = yield function(e, l, o, a, u) {
                                    return t(function*() {
                                        var t, d, s;
                                        let c = Date.now(), { json: f } = yield B(e, C, 'POST', '/share/sharepage/save', {
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
                                                let { json: r } = yield B(e, C, 'GET', '/task', {
                                                    uc_param_str: '',
                                                    task_id: g,
                                                    retry_index: String(t)
                                                }), n = null == r || null == (d = r.data) ? void 0 : d.status;
                                                if (2 === n) return 'done';
                                                if (3 === n) return 'failed';
                                                let i = null == r || null == (s = r.metadata) ? void 0 : s.tq_gap;
                                                'number' == typeof i && i > 0 && (l = Math.min(5000, Math.max(1500, i)));
                                            } catch (e) {
                                                console.log(`${r} 转存任务查询出错（第 ${t} 次），继续等待: ${i(e)}`);
                                            }
                                            t < 20 && (yield n(l));
                                        }
                                        return 'pending';
                                    })();
                                }(e, a, o, d, u);
                                if ('failed' === f) {
                                    console.log(`${r} 分享候选 ${l + 1} 转存任务失败，尝试下一个`);
                                    continue;
                                }
                                if ('pending' === f) return console.log(`${r} 转存任务仍在进行中（${s}）：本次先用其他源播放，文件落盘后下次打开将直接命中网盘`), [];
                                let p = yield function(e, l, o, a) {
                                    return t(function*() {
                                        let t = new Set(o.map((e)=>z(e))), u = c(a), d = (e)=>{
                                            let r = e.filter((e)=>!e.isDir && (1 === e.category || W(e.name))), l = r.filter((e)=>t.has(z(e.name))), n = l.length > 0 ? l : r.filter((e)=>z(e.name).includes(u));
                                            return 0 === n.length ? null : (n.sort((e, t)=>t.size - e.size), n[0]);
                                        };
                                        for(let t = 0; t < 3; t++){
                                            t > 0 && (yield n(1500));
                                            try {
                                                let t = yield J(e, l), r = d(t);
                                                if (r) return r;
                                                for (let r of t.filter((e)=>e.isDir).slice(0, 10)){
                                                    let t = yield J(e, r.fid), l = d(t);
                                                    if (l) return l;
                                                }
                                            } catch (e) {
                                                console.log(`${r} 转存后定位文件失败（第 ${t + 1} 次）: ${i(e)}`);
                                            }
                                        }
                                        return null;
                                    })();
                                }(e, u, d.map((e)=>e.name), s);
                                if (!p) return console.log(`${r} 转存已完成但暂未在网盘定位到文件（${s}），下次打开应可直接命中`), [];
                                return console.log(`${r} 转存完成并定位到文件：${p.name}`), yield U(e, p);
                            } catch (e) {
                                console.log(`${r} 分享候选 ${l + 1} 转存失败，尝试下一个: ${i(e)}`);
                            }
                        }
                        return console.log(`${r} 分享转存全部候选失败（${s}）`), [];
                    })());
                } catch (e) {
                    console.log(`${r} 夸克源失败，已降级: ${i(e)}`);
                }
            })(), _ = ()=>t(function*() {
                try {
                    $.push(...yield t(function*() {
                        var e, t, n, i, a;
                        let d, c = s.toLowerCase(), f = c.replace(/-/g, ''), p = `${N}/search/${encodeURIComponent(c)}/`, g = yield u(p, {
                            'User-Agent': l,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: `${N}/`
                        });
                        if (v(g)) return console.log(`${r} Jable 搜索被 Cloudflare 验证页拦截`), [];
                        let h = new Set(), m = /href\s*=\s*["']((?:https:\/\/jable\.tv)?\/videos\/[\w-]+\/?)["']/gi;
                        for(; null !== (d = m.exec(g));)h.add(o(N, d[1]));
                        let y = [
                            ...h
                        ], $ = null != (e = null != (t = y.find((e)=>e.toLowerCase().includes(c))) ? t : y.find((e)=>e.toLowerCase().replace(/-/g, '').includes(f))) ? e : y[0];
                        if (!$) return console.log(`${r} Jable 未找到 ${s} 的视频页`), [];
                        let k = yield u($, {
                            'User-Agent': l,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: p
                        });
                        if (v(k)) return console.log(`${r} Jable 视频页被 Cloudflare 验证页拦截`), [];
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
                    return console.log(`${r} MemoJav 源尚未实现（取流需逆向其播放器 JS），跳过 ${s}`), [];
                })());
            })();
        m ? (yield _(), yield k()) : (yield k(), yield _());
        let x = m ? [
            ...$,
            ...y
        ] : [
            ...y,
            ...$
        ];
        return console.log(`${r} loadResource ${s}：共 ${x.length} 条播放线路`), x;
    })();
