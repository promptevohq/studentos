import { useState, useEffect } from "react";
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
  body{background:#0A0C10;color:#E8EDF5;font-family:'DM Sans',sans-serif;}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#111318;}::-webkit-scrollbar-thumb{background:#1E2530;border-radius:2px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  input:-webkit-autofill{-webkit-box-shadow:0 0 0 30px #161B24 inset!important;-webkit-text-fill-color:#E8EDF5!important;}
  .desktop-sidebar{display:flex;}
  .bottom-nav{display:none;}
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
  .grid-4-exam{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
  .att-card{display:flex;gap:16px;align-items:center;}
  @media(max-width:768px){
    .desktop-sidebar{display:none!important;}
    .bottom-nav{display:flex!important;position:fixed;bottom:0;left:0;right:0;background:#111318;border-top:1px solid #1E2530;z-index:100;padding:8px 0 12px;}
    .main-content{padding:16px 16px 80px!important;max-width:100%!important;}
    .grid-2{grid-template-columns:1fr!important;}
    .grid-4{grid-template-columns:1fr 1fr!important;}
    .grid-4-exam{grid-template-columns:1fr 1fr!important;}
    .att-card{flex-direction:column;align-items:flex-start!important;}
    .page-header{font-size:18px!important;}
    .stat-value{font-size:22px!important;}
    .greeting{font-size:18px!important;}
  }
`;

const daysLeft = d => { const t=new Date();t.setHours(0,0,0,0); return Math.ceil((new Date(d)-t)/86400000); };
const gpa = gs => { if(!gs.length) return "0.00"; const tc=gs.reduce((s,g)=>s+g.credits,0); return (gs.reduce((s,g)=>s+g.points*g.credits,0)/tc).toFixed(2); };
const att = (a,t) => t===0?0:Math.round((a/t)*100);
const SCOLS = ["#4FFFB0","#4FC3F7","#FFB830","#B39DDB","#FF8A65","#F06292"];

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

const Btn = ({onClick,children,variant="primary",style}) => {
  const styles = {
    primary:{background:C.accent,border:"none",color:"#000",fontWeight:700},
    danger:{background:C.dangerDim,border:`1px solid ${C.danger}44`,color:C.danger,fontWeight:600},
    ghost:{background:"none",border:`1px solid ${C.border}`,color:C.muted,fontWeight:400},
  };
  return <button onClick={onClick} style={{fontSize:12,padding:"7px 14px",borderRadius:8,cursor:"pointer",fontFamily:F,...styles[variant],...style}}>{children}</button>;
};

const Input = ({placeholder,value,onChange,type="text",style}) =>
  <input type={type} placeholder={placeholder} value={value} onChange={onChange}
    style={{background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"9px 12px",borderRadius:8,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark",...style}}/>;

const Select = ({value,onChange,children,style}) =>
  <select value={value} onChange={onChange} style={{background:C.card,border:`1px solid ${C.border}`,color:C.text,padding:"9px 12px",borderRadius:8,fontSize:13,fontFamily:F,outline:"none",colorScheme:"dark",...style}}>{children}</select>;

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
    await supabase.from("profiles").upsert({id:u.id,name:email.split("@")[0],college:"",program:"",semester:""});
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
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:C.bg,padding:20}}>
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
              <Input placeholder="Program (e.g. BHMS, B.Tech)" value={program} onChange={e=>setProgram(e.target.value)} style={inp}/>
              <Input placeholder="Current Semester (e.g. 4th)" value={semester} onChange={e=>setSemester(e.target.value)} style={{...inp,marginBottom:14}}/>
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
  {id:"gpa",icon:"◈",label:"GPA"},
  {id:"timetable",icon:"▦",label:"Timetable"},
  {id:"profile",icon:"◉",label:"Profile"},
];

// ── Desktop Sidebar ───────────────────────────────────────────────────────────
function Sidebar({active,onNav,profile,onLogout}) {
  const initials=profile?.name?profile.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase():"?";
  return (
    <div className="desktop-sidebar" style={{width:220,minHeight:"100vh",background:C.surface,borderRight:`1px solid ${C.border}`,flexDirection:"column",position:"sticky",top:0}}>
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
function BottomNav({active,onNav,onLogout}) {
  const mainNav=NAV.slice(0,5);
  return (
    <div className="bottom-nav" style={{justifyContent:"space-around",alignItems:"center"}}>
      {mainNav.map(item=>{
        const isActive=active===item.id;
        return <button key={item.id} onClick={()=>onNav(item.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",color:isActive?C.accent:C.muted,cursor:"pointer",fontFamily:F,padding:"4px 8px",minWidth:48}}>
          <span style={{fontSize:18}}>{item.icon}</span>
          <span style={{fontSize:9,fontWeight:isActive?700:400,letterSpacing:"0.02em"}}>{item.label}</span>
        </button>;
      })}
      <button onClick={()=>onNav("profile")} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",color:active==="profile"?C.accent:C.muted,cursor:"pointer",fontFamily:F,padding:"4px 8px",minWidth:48}}>
        <span style={{fontSize:18}}>◉</span>
        <span style={{fontSize:9,fontWeight:active==="profile"?700:400}}>Profile</span>
      </button>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({subjects,assignments,exams,grades,profile,onNav}) {
  const avgAtt=subjects.length?Math.round(subjects.reduce((s,sub)=>s+att(sub.attended,sub.total),0)/subjects.length):0;
  const pending=assignments.filter(a=>a.status!=="submitted").length;
  const nextExam=exams.length?[...exams].sort((a,b)=>new Date(a.date)-new Date(b.date))[0]:null;
  const cgpa=gpa(grades);
  const urgent=assignments.filter(a=>a.status!=="submitted"&&daysLeft(a.due)<=5).sort((a,b)=>daysLeft(a.due)-daysLeft(b.due));
  const lowAtt=subjects.filter(s=>att(s.attended,s.total)<75);
  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <div style={{marginBottom:24}}>
        <div className="greeting" style={{fontSize:22,fontWeight:700,letterSpacing:"-0.03em"}}>Good morning, {profile?.name?.split(" ")[0]||"Student"} 👋</div>
        <div style={{fontSize:13,color:C.muted,marginTop:4}}>{profile?.program||""}{profile?.college?` · ${profile.college}`:""}</div>
      </div>
      <div className="grid-4" style={{marginBottom:20}}>
        {[
          {label:"Attendance",value:`${avgAtt}%`,color:avgAtt>=75?C.accent:C.danger,bg:avgAtt>=75?C.accentDim:C.dangerDim,icon:"◎"},
          {label:"CGPA",value:cgpa,color:C.purple,bg:C.purpleDim,icon:"◈"},
          {label:"Pending",value:pending,color:C.warn,bg:C.warnDim,icon:"◷"},
          {label:"Next Exam",value:nextExam?`${daysLeft(nextExam.date)}d`:"—",color:C.blue,bg:C.blueDim,icon:"◈"},
        ].map(s=>(
          <Card key={s.label} style={{background:s.bg,border:`1px solid ${s.color}22`,padding:14}}>
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
            :lowAtt.map(s=>{const p=att(s.attended,s.total),needed=Math.ceil((0.75*s.total-s.attended)/0.25);return(
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
      {exams.length>0&&<Card>
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

// ── Attendance ─────────────────────────────────────────────────────────────────
function Attendance({subjects,setSubjects,userId}) {
  const [showAdd,setShowAdd]=useState(false);
  const [showSet,setShowSet]=useState(null);
  const [setVal,setSetVal]=useState({attended:"",total:""});
  const [newS,setNewS]=useState({name:"",code:""});

  async function markClass(sub,type) {
    const updates={attended:type==="present"?sub.attended+1:sub.attended,total:sub.total+1};
    await supabase.from("subjects").update(updates).eq("id",sub.id);
    setSubjects(prev=>prev.map(s=>s.id===sub.id?{...s,...updates}:s));
  }
  async function addSubject() {
    if(!newS.name) return;
    const color=SCOLS[subjects.length%SCOLS.length];
    const {data,error}=await supabase.from("subjects").insert({user_id:userId,...newS,attended:0,total:0,color}).select().single();
    if(!error){setSubjects(prev=>[...prev,data]);setNewS({name:"",code:""});setShowAdd(false);}
  }
  async function deleteSubject(id) {
    await supabase.from("subjects").delete().eq("id",id);
    setSubjects(prev=>prev.filter(s=>s.id!==id));
  }
  async function setCount(sub) {
    const a=parseInt(setVal.attended)||0;
    const t=parseInt(setVal.total)||sub.total;
    if(a>t){alert("Attended cannot be more than total");return;}
    const updates={attended:a,total:t};
    await supabase.from("subjects").update(updates).eq("id",sub.id);
    setSubjects(prev=>prev.map(s=>s.id===sub.id?{...s,...updates}:s));
    setShowSet(null);setSetVal({attended:"",total:""});
  }

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 className="page-header" style={{fontSize:16,fontWeight:700}}>Attendance</h2>
        <Btn onClick={()=>setShowAdd(!showAdd)}>+ Add Subject</Btn>
      </div>
      {showAdd&&<Card style={{marginBottom:16,background:C.surface}}>
        <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
          <Input placeholder="Subject name" value={newS.name} onChange={e=>setNewS(p=>({...p,name:e.target.value}))} style={{flex:"2 1 140px"}}/>
          <Input placeholder="Code" value={newS.code} onChange={e=>setNewS(p=>({...p,code:e.target.value}))} style={{flex:"1 1 80px"}}/>
        </div>
        <div style={{display:"flex",gap:8}}><Btn onClick={addSubject}>Add</Btn><Btn onClick={()=>setShowAdd(false)} variant="ghost">Cancel</Btn></div>
      </Card>}
      {subjects.length===0?<Card style={{textAlign:"center",padding:48}}><div style={{fontSize:32,marginBottom:12}}>📚</div><div style={{color:C.muted,fontSize:14}}>No subjects yet.</div></Card>
        :<div style={{display:"flex",flexDirection:"column",gap:14}}>
          {subjects.map(sub=>{
            const p=att(sub.attended,sub.total),needed=p<75&&sub.total>0?Math.ceil((0.75*sub.total-sub.attended)/0.25):0,canMiss=p>=75?Math.floor((sub.attended-0.75*sub.total)/0.75):0;
            return <Card key={sub.id} className="att-card" style={{position:"relative"}} glow={sub.color}>
              <button onClick={()=>deleteSubject(sub.id)} style={{position:"absolute",top:10,right:10,background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,lineHeight:1}}>×</button>
              <Ring p={p} size={72} color={sub.color}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:600,marginBottom:2,paddingRight:24}}>{sub.name}</div>
                <div style={{fontSize:11,color:C.muted,fontFamily:M,marginBottom:6}}>{sub.code}</div>
                <div style={{fontSize:12,color:C.muted,marginBottom:4}}>{sub.attended}/{sub.total} classes</div>
                {p<75&&sub.total>0?<div style={{fontSize:11,color:C.danger,marginBottom:8}}>Need {needed} more to reach 75%</div>
                  :sub.total>0?<div style={{fontSize:11,color:C.accentText,marginBottom:8}}>Can miss {canMiss} more class{canMiss!==1?"es":""}</div>:<div style={{marginBottom:8}}/>}
                {showSet===sub.id?(
                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <Input placeholder="Attended" value={setVal.attended} onChange={e=>setSetVal(p=>({...p,attended:e.target.value}))} type="number" style={{width:90}}/>
                    <span style={{color:C.muted,fontSize:13}}>out of</span>
                    <Input placeholder="Total" value={setVal.total} onChange={e=>setSetVal(p=>({...p,total:e.target.value}))} type="number" style={{width:90}}/>
                    <Btn onClick={()=>setCount(sub)} style={{padding:"6px 12px"}}>Save</Btn>
                    <Btn onClick={()=>setShowSet(null)} variant="ghost" style={{padding:"6px 10px"}}>✕</Btn>
                  </div>
                ):(
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    <button onClick={()=>markClass(sub,"present")} style={{background:C.accentDim,border:`1px solid ${C.accent}44`,color:C.accent,fontSize:12,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontFamily:F,fontWeight:600}}>✓ Present</button>
                    <button onClick={()=>markClass(sub,"absent")} style={{background:C.dangerDim,border:`1px solid ${C.danger}44`,color:C.danger,fontSize:12,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontFamily:F,fontWeight:600}}>✗ Absent</button>
                    <button onClick={()=>{setShowSet(sub.id);setSetVal({attended:sub.attended,total:sub.total});}} style={{background:C.blueDim,border:`1px solid ${C.blue}44`,color:C.blue,fontSize:12,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontFamily:F,fontWeight:600}}>✎ Set Count</button>
                  </div>
                )}
              </div>
            </Card>;
          })}
        </div>}
    </div>
  );
}

// ── Assignments ───────────────────────────────────────────────────────────────
function Assignments({assignments,setAssignments,userId}) {
  const [filter,setFilter]=useState("all");
  const [showAdd,setShowAdd]=useState(false);
  const [newA,setNewA]=useState({title:"",subject:"",due:"",priority:"medium"});
  const filtered=assignments.filter(a=>filter==="all"?true:a.status===filter);
  const priCol={high:C.danger,medium:C.warn,low:C.accentText};
  const statCol={pending:[C.muted,C.border],"in-progress":[C.blue,C.blueDim],submitted:[C.accent,C.accentDim]};

  async function add() {
    if(!newA.title||!newA.subject||!newA.due) return;
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
            <option>Midterm</option><option>Final</option><option>Quiz</option><option>Practical</option>
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
                    <div style={{fontFamily:M,fontSize:32,fontWeight:700,color:urg,lineHeight:1}}>{d}</div>
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

// ── GPA ───────────────────────────────────────────────────────────────────────
function GPA({grades,setGrades,userId}) {
  const [showAdd,setShowAdd]=useState(false);
  const [newG,setNewG]=useState({subject:"",credits:3,grade:"A",points:9});
  const gradeMap={"O":10,"A+":10,"A":9,"B+":8,"B":7,"C+":6,"C":5,"D":4,"F":0};
  const gradeCol={"O":C.accent,"A+":C.accent,"A":C.accentText,"B+":C.blue,"B":C.purple,"C+":C.warn,"C":C.warn,"D":C.danger,"F":C.danger};
  const cgpa=gpa(grades),tc=grades.reduce((s,g)=>s+g.credits,0);

  async function add() {
    if(!newG.subject) return;
    const {data,error}=await supabase.from("grades").insert({user_id:userId,...newG}).select().single();
    if(!error){setGrades(prev=>[...prev,data]);setNewG({subject:"",credits:3,grade:"A",points:9});setShowAdd(false);}
  }
  async function del(id) {
    await supabase.from("grades").delete().eq("id",id);
    setGrades(prev=>prev.filter(g=>g.id!==id));
  }

  return (
    <div style={{animation:"fadeUp 0.3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 className="page-header" style={{fontSize:16,fontWeight:700}}>GPA Calculator</h2>
        <Btn onClick={()=>setShowAdd(!showAdd)}>+ Add Course</Btn>
      </div>
      <Card style={{background:`linear-gradient(135deg,${C.accentDim},${C.purpleDim})`,border:`1px solid ${C.accent}44`,marginBottom:16,textAlign:"center",padding:28}}>
        <div style={{fontSize:12,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Current CGPA</div>
        <div style={{fontFamily:M,fontSize:52,fontWeight:700,color:C.accent,letterSpacing:"-0.04em",lineHeight:1}}>{cgpa}</div>
        <div style={{fontSize:12,color:C.muted,marginTop:8}}>{tc} credits · {grades.length} courses</div>
      </Card>
      {showAdd&&<Card style={{marginBottom:16,background:C.surface}}>
        <Input placeholder="Subject name" value={newG.subject} onChange={e=>setNewG(p=>({...p,subject:e.target.value}))} style={{width:"100%",marginBottom:10}}/>
        <div style={{display:"flex",gap:10,marginBottom:10}}>
          <Select value={newG.credits} onChange={e=>setNewG(p=>({...p,credits:Number(e.target.value)}))} style={{flex:1}}>
            {[1,2,3,4,5].map(c=><option key={c} value={c}>{c} Credits</option>)}
          </Select>
          <Select value={newG.grade} onChange={e=>setNewG(p=>({...p,grade:e.target.value,points:gradeMap[e.target.value]||0}))} style={{flex:1}}>
            {Object.keys(gradeMap).map(g=><option key={g} value={g}>{g} ({gradeMap[g]})</option>)}
          </Select>
        </div>
        <div style={{display:"flex",gap:8}}><Btn onClick={add}>Add</Btn><Btn onClick={()=>setShowAdd(false)} variant="ghost">Cancel</Btn></div>
      </Card>}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {grades.map(g=>(
          <Card key={g.id} style={{display:"flex",alignItems:"center",gap:14,padding:14}}>
            <div style={{width:40,height:40,borderRadius:10,flexShrink:0,background:`${gradeCol[g.grade]||C.muted}22`,border:`1px solid ${gradeCol[g.grade]||C.muted}44`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:M,fontWeight:700,color:gradeCol[g.grade]||C.muted,fontSize:13}}>{g.grade}</div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,marginBottom:2}}>{g.subject}</div><div style={{fontSize:11,color:C.muted}}>{g.credits} Credits</div></div>
            <div style={{fontFamily:M,fontSize:20,fontWeight:700,color:gradeCol[g.grade]||C.muted,marginRight:8}}>{g.points}</div>
            <button onClick={()=>del(g.id)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18}}>×</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Timetable ─────────────────────────────────────────────────────────────────
function Timetable({timetable,setTimetable,userId,subjects}) {
  const days=["Mon","Tue","Wed","Thu","Fri"];
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
          <button key={d} onClick={()=>setActiveDay(d)} style={{flex:"1 0 auto",minWidth:52,padding:"10px 0",background:activeDay===d?C.accent:C.card,border:`1px solid ${activeDay===d?C.accent:C.border}`,color:activeDay===d?"#000":d===todayKey?C.accent:C.muted,fontSize:12,fontWeight:600,borderRadius:10,cursor:"pointer",fontFamily:F}}>
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
  const [grades,setGrades]=useState([]);
  const [timetable,setTimetable]=useState({});

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
    const [pR,sR,aR,eR,gR,tR]=await Promise.all([
      supabase.from("profiles").select("*").eq("id",u.id).single(),
      supabase.from("subjects").select("*").eq("user_id",u.id),
      supabase.from("assignments").select("*").eq("user_id",u.id),
      supabase.from("exams").select("*").eq("user_id",u.id),
      supabase.from("grades").select("*").eq("user_id",u.id),
      supabase.from("timetable").select("*").eq("user_id",u.id),
    ]);
    setProfile(pR.data);setSubjects(sR.data||[]);setAssignments(aR.data||[]);setExams(eR.data||[]);setGrades(gR.data||[]);
    const tt={};(tR.data||[]).forEach(c=>{if(!tt[c.day])tt[c.day]=[];tt[c.day].push(c);});
    setTimetable(tt);setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);setProfile(null);setSubjects([]);setAssignments([]);setExams([]);setGrades([]);setTimetable({});
  }

  if(loading) return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:C.bg}}>
      <div style={{textAlign:"center"}}>
        <div style={{width:52,height:52,background:C.accent,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:700,color:"#000",margin:"0 auto 16px"}}>S</div>
        <div style={{color:C.muted,fontSize:14}}>Loading StudentOS...</div>
      </div>
    </div>
  );

  if(!user) return <><style>{GS}</style><Auth onAuth={loadUser}/></>;

  const views={
    dashboard:<Dashboard subjects={subjects} assignments={assignments} exams={exams} grades={grades} profile={profile} onNav={setPage}/>,
    attendance:<Attendance subjects={subjects} setSubjects={setSubjects} userId={user.id}/>,
    assignments:<Assignments assignments={assignments} setAssignments={setAssignments} userId={user.id}/>,
    exams:<Exams exams={exams} setExams={setExams} userId={user.id}/>,
    gpa:<GPA grades={grades} setGrades={setGrades} userId={user.id}/>,
    timetable:<Timetable timetable={timetable} setTimetable={setTimetable} userId={user.id} subjects={subjects}/>,
    profile:<Profile profile={profile} setProfile={setProfile} userId={user.id} onLogout={logout}/>,
  };

  return(
    <>
      <style>{GS}</style>
      <div style={{display:"flex",minHeight:"100vh",background:C.bg}}>
        <Sidebar active={page} onNav={setPage} profile={profile} onLogout={logout}/>
        <main className="main-content" style={{flex:1,padding:"32px 36px",overflowY:"auto",maxWidth:960}}>{views[page]}</main>
        <BottomNav active={page} onNav={setPage} onLogout={logout}/>
      </div>
    </>
  );
}
