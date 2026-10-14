const PARTNER_NAME = "Smile Keeper";
  const PARTNER_MESSAGE = "Wishing a spectacular birthday to the one who makes everything feel a little less scary just by existing. Love you to bits, and don't count the candles, just enjoy the glow!🎁 .Cheers to another year of keeping each other sane in this crazy world! 🍻";
  const SIGNATURE = "— always yours";
  const GIFT_NOTES = [
    "My absolute favorite distraction from reality.🎮❤️",
    "You're the gravity that keeps me grounded.🪐✨",
    "The only person I'll ever share my fries with.🍟🔐",
    "Proof that the universe actually got something right.🌌👑",
    "You are the best kind of chaos.🌪️💞",
    "My favorite reason to smile at my phone.📲☀️",
    "The permanent VIP guest in my life.🎟️🥂",
    "You make the heavy stuff feel so light.🎈🧘",
    "P.S. I love you more than sleep (and that's a lot).🛌💤",
    "The missing piece I didn't even know was lost.🧩❤️"
  ];

  if (PARTNER_NAME) document.getElementById('headline').textContent = `Happy Birthday, ${PARTNER_NAME}!`;
  document.getElementById('messageText').textContent = PARTNER_MESSAGE;
  document.getElementById('signature').textContent = SIGNATURE;

  function goTo(id){
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  const sky = document.getElementById('sky');
  for(let i=0;i<60;i++){
    const s = document.createElement('div');
    s.className='star';
    const size = 1 + Math.random()*2;
    s.style.width = size+'px'; s.style.height = size+'px';
    s.style.left = Math.random()*100+'vw';
    s.style.top = Math.random()*70+'vh';
    s.style.animationDuration = (2+Math.random()*3)+'s';
    s.style.animationDelay = (Math.random()*3)+'s';
    sky.appendChild(s);
  }
  for(let i=0;i<3;i++){
    const c = document.createElement('div');
    c.className='cloud';
    c.style.width = (120+Math.random()*100)+'px';
    c.style.height = (30+Math.random()*20)+'px';
    c.style.top = (10+Math.random()*30)+'vh';
    c.style.animationDuration = (40+Math.random()*30)+'s';
    c.style.animationDelay = (-Math.random()*40)+'s';
    sky.appendChild(c);
  }
  document.addEventListener('mousemove', (e)=>{
    const x = (e.clientX/window.innerWidth - .5) * 14;
    const y = (e.clientY/window.innerHeight - .5) * 14;
    document.getElementById('moon').style.transform = `translate(${x}px, ${y}px)`;
  });

  const envelopeWrap = document.getElementById('envelopeWrap');
  const envelope = document.getElementById('envelope');
  let opened = false;
  function openEnvelope(){
    if(opened) return;
    opened = true;
    envelope.classList.add('open');
    document.querySelector('#scene-intro .hint').style.opacity = 0;
    setTimeout(()=> goTo('scene-cake'), 1400);
  }
  envelopeWrap.addEventListener('click', openEnvelope);
  envelopeWrap.addEventListener('keypress', e=>{ if(e.key==='Enter'||e.key===' ') openEnvelope(); });

  const NUM_CANDLES = 5;
  const candlesEl = document.getElementById('candles');
  for(let i=0;i<NUM_CANDLES;i++){
    const c = document.createElement('div'); c.className='candle';
    const flame = document.createElement('div'); flame.className='flame';
    const smoke = document.createElement('div'); smoke.className='smoke';
    c.appendChild(flame); c.appendChild(smoke);
    candlesEl.appendChild(c);
  }
  const sprinkleColors = ['#ffc857','#c9a8f5','#fff','#ff9db3'];
  const tier2 = document.getElementById('tier2');
  for(let i=0;i<16;i++){
    const sp = document.createElement('div'); sp.className='sprinkle';
    sp.style.left = (5+Math.random()*90)+'%';
    sp.style.top = (10+Math.random()*70)+'%';
    sp.style.background = sprinkleColors[i%sprinkleColors.length];
    sp.style.transform = `rotate(${Math.random()*360}deg)`;
    tier2.appendChild(sp);
  }

  let blown = false;
  function blowCandles(){
    if(blown) return;
    blown = true;
    document.getElementById('cakeHint').style.opacity = 0;
    document.querySelectorAll('.flame').forEach((f,i)=>{
      setTimeout(()=>{ f.classList.add('out'); f.nextElementSibling.classList.add('show'); }, i*120);
    });
    setTimeout(()=> goTo('scene-wish'), NUM_CANDLES*120 + 900);
  }
  const cakeWrap = document.getElementById('cakeWrap');
  cakeWrap.addEventListener('click', blowCandles);
  cakeWrap.addEventListener('keypress', e=>{ if(e.key==='Enter'||e.key===' ') blowCandles(); });

  function sendWish(){
    const val = document.getElementById('wishInput').value.trim();
    if(val){
      const lantern = document.createElement('div');
      lantern.className = 'lantern';
      lantern.textContent = '✨' + val;
      document.body.appendChild(lantern);
      requestAnimationFrame(()=>{
        lantern.style.transform = 'translate(-50%, -100vh)';
        lantern.style.opacity = '0';
      });
      const stars = document.querySelectorAll('.star');
      if(stars.length){ stars[Math.floor(Math.random()*stars.length)].classList.add('lit'); }
      setTimeout(()=> lantern.remove(), 3200);
    }
    setTimeout(()=>{ goTo('scene-final'); launchConfetti(); launchBalloons(); }, val ? 900 : 0);
  }
  document.getElementById('sendWish').addEventListener('click', sendWish);
  document.getElementById('skipWish').addEventListener('click', ()=>{ goTo('scene-final'); launchConfetti(); launchBalloons(); });
  document.getElementById('wishInput').addEventListener('keypress', e=>{ if(e.key==='Enter') sendWish(); });

  let giftIndex = 0;
  const giftNote = document.getElementById('giftNote');
  document.getElementById('gift').addEventListener('click', ()=>{
    giftNote.textContent = GIFT_NOTES[giftIndex % GIFT_NOTES.length];
    giftNote.classList.add('show');
    giftIndex++;
  });

  const confettiColors = ['#ff6f9c','#ffc857','#c9a8f5','#ffffff','#ff8a3d'];
  function launchConfetti(){
    for(let i=0;i<80;i++){
      setTimeout(()=>{
        const el = document.createElement('div'); el.className='confetti';
        el.style.left = Math.random()*100+'vw';
        el.style.background = confettiColors[Math.floor(Math.random()*confettiColors.length)];
        el.style.borderRadius = Math.random()>.5 ? '50%' : '2px';
        const duration = 2.5+Math.random()*2;
        const rotate = Math.random()*720-360;
        el.style.transition = `transform ${duration}s cubic-bezier(.2,.6,.4,1), opacity ${duration}s ease`;
        document.body.appendChild(el);
        requestAnimationFrame(()=>{
          el.style.transform = `translateY(${window.innerHeight+60}px) translateX(${Math.random()*200-100}px) rotate(${rotate}deg)`;
          el.style.opacity = '0.15';
        });
        setTimeout(()=> el.remove(), duration*1000+200);
      }, i*15);
    }
  }

  const balloonColors = ['#ff6f9c','#ffc857','#c9a8f5','#ff8a3d','#ffa8c5'];
  function launchBalloons(){
    for(let i=0;i<7;i++){
      setTimeout(()=>{
        const b = document.createElement('div'); b.className='balloon';
        b.style.left = (10+Math.random()*80)+'vw';
        b.style.background = `radial-gradient(circle at 35% 30%, #fff8, ${balloonColors[i%balloonColors.length]})`;
        const duration = 6+Math.random()*3;
        b.style.transition = `transform ${duration}s ease-in, opacity ${duration}s ease-in`;
        document.body.appendChild(b);
        requestAnimationFrame(()=>{
          b.style.transform = `translateY(-115vh) translateX(${Math.random()*80-40}px)`;
          b.style.opacity = '0';
        });
        setTimeout(()=> b.remove(), duration*1000+200);
      }, i*180);
    }
  }