var postChatInjectConfig = window.postChatConfig || {},
    postChat_containerVisible = !1,
    postChat_theme = "light",
    postChat_initialContent = "",
    postChat_initialSearchContent = "",
    postChat_initialTag = "",
    postChat_initialChatMsg = "",
    postChat_initialSearchMsg = "",
    postChat_mode = postChatInjectConfig.userMode || "magic",
    tianliGPTIcon = `
<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <g id="PostChatIcon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M178.32746,38.1674592 C184.94624,39.2722717 189.41798,45.5415286 188.31476,52.1698631 L183.3824,81.8051213 L195.5,81.8051213 C217.86734,81.8051213 236,99.9639566 236,122.363585 L236,176.441536 C236,198.841165 217.86734,217 195.5,217 L60.5,217 C38.13266,217 20,198.841165 20,176.441536 L20,122.363585 C20,99.9639566 38.13266,81.8051213 60.5,81.8051213 L72.6176,81.8051213 L67.68524,52.1698631 C66.58202,45.5415286 71.05376,39.2722717 77.67254,38.1674592 C84.29132,37.0626466 90.55154,41.5408418 91.65476,48.1691763 L97.05476,80.6159472 C97.12118,81.0139609 97.16708,81.4108931 97.19408,81.8051213 L158.80592,81.8051213 C158.83292,81.4103523 158.87882,81.0139609 158.94524,80.6159472 L164.34524,48.1691763 C165.44846,41.5408418 171.70868,37.0626466 178.32746,38.1674592 Z M195.5,106.140199 L60.5,106.140199 C51.55274,106.140199 44.3,113.403409 44.3,122.363585 L44.3,176.441536 C44.3,185.401712 51.55274,192.664922 60.5,192.664922 L195.5,192.664922 C204.44726,192.664922 211.7,185.401712 211.7,176.441536 L211.7,122.363585 C211.7,113.403409 204.44726,106.140199 195.5,106.140199 Z M170.929146,115.769966 C186.787773,115.769966 199.64373,129.17895 199.64373,145.719769 C199.64373,162.260589 186.787773,175.669572 170.929146,175.669572 L170.789001,175.669223 L170.940867,175.777818 L132.915994,175.085046 C139.992621,173.45318 144.71702,171.303355 147.089188,168.635574 C148.027583,167.580239 148.842657,166.599557 149.534408,165.693529 C144.982469,160.395555 142.214563,153.394806 142.214563,145.719769 C142.214563,129.17895 155.07052,115.769966 170.929146,115.769966 Z M85.07,126.419431 C91.78004,126.419431 97.22,131.867244 97.22,138.58697 L97.22,149.402561 C97.22,156.122287 91.78004,161.5701 85.07,161.5701 C78.35996,161.5701 72.92,156.122287 72.92,149.402561 L72.92,138.58697 C72.92,131.867244 78.35996,126.419431 85.07,126.419431 Z M170.93,132.247891 C165.94688,132.247891 161.906967,136.293635 161.906967,141.283948 L161.906967,149.315999 C161.906967,154.306313 165.94688,158.352057 170.93,158.352057 C175.91312,158.352057 179.953033,154.306313 179.953033,149.315999 L179.953033,141.283948 C179.953033,136.293635 175.91312,132.247891 170.93,132.247891 Z" id="PostChatIconPath" fill="#FFFFFF" fill-rule="nonzero"></path>
    </g>
</svg>
`,
    tianliGPTSystem = "";
async function postChat_extractWebContent() {
    var t = window.postChatConfig || {},
        o = (o = t.blackDom || []).concat([".aplayer", ".showhide", ".locked", "style", "script", ".authi"]),
        t = document.querySelectorAll("h1, h2, h3, h4, h5, p");
    let e = Array.from(t).filter(e => !o.some(t => e.closest(t))).map(t => t.innerText).join(" ").replace(/https?:\/\/\S+/g, "").replace(/\n+/g, " ");
    e = e.replace(/(\s*\n\s*)+/g, " ").trim();
    t = document.title;
    return {
        content: (e = 2e3 < (e = t + " " + e.trim()).length ? e.substring(0, 1e3) + "..." + e.substring(e.length - 1e3) : e).trim(),
        title: t,
        url: window.location.href
    }
}

function postchat_checkURLCanLoadSummary() {
    if ("undefined" == typeof tianliGPT_postURL) postchat_customBlackList();
    else {
        var t = document.querySelector('meta[name="generator"]');
        if (t && t.content.includes("WordPress")) {
            t = new URL(window.location.href);
            if (t.searchParams.has("preview") && "true" === t.searchParams.get("preview")) return void console.log("当前页面为WordPress预览模式，不执行网站上传功能。")
        }
        try {
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
            t.test(e) ? postchat_customBlackList() : console.log(`洪墨摘要AI：当前 URL '${e}' 不符合规则 '${tianliGPT_postURL}'，所以我决定不执行摘要功能。`)
        } catch (t) {
            console.error("洪墨摘要AI：我没有看懂你编写的自定义链接规则，所以我决定不执行摘要功能", t)
        }
    }
}

function postchat_customBlackList() {
    "undefined" != typeof tianliGPT_blacklist && tianliGPT_blacklist ? fetch(tianliGPT_blacklist).then(t => t.json()).then(t => {
        t = t.blackurls;
        let e = window.location.href;
        t.some(t => {
            return new RegExp("^" + t.replace(/\*/g, ".*") + "$").test(e)
        }) ? console.log("URL在黑名单中，不执行摘要") : getPostChatContent()
    }).catch(t => {
        console.error("请求黑名单失败。Error fetching blacklist:", t), getPostChatContent()
    }) : getPostChatContent()
}

function getVerifiedTitle() {
    let e = ["#thread_subject", ".view_tit", "h1", ".postlist_top h2"];
    var t = (document.title || "").trim(),
        o = function() {
            for (var t of e) {
                t = document.querySelector(t);
                if (t && t.innerText.trim()) return t.innerText.trim()
            }
            return null
        }();
    return o && t.startsWith(o) ? o.trim() : t
}
async function getPostChatContent() {
    var o = window.postChatConfig || {};
    if (!1 === (void 0 === o.upLoadWeb || o.upLoadWeb)) return o = "PostChat的uploadWeb参数为false，所以无法提交网页，也无法为此网页生成摘要，请检查配置项目。如果本身无需生成摘要，请忽略此提示。", console.log(o), o;
    if ("Discuz" === tianliGPTSystem) {
        o = document.querySelector(tianliGPT_postSelector);
        if (o)
            if (o.querySelector('a[href*="plugin.php?id=duceapp_vip&ac=pay&referer=forum.php"]')) return
    }
    console.log("执行提取网页内容");
    let n, a, i;
    if ("undefined" != typeof tianliGPT_postSelector && "" !== tianliGPT_postSelector) {
        o = document.querySelector(tianliGPT_postSelector);
        if (!o) return void console.warn(`Element with selector ${tianliGPT_postSelector} not found.`);
        {
            var e, s, o = o.cloneNode(!0),
                r = (o.querySelectorAll(".showhide, .locked, script, style, .authi, .post-TianliGPT, .code, .terminal_frame").forEach(t => t.remove()), o.querySelectorAll("p, strong, font, ul, li, ol, span, td")),
                o = o.querySelectorAll("h1, h2, h3, h4, h5");
            n = "", a = getVerifiedTitle(), i = window.location.href;
            for (e of o) n += e.innerText + " ";
            for (s of r) {
                var c = Array.from(s.childNodes).filter(t => t.nodeType === Node.TEXT_NODE).map(t => t.textContent).join("").trim();
                n += c.replace(/https?:\/\/[^\s]+/g, "") + " "
            }
            n = n.replace(/(\s*\n\s*)+/g, " ").trim(), n = a + " " + n.trim();
            let t = 1e3;
            "undefined" != typeof tianliGPT_wordLimit && (t = tianliGPT_wordLimit), n = n.slice(0, t)
        }
    } else({
        content: n,
        title: a,
        url: i
    } = await postChat_extractWebContent());
    o = JSON.parse(localStorage.getItem("PostChat_pageContents")) || [];
    if (o.some(t => t.url === i || t.content === n)) console.log("Content already stored. Skipping.");
    else {
        100 <= o.length && o.shift(), o.push({
            content: n,
            title: a,
            url: i
        }), localStorage.setItem("PostChat_pageContents", JSON.stringify(o));
        let t = "";
        r = document.querySelector("script[data-postChat_key]");
        if (r) t = r.getAttribute("data-postChat_key");
        else {
            if ("undefined" == typeof tianliGPT_key) return o = "没有获取到key，代码可能没有安装正确。如果你需要在tianli_gpt文件引用前定义tianliGPT_key变量。详细请查看文档。", tianliGPT.aiShowAnimation(o), o;
            t = tianliGPT_key
        }
        if ("Discuz" === tianliGPTSystem) {
            r = new URL(i), o = "undefined" != typeof tianliGPT_discuz_tid ? tianliGPT_discuz_tid : "undefined" != typeof tid ? tid : null;
            if (!o) return h = "Discuz中需要携带tid参数，变量名为：tianliGPT_discuz_tid，例如：let tianliGPT_discuz_tid = '2'，当tid不存在的页面可以设为0。不允许不包含tid参数的Discuz请求。建议使用Discuz插件实现。", tianliGPT.aiShowAnimation(h), h;
            i = r.origin + "/forum.php?mod=viewthread&tid=" + o
        }
        if ("ZBlog" === tianliGPTSystem) {
            var h = new URL(i),
                r = "undefined" != typeof tianliGPT_zblog_id ? tianliGPT_zblog_id : null;
            if (!r) return o = "ZBlog中需要携带id参数，变量名为：tianliGPT_zblog_id，例如：let tianliGPT_zblog_id = '3'。不允许不包含id参数的ZBlog请求。", tianliGPT.aiShowAnimation(o), o;
            i = h.origin + "/?id=" + r
        }
        let e = "zh-CN";
        document.documentElement.lang && (e = document.documentElement.lang);
        o = JSON.stringify({
            content: n,
            key: t,
            url: i,
            title: document.title,
            system: tianliGPTSystem,
            language: e
        });
        console.log("本次提交的内容为：" + n);
        try {
            await fetch("https://summary.tianli0.top/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: o
            });
            console.log("Content stored and POST request made.")
        } catch (t) {
            console.error("Error making POST request:", t)
        }
    }
}

function postChat_load() {
    removeExistingPostChatDiv(), postChat_addStyles();
    var t, e = window.postChatConfig || {},
        o = e.backgroundColor || "#3e86f6",
        n = e.bottom || "16px",
        a = e.left || "16px",
        i = parseInt(a, 10) < 0,
        s = i ? Math.abs(parseInt(a, 10)) + "px" : void 0,
        r = e.fill || "#FFFFFF",
        c = e.width || "44px",
        h = e.height || c,
        e = void 0 === e.addButton || null === e.addButton || e.addButton;
    "magic" === postChat_mode ? postChatUser.loadPostChatMagicResources() : "iframe" === postChat_mode && postChatUser.loadPostChatIframeResources(), e && (t = document.createElement("button"), (e = document.createElement("div")).id = "postChat_button_icon", e.innerHTML = tianliGPTIcon, t.appendChild(e), e.querySelector("path").setAttribute("fill", r), t.id = "postChat_button", t.style.padding = "10px", t.style.width = c, t.style.height = h, t.style.backgroundColor = o, t.style.border = "none", t.style.borderRadius = "12px", t.style.cursor = "pointer", t.style.position = "fixed", t.style.bottom = n, i ? t.style.right = s : t.style.left = a, t.style.display = "flex", t.style.alignItems = "center", t.style.justifyContent = "center", t.style.zIndex = "2147483000", t.style.transition = "0.3s", t.addEventListener("mouseenter", () => {
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
        o = document.getElementById("close-button"),
        n = document.querySelector("#postchat_resizer");
    e && ("light" === t ? (e.style.border = "1px solid #e3e8f7", e.style.background = "#f7f9fe") : (e.style.border = "1px solid #3d3d3f", e.style.background = "#18171d")), o && (o.style.fill = "light" === t ? "#363636" : "#F7F7FA"), n && (n.style.background = "light" === t ? "#3978f44f" : "#b5b5b996")
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
document.addEventListener("DOMContentLoaded", function() {
        postchat_checkSystemType(), postChat_load(), postchat_checkURLCanLoadSummary()
    }), document.addEventListener("pjax:complete", function() {
        postchat_checkSystemType(), postChat_load(), postchat_checkURLCanLoadSummary()
    }), window.addEventListener("popstate", function() {
        postchat_checkSystemType(), postChat_load(), postchat_checkURLCanLoadSummary()
    }), window.addEventListener("hashchange", function() {
        postchat_checkSystemType(), postChat_load(), postchat_checkURLCanLoadSummary()
    }),
    function(o) {
        var t = o.pushState;
        o.pushState = function(e) {
            if ("function" == typeof o.onpushstate)
                if ("undefined" != typeof pjaxLoading) {
                    let t = () => {
                        pjaxLoading ? setTimeout(t, 50) : o.onpushstate({
                            state: e
                        })
                    };
                    t()
                } else setTimeout(function() {
                    o.onpushstate({
                        state: e
                    })
                }, 200);
            return t.apply(o, arguments)
        }
    }(window.history), window.history.onpushstate = function(t) {
        postchat_checkSystemType(), postChat_load(), getPostChatContent()
    }, console.log("\n %c 洪墨PostChat 为你构建先进的网站 %c https://ai.tianli0.top/ \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;");
var postChatUser = {
    sendMessageToIframe: function(t, e) {
        var o;
        "magic" !== postChat_mode && (o = document.getElementById("postChat_iframeContainer")) && o.querySelector("iframe") && o.querySelector("iframe").contentWindow.postMessage({
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
            o = e + "postChatMagic.min.css",
            o = (document.querySelector(`link[href="${o}"]`) || ((t = document.createElement("link")).rel = "stylesheet", t.href = o, document.head.appendChild(t)), e + "postChatMagic.min.js");
        return document.querySelector(`script[src="${o}"]`) || ((t = document.createElement("script")).src = o, document.head.appendChild(t)), Promise.resolve()
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