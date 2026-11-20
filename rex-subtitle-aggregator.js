function e(e, t, n, l, s, i, r) {
    try {
        var u = e[i](r), a = u.value;
    } catch (e) {
        n(e);
        return;
    }
    u.done ? t(a) : Promise.resolve(a).then(l, s);
}
function t(t) {
    return function() {
        var n = this, l = arguments;
        return new Promise(function(s, i) {
            var r = t.apply(n, l);
            function u(t) {
                e(r, s, i, u, a, "next", t);
            }
            function a(t) {
                e(r, s, i, u, a, "throw", t);
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
    version: "1.0.7",
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
function i(e) {
    return String(e).padStart(2, '0');
}
let r = {
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
    let i = /(\d{1,2})x(\d{1,3})/.exec(l);
    if (i) return Number(i[2]) === n && Number(i[1]) === t ? 'match' : 'mismatch';
    let r = /第\s*(\d{1,3})\s*集/.exec(l);
    if (r) return Number(r[1]) === n ? 'match' : 'mismatch';
    let u = /(?:^|[^a-z0-9])ep?(\d{1,3})(?:[^0-9]|$)/i.exec(l);
    if (u) return Number(u[1]) === n ? 'match' : 'mismatch';
    let a = /\[(\d{1,2})\]/.exec(l);
    return a ? Number(a[1]) === n ? 'match' : 'mismatch' : 'unknown';
}
function o(e) {
    var t, n, l, s, i, r;
    return `${null != (t = null == e || null == (l = e.attributes) ? void 0 : l.release) ? t : ''} ${null != (n = null == e || null == (r = e.attributes) || null == (i = r.files) || null == (s = i[0]) ? void 0 : s.file_name) ? n : ''}`;
}
function d(e, t) {
    return /简|繁|雙|双|中文|chs|cht|zh[-_]/i.test(`${e} ${t}`);
}
let c = 'https://api.opensubtitles.com/api/v1', p = "RexSubtitleAggregator v1.0.7";
function f(e, t) {
    let n = {
        'Api-Key': e,
        'User-Agent': p,
        Accept: 'application/json'
    };
    return t && (n.Authorization = `Bearer ${t}`), n;
}
function m(e, l) {
    return t(function*() {
        var t, i, r;
        let u = (null != (t = e.osApiKey) ? t : '').trim();
        if (u && e.osUsername && e.osPassword) {
            if (!l) {
                let e = yield Widget.storage.get('os_token'), t = Number(null != (i = yield Widget.storage.get('os_token_at')) ? i : 0);
                if (e && t && Date.now() - t < 72000000) return e;
            }
            try {
                let t = null == (r = (yield Widget.http.post(`${c}/login`, {
                    username: e.osUsername,
                    password: e.osPassword
                }, {
                    headers: f(u)
                })).data) ? void 0 : r.token;
                if (t) return yield Widget.storage.set('os_token', t), yield Widget.storage.set('os_token_at', String(Date.now())), console.log(`${n} OpenSubtitles 登录成功，下载额度按账号计算`), t;
                console.warn(`${n} OpenSubtitles 登录未返回 token，改用匿名额度（5 次/天）`);
            } catch (e) {
                console.warn(`${n} OpenSubtitles 登录失败，改用匿名额度（5 次/天）: ${s(e)}`);
            }
        }
    })();
}
function h(e, l, i) {
    return t(function*() {
        let { unauthorized: d, results: p } = yield t(function*() {
            var t, n;
            let s = yield Widget.http.get(`${c}/subtitles`, {
                headers: f(l, i),
                params: ((t)=>{
                    var n, l, s, i, r, u;
                    let a = {}, o = parseInt(null != (n = e.episode) ? n : '', 10), d = parseInt(null != (l = e.season) ? l : '', 10);
                    Number.isNaN(o) || (a.episode_number = String(o));
                    let c = null == (s = e.imdbId) ? void 0 : s.replace(/^tt/i, '').replace(/^0+/, '');
                    if (c && (a.imdb_id = c), a.languages = t, a.order_by = 'download_count', a.order_direction = 'desc', !c) {
                        let t = null == (u = e.tmdbId) ? void 0 : u.replace(/^(movie|tv)\./, '');
                        t ? a.tmdb_id = t : a.query = (null != (i = null != (r = e.seriesName) ? r : e.title) ? i : '').trim().toLowerCase();
                    }
                    return Number.isNaN(d) || (a.season_number = String(d)), e.type && (a.type = 'tv' === e.type ? 'episode' : 'movie'), a;
                })('zh-cn,zh-tw')
            });
            return 401 === s.statusCode ? {
                unauthorized: !0,
                results: []
            } : {
                unauthorized: !1,
                results: null != (t = null == (n = s.data) ? void 0 : n.data) ? t : []
            };
        })();
        if (d) return {
            items: [],
            unauthorized: !0
        };
        let m = u(e), h = m ? [
            ...p
        ].sort((e, t)=>r[a(o(e), m.season, m.episode)] - r[a(o(t), m.season, m.episode)]) : p, g = [];
        for (let e of h.slice(0, 3)){
            var b, $, v, y, N, S, _, w, k, z, O, A;
            let t = null == ($ = e.attributes) || null == (b = $.files) ? void 0 : b[0];
            if (null == t ? void 0 : t.file_id) try {
                let s = yield Widget.http.post(`${c}/download`, {
                    file_id: t.file_id,
                    sub_format: 'srt'
                }, {
                    headers: f(l, i)
                });
                if (401 === s.statusCode) return {
                    items: g,
                    unauthorized: !0
                };
                if (!(null == (_ = s.data) ? void 0 : _.link)) {
                    console.warn(`${n} OpenSubtitles 下载链接生成失败 (file_id=${t.file_id})`, null != (O = null == (A = s.data) ? void 0 : A.message) ? O : '');
                    continue;
                }
                'number' == typeof s.data.remaining && console.log(`${n} OpenSubtitles 今日剩余额度：${s.data.remaining}`), g.push({
                    id: `os:${t.file_id}`,
                    title: null != (v = null != (y = null != (N = s.data.file_name) ? N : t.file_name) ? y : null == (w = e.attributes) ? void 0 : w.release) ? v : '字幕',
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
                    count: null != (S = null == (z = e.attributes) ? void 0 : z.download_count) ? S : 0,
                    url: s.data.link
                });
            } catch (e) {
                console.warn(`${n} OpenSubtitles 下载链接请求异常 (file_id=${t.file_id}): ${s(e)}`);
            }
        }
        return console.log(`${n} OpenSubtitles：命中 ${p.length} 条 → 生成 ${g.length} 条直链`), {
            items: g,
            unauthorized: !1
        };
    })();
}
loadSubtitle = (e)=>t(function*() {
        var o, c, p, f;
        let g = Math.max(1, Math.min(15, parseInt(null != (o = e.resultCount) ? o : '10', 10) || 10)), b = null != (c = e.sourceOrder) ? c : 'assrt-first', $ = !!(null != (p = e.assrtToken) ? p : '').trim(), v = !!(null != (f = e.osApiKey) ? f : '').trim();
        if (!$ && !v) return console.error(`${n} 未配置任何字幕源：请在模块的全局参数中填写 Assrt Token 或 OpenSubtitles Api-Key，本次返回空结果`), [];
        let y = [];
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
            if (y.length >= g) break;
            if ('assrt' === o && !$) {
                console.log(`${n} 跳过 assrt：未填写 Assrt Token`);
                continue;
            }
            if ('os' === o && !v) {
                console.log(`${n} 跳过 OpenSubtitles：未填写 Api-Key`);
                continue;
            }
            try {
                let c = 'assrt' === o ? yield function(e) {
                    return t(function*() {
                        var o, c, p, f, m, h, g, b, $, v, y, N, S, _, w, k, z, O, A, C, T, x, I, P;
                        let W = (null != (o = e.assrtToken) ? o : '').trim(), K = (e.assrtBaseUrl || 'https://api.assrt.net/v1').replace(/\/$/, ''), U = function(e) {
                            var t, n, l, s, r, u, a;
                            let o = (null != (t = e.seriesName) ? t : '').trim(), d = (null != (n = e.title) ? n : '').trim(), c = o || d, p = [], f = (e)=>{
                                let t = e.trim();
                                t.length >= 3 && !p.includes(t) && p.push(t);
                            };
                            if (!c) return p;
                            let m = parseInt(null != (l = e.season) ? l : '', 10), h = parseInt(null != (s = e.episode) ? s : '', 10), g = ('tv' === e.type || !Number.isNaN(h)) && !Number.isNaN(h), b = Number.isNaN(m) ? 1 : m, $ = '', v = null != (r = null != (u = e.videoUrl) ? u : e.link) ? r : '';
                            if (v) try {
                                let e = decodeURIComponent(null != (a = v.split(/[?#]/)[0].split('/').pop()) ? a : '').replace(/\.[a-z0-9]{2,5}$/i, '');
                                e.length >= 10 && ($ = e);
                            } catch (e) {}
                            return g ? (f(`${c} S${i(b)}E${i(h)}`), $ && f($), f(c), f(`${c} 第${b}季第${h}集`)) : (f(c), $ && f($), 'tv' !== e.type || Number.isNaN(m) || f(`${c} 第${m}季`)), d && d !== c && f(d), p.slice(0, 4);
                        }(e), q = u(e);
                        if (0 === U.length) return console.warn(`${n} assrt 跳过：没有可用的搜索关键词（标题为空）`), [];
                        let H = [], L = 0, D = !1;
                        for(let e = 0; e < U.length && !(L >= 5); e++){
                            L++;
                            let l = yield function(e, l, s) {
                                return t(function*() {
                                    var t, i, r;
                                    let u = (yield Widget.http.get(`${e}/sub/search`, {
                                        params: {
                                            token: l,
                                            q: s,
                                            cnt: '15'
                                        }
                                    })).data;
                                    return u && 'number' == typeof u.status && 0 !== u.status ? 30900 === u.status ? {
                                        subs: [],
                                        quotaHit: !0
                                    } : (console.warn(`${n} assrt 搜索失败 (q="${s}"): status=${u.status} ${null != (r = u.errmsg) ? r : ''}`), {
                                        subs: [],
                                        quotaHit: !1
                                    }) : {
                                        subs: null != (t = null == u || null == (i = u.sub) ? void 0 : i.subs) ? t : [],
                                        quotaHit: !1
                                    };
                                })();
                            }(K, W, U[e]);
                            if (l.quotaHit) {
                                D = !0;
                                break;
                            }
                            if (l.subs.length > 0) {
                                H = l.subs;
                                break;
                            }
                        }
                        if (D) return console.error(`${n} assrt 配额超限（错误 30900），本次跳过 assrt，请稍后再试`), [];
                        if (0 === H.length) return console.log(`${n} assrt 无结果（关键词：${U.join(' / ')}）`), [];
                        q && (H = [
                            ...H
                        ].sort((e, t)=>{
                            var n, l, s, i, u, o;
                            return r[a(`${null != (n = e.native_name) ? n : ''} ${null != (l = e.videoname) ? l : ''} ${null != (s = e.filename) ? s : ''}`, q.season, q.episode)] - r[a(`${null != (i = t.native_name) ? i : ''} ${null != (u = t.videoname) ? u : ''} ${null != (o = t.filename) ? o : ''}`, q.season, q.episode)];
                        }));
                        let M = [], j = new Set(), B = (e)=>{
                            !e.url || j.has(e.url) || (j.add(e.url), M.push(e));
                        }, E = 0, J = 0;
                        for (let e of H){
                            let i = null != (c = null == ($ = e.lang) ? void 0 : $.desc) ? c : '中文', r = null != (p = null != (f = null != (m = e.id) ? m : e.sub_id) ? f : e.sid) ? p : e.subId;
                            if (q && 'mismatch' === a(`${null != (h = e.native_name) ? h : ''} ${null != (g = e.videoname) ? g : ''} ${null != (b = e.filename) ? b : ''}`, q.season, q.episode)) {
                                J++;
                                continue;
                            }
                            if (e.url) {
                                B({
                                    id: `assrt:${null != r ? r : 'na'}`,
                                    title: e.native_name || e.videoname || e.filename || '字幕',
                                    lang: i,
                                    count: 0,
                                    url: e.url
                                });
                                continue;
                            }
                            if (null == r) {
                                console.log(`${n} assrt 跳过无 id 的搜索结果：${null != (v = null != (y = null != (N = e.native_name) ? N : e.videoname) ? y : e.filename) ? v : '(无标题)'}`);
                                continue;
                            }
                            if (!(E >= 6)) {
                                E++;
                                try {
                                    E > 1 && (yield l(300));
                                    let s = yield function(e, n, s) {
                                        return t(function*() {
                                            let t = null;
                                            for(let i = 0; i < 2; i++)try {
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
                                                if (0 === i && null !== e && e >= 500) {
                                                    yield l(1200);
                                                    continue;
                                                }
                                                throw n;
                                            }
                                            throw t;
                                        })();
                                    }(K, W, r);
                                    if (s && 'number' == typeof s.status && 0 !== s.status) {
                                        if (30900 === s.status) {
                                            console.error(`${n} assrt 配额超限（错误 30900），停止获取详情`);
                                            break;
                                        }
                                        console.warn(`${n} assrt 详情失败 (id=${r}): status=${s.status} ${null != (z = s.errmsg) ? z : ''}`);
                                        continue;
                                    }
                                    let u = null == s || null == (k = s.sub) || null == (w = k.subs) ? void 0 : w[0], o = null != (S = null == u ? void 0 : u.filelist) ? S : [];
                                    o.length > 0 ? o.forEach((e, t)=>{
                                        var n, l, s;
                                        q && 'mismatch' === a(null != (n = e.f) ? n : '', q.season, q.episode) ? J++ : B({
                                            id: `assrt:${r}:${t}`,
                                            title: e.f,
                                            lang: null != (l = null == u || null == (s = u.lang) ? void 0 : s.desc) ? l : i,
                                            count: 0,
                                            url: e.url
                                        });
                                    }) : (null == u ? void 0 : u.url) && !(q && 'mismatch' === a(null != (_ = u.filename) ? _ : '', q.season, q.episode)) && B({
                                        id: `assrt:${r}`,
                                        title: null != (O = null != (A = null != (C = u.filename) ? C : e.native_name) ? A : e.videoname) ? O : '字幕',
                                        lang: null != (T = null == u || null == (x = u.lang) ? void 0 : x.desc) ? T : i,
                                        count: 0,
                                        url: u.url
                                    });
                                } catch (e) {
                                    console.warn(`${n} assrt 详情请求异常 (id=${r}): ${s(e)}`);
                                }
                            }
                        }
                        let R = 0;
                        if (M.some((e)=>d(e.lang, e.title))) for(let e = M.length - 1; e >= 0; e--)I = M[e].lang, !d(I, P = M[e].title) && /英|english|\beng\b/i.test(`${I} ${P}`) && (M.splice(e, 1), R++);
                        return q && M.sort((e, t)=>r[a(e.title, q.season, q.episode)] - r[a(t.title, q.season, q.episode)]), console.log(`${n} assrt：搜索 ${L} 次、详情 ${E} 次 → ${M.length} 条${q && J > 0 ? `（按集数过滤掉 ${J} 条其他集字幕）` : ''}${R > 0 ? `（过滤掉 ${R} 条纯英文字幕）` : ''}`), M;
                    })();
                }(e) : yield function(e) {
                    return t(function*() {
                        var t;
                        let l = (null != (t = e.osApiKey) ? t : '').trim(), s = yield m(e, !1), i = yield h(e, l, s);
                        return i.unauthorized && e.osUsername && e.osPassword && (console.warn(`${n} OpenSubtitles token 已失效，重新登录后重试`), yield Widget.storage.remove('os_token'), yield Widget.storage.remove('os_token_at'), s = yield m(e, !0), i = yield h(e, l, s)), i.items;
                    })();
                }(e);
                y.push(...c);
            } catch (e) {
                console.error(`${n} ${'assrt' === o ? 'assrt' : 'OpenSubtitles'} 搜索异常，已忽略该源: ${s(e)}`);
            }
        }
        let N = new Set(), S = y.filter((e)=>!(!e.url || N.has(e.url)) && (N.add(e.url), !0)).slice(0, g);
        return console.log(`${n} 共返回 ${S.length} 条字幕（上限 ${g}）`), S;
    })();
let g = {
    ass: 50,
    srt: 45,
    ssa: 30,
    vtt: 15
}, b = /chs|简|zh[-_.]?cn/i, $ = /cht|繁|zh[-_.]?tw|big5/i, v = /双语|中英|bilingual|chs[&+.]?eng|cht[&+.]?eng/i, y = /\beng\b|english|英文/i;
function N(e) {
    var t;
    if (!e) return null;
    let n = null != (t = e.match(/s(\d{1,2})[\s._-]*e(\d{1,3})/i)) ? t : e.match(/(\d{1,2})x(\d{1,3})/);
    return n ? `s${n[1].padStart(2, '0')}e${n[2].padStart(2, '0')}` : null;
}
resolveSubtitleArchive = (e)=>t(function*() {
        var t, l, s, i, r;
        let u, a = null != (t = e.subtitleFiles) ? t : e.files;
        if (!a) return null;
        let o = [];
        try {
            o = JSON.parse(a);
        } catch (e) {
            return null;
        }
        let d = o.filter((e)=>e.extension in g);
        if (0 === d.length) return null;
        if (1 === d.length) return d[0].path;
        let c = (null != (l = null != (s = e.subtitleName) ? s : e.archiveName) ? l : '').toLowerCase().replace(/\.[a-z0-9]{2,5}$/, '').split(/[^a-z0-9\u4e00-\u9fff]+/).filter((e)=>e.length >= 3).slice(0, 3), p = {
            episode: null != (i = N(e.subtitleName)) ? i : N(e.archiveName),
            pref: (u = (null != (r = e.subtitleLanguage) ? r : '').toLowerCase()) ? /zh-tw|cht|繁|traditional/.test(u) ? 'cht' : /zh-cn|chs|简|simplified/.test(u) ? 'chs' : /zh|中文|chinese/.test(u) ? 'zh' : 'other' : null,
            titleTokens: c
        }, f = d.map((e)=>({
                file: e,
                score: function(e, t) {
                    var n;
                    let l = null != (n = g[e.extension]) ? n : 0, s = e.name.toLowerCase(), i = v.test(s), r = b.test(s), u = $.test(s);
                    if ('chs' === t.pref ? (r && (l += 30), i && (l += 25), !u || r || i || (l -= 15)) : 'cht' === t.pref ? (u && (l += 30), i && (l += 25), !r || u || i || (l -= 15)) : 'zh' === t.pref && ((r || u) && (l += 20), i && (l += 25)), ('chs' === t.pref || 'cht' === t.pref || 'zh' === t.pref) && !r && !u && !i && y.test(s) && (l -= 20), t.episode) {
                        let n = N(e.name);
                        n === t.episode ? l += 60 : n && (l -= 80);
                    }
                    for (let e of t.titleTokens)s.includes(e) && (l += 8);
                    return e.size && (l += Math.min(3, e.size / 200000)), l;
                }(e, p)
            })).sort((e, t)=>t.score - e.score), m = f[0].score, h = f.filter((e)=>e.score === m).map((e)=>e.file.path);
        return console.log(`${n} 压缩包内选字幕：${f[0].file.name}（得分 ${m}）`), 1 === h.length ? h[0] : {
            files: h
        };
    })();
