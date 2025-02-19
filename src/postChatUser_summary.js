var postChatInjectConfig = window.postChatConfig || {},
    postChat_containerVisible = !1,
    postChat_theme = "light",
    postChat_initialContent = "",
    postChat_initialSearchContent = "",
    postChat_initialTag = "",
    postChat_initialChatMsg = "",
    postChat_initialSearchMsg = "",
    postChat_mode = postChatInjectConfig.userMode || "magic",
    tianliGPTIsRunning = !1,
    tianliGPTLastRunTime = 0,
    tianliGPTIcon = `
<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <g id="PostChatIcon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M178.32746,38.1674592 C184.94624,39.2722717 189.41798,45.5415286 188.31476,52.1698631 L183.3824,81.8051213 L195.5,81.8051213 C217.86734,81.8051213 236,99.9639566 236,122.363585 L236,176.441536 C236,198.841165 217.86734,217 195.5,217 L60.5,217 C38.13266,217 20,198.841165 20,176.441536 L20,122.363585 C20,99.9639566 38.13266,81.8051213 60.5,81.8051213 L72.6176,81.8051213 L67.68524,52.1698631 C66.58202,45.5415286 71.05376,39.2722717 77.67254,38.1674592 C84.29132,37.0626466 90.55154,41.5408418 91.65476,48.1691763 L97.05476,80.6159472 C97.12118,81.0139609 97.16708,81.4108931 97.19408,81.8051213 L158.80592,81.8051213 C158.83292,81.4103523 158.87882,81.0139609 158.94524,80.6159472 L164.34524,48.1691763 C165.44846,41.5408418 171.70868,37.0626466 178.32746,38.1674592 Z M195.5,106.140199 L60.5,106.140199 C51.55274,106.140199 44.3,113.403409 44.3,122.363585 L44.3,176.441536 C44.3,185.401712 51.55274,192.664922 60.5,192.664922 L195.5,192.664922 C204.44726,192.664922 211.7,185.401712 211.7,176.441536 L211.7,122.363585 C211.7,113.403409 204.44726,106.140199 195.5,106.140199 Z M170.929146,115.769966 C186.787773,115.769966 199.64373,129.17895 199.64373,145.719769 C199.64373,162.260589 186.787773,175.669572 170.929146,175.669572 L170.789001,175.669223 L170.940867,175.777818 L132.915994,175.085046 C139.992621,173.45318 144.71702,171.303355 147.089188,168.635574 C148.027583,167.580239 148.842657,166.599557 149.534408,165.693529 C144.982469,160.395555 142.214563,153.394806 142.214563,145.719769 C142.214563,129.17895 155.07052,115.769966 170.929146,115.769966 Z M85.07,126.419431 C91.78004,126.419431 97.22,131.867244 97.22,138.58697 L97.22,149.402561 C97.22,156.122287 91.78004,161.5701 85.07,161.5701 C78.35996,161.5701 72.92,156.122287 72.92,149.402561 L72.92,138.58697 C72.92,131.867244 78.35996,126.419431 85.07,126.419431 Z M170.93,132.247891 C165.94688,132.247891 161.906967,136.293635 161.906967,141.283948 L161.906967,149.315999 C161.906967,154.306313 165.94688,158.352057 170.93,158.352057 C175.91312,158.352057 179.953033,154.306313 179.953033,149.315999 L179.953033,141.283948 C179.953033,136.293635 175.91312,132.247891 170.93,132.247891 Z" id="PostChatIconPath" fill="#FFFFFF" fill-rule="nonzero"></path>
    </g>
</svg>
`,
    tianliGPTSystem = "";
class TianliGPT {
    insertAIDiv(i, t) {
        this.removeExistingAIDiv();
        let n = document.querySelector(i);
        t = t || i;
        var e, a, o, t = document.querySelector(t);
        if (!n) {
            let t = 0,
                e = setInterval(() => {
                    t += 300, (n = document.querySelector(i)) ? clearInterval(e) : 2e4 <= t && (clearInterval(e), console.log("洪墨摘要AI：在网页显示摘要AI框架失败，原因是没有找到需要注入的位置。如果本不打算在此页面展示摘要AI，可以忽略此提醒。"))
                }, 300)
        }
        document.querySelector(".post-TianliGPT") && tianliGPTIsRunning || (tianliGPTIsRunning = !0, (e = document.createElement("div")).className = "post-TianliGPT", "undefined" != typeof tianliGPT_theme && tianliGPT_theme && e.classList.add("gpttheme_" + tianliGPT_theme.toLowerCase()), (o = document.createElement("div")).className = "tianliGPT-title", e.appendChild(o), (a = document.createElement("i")).className = "tianliGPT-title-icon", o.appendChild(a), a.innerHTML = tianliGPTIcon, (a = document.createElement("div")).className = "tianliGPT-title-text", "undefined" == typeof tianliGPT_Title ? a.textContent = "AI摘要" : a.textContent = tianliGPT_Title, o.appendChild(a), (a = document.createElement("div")).className = "tianliGPT-tag", a.id = "tianliGPT-tag", "undefined" == typeof tianliGPT_Name ? a.textContent = "TianliGPT" : a.textContent = tianliGPT_Name, o.appendChild(a), (o = document.createElement("div")).className = "tianliGPT-explanation", o.innerHTML = "undefined" == typeof tianliGPT_loadingText || tianliGPT_loadingText ? '生成中...<span class="blinking-cursor"></span>' : '<span class="blinking-cursor"></span>', e.appendChild(o), t ? t.insertBefore(e, t.firstChild) : n && n.insertBefore(e, n.firstChild))
    }
    removeExistingAIDiv() {
        var t = document.querySelector(".post-TianliGPT");
        t && t.parentElement.removeChild(t)
    }
    getVerifiedTitle() {
        let e = ["#thread_subject", ".view_tit", "h1", ".postlist_top h2"];
        var t = (document.title || "").trim(),
            i = function() {
                for (var t of e) {
                    t = document.querySelector(t);
                    if (t && t.textContent.trim()) return (t = (t = t).cloneNode(!0)).querySelectorAll("em").forEach(t => t.remove()), t.textContent.trim()
                }
                return null
            }();
        return i && t.startsWith(i) ? i.trim() : t
    }
    getTitleAndContent() {
        try {
            let a = this.getVerifiedTitle(),
                o = () => {
                    var e = document.querySelector(tianliGPT_postSelector);
                    if (!e) return "";
                    var t, e = e.cloneNode(!0),
                        i = (e.querySelectorAll(".showhide, .locked, script, style, .authi, .post-TianliGPT, .code, .terminal_frame, .share-modal, .aplayer").forEach(t => t.remove()), "Discuz" == tianliGPTSystem && e.querySelectorAll(".txtlist.cl, .view_reply.cl, ignore_js_op, #hm_qrcode, .readthread_box", ".smplayerbox", ".it618_tieclick_ajax", ".attach_nopermission").forEach(t => t.remove()), e.querySelectorAll("p, strong, font, ul, li, ol, span, td"));
                    let n = "";
                    for (t of e.querySelectorAll("h1, h2, h3, h4, h5")) n += t.innerText + " ";
                    var a, o = [];
                    for (a of i) {
                        var s = Array.from(a.childNodes).filter(t => t.nodeType === Node.TEXT_NODE).map(t => t.textContent).join("").trim().replace(/https?:\/\/[^\s]+/g, "");
                        "" !== s.trim() && o.push(s)
                    }
                    if (0 === o.length) {
                        let t = e.innerText;
                        t = t.replace(/\n/g, " ").replace(/\s+/g, " ").trim(), n += t
                    } else n = o.join(" ");
                    return n.trim()
                },
                s = o();
            if (!s) return new Promise(i => {
                let t = 0,
                    n = () => {
                        t++, console.log(`洪墨摘要AI：文章内容为空，第${t}次重试...`), setTimeout(() => {
                            if (!(s = o()) && t < 2) n();
                            else if (s) {
                                let t = a + " " + s;
                                t = t.replace(/(\s*\n\s*)+/g, " ").trim();
                                var e = "undefined" != typeof tianliGPT_wordLimit ? tianliGPT_wordLimit : 1e3;
                                i(t.slice(0, e))
                            } else console.log("洪墨摘要AI：重试3次后内容仍为空，放弃获取。如果本不打算在此页面展示摘要AI，可以忽略此提醒。"), i("")
                        }, 1e3)
                    };
                n()
            });
            let t = a + " " + s;
            t = t.replace(/(\s*\n\s*)+/g, " ").trim();
            var e = "undefined" != typeof tianliGPT_wordLimit ? tianliGPT_wordLimit : 1e3;
            return t.slice(0, e)
        } catch (t) {
            return console.log("洪墨摘要AI：可能由于一个或多个情况在本页面没有正常运行，如果本不打算在此页面展示，可以忽略此提醒，原因出在获取文章容器中的内容失败，或者可能是在文章转换过程中失败。", t), ""
        }
    }
    old_getTitleAndContent() {
        try {
            var i, n, a = document.title,
                o = document.querySelector(tianliGPT_postSelector),
                s = (o || (console.log("洪墨摘要AI：找不到文章容器。将在2秒后重新检查。"), setTimeout(() => {
                    document.querySelector(tianliGPT_postSelector) ? (tianliGPTIsRunning = !1, this.checkURLAndRun()) : console.log("洪墨摘要AI：再次检查后仍找不到文章容器。如果本页面不打算展示摘要，可以忽略此提醒。请确保代码放置在正确的位置。")
                }, 500)), o.getElementsByTagName("p")),
                r = o.querySelectorAll("h1, h2, h3, h4, h5");
            let t = "";
            for (i of r) t += i.innerText + " ";
            for (n of s) {
                var l = n.innerText.replace(/https?:\/\/[^\s]+/g, "");
                t += l
            }
            var c = a + " " + t;
            let e = 1e3;
            return "undefined" != typeof tianliGPT_wordLimit && (e = tianliGPT_wordLimit), c.slice(0, e)
        } catch (t) {
            return console.log("洪墨摘要AI：可能由于一个或多个情况在本页面没有正常运行，如果本不打算在此页面展示，可以忽略此提醒，原因出在获取文章容器中的内容失败，或者可能是在文章转换过程中失败。", t), ""
        }
    }
    async fetchTianliGPT(t) {
        let e = "";
        var i = document.querySelector("script[data-postChat_key]");
        if (i) e = i.getAttribute("data-postChat_key");
        else {
            if ("undefined" == typeof tianliGPT_key) return {
                summary: "没有获取到key，代码可能没有安装正确。如果你需要在tianli_gpt文件引用前定义tianliGPT_key变量。详细请查看文档。"
            };
            e = tianliGPT_key
        }
        if ("5Q5mpqRK5DkwT1X9Gi5e" === e) return {
            summary: "请购买 key 使用，如果你能看到此条内容，则说明代码安装正确。"
        };
        var i = window.location.href,
            n = document.title;
        if ("Discuz" === tianliGPTSystem) {
            var a = new URL(i),
                o = "undefined" != typeof tianliGPT_discuz_tid ? tianliGPT_discuz_tid : "undefined" != typeof tid ? tid : null;
            if (!o) return {
                summary: "Discuz中需要携带tid参数，变量名为：tianliGPT_discuz_tid，例如：let tianliGPT_discuz_tid = '2'，当tid不存在的页面可以设为0。不允许不包含tid参数的Discuz请求。建议使用Discuz插件实现。"
            };
            i = a.origin + "/forum.php?mod=viewthread&tid=" + o
        }
        if ("ZBlog" === tianliGPTSystem) {
            a = new URL(i), o = "undefined" != typeof tianliGPT_zblog_id ? tianliGPT_zblog_id : null;
            if (!o) return {
                summary: "ZBlog中需要携带id参数，变量名为：tianliGPT_zblog_id，例如：let tianliGPT_zblog_id = '3'。不允许不包含id参数的ZBlog请求。"
            };
            i = a.origin + "/?id=" + o
        }
        let s = "zh-CN",
            r = (document.documentElement.lang && (s = document.documentElement.lang), JSON.stringify({
                content: t,
                key: e,
                url: i,
                title: n,
                system: tianliGPTSystem,
                language: s
            }));
        async function l() {
            let t = new AbortController;
            var i = setTimeout(() => t.abort(), 1e4);
            try {
                var n = await fetch("https://summary.tianli0.top/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: r,
                        signal: t.signal
                    }),
                    a = (clearTimeout(i), await n.text());
                let e;
                try {
                    e = JSON.parse(a)
                } catch (t) {
                    return console.warn("Response is not valid JSON:", a), {
                        summary: "服务器返回了无效的响应"
                    }
                }
                if (n.ok) return {
                    summary: e.summary
                };
                {
                    let t = "";
                    if (514 === n.status) return t = "TianliGPT is only available in mainland China, and is not yet open to overseas users, so stay tuned!", this.aiShowAnimation(t), {
                        summary: t
                    };
                    if (403 === n.status) switch (e.err_code) {
                        case 1:
                            return {
                                summary: t = '你的网站设置了Referrer-Policy为same-origin，这会导致Tianli无法验证你的请求来源。TianliGPT依赖refer进行来源判断，特别是meta标签的referrer属性需要修改，至少为origin。例如：<meta name="referrer" content="origin">'
                            };
                        case 2:
                            return {
                                summary: t = "你正在使用的账户Key或tianliGPT_key没有绑定当前网站，请检查当前的密钥是否绑定了当前网站地址。可以到summary.zhheo.com中绑定。"
                            };
                        case 3:
                            return {
                                summary: t = "参数缺失，请检查是否正确配置账户Key或tianliGPT_key"
                            };
                        case 4:
                            throw document.querySelectorAll(".post-TianliGPT").forEach(t => {
                                t.style.display = "none"
                            }), t = "Key错误或余额不足，请充值后请求新的文章", new Error("洪墨摘要AI：" + t);
                        case 5:
                            return document.querySelectorAll(".post-TianliGPT").forEach(t => {
                                t.style.display = "none"
                            }), {
                                summary: t = "未知错误"
                            };
                        case 6:
                            return document.querySelectorAll(".post-TianliGPT").forEach(t => {
                                t.style.display = "none"
                            }), {
                                summary: t = "数据库错误"
                            };
                        case 7:
                            return {
                                summary: t = e.err_msg
                            };
                        default:
                            return tianliGPT.aiShowAnimation("未知错误，请检查API文档"), {
                                summary: "未知错误，请检查API文档"
                            }
                    }
                }
            } catch (t) {
                return clearTimeout(i), "AbortError" === t.name ? (console.warn("请求超时"), {
                    summary: "请求超时"
                }) : (console.error("请求失败：", t), {
                    summary: "请求失败"
                })
            }
        }
        a = await l();
        return "timeout" === a ? (console.warn("第一次请求超时，尝试第二次请求..."), "timeout" === (o = await l()) || "error" === o ? {
            summary: "目前生成摘要任务排队较多，请稍候刷新再试"
        } : o) : a
    }
    aiShowAnimation(n) {
        let a = document.querySelector(".tianliGPT-explanation");
        if (!a) return;
        if ("undefined" != typeof tianliGPT_typingAnimate && !tianliGPT_typingAnimate) return a.innerHTML = n, void(tianliGPTIsRunning = !1);
        a.style.display = "block", a.innerHTML = "undefined" == typeof tianliGPT_loadingText || tianliGPT_loadingText ? '生成中...<span class="blinking-cursor"></span>' : '<span class="blinking-cursor"></span>', document.querySelector(".tianliGPT-tag").classList.add("loadingAI");
        let o, s = 0,
            r = performance.now(),
            l = () => {
                var t, e, i;
                s < n.length && o && (e = (t = performance.now()) - r, i = n.slice(s, s + 1), (/[，。！、？,.!?]/.test(i) ? 150 : 25) <= e && (a.innerText = n.slice(0, s + 1), r = t, ++s < n.length ? a.innerHTML = n.slice(0, s) + '<span class="blinking-cursor"></span>' : (a.innerHTML = n, a.style.display = "block", tianliGPTIsRunning = !1, c.disconnect(), document.querySelector(".tianliGPT-tag").classList.remove("loadingAI"))), requestAnimationFrame(l))
            },
            c = new IntersectionObserver(t => {
                t = t[0].isIntersecting;
                (o = t) && setTimeout(() => {
                    requestAnimationFrame(l)
                }, 200)
            }, {
                threshold: 0
            });
        var t = document.querySelector(".post-TianliGPT");
        c.observe(t)
    }
    async runTianliGPT() {
        if ("undefined" != typeof tianliGPT_postSelector) {
            if ("Discuz" === tianliGPTSystem) {
                var t = document.querySelector(tianliGPT_postSelector);
                if (t)
                    if (t.querySelector('a[href*="plugin.php?id=duceapp_vip&ac=pay&referer=forum.php"]')) return
            }
            t = await get_title_content_helper();
            t && console.log("TianliGPT本次提交的内容为：" + t), this.insertAIDiv(tianliGPT_postSelector, "undefined" != typeof tianliGPT_injectDom && tianliGPT_injectDom ? tianliGPT_injectDom : tianliGPT_postSelector), "https:" !== window.location.protocol ? this.aiShowAnimation("为了保证传输的安全性和可靠性，不支持在http协议下显示文章摘要。请为网站申请证书，并在summary.zhheo.com使用https协议的地址绑定即可。如果是本地或者局域网访问，可以忽略此警告。") : this.fetchTianliGPT(t).then(t => {
                let e = t.summary,
                    i;
                "undefined" != typeof tianliGPT_BeginningText ? i = tianliGPT_BeginningText : "undefined" != typeof postChatConfig && postChatConfig.beginningText ? i = postChatConfig.beginningText : "Discuz" === tianliGPTSystem && (i = "这个帖子"), i && (e.match(/^这篇文章[\u4e00-\u9fa5]{1,2}了/) ? e = e.replace(/^这篇文章[\u4e00-\u9fa5]{1,2}了/g, "" + i) : e.match(/^这篇文章通过/) && (e = e.replace(/^这篇文章通过/g, i + "通过"))), e = e.replace(/介绍了通过/g, "通过"), this.aiShowAnimation(e)
            })
        }
    }
    checkURLAndRun() {
        var t = Date.now();
        if (!(t - tianliGPTLastRunTime < 500)) {
            tianliGPTLastRunTime = t;
            t = document.querySelector('meta[name="generator"]');
            if (t && t.content.includes("WordPress")) {
                t = new URL(window.location.href);
                if (t.searchParams.has("preview") && "true" === t.searchParams.get("preview")) return void console.log("当前页面为WordPress预览模式，不执行摘要功能。")
            }
            if ("undefined" == typeof tianliGPT_postURL) this.attemptRunTianliGPT();
            else try {
                let t;
                t = (t => {
                    try {
                        return new RegExp(t), t.startsWith("/") && t.endsWith("/") && 2 < t.length
                    } catch (t) {
                        return !1
                    }
                })(tianliGPT_postURL) ? new RegExp(tianliGPT_postURL.slice(1, -1)) : (t => {
                    t = t.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
                    return new RegExp("^" + t.split(/\*+/).join(".*") + "$")
                })(tianliGPT_postURL);
                var e = window.location.href;
                t.test(e) ? this.attemptRunTianliGPT() : console.log(`洪墨摘要AI：当前 URL '${e}' 不符合规则 '${tianliGPT_postURL}'，所以我决定不执行摘要功能。`)
            } catch (t) {
                console.error("洪墨摘要AI：我没有看懂你编写的自定义链接规则，所以我决定不执行摘要功能", t)
            }
        }
    }
    attemptRunTianliGPT() {
        let e = 0,
            i = setInterval(() => {
                try {
                    this.tianliGPTCustomBlackList(), clearInterval(i)
                } catch (t) {
                    20 <= e && (clearInterval(i), console.error("洪墨摘要AI：获取自定义黑名单超时。多次尝试失败，停止尝试。", t)), e++
                }
            }, 200)
    }
    tianliGPTCustomBlackList() {
        "undefined" != typeof tianliGPT_blacklist && tianliGPT_blacklist ? fetch(tianliGPT_blacklist).then(t => t.json()).then(t => {
            t = t.blackurls;
            let e = window.location.href;
            t.some(t => {
                return new RegExp("^" + t.replace(/\*/g, ".*") + "$").test(e)
            }) ? console.log("洪墨摘要AI：URL在黑名单中，不执行摘要") : this.runTianliGPT()
        }).catch(t => {
            console.error("洪墨摘要AI：请求黑名单失败。Error fetching blacklist:", t), this.runTianliGPT()
        }) : this.runTianliGPT()
    }
}
async function get_title_content_helper() {
    return await window.tianliGPT.getTitleAndContent()
}

function postChat_load() {
    removeExistingPostChatDiv(), postChat_addStyles();
    var t, e = window.postChatConfig || {},
        i = e.backgroundColor || "#3e86f6",
        n = e.bottom || "16px",
        a = e.left || "16px",
        o = parseInt(a, 10) < 0,
        s = o ? Math.abs(parseInt(a, 10)) + "px" : void 0,
        r = e.fill || "#FFFFFF",
        l = e.width || "44px",
        c = e.height || l,
        e = void 0 === e.addButton || null === e.addButton || e.addButton;
    "magic" === postChat_mode ? postChatUser.loadPostChatMagicResources() : "iframe" === postChat_mode && postChatUser.loadPostChatIframeResources(), e && (t = document.createElement("button"), (e = document.createElement("div")).id = "postChat_button_icon", e.innerHTML = tianliGPTIcon, t.appendChild(e), e.querySelector("path").setAttribute("fill", r), t.id = "postChat_button", t.style.padding = "10px", t.style.width = l, t.style.height = c, t.style.backgroundColor = i, t.style.border = "none", t.style.borderRadius = "12px", t.style.cursor = "pointer", t.style.position = "fixed", t.style.bottom = n, o ? t.style.right = s : t.style.left = a, t.style.display = "flex", t.style.alignItems = "center", t.style.justifyContent = "center", t.style.zIndex = "2147483000", t.style.transition = "0.3s", t.addEventListener("mouseenter", () => {
        t.style.filter = "brightness(1.2)"
    }), t.addEventListener("mouseleave", () => {
        t.style.filter = "brightness(1)"
    }), t.addEventListener("click", togglePostChatContainer), document.body.appendChild(t))
}

function togglePostChatContainer() {
    postChat_containerVisible = postChat_containerVisible ? (postChatUser.closePostChatContainer(), !1) : (postChatUser.openPostChatContainer(), !0)
}

function postchat_updateThemeStyles(t) {
    var e = document.getElementById("postChat_iframeContainer"),
        i = document.getElementById("close-button"),
        n = document.querySelector("#postchat_resizer");
    e && ("light" === t ? (e.style.border = "1px solid #e3e8f7", e.style.background = "#f7f9fe") : (e.style.border = "1px solid #3d3d3f", e.style.background = "#18171d")), i && (i.style.fill = "light" === t ? "#363636" : "#F7F7FA"), n && (n.style.background = "light" === t ? "#3978f44f" : "#b5b5b996")
}

function postChat_addStyles() {
    var t;
    document.getElementById("postChat_styles") || ((t = document.createElement("style")).id = "postChat_styles", t.appendChild(document.createTextNode(`
    #postChat_button_icon {
      width: 100%;
      height: 100%;
    }

    #postChat_button_icon svg {
      width: 100%;
      height: 100%;
    }

    @media screen and (max-width: 768px) {
      #postchat_resizer {
        display: none;
      }

      #postChat_iframeContainer {
        width: 100vw!important;
        height: 100dvh!important;
        position: fixed!important;
        max-height: 100dvh!important;
        max-width: 100vw!important;
        top: 0!important;
        left: 0!important;
        border-radius: 0!important;
      }
    }
  `)), document.head.appendChild(t))
}

function isClickInsideInteractiveElement(t) {
    for (var e = ["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A", "LABEL"]; t;) {
        if (e.includes(t.tagName)) return !0;
        t = t.parentElement
    }
    return !1
}

function postchat_checkSystemType() {
    var t;
    "undefined" != typeof postChatConfig && postChatConfig.systemType ? tianliGPTSystem = postChatConfig.systemType : (t = document.querySelector('meta[name="generator"]')) && t.content.includes("Discuz") && (tianliGPTSystem = "Discuz")
}

function removeExistingPostChatDiv() {
    var t = document.querySelector("#postChat_button");
    t && t.parentElement.removeChild(t)
}
window.tianliGPT || (window.tianliGPT = new TianliGPT), document.addEventListener("DOMContentLoaded", function() {
        postchat_checkSystemType(), postChat_load(), window.tianliGPT.checkURLAndRun()
    }), document.addEventListener("pjax:complete", function() {
        postchat_checkSystemType(), postChat_load(), window.tianliGPT.checkURLAndRun()
    }), document.addEventListener("pjax:success", function() {
        tianliGPTIsRunning = !1
    }), console.log("\n %c 洪墨PostChat 为你构建先进的网站 %c https://ai.tianli0.top/ \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;"), window.addEventListener("popstate", function() {
        postchat_checkSystemType(), postChat_load(), window.tianliGPT.checkURLAndRun()
    }), window.addEventListener("hashchange", function() {
        postchat_checkSystemType(), postChat_load(), window.tianliGPT.checkURLAndRun()
    }),
    function(i) {
        var t = i.pushState;
        i.pushState = function(e) {
            if ("function" == typeof i.onpushstate)
                if ("undefined" != typeof pjaxLoading) {
                    let t = () => {
                        pjaxLoading ? setTimeout(t, 50) : i.onpushstate({
                            state: e
                        })
                    };
                    t()
                } else setTimeout(function() {
                    i.onpushstate({
                        state: e
                    })
                }, 200);
            return t.apply(i, arguments)
        }
    }(window.history), window.history.onpushstate = function(t) {
        postchat_checkSystemType(), postChat_load(), window.tianliGPT.checkURLAndRun()
    };
var postChatUser = {
    sendMessageToIframe: function(t, e) {
        var i;
        "magic" !== postChat_mode && (i = document.getElementById("postChat_iframeContainer")) && i.querySelector("iframe") && i.querySelector("iframe").contentWindow.postMessage({
            method: t,
            ...e
        }, "*")
    },
    setPostChatTheme: function(t) {
        postChat_theme = t, document.documentElement.setAttribute("data-theme", t), this.sendMessageToIframe("setTheme", {
            theme: t
        }), postchat_updateThemeStyles(t)
    },
    setPostChatInput: function(t) {
        postChat_initialContent = t, "magic" === postChat_mode ? this.showPostChatMagic().then(() => {
            window.postChatMagic.magicUserInput(t, "chat", !1)
        }) : (postChatUser.setPostChatTag("chat"), this.showPostChatIframe())
    },
    sendChatMsg: function(t) {
        postChat_initialChatMsg = t, "magic" === postChat_mode ? this.showPostChatMagic().then(() => {
            window.postChatMagic.magicUserInput(t, "chat", !0)
        }) : (postChatUser.setPostChatTag("chat"), this.sendMessageToIframe("chatMsg", {
            chatMsg: t
        }))
    },
    setSearchInput: function(t) {
        postChat_initialSearchContent = t, "magic" === postChat_mode ? this.showPostChatMagic().then(() => {
            window.postChatMagic.magicUserInput(t, "search", !1)
        }) : (postChatUser.setPostChatTag("search"), this.sendMessageToIframe("searchInput", {
            searchInput: t
        }))
    },
    sendSearchMsg: function(t) {
        postChat_initialSearchMsg = t, "magic" === postChat_mode ? this.showPostChatMagic().then(() => {
            window.postChatMagic.magicUserInput(t, "search", !0)
        }) : (postChatUser.setPostChatTag("search"), this.sendMessageToIframe("searchMsg", {
            searchMsg: t
        }))
    },
    setPostChatTag: function(t) {
        postChat_initialTag = t, "magic" === postChat_mode ? postChatUser.showPostChatMagic().then(() => {
            window.postChatMagic.switchMode(t)
        }) : (this.openPostChatContainer(), this.sendMessageToIframe("toggleIframe", {
            type: t
        }))
    },
    openPostChatContainer: function() {
        "magic" === postChat_mode ? this.showPostChatMagic() : this.showPostChatIframe()
    },
    closePostChatContainer: function() {
        "magic" === postChat_mode ? window.postChatMagic && window.postChatMagic.hide() : window.postChatIframe && window.postChatIframe.hide()
    },
    loadPostChatMagicResources: function() {
        var t, e = "https://ai.tianli0.top/static/public/mode/postChatMagic/",
            i = e + "postChatMagic.min.css",
            i = (document.querySelector(`link[href="${i}"]`) || ((t = document.createElement("link")).rel = "stylesheet", t.href = i, document.head.appendChild(t)), e + "postChatMagic.min.js");
        return document.querySelector(`script[src="${i}"]`) || ((t = document.createElement("script")).src = i, document.head.appendChild(t)), Promise.resolve()
    },
    loadPostChatIframeResources: function() {
        var t, e = "https://ai.tianli0.top/static/public/mode/postChatiframe/postChatiframe.min.js";
        return document.querySelector(`script[src="${e}"]`) || ((t = document.createElement("script")).src = e, document.head.appendChild(t)), Promise.resolve()
    },
    showPostChatMagic: function() {
        return this.loadPostChatMagicResources().then(() => window.postChatMagic.show())
    },
    showPostChatIframe: function() {
        return this.loadPostChatIframeResources().then(() => window.postChatIframe.show())
    }
};