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
WidgetMetadata = {
    id: 'v7777-avdb-quark',
    title: 'AVDB夸克版',
    description: "JavDB 浏览（最新/Top250/热播与分类榜单/搜索/详情）+ 夸克网盘播放：先按番号搜自己的网盘，未命中时自动搜分享索引并转存到网盘再播，另有 MemoJav / Jable 外部源兜底。使用前请在全局参数中填写自己的夸克网盘 Cookie；如需 JavDB 磁力，请填「JavDB Cookie」（从已登录的浏览器复制）。JavDB 本站对部分地区 IP 有限制，若列表为空请检查代理节点地区（建议非日本节点）。",
    author: 'v7777',
    site: 'https://javdb.com',
    version: "0.3.4",
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
let l = '[AVDB夸克版]', r = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
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
    let l = String(t).trim();
    if (!l) return '';
    if (/^https?:\/\//i.test(l)) return l;
    if (l.startsWith('//')) return `https:${l}`;
    let r = /^(https?:\/\/[^/]+)/i.exec(e), n = r ? r[1] : e.replace(/\/+$/, '');
    if (l.startsWith('/')) return n + l;
    let i = e.split(/[?#]/)[0];
    return i.slice(0, i.lastIndexOf('/') + 1) + l;
}
function a(e) {
    return Object.keys(e).map((t)=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join('&');
}
function u(e, l) {
    return t(function*() {
        let t = yield Widget.http.get(e, {
            headers: l
        }), r = 'number' == typeof (null == t ? void 0 : t.statusCode) ? t.statusCode : 200;
        if (r >= 400) throw Error(`HTTP ${r}: ${e}`);
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
    let t = String(e).toUpperCase().replace(/[^A-Z0-9-]/g, ''), l = /FC2(?:-PPV)?-?(\d{5,7})/.exec(t);
    if (l) return `FC2-PPV-${l[1]}`;
    let r = /([A-Z]{2,6})-?(\d{2,5})/.exec(t);
    return r ? `${r[1]}-${r[2]}` : null;
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
function m(e) {
    return t(function*() {
        if (e && 'string' == typeof e.javdbCookie && e.javdbCookie.trim()) return e.javdbCookie.trim();
        try {
            let e = yield Widget.storage.get(g);
            if ('string' == typeof e && e.trim()) return e.trim();
        } catch (e) {}
        return '';
    })();
}
function v(e) {
    return !!e && (/just a moment/i.test(e) || e.includes('challenges.cloudflare.com') || e.includes('_cf_chl') || /attention required/i.test(e) || e.includes('cf-browser-verification'));
}
class y extends Error {
    constructor(e){
        super(`JavDB 返回了 Cloudflare 验证页（出口 IP 被拦截）: ${e}`), this.name = 'JavdbChallengeError';
    }
}
function $(e, l) {
    return t(function*() {
        let t, n = yield u(e, (t = {
            'User-Agent': r,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${p}/`
        }, l && (t.Cookie = l), t));
        if (v(n)) throw new y(e);
        return n;
    })();
}
function k(e, l) {
    return t(function*() {
        let t = yield Widget.html.load(e), r = t('a.box');
        0 === r.length && (r = t('.movie-list a.box, .grid a.box'));
        let n = [], i = new Set();
        return r.each((e, r)=>{
            var a, u, s, c, p;
            let g = t(r), h = o(l, null != (a = g.attr('href')) ? a : '');
            if (!h || i.has(h)) return;
            i.add(h);
            let m = g.find('.video-title strong').first().text().trim(), v = (null != (u = g.attr('title')) ? u : '').trim(), y = g.find('.video-title').first().text().trim(), $ = null != (s = d(m)) ? s : f(v, y), k = v || y || $ || h, b = null != (c = null != (p = g.find('img').first().attr('src')) ? p : g.find('img').first().attr('data-src')) ? c : '';
            b = o(l, b);
            let x = g.find('.score').first().text(), _ = /(\d+(?:\.\d+)?)\s*分/.exec(x), C = g.find('.meta').first().text().trim(), w = /(\d{4}-\d{2}-\d{2})/.exec(C);
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
function b(e) {
    var t;
    let l = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(e), r = (null != (t = null == l ? void 0 : l[1]) ? t : '').replace(/\s+/g, ' ').trim().slice(0, 60) || '(无标题)', n = e.includes('/login') || e.includes('sign_in') || e.includes('登录');
    return `title=${r}, login标记=${n ? '有' : '无'}`;
}
function x(e, r) {
    return t(function*() {
        try {
            let t = yield $(e), n = yield k(t, e);
            if (console.log(`${l} JavDB ${r}：${n.length} 条`), n.length > 0) return n;
            let o = yield m();
            if (o) {
                console.log(`${l} JavDB ${r} 匿名解析为空，带 Cookie 重试`);
                try {
                    let t = yield $(e, o), n = yield k(t, e);
                    return console.log(`${l} JavDB ${r}(Cookie重试)：${n.length} 条`), 0 === n.length && console.log(`${l} JavDB ${r}未解析到条目：页面结构可能已变化，或该页需要登录/VIP（页面提示：${b(t)}）`), n;
                } catch (e) {
                    return console.log(`${l} JavDB ${r}(Cookie重试)失败，已降级为空: ${i(e)}`), [];
                }
            }
            return console.log(`${l} JavDB ${r}未解析到条目：页面结构可能已变化，或该页需要登录/VIP（页面提示：${b(t)}）`), n;
        } catch (e) {
            return console.log(`${l} JavDB ${r}失败，已降级为空: ${i(e)}`), [];
        }
    })();
}
function _(e) {
    let t = (null != e ? e : '').trim().toLowerCase();
    return 'weekly' === t || 'monthly' === t ? t : 'daily';
}
function C(e, l, r) {
    return t(function*() {
        yield h(e);
        let t = _(e.period);
        return x(`${p}/rankings/movies?${a({
            p: t,
            t: l
        })}`, `${r}(${t})`);
    })();
}
function w(e) {
    return e.replace(/[:：\s]/g, '');
}
function D(e, t) {
    return e.find((e)=>t.includes(e.label));
}
loadHome = (e)=>t(function*() {
        yield h(e);
        let t = e.genreId || e.peopleId || '';
        return t ? x(o(p, t), '分类/演员列表') : x(`${p}/`, '首页最新');
    })(), loadTop250 = (e)=>t(function*() {
        var t;
        yield h(e);
        let r = (null != (t = e.ranking_type) ? t : '').trim();
        return r && 'all' !== r && console.log(`${l} Top250 ranking_type=${r}：年份筛选形式无公开出处，按全部年份处理`), x(`${p}/rankings/top`, 'Top250');
    })(), loadPlayback = (e)=>t(function*() {
        yield h(e);
        let t = _(e.period);
        if ('monthly' !== t) return x(`${p}/rankings/playback`, `热播榜(${t})`);
        let r = yield x(`${p}/rankings/playback?p=monthly`, '热播榜(monthly)');
        return r.length > 0 ? r : (console.log(`${l} 热播榜(monthly) ?p=monthly 无结果，回退裸路径 /rankings/playback`), x(`${p}/rankings/playback`, '热播榜(monthly回退)'));
    })(), loadCensored = (e)=>t(function*() {
        return C(e, 'censored', '有码榜');
    })(), loadUncensored = (e)=>t(function*() {
        return C(e, 'uncensored', '无码榜');
    })(), loadWestern = (e)=>t(function*() {
        return C(e, 'western', '欧美榜');
    })(), loadFC2 = (e)=>t(function*() {
        yield h(e);
        let t = _(e.period);
        return x(`${p}/rankings/movies?${a({
            p: t,
            t: 'fc2'
        })}`, `FC2榜(${t})`);
    })(), searchVideos = (e)=>t(function*() {
        var t, r, n;
        yield h(e);
        let i = (null != (t = null != (r = null != (n = e.keyword) ? n : e.title) ? r : e.query) ? t : '').trim();
        return i ? x(`${p}/search?${a({
            q: i,
            f: 'all'
        })}`, `搜索「${i}」`) : (console.log(`${l} 搜索关键词为空`), []);
    })(), loadDetail = (e, r)=>t(function*() {
        let t;
        if (!e) return null;
        yield h(r);
        let n = yield m(r);
        try {
            t = yield $(e, n);
        } catch (e) {
            return console.log(`${l} JavDB 详情获取失败: ${i(e)}`), null;
        }
        try {
            var a, u, s, c, p, g, v, y, k;
            let r, i, h, m = yield Widget.html.load(t), $ = function(e) {
                let t = e('nav.panel.movie-panel-info').first(), l = [];
                if (0 === t.length) return l;
                let r = t.find('> div, .panel-block'), n = new Set();
                return r.each((t, r)=>{
                    if (n.has(r)) return;
                    n.add(r);
                    let i = e(r), o = i.find('strong').first();
                    if (0 === o.length) return;
                    let a = w(o.text());
                    if (!a) return;
                    let u = i.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
                    l.push({
                        label: a,
                        valueText: u,
                        $row: i
                    });
                }), l;
            }(m), b = null, x = D($, [
                '番號',
                '番号'
            ]);
            if (x && (b = d(x.valueText)), !b) {
                let e = m('nav.panel.movie-panel-info div span').first().text();
                b = d(e);
            }
            b || (b = f(m('title').first().text()));
            let _ = m('h2 strong.current-title').first().text().trim(), C = m('h2 span.origin-title').first().text().trim(), S = null != (a = m('meta[property="og:title"]').attr('content')) ? a : '', A = _ || S || b || e, q = null != (u = m('img.video-cover').first().attr('src')) ? u : '';
            q || (q = null != (s = m('meta[property="og:image"]').attr('content')) ? s : ''), q = o(e, q);
            let T = D($, [
                '日期'
            ]), j = T ? null == (v = /(\d{4}-\d{2}-\d{2})/.exec(T.valueText)) ? void 0 : v[1] : void 0, J = D($, [
                '時長',
                '时长'
            ]);
            if (J) {
                i = J.valueText;
                let e = /(\d+)\s*分/.exec(J.valueText);
                e && (r = 60 * Number(e[1]));
            }
            let P = m('.score-stars').first();
            if (P.length > 0) {
                let e = (P.parent().text() || '').replace(/\s+/g, ' ');
                h = null == (y = /(\d+(?:\.\d+)?)\s*分/.exec(e)) ? void 0 : y[1];
            }
            if (!h) {
                let e = D($, [
                    '評分',
                    '评分'
                ]);
                e && (h = null == (k = /(\d+(?:\.\d+)?)/.exec(e.valueText)) ? void 0 : k[1]);
            }
            let B = [], I = D($, [
                '類別',
                '类别'
            ]);
            I && I.$row.find('a').each((e, t)=>{
                var l;
                let r = m(t), n = null != (l = r.attr('href')) ? l : '', i = r.text().trim();
                i && B.push({
                    id: n || i,
                    title: i
                });
            });
            let W = [], z = D($, [
                '演員',
                '演员'
            ]);
            if (z) {
                let e = [];
                z.$row.find('a, strong').each((t, l)=>{
                    var r, n;
                    let i = m(l), o = null != (r = l.tagName) ? r : '';
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
                let t = !1, l = [];
                for (let r of e){
                    if ('strong' === r.kind && !t && w(r.text) === z.label) {
                        t = !0;
                        continue;
                    }
                    'a' === r.kind ? l.push({
                        name: r.text,
                        href: r.href,
                        gender: ''
                    }) : l.length > 0 && !l[l.length - 1].gender && (l[l.length - 1].gender = r.text);
                }
                let r = l.some((e)=>e.gender.includes('♀') || e.gender.includes('♂'));
                for (let e of l)e.name && (!r || e.gender.includes('♀')) && W.push({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                });
            }
            let U = new Set();
            m('a[href^="magnet:"]').each((e, t)=>{
                var l;
                let r = (null != (l = m(t).attr('href')) ? l : '').replace(/\[javdb\.com\]$/i, '');
                r && U.add(r);
            });
            let O = [
                ...U
            ], E = [];
            m('a.tile-item[data-fancybox="gallery"]').each((t, l)=>{
                let r = o(e, m(l).attr('href'));
                r && E.push(r);
            });
            let N = null != (c = m('video#preview-video source').first().attr('src')) ? c : '';
            N.startsWith('//') && (N = `https:${N}`);
            let R = [];
            b && R.push(`番号：${b}`), C && C !== A && R.push(`原标题：${C}`);
            let M = D($, [
                '片商',
                '賣家',
                '卖家'
            ]);
            (null == M ? void 0 : M.valueText) && R.push(`片商：${M.valueText}`);
            let V = D($, [
                '發行',
                '发行'
            ]);
            (null == V ? void 0 : V.valueText) && R.push(`发行：${V.valueText}`);
            let F = D($, [
                '系列'
            ]);
            (null == F ? void 0 : F.valueText) && R.push(`系列：${F.valueText}`);
            let L = D($, [
                '導演',
                '导演'
            ]);
            if ((null == L ? void 0 : L.valueText) && R.push(`导演：${L.valueText}`), O.length > 0) for (let e of (R.push(`磁力链接：共 ${O.length} 条`), O.slice(0, 3)))R.push(e);
            else n ? R.push('磁力链接：未获取（已带 JavDB Cookie，仍无磁力——该条目可能无磁力，或 Cookie 已失效）') : R.push('磁力链接：未获取（JavDB 仅对登录用户展示磁力，请在全局参数填写「JavDB Cookie」）');
            let H = {
                id: null != b ? b : e,
                type: 'detail',
                title: A,
                link: e,
                posterPath: q || void 0,
                detailPoster: q || void 0,
                coverUrl: q || void 0,
                backdropPath: null != (p = null != (g = E[0]) ? g : q) ? p : void 0,
                backdropPaths: E.length > 0 ? E : void 0,
                releaseDate: j,
                rating: h,
                duration: r,
                durationText: i,
                genreTitle: B.map((e)=>e.title).join(' · ') || void 0,
                genreItems: B.length > 0 ? B : void 0,
                peoples: W.length > 0 ? W : void 0,
                previewUrl: N || void 0,
                trailers: N ? [
                    {
                        url: N,
                        coverUrl: q || void 0
                    }
                ] : void 0,
                description: R.join('\n'),
                mediaType: 'movie'
            };
            return console.log(`${l} JavDB 详情完成：${null != b ? b : '(番号未知)'}，演员 ${W.length}，类别 ${B.length}，磁力 ${O.length}`), H;
        } catch (e) {
            return console.log(`${l} JavDB 详情解析失败: ${i(e)}`), null;
        }
    })();
let S = 'https://drive-h.quark.cn/1/clouddrive', A = 'https://drive-pc.quark.cn/1/clouddrive', q = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch', T = 'https://pan.quark.cn', j = 'quark_cookie_dyn', J = 'quark_cookie_base_fp';
function P(e) {
    let t = 5381;
    for(let l = 0; l < e.length; l++)t = (t << 5) + t + e.charCodeAt(l) | 0;
    return `${e.length}:${(t >>> 0).toString(16)}`;
}
let B = new Set([
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
function I(e, l, r, n, i, o, u) {
    return t(function*() {
        var d, c;
        let f, p = yield t(function*() {
            var t;
            let l = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!l) return '';
            try {
                if ((yield Widget.storage.get(J)) === P(l)) {
                    let e = yield Widget.storage.get(j);
                    if ('string' == typeof e && e.trim()) return e;
                }
            } catch (e) {}
            return l;
        })();
        if (!p) throw Error('未填写夸克网盘 Cookie（模块全局参数 quarkCookie）');
        let g = a(function(e) {
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
        }({
            pr: 'ucpro',
            fr: 'pc'
        }, i)), h = `${l}${n}?${g}`, m = {
            Cookie: p,
            Accept: 'application/json, text/plain, */*',
            Referer: null != u ? u : T,
            'User-Agent': q
        };
        f = 'GET' === r ? yield Widget.http.get(h, {
            headers: m
        }) : yield Widget.http.post(h, null != o ? o : {}, {
            headers: m
        }), yield (d = null == f ? void 0 : f.headers, t(function*() {
            try {
                var t, l;
                let r = (null != (t = e.quarkCookie) ? t : '').trim();
                if (!r || !d) return;
                let n = null != (l = d['set-cookie']) ? l : d['Set-Cookie'];
                if (!n) return;
                Array.isArray(n) || (n = [
                    n
                ]);
                let i = p, o = !1;
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
                o && (yield Widget.storage.set(j, i), yield Widget.storage.set(J, P(r)));
            } catch (e) {}
        })());
        let v = 'number' == typeof (null == f ? void 0 : f.statusCode) ? f.statusCode : 200;
        if (v >= 400) throw Error(`HTTP ${v}: 夸克接口 ${n}`);
        let y = s(null == f ? void 0 : f.data);
        if (!y) throw Error(`夸克接口 ${n} 返回了无法解析的内容`);
        if ('number' == typeof y.status && y.status >= 400 || void 0 !== y.code && 0 !== y.code) throw Error(`夸克接口 ${n} 出错: ${null != (c = y.message) ? c : `code=${y.code}`}`);
        return {
            json: y,
            cookieSent: p
        };
    })();
}
function W(e, l, r, n, i) {
    return t(function*() {
        return I(e, 'https://drive.quark.cn/1/clouddrive', l, r, n, i);
    })();
}
function z(e, l) {
    return t(function*() {
        let t = [], r = 1;
        for(; r <= 20; r++){
            var n, i, o, a;
            let { json: u } = yield W(e, 'GET', '/file/sort', {
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
function U(e) {
    let t = e.lastIndexOf('.');
    return !(t < 0) && B.has(e.slice(t + 1).toLowerCase());
}
function O(e) {
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
function N(e, r) {
    return t(function*() {
        var t, n, o, a;
        let u = [];
        try {
            let { json: l } = yield W(e, 'POST', '/file/v2/play/project', {}, {
                fid: r.fid,
                resolutions: 'low,normal,high,super,2k,4k',
                supports: 'fmp4_av,m3u8,dolby_vision'
            });
            for (let e of (Array.isArray(null == l || null == (t = l.data) ? void 0 : t.video_list) ? l.data.video_list : []).filter((e)=>{
                var t;
                return null == e || null == (t = e.video_info) ? void 0 : t.url;
            }).sort((e, t)=>{
                var l, r, n, i;
                return (null != (l = E[String(null != (r = null == t ? void 0 : t.resolution) ? r : '').toLowerCase()]) ? l : 0) - (null != (n = E[String(null != (i = null == e ? void 0 : e.resolution) ? i : '').toLowerCase()]) ? n : 0);
            }).slice(0, 3))u.push({
                name: `夸克转码 ${String(null != (n = e.resolution) ? n : '').toUpperCase()}`,
                description: r.name,
                url: String(e.video_info.url)
            });
        } catch (e) {
            console.log(`${l} 夸克转码获取失败（${r.name}），仅尝试原画: ${i(e)}`);
        }
        try {
            let { json: t, cookieSent: l } = yield W(e, 'POST', '/file/download', {}, {
                fids: [
                    r.fid
                ]
            }), n = null == t || null == (a = t.data) || null == (o = a[0]) ? void 0 : o.download_url;
            n && u.push({
                name: '夸克原画',
                description: [
                    r.name,
                    function(e) {
                        if (!e) return '';
                        let t = e / 1073741824;
                        return t >= 1 ? `${t.toFixed(2)} GB` : `${(e / 1048576).toFixed(1)} MB`;
                    }(r.size)
                ].filter(Boolean).join(' · '),
                url: String(n),
                customHeaders: {
                    Cookie: l,
                    Referer: T,
                    'User-Agent': q
                }
            });
        } catch (e) {
            console.log(`${l} 夸克原画链接获取失败（${r.name}）: ${i(e)}`);
        }
        return u;
    })();
}
let R = 'quark_avdb_folder_fid';
function M(e, l, r, n) {
    return t(function*() {
        let t = [];
        for(let u = 1; u <= 4; u++){
            var i, o, a;
            let { json: s } = yield I(e, S, 'GET', '/share/sharepage/detail', {
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
let V = 'https://jable.tv', F = 'https://memojav.org';
loadResource = (e)=>t(function*() {
        var d, p, g, m, y, $;
        let k, b;
        console.log(`${l} loadResource 被调用（id=${null != (d = e.id) ? d : ''}，title=${null != (p = e.title) ? p : ''}，link=${null != (g = e.link) ? g : ''}）`);
        let x = {
            quark: '',
            share: '',
            jable: '',
            memo: ''
        }, _ = f(e.id, e.title, e.seriesName, e.link);
        if (!_) return console.log(`${l} loadResource 未能从参数中提取番号（id=${null != (m = e.id) ? m : ''}，title=${null != (y = e.title) ? y : ''}），返回空`), [
            {
                name: '诊断·番号：未能识别',
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != ($ = e.link) ? $ : 'https://javdb.com'
            }
        ];
        yield h(e);
        let C = 'external-first' === e.sourcePriority, w = [], D = [], q = ()=>t(function*() {
                var o;
                try {
                    if (!(null != (o = e.quarkCookie) ? o : '').trim()) {
                        console.log(`${l} 未填写夸克 Cookie，跳过夸克网盘源`), x.quark = '未填Cookie';
                        return;
                    }
                    let r = yield t(function*() {
                        let t = new Set([
                            c(_)
                        ]), r = /FC2-PPV-(\d+)/.exec(_);
                        r && t.add(`FC2${r[1]}`);
                        let n = [
                            '0'
                        ], o = [], a = 0, u = 0;
                        for(; n.length > 0 && a < 60 && u < 4000;){
                            let r, s = n.shift();
                            a++;
                            try {
                                r = yield z(e, s);
                            } catch (e) {
                                console.log(`${l} 夸克目录 ${s} 列取失败，跳过: ${i(e)}`);
                                continue;
                            }
                            for (let e of r){
                                if (u++, e.isDir) {
                                    n.push(e.fid);
                                    continue;
                                }
                                if (1 !== e.category && !U(e.name)) continue;
                                let l = O(e.name);
                                for (let r of t)if (r && l.includes(r)) {
                                    o.push(e);
                                    break;
                                }
                            }
                        }
                        return n.length > 0 && console.log(`${l} 夸克搜索达到遍历上限（已走 ${a} 个目录、扫描 ${u} 项），结果可能不完整`), o.sort((e, t)=>{
                            let l = +(1 !== e.category), r = +(1 !== t.category);
                            return l !== r ? l - r : t.size - e.size;
                        }), o;
                    })();
                    if (r.length > 0) {
                        console.log(`${l} 夸克命中 ${r.length} 个文件，解析最优文件：${r[0].name}`), w.push(...yield N(e, r[0])), 0 === w.length && (x.quark = '命中但解析失败');
                        return;
                    }
                    console.log(`${l} 夸克网盘中未找到与 ${_} 匹配的视频文件，尝试分享转存`), x.quark = '网盘未搜到';
                } catch (e) {
                    console.log(`${l} 夸克源失败，已降级: ${i(e)}`), x.quark = '出错';
                    return;
                }
                try {
                    w.push(...yield t(function*() {
                        let o;
                        if ('off' === e.shareIndexEnabled) return console.log(`${l} 分享索引搜索已关闭，跳过转存`), [];
                        try {
                            o = yield t(function*() {
                                var t, l, n, i, o;
                                let u = (null != (t = e.shareIndexBase) ? t : '').trim().replace(/\/+$/, '') || 'https://pansou.app', d = `${u}/api/search?${a({
                                    kw: _,
                                    res: 'all',
                                    src: 'all'
                                })}`, f = yield Widget.http.get(d, {
                                    headers: {
                                        'User-Agent': r,
                                        Accept: 'application/json, */*'
                                    }
                                }), p = 'number' == typeof (null == f ? void 0 : f.statusCode) ? f.statusCode : 200;
                                if (p >= 400) throw Error(`HTTP ${p}: 分享索引 ${u}`);
                                let g = s(null == f ? void 0 : f.data);
                                if (!g) throw Error(`分享索引 ${u} 返回了无法解析的内容`);
                                if ('number' == typeof g.code && 0 !== g.code) throw Error(`分享索引出错: ${null != (i = g.message) ? i : `code=${g.code}`}`);
                                let h = null != (l = g.data) ? l : g, m = c(_), v = new Map(), y = (e, t, l)=>{
                                    if (v.size >= 12) return;
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
                                    let i = String(null != l ? l : '').trim(), o = +!O(i).includes(m), a = v.get(n.pwdId);
                                    a && a.tier <= o || v.set(n.pwdId, {
                                        url: r,
                                        pwdId: n.pwdId,
                                        passcode: String(null != t ? t : '') || n.passcode,
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
                            return console.log(`${l} 分享索引搜索失败，已跳过转存: ${i(e)}`), [];
                        }
                        if (0 === o.length) return console.log(`${l} 分享索引未找到 ${_} 的夸克分享`), [];
                        console.log(`${l} 分享索引找到 ${o.length} 个 ${_} 的夸克分享候选`);
                        let u = yield t(function*() {
                            var t, r, o, a, u;
                            let s = (null != (t = e.quarkSaveFid) ? t : '').trim();
                            if (s) return s;
                            try {
                                let e = yield Widget.storage.get(R);
                                if ('string' == typeof e && e) return e;
                            } catch (e) {}
                            try {
                                let t = (yield z(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name);
                                if (t) {
                                    try {
                                        yield Widget.storage.set(R, t.fid);
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
                                    s = String(null != (r = null == t || null == (o = t.data) ? void 0 : o.fid) ? r : '');
                                } catch (e) {
                                    console.log(`${l} 创建 AVDB 文件夹失败（可能已有同名）: ${i(e)}`);
                                }
                                for(let t = 0; t < 3 && !s; t++)yield n(1000), s = null != (a = null == (u = (yield z(e, '0')).find((e)=>e.isDir && 'AVDB' === e.name)) ? void 0 : u.fid) ? a : '';
                                if (s) {
                                    try {
                                        yield Widget.storage.set(R, s);
                                    } catch (e) {}
                                    return console.log(`${l} 转存目标：网盘根目录下的 AVDB 文件夹`), s;
                                }
                            } catch (e) {
                                console.log(`${l} 解析转存目标目录失败: ${i(e)}`);
                            }
                            return console.log(`${l} 转存目标文件夹 AVDB 不可用，改存网盘根目录`), '0';
                        })(), d = Math.min(3, o.length);
                        for(let r = 0; r < d; r++){
                            let a = o[r];
                            try {
                                let o = yield function(e, l) {
                                    return t(function*() {
                                        var t;
                                        let r = Date.now(), { json: n } = yield I(e, S, 'POST', '/share/sharepage/token', {
                                            __dt: String(r % 1000),
                                            __t: String(r)
                                        }, {
                                            pwd_id: l.pwdId,
                                            passcode: l.passcode
                                        }, `https://pan.quark.cn/s/${l.pwdId}`), i = null == n || null == (t = n.data) ? void 0 : t.stoken;
                                        if (!i) throw Error('分享 token 接口未返回 stoken（分享可能已失效或需要提取码）');
                                        return String(i);
                                    })();
                                }(e, a), s = yield function(e, r, n, o) {
                                    return t(function*() {
                                        let t = yield M(e, r, n, '0'), a = t.filter((e)=>!e.isDir);
                                        for (let o of t.filter((e)=>e.isDir).slice(0, 10))try {
                                            let t = yield M(e, r, n, o.fid);
                                            a.push(...t.filter((e)=>!e.isDir));
                                        } catch (e) {
                                            console.log(`${l} 分享子目录 ${o.name} 列取失败，跳过: ${i(e)}`);
                                        }
                                        let u = a.filter((e)=>1 === e.category || U(e.name)), s = c(o), d = u.filter((e)=>O(e.name).includes(s));
                                        return (d.length > 0 ? d : [
                                            ...u
                                        ].sort((e, t)=>t.size - e.size).slice(0, 3)).slice(0, 10);
                                    })();
                                }(e, a, o, _);
                                if (0 === s.length) {
                                    console.log(`${l} 分享候选 ${r + 1}（${a.title || a.pwdId}）内无视频文件，尝试下一个`);
                                    continue;
                                }
                                console.log(`${l} 转存候选 ${r + 1}：${a.title || a.url} → ${s.length} 个文件`);
                                let d = yield function(e, r, o, a, u) {
                                    return t(function*() {
                                        var t, s, d;
                                        let c = Date.now(), { json: f } = yield I(e, A, 'POST', '/share/sharepage/save', {
                                            __dt: String(c % 1000),
                                            __t: String(c)
                                        }, {
                                            fid_list: a.map((e)=>e.fid),
                                            fid_token_list: a.map((e)=>e.token),
                                            pdir_fid: '0',
                                            pwd_id: r.pwdId,
                                            scene: 'link',
                                            stoken: o,
                                            to_pdir_fid: u
                                        }), p = null != (t = null == f ? void 0 : f.data) ? t : {};
                                        if (!0 === p.task_sync) return 'done';
                                        let g = p.task_id ? String(p.task_id) : '';
                                        if (!g) return 'done';
                                        let h = Date.now();
                                        for(let t = 1; t <= 20 && !(Date.now() - h > 55000); t++){
                                            let r = 3000;
                                            try {
                                                let { json: l } = yield I(e, A, 'GET', '/task', {
                                                    uc_param_str: '',
                                                    task_id: g,
                                                    retry_index: String(t)
                                                }), n = null == l || null == (s = l.data) ? void 0 : s.status;
                                                if (2 === n) return 'done';
                                                if (3 === n) return 'failed';
                                                let i = null == l || null == (d = l.metadata) ? void 0 : d.tq_gap;
                                                'number' == typeof i && i > 0 && (r = Math.min(5000, Math.max(1500, i)));
                                            } catch (e) {
                                                console.log(`${l} 转存任务查询出错（第 ${t} 次），继续等待: ${i(e)}`);
                                            }
                                            t < 20 && (yield n(r));
                                        }
                                        return 'pending';
                                    })();
                                }(e, a, o, s, u);
                                if ('failed' === d) {
                                    console.log(`${l} 分享候选 ${r + 1} 转存任务失败，尝试下一个`);
                                    continue;
                                }
                                if ('pending' === d) return console.log(`${l} 转存任务仍在进行中（${_}）：本次先用其他源播放，文件落盘后下次打开将直接命中网盘`), [];
                                let f = yield function(e, r, o, a) {
                                    return t(function*() {
                                        let t = new Set(o.map((e)=>O(e))), u = c(a), s = (e)=>{
                                            let l = e.filter((e)=>!e.isDir && (1 === e.category || U(e.name))), r = l.filter((e)=>t.has(O(e.name))), n = r.length > 0 ? r : l.filter((e)=>O(e.name).includes(u));
                                            return 0 === n.length ? null : (n.sort((e, t)=>t.size - e.size), n[0]);
                                        };
                                        for(let t = 0; t < 3; t++){
                                            t > 0 && (yield n(1500));
                                            try {
                                                let t = yield z(e, r), l = s(t);
                                                if (l) return l;
                                                for (let l of t.filter((e)=>e.isDir).slice(0, 10)){
                                                    let t = yield z(e, l.fid), r = s(t);
                                                    if (r) return r;
                                                }
                                            } catch (e) {
                                                console.log(`${l} 转存后定位文件失败（第 ${t + 1} 次）: ${i(e)}`);
                                            }
                                        }
                                        return null;
                                    })();
                                }(e, u, s.map((e)=>e.name), _);
                                if (!f) return console.log(`${l} 转存已完成但暂未在网盘定位到文件（${_}），下次打开应可直接命中`), [];
                                return console.log(`${l} 转存完成并定位到文件：${f.name}`), yield N(e, f);
                            } catch (e) {
                                console.log(`${l} 分享候选 ${r + 1} 转存失败，尝试下一个: ${i(e)}`);
                            }
                        }
                        return console.log(`${l} 分享转存全部候选失败（${_}）`), [];
                    })()), 0 === w.length && (x.share = 'off' === e.shareIndexEnabled ? '未开启' : '索引无此片');
                } catch (e) {
                    console.log(`${l} 分享转存失败，已降级: ${i(e)}`), x.share = '出错';
                }
            })(), T = ()=>t(function*() {
                try {
                    let e = yield t(function*() {
                        var e;
                        let t, { sig: n, sts: i } = function() {
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
                        }(), o = `${F}/hls/get_video_info.php?id=${encodeURIComponent(_)}&sig=${n}&sts=${i}`, a = yield u(o, {
                            'User-Agent': r,
                            Accept: 'application/json,text/plain,*/*',
                            Referer: `${F}/embed/${encodeURIComponent(_)}`
                        }), s = a.includes('for (;;);') ? a.split('for (;;);')[1] : a;
                        try {
                            t = JSON.parse(s);
                        } catch (e) {
                            return console.log(`${l} MemoJav 接口返回无法解析: ${a.slice(0, 120)}`), [];
                        }
                        if (!t.success || !t.url) return console.log(`${l} MemoJav 无 ${_}${t.reason ? `（${t.reason}）` : ''}`), [];
                        let d = decodeURIComponent(t.url);
                        return 'mp4' === t.type && (d += '=m37'), console.log(`${l} MemoJav 命中 ${_}（${null != (e = t.type) ? e : 'hls'}）`), [
                            {
                                name: 'MemoJav',
                                description: `${F}/video/${_}`,
                                url: d
                            }
                        ];
                    })();
                    D.push(...e), 0 === e.length && (x.memo = '无此片');
                } catch (e) {
                    console.log(`${l} MemoJav 源失败，已降级: ${i(e)}`), x.memo = '出错';
                }
                try {
                    let e = yield t(function*() {
                        var e, t, n, i, a;
                        let s, d = _.toLowerCase(), c = d.replace(/-/g, ''), f = `${V}/search/${encodeURIComponent(d)}/`, p = yield u(f, {
                            'User-Agent': r,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: `${V}/`
                        });
                        if (v(p)) return console.log(`${l} Jable 搜索被 Cloudflare 验证页拦截`), [];
                        let g = new Set(), h = /href\s*=\s*["']((?:https:\/\/jable\.tv)?\/videos\/[\w-]+\/?)["']/gi;
                        for(; null !== (s = h.exec(p));)g.add(o(V, s[1]));
                        let m = [
                            ...g
                        ], y = null != (e = null != (t = m.find((e)=>e.toLowerCase().includes(d))) ? t : m.find((e)=>e.toLowerCase().replace(/-/g, '').includes(c))) ? e : m[0];
                        if (!y) return console.log(`${l} Jable 未找到 ${_} 的视频页`), [];
                        let $ = yield u(y, {
                            'User-Agent': r,
                            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                            Referer: f
                        });
                        if (v($)) return console.log(`${l} Jable 视频页被 Cloudflare 验证页拦截`), [];
                        let k = null != (n = null == (i = /var\s+hlsUrl\s*=\s*'([^']+)'/.exec($)) ? void 0 : i[1]) ? n : null == (a = /var\s+hlsUrl\s*=\s*"([^"]+)"/.exec($)) ? void 0 : a[1];
                        return k ? [
                            {
                                name: 'Jable',
                                description: y,
                                url: k,
                                customHeaders: {
                                    Referer: y,
                                    'User-Agent': r
                                }
                            }
                        ] : (console.log(`${l} Jable 视频页未解析到 hlsUrl: ${y}`), []);
                    })();
                    D.push(...e), 0 === e.length && (x.jable = '无结果或被拦');
                } catch (e) {
                    console.log(`${l} Jable 源失败，已降级: ${i(e)}`), x.jable = '出错';
                }
            })();
        C ? (yield T(), yield q()) : (yield q(), yield T());
        let j = C ? [
            ...D,
            ...w
        ] : [
            ...w,
            ...D
        ];
        return console.log(`${l} loadResource ${_}：共 ${j.length} 条播放线路`), j.length > 0 ? j : (k = (t)=>{
            var l;
            return {
                name: t,
                description: '诊断占位条目，不可播放；对应来源恢复后自动消失',
                url: null != (l = e.link) ? l : 'https://javdb.com'
            };
        }, b = [], x.quark && b.push(k(`诊断·夸克：${x.quark}`)), x.share && b.push(k(`诊断·转存：${x.share}`)), x.jable && b.push(k(`诊断·Jable：${x.jable}`)), x.memo && b.push(k(`诊断·MemoJav：${x.memo}`)), b);
    })();
