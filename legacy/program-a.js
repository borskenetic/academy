(function () {
var params = new URLSearchParams(location.search);
var key = (params.get("p") || "aiml").toLowerCase();
var P = (window.SKILLSOFT_PROGRAMS || {})[key];
if (!P) { document.body.innerHTML = '<div style="padding:3rem;text-align:center;font-family:sans-serif">Unknown program. <a style="color:#007D79" href="index.html#learning-areas">Back to streams</a></div>'; return; }
document.title = "Skillsoft Courses for " + P.name + " | JNTUH Education Foundation";
var q = function (s) { return document.querySelector(s); };
var qa = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
var crumbLast = q('[aria-label="Breadcrumb"] span:last-child');
if (crumbLast) crumbLast.textContent = P.name;
var eyebrow = q('section[aria-labelledby="cse-title"] span');
if (eyebrow) eyebrow.textContent = P.short + " - Skillsoft";
var h1 = q('#cse-title');
if (h1) h1.textContent = "Skillsoft Courses for " + P.name;
var lede = q('section[aria-labelledby="cse-title"] p');
if (lede) lede.textContent = "Explore Skillsoft-powered professional electives and additional learning courses mapped for " + P.short + " students: " + P.tagline;
var groups = {};
P.courses.forEach(function (c) { groups[c[1]] = 1; });
var peCount = Object.keys(groups).filter(function (g) { return g.indexOf("PE") === 0; }).length;
var sems = {};
P.courses.forEach(function (c) { if (c[2] !== "Any Semester") sems[c[2]] = 1; });
var semKeys = Object.keys(sems).sort();
var semLabel = semKeys.length ? semKeys.join(" / ").replace(/Year /g, "Y") : "Any Semester";
var statVals = qa('[aria-label="Quick highlights"] .font-extrabold');
if (statVals[0]) statVals[0].textContent = String(peCount);
if (statVals[2]) statVals[2].textContent = semLabel.length > 30 ? "Year 3 & Year 4" : semLabel;
})();
