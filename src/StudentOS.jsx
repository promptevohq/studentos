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
  const mainNav=[
    {id:"dashboard",icon:"⬡",label:"Home"},
    {id:"attendance",icon:"◎",label:"Attend"},
    {id:"performance",icon:"▲",label:"Marks"},
    {id:"ai",icon:"✦",label:"AI"},
    {id:"profile",icon:"◉",label:"Profile"},
  ];
  return (
    <div className="bottom-nav" style={{justifyContent:"space-around",alignItems:"center"}}>
      {mainNav.map(item=>{
        const isActive=active===item.id;
        return <button key={item.id} onClick={()=>onNav(item.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",color:isActive?C.accent:C.muted,cursor:"pointer",fontFamily:F,padding:"4px 8px",minWidth:52,flex:1}}>
          <span style={{fontSize:20}}>{item.icon}</span>
          <span style={{fontSize:9,fontWeight:isActive?700:400,letterSpacing:"0.02em"}}>{item.label}</span>
        </button>;
      })}
    </div>
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

// ── Attendance (date-based logging) ───────────────────────────────────────────
function Attendance({subjects,setSubjects,attLogs,setAttLogs,userId}) {
  const [showAdd,setShowAdd]=useState(false);
  const [newS,setNewS]=useState({name:"",code:""});
  const [duration,setDuration]=useState("overall");
  const [customFrom,setCustomFrom]=useState("");
  const [customTo,setCustomTo]=useState("");

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

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 className="page-header" style={{fontSize:16,fontWeight:700}}>Attendance</h2>
        <Btn onClick={()=>setShowAdd(!showAdd)}>+ Subject</Btn>
      </div>

      {/* Duration selector */}
      <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
        {["overall","weekly","monthly","quarterly","custom"].map(d=>(
          <button key={d} onClick={()=>setDuration(d)} style={{flex:"0 0 auto",padding:"7px 14px",background:duration===d?C.accent:C.card,border:`1px solid ${duration===d?C.accent:C.border}`,color:duration===d?"#000":C.muted,fontSize:11,fontWeight:600,borderRadius:8,cursor:"pointer",fontFamily:F,textTransform:"capitalize",whiteSpace:"nowrap"}}>
            {d}
          </button>
        ))}
      </div>
      {duration==="custom"&&(
        <Card style={{marginBottom:16,background:C.surface,padding:14}}>
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

      {showAdd&&<Card style={{marginBottom:16,background:C.surface}}>
        <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
          <Input placeholder="Subject name" value={newS.name} onChange={e=>setNewS(p=>({...p,name:e.target.value}))} style={{flex:"2 1 140px"}}/>
          <Input placeholder="Code" value={newS.code} onChange={e=>setNewS(p=>({...p,code:e.target.value}))} style={{flex:"1 1 80px"}}/>
        </div>
        <div style={{display:"flex",gap:8}}><Btn onClick={addSubject}>Add</Btn><Btn onClick={()=>setShowAdd(false)} variant="ghost">Cancel</Btn></div>
      </Card>}

      {subjects.length===0
        ?<Card style={{textAlign:"center",padding:48}}><div style={{fontSize:32,marginBottom:12}}>📚</div><div style={{color:C.muted,fontSize:14}}>No subjects yet. Add one to start tracking.</div></Card>
        :<div style={{display:"flex",flexDirection:"column",gap:14}}>
          {subjects.map(sub=>{
            const {attended,total}=subjectStats(sub);
            const p=att(attended,total);
            const needed=p<75&&total>0?Math.ceil((0.75*total-attended)/0.25):0;
            const canMiss=p>=75&&total>0?Math.floor((attended-0.75*total)/0.75):0;
            const chartData=showChart?buildChartData(sub):[];
            return <Card key={sub.id} glow={sub.color}>
              <div className="att-card" style={{position:"relative"}}>
                <button onClick={()=>deleteSubject(sub.id)} style={{position:"absolute",top:-8,right:-8,background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,lineHeight:1}}>×</button>
                <Ring p={p} size={72} color={sub.color}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:600,marginBottom:2}}>{sub.name}{sub.code&&<span style={{color:C.muted,fontSize:11,fontFamily:M,marginLeft:6}}>{sub.code}</span>}</div>
                  <div style={{fontSize:12,color:C.muted,marginBottom:4}}>{attended}/{total} classes {duration!=="overall"&&<span style={{color:C.accent}}>({duration})</span>}</div>
                  {p<75&&total>0?<div style={{fontSize:11,color:C.danger,marginBottom:8}}>Need {needed} more to reach 75%</div>
                    :total>0?<div style={{fontSize:11,color:C.accentText,marginBottom:8}}>Can miss {canMiss} more class{canMiss!==1?"es":""}</div>:<div style={{marginBottom:8}}/>}
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    <Btn onClick={()=>markClass(sub,"present")} style={{background:C.accentDim,border:`1px solid ${C.accent}44`,color:C.accent,fontSize:11,padding:"5px 10px"}}>✓ Present</Btn>
                    <Btn onClick={()=>markClass(sub,"absent")} variant="danger" style={{fontSize:11,padding:"5px 10px"}}>✗ Absent</Btn>
                  </div>
                </div>
              </div>
              {showChart&&chartData.length>0&&(
                <div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${C.border}`}}>
                  <div style={{fontSize:11,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>{duration} trend</div>
                  <BarChart data={chartData} color={sub.color} height={100}/>
                </div>
              )}
            </Card>;
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
          <Select value={newE.type} onChange={e=>setNewE(p=>({...p,type:e.target.value}))} style={{flex:"1 1 120px"}}>
            <option>Midterm</option><option>Final</option><option>Quiz</option><option>Practical</option><option>Viva</option><option>Internal</option>
          </Select>
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
          <Input placeholder="Subject" value={newS.subject} onChange={e=>setNewS(p=>({...p,subject:e.target.value}))} style={{flex:"2 1 140px"}}/>
          <Select value={newS.exam_type} onChange={e=>setNewS(p=>({...p,exam_type:e.target.value}))} style={{flex:"1 1 100px"}}>
            <option>Internal</option><option>Midterm</option><option>Final</option><option>Practical</option><option>Viva</option>
          </Select>
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

// ── AI Assistant ───────────────────────────────────────────────────────────────
function AIChat({subjects,assignments,exams,scores,profile,attLogs}) {
  const [messages,setMessages]=useState([
    {role:"ai",text:`Hi ${profile?.name?.split(" ")[0]||"there"}! 👋 I'm your academic AI assistant. I know your subjects, attendance, scores, and exams. Ask me anything — study help, exam tips, performance analysis, or BHMS-specific questions.`}
  ]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages]);

  function buildContext() {
    const avgAtt=subjects.length?Math.round(subjects.reduce((s,sub)=>s+att(sub.attended||0,sub.total||0),0)/subjects.length):0;
    const lowAtt=subjects.filter(s=>att(s.attended||0,s.total||0)<75).map(s=>s.name);
    const pending=assignments.filter(a=>a.status!=="submitted").length;
    const upcoming=exams.filter(e=>daysLeft(e.date)>0).sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,3);
    const passedScores=scores.filter(s=>{
      const tPct=s.theory_max>0?(s.theory_marks/s.theory_max)*100:100;
      const pPct=s.practical_max>0?(s.practical_marks/s.practical_max)*100:100;
      return tPct>=(s.theory_pass_pct||50)&&pPct>=(s.practical_pass_pct||50);
    });

    return `You are an academic AI assistant embedded in StudentOS, an app for medical students.

STUDENT PROFILE:
- Name: ${profile?.name||"Student"}
- Program: ${profile?.program||"BHMS"} (Homoeopathic Medical Science)
- College: ${profile?.college||"Not specified"}
- Semester: ${profile?.semester||"Not specified"}

ACADEMIC DATA:
- Average attendance: ${avgAtt}% ${avgAtt<75?"(BELOW 75% threshold — critical!)":"(Good)"}
- Subjects with low attendance (<75%): ${lowAtt.length>0?lowAtt.join(", "):"None"}
- Total subjects: ${subjects.length}
- Pending assignments: ${pending}
- Scores recorded: ${scores.length} | Passed: ${passedScores.length} | Failed: ${scores.length-passedScores.length}
- Upcoming exams: ${upcoming.map(e=>`${e.subject} on ${e.date} (${daysLeft(e.date)} days)`).join(", ")||"None"}

BHMS CONTEXT:
- Passing criteria (CCH standard): Theory 50% of max (150 marks → 75 to pass), Practical/Oral 50% of max (100 marks → 50 to pass), Internal 50% of max
- Key BHMS subjects: Organon of Medicine, Materia Medica, Anatomy, Physiology, Pathology, Practice of Medicine, Obstetrics & Gynecology, Surgery, Community Medicine, Pharmacy
- Answer study questions with BHMS curriculum in mind

INSTRUCTIONS:
- Be helpful, concise, and motivating
- Use the student's actual data to personalize responses
- For study questions, provide clear structured answers relevant to BHMS curriculum
- If asked about attendance/performance, reference their actual numbers
- Keep responses mobile-friendly (not too long)
- Respond in plain text, avoid excessive markdown`;
  }

  async function send() {
    if(!input.trim()||loading) return;
    const userMsg=input.trim();
    setInput("");
    setMessages(prev=>[...prev,{role:"user",text:userMsg}]);
    setLoading(true);

    try {
      const res=await fetch(`https://mwzpfrroagrhuenpdclt.supabase.co/functions/v1/ai-chat`,{
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13enBmcnJvYWdyaHVlbnBkY2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzU5NDgsImV4cCI6MjA5NTU1MTk0OH0.1XaAfisI75Iafk_tvGRoQNXDXYTzR7Zqsowl2Fb_dM4`},
        body:JSON.stringify({message:userMsg,context:buildContext()}),
      });
      const data=await res.json();
      if(data.reply){setMessages(prev=>[...prev,{role:"ai",text:data.reply}]);}
      else{setMessages(prev=>[...prev,{role:"ai",text:"Sorry, I couldn't get a response. Please check your AI setup in Settings."}]);}
    } catch(e){
      setMessages(prev=>[...prev,{role:"ai",text:"Connection error. Make sure the AI Edge Function is deployed."}]);
    }
    setLoading(false);
  }

  const quickPrompts=["Analyze my attendance","What should I study next?","Explain Organon of Medicine basics","How to improve my scores?","Create a study plan for exams"];

  return (
    <div style={{animation:"fadeUp 0.3s ease",display:"flex",flexDirection:"column",height:"calc(100vh - 120px)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 className="page-header" style={{fontSize:16,fontWeight:700}}>AI Assistant ✦</h2>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:C.accent,animation:"pulse 2s infinite"}}/>
          <span style={{fontSize:11,color:C.accentText}}>Groq AI</span>
        </div>
      </div>

      {/* Quick prompts */}
      <div style={{display:"flex",gap:6,overflowX:"auto",marginBottom:12,paddingBottom:4,flexShrink:0}}>
        {quickPrompts.map(q=>(
          <button key={q} onClick={()=>setInput(q)} style={{flex:"0 0 auto",padding:"6px 12px",background:C.surface,border:`1px solid ${C.border}`,color:C.muted,fontSize:11,borderRadius:20,cursor:"pointer",fontFamily:F,whiteSpace:"nowrap"}}>
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="chat-messages" style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,paddingBottom:16}}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            {m.role==="ai"&&<div style={{width:28,height:28,borderRadius:8,background:C.accentDim,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,marginRight:8,flexShrink:0,alignSelf:"flex-end"}}>✦</div>}
            <div style={{
              maxWidth:"80%",padding:"10px 14px",borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",
              background:m.role==="user"?C.accent:C.card,
              color:m.role==="user"?"#000":C.text,
              fontSize:13,lineHeight:1.6,
              border:m.role==="ai"?`1px solid ${C.border}`:"none",
              whiteSpace:"pre-wrap",
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading&&(
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:28,height:28,borderRadius:8,background:C.accentDim,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>✦</div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:"16px 16px 16px 4px",padding:"10px 14px"}}>
              <div style={{display:"flex",gap:4}}>
                {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:C.accent,animation:`pulse 1.2s ${i*0.2}s infinite`}}/>)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div className="chat-input-row" style={{flexShrink:0,paddingTop:8}}>
        <Input
          placeholder="Ask anything about your studies..."
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
          style={{flex:1}}
        />
        <Btn onClick={send} disabled={loading||!input.trim()} style={{padding:"9px 16px",flexShrink:0}}>
          {loading?"...":"Send"}
        </Btn>
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

  async function save() {
    setLoading(true);
    await supabase.from("profiles").upsert({id:userId,...form});
    setProfile(prev=>({...prev,...form}));setEditing(false);setLoading(false);
  }

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 className="page-header" style={{fontSize:16,fontWeight:700}}>My Profile</h2>
        {!editing&&<Btn onClick={()=>setEditing(true)}>Edit Profile</Btn>}
      </div>
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
            {[{key:"name",label:"Full Name"},{key:"college",label:"College / University"},{key:"program",label:"Program"},{key:"semester",label:"Current Semester"}].map(f=>(
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
            {[{label:"College",value:profile?.college},{label:"Program",value:profile?.program},{label:"Semester",value:profile?.semester}].map(f=>(
              <div key={f.label} style={{marginBottom:16}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>{f.label}</div>
                <div style={{fontSize:14,fontWeight:500}}>{f.value||"—"}</div>
              </div>
            ))}
            <div style={{marginTop:24,paddingTop:20,borderTop:`1px solid ${C.border}`}}>
              <div style={{fontSize:12,color:C.muted,marginBottom:12}}>AI powered by Groq  · Data stored on Supabase</div>
              <Btn onClick={onLogout} variant="danger" style={{width:"100%",padding:"10px 0",fontSize:13}}>Log Out</Btn>
            </div>
          </div>
        )}
      </Card>
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
    ai:<AIChat subjects={subjects} assignments={assignments} exams={exams} scores={scores} profile={profile} attLogs={attLogs}/>,
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
