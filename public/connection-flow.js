/* Fixed-field connection composition; 3D pipe routing with energetic data packets. */
(() => {
  const root = document.querySelector('.connection-section');
  const M = window.VBMotion;
  if (!root || !M) return;

  function getPipeLength(item) {
    if (!item._len || item._len <= 0) {
      try {
        const l = item.path.getTotalLength();
        if (l && l > 0) item._len = l;
      } catch (e) {}
    }
    if (!item._len || item._len <= 0) {
      const r = item.path.getAttribute('data-route');
      const isPhone = item.path.closest('.flow-phone') !== null;
      if (isPhone) {
        item._len = r === '2' ? 100 : 95;
      } else {
        item._len = r === '2' ? 253 : 285;
      }
    }
    return item._len;
  }

  const scenes = [...root.querySelectorAll('.flow-scene')].map(svg => ({
    svg,
    inputs: [...svg.querySelectorAll('.flow-input')],
    outputs: [...svg.querySelectorAll('.flow-output')],
    rows: [...svg.querySelectorAll('.flow-result-row')],
    paths: [...svg.querySelectorAll('.flow-trace')].map(path => {
      const r = path.dataset.route;
      return {
        path,
        glow: svg.querySelector(`.flow-trace-glow[data-route="${r}"]`),
        packet: svg.querySelector(`.flow-packet[data-route="${r}"]`)
      };
    }),
    halo: svg.querySelector('.flow-halo'),
    success: svg.querySelector('.flow-success')
  }));

  const controls = root.querySelector('.connection-controls');
  if (controls) controls.hidden = true;

  M.create(root, {
    duration: 11500,
    staticAt: 9200,
    target: root.querySelector('.connection-stage'),
    render: t => {
      root.dataset.state = t < 3.2 ? 'inputs' : t < 6.5 ? 'connections' : t < 8.8 ? 'resolve' : 'ready';
      const out = 1 - M.smooth((t - 10.6) / 0.8);

      scenes.forEach(d => {
        // Inputs activation
        d.inputs.forEach((n, i) => {
          n.style.opacity = .55 + .45 * M.ease((t - .6 - i * .95) / .6);
          n.style.transform = 'none';
          const rect = n.querySelector('rect');
          if (rect) rect.style.stroke = t > .6 + i * .95 && t < 1.55 + i * .95 ? '#77bd91' : '#d5e4da';
        });

        // 3D Pipes & Packets
        d.paths.forEach((item, i) => {
          const { path, glow, packet } = item;
          // Route 0: 0.85s, Route 1: 1.80s, Route 2: 3.4s (Hub output flows to list)
          const at = i < 2 ? 0.85 + i * 0.95 : 3.4;
          const a = M.clamp((t - at) / 1.35);
          const len = getPipeLength(item);
          const offset = Math.max(0, len * (1 - a));

          path.style.strokeDasharray = `${len} ${len}`;
          path.style.strokeDashoffset = `${offset}`;
          path.style.opacity = a > 0 ? String(0.95 * out) : '0.15';

          if (glow) {
            glow.style.strokeDasharray = `${len} ${len}`;
            glow.style.strokeDashoffset = `${offset}`;
            glow.style.opacity = a > 0 ? String(0.75 * out) : '0';
          }

          if (packet) {
            const p = M.clamp((t - at - 0.05) / 1.35);
            if (p > 0.01 && p < 0.99) {
              const pt = path.getPointAtLength(len * p);
              if (pt && !isNaN(pt.x) && !isNaN(pt.y)) {
                packet.setAttribute('cx', pt.x);
                packet.setAttribute('cy', pt.y);
                packet.style.opacity = String(out);
              }
            } else {
              packet.style.opacity = '0';
            }
          }
        });

        // Hub pulse
        if (d.halo) {
          d.halo.style.opacity = (t > 2.3 && t < 4.2) ? String(Math.sin((t - 2.3) / 1.9 * Math.PI) * 0.45) : '0';
          d.halo.style.transform = 'none';
        }

        // Output card and rows
        d.outputs.forEach(n => {
          n.style.transform = 'none';
          n.style.opacity = .2 + .8 * M.ease((t - 4.6) / .9) * out;
        });
        d.rows.forEach(n => {
          n.style.transform = 'none';
          n.style.opacity = (.15 + .85 * M.ease((t - 4.8) / .8)) * out;
        });
        if (d.success) {
          d.success.style.opacity = M.ease((t - 5.5) / .7) * out;
        }
      });
    }
  });
})();
