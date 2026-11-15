// ═══ CURSEUR — L'AIGUILLE QUI COUD (bureau uniquement) ═══
// Une aiguille dorée remplace le pointeur et tire un fil de soie rouge qui s'estompe dans son sillage.
window.MVCursor = (function () {
    const fine = matchMedia('(pointer: fine)').matches;
    if (!fine || matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

    // calque du fil
    const cv = document.createElement('canvas');
    cv.id = 'mvThreadTrail';
    cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:2147483646;pointer-events:none';
    // l'aiguille
    const needle = document.createElement('div');
    needle.id = 'mvNeedle';
    needle.innerHTML = `
<svg width="46" height="46" viewBox="0 0 46 46" aria-hidden="true">
  <defs>
    <linearGradient id="mvN" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#8a6d1c"/><stop offset=".5" stop-color="#e9d9b0"/><stop offset="1" stop-color="#c9a24a"/>
    </linearGradient>
  </defs>
  <!-- pointe en haut-gauche (0,0) ; chas en bas-droite -->
  <path d="M1 1 L30 27" stroke="url(#mvN)" stroke-width="2.1" stroke-linecap="round"/>
  <path d="M1 1 L30 27" stroke="#fff" stroke-width=".6" stroke-linecap="round" opacity=".55"/>
  <ellipse cx="33.5" cy="30.5" rx="4.4" ry="2" transform="rotate(45 33.5 30.5)" fill="none" stroke="#d4af37" stroke-width="1.5"/>
</svg>`;
    needle.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;' +
        'width:46px;height:46px;margin:-2px 0 0 -2px;will-change:transform;' +
        'filter:drop-shadow(1px 2px 2px rgba(0,0,0,.45));transition:opacity .25s';
    addEventListener('DOMContentLoaded', add); if (document.body) add();
    function add() { if (!cv.isConnected) { document.body.appendChild(cv); document.body.appendChild(needle); } }

    const ctx = cv.getContext('2d');
    let dpr = 1, W = 0, H = 0;
    function size() { dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); addEventListener('resize', size);

    const LIFE = 620;                 // durée de vie du fil (ms)
    let pts = [], x = -100, y = -100, px = -100, py = -100, ang = 0, hot = false, raf = 0, last = 0;

    function onMove(e) {
        x = e.clientX; y = e.clientY;
        const d = Math.hypot(x - px, y - py);
        if (d > 1.6) { ang = Math.atan2(y - py, x - px); px = x; py = y; pts.push({ x, y, t: performance.now() }); }
        hot = !!(e.target.closest && e.target.closest('a,button,input,textarea,select,label,[role=button]'));
        if (!raf) raf = requestAnimationFrame(loop);
    }
    addEventListener('mousemove', onMove, { passive: true });
    addEventListener('mouseleave', () => { needle.style.opacity = 0; });
    addEventListener('mouseenter', () => { needle.style.opacity = 1; });

    function stroke(now) {
        // retire les points trop vieux
        while (pts.length && now - pts[0].t > LIFE) pts.shift();
        ctx.clearRect(0, 0, W, H);
        if (pts.length > 1) {
            for (let i = 1; i < pts.length; i++) {
                const a = pts[i - 1], b = pts[i];
                const age = (now - b.t) / LIFE;           // 0 = frais, 1 = disparu
                const k = 1 - age;
                ctx.lineCap = 'round';
                // halo
                ctx.strokeStyle = `rgba(161,31,51,${(0.10 * k).toFixed(3)})`;
                ctx.lineWidth = 6 * k + 1;
                ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                // fil
                ctx.strokeStyle = `rgba(${Math.round(150 + 60 * k)},${Math.round(22 + 20 * k)},${Math.round(40 + 25 * k)},${(0.9 * k).toFixed(3)})`;
                ctx.lineWidth = 2.1 * k + 0.5;
                ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
        }
    }
    function loop(now) {
        raf = 0;
        stroke(now);
        const deg = ang * 180 / Math.PI + 135;            // l'aiguille pointe dans le sens du mouvement
        const sc = hot ? 1.25 : 1;
        needle.style.transform = `translate(${x}px,${y}px) rotate(${deg.toFixed(1)}deg) scale(${sc})`;
        if (pts.length || hot) raf = requestAnimationFrame(loop);
    }
    // rendu continu tant qu'il reste du fil à estomper
    setInterval(() => { if (pts.length && !raf) raf = requestAnimationFrame(loop); }, 60);

    return { _seed(path) { const t = performance.now(); pts = path.map((p, i) => ({ x: p[0], y: p[1], t: t - (path.length - i) * 22 })); x = path[path.length - 1][0]; y = path[path.length - 1][1]; const p2 = path[path.length - 2] || path[0]; ang = Math.atan2(y - p2[1], x - p2[0]); stroke(performance.now()); const deg = ang * 180 / Math.PI + 135; needle.style.transform = `translate(${x}px,${y}px) rotate(${deg}deg)`; } };
})();
