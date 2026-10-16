(function () {
var params = new URLSearchParams(location.search);
var key = (params.get("p") || "aiml").toLowerCase();
var P = (window.SKILLSOFT_PROGRAMS || {})[key];
if (!P) return;
var q = function (s) { return document.querySelector(s); };
var ch = q('#catalog-h');
if (ch) ch.textContent = "Browse " + P.short + " by semester";
var cgrid = q('#catalog-grid');
if (cgrid) {
cgrid.innerHTML = "";
P.courses.forEach(function (c) {
var gold = c[1] === "Additional";
var a = document.createElement("article");
a.className = "course-card bg-white border border-line rounded-2xl p-5 flex flex-col gap-2.5 hover:border-teal hover:shadow-md transition";
a.setAttribute("data-semester", c[2]);
a.setAttribute("data-title", (c[0] + " " + c[5]).toLowerCase());
a.innerHTML = '<h3 class="font-heading text-navy text-base leading-snug">' + c[0] + '</h3><div class="flex gap-2 flex-wrap text-xs text-muted"><span class="inline-block ' + (gold ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-teal-bg text-teal-dark border-teal-light/40') + ' font-bold px-3 py-1 rounded-full border">' + c[1] + '</span><span>' + c[2] + '</span><span>' + c[3] + '</span><span>' + c[4] + '</span></div>' + (c[5] ? '<div><span class="font-mono bg-navy text-white text-xs px-2.5 py-1 rounded-md">' + c[5] + '</span></div>' : '') + '<div class="flex gap-2.5 mt-1.5 flex-wrap"><button type="button" class="button button-teal !px-3.5 !py-2 !text-[0.85rem] !rounded-lg" data-apply="' + c[0] + (c[5] ? " (" + c[5] + ")" : "") + '">Apply Now</button></div>';
cgrid.appendChild(a);
});
}
var dh = q('#pe3-h');
if (dh) dh.textContent = P.detailTitle + " (" + P.short + ")";
var dnote = q('#pe3 p');
if (dnote) dnote.textContent = P.detailNote;
var tbody = q('#pe3 tbody');
if (tbody) {
tbody.innerHTML = "";
P.detailRows.forEach(function (r) {
var tr = document.createElement("tr");
tr.className = "border-t border-line";
tr.innerHTML = '<td class="px-4 py-3">' + r[0] + '</td><td class="px-4 py-3">' + r[1] + '</td><td class="px-4 py-3">' + r[2] + '</td><td class="px-4 py-3"><code>' + r[3] + '</code></td>';
tbody.appendChild(tr);
});
}
var fh2 = q('#final-h');
if (fh2) fh2.textContent = "Choose Your " + P.short + " Skillsoft Subject";
})();
