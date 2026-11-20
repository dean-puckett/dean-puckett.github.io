/*
  Hero background: particles following potential flow past cylinders.
  u = U(1 - R^2 (x^2 - y^2) / r^4),  v = -U (2 R^2 x y) / r^4
  One cylinder follows the pointer, one sits still. Respects reduced motion.
*/
(function () {
  function startFlow(canvas) {
    var ctx = canvas.getContext("2d");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var W = 0, H = 0, dpr = 1, particles = [], raf = 0, running = true;
    var U = 1;
    var fixed = { x: 0, y: 0, r: 0 };
    var cursor = { x: 0, y: 0, tx: 0, ty: 0, r: 0, active: false };
    var color = "45,90,57", alpha = 0.55;

    function readColor() {
      var cs = getComputedStyle(document.documentElement);
      color = (cs.getPropertyValue("--flow") || "45,90,57").trim();
      alpha = parseFloat(cs.getPropertyValue("--flow-alpha")) || 0.55;
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var small = W < 700;
      fixed.r = small ? 110 : Math.min(130, H * 0.16);
      fixed.x = small ? W + 40 : W * 0.76;
      fixed.y = small ? H * 0.42 : H * 0.48;
      cursor.r = small ? 0 : 70;
      if (!cursor.active) { cursor.x = cursor.tx = W + 400; cursor.y = cursor.ty = H / 2; }
      var n = Math.round(Math.min(1400, (W * H) / 1000));
      particles = [];
      for (var i = 0; i < n; i++) particles.push(spawn(true));
      ctx.clearRect(0, 0, W, H);
      var note = canvas.parentElement.querySelector(".flow-note");
      if (note && !small) { note.style.left = fixed.x + "px"; note.style.top = (fixed.y + fixed.r + 18) + "px"; }
    }

    function ring() {
      if (W < 700) return;
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "rgba(" + color + "," + (alpha * 0.9).toFixed(3) + ")";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(fixed.x, fixed.y, fixed.r - 2, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }

    function spawn(anywhere) {
      return { x: anywhere ? Math.random() * W : -10 - Math.random() * 60, y: Math.random() * H, life: 200 + Math.random() * 400 };
    }

    function addCyl(c, x, y, out) {
      var dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy, R2 = c.r * c.r;
      if (r2 < R2) { out.inside = true; return; }
      var r4 = r2 * r2;
      out.u -= U * R2 * (dx * dx - dy * dy) / r4;
      out.v -= U * 2 * R2 * dx * dy / r4;
    }

    function vel(x, y) {
      var o = { u: U, v: 0, inside: false };
      addCyl(fixed, x, y, o);
      if (cursor.r) addCyl(cursor, x, y, o);
      return o;
    }

    function step() {
      cursor.x += (cursor.tx - cursor.x) * 0.08;
      cursor.y += (cursor.ty - cursor.y) * 0.08;

      // fade old trails without painting a background color
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.035)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";

      var speed = 1.25;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var f = vel(p.x, p.y);
        if (f.inside) { particles[i] = spawn(false); continue; }
        var nx = p.x + f.u * speed, ny = p.y + f.v * speed;
        var mag = Math.sqrt(f.u * f.u + f.v * f.v);
        var a = Math.min(1, 0.25 + (mag - 0.6) * 0.7) * alpha;
        ctx.strokeStyle = "rgba(" + color + "," + a.toFixed(3) + ")";
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke();
        p.x = nx; p.y = ny; p.life--;
        if (p.x > W + 10 || p.y < -20 || p.y > H + 20 || p.life < 0) particles[i] = spawn(p.life < 0);
      }
      ring();
    }

    function drawStatic() {
      // Reduced motion: draw streamlines once.
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;
      var lines = Math.round(H / 14);
      for (var k = 0; k < lines; k++) {
        var x = 0, y = (k + 0.5) * (H / lines);
        ctx.strokeStyle = "rgba(" + color + "," + (alpha * 0.45).toFixed(3) + ")";
        ctx.beginPath(); ctx.moveTo(x, y);
        for (var s = 0; s < 1400 && x < W; s++) {
          var f = vel(x, y); if (f.inside) break;
          x += f.u * 1.5; y += f.v * 1.5; ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ring();
    }

    function loop() {
      if (running) step();
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", function () { resize(); if (reduce) drawStatic(); });
    canvas.parentElement.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var r = canvas.getBoundingClientRect();
      cursor.tx = e.clientX - r.left; cursor.ty = e.clientY - r.top;
      if (!cursor.active) { cursor.x = cursor.tx; cursor.y = cursor.ty; cursor.active = true; }
    });
    canvas.parentElement.addEventListener("pointerleave", function () {
      cursor.active = false; cursor.tx = W + 400;
    });

    // Pause when off screen or tab hidden.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { running = es[0].isIntersecting; }).observe(canvas);
    }
    document.addEventListener("visibilitychange", function () { running = !document.hidden; });

    readColor();
    resize();
    if (reduce) { drawStatic(); }
    else { loop(); }

    return {
      refresh: function () { readColor(); if (reduce) drawStatic(); else ctx.clearRect(0, 0, W, H); },
      stop: function () { cancelAnimationFrame(raf); }
    };
  }
  window.startFlow = startFlow;
})();
