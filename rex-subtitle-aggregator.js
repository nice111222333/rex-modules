function e(e, t, n, l, s, r, i) {
    try {
        var u = e[r](i), a = u.value;
    } catch (e) {
        n(e);
        return;
    }
    u.done ? t(a) : Promise.resolve(a).then(l, s);
}
function t(t) {
    return function() {
        var n = this, l = arguments;
        return new Promise(function(s, r) {
            var i = t.apply(n, l);
            function u(t) {
                e(i, s, r, u, a, "next", t);
            }
            function a(t) {
                e(i, s, r, u, a, "throw", t);
            }
            u(void 0);
        });
    };
}
WidgetMetadata = {
    id: 'bob-subtitle-aggregator',
    title: '字幕聚合',
    description: "多源字幕搜索：assrt（射手网）+ OpenSubtitles。字幕服务由 assrt.net 提供。使用前请在全局参数中填写自己的 Assrt Token 和/或 OpenSubtitles Api-Key。注意：OpenSubtitles 下载链接需实时生成，每个搜索最多生成前 3 条，会消耗账号每日下载额度（免费账号 20 次/天）。assrt 字幕直链会过期，若下载失败请重新运行加载字幕。",
    author: 'v7777',
    site: 'https://assrt.net',
    version: "1.0.5",
    requiredVersion: '0.0.2',
    detailCacheDuration: 60,
    globalParams: [
        {
            name: 'assrtToken',
            title: 'Assrt Token',
            type: 'input',
            description: 'assrt.net 用户中心 API 页的 32 位密钥（需先注册并激活账号）',
            value: ''
        },
        {
            name: 'assrtBaseUrl',
            title: 'Assrt 接口地址',
            type: 'constant',
            description: '主域名不可达时可改为 https://api.makedie.me/v1',
            value: 'https://api.assrt.net/v1'
        },
        {
            name: 'osApiKey',
            title: 'OpenSubtitles Api-Key',
            type: 'input',
            description: '在 opensubtitles.com 的 API consumers 页面创建 consumer 后获得',
            value: ''
        },
        {
            name: 'osUsername',
            title: 'OpenSubtitles 用户名',
            type: 'input',
            description: '可选；填写后下载额度从 5/天 提升到 20/天',
            value: ''
        },
        {
            name: 'osPassword',
            title: 'OpenSubtitles 密码',
            type: 'input',
            description: '可选；仅用于向 OpenSubtitles 登录换取下载 token',
            value: ''
        },
        {
            name: 'sourceOrder',
            title: '字幕源顺序',
            type: 'enumeration',
            value: 'assrt-first',
            enumOptions: [
                {
                    title: 'assrt 优先',
                    value: 'assrt-first'
                },
                {
                    title: 'OpenSubtitles 优先',
                    value: 'os-first'
                },
                {
                    title: '仅 assrt',
                    value: 'assrt-only'
                },
                {
                    title: '仅 OpenSubtitles',
                    value: 'os-only'
                }
            ]
        },
        {
            name: 'resultCount',
            title: '字幕结果数量',
            type: 'count',
            value: '10'
        }
    ],
    modules: [
        {
            type: 'subtitle',
            id: 'loadSubtitle',
            title: '加载字幕',
            functionName: 'loadSubtitle',
            cacheDuration: 300,
            params: []
        }
    ]
};
let n = '[字幕聚合]';
function l(e) {
    return new Promise((t)=>{
        'function' == typeof setTimeout ? setTimeout(t, e) : t();
    });
}
function s(e) {
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
function r(e) {
    return String(e).padStart(2, '0');
}
let i = {
    match: 0,
    unknown: 1,
    mismatch: 2
};
function u(e) {
    var t, n;
    let l = parseInt(null != (t = e.episode) ? t : '', 10);
    if (Number.isNaN(l)) return null;
    let s = parseInt(null != (n = e.season) ? n : '', 10);
    return {
        season: Number.isNaN(s) ? 1 : s,
        episode: l
    };
}
function a(e, t, n) {
    let l = null != e ? e : '';
    if (/e\d{1,3}\s*[-~～]\s*(?:e|ep)?\d{1,3}/i.test(l) || /第\s*\d+\s*[-~～]\s*\d+\s*集/.test(l)) return 'unknown';
    let s = /s(\d{1,2})e(\d{1,3})/i.exec(l);
    if (s) return Number(s[2]) === n && Number(s[1]) === t ? 'match' : 'mismatch';
    let r = /(\d{1,2})x(\d{1,3})/.exec(l);
    if (r) return Number(r[2]) === n && Number(r[1]) === t ? 'match' : 'mismatch';
    let i = /第\s*(\d{1,3})\s*集/.exec(l);
    if (i) return Number(i[1]) === n ? 'match' : 'mismatch';
    let u = /(?:^|[^a-z0-9])ep?(\d{1,3})(?:[^0-9]|$)/i.exec(l);
    if (u) return Number(u[1]) === n ? 'match' : 'mismatch';
    let a = /\[(\d{1,2})\]/.exec(l);
    return a ? Number(a[1]) === n ? 'match' : 'mismatch' : 'unknown';
}
function o(e) {
    var t, n, l, s, r, i;
    return `${null != (t = null == e || null == (l = e.attributes) ? void 0 : l.release) ? t : ''} ${null != (n = null == e || null == (i = e.attributes) || null == (r = i.files) || null == (s = r[0]) ? void 0 : s.file_name) ? n : ''}`;
}
let d = 'https://api.opensubtitles.com/api/v1', c = "RexSubtitleAggregator v1.0.5";
function f(e, t) {
    let n = {
        'Api-Key': e,
        'User-Agent': c,
        Accept: 'application/json'
    };
    return t && (n.Authorization = `Bearer ${t}`), n;
}
function p(e, l) {
    return t(function*() {
        var t, r, i;
        let u = (null != (t = e.osApiKey) ? t : '').trim();
        if (u && e.osUsername && e.osPassword) {
            if (!l) {
                let e = yield Widget.storage.get('os_token'), t = Number(null != (r = yield Widget.storage.get('os_token_at')) ? r : 0);
                if (e && t && Date.now() - t < 72000000) return e;
            }
            try {
                let t = null == (i = (yield Widget.http.post(`${d}/login`, {
                    username: e.osUsername,
                    password: e.osPassword
                }, {
                    headers: f(u)
                })).data) ? void 0 : i.token;
                if (t) return yield Widget.storage.set('os_token', t), yield Widget.storage.set('os_token_at', String(Date.now())), console.log(`${n} OpenSubtitles 登录成功，下载额度按账号计算`), t;
                console.warn(`${n} OpenSubtitles 登录未返回 token，改用匿名额度（5 次/天）`);
            } catch (e) {
                console.warn(`${n} OpenSubtitles 登录失败，改用匿名额度（5 次/天）: ${s(e)}`);
            }
        }
    })();
}
function m(e, l, r) {
    return t(function*() {
        let c = (n)=>t(function*() {
                var t, s;
                let i = yield Widget.http.get(`${d}/subtitles`, {
                    headers: f(l, r),
                    params: ((t)=>{
                        var n, l, s, r, i, u;
                        let a = {}, o = parseInt(null != (n = e.episode) ? n : '', 10), d = parseInt(null != (l = e.season) ? l : '', 10);
                        Number.isNaN(o) || (a.episode_number = String(o));
                        let c = null == (s = e.imdbId) ? void 0 : s.replace(/^tt/i, '').replace(/^0+/, '');
                        if (c && (a.imdb_id = c), a.languages = t, a.order_by = 'download_count', a.order_direction = 'desc', !c) {
                            let t = null == (u = e.tmdbId) ? void 0 : u.replace(/^(movie|tv)\./, '');
                            t ? a.tmdb_id = t : a.query = (null != (r = null != (i = e.seriesName) ? i : e.title) ? r : '').trim().toLowerCase();
                        }
                        return Number.isNaN(d) || (a.season_number = String(d)), e.type && (a.type = 'tv' === e.type ? 'episode' : 'movie'), a;
                    })(n)
                });
                return 401 === i.statusCode ? {
                    unauthorized: !0,
                    results: []
                } : {
                    unauthorized: !1,
                    results: null != (t = null == (s = i.data) ? void 0 : s.data) ? t : []
                };
            })(), { unauthorized: p, results: m } = yield c('zh-cn,zh-tw');
        if (p) return {
            items: [],
            unauthorized: !0
        };
        if (0 === m.length) {
            console.log(`${n} OpenSubtitles 无中文字幕结果，尝试英语字幕`);
            let e = yield c('en');
            if (e.unauthorized) return {
                items: [],
                unauthorized: !0
            };
            m = e.results;
        }
        let h = u(e), b = h ? [
            ...m
        ].sort((e, t)=>i[a(o(e), h.season, h.episode)] - i[a(o(t), h.season, h.episode)]) : m, g = [];
        for (let e of b.slice(0, 3)){
            var v, $, y, S, w, N, _, O, k, z, A, P;
            let t = null == ($ = e.attributes) || null == (v = $.files) ? void 0 : v[0];
            if (null == t ? void 0 : t.file_id) try {
                let s = yield Widget.http.post(`${d}/download`, {
                    file_id: t.file_id,
                    sub_format: 'srt'
                }, {
                    headers: f(l, r)
                });
                if (401 === s.statusCode) return {
                    items: g,
                    unauthorized: !0
                };
                if (!(null == (_ = s.data) ? void 0 : _.link)) {
                    console.warn(`${n} OpenSubtitles 下载链接生成失败 (file_id=${t.file_id})`, null != (A = null == (P = s.data) ? void 0 : P.message) ? A : '');
                    continue;
                }
                'number' == typeof s.data.remaining && console.log(`${n} OpenSubtitles 今日剩余额度：${s.data.remaining}`), g.push({
                    id: `os:${t.file_id}`,
                    title: null != (y = null != (S = null != (w = s.data.file_name) ? w : t.file_name) ? S : null == (O = e.attributes) ? void 0 : O.release) ? y : '字幕',
                    lang: function(e) {
                        switch((null != e ? e : '').toLowerCase()){
                            case 'zh-cn':
                                return '简体中文';
                            case 'zh-tw':
                                return '繁体中文';
                            case 'en':
                                return '英语';
                            default:
                                return null != e ? e : '未知语言';
                        }
                    }(null == (k = e.attributes) ? void 0 : k.language),
                    count: null != (N = null == (z = e.attributes) ? void 0 : z.download_count) ? N : 0,
                    url: s.data.link
                });
            } catch (e) {
                console.warn(`${n} OpenSubtitles 下载链接请求异常 (file_id=${t.file_id}): ${s(e)}`);
            }
        }
        return console.log(`${n} OpenSubtitles：命中 ${m.length} 条 → 生成 ${g.length} 条直链`), {
            items: g,
            unauthorized: !1
        };
    })();
}
loadSubtitle = (e)=>t(function*() {
        var o, d, c, f;
        let h = Math.max(1, Math.min(15, parseInt(null != (o = e.resultCount) ? o : '10', 10) || 10)), b = null != (d = e.sourceOrder) ? d : 'assrt-first', g = !!(null != (c = e.assrtToken) ? c : '').trim(), v = !!(null != (f = e.osApiKey) ? f : '').trim();
        if (!g && !v) return console.error(`${n} 未配置任何字幕源：请在模块的全局参数中填写 Assrt Token 或 OpenSubtitles Api-Key，本次返回空结果`), [];
        let $ = [];
        for (let o of 'os-only' === b ? [
            'os'
        ] : 'assrt-only' === b ? [
            'assrt'
        ] : 'os-first' === b ? [
            'os',
            'assrt'
        ] : [
            'assrt',
            'os'
        ]){
            if ($.length >= h) break;
            if ('assrt' === o && !g) {
                console.log(`${n} 跳过 assrt：未填写 Assrt Token`);
                continue;
            }
            if ('os' === o && !v) {
                console.log(`${n} 跳过 OpenSubtitles：未填写 Api-Key`);
                continue;
            }
            try {
                let d = 'assrt' === o ? yield function(e) {
                    return t(function*() {
                        var o, d, c, f, p, m, h, b, g, v, $, y, S, w, N, _, O, k, z, A, P, C;
                        let x = (null != (o = e.assrtToken) ? o : '').trim(), T = (e.assrtBaseUrl || 'https://api.assrt.net/v1').replace(/\/$/, ''), I = function(e) {
                            var t, n, l, s, i, u, a;
                            let o = (null != (t = e.seriesName) ? t : '').trim(), d = (null != (n = e.title) ? n : '').trim(), c = o || d, f = [], p = (e)=>{
                                let t = e.trim();
                                t.length >= 3 && !f.includes(t) && f.push(t);
                            };
                            if (!c) return f;
                            let m = parseInt(null != (l = e.season) ? l : '', 10), h = parseInt(null != (s = e.episode) ? s : '', 10), b = ('tv' === e.type || !Number.isNaN(h)) && !Number.isNaN(h), g = Number.isNaN(m) ? 1 : m, v = '', $ = null != (i = null != (u = e.videoUrl) ? u : e.link) ? i : '';
                            if ($) try {
                                let e = decodeURIComponent(null != (a = $.split(/[?#]/)[0].split('/').pop()) ? a : '').replace(/\.[a-z0-9]{2,5}$/i, '');
                                e.length >= 10 && (v = e);
                            } catch (e) {}
                            return b ? (p(`${c} S${r(g)}E${r(h)}`), v && p(v), p(c), p(`${c} 第${g}季第${h}集`)) : (p(c), v && p(v), 'tv' !== e.type || Number.isNaN(m) || p(`${c} 第${m}季`)), d && d !== c && p(d), f.slice(0, 4);
                        }(e), W = u(e);
                        if (0 === I.length) return console.warn(`${n} assrt 跳过：没有可用的搜索关键词（标题为空）`), [];
                        let K = [], U = 0, j = !1;
                        e: for(let e = 0; e < I.length; e++)for (let l of 0 === e ? [
                            {
                                is_file: '1'
                            },
                            {
                                no_muxer: '1'
                            }
                        ] : [
                            {
                                is_file: '1'
                            }
                        ]){
                            if (U >= 5) break e;
                            U++;
                            let s = yield function(e, l, s, r) {
                                return t(function*() {
                                    var t, i, u;
                                    let a = (yield Widget.http.get(`${e}/sub/search`, {
                                        params: function(e) {
                                            for(var t = 1; t < arguments.length; t++){
                                                var n = null != arguments[t] ? arguments[t] : {}, l = Object.keys(n);
                                                "function" == typeof Object.getOwnPropertySymbols && (l = l.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                                                    return Object.getOwnPropertyDescriptor(n, e).enumerable;
                                                }))), l.forEach(function(t) {
                                                    var l;
                                                    l = n[t], t in e ? Object.defineProperty(e, t, {
                                                        value: l,
                                                        enumerable: !0,
                                                        configurable: !0,
                                                        writable: !0
                                                    }) : e[t] = l;
                                                });
                                            }
                                            return e;
                                        }({
                                            token: l,
                                            q: s,
                                            cnt: '15'
                                        }, r)
                                    })).data;
                                    return a && 'number' == typeof a.status && 0 !== a.status ? 30900 === a.status ? {
                                        subs: [],
                                        quotaHit: !0
                                    } : (console.warn(`${n} assrt 搜索失败 (q="${s}"): status=${a.status} ${null != (u = a.errmsg) ? u : ''}`), {
                                        subs: [],
                                        quotaHit: !1
                                    }) : {
                                        subs: null != (t = null == a || null == (i = a.sub) ? void 0 : i.subs) ? t : [],
                                        quotaHit: !1
                                    };
                                })();
                            }(T, x, I[e], l);
                            if (s.quotaHit) {
                                j = !0;
                                break e;
                            }
                            if (s.subs.length > 0) {
                                K = s.subs;
                                break e;
                            }
                        }
                        if (j) return console.error(`${n} assrt 配额超限（错误 30900），本次跳过 assrt，请稍后再试`), [];
                        if (0 === K.length) return console.log(`${n} assrt 无结果（关键词：${I.join(' / ')}）`), [];
                        let q = [], H = new Set(), L = (e)=>{
                            !e.url || H.has(e.url) || (H.add(e.url), q.push(e));
                        }, D = 0, M = 0;
                        for (let e of K){
                            let r = null != (d = null == (g = e.lang) ? void 0 : g.desc) ? d : '中文', i = null != (c = null != (f = null != (p = e.id) ? p : e.sub_id) ? f : e.sid) ? c : e.subId;
                            if (W && 'mismatch' === a(`${null != (m = e.native_name) ? m : ''} ${null != (h = e.videoname) ? h : ''} ${null != (b = e.filename) ? b : ''}`, W.season, W.episode)) {
                                M++;
                                continue;
                            }
                            if (e.url) {
                                L({
                                    id: `assrt:${null != i ? i : 'na'}`,
                                    title: e.native_name || e.videoname || e.filename || '字幕',
                                    lang: r,
                                    count: 0,
                                    url: e.url
                                });
                                continue;
                            }
                            if (null == i) {
                                console.log(`${n} assrt 跳过无 id 的搜索结果：${null != (v = null != ($ = null != (y = e.native_name) ? y : e.videoname) ? $ : e.filename) ? v : '(无标题)'}`);
                                continue;
                            }
                            if (!(D >= 6)) {
                                D++;
                                try {
                                    D > 1 && (yield l(300));
                                    let s = yield function(e, n, s) {
                                        return t(function*() {
                                            let t = null;
                                            for(let r = 0; r < 2; r++)try {
                                                return (yield Widget.http.get(`${e}/sub/detail`, {
                                                    params: {
                                                        token: n,
                                                        id: String(s)
                                                    }
                                                })).data;
                                            } catch (n) {
                                                t = n;
                                                let e = function(e) {
                                                    var t;
                                                    if (!e) return null;
                                                    if ('number' == typeof e.statusCode) return e.statusCode;
                                                    if ('number' == typeof e.status) return e.status;
                                                    let n = /HTTP (\d{3})/.exec(String(null != (t = e.message) ? t : e));
                                                    return n ? Number(n[1]) : null;
                                                }(n);
                                                if (0 === r && null !== e && e >= 500) {
                                                    yield l(1200);
                                                    continue;
                                                }
                                                throw n;
                                            }
                                            throw t;
                                        })();
                                    }(T, x, i);
                                    if (s && 'number' == typeof s.status && 0 !== s.status) {
                                        if (30900 === s.status) {
                                            console.error(`${n} assrt 配额超限（错误 30900），停止获取详情`);
                                            break;
                                        }
                                        console.warn(`${n} assrt 详情失败 (id=${i}): status=${s.status} ${null != (O = s.errmsg) ? O : ''}`);
                                        continue;
                                    }
                                    let u = null == s || null == (_ = s.sub) || null == (N = _.subs) ? void 0 : N[0], o = null != (S = null == u ? void 0 : u.filelist) ? S : [];
                                    o.length > 0 ? o.forEach((e, t)=>{
                                        var n, l, s;
                                        W && 'mismatch' === a(null != (n = e.f) ? n : '', W.season, W.episode) ? M++ : L({
                                            id: `assrt:${i}:${t}`,
                                            title: e.f,
                                            lang: null != (l = null == u || null == (s = u.lang) ? void 0 : s.desc) ? l : r,
                                            count: 0,
                                            url: e.url
                                        });
                                    }) : (null == u ? void 0 : u.url) && !(W && 'mismatch' === a(null != (w = u.filename) ? w : '', W.season, W.episode)) && L({
                                        id: `assrt:${i}`,
                                        title: null != (k = null != (z = null != (A = u.filename) ? A : e.native_name) ? z : e.videoname) ? k : '字幕',
                                        lang: null != (P = null == u || null == (C = u.lang) ? void 0 : C.desc) ? P : r,
                                        count: 0,
                                        url: u.url
                                    });
                                } catch (e) {
                                    console.warn(`${n} assrt 详情请求异常 (id=${i}): ${s(e)}`);
                                }
                            }
                        }
                        return W && q.sort((e, t)=>i[a(e.title, W.season, W.episode)] - i[a(t.title, W.season, W.episode)]), console.log(`${n} assrt：搜索 ${U} 次、详情 ${D} 次 → ${q.length} 条${W && M > 0 ? `（按集数过滤掉 ${M} 条其他集字幕）` : ''}`), q;
                    })();
                }(e) : yield function(e) {
                    return t(function*() {
                        var t;
                        let l = (null != (t = e.osApiKey) ? t : '').trim(), s = yield p(e, !1), r = yield m(e, l, s);
                        return r.unauthorized && e.osUsername && e.osPassword && (console.warn(`${n} OpenSubtitles token 已失效，重新登录后重试`), yield Widget.storage.remove('os_token'), yield Widget.storage.remove('os_token_at'), s = yield p(e, !0), r = yield m(e, l, s)), r.items;
                    })();
                }(e);
                $.push(...d);
            } catch (e) {
                console.error(`${n} ${'assrt' === o ? 'assrt' : 'OpenSubtitles'} 搜索异常，已忽略该源: ${s(e)}`);
            }
        }
        let y = new Set(), S = $.filter((e)=>!(!e.url || y.has(e.url)) && (y.add(e.url), !0)).slice(0, h);
        return console.log(`${n} 共返回 ${S.length} 条字幕（上限 ${h}）`), S;
    })();
let h = {
    ass: 50,
    srt: 45,
    ssa: 30,
    vtt: 15
}, b = /chs|简|zh[-_.]?cn/i, g = /cht|繁|zh[-_.]?tw|big5/i, v = /双语|中英|bilingual|chs[&+.]?eng|cht[&+.]?eng/i, $ = /\beng\b|english|英文/i;
function y(e) {
    var t;
    if (!e) return null;
    let n = null != (t = e.match(/s(\d{1,2})[\s._-]*e(\d{1,3})/i)) ? t : e.match(/(\d{1,2})x(\d{1,3})/);
    return n ? `s${n[1].padStart(2, '0')}e${n[2].padStart(2, '0')}` : null;
}
resolveSubtitleArchive = (e)=>t(function*() {
        var t, l, s, r, i;
        let u, a = null != (t = e.subtitleFiles) ? t : e.files;
        if (!a) return null;
        let o = [];
        try {
            o = JSON.parse(a);
        } catch (e) {
            return null;
        }
        let d = o.filter((e)=>e.extension in h);
        if (0 === d.length) return null;
        if (1 === d.length) return d[0].path;
        let c = (null != (l = null != (s = e.subtitleName) ? s : e.archiveName) ? l : '').toLowerCase().replace(/\.[a-z0-9]{2,5}$/, '').split(/[^a-z0-9\u4e00-\u9fff]+/).filter((e)=>e.length >= 3).slice(0, 3), f = {
            episode: null != (r = y(e.subtitleName)) ? r : y(e.archiveName),
            pref: (u = (null != (i = e.subtitleLanguage) ? i : '').toLowerCase()) ? /zh-tw|cht|繁|traditional/.test(u) ? 'cht' : /zh-cn|chs|简|simplified/.test(u) ? 'chs' : /zh|中文|chinese/.test(u) ? 'zh' : 'other' : null,
            titleTokens: c
        }, p = d.map((e)=>({
                file: e,
                score: function(e, t) {
                    var n;
                    let l = null != (n = h[e.extension]) ? n : 0, s = e.name.toLowerCase(), r = v.test(s), i = b.test(s), u = g.test(s);
                    if ('chs' === t.pref ? (i && (l += 30), r && (l += 25), !u || i || r || (l -= 15)) : 'cht' === t.pref ? (u && (l += 30), r && (l += 25), !i || u || r || (l -= 15)) : 'zh' === t.pref && ((i || u) && (l += 20), r && (l += 25)), ('chs' === t.pref || 'cht' === t.pref || 'zh' === t.pref) && !i && !u && !r && $.test(s) && (l -= 20), t.episode) {
                        let n = y(e.name);
                        n === t.episode ? l += 60 : n && (l -= 80);
                    }
                    for (let e of t.titleTokens)s.includes(e) && (l += 8);
                    return e.size && (l += Math.min(3, e.size / 200000)), l;
                }(e, f)
            })).sort((e, t)=>t.score - e.score), m = p[0].score, S = p.filter((e)=>e.score === m).map((e)=>e.file.path);
        return console.log(`${n} 压缩包内选字幕：${p[0].file.name}（得分 ${m}）`), 1 === S.length ? S[0] : {
            files: S
        };
    })();
