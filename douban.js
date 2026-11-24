function e(e, t, r, n, i, l, o) {
    try {
        var a = e[l](o), u = a.value;
    } catch (e) {
        r(e);
        return;
    }
    a.done ? t(u) : Promise.resolve(u).then(n, i);
}
function t(t) {
    return function() {
        var r = this, n = arguments;
        return new Promise(function(i, l) {
            var o = t.apply(r, n);
            function a(t) {
                e(o, i, l, a, u, "next", t);
            }
            function u(t) {
                e(o, i, l, a, u, "throw", t);
            }
            a(void 0);
        });
    };
}
function r(e) {
    for(var t = 1; t < arguments.length; t++){
        var r = null != arguments[t] ? arguments[t] : {}, n = Object.keys(r);
        "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(e) {
            return Object.getOwnPropertyDescriptor(r, e).enumerable;
        }))), n.forEach(function(t) {
            var n;
            n = r[t], t in e ? Object.defineProperty(e, t, {
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
            var r = Object.getOwnPropertySymbols(e);
            t.push.apply(t, r);
        }
        return t;
    })(Object(t)).forEach(function(r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    }), e;
}
WidgetMetadata = {
    id: 'v7777-douban',
    title: '豆瓣影视',
    description: '豆瓣影视浏览：今日推荐（每日轮换）、热门精选、电影 / 电视剧 / 综艺 / 纪录片、高分佳作、华语 / 港台 / 日韩精选、豆瓣 Top250 与分类片单。纯浏览模块，不带播放源——详情页是豆瓣资料（评分、海报、演职员、简介），播放请用你在 Rex 里绑定的 Emby 库或其他模块。若某个分区提示被登录门拦截，可在模块设置里填入豆瓣 Cookie 后重试。海报由模块在条目里自带豆瓣 Referer 请求头直连加载，一般无需任何设置；若个别海报仍不显示，可部署配套的海报代理 Worker，并把地址填入「海报代理地址」走代理兜底。',
    author: 'v7777',
    site: 'https://movie.douban.com',
    version: "0.1.2",
    requiredVersion: '0.0.7',
    contentType: 'video',
    iconurl: 'https://img1.doubanio.com/favicon.ico',
    detailCacheDuration: 60,
    globalParams: [
        {
            name: 'cookie',
            title: '豆瓣 Cookie（可选）',
            type: 'input',
            description: '可选。仅当接口被豆瓣登录门拦截时用它重试一次；在浏览器登录 movie.douban.com 后复制完整 Cookie（不要发给任何人）',
            value: ''
        },
        {
            name: 'posterProxy',
            title: '海报代理地址（可选）',
            type: 'input',
            description: '可选（备用）。海报正常情况下由模块自带豆瓣 Referer 请求头直连加载，这里留空即可。仅当海报仍然不显示时再填：部署配套的 douban-poster-worker.js 到 Cloudflare Workers 后，把「https://你的Worker地址/?url=」整段填进来，模块发出的豆瓣海报改走代理',
            value: ''
        },
        {
            name: 'pageSize',
            title: '每页条数（可选）',
            type: 'input',
            description: '可选。留空 = 24；可填 10–50',
            value: ''
        }
    ],
    modules: [
        {
            id: 'loadToday',
            title: '今日推荐',
            subtitle: '电影 / 剧集 / 综艺 / 纪录片混合推荐，每日轮换',
            functionName: 'loadToday',
            cacheDuration: 1800,
            params: [
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadHotMix',
            title: '热门精选',
            subtitle: '热门电影与剧集按评分交错，带简介',
            functionName: 'loadHotMix',
            cacheDuration: 1800,
            params: [
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadMovieRail',
            title: '电影',
            subtitle: '按豆瓣标签榜或地区探索电影',
            functionName: 'loadMovieRail',
            cacheDuration: 3600,
            params: [
                {
                    name: 'source',
                    title: '来源',
                    type: 'enumeration',
                    value: 'tag',
                    enumOptions: [
                        {
                            title: '标签榜',
                            value: 'tag'
                        },
                        {
                            title: '地区探索',
                            value: 'region'
                        }
                    ]
                },
                {
                    name: 'value',
                    title: '标签或地区',
                    type: 'input',
                    description: '标签如 热门/最新/豆瓣高分/华语/欧美/韩国/日本；地区如 中国大陆/中国香港/中国台湾/美国/日本/韩国/英国/泰国',
                    value: '热门'
                },
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadTvRail',
            title: '电视剧',
            subtitle: '按豆瓣标签看剧集',
            functionName: 'loadTvRail',
            cacheDuration: 3600,
            params: [
                {
                    name: 'tag',
                    title: '标签',
                    type: 'input',
                    description: '如 热门/国产剧/美剧/日剧/韩剧/英剧/动漫',
                    value: '热门'
                },
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadVariety',
            title: '综艺',
            subtitle: '热门综艺与真人秀',
            functionName: 'loadVariety',
            cacheDuration: 3600,
            params: [
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadDocumentary',
            title: '纪录片',
            subtitle: '纪录片（电影与剧集混合）',
            functionName: 'loadDocumentary',
            cacheDuration: 3600,
            params: [
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadHighRated',
            title: '高分佳作',
            subtitle: '豆瓣高分电影，带简介',
            functionName: 'loadHighRated',
            cacheDuration: 3600,
            params: [
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadMainland',
            title: '华语精选',
            subtitle: '中国大陆电影与剧集',
            functionName: 'loadMainland',
            cacheDuration: 3600,
            params: [
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadHkTw',
            title: '港台精选',
            subtitle: '中国香港与中国台湾电影合并',
            functionName: 'loadHkTw',
            cacheDuration: 3600,
            params: [
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadJpKr',
            title: '日韩精选',
            subtitle: '韩国与日本电影合并',
            functionName: 'loadJpKr',
            cacheDuration: 3600,
            params: [
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadTop250',
            title: '豆瓣 Top250',
            subtitle: '豆瓣电影 Top250 榜单',
            functionName: 'loadTop250',
            cacheDuration: 21600,
            params: [
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadGenres',
            title: '分类浏览',
            subtitle: '按类型浏览电影与剧集',
            functionName: 'loadGenres',
            cacheDuration: 86400,
            params: [
                {
                    name: 'genreId',
                    title: '分类 ID',
                    type: 'input',
                    description: '客户端从分类条目注入（douban:genre:<分类名> 或分类名）；留空时返回分类列表'
                }
            ]
        },
        {
            id: 'loadGenrePage',
            title: '分类片单',
            subtitle: '某个类型下的电影与剧集',
            functionName: 'loadGenrePage',
            cacheDuration: 3600,
            params: [
                {
                    name: 'genre',
                    title: '分类',
                    type: 'input',
                    description: '如 剧情/喜剧/动作/爱情/科幻/动画/悬疑/惊悚/恐怖/犯罪/纪录片/真人秀',
                    value: ''
                },
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
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
        id: 'search',
        title: '豆瓣搜索',
        functionName: 'search',
        params: [
            {
                name: 'keyword',
                title: '关键词',
                type: 'input',
                description: '片名，如 肖申克的救赎',
                value: ''
            }
        ]
    }
};
let i = '[豆瓣影视]', l = 'https://movie.douban.com';
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
function a(e) {
    return Object.keys(e).map((t)=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join('&');
}
function u(e) {
    var t;
    let r = parseInt(String(null != (t = e.page) ? t : ''), 10);
    return Number.isFinite(r) && r >= 1 ? r : 1;
}
function s(e, t) {
    let r = String(null != e ? e : '').replace(/\s+/g, ' ').trim();
    return r.length > t ? `${r.slice(0, t)}…` : r;
}
let c = 'db_cookie', d = 'db_poster_proxy';
function p(e) {
    try {
        let t = Widget.storage.get(e);
        return 'string' == typeof t ? t : '';
    } catch (e) {
        return '';
    }
}
function g(e, t) {
    try {
        Widget.storage.set(e, t);
    } catch (e) {}
}
let m = {
    Referer: 'https://movie.douban.com/'
};
function y() {
    return {
        customHeaders: r({}, m),
        headers: r({}, m)
    };
}
function f(e, t) {
    var r;
    let n = (null != e ? e : '').trim();
    if (!n) return '';
    let i = (null != (r = null == t ? void 0 : t.posterProxy) ? r : '').trim();
    return !i || n.startsWith(i) ? n : i + encodeURIComponent(n);
}
function v(e) {
    if (null == e) return null;
    if ('object' == typeof e) return e;
    if ('string' == typeof e) try {
        return JSON.parse(e);
    } catch (e) {}
    return null;
}
class h extends Error {
    constructor(e){
        super(e), this.name = 'GateError';
    }
}
function b(e) {
    return !!e && (e.includes('sec.douban.com') || e.includes('异常请求') || /error\s*008/i.test(e) || e.includes('验证你不是机器人') || e.includes('你的请求过于频繁'));
}
function $(e, r, n, l) {
    return t(function*() {
        var o;
        r && ('string' == typeof r.cookie && g(c, r.cookie.trim()), 'string' == typeof r.posterProxy && g(d, r.posterProxy.trim()));
        let a = (null != (o = r.cookie) ? o : '').trim(), u = null, s = null;
        for(let r = 0; r < 2; r++){
            let o = 1 === r;
            if (o && !a) break;
            o && console.log(`${i} ${l} 匿名未取到，带 Cookie 重试: ${e}`);
            try {
                let r = yield function(e, r) {
                    return t(function*() {
                        let t, n = yield Widget.http.get(e, {
                            headers: (t = {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                                Accept: 'application/json, text/html, */*',
                                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                                Referer: 'https://movie.douban.com/'
                            }, r && (t.Cookie = r), t)
                        }), i = 'number' == typeof (null == n ? void 0 : n.statusCode) ? n.statusCode : 200;
                        if (i >= 400) throw Error(`HTTP ${i}: ${e}`);
                        let l = null == n ? void 0 : n.data;
                        if ('string' == typeof l) return l;
                        if (null == l) return '';
                        try {
                            return JSON.stringify(l);
                        } catch (e) {
                            return String(l);
                        }
                    })();
                }(e, o ? a : void 0);
                if (n(r)) return r;
                s = r, u = null;
            } catch (e) {
                u = e, s = null;
            }
        }
        if (null != s && b(s)) throw new h(`豆瓣返回了机器人验证/登录门页面: ${e}`);
        if (u) throw u;
        throw Error(`${l} 返回内容不可用: ${e}`);
    })();
}
function j(e, r) {
    return t(function*() {
        let t = yield $(e, r, (e)=>null != v(e), '接口');
        return v(t);
    })();
}
function k(e, r) {
    return t(function*() {
        return $(e, r, (e)=>e.length > 200 && !b(e), '页面');
    })();
}
function T(e) {
    return 'string' == typeof e ? e.trim() : 'number' == typeof e && Number.isFinite(e) ? String(e) : '';
}
function P(e) {
    if (!Array.isArray(e)) {
        let t = T(e);
        return t ? [
            t
        ] : [];
    }
    let t = [];
    for (let i of e){
        var r, n;
        let e = 'string' == typeof i ? i.trim() : T(null != (r = null != (n = null == i ? void 0 : i.name) ? n : null == i ? void 0 : i.title) ? r : null == i ? void 0 : i.value);
        e && t.push(e);
    }
    return t;
}
function D(e) {
    let t = T(e);
    if (t) return t;
    if (e && 'object' == typeof e) {
        var r, n, i;
        return T(null != (r = null != (n = null != (i = e.value) ? i : e.average) ? n : e.score) ? r : e.rating);
    }
    return '';
}
function x(e) {
    let t = parseFloat(e.rate);
    return Number.isFinite(t) ? t : 0;
}
function _(e, r) {
    return t(function*() {
        var t, n, o;
        let u, s = Number.isFinite(u = parseInt(String(null != (o = e.pageSize) ? o : ''), 10)) ? Math.min(50, Math.max(10, u)) : 24, c = null != (t = r.page) ? t : 1, d = `${l}/j/search_subjects?${a({
            type: r.type,
            tag: r.tag,
            sort: null != (n = r.sort) ? n : 'recommend',
            page_limit: String(s),
            page_start: String((c - 1) * s)
        })}`;
        console.log(`${i} search_subjects type=${r.type} tag=${r.tag} page=${c}`);
        let p = yield j(d, e);
        return (Array.isArray(null == p ? void 0 : p.subjects) ? p.subjects : []).map((e)=>(function(e, t) {
                var r, n, i, l;
                if (!e || 'object' != typeof e) return null;
                let o = T(e.id), a = T(e.title);
                return o && a ? {
                    id: o,
                    title: a,
                    rate: D(null != (r = e.rate) ? r : e.rating),
                    cover: T(null != (n = null != (i = null != (l = e.cover) ? l : e.cover_url) ? i : e.pic) ? n : e.image),
                    mediaType: t,
                    directors: P(e.directors),
                    casts: P(e.casts),
                    year: T(e.year) || void 0
                } : null;
            })(e, r.type)).filter((e)=>null != e);
    })();
}
function w(e, r) {
    return t(function*() {
        var t, n, o, u, s, c, d;
        let p = null != (t = r.page) ? t : 1, g = `${l}/j/new_search_subjects?${a({
            sort: 'U',
            range: '0,10',
            tags: null != (n = r.tags) ? n : '',
            genres: null != (o = r.genres) ? o : '',
            countries: null != (u = r.countries) ? u : '',
            start: String((p - 1) * 20),
            year_range: ''
        })}`;
        console.log(`${i} new_search_subjects genres=${null != (s = r.genres) ? s : ''} countries=${null != (c = r.countries) ? c : ''} tags=${null != (d = r.tags) ? d : ''} page=${p}`);
        let m = yield j(g, e);
        return (Array.isArray(null == m ? void 0 : m.data) ? m.data : Array.isArray(m) ? m : []).map((e)=>(function(e) {
                var t, r, n, i, l;
                if (!e || 'object' != typeof e) return null;
                let o = T(e.id), a = T(e.title);
                if (!o || !a) return null;
                let u = T(null != (t = e.subtype) ? t : e.type);
                return {
                    id: o,
                    title: a,
                    rate: D(null != (r = e.rate) ? r : e.rating),
                    cover: T(null != (n = null != (i = null != (l = e.cover) ? l : e.cover_url) ? i : e.pic) ? n : e.image),
                    mediaType: 'movie' === u ? 'movie' : 'tv',
                    directors: P(e.directors),
                    casts: P(e.casts),
                    year: T(e.year) || void 0
                };
            })(e)).filter((e)=>null != e);
    })();
}
function M(e, r) {
    return t(function*() {
        let t = `${l}/j/subject_abstract?${a({
            subject_id: r
        })}`;
        return function(e) {
            var t, r, n, i, l, o, a, u, s, c, d, p, g, m, y, f, v;
            if (!e || 'object' != typeof e) return null;
            let h = null != (t = null != (r = e.subject) ? r : e.data) ? t : e;
            if (h && 'object' == typeof h && h.subject && 'object' == typeof h.subject && !h.title && (h = h.subject), !h || 'object' != typeof h) return null;
            let b = T(h.id), $ = T(null != (n = h.title) ? n : h.name);
            if (!b && !$) return null;
            let j = T(h.year);
            if (!j && Array.isArray(h.pubdates) && h.pubdates.length > 0) {
                let e = /(\d{4})/.exec(T(h.pubdates[0]));
                e && (j = e[1]);
            }
            let k = h.pic && 'object' == typeof h.pic ? h.pic : {};
            return {
                id: b,
                title: $,
                originalTitle: T(null != (i = null != (l = h.original_title) ? l : h.originalTitle) ? i : h.aka_title),
                year: j,
                subtype: T(null != (o = h.subtype) ? o : h.type),
                rate: D(null != (a = h.rate) ? a : h.rating),
                cover: T(null != (u = null != (s = null != (c = null != (d = h.cover) ? d : k.large) ? c : k.normal) ? s : h.image) ? u : h.poster),
                genres: P(null != (p = h.genres) ? p : h.types),
                directors: P(h.directors),
                casts: P(null != (g = h.casts) ? g : h.actors),
                countries: P(h.countries),
                languages: P(h.languages),
                durations: P(null != (m = h.durations) ? m : h.duration),
                summary: T(null != (y = null != (f = null != (v = h.summary) ? v : h.intro) ? f : h.abstract) ? y : h.description)
            };
        }((yield j(t, e)));
    })();
}
function O(e, t, i) {
    let l = [];
    e.rate && l.push(`豆瓣评分 ${e.rate}`), e.year && l.push(e.year);
    let o = [];
    e.rate && o.push(`豆瓣评分：${e.rate}`), e.directors.length > 0 && o.push(`导演：${e.directors.join('、')}`), e.casts.length > 0 && o.push(`主演：${e.casts.slice(0, 6).join('、')}`), i && o.push(i);
    let a = f(e.cover, t);
    return n(r({
        id: e.id,
        type: 'detail',
        title: e.title,
        link: `douban:${e.id}`,
        posterPath: a || void 0,
        coverUrl: a || void 0,
        backdropPath: a || void 0
    }, a ? y() : {}), {
        rating: e.rate || void 0,
        releaseDate: e.year || void 0,
        mediaType: e.mediaType,
        subtitle: l.join(' · ') || void 0,
        description: o.join('\n') || void 0
    });
}
function R(e) {
    let t = new Map();
    for (let r of e)for (let e of r)t.has(e.id) || t.set(e.id, e);
    return [
        ...t.values()
    ].sort((e, t)=>x(t) - x(e));
}
function N(e, l, a) {
    return t(function*() {
        let t = [], u = 0;
        for (let c of l){
            let l = '', d = c.year, p = c.rate;
            if (u < a) {
                u++;
                try {
                    let t = yield M(e, c.id);
                    t && (l = s(t.summary, 140), !d && t.year && (d = t.year), !p && t.rate && (p = t.rate));
                } catch (e) {
                    console.log(`${i} 简介补全 ${c.id} 失败（用列表数据）: ${o(e)}`);
                }
            }
            t.push(O(n(r({}, c), {
                year: d,
                rate: p
            }), e, l || void 0));
        }
        return t;
    })();
}
function S(e, t) {
    let r = t instanceof h, n = r ? '接口被登录门拦截（008)，可在模块设置填 Cookie 后重试' : `接口请求失败：${s(o(t), 40)}`;
    return console.log(`${i} ${e} 失败: ${o(t)}`), {
        id: `diag:${e}`,
        type: 'detail',
        title: `豆瓣·${e}：${n}`,
        link: 'douban:diag',
        mediaType: 'movie',
        description: [
            `「${e}」这次没能从豆瓣取到数据。`,
            r ? '豆瓣对当前出口 IP 触发了机器人验证/登录门（error 008）。处理办法：在浏览器登录 movie.douban.com，复制完整 Cookie 填到本模块设置里，再下拉刷新——模块只会在被拦截时带 Cookie 重试一次。' : `错误详情：${o(t)}。可以稍后下拉刷新重试。`,
            '本模块是纯浏览模块，不带播放源；播放请用你在 Rex 里绑定的 Emby 库或其他模块。'
        ].join('\n')
    };
}
function C(e) {
    return t(function*() {
        try {
            return {
                items: yield e(),
                err: null
            };
        } catch (e) {
            return {
                items: [],
                err: e
            };
        }
    })();
}
loadToday = (e)=>t(function*() {
        if (console.log(`${i} loadToday page=${u(e)}`), u(e) > 1) return [];
        let t = yield C(()=>_(e, {
                type: 'movie',
                tag: '热门'
            })), r = yield C(()=>_(e, {
                type: 'tv',
                tag: '热门'
            })), n = yield C(()=>_(e, {
                type: 'tv',
                tag: '综艺'
            })), l = yield C(()=>w(e, {
                genres: '纪录片'
            })), o = [
            t,
            r,
            n,
            l
        ];
        if (o.every((e)=>0 === e.items.length)) {
            var a;
            let e = null == (a = o.find((e)=>e.err)) ? void 0 : a.err;
            return e ? [
                S('今日推荐', e)
            ] : [];
        }
        let s = (e)=>[
                ...e
            ].sort((e, t)=>x(t) - x(e)).slice(0, 10), c = R([
            s(t.items),
            s(r.items),
            s(n.items),
            s(l.items)
        ]), d = function(e) {
            if (e.length <= 8) return e.slice();
            let t = new Date(), r = (Math.floor(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 86400000) % e.length + e.length) % e.length;
            return e.slice(r).concat(e.slice(0, r)).slice(0, 8);
        }(c);
        return console.log(`${i} loadToday 候选池 ${c.length} 部，今日取 ${d.length} 部`), N(e, d, 8);
    })(), loadHotMix = (e)=>t(function*() {
        if (console.log(`${i} loadHotMix page=${u(e)}`), u(e) > 1) return [];
        let t = yield C(()=>_(e, {
                type: 'movie',
                tag: '热门'
            })), r = yield C(()=>_(e, {
                type: 'tv',
                tag: '热门'
            }));
        if (0 === t.items.length && 0 === r.items.length) {
            var n;
            let e = null != (n = t.err) ? n : r.err;
            return e ? [
                S('热门精选', e)
            ] : [];
        }
        return N(e, R([
            t.items,
            r.items
        ]).slice(0, 12), 10);
    })(), loadMovieRail = (e)=>t(function*() {
        var t, r;
        let n = 'region' === (null != (t = e.source) ? t : 'tag').trim() ? 'region' : 'tag', l = (null != (r = e.value) ? r : '').trim() || '热门', o = u(e), a = `${l}电影`;
        console.log(`${i} loadMovieRail source=${n} value=${l} page=${o}`);
        try {
            return ('region' === n ? yield w(e, {
                countries: l,
                tags: '电影',
                page: o
            }) : yield _(e, {
                type: 'movie',
                tag: l,
                page: o
            })).map((t)=>O(t, e));
        } catch (e) {
            return [
                S(a, e)
            ];
        }
    })(), loadTvRail = (e)=>t(function*() {
        var t;
        let r = (null != (t = e.tag) ? t : '').trim() || '热门', n = u(e);
        console.log(`${i} loadTvRail tag=${r} page=${n}`);
        try {
            return (yield _(e, {
                type: 'tv',
                tag: r,
                page: n
            })).map((t)=>O(t, e));
        } catch (e) {
            return [
                S(`${r}剧集`, e)
            ];
        }
    })(), loadVariety = (e)=>t(function*() {
        var t;
        let r = u(e);
        console.log(`${i} loadVariety page=${r}`);
        let n = yield C(()=>_(e, {
                type: 'tv',
                tag: '综艺',
                page: r
            }));
        if (n.items.length > 0) return n.items.map((t)=>O(t, e));
        console.log(`${i} loadVariety 主路线无结果，走真人秀探索路线`);
        let l = yield C(()=>w(e, {
                tags: '电视剧',
                genres: '真人秀',
                page: r
            }));
        if (l.items.length > 0) return l.items.map((t)=>O(t, e));
        let o = null != (t = l.err) ? t : n.err;
        return o ? [
            S('综艺', o)
        ] : [];
    })(), loadDocumentary = (e)=>t(function*() {
        let t = u(e);
        console.log(`${i} loadDocumentary page=${t}`);
        let r = yield C(()=>w(e, {
                genres: '纪录片',
                tags: '电影',
                page: t
            })), n = yield C(()=>w(e, {
                genres: '纪录片',
                tags: '电视剧',
                page: t
            })), l = R([
            r.items,
            n.items
        ]);
        if (0 === l.length) {
            console.log(`${i} loadDocumentary 探索路线无结果，走标签路线`);
            let u = yield C(()=>_(e, {
                    type: 'movie',
                    tag: '纪录片',
                    page: t
                })), c = yield C(()=>_(e, {
                    type: 'tv',
                    tag: '纪录片',
                    page: t
                }));
            if (0 === (l = R([
                u.items,
                c.items
            ])).length) {
                var o, a, s;
                let e = null != (o = null != (a = null != (s = u.err) ? s : c.err) ? a : r.err) ? o : n.err;
                return e ? [
                    S('纪录片', e)
                ] : [];
            }
        }
        return l.map((t)=>O(t, e));
    })(), loadHighRated = (e)=>t(function*() {
        let t = u(e);
        console.log(`${i} loadHighRated page=${t}`);
        try {
            let r = yield _(e, {
                type: 'movie',
                tag: '豆瓣高分',
                sort: 'rank',
                page: t
            });
            return N(e, r.slice(0, 10), 10);
        } catch (e) {
            return [
                S('高分佳作', e)
            ];
        }
    })(), loadMainland = (e)=>t(function*() {
        let t = u(e);
        console.log(`${i} loadMainland page=${t}`);
        let r = yield C(()=>w(e, {
                countries: '中国大陆',
                tags: '电影',
                page: t
            })), n = yield C(()=>w(e, {
                countries: '中国大陆',
                tags: '电视剧',
                page: t
            })), l = R([
            r.items,
            n.items
        ]);
        if (0 === l.length) {
            let i = yield C(()=>w(e, {
                    countries: '中国大陆',
                    page: t
                }));
            if (0 === (l = i.items).length) {
                var o, a, s;
                let l = yield C(()=>_(e, {
                        type: 'movie',
                        tag: '华语',
                        page: t
                    }));
                if (l.items.length > 0) return l.items.map((t)=>O(t, e));
                let u = null != (o = null != (a = null != (s = l.err) ? s : i.err) ? a : r.err) ? o : n.err;
                return u ? [
                    S('华语精选', u)
                ] : [];
            }
        }
        return l.map((t)=>O(t, e));
    })(), loadHkTw = (e)=>t(function*() {
        let t = u(e);
        console.log(`${i} loadHkTw page=${t}`);
        let r = yield C(()=>w(e, {
                countries: '中国香港',
                tags: '电影',
                page: t
            })), n = yield C(()=>w(e, {
                countries: '中国台湾',
                tags: '电影',
                page: t
            })), l = R([
            r.items,
            n.items
        ]);
        if (0 === l.length) {
            let i = yield C(()=>w(e, {
                    countries: '中国香港',
                    page: t
                })), u = yield C(()=>w(e, {
                    countries: '中国台湾',
                    page: t
                }));
            if (0 === (l = R([
                i.items,
                u.items
            ])).length) {
                var o, a, s;
                let e = null != (o = null != (a = null != (s = i.err) ? s : u.err) ? a : r.err) ? o : n.err;
                return e ? [
                    S('港台精选', e)
                ] : [];
            }
        }
        return l.map((t)=>O(t, e));
    })(), loadJpKr = (e)=>t(function*() {
        let t = u(e);
        console.log(`${i} loadJpKr page=${t}`);
        let r = yield C(()=>_(e, {
                type: 'movie',
                tag: '韩国',
                page: t
            })), n = yield C(()=>_(e, {
                type: 'movie',
                tag: '日本',
                page: t
            })), l = R([
            r.items,
            n.items
        ]);
        if (0 === l.length) {
            var o;
            let e = null != (o = r.err) ? o : n.err;
            return e ? [
                S('日韩精选', e)
            ] : [];
        }
        return l.map((t)=>O(t, e));
    })(), loadTop250 = (e)=>t(function*() {
        let a = u(e), s = (a - 1) * 25;
        console.log(`${i} loadTop250 page=${a} start=${s}`);
        let c = null;
        try {
            let o = yield k(`${l}/top250?start=${s}`, e), a = yield t(function*() {
                let t = yield Widget.html.load(o), i = [];
                return t('.item').each((l, o)=>{
                    var a, u, s, c;
                    let d = t(o), p = null != (a = null != (u = d.find('.pic a').first().attr('href')) ? u : d.find('a').first().attr('href')) ? a : '', g = /subject\/(\d+)/.exec(p);
                    if (!g) return;
                    let m = g[1], v = d.find('.hd .title').first().text().trim() || d.find('.title').first().text().trim();
                    if (!v) return;
                    let h = f(null != (s = d.find('.pic img').first().attr('src')) ? s : '', e), b = d.find('.rating_num').first().text().trim(), $ = null != (c = d.find('.bd p').first().text().replace(/\s+/g, ' ').trim().split('<br>').join(' ').split(/\s{2,}/).pop()) ? c : '', j = /(\d{4})/.exec($), k = d.find('.inq').first().text().trim(), T = [];
                    b && T.push(`豆瓣评分：${b}`), $ && T.push($), k && T.push(k), i.push(n(r({
                        id: m,
                        type: 'detail',
                        title: v,
                        link: `douban:${m}`,
                        posterPath: h || void 0,
                        coverUrl: h || void 0,
                        backdropPath: h || void 0
                    }, h ? y() : {}), {
                        rating: b || void 0,
                        releaseDate: j ? j[1] : void 0,
                        mediaType: 'movie',
                        subtitle: b ? `豆瓣评分 ${b}` : void 0,
                        description: T.join('\n') || void 0
                    }));
                }), i;
            })();
            if (a.length > 0) return a;
            console.log(`${i} loadTop250 HTML 解析出 0 条，走经典标签路线`);
        } catch (e) {
            c = e, console.log(`${i} loadTop250 HTML 路线失败，走经典标签路线: ${o(e)}`);
        }
        try {
            return (yield _(e, {
                type: 'movie',
                tag: '经典',
                sort: 'rank',
                page: a
            })).map((t)=>O(t, e));
        } catch (e) {
            return [
                S('豆瓣 Top250', null != c ? c : e)
            ];
        }
    })();
let A = [
    '剧情',
    '喜剧',
    '动作',
    '科幻',
    '动画',
    '悬疑'
];
function I(e) {
    let t = (null != e ? e : '').trim();
    return t.startsWith('douban:genre:') ? t.slice(13).trim() : t;
}
loadGenres = (e)=>t(function*() {
        var t, l;
        let o = I(null != (t = e.genreId) ? t : '');
        if (o) return console.log(`${i} loadGenres 收到 genreId=${o}，转分类片单`), loadGenrePage(n(r({}, e), {
            genre: o
        }));
        console.log(`${i} loadGenres 无 genreId，返回多类型融合片单`);
        let a = [];
        for (let t of A)a.push((yield C(()=>w(e, {
                genres: t
            }))));
        let u = R(a.map((e)=>e.items)).slice(0, 18);
        if (0 === u.length) {
            let e = null == (l = a.find((e)=>e.err)) ? void 0 : l.err;
            return e ? [
                S('分类浏览', e)
            ] : [];
        }
        return u.map((t)=>O(t, e));
    })(), loadGenrePage = (e)=>t(function*() {
        var t, r;
        let n = (null != (t = e.genre) ? t : '').trim() || I(null != (r = e.genreId) ? r : '') || '剧情', l = u(e);
        console.log(`${i} loadGenrePage genre=${n} page=${l}`);
        try {
            return (yield w(e, {
                genres: n,
                page: l
            })).map((t)=>O(t, e));
        } catch (e) {
            return [
                S(`分类·${n}`, e)
            ];
        }
    })(), loadDetail = (e, a)=>t(function*() {
        var u, g, m, v, b;
        let $, j, P = (null != e ? e : '').trim();
        if (!P) return [];
        if ('douban:diag' === P) return {
            id: 'diag:about',
            type: 'detail',
            title: '豆瓣影视 · 说明',
            link: 'douban:diag',
            mediaType: 'movie',
            description: "这是「豆瓣影视」纯浏览模块：分区数据来自豆瓣公开接口，详情页只有资料（评分、海报、演职员、简介），不带播放源。\n播放请用你在 Rex 里绑定的 Emby 库或其他模块——在那些模块的详情页选片即可。\n若某个分区提示被登录门拦截（008)：在浏览器登录 movie.douban.com，复制完整 Cookie 填到本模块设置里再刷新；模块只会在被拦截时带 Cookie 重试一次，平时匿名取数。"
        };
        let D = '';
        if (P.startsWith('douban:')) {
            let e = P.slice(7).trim();
            /^\d+$/.test(e) && (D = e);
        }
        if (!D) {
            let e = /subject\/(\d+)/.exec(P);
            e && (D = e[1]);
        }
        if (!D) return [];
        let x = (j = {
            cookie: p(c),
            posterProxy: p(d)
        }, a && ('string' == typeof a.cookie && (j.cookie = a.cookie), 'string' == typeof a.posterProxy && (j.posterProxy = a.posterProxy), 'string' == typeof a.pageSize && (j.pageSize = a.pageSize)), j), _ = `${l}/subject/${D}/`, w = null, O = null;
        try {
            w = yield M(x, D);
        } catch (e) {
            O = e;
        }
        if (!w) return console.log(`${i} loadDetail ${D} 详情不可用: ${O ? o(O) : '无数据'}`), {
            id: D,
            type: 'detail',
            title: `豆瓣条目 ${D}`,
            link: `douban:${D}`,
            mediaType: 'movie',
            description: [
                O instanceof h ? '豆瓣详情接口被登录门拦截（008)。可在模块设置里填入豆瓣 Cookie 后重试。' : '这次没能从豆瓣取到该条目的详情，可以稍后重试。',
                `豆瓣页面：${_}`
            ].join('\n')
        };
        let R = yield (g = D, t(function*() {
            try {
                let e = yield k(`${l}/subject/${g}/`, x), t = yield Widget.html.load(e), r = t('#info').text().replace(/\s+/g, ' '), n = '', o = /(tt\d{7,8})/.exec(r);
                if (o && (n = o[1]), !n) {
                    let t = /imdb\.com\/title\/(tt\d{7,8})/.exec(e);
                    t && (n = t[1]);
                }
                let a = '', u = /(?:单集片长|片长)[:：]\s*([0-9]+\s*分钟(?:\s*[0-9]+\s*秒)?)/.exec(r);
                u && (a = u[1].replace(/\s+/g, ''));
                let s = t('span[property="v:summary"]').first().text().replace(/\s+/g, ' ').trim(), c = [];
                return t('span[property="v:genre"]').each((e, r)=>{
                    let n = t(r).text().trim();
                    n && c.push(n);
                }), console.log(`${i} 条目页 ${g} 解析：IMDb=${n || '无'} 片长=${a || '无'} 类型=${c.length}个`), {
                    imdbId: n,
                    runtimeText: a,
                    summary: s,
                    genres: c
                };
            } catch (e) {
                return console.log(`${i} 条目页 ${g} 解析失败（用摘要数据）: ${o(e)}`), null;
            }
        })());
        R && (!w.summary && R.summary && (w.summary = R.summary), 0 === w.genres.length && R.genres.length > 0 && (w.genres = R.genres));
        let N = null != (u = null == R ? void 0 : R.imdbId) ? u : '', S = 'tv' === w.subtype ? 'tv' : 'movie', C = N ? yield (m = 'tv' === S, t(function*() {
            try {
                let e = yield Widget.tmdb.get(`/find/${N}`, {
                    params: {
                        external_source: 'imdb_id'
                    }
                }), t = Array.isArray(null == e ? void 0 : e.movie_results) ? e.movie_results : [], r = Array.isArray(null == e ? void 0 : e.tv_results) ? e.tv_results : [];
                for (let e of m ? [
                    ...r,
                    ...t
                ] : [
                    ...t,
                    ...r
                ]){
                    let t = T(null == e ? void 0 : e.id);
                    if (t) return {
                        id: t,
                        posterPath: T(null == e ? void 0 : e.poster_path),
                        backdropPath: T(null == e ? void 0 : e.backdrop_path)
                    };
                }
                return null;
            } catch (e) {
                return console.log(`${i} TMDB find ${N} 失败: ${o(e)}`), null;
            }
        })()) : null;
        C ? console.log(`${i} loadDetail ${D} 身份命中：TMDB ${C.id}（经 IMDb ${N}）`) : N && console.log(`${i} loadDetail ${D} 有 IMDb ${N}，TMDB 未命中，仅带 IMDb 身份`);
        let A = (null == R ? void 0 : R.runtimeText) || w.durations[0] || '', I = [
            ...w.directors.map((e)=>({
                    id: e,
                    title: e,
                    role: '导演'
                })),
            ...w.casts.map((e)=>({
                    id: e,
                    title: e,
                    role: '演员'
                }))
        ], H = [];
        w.year && H.push(w.year), w.countries.length > 0 && H.push(w.countries.join(' / ')), w.languages.length > 0 && H.push(w.languages.join(' / ')), A ? H.push(A) : w.durations.length > 0 && H.push(w.durations.join(' / '));
        let W = [];
        w.originalTitle && w.originalTitle !== w.title && W.push(`原名：${w.originalTitle}`), w.rate && W.push(`豆瓣评分：${w.rate}`), H.length > 0 && W.push(H.join(' · ')), w.summary && W.push(`简介：${s(w.summary, 600)}`);
        let G = f(w.cover, x);
        $ = C && C.posterPath ? {
            posterPath: C.posterPath,
            detailPoster: C.posterPath,
            coverUrl: `https://image.tmdb.org/t/p/w500${C.posterPath}`,
            backdropPath: C.backdropPath || C.posterPath
        } : C ? r({
            coverUrl: G || void 0,
            backdropPath: G || void 0
        }, G ? y() : {}) : r({
            posterPath: G || void 0,
            detailPoster: w.cover ? f((v = w.cover) ? v.replace('s_ratio_poster', 'l_ratio_poster') : v, x) : void 0,
            coverUrl: G || void 0,
            backdropPath: G || void 0
        }, G ? y() : {});
        let U = function(e) {
            let t = /^(\d+)分钟$/.exec((null != e ? e : '').replace(/\s+/g, ''));
            if (!t) return;
            let r = parseInt(t[1], 10);
            return Number.isFinite(r) && r > 0 ? 60 * r : void 0;
        }(A), E = r(n(r({
            id: C ? C.id : D,
            type: C ? 'tmdb' : 'detail',
            title: String(null != (b = w.title) ? b : '').replace(/\s*[（(]\s*\d{4}\s*[)）]\s*$/, '').trim() || `豆瓣条目 ${D}`,
            link: `douban:${D}`
        }, $), {
            rating: w.rate || void 0,
            releaseDate: w.year || void 0,
            mediaType: S,
            genreTitle: w.genres.length > 0 ? w.genres.join(' / ') : void 0,
            genreItems: w.genres.length > 0 ? w.genres.map((e)=>({
                    id: e,
                    title: e
                })) : void 0,
            peoples: I.length > 0 ? I : void 0,
            description: W.join('\n') || void 0
        }), A ? {
            durationText: A
        } : {}, U ? {
            duration: U
        } : {});
        return C && (E.tmdbId = C.id), N && (E.imdbId = N), E;
    })(), loadResource = (e)=>t(function*() {
        return console.log(`${i} loadResource 被调用（纯浏览模块，无播放源，返回空）`), [];
    })(), search = (e)=>t(function*() {
        var t, o, u, s, c;
        let d = (null != (t = null != (o = null != (u = e.keyword) ? u : e.title) ? o : e.query) ? t : '').trim();
        if (!d) return [];
        console.log(`${i} search q=${d}`);
        try {
            let t = `${l}/j/subject_suggest?${a({
                q: d
            })}`, i = yield j(t, e), o = Array.isArray(i) ? i : Array.isArray(null == i ? void 0 : i.subjects) ? i.subjects : [], u = [];
            for (let t of o){
                let i = T(null != (s = null == t ? void 0 : t.type) ? s : 'movie');
                if ('movie' !== i && 'tv' !== i) continue;
                let l = T(null == t ? void 0 : t.id), o = T(null == t ? void 0 : t.title);
                if (!l || !o) continue;
                let a = f(T(null != (c = null == t ? void 0 : t.img) ? c : null == t ? void 0 : t.cover), e), d = T(null == t ? void 0 : t.year), p = T(null == t ? void 0 : t.sub_title);
                u.push(n(r({
                    id: l,
                    type: 'detail',
                    title: o,
                    link: `douban:${l}`,
                    posterPath: a || void 0,
                    coverUrl: a || void 0,
                    backdropPath: a || void 0
                }, a ? y() : {}), {
                    releaseDate: d || void 0,
                    mediaType: 'tv' === i ? 'tv' : 'movie',
                    subtitle: [
                        d,
                        p
                    ].filter(Boolean).join(' · ') || void 0,
                    description: p ? `原名：${p}` : void 0
                }));
            }
            return u;
        } catch (e) {
            return [
                S('搜索', e)
            ];
        }
    })();
