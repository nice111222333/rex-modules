function e(e, t, r, n, i, l, o) {
    try {
        var u = e[l](o), a = u.value;
    } catch (e) {
        r(e);
        return;
    }
    u.done ? t(a) : Promise.resolve(a).then(n, i);
}
function t(t) {
    return function() {
        var r = this, n = arguments;
        return new Promise(function(i, l) {
            var o = t.apply(r, n);
            function u(t) {
                e(o, i, l, u, a, "next", t);
            }
            function a(t) {
                e(o, i, l, u, a, "throw", t);
            }
            u(void 0);
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
WidgetMetadata = {
    id: 'v7777-quark-organizer',
    title: '夸克AV整理',
    description: '夸克网盘 AV 作品批量整理：打开「片库整理」即扫描整个网盘，按番号认出作品，去 JavDB 查女优，把文件改成番号名并按女优归类到根目录同名文件夹。播放请用 AVDB夸克版。使用前请在全局参数中填写自己的夸克网盘 Cookie。',
    author: 'v7777',
    site: 'https://pan.quark.cn',
    version: "0.1.0",
    requiredVersion: '0.0.2',
    detailCacheDuration: 60,
    globalParams: [
        {
            name: 'quarkCookie',
            title: '夸克网盘 Cookie',
            type: 'input',
            description: '必填。登录 pan.quark.cn 后从浏览器开发者工具复制完整 Cookie',
            value: ''
        },
        {
            name: 'javdbCookie',
            title: 'JavDB Cookie',
            type: 'input',
            description: '可选。在浏览器登录 javdb.com 后复制完整 Cookie；查女优时详情页携带（与 AVDB夸克版同一份即可）',
            value: ''
        },
        {
            name: 'organizeMode',
            title: '整理模式',
            type: 'enumeration',
            value: 'do',
            enumOptions: [
                {
                    title: '整理并归类（改名+移动）',
                    value: 'do'
                },
                {
                    title: '只报告（不改动网盘，先看看会整理成什么样）',
                    value: 'report'
                }
            ]
        }
    ],
    modules: [
        {
            id: 'loadLibrary',
            title: '片库整理',
            functionName: 'loadLibrary',
            cacheDuration: 0,
            params: []
        }
    ]
};
let n = '[夸克AV整理]';
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
function l(e, t) {
    if (!t) return '';
    let r = String(t).trim();
    if (!r) return '';
    if (/^https?:\/\//i.test(r)) return r;
    if (r.startsWith('//')) return `https:${r}`;
    let n = /^(https?:\/\/[^/]+)/i.exec(e), i = n ? n[1] : e.replace(/\/+$/, '');
    if (r.startsWith('/')) return i + r;
    let l = e.split(/[?#]/)[0];
    return l.slice(0, l.lastIndexOf('/') + 1) + r;
}
function o(e) {
    return Object.keys(e).map((t)=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join('&');
}
function u(e) {
    if (!e) return null;
    let t = String(e).toUpperCase().replace(/[^A-Z0-9-]/g, ''), r = /FC2(?:-PPV)?-?(\d{5,7})/.exec(t);
    if (r) return `FC2-PPV-${r[1]}`;
    let n = /([A-Z]{2,6})-?(\d{2,5})/.exec(t);
    return n ? `${n[1]}-${n[2]}` : null;
}
function a(...e) {
    for (let t of e){
        if (!t) continue;
        let e = u(t);
        if (e) return e;
    }
    return null;
}
let s = 'https://javdb.com', c = 'javdb_cookie_mirror';
function d(e) {
    return t(function*() {
        try {
            if (!e || 'string' != typeof e.javdbCookie) return;
            let t = e.javdbCookie.trim();
            t ? yield Widget.storage.set(c, t) : yield Widget.storage.remove(c);
        } catch (e) {}
    })();
}
function f(e) {
    return t(function*() {
        if (e && 'string' == typeof e.javdbCookie && e.javdbCookie.trim()) return e.javdbCookie.trim();
        try {
            let e = yield Widget.storage.get(c);
            if ('string' == typeof e && e.trim()) return e.trim();
        } catch (e) {}
        return '';
    })();
}
function p(e, r) {
    return t(function*() {
        var n;
        let i, l = yield (i = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.6,ja;q=0.5',
            Referer: `${s}/`
        }, r && (i.Cookie = r), n = i, t(function*() {
            let t = yield Widget.http.get(e, {
                headers: n
            }), r = 'number' == typeof (null == t ? void 0 : t.statusCode) ? t.statusCode : 200;
            if (r >= 400) throw Error(`HTTP ${r}: ${e}`);
            let i = null == t ? void 0 : t.data;
            return 'string' == typeof i ? i : null == i ? '' : String(i);
        })());
        if (l && (/just a moment/i.test(l) || l.includes('challenges.cloudflare.com') || l.includes('_cf_chl') || /attention required/i.test(l) || l.includes('cf-browser-verification'))) throw Error(`JavDB 返回了 Cloudflare 验证页（出口 IP 被拦截）: ${e}`);
        return l;
    })();
}
function g(e, r) {
    return t(function*() {
        let t = yield Widget.html.load(e), n = t('a.box');
        0 === n.length && (n = t('.movie-list a.box, .grid a.box'));
        let i = [], o = new Set();
        return n.each((e, n)=>{
            var s, c, d, f, p;
            let g = t(n), m = l(r, null != (s = g.attr('href')) ? s : '');
            if (!m || o.has(m)) return;
            o.add(m);
            let h = g.find('.video-title strong').first().text().trim(), y = (null != (c = g.attr('title')) ? c : '').trim(), v = g.find('.video-title').first().text().trim(), $ = null != (d = u(h)) ? d : a(y, v), k = null != (f = null != (p = g.find('img').first().attr('src')) ? p : g.find('img').first().attr('data-src')) ? f : '';
            k = l(r, k), i.push({
                code: $,
                title: y || v || $ || m,
                link: m,
                cover: k
            });
        }), i;
    })();
}
function m(e) {
    return e.replace(/[:：\s]/g, '');
}
function h(e) {
    let t = e('nav.panel.movie-panel-info').first(), r = [];
    if (0 === t.length) return r;
    let n = t.find('> div, .panel-block'), i = new Set();
    return n.each((t, n)=>{
        if (i.has(n)) return;
        i.add(n);
        let l = e(n), o = l.find('strong').first();
        if (0 === o.length) return;
        let u = m(o.text());
        if (!u) return;
        let a = l.text().replace(/\s+/g, ' ').trim().replace(o.text().replace(/\s+/g, ' ').trim(), '').trim();
        r.push({
            label: u,
            valueText: a,
            $row: l
        });
    }), r;
}
function y(e, t) {
    return e.find((e)=>t.includes(e.label));
}
function v(e, t) {
    let r = y(t, [
        '演員',
        '演员'
    ]);
    if (!r) return [];
    let n = [];
    r.$row.find('a, strong').each((t, r)=>{
        var i, l;
        let o = e(r), u = null != (i = r.tagName) ? i : '';
        'a' === u ? n.push({
            kind: 'a',
            text: o.text().trim(),
            href: null != (l = o.attr('href')) ? l : ''
        }) : 'strong' === u && n.push({
            kind: 'strong',
            text: o.text().trim(),
            href: ''
        });
    });
    let i = !1, l = [];
    for (let e of n){
        if ('strong' === e.kind && !i && m(e.text) === r.label) {
            i = !0;
            continue;
        }
        'a' === e.kind ? l.push({
            name: e.text,
            href: e.href,
            gender: ''
        }) : l.length > 0 && !l[l.length - 1].gender && (l[l.length - 1].gender = e.text);
    }
    let o = l.some((e)=>e.gender.includes('♀') || e.gender.includes('♂'));
    return l.filter((e)=>e.name && (!o || e.gender.includes('♀')));
}
let $ = 'quark_cookie_dyn', k = 'quark_cookie_base_fp';
function b(e) {
    let t = 5381;
    for(let r = 0; r < e.length; r++)t = (t << 5) + t + e.charCodeAt(r) | 0;
    return `${e.length}:${(t >>> 0).toString(16)}`;
}
let C = new Set([
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
function _(e, n, i, l, u) {
    return t(function*() {
        var a, s;
        let c, d = yield t(function*() {
            var t;
            let r = (null != (t = e.quarkCookie) ? t : '').trim();
            if (!r) return '';
            try {
                if ((yield Widget.storage.get(k)) === b(r)) {
                    let e = yield Widget.storage.get($);
                    if ('string' == typeof e && e.trim()) return e;
                }
            } catch (e) {}
            return r;
        })();
        if (!d) throw Error('未填写夸克网盘 Cookie（模块全局参数 quarkCookie）');
        let f = o(r({
            pr: 'ucpro',
            fr: 'pc'
        }, l)), p = `https://drive.quark.cn/1/clouddrive${i}?${f}`, g = {
            Cookie: d,
            Accept: 'application/json, text/plain, */*',
            Referer: 'https://pan.quark.cn',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch'
        };
        c = 'GET' === n ? yield Widget.http.get(p, {
            headers: g
        }) : yield Widget.http.post(p, null != u ? u : {}, {
            headers: g
        }), yield (a = null == c ? void 0 : c.headers, t(function*() {
            try {
                var t, r;
                let n = (null != (t = e.quarkCookie) ? t : '').trim();
                if (!n || !a) return;
                let i = null != (r = a['set-cookie']) ? r : a['Set-Cookie'];
                if (!i) return;
                Array.isArray(i) || (i = [
                    i
                ]);
                let l = d, o = !1;
                for (let e of i){
                    let t = String(e).split(';')[0], r = t.indexOf('=');
                    if (r <= 0) continue;
                    let n = t.slice(0, r).trim();
                    ('__puus' === n || '__pus' === n) && (l = function(e, t, r) {
                        let n = e.split(';').map((e)=>e.trim()).filter(Boolean), i = !1, l = n.map((e)=>{
                            let n = e.indexOf('=');
                            return n > 0 && e.slice(0, n) === t ? (i = !0, `${t}=${r}`) : e;
                        });
                        return i || l.push(`${t}=${r}`), l.join('; ');
                    }(l, n, t.slice(r + 1).trim()), o = !0);
                }
                o && (yield Widget.storage.set($, l), yield Widget.storage.set(k, b(n)));
            } catch (e) {}
        })());
        let m = 'number' == typeof (null == c ? void 0 : c.statusCode) ? c.statusCode : 200;
        if (m >= 400) throw Error(`HTTP ${m}: 夸克接口 ${i}`);
        let h = function(e) {
            if (null == e) return null;
            if ('object' == typeof e) return e;
            if ('string' == typeof e) try {
                return JSON.parse(e);
            } catch (e) {}
            return null;
        }(null == c ? void 0 : c.data);
        if (!h) throw Error(`夸克接口 ${i} 返回了无法解析的内容`);
        if ('number' == typeof h.status && h.status >= 400 || void 0 !== h.code && 0 !== h.code) throw Error(`夸克接口 ${i} 出错: ${null != (s = h.message) ? s : `code=${h.code}`}`);
        return h;
    })();
}
function j(e, r) {
    return t(function*() {
        let t = [], n = 1;
        for(; n <= 20; n++){
            var i, l, o, u;
            let a = yield _(e, 'GET', '/file/sort', {
                pdir_fid: r,
                _page: String(n),
                _size: '100',
                _fetch_total: '1',
                fetch_all_file: '1',
                fetch_risk_file_name: '1'
            }), s = Array.isArray(null == a || null == (i = a.data) ? void 0 : i.list) ? a.data.list : [];
            for (let e of s)t.push({
                fid: String(null != (o = e.fid) ? o : ''),
                name: String(null != (u = e.file_name) ? u : ''),
                size: 'number' == typeof e.size ? e.size : 0,
                category: 'number' == typeof e.category ? e.category : 0,
                isDir: !1 === e.file
            });
            let c = null == a || null == (l = a.metadata) ? void 0 : l._total;
            if (0 === s.length || 'number' == typeof c && t.length >= c || s.length < 100) break;
        }
        return t;
    })();
}
let x = 'org_work_';
function O(e) {
    return t(function*() {
        try {
            let l = yield Widget.storage.get(x + e.toUpperCase());
            if ('string' == typeof l && l) {
                let e = JSON.parse(l);
                if (e && 'object' == typeof e) {
                    var t, r, n, i;
                    return {
                        actress: String(null != (t = e.a) ? t : ''),
                        cover: String(null != (r = e.c) ? r : ''),
                        title: String(null != (n = e.t) ? n : ''),
                        link: String(null != (i = e.l) ? i : '')
                    };
                }
            }
        } catch (e) {}
        return null;
    })();
}
loadLibrary = (e)=>t(function*() {
        var u, c, m, y, $, k;
        yield d(e);
        let b = (null != (u = e.organizeMode) ? u : 'do') === 'report' ? 'report' : 'do', S = yield t(function*() {
            let t = [
                '0'
            ], l = [], o = new Map(), u = new Set(), a = 0, s = 0;
            for(; t.length > 0 && a < 120 && s < 8000;){
                let d, f = t.shift();
                a++;
                try {
                    d = yield j(e, f);
                } catch (e) {
                    console.log(`${n} 目录 ${f} 列取失败，跳过: ${i(e)}`);
                    continue;
                }
                for (let e of d){
                    var c;
                    if (s++, e.isDir) {
                        o.set(e.fid, e.name), '0' === f && u.add(e.fid), t.push(e.fid);
                        continue;
                    }
                    (1 === e.category || function(e) {
                        let t = e.lastIndexOf('.');
                        return !(t < 0) && C.has(e.slice(t + 1).toLowerCase());
                    }(e.name)) && l.push(function(e, t) {
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
                    }(r({}, e), {
                        parentFid: f,
                        parentName: null != (c = o.get(f)) ? c : '',
                        parentIsRoot: u.has(f)
                    }));
                }
            }
            return t.length > 0 && console.log(`${n} 扫描达到遍历上限（已走 ${a} 个目录、扫描 ${s} 项），结果可能不完整`), l;
        })(), w = new Map(), P = 0;
        for (let e of S){
            let t = null != (c = a(e.name)) ? c : a(e.parentName);
            if (!t) {
                P++;
                continue;
            }
            let r = null != (m = w.get(t)) ? m : [];
            r.push(e), w.set(t, r);
        }
        let W = [
            ...w.keys()
        ].sort();
        console.log(`${n} 扫描到 ${S.length} 个视频，识别出 ${W.length} 部作品（${P} 个无番号跳过），模式=${'do' === b ? '整理' : '只报告'}`);
        let A = 0, q = [];
        for (let r of W){
            let u, a = w.get(r), c = r.toUpperCase().replace(/[^A-Z0-9]/g, ''), d = a.every((e)=>e.parentIsRoot && e.parentName && !e.parentName.toUpperCase().replace(/[^A-Z0-9]/g, '').includes(c)), m = 1 === a.length, C = m ? null != (y = null == (k = /\.([A-Za-z0-9]{2,5})$/.exec(a[0].name)) ? void 0 : k[1]) ? y : 'mp4' : '', S = m ? `${r}.${C}` : '', P = !m || a[0].name === S, W = !!(d && P), T = yield O(r);
            if (W) u = `已整理（文件夹「${a[0].parentName}」）`;
            else if (T || A < 15) if (T || (A++, T = yield function(e, r) {
                return t(function*() {
                    let u = yield O(r);
                    if (u) return u;
                    let a = null;
                    try {
                        a = yield t(function*() {
                            var t, n, i, u, a, c;
                            let d = `${s}/search?${o({
                                q: r,
                                f: 'all'
                            })}`, m = yield p(d), y = yield g(m, d);
                            if (0 === y.length) return null;
                            let $ = null != (t = y.find((e)=>e.code === r)) ? t : y[0], k = yield f(e), b = yield p($.link, k), C = yield Widget.html.load(b), _ = h(C), j = v(C, _), x = null != (n = C('img.video-cover').first().attr('src')) ? n : '';
                            x || (x = null != (i = C('meta[property="og:image"]').attr('content')) ? i : ''), x = l($.link, x) || $.cover;
                            let O = C('h2 strong.current-title').first().text().trim(), S = null != (u = C('meta[property="og:title"]').attr('content')) ? u : '';
                            return {
                                actress: (null != (a = null == (c = j[0]) ? void 0 : c.name) ? a : '').replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60),
                                cover: x,
                                title: O || S || $.title,
                                link: $.link
                            };
                        })();
                    } catch (e) {
                        console.log(`${n} JavDB 查询 ${r} 失败: ${i(e)}`);
                    }
                    if (a) try {
                        yield Widget.storage.set(x + r.toUpperCase(), JSON.stringify({
                            a: a.actress,
                            c: a.cover,
                            t: a.title,
                            l: a.link
                        }));
                    } catch (e) {}
                    return a;
                })();
            }(e, r)), T && T.actress) if ('report' === b) u = `将归类到「${T.actress}」` + (m && !P ? `，文件改名为 ${S}` : '') + '（只报告，未执行）';
            else {
                let r = [];
                try {
                    let l = yield function(e, r) {
                        return t(function*() {
                            let t = (yield j(e, '0')).find((e)=>e.isDir && e.name === r);
                            if (t) return t.fid;
                            try {
                                yield _(e, 'POST', '/file', {}, {
                                    dir_init_lock: !1,
                                    dir_path: '',
                                    file_name: r,
                                    pdir_fid: '0'
                                });
                            } catch (e) {
                                console.log(`${n} 创建文件夹「${r}」失败（可能已有同名）: ${i(e)}`);
                            }
                            for(let t = 0; t < 3; t++){
                                var l, o;
                                let t = null != (l = null == (o = (yield j(e, '0')).find((e)=>e.isDir && e.name === r)) ? void 0 : o.fid) ? l : '';
                                if (t) return t;
                                yield new Promise((e)=>{
                                    'function' == typeof setTimeout ? setTimeout(e, 800) : e();
                                });
                            }
                            return '';
                        })();
                    }(e, T.actress);
                    if (m && !P && (yield function(e, r, n) {
                        return t(function*() {
                            yield _(e, 'POST', '/file/rename', {}, {
                                fid: r,
                                file_name: n
                            });
                        })();
                    }(e, a[0].fid, S), r.push(`文件已改名为 ${S}`)), l) {
                        for (let r of a)r.parentFid !== l && (yield function(e, r, n) {
                            return t(function*() {
                                yield _(e, 'POST', '/file/move', {}, {
                                    action_type: 1,
                                    exclude_fids: [],
                                    filelist: [
                                        r
                                    ],
                                    to_pdir_fid: n
                                });
                            })();
                        }(e, r.fid, l));
                        r.push(`已归类到「${T.actress}」`);
                    } else r.push('女优文件夹创建失败，未移动');
                } catch (e) {
                    r.push(`整理失败：${i(e)}`);
                }
                u = r.join('；');
            }
            else u = '未查到女优（JavDB 无此番号或网络问题），暂未整理';
            else u = '待整理（本次查询额度已用完，下次打开继续）';
            let D = [
                `番号：${r}`,
                ...(null == T ? void 0 : T.actress) ? [
                    `女优：${T.actress}`
                ] : [],
                `状态：${u}`,
                `文件：${a.map((e)=>e.name).join('、')}`
            ];
            q.push({
                id: r,
                type: 'detail',
                title: (null == T ? void 0 : T.title) ? `${r} ${T.title}` : r,
                link: null != ($ = null == T ? void 0 : T.link) ? $ : `organizer:${r}`,
                posterPath: (null == T ? void 0 : T.cover) || void 0,
                coverUrl: (null == T ? void 0 : T.cover) || void 0,
                backdropPath: (null == T ? void 0 : T.cover) || void 0,
                description: D.join('\n'),
                mediaType: 'movie'
            });
        }
        return console.log(`${n} 片库整理完成：${q.length} 部作品`), q;
    })(), loadDetail = (e, r)=>t(function*() {
        var t, c, m, $, k;
        let b;
        if (!e) return null;
        yield d(r);
        let C = e, _ = null;
        if (e.startsWith('organizer:')) {
            if (!(_ = u(e.slice(10)))) return null;
            try {
                let e = `${s}/search?${o({
                    q: _,
                    f: 'all'
                })}`, r = yield p(e), n = yield g(r, e), i = null != (t = n.find((e)=>e.code === _)) ? t : n[0];
                if (!i) return null;
                C = i.link;
            } catch (e) {
                return console.log(`${n} 详情搜索失败: ${i(e)}`), null;
            }
        }
        let j = yield f(r);
        try {
            b = yield p(C, j);
        } catch (e) {
            return console.log(`${n} 详情获取失败: ${i(e)}`), null;
        }
        try {
            let e = yield Widget.html.load(b), t = h(e), r = _, n = y(t, [
                '番號',
                '番号'
            ]);
            n && (r = null != (c = u(n.valueText)) ? c : r), r || (r = a(e('title').first().text()));
            let i = e('h2 strong.current-title').first().text().trim(), o = null != (m = e('meta[property="og:title"]').attr('content')) ? m : '', s = i || o || r || C, d = null != ($ = e('img.video-cover').first().attr('src')) ? $ : '';
            d || (d = null != (k = e('meta[property="og:image"]').attr('content')) ? k : ''), d = l(C, d);
            let f = v(e, t).map((e)=>({
                    id: e.href || e.name,
                    title: e.name,
                    role: '演员'
                })), p = [];
            return r && p.push(`番号：${r}`), f.length > 0 && p.push(`女优：${f.map((e)=>e.title).join('、')}`), p.push('播放资源由 AVDB夸克版 提供（夸克原画 / MemoJav 等）。'), {
                id: null != r ? r : C,
                type: 'detail',
                title: s,
                link: C,
                posterPath: d || void 0,
                detailPoster: d || void 0,
                coverUrl: d || void 0,
                backdropPath: d || void 0,
                peoples: f.length > 0 ? f : void 0,
                description: p.join('\n'),
                mediaType: 'movie'
            };
        } catch (e) {
            return console.log(`${n} 详情解析失败: ${i(e)}`), null;
        }
    })();
