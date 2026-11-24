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
    description: '豆瓣影视浏览：今日推荐（每日轮换）、热门精选、电影 / 电视剧 / 综艺 / 纪录片、高分佳作、华语 / 港台 / 日韩精选、豆瓣 Top250 与分类浏览。纯浏览模块，不带播放源——详情页是豆瓣资料（评分、海报、演职员、简介），播放请用你在 Rex 里绑定的 Emby 库或其他模块。若某个分区提示被登录门拦截，可在模块设置里填入豆瓣 Cookie 后重试。',
    author: 'v7777',
    site: 'https://movie.douban.com',
    version: "0.1.0",
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
function c(e) {
    if (null == e) return null;
    if ('object' == typeof e) return e;
    if ('string' == typeof e) try {
        return JSON.parse(e);
    } catch (e) {}
    return null;
}
class d extends Error {
    constructor(e){
        super(e), this.name = 'GateError';
    }
}
function p(e) {
    return !!e && (e.includes('sec.douban.com') || e.includes('异常请求') || /error\s*008/i.test(e) || e.includes('验证你不是机器人') || e.includes('你的请求过于频繁'));
}
function g(e, r, n, l) {
    return t(function*() {
        var o;
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
        if (null != s && p(s)) throw new d(`豆瓣返回了机器人验证/登录门页面: ${e}`);
        if (u) throw u;
        throw Error(`${l} 返回内容不可用: ${e}`);
    })();
}
function m(e, r) {
    return t(function*() {
        let t = yield g(e, r, (e)=>null != c(e), '接口');
        return c(t);
    })();
}
function y(e) {
    return 'string' == typeof e ? e.trim() : 'number' == typeof e && Number.isFinite(e) ? String(e) : '';
}
function f(e) {
    if (!Array.isArray(e)) {
        let t = y(e);
        return t ? [
            t
        ] : [];
    }
    let t = [];
    for (let i of e){
        var r, n;
        let e = 'string' == typeof i ? i.trim() : y(null != (r = null != (n = null == i ? void 0 : i.name) ? n : null == i ? void 0 : i.title) ? r : null == i ? void 0 : i.value);
        e && t.push(e);
    }
    return t;
}
function v(e) {
    let t = y(e);
    if (t) return t;
    if (e && 'object' == typeof e) {
        var r, n, i;
        return y(null != (r = null != (n = null != (i = e.value) ? i : e.average) ? n : e.score) ? r : e.rating);
    }
    return '';
}
function h(e) {
    let t = parseFloat(e.rate);
    return Number.isFinite(t) ? t : 0;
}
function b(e, r) {
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
        let p = yield m(d, e);
        return (Array.isArray(null == p ? void 0 : p.subjects) ? p.subjects : []).map((e)=>(function(e, t) {
                var r, n, i, l;
                if (!e || 'object' != typeof e) return null;
                let o = y(e.id), a = y(e.title);
                return o && a ? {
                    id: o,
                    title: a,
                    rate: v(null != (r = e.rate) ? r : e.rating),
                    cover: y(null != (n = null != (i = null != (l = e.cover) ? l : e.cover_url) ? i : e.pic) ? n : e.image),
                    mediaType: t,
                    directors: f(e.directors),
                    casts: f(e.casts),
                    year: y(e.year) || void 0
                } : null;
            })(e, r.type)).filter((e)=>null != e);
    })();
}
function $(e, r) {
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
        let h = yield m(g, e);
        return (Array.isArray(null == h ? void 0 : h.data) ? h.data : Array.isArray(h) ? h : []).map((e)=>(function(e) {
                var t, r, n, i, l;
                if (!e || 'object' != typeof e) return null;
                let o = y(e.id), a = y(e.title);
                if (!o || !a) return null;
                let u = y(null != (t = e.subtype) ? t : e.type);
                return {
                    id: o,
                    title: a,
                    rate: v(null != (r = e.rate) ? r : e.rating),
                    cover: y(null != (n = null != (i = null != (l = e.cover) ? l : e.cover_url) ? i : e.pic) ? n : e.image),
                    mediaType: 'movie' === u ? 'movie' : 'tv',
                    directors: f(e.directors),
                    casts: f(e.casts),
                    year: y(e.year) || void 0
                };
            })(e)).filter((e)=>null != e);
    })();
}
function j(e, r) {
    return t(function*() {
        let t = `${l}/j/subject_abstract?${a({
            subject_id: r
        })}`;
        return function(e) {
            var t, r, n, i, l, o, a, u, s, c, d, p, g, m, h, b, $;
            if (!e || 'object' != typeof e) return null;
            let j = null != (t = null != (r = e.subject) ? r : e.data) ? t : e;
            if (j && 'object' == typeof j && j.subject && 'object' == typeof j.subject && !j.title && (j = j.subject), !j || 'object' != typeof j) return null;
            let T = y(j.id), k = y(null != (n = j.title) ? n : j.name);
            if (!T && !k) return null;
            let D = y(j.year);
            if (!D && Array.isArray(j.pubdates) && j.pubdates.length > 0) {
                let e = /(\d{4})/.exec(y(j.pubdates[0]));
                e && (D = e[1]);
            }
            let P = j.pic && 'object' == typeof j.pic ? j.pic : {};
            return {
                id: T,
                title: k,
                originalTitle: y(null != (i = null != (l = j.original_title) ? l : j.originalTitle) ? i : j.aka_title),
                year: D,
                subtype: y(null != (o = j.subtype) ? o : j.type),
                rate: v(null != (a = j.rate) ? a : j.rating),
                cover: y(null != (u = null != (s = null != (c = null != (d = j.cover) ? d : P.large) ? c : P.normal) ? s : j.image) ? u : j.poster),
                genres: f(null != (p = j.genres) ? p : j.types),
                directors: f(j.directors),
                casts: f(null != (g = j.casts) ? g : j.actors),
                countries: f(j.countries),
                languages: f(j.languages),
                durations: f(null != (m = j.durations) ? m : j.duration),
                summary: y(null != (h = null != (b = null != ($ = j.summary) ? $ : j.intro) ? b : j.abstract) ? h : j.description)
            };
        }((yield m(t, e)));
    })();
}
function T(e, t) {
    let r = [];
    e.rate && r.push(`豆瓣评分 ${e.rate}`), e.year && r.push(e.year);
    let n = [];
    return e.rate && n.push(`豆瓣评分：${e.rate}`), e.directors.length > 0 && n.push(`导演：${e.directors.join('、')}`), e.casts.length > 0 && n.push(`主演：${e.casts.slice(0, 6).join('、')}`), t && n.push(t), {
        id: e.id,
        type: 'detail',
        title: e.title,
        link: `douban:${e.id}`,
        posterPath: e.cover || void 0,
        coverUrl: e.cover || void 0,
        backdropPath: e.cover || void 0,
        rating: e.rate || void 0,
        releaseDate: e.year || void 0,
        mediaType: e.mediaType,
        subtitle: r.join(' · ') || void 0,
        description: n.join('\n') || void 0
    };
}
function k(e) {
    let t = new Map();
    for (let r of e)for (let e of r)t.has(e.id) || t.set(e.id, e);
    return [
        ...t.values()
    ].sort((e, t)=>h(t) - h(e));
}
function D(e, l, a) {
    return t(function*() {
        let t = [], u = 0;
        for (let c of l){
            let l = '', d = c.year, p = c.rate;
            if (u < a) {
                u++;
                try {
                    let t = yield j(e, c.id);
                    t && (l = s(t.summary, 140), !d && t.year && (d = t.year), !p && t.rate && (p = t.rate));
                } catch (e) {
                    console.log(`${i} 简介补全 ${c.id} 失败（用列表数据）: ${o(e)}`);
                }
            }
            t.push(T(n(r({}, c), {
                year: d,
                rate: p
            }), l || void 0));
        }
        return t;
    })();
}
function P(e, t) {
    let r = t instanceof d, n = r ? '接口被登录门拦截（008)，可在模块设置填 Cookie 后重试' : `接口请求失败：${s(o(t), 40)}`;
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
function w(e) {
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
        let t = yield w(()=>b(e, {
                type: 'movie',
                tag: '热门'
            })), r = yield w(()=>b(e, {
                type: 'tv',
                tag: '热门'
            })), n = yield w(()=>b(e, {
                type: 'tv',
                tag: '综艺'
            })), l = yield w(()=>$(e, {
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
                P('今日推荐', e)
            ] : [];
        }
        let s = (e)=>[
                ...e
            ].sort((e, t)=>h(t) - h(e)).slice(0, 10), c = k([
            s(t.items),
            s(r.items),
            s(n.items),
            s(l.items)
        ]), d = function(e) {
            if (e.length <= 8) return e.slice();
            let t = new Date(), r = (Math.floor(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 86400000) % e.length + e.length) % e.length;
            return e.slice(r).concat(e.slice(0, r)).slice(0, 8);
        }(c);
        return console.log(`${i} loadToday 候选池 ${c.length} 部，今日取 ${d.length} 部`), D(e, d, 8);
    })(), loadHotMix = (e)=>t(function*() {
        if (console.log(`${i} loadHotMix page=${u(e)}`), u(e) > 1) return [];
        let t = yield w(()=>b(e, {
                type: 'movie',
                tag: '热门'
            })), r = yield w(()=>b(e, {
                type: 'tv',
                tag: '热门'
            }));
        if (0 === t.items.length && 0 === r.items.length) {
            var n;
            let e = null != (n = t.err) ? n : r.err;
            return e ? [
                P('热门精选', e)
            ] : [];
        }
        return D(e, k([
            t.items,
            r.items
        ]).slice(0, 12), 10);
    })(), loadMovieRail = (e)=>t(function*() {
        var t, r;
        let n = 'region' === (null != (t = e.source) ? t : 'tag').trim() ? 'region' : 'tag', l = (null != (r = e.value) ? r : '').trim() || '热门', o = u(e), a = `${l}电影`;
        console.log(`${i} loadMovieRail source=${n} value=${l} page=${o}`);
        try {
            return ('region' === n ? yield $(e, {
                countries: l,
                tags: '电影',
                page: o
            }) : yield b(e, {
                type: 'movie',
                tag: l,
                page: o
            })).map((e)=>T(e));
        } catch (e) {
            return [
                P(a, e)
            ];
        }
    })(), loadTvRail = (e)=>t(function*() {
        var t;
        let r = (null != (t = e.tag) ? t : '').trim() || '热门', n = u(e);
        console.log(`${i} loadTvRail tag=${r} page=${n}`);
        try {
            return (yield b(e, {
                type: 'tv',
                tag: r,
                page: n
            })).map((e)=>T(e));
        } catch (e) {
            return [
                P(`${r}剧集`, e)
            ];
        }
    })(), loadVariety = (e)=>t(function*() {
        var t;
        let r = u(e);
        console.log(`${i} loadVariety page=${r}`);
        let n = yield w(()=>b(e, {
                type: 'tv',
                tag: '综艺',
                page: r
            }));
        if (n.items.length > 0) return n.items.map((e)=>T(e));
        console.log(`${i} loadVariety 主路线无结果，走真人秀探索路线`);
        let l = yield w(()=>$(e, {
                tags: '电视剧',
                genres: '真人秀',
                page: r
            }));
        if (l.items.length > 0) return l.items.map((e)=>T(e));
        let o = null != (t = l.err) ? t : n.err;
        return o ? [
            P('综艺', o)
        ] : [];
    })(), loadDocumentary = (e)=>t(function*() {
        let t = u(e);
        console.log(`${i} loadDocumentary page=${t}`);
        let r = yield w(()=>$(e, {
                genres: '纪录片',
                tags: '电影',
                page: t
            })), n = yield w(()=>$(e, {
                genres: '纪录片',
                tags: '电视剧',
                page: t
            })), l = k([
            r.items,
            n.items
        ]);
        if (0 === l.length) {
            console.log(`${i} loadDocumentary 探索路线无结果，走标签路线`);
            let u = yield w(()=>b(e, {
                    type: 'movie',
                    tag: '纪录片',
                    page: t
                })), c = yield w(()=>b(e, {
                    type: 'tv',
                    tag: '纪录片',
                    page: t
                }));
            if (0 === (l = k([
                u.items,
                c.items
            ])).length) {
                var o, a, s;
                let e = null != (o = null != (a = null != (s = u.err) ? s : c.err) ? a : r.err) ? o : n.err;
                return e ? [
                    P('纪录片', e)
                ] : [];
            }
        }
        return l.map((e)=>T(e));
    })(), loadHighRated = (e)=>t(function*() {
        let t = u(e);
        console.log(`${i} loadHighRated page=${t}`);
        try {
            let r = yield b(e, {
                type: 'movie',
                tag: '豆瓣高分',
                sort: 'rank',
                page: t
            });
            return D(e, r.slice(0, 10), 10);
        } catch (e) {
            return [
                P('高分佳作', e)
            ];
        }
    })(), loadMainland = (e)=>t(function*() {
        let t = u(e);
        console.log(`${i} loadMainland page=${t}`);
        let r = yield w(()=>$(e, {
                countries: '中国大陆',
                tags: '电影',
                page: t
            })), n = yield w(()=>$(e, {
                countries: '中国大陆',
                tags: '电视剧',
                page: t
            })), l = k([
            r.items,
            n.items
        ]);
        if (0 === l.length) {
            let i = yield w(()=>$(e, {
                    countries: '中国大陆',
                    page: t
                }));
            if (0 === (l = i.items).length) {
                var o, a, s;
                let l = yield w(()=>b(e, {
                        type: 'movie',
                        tag: '华语',
                        page: t
                    }));
                if (l.items.length > 0) return l.items.map((e)=>T(e));
                let u = null != (o = null != (a = null != (s = l.err) ? s : i.err) ? a : r.err) ? o : n.err;
                return u ? [
                    P('华语精选', u)
                ] : [];
            }
        }
        return l.map((e)=>T(e));
    })(), loadHkTw = (e)=>t(function*() {
        let t = u(e);
        console.log(`${i} loadHkTw page=${t}`);
        let r = yield w(()=>$(e, {
                countries: '中国香港',
                tags: '电影',
                page: t
            })), n = yield w(()=>$(e, {
                countries: '中国台湾',
                tags: '电影',
                page: t
            })), l = k([
            r.items,
            n.items
        ]);
        if (0 === l.length) {
            let i = yield w(()=>$(e, {
                    countries: '中国香港',
                    page: t
                })), u = yield w(()=>$(e, {
                    countries: '中国台湾',
                    page: t
                }));
            if (0 === (l = k([
                i.items,
                u.items
            ])).length) {
                var o, a, s;
                let e = null != (o = null != (a = null != (s = i.err) ? s : u.err) ? a : r.err) ? o : n.err;
                return e ? [
                    P('港台精选', e)
                ] : [];
            }
        }
        return l.map((e)=>T(e));
    })(), loadJpKr = (e)=>t(function*() {
        let t = u(e);
        console.log(`${i} loadJpKr page=${t}`);
        let r = yield w(()=>b(e, {
                type: 'movie',
                tag: '韩国',
                page: t
            })), n = yield w(()=>b(e, {
                type: 'movie',
                tag: '日本',
                page: t
            })), l = k([
            r.items,
            n.items
        ]);
        if (0 === l.length) {
            var o;
            let e = null != (o = r.err) ? o : n.err;
            return e ? [
                P('日韩精选', e)
            ] : [];
        }
        return l.map((e)=>T(e));
    })(), loadTop250 = (e)=>t(function*() {
        let r = u(e), n = (r - 1) * 25;
        console.log(`${i} loadTop250 page=${r} start=${n}`);
        let a = null;
        try {
            var s;
            let r = yield (s = `${l}/top250?start=${n}`, t(function*() {
                return g(s, e, (e)=>e.length > 200 && !p(e), '页面');
            })()), o = yield t(function*() {
                let e = yield Widget.html.load(r), t = [];
                return e('.item').each((r, n)=>{
                    var i, l, o, a;
                    let u = e(n), s = null != (i = null != (l = u.find('.pic a').first().attr('href')) ? l : u.find('a').first().attr('href')) ? i : '', c = /subject\/(\d+)/.exec(s);
                    if (!c) return;
                    let d = c[1], p = u.find('.hd .title').first().text().trim() || u.find('.title').first().text().trim();
                    if (!p) return;
                    let g = null != (o = u.find('.pic img').first().attr('src')) ? o : '', m = u.find('.rating_num').first().text().trim(), y = null != (a = u.find('.bd p').first().text().replace(/\s+/g, ' ').trim().split('<br>').join(' ').split(/\s{2,}/).pop()) ? a : '', f = /(\d{4})/.exec(y), v = u.find('.inq').first().text().trim(), h = [];
                    m && h.push(`豆瓣评分：${m}`), y && h.push(y), v && h.push(v), t.push({
                        id: d,
                        type: 'detail',
                        title: p,
                        link: `douban:${d}`,
                        posterPath: g || void 0,
                        coverUrl: g || void 0,
                        backdropPath: g || void 0,
                        rating: m || void 0,
                        releaseDate: f ? f[1] : void 0,
                        mediaType: 'movie',
                        subtitle: m ? `豆瓣评分 ${m}` : void 0,
                        description: h.join('\n') || void 0
                    });
                }), t;
            })();
            if (o.length > 0) return o;
            console.log(`${i} loadTop250 HTML 解析出 0 条，走经典标签路线`);
        } catch (e) {
            a = e, console.log(`${i} loadTop250 HTML 路线失败，走经典标签路线: ${o(e)}`);
        }
        try {
            return (yield b(e, {
                type: 'movie',
                tag: '经典',
                sort: 'rank',
                page: r
            })).map((e)=>T(e));
        } catch (e) {
            return [
                P('豆瓣 Top250', null != a ? a : e)
            ];
        }
    })();
let O = [
    '剧情',
    '喜剧',
    '动作',
    '爱情',
    '科幻',
    '动画',
    '悬疑',
    '惊悚',
    '恐怖',
    '犯罪',
    '纪录片',
    '真人秀'
];
function N() {
    return O.map((e)=>({
            id: e,
            type: 'url',
            mediaType: 'genre',
            link: `douban:genre:${e}`,
            title: e
        }));
}
function x(e) {
    let t = (null != e ? e : '').trim();
    return t.startsWith('douban:genre:') ? t.slice(13).trim() : t;
}
loadGenres = (e)=>t(function*() {
        var t;
        let l = x(null != (t = e.genreId) ? t : '');
        return l ? (console.log(`${i} loadGenres 收到 genreId=${l}，转分类片单`), loadGenrePage(n(r({}, e), {
            genre: l
        }))) : (console.log(`${i} loadGenres 返回 ${O.length} 个分类`), N());
    })(), loadGenrePage = (e)=>t(function*() {
        var t, r;
        let n = (null != (t = e.genre) ? t : '').trim() || x(null != (r = e.genreId) ? r : '');
        if (!n) return N();
        let l = u(e);
        console.log(`${i} loadGenrePage genre=${n} page=${l}`);
        try {
            return (yield $(e, {
                genres: n,
                page: l
            })).map((e)=>T(e));
        } catch (e) {
            return [
                P(`分类·${n}`, e)
            ];
        }
    })(), loadDetail = (e, r)=>t(function*() {
        var t;
        let n = (null != e ? e : '').trim();
        if (!n) return [];
        if ('douban:diag' === n) return {
            id: 'diag:about',
            type: 'detail',
            title: '豆瓣影视 · 说明',
            link: 'douban:diag',
            mediaType: 'movie',
            description: "这是「豆瓣影视」纯浏览模块：分区数据来自豆瓣公开接口，详情页只有资料（评分、海报、演职员、简介），不带播放源。\n播放请用你在 Rex 里绑定的 Emby 库或其他模块——在那些模块的详情页选片即可。\n若某个分区提示被登录门拦截（008)：在浏览器登录 movie.douban.com，复制完整 Cookie 填到本模块设置里再刷新；模块只会在被拦截时带 Cookie 重试一次，平时匿名取数。"
        };
        let a = '';
        if (n.startsWith('douban:')) {
            let e = n.slice(7).trim();
            /^\d+$/.test(e) && (a = e);
        }
        if (!a) {
            let e = /subject\/(\d+)/.exec(n);
            e && (a = e[1]);
        }
        if (!a) return [];
        let u = `${l}/subject/${a}/`, c = null, p = null;
        try {
            c = yield j(null != r ? r : {}, a);
        } catch (e) {
            p = e;
        }
        if (!c) return console.log(`${i} loadDetail ${a} 详情不可用: ${p ? o(p) : '无数据'}`), {
            id: a,
            type: 'detail',
            title: `豆瓣条目 ${a}`,
            link: `douban:${a}`,
            mediaType: 'movie',
            description: [
                p instanceof d ? '豆瓣详情接口被登录门拦截（008)。可在模块设置里填入豆瓣 Cookie 后重试。' : '这次没能从豆瓣取到该条目的详情，可以稍后重试。',
                `豆瓣页面：${u}`
            ].join('\n')
        };
        let g = [
            ...c.directors.map((e)=>({
                    id: e,
                    title: e,
                    role: '导演'
                })),
            ...c.casts.map((e)=>({
                    id: e,
                    title: e,
                    role: '演员'
                }))
        ], m = [];
        c.year && m.push(c.year), c.countries.length > 0 && m.push(c.countries.join(' / ')), c.languages.length > 0 && m.push(c.languages.join(' / ')), c.durations.length > 0 && m.push(c.durations.join(' / '));
        let y = [];
        return c.originalTitle && c.originalTitle !== c.title && y.push(`原名：${c.originalTitle}`), c.rate && y.push(`豆瓣评分：${c.rate}`), m.length > 0 && y.push(m.join(' · ')), c.summary && y.push(`简介：${s(c.summary, 600)}`), {
            id: a,
            type: 'detail',
            title: c.title || `豆瓣条目 ${a}`,
            link: `douban:${a}`,
            posterPath: c.cover || void 0,
            detailPoster: c.cover ? (t = c.cover) ? t.replace('s_ratio_poster', 'l_ratio_poster') : t : void 0,
            coverUrl: c.cover || void 0,
            backdropPath: c.cover || void 0,
            rating: c.rate || void 0,
            releaseDate: c.year || void 0,
            mediaType: 'tv' === c.subtype ? 'tv' : 'movie',
            genreTitle: c.genres.length > 0 ? c.genres.join(' / ') : void 0,
            genreItems: c.genres.length > 0 ? c.genres.map((e)=>({
                    id: e,
                    title: e
                })) : void 0,
            peoples: g.length > 0 ? g : void 0,
            description: y.join('\n') || void 0
        };
    })(), loadResource = (e)=>t(function*() {
        return console.log(`${i} loadResource 被调用（纯浏览模块，无播放源，返回空）`), [];
    })(), search = (e)=>t(function*() {
        var t, r, n, o, u;
        let s = (null != (t = null != (r = null != (n = e.keyword) ? n : e.title) ? r : e.query) ? t : '').trim();
        if (!s) return [];
        console.log(`${i} search q=${s}`);
        try {
            let t = `${l}/j/subject_suggest?${a({
                q: s
            })}`, r = yield m(t, e), n = Array.isArray(r) ? r : Array.isArray(null == r ? void 0 : r.subjects) ? r.subjects : [], i = [];
            for (let e of n){
                let t = y(null != (o = null == e ? void 0 : e.type) ? o : 'movie');
                if ('movie' !== t && 'tv' !== t) continue;
                let r = y(null == e ? void 0 : e.id), n = y(null == e ? void 0 : e.title);
                if (!r || !n) continue;
                let l = y(null != (u = null == e ? void 0 : e.img) ? u : null == e ? void 0 : e.cover), a = y(null == e ? void 0 : e.year), s = y(null == e ? void 0 : e.sub_title);
                i.push({
                    id: r,
                    type: 'detail',
                    title: n,
                    link: `douban:${r}`,
                    posterPath: l || void 0,
                    coverUrl: l || void 0,
                    backdropPath: l || void 0,
                    releaseDate: a || void 0,
                    mediaType: 'tv' === t ? 'tv' : 'movie',
                    subtitle: [
                        a,
                        s
                    ].filter(Boolean).join(' · ') || void 0,
                    description: s ? `原名：${s}` : void 0
                });
            }
            return i;
        } catch (e) {
            return [
                P('搜索', e)
            ];
        }
    })();
