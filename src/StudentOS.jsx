import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { COURSE_CATEGORIES, COURSES, getCourseNames, getCourseYears, getCourseSubjects, getAllTopicsForCourse } from "./courseData.js";

const supabase = createClient(
  "https://mwzpfrroagrhuenpdclt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13enBmcnJvYWdyaHVlbnBkY2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzU5NDgsImV4cCI6MjA5NTU1MTk0OH0.1XaAfisI75Iafk_tvGRoQNXDXYTzR7Zqsowl2Fb_dM4"
);

const C = {
  bg:"#08090D",surface:"#0F1117",card:"#13171F",border:"#1C2333",
  accent:"#4FFFB0",accentDim:"#122B20",accentText:"#3DD68C",
  warn:"#FFB830",warnDim:"#2D2008",danger:"#FF5252",dangerDim:"#2D0D0D",
  blue:"#4FC3F7",blueDim:"#091E30",purple:"#B39DDB",purpleDim:"#1A1428",
  text:"#E8EDF5",muted:"#5A6A88",subtle:"#2A3347",
};
const F = "'DM Sans','Segoe UI',sans-serif";
const M = "'DM Mono','Fira Code',monospace";

const GS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{-webkit-text-size-adjust:100%;}
  body{background:#08090D;color:#E8EDF5;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
  ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:#1C2333;border-radius:4px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes blink{0%,80%,100%{transform:scale(0.55);opacity:0.3}40%{transform:scale(1);opacity:1}}
  input:-webkit-autofill{-webkit-box-shadow:0 0 0 30px #13171F inset!important;-webkit-text-fill-color:#E8EDF5!important;}
  button{transition:opacity 0.15s ease,transform 0.12s ease;}
  button:active:not(:disabled){transform:scale(0.96);}
  .desktop-sidebar{display:flex;}
  .bottom-nav{display:none;}
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
  .grid-4-exam{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
  .att-card{display:flex;gap:16px;align-items:flex-start;}
  .chat-input-row{display:flex;gap:8px;align-items:flex-end;}
  @media(max-width:768px){
    .desktop-sidebar{display:none!important;}
    .bottom-nav{display:flex!important;position:fixed;bottom:0;left:0;right:0;background:#0F1117;border-top:1px solid #1C2333;z-index:100;padding:6px 0;padding-bottom:env(safe-area-inset-bottom,6px);}
    .main-content{padding:16px 14px 88px!important;max-width:100%!important;}
    .grid-2{grid-template-columns:1fr!important;}
    .grid-4{grid-template-columns:1fr 1fr!important;}
    .grid-4-exam{grid-template-columns:1fr 1fr!important;}
    .att-card{flex-direction:column;align-items:flex-start!important;}
    .page-header{font-size:17px!important;}
    .stat-value{font-size:24px!important;}
    .greeting{font-size:20px!important;}
    .chat-input-row{position:fixed;bottom:72px;left:0;right:0;padding:10px 14px;background:#0F1117;border-top:1px solid #1C2333;z-index:99;}
    .chat-messages{padding-bottom:140px!important;}
  }
`;

const daysLeft = d => { const t=new Date();t.setHours(0,0,0,0); return Math.ceil((new Date(d)-t)/86400000); };
const att = (a,t) => t===0?0:Math.round((a/t)*100);
const SCOLS = ["#4FFFB0","#4FC3F7","#FFB830","#B39DDB","#FF8A65","#F06292"];

// BHMS passing marks defaults
const BHMS_DEFAULTS = {
  theory_pass_pct: 50,
  practical_pass_pct: 50,
  internal_pass_pct: 50,
  theory_max: 150,
  practical_max: 100,
  internal_max: 50,
};

const Badge = ({color,bg,children}) => <span style={{display:"inline-flex",alignItems:"center",background:bg||C.subtle,color:color||C.muted,fontSize:10,fontWeight:700,letterSpacing:"0.06em",padding:"3px 9px",borderRadius:20,textTransform:"uppercase"}}>{children}</span>;

const Ring = ({p,size=64,stroke=5,color}) => {
  const r=(size-stroke*2)/2,circ=2*Math.PI*r,off=circ-(p/100)*circ;
  const col=color||(p>=75?C.accent:p>=60?C.warn:C.danger);
  return <svg width={size} height={size} style={{transform:"rotate(-90deg)",flexShrink:0}}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.6s ease"}}/>
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill={col} fontSize={size*0.22} fontWeight="700" fontFamily={M} style={{transform:"rotate(90deg)",transformOrigin:"center"}}>{p}%</text>
  </svg>;
};

const Card = ({children,style,glow,className,onClick}) => <div className={className} onClick={onClick} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:18,boxShadow:glow?`0 0 32px ${glow}18,0 2px 16px #00000030`:"0 2px 12px #00000020",animation:"fadeUp 0.25s ease both",cursor:onClick?"pointer":"default",...style}}>{children}</div>;

const Btn = ({onClick,children,variant="primary",style,disabled}) => {
  const styles = {
    primary:{background:C.accent,border:"none",color:"#000",fontWeight:700,boxShadow:`0 2px 12px ${C.accent}30`},
    danger:{background:C.dangerDim,border:`1px solid ${C.danger}55`,color:C.danger,fontWeight:600},
    ghost:{background:"transparent",border:`1px solid ${C.border}`,color:C.muted,fontWeight:500},
  };
  return <button onClick={onClick} disabled={disabled} style={{fontSize:12,padding:"8px 16px",borderRadius:10,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.45:1,fontFamily:F,letterSpacing:"0.01em",...styles[variant],...style}}>{children}</button>;
};

const Input = ({placeholder,value,onChange,type="text",style,rows}) =>
  rows
    ? <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows}
        style={{background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"9px 12px",borderRadius:8,fontSize:13,fontFamily:F,outline:"none",resize:"none",...style}}/>
    : <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={{background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"9px 12px",borderRadius:8,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark",...style}}/>;

const Select = ({value,onChange,children,style}) =>
  <select value={value} onChange={onChange} style={{background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"9px 12px",borderRadius:8,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark",...style}}>{children}</select>;

// Simple SVG bar chart
const BarChart = ({data,label,color=C.accent,height=120}) => {
  if(!data||data.length===0) return <div style={{color:C.muted,fontSize:12,textAlign:"center",padding:20}}>No data yet</div>;
  const max=Math.max(...data.map(d=>d.value),1);
  return (
    <div style={{width:"100%"}}>
      <div style={{display:"flex",alignItems:"flex-end",gap:4,height,paddingBottom:20,position:"relative"}}>
        {data.map((d,i)=>{
          const h=Math.max(4,(d.value/max)*(height-24));
          const col=d.value<75?C.danger:color;
          return (
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,height:"100%",justifyContent:"flex-end"}}>
              <div style={{fontSize:9,color:col,fontFamily:M,marginBottom:2}}>{d.value}%</div>
              <div style={{width:"100%",height:h,background:col,borderRadius:"4px 4px 0 0",opacity:0.85,transition:"height 0.4s ease"}}/>
              <div style={{fontSize:9,color:C.muted,marginTop:4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%",textAlign:"center"}}>{d.label}</div>
            </div>
          );
        })}
        <div style={{position:"absolute",bottom:20,left:0,right:0,borderTop:`1px dashed ${C.border}`,pointerEvents:"none"}}/>
      </div>
    </div>
  );
};

// ── Auth ──────────────────────────────────────────────────────────────────────
function Auth({onAuth}) {
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState(""); const [pw,setPw]=useState("");
  const [name,setName]=useState(""); const [college,setCollege]=useState("");
  const [program,setProgram]=useState(""); const [semester,setSemester]=useState("");
  const [loading,setLoading]=useState(false); const [err,setErr]=useState("");
  const [uid,setUid]=useState(null); const [msg,setMsg]=useState("");

  async function login() {
    setLoading(true);setErr("");
    const {data,error}=await supabase.auth.signInWithPassword({email,password:pw});
    if(error){setErr(error.message);setLoading(false);return;}
    onAuth(data.user);
  }
  async function signup() {
    setLoading(true);setErr("");
    const {data,error}=await supabase.auth.signUp({email,password:pw});
    if(error){setErr(error.message);setLoading(false);return;}
    const u=data.user;
    await supabase.from("profiles").upsert({id:u.id,name:email.split("@")[0],college:"",program:"BHMS",semester:""});
    setUid(u.id);setMode("setup");setLoading(false);
  }
  async function setup() {
    setLoading(true);setErr("");
    const {error}=await supabase.from("profiles").upsert({id:uid,name,college,program,semester});
    if(error){setErr(error.message);setLoading(false);return;}
    const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  setErr("Please sign up or log in again.");
  setLoading(false);
  return;
}

onAuth(user);
setLoading(false);
  }
  async function forgotPassword() {
    if(!email){setErr("Enter your email first");return;}
    setLoading(true);setErr("");
    const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin});
    if(error){setErr(error.message);}else{setMsg("Password reset email sent! Check your inbox.");}
    setLoading(false);
  }

  const inp={width:"100%",marginBottom:10};
  return (
    <div style={{minHeight:"100vh",minHeight:"100dvh",display:"flex",alignItems:"center",justifyContent:"center",background:C.bg,padding:20}}>
      <div style={{width:"100%",maxWidth:400,animation:"fadeUp 0.4s ease"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{width:52,height:52,background:C.accent,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:700,color:"#000",margin:"0 auto 12px"}}>S</div>
          <div style={{fontSize:22,fontWeight:700,letterSpacing:"-0.02em"}}>StudentOS</div>
          <div style={{fontSize:13,color:C.muted,marginTop:4}}>Your Academic Command Center</div>
        </div>
        <Card>
          {mode==="setup"?(
            <>
              <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>Set up your profile</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:20}}>Tell us about yourself</div>
              <Input placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} style={inp}/>
              <Input placeholder="College / University" value={college} onChange={e=>setCollege(e.target.value)} style={inp}/>
              <Input placeholder="Program (e.g. BHMS, MBBS)" value={program} onChange={e=>setProgram(e.target.value)} style={inp}/>
              <Input placeholder="Current Semester (e.g. 2nd)" value={semester} onChange={e=>setSemester(e.target.value)} style={{...inp,marginBottom:14}}/>
              {err&&<div style={{color:C.danger,fontSize:12,marginBottom:10}}>{err}</div>}
              <Btn onClick={setup} style={{width:"100%",padding:"13px 0",fontSize:14}}>{loading?"Setting up...":"Get Started →"}</Btn>
            </>
          ):(
            <>
              <div style={{display:"flex",gap:8,marginBottom:24}}>
                {["login","signup"].map(m=>(
                  <button key={m} onClick={()=>{setMode(m);setErr("");setMsg("");}} style={{flex:1,padding:"9px 0",background:mode===m?C.accent:"transparent",border:`1px solid ${mode===m?C.accent:C.border}`,color:mode===m?"#000":C.muted,fontSize:13,fontWeight:600,borderRadius:8,cursor:"pointer",fontFamily:F,textTransform:"capitalize"}}>
                    {m==="login"?"Log In":"Sign Up"}
                  </button>
                ))}
              </div>
              <Input type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} style={inp}/>
              <Input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} style={{...inp,marginBottom:6}}/>
              {mode==="login"&&<button onClick={forgotPassword} style={{background:"none",border:"none",color:C.muted,fontSize:12,cursor:"pointer",fontFamily:F,marginBottom:14,padding:0,textDecoration:"underline"}}>Forgot password?</button>}
              {err&&<div style={{color:C.danger,fontSize:12,marginBottom:10}}>{err}</div>}
              {msg&&<div style={{color:C.accentText,fontSize:12,marginBottom:10}}>{msg}</div>}
              <Btn onClick={mode==="login"?login:signup} style={{width:"100%",padding:"13px 0",fontSize:14,marginTop:mode==="login"?0:8}}>{loading?"Please wait...":mode==="login"?"Log In":"Create Account"}</Btn>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ── Nav Items ─────────────────────────────────────────────────────────────────
const NAV=[
  {id:"dashboard",icon:"⬡",label:"Dashboard"},
  {id:"attendance",icon:"◎",label:"Attendance"},
  {id:"assignments",icon:"◈",label:"Assignments"},
  {id:"exams",icon:"◷",label:"Exams"},
  {id:"performance",icon:"▲",label:"Performance"},
  {id:"study",icon:"📖",label:"Study"},
  {id:"ai",icon:"✦",label:"AI"},
  {id:"timetable",icon:"▦",label:"Timetable"},
  {id:"profile",icon:"◉",label:"Profile"},
];

// ── Desktop Sidebar ───────────────────────────────────────────────────────────
function Sidebar({active,onNav,profile,onLogout}) {
  const initials=profile?.name?profile.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase():"?";
  return (
    <div className="desktop-sidebar" style={{width:224,minHeight:"100vh",background:C.surface,borderRight:`1px solid ${C.border}`,flexDirection:"column",position:"sticky",top:0,height:"100vh",overflowY:"auto"}}>
      {/* Logo */}
      <div style={{padding:"24px 20px 18px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,background:`linear-gradient(135deg,${C.accent},#00C97A)`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:"#000",flexShrink:0,boxShadow:`0 4px 12px ${C.accent}40`}}>S</div>
          <div>
            <div style={{fontSize:14,fontWeight:800,letterSpacing:"-0.02em"}}>StudentOS</div>
            <div style={{fontSize:10,color:C.muted,letterSpacing:"0.04em",textTransform:"uppercase",marginTop:1}}>Academic OS</div>
          </div>
        </div>
      </div>
      {/* Nav items */}
      <nav style={{padding:"12px 10px",flex:1}}>
        {NAV.map(item=>{
          const isActive=active===item.id;
          return <button key={item.id} onClick={()=>onNav(item.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 12px",background:isActive?`${C.accent}15`:"transparent",border:`1px solid ${isActive?C.accent+"30":"transparent"}`,borderRadius:12,color:isActive?C.accent:C.muted,fontSize:13,fontWeight:isActive?600:400,cursor:"pointer",fontFamily:F,marginBottom:2,textAlign:"left",transition:"all 0.15s ease"}}>
            <span style={{fontSize:15,width:20,textAlign:"center"}}>{item.icon}</span>
            <span style={{flex:1}}>{item.label}</span>
            {isActive&&<span style={{width:5,height:5,background:C.accent,borderRadius:"50%",flexShrink:0,boxShadow:`0 0 6px ${C.accent}`}}/>}
          </button>;
        })}
      </nav>
      {/* Profile footer */}
      <div style={{padding:"14px 10px",borderTop:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:C.card,borderRadius:12,border:`1px solid ${C.border}`,marginBottom:10}}>
          <div style={{width:32,height:32,borderRadius:9,background:`linear-gradient(135deg,${C.accentDim},${C.card})`,border:`1px solid ${C.accent}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.accent,flexShrink:0}}>{initials}</div>
          <div style={{minWidth:0,flex:1}}>
            <div style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{profile?.name||"Student"}</div>
            <div style={{fontSize:10,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{profile?.semester||profile?.program||""}</div>
          </div>
        </div>
        <Btn onClick={onLogout} variant="danger" style={{width:"100%",padding:"8px 0",fontSize:12}}>Log Out</Btn>
      </div>
    </div>
  );
}

// ── Mobile Bottom Nav ─────────────────────────────────────────────────────────
function BottomNav({active,onNav}) {
  const [showMore,setShowMore]=useState(false);
  const mainNav=[
    {id:"dashboard",icon:"⬡",label:"Home"},
    {id:"attendance",icon:"◎",label:"Attend"},
    {id:"ai",icon:"✦",label:"AI"},
    {id:"profile",icon:"◉",label:"Profile"},
  ];
  const moreNav=[
    {id:"assignments",icon:"◈",label:"Assignments"},
    {id:"exams",icon:"◷",label:"Exams"},
    {id:"performance",icon:"▲",label:"Marks"},
    {id:"study",icon:"📖",label:"Study Guide"},
    {id:"timetable",icon:"▦",label:"Timetable"},
  ];
  const moreActive=moreNav.some(n=>n.id===active);
  return(
    <>
      {showMore&&(
        <div onClick={()=>setShowMore(false)} style={{position:"fixed",inset:0,background:"#00000080",zIndex:99,backdropFilter:"blur(4px)"}}/>
      )}
      {showMore&&(
        <div style={{position:"fixed",bottom:70,left:12,right:12,background:C.card,border:`1px solid ${C.border}`,borderRadius:20,zIndex:100,padding:"8px 0",animation:"fadeUp 0.2s ease",boxShadow:"0 8px 40px #00000060"}}>
          {moreNav.map(item=>{
            const isActive=active===item.id;
            return <button key={item.id} onClick={()=>{onNav(item.id);setShowMore(false);}} style={{display:"flex",alignItems:"center",gap:16,width:"100%",padding:"13px 20px",background:"none",border:"none",color:isActive?C.accent:C.text,cursor:"pointer",fontFamily:F,fontSize:14,fontWeight:isActive?600:400}}>
              <span style={{fontSize:18,width:24,textAlign:"center"}}>{item.icon}</span>
              <span style={{flex:1}}>{item.label}</span>
              {isActive&&<span style={{width:6,height:6,background:C.accent,borderRadius:"50%",boxShadow:`0 0 8px ${C.accent}`}}/>}
            </button>;
          })}
        </div>
      )}
      <div className="bottom-nav" style={{justifyContent:"space-around",alignItems:"center",paddingLeft:8,paddingRight:8}}>
        {mainNav.map(item=>{
          const isActive=active===item.id;
          return <button key={item.id} onClick={()=>{onNav(item.id);setShowMore(false);}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:isActive?`${C.accent}12`:"none",border:"none",borderRadius:12,color:isActive?C.accent:C.muted,cursor:"pointer",fontFamily:F,padding:"6px 14px",flex:1,margin:"0 2px"}}>
            <span style={{fontSize:18,lineHeight:1}}>{item.icon}</span>
            <span style={{fontSize:9,fontWeight:isActive?700:500,letterSpacing:"0.02em"}}>{item.label}</span>
          </button>;
        })}
        <button onClick={()=>setShowMore(!showMore)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:moreActive?`${C.accent}12`:"none",border:"none",borderRadius:12,color:moreActive?C.accent:C.muted,cursor:"pointer",fontFamily:F,padding:"6px 14px",flex:1,margin:"0 2px"}}>
          <span style={{fontSize:18,lineHeight:1,letterSpacing:2}}>•••</span>
          <span style={{fontSize:9,fontWeight:moreActive?700:500,letterSpacing:"0.02em"}}>More</span>
        </button>
      </div>
    </>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({subjects,assignments,exams,scores,profile,onNav}) {
  const avgAtt=subjects.length?Math.round(subjects.reduce((s,sub)=>{
    const total=sub.total||0; return s+att(sub.attended||0,total);
  },0)/subjects.length):0;
  const pending=assignments.filter(a=>a.status!=="submitted").length;
  const nextExam=exams.length?[...exams].sort((a,b)=>new Date(a.date)-new Date(b.date))[0]:null;
  const urgent=assignments.filter(a=>a.status!=="submitted"&&daysLeft(a.due)<=5).sort((a,b)=>daysLeft(a.due)-daysLeft(b.due));
  const lowAtt=subjects.filter(s=>att(s.attended||0,s.total||0)<75&&(s.total||0)>0);

  // performance summary
  const passedSubjects=scores.filter(s=>{
    const tp=s.theory_max>0?(s.theory_marks/s.theory_max)*100:100;
    const pp=s.practical_max>0?(s.practical_marks/s.practical_max)*100:100;
    return tp>=(s.theory_pass_pct||50)&&pp>=(s.practical_pass_pct||50);
  });

  const hour=new Date().getHours();
  const greet=hour<12?"Good morning":hour<17?"Good afternoon":"Good evening";
  const today=new Date().toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"});

  return (
    <div style={{animation:"fadeUp 0.25s ease"}}>

      {/* ── Hero greeting ── */}
      <div style={{background:`linear-gradient(135deg,${C.accentDim} 0%,${C.card} 60%)`,border:`1px solid ${C.accent}28`,borderRadius:22,padding:"22px 20px",marginBottom:18,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-28,right:-28,width:110,height:110,borderRadius:"50%",background:`${C.accent}07`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-20,right:12,width:70,height:70,borderRadius:"50%",background:`${C.accent}05`,pointerEvents:"none"}}/>
        <div style={{fontSize:11,color:C.accentText,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{today}</div>
        <div className="greeting" style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em",marginBottom:3}}>{greet}, {profile?.name?.split(" ")[0]||"Student"} 👋</div>
        <div style={{fontSize:12,color:C.muted}}>{profile?.program||""}{profile?.college?` · ${profile.college}`:""}</div>
        {(lowAtt.length>0||pending>0)&&(
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:14}}>
            {lowAtt.length>0&&<span style={{display:"inline-flex",alignItems:"center",gap:5,background:C.dangerDim,border:`1px solid ${C.danger}40`,color:C.danger,fontSize:10,fontWeight:700,padding:"4px 10px",borderRadius:20,letterSpacing:"0.03em"}}>⚠ {lowAtt.length} low attendance</span>}
            {pending>0&&<span style={{display:"inline-flex",alignItems:"center",gap:5,background:C.warnDim,border:`1px solid ${C.warn}40`,color:C.warn,fontSize:10,fontWeight:700,padding:"4px 10px",borderRadius:20,letterSpacing:"0.03em"}}>◷ {pending} pending</span>}
          </div>
        )}
      </div>

      {/* ── Stat cards ── */}
      <div className="grid-4" style={{marginBottom:18}}>
        {[
          {label:"Attendance",value:`${avgAtt}%`,sub:avgAtt>=75?"On track":"Below 75%",color:avgAtt>=75?C.accent:C.danger,bg:avgAtt>=75?C.accentDim:C.dangerDim,nav:"attendance"},
          {label:"Passed",value:`${passedSubjects.length}/${scores.length}`,sub:"subjects",color:C.purple,bg:C.purpleDim,nav:"performance"},
          {label:"Pending",value:pending,sub:"assignments",color:C.warn,bg:C.warnDim,nav:"assignments"},
          {label:"Next Exam",value:nextExam?`${Math.max(0,daysLeft(nextExam.date))}d`:"—",sub:nextExam?nextExam.subject.slice(0,12):"none",color:C.blue,bg:C.blueDim,nav:"exams"},
        ].map(s=>(
          <button key={s.label} onClick={()=>onNav(s.nav)} style={{background:s.bg,border:`1px solid ${s.color}20`,borderRadius:16,padding:"14px 12px",cursor:"pointer",textAlign:"left",fontFamily:F,transition:"transform 0.15s ease,box-shadow 0.15s ease"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 24px ${s.color}18`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
            <div className="stat-value" style={{fontSize:26,fontWeight:800,fontFamily:M,color:s.color,lineHeight:1,marginBottom:5}}>{s.value}</div>
            <div style={{fontSize:10,color:s.color,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:2}}>{s.label}</div>
            <div style={{fontSize:10,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.sub}</div>
          </button>
        ))}
      </div>

      {/* ── Alert cards ── */}
      <div className="grid-2" style={{marginBottom:16}}>
        {/* Urgent deadlines */}
        <Card style={{padding:0,overflow:"hidden"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:13,fontWeight:700}}>Urgent Deadlines</div>
            <button onClick={()=>onNav("assignments")} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",fontFamily:F}}>All →</button>
          </div>
          {urgent.length===0
            ?<div style={{padding:"24px 16px",textAlign:"center"}}>
              <div style={{fontSize:24,marginBottom:6}}>✓</div>
              <div style={{color:C.accentText,fontSize:13,fontWeight:500}}>All clear</div>
              <div style={{color:C.muted,fontSize:11,marginTop:3}}>No upcoming deadlines</div>
            </div>
            :urgent.slice(0,3).map(a=>{const d=daysLeft(a.due);return(
              <div key={a.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 16px",borderBottom:`1px solid ${C.border}`}}>
                <div style={{minWidth:0,flex:1,paddingRight:10}}>
                  <div style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:2}}>{a.title}</div>
                  <div style={{fontSize:10,color:C.muted}}>{a.subject}</div>
                </div>
                <div style={{flexShrink:0,background:d<=2?C.dangerDim:d<=4?C.warnDim:C.subtle,border:`1px solid ${d<=2?C.danger:d<=4?C.warn:C.border}30`,borderRadius:9,padding:"4px 8px",textAlign:"center",minWidth:40}}>
                  <div style={{fontSize:11,fontWeight:800,fontFamily:M,color:d<=2?C.danger:d<=4?C.warn:C.muted}}>{d===0?"Today":d<0?"Late":`${d}d`}</div>
                </div>
              </div>
            );})}
        </Card>

        {/* Attendance alerts */}
        <Card style={{padding:0,overflow:"hidden"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:13,fontWeight:700}}>Attendance Alerts</div>
            <button onClick={()=>onNav("attendance")} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",fontFamily:F}}>All →</button>
          </div>
          {lowAtt.length===0
            ?<div style={{padding:"24px 16px",textAlign:"center"}}>
              <div style={{fontSize:24,marginBottom:6}}>✓</div>
              <div style={{color:C.accentText,fontSize:13,fontWeight:500}}>All above 75%</div>
              <div style={{color:C.muted,fontSize:11,marginTop:3}}>Attendance looking good</div>
            </div>
            :lowAtt.map(s=>{const p=att(s.attended||0,s.total||0),needed=Math.ceil((0.75*(s.total||0)-(s.attended||0))/0.25);return(
              <div key={s.id} style={{padding:"11px 16px",borderBottom:`1px solid ${C.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <span style={{fontSize:12,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,paddingRight:8}}>{s.name}</span>
                  <span style={{fontFamily:M,fontSize:13,color:C.danger,fontWeight:800,flexShrink:0}}>{p}%</span>
                </div>
                <div style={{height:3,background:C.border,borderRadius:2,overflow:"hidden",marginBottom:5}}>
                  <div style={{height:"100%",width:`${p}%`,background:C.danger,borderRadius:2}}/>
                </div>
                <div style={{fontSize:10,color:C.muted}}>Need <span style={{color:C.warn,fontWeight:600}}>{needed} more</span> classes to reach 75%</div>
              </div>
            );})}
        </Card>
      </div>

      {/* ── Upcoming exams ── */}
      {exams.length>0&&(
        <Card style={{padding:0,overflow:"hidden",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:13,fontWeight:700}}>Upcoming Exams</div>
            <button onClick={()=>onNav("exams")} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",fontFamily:F}}>All →</button>
          </div>
          <div className="grid-4-exam" style={{padding:14}}>
            {[...exams].sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,4).map(e=>{
              const d=daysLeft(e.date),col=d<=7?C.danger:d<=14?C.warn:C.blue;
              return(
                <div key={e.id} style={{background:C.surface,borderRadius:14,padding:"13px 11px",border:`1px solid ${col}18`,position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:col,opacity:0.6}}/>
                  <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:5,marginTop:2}}>{e.type}</div>
                  <div style={{fontSize:11,fontWeight:600,marginBottom:8,lineHeight:1.3,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{e.subject}</div>
                  <div style={{fontFamily:M,fontSize:24,fontWeight:800,color:col,lineHeight:1}}>{Math.max(0,d)}</div>
                  <div style={{fontSize:9,color:C.muted,marginTop:2}}>days left</div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

// ── Study Guide ───────────────────────────────────────────────────────────────
const BHMS_TOPICS = {
  "Organon": ["Aphorisms 1-10","Aphorisms 11-20","Aphorisms 21-30","Philosophy of Homoeopathy","Vital Force","Disease Classification","Drug Proving","Posology","Case Taking","Miasms"],
  "Materia Medica": ["Aconitum Napellus","Belladonna","Bryonia Alba","Calcarea Carbonica","Lycopodium","Natrum Muriaticum","Nux Vomica","Pulsatilla","Rhus Toxicodendron","Sulphur"],
  "Pathology": ["Cell Injury","Inflammation","Repair & Regeneration","Circulatory Disturbances","Neoplasia","Microbiology Basics","Immunology","Parasitology","Haematology","Systemic Pathology"],
  "Gynaecology": ["Menstrual Disorders","Infections of Female Genital Tract","Endometriosis","Fibroid Uterus","Ovarian Tumours","Infertility","Antenatal Care","Labour","Postnatal Care","Obstetric Complications"],
  "Surgery": ["Wound Healing","Surgical Infections","Tumours","Fractures & Dislocations","ENT Diseases","Eye Diseases","Dental Surgery","Burn Management","Shock","Principles of Surgery"],
  "FMT": ["Forensic Medicine Basics","Medical Jurisprudence","Toxicology","Asphyxia","Injuries","Sexual Offences","Medical Ethics","Death & its Types","Exhumation","Medicolegal Reports"],
  "Repertory": ["Introduction to Repertory","Kent Repertory","Boger Boenninghausen","Synthesis Repertory","Repertorisation Methods","Mind Rubrics","Generals","Particulars","Case Analysis","Practical Repertorisation"],
  "POM": ["History Taking","Clinical Examination","Fever","Respiratory System","Cardiovascular System","GI System","Urinary System","Nervous System","Endocrine Disorders","Homoeopathic Prescribing"],
};

function StudyGuide({subjects,exams,userId}) {
  const [selSubject,setSelSubject]=useState("");
  const [topics,setTopics]=useState({});
  const [loading,setLoading]=useState(true);
  const [editingId,setEditingId]=useState(null);
  const [editText,setEditText]=useState("");
  const [newTopic,setNewTopic]=useState("");
  const [showAdd,setShowAdd]=useState(false);
  const [tab,setTab]=useState("topics");

  useEffect(()=>{
    loadTopics();
  },[userId]);

  async function loadTopics() {
    const {data}=await supabase.from("study_topics").select("*").eq("user_id",userId);
    if(data&&data.length>0){
      const grouped={};
      data.forEach(t=>{
        if(!grouped[t.subject]) grouped[t.subject]=[];
        grouped[t.subject].push(t);
      });
      setTopics(grouped);
      setSelSubject(prev=>prev||Object.keys(grouped)[0]||"");
    }
    setLoading(false);
  }

  async function seedDefaults() {
    const rows=[];
    Object.entries(BHMS_TOPICS).forEach(([sub,tlist])=>{
      tlist.forEach(t=>rows.push({user_id:userId,subject:sub,topic:t,done:false}));
    });
    const {data}=await supabase.from("study_topics").insert(rows).select();
    if(data){
      const grouped={};
      data.forEach(t=>{if(!grouped[t.subject])grouped[t.subject]=[];grouped[t.subject].push(t);});
      setTopics(grouped);
      setSelSubject(prev=>prev||Object.keys(grouped)[0]||"");
    }
  }

  async function toggleDone(t) {
    await supabase.from("study_topics").update({done:!t.done}).eq("id",t.id);
    setTopics(prev=>({...prev,[t.subject]:prev[t.subject].map(x=>x.id===t.id?{...x,done:!x.done}:x)}));
  }

  async function deleteTopic(t) {
    await supabase.from("study_topics").delete().eq("id",t.id);
    setTopics(prev=>({...prev,[t.subject]:prev[t.subject].filter(x=>x.id!==t.id)}));
  }

  async function addTopic() {
    if(!newTopic.trim()) return;
    const {data}=await supabase.from("study_topics").insert({user_id:userId,subject:selSubject,topic:newTopic.trim(),done:false}).select().single();
    if(data){setTopics(prev=>({...prev,[selSubject]:[...(prev[selSubject]||[]),data]}));}
    setNewTopic("");setShowAdd(false);
  }

  async function saveEdit(t) {
    if(!editText.trim()) return;
    await supabase.from("study_topics").update({topic:editText.trim()}).eq("id",t.id);
    setTopics(prev=>({...prev,[t.subject]:prev[t.subject].map(x=>x.id===t.id?{...x,topic:editText.trim()}:x)}));
    setEditingId(null);setEditText("");
  }

  const currentTopics=topics[selSubject]||[];
  const done=currentTopics.filter(t=>t.done).length;
  const pct=currentTopics.length?Math.round((done/currentTopics.length)*100):0;
  const upcomingExams=[...exams].filter(e=>daysLeft(e.date)>0).sort((a,b)=>new Date(a.date)-new Date(b.date));

  if(loading) return <div style={{textAlign:"center",padding:48,color:C.muted}}>Loading study guide...</div>;

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 className="page-header" style={{fontSize:16,fontWeight:700}}>Study Guide</h2>
        <div style={{display:"flex",gap:8}}>
          {["topics","planner"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?C.accent:C.card,border:`1px solid ${tab===t?C.accent:C.border}`,color:tab===t?"#000":C.muted,fontSize:11,fontWeight:600,padding:"5px 12px",borderRadius:8,cursor:"pointer",fontFamily:F,textTransform:"capitalize"}}>{t}</button>
          ))}
        </div>
      </div>

      {tab==="topics"&&<>
        {Object.keys(topics).length===0?(
          <Card style={{textAlign:"center",padding:48}}>
            <div style={{fontSize:32,marginBottom:12}}>📖</div>
            <div style={{fontSize:14,fontWeight:600,marginBottom:6}}>No study topics yet</div>
            <div style={{color:C.muted,fontSize:13,marginBottom:16}}>Add topics manually to start tracking your study progress.</div>
            <Btn onClick={()=>{setSelSubject(subjects?.[0]?.name||"");setShowAdd(true);}}>+ Add Topic</Btn>
          </Card>
        ):(
        <>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
          {Object.keys(topics).map(sub=>{
            const t=topics[sub]||[];
            const d=t.filter(tp=>tp.done).length;
            return <button key={sub} onClick={()=>setSelSubject(sub)} style={{background:selSubject===sub?C.accent:C.card,border:`1px solid ${selSubject===sub?C.accent:C.border}`,color:selSubject===sub?"#000":C.muted,fontSize:11,fontWeight:600,padding:"6px 12px",borderRadius:8,cursor:"pointer",fontFamily:F}}>
              {sub} {t.length>0&&<span style={{opacity:0.7}}>({d}/{t.length})</span>}
            </button>;
          })}
        </div>
        <Card style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:14,fontWeight:700}}>{selSubject}</div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{fontSize:12,color:pct===100?C.accent:C.muted,fontFamily:M,fontWeight:600}}>{done}/{currentTopics.length}</div>
              <Btn onClick={()=>setShowAdd(!showAdd)} style={{fontSize:11,padding:"4px 10px"}}>+ Add</Btn>
            </div>
          </div>
          <div style={{height:6,background:C.border,borderRadius:3,marginBottom:16,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:pct===100?C.accent:C.blue,borderRadius:3,transition:"width 0.4s ease"}}/>
          </div>
          {showAdd&&(
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <Input placeholder="New topic name" value={newTopic} onChange={e=>setNewTopic(e.target.value)} style={{flex:1}}/>
              <Btn onClick={addTopic}>Add</Btn>
              <Btn onClick={()=>setShowAdd(false)} variant="ghost">✕</Btn>
            </div>
          )}
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {currentTopics.map(topic=>(
              <div key={topic.id}>
                {editingId===topic.id?(
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <Input value={editText} onChange={e=>setEditText(e.target.value)} style={{flex:1}}/>
                    <Btn onClick={()=>saveEdit(topic)} style={{fontSize:11,padding:"5px 10px"}}>Save</Btn>
                    <Btn onClick={()=>setEditingId(null)} variant="ghost" style={{fontSize:11,padding:"5px 8px"}}>✕</Btn>
                  </div>
                ):(
                  <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:topic.done?C.accentDim:C.surface,borderRadius:10,border:`1px solid ${topic.done?C.accent+"44":C.border}`}}>
                    <div onClick={()=>toggleDone(topic)} style={{width:20,height:20,borderRadius:6,background:topic.done?C.accent:C.border,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:12,color:"#000",fontWeight:700,cursor:"pointer"}}>{topic.done?"✓":""}</div>
                    <span onClick={()=>toggleDone(topic)} style={{flex:1,fontSize:13,color:topic.done?C.accentText:C.text,textDecoration:topic.done?"line-through":"none",cursor:"pointer"}}>{topic.topic}</span>
                    <button onClick={()=>{setEditingId(topic.id);setEditText(topic.topic);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,padding:"2px 4px"}}>✎</button>
                    <button onClick={()=>deleteTopic(topic)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:16,padding:"2px 4px"}}>×</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
        </>
        )}
      </>}

      {tab==="planner"&&<>
        {upcomingExams.length===0?<Card style={{textAlign:"center",padding:48}}><div style={{fontSize:32,marginBottom:12}}>📅</div><div style={{color:C.muted,fontSize:14}}>No upcoming exams. Add exams to get a study plan!</div></Card>
        :<div style={{display:"flex",flexDirection:"column",gap:12}}>
          {upcomingExams.slice(0,5).map(e=>{
            const d=daysLeft(e.date);
            const subKey=Object.keys(topics).find(k=>e.subject.toLowerCase().includes(k.toLowerCase())||k.toLowerCase().includes(e.subject.toLowerCase()))||null;
            const subTopics=subKey?(topics[subKey]||[]):[];
            const pending=subTopics.filter(t=>!t.done);
            const hoursPerDay=pending.length>0&&d>0?Math.ceil((pending.length*0.5)/d):0;
            const urgency=d<=7?C.danger:d<=14?C.warn:C.blue;
            return <Card key={e.id} glow={urgency}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>{e.subject}</div>
                  <Badge color={urgency} bg={`${urgency}22`}>{e.type} · {e.date}</Badge>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:M,fontSize:28,fontWeight:700,color:urgency,lineHeight:1}}>{d}</div>
                  <div style={{fontSize:10,color:C.muted}}>days left</div>
                </div>
              </div>
              {subKey&&<>
                <div style={{fontSize:11,color:C.muted,marginBottom:8}}>{pending.length} topics pending · ~{hoursPerDay}h/day recommended</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {pending.slice(0,5).map(t=><span key={t.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 8px",fontSize:11,color:C.muted}}>{t.topic}</span>)}
                  {pending.length>5&&<span style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 8px",fontSize:11,color:C.muted}}>+{pending.length-5} more</span>}
                </div>
              </>}
            </Card>;
          })}
        </div>}
      </>}
    </div>
  );
}

// ── Attendance (date-based logging) ───────────────────────────────────────────
function Attendance({subjects,setSubjects,attLogs,setAttLogs,userId}) {
  const [showAdd,setShowAdd]=useState(false);
  const [newS,setNewS]=useState({name:"",code:""});
  const [duration,setDuration]=useState("overall");
  const [customFrom,setCustomFrom]=useState("");
  const [customTo,setCustomTo]=useState("");
const [editingSub,setEditingSub]=useState(null);
const [editVals,setEditVals]=useState({attended:"",total:""});
  // compute date range
  function getRange() {
    const now=new Date(); now.setHours(23,59,59,999);
    const from=new Date();
    if(duration==="weekly"){from.setDate(now.getDate()-7);}
    else if(duration==="monthly"){from.setMonth(now.getMonth()-1);}
    else if(duration==="quarterly"){from.setMonth(now.getMonth()-3);}
    else if(duration==="custom"&&customFrom&&customTo){return {from:new Date(customFrom),to:new Date(customTo)};}
    else{return null;} // overall
    from.setHours(0,0,0,0);
    return {from,to:now};
  }

  function subjectStats(sub) {
    const range=getRange();
    if(!range) return {attended:sub.attended||0,total:sub.total||0};
    const logs=attLogs.filter(l=>l.subject_id===sub.id);
    const filtered=logs.filter(l=>{const d=new Date(l.date);return d>=range.from&&d<=range.to;});
    return {attended:filtered.filter(l=>l.status==="present").length,total:filtered.length};
  }

  async function markClass(sub,status) {
    const today=new Date().toISOString().split("T")[0];
    const {data,error}=await supabase.from("attendance_log").insert({user_id:userId,subject_id:sub.id,date:today,status}).select().single();
    if(!error){
      setAttLogs(prev=>[...prev,data]);
      const updates={attended:(sub.attended||0)+(status==="present"?1:0),total:(sub.total||0)+1};
      await supabase.from("subjects").update(updates).eq("id",sub.id);
      setSubjects(prev=>prev.map(s=>s.id===sub.id?{...s,...updates}:s));
    }
  }

async function saveManualEdit(sub) {
  const attended=parseInt(editVals.attended)||0;
  const total=parseInt(editVals.total)||0;
  await supabase.from("subjects").update({attended,total}).eq("id",sub.id);
  setSubjects(prev=>prev.map(s=>s.id===sub.id?{...s,attended,total}:s));
  setEditingSub(null);
}  

  async function addSubject() {
    if(!newS.name) return;
    const color=SCOLS[subjects.length%SCOLS.length];
    const {data,error}=await supabase.from("subjects").insert({user_id:userId,...newS,attended:0,total:0,color}).select().single();
    if(!error){setSubjects(prev=>[...prev,data]);setNewS({name:"",code:""});setShowAdd(false);}
  }
  async function deleteSubject(id) {
    await supabase.from("subjects").delete().eq("id",id);
    await supabase.from("attendance_log").delete().eq("subject_id",id);
    setSubjects(prev=>prev.filter(s=>s.id!==id));
    setAttLogs(prev=>prev.filter(l=>l.subject_id!==id));
  }

  // build chart data for selected range per subject
  function buildChartData(sub) {
    const logs=attLogs.filter(l=>l.subject_id===sub.id);
    if(logs.length===0) return [];
    if(duration==="weekly"){
      const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
      return days.map((d,i)=>{
        const date=new Date(); date.setDate(date.getDate()-date.getDay()+i+1);
        const ds=date.toISOString().split("T")[0];
        const dayLogs=logs.filter(l=>l.date===ds);
        return {label:d,value:dayLogs.length>0?Math.round((dayLogs.filter(l=>l.status==="present").length/dayLogs.length)*100):0};
      });
    }
    if(duration==="monthly"||duration==="quarterly"){
      const weeks=duration==="monthly"?4:12;
      return Array.from({length:weeks},(_,i)=>{
        const to=new Date(); to.setDate(to.getDate()-i*7);
        const from=new Date(to); from.setDate(from.getDate()-6);
        const wLogs=logs.filter(l=>{const d=new Date(l.date);return d>=from&&d<=to;});
        return {label:`W${weeks-i}`,value:wLogs.length>0?Math.round((wLogs.filter(l=>l.status==="present").length/wLogs.length)*100):0};
      }).reverse();
    }
    return [];
  }

  const showChart=duration!=="overall"&&duration!=="custom";

  // Overall stats
  const totalAttended=subjects.reduce((s,sub)=>s+(subjectStats(sub).attended),0);
  const totalClasses=subjects.reduce((s,sub)=>s+(subjectStats(sub).total),0);
  const overallPct=att(totalAttended,totalClasses);

  return (
    <div style={{animation:"fadeUp 0.25s ease"}}>

      {/* ── Header ── */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h2 className="page-header" style={{fontSize:18,fontWeight:800,letterSpacing:"-0.02em"}}>Attendance</h2>
        <Btn onClick={()=>setShowAdd(!showAdd)} style={{borderRadius:10,padding:"8px 16px"}}>+ Subject</Btn>
      </div>

      {/* ── Overall summary bar ── */}
      {subjects.length>0&&(
        <div style={{background:overallPct>=75?C.accentDim:C.dangerDim,border:`1px solid ${overallPct>=75?C.accent:C.danger}28`,borderRadius:16,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",gap:16}}>
          <div style={{flex:1}}>
            <div style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Overall Attendance</div>
            <div style={{height:6,background:C.border,borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${overallPct}%`,background:overallPct>=75?C.accent:C.danger,borderRadius:3,transition:"width 0.5s ease"}}/>
            </div>
            <div style={{fontSize:11,color:C.muted,marginTop:4}}>{totalAttended} of {totalClasses} classes attended</div>
          </div>
          <div style={{fontFamily:M,fontSize:32,fontWeight:800,color:overallPct>=75?C.accent:C.danger,lineHeight:1,flexShrink:0}}>{overallPct}%</div>
        </div>
      )}

      {/* ── Duration pills ── */}
      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:2}}>
        {["overall","weekly","monthly","quarterly","custom"].map(d=>(
          <button key={d} onClick={()=>setDuration(d)} style={{flex:"0 0 auto",padding:"7px 16px",background:duration===d?C.accent:C.card,border:`1px solid ${duration===d?C.accent:C.border}`,color:duration===d?"#000":C.muted,fontSize:11,fontWeight:duration===d?700:500,borderRadius:20,cursor:"pointer",fontFamily:F,textTransform:"capitalize",whiteSpace:"nowrap",transition:"all 0.15s ease"}}>
            {d}
          </button>
        ))}
      </div>

      {/* Custom date inputs */}
      {duration==="custom"&&(
        <Card style={{marginBottom:14,background:C.surface,padding:14}}>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>From</div>
              <Input type="date" value={customFrom} onChange={e=>setCustomFrom(e.target.value)} style={{width:"100%"}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>To</div>
              <Input type="date" value={customTo} onChange={e=>setCustomTo(e.target.value)} style={{width:"100%"}}/>
            </div>
          </div>
        </Card>
      )}

      {/* Add subject form */}
      {showAdd&&(
        <Card style={{marginBottom:14,background:C.surface,padding:16}}>
          <div style={{fontSize:12,fontWeight:700,marginBottom:12,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em"}}>New Subject</div>
          <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap"}}>
            <Input placeholder="Subject name" value={newS.name} onChange={e=>setNewS(p=>({...p,name:e.target.value}))} style={{flex:"2 1 140px"}}/>
            <Input placeholder="Code (opt.)" value={newS.code} onChange={e=>setNewS(p=>({...p,code:e.target.value}))} style={{flex:"1 1 80px"}}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <Btn onClick={addSubject}>Add Subject</Btn>
            <Btn onClick={()=>setShowAdd(false)} variant="ghost">Cancel</Btn>
          </div>
        </Card>
      )}

      {/* Subject cards */}
      {subjects.length===0
        ?<Card style={{textAlign:"center",padding:52}}>
          <div style={{fontSize:36,marginBottom:12}}>📚</div>
          <div style={{fontSize:14,fontWeight:600,marginBottom:6}}>No subjects yet</div>
          <div style={{color:C.muted,fontSize:13}}>Add your first subject to start tracking attendance.</div>
        </Card>
        :<div style={{display:"flex",flexDirection:"column",gap:12}}>
          {subjects.map(sub=>{
            const {attended,total}=subjectStats(sub);
            const p=att(attended,total);
            const needed=p<75&&total>0?Math.ceil((0.75*total-attended)/0.25):0;
            const canMiss=p>=75&&total>0?Math.floor((attended-0.75*total)/0.75):0;
            const chartData=showChart?buildChartData(sub):[];
            const isEditing=editingSub===sub.id;
            const accentCol=sub.color||C.accent;

            return (
              <div key={sub.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,overflow:"hidden",boxShadow:"0 2px 12px #00000020",position:"relative"}}>
                {/* Color accent stripe */}
                <div style={{position:"absolute",top:0,left:0,bottom:0,width:3,background:accentCol,borderRadius:"18px 0 0 18px",opacity:0.8}}/>

                <div style={{padding:"16px 16px 14px 20px"}}>
                  {/* Top row */}
                  <div className="att-card" style={{alignItems:"flex-start"}}>
                    <div style={{flex:1,minWidth:0,paddingRight:12}}>
                      {/* Subject name + code */}
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                        <div style={{fontSize:15,fontWeight:700,letterSpacing:"-0.01em"}}>{sub.name}</div>
                        {sub.code&&<span style={{fontSize:10,fontFamily:M,color:C.muted,background:C.subtle,padding:"2px 7px",borderRadius:5}}>{sub.code}</span>}
                      </div>

                      {/* Class count */}
                      <div style={{fontSize:12,color:C.muted,marginBottom:8}}>
                        <span style={{fontFamily:M,fontWeight:600,color:C.text}}>{attended}</span>
                        <span> of </span>
                        <span style={{fontFamily:M,fontWeight:600,color:C.text}}>{total}</span>
                        <span> classes{duration!=="overall"&&<span style={{color:accentCol,marginLeft:4}}>({duration})</span>}</span>
                      </div>

                      {/* Status pill */}
                      {total>0&&(
                        p<75
                          ?<div style={{display:"inline-flex",alignItems:"center",gap:5,background:C.dangerDim,border:`1px solid ${C.danger}30`,borderRadius:20,padding:"4px 10px",marginBottom:10}}>
                            <span style={{fontSize:10,fontWeight:700,color:C.danger}}>⚠ Need {needed} more class{needed!==1?"es":""} for 75%</span>
                          </div>
                          :<div style={{display:"inline-flex",alignItems:"center",gap:5,background:C.accentDim,border:`1px solid ${C.accent}30`,borderRadius:20,padding:"4px 10px",marginBottom:10}}>
                            <span style={{fontSize:10,fontWeight:700,color:C.accentText}}>✓ Can miss {canMiss} more class{canMiss!==1?"es":""}</span>
                          </div>
                      )}
                      {total===0&&<div style={{marginBottom:10}}/>}

                      {/* Action buttons */}
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        <button onClick={()=>markClass(sub,"present")} style={{display:"inline-flex",alignItems:"center",gap:5,background:C.accentDim,border:`1px solid ${C.accent}50`,color:C.accent,fontSize:12,fontWeight:700,padding:"7px 14px",borderRadius:10,cursor:"pointer",fontFamily:F}}>
                          ✓ Present
                        </button>
                        <button onClick={()=>markClass(sub,"absent")} style={{display:"inline-flex",alignItems:"center",gap:5,background:C.dangerDim,border:`1px solid ${C.danger}50`,color:C.danger,fontSize:12,fontWeight:700,padding:"7px 14px",borderRadius:10,cursor:"pointer",fontFamily:F}}>
                          ✗ Absent
                        </button>
                        <button onClick={()=>{setEditingSub(isEditing?null:sub.id);setEditVals({attended:sub.attended||0,total:sub.total||0});}} style={{display:"inline-flex",alignItems:"center",gap:5,background:isEditing?C.blueDim:"transparent",border:`1px solid ${isEditing?C.blue:C.border}`,color:isEditing?C.blue:C.muted,fontSize:12,fontWeight:600,padding:"7px 12px",borderRadius:10,cursor:"pointer",fontFamily:F}}>
                          {isEditing?"✕ Close":"✎ Set"}
                        </button>
                        <button onClick={()=>deleteSubject(sub.id)} style={{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:18,lineHeight:1,padding:"4px 6px",marginLeft:"auto",borderRadius:8}}>×</button>
                      </div>
                    </div>

                    {/* Ring */}
                    <Ring p={p} size={72} stroke={5} color={accentCol}/>
                  </div>

                  {/* Manual entry panel */}
                  {isEditing&&(
                    <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.border}`,animation:"fadeIn 0.2s ease"}}>
                      <div style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>Set Manually</div>
                      <div style={{display:"flex",gap:10,alignItems:"flex-end",flexWrap:"wrap"}}>
                        <div style={{flex:1,minWidth:80}}>
                          <div style={{fontSize:11,color:C.muted,marginBottom:5}}>Classes Attended</div>
                          <Input type="number" value={editVals.attended} onChange={e=>setEditVals(p=>({...p,attended:e.target.value}))} style={{width:"100%",fontSize:16,fontFamily:M,fontWeight:600}}/>
                        </div>
                        <div style={{flex:1,minWidth:80}}>
                          <div style={{fontSize:11,color:C.muted,marginBottom:5}}>Total Classes</div>
                          <Input type="number" value={editVals.total} onChange={e=>setEditVals(p=>({...p,total:e.target.value}))} style={{width:"100%",fontSize:16,fontFamily:M,fontWeight:600}}/>
                        </div>
                        <Btn onClick={()=>saveManualEdit(sub)} style={{padding:"10px 18px",flexShrink:0}}>Save</Btn>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chart */}
                {showChart&&chartData.length>0&&(
                  <div style={{padding:"12px 20px 14px",borderTop:`1px solid ${C.border}`,background:C.surface}}>
                    <div style={{fontSize:10,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>{duration} trend</div>
                    <BarChart data={chartData} color={accentCol} height={80}/>
                  </div>
                )}
              </div>
            );
          })}
        </div>}
    </div>
  );
}

// ── Assignments ───────────────────────────────────────────────────────────────
function Assignments({assignments,setAssignments,userId}) {
  const [showAdd,setShowAdd]=useState(false);
  const [filter,setFilter]=useState("all");
  const [newA,setNewA]=useState({title:"",subject:"",due:"",priority:"medium"});
  const priCol={high:C.danger,medium:C.warn,low:C.accent};
  const statCol={pending:[C.warn,C.warnDim],"in-progress":[C.blue,C.blueDim],submitted:[C.accentText,C.accentDim]};
  const filtered=filter==="all"?assignments:assignments.filter(a=>a.status===filter);

  async function add() {
    if(!newA.title||!newA.due) return;
    const {data,error}=await supabase.from("assignments").insert({user_id:userId,...newA,status:"pending"}).select().single();
    if(!error){setAssignments(prev=>[...prev,data]);setNewA({title:"",subject:"",due:"",priority:"medium"});setShowAdd(false);}
  }
  async function updateStatus(id,status) {
    await supabase.from("assignments").update({status}).eq("id",id);
    setAssignments(prev=>prev.map(a=>a.id===id?{...a,status}:a));
  }
  async function del(id) {
    await supabase.from("assignments").delete().eq("id",id);
    setAssignments(prev=>prev.filter(a=>a.id!==id));
  }

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 className="page-header" style={{fontSize:16,fontWeight:700}}>Assignments</h2>
        <Btn onClick={()=>setShowAdd(!showAdd)}>+ Add</Btn>
      </div>
      {showAdd&&<Card style={{marginBottom:16,background:C.surface}}>
        <Input placeholder="Assignment title" value={newA.title} onChange={e=>setNewA(p=>({...p,title:e.target.value}))} style={{width:"100%",marginBottom:10}}/>
        <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
          <Input placeholder="Subject" value={newA.subject} onChange={e=>setNewA(p=>({...p,subject:e.target.value}))} style={{flex:"1 1 120px"}}/>
          <Input type="date" value={newA.due} onChange={e=>setNewA(p=>({...p,due:e.target.value}))} style={{flex:"1 1 120px"}}/>
        </div>
        <Select value={newA.priority} onChange={e=>setNewA(p=>({...p,priority:e.target.value}))} style={{width:"100%",marginBottom:10}}>
          <option value="high">High Priority</option><option value="medium">Medium Priority</option><option value="low">Low Priority</option>
        </Select>
        <div style={{display:"flex",gap:8}}><Btn onClick={add}>Add</Btn><Btn onClick={()=>setShowAdd(false)} variant="ghost">Cancel</Btn></div>
      </Card>}
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {["all","pending","in-progress","submitted"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?C.accent:C.card,border:`1px solid ${filter===f?C.accent:C.border}`,color:filter===f?"#000":C.muted,fontSize:11,fontWeight:600,padding:"5px 12px",borderRadius:8,cursor:"pointer",fontFamily:F,textTransform:"capitalize"}}>
            {f==="all"?`All (${assignments.length})`:f}
          </button>
        ))}
      </div>
      {filtered.length===0?<Card style={{textAlign:"center",padding:48}}><div style={{fontSize:32,marginBottom:12}}>✅</div><div style={{color:C.muted,fontSize:14}}>No assignments here!</div></Card>
        :<div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map(a=>{
            const d=daysLeft(a.due),[sc,sb]=statCol[a.status]||statCol.pending;
            return <Card key={a.id} style={{padding:14,position:"relative"}}>
              <button onClick={()=>del(a.id)} style={{position:"absolute",top:10,right:10,background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18}}>×</button>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:3,height:40,borderRadius:2,background:priCol[a.priority]||C.muted,flexShrink:0,marginTop:4}}/>
                <div style={{flex:1,minWidth:0,paddingRight:20}}>
                  <div style={{fontSize:14,fontWeight:500,color:a.status==="submitted"?C.muted:C.text,textDecoration:a.status==="submitted"?"line-through":"none",marginBottom:3}}>{a.title}</div>
                  <div style={{fontSize:11,color:C.muted,marginBottom:8}}>{a.subject} · Due {a.due}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    {a.status!=="submitted"&&<Badge color={d<=2?C.danger:d<=5?C.warn:C.muted} bg={d<=2?C.dangerDim:d<=5?C.warnDim:C.border}>{d<0?"overdue":d===0?"today":`${d}d left`}</Badge>}
                    <Select value={a.status} onChange={e=>updateStatus(a.id,e.target.value)} style={{background:sb,border:`1px solid ${sc}44`,color:sc,fontSize:11,fontWeight:600,padding:"4px 8px"}}>
                      <option value="pending">Pending</option><option value="in-progress">In Progress</option><option value="submitted">Submitted</option>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>;
          })}
        </div>}
    </div>
  );
}

// ── Exams ─────────────────────────────────────────────────────────────────────
function Exams({exams,setExams,userId}) {
  const [showAdd,setShowAdd]=useState(false);
  const [newE,setNewE]=useState({subject:"",date:"",time:"",type:"Midterm",hall:""});
const [customExamTypes,setCustomExamTypes]=useState([]);
  async function add() {
    if(!newE.subject||!newE.date) return;
    const {data,error}=await supabase.from("exams").insert({user_id:userId,...newE}).select().single();
    if(!error){setExams(prev=>[...prev,data]);setNewE({subject:"",date:"",time:"",type:"Midterm",hall:""});setShowAdd(false);}
  }
  async function del(id) {
    await supabase.from("exams").delete().eq("id",id);
    setExams(prev=>prev.filter(e=>e.id!==id));
  }

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 className="page-header" style={{fontSize:16,fontWeight:700}}>Exam Countdown</h2>
        <Btn onClick={()=>setShowAdd(!showAdd)}>+ Add Exam</Btn>
      </div>
      {showAdd&&<Card style={{marginBottom:16,background:C.surface}}>
        <Input placeholder="Subject" value={newE.subject} onChange={e=>setNewE(p=>({...p,subject:e.target.value}))} style={{width:"100%",marginBottom:10}}/>
        <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
          <Input type="date" value={newE.date} onChange={e=>setNewE(p=>({...p,date:e.target.value}))} style={{flex:"1 1 120px"}}/>
          <Input type="time" value={newE.time} onChange={e=>setNewE(p=>({...p,time:e.target.value}))} style={{flex:"1 1 120px"}}/>
        </div>
        <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
          <div style={{flex:"1 1 120px"}}>
  <Input placeholder="Exam type" value={newE.type} onChange={e=>setNewE(p=>({...p,type:e.target.value}))} style={{width:"100%"}}/>
  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:6}}>
    {["Midterm","Final","Quiz","Practical","Viva","Internal","Theory","Oral",...(customExamTypes||[])].map(t=>(
      <button key={t} onClick={()=>setNewE(p=>({...p,type:t}))} style={{background:newE.type===t?C.accent:C.surface,border:`1px solid ${newE.type===t?C.accent:C.border}`,color:newE.type===t?"#000":C.muted,fontSize:10,padding:"3px 8px",borderRadius:6,cursor:"pointer",fontFamily:F,display:"flex",alignItems:"center",gap:4}}>
        {t}{customExamTypes?.includes(t)&&<span onClick={e=>{e.stopPropagation();setCustomExamTypes(prev=>prev.filter(x=>x!==t));}} style={{color:C.danger,fontWeight:700}}>×</span>}
      </button>
    ))}
    {newE.type&&!["Midterm","Final","Quiz","Practical","Viva","Internal","Theory","Oral",...(customExamTypes||[])].includes(newE.type)&&(
      <button onClick={()=>setCustomExamTypes(prev=>[...(prev||[]),newE.type])} style={{background:C.accentDim,border:`1px solid ${C.accent}44`,color:C.accentText,fontSize:10,padding:"3px 8px",borderRadius:6,cursor:"pointer",fontFamily:F}}>
        + Save "{newE.type}"
      </button>
    )}
  </div>
</div>
          <Input placeholder="Hall / Room" value={newE.hall} onChange={e=>setNewE(p=>({...p,hall:e.target.value}))} style={{flex:"1 1 120px"}}/>
        </div>
        <div style={{display:"flex",gap:8}}><Btn onClick={add}>Add</Btn><Btn onClick={()=>setShowAdd(false)} variant="ghost">Cancel</Btn></div>
      </Card>}
      {exams.length===0?<Card style={{textAlign:"center",padding:48}}><div style={{fontSize:32,marginBottom:12}}>📅</div><div style={{color:C.muted,fontSize:14}}>No exams added yet.</div></Card>
        :<div className="grid-2">
          {[...exams].sort((a,b)=>new Date(a.date)-new Date(b.date)).map(e=>{
            const d=daysLeft(e.date),urg=d<=7?C.danger:d<=14?C.warn:C.blue,p=Math.max(0,Math.min(100,100-(d/30)*100));
            return <Card key={e.id} style={{overflow:"hidden",position:"relative"}} glow={urg}>
              <button onClick={()=>del(e.id)} style={{position:"absolute",top:12,right:12,background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,zIndex:1}}>×</button>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${urg} ${p}%,${C.border} ${p}%)`}}/>
              <div style={{marginTop:8}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,paddingRight:20}}>
                  <div><Badge color={urg} bg={`${urg}22`}>{e.type}</Badge><div style={{fontSize:15,fontWeight:700,marginTop:8}}>{e.subject}</div></div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:M,fontSize:32,fontWeight:700,color:urg,lineHeight:1}}>{d<0?0:d}</div>
                    <div style={{fontSize:11,color:C.muted}}>days left</div>
                  </div>
                </div>
                <div style={{display:"flex",gap:12,fontSize:11,color:C.muted,flexWrap:"wrap"}}>
                  <span>📅 {e.date}</span>{e.time&&<span>🕐 {e.time}</span>}{e.hall&&<span>📍 {e.hall}</span>}
                </div>
              </div>
            </Card>;
          })}
        </div>}
    </div>
  );
}

// ── Performance Tracker ───────────────────────────────────────────────────────
function Performance({scores,setScores,userId,profile,subjects}) {
  const [showAdd,setShowAdd]=useState(false);
  const [tab,setTab]=useState("subjects");
  const [saveError,setSaveError]=useState("");
  const [newS,setNewS]=useState({
    subject:"",exam_type:"Internal",
    theory_marks:"",theory_max:150,theory_pass_pct:50,
    practical_marks:"",practical_max:100,practical_pass_pct:50,
    internal_marks:"",internal_max:50,internal_pass_pct:50,
    date:new Date().toISOString().split("T")[0],notes:""
  });

  const isBHMS=(profile?.program||"").toUpperCase().includes("BHMS");

  function passStatus(s) {
    const tPct=s.theory_max>0?(s.theory_marks/s.theory_max)*100:null;
    const pPct=s.practical_max>0?(s.practical_marks/s.practical_max)*100:null;
    const iPct=s.internal_max>0?(s.internal_marks/s.internal_max)*100:null;
    const tPass=tPct===null||tPct>=(s.theory_pass_pct||50);
    const pPass=pPct===null||pPct>=(s.practical_pass_pct||50);
    const iPass=iPct===null||iPct>=(s.internal_pass_pct||50);
    return {tPass,pPass,iPass,overall:tPass&&pPass&&iPass,tPct,pPct,iPct};
  }

  async function add() {
    if(!newS.subject){ setSaveError("Please select or enter a subject"); return; }
    setSaveError("");
    const payload={
      user_id:userId,
      subject:newS.subject,
      exam_type:newS.exam_type,
      theory_marks:parseFloat(newS.theory_marks)||0,
      theory_max:parseFloat(newS.theory_max)||0,
      theory_pass_pct:parseFloat(newS.theory_pass_pct)||50,
      practical_marks:parseFloat(newS.practical_marks)||0,
      practical_max:parseFloat(newS.practical_max)||0,
      practical_pass_pct:parseFloat(newS.practical_pass_pct)||50,
      internal_marks:parseFloat(newS.internal_marks)||0,
      internal_max:parseFloat(newS.internal_max)||0,
      internal_pass_pct:parseFloat(newS.internal_pass_pct)||50,
      date:newS.date,
      notes:newS.notes,
    };
    const {data,error}=await supabase.from("scores").insert(payload).select().single();
    if(!error){
      setScores(prev=>[...prev,data]);
      setNewS({subject:"",exam_type:"Internal",theory_marks:"",theory_max:150,theory_pass_pct:50,practical_marks:"",practical_max:100,practical_pass_pct:50,internal_marks:"",internal_max:50,internal_pass_pct:50,date:new Date().toISOString().split("T")[0],notes:""});
      setShowAdd(false);
    }
  }
  async function del(id) {
    await supabase.from("scores").delete().eq("id",id);
    setScores(prev=>prev.filter(s=>s.id!==id));
  }

  const passed=scores.filter(s=>passStatus(s).overall).length;
  const failed=scores.filter(s=>!passStatus(s).overall).length;
  const avgTheory=scores.length?Math.round(scores.reduce((a,s)=>a+(s.theory_max>0?(s.theory_marks/s.theory_max)*100:0),0)/scores.length):0;
  const avgPractical=scores.filter(s=>s.practical_max>0).length?Math.round(scores.filter(s=>s.practical_max>0).reduce((a,s)=>a+(s.practical_marks/s.practical_max)*100,0)/scores.filter(s=>s.practical_max>0).length):0;

  const chartData=scores.map(s=>{
    const tPct=s.theory_max>0?Math.round((s.theory_marks/s.theory_max)*100):0;
    return {label:s.subject.slice(0,6),value:tPct};
  });

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 className="page-header" style={{fontSize:16,fontWeight:700}}>Performance</h2>
        <Btn onClick={()=>setShowAdd(!showAdd)}>+ Add Scores</Btn>
      </div>

      {/* Summary cards */}
      <div className="grid-4" style={{marginBottom:20}}>
        {[
          {label:"Passed",value:passed,color:C.accent,bg:C.accentDim},
          {label:"Failed",value:failed,color:C.danger,bg:C.dangerDim},
          {label:"Avg Theory",value:`${avgTheory}%`,color:C.blue,bg:C.blueDim},
          {label:"Avg Practical",value:`${avgPractical}%`,color:C.purple,bg:C.purpleDim},
        ].map(s=>(
          <Card key={s.label} style={{background:s.bg,border:`1px solid ${s.color}22`,padding:14}}>
            <div style={{fontSize:10,color:s.color,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:6}}>{s.label}</div>
            <div style={{fontSize:24,fontWeight:700,fontFamily:M,color:s.color}}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      {scores.length>0&&(
        <Card style={{marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Theory % by Subject</div>
          <BarChart data={chartData} color={C.blue} height={130}/>
        </Card>
      )}

      {/* Tabs */}
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {["subjects","all"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?C.accent:C.card,border:`1px solid ${tab===t?C.accent:C.border}`,color:tab===t?"#000":C.muted,fontSize:11,fontWeight:600,padding:"5px 14px",borderRadius:8,cursor:"pointer",fontFamily:F,textTransform:"capitalize"}}>
            {t==="subjects"?"By Subject":"All Records"}
          </button>
        ))}
      </div>

      {/* Add form */}
      {showAdd&&<Card style={{marginBottom:16,background:C.surface}}>
        <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Add Score Record</div>
        <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
          <div style={{flex:"1 1 140px"}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Subject *</div>
            {subjects && subjects.length > 0 ? (
              <select value={newS.subject} onChange={e=>setNewS(p=>({...p,subject:e.target.value}))}
                style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,color:C.text,padding:"10px 12px",borderRadius:8,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark"}}>
                <option value="">— Select subject —</option>
                {subjects.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            ) : (
              <Input placeholder="Type subject name" value={newS.subject} onChange={e=>setNewS(p=>({...p,subject:e.target.value}))} style={{width:"100%"}}/>
            )}
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}> <Input placeholder="Exam type (e.g. Internal, Midterm, Sessional 1...)" 
  value={newS.exam_type} 
  onChange={e=>setNewS(p=>({...p,exam_type:e.target.value}))} 
  style={{flex:"1 1 140px"}}
/>
          <Input type="date" value={newS.date} onChange={e=>setNewS(p=>({...p,date:e.target.value}))} style={{flex:"1 1 120px"}}/>
        </div>
        {/* Theory */}
        <div style={{background:C.bg,borderRadius:10,padding:12,marginBottom:10}}>
          <div style={{fontSize:11,color:C.blue,fontWeight:600,marginBottom:8,textTransform:"uppercase"}}>Theory</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:70}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Marks</div>
              <Input type="number" placeholder="0" value={newS.theory_marks} onChange={e=>setNewS(p=>({...p,theory_marks:e.target.value}))} style={{width:"100%"}}/>
            </div>
            <div style={{flex:1,minWidth:70}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Max {isBHMS&&<span style={{color:C.accent}}>(BHMS:150)</span>}</div>
              <Input type="number" placeholder="150" value={newS.theory_max} onChange={e=>setNewS(p=>({...p,theory_max:e.target.value}))} style={{width:"100%"}}/>
            </div>
            <div style={{flex:1,minWidth:70}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Pass%</div>
              <Input type="number" placeholder="50" value={newS.theory_pass_pct} onChange={e=>setNewS(p=>({...p,theory_pass_pct:e.target.value}))} style={{width:"100%"}}/>
            </div>
          </div>
        </div>
        {/* Practical */}
        <div style={{background:C.bg,borderRadius:10,padding:12,marginBottom:10}}>
          <div style={{fontSize:11,color:C.purple,fontWeight:600,marginBottom:8,textTransform:"uppercase"}}>Practical / Oral</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:70}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Marks</div>
              <Input type="number" placeholder="0" value={newS.practical_marks} onChange={e=>setNewS(p=>({...p,practical_marks:e.target.value}))} style={{width:"100%"}}/>
            </div>
            <div style={{flex:1,minWidth:70}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Max {isBHMS&&<span style={{color:C.accent}}>(BHMS:100)</span>}</div>
              <Input type="number" placeholder="100" value={newS.practical_max} onChange={e=>setNewS(p=>({...p,practical_max:e.target.value}))} style={{width:"100%"}}/>
            </div>
            <div style={{flex:1,minWidth:70}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Pass%</div>
              <Input type="number" placeholder="50" value={newS.practical_pass_pct} onChange={e=>setNewS(p=>({...p,practical_pass_pct:e.target.value}))} style={{width:"100%"}}/>
            </div>
          </div>
        </div>
        {/* Internal */}
        <div style={{background:C.bg,borderRadius:10,padding:12,marginBottom:10}}>
          <div style={{fontSize:11,color:C.warn,fontWeight:600,marginBottom:8,textTransform:"uppercase"}}>Internal Assessment</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:70}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Marks</div>
              <Input type="number" placeholder="0" value={newS.internal_marks} onChange={e=>setNewS(p=>({...p,internal_marks:e.target.value}))} style={{width:"100%"}}/>
            </div>
            <div style={{flex:1,minWidth:70}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Max {isBHMS&&<span style={{color:C.accent}}>(BHMS:50)</span>}</div>
              <Input type="number" placeholder="50" value={newS.internal_max} onChange={e=>setNewS(p=>({...p,internal_max:e.target.value}))} style={{width:"100%"}}/>
            </div>
            <div style={{flex:1,minWidth:70}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Pass%</div>
              <Input type="number" placeholder="50" value={newS.internal_pass_pct} onChange={e=>setNewS(p=>({...p,internal_pass_pct:e.target.value}))} style={{width:"100%"}}/>
            </div>
          </div>
        </div>
        <Input placeholder="Notes (optional)" value={newS.notes} onChange={e=>setNewS(p=>({...p,notes:e.target.value}))} style={{width:"100%",marginBottom:10}}/>
        {saveError&&<div style={{color:C.danger,fontSize:12,marginBottom:10}}>{saveError}</div>}
        <div style={{display:"flex",gap:8}}><Btn onClick={add}>Save</Btn><Btn onClick={()=>setShowAdd(false)} variant="ghost">Cancel</Btn></div>
      </Card>}

      {/* Records */}
      {scores.length===0?<Card style={{textAlign:"center",padding:48}}><div style={{fontSize:32,marginBottom:12}}>📊</div><div style={{color:C.muted,fontSize:14}}>No scores recorded yet.</div></Card>
        :<div style={{display:"flex",flexDirection:"column",gap:10}}>
          {scores.map(s=>{
            const {tPass,pPass,iPass,overall,tPct,pPct,iPct}=passStatus(s);
            return <Card key={s.id} style={{padding:14,position:"relative"}} glow={overall?C.accentDim:C.dangerDim}>
              <button onClick={()=>del(s.id)} style={{position:"absolute",top:10,right:10,background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18}}>×</button>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,paddingRight:20}}>
                <div>
                  <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{s.subject}</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    <Badge color={C.blue} bg={C.blueDim}>{s.exam_type}</Badge>
                    <Badge color={overall?C.accent:C.danger} bg={overall?C.accentDim:C.dangerDim}>{overall?"PASS":"FAIL"}</Badge>
                    {s.date&&<Badge>{s.date}</Badge>}
                  </div>
                </div>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {s.theory_max>0&&(
                  <div style={{flex:1,minWidth:80,background:C.bg,borderRadius:8,padding:"8px 10px",border:`1px solid ${tPass?C.accent+"33":C.danger+"33"}`}}>
                    <div style={{fontSize:10,color:C.blue,marginBottom:2,fontWeight:600}}>THEORY</div>
                    <div style={{fontFamily:M,fontSize:16,fontWeight:700,color:tPass?C.accent:C.danger}}>{s.theory_marks}/{s.theory_max}</div>
                    <div style={{fontSize:10,color:C.muted}}>{Math.round(tPct)}% · pass {s.theory_pass_pct}%</div>
                  </div>
                )}
                {s.practical_max>0&&(
                  <div style={{flex:1,minWidth:80,background:C.bg,borderRadius:8,padding:"8px 10px",border:`1px solid ${pPass?C.accent+"33":C.danger+"33"}`}}>
                    <div style={{fontSize:10,color:C.purple,marginBottom:2,fontWeight:600}}>PRACTICAL</div>
                    <div style={{fontFamily:M,fontSize:16,fontWeight:700,color:pPass?C.accent:C.danger}}>{s.practical_marks}/{s.practical_max}</div>
                    <div style={{fontSize:10,color:C.muted}}>{Math.round(pPct)}% · pass {s.practical_pass_pct}%</div>
                  </div>
                )}
                {s.internal_max>0&&(
                  <div style={{flex:1,minWidth:80,background:C.bg,borderRadius:8,padding:"8px 10px",border:`1px solid ${iPass?C.accent+"33":C.danger+"33"}`}}>
                    <div style={{fontSize:10,color:C.warn,marginBottom:2,fontWeight:600}}>INTERNAL</div>
                    <div style={{fontFamily:M,fontSize:16,fontWeight:700,color:iPass?C.accent:C.danger}}>{s.internal_marks}/{s.internal_max}</div>
                    <div style={{fontSize:10,color:C.muted}}>{Math.round(iPct)}% · pass {s.internal_pass_pct}%</div>
                  </div>
                )}
              </div>
              {s.notes&&<div style={{marginTop:8,fontSize:12,color:C.muted,fontStyle:"italic"}}>"{s.notes}"</div>}
            </Card>;
          })}
        </div>}
    </div>
  );
}

function AIChat({
  subjects,
  setSubjects,
  assignments,
  exams,
  scores,
  profile,
  attLogs,
  userId
}) {  const [conversations,setConversations]=useState([]);
  const [activeConv,setActiveConv]=useState(null);
  const [messages,setMessages]=useState([]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [showSidebar,setShowSidebar]=useState(true);
  const [editingTitle,setEditingTitle]=useState(null);
  const [newTitle,setNewTitle]=useState("");
  const [showArchived,setShowArchived]=useState(false);
  const bottomRef=useRef(null);


  useEffect(()=>{loadConversations();},[]);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages]);

  async function loadConversations() {
    const {data}=await supabase.from("ai_conversations").select("*").eq("user_id",userId).order("updated_at",{ascending:false});
    setConversations(data||[]);
  }

  async function loadMessages(convId) {
    const {data}=await supabase.from("ai_messages").select("*").eq("conversation_id",convId).order("created_at",{ascending:true});
    setMessages(data||[]);
  }

  async function newChat() {
    const {data,error}=await supabase.from("ai_conversations").insert({user_id:userId,title:"New Chat"}).select().single();
    if(!error){
      setConversations(prev=>[data,...prev]);
      setActiveConv(data);
      setMessages([]);
    }
  }

  async function selectConv(conv) {
    setActiveConv(conv);
    await loadMessages(conv.id);
  }

  async function deleteConv(id) {
    await supabase.from("ai_conversations").delete().eq("id",id);
    setConversations(prev=>prev.filter(c=>c.id!==id));
    if(activeConv?.id===id){setActiveConv(null);setMessages([]);}
  }

  async function archiveConv(id) {
    const conv=conversations.find(c=>c.id===id);
    await supabase.from("ai_conversations").update({archived:!conv.archived}).eq("id",id);
    setConversations(prev=>prev.map(c=>c.id===id?{...c,archived:!c.archived}:c));
  }

  async function renameConv(id,title) {
    await supabase.from("ai_conversations").update({title}).eq("id",id);
    setConversations(prev=>prev.map(c=>c.id===id?{...c,title}:c));
    setEditingTitle(null);
  }

  async function autoName(convId,firstMessage) {
    const title=firstMessage.slice(0,40)+(firstMessage.length>40?"...":"");
    await renameConv(convId,title);
  }

  function buildContext() {
    const avgAtt = subjects.length ? Math.round(subjects.reduce((s,sub) => s + att(sub.attended||0, sub.total||0), 0) / subjects.length) : 0;
    const lowAtt = subjects.filter(s => att(s.attended||0, s.total||0) < 75).map(s => `${s.name} (${att(s.attended||0, s.total||0)}%)`);
    const goodAtt = subjects.filter(s => att(s.attended||0, s.total||0) >= 75).map(s => `${s.name} (${att(s.attended||0, s.total||0)}%)`);
    const pending = assignments.filter(a => a.status !== "submitted");
    const submitted = assignments.filter(a => a.status === "submitted");
    const upcoming = exams.filter(e => daysLeft(e.date) >= 0).sort((a,b) => new Date(a.date) - new Date(b.date));
    const past = exams.filter(e => daysLeft(e.date) < 0);
    const subjectDetails = subjects.map(s => `  - ${s.name}: ${s.attended||0}/${s.total||0} classes attended (${att(s.attended||0, s.total||0)}%)${att(s.attended||0,s.total||0)<75?" ⚠ BELOW 75%":""}`).join("\n");

    // Get standard syllabus for this course+year from courseData
    const courseCategory = Object.keys(COURSES).find(cat => Object.keys(COURSES[cat]).includes(profile?.program));
    const syllabusSubjects = courseCategory && profile?.program && profile?.semester
      ? getCourseSubjects(courseCategory, profile.program, profile.semester)
      : [];
    const syllabusText = syllabusSubjects.length > 0
      ? `Standard syllabus subjects for ${profile?.program} ${profile?.semester}:\n${syllabusSubjects.map(s => `  - ${s}`).join("\n")}`
      : "";

    // Score summary
    const scoresSummary = scores.length > 0
      ? scores.map(s => {
          const tp = s.theory_max > 0 ? Math.round((s.theory_marks/s.theory_max)*100) : null;
          const pp = s.practical_max > 0 ? Math.round((s.practical_marks/s.practical_max)*100) : null;
          return `  - ${s.subject}: Theory ${tp !== null ? tp+"%" : "N/A"}, Practical ${pp !== null ? pp+"%" : "N/A"}`;
        }).join("\n")
      : "  No marks entered yet.";

    return `
You are an AI academic assistant inside StudentOS. You have full access to this student's academic data. Use it to give specific, personalized advice.

═══════════════════════════════════
STUDENT PROFILE
═══════════════════════════════════
Name: ${profile?.name || "Student"}
Course / Program: ${profile?.program || "Not specified"}
Current Year / Semester: ${profile?.semester || "Not specified"}
College: ${profile?.college || "Not specified"}

═══════════════════════════════════
OFFICIAL COURSE SYLLABUS (from courseData)
═══════════════════════════════════
${syllabusText || "Course not found in database — use only the subjects the student has added manually."}

This is the OFFICIAL standard syllabus for this course and year. Use this to:
- Suggest topics to study within each subject
- Identify if the student is missing any standard subjects
- Give subject-specific academic advice
- Create study plans based on the actual course curriculum

═══════════════════════════════════
ATTENDANCE (${avgAtt}% overall ${avgAtt < 75 ? "⚠ CRITICAL — BELOW 75%" : "✓ Good"})
═══════════════════════════════════
${subjects.length > 0 ? subjectDetails : "  No subjects added yet."}

Subjects below 75% (needs urgent attention): ${lowAtt.length > 0 ? lowAtt.join(", ") : "None — all good!"}
Subjects above 75% (safe): ${goodAtt.length > 0 ? goodAtt.join(", ") : "None yet"}

Attendance rules in India: Students need minimum 75% attendance to appear in university exams. Below 75% means the student may be detained.

═══════════════════════════════════
ASSIGNMENTS (${pending.length} pending, ${submitted.length} submitted)
═══════════════════════════════════
${pending.length > 0 ? pending.map(a => `  - ${a.title} [${a.subject}] — due ${a.due} (${daysLeft(a.due)} days left) — Status: ${a.status}`).join("\n") : "  No pending assignments."}

═══════════════════════════════════
UPCOMING EXAMS (${upcoming.length} scheduled)
═══════════════════════════════════
${upcoming.length > 0 ? upcoming.map(e => `  - ${e.subject} [${e.type}] on ${e.date} — ${daysLeft(e.date)} days left`).join("\n") : "  No upcoming exams."}
${past.length > 0 ? `Past exams: ${past.map(e => e.subject).join(", ")}` : ""}

═══════════════════════════════════
MARKS / PERFORMANCE
═══════════════════════════════════
${scoresSummary}

═══════════════════════════════════
YOUR BEHAVIOUR RULES
═══════════════════════════════════
1. ALWAYS use the student's real data above. Never invent subjects, scores, or attendance.
2. Use the OFFICIAL SYLLABUS to give topic-level advice (e.g. "In Anatomy, focus on the upper limb chapter for your BHMS 1st year").
3. When asked to create a study plan, use BOTH the official syllabus AND the student's current attendance/exam data.
4. Prioritise: upcoming exams → low attendance subjects → pending assignments.
5. If subjects are empty, say "No subjects added yet — go to Attendance tab to add them."
6. If course is not specified, ask the student to update their profile.
7. Keep responses concise, structured, and specific to this student's data.
8. You can explain any academic topic from the student's course syllabus.
9. For attendance calculations, use: attendance% = (attended/total)*100. Need 75% minimum.
10. If a student asks how many classes they can miss, calculate: floor((attended - 0.75*total) / 0.75).
`;
  }

  async function send() {
    if(!input.trim()||loading) return;
    if(!activeConv){await newChat();return;}
    
    const userText=input.trim();
    setInput("");
    
    const userMsg={role:"user",content:userText,conversation_id:activeConv.id,user_id:userId};
    const {data:savedUser}=await supabase.from("ai_messages").insert(userMsg).select().single();
    setMessages(prev=>[...prev,savedUser]);

    // Auto-name if first message
    if(messages.length===0&&activeConv.title==="New Chat"){
      autoName(activeConv.id,userText);
    }

    setLoading(true);

    // Build history for context
    const history=messages.map(m=>({
      role:m.role==="user"?"user":"assistant",
      content:m.content
    }));
    history.push({role:"user",content:userText});

    try {
      const res=await fetch(`https://mwzpfrroagrhuenpdclt.supabase.co/functions/v1/ai-chat`,{
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13enBmcnJvYWdyaHVlbnBkY2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzU5NDgsImV4cCI6MjA5NTU1MTk0OH0.1XaAfisI75Iafk_tvGRoQNXDXYTzR7Zqsowl2Fb_dM4`},
        body:JSON.stringify({message:userText,context:buildContext(),history}),
      });
      const data = await res.json();

try {
  const action = JSON.parse(data.reply);
console.log("ACTION =", action);
if(action.action === "add_subject"){

  const color = SCOLS[subjects.length % SCOLS.length];

  const { data:newSubject, error } = await supabase
    .from("subjects")
    .insert({
      user_id: userId,
      name: action.name,
      code: "",
      attended: 0,
      total: 0,
      color
    })
    .select()
    .single();

if(error){
  console.error(error);
  return;
}

setSubjects(prev => [...prev, newSubject]);
alert("Subject added: " + action.name);
console.log("NEW SUBJECT:", newSubject);
console.log("ERROR:", error);
  return;
}
if(action.action === "delete_subject"){

  const subject = subjects.find(
    s => s.name.toLowerCase() === action.name.toLowerCase()
  );

  if(subject){

    const { error } = await supabase
      .from("subjects")
      .delete()
      .eq("id", subject.id);

    if(!error){
      setSubjects(prev =>
        prev.filter(s => s.id !== subject.id)
      );

      alert("Subject deleted: " + action.name);
    }
  }

  return;
}
} catch(err) {}
try {
  const action = JSON.parse(data.reply);

  if(action.action === "add_subject"){

    const color = SCOLS[subjects.length % SCOLS.length];

    const { data:newSubject, error } = await supabase
      .from("subjects")
      .insert({
        user_id: userId,
        name: action.name,
        code: "",
        attended: 0,
        total: 0,
        color
      })
      .select()
      .single();

    if(!error){
      setSubjects(prev => [...prev, newSubject]);
      alert("Subject added: " + action.name);
    }

    return;
  }
} catch(err) {
  console.log("ACTION ERROR:", err);
}
if(data.reply){
        const aiMsg={role:"ai",content:data.reply,conversation_id:activeConv.id,user_id:userId};
        const {data:savedAi}=await supabase.from("ai_messages").insert(aiMsg).select().single();
        setMessages(prev=>[...prev,savedAi]);
        await supabase.from("ai_conversations").update({updated_at:new Date().toISOString()}).eq("id",activeConv.id);
        setConversations(prev=>prev.map(c=>c.id===activeConv.id?{...c,updated_at:new Date().toISOString()}:c));
      }
    } catch(e){
      setMessages(prev=>[...prev,{role:"ai",content:"Connection error.",id:"err"}]);
    }
    setLoading(false);
  }

  const activeConvs=conversations.filter(c=>!c.archived);
  const archivedConvs=conversations.filter(c=>c.archived);
  const quickPrompts=["Analyze my attendance","What should I study next?","Create a study plan","Explain a hard topic"];

  return (
    <div style={{animation:"fadeUp 0.25s ease",display:"flex",gap:0,height:"calc(100vh - 120px)",borderRadius:18,overflow:"hidden",border:`1px solid ${C.border}`,background:C.card}}>

      {/* ── Sidebar ── */}
      {showSidebar&&(
        <div style={{width:230,flexShrink:0,display:"flex",flexDirection:"column",background:C.surface,borderRight:`1px solid ${C.border}`}}>
          {/* Sidebar header */}
          <div style={{padding:"14px 12px 10px"}}>
            <button onClick={newChat} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"9px 0",background:`linear-gradient(135deg,${C.accent},#00C97A)`,border:"none",borderRadius:12,color:"#000",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:F,boxShadow:`0 4px 14px ${C.accent}30`}}>
              ✦ New Chat
            </button>
          </div>

          {/* Conversation list */}
          <div style={{flex:1,overflowY:"auto",padding:"0 8px 8px"}}>
            {activeConvs.length===0&&(
              <div style={{color:C.muted,fontSize:12,textAlign:"center",padding:"24px 12px",lineHeight:1.6}}>
                No conversations yet.<br/>Start a new chat above.
              </div>
            )}
            {activeConvs.map(conv=>{
              const isActive=activeConv?.id===conv.id;
              return (
                <div key={conv.id} onClick={()=>selectConv(conv)} style={{padding:"9px 10px",borderRadius:10,background:isActive?`${C.accent}12`:"transparent",border:`1px solid ${isActive?C.accent+"30":"transparent"}`,marginBottom:2,cursor:"pointer",transition:"all 0.12s ease"}}>
                  {editingTitle===conv.id?(
                    <input value={newTitle} onChange={e=>setNewTitle(e.target.value)}
                      onKeyDown={e=>{if(e.key==="Enter")renameConv(conv.id,newTitle);if(e.key==="Escape")setEditingTitle(null);}}
                      autoFocus onClick={e=>e.stopPropagation()}
                      style={{width:"100%",background:"transparent",border:"none",color:C.text,fontSize:12,fontFamily:F,outline:"none"}}/>
                  ):(
                    <div style={{fontSize:12,fontWeight:isActive?600:400,color:isActive?C.accent:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:5}}>{conv.title}</div>
                  )}
                  <div style={{display:"flex",gap:2}}>
                    <button onClick={e=>{e.stopPropagation();setEditingTitle(conv.id);setNewTitle(conv.title);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:11,padding:"2px 5px",borderRadius:5,fontFamily:F}}>✏</button>
                    <button onClick={e=>{e.stopPropagation();archiveConv(conv.id);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:11,padding:"2px 5px",borderRadius:5,fontFamily:F}}>▣</button>
                    <button onClick={e=>{e.stopPropagation();if(confirm("Delete this conversation?"))deleteConv(conv.id);}} style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:11,padding:"2px 5px",borderRadius:5,fontFamily:F}}>✕</button>
                  </div>
                </div>
              );
            })}

            {/* Archived section */}
            {archivedConvs.length>0&&(
              <div style={{marginTop:8}}>
                <button onClick={()=>setShowArchived(!showArchived)} style={{background:"none",border:"none",color:C.muted,fontSize:10,cursor:"pointer",fontFamily:F,padding:"6px 10px",width:"100%",textAlign:"left",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>
                  {showArchived?"▾":"▸"} Archived ({archivedConvs.length})
                </button>
                {showArchived&&archivedConvs.map(conv=>(
                  <div key={conv.id} onClick={()=>selectConv(conv)} style={{padding:"8px 10px",borderRadius:10,background:"transparent",border:`1px solid ${C.border}`,marginBottom:2,cursor:"pointer",opacity:0.55}}>
                    <div style={{fontSize:11,color:C.muted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:4}}>{conv.title}</div>
                    <div style={{display:"flex",gap:4}}>
                      <button onClick={e=>{e.stopPropagation();archiveConv(conv.id);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:10,fontFamily:F}}>↩ Restore</button>
                      <button onClick={e=>{e.stopPropagation();if(confirm("Delete?"))deleteConv(conv.id);}} style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:10,fontFamily:F}}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Chat area ── */}
      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>

        {/* Chat header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button onClick={()=>setShowSidebar(!showSidebar)} style={{background:C.surface,border:`1px solid ${C.border}`,color:C.muted,borderRadius:9,padding:"5px 9px",cursor:"pointer",fontSize:13,lineHeight:1}}>☰</button>
            <div>
              <div style={{fontSize:13,fontWeight:700,lineHeight:1.2}}>{activeConv?.title||"AI Assistant"}</div>
              <div style={{fontSize:10,color:C.muted,marginTop:1}}>Powered by Groq</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:C.accent,boxShadow:`0 0 8px ${C.accent}`,animation:"pulse 2s infinite"}}/>
            <span style={{fontSize:11,color:C.accentText,fontWeight:600}}>Online</span>
          </div>
        </div>

        {/* Messages / Empty state */}
        {!activeConv?(
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:24}}>
            <div style={{width:64,height:64,borderRadius:20,background:`linear-gradient(135deg,${C.accentDim},${C.card})`,border:`1px solid ${C.accent}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,boxShadow:`0 8px 24px ${C.accent}18`}}>✦</div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:16,fontWeight:700,marginBottom:6}}>AI Academic Assistant</div>
              <div style={{fontSize:13,color:C.muted,maxWidth:260,lineHeight:1.6}}>Ask about your attendance, get study plans, or explore any topic from your courses.</div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",maxWidth:380}}>
              {quickPrompts.map(q=>(
                <button key={q} onClick={async()=>{const {data}=await supabase.from("ai_conversations").insert({user_id:userId,title:"New Chat"}).select().single();if(data){setConversations(prev=>[data,...prev]);setActiveConv(data);setMessages([]);setInput(q);}}} style={{padding:"8px 16px",background:C.surface,border:`1px solid ${C.border}`,color:C.text,fontSize:12,borderRadius:20,cursor:"pointer",fontFamily:F,fontWeight:500}}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        ):(
          <>
            <div className="chat-messages" style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:10,padding:"16px",paddingBottom:16}}>
              {messages.length===0&&(
                <div style={{color:C.muted,fontSize:13,textAlign:"center",padding:"32px 0",lineHeight:1.6}}>
                  No messages yet.<br/>Send a message to start.
                </div>
              )}
              {messages.map((m,i)=>(
                <div key={m.id||i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",gap:10,alignItems:"flex-end"}}>
                  {m.role==="ai"&&(
                    <div style={{width:30,height:30,borderRadius:10,background:`linear-gradient(135deg,${C.accentDim},${C.card})`,border:`1px solid ${C.accent}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>✦</div>
                  )}
                  <div style={{maxWidth:"78%",padding:"10px 14px",borderRadius:m.role==="user"?"18px 18px 5px 18px":"18px 18px 18px 5px",background:m.role==="user"?`linear-gradient(135deg,${C.accent},#00C97A)`:C.surface,color:m.role==="user"?"#000":C.text,fontSize:13,lineHeight:1.65,border:m.role==="ai"?`1px solid ${C.border}`:"none",whiteSpace:"pre-wrap",fontWeight:m.role==="user"?500:400}}>
                    {m.content}
                  </div>
                  {m.role==="user"&&(
                    <div style={{width:30,height:30,borderRadius:10,background:C.subtle,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0,color:C.muted}}>U</div>
                  )}
                </div>
              ))}
              {loading&&(
                <div style={{display:"flex",alignItems:"flex-end",gap:10}}>
                  <div style={{width:30,height:30,borderRadius:10,background:`linear-gradient(135deg,${C.accentDim},${C.card})`,border:`1px solid ${C.accent}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>✦</div>
                  <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:"18px 18px 18px 5px",padding:"12px 16px"}}>
                    <div style={{display:"flex",gap:5,alignItems:"center"}}>
                      {[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:C.accent,animation:`blink 1.4s ${i*0.2}s infinite`}}/>)}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef}/>
            </div>

            {/* Input row */}
            <div className="chat-input-row" style={{flexShrink:0,padding:"10px 14px",borderTop:`1px solid ${C.border}`,background:C.card}}>
              <input
                placeholder="Ask anything about your studies..."
                value={input}
                onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
                style={{flex:1,background:C.surface,border:`1px solid ${C.border}`,color:C.text,padding:"11px 14px",borderRadius:12,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark",transition:"border-color 0.15s ease"}}
                onFocus={e=>e.target.style.borderColor=`${C.accent}50`}
                onBlur={e=>e.target.style.borderColor=C.border}
              />
              <button onClick={send} disabled={loading||!input.trim()} style={{flexShrink:0,width:42,height:42,borderRadius:12,background:input.trim()&&!loading?`linear-gradient(135deg,${C.accent},#00C97A)`:`${C.accent}20`,border:"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,cursor:loading||!input.trim()?"not-allowed":"pointer",opacity:loading||!input.trim()?0.4:1,transition:"all 0.15s ease"}}>
                {loading?"⋯":"➤"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Timetable ─────────────────────────────────────────────────────────────────
function Timetable({timetable,setTimetable,userId,subjects}) {
  const days=["Mon","Tue","Wed","Thu","Fri","Sat"];
  const todayKey=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date().getDay()];
  const [activeDay,setActiveDay]=useState(days.includes(todayKey)?todayKey:"Mon");
  const [showAdd,setShowAdd]=useState(false);
  const [newC,setNewC]=useState({subject:"",room:"",time:"",duration:1});
  const subCol=Object.fromEntries(subjects.map(s=>[s.name,s.color]));

  async function add() {
    if(!newC.subject||!newC.time) return;
    const {data,error}=await supabase.from("timetable").insert({user_id:userId,...newC,day:activeDay}).select().single();
    if(!error){setTimetable(prev=>({...prev,[activeDay]:[...(prev[activeDay]||[]),data]}));setNewC({subject:"",room:"",time:"",duration:1});setShowAdd(false);}
  }
  async function del(id) {
    await supabase.from("timetable").delete().eq("id",id);
    setTimetable(prev=>{const u={...prev};u[activeDay]=(u[activeDay]||[]).filter(c=>c.id!==id);return u;});
  }

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 className="page-header" style={{fontSize:16,fontWeight:700}}>Timetable</h2>
        <Btn onClick={()=>setShowAdd(!showAdd)}>+ Add Class</Btn>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto"}}>
        {days.map(d=>(
          <button key={d} onClick={()=>setActiveDay(d)} style={{flex:"1 0 auto",minWidth:48,padding:"10px 0",background:activeDay===d?C.accent:C.card,border:`1px solid ${activeDay===d?C.accent:C.border}`,color:activeDay===d?"#000":d===todayKey?C.accent:C.muted,fontSize:12,fontWeight:600,borderRadius:10,cursor:"pointer",fontFamily:F}}>
            {d}{d===todayKey&&<span style={{display:"block",fontSize:9,marginTop:2,opacity:0.7}}>today</span>}
          </button>
        ))}
      </div>
      {showAdd&&<Card style={{marginBottom:16,background:C.surface}}>
        <Input placeholder="Subject name" value={newC.subject} onChange={e=>setNewC(p=>({...p,subject:e.target.value}))} style={{width:"100%",marginBottom:10}}/>
        <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
          <Input type="time" value={newC.time} onChange={e=>setNewC(p=>({...p,time:e.target.value}))} style={{flex:"1 1 100px"}}/>
          <Input placeholder="Room" value={newC.room} onChange={e=>setNewC(p=>({...p,room:e.target.value}))} style={{flex:"1 1 100px"}}/>
        </div>
        <Select value={newC.duration} onChange={e=>setNewC(p=>({...p,duration:Number(e.target.value)}))} style={{width:"100%",marginBottom:10}}>
          {[1,2,3].map(d=><option key={d} value={d}>{d} hour{d>1?"s":""}</option>)}
        </Select>
        <div style={{display:"flex",gap:8}}><Btn onClick={add}>Add</Btn><Btn onClick={()=>setShowAdd(false)} variant="ghost">Cancel</Btn></div>
      </Card>}
      <div style={{position:"relative",paddingLeft:60}}>
        <div style={{position:"absolute",left:24,top:0,bottom:0,width:1,background:C.border}}/>
        {(timetable[activeDay]||[]).sort((a,b)=>a.time.localeCompare(b.time)).map((cls,i)=>(
          <div key={cls.id||i} style={{position:"relative",marginBottom:14}}>
            <div style={{position:"absolute",left:-46,top:4,fontSize:11,color:C.muted,fontFamily:M,width:40,textAlign:"right"}}>{cls.time}</div>
            <div style={{position:"absolute",left:-29,top:6,width:8,height:8,borderRadius:"50%",background:subCol[cls.subject]||C.accent,border:`2px solid ${C.bg}`}}/>
            <Card style={{padding:12,borderLeft:`3px solid ${subCol[cls.subject]||C.accent}`,position:"relative"}}>
              <button onClick={()=>del(cls.id)} style={{position:"absolute",top:8,right:8,background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:16}}>×</button>
              <div style={{fontSize:13,fontWeight:600,marginBottom:4,paddingRight:20}}>{cls.subject}</div>
              <div style={{display:"flex",gap:12,fontSize:11,color:C.muted}}>
                {cls.room&&<span>📍 {cls.room}</span>}<span>⏱ {cls.duration}h</span>
              </div>
            </Card>
          </div>
        ))}
        {(!timetable[activeDay]||timetable[activeDay].length===0)&&<div style={{color:C.muted,fontSize:14,padding:"40px 0",textAlign:"center"}}>No classes for {activeDay}</div>}
      </div>
    </div>
  );
}

// ── Profile ───────────────────────────────────────────────────────────────────
function Profile({profile,setProfile,userId,onLogout}) {
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState({name:profile?.name||"",college:profile?.college||"",program:profile?.program||"",semester:profile?.semester||""});
  const [loading,setLoading]=useState(false);
  const [showPrivacy,setShowPrivacy]=useState(false);
  const [offerSubjects,setOfferSubjects]=useState(false);
  const [addingSubjects,setAddingSubjects]=useState(false);

  async function save() {
    setLoading(true);
    await supabase.from("profiles").upsert({id:userId,...form});
    // If course or year changed, offer to auto-add subjects
    const courseChanged = form.program !== profile?.program || form.semester !== profile?.semester;
    setProfile(prev=>({...prev,...form}));
    setEditing(false);
    setLoading(false);
    if(courseChanged && form.program && form.semester) setOfferSubjects(true);
  }

  async function handleAddSubjects() {
    setAddingSubjects(true);
    const courseCategory = Object.keys(COURSES).find(cat => Object.keys(COURSES[cat]).includes(form.program));
    const newSubjects = courseCategory ? getCourseSubjects(courseCategory, form.program, form.semester) : [];
    if(newSubjects.length > 0) {
      const {data: existingSubs} = await supabase.from("subjects").select("name").eq("user_id", userId);
      const existingNames = (existingSubs||[]).map(s=>s.name.toLowerCase());
      const colors = ["#4FFFB0","#4FC3F7","#B39DDB","#FFB830","#FF5252","#81C784","#F48FB1","#80DEEA","#FFCC02","#FF8A65"];
      const rows = newSubjects.filter(n=>!existingNames.includes(n.toLowerCase())).map((name,i)=>({user_id:userId,name,code:"",attended:0,total:0,color:colors[i%colors.length]}));
      if(rows.length>0) await supabase.from("subjects").insert(rows);
    }
    setAddingSubjects(false);
    setOfferSubjects(false);
  }

  if(showPrivacy) return (
    <div style={{animation:"fadeUp 0.25s ease"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <button onClick={()=>setShowPrivacy(false)} style={{background:C.card,border:`1px solid ${C.border}`,color:C.muted,borderRadius:9,padding:"6px 12px",cursor:"pointer",fontFamily:F,fontSize:13}}>← Back</button>
        <h2 style={{fontSize:16,fontWeight:700}}>Privacy Policy</h2>
      </div>
      <Card style={{maxWidth:600}}>
        {[
          {t:"1. Data We Collect",b:"StudentOS collects your email address (for authentication), and academic data you enter: name, college, program, semester, subjects, attendance records, assignments, exams, marks, and timetable entries."},
          {t:"2. How We Use Your Data",b:"Your data is used solely to provide the StudentOS service — displaying your academic information, powering the AI assistant, and syncing across your devices. We do not sell or share your data with third parties."},
          {t:"3. Data Storage",b:"All data is stored securely on Supabase (supabase.com), a trusted cloud database platform. Your data is associated with your account and is not accessible to other users."},
          {t:"4. AI Assistant",b:"When you use the AI chat feature, your academic context (attendance, subjects, assignments) is sent to Groq's API to generate responses. No personally identifiable information beyond academic context is shared."},
          {t:"5. Data Deletion",b:"You can delete your account and all associated data at any time by contacting us. Logging out does not delete your data."},
          {t:"6. Children's Privacy",b:"StudentOS is intended for students aged 13 and above. We do not knowingly collect data from children under 13."},
          {t:"7. Changes to This Policy",b:"We may update this Privacy Policy from time to time. Continued use of the app after changes constitutes acceptance of the updated policy."},
          {t:"8. Contact",b:"For privacy-related questions, contact us through the StudentOS GitHub repository."},
        ].map(s=>(
          <div key={s.t} style={{marginBottom:18}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:5,color:C.accentText}}>{s.t}</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.7}}>{s.b}</div>
          </div>
        ))}
        <div style={{fontSize:11,color:C.muted,marginTop:8,paddingTop:16,borderTop:`1px solid ${C.border}`}}>Last updated: June 2026 · StudentOS v1.0</div>
      </Card>
    </div>
  );

  return (
    <div style={{animation:"fadeUp 0.25s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 className="page-header" style={{fontSize:16,fontWeight:700}}>My Profile</h2>
        {!editing&&<Btn onClick={()=>setEditing(true)}>Edit Profile</Btn>}
      </div>

      {/* Offer to add subjects after course change */}
      {offerSubjects&&(
        <div style={{background:C.accentDim,border:`1px solid ${C.accent}40`,borderRadius:14,padding:16,marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.accent,marginBottom:3}}>Course updated!</div>
            <div style={{fontSize:12,color:C.muted}}>Auto-add standard subjects for {form.program} {form.semester}?</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <Btn onClick={handleAddSubjects} style={{padding:"7px 14px"}}>{addingSubjects?"Adding...":"Add Subjects"}</Btn>
            <Btn onClick={()=>setOfferSubjects(false)} variant="ghost" style={{padding:"7px 12px"}}>Skip</Btn>
          </div>
        </div>
      )}

      <Card style={{maxWidth:500}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24,paddingBottom:24,borderBottom:`1px solid ${C.border}`}}>
          <div style={{width:64,height:64,borderRadius:16,background:C.accentDim,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:700,color:C.accent,flexShrink:0}}>
            {profile?.name?profile.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase():"?"}
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>{profile?.name||"Student"}</div>
            <div style={{fontSize:13,color:C.muted}}>{profile?.program||"—"}</div>
          </div>
        </div>
        {editing?(
          <div>
            {[{key:"name",label:"Full Name"},{key:"college",label:"College / University"},{key:"program",label:"Program / Course"},{key:"semester",label:"Current Year / Semester"}].map(f=>(
              <div key={f.key} style={{marginBottom:12}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em"}}>{f.label}</div>
                <Input value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} style={{width:"100%"}}/>
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:16}}>
              <Btn onClick={save}>{loading?"Saving...":"Save Changes"}</Btn>
              <Btn onClick={()=>setEditing(false)} variant="ghost">Cancel</Btn>
            </div>
          </div>
        ):(
          <div>
            {[{label:"College",value:profile?.college},{label:"Program",value:profile?.program},{label:"Year / Semester",value:profile?.semester}].map(f=>(
              <div key={f.label} style={{marginBottom:16}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>{f.label}</div>
                <div style={{fontSize:14,fontWeight:500}}>{f.value||"—"}</div>
              </div>
            ))}
            <div style={{marginTop:24,paddingTop:20,borderTop:`1px solid ${C.border}`}}>
              <div style={{fontSize:12,color:C.muted,marginBottom:12}}>AI powered by Groq · Data stored on Supabase</div>
              <button onClick={()=>setShowPrivacy(true)} style={{background:"none",border:"none",color:C.muted,fontSize:12,cursor:"pointer",fontFamily:F,textDecoration:"underline",marginBottom:12,display:"block"}}>Privacy Policy</button>
              <Btn onClick={onLogout} variant="danger" style={{width:"100%",padding:"10px 0",fontSize:13}}>Log Out</Btn>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ── Onboarding ────────────────────────────────────────────────────────────────
function Onboarding({userId, onComplete}) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [category, setCategory] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const courses = category ? getCourseNames(category) : [];
  const years = category && course ? getCourseYears(category, course) : [];
  const subjects = category && course && year ? getCourseSubjects(category, course, year) : [];

  async function finish() {
    if (!name.trim()) { setError("Please enter your name"); return; }
    setSaving(true);
    // Save profile
    await supabase.from("profiles").upsert({
      id: userId,
      name: name.trim(),
      college: college.trim(),
      program: course,
      semester: year,
    });
    // Auto-add subjects if selected — skip any that already exist
    if (subjects.length > 0) {
      const {data: existingSubs} = await supabase.from("subjects").select("name").eq("user_id", userId);
      const existingNames = (existingSubs || []).map(s => s.name.toLowerCase());
      const colors = ["#4FFFB0","#4FC3F7","#B39DDB","#FFB830","#FF5252","#81C784","#F48FB1","#80DEEA","#FFCC02","#FF8A65"];
      const rows = subjects
        .filter(name => !existingNames.includes(name.toLowerCase()))
        .map((name, i) => ({
          user_id: userId,
          name,
          code: "",
          attended: 0,
          total: 0,
          color: colors[i % colors.length],
        }));
      if (rows.length > 0) await supabase.from("subjects").insert(rows);
    }
    // Auto-add study topics if available for this course+year
    const topicRows = getAllTopicsForCourse(course, year);
    if (topicRows.length > 0) {
      const {data: existingTopics} = await supabase.from("study_topics").select("subject,topic").eq("user_id", userId);
      const existingKeys = (existingTopics || []).map(t => `${t.subject}::${t.topic}`.toLowerCase());
      const newTopicRows = topicRows
        .filter(t => !existingKeys.includes(`${t.subject}::${t.topic}`.toLowerCase()))
        .map(t => ({ user_id: userId, subject: t.subject, topic: t.topic, done: false }));
      if (newTopicRows.length > 0) await supabase.from("study_topics").insert(newTopicRows);
    }
    setSaving(false);
    onComplete();
  }

  return (
    <div style={{minHeight:"100vh",minHeight:"100dvh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{GS}</style>
      <div style={{width:"100%",maxWidth:480,animation:"fadeUp 0.3s ease"}}>

        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:56,height:56,background:`linear-gradient(135deg,${C.accent},#00C97A)`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:800,color:"#000",margin:"0 auto 14px",boxShadow:`0 8px 24px ${C.accent}30`}}>S</div>
          <div style={{fontSize:22,fontWeight:800,letterSpacing:"-0.03em",marginBottom:6}}>Welcome to StudentOS</div>
          <div style={{fontSize:13,color:C.muted}}>Let's set up your academic profile</div>
        </div>

        {/* Step indicators */}
        <div style={{display:"flex",gap:6,marginBottom:28,justifyContent:"center"}}>
          {[1,2,3].map(s=>(
            <div key={s} style={{height:4,width:60,borderRadius:2,background:step>=s?C.accent:C.border,transition:"background 0.3s ease"}}/>
          ))}
        </div>

        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:22,padding:24}}>

          {/* Step 1 — Personal Info */}
          {step===1&&(
            <div style={{animation:"fadeIn 0.2s ease"}}>
              <div style={{fontSize:12,color:C.accentText,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Step 1 of 3</div>
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Personal Details</div>
              <div style={{fontSize:13,color:C.muted,marginBottom:22}}>Tell us a bit about yourself</div>

              <div style={{marginBottom:14}}>
                <div style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Full Name *</div>
                <Input value={name} onChange={e=>{setName(e.target.value);setError("");}} placeholder="e.g. Aditi Sharma" style={{width:"100%"}}/>
              </div>
              <div style={{marginBottom:22}}>
                <div style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>College / University</div>
                <Input value={college} onChange={e=>setCollege(e.target.value)} placeholder="e.g. Delhi University" style={{width:"100%"}}/>
              </div>

              {error&&<div style={{color:C.danger,fontSize:12,marginBottom:12}}>{error}</div>}
              <Btn onClick={()=>{if(!name.trim()){setError("Please enter your name");return;}setStep(2);}} style={{width:"100%",padding:"12px 0",fontSize:14}}>Continue →</Btn>
            </div>
          )}

          {/* Step 2 — Course Selection */}
          {step===2&&(
            <div style={{animation:"fadeIn 0.2s ease"}}>
              <div style={{fontSize:12,color:C.accentText,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Step 2 of 3</div>
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Your Course</div>
              <div style={{fontSize:13,color:C.muted,marginBottom:22}}>We'll auto-add your subjects</div>

              <div style={{marginBottom:14}}>
                <div style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Course Category</div>
                <select value={category} onChange={e=>{setCategory(e.target.value);setCourse("");setYear("");}}
                  style={{width:"100%",background:C.surface,border:`1px solid ${C.border}`,color:C.text,padding:"10px 12px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark"}}>
                  <option value="">— Select category —</option>
                  {COURSE_CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {category&&(
                <div style={{marginBottom:14,animation:"fadeIn 0.2s ease"}}>
                  <div style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Course / Program</div>
                  <select value={course} onChange={e=>{setCourse(e.target.value);setYear("");}}
                    style={{width:"100%",background:C.surface,border:`1px solid ${C.border}`,color:C.text,padding:"10px 12px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark"}}>
                    <option value="">— Select course —</option>
                    {courses.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              )}

              {course&&(
                <div style={{marginBottom:22,animation:"fadeIn 0.2s ease"}}>
                  <div style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Current Year / Semester</div>
                  <select value={year} onChange={e=>setYear(e.target.value)}
                    style={{width:"100%",background:C.surface,border:`1px solid ${C.border}`,color:C.text,padding:"10px 12px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark"}}>
                    <option value="">— Select year —</option>
                    {years.map(y=><option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              )}

              <div style={{display:"flex",gap:8}}>
                <Btn onClick={()=>setStep(1)} variant="ghost" style={{flex:1,padding:"11px 0"}}>← Back</Btn>
                <Btn onClick={()=>setStep(3)} style={{flex:2,padding:"11px 0",fontSize:14}} disabled={!year&&course}>
                  {year ? "Preview Subjects →" : "Skip & Continue →"}
                </Btn>
              </div>
            </div>
          )}

          {/* Step 3 — Preview & Confirm */}
          {step===3&&(
            <div style={{animation:"fadeIn 0.2s ease"}}>
              <div style={{fontSize:12,color:C.accentText,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Step 3 of 3</div>
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>Confirm & Launch</div>
              <div style={{fontSize:13,color:C.muted,marginBottom:18}}>Review your setup before we get started</div>

              {/* Summary */}
              <div style={{background:C.surface,borderRadius:14,padding:16,marginBottom:16,border:`1px solid ${C.border}`}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  {[{l:"Name",v:name},{l:"College",v:college||"—"},{l:"Course",v:course||"Not selected"},{l:"Year",v:year||"—"}].map(item=>(
                    <div key={item.l}>
                      <div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:3}}>{item.l}</div>
                      <div style={{fontSize:13,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subjects preview */}
              {subjects.length>0?(
                <div style={{marginBottom:20}}>
                  <div style={{fontSize:11,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>
                    {subjects.length} subjects will be added automatically
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {subjects.map((s,i)=>(
                      <span key={i} style={{display:"inline-flex",alignItems:"center",background:C.accentDim,border:`1px solid ${C.accent}30`,color:C.accentText,fontSize:11,fontWeight:500,padding:"4px 10px",borderRadius:20}}>{s}</span>
                    ))}
                  </div>
                </div>
              ):(
                <div style={{marginBottom:20,padding:"14px 16px",background:C.surface,borderRadius:12,border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:13,color:C.muted}}>No course selected — you can add subjects manually from the Attendance tab.</div>
                </div>
              )}

              <div style={{display:"flex",gap:8}}>
                <Btn onClick={()=>setStep(2)} variant="ghost" style={{flex:1,padding:"11px 0"}}>← Back</Btn>
                <Btn onClick={finish} style={{flex:2,padding:"11px 0",fontSize:14}} disabled={saving}>
                  {saving?"Setting up...":"🚀 Launch StudentOS"}
                </Btn>
              </div>
            </div>
          )}
        </div>

        <div style={{textAlign:"center",marginTop:16,fontSize:11,color:C.muted}}>
          You can always update your profile later in Settings
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [user,setUser]=useState(null);
  const [profile,setProfile]=useState(null);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState("dashboard");
  const [subjects,setSubjects]=useState([]);
  const [assignments,setAssignments]=useState([]);
  const [exams,setExams]=useState([]);
  const [scores,setScores]=useState([]);
  const [timetable,setTimetable]=useState({});
  const [attLogs,setAttLogs]=useState([]);

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      if(session?.user) loadUser(session.user); else setLoading(false);
    });
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{
      if(session?.user) loadUser(session.user); else{setUser(null);setProfile(null);setLoading(false);}
    });
    return ()=>subscription.unsubscribe();
  },[]);

  async function loadUser(u) {
    setUser(u);
    const [pR,sR,aR,eR,scR,tR,alR]=await Promise.all([
      supabase.from("profiles").select("*").eq("id",u.id).single(),
      supabase.from("subjects").select("*").eq("user_id",u.id),
      supabase.from("assignments").select("*").eq("user_id",u.id),
      supabase.from("exams").select("*").eq("user_id",u.id),
      supabase.from("scores").select("*").eq("user_id",u.id),
      supabase.from("timetable").select("*").eq("user_id",u.id),
      supabase.from("attendance_log").select("*").eq("user_id",u.id),
    ]);
    setProfile(pR.data);
    setSubjects(sR.data||[]);
    setAssignments(aR.data||[]);
    setExams(eR.data||[]);
    setScores(scR.data||[]);
    setAttLogs(alR.data||[]);
    const tt={};(tR.data||[]).forEach(c=>{if(!tt[c.day])tt[c.day]=[];tt[c.day].push(c);});
    setTimetable(tt);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);setProfile(null);setSubjects([]);setAssignments([]);setExams([]);setScores([]);setTimetable({});setAttLogs([]);
  }

  if(loading) return(
    <div style={{minHeight:"100vh",minHeight:"100dvh",display:"flex",alignItems:"center",justifyContent:"center",background:C.bg}}>
      <div style={{textAlign:"center"}}>
        <div style={{width:52,height:52,background:C.accent,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:700,color:"#000",margin:"0 auto 16px",animation:"pulse 1.5s infinite"}}>S</div>
        <div style={{color:C.muted,fontSize:14}}>Loading StudentOS...</div>
      </div>
    </div>
  );

  if(!user) return <><style>{GS}</style><Auth onAuth={loadUser}/></>;

  // Show onboarding for new users who haven't set college or program yet
  // Show onboarding if: no college, no program, OR name looks auto-generated (contains @ or is the email prefix)
  const nameIsAutoGenerated = !profile?.name || profile.name.includes("@") || profile.name === user.email?.split("@")[0];
  const needsOnboarding = nameIsAutoGenerated || (!profile?.college && !profile?.program);
  if(needsOnboarding) return <Onboarding userId={user.id} onComplete={()=>loadUser(user)}/>;

  const views={
    dashboard:<Dashboard subjects={subjects} assignments={assignments} exams={exams} scores={scores} profile={profile} onNav={setPage}/>,
    attendance:<Attendance subjects={subjects} setSubjects={setSubjects} attLogs={attLogs} setAttLogs={setAttLogs} userId={user.id}/>,
    assignments:<Assignments assignments={assignments} setAssignments={setAssignments} userId={user.id}/>,
    exams:<Exams exams={exams} setExams={setExams} userId={user.id}/>,
    performance:<Performance scores={scores} setScores={setScores} userId={user.id} profile={profile} subjects={subjects}/>,
    study:<StudyGuide subjects={subjects} exams={exams} userId={user.id}/>,
ai:<AIChat
  subjects={subjects}
  setSubjects={setSubjects}
  assignments={assignments}
  exams={exams}
  scores={scores}
  profile={profile}
  attLogs={attLogs}
  userId={user.id}
/>,    timetable:<Timetable timetable={timetable} setTimetable={setTimetable} userId={user.id} subjects={subjects}/>,
    profile:<Profile profile={profile} setProfile={setProfile} userId={user.id} onLogout={logout}/>,
  };

  return(
    <>
      <style>{GS}</style>
      <div style={{display:"flex",minHeight:"100vh",minHeight:"100dvh",background:C.bg}}>
        <Sidebar active={page} onNav={setPage} profile={profile} onLogout={logout}/>
        <main className="main-content" style={{flex:1,padding:"32px 36px",overflowY:"auto",maxWidth:960}}>{views[page]}</main>
        <BottomNav active={page} onNav={setPage} onLogout={logout}/>
      </div>
    </>
  );
}
