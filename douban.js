function e(e, t, r, i, n, l, o) {
    try {
        var a = e[l](o), u = a.value;
    } catch (e) {
        r(e);
        return;
    }
    a.done ? t(u) : Promise.resolve(u).then(i, n);
}
function t(t) {
    return function() {
        var r = this, i = arguments;
        return new Promise(function(n, l) {
            var o = t.apply(r, i);
            function a(t) {
                e(o, n, l, a, u, "next", t);
            }
            function u(t) {
                e(o, n, l, a, u, "throw", t);
            }
            a(void 0);
        });
    };
}
function r(e) {
    for(var t = 1; t < arguments.length; t++){
        var r = null != arguments[t] ? arguments[t] : {}, i = Object.keys(r);
        "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(r).filter(function(e) {
            return Object.getOwnPropertyDescriptor(r, e).enumerable;
        }))), i.forEach(function(t) {
            var i;
            i = r[t], t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i;
        });
    }
    return e;
}
function i(e, t) {
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
    description: '豆瓣影视浏览：今日推荐（每日轮换）、热门精选、电影 / 电视剧 / 综艺 / 纪录片、高分佳作、华语 / 港台 / 日韩精选、豆瓣 Top250 与分类片单。纯浏览模块，不带播放源——详情页是豆瓣资料（评分、海报、演职员、简介），播放请用你在 Rex 里绑定的 Emby 库或其他模块。若某个分区提示被登录门拦截，可在模块设置里填入豆瓣 Cookie 后重试。海报若加载不出来，是豆瓣图片防盗链（需要 Referer）：部署配套的海报代理 Worker 后，把代理地址填入「海报代理地址」即可。',
    author: 'v7777',
    site: 'https://movie.douban.com',
    version: "0.1.1",
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
            description: '可选。豆瓣海报有防盗链（无豆瓣 Referer 返回 418），Rex 直接加载会失败。部署配套的 douban-poster-worker.js 到 Cloudflare Workers 后，把「https://你的Worker地址/?url=」整段填进来，模块发出的豆瓣海报会改走代理；留空则直出原地址',
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
let n = '[豆瓣影视]', l = 'https://movie.douban.com';
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
function m(e, t) {
    var r;
    let i = (null != e ? e : '').trim();
    if (!i) return '';
    let n = (null != (r = null == t ? void 0 : t.posterProxy) ? r : '').trim();
    return !n || i.startsWith(n) ? i : n + encodeURIComponent(i);
}
function y(e) {
    if (null == e) return null;
    if ('object' == typeof e) return e;
    if ('string' == typeof e) try {
        return JSON.parse(e);
    } catch (e) {}
    return null;
}
class f extends Error {
    constructor(e){
        super(e), this.name = 'GateError';
    }
}
function v(e) {
    return !!e && (e.includes('sec.douban.com') || e.includes('异常请求') || /error\s*008/i.test(e) || e.includes('验证你不是机器人') || e.includes('你的请求过于频繁'));
}
function h(e, r, i, l) {
    return t(function*() {
        var o;
        r && ('string' == typeof r.cookie && g(c, r.cookie.trim()), 'string' == typeof r.posterProxy && g(d, r.posterProxy.trim()));
        let a = (null != (o = r.cookie) ? o : '').trim(), u = null, s = null;
        for(let r = 0; r < 2; r++){
            let o = 1 === r;
            if (o && !a) break;
            o && console.log(`${n} ${l} 匿名未取到，带 Cookie 重试: ${e}`);
            try {
                let r = yield function(e, r) {
                    return t(function*() {
                        let t, i = yield Widget.http.get(e, {
                            headers: (t = {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                                Accept: 'application/json, text/html, */*',
                                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
                                Referer: 'https://movie.douban.com/'
                            }, r && (t.Cookie = r), t)
                        }), n = 'number' == typeof (null == i ? void 0 : i.statusCode) ? i.statusCode : 200;
                        if (n >= 400) throw Error(`HTTP ${n}: ${e}`);
                        let l = null == i ? void 0 : i.data;
                        if ('string' == typeof l) return l;
                        if (null == l) return '';
                        try {
                            return JSON.stringify(l);
                        } catch (e) {
                            return String(l);
                        }
                    })();
                }(e, o ? a : void 0);
                if (i(r)) return r;
                s = r, u = null;
            } catch (e) {
                u = e, s = null;
            }
        }
        if (null != s && v(s)) throw new f(`豆瓣返回了机器人验证/登录门页面: ${e}`);
        if (u) throw u;
        throw Error(`${l} 返回内容不可用: ${e}`);
    })();
}
function b(e, r) {
    return t(function*() {
        let t = yield h(e, r, (e)=>null != y(e), '接口');
        return y(t);
    })();
}
function $(e, r) {
    return t(function*() {
        return h(e, r, (e)=>e.length > 200 && !v(e), '页面');
    })();
}
function j(e) {
    return 'string' == typeof e ? e.trim() : 'number' == typeof e && Number.isFinite(e) ? String(e) : '';
}
function k(e) {
    if (!Array.isArray(e)) {
        let t = j(e);
        return t ? [
            t
        ] : [];
    }
    let t = [];
    for (let n of e){
        var r, i;
        let e = 'string' == typeof n ? n.trim() : j(null != (r = null != (i = null == n ? void 0 : n.name) ? i : null == n ? void 0 : n.title) ? r : null == n ? void 0 : n.value);
        e && t.push(e);
    }
    return t;
}
function T(e) {
    let t = j(e);
    if (t) return t;
    if (e && 'object' == typeof e) {
        var r, i, n;
        return j(null != (r = null != (i = null != (n = e.value) ? n : e.average) ? i : e.score) ? r : e.rating);
    }
    return '';
}
function P(e) {
    let t = parseFloat(e.rate);
    return Number.isFinite(t) ? t : 0;
}
function x(e, r) {
    return t(function*() {
        var t, i, o;
        let u, s = Number.isFinite(u = parseInt(String(null != (o = e.pageSize) ? o : ''), 10)) ? Math.min(50, Math.max(10, u)) : 24, c = null != (t = r.page) ? t : 1, d = `${l}/j/search_subjects?${a({
            type: r.type,
            tag: r.tag,
            sort: null != (i = r.sort) ? i : 'recommend',
            page_limit: String(s),
            page_start: String((c - 1) * s)
        })}`;
        console.log(`${n} search_subjects type=${r.type} tag=${r.tag} page=${c}`);
        let p = yield b(d, e);
        return (Array.isArray(null == p ? void 0 : p.subjects) ? p.subjects : []).map((e)=>(function(e, t) {
                var r, i, n, l;
                if (!e || 'object' != typeof e) return null;
                let o = j(e.id), a = j(e.title);
                return o && a ? {
                    id: o,
                    title: a,
                    rate: T(null != (r = e.rate) ? r : e.rating),
                    cover: j(null != (i = null != (n = null != (l = e.cover) ? l : e.cover_url) ? n : e.pic) ? i : e.image),
                    mediaType: t,
                    directors: k(e.directors),
                    casts: k(e.casts),
                    year: j(e.year) || void 0
                } : null;
            })(e, r.type)).filter((e)=>null != e);
    })();
}
function D(e, r) {
    return t(function*() {
        var t, i, o, u, s, c, d;
        let p = null != (t = r.page) ? t : 1, g = `${l}/j/new_search_subjects?${a({
            sort: 'U',
            range: '0,10',
            tags: null != (i = r.tags) ? i : '',
            genres: null != (o = r.genres) ? o : '',
            countries: null != (u = r.countries) ? u : '',
            start: String((p - 1) * 20),
            year_range: ''
        })}`;
        console.log(`${n} new_search_subjects genres=${null != (s = r.genres) ? s : ''} countries=${null != (c = r.countries) ? c : ''} tags=${null != (d = r.tags) ? d : ''} page=${p}`);
        let m = yield b(g, e);
        return (Array.isArray(null == m ? void 0 : m.data) ? m.data : Array.isArray(m) ? m : []).map((e)=>(function(e) {
                var t, r, i, n, l;
                if (!e || 'object' != typeof e) return null;
                let o = j(e.id), a = j(e.title);
                if (!o || !a) return null;
                let u = j(null != (t = e.subtype) ? t : e.type);
                return {
                    id: o,
                    title: a,
                    rate: T(null != (r = e.rate) ? r : e.rating),
                    cover: j(null != (i = null != (n = null != (l = e.cover) ? l : e.cover_url) ? n : e.pic) ? i : e.image),
                    mediaType: 'movie' === u ? 'movie' : 'tv',
                    directors: k(e.directors),
                    casts: k(e.casts),
                    year: j(e.year) || void 0
                };
            })(e)).filter((e)=>null != e);
    })();
}
function _(e, r) {
    return t(function*() {
        let t = `${l}/j/subject_abstract?${a({
            subject_id: r
        })}`;
        return function(e) {
            var t, r, i, n, l, o, a, u, s, c, d, p, g, m, y, f, v;
            if (!e || 'object' != typeof e) return null;
            let h = null != (t = null != (r = e.subject) ? r : e.data) ? t : e;
            if (h && 'object' == typeof h && h.subject && 'object' == typeof h.subject && !h.title && (h = h.subject), !h || 'object' != typeof h) return null;
            let b = j(h.id), $ = j(null != (i = h.title) ? i : h.name);
            if (!b && !$) return null;
            let P = j(h.year);
            if (!P && Array.isArray(h.pubdates) && h.pubdates.length > 0) {
                let e = /(\d{4})/.exec(j(h.pubdates[0]));
                e && (P = e[1]);
            }
            let x = h.pic && 'object' == typeof h.pic ? h.pic : {};
            return {
                id: b,
                title: $,
                originalTitle: j(null != (n = null != (l = h.original_title) ? l : h.originalTitle) ? n : h.aka_title),
                year: P,
                subtype: j(null != (o = h.subtype) ? o : h.type),
                rate: T(null != (a = h.rate) ? a : h.rating),
                cover: j(null != (u = null != (s = null != (c = null != (d = h.cover) ? d : x.large) ? c : x.normal) ? s : h.image) ? u : h.poster),
                genres: k(null != (p = h.genres) ? p : h.types),
                directors: k(h.directors),
                casts: k(null != (g = h.casts) ? g : h.actors),
                countries: k(h.countries),
                languages: k(h.languages),
                durations: k(null != (m = h.durations) ? m : h.duration),
                summary: j(null != (y = null != (f = null != (v = h.summary) ? v : h.intro) ? f : h.abstract) ? y : h.description)
            };
        }((yield b(t, e)));
    })();
}
function w(e, t, r) {
    let i = [];
    e.rate && i.push(`豆瓣评分 ${e.rate}`), e.year && i.push(e.year);
    let n = [];
    e.rate && n.push(`豆瓣评分：${e.rate}`), e.directors.length > 0 && n.push(`导演：${e.directors.join('、')}`), e.casts.length > 0 && n.push(`主演：${e.casts.slice(0, 6).join('、')}`), r && n.push(r);
    let l = m(e.cover, t);
    return {
        id: e.id,
        type: 'detail',
        title: e.title,
        link: `douban:${e.id}`,
        posterPath: l || void 0,
        coverUrl: l || void 0,
        backdropPath: l || void 0,
        rating: e.rate || void 0,
        releaseDate: e.year || void 0,
        mediaType: e.mediaType,
        subtitle: i.join(' · ') || void 0,
        description: n.join('\n') || void 0
    };
}
function M(e) {
    let t = new Map();
    for (let r of e)for (let e of r)t.has(e.id) || t.set(e.id, e);
    return [
        ...t.values()
    ].sort((e, t)=>P(t) - P(e));
}
function O(e, l, a) {
    return t(function*() {
        let t = [], u = 0;
        for (let c of l){
            let l = '', d = c.year, p = c.rate;
            if (u < a) {
                u++;
                try {
                    let t = yield _(e, c.id);
                    t && (l = s(t.summary, 140), !d && t.year && (d = t.year), !p && t.rate && (p = t.rate));
                } catch (e) {
                    console.log(`${n} 简介补全 ${c.id} 失败（用列表数据）: ${o(e)}`);
                }
            }
            t.push(w(i(r({}, c), {
                year: d,
                rate: p
            }), e, l || void 0));
        }
        return t;
    })();
}
function R(e, t) {
    let r = t instanceof f, i = r ? '接口被登录门拦截（008)，可在模块设置填 Cookie 后重试' : `接口请求失败：${s(o(t), 40)}`;
    return console.log(`${n} ${e} 失败: ${o(t)}`), {
        id: `diag:${e}`,
        type: 'detail',
        title: `豆瓣·${e}：${i}`,
        link: 'douban:diag',
        mediaType: 'movie',
        description: [
            `「${e}」这次没能从豆瓣取到数据。`,
            r ? '豆瓣对当前出口 IP 触发了机器人验证/登录门（error 008）。处理办法：在浏览器登录 movie.douban.com，复制完整 Cookie 填到本模块设置里，再下拉刷新——模块只会在被拦截时带 Cookie 重试一次。' : `错误详情：${o(t)}。可以稍后下拉刷新重试。`,
            '本模块是纯浏览模块，不带播放源；播放请用你在 Rex 里绑定的 Emby 库或其他模块。'
        ].join('\n')
    };
}
function N(e) {
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
        if (console.log(`${n} loadToday page=${u(e)}`), u(e) > 1) return [];
        let t = yield N(()=>x(e, {
                type: 'movie',
                tag: '热门'
            })), r = yield N(()=>x(e, {
                type: 'tv',
                tag: '热门'
            })), i = yield N(()=>x(e, {
                type: 'tv',
                tag: '综艺'
            })), l = yield N(()=>D(e, {
                genres: '纪录片'
            })), o = [
            t,
            r,
            i,
            l
        ];
        if (o.every((e)=>0 === e.items.length)) {
            var a;
            let e = null == (a = o.find((e)=>e.err)) ? void 0 : a.err;
            return e ? [
                R('今日推荐', e)
            ] : [];
        }
        let s = (e)=>[
                ...e
            ].sort((e, t)=>P(t) - P(e)).slice(0, 10), c = M([
            s(t.items),
            s(r.items),
            s(i.items),
            s(l.items)
        ]), d = function(e) {
            if (e.length <= 8) return e.slice();
            let t = new Date(), r = (Math.floor(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 86400000) % e.length + e.length) % e.length;
            return e.slice(r).concat(e.slice(0, r)).slice(0, 8);
        }(c);
        return console.log(`${n} loadToday 候选池 ${c.length} 部，今日取 ${d.length} 部`), O(e, d, 8);
    })(), loadHotMix = (e)=>t(function*() {
        if (console.log(`${n} loadHotMix page=${u(e)}`), u(e) > 1) return [];
        let t = yield N(()=>x(e, {
                type: 'movie',
                tag: '热门'
            })), r = yield N(()=>x(e, {
                type: 'tv',
                tag: '热门'
            }));
        if (0 === t.items.length && 0 === r.items.length) {
            var i;
            let e = null != (i = t.err) ? i : r.err;
            return e ? [
                R('热门精选', e)
            ] : [];
        }
        return O(e, M([
            t.items,
            r.items
        ]).slice(0, 12), 10);
    })(), loadMovieRail = (e)=>t(function*() {
        var t, r;
        let i = 'region' === (null != (t = e.source) ? t : 'tag').trim() ? 'region' : 'tag', l = (null != (r = e.value) ? r : '').trim() || '热门', o = u(e), a = `${l}电影`;
        console.log(`${n} loadMovieRail source=${i} value=${l} page=${o}`);
        try {
            return ('region' === i ? yield D(e, {
                countries: l,
                tags: '电影',
                page: o
            }) : yield x(e, {
                type: 'movie',
                tag: l,
                page: o
            })).map((t)=>w(t, e));
        } catch (e) {
            return [
                R(a, e)
            ];
        }
    })(), loadTvRail = (e)=>t(function*() {
        var t;
        let r = (null != (t = e.tag) ? t : '').trim() || '热门', i = u(e);
        console.log(`${n} loadTvRail tag=${r} page=${i}`);
        try {
            return (yield x(e, {
                type: 'tv',
                tag: r,
                page: i
            })).map((t)=>w(t, e));
        } catch (e) {
            return [
                R(`${r}剧集`, e)
            ];
        }
    })(), loadVariety = (e)=>t(function*() {
        var t;
        let r = u(e);
        console.log(`${n} loadVariety page=${r}`);
        let i = yield N(()=>x(e, {
                type: 'tv',
                tag: '综艺',
                page: r
            }));
        if (i.items.length > 0) return i.items.map((t)=>w(t, e));
        console.log(`${n} loadVariety 主路线无结果，走真人秀探索路线`);
        let l = yield N(()=>D(e, {
                tags: '电视剧',
                genres: '真人秀',
                page: r
            }));
        if (l.items.length > 0) return l.items.map((t)=>w(t, e));
        let o = null != (t = l.err) ? t : i.err;
        return o ? [
            R('综艺', o)
        ] : [];
    })(), loadDocumentary = (e)=>t(function*() {
        let t = u(e);
        console.log(`${n} loadDocumentary page=${t}`);
        let r = yield N(()=>D(e, {
                genres: '纪录片',
                tags: '电影',
                page: t
            })), i = yield N(()=>D(e, {
                genres: '纪录片',
                tags: '电视剧',
                page: t
            })), l = M([
            r.items,
            i.items
        ]);
        if (0 === l.length) {
            console.log(`${n} loadDocumentary 探索路线无结果，走标签路线`);
            let u = yield N(()=>x(e, {
                    type: 'movie',
                    tag: '纪录片',
                    page: t
                })), c = yield N(()=>x(e, {
                    type: 'tv',
                    tag: '纪录片',
                    page: t
                }));
            if (0 === (l = M([
                u.items,
                c.items
            ])).length) {
                var o, a, s;
                let e = null != (o = null != (a = null != (s = u.err) ? s : c.err) ? a : r.err) ? o : i.err;
                return e ? [
                    R('纪录片', e)
                ] : [];
            }
        }
        return l.map((t)=>w(t, e));
    })(), loadHighRated = (e)=>t(function*() {
        let t = u(e);
        console.log(`${n} loadHighRated page=${t}`);
        try {
            let r = yield x(e, {
                type: 'movie',
                tag: '豆瓣高分',
                sort: 'rank',
                page: t
            });
            return O(e, r.slice(0, 10), 10);
        } catch (e) {
            return [
                R('高分佳作', e)
            ];
        }
    })(), loadMainland = (e)=>t(function*() {
        let t = u(e);
        console.log(`${n} loadMainland page=${t}`);
        let r = yield N(()=>D(e, {
                countries: '中国大陆',
                tags: '电影',
                page: t
            })), i = yield N(()=>D(e, {
                countries: '中国大陆',
                tags: '电视剧',
                page: t
            })), l = M([
            r.items,
            i.items
        ]);
        if (0 === l.length) {
            let n = yield N(()=>D(e, {
                    countries: '中国大陆',
                    page: t
                }));
            if (0 === (l = n.items).length) {
                var o, a, s;
                let l = yield N(()=>x(e, {
                        type: 'movie',
                        tag: '华语',
                        page: t
                    }));
                if (l.items.length > 0) return l.items.map((t)=>w(t, e));
                let u = null != (o = null != (a = null != (s = l.err) ? s : n.err) ? a : r.err) ? o : i.err;
                return u ? [
                    R('华语精选', u)
                ] : [];
            }
        }
        return l.map((t)=>w(t, e));
    })(), loadHkTw = (e)=>t(function*() {
        let t = u(e);
        console.log(`${n} loadHkTw page=${t}`);
        let r = yield N(()=>D(e, {
                countries: '中国香港',
                tags: '电影',
                page: t
            })), i = yield N(()=>D(e, {
                countries: '中国台湾',
                tags: '电影',
                page: t
            })), l = M([
            r.items,
            i.items
        ]);
        if (0 === l.length) {
            let n = yield N(()=>D(e, {
                    countries: '中国香港',
                    page: t
                })), u = yield N(()=>D(e, {
                    countries: '中国台湾',
                    page: t
                }));
            if (0 === (l = M([
                n.items,
                u.items
            ])).length) {
                var o, a, s;
                let e = null != (o = null != (a = null != (s = n.err) ? s : u.err) ? a : r.err) ? o : i.err;
                return e ? [
                    R('港台精选', e)
                ] : [];
            }
        }
        return l.map((t)=>w(t, e));
    })(), loadJpKr = (e)=>t(function*() {
        let t = u(e);
        console.log(`${n} loadJpKr page=${t}`);
        let r = yield N(()=>x(e, {
                type: 'movie',
                tag: '韩国',
                page: t
            })), i = yield N(()=>x(e, {
                type: 'movie',
                tag: '日本',
                page: t
            })), l = M([
            r.items,
            i.items
        ]);
        if (0 === l.length) {
            var o;
            let e = null != (o = r.err) ? o : i.err;
            return e ? [
                R('日韩精选', e)
            ] : [];
        }
        return l.map((t)=>w(t, e));
    })(), loadTop250 = (e)=>t(function*() {
        let r = u(e), i = (r - 1) * 25;
        console.log(`${n} loadTop250 page=${r} start=${i}`);
        let a = null;
        try {
            let r = yield $(`${l}/top250?start=${i}`, e), o = yield t(function*() {
                let t = yield Widget.html.load(r), i = [];
                return t('.item').each((r, n)=>{
                    var l, o, a, u;
                    let s = t(n), c = null != (l = null != (o = s.find('.pic a').first().attr('href')) ? o : s.find('a').first().attr('href')) ? l : '', d = /subject\/(\d+)/.exec(c);
                    if (!d) return;
                    let p = d[1], g = s.find('.hd .title').first().text().trim() || s.find('.title').first().text().trim();
                    if (!g) return;
                    let y = m(null != (a = s.find('.pic img').first().attr('src')) ? a : '', e), f = s.find('.rating_num').first().text().trim(), v = null != (u = s.find('.bd p').first().text().replace(/\s+/g, ' ').trim().split('<br>').join(' ').split(/\s{2,}/).pop()) ? u : '', h = /(\d{4})/.exec(v), b = s.find('.inq').first().text().trim(), $ = [];
                    f && $.push(`豆瓣评分：${f}`), v && $.push(v), b && $.push(b), i.push({
                        id: p,
                        type: 'detail',
                        title: g,
                        link: `douban:${p}`,
                        posterPath: y || void 0,
                        coverUrl: y || void 0,
                        backdropPath: y || void 0,
                        rating: f || void 0,
                        releaseDate: h ? h[1] : void 0,
                        mediaType: 'movie',
                        subtitle: f ? `豆瓣评分 ${f}` : void 0,
                        description: $.join('\n') || void 0
                    });
                }), i;
            })();
            if (o.length > 0) return o;
            console.log(`${n} loadTop250 HTML 解析出 0 条，走经典标签路线`);
        } catch (e) {
            a = e, console.log(`${n} loadTop250 HTML 路线失败，走经典标签路线: ${o(e)}`);
        }
        try {
            return (yield x(e, {
                type: 'movie',
                tag: '经典',
                sort: 'rank',
                page: r
            })).map((t)=>w(t, e));
        } catch (e) {
            return [
                R('豆瓣 Top250', null != a ? a : e)
            ];
        }
    })();
let S = [
    '剧情',
    '喜剧',
    '动作',
    '科幻',
    '动画',
    '悬疑'
];
function C(e) {
    let t = (null != e ? e : '').trim();
    return t.startsWith('douban:genre:') ? t.slice(13).trim() : t;
}
loadGenres = (e)=>t(function*() {
        var t, l;
        let o = C(null != (t = e.genreId) ? t : '');
        if (o) return console.log(`${n} loadGenres 收到 genreId=${o}，转分类片单`), loadGenrePage(i(r({}, e), {
            genre: o
        }));
        console.log(`${n} loadGenres 无 genreId，返回多类型融合片单`);
        let a = [];
        for (let t of S)a.push((yield N(()=>D(e, {
                genres: t
            }))));
        let u = M(a.map((e)=>e.items)).slice(0, 18);
        if (0 === u.length) {
            let e = null == (l = a.find((e)=>e.err)) ? void 0 : l.err;
            return e ? [
                R('分类浏览', e)
            ] : [];
        }
        return u.map((t)=>w(t, e));
    })(), loadGenrePage = (e)=>t(function*() {
        var t, r;
        let i = (null != (t = e.genre) ? t : '').trim() || C(null != (r = e.genreId) ? r : '') || '剧情', l = u(e);
        console.log(`${n} loadGenrePage genre=${i} page=${l}`);
        try {
            return (yield D(e, {
                genres: i,
                page: l
            })).map((t)=>w(t, e));
        } catch (e) {
            return [
                R(`分类·${i}`, e)
            ];
        }
    })(), loadDetail = (e, a)=>t(function*() {
        var u, g, y, v, h;
        let b, k, T = (null != e ? e : '').trim();
        if (!T) return [];
        if ('douban:diag' === T) return {
            id: 'diag:about',
            type: 'detail',
            title: '豆瓣影视 · 说明',
            link: 'douban:diag',
            mediaType: 'movie',
            description: "这是「豆瓣影视」纯浏览模块：分区数据来自豆瓣公开接口，详情页只有资料（评分、海报、演职员、简介），不带播放源。\n播放请用你在 Rex 里绑定的 Emby 库或其他模块——在那些模块的详情页选片即可。\n若某个分区提示被登录门拦截（008)：在浏览器登录 movie.douban.com，复制完整 Cookie 填到本模块设置里再刷新；模块只会在被拦截时带 Cookie 重试一次，平时匿名取数。"
        };
        let P = '';
        if (T.startsWith('douban:')) {
            let e = T.slice(7).trim();
            /^\d+$/.test(e) && (P = e);
        }
        if (!P) {
            let e = /subject\/(\d+)/.exec(T);
            e && (P = e[1]);
        }
        if (!P) return [];
        let x = (k = {
            cookie: p(c),
            posterProxy: p(d)
        }, a && ('string' == typeof a.cookie && (k.cookie = a.cookie), 'string' == typeof a.posterProxy && (k.posterProxy = a.posterProxy), 'string' == typeof a.pageSize && (k.pageSize = a.pageSize)), k), D = `${l}/subject/${P}/`, w = null, M = null;
        try {
            w = yield _(x, P);
        } catch (e) {
            M = e;
        }
        if (!w) return console.log(`${n} loadDetail ${P} 详情不可用: ${M ? o(M) : '无数据'}`), {
            id: P,
            type: 'detail',
            title: `豆瓣条目 ${P}`,
            link: `douban:${P}`,
            mediaType: 'movie',
            description: [
                M instanceof f ? '豆瓣详情接口被登录门拦截（008)。可在模块设置里填入豆瓣 Cookie 后重试。' : '这次没能从豆瓣取到该条目的详情，可以稍后重试。',
                `豆瓣页面：${D}`
            ].join('\n')
        };
        let O = yield (g = P, t(function*() {
            try {
                let e = yield $(`${l}/subject/${g}/`, x), t = yield Widget.html.load(e), r = t('#info').text().replace(/\s+/g, ' '), i = '', o = /(tt\d{7,8})/.exec(r);
                if (o && (i = o[1]), !i) {
                    let t = /imdb\.com\/title\/(tt\d{7,8})/.exec(e);
                    t && (i = t[1]);
                }
                let a = '', u = /(?:单集片长|片长)[:：]\s*([0-9]+\s*分钟(?:\s*[0-9]+\s*秒)?)/.exec(r);
                u && (a = u[1].replace(/\s+/g, ''));
                let s = t('span[property="v:summary"]').first().text().replace(/\s+/g, ' ').trim(), c = [];
                return t('span[property="v:genre"]').each((e, r)=>{
                    let i = t(r).text().trim();
                    i && c.push(i);
                }), console.log(`${n} 条目页 ${g} 解析：IMDb=${i || '无'} 片长=${a || '无'} 类型=${c.length}个`), {
                    imdbId: i,
                    runtimeText: a,
                    summary: s,
                    genres: c
                };
            } catch (e) {
                return console.log(`${n} 条目页 ${g} 解析失败（用摘要数据）: ${o(e)}`), null;
            }
        })());
        O && (!w.summary && O.summary && (w.summary = O.summary), 0 === w.genres.length && O.genres.length > 0 && (w.genres = O.genres));
        let R = null != (u = null == O ? void 0 : O.imdbId) ? u : '', N = 'tv' === w.subtype ? 'tv' : 'movie', S = R ? yield (y = 'tv' === N, t(function*() {
            try {
                let e = yield Widget.tmdb.get(`/find/${R}`, {
                    params: {
                        external_source: 'imdb_id'
                    }
                }), t = Array.isArray(null == e ? void 0 : e.movie_results) ? e.movie_results : [], r = Array.isArray(null == e ? void 0 : e.tv_results) ? e.tv_results : [];
                for (let e of y ? [
                    ...r,
                    ...t
                ] : [
                    ...t,
                    ...r
                ]){
                    let t = j(null == e ? void 0 : e.id);
                    if (t) return {
                        id: t,
                        posterPath: j(null == e ? void 0 : e.poster_path),
                        backdropPath: j(null == e ? void 0 : e.backdrop_path)
                    };
                }
                return null;
            } catch (e) {
                return console.log(`${n} TMDB find ${R} 失败: ${o(e)}`), null;
            }
        })()) : null;
        S ? console.log(`${n} loadDetail ${P} 身份命中：TMDB ${S.id}（经 IMDb ${R}）`) : R && console.log(`${n} loadDetail ${P} 有 IMDb ${R}，TMDB 未命中，仅带 IMDb 身份`);
        let C = (null == O ? void 0 : O.runtimeText) || w.durations[0] || '', A = [
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
        ], I = [];
        w.year && I.push(w.year), w.countries.length > 0 && I.push(w.countries.join(' / ')), w.languages.length > 0 && I.push(w.languages.join(' / ')), C ? I.push(C) : w.durations.length > 0 && I.push(w.durations.join(' / '));
        let H = [];
        w.originalTitle && w.originalTitle !== w.title && H.push(`原名：${w.originalTitle}`), w.rate && H.push(`豆瓣评分：${w.rate}`), I.length > 0 && H.push(I.join(' · ')), w.summary && H.push(`简介：${s(w.summary, 600)}`);
        let W = m(w.cover, x);
        b = S && S.posterPath ? {
            posterPath: S.posterPath,
            detailPoster: S.posterPath,
            coverUrl: `https://image.tmdb.org/t/p/w500${S.posterPath}`,
            backdropPath: S.backdropPath || S.posterPath
        } : S ? {
            coverUrl: W || void 0,
            backdropPath: W || void 0
        } : {
            posterPath: W || void 0,
            detailPoster: w.cover ? m((v = w.cover) ? v.replace('s_ratio_poster', 'l_ratio_poster') : v, x) : void 0,
            coverUrl: W || void 0,
            backdropPath: W || void 0
        };
        let G = function(e) {
            let t = /^(\d+)分钟$/.exec((null != e ? e : '').replace(/\s+/g, ''));
            if (!t) return;
            let r = parseInt(t[1], 10);
            return Number.isFinite(r) && r > 0 ? 60 * r : void 0;
        }(C), U = r(i(r({
            id: S ? S.id : P,
            type: S ? 'tmdb' : 'detail',
            title: String(null != (h = w.title) ? h : '').replace(/\s*[（(]\s*\d{4}\s*[)）]\s*$/, '').trim() || `豆瓣条目 ${P}`,
            link: `douban:${P}`
        }, b), {
            rating: w.rate || void 0,
            releaseDate: w.year || void 0,
            mediaType: N,
            genreTitle: w.genres.length > 0 ? w.genres.join(' / ') : void 0,
            genreItems: w.genres.length > 0 ? w.genres.map((e)=>({
                    id: e,
                    title: e
                })) : void 0,
            peoples: A.length > 0 ? A : void 0,
            description: H.join('\n') || void 0
        }), C ? {
            durationText: C
        } : {}, G ? {
            duration: G
        } : {});
        return S && (U.tmdbId = S.id), R && (U.imdbId = R), U;
    })(), loadResource = (e)=>t(function*() {
        return console.log(`${n} loadResource 被调用（纯浏览模块，无播放源，返回空）`), [];
    })(), search = (e)=>t(function*() {
        var t, r, i, o, u;
        let s = (null != (t = null != (r = null != (i = e.keyword) ? i : e.title) ? r : e.query) ? t : '').trim();
        if (!s) return [];
        console.log(`${n} search q=${s}`);
        try {
            let t = `${l}/j/subject_suggest?${a({
                q: s
            })}`, r = yield b(t, e), i = Array.isArray(r) ? r : Array.isArray(null == r ? void 0 : r.subjects) ? r.subjects : [], n = [];
            for (let t of i){
                let r = j(null != (o = null == t ? void 0 : t.type) ? o : 'movie');
                if ('movie' !== r && 'tv' !== r) continue;
                let i = j(null == t ? void 0 : t.id), l = j(null == t ? void 0 : t.title);
                if (!i || !l) continue;
                let a = m(j(null != (u = null == t ? void 0 : t.img) ? u : null == t ? void 0 : t.cover), e), s = j(null == t ? void 0 : t.year), c = j(null == t ? void 0 : t.sub_title);
                n.push({
                    id: i,
                    type: 'detail',
                    title: l,
                    link: `douban:${i}`,
                    posterPath: a || void 0,
                    coverUrl: a || void 0,
                    backdropPath: a || void 0,
                    releaseDate: s || void 0,
                    mediaType: 'tv' === r ? 'tv' : 'movie',
                    subtitle: [
                        s,
                        c
                    ].filter(Boolean).join(' · ') || void 0,
                    description: c ? `原名：${c}` : void 0
                });
            }
            return n;
        } catch (e) {
            return [
                R('搜索', e)
            ];
        }
    })();
