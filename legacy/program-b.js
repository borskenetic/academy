(function () {
var params = new URLSearchParams(location.search);
var key = (params.get("p") || "aiml").toLowerCase();
var P = (window.SKILLSOFT_PROGRAMS || {})[key];
if (!P) return;
var q = function (s) { return document.querySelector(s); };
var order = ["PE-1","PE-2","PE-3","PE-4","PE-5","PE-6","Additional"];
var desc = { "PE-1": "Courses mapped to PE1 subjects.", "PE-2": "Courses mapped to PE-2 subjects.", "PE-3": "Core elective block including development, languages and testing options.", "PE-4": "Advanced electives such as security and cloud.", "PE-5": "Senior-year electives aligned to industry skills.", "PE-6": "Final elective group for advanced specialization.", "Additional": "Subjects based on current industry trends and real-world skills." };
var grid = q('#subjects .grid');
var wrap = q('#subjects');
if (grid && wrap) {
grid.innerHTML = "";
order.forEach(function (g) {
var list = P.courses.filter(function (c) { return c[1] === g; });
if (!list.length) return;
var sem = list[0][2];
var badge = g === "Additional" ? "Optional Learning" : list.length + (list.length > 1 ? " courses" : " course");
var el = document.createElement("article");
el.className = "subject-card bg-white border border-line rounded-2xl p-6 flex flex-col gap-2.5 hover:border-teal hover:shadow-lg transition";
el.innerHTML = '<h3 class="font-heading text-navy text-lg">' + (g === "Additional" ? "Additional Learning" : "Professional Elective - " + g.split("-")[1]) + '</h3><p class="text-[0.92rem] text-muted flex-1">' + desc[g] + '</p><div class="flex gap-2 flex-wrap text-xs"><span class="inline-block bg-teal-bg text-teal-dark font-bold px-3 py-1 rounded-full border border-teal-light/40">' + sem + '</span><span class="inline-block bg-amber-50 text-amber-800 font-bold px-3 py-1 rounded-full border border-amber-200">' + badge + '</span></div><a class="text-teal font-bold text-sm hover:underline" href="#catalog" data-goto-filter="' + sem + '">View ' + g + ' courses</a>';
grid.appendChild(el);
});
var h2 = wrap.querySelector("h2");
if (h2) h2.textContent = "Subjects for " + P.short;
}
var fh = q('#featured-h');
if (fh) fh.textContent = "Featured " + P.short + " courses";
var fgrid = q('#featured-grid');
if (fgrid) {
fgrid.innerHTML = "";
P.featured.forEach(function (f) {
var parts = f.split("|");
var d = document.createElement("div");
d.className = "featured-item bg-navy text-teal-bg rounded-[10px] px-4 py-3.5 text-sm font-semibold border border-navyLight";
d.textContent = parts[0];
var s = document.createElement("span");
s.className = "block font-normal text-xs text-slate-400 mt-1";
s.textContent = parts[1] || "";
d.appendChild(s);
fgrid.appendChild(d);
});
}
})();
