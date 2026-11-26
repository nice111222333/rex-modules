function e(e, t, r, i, n, o, l) {
    try {
        var a = e[o](l), c = a.value;
    } catch (e) {
        r(e);
        return;
    }
    a.done ? t(c) : Promise.resolve(c).then(i, n);
}
function t(t) {
    return function() {
        var r = this, i = arguments;
        return new Promise(function(n, o) {
            var l = t.apply(r, i);
            function a(t) {
                e(l, n, o, a, c, "next", t);
            }
            function c(t) {
                e(l, n, o, a, c, "throw", t);
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
    id: 'v7777-91short',
    title: '91短视频',
    description: '91short 短视频：最新短视频、国产高清、标签片单与站内搜索，点开即播（HLS 直链）。按 Rex 最新模块规范（0.0.7 内核）编写，可在首页开启沉浸模式观看。站方封面是加密图，需要先把配套的封面解密 Worker 部署到你自己的 Cloudflare Workers，再把 Worker 根地址填进本模块设置的「封面中转地址」，封面才会显示；不填不影响播放。站点线路（cn8 等）失效时，可在设置里把「站点地址」换成站方最新线路。',
    author: 'v7777',
    site: 'https://cn8.91short.com',
    version: "0.1.0",
    requiredVersion: '0.0.7',
    contentType: 'video',
    iconurl: 'https://icon-2.dd.frcfwb.cn/no/logo.png',
    detailCacheDuration: 60,
    globalParams: [
        {
            name: 'baseUrl',
            title: '站点地址',
            type: 'input',
            description: '91short 线路地址，只填根地址。当前线路失效时换成站方最新地址（如 https://cn9.91short.com）',
            value: 'https://cn8.91short.com'
        },
        {
            name: 'coverRelay',
            title: '封面中转地址',
            type: 'input',
            description: '你部署的封面解密 Worker 根地址（如 https://short91-cover.xxx.workers.dev），只填根地址，模块自己拼 /img?u=。站方封面是加密图，不填则封面不显示，播放不受影响',
            value: ''
        }
    ],
    modules: [
        {
            id: 'loadLatest',
            title: '最新短视频',
            subtitle: '站点首页最新发布',
            functionName: 'loadLatest',
            cacheDuration: 600,
            params: [
                {
                    name: 'page',
                    title: '页码',
                    type: 'page'
                }
            ]
        },
        {
            id: 'loadHd',
            title: '国产高清',
            subtitle: '国产高清分类',
            functionName: 'loadHd',
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
            id: 'loadLabelList',
            title: '标签片单',
            subtitle: '某个标签下的短视频（从详情页标签点入）',
            functionName: 'loadLabelList',
            cacheDuration: 1800,
            params: [
                {
                    name: 'genreId',
                    title: '标签 ID',
                    type: 'input',
                    description: '客户端从详情页标签注入；留空时给出说明'
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
        title: '91短视频搜索',
        functionName: 'search',
        params: [
            {
                name: 'keyword',
                title: '关键词',
                type: 'input',
                description: '如 反差',
                value: ''
            }
        ]
    }
};
let n = '[91短视频]', o = 'https://cn8.91short.com';
function l(e) {
    let t = (null != e ? e : '').trim().replace(/\/+$/, '');
    return t && /^https?:\/\//i.test(t) ? t : o;
}
function a(e) {
    return (null != e ? e : '').trim().replace(/\/+$/, '');
}
function c(e) {
    let t = l(e.baseUrl), r = a(e.coverRelay);
    try {
        Widget.storage.set('g:base', t), Widget.storage.set('g:relay', r);
    } catch (e) {}
    return {
        base: t,
        relay: r
    };
}
function s() {
    let e = o, t = '';
    try {
        let r = Widget.storage.get('g:base');
        'string' == typeof r && r && (e = l(r));
        let i = Widget.storage.get('g:relay');
        'string' == typeof i && i && (t = a(i));
    } catch (e) {}
    return {
        base: e,
        relay: t
    };
}
function u(e, t) {
    return e ? t ? `${t}/img?u=${encodeURIComponent(e)}` : e : '';
}
function d(e, r) {
    return t(function*() {
        let t = yield Widget.http.get(e, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
                Referer: `${r}/`,
                Accept: 'text/html,application/xhtml+xml,*/*'
            }
        }), i = 'number' == typeof (null == t ? void 0 : t.statusCode) ? t.statusCode : 200;
        if (i >= 400) throw Error(`HTTP ${i}: ${e}`);
        let n = null == t ? void 0 : t.data;
        return 'string' == typeof n ? n : null == n ? '' : String(n);
    })();
}
function p(e) {
    return t(function*() {
        let t = yield Widget.html.load(e), r = [], i = new Set();
        return t('.module-item').each((e, n)=>{
            let o = t(n), l = o.find('a[href*="/short/"]').first(), a = (l.attr('href') || '').trim(), c = /\/short\/([A-Za-z0-9_-]+)/.exec(a);
            if (!c) return;
            let s = c[1];
            if (i.has(s)) return;
            i.add(s);
            let u = (l.attr('title') || '').trim();
            u || (u = (o.find('.module-item-title').first().text() || '').trim()), u || (u = (o.find('img').first().attr('alt') || '').trim());
            let d = (o.find('img').first().attr('data-cover') || '').trim(), p = [], h = (o.find('.module-item-caption').first().text() || '').replace(/\s+/g, ' ').trim();
            h && p.push(h);
            let m = (o.find('.module-item-ru').first().text() || '').replace(/\s+/g, ' ').trim();
            if (m && m !== h && p.push(m), d) try {
                Widget.storage.set(`cover:${s}`, d);
            } catch (e) {}
            r.push({
                id: s,
                title: u || `短视频 ${s}`,
                cover: d,
                caption: p.join(' · ')
            });
        }), r;
    })();
}
function h(e, t) {
    let n = u(e.cover, t);
    return i(r({
        id: e.id,
        type: 'detail',
        title: e.title,
        link: `short91:${e.id}`
    }, n ? {
        posterPath: n,
        coverUrl: n,
        backdropPath: n,
        coverRatio: 0.5625
    } : {}), {
        mediaType: 'movie',
        subtitle: e.caption || void 0
    });
}
function m(e) {
    let t = /<script[^>]*name="cc"[^>]*>\s*(\/m_sns\/[^<\s]+)\s*<\/script>/.exec(e);
    return t || (t = /url\s*=\s*"(\/m_sns\/[^"]+)"/.exec(e)) || (t = /(\/m_sns\/[A-Za-z0-9_/?=&%.-]+)/.exec(e)) ? t[1].trim() : '';
}
function f(e) {
    let t = parseInt((null != e ? e : '').trim(), 10);
    return Number.isFinite(t) && t > 0 ? t : 1;
}
function g(e, t) {
    return {
        id: 'diag:about',
        type: 'detail',
        title: e,
        link: 'short91:diag',
        mediaType: 'movie',
        description: t
    };
}
function y(e, r, i, n, o) {
    return t(function*() {
        if (i <= 1) {
            let t = yield d(n + r, n), i = yield p(t), l = m(t);
            try {
                l && Widget.storage.set(`nx:${e}:2`, l);
            } catch (e) {}
            return i.map((e)=>h(e, o));
        }
        let t = '';
        try {
            t = String(Widget.storage.get(`nx:${e}:${i}`) || '');
        } catch (e) {
            t = '';
        }
        if (!t) {
            let o = yield d(n + r, n), l = m(o), a = 1;
            for(; a < i && l;){
                a += 1;
                try {
                    Widget.storage.set(`nx:${e}:${a}`, l);
                } catch (e) {}
                if (a === i) {
                    t = l;
                    break;
                }
                l = m(o = yield d(n + l, n));
            }
            if (!t) return [];
        }
        let l = yield d(n + t, n), a = yield p(l), c = m(l);
        try {
            c && Widget.storage.set(`nx:${e}:${i + 1}`, c);
        } catch (e) {}
        return a.map((e)=>h(e, o));
    })();
}
function b(e, r) {
    return t(function*() {
        try {
            let t = yield r();
            if (0 === t.length) return [
                g(`${e}：这次没有取到内容`, '站点没有返回任何条目。可能是线路临时波动，或当前线路域名已变更——到模块设置里把「站点地址」换成站方最新线路后重试。')
            ];
            return t;
        } catch (t) {
            return console.log(`${n} ${e} 失败: ${(null == t ? void 0 : t.message) || t}`), [
                g(`${e}：取数失败（${(null == t ? void 0 : t.message) || '网络错误'}）`, '没能从站点取到这一屏。常见原因：当前线路域名已失效（在模块设置里把「站点地址」换成站方最新线路）、或网络临时波动，稍后重试。')
            ];
        }
    })();
}
loadLatest = (e)=>t(function*() {
        let { base: t, relay: r } = c(e), i = f(e.page);
        return b('最新短视频', ()=>y('latest', '/', i, t, r));
    })(), loadHd = (e)=>t(function*() {
        let { base: t, relay: r } = c(e), i = f(e.page);
        return b('国产高清', ()=>y('hd', '/short/home_category_list/hd', i, t, r));
    })(), loadLabelList = (e)=>t(function*() {
        let { base: t, relay: r } = c(e), i = f(e.page), n = (e.genreId || e.labelId || '').trim();
        if (!n) return [
            g('标签片单：从详情页的标签点进来', '这个分区没有独立入口：在任意视频的详情页点标签，就会打开对应标签的片单。首页可用的是「最新短视频」和「国产高清」两个分区。')
        ];
        let o = `/short/label_related_list/${encodeURIComponent(n)}`;
        return b('标签片单', ()=>y(`label:${n}`, o, i, t, r));
    })(), search = (e)=>t(function*() {
        let { base: r, relay: i } = c(e), n = (e.keyword || e.title || e.query || '').trim();
        return n ? b('搜索', ()=>t(function*() {
                let e = yield d(`${r}/search?wd=${encodeURIComponent(n)}`, r);
                return (yield p(e)).map((e)=>h(e, i));
            })()) : [];
    })(), loadDetail = (e)=>t(function*() {
        let t = (null != e ? e : '').trim();
        if ('short91:diag' === t) return {
            id: 'diag:about',
            type: 'detail',
            title: '91短视频 · 说明',
            link: 'short91:diag',
            mediaType: 'movie',
            description: "这是按 Rex 0.0.7 新内核重写的 91short 模块：数据来自站方公开网页，点开视频即可播放（HLS 直链）。\n封面：站方封面是 AES 加密图，必须经你自部署的封面解密 Worker 中转才显示——把 Worker 根地址填进模块设置的「封面中转地址」即可；不填不影响播放。\n线路：当前线路域名失效时，在设置里把「站点地址」换成站方最新线路（如 cn9）。\n标签：在详情页点标签可打开对应标签片单。"
        };
        let o = /short91:([A-Za-z0-9_-]+)/.exec(t) || /\/short\/([A-Za-z0-9_-]+)/.exec(t);
        if (!o) return [];
        let l = o[1], { base: a, relay: c } = s(), m = '';
        try {
            m = yield d(`${a}/short/${l}`, a);
        } catch (o) {
            console.log(`${n} loadDetail ${l} 取页失败: ${(null == o ? void 0 : o.message) || o}`);
            let e = '';
            try {
                e = String(Widget.storage.get(`cover:${l}`) || '');
            } catch (t) {
                e = '';
            }
            let t = u(e, c);
            return i(r({
                id: l,
                type: 'detail',
                title: `短视频 ${l}`,
                link: `short91:${l}`
            }, t ? {
                posterPath: t,
                coverUrl: t,
                backdropPath: t,
                coverRatio: 0.5625
            } : {}), {
                mediaType: 'movie',
                description: '详情页这次没打开，但播放不依赖详情——直接点播放即可。若反复失败，可能是线路域名已变更，去模块设置里换最新「站点地址」。'
            });
        }
        let f = yield Widget.html.load(m), g = (f('title').first().text() || '').trim();
        (g = g.replace(/\s*-\s*91短视频\s*$/, '').replace(/_+$/, '').trim()) || (g = `短视频 ${l}`);
        let y = [], b = new Set();
        f('a[href*="label_related_list/"]').each((e, t)=>{
            let r = (f(t).attr('href') || '').trim(), i = /label_related_list\/([^"?#]+)/.exec(r);
            if (!i) return;
            let n = i[1];
            try {
                n = decodeURIComponent(n);
            } catch (e) {}
            if (b.has(n)) return;
            b.add(n);
            let o = (f(t).text() || '').replace(/\s+/g, ' ').trim();
            if (!o) {
                let e = /[?&]title=([^&]+)/.exec(r);
                if (e) try {
                    o = decodeURIComponent(e[1]);
                } catch (t) {
                    o = e[1];
                }
            }
            o && y.push({
                id: n,
                title: o
            });
        });
        let v = '';
        try {
            v = String(Widget.storage.get(`cover:${l}`) || '');
        } catch (e) {
            v = '';
        }
        let $ = u(v, c), x = (yield p(m)).filter((e)=>e.id !== l).slice(0, 12).map((e)=>h(e, c)), k = [];
        return y.length > 0 && k.push(`标签：${y.map((e)=>e.title).join('、')}`), k.push(`来源：${a}/short/${l}`), i(r({
            id: l,
            type: 'detail',
            title: g,
            link: `short91:${l}`
        }, $ ? {
            posterPath: $,
            coverUrl: $,
            backdropPath: $,
            coverRatio: 0.5625
        } : {}), {
            mediaType: 'movie',
            genreItems: y.length > 0 ? y : void 0,
            relatedItems: x.length > 0 ? x : void 0,
            description: k.join('\n')
        });
    })(), loadResource = (e)=>t(function*() {
        var t;
        let r = s(), i = (null == e ? void 0 : e.baseUrl) ? l(e.baseUrl) : r.base, o = String(null != (t = null == e ? void 0 : e.id) ? t : '').trim();
        if (!o && (null == e ? void 0 : e.link)) {
            let t = /short91:([A-Za-z0-9_-]+)/.exec(String(e.link)) || /\/short\/([A-Za-z0-9_-]+)/.exec(String(e.link));
            t && (o = t[1]);
        }
        if (!o) return console.log(`${n} loadResource 无 id`), [];
        try {
            let e = yield d(`${i}/short/${o}`, i), t = /(?:t2player|player)\.html\?url=([^"'&\s]+)/.exec(e);
            if (t) {
                let e = t[1];
                try {
                    e = decodeURIComponent(e);
                } catch (e) {}
                if (/^https?:\/\//i.test(e) && e.includes('.m3u8')) return [
                    {
                        name: '默认线路',
                        description: '站方播放器直链（HLS）',
                        url: e
                    }
                ];
            }
            let r = /(https?:\/\/[^\s"'<>]+\.m3u8[^\s"'<>]*)/.exec(e);
            if (r) return [
                {
                    name: '默认线路',
                    description: '详情页直链（HLS）',
                    url: r[1]
                }
            ];
            console.log(`${n} loadResource ${o} 详情页未找到播放地址，走兜底拼法`);
        } catch (e) {
            console.log(`${n} loadResource ${o} 取详情失败，走兜底拼法: ${(null == e ? void 0 : e.message) || e}`);
        }
        return [
            {
                name: '默认线路',
                description: '固定拼法直链（HLS）',
                url: `https://ehapp2.dd.frcfwb.cn/cshort/${o}.m3u8`
            }
        ];
    })();
