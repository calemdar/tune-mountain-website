(window["webpackJsonptune-mountain-client"] = window["webpackJsonptune-mountain-client"] || []).push([
[0], {"167"(e, t, n) {},
"171"(e, t, n) {
 e.exports = n(475);
},
"173"(e, t, n) {},
"174"(e, t, n) {},
"470"(e, t, n) {},
"474"(e, t, n) {},
"475"(e, t, n) {

n.r(t); const a = n(4),
o = n.n(a),
r = n(15),
i = n(16),
s = n(20),
c = n(19),
u = n(21),
l = (n(173), Object.freeze({"SMALL": "hud-button-small",
"LARGE": "hud-button-large",
"RETURN": "hud-button-return",
"ENTER": "hud-button-enter"})),
h = function(e) {
 const t = e.type,
n = e.text,
a = e.onClick,
r = Object.values(l).findIndex(e => e === t) !== -1 ? t : l.SMALL;

return o.a.createElement("button", {"className": "".concat(r, " hud-button"),
"onClick"(e) {
 e.buttonType = r, a(e);
}}, n);
}; h.defaultProps = {"type": l.SMALL,
"text": "Button Text Not Set",
"onClick"() {
 return console.error("Click handler not set for this button.");
}}; const f = h,
d = (n(174), function(e) {
 const t = e.hasLoggedIn,
n = e.onSongSelectRequest,
a = e.onLoginRequest,
r = e.onAboutPageRequest,
i = e.onLeaderboardsPageRequest,
s = o.a.createElement(f, {"text": "Spotify Login",
"onClick": a}),
c = o.a.createElement(f, {"text": "Select Song",
"onClick": n}),
u = o.a.createElement(f, {"text": "About",
"onClick": r}),
l = o.a.createElement(f, {"text": "Leaderboards",
"onClick": i}),
h = t ? c : s;

return o.a.createElement("div", {"className": "hud-main-menu-outer-container"}, o.a.createElement("div", {"className": "hud-main-menu-button-container"}, h, u, l));
}); d.defaultProps = {"hasLoggedIn": !1,
"onSongSelectRequest"() {
 throw new Error("No handler passed.");
},
"onLoginRequest"() {
 throw new Error("No handler passed.");
},
"onAboutPageRequest"() {
 throw new Error("No handler passed.");
},
"onLeaderboardsPageRequest"() {
 throw new Error("No handler passed.");
}}; const g = d,
m = n(170),
p = n(168),
v = n.n(p),
y = n(32),
S = n.n(y),
b = function(e, t) {
 const n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
o = {"source": "SpotifyService",
"state": e,
"body": t,
"message": n}; a ? a.next(o) : console.log(o);
},
k = function() {
 const e = new URLSearchParams(window.location.search);

return{"accessToken": e.get("accessToken"),
"refreshToken": e.get("refreshToken")};
},
E = function(e) {
 let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
n = k(),
a = null,
o = null; if(n.accessToken && n.refreshToken)a = n.accessToken, o = n.refreshToken, b("ACCESS_TOKEN_ACQUIRED", {"accessToken": a,
"refreshToken": o}, "Using tokens from query returned from server!", t), localStorage.setItem("spotify-refresh-token", n.refreshToken); else{
 b("LOADING_TOKEN_FROM_LOCAL_STORAGE", null, "Spotify tokens not found in query. Looking in local storage...", t); const r = localStorage.getItem("spotify-refresh-token"); r ? (b("REFRESHING_TOKEN", null, "Spotify refresh token found in localStorage. Fetching new accessToken from server...", t), e(r).then(e => {
 b("ACCESS_TOKEN_ACQUIRED", {"accessToken": e.accessToken,
"refreshToken": r}, "Spotify access token fetched.", t);
})) : b("NO_ACCESS_TOKEN", null, "No tokens found or refreshed. User must log in.", t);
}
},
N = "http://localhost:8080",
T = (function() {
 function e(t) {
 const n = this; Object(r.a)(this, e); const a = new S.a.BehaviorSubject(!1),
o = new S.a.BehaviorSubject(!1),
i = new S.a.BehaviorSubject(!1),
s = new S.a.ReplaySubject(); a.combineLatest(o, i, (e, t, n) => e && t && n).filter(e => e)
.subscribe(() => {
 b("LOGGED_IN", null, "User has logged in.", s), (function() {
 if(!n.player) {
 const e = window.Spotify.Player; n.player = new e({"name": "tune mountain",
"getOAuthToken"(e) {
 return e(n.accessToken);
},
"volume": 0.5}), n.player.connect(), n.player.addListener("ready", e => {
 const t = e.device_id; b("PLAYER_READY", "Spotify player ready to stream songs on ".concat(t), s);
});
}
}());
}), E(this.getNewAccessToken, s), s.filter(e => e.state === "ACCESS_TOKEN_ACQUIRED").subscribe(e => {
 const t = e.body,
a = t.accessToken,
o = t.refreshToken; n.accessToken = a, n.refreshToken = o, a && o ? i.next(!0) : i.next(!1);
}), this.name = t, this.player = null, this.spotifyStateNotifier = s, v()(["https://sdk.scdn.co/spotify-player.js"]).then(() => {
 a.next(!0);
}), window.onSpotifyWebPlaybackSDKReady = function() {
 return o.next(!0);
}, this.spotifyStateNotifier = s;
}

return Object(i.a)(e, [
{"key": "getNewAccessToken",
"value"() {
 const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
t = e || this.refreshToken;

return fetch("".concat(N, "/spotify-service/refresh-token/").concat(t)).then(e => e.json())
.catch(e => {
 console.error(e);
});
}}, {"key": "togglePlayback",
"value"() {
 const e = this; this.player.getCurrentState().then(t => {
 if(!t)return console.error("User is not playing music through the Web Playback SDK"), void e.play(); const n = t.track_window,
a = n.current_track,
o = Object(m.a)(n.next_tracks, 1)[0]; console.log("Currently Playing", a), console.log("Playing Next", o);
}), this.player.togglePlay();
}}, {"key": "play",
"value"(e) {
 if(!this.player)throw new Error("Player not initialized."); const t = function(e) {
 const t = e.spotifyURI,
n = e.playerInstance._options,
a = n.getOAuthToken,
o = n.id; a(e => {
 const n = {"method": "PUT",
"headers": {"Content-Type": "application/json",
"Authorization": "Bearer ".concat(e)}}; t && (n.body = JSON.stringify({"uris": [t]})), fetch("https://api.spotify.com/v1/me/player/play?device_id=".concat(o), n).then(() => console.log("Success: Playing uri: ".concat(t)));
});
}; t({"playerInstance": this.player,
"spotifyURI": e});
}}, {"key": "login",
"value"() {
 console.log("Redirecting to Spotify for authorization..."), window.location = "".concat(N, "/spotify-service/login");
}}, {"key": "search",
"value"() {
 for(var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n = "q=", a = 0; a < (arguments.length <= 1 ? 0 : arguments.length - 1); a++)n += a + 1 < 1 || arguments.length <= a + 1 ? void 0 : arguments[a + 1], n += a + 1 === (arguments.length <= 1 ? 0 : arguments.length - 1) ? "" : "&20"; const o = "type=track",
r = "limit=8",
i = "https://api.spotify.com/v1/search?".concat(n, "&").concat(o, "&")
.concat(r),
s = {"method": "GET",
"headers": {"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer ".concat(this.accessToken)}}; fetch(i, s).then(e => e.json())
.then(n => {
 b("TRACKS_FETCHED", n, "Choose any of these songs...", e.spotifyStateNotifier), t && t(n);
})
.catch(e => {
 throw new Error(e);
});
}}, {"key": "stateNotifier",
"get"() {
 return this.spotifyStateNotifier;
}}
]), e;
}()),
w = n(18),
O = n(47),
C = n.n(O),
L = (n(167), (function(e) {
 function t(e) {
 let n;

return Object(r.a)(this, t), (n = Object(s.a)(this, Object(c.a)(t).call(this, e))).state = {"value": e.defaultTextValue}, n.lastSubmittedValue = null, n.autoSearchTimer = null, n.handleChange = n.handleChange.bind(Object(w.a)(n)), n.handleSubmit = n.handleSubmit.bind(Object(w.a)(n)), n;
}

return Object(u.a)(t, e), Object(i.a)(t, [
{"key": "handleChange",
"value"(e) {
 this.autoSearchTimer && clearTimeout(this.autoSearchTimer), this.autoSearchTimer = setTimeout(this.handleSubmit, 1e3), this.setState({"value": e.target.value});
}}, {"key": "handleSubmit",
"value"() {
 this.state.value !== "" && this.state.value !== this.lastSubmittedValue && (this.props.searchSongsWithQuery(function(e) {
 const t = e.trim().match(/[A-Za-z0-1 ]/g),
n = [];
let a = "";

return t.forEach((e, o) => {
 e === " " ? (a.length > 0 && n.push(a), a = "") : (a += e, o + 1 === t.length && n.push(a));
}), n;
}(this.state.value)), this.lastSubmittedValue = this.state.value);
}}, {"key": "render",
"value"() {
 return o.a.createElement("div", {"className": "search-bar-container"}, o.a.createElement("input", {"className": "text-box",
"type": "text",
"value": this.state.value,
"onChange": this.handleChange}), o.a.createElement(f, {"type": l.ENTER,
"text": "Search",
"onClick": this.handleSubmit}));
}}
]), t;
}(a.Component))); L.defaultProps = {"searchSongsWithQuery"(e) {
 throw new Error("Unable to search song with query ".concat(e, ". No handler passed."));
},
"defaultTextValue": "Type the name of a song..."}; const R = L,
j = (n(470), function(e) {
 const t = e.name,
n = e.id,
a = e.imgURL,
r = e.artist,
i = e.handleClick;

return o.a.createElement("div", {"className": "song-li-container",
"onClick"() {
 return i({"name": t,
"id": n,
"imgURL": a,
"artist": r});
}}, o.a.createElement("img", {"className": "song-image",
"src": a}), o.a.createElement("div", {"className": "song-data-container"}, o.a.createElement("h1", {"className": "song-name"}, t), o.a.createElement("h2", {"className": "song-artist"}, (function(e) {
 let t = "";

return e.forEach((n, a) => {
 t += n, t += a + 1 === e.length ? "" : ", ";
}), t;
}(r)))));
}); j.defaultProps = {"name": "No Song Name Assigned",
"id": "No ID Passed",
"imgURL": "No image URL passed",
"artist": "No Artist",
"handleClick"() {
 throw new Error("No click handler passed");
}}; const A = j,
P = (function(e) {
 function t(e) {
 let n; if(Object(r.a)(this, t), n = Object(s.a)(this, Object(c.a)(t).call(this, e)), !e.spotifyService)throw new Error("HUDSearchMenu requires a reference to an instance of SpotifyService!");

return n.spotifyService = e.spotifyService, n.state = {"songList": [],
"hasSearched": !1}, n.filterReceivedJSON = n.filterReceivedJSON.bind(Object(w.a)(n)), n;
}

return Object(u.a)(t, e), Object(i.a)(t, [
{"key": "filterReceivedJSON",
"value"(e) {
 const t = C.a.get(e, "tracks.items"); if(!t)throw new Error("No items found in search response!"); const n = t.map(e => (function(e, t, n, a) {
 return{"name": t,
"artist": n,
"img": a,
"id": e};
}(e.id, e.name, C.a.get(e, "artists").map(e => e.name), C.a.get(e, "album.images")[0].url))); this.setState({"songList": n});
}}, {"key": "renderSongList",
"value"() {
 const e = this.state,
t = e.songList,
n = e.hasSearched;

return t.length === 0 && n ? o.a.createElement("h3", {"className": "message"}, "No songs found. Try something else.") : t.map(e => o.a.createElement(A, {"name": e.name,
"artist": e.artist,
"imgURL": e.img,
"id": e.id,
"key": e.id}));
}}, {"key": "render",
"value"() {
 const e = this;

return o.a.createElement("div", {"className": "hud-song-search-outer-container"}, o.a.createElement("div", {"className": "hud-song-search-inner-container"}, o.a.createElement(R, {"searchSongsWithQuery"(t) {
 return e.spotifyService.search(e.filterReceivedJSON, t);
}}), this.renderSongList()));
}}
]), t;
}(a.Component)); P.defaultProps = {"spotifyService": null,
"selectSong"(e) {
 console.error("Couldn't select song. No handler passed", e);
}}; const _ = P,
x = "Tune Mountain",
I = (function(e) {
 function t(e) {
 let n; Object(r.a)(this, t), n = Object(s.a)(this, Object(c.a)(t).call(this, e)); const a = new T("".concat(x, " Web Player"));

return a.stateNotifier.subscribe(e => console.log(e)), a.stateNotifier.filter(e => e.state === "LOGGED_IN").subscribe(() => n.setState({"hasLoggedIn": !0})), n.spotifyService = a, n.state = {"hasLoggedIn": !1,
"currentMenu": null}, n;
}

return Object(u.a)(t, e), Object(i.a)(t, [
{"key": "componentDidMount",
"value"() {}}, {"key": "render",
"value"() {
 const e = this;

return o.a.createElement("div", null, this.state.currentMenu || o.a.createElement(g, {"onLoginRequest": this.spotifyService.login,
"hasLoggedIn": this.state.hasLoggedIn,
"onSongSelectRequest"() {
 return e.setState({"currentMenu": o.a.createElement(_, {"spotifyService": e.spotifyService})});
}}));
}}
]), t;
}(a.Component)),
U = n(169),
q = n.n(U); n(474); q.a.render(o.a.createElement(I, null), document.getElementById("root"));
}}, [[171, 1, 2]]
]);
// # sourceMappingURL=main.cc8aba8a.chunk.js.map