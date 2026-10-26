from pathlib import Path
p=Path('public/connection-flow.js');s=p.read_text();s=s.replace('time=Math.min(duration,time+now-last)','time=(time+now-last)%(duration+1200)');s=s.replace('draw(time);if(time<duration)raf=requestAnimationFrame(frame);else{raf=0;state(\'ended\')}','draw(Math.min(time,duration));raf=requestAnimationFrame(frame)');s=s.replace("controls.hidden=false;draw(duration);state('idle');","controls.hidden=true;draw(duration);state('idle');")
s=s.replace(" root.querySelector('.connection-replay').addEventListener('click',()=>{time=0;started=true;draw(0);start()});",'')
s=s.replace("else if(!paused&&time<duration)start()","else if(!paused)start()")
s=s.replace("else if(visible&&!paused&&time<duration)start()","else if(visible&&!paused)start()")
s=s.replace(" reduced.addEventListener('change'", " window.addEventListener('veriburada:motion',e=>{paused=e.detail.paused;if(paused){suspend();state('paused')}else if(visible)start()});\n reduced.addEventListener('change'")
p.write_text(s)
p=Path('public/site.js');s=p.read_text();s=s.replace('  function safePlay(video) {','  function safePlay(video) {\n    if (document.body.classList.contains(\'motion-paused\')) return Promise.resolve();');s=s.replace("  const story = $('.story-video');", "  const story = $('.story-video');\n  story.loop = true; modalVideo.loop = true;");p.write_text(s)
