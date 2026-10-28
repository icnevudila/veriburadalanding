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
        item._len = r === '2' ? 243 : 285;
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

  // Snappy timing: total duration 7.5s, fast energetic flow
  M.create(root, {
    duration: 7500,
    staticAt: 6000,
    target: root.querySelector('.connection-stage'),
    render: t => {
      root.dataset.state = t < 1.8 ? 'inputs' : t < 3.8 ? 'connections' : t < 5.8 ? 'resolve' : 'ready';
      const out = 1 - M.smooth((t - 6.8) / 0.65);

      scenes.forEach(d => {
        [...d.svg.querySelectorAll('.flow-field-token')].forEach((token,i)=>{const a=M.ease((t-2.8-i*.24)/.45);token.style.opacity=String(.35+.65*a);token.querySelector('circle').setAttribute('fill',a>.8?'#eaf7f1':'#fff')});
        // Inputs activation
        d.inputs.forEach((n, i) => {
          n.style.opacity = .55 + .45 * M.ease((t - .2 - i * .45) / .4);
          n.style.transform = 'none';
          const rect = n.querySelector('rect');
          if (rect) rect.style.stroke = t > .2 + i * .45 && t < .9 + i * .45 ? '#77bd91' : '#d5e4da';
        });

        // 3D Pipes & Packets
        d.paths.forEach((item) => {
          const { path, glow, packet } = item;
          const r = parseInt(path.dataset.route, 10);
          // Route 0: 0.3s, Route 1: 0.75s, Route 2 (3rd arm): 1.5s
          const at = r === 0 ? 0.3 : r === 1 ? 0.75 : 1.5;
          const a = M.clamp((t - at) / 0.85);
          const len = getPipeLength(item);
          const offset = Math.max(0, len * (1 - a));

          path.style.strokeDasharray = `${len} ${len}`;
          path.style.strokeDashoffset = `${offset}`;
          path.style.opacity = a > 0 ? String(0.95 * out) : '0';

          if (glow) {
            glow.style.strokeDasharray = `${len} ${len}`;
            glow.style.strokeDashoffset = `${offset}`;
            glow.style.opacity = a > 0 ? String(0.85 * out) : '0';
          }

          if (packet) {
            const p = M.clamp((t - at) / 0.85);
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

        // Hub halo pulse
        if (d.halo) {
          d.halo.style.opacity = (t > 1.1 && t < 2.3) ? String(Math.sin((t - 1.1) / 1.2 * Math.PI) * 0.5) : '0';
          d.halo.style.transform = 'none';
        }

        // Output card and rows
        d.outputs.forEach(n => {
          n.style.transform = 'none';
          n.style.opacity = .2 + .8 * M.ease((t - 2.1) / .55) * out;
        });
        d.rows.forEach(n => {
          n.style.transform = 'none';
          n.style.opacity = (.15 + .85 * M.ease((t - 2.3) / .5)) * out;
        });
        if (d.success) {
          d.success.style.opacity = M.ease((t - 2.7) / .5) * out;
        }
      });
    }
  });
})();
