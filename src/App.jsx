// ─── COMPLETE AFIWI QUALIFIER ──────────────────────────────────────────────
import { useState, useRef, useEffect } from "react";

const T = {
  bg: "#07090F", surface: "#0D1018", card: "#111520", border: "#1C2235",
  teal: "#00C4A0", tealDim: "#00C4A020", amber: "#F0A500", amberDim: "#F0A50018",
  slate: "#8B96B0", muted: "#3A4260", light: "#D6DCF0", white: "#ECEFFE",
  danger: "#FF5C5C", mono: "'Courier New', 'Lucida Console', monospace",
  sans: "'Trebuchet MS', 'Gill Sans', sans-serif", display: "Georgia, 'Times New Roman', serif",
};

const SYSTEM_PROMPT = `You are Ace — Afiwi Capital's senior deal strategist. You've structured hundreds of deals across real estate and business lending. You are NOT a chatbot. You think like an underwriter and speak like a trusted advisor.

## AFIWI CAPITAL — WHAT YOU REPRESENT
- Access to 30+ institutional and private lending programs
- 100% broker-protected: every deal is registered in the referring broker's name — their client stays theirs, always
- Loan decisions in 24–48 hours on qualified deals
- Creative structuring capability for complex, non-conventional scenarios
- No upfront application fees
- Loan amounts from $50K to $50M+
- Products: Fix & Flip, Bridge, DSCR/Rental, Ground-Up Construction, Hard Money, Working Capital, Revenue-Based, Equipment, and more

## OPENING QUESTION — ALWAYS USE THIS VERBATIM
"I'm Ace with Afiwi Capital — I keep it short. Are you a real estate investor, a business owner, or a broker bringing a deal?"

Then branch into the correct path below.

---

## PATH A — REAL ESTATE INVESTOR

Ask ONE at a time, in this order:
A1. What's your investment strategy? (Fix & flip / Buy & hold rental / Bridge / Ground-up construction / Cash-out refi)
A2. Property type? (Single family, multifamily, mixed-use, commercial)
A3. What's the purchase price — or current value if you already own it?
A4. How much are you looking to borrow?
A5. What's your estimated ARV (after-repair value) if applicable?
A6. How many investment deals have you completed? (0, 1–4, 5–10, 10+)
A7. Credit score range? (720+, 680–719, 640–679, below 640)
A8. When do you need to close?
A9. How much do you have for down payment or do you have equity available?

PRODUCT MATCHING:
- Fix & flip → Fix & Flip Bridge Loan (typically 12 months, up to 90% LTC)
- Buy & hold → DSCR Rental Loan (no income docs, based on rent coverage)
- Ground-up → Construction Loan (draws-based, land + build)
- Bridge need → Bridge Loan (6–24 months, asset-based)
- Hard to qualify → Hard Money / Private Capital (credit flexible)
- Cash-out refi → Cash-Out Bridge or DSCR Refi

RE SCORING (internal — never show):
- 5+ completed deals: +3 | 1–4 deals: +2 | 0 deals: +1
- Credit 720+: +3 | 680–719: +2 | 640–679: +1 | below 640: +0
- LTV/LTC under 75%: +3 | 75–80%: +2 | 80–85%: +1
- Clear exit strategy: +2
- ARV ≥ 1.25x purchase or basis: +2
- Close within 30 days: +2 | 30–60 days: +1
MAX RE SCORE: 15

---

## PATH B — BUSINESS OWNER

Ask ONE at a time:
B1. What does your business do, and how long have you been operating?
B2. What's your average monthly gross revenue?
B3. What specifically do you need the capital for?
B4. How much are you looking for?
B5. Do you have business or personal real estate that could serve as collateral?
B6. Credit score range? (720+, 680–719, 640–679, below 640)
B7. How quickly do you need funding?
B8. Have you taken business financing before? (SBA, bank, MCA, private?)

PRODUCT MATCHING:
- Strong revenue, 2+ yrs → Working Capital / Revenue-Based Line
- RE collateral available → Commercial Bridge or Equity Loan
- Equipment purchase → Equipment Financing
- Fast need, lower credit → Revenue/MCA bridge
- SBA-eligible → Flag for SBA-adjacent program referral
- Real estate holding company → DSCR or bridge

BUSINESS SCORING (internal):
- Monthly revenue $100K+: +3 | $50–100K: +2 | $20–50K: +1 | under $20K: +0
- 3+ years in business: +3 | 1–2 yrs: +2 | under 1 yr: +1
- Credit 700+: +3 | 660–699: +2 | 620–659: +1
- Real estate collateral: +3
- Clear capital purpose: +2
MAX BIZ SCORE: 14

---

## PATH C — BROKER / REFERRAL PARTNER

Open with: "We're 100% broker-protected — your client stays yours, every deal you submit gets registered in your name. Let's get into it."

C1. What's your name and company?
C2. What lenders are you currently working with, and what's frustrating you about them? (Listen — this is intelligence)
C3. What kind of deal are you bringing today?
→ Then flow into Path A or B questions for the underlying deal.
→ Also ask: What rate/term does your borrower expect? (Set expectations early)

BROKER VALUE PROPS TO WEAVE IN NATURALLY:
- "We have programs most direct lenders won't touch."
- "You'll have a dedicated rep — one number, one contact."
- "We can usually give you a soft quote in 24 hours."

---

## SCORING TIERS (all paths)

TIER 1 — Score 12+ (RE) or 10+ (Biz): FLAG IMMEDIATELY. Senior deal team contacts within 2 hours.
TIER 2 — Score 8–11 (RE) or 7–9 (Biz): Strong. Advisor follow-up within 24 hours.
TIER 3 — Score 4–7: Workable. Structured follow-up, possibly alternative product.
PASS — Score under 4: Redirect with resources; no advisor time spent.

---

## HANDOFF — Generate this when you have 6+ signals, wrap in XML:

<DEAL_PROFILE>
PATH: [RE Investor / Business Owner / Broker]
RECOMMENDED PRODUCT: [specific product name]
LOAN AMOUNT: [value]
TIMELINE: [value]
KEY METRICS: [LTV or LTC, ARV, revenue, etc.]
CREDIT RANGE: [value]
EXPERIENCE/TENURE: [value]
COLLATERAL: [value]
SCORE: [X/15 or X/14]
TIER: [1 / 2 / 3 / PASS]
DEAL STRENGTH: [1 sentence — what's the bull case]
DEAL RISK: [1 sentence — what to watch]
ADVISOR ANGLE: [How to open the follow-up call — be specific]
NEXT ACTION: [Exact step with urgency]
</DEAL_PROFILE>

After the XML, tell the borrower or broker warmly that a specialist is being notified, give an honest ETA (Tier 1: within 2 hours, Tier 2: next business day), and close naturally.

## HARD RULES
- ONE question at a time — never stack two questions
- Never ask for SSN, full DOB, or bank account numbers
- If vague: reframe with specifics ("When you say a lot, are we talking $300K or closer to $3M?")
- On rate questions: "Rates lock to your full profile — let me get that together and we'll give you real numbers, not ballpark guesses."
- Never reveal tier scores or internal ratings to the borrower
- Sound like a deal person, not a compliance bot`;

const DIRECT_FUNNEL = [
  { id:1, label:"ATTRACT", icon:"◎", sub:"High-intent borrower traffic", w:"100%", color:T.teal,
    tactics:["Paid search: real estate investor + business loan keywords","SEO content: deal case studies, market rate guides","LinkedIn targeting: property investors, CFOs, operators","Strategic referral network activation"] },
  { id:2, label:"ENGAGE", icon:"⬡", sub:"Ace opens — zero friction", w:"84%", color:"#00A888",
    tactics:["One open question starts qualification","No forms, no drop-off, no friction","Web chat / SMS / email — same prompt, every channel","Ace identifies path in first 2 exchanges"] },
  { id:3, label:"QUALIFY", icon:"▣", sub:"9-signal dual-path scoring", w:"68%", color:"#008C72",
    tactics:["RE path: strategy, LTV, ARV, experience, credit, timeline","Biz path: revenue, tenure, purpose, collateral, credit","Product matched in real time","Tier 1/2/3 assigned silently"] },
  { id:4, label:"ROUTE", icon:"◈", sub:"Smart deal team handoff", w:"52%", color:"#006E5A",
    tactics:["Tier 1 → Senior advisor within 2 hours","Tier 2 → Advisor follow-up next business day","Tier 3 → Structured nurture + alternative product","PASS → Resource redirect, no advisor spend"] },
  { id:5, label:"CLOSE", icon:"★", sub:"Funded & retained", w:"34%", color:"#004F42",
    tactics:["Advisor-led term sheet conversation","Pre-built soft quote templates","Client returned to broker if broker-submitted","Referral loop + repeat borrower sequence activated"] },
];

const BROKER_FUNNEL = [
  { id:1, label:"IDENTIFY", icon:"◎", sub:"Find active brokers with pain", w:"100%", color:T.amber,
    tactics:["Target brokers frustrated with lender turn-downs","LinkedIn: mortgage brokers, commercial loan officers","Industry events: NREIA, MBA, local RE investor meetups","Competitor broker lists via referral intel"] },
  { id:2, label:"PROTECT", icon:"⬡", sub:"Lead with broker safety", w:"84%", color:"#D4920A",
    tactics:["First message: 'Your client stays yours — always'","Deal registration on first submission","One dedicated rep per broker partner","Transparent fee structure — no surprises"] },
  { id:3, label:"SUBMIT", icon:"▣", sub:"Frictionless deal intake", w:"68%", color:"#B87A08",
    tactics:["Ace qualifies the underlying deal via broker","Soft quote in 24 hours — broker presents it","Full deal package support: term sheets, LOIs","Broker never talks to underwriter alone"] },
  { id:4, label:"CLOSE", icon:"◈", sub:"Broker wins, Afiwi closes", w:"52%", color:"#9C6206",
    tactics:["Broker on every borrower call if desired","Commission paid at closing, no holdbacks","Deal closed in Afiwi's name, broker credit intact","Follow-up: broker's pipeline becomes a recurring channel"] },
  { id:5, label:"RETAIN", icon:"★", sub:"Become their primary capital source", w:"34%", color:"#7A4C04",
    tactics:["Monthly market intel sent to broker partners","Exclusive program access for top-tier brokers","Preferred pricing tiers for volume partners","Quarterly deal review — broker growth planning"] },
];

const DAILY_PROMPTS = [
  { type: "INBOUND — WEB/SMS/EMAIL", color: T.teal, label: "OPENING",
    prompt: `"I'm Ace with Afiwi Capital — I keep it short. Are you a real estate investor, a business owner, or a broker bringing a deal?"`,
    note: "Fires on every first touch. No form. No dropdown. One question identifies the path and signals sophistication." },
  { type: "OUTBOUND — BROKER PROSPECTING", color: T.amber, label: "DAILY",
    prompt: `"[First name] — quick one. Are you running into deals your current lenders won't touch? We've been closing transactions most shops pass on. Worth a 10-minute call this week?"`,
    note: "Works on LinkedIn DM, email, SMS. Don't lead with rates — lead with the pain point: deal turn-downs." },
  { type: "OUTBOUND — RE INVESTOR FOLLOW-UP", color: "#A78BFA", label: "RE INVESTOR",
    prompt: `"[Name] — you mentioned you're working on a [fix & flip / rental / construction] deal. Rates shifted this week in your favor on [product type]. Got 5 minutes to run numbers?"`,
    note: "Personalize with the asset type from the first conversation. Urgency framing: market shift creates FOMO." },
  { type: "OUTBOUND — BUSINESS CAPITAL FOLLOW-UP", color: "#34D399", label: "BIZ CAPITAL",
    prompt: `"[Name] — following up on your working capital conversation. We have a program that works for [industry] businesses at your revenue level with no collateral required. Can we connect today?"`,
    note: "Call out their industry and remove the friction point (collateral). Specificity converts." },
  { type: "RE-ENGAGEMENT — 14-DAY DORMANT", color: "#F87171", label: "RE-ENGAGE",
    prompt: `"[Name] — we spoke about [deal type] a couple weeks ago. Still exploring options, or did you find a path? Asking because we just unlocked a program that fits your profile exactly."`,
    note: "Humanize the re-touch. Don't apologize for following up. The 'new program' hook creates a reason to re-open." },
];

const PRODUCTS = [
  { name:"Fix & Flip Bridge", tags:["RE"], ltv:"Up to 90% LTC", term:"6–18 mo", note:"No income docs. Draw schedule on rehab." },
  { name:"DSCR Rental Loan", tags:["RE"], ltv:"Up to 80% LTV", term:"30yr fixed", note:"Qualifies on rent, not personal income." },
  { name:"Ground-Up Construction", tags:["RE"], ltv:"Up to 85% LTC", term:"12–18 mo", note:"Land + build, draw-based funding." },
  { name:"Bridge Loan", tags:["RE"], ltv:"Up to 75% LTV", term:"6–24 mo", note:"Fast close, asset-based approval." },
  { name:"Hard Money / Private", tags:["RE"], ltv:"Up to 70% LTV", term:"6–12 mo", note:"Credit-flexible. Speed over terms." },
  { name:"Working Capital Line", tags:["BIZ"], ltv:"Revenue-based", term:"6–24 mo", note:"No RE collateral needed. 2+ yrs revenue." },
  { name:"Revenue-Based Advance", tags:["BIZ"], ltv:"Up to 150% MRR", term:"4–18 mo", note:"Daily/weekly remittance. Fast approval." },
  { name:"Equipment Financing", tags:["BIZ"], ltv:"Up to 100% EV", term:"24–84 mo", note:"New or used. Collateral is the equipment." },
  { name:"Commercial Bridge", tags:["BIZ","RE"], ltv:"Up to 75% LTV", term:"12–24 mo", note:"For commercial property or biz RE assets." },
];

const EDGE = [
  { icon:"🔒", title:"Broker Protected — Always", body:"Every deal submitted by a broker is registered in their name. Afiwi never goes around a referral partner." },
  { icon:"⚡", title:"24–48hr Soft Quotes", body:"Most lenders take 5–7 days. Afiwi moves in 24–48 hours on qualified deals — making you the fastest option in the room." },
  { icon:"🗂️", title:"30+ Program Access", body:"Afiwi isn't locked to one lender's box. When one program declines, there are 29 more to work." },
  { icon:"🧱", title:"Creative Structuring", body:"Complex scenarios — foreign nationals, entities, mid-construction, distressed assets — Afiwi has the right product." },
  { icon:"💬", title:"One Point of Contact", body:"Borrowers and brokers get one rep who owns their deal start to finish. No call center. No ticket system." },
  { icon:"$", title:"No Upfront Fees", body:"Zero application fees. Afiwi makes money when deals close — incentives align with the borrower's success." },
];

let dealLog = [];
function pushToDealLog(profile, tier, path) {
  dealLog = [{ id: Date.now(), timestamp: new Date().toLocaleString(), profile, tier, path }, ...dealLog];
}

async function sendWebhook(payload) {
  const url = window.__AFIWI_WEBHOOK_URL__ || "";
  if (!url) return;
  try { await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); } catch(e) {}
}

function ChatPanel() {
  const [messages, setMessages] = useState([{
    role:"assistant",
    content:"I'm Ace with Afiwi Capital — I keep it short. Are you a real estate investor, a business owner, or a broker bringing a deal?",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [tier, setTier] = useState(null);
  const [path, setPath] = useState(null);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role:"user", content:input.trim() };
    const next = [...messages, userMsg];
    setMessages(next); setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system: SYSTEM_PROMPT,
          messages: next.map(m => ({ role:m.role, content:m.content })),
        }),
      });
      const data = await res.json();
      const raw = data.content?.map(c => c.text||"").join("\n") || "";
      const pm = raw.match(/<DEAL_PROFILE>([\s\S]*?)<\/DEAL_PROFILE>/);
      if (pm) {
        const pt = pm[1];
        const tm = pt.match(/TIER:\s*(\w+)/);
        const pathM = pt.match(/PATH:\s*(.+)/);
        const tierVal = tm ? tm[1].trim() : null;
        const pathVal = pathM ? pathM[1].trim() : null;
        setTier(tierVal);
        setPath(pathVal);
        setProfile(pt);
        pushToDealLog(pt, tierVal, pathVal);
        sendWebhook({ type:"DEAL_PROFILE", profile: pt, tier: tierVal, path: pathVal, timestamp: new Date().toISOString() });
      }
      const clean = raw.replace(/<DEAL_PROFILE>[\s\S]*?<\/DEAL_PROFILE>/g,"").trim();
      setMessages([...next, { role:"assistant", content:clean }]);
    } catch(e) {
      setMessages([...next, { role:"assistant", content:"Connection issue — try again." }]);
    }
    setLoading(false);
  }

  const tierMeta = {
    "1": { color:T.teal, label:"TIER 1 — PRIORITY DEAL", action:"Senior advisor notified — contact within 2 hrs" },
    "2": { color:T.amber, label:"TIER 2 — STRONG DEAL", action:"Advisor follow-up next business day" },
    "3": { color:"#A78BFA", label:"TIER 3 — WORKABLE", action:"Structured follow-up initiated" },
    "PASS": { color:T.muted, label:"PASS", action:"Redirecting to resources" },
  };
  const tm = tierMeta[tier] || {};

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ flex:1, overflowY:"auto", padding:"20px 16px", display:"flex", flexDirection:"column", gap:12 }}>
        {messages.map((m,i) => (
          <div key={i} style={{ display:"flex", justifyContent: m.role==="user"?"flex-end":"flex-start", gap:8 }}>
            {m.role==="assistant" && (
              <div style={{
                width:30, height:30, borderRadius:"50%", background:`linear-gradient(135deg, ${T.teal}, #007A68)`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:11, fontWeight:700, color:"#07090F", flexShrink:0, marginTop:2,
                fontFamily:T.sans,
              }}>AC</div>
            )}
            <div style={{
              maxWidth:"76%", padding:"10px 14px",
              borderRadius: m.role==="user" ? "14px 14px 3px 14px" : "3px 14px 14px 14px",
              background: m.role==="user" ? T.teal : T.card,
              color: m.role==="user" ? "#07090F" : T.light,
              fontSize:13, lineHeight:1.6,
              border: m.role==="user" ? "none" : `1px solid ${T.border}`,
              fontFamily:T.sans,
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <div style={{ width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg, ${T.teal}, #007A68)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#07090F",fontFamily:T.sans }}>AC</div>
            <div style={{ display:"flex", gap:5 }}>
              {[0,1,2].map(i=>(
                <div key={i} style={{ width:7,height:7,borderRadius:"50%",background:T.teal, animation:`dot 1.2s ease-in-out ${i*0.22}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {profile && (
        <div style={{ margin:"0 14px 10px", borderRadius:8, border:`1px solid ${tm.color||T.teal}40`, overflow:"hidden" }}>
          <div style={{ padding:"8px 12px", background:`${tm.color||T.teal}18`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.13em", color:tm.color||T.teal, fontFamily:T.sans }}>{tm.label || "DEAL PROFILE GENERATED"}</span>
            <span style={{ fontSize:9, color:T.muted, fontFamily:T.sans }}>{tm.action}</span>
          </div>
          <pre style={{ fontSize:10.5, color:T.slate, margin:0, padding:"10px 12px", whiteSpace:"pre-wrap", fontFamily:T.mono, lineHeight:1.65, background:T.surface }}>{profile}</pre>
        </div>
      )}

      <div style={{ padding:"10px 14px", borderTop:`1px solid ${T.border}`, display:"flex", gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Respond to Ace..."
          style={{ flex:1, background:T.card, border:`1px solid ${T.border}`, borderRadius:7, padding:"9px 13px", color:T.white, fontSize:13, fontFamily:T.sans, outline:"none" }} />
        <button onClick={send} disabled={loading||!input.trim()} style={{
          background: input.trim()&&!loading ? T.teal : T.muted+"44",
          border:"none", borderRadius:7, padding:"9px 15px", cursor:input.trim()&&!loading?"pointer":"not-allowed",
          color: input.trim()&&!loading ? "#07090F" : T.muted, fontWeight:700, fontSize:11,
          letterSpacing:"0.07em", transition:"all 0.18s", fontFamily:T.sans,
        }}>SEND</button>
      </div>
    </div>
  );
}

function FunnelCol({ stages, title, accent }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ flex:1 }}>
      <div style={{ fontSize:9, letterSpacing:"0.14em", fontWeight:700, color:accent, marginBottom:12, fontFamily:T.sans }}>{title}</div>
      {stages.map((s,i) => (
        <div key={s.id} style={{ marginBottom:3 }}>
          <div onClick={()=>setOpen(open===s.id?null:s.id)} style={{
            width:s.w, padding:"9px 12px",
            background: open===s.id ? s.color : `${s.color}18`,
            border:`1px solid ${s.color}40`, borderRadius:4, cursor:"pointer",
            transition:"all 0.2s", display:"flex", justifyContent:"space-between", alignItems:"center",
          }}>
            <div>
              <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.13em", color:open===s.id?"#07090F":s.color, fontFamily:T.sans }}>{s.icon} {s.label}</span>
              <span style={{ fontSize:10.5, color:open===s.id?"#07090F99":T.muted, marginLeft:8, fontFamily:T.sans }}>{s.sub}</span>
            </div>
            <span style={{ color:open===s.id?"#07090F":s.color, fontSize:10, transition:"transform 0.2s", transform:open===s.id?"rotate(180deg)":"none" }}>▾</span>
          </div>
          {open===s.id && (
            <div style={{ width:s.w, borderLeft:`2px solid ${s.color}`, borderBottom:`1px solid ${s.color}25`, borderRight:`1px solid ${s.color}25`, padding:"8px 12px", background:`${s.color}08` }}>
              {s.tactics.map((t,j)=>(
                <div key={j} style={{ display:"flex", gap:6, marginBottom:5, alignItems:"flex-start" }}>
                  <span style={{ color:s.color, fontSize:8, marginTop:3, flexShrink:0 }}>◆</span>
                  <span style={{ fontSize:11.5, color:T.slate, fontFamily:T.sans, lineHeight:1.45 }}>{t}</span>
                </div>
              ))}
            </div>
          )}
          {i < stages.length-1 && <div style={{ textAlign:"center", color:T.muted, fontSize:10, margin:"2px 0" }}>↓</div>}
        </div>
      ))}
    </div>
  );
}

function ProductsGrid({ filter }) {
  const filtered = filter==="ALL" ? PRODUCTS : PRODUCTS.filter(p=>p.tags.includes(filter));
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:8 }}>
      {filtered.map((p,i)=>(
        <div key={i} style={{ padding:"12px 14px", background:T.card, border:`1px solid ${T.border}`, borderRadius:7 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5, alignItems:"flex-start" }}>
            <span style={{ fontSize:12, fontWeight:700, color:T.white, fontFamily:T.sans, lineHeight:1.3 }}>{p.name}</span>
            <div style={{ display:"flex", gap:3 }}>
              {p.tags.map(t=>(
                <span key={t} style={{ fontSize:8, padding:"2px 5px", borderRadius:3, background:t==="RE"?T.tealDim:T.amberDim, color:t==="RE"?T.teal:T.amber, fontWeight:700, letterSpacing:"0.08em", fontFamily:T.sans }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:10, marginBottom:5 }}>
            <div style={{ fontSize:10, color:T.teal, fontFamily:T.mono }}>{p.ltv}</div>
            <div style={{ fontSize:10, color:T.muted, fontFamily:T.mono }}>· {p.term}</div>
          </div>
          <div style={{ fontSize:11, color:T.slate, fontFamily:T.sans, lineHeight:1.4 }}>{p.note}</div>
        </div>
      ))}
    </div>
  );
}

function AdvisorDashboard() {
  const [log, setLog] = useState(dealLog);
  useEffect(() => { const i = setInterval(() => setLog([...dealLog]), 2000); return () => clearInterval(i); }, []);
  const tc = { "1":T.teal, "2":T.amber, "3":"#A78BFA", "PASS":T.muted };
  return (
    <div>
      <div style={{ fontSize:9, letterSpacing:"0.12em", color:T.teal, marginBottom:14, fontFamily:T.sans }}>ADVISOR DEAL BOARD — AUTO‑POPULATED FROM ACE CONVERSATIONS</div>
      {log.length===0 ? (
        <div style={{ padding:40, textAlign:"center", color:T.muted }}>No deals qualified yet. Start a chat in the Qualifier tab.</div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {log.map((entry) => (
            <div key={entry.id} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:14, borderLeft:`4px solid ${tc[entry.tier]||T.muted}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <div>
                  <span style={{ fontSize:9, letterSpacing:"0.12em", color:tc[entry.tier]||T.muted, fontFamily:T.sans }}>TIER {entry.tier} — {entry.path||"UNKNOWN PATH"}</span>
                  <span style={{ fontSize:10, color:T.muted, marginLeft:12, fontFamily:T.mono }}>{entry.timestamp}</span>
                </div>
                <span style={{ fontSize:9, padding:"2px 7px", borderRadius:4, background:(tc[entry.tier]||T.muted)+"18", color:tc[entry.tier]||T.muted, fontFamily:T.sans }}>
                  {entry.tier==="1" ? "CALL NOW" : entry.tier==="2" ? "NEXT BUSINESS DAY" : "NURTURE"}
                </span>
              </div>
              <pre style={{ fontSize:10.5, color:T.slate, margin:0, whiteSpace:"pre-wrap", fontFamily:T.mono, lineHeight:1.5 }}>{entry.profile}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Settings() {
  const [webhook, setWebhook] = useState(window.__AFIWI_WEBHOOK_URL__||"");
  return (
    <div>
      <div style={{ fontSize:9, letterSpacing:"0.12em", color:T.teal, marginBottom:14, fontFamily:T.sans }}>INTEGRATION SETTINGS</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, maxWidth:500 }}>
        <div>
          <label style={{ fontSize:10, color:T.muted, fontFamily:T.sans, display:"block", marginBottom:4 }}>CRM Webhook URL</label>
          <input value={webhook} onChange={e=>setWebhook(e.target.value)} placeholder="https://hooks.zapier.com/..." style={{ width:"100%", padding:"8px 12px", background:T.surface, border:`1px solid ${T.border}`, borderRadius:6, color:T.white, fontSize:12, fontFamily:T.mono }} />
        </div>
        <button onClick={()=>{window.__AFIWI_WEBHOOK_URL__=webhook;alert("Webhook URL saved (this session only).");}} style={{ alignSelf:"flex-start", padding:"8px 18px", background:T.teal, border:"none", borderRadius:6, color:"#07090F", fontWeight:700, fontSize:11, letterSpacing:"0.07em", cursor:"pointer", fontFamily:T.sans }}>SAVE</button>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("qualifier");
  const [prodFilter, setProdFilter] = useState("ALL");
  const tabs = [
    { id:"qualifier", label:"⚡ QUALIFIER" },
    { id:"funnels",   label:"📊 FUNNELS" },
    { id:"prompts",   label:"📋 PROMPT SYSTEM" },
    { id:"dashboard", label:"📈 DASHBOARD" },
    { id:"edge",      label:"🎯 COMPETITIVE EDGE" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:T.sans, color:T.light }}>
      <style>{`
        @keyframes dot { 0%,100%{opacity:.25;transform:scale(.7)} 50%{opacity:1;transform:scale(1)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:${T.muted}55;border-radius:2px}
        input::placeholder{color:${T.muted}}
        button:focus{outline:none}
      `}</style>

      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:34, height:34, borderRadius:8, background:`linear-gradient(135deg, ${T.teal}, #005C4E)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:13, fontWeight:900, color:"#07090F", fontFamily:T.sans }}>AW</span>
            </div>
            <div>
              <div style={{ fontSize:15, fontWeight:700, letterSpacing:"0.08em", color:T.white, fontFamily:T.sans }}>AFIWI CAPITAL</div>
              <div style={{ fontSize:9, letterSpacing:"0.1em", color:T.muted, fontFamily:T.sans }}>AI BORROWER + BROKER ENGINE</div>
            </div>
          </div>
          <div style={{ height:28, width:1, background:T.border }} />
          <div style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", background:T.tealDim, border:`1px solid ${T.teal}35`, borderRadius:5 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:T.teal, boxShadow:`0 0 6px ${T.teal}` }} />
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", color:T.teal, fontFamily:T.sans }}>BROKER PROTECTED</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {["30+ Programs","24hr Quotes","$50K–$50M+"].map((b,i)=>(
            <span key={i} style={{ fontSize:9, padding:"4px 9px", borderRadius:4, background:T.card, border:`1px solid ${T.border}`, color:T.slate, letterSpacing:"0.05em", fontFamily:T.sans }}>{b}</span>
          ))}
        </div>
      </div>

      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:"0 24px", display:"flex" }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            background:"none", border:"none", padding:"12px 16px", cursor:"pointer",
            fontSize:10, letterSpacing:"0.1em", fontWeight:700, fontFamily:T.sans,
            color: tab===t.id ? T.teal : T.muted,
            borderBottom: tab===t.id ? `2px solid ${T.teal}` : "2px solid transparent",
            marginBottom:-1, transition:"all 0.18s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"22px 24px", animation:"fadeUp 0.35s ease both" }}>
        {tab==="qualifier" && <ChatPanel />}
        {tab==="funnels" && (
          <div style={{ display:"flex", gap:20 }}>
            <FunnelCol stages={DIRECT_FUNNEL} title="DIRECT BORROWER FUNNEL" accent={T.teal} />
            <div style={{ width:1, background:T.border }} />
            <FunnelCol stages={BROKER_FUNNEL} title="BROKER / REFERRAL CHANNEL FUNNEL" accent={T.amber} />
          </div>
        )}
        {tab==="prompts" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ fontSize:9, letterSpacing:"0.12em", color:T.teal, fontFamily:T.sans }}>DAILY PROMPT LIBRARY — 5 CHANNELS</div>
            {DAILY_PROMPTS.map((p,i)=>(
              <div key={i} style={{ border:`1px solid ${p.color}30`, borderRadius:8, overflow:"hidden" }}>
                <div style={{ padding:"8px 14px", background:`${p.color}12`, display:"flex", gap:10, alignItems:"center" }}>
                  <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.12em", color:p.color, fontFamily:T.sans }}>{p.type}</span>
                  <span style={{ fontSize:9, padding:"2px 7px", borderRadius:3, background:`${p.color}20`, color:p.color, fontFamily:T.sans }}>{p.label}</span>
                </div>
                <div style={{ padding:"12px 14px", background:T.surface }}>
                  <div style={{ fontFamily:T.display, fontSize:13.5, color:T.white, lineHeight:1.6, fontStyle:"italic", marginBottom:8, borderLeft:`2px solid ${p.color}`, paddingLeft:12 }}>
                    {p.prompt}
                  </div>
                  <div style={{ fontSize:11, color:T.muted, fontFamily:T.sans, lineHeight:1.5 }}>
                    ↳ {p.note}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div style={{ fontSize:9, letterSpacing:"0.12em", color:T.teal, fontFamily:T.sans }}>PRODUCT MATCHING MATRIX</div>
                <div style={{ display:"flex", gap:6 }}>
                  {["ALL","RE","BIZ"].map(f=>(
                    <button key={f} onClick={()=>setProdFilter(f)} style={{
                      fontSize:9, padding:"4px 10px", borderRadius:4, cursor:"pointer", fontFamily:T.sans, fontWeight:700,
                      background: prodFilter===f ? T.teal : T.card,
                      color: prodFilter===f ? "#07090F" : T.muted,
                      border: `1px solid ${prodFilter===f ? T.teal : T.border}`,
                      letterSpacing:"0.08em",
                    }}>{f}</button>
                  ))}
                </div>
              </div>
              <ProductsGrid filter={prodFilter} />
            </div>
          </div>
        )}
        {tab==="dashboard" && <AdvisorDashboard />}
        {tab==="edge" && (
          <div>
            <div style={{ fontSize:9, letterSpacing:"0.12em", color:T.teal, marginBottom:14, fontFamily:T.sans }}>WHY AFIWI WINS — 6 STRUCTURAL ADVANTAGES</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:10, marginBottom:20 }}>
              {EDGE.map((e,i)=>(
                <div key={i} style={{ padding:"16px", background:T.card, border:`1px solid ${T.border}`, borderRadius:8 }}>
                  <div style={{ fontSize:20, marginBottom:8 }}>{e.icon}</div>
                  <div style={{ fontSize:12, fontWeight:700, color:T.white, marginBottom:6, fontFamily:T.sans }}>{e.title}</div>
                  <div style={{ fontSize:12, color:T.slate, lineHeight:1.55, fontFamily:T.sans }}>{e.body}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
