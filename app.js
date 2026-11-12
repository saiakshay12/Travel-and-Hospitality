/* STACKLY static frontend — vanilla JavaScript, no framework */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const img = {
  hero:"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=88",
  lisbon:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=85",
  cascais:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
  sintra:"./assets/sintra-palace.jpg",
  casa:"https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
  patio:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  mare:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
  room:"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
  terrace:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  coast:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
};
const stays = [
 {id:"casa",name:"Casa do Miradouro",place:"Graca, Lisbon",rating:"4.8",reviews:128,price:180,total:780,tag:"Best for two",desc:"A 16-room boutique stay in Graca with a quiet courtyard and rooftop breakfast.",image:img.casa,room:"Courtyard Double",amenities:["Breakfast terrace","Courtyard","Wi-Fi","Queen bed","Air conditioning","Luggage storage"]},
 {id:"patio",name:"Pátio das Flores",place:"Estrela, Lisbon",rating:"4.7",reviews:94,price:155,total:680,tag:"Garden hideaway",desc:"An intimate garden guesthouse in Estrela, close to cafes and the tram.",image:img.terrace,room:"Garden Room",amenities:["Garden patio","Breakfast","Wi-Fi","King bed","Cafe nearby","Luggage storage"]},
 {id:"mare",name:"Mare House Cascais",place:"Cascais, Portugal",rating:"4.6",reviews:86,price:195,total:840,tag:"Coastal escape",desc:"A relaxed coastal base with balcony rooms a short walk from the sand.",image:img.mare,room:"Ocean Balcony",amenities:["Sea view","Balcony","Wi-Fi","Breakfast","Pool","Beach nearby"]}
];
let state={route:"home",user:JSON.parse(sessionStorage.getItem("stacklyDemoUser")||"null"),saved:JSON.parse(localStorage.getItem("stacklySaved")||"[]"),selected:"casa",room:"Courtyard Double",filters:{breakfast:false,flex:false,budget:220},sort:"recommended",booking:null};
const main=$("#mainContent");
const fmt=n=>"$"+n;
function toast(message,type=""){const el=document.createElement("div");el.className="toast "+type;el.textContent=message;$("#toastStack").append(el);setTimeout(()=>el.remove(),3300)}
function go(route){
  if(route==="login"){
    state.user=null;
    sessionStorage.removeItem("stacklyDemoUser");
    localStorage.removeItem("stacklyUser"); // clear profiles left by older demo builds
  }
  const overlay=$("#pageTransition");
  if(overlay){overlay.classList.add("covering");setTimeout(()=>{state.route=route;location.hash=route;render();window.scrollTo({top:0,behavior:"instant"});$("#mobileMenu")?.classList.remove("open");overlay.classList.remove("covering")},260)}
  else{state.route=route;location.hash=route;render();window.scrollTo({top:0,behavior:"smooth"})}
}
function stayCard(s){return `<article class="stay-card reveal"><div class="stay-image"><img loading="lazy" src="${s.image}" alt="${s.name}"><span class="tag">${s.tag}</span><button class="save-btn ${state.saved.includes(s.id)?"saved":""}" data-save="${s.id}" aria-label="Save ${s.name}">${state.saved.includes(s.id)?"♥":"♡"}</button></div><div class="stay-info"><div class="stay-meta"><span>${s.place}</span><span>★ ${s.rating} · ${s.reviews} reviews</span></div><h3>${s.name}</h3><p>${s.desc}</p><div class="stay-bottom"><div class="price">${fmt(s.price)} <small>/ night · ${fmt(s.total)} total</small></div><a href="#property" data-property="${s.id}">Explore details ↗</a></div></div></article>`}
function searchBar(){return `<form class="search-panel" id="searchForm"><div class="search-field"><label>Where</label><input name="where" value="Lisbon, Portugal" aria-label="Destination"></div><div class="search-field"><label>Dates</label><input name="dates" value="12–16 Jun 2027" aria-label="Travel dates"></div><div class="search-field"><label>Travelers</label><select name="guests"><option>2 adults · 1 room</option><option>1 adult · 1 room</option><option>3 adults · 1 room</option><option>4 adults · 2 rooms</option></select></div><button class="btn btn-dark" type="submit">Search stays <span>↗</span></button></form>`}
function footerSpacer(){}
function home(){return `<section class="hero"><div class="hero-copy"><div class="eyebrow">THE ART OF GETTING AWAY</div><h1 class="display-title">Find your<br>own kind of<br><em>somewhere.</em></h1><p class="body-copy">Thoughtfully chosen stays and local experiences, without the planning overwhelm.</p><div class="hero-actions"><button class="btn btn-dark" data-route="search">Find your next escape <span>↗</span></button><a class="text-link" href="#approach">Discover Stackly</a></div><div class="hero-note">MADE FOR THE WAY YOU WANT TO GET AWAY</div></div><div class="hero-visual"><div class="hero-photo"><img src="${img.hero}" alt="Italian coastal village overlooking the sea"></div><div class="hero-caption"><span class="caption-dot"></span> THE PORTUGUESE COAST <b>·</b> 2027</div><div class="hero-index">01 <span>/</span> 03</div><div class="hero-stamp"><small>Take the scenic route</small>Stay a little<br>longer.</div></div></section>
<section class="container search-dock" style="margin-top:-5px">${searchBar()}</section>
<div class="editorial-marquee" aria-label="Stackly travel philosophy"><div class="marquee-track"><span>GO A LITTLE FURTHER</span><i>✳</i><span>STAY A LITTLE LONGER</span><i>✳</i><span>MAKE ROOM FOR SOMEWHERE</span><i>✳</i><span>GO A LITTLE FURTHER</span><i>✳</i><span>STAY A LITTLE LONGER</span><i>✳</i><span>MAKE ROOM FOR SOMEWHERE</span><i>✳</i></div></div>
<section class="section container" id="explore"><div class="section-heading reveal"><div><div class="eyebrow">DESTINATION DISCOVERY</div><h2>Find your kind of somewhere.</h2></div><p>Three places, three different moods. Start with the feeling and let the details follow.</p></div><div class="dest-grid stagger"><article class="destination-card reveal" style="--i:0"><img src="${img.lisbon}" alt="Lisbon rooftops"><div class="destination-content"><div class="eyebrow">START HERE</div><h3>Lisbon</h3><p>Tiled streets, neighborhood cafes and late dinners beside the Tagus.</p><a href="#search" data-route="search">Explore details ↗</a></div></article><article class="destination-card reveal" style="--i:1"><img src="${img.cascais}" alt="Cascais coast"><div class="destination-content"><div class="eyebrow">SLOW DOWN</div><h3>Cascais</h3><p>Slow beach mornings and seafood lunches, a train ride from the city.</p><a href="#search" data-route="search">Explore details ↗</a></div></article><article class="destination-card reveal" style="--i:2"><img src="${img.sintra}" alt="Sintra landscape"><div class="destination-content"><div class="eyebrow">WANDER FURTHER</div><h3>Sintra</h3><p>Woodland paths, hilltop palaces and cooler afternoons in the hills.</p><a href="#search" data-route="search">Explore details ↗</a></div></article></div></section>
<section class="section container compact" id="stays"><div class="section-heading reveal"><div><div class="eyebrow">RECOMMENDED FOR YOUR DATES</div><h2>Small stays. Big reasons to go.</h2></div><a class="text-link" href="#search" data-route="search">See all available stays ↗</a></div><div class="stay-grid stagger">${stays.map((s,i)=>stayCard(s).replace('class="stay-card reveal"','class="stay-card reveal" style="--i:'+i+'"')).join("")}</div></section>
<section class="band"><div class="container band-grid"><div class="band-item reveal"><b>Find your rhythm</b><p>Choose a city, dates and the things you love doing together.</p></div><div class="band-item reveal"><b>Pick a thoughtful stay</b><p>Compare clear totals, room details and accessibility information.</p></div><div class="band-item reveal"><b>Make it your own</b><p>Book securely, then build a light-touch plan with local suggestions.</p></div></div></section>
<section class="section container" id="approach"><div class="section-heading reveal"><div><div class="eyebrow">GOOD TRIPS START WITH PEACE OF MIND</div><h2>A simpler way to get away.</h2></div><p>Enough structure to feel looked after. Enough freedom to make the trip yours.</p></div><div class="quote-grid"><article class="quote-card reveal"><blockquote>“Enough planned, enough room to roam.”</blockquote><strong>Maya & Tom · London · May 2027</strong><p>The clear room details made choosing easy. Our coast day was the highlight.</p></article><article class="quote-card reveal"><blockquote>“No surprises at checkout.”</blockquote><strong>Elena & Luis · Madrid · April 2027</strong><p>The total was clear from the start, and the arrival guide saved us a lot of searching.</p></article></div></section>
<section class="section container compact"><div class="section-heading reveal"><div><div class="eyebrow">FREQUENTLY ASKED QUESTIONS</div><h2>A few things you might be wondering.</h2></div></div><div class="faq-list"><div class="faq-item"><button class="faq-question">Can we change our dates? <span>＋</span></button><div class="faq-answer"><p>Flexible rates can be canceled up to the deadline shown on the stay. New dates depend on availability.</p></div></div><div class="faq-item"><button class="faq-question">How do we check accessibility? <span>＋</span></button><div class="faq-answer"><p>Each property lists access details. Contact us before booking if you need an elevator or a step-free room.</p></div></div><div class="faq-item"><button class="faq-question">Are experiences included? <span>＋</span></button><div class="faq-answer"><p>Your room and listed inclusions are covered. Experiences are optional and priced separately.</p></div></div></div></section>
<section class="container section compact"><div class="cta-panel reveal"><div><div class="eyebrow" style="color:#b8dccc">YOUR NEXT LONG WEEKEND STARTS HERE</div><h2>Leave a little space<br>for discovery.</h2><p>Start with your dates. Leave the rest open to possibility.</p></div><button class="btn btn-light" data-route="search">Explore Lisbon stays ↗</button></div></section>`}
function searchPage(){let list=[...stays];if(state.filters.budget)list=list.filter(s=>s.price<=state.filters.budget);if(state.filters.breakfast)list=list.filter(s=>s.id!=="mare");if(state.sort==="price")list.sort((a,b)=>a.price-b.price);if(state.sort==="rating")list.sort((a,b)=>b.rating-a.rating);return `<div class="container"><section class="page-hero"><div class="eyebrow">YOUR SEARCH / AVAILABLE OPTIONS</div><h1>A good base for<br>your Lisbon days.</h1><p>18 stays available · 12–16 Jun · 2 adults</p></section><div class="search-summary">${searchBar()}</div><div class="section-heading"><div><div class="eyebrow">FIND THE RIGHT FIT</div><h2 style="font-size:30px">Choose what matters.</h2></div></div><div class="search-layout"><aside class="filter-panel"><h3>Filter your results</h3><div class="filter-group"><h4>Nightly budget · <span id="budgetLabel">${fmt(state.filters.budget)}</span></h4><input id="budgetRange" type="range" min="100" max="250" step="5" value="${state.filters.budget}"></div><div class="filter-group"><h4>What matters</h4><label><input type="checkbox" id="breakfastFilter" ${state.filters.breakfast?"checked":""}> Breakfast included</label><label><input type="checkbox" id="flexFilter" ${state.filters.flex?"checked":""}> Free cancellation</label></div><div class="filter-group"><h4>Neighborhood</h4><label><input type="checkbox" checked> Graca</label><label><input type="checkbox"> Estrela</label><label><input type="checkbox"> Baixa</label></div><div class="filter-actions"><button class="btn btn-dark" id="applyFilters">Apply filters</button><button class="btn btn-outline" id="clearFilters">Clear</button></div></aside><div><div class="results-top"><span>${list.length} stays shown · Prices reflect selected dates</span><select id="sortSelect"><option value="recommended">Recommended</option><option value="price" ${state.sort==="price"?"selected":""}>Price: low to high</option><option value="rating" ${state.sort==="rating"?"selected":""}>Top rated</option></select></div><div class="result-list">${list.length?list.map(s=>`<article class="result-card reveal"><img loading="lazy" src="${s.image}" alt="${s.name}"><div class="result-copy"><div class="eyebrow">${s.tag} / AVAILABLE FOR YOUR DATES</div><h3>${s.name}</h3><p>${s.desc}</p><div class="result-foot"><div class="result-price">${fmt(s.price)} / night · ${fmt(s.total)} total<small>★ ${s.rating} / 5 · ${s.reviews} reviews · ${s.room}</small></div><button class="btn btn-dark" data-property="${s.id}">View stay & rooms ↗</button></div></div></article>`).join(""):`<div class="empty-state">No stays match those filters. Try widening your budget.</div>`}</div></div></div></div>`}
function propertyPage(){const s=stays.find(x=>x.id===state.selected)||stays[0];return `<div class="container"><section class="detail-hero"><div class="eyebrow">LISBON & THE PORTUGUESE COAST / SELECTED STAY</div><h1>${s.name}</h1><p class="body-copy">${s.desc}</p><p class="eyebrow" style="letter-spacing:.08em">★ ${s.rating} / 5 · ${s.reviews} TRAVELER REVIEWS · ${s.place.toUpperCase()}</p></section><div class="gallery"><img src="${s.image}" alt="${s.name}"><img src="${img.room}" alt="Boutique hotel room"><img src="${img.terrace}" alt="Hotel terrace"></div><div class="detail-layout"><div class="detail-main"><h2>A small stay with everything you need.</h2><p>${s.desc} A considered base for slow mornings, neighborhood discoveries and unhurried evenings.</p><h3>Room comforts</h3><div class="amenities">${s.amenities.map(a=>`<div class="amenity">✦ &nbsp;${a}</div>`).join("")}</div><h2>Choose your room & rate.</h2><div class="room-option ${state.room==="Courtyard Double"?"selected":""}" data-room="Courtyard Double"><b>◉ Courtyard Double / Flexible</b><small>1 queen · Courtyard view · Breakfast for two · Free cancellation until 5 Jun</small></div><div class="room-option ${state.room==="Rooftop Double"?"selected":""}" data-room="Rooftop Double"><b>○ Rooftop Double / Flexible</b><small>1 queen · Small balcony · Breakfast for two · Upgrade +$30/night</small></div><h2 style="margin-top:38px">A rhythm for your stay.</h2><p>Breakfast on the terrace, 07:30–10:30. Ask the host for a neighborhood route or a train-day suggestion. Return whenever you like; guests receive their own entry code.</p><h2 style="margin-top:38px">Good to know before you book.</h2><p><b>Arrival & departure</b><br>Check in 15:00–22:00. Check out by 11:00.</p><p><b>Cancellation</b><br>Full refund before 5 Jun 2027 at 18:00 Lisbon time. After that, the total is non-refundable.</p><p><b>House guidelines</b><br>No smoking or parties. Quiet hours 22:00–08:00.</p></div><aside class="booking-card"><div class="eyebrow">YOUR BOOKING SUMMARY</div><h3>${s.name}</h3><p style="font-size:11px;color:#7d8984">${state.room} · 1 queen bed</p><div class="big-price">${fmt(s.price+(state.room==="Rooftop Double"?30:0))}<small> / night</small></div><div class="summary-line"><span>12–16 Jun 2027</span><b>4 nights</b></div><div class="summary-line"><span>2 adults · 1 room</span><b>${fmt(s.total+(state.room==="Rooftop Double"?120:0))}</b></div><div class="summary-line"><span>City tax & booking fee</span><b>$60</b></div><div class="summary-total"><span>Total</span><span>${fmt(s.total+(state.room==="Rooftop Double"?120:0))}</span></div><button class="btn btn-dark" style="width:100%;margin-top:20px" data-route="checkout">Reserve this stay ↗</button><p style="font-size:9px;text-align:center;color:#8a9690">No payment taken on this screen.</p></aside></div></div>`}
function authPage(signup=false){return `<div class="auth-wrap"><div class="auth-visual"><img src="${img.coast}" alt="A quiet ocean escape"><div class="auth-visual-copy"><div class="eyebrow">A DIFFERENT WAY TO GET AWAY</div><h2>Find a little<br>more <em>somewhere.</em></h2><p>Your next memorable stay is closer than you think. Save your favourites and keep every trip in one place.</p></div></div><div class="auth-panel"><form class="auth-form" id="authForm" novalidate><img class="brand-mini" src="./assets/stackly-logo.jpg" alt="Stackly"><div class="eyebrow">${signup?"YOUR NEXT CHAPTER STARTS HERE":"WELCOME BACK TO STACKLY"}</div><h1>${signup?"Create your account.":"Good to see you again."}</h1><p>${signup?"Join Stackly and keep your travel plans beautifully together.":"Log in to revisit your saved stays and upcoming journeys."}</p>${signup?`<div class="form-row"><div class="form-field"><label>First name</label><input name="first" placeholder="Alex" required></div><div class="form-field"><label>Last name</label><input name="last" placeholder="Morgan" required></div></div>`:""}<div class="form-field"><label>Email address</label><input name="email" type="email" placeholder="you@example.com" required></div><div class="form-field"><label>Password</label><div class="input-wrap"><input name="password" type="password" id="passwordField" placeholder="${signup?"Create a password":"Enter your password"}" ${signup?'minlength="8"':''} required><button type="button" class="show-pass" id="showPass">SHOW</button></div>${signup?'<div class="password-strength"><span id="strengthBar"></span></div>':""}</div>${signup?`<div class="form-extras"><label><input type="checkbox" required name="terms"> I agree to the Terms & Privacy Policy</label></div>`:`<div class="form-extras"><label><input type="checkbox" name="remember"> Remember me</label><a href="#" id="forgotPassword">Forgot password?</a></div>`}<button class="btn btn-dark" type="submit">${signup?"Create account":"Log in"} <span>↗</span></button><div class="auth-divider">OR CONTINUE WITH</div><button type="button" class="social-btn" id="googleDemo">◎ &nbsp; Continue with Google</button><div class="auth-switch">${signup?"Already have an account?":"New to Stackly?"} <a href="#${signup?"login":"signup"}" data-route="${signup?"login":"signup"}">${signup?"Log in":"Create an account"}</a></div><p class="auth-terms">By continuing, you agree to Stackly's Terms of Service and Privacy Policy. Demo authentication stores a local profile only.</p></form></div></div>`}
function checkoutPage(){const s=stays.find(x=>x.id===state.selected)||stays[0];if(!state.user)return `<div class="container confirmation"><div class="eyebrow">ONE LAST STEP</div><h1>Log in to continue.</h1><p>Your guest details and booking summary will be ready when you return.</p><button class="btn btn-dark" data-route="login">Log in / Create account ↗</button></div>`;return `<div class="container"><section class="checkout-head"><div class="eyebrow">1 CHOOSE / 2 YOUR DETAILS / 3 CONFIRM</div><h1 class="page-hero" style="padding:10px 0"><span style="font:600 clamp(35px,5vw,55px) var(--display);letter-spacing:-.06em">Make your Lisbon stay official.</span></h1><p class="body-copy">Review your dates, add your details and confirm your room for two.</p><div class="steps"><span class="step">01 / YOUR STAY</span><span class="step active">02 / YOUR DETAILS</span><span class="step">03 / CONFIRMATION</span></div></section><div class="checkout-layout"><form class="checkout-form" id="checkoutForm"><section class="checkout-section"><h3>01 / Guest details</h3><div class="form-row"><div class="form-field"><label>Lead guest</label><input name="lead" value="${state.user.name||"Alex Morgan"}" required></div><div class="form-field"><label>Second guest</label><input name="second" placeholder="Jamie Morgan"></div></div></section><section class="checkout-section"><h3>02 / Contact details</h3><div class="form-row"><div class="form-field"><label>Email address</label><input name="email" type="email" value="${state.user.email}" required></div><div class="form-field"><label>Mobile number</label><input name="phone" placeholder="+44 7700 900123" required></div></div><p style="font-size:10px;color:#87928c">We will send the confirmation and arrival details here. No marketing without your permission.</p></section><section class="checkout-section"><h3>03 / Arrival preferences</h3><div class="form-field"><label>Estimated arrival</label><select name="arrival"><option>17:00</option><option>15:00</option><option>18:00</option><option>20:00</option><option>21:00</option></select></div><div class="form-field"><label>Requests (optional)</label><textarea name="requests" placeholder="Quiet room, if available"></textarea></div></section><section class="checkout-section"><h3>04 / Payment · demonstration only</h3><p style="font-size:11px;color:#8a9690">This is a visual prototype. Do not enter real card details. No transaction will be processed.</p><div class="form-field"><label>Name on card (demo)</label><input placeholder="Alex Morgan"></div><div class="form-row"><div class="form-field"><label>Card number (demo)</label><input placeholder="4242 4242 4242 4242"></div><div class="form-field"><label>Expiry / Security (demo)</label><input placeholder="12/29 · 123"></div></div></section><section class="checkout-section"><h3>05 / Review & agree</h3><p style="font-size:11px;color:#75827c">Full refund before 5 Jun 2027 at 18:00 Lisbon time. After that, the total is non-refundable.</p><div class="form-extras"><label><input type="checkbox" name="agree" required> I have read the cancellation policy, booking terms and privacy notice.</label></div></section><button class="btn btn-dark" type="submit" style="width:100%">Confirm demo booking · ${fmt(s.total+(state.room==="Rooftop Double"?120:0))} ↗</button><p style="font-size:9px;color:#9aa49e;text-align:center">Demo booking only; no charge will be made.</p></form><aside class="summary-card"><img src="${s.image}" alt="${s.name}"><div class="eyebrow">YOUR BOOKING SUMMARY</div><h3>${s.name}</h3><p style="font-size:10px;color:#83908a">${state.room} · 1 queen bed</p><div class="summary-line"><span>12–16 Jun 2027</span><b>4 nights</b></div><div class="summary-line"><span>2 adults · 1 room</span><b>${fmt(s.total)}</b></div><div class="summary-line"><span>City tax</span><b>$24</b></div><div class="summary-line"><span>Booking fee</span><b>$36</b></div><div class="summary-total"><span>Total</span><span>${fmt(s.total+(state.room==="Rooftop Double"?120:0))}</span></div></aside></div></div>`}
function confirmationPage(){let b=state.booking||JSON.parse(localStorage.getItem("stacklyBooking")||"null");if(!b)return `<div class="container confirmation"><div class="eyebrow">YOUR JOURNEY STARTS HERE</div><h1>No confirmed trips yet.</h1><p>When you book a stay, your trip details will live here.</p><button class="btn btn-dark" data-route="search">Explore stays ↗</button></div>`;return `<div class="container confirmation"><div class="confirm-icon">✓</div><div class="eyebrow">BOOKING CONFIRMED</div><h1>Lisbon is on the calendar.</h1><p>Your room for two is confirmed. This is a demo confirmation saved in this browser.</p><div class="confirmation-card"><div class="eyebrow">YOUR TRIP, AT A GLANCE</div><div class="confirmation-grid"><div><small>Confirmation reference</small><b>${b.ref}</b></div><div><small>Travel dates</small><b>12–16 Jun 2027</b></div><div><small>Booked for</small><b>${b.name}</b></div><div><small>Stay</small><b>${b.stay} · ${b.room}</b></div><div><small>Guests</small><b>2 adults · 1 room · 4 nights</b></div><div><small>Demo total</small><b>${fmt(b.total)}</b></div></div></div><button class="btn btn-dark" data-route="trips">View my trips ↗</button> <button class="btn btn-outline" onclick="window.print()">Print confirmation</button></div>`}
function tripsPage(){let b=state.booking||JSON.parse(localStorage.getItem("stacklyBooking")||"null");return `<div class="container"><section class="page-hero"><div class="eyebrow">YOUR STACKLY JOURNAL</div><h1>Trips worth<br>looking forward to.</h1><p>Saved stays and travel plans, all in one place.</p></section>${!state.user?`<div class="empty-state"><h3>Log in to see your trips.</h3><button class="btn btn-dark" data-route="login">Log in ↗</button></div>`:b?`<div class="trip-card"><img src="${stays.find(s=>s.name===b.stay)?.image||img.casa}" alt="${b.stay}"><div><div class="eyebrow">UPCOMING · BOOKING CONFIRMED</div><h3>${b.stay}</h3><p>12–16 Jun 2027 · 2 adults · 4 nights</p><p>Confirmation: <b>${b.ref}</b></p><button class="btn btn-outline" data-route="confirmation">View trip details ↗</button></div></div>`:`<div class="empty-state"><h3>Your next escape is waiting.</h3><p>Save a stay or start exploring to see it here.</p><button class="btn btn-dark" data-route="search">Explore stays ↗</button></div>`}<section class="section compact"><div class="section-heading"><div><div class="eyebrow">YOUR SAVED PLACES</div><h2>Keep the good ones close.</h2></div></div><div class="stay-grid">${stays.filter(s=>state.saved.includes(s.id)).map(stayCard).join("")||'<p style="color:#85918b">No saved stays yet. Tap the heart on a stay to save it here.</p>'}</div></section></div>`}
function helpPage(){return `<div class="container"><section class="page-hero"><div class="eyebrow">HERE TO HELP</div><h1>Real people.<br>Thoughtful answers.</h1><p>For booking help, accessibility questions or changes to a trip.</p></section><div class="quote-grid"><div class="quote-card"><h3>Booking support</h3><p>help@stackly.example</p><p>+351 210 000 100</p><p>Daily 08:00–22:00 Lisbon time</p></div><div class="quote-card"><h3>Before you book</h3><p>Each property lists access details, cancellation terms and room inclusions. Contact the team if you need help choosing a suitable stay.</p></div></div></div>`}
function render(){let route=state.route;let content=route==="home"?home():route==="search"?searchPage():route==="property"?propertyPage():route==="login"?authPage(false):route==="signup"?authPage(true):route==="checkout"?checkoutPage():route==="confirmation"?confirmationPage():route==="trips"?tripsPage():route==="help"?helpPage():home();main.innerHTML=content;
  updateHeaderAccount();observeReveals();bindRouteLinks();syncNav();enhanceInteractions();if(route==="search")bindSearch();if(route==="login"||route==="signup")bindAuth(route==="signup");if(route==="checkout")bindCheckout();if(route==="property")bindProperty();if(route==="home")bindHome();if(route==="trips")bindSaves();if(route==="confirmation"){} }
function bindRouteLinks(){$$("[data-route]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();go(el.dataset.route)}));$$("[data-property]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();state.selected=el.dataset.property;state.room="Courtyard Double";go("property")}));bindSaves()}
function bindSaves(){$$("[data-save]").forEach(el=>el.addEventListener("click",()=>{let id=el.dataset.save;state.saved=state.saved.includes(id)?state.saved.filter(x=>x!==id):[...state.saved,id];localStorage.setItem("stacklySaved",JSON.stringify(state.saved));el.classList.toggle("saved",state.saved.includes(id));el.textContent=state.saved.includes(id)?"♥":"♡";toast(state.saved.includes(id)?"Saved to your places":"Removed from saved places")}))}
function observeReveals(){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");obs.unobserve(e.target)}}),{threshold:.08});$$(".reveal").forEach(el=>obs.observe(el))}
function bindHome(){$("#searchForm")?.addEventListener("submit",e=>{e.preventDefault();go("search")});$$(".faq-question").forEach(q=>q.addEventListener("click",()=>q.parentElement.classList.toggle("open")))}
function bindSearch(){$("#searchForm")?.addEventListener("submit",e=>{e.preventDefault();toast("Search updated for Lisbon · 12–16 Jun")});$("#budgetRange")?.addEventListener("input",e=>$("#budgetLabel").textContent=fmt(e.target.value));$("#applyFilters")?.addEventListener("click",()=>{state.filters.budget=Number($("#budgetRange").value);state.filters.breakfast=$("#breakfastFilter").checked;state.filters.flex=$("#flexFilter").checked;render()});$("#clearFilters")?.addEventListener("click",()=>{state.filters={budget:250,breakfast:false,flex:false};render()});$("#sortSelect")?.addEventListener("change",e=>{state.sort=e.target.value;render()})}
function bindProperty(){$$(".room-option").forEach(el=>el.addEventListener("click",()=>{state.room=el.dataset.room;render()}))}
function bindAuth(signup){$("#showPass")?.addEventListener("click",()=>{let p=$("#passwordField");p.type=p.type==="password"?"text":"password";$("#showPass").textContent=p.type==="password"?"SHOW":"HIDE"});$("#passwordField")?.addEventListener("input",e=>{let v=e.target.value,score=(v.length>=8?35:0)+(/[A-Z]/.test(v)?20:0)+(/[0-9]/.test(v)?20:0)+(/[^A-Za-z0-9]/.test(v)?25:0);$("#strengthBar").style.width=score+"%"});$("#forgotPassword")?.addEventListener("click",e=>{e.preventDefault();toast("Password reset would be sent by the connected backend.")});$("#googleDemo")?.addEventListener("click",()=>toast("Google sign-in needs OAuth credentials from the backend team."));$("#authForm")?.addEventListener("submit",e=>{
  e.preventDefault();
  const f=new FormData(e.target),email=String(f.get("email")||"").trim(),password=String(f.get("password")||"");
  if(!email||!password){toast("Enter an email address and password to continue.","error");return}
  if(!e.target.reportValidity())return;
  if(signup&&!f.get("terms")){toast("Please accept the Terms & Privacy Policy.","error");return}
  const fallbackName=email.includes("@")?email.split("@")[0]:email;
  const fullName=signup?`${f.get("first")||""} ${f.get("last")||""}`.trim():fallbackName;
  const user={name:fullName||"Stackly Guest",email};
  state.user=user;
  sessionStorage.setItem("stacklyDemoUser",JSON.stringify(user));
  localStorage.removeItem("stacklyUser");
  toast(signup?"Your demo account is ready.":"Demo login successful.");
  go("home");
})}
function bindCheckout(){$("#checkoutForm")?.addEventListener("submit",e=>{e.preventDefault();if(!e.target.reportValidity())return;let f=new FormData(e.target),s=stays.find(x=>x.id===state.selected)||stays[0],total=s.total+(state.room==="Rooftop Double"?120:0);let b={ref:"STK-LIS-"+Math.floor(10000+Math.random()*89999),name:f.get("lead"),email:f.get("email"),stay:s.name,room:state.room,total};state.booking=b;localStorage.setItem("stacklyBooking",JSON.stringify(b));go("confirmation")})}

function syncNav(){
  const current=state.route;
  $$(".desktop-nav a").forEach(a=>a.classList.toggle("active",
    (current==="home"&&a.dataset.nav==="explore")||
    (current==="search"&&a.dataset.nav==="stays")||
    (current==="trips"&&a.dataset.nav==="trips")||
    (current==="property"&&a.dataset.nav==="stays")));
}
function enhanceInteractions(){
  // Cinematic pointer parallax on the hero image.
  const hero=$(".hero-visual");
  if(hero && matchMedia("(pointer:fine)").matches && !hero.dataset.parallaxBound){
    hero.dataset.parallaxBound="1";
    hero.addEventListener("pointermove",e=>{
      const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      hero.style.setProperty("--hero-rx",`${-y*2.2}deg`);
      hero.style.setProperty("--hero-ry",`${x*2.8}deg`);
      const photo=$(".hero-photo",hero);if(photo)photo.style.transform=`rotateX(${-y*1.4}deg) rotateY(${x*1.8}deg) translate3d(${x*5}px,${y*5}px,0)`;
    });
    hero.addEventListener("pointerleave",()=>{const photo=$(".hero-photo",hero);if(photo)photo.style.transform=""});
  }
  // Soft 3D card tilt, intentionally restrained for a premium feel.
  if(matchMedia("(pointer:fine)").matches){
    $$(".stay-card,.destination-card,.quote-card,.result-card").forEach(card=>{
      if(card.dataset.tiltBound)return; card.dataset.tiltBound="1";
      card.addEventListener("pointermove",e=>{
        const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        card.style.setProperty("--tilt-x",`${-y*2.4}deg`);
        card.style.setProperty("--tilt-y",`${x*3.2}deg`);
        card.classList.add("is-tilting");
      });
      card.addEventListener("pointerleave",()=>{card.classList.remove("is-tilting");card.style.setProperty("--tilt-x","0deg");card.style.setProperty("--tilt-y","0deg")});
    });
  }
  // Button ripple and magnetic nudge.
  $$("button.btn,.header-cta").forEach(btn=>{
    if(btn.dataset.fxBound)return;btn.dataset.fxBound="1";
    btn.addEventListener("pointerdown",e=>{
      const r=btn.getBoundingClientRect(),dot=document.createElement("span");
      dot.className="button-ripple";dot.style.left=(e.clientX-r.left)+"px";dot.style.top=(e.clientY-r.top)+"px";btn.append(dot);setTimeout(()=>dot.remove(),650);
    });
    if(matchMedia("(pointer:fine)").matches){
      btn.addEventListener("pointermove",e=>{const r=btn.getBoundingClientRect();btn.style.setProperty("--mx",`${(e.clientX-r.left-r.width/2)*.045}px`);btn.style.setProperty("--my",`${(e.clientY-r.top-r.height/2)*.08}px`)});
      btn.addEventListener("pointerleave",()=>{btn.style.setProperty("--mx","0px");btn.style.setProperty("--my","0px")});
    }
  });
  // Reveal visual icons for action controls where space allows.
  $$("[data-route='search']").forEach(b=>{if(!b.querySelector(".action-spark"))b.insertAdjacentHTML("afterbegin",'<span class="action-spark" aria-hidden="true">✳</span>')});
}

function updateHeaderAccount(){
  const loggedIn=!!state.user;
  const initial=state.user?.name?.trim()?.[0]?.toUpperCase()||"S";
  const name=state.user?.name||"Welcome to Stackly";
  const email=state.user?.email||"Log in to access your trips and saved stays";
  if($("#profileInitial"))$("#profileInitial").textContent=initial;
  if($("#popoverInitial"))$("#popoverInitial").textContent=initial;
  if($("#popoverName"))$("#popoverName").textContent=name;
  if($("#popoverEmail"))$("#popoverEmail").textContent=email;
  const menu=$("#profileMenuLinks");
  if(menu){
    menu.innerHTML=loggedIn
      ? '<button data-route="trips"><span>▣</span> My trips <i>↗</i></button><button data-route="trips"><span>♡</span> Saved stays <i>↗</i></button><button data-route="logout" id="accountAction"><span>↪</span> Log out <i>↗</i></button>'
      : '<button data-route="login"><span>↗</span> Log in <i>↗</i></button><button data-route="signup"><span>＋</span> Create an account <i>↗</i></button>';
    $$("[data-route]",menu).forEach(button=>button.addEventListener("click",e=>{
      e.preventDefault();
      if(button.dataset.route==="logout"){
        state.user=null;
        sessionStorage.removeItem("stacklyDemoUser");
        localStorage.removeItem("stacklyUser");
        closeHeaderPopovers();
        toast("You have been logged out.");
        go("home");
      }else go(button.dataset.route);
    }));
  }
}
function closeHeaderPopovers(){
  ["searchPopover","profilePopover"].forEach(id=>{const el=$("#"+id);if(el){el.classList.remove("open");el.setAttribute("aria-hidden","true")}});
  ["searchToggle","profileToggle"].forEach(id=>{const el=$("#"+id);if(el)el.setAttribute("aria-expanded","false")});
}
function toggleHeaderPopover(which){
  const target=which==="search"?"searchPopover":"profilePopover";
  const trigger=which==="search"?"searchToggle":"profileToggle";
  const el=$("#"+target),wasOpen=el.classList.contains("open");
  closeHeaderPopovers();
  if(!wasOpen){el.classList.add("open");el.setAttribute("aria-hidden","false");$("#"+trigger).setAttribute("aria-expanded","true");if(which==="search")setTimeout(()=>$("#quickSearchInput")?.focus(),160)}
}
$("#searchToggle")?.addEventListener("click",()=>toggleHeaderPopover("search"));
$("#profileToggle")?.addEventListener("click",()=>toggleHeaderPopover("profile"));
$$("[data-close-popover]").forEach(b=>b.addEventListener("click",closeHeaderPopovers));
document.addEventListener("click",e=>{
  if(!e.target.closest(".header-actions")&&!e.target.closest(".header-popover"))closeHeaderPopovers();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeHeaderPopovers()});
$("#quickSearchForm")?.addEventListener("submit",e=>{
  e.preventDefault();
  const q=$("#quickSearchInput").value.trim();
  if(q){sessionStorage.setItem("stacklySearchQuery",q)}
  closeHeaderPopovers();go("search");
});
$$("[data-destination]").forEach(b=>b.addEventListener("click",()=>{
  $("#quickSearchInput").value=b.dataset.destination;
  sessionStorage.setItem("stacklySearchQuery",b.dataset.destination);
  closeHeaderPopovers();go("search");
}));
document.addEventListener("error",e=>{
  const el=e.target;
  if(el&&el.tagName==="IMG"){
    el.classList.add("image-failed");
    el.removeAttribute("src");
    el.alt="";
  }
},true);

function dismissPreloader(){
  const preloader=$("#preloader"),app=$("#app");
  if(preloader)preloader.classList.add("done");
  if(app)app.classList.add("ready");
  document.body.classList.remove("loading");
}
function runLoaderProgress(){
  const fill=$("#loaderProgressFill"),percent=$("#loaderPercent"),status=$("#loaderStatus");
  if(!fill||!percent||!status)return;
  const stages=[
    [18,"WAKING UP THE DETAILS"],[42,"FINDING THE RIGHT FEELING"],
    [68,"SETTING THE SCENE"],[88,"ALMOST SOMEWHERE"]
  ];
  let n=0;
  const tick=()=>{
    if(!$("#preloader")||$("#preloader").classList.contains("done"))return;
    const value=stages[Math.min(n,stages.length-1)][0];
    fill.style.width=value+"%";percent.textContent=String(value).padStart(2,"0")+"%";
    status.textContent=stages[Math.min(n,stages.length-1)][1];n++;
    if(n<stages.length)setTimeout(tick,360);
  };
  setTimeout(tick,180);
}
function init(){
  if(location.hash.replace("#","")==="login"){
    state.user=null;
    sessionStorage.removeItem("stacklyDemoUser");
    localStorage.removeItem("stacklyUser");
  }
  document.body.classList.add("loading");
  runLoaderProgress();
  const h=location.hash.replace("#","");
  const valid=["home","explore","stays","approach","search","property","login","signup","checkout","confirmation","trips","help"];
  state.route=valid.includes(h)?(["explore","stays","approach"].includes(h)?"home":h):"home";
  try{render();}
  catch(error){console.error("Stackly initialization error:",error);main.innerHTML='<section class="container page-hero"><div class="eyebrow">STACKLY / WELCOME</div><h1>Your next somewhere starts here.</h1><p>We had trouble loading one interactive detail. You can still explore the site.</p><button class="btn btn-dark" onclick="location.reload()">Reload experience ↻</button></section>';$("#app")?.classList.add("ready");}
  // Never allow a loader to trap the visitor, even if a third-party asset or script fails.
  setTimeout(dismissPreloader,1500);
  window.addEventListener("error",()=>setTimeout(dismissPreloader,250));
}
$("#menuToggle").addEventListener("click",()=>{$("#mobileMenu").classList.toggle("open");$("#menuToggle").classList.toggle("active")});
window.addEventListener("scroll",()=>{
  $("#siteHeader").classList.toggle("scrolled",window.scrollY>20);
  const max=document.documentElement.scrollHeight-window.innerHeight;
  $("#scrollProgress").style.width=(max>0?window.scrollY/max*100:0)+"%";
});
window.addEventListener("hashchange",()=>{let r=location.hash.slice(1);if(["home","search","property","login","signup","checkout","confirmation","trips","help"].includes(r)){state.route=r;render();window.scrollTo(0,0)}});
if(matchMedia("(pointer:fine)").matches){document.addEventListener("mousemove",e=>{let g=$("#cursorGlow");g.style.opacity=".7";g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"})}
init();
