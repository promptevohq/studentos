import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mwzpfrroagrhuenpdclt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13enBmcnJvYWdyaHVlbnBkY2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzU5NDgsImV4cCI6MjA5NTU1MTk0OH0.1XaAfisI75Iafk_tvGRoQNXDXYTzR7Zqsowl2Fb_dM4"
);

const C = {
  bg:"#0A0C10",surface:"#111318",card:"#161B24",border:"#1E2530",
  accent:"#4FFFB0",accentDim:"#1A3D2E",accentText:"#3DD68C",
  warn:"#FFB830",warnDim:"#3D2E0A",danger:"#FF5252",dangerDim:"#3D1010",
  blue:"#4FC3F7",blueDim:"#0D2233",purple:"#B39DDB",purpleDim:"#1E1833",
  text:"#E8EDF5",muted:"#6B7A99",
};
const F = "'DM Sans','Segoe UI',sans-serif";
const M = "'DM Mono','Fira Code',monospace";

const GS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{-webkit-text-size-adjust:100%;}
  body{background:#0A0C10;color:#E8EDF5;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#111318;}::-webkit-scrollbar-thumb{background:#1E2530;border-radius:2px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  input:-webkit-autofill{-webkit-box-shadow:0 0 0 30px #161B24 inset!important;-webkit-text-fill-color:#E8EDF5!important;}
  .desktop-sidebar{display:flex;}
  .bottom-nav{display:none;}
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
  .grid-4-exam{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
  .att-card{display:flex;gap:16px;align-items:center;}
  .chat-input-row{display:flex;gap:8px;align-items:flex-end;}
  @media(max-width:768px){
    .desktop-sidebar{display:none!important;}
    .bottom-nav{display:flex!important;position:fixed;bottom:0;left:0;right:0;background:#111318;border-top:1px solid #1E2530;z-index:100;padding:8px 0;padding-bottom:env(safe-area-inset-bottom,8px);}
    .main-content{padding:16px 16px 80px!important;max-width:100%!important;}
    .grid-2{grid-template-columns:1fr!important;}
    .grid-4{grid-template-columns:1fr 1fr!important;}
    .grid-4-exam{grid-template-columns:1fr 1fr!important;}
    .att-card{flex-direction:column;align-items:flex-start!important;}
    .page-header{font-size:18px!important;}
    .stat-value{font-size:22px!important;}
    .greeting{font-size:18px!important;}
    .chat-input-row{position:fixed;bottom:72px;left:0;right:0;padding:10px 12px;background:#111318;border-top:1px solid #1E2530;z-index:99;}
    .chat-messages{padding-bottom:130px!important;}
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

const Badge = ({color,bg,children}) => <span style={{display:"inline-flex",background:bg||C.border,color:color||C.muted,fontSize:11,fontWeight:600,letterSpacing:"0.04em",padding:"3px 8px",borderRadius:6,textTransform:"uppercase"}}>{children}</span>;

const Ring = ({p,size=64,stroke=5,color}) => {
  const r=(size-stroke*2)/2,circ=2*Math.PI*r,off=circ-(p/100)*circ;
  const col=color||(p>=75?C.accent:p>=60?C.warn:C.danger);
  return <svg width={size} height={size} style={{transform:"rotate(-90deg)",flexShrink:0}}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.6s ease"}}/>
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill={col} fontSize={size*0.22} fontWeight="700" fontFamily={M} style={{transform:"rotate(90deg)",transformOrigin:"center"}}>{p}%</text>
  </svg>;
};

const Card = ({children,style,glow,className}) => <div className={className} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20,boxShadow:glow?`0 0 30px ${glow}22`:"none",animation:"fadeUp 0.3s ease both",...style}}>{children}</div>;

const Btn = ({onClick,children,variant="primary",style,disabled}) => {
  const styles = {
    primary:{background:C.accent,border:"none",color:"#000",fontWeight:700},
    danger:{background:C.dangerDim,border:`1px solid ${C.danger}44`,color:C.danger,fontWeight:600},
    ghost:{background:"none",border:`1px solid ${C.border}`,color:C.muted,fontWeight:400},
  };
  return <button onClick={onClick} disabled={disabled} style={{fontSize:12,padding:"7px 14px",borderRadius:8,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.5:1,fontFamily:F,...styles[variant],...style}}>{children}</button>;
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
    const {data:{user}}=await supabase.auth.getUser();
    onAuth(user);
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
    <div className="desktop-sidebar" style={{width:220,minHeight:"100vh",background:C.surface,borderRight:`1px solid ${C.border}`,flexDirection:"column",position:"sticky",top:0,height:"100vh",overflowY:"auto"}}>
      <div style={{padding:"28px 24px 20px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,background:C.accent,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:"#000"}}>S</div>
          <div>
            <div style={{fontSize:15,fontWeight:700}}>StudentOS</div>
            <div style={{fontSize:10,color:C.muted,letterSpacing:"0.06em",textTransform:"uppercase"}}>Academic OS</div>
          </div>
        </div>
      </div>
      <nav style={{padding:"16px 12px",flex:1}}>
        {NAV.map(item=>{
          const isActive=active===item.id;
          return <button key={item.id} onClick={()=>onNav(item.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",background:isActive?C.accentDim:"transparent",border:"none",borderRadius:10,color:isActive?C.accent:C.muted,fontSize:13,fontWeight:isActive?600:400,cursor:"pointer",fontFamily:F,marginBottom:2,textAlign:"left"}}>
            <span style={{fontSize:16}}>{item.icon}</span>{item.label}
            {isActive&&<span style={{marginLeft:"auto",width:4,height:4,background:C.accent,borderRadius:"50%"}}/>}
          </button>;
        })}
      </nav>
      <div style={{padding:16,borderTop:`1px solid ${C.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:C.accentDim,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:C.accent}}>{initials}</div>
          <div>
            <div style={{fontSize:12,fontWeight:600}}>{profile?.name||"Student"}</div>
            <div style={{fontSize:10,color:C.muted}}>{profile?.semester||""}</div>
          </div>
        </div>
        <Btn onClick={onLogout} variant="danger" style={{width:"100%",padding:"7px 0"}}>Log Out</Btn>
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
        <div onClick={()=>setShowMore(false)} style={{position:"fixed",inset:0,background:"#00000066",zIndex:99}}/>
      )}
      {showMore&&(
        <div style={{position:"fixed",bottom:65,left:0,right:0,background:C.surface,borderTop:`1px solid ${C.border}`,zIndex:100,padding:"12px 0",animation:"fadeUp 0.2s ease"}}>
          {moreNav.map(item=>{
            const isActive=active===item.id;
            return <button key={item.id} onClick={()=>{onNav(item.id);setShowMore(false);}} style={{display:"flex",alignItems:"center",gap:16,width:"100%",padding:"14px 24px",background:"none",border:"none",color:isActive?C.accent:C.text,cursor:"pointer",fontFamily:F,fontSize:15,fontWeight:isActive?600:400,borderBottom:`1px solid ${C.border}`}}>
              <span style={{fontSize:20}}>{item.icon}</span>{item.label}
              {isActive&&<span style={{marginLeft:"auto",width:6,height:6,background:C.accent,borderRadius:"50%"}}/>}
            </button>;
          })}
        </div>
      )}
      <div className="bottom-nav" style={{justifyContent:"space-around",alignItems:"center"}}>
        {mainNav.map(item=>{
          const isActive=active===item.id;
          return <button key={item.id} onClick={()=>{onNav(item.id);setShowMore(false);}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",color:isActive?C.accent:C.muted,cursor:"pointer",fontFamily:F,padding:"4px 8px",minWidth:52,flex:1}}>
            <span style={{fontSize:20}}>{item.icon}</span>
            <span style={{fontSize:9,fontWeight:isActive?700:400}}>{item.label}</span>
          </button>;
        })}
        <button onClick={()=>setShowMore(!showMore)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",color:moreActive?C.accent:C.muted,cursor:"pointer",fontFamily:F,padding:"4px 8px",minWidth:52,flex:1}}>
          <span style={{fontSize:20}}>⋯</span>
          <span style={{fontSize:9,fontWeight:moreActive?700:400}}>More</span>
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

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <div style={{marginBottom:24}}>
        <div className="greeting" style={{fontSize:22,fontWeight:700,letterSpacing:"-0.03em"}}>{greet}, {profile?.name?.split(" ")[0]||"Student"} 👋</div>
        <div style={{fontSize:13,color:C.muted,marginTop:4}}>{profile?.program||""}{profile?.college?` · ${profile.college}`:""}</div>
      </div>
      <div className="grid-4" style={{marginBottom:20}}>
        {[
          {label:"Attendance",value:`${avgAtt}%`,color:avgAtt>=75?C.accent:C.danger,bg:avgAtt>=75?C.accentDim:C.dangerDim,icon:"◎",nav:"attendance"},
          {label:"Subjects Passed",value:`${passedSubjects.length}/${scores.length}`,color:C.purple,bg:C.purpleDim,icon:"▲",nav:"performance"},
          {label:"Pending",value:pending,color:C.warn,bg:C.warnDim,icon:"◷",nav:"assignments"},
          {label:"Next Exam",value:nextExam?`${daysLeft(nextExam.date)}d`:"—",color:C.blue,bg:C.blueDim,icon:"◈",nav:"exams"},
        ].map(s=>(
          <Card key={s.label} onClick={()=>onNav(s.nav)} style={{background:s.bg,border:`1px solid ${s.color}22`,padding:14,cursor:"pointer"}}>
            <div style={{fontSize:10,color:s.color,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:6}}>{s.icon} {s.label}</div>
            <div className="stat-value" style={{fontSize:24,fontWeight:700,fontFamily:M,color:s.color}}>{s.value}</div>
          </Card>
        ))}
      </div>
      <div className="grid-2" style={{marginBottom:16}}>
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <h2 style={{fontSize:14,fontWeight:700}}>Urgent Deadlines</h2>
            <Btn onClick={()=>onNav("assignments")} variant="ghost" style={{fontSize:11,padding:"4px 10px"}}>See all</Btn>
          </div>
          {urgent.length===0?<div style={{color:C.accentText,fontSize:13,padding:"16px 0",textAlign:"center"}}>✓ No urgent deadlines</div>
            :urgent.slice(0,3).map(a=>{const d=daysLeft(a.due);return(
              <div key={a.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                <div><div style={{fontSize:13,fontWeight:500,marginBottom:2}}>{a.title}</div><div style={{fontSize:11,color:C.muted}}>{a.subject}</div></div>
                <Badge color={d<=2?C.danger:d<=4?C.warn:C.muted} bg={d<=2?C.dangerDim:d<=4?C.warnDim:C.border}>{d===0?"TODAY":d<0?"OVERDUE":`${d}d`}</Badge>
              </div>
            );})}
        </Card>
        <Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <h2 style={{fontSize:14,fontWeight:700}}>Attendance Alerts</h2>
            <Btn onClick={()=>onNav("attendance")} variant="ghost" style={{fontSize:11,padding:"4px 10px"}}>See all</Btn>
          </div>
          {lowAtt.length===0?<div style={{color:C.accentText,fontSize:13,padding:"16px 0",textAlign:"center"}}>✓ All above 75%</div>
            :lowAtt.map(s=>{const p=att(s.attended||0,s.total||0),needed=Math.ceil((0.75*(s.total||0)-(s.attended||0))/0.25);return(
              <div key={s.id} style={{padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:13,fontWeight:500}}>{s.name}</span>
                  <span style={{fontFamily:M,fontSize:13,color:C.danger,fontWeight:700}}>{p}%</span>
                </div>
                <div style={{fontSize:11,color:C.muted}}>Need <span style={{color:C.warn}}>{needed} more</span> to reach 75%</div>
              </div>
            );})}
        </Card>
      </div>
      {exams.length>0&&<Card style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h2 style={{fontSize:14,fontWeight:700}}>Upcoming Exams</h2>
          <Btn onClick={()=>onNav("exams")} variant="ghost" style={{fontSize:11,padding:"4px 10px"}}>See all</Btn>
        </div>
        <div className="grid-4-exam">
          {[...exams].sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,4).map(e=>{const d=daysLeft(e.date);return(
            <div key={e.id} style={{background:C.surface,borderRadius:12,padding:12,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4,textTransform:"uppercase"}}>{e.type}</div>
              <div style={{fontSize:12,fontWeight:600,marginBottom:6}}>{e.subject}</div>
              <div style={{fontFamily:M,fontSize:20,fontWeight:700,color:d<=7?C.danger:d<=14?C.warn:C.blue}}>{d}d</div>
              <div style={{fontSize:10,color:C.muted,marginTop:4}}>{e.date}</div>
            </div>
          );})}
        </div>
      </Card>}
    </div>
  );
}

// ── Assignments ───────────────────────────────────────────────────────────────
function Assignments({assignments,setAssignments,userId}) {
  const [showAdd,setShowAdd]=useState(false);
  const [filter,setFilter]=useState("all");
  const [newA,setNewA]=useState({title:"",subject:"",due:"",priority:"medium"});
  const priCol={high:C.danger,medium:C.warn,low:C.accent};
  const priBg={high:C.dangerDim,medium:C.warnDim,low:C.accentDim};
  const statCol={pending:[C.warn,C.warnDim],"in-progress":[C.blue,C.blueDim],submitted:[C.accentText,C.accentDim]};
  const filtered=filter==="all"?assignments:assignments.filter(a=>a.status===filter);
  const pending=assignments.filter(a=>a.status!=="submitted").length;
  const overdue=assignments.filter(a=>a.status!=="submitted"&&daysLeft(a.due)<0).length;
  const submitted=assignments.filter(a=>a.status==="submitted").length;

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

  const filters=[
    {key:"all",label:`All (${assignments.length})`},
    {key:"pending",label:"Pending"},
    {key:"in-progress",label:"In Progress"},
    {key:"submitted",label:"Done"},
  ];

  return (
    <div style={{animation:"fadeUp 0.3s ease",maxWidth:900}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:20,fontWeight:800,letterSpacing:"-0.02em",marginBottom:2}}>Assignments</h2>
          <div style={{fontSize:13,color:C.muted}}>{pending} pending · {overdue>0?<span style={{color:C.danger}}>{overdue} overdue · </span>:""}{submitted} done</div>
        </div>
        <button onClick={()=>setShowAdd(!showAdd)} style={{
          background:showAdd?C.surface:C.accent,border:`1px solid ${showAdd?C.border:C.accent}`,
          color:showAdd?C.muted:"#000",padding:"9px 18px",borderRadius:12,fontSize:13,
          fontWeight:700,cursor:"pointer",fontFamily:F,transition:"all 0.2s ease",
        }}>{showAdd?"✕ Cancel":"+ Add"}</button>
      </div>

      {/* Stats strip */}
      {assignments.length>0&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
          {[
            {label:"Pending",value:pending,color:C.warn,bg:C.warnDim},
            {label:"Overdue",value:overdue,color:overdue>0?C.danger:C.muted,bg:overdue>0?C.dangerDim:C.card},
            {label:"Submitted",value:submitted,color:C.accent,bg:C.accentDim},
          ].map(s=>(
            <div key={s.label} style={{background:s.bg,border:`1px solid ${s.color}22`,borderRadius:14,padding:"12px 14px"}}>
              <div style={{fontFamily:M,fontSize:22,fontWeight:700,color:s.color,lineHeight:1,marginBottom:4}}>{s.value}</div>
              <div style={{fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      {showAdd&&(
        <div style={{background:C.surface,border:`1px solid ${C.accent}44`,borderRadius:16,padding:20,marginBottom:20,animation:"fadeUp 0.2s ease both"}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,color:C.accentText}}>New Assignment</div>
          <input placeholder="Assignment title *" value={newA.title} onChange={e=>setNewA(p=>({...p,title:e.target.value}))}
            style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",marginBottom:10}}/>
          <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
            <input placeholder="Subject" value={newA.subject} onChange={e=>setNewA(p=>({...p,subject:e.target.value}))}
              style={{flex:"1 1 120px",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none"}}/>
            <input type="date" value={newA.due} onChange={e=>setNewA(p=>({...p,due:e.target.value}))}
              style={{flex:"1 1 120px",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark"}}/>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            {["high","medium","low"].map(p=>(
              <button key={p} onClick={()=>setNewA(prev=>({...prev,priority:p}))} style={{
                flex:1,padding:"8px 0",background:newA.priority===p?priCol[p]:C.card,
                border:`1px solid ${newA.priority===p?priCol[p]:C.border}`,
                color:newA.priority===p?"#000":C.muted,borderRadius:10,fontSize:12,
                fontWeight:600,cursor:"pointer",fontFamily:F,textTransform:"capitalize",transition:"all 0.2s",
              }}>{p}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={add} style={{background:C.accent,border:"none",color:"#000",padding:"10px 20px",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F}}>Add Assignment</button>
            <button onClick={()=>setShowAdd(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"10px 16px",borderRadius:10,fontSize:13,cursor:"pointer",fontFamily:F}}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div style={{display:"flex",gap:4,marginBottom:20,padding:4,background:C.surface,borderRadius:14,border:`1px solid ${C.border}`,overflowX:"auto"}}>
        {filters.map(f=>(
          <button key={f.key} onClick={()=>setFilter(f.key)} style={{
            flex:"0 0 auto",padding:"7px 14px",background:filter===f.key?C.accent:"transparent",
            border:"none",color:filter===f.key?"#000":C.muted,fontSize:12,
            fontWeight:filter===f.key?700:500,borderRadius:10,cursor:"pointer",fontFamily:F,whiteSpace:"nowrap",transition:"all 0.2s",
          }}>{f.label}</button>
        ))}
      </div>

      {/* Assignment list */}
      {filtered.length===0
        ?<div style={{textAlign:"center",padding:"60px 20px",background:C.card,border:`1px solid ${C.border}`,borderRadius:20}}>
          <div style={{fontSize:48,marginBottom:16}}>✅</div>
          <div style={{fontSize:16,fontWeight:700,marginBottom:8}}>{filter==="all"?"No assignments yet":"Nothing here"}</div>
          <div style={{fontSize:13,color:C.muted,marginBottom:20}}>{filter==="all"?"Add your first assignment to get started":"No assignments in this category"}</div>
          {filter==="all"&&<button onClick={()=>setShowAdd(true)} style={{background:C.accent,border:"none",color:"#000",padding:"10px 24px",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F}}>Add Assignment</button>}
        </div>
        :<div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.map((a,idx)=>{
            const d=daysLeft(a.due);
            const[sc,sb]=statCol[a.status]||statCol.pending;
            const isOverdue=d<0&&a.status!=="submitted";
            const urgColor=isOverdue?C.danger:d===0?C.danger:d<=2?C.danger:d<=5?C.warn:C.muted;
            return(
              <div key={a.id} style={{
                background:C.card,border:`1px solid ${isOverdue?C.danger+"44":C.border}`,
                borderRadius:16,overflow:"hidden",animation:`fadeUp 0.3s ease ${idx*0.04}s both`,
                boxShadow:isOverdue?`0 0 20px ${C.danger}11`:"none",
              }}>
                <div style={{height:3,background:priCol[a.priority]||C.muted}}/>
                <div style={{padding:"14px 16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{
                        fontSize:14,fontWeight:600,marginBottom:4,
                        color:a.status==="submitted"?C.muted:C.text,
                        textDecoration:a.status==="submitted"?"line-through":"none",
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                      }}>{a.title}</div>
                      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                        {a.subject&&<span style={{fontSize:11,color:C.muted}}>{a.subject}</span>}
                        {a.subject&&a.due&&<span style={{color:C.border}}>·</span>}
                        {a.due&&<span style={{fontSize:11,color:urgColor,fontWeight:isOverdue||d<=2?700:400}}>
                          {isOverdue?`${Math.abs(d)}d overdue`:d===0?"Due today":d===1?"Due tomorrow":`Due in ${d}d`}
                        </span>}
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                      <select value={a.status} onChange={e=>updateStatus(a.id,e.target.value)} style={{
                        background:sb,border:`1px solid ${sc}44`,color:sc,
                        fontSize:11,fontWeight:600,padding:"5px 10px",borderRadius:8,
                        fontFamily:F,outline:"none",cursor:"pointer",
                      }}>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="submitted">Submitted</option>
                      </select>
                      <button onClick={()=>del(a.id)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,padding:"2px",lineHeight:1,transition:"color 0.2s"}}
                        onMouseEnter={e=>e.currentTarget.style.color=C.danger}
                        onMouseLeave={e=>e.currentTarget.style.color=C.muted}>×</button>
                    </div>
                  </div>
                </div>
              </div>
            );
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

  const sorted=[...exams].sort((a,b)=>new Date(a.date)-new Date(b.date));
  const upcoming=sorted.filter(e=>daysLeft(e.date)>=0);
  const past=sorted.filter(e=>daysLeft(e.date)<0);

  return (
    <div style={{animation:"fadeUp 0.3s ease",maxWidth:900}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:20,fontWeight:800,letterSpacing:"-0.02em",marginBottom:2}}>Exam Countdown</h2>
          <div style={{fontSize:13,color:C.muted}}>{upcoming.length} upcoming · {past.length} past</div>
        </div>
        <button onClick={()=>setShowAdd(!showAdd)} style={{
          background:showAdd?C.surface:C.accent,border:`1px solid ${showAdd?C.border:C.accent}`,
          color:showAdd?C.muted:"#000",padding:"9px 18px",borderRadius:12,fontSize:13,
          fontWeight:700,cursor:"pointer",fontFamily:F,transition:"all 0.2s ease",
        }}>{showAdd?"✕ Cancel":"+ Add Exam"}</button>
      </div>

      {/* Add form */}
      {showAdd&&(
        <div style={{background:C.surface,border:`1px solid ${C.accent}44`,borderRadius:16,padding:20,marginBottom:20,animation:"fadeUp 0.2s ease both"}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,color:C.accentText}}>New Exam</div>
          <input placeholder="Subject *" value={newE.subject} onChange={e=>setNewE(p=>({...p,subject:e.target.value}))}
            style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",marginBottom:10}}/>
          <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
            <input type="date" value={newE.date} onChange={e=>setNewE(p=>({...p,date:e.target.value}))}
              style={{flex:"1 1 120px",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark"}}/>
            <input type="time" value={newE.time} onChange={e=>setNewE(p=>({...p,time:e.target.value}))}
              style={{flex:"1 1 100px",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark"}}/>
            <input placeholder="Hall / Room" value={newE.hall} onChange={e=>setNewE(p=>({...p,hall:e.target.value}))}
              style={{flex:"1 1 100px",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none"}}/>
          </div>
          {/* Exam type */}
          <div style={{marginBottom:14}}>
            <input placeholder="Exam type" value={newE.type} onChange={e=>setNewE(p=>({...p,type:e.target.value}))}
              style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",marginBottom:8}}/>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {["Midterm","Final","Quiz","Practical","Viva","Internal","Theory","Oral",...(customExamTypes||[])].map(t=>(
                <button key={t} onClick={()=>setNewE(p=>({...p,type:t}))} style={{
                  background:newE.type===t?C.accent:C.card,border:`1px solid ${newE.type===t?C.accent:C.border}`,
                  color:newE.type===t?"#000":C.muted,fontSize:11,padding:"4px 10px",borderRadius:8,cursor:"pointer",fontFamily:F,
                  display:"flex",alignItems:"center",gap:4,transition:"all 0.15s",
                }}>
                  {t}
                  {customExamTypes?.includes(t)&&<span onClick={e=>{e.stopPropagation();setCustomExamTypes(prev=>prev.filter(x=>x!==t));}} style={{color:C.danger,fontWeight:700,marginLeft:2}}>×</span>}
                </button>
              ))}
              {newE.type&&!["Midterm","Final","Quiz","Practical","Viva","Internal","Theory","Oral",...(customExamTypes||[])].includes(newE.type)&&(
                <button onClick={()=>setCustomExamTypes(prev=>[...(prev||[]),newE.type])} style={{background:C.accentDim,border:`1px solid ${C.accent}44`,color:C.accentText,fontSize:11,padding:"4px 10px",borderRadius:8,cursor:"pointer",fontFamily:F}}>
                  + Save "{newE.type}"
                </button>
              )}
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={add} style={{background:C.accent,border:"none",color:"#000",padding:"10px 20px",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F}}>Add Exam</button>
            <button onClick={()=>setShowAdd(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"10px 16px",borderRadius:10,fontSize:13,cursor:"pointer",fontFamily:F}}>Cancel</button>
          </div>
        </div>
      )}

      {exams.length===0
        ?<div style={{textAlign:"center",padding:"60px 20px",background:C.card,border:`1px solid ${C.border}`,borderRadius:20}}>
          <div style={{fontSize:48,marginBottom:16}}>📅</div>
          <div style={{fontSize:16,fontWeight:700,marginBottom:8}}>No exams added yet</div>
          <div style={{fontSize:13,color:C.muted,marginBottom:20}}>Track your upcoming exams and never miss a deadline</div>
          <button onClick={()=>setShowAdd(true)} style={{background:C.accent,border:"none",color:"#000",padding:"10px 24px",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F}}>Add Exam</button>
        </div>
        :<div style={{display:"flex",flexDirection:"column",gap:12}}>
          {upcoming.length>0&&<div style={{fontSize:12,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Upcoming</div>}
          {upcoming.map((e,idx)=>{
            const d=daysLeft(e.date);
            const urg=d<=3?C.danger:d<=7?C.danger:d<=14?C.warn:C.blue;
            const urgBg=d<=7?C.dangerDim:d<=14?C.warnDim:C.blueDim;
            const pct=Math.max(0,Math.min(100,100-(d/60)*100));
            return(
              <div key={e.id} style={{
                background:C.card,border:`1px solid ${urg}33`,borderRadius:20,
                overflow:"hidden",animation:`fadeUp 0.3s ease ${idx*0.05}s both`,
                boxShadow:`0 4px 20px ${urg}11`,
              }}>
                <div style={{height:3,background:`linear-gradient(90deg,${urg} ${pct}%,${C.border} ${pct}%)`}}/>
                <div style={{padding:20}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1,minWidth:0,paddingRight:16}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                        <span style={{background:urgBg,border:`1px solid ${urg}44`,color:urg,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:6,textTransform:"uppercase",letterSpacing:"0.05em"}}>{e.type}</span>
                      </div>
                      <div style={{fontSize:16,fontWeight:700,marginBottom:8}}>{e.subject}</div>
                      <div style={{display:"flex",gap:14,fontSize:12,color:C.muted,flexWrap:"wrap"}}>
                        <span>📅 {e.date}</span>
                        {e.time&&<span>🕐 {e.time}</span>}
                        {e.hall&&<span>📍 {e.hall}</span>}
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flexShrink:0}}>
                      <div style={{
                        width:64,height:64,borderRadius:16,background:urgBg,
                        border:`2px solid ${urg}44`,display:"flex",flexDirection:"column",
                        alignItems:"center",justifyContent:"center",
                      }}>
                        <div style={{fontFamily:M,fontSize:22,fontWeight:800,color:urg,lineHeight:1}}>{d}</div>
                        <div style={{fontSize:9,color:C.muted,marginTop:2}}>days</div>
                      </div>
                      <button onClick={()=>del(e.id)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:12,fontFamily:F,padding:"2px"}}>remove</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {past.length>0&&(
            <>
              <div style={{fontSize:12,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginTop:8,marginBottom:4}}>Past</div>
              {past.map(e=>(
                <div key={e.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 16px",opacity:0.6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:2}}>{e.subject}</div>
                    <div style={{fontSize:11,color:C.muted}}>{e.type} · {e.date}</div>
                  </div>
                  <button onClick={()=>del(e.id)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18}}>×</button>
                </div>
              ))}
            </>
          )}
        </div>}
    </div>
  );
}

// ── Performance Tracker ───────────────────────────────────────────────────────
function Performance({scores,setScores,userId,profile}) {
  const [showAdd,setShowAdd]=useState(false);
  const [tab,setTab]=useState("subjects");
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
    if(!newS.subject) return;
    const payload={
      user_id:userId,subject:newS.subject,exam_type:newS.exam_type,
      theory_marks:parseFloat(newS.theory_marks)||0,theory_max:parseFloat(newS.theory_max)||0,theory_pass_pct:parseFloat(newS.theory_pass_pct)||50,
      practical_marks:parseFloat(newS.practical_marks)||0,practical_max:parseFloat(newS.practical_max)||0,practical_pass_pct:parseFloat(newS.practical_pass_pct)||50,
      internal_marks:parseFloat(newS.internal_marks)||0,internal_max:parseFloat(newS.internal_max)||0,internal_pass_pct:parseFloat(newS.internal_pass_pct)||50,
      date:newS.date,notes:newS.notes,
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
  const chartData=scores.map(s=>({label:s.subject.slice(0,6),value:s.theory_max>0?Math.round((s.theory_marks/s.theory_max)*100):0}));

  const SectionInput=({label,color,marks,onMarks,max,onMax,passPct,onPass,bhmsHint})=>(
    <div style={{background:C.bg,borderRadius:12,padding:14,marginBottom:10,border:`1px solid ${color}22`}}>
      <div style={{fontSize:11,color,fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>{label}</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {[
          {l:`Marks obtained`,v:marks,fn:onMarks,ph:"0"},
          {l:`Max ${bhmsHint?`(BHMS: ${bhmsHint})`:""}`,v:max,fn:onMax,ph:String(bhmsHint||"")},
          {l:"Pass %",v:passPct,fn:onPass,ph:"50"},
        ].map(f=>(
          <div key={f.l} style={{flex:"1 1 70px"}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:5}}>{f.l}</div>
            <input type="number" placeholder={f.ph} value={f.v} onChange={e=>f.fn(e.target.value)}
              style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"8px 10px",borderRadius:8,fontSize:13,fontFamily:M,fontWeight:600,outline:"none",textAlign:"center"}}/>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{animation:"fadeUp 0.3s ease",maxWidth:900}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:20,fontWeight:800,letterSpacing:"-0.02em",marginBottom:2}}>Performance</h2>
          <div style={{fontSize:13,color:C.muted}}>{scores.length} records · {passed} passed · {failed} failed</div>
        </div>
        <button onClick={()=>setShowAdd(!showAdd)} style={{
          background:showAdd?C.surface:C.accent,border:`1px solid ${showAdd?C.border:C.accent}`,
          color:showAdd?C.muted:"#000",padding:"9px 18px",borderRadius:12,fontSize:13,
          fontWeight:700,cursor:"pointer",fontFamily:F,transition:"all 0.2s ease",
        }}>{showAdd?"✕ Cancel":"+ Add Scores"}</button>
      </div>

      {/* Summary cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:20}}>
        {[
          {label:"Passed",value:passed,color:C.accent,bg:C.accentDim,icon:"✓"},
          {label:"Failed",value:failed,color:C.danger,bg:C.dangerDim,icon:"✗"},
          {label:"Avg Theory",value:`${avgTheory}%`,color:C.blue,bg:C.blueDim,icon:"T"},
          {label:"Avg Practical",value:`${avgPractical}%`,color:C.purple,bg:C.purpleDim,icon:"P"},
        ].map(s=>(
          <div key={s.label} style={{background:s.bg,border:`1px solid ${s.color}22`,borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:`${s.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:s.color,flexShrink:0}}>{s.icon}</div>
            <div>
              <div style={{fontFamily:M,fontSize:20,fontWeight:700,color:s.color,lineHeight:1}}>{s.value}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      {scores.length>0&&(
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20,marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>Theory % by Subject</div>
          <BarChart data={chartData} color={C.blue} height={120}/>
        </div>
      )}

      {/* Add form */}
      {showAdd&&(
        <div style={{background:C.surface,border:`1px solid ${C.accent}44`,borderRadius:16,padding:20,marginBottom:20,animation:"fadeUp 0.2s ease both"}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,color:C.accentText}}>Add Score Record</div>
          <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
            <input placeholder="Subject *" value={newS.subject} onChange={e=>setNewS(p=>({...p,subject:e.target.value}))}
              style={{flex:"2 1 140px",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none"}}/>
            <select value={["Internal","Midterm","Final","Practical","Viva"].includes(newS.exam_type)?newS.exam_type:"Custom"}
              onChange={e=>{if(e.target.value==="Custom")setNewS(p=>({...p,exam_type:""}));else setNewS(p=>({...p,exam_type:e.target.value}));}}
              style={{flex:"1 1 100px",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark"}}>
              <option>Internal</option><option>Midterm</option><option>Final</option><option>Practical</option><option>Viva</option><option value="Custom">Custom</option>
            </select>
            {!["Internal","Midterm","Final","Practical","Viva"].includes(newS.exam_type)&&(
              <input placeholder="Exam name" value={newS.exam_type} onChange={e=>setNewS(p=>({...p,exam_type:e.target.value}))}
                style={{flex:"2 1 140px",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none"}}/>
            )}
            <input type="date" value={newS.date} onChange={e=>setNewS(p=>({...p,date:e.target.value}))}
              style={{flex:"1 1 120px",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark"}}/>
          </div>
          <SectionInput label="Theory" color={C.blue} marks={newS.theory_marks} onMarks={v=>setNewS(p=>({...p,theory_marks:v}))} max={newS.theory_max} onMax={v=>setNewS(p=>({...p,theory_max:v}))} passPct={newS.theory_pass_pct} onPass={v=>setNewS(p=>({...p,theory_pass_pct:v}))} bhmsHint={isBHMS?150:null}/>
          <SectionInput label="Practical / Oral" color={C.purple} marks={newS.practical_marks} onMarks={v=>setNewS(p=>({...p,practical_marks:v}))} max={newS.practical_max} onMax={v=>setNewS(p=>({...p,practical_max:v}))} passPct={newS.practical_pass_pct} onPass={v=>setNewS(p=>({...p,practical_pass_pct:v}))} bhmsHint={isBHMS?100:null}/>
          <SectionInput label="Internal Assessment" color={C.warn} marks={newS.internal_marks} onMarks={v=>setNewS(p=>({...p,internal_marks:v}))} max={newS.internal_max} onMax={v=>setNewS(p=>({...p,internal_max:v}))} passPct={newS.internal_pass_pct} onPass={v=>setNewS(p=>({...p,internal_pass_pct:v}))} bhmsHint={isBHMS?50:null}/>
          <input placeholder="Notes (optional)" value={newS.notes} onChange={e=>setNewS(p=>({...p,notes:e.target.value}))}
            style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",marginBottom:14}}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={add} style={{background:C.accent,border:"none",color:"#000",padding:"10px 20px",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F}}>Save Record</button>
            <button onClick={()=>setShowAdd(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"10px 16px",borderRadius:10,fontSize:13,cursor:"pointer",fontFamily:F}}>Cancel</button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{display:"flex",gap:4,marginBottom:16,padding:4,background:C.surface,borderRadius:12,border:`1px solid ${C.border}`}}>
        {[{k:"subjects",l:"By Subject"},{k:"all",l:"All Records"}].map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"7px 0",background:tab===t.k?C.accent:"transparent",border:"none",color:tab===t.k?"#000":C.muted,fontSize:12,fontWeight:tab===t.k?700:500,borderRadius:9,cursor:"pointer",fontFamily:F,transition:"all 0.2s"}}>{t.l}</button>
        ))}
      </div>

      {/* Records */}
      {scores.length===0
        ?<div style={{textAlign:"center",padding:"60px 20px",background:C.card,border:`1px solid ${C.border}`,borderRadius:20}}>
          <div style={{fontSize:48,marginBottom:16}}>📊</div>
          <div style={{fontSize:16,fontWeight:700,marginBottom:8}}>No scores recorded yet</div>
          <div style={{fontSize:13,color:C.muted,marginBottom:20}}>Track your theory, practical and internal marks</div>
          <button onClick={()=>setShowAdd(true)} style={{background:C.accent,border:"none",color:"#000",padding:"10px 24px",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F}}>Add First Score</button>
        </div>
        :<div style={{display:"flex",flexDirection:"column",gap:12}}>
          {scores.map((s,idx)=>{
            const {tPass,pPass,iPass,overall,tPct,pPct,iPct}=passStatus(s);
            return(
              <div key={s.id} style={{
                background:C.card,border:`1px solid ${overall?C.accent+"22":C.danger+"22"}`,
                borderRadius:16,overflow:"hidden",animation:`fadeUp 0.3s ease ${idx*0.04}s both`,
              }}>
                <div style={{height:3,background:overall?C.accent:C.danger}}/>
                <div style={{padding:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div>
                      <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>{s.subject}</div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        <span style={{background:C.blueDim,border:`1px solid ${C.blue}33`,color:C.blue,fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:6}}>{s.exam_type}</span>
                        <span style={{background:overall?C.accentDim:C.dangerDim,border:`1px solid ${overall?C.accent+"33":C.danger+"33"}`,color:overall?C.accent:C.danger,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:6}}>{overall?"PASS":"FAIL"}</span>
                        {s.date&&<span style={{background:C.surface,color:C.muted,fontSize:10,padding:"2px 8px",borderRadius:6}}>{s.date}</span>}
                      </div>
                    </div>
                    <button onClick={()=>del(s.id)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,padding:"2px"}}
                      onMouseEnter={e=>e.currentTarget.style.color=C.danger}
                      onMouseLeave={e=>e.currentTarget.style.color=C.muted}>×</button>
                  </div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {s.theory_max>0&&(
                      <div style={{flex:"1 1 80px",background:C.bg,borderRadius:10,padding:"10px 12px",border:`1px solid ${tPass?C.accent+"33":C.danger+"33"}`}}>
                        <div style={{fontSize:10,color:C.blue,marginBottom:4,fontWeight:700,textTransform:"uppercase"}}>Theory</div>
                        <div style={{fontFamily:M,fontSize:16,fontWeight:700,color:tPass?C.accent:C.danger,marginBottom:2}}>{s.theory_marks}/{s.theory_max}</div>
                        <div style={{height:3,background:C.border,borderRadius:2,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${Math.min(tPct||0,100)}%`,background:tPass?C.accent:C.danger,borderRadius:2}}/>
                        </div>
                        <div style={{fontSize:10,color:C.muted,marginTop:3}}>{Math.round(tPct||0)}% · need {s.theory_pass_pct}%</div>
                      </div>
                    )}
                    {s.practical_max>0&&(
                      <div style={{flex:"1 1 80px",background:C.bg,borderRadius:10,padding:"10px 12px",border:`1px solid ${pPass?C.accent+"33":C.danger+"33"}`}}>
                        <div style={{fontSize:10,color:C.purple,marginBottom:4,fontWeight:700,textTransform:"uppercase"}}>Practical</div>
                        <div style={{fontFamily:M,fontSize:16,fontWeight:700,color:pPass?C.accent:C.danger,marginBottom:2}}>{s.practical_marks}/{s.practical_max}</div>
                        <div style={{height:3,background:C.border,borderRadius:2,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${Math.min(pPct||0,100)}%`,background:pPass?C.accent:C.danger,borderRadius:2}}/>
                        </div>
                        <div style={{fontSize:10,color:C.muted,marginTop:3}}>{Math.round(pPct||0)}% · need {s.practical_pass_pct}%</div>
                      </div>
                    )}
                    {s.internal_max>0&&(
                      <div style={{flex:"1 1 80px",background:C.bg,borderRadius:10,padding:"10px 12px",border:`1px solid ${iPass?C.accent+"33":C.danger+"33"}`}}>
                        <div style={{fontSize:10,color:C.warn,marginBottom:4,fontWeight:700,textTransform:"uppercase"}}>Internal</div>
                        <div style={{fontFamily:M,fontSize:16,fontWeight:700,color:iPass?C.accent:C.danger,marginBottom:2}}>{s.internal_marks}/{s.internal_max}</div>
                        <div style={{height:3,background:C.border,borderRadius:2,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${Math.min(iPct||0,100)}%`,background:iPass?C.accent:C.danger,borderRadius:2}}/>
                        </div>
                        <div style={{fontSize:10,color:C.muted,marginTop:3}}>{Math.round(iPct||0)}% · need {s.internal_pass_pct}%</div>
                      </div>
                    )}
                  </div>
                  {s.notes&&<div style={{marginTop:10,fontSize:12,color:C.muted,fontStyle:"italic",paddingTop:10,borderTop:`1px solid ${C.border}`}}>"{s.notes}"</div>}
                </div>
              </div>
            );
          })}
        </div>}
    </div>
  );
}

// ── AI Chat ───────────────────────────────────────────────────────────────────
function AIChat({subjects,assignments,exams,scores,profile,attLogs,userId}) {
  const [conversations,setConversations]=useState([]);
  const [activeConv,setActiveConv]=useState(null);
  const [messages,setMessages]=useState([]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [showSidebar,setShowSidebar]=useState(false);
  const [editingTitle,setEditingTitle]=useState(null);
  const [newTitle,setNewTitle]=useState("");
  const [showArchived,setShowArchived]=useState(false);
  const bottomRef=useRef(null);
  const inputRef=useRef(null);

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
    if(!error){setConversations(prev=>[data,...prev]);setActiveConv(data);setMessages([]);setShowSidebar(false);}
  }
  async function selectConv(conv) {
    setActiveConv(conv);await loadMessages(conv.id);setShowSidebar(false);
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
    const avgAtt=subjects.length?Math.round(subjects.reduce((s,sub)=>s+att(sub.attended||0,sub.total||0),0)/subjects.length):0;
    const lowAtt=subjects.filter(s=>att(s.attended||0,s.total||0)<75).map(s=>s.name);
    const pending=assignments.filter(a=>a.status!=="submitted").length;
    const upcoming=exams.filter(e=>daysLeft(e.date)>0).sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,3);
    const subjectDetails=subjects.map(s=>`${s.name}: ${s.attended||0}/${s.total||0} (${att(s.attended||0,s.total||0)}%)`).join(", ");
    return `You are an academic AI assistant built into StudentOS for BHMS students at Monark Homoeopathic Medical College, Vahelal (Monark University).

STUDENT: ${profile?.name||"Student"} | ${profile?.program||"BHMS"} | ${profile?.semester||"2nd"} Semester

ATTENDANCE: Average ${avgAtt}% ${avgAtt<75?"⚠️ BELOW 75%":"✓"}
Subjects: ${subjectDetails||"None"}
Low attendance: ${lowAtt.join(", ")||"None"}

ASSIGNMENTS: ${pending} pending
UPCOMING EXAMS: ${upcoming.map(e=>`${e.subject} in ${daysLeft(e.date)} days`).join(", ")||"None"}

BHMS 2nd YEAR: Organon, Materia Medica/HMM, Pathology, FMT, Surgery, Gynaecology, POM, Repertory, Yoga
NCH: Min 75% attendance. With medical cert: 65% may be condoned.
MARKING: Theory 150, Practical 100, Internal 50. Pass: 50% each.

Be concise, helpful, personalized. Use student data when relevant. Answer all academic questions freely.`;
  }

  async function send() {
    if(!input.trim()||loading) return;
    if(!activeConv){await newChat();return;}
    const userText=input.trim();
    setInput("");
    const userMsg={role:"user",content:userText,conversation_id:activeConv.id,user_id:userId};
    const {data:savedUser}=await supabase.from("ai_messages").insert(userMsg).select().single();
    setMessages(prev=>[...prev,savedUser]);
    if(messages.length===0&&activeConv.title==="New Chat") autoName(activeConv.id,userText);
    setLoading(true);
    const history=messages.map(m=>({role:m.role==="user"?"user":"assistant",content:m.content}));
    history.push({role:"user",content:userText});
    try {
      const res=await fetch(`https://mwzpfrroagrhuenpdclt.supabase.co/functions/v1/ai-chat`,{
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13enBmcnJvYWdyaHVlbnBkY2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzU5NDgsImV4cCI6MjA5NTU1MTk0OH0.1XaAfisI75Iafk_tvGRoQNXDXYTzR7Zqsowl2Fb_dM4`},
        body:JSON.stringify({message:userText,context:buildContext(),history}),
      });
      const data=await res.json();
      if(data.reply){
        const aiMsg={role:"ai",content:data.reply,conversation_id:activeConv.id,user_id:userId};
        const {data:savedAi}=await supabase.from("ai_messages").insert(aiMsg).select().single();
        setMessages(prev=>[...prev,savedAi]);
        await supabase.from("ai_conversations").update({updated_at:new Date().toISOString()}).eq("id",activeConv.id);
        setConversations(prev=>prev.map(c=>c.id===activeConv.id?{...c,updated_at:new Date().toISOString()}:c));
      }
    } catch(e){
      setMessages(prev=>[...prev,{role:"ai",content:"Connection error. Please try again.",id:"err"}]);
    }
    setLoading(false);
  }

  const activeConvs=conversations.filter(c=>!c.archived);
  const archivedConvs=conversations.filter(c=>c.archived);
  const quickPrompts=["Analyze my attendance","What should I study next?","Explain Organon basics","Create a study plan","Help me prepare for exams"];

  // Sidebar component (used in both desktop and mobile drawer)
  const SidebarContent=()=>(
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <button onClick={newChat} style={{
        width:"100%",padding:"11px 0",background:C.accent,border:"none",
        color:"#000",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer",
        fontFamily:F,marginBottom:12,flexShrink:0,
      }}>+ New Chat</button>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:4}}>
        {activeConvs.length===0&&<div style={{color:C.muted,fontSize:12,textAlign:"center",padding:"24px 8px"}}>No conversations yet</div>}
        {activeConvs.map(conv=>(
          <div key={conv.id} onClick={()=>selectConv(conv)} style={{
            padding:"10px 12px",borderRadius:10,
            background:activeConv?.id===conv.id?C.accentDim:C.surface,
            border:`1px solid ${activeConv?.id===conv.id?C.accent+"44":C.border}`,
            cursor:"pointer",transition:"all 0.15s",
          }}>
            {editingTitle===conv.id?(
              <input value={newTitle} onChange={e=>setNewTitle(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter")renameConv(conv.id,newTitle);if(e.key==="Escape")setEditingTitle(null);}}
                autoFocus onClick={e=>e.stopPropagation()}
                style={{width:"100%",background:"transparent",border:"none",color:C.text,fontSize:12,fontFamily:F,outline:"none"}}/>
            ):(
              <div style={{fontSize:12,fontWeight:activeConv?.id===conv.id?600:400,color:activeConv?.id===conv.id?C.accent:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:6}}>{conv.title}</div>
            )}
            <div style={{display:"flex",gap:4}}>
              <button onClick={e=>{e.stopPropagation();setEditingTitle(conv.id);setNewTitle(conv.title);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:11,padding:"2px 4px",fontFamily:F,borderRadius:4}}>✏️</button>
              <button onClick={e=>{e.stopPropagation();archiveConv(conv.id);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:11,padding:"2px 4px",fontFamily:F,borderRadius:4}}>📦</button>
              <button onClick={e=>{e.stopPropagation();if(confirm("Delete?"))deleteConv(conv.id);}} style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:11,padding:"2px 4px",fontFamily:F,borderRadius:4}}>🗑️</button>
            </div>
          </div>
        ))}
        {archivedConvs.length>0&&(
          <div style={{marginTop:8}}>
            <button onClick={()=>setShowArchived(!showArchived)} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",fontFamily:F,padding:"4px 0",width:"100%",textAlign:"left"}}>
              {showArchived?"▼":"►"} Archived ({archivedConvs.length})
            </button>
            {showArchived&&archivedConvs.map(conv=>(
              <div key={conv.id} onClick={()=>selectConv(conv)} style={{padding:"8px 10px",borderRadius:8,background:C.surface,border:`1px solid ${C.border}`,marginTop:4,cursor:"pointer",opacity:0.6}}>
                <div style={{fontSize:11,color:C.muted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:4}}>{conv.title}</div>
                <div style={{display:"flex",gap:4}}>
                  <button onClick={e=>{e.stopPropagation();archiveConv(conv.id);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:10,fontFamily:F}}>↩️</button>
                  <button onClick={e=>{e.stopPropagation();if(confirm("Delete?"))deleteConv(conv.id);}} style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:10,fontFamily:F}}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{animation:"fadeUp 0.3s ease",height:"calc(100vh - 100px)",display:"flex",flexDirection:"column",maxWidth:900,position:"relative"}}>
      {/* Mobile sidebar drawer */}
      {showSidebar&&(
        <>
          <div onClick={()=>setShowSidebar(false)} style={{position:"fixed",inset:0,background:"#00000077",zIndex:200}}/>
          <div style={{position:"fixed",top:0,left:0,bottom:0,width:280,background:C.surface,borderRight:`1px solid ${C.border}`,zIndex:201,padding:20,overflowY:"auto",animation:"fadeUp 0.2s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:14,fontWeight:700}}>Conversations</div>
              <button onClick={()=>setShowSidebar(false)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:20}}>×</button>
            </div>
            <SidebarContent/>
          </div>
        </>
      )}

      {/* Main layout */}
      <div style={{display:"flex",gap:16,flex:1,minHeight:0}}>
        {/* Desktop sidebar */}
        <div style={{width:220,flexShrink:0,display:"flex",flexDirection:"column"}} className="desktop-sidebar">
          <SidebarContent/>
        </div>

        {/* Chat area */}
        <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
          {/* Chat header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <button onClick={()=>setShowSidebar(true)} style={{
                background:C.card,border:`1px solid ${C.border}`,color:C.muted,
                borderRadius:10,padding:"6px 10px",cursor:"pointer",fontSize:16,lineHeight:1,
              }} className="bottom-nav-visible">☰</button>
              <div style={{fontSize:15,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{activeConv?.title||"AI Assistant ✦"}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:C.accent,animation:"pulse 2s infinite"}}/>
              <span style={{fontSize:11,color:C.accentText,fontWeight:600}}>Groq AI</span>
            </div>
          </div>

          {/* Messages */}
          {!activeConv?(
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:"0 20px"}}>
              <div style={{width:56,height:56,borderRadius:16,background:C.accentDim,border:`1px solid ${C.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>✦</div>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:17,fontWeight:700,marginBottom:6}}>Your Academic AI</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.6}}>Ask questions, get study plans, explain concepts, analyze your performance</div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",maxWidth:400}}>
                {quickPrompts.map(q=>(
                  <button key={q} onClick={async()=>{const conv=await supabase.from("ai_conversations").insert({user_id:userId,title:"New Chat"}).select().single();if(!conv.error){setConversations(prev=>[conv.data,...prev]);setActiveConv(conv.data);setMessages([]);setInput(q);}}} style={{
                    padding:"8px 14px",background:C.card,border:`1px solid ${C.border}`,
                    color:C.muted,fontSize:12,borderRadius:20,cursor:"pointer",fontFamily:F,
                    transition:"all 0.15s",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.color=C.accent;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.muted;}}>
                    {q}
                  </button>
                ))}
              </div>
              <button onClick={newChat} style={{background:C.accent,border:"none",color:"#000",padding:"11px 28px",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:F}}>Start New Chat</button>
            </div>
          ):(
            <>
              <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,paddingBottom:16,paddingRight:4}}>
                {messages.length===0&&<div style={{color:C.muted,fontSize:13,textAlign:"center",padding:"32px 0"}}>Send a message to start</div>}
                {messages.map((m,i)=>(
                  <div key={m.id||i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",alignItems:"flex-end",gap:8}}>
                    {m.role==="ai"&&(
                      <div style={{width:28,height:28,borderRadius:8,background:C.accentDim,border:`1px solid ${C.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>✦</div>
                    )}
                    <div style={{
                      maxWidth:"78%",padding:"11px 15px",
                      borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",
                      background:m.role==="user"?C.accent:C.card,
                      color:m.role==="user"?"#000":C.text,
                      fontSize:13,lineHeight:1.65,
                      border:m.role==="ai"?`1px solid ${C.border}`:"none",
                      whiteSpace:"pre-wrap",wordBreak:"break-word",
                    }}>{m.content}</div>
                  </div>
                ))}
                {loading&&(
                  <div style={{display:"flex",alignItems:"flex-end",gap:8}}>
                    <div style={{width:28,height:28,borderRadius:8,background:C.accentDim,border:`1px solid ${C.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>✦</div>
                    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"18px 18px 18px 4px",padding:"12px 16px"}}>
                      <div style={{display:"flex",gap:5,alignItems:"center"}}>
                        {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:C.accent,animation:`pulse 1.4s ${i*0.2}s infinite`}}/>)}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef}/>
              </div>
              {/* Input */}
              <div style={{flexShrink:0,paddingTop:10,display:"flex",gap:8,alignItems:"flex-end"}}>
                <input ref={inputRef} placeholder="Ask anything about your studies..." value={input}
                  onChange={e=>setInput(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
                  style={{
                    flex:1,background:C.card,border:`1px solid ${C.border}`,color:C.text,
                    padding:"12px 16px",borderRadius:14,fontSize:13,fontFamily:F,outline:"none",
                    transition:"border-color 0.2s",
                  }}
                  onFocus={e=>e.target.style.borderColor=C.accent}
                  onBlur={e=>e.target.style.borderColor=C.border}/>
                <button onClick={send} disabled={loading||!input.trim()} style={{
                  padding:"12px 20px",background:input.trim()&&!loading?C.accent:C.accentDim,
                  border:"none",color:input.trim()&&!loading?"#000":C.muted,
                  borderRadius:14,fontSize:13,fontWeight:700,cursor:loading||!input.trim()?"not-allowed":"pointer",
                  fontFamily:F,flexShrink:0,transition:"all 0.2s",
                }}>{loading?"...":"Send"}</button>
              </div>
            </>
          )}
        </div>
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
  const subCol=Object.fromEntries(subjects.map(s=>[s.name,s.color||C.accent]));

  async function add() {
    if(!newC.subject||!newC.time) return;
    const {data,error}=await supabase.from("timetable").insert({user_id:userId,...newC,day:activeDay}).select().single();
    if(!error){setTimetable(prev=>({...prev,[activeDay]:[...(prev[activeDay]||[]),data]}));setNewC({subject:"",room:"",time:"",duration:1});setShowAdd(false);}
  }
  async function del(id) {
    await supabase.from("timetable").delete().eq("id",id);
    setTimetable(prev=>{const u={...prev};u[activeDay]=(u[activeDay]||[]).filter(c=>c.id!==id);return u;});
  }

  const dayClasses=timetable[activeDay]||[];
  const totalClasses=days.reduce((sum,d)=>sum+(timetable[d]||[]).length,0);

  return (
    <div style={{animation:"fadeUp 0.3s ease",maxWidth:900}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:20,fontWeight:800,letterSpacing:"-0.02em",marginBottom:2}}>Timetable</h2>
          <div style={{fontSize:13,color:C.muted}}>{totalClasses} classes scheduled this week</div>
        </div>
        <button onClick={()=>setShowAdd(!showAdd)} style={{
          background:showAdd?C.surface:C.accent,border:`1px solid ${showAdd?C.border:C.accent}`,
          color:showAdd?C.muted:"#000",padding:"9px 18px",borderRadius:12,fontSize:13,
          fontWeight:700,cursor:"pointer",fontFamily:F,transition:"all 0.2s ease",
        }}>{showAdd?"✕ Cancel":"+ Add Class"}</button>
      </div>

      {/* Day selector */}
      <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
        {days.map(d=>{
          const isToday=d===todayKey;
          const isActive=d===activeDay;
          const count=(timetable[d]||[]).length;
          return(
            <button key={d} onClick={()=>setActiveDay(d)} style={{
              flex:"0 0 auto",minWidth:60,padding:"10px 8px",
              background:isActive?C.accent:C.card,
              border:`1px solid ${isActive?C.accent:isToday?C.accent+"44":C.border}`,
              color:isActive?"#000":isToday?C.accent:C.muted,
              borderRadius:14,cursor:"pointer",fontFamily:F,
              transition:"all 0.2s ease",textAlign:"center",
            }}>
              <div style={{fontSize:13,fontWeight:isActive||isToday?700:500}}>{d}</div>
              {isToday&&<div style={{fontSize:9,marginTop:2,opacity:0.7,color:isActive?"#000":C.accent}}>today</div>}
              {count>0&&<div style={{
                marginTop:4,width:18,height:18,borderRadius:"50%",
                background:isActive?"#00000022":C.accentDim,
                color:isActive?"#000":C.accent,
                fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",
                margin:"4px auto 0",
              }}>{count}</div>}
            </button>
          );
        })}
      </div>

      {/* Add form */}
      {showAdd&&(
        <div style={{background:C.surface,border:`1px solid ${C.accent}44`,borderRadius:16,padding:20,marginBottom:20,animation:"fadeUp 0.2s ease both"}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:14,color:C.accentText}}>Add Class — {activeDay}</div>
          <input placeholder="Subject name *" value={newC.subject} onChange={e=>setNewC(p=>({...p,subject:e.target.value}))}
            style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",marginBottom:10}}/>
          {subjects.length>0&&(
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
              {subjects.map(s=>(
                <button key={s.id} onClick={()=>setNewC(p=>({...p,subject:s.name}))} style={{
                  padding:"5px 12px",background:newC.subject===s.name?s.color||C.accent:C.card,
                  border:`1px solid ${newC.subject===s.name?s.color||C.accent:C.border}`,
                  color:newC.subject===s.name?"#000":C.muted,fontSize:11,borderRadius:8,cursor:"pointer",fontFamily:F,
                }}>{s.name}</button>
              ))}
            </div>
          )}
          <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
            <input type="time" value={newC.time} onChange={e=>setNewC(p=>({...p,time:e.target.value}))}
              style={{flex:"1 1 100px",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark"}}/>
            <input placeholder="Room (optional)" value={newC.room} onChange={e=>setNewC(p=>({...p,room:e.target.value}))}
              style={{flex:"2 1 120px",background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none"}}/>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            {[1,2,3].map(d=>(
              <button key={d} onClick={()=>setNewC(p=>({...p,duration:d}))} style={{
                flex:1,padding:"8px 0",background:newC.duration===d?C.accent:C.card,
                border:`1px solid ${newC.duration===d?C.accent:C.border}`,
                color:newC.duration===d?"#000":C.muted,borderRadius:10,fontSize:12,
                fontWeight:600,cursor:"pointer",fontFamily:F,transition:"all 0.2s",
              }}>{d}h</button>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={add} style={{background:C.accent,border:"none",color:"#000",padding:"10px 20px",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F}}>Add Class</button>
            <button onClick={()=>setShowAdd(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"10px 16px",borderRadius:10,fontSize:13,cursor:"pointer",fontFamily:F}}>Cancel</button>
          </div>
        </div>
      )}

      {/* Timeline */}
      {dayClasses.length===0
        ?<div style={{textAlign:"center",padding:"48px 20px",background:C.card,border:`1px solid ${C.border}`,borderRadius:20}}>
          <div style={{fontSize:40,marginBottom:12}}>📖</div>
          <div style={{fontSize:15,fontWeight:700,marginBottom:6}}>No classes for {activeDay}</div>
          <div style={{fontSize:13,color:C.muted,marginBottom:16}}>Add your first class for this day</div>
          <button onClick={()=>setShowAdd(true)} style={{background:C.accent,border:"none",color:"#000",padding:"9px 20px",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:F}}>Add Class</button>
        </div>
        :<div style={{position:"relative",paddingLeft:56}}>
          <div style={{position:"absolute",left:20,top:8,bottom:8,width:2,background:`linear-gradient(180deg,${C.accent}44,${C.border})`}}/>
          {[...dayClasses].sort((a,b)=>a.time.localeCompare(b.time)).map((cls,i)=>{
            const col=subCol[cls.subject]||SCOLS[i%SCOLS.length];
            return(
              <div key={cls.id||i} style={{position:"relative",marginBottom:14,animation:`fadeUp 0.3s ease ${i*0.06}s both`}}>
                <div style={{position:"absolute",left:-44,top:14,fontSize:10,color:C.muted,fontFamily:M,width:38,textAlign:"right",lineHeight:1.2}}>{cls.time}</div>
                <div style={{position:"absolute",left:-29,top:14,width:10,height:10,borderRadius:"50%",background:col,border:`2px solid ${C.bg}`,boxShadow:`0 0 0 2px ${col}44`}}/>
                <div style={{
                  background:C.card,borderRadius:14,padding:"14px 16px",
                  borderLeft:`3px solid ${col}`,border:`1px solid ${C.border}`,
                  borderLeftWidth:3,borderLeftColor:col,
                  transition:"transform 0.15s ease",
                }}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{cls.subject}</div>
                      <div style={{display:"flex",gap:12,fontSize:11,color:C.muted}}>
                        {cls.room&&<span>📍 {cls.room}</span>}
                        <span>⏱ {cls.duration}h</span>
                      </div>
                    </div>
                    <button onClick={()=>del(cls.id)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:16,padding:"2px",lineHeight:1,transition:"color 0.2s"}}
                      onMouseEnter={e=>e.currentTarget.style.color=C.danger}
                      onMouseLeave={e=>e.currentTarget.style.color=C.muted}>×</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>}
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
  const [selSubject,setSelSubject]=useState(Object.keys(BHMS_TOPICS)[0]);
  const [topics,setTopics]=useState({});
  const [loading,setLoading]=useState(true);
  const [editingId,setEditingId]=useState(null);
  const [editText,setEditText]=useState("");
  const [newTopic,setNewTopic]=useState("");
  const [showAdd,setShowAdd]=useState(false);
  const [tab,setTab]=useState("topics");

  useEffect(()=>{loadTopics();},[userId]);

  async function loadTopics() {
    const {data}=await supabase.from("study_topics").select("*").eq("user_id",userId);
    if(data&&data.length>0){
      const grouped={};
      data.forEach(t=>{if(!grouped[t.subject])grouped[t.subject]=[];grouped[t.subject].push(t);});
      setTopics(grouped);
    } else {await seedDefaults();}
    setLoading(false);
  }
  async function seedDefaults() {
    const rows=[];
    Object.entries(BHMS_TOPICS).forEach(([sub,tlist])=>{tlist.forEach(t=>rows.push({user_id:userId,subject:sub,topic:t,done:false}));});
    const {data}=await supabase.from("study_topics").insert(rows).select();
    if(data){const grouped={};data.forEach(t=>{if(!grouped[t.subject])grouped[t.subject]=[];grouped[t.subject].push(t);});setTopics(grouped);}
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
  const totalTopics=Object.values(topics).flat().length;
  const totalDone=Object.values(topics).flat().filter(t=>t.done).length;
  const overallPct=totalTopics?Math.round((totalDone/totalTopics)*100):0;

  if(loading) return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:60,flexDirection:"column",gap:12}}>
      <div style={{width:40,height:40,borderRadius:10,background:C.accentDim,display:"flex",alignItems:"center",justifyContent:"center",animation:"pulse 1.5s infinite"}}>📖</div>
      <div style={{color:C.muted,fontSize:13}}>Loading study guide...</div>
    </div>
  );

  return (
    <div style={{animation:"fadeUp 0.3s ease",maxWidth:900}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div>
          <h2 style={{fontSize:20,fontWeight:800,letterSpacing:"-0.02em",marginBottom:2}}>Study Guide</h2>
          <div style={{fontSize:13,color:C.muted}}>{totalDone}/{totalTopics} topics complete · {overallPct}% overall</div>
        </div>
        <div style={{display:"flex",gap:4,padding:4,background:C.surface,borderRadius:12,border:`1px solid ${C.border}`}}>
          {["topics","planner"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{
              padding:"7px 14px",background:tab===t?C.accent:"transparent",border:"none",
              color:tab===t?"#000":C.muted,fontSize:12,fontWeight:tab===t?700:500,
              borderRadius:9,cursor:"pointer",fontFamily:F,textTransform:"capitalize",transition:"all 0.2s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {tab==="topics"&&(
        <>
          {/* Overall progress */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div style={{fontSize:13,fontWeight:600}}>Overall Progress</div>
              <div style={{fontFamily:M,fontSize:13,fontWeight:700,color:overallPct===100?C.accent:C.blue}}>{overallPct}%</div>
            </div>
            <div style={{height:8,background:C.border,borderRadius:4,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${overallPct}%`,background:`linear-gradient(90deg,${C.accent},${C.blue})`,borderRadius:4,transition:"width 0.6s ease"}}/>
            </div>
            <div style={{fontSize:11,color:C.muted,marginTop:6}}>{totalDone} of {totalTopics} topics completed across all subjects</div>
          </div>

          {/* Subject pills */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
            {Object.keys(BHMS_TOPICS).map(sub=>{
              const t=topics[sub]||[];
              const d=t.filter(tp=>tp.done).length;
              const p=t.length?Math.round((d/t.length)*100):0;
              const isSelected=selSubject===sub;
              return(
                <button key={sub} onClick={()=>setSelSubject(sub)} style={{
                  padding:"7px 14px",
                  background:isSelected?C.accent:C.card,
                  border:`1px solid ${isSelected?C.accent:C.border}`,
                  color:isSelected?"#000":C.muted,
                  fontSize:12,fontWeight:isSelected?700:500,
                  borderRadius:10,cursor:"pointer",fontFamily:F,
                  display:"flex",alignItems:"center",gap:6,transition:"all 0.2s",
                }}>
                  {sub}
                  <span style={{
                    background:isSelected?"#00000022":p===100?C.accentDim:C.surface,
                    color:isSelected?"#000":p===100?C.accent:C.muted,
                    fontSize:10,padding:"1px 6px",borderRadius:6,fontFamily:M,fontWeight:700,
                  }}>{d}/{t.length}</span>
                </button>
              );
            })}
          </div>

          {/* Topic card */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div>
                <div style={{fontSize:15,fontWeight:700,marginBottom:2}}>{selSubject}</div>
                <div style={{fontSize:12,color:C.muted}}>{done}/{currentTopics.length} topics done</div>
              </div>
              <button onClick={()=>setShowAdd(!showAdd)} style={{
                background:showAdd?C.surface:C.accentDim,border:`1px solid ${showAdd?C.border:C.accent+"44"}`,
                color:showAdd?C.muted:C.accent,padding:"6px 14px",borderRadius:10,fontSize:12,
                fontWeight:600,cursor:"pointer",fontFamily:F,
              }}>{showAdd?"✕":"+ Add"}</button>
            </div>

            {/* Subject progress */}
            <div style={{height:6,background:C.border,borderRadius:3,marginBottom:16,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${pct}%`,background:pct===100?C.accent:C.blue,borderRadius:3,transition:"width 0.5s ease"}}/>
            </div>

            {/* Add topic input */}
            {showAdd&&(
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                <input placeholder="New topic..." value={newTopic} onChange={e=>setNewTopic(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&addTopic()}
                  autoFocus
                  style={{flex:1,background:C.surface,border:`1px solid ${C.border}`,color:C.text,padding:"9px 12px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none"}}/>
                <button onClick={addTopic} style={{background:C.accent,border:"none",color:"#000",padding:"9px 16px",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:F}}>Add</button>
                <button onClick={()=>setShowAdd(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"9px 12px",borderRadius:10,fontSize:12,cursor:"pointer",fontFamily:F}}>✕</button>
              </div>
            )}

            {/* Topics list */}
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {currentTopics.map((topic,i)=>(
                <div key={topic.id}>
                  {editingId===topic.id?(
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <input value={editText} onChange={e=>setEditText(e.target.value)}
                        onKeyDown={e=>e.key==="Enter"&&saveEdit(topic)}
                        autoFocus style={{flex:1,background:C.surface,border:`1px solid ${C.accent}44`,color:C.text,padding:"8px 12px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none"}}/>
                      <button onClick={()=>saveEdit(topic)} style={{background:C.accent,border:"none",color:"#000",padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:F}}>Save</button>
                      <button onClick={()=>setEditingId(null)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"8px 10px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:F}}>✕</button>
                    </div>
                  ):(
                    <div style={{
                      display:"flex",alignItems:"center",gap:10,padding:"10px 12px",
                      background:topic.done?C.accentDim:C.surface,borderRadius:12,
                      border:`1px solid ${topic.done?C.accent+"33":C.border}`,
                      animation:`fadeUp 0.2s ease ${i*0.02}s both`,
                      transition:"background 0.2s ease",
                    }}>
                      <div onClick={()=>toggleDone(topic)} style={{
                        width:22,height:22,borderRadius:7,flexShrink:0,cursor:"pointer",
                        background:topic.done?C.accent:C.border,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:12,color:"#000",fontWeight:700,transition:"all 0.2s",
                      }}>{topic.done?"✓":""}</div>
                      <span onClick={()=>toggleDone(topic)} style={{
                        flex:1,fontSize:13,cursor:"pointer",
                        color:topic.done?C.accentText:C.text,
                        textDecoration:topic.done?"line-through":"none",
                        opacity:topic.done?0.8:1,
                      }}>{topic.topic}</span>
                      <button onClick={()=>{setEditingId(topic.id);setEditText(topic.topic);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,padding:"2px 4px",opacity:0.6}}
                        onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                        onMouseLeave={e=>e.currentTarget.style.opacity="0.6"}>✎</button>
                      <button onClick={()=>deleteTopic(topic)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:16,padding:"2px 4px",opacity:0.6}}
                        onMouseEnter={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.color=C.danger;}}
                        onMouseLeave={e=>{e.currentTarget.style.opacity="0.6";e.currentTarget.style.color=C.muted;}}>×</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab==="planner"&&(
        <>
          {upcomingExams.length===0
            ?<div style={{textAlign:"center",padding:"60px 20px",background:C.card,border:`1px solid ${C.border}`,borderRadius:20}}>
              <div style={{fontSize:48,marginBottom:16}}>📅</div>
              <div style={{fontSize:16,fontWeight:700,marginBottom:8}}>No upcoming exams</div>
              <div style={{fontSize:13,color:C.muted}}>Add exams to get a personalized study plan</div>
            </div>
            :<div style={{display:"flex",flexDirection:"column",gap:14}}>
              {upcomingExams.slice(0,5).map((e,idx)=>{
                const d=daysLeft(e.date);
                const subKey=Object.keys(BHMS_TOPICS).find(k=>e.subject.toLowerCase().includes(k.toLowerCase()))||null;
                const subTopics=subKey?(topics[subKey]||[]):[];
                const pending=subTopics.filter(t=>!t.done);
                const hoursPerDay=pending.length>0&&d>0?Math.ceil((pending.length*0.5)/d):0;
                const urgency=d<=7?C.danger:d<=14?C.warn:C.blue;
                const urgBg=d<=7?C.dangerDim:d<=14?C.warnDim:C.blueDim;
                return(
                  <div key={e.id} style={{background:C.card,border:`1px solid ${urgency}33`,borderRadius:20,padding:20,animation:`fadeUp 0.3s ease ${idx*0.05}s both`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                      <div>
                        <div style={{fontSize:16,fontWeight:700,marginBottom:6}}>{e.subject}</div>
                        <span style={{background:urgBg,border:`1px solid ${urgency}44`,color:urgency,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:6}}>{e.type} · {e.date}</span>
                      </div>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontFamily:M,fontSize:28,fontWeight:800,color:urgency,lineHeight:1}}>{d}</div>
                        <div style={{fontSize:10,color:C.muted}}>days left</div>
                      </div>
                    </div>
                    {subKey?(
                      <>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.muted,marginBottom:8}}>
                          <span>{pending.length} topics pending</span>
                          <span style={{color:urgency,fontWeight:600}}>~{hoursPerDay}h/day recommended</span>
                        </div>
                        <div style={{height:4,background:C.border,borderRadius:2,marginBottom:10,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${subTopics.length?Math.round(((subTopics.length-pending.length)/subTopics.length)*100):0}%`,background:urgency,borderRadius:2}}/>
                        </div>
                        {pending.length>0&&(
                          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                            {pending.slice(0,4).map(t=>(
                              <span key={t.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"4px 10px",fontSize:11,color:C.muted}}>{t.topic}</span>
                            ))}
                            {pending.length>4&&<span style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"4px 10px",fontSize:11,color:C.muted}}>+{pending.length-4} more</span>}
                          </div>
                        )}
                      </>
                    ):(
                      <div style={{fontSize:12,color:C.muted,fontStyle:"italic"}}>No topic data available for this subject</div>
                    )}
                  </div>
                );
              })}
            </div>}
        </>
      )}
    </div>
  );
}

// ── Profile ───────────────────────────────────────────────────────────────────
function Profile({profile,setProfile,userId,onLogout}) {
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState({name:profile?.name||"",college:profile?.college||"",program:profile?.program||"",semester:profile?.semester||""});
  const [loading,setLoading]=useState(false);

  async function save() {
    setLoading(true);
    await supabase.from("profiles").upsert({id:userId,...form});
    setProfile(prev=>({...prev,...form}));setEditing(false);setLoading(false);
  }

  const initials=profile?.name?profile.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase():"?";

  return (
    <div style={{animation:"fadeUp 0.3s ease",maxWidth:600}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <h2 style={{fontSize:20,fontWeight:800,letterSpacing:"-0.02em"}}>My Profile</h2>
        {!editing&&(
          <button onClick={()=>setEditing(true)} style={{
            background:C.surface,border:`1px solid ${C.border}`,color:C.text,
            padding:"9px 18px",borderRadius:12,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:F,
          }}>Edit Profile</button>
        )}
      </div>

      {/* Profile hero */}
      <div style={{
        background:`linear-gradient(135deg,${C.accentDim} 0%,${C.card} 100%)`,
        border:`1px solid ${C.accent}33`,borderRadius:20,padding:24,marginBottom:16,
        display:"flex",alignItems:"center",gap:20,
      }}>
        <div style={{
          width:72,height:72,borderRadius:20,
          background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:26,fontWeight:800,color:"#000",flexShrink:0,
          boxShadow:`0 4px 20px ${C.accent}44`,
        }}>{initials}</div>
        <div>
          <div style={{fontSize:20,fontWeight:800,marginBottom:4}}>{profile?.name||"Student"}</div>
          <div style={{fontSize:13,color:C.accentText,fontWeight:500}}>{profile?.program||"—"}</div>
          {profile?.college&&<div style={{fontSize:12,color:C.muted,marginTop:2}}>{profile.college}</div>}
        </div>
      </div>

      {/* Info card */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:24,marginBottom:16}}>
        {editing?(
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.accentText,marginBottom:16}}>Edit Profile</div>
            {[
              {key:"name",label:"Full Name",placeholder:"Your full name"},
              {key:"college",label:"College / University",placeholder:"Your college name"},
              {key:"program",label:"Program",placeholder:"e.g. BHMS, MBBS"},
              {key:"semester",label:"Current Semester",placeholder:"e.g. 4th"},
            ].map(f=>(
              <div key={f.key} style={{marginBottom:14}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:600}}>{f.label}</div>
                <input placeholder={f.placeholder} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                  style={{width:"100%",background:C.surface,border:`1px solid ${C.border}`,color:C.text,padding:"10px 14px",borderRadius:10,fontSize:13,fontFamily:F,outline:"none",transition:"border-color 0.2s"}}
                  onFocus={e=>e.target.style.borderColor=C.accent}
                  onBlur={e=>e.target.style.borderColor=C.border}/>
              </div>
            ))}
            <div style={{display:"flex",gap:10,marginTop:20}}>
              <button onClick={save} disabled={loading} style={{flex:1,background:C.accent,border:"none",color:"#000",padding:"11px 0",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:F}}>
                {loading?"Saving...":"Save Changes"}
              </button>
              <button onClick={()=>setEditing(false)} style={{background:"none",border:`1px solid ${C.border}`,color:C.muted,padding:"11px 20px",borderRadius:12,fontSize:13,cursor:"pointer",fontFamily:F}}>Cancel</button>
            </div>
          </div>
        ):(
          <div>
            {[
              {label:"College",value:profile?.college,icon:"🏫"},
              {label:"Program",value:profile?.program,icon:"📚"},
              {label:"Semester",value:profile?.semester,icon:"📅"},
            ].map(f=>(
              <div key={f.label} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:`1px solid ${C.border}`}}>
                <div style={{width:36,height:36,borderRadius:10,background:C.surface,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{f.icon}</div>
                <div>
                  <div style={{fontSize:11,color:C.muted,marginBottom:2,textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:600}}>{f.label}</div>
                  <div style={{fontSize:14,fontWeight:500}}>{f.value||"—"}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* App info + logout */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:20,padding:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,paddingBottom:16,borderBottom:`1px solid ${C.border}`}}>
          <div style={{width:36,height:36,borderRadius:10,background:C.accentDim,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>✦</div>
          <div>
            <div style={{fontSize:13,fontWeight:600}}>StudentOS</div>
            <div style={{fontSize:11,color:C.muted}}>AI by Groq · Storage by Supabase</div>
          </div>
        </div>
        <button onClick={onLogout} style={{
          width:"100%",padding:"12px 0",
          background:C.dangerDim,border:`1px solid ${C.danger}44`,
          color:C.danger,borderRadius:12,fontSize:14,fontWeight:700,
          cursor:"pointer",fontFamily:F,transition:"all 0.2s ease",
        }}
        onMouseEnter={e=>{e.currentTarget.style.background=C.danger;e.currentTarget.style.color="#000";}}
        onMouseLeave={e=>{e.currentTarget.style.background=C.dangerDim;e.currentTarget.style.color=C.danger;}}>
          Log Out
        </button>
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

  const views={
    dashboard:<Dashboard subjects={subjects} assignments={assignments} exams={exams} scores={scores} profile={profile} onNav={setPage}/>,
    attendance:<Attendance subjects={subjects} setSubjects={setSubjects} attLogs={attLogs} setAttLogs={setAttLogs} userId={user.id}/>,
    assignments:<Assignments assignments={assignments} setAssignments={setAssignments} userId={user.id}/>,
    exams:<Exams exams={exams} setExams={setExams} userId={user.id}/>,
    performance:<Performance scores={scores} setScores={setScores} userId={user.id} profile={profile}/>,
    study:<StudyGuide subjects={subjects} exams={exams} userId={user.id}/>,
    ai:<AIChat subjects={subjects} assignments={assignments} exams={exams} scores={scores} profile={profile} attLogs={attLogs} userId={user.id}/>,
    timetable:<Timetable timetable={timetable} setTimetable={setTimetable} userId={user.id} subjects={subjects}/>,
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
