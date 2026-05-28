import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0A0C10",
  surface: "#111318",
  card: "#161B24",
  border: "#1E2530",
  accent: "#4FFFB0",
  accentDim: "#1A3D2E",
  accentText: "#3DD68C",
  warn: "#FFB830",
  warnDim: "#3D2E0A",
  danger: "#FF5252",
  dangerDim: "#3D1010",
  blue: "#4FC3F7",
  blueDim: "#0D2233",
  purple: "#B39DDB",
  purpleDim: "#1E1833",
  text: "#E8EDF5",
  textMuted: "#6B7A99",
  textDim: "#3A4460",
};

const FONT = `'DM Sans', 'Segoe UI', sans-serif`;
const MONO = `'DM Mono', 'Fira Code', monospace`;

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${COLORS.bg}; color: ${COLORS.text}; font-family: ${FONT}; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.surface}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 2px; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
`;

// ── Data ────────────────────────────────────────────────────────────────────

const initialData = {
  subjects: [
    { id: 1, name: "Data Structures", code: "CS301", attended: 28, total: 34, color: COLORS.accent },
    { id: 2, name: "Operating Systems", code: "CS302", attended: 22, total: 34, color: COLORS.blue },
    { id: 3, name: "Database Systems", code: "CS303", attended: 30, total: 34, color: COLORS.warn },
    { id: 4, name: "Computer Networks", code: "CS304", attended: 18, total: 34, color: COLORS.purple },
    { id: 5, name: "Software Engineering", code: "CS305", attended: 32, total: 34, color: "#FF8A65" },
  ],
  assignments: [
    { id: 1, title: "Binary Tree Implementation", subject: "Data Structures", due: "2026-06-02", status: "pending", priority: "high" },
    { id: 2, title: "Process Scheduling Report", subject: "Operating Systems", due: "2026-05-30", status: "pending", priority: "high" },
    { id: 3, title: "ER Diagram for Library", subject: "Database Systems", due: "2026-06-05", status: "in-progress", priority: "medium" },
    { id: 4, title: "Network Topology Design", subject: "Computer Networks", due: "2026-06-10", status: "pending", priority: "low" },
    { id: 5, title: "UML Diagrams", subject: "Software Engineering", due: "2026-05-28", status: "submitted", priority: "high" },
  ],
  exams: [
    { id: 1, subject: "Data Structures", date: "2026-06-15", time: "10:00 AM", type: "Midterm", hall: "Hall A" },
    { id: 2, subject: "Operating Systems", date: "2026-06-17", time: "2:00 PM", type: "Midterm", hall: "Hall B" },
    { id: 3, subject: "Database Systems", date: "2026-06-20", time: "10:00 AM", type: "Midterm", hall: "Hall A" },
    { id: 4, subject: "Computer Networks", date: "2026-06-22", time: "2:00 PM", type: "Midterm", hall: "Hall C" },
  ],
  grades: [
    { id: 1, subject: "Mathematics I", credits: 4, grade: "A+", points: 10 },
    { id: 2, subject: "Physics", credits: 3, grade: "A", points: 9 },
    { id: 3, subject: "Programming Fundamentals", credits: 4, grade: "A+", points: 10 },
    { id: 4, subject: "English Communication", credits: 2, grade: "B+", points: 8 },
    { id: 5, subject: "Digital Logic", credits: 3, grade: "A", points: 9 },
  ],
  timetable: {
    Mon: [
      { time: "9:00", subject: "Data Structures", room: "Room 201", duration: 1 },
      { time: "11:00", subject: "Operating Systems", room: "Lab 101", duration: 2 },
      { time: "2:00", subject: "Software Engineering", room: "Room 301", duration: 1 },
    ],
    Tue: [
      { time: "10:00", subject: "Database Systems", room: "Room 202", duration: 1 },
      { time: "2:00", subject: "Computer Networks", room: "Lab 102", duration: 2 },
    ],
    Wed: [
      { time: "9:00", subject: "Data Structures", room: "Room 201", duration: 1 },
      { time: "11:00", subject: "Database Systems", room: "Room 202", duration: 1 },
      { time: "3:00", subject: "Software Engineering", room: "Room 301", duration: 1 },
    ],
    Thu: [
      { time: "10:00", subject: "Operating Systems", room: "Lab 101", duration: 2 },
      { time: "2:00", subject: "Computer Networks", room: "Lab 102", duration: 1 },
    ],
    Fri: [
      { time: "9:00", subject: "Database Systems", room: "Room 202", duration: 1 },
      { time: "11:00", subject: "Data Structures", room: "Room 201", duration: 1 },
    ],
  },
  profile: {
    name: "Arjun Sharma",
    id: "2023CS0142",
    program: "B.Tech Computer Science",
    semester: "4th Semester",
    institute: "NIT Delhi",
    avatar: "AS",
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function getDaysLeft(dateStr) {
  const today = new Date("2026-05-27");
  const target = new Date(dateStr);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function calcGPA(grades) {
  const totalCredits = grades.reduce((s, g) => s + g.credits, 0);
  const totalPoints = grades.reduce((s, g) => s + g.points * g.credits, 0);
  return (totalPoints / totalCredits).toFixed(2);
}

function attendancePct(a, t) {
  return Math.round((a / t) * 100);
}

// ── Micro Components ─────────────────────────────────────────────────────────

function Badge({ color, bg, children, style }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: bg || COLORS.border, color: color || COLORS.textMuted,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
      padding: "3px 8px", borderRadius: 6,
      textTransform: "uppercase", ...style
    }}>
      {children}
    </span>
  );
}

function CircleProgress({ pct, size = 64, stroke = 5, color }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const c = pct >= 75 ? COLORS.accent : pct >= 60 ? COLORS.warn : COLORS.danger;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={COLORS.border} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color || c} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease" }} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central"
        fill={color || c} fontSize={size * 0.22} fontWeight="700" fontFamily={MONO}
        style={{ transform: "rotate(90deg)", transformOrigin: "center" }}>
        {pct}%
      </text>
    </svg>
  );
}

function Card({ children, style, glow }) {
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderRadius: 16, padding: 20,
      boxShadow: glow ? `0 0 30px ${glow}22` : "none",
      animation: "fadeUp 0.3s ease both",
      ...style
    }}>
      {children}
    </div>
  );
}

function SectionHeader({ title, action, actionLabel }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, letterSpacing: "-0.01em" }}>{title}</h2>
      {action && (
        <button onClick={action} style={{
          background: "none", border: `1px solid ${COLORS.border}`,
          color: COLORS.textMuted, fontSize: 12, padding: "5px 12px",
          borderRadius: 8, cursor: "pointer", fontFamily: FONT,
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.target.style.color = COLORS.text; e.target.style.borderColor = COLORS.textMuted; }}
          onMouseLeave={e => { e.target.style.color = COLORS.textMuted; e.target.style.borderColor = COLORS.border; }}
        >
          {actionLabel || "See all"}
        </button>
      )}
    </div>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────────

const NAV = [
  { id: "dashboard", icon: "⬡", label: "Dashboard" },
  { id: "attendance", icon: "◎", label: "Attendance" },
  { id: "assignments", icon: "◈", label: "Assignments" },
  { id: "exams", icon: "◷", label: "Exams" },
  { id: "gpa", icon: "◈", label: "GPA" },
  { id: "timetable", icon: "▦", label: "Timetable" },
];

function Sidebar({ active, onNav, profile }) {
  return (
    <div style={{
      width: 220, minHeight: "100vh", background: COLORS.surface,
      borderRight: `1px solid ${COLORS.border}`,
      display: "flex", flexDirection: "column",
      position: "sticky", top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: COLORS.accent,
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 700, color: "#000",
          }}>S</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: COLORS.text }}>StudentOS</div>
            <div style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.06em", textTransform: "uppercase" }}>Academic OS</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {NAV.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)} style={{
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", padding: "10px 12px",
              background: isActive ? COLORS.accentDim : "transparent",
              border: "none", borderRadius: 10,
              color: isActive ? COLORS.accent : COLORS.textMuted,
              fontSize: 13, fontWeight: isActive ? 600 : 400,
              cursor: "pointer", fontFamily: FONT,
              marginBottom: 2, transition: "all 0.15s",
              textAlign: "left",
            }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = COLORS.border; e.currentTarget.style.color = COLORS.text; }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.textMuted; }}}
            >
              <span style={{ fontSize: 16, opacity: 0.8 }}>{item.icon}</span>
              {item.label}
              {isActive && <span style={{ marginLeft: "auto", width: 4, height: 4, background: COLORS.accent, borderRadius: "50%" }} />}
            </button>
          );
        })}
      </nav>

      {/* Profile */}
      <div style={{ padding: 16, borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.accentDim}, ${COLORS.blueDim})`,
            border: `1px solid ${COLORS.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: COLORS.accent,
          }}>{profile.avatar}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{profile.name}</div>
            <div style={{ fontSize: 10, color: COLORS.textMuted }}>{profile.semester}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ data, onNav }) {
  const avgAtt = Math.round(data.subjects.reduce((s, sub) => s + attendancePct(sub.attended, sub.total), 0) / data.subjects.length);
  const pending = data.assignments.filter(a => a.status !== "submitted").length;
  const nextExam = data.exams.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  const gpa = calcGPA(data.grades);
  const urgentAssignments = data.assignments.filter(a => a.status !== "submitted" && getDaysLeft(a.due) <= 5)
    .sort((a, b) => getDaysLeft(a.due) - getDaysLeft(b.due));
  const lowAttendance = data.subjects.filter(s => attendancePct(s.attended, s.total) < 75);

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      {/* Greeting */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: COLORS.text }}>
          Good morning, {data.profile.name.split(" ")[0]} 👋
        </div>
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>
          {data.profile.program} · {data.profile.institute}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Avg Attendance", value: `${avgAtt}%`, color: avgAtt >= 75 ? COLORS.accent : COLORS.danger, bg: avgAtt >= 75 ? COLORS.accentDim : COLORS.dangerDim, icon: "◎" },
          { label: "CGPA", value: gpa, color: COLORS.purple, bg: COLORS.purpleDim, icon: "◈" },
          { label: "Pending Tasks", value: pending, color: COLORS.warn, bg: COLORS.warnDim, icon: "◷" },
          { label: "Next Exam", value: nextExam ? `${getDaysLeft(nextExam.date)}d` : "—", color: COLORS.blue, bg: COLORS.blueDim, icon: "◈" },
        ].map(stat => (
          <Card key={stat.label} style={{ background: stat.bg, border: `1px solid ${stat.color}22`, padding: 16 }}>
            <div style={{ fontSize: 11, color: stat.color, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>
              {stat.icon} {stat.label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: MONO, color: stat.color, letterSpacing: "-0.03em" }}>{stat.value}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Upcoming Deadlines */}
        <Card>
          <SectionHeader title="Urgent Deadlines" action={() => onNav("assignments")} />
          {urgentAssignments.length === 0 ? (
            <div style={{ color: COLORS.textMuted, fontSize: 13, padding: "20px 0", textAlign: "center" }}>
              ✓ No urgent deadlines
            </div>
          ) : urgentAssignments.slice(0, 3).map(a => {
            const d = getDaysLeft(a.due);
            return (
              <div key={a.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`,
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, marginBottom: 2 }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{a.subject}</div>
                </div>
                <Badge color={d <= 2 ? COLORS.danger : d <= 4 ? COLORS.warn : COLORS.textMuted}
                  bg={d <= 2 ? COLORS.dangerDim : d <= 4 ? COLORS.warnDim : COLORS.border}>
                  {d === 0 ? "TODAY" : d < 0 ? "OVERDUE" : `${d}d`}
                </Badge>
              </div>
            );
          })}
        </Card>

        {/* Attendance Alerts */}
        <Card>
          <SectionHeader title="Attendance Alerts" action={() => onNav("attendance")} />
          {lowAttendance.length === 0 ? (
            <div style={{ color: COLORS.accent, fontSize: 13, padding: "20px 0", textAlign: "center" }}>
              ✓ All subjects above 75%
            </div>
          ) : lowAttendance.map(s => {
            const pct = attendancePct(s.attended, s.total);
            const needed = Math.ceil((0.75 * s.total - s.attended) / 0.25);
            return (
              <div key={s.id} style={{
                padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</span>
                  <span style={{ fontFamily: MONO, fontSize: 13, color: COLORS.danger, fontWeight: 700 }}>{pct}%</span>
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                  Attend <span style={{ color: COLORS.warn }}>{needed} more</span> classes to reach 75%
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* Exam Countdown */}
      <Card>
        <SectionHeader title="Upcoming Exams" action={() => onNav("exams")} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {data.exams.sort((a, b) => new Date(a.date) - new Date(b.date)).map(exam => {
            const d = getDaysLeft(exam.date);
            return (
              <div key={exam.id} style={{
                background: COLORS.surface, borderRadius: 12, padding: 14,
                border: `1px solid ${COLORS.border}`,
              }}>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{exam.type}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>{exam.subject}</div>
                <div style={{ fontFamily: MONO, fontSize: 24, fontWeight: 700, color: d <= 7 ? COLORS.danger : d <= 14 ? COLORS.warn : COLORS.blue }}>
                  {d}d
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>{exam.date} · {exam.time}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ── Attendance ───────────────────────────────────────────────────────────────

function AttendanceView({ subjects, setSubjects }) {
  const [modal, setModal] = useState(null);
  const [classType, setClassType] = useState("attended");

  function markClass(subId, type) {
    setSubjects(prev => prev.map(s => s.id === subId
      ? { ...s, total: s.total + 1, attended: type === "attended" ? s.attended + 1 : s.attended }
      : s));
    setModal(null);
  }

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <SectionHeader title="Attendance Tracker" actionLabel="+ Mark Class" action={() => setModal("pick")} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {subjects.map(sub => {
          const pct = attendancePct(sub.attended, sub.total);
          const needed = pct < 75 ? Math.ceil((0.75 * sub.total - sub.attended) / 0.25) : 0;
          const canMiss = pct >= 75 ? Math.floor((sub.attended - 0.75 * sub.total) / 0.75) : 0;
          return (
            <Card key={sub.id} style={{ display: "flex", gap: 16, alignItems: "center" }} glow={sub.color}>
              <CircleProgress pct={pct} size={72} color={sub.color} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 2 }}>{sub.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8, fontFamily: MONO }}>{sub.code}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                  {sub.attended}/{sub.total} classes
                </div>
                {pct < 75 ? (
                  <div style={{ fontSize: 11, color: COLORS.danger, marginTop: 4 }}>
                    Need {needed} more to reach 75%
                  </div>
                ) : (
                  <div style={{ fontSize: 11, color: COLORS.accentText, marginTop: 4 }}>
                    Can miss {canMiss} more class{canMiss !== 1 ? "es" : ""}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <button onClick={() => markClass(sub.id, "attended")} style={{
                  background: COLORS.accentDim, border: `1px solid ${COLORS.accent}44`,
                  color: COLORS.accent, fontSize: 11, padding: "5px 10px",
                  borderRadius: 6, cursor: "pointer", fontFamily: FONT, fontWeight: 600,
                }}>✓ Present</button>
                <button onClick={() => markClass(sub.id, "absent")} style={{
                  background: COLORS.dangerDim, border: `1px solid ${COLORS.danger}44`,
                  color: COLORS.danger, fontSize: 11, padding: "5px 10px",
                  borderRadius: 6, cursor: "pointer", fontFamily: FONT, fontWeight: 600,
                }}>✗ Absent</button>
              </div>
            </Card>
          );
        })}
      </div>
      {/* Summary */}
      <Card style={{ background: COLORS.surface }}>
        <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          {[
            { label: "Subjects on Track", value: subjects.filter(s => attendancePct(s.attended, s.total) >= 75).length, color: COLORS.accent },
            { label: "Below 75%", value: subjects.filter(s => attendancePct(s.attended, s.total) < 75).length, color: COLORS.danger },
            { label: "Overall Average", value: `${Math.round(subjects.reduce((s, sub) => s + attendancePct(sub.attended, sub.total), 0) / subjects.length)}%`, color: COLORS.blue },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: MONO, fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── Assignments ───────────────────────────────────────────────────────────────

function AssignmentsView({ assignments, setAssignments }) {
  const [filter, setFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newA, setNewA] = useState({ title: "", subject: "", due: "", priority: "medium" });

  const filtered = assignments.filter(a => filter === "all" ? true : a.status === filter);

  function updateStatus(id, status) {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }

  function addAssignment() {
    if (!newA.title || !newA.subject || !newA.due) return;
    setAssignments(prev => [...prev, { ...newA, id: Date.now(), status: "pending" }]);
    setNewA({ title: "", subject: "", due: "", priority: "medium" });
    setShowAdd(false);
  }

  const statusColors = { pending: [COLORS.textMuted, COLORS.border], "in-progress": [COLORS.blue, COLORS.blueDim], submitted: [COLORS.accent, COLORS.accentDim] };
  const priorityColors = { high: COLORS.danger, medium: COLORS.warn, low: COLORS.accentText };

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>Assignments</h2>
        <button onClick={() => setShowAdd(!showAdd)} style={{
          background: COLORS.accent, border: "none", color: "#000",
          fontSize: 12, fontWeight: 700, padding: "8px 16px",
          borderRadius: 8, cursor: "pointer", fontFamily: FONT,
        }}>+ Add Assignment</button>
      </div>

      {showAdd && (
        <Card style={{ marginBottom: 16, background: COLORS.surface, border: `1px solid ${COLORS.accent}44` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            {[
              { key: "title", placeholder: "Assignment title", cols: 2 },
              { key: "subject", placeholder: "Subject" },
              { key: "due", placeholder: "Due date", type: "date" },
            ].map(f => (
              <input key={f.key} type={f.type || "text"} placeholder={f.placeholder}
                value={newA[f.key]} onChange={e => setNewA(p => ({ ...p, [f.key]: e.target.value }))}
                style={{
                  gridColumn: f.cols === 2 ? "1 / -1" : "auto",
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  color: COLORS.text, padding: "8px 12px", borderRadius: 8,
                  fontSize: 13, fontFamily: FONT, outline: "none",
                }} />
            ))}
            <select value={newA.priority} onChange={e => setNewA(p => ({ ...p, priority: e.target.value }))}
              style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "8px 12px", borderRadius: 8, fontSize: 13, fontFamily: FONT }}>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={addAssignment} style={{ background: COLORS.accent, border: "none", color: "#000", fontSize: 12, fontWeight: 700, padding: "7px 16px", borderRadius: 7, cursor: "pointer", fontFamily: FONT }}>Add</button>
            <button onClick={() => setShowAdd(false)} style={{ background: COLORS.border, border: "none", color: COLORS.textMuted, fontSize: 12, padding: "7px 14px", borderRadius: 7, cursor: "pointer", fontFamily: FONT }}>Cancel</button>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["all", "pending", "in-progress", "submitted"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? COLORS.accent : COLORS.card,
            border: `1px solid ${filter === f ? COLORS.accent : COLORS.border}`,
            color: filter === f ? "#000" : COLORS.textMuted,
            fontSize: 11, fontWeight: 600, padding: "5px 12px",
            borderRadius: 8, cursor: "pointer", fontFamily: FONT,
            textTransform: "capitalize",
          }}>{f === "all" ? `All (${assignments.length})` : f}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(a => {
          const d = getDaysLeft(a.due);
          const [sc, sb] = statusColors[a.status] || statusColors.pending;
          return (
            <Card key={a.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: 14 }}>
              <div style={{
                width: 3, height: 40, borderRadius: 2,
                background: priorityColors[a.priority] || COLORS.textMuted,
                flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: a.status === "submitted" ? COLORS.textMuted : COLORS.text, textDecoration: a.status === "submitted" ? "line-through" : "none", marginBottom: 3 }}>
                  {a.title}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>{a.subject} · Due {a.due}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {a.status !== "submitted" && (
                  <Badge color={d <= 2 ? COLORS.danger : d <= 5 ? COLORS.warn : COLORS.textMuted}
                    bg={d <= 2 ? COLORS.dangerDim : d <= 5 ? COLORS.warnDim : COLORS.border}>
                    {d < 0 ? "overdue" : d === 0 ? "today" : `${d}d left`}
                  </Badge>
                )}
                <select value={a.status} onChange={e => updateStatus(a.id, e.target.value)} style={{
                  background: sb, border: `1px solid ${sc}44`, color: sc,
                  fontSize: 11, fontWeight: 600, padding: "4px 8px", borderRadius: 6,
                  cursor: "pointer", fontFamily: FONT, outline: "none",
                }}>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="submitted">Submitted</option>
                </select>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── Exams ────────────────────────────────────────────────────────────────────

function ExamsView({ exams }) {
  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <SectionHeader title="Exam Countdown" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {exams.sort((a, b) => new Date(a.date) - new Date(b.date)).map(exam => {
          const d = getDaysLeft(exam.date);
          const pct = Math.max(0, Math.min(100, 100 - (d / 30) * 100));
          const urgency = d <= 7 ? COLORS.danger : d <= 14 ? COLORS.warn : COLORS.blue;
          return (
            <Card key={exam.id} style={{ overflow: "hidden", position: "relative" }} glow={urgency}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${urgency} ${pct}%, ${COLORS.border} ${pct}%)`,
              }} />
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <Badge color={urgency} bg={`${urgency}22`}>{exam.type}</Badge>
                    <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginTop: 8 }}>{exam.subject}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: MONO, fontSize: 36, fontWeight: 700, color: urgency, lineHeight: 1 }}>{d}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>days left</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 12, color: COLORS.textMuted }}>
                  <span>📅 {exam.date}</span>
                  <span>🕐 {exam.time}</span>
                  <span>📍 {exam.hall}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── GPA ──────────────────────────────────────────────────────────────────────

function GPAView({ grades, setGrades }) {
  const [newG, setNewG] = useState({ subject: "", credits: 3, grade: "A", points: 9 });
  const [showAdd, setShowAdd] = useState(false);

  const gradeMap = { "O": 10, "A+": 10, "A": 9, "B+": 8, "B": 7, "C+": 6, "C": 5, "D": 4, "F": 0 };

  const gpa = calcGPA(grades);
  const totalCredits = grades.reduce((s, g) => s + g.credits, 0);

  const gradeColors = { "O": COLORS.accent, "A+": COLORS.accent, "A": COLORS.accentText, "B+": COLORS.blue, "B": COLORS.purple, "C+": COLORS.warn, "C": COLORS.warn, "D": COLORS.danger, "F": COLORS.danger };

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>GPA Calculator</h2>
        <button onClick={() => setShowAdd(!showAdd)} style={{ background: COLORS.accent, border: "none", color: "#000", fontSize: 12, fontWeight: 700, padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontFamily: FONT }}>+ Add Course</button>
      </div>

      {/* GPA Hero */}
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.accentDim}, ${COLORS.purpleDim})`, border: `1px solid ${COLORS.accent}44`, marginBottom: 16, textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 13, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Current CGPA</div>
        <div style={{ fontFamily: MONO, fontSize: 56, fontWeight: 700, color: COLORS.accent, letterSpacing: "-0.04em", lineHeight: 1 }}>{gpa}</div>
        <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8 }}>Based on {totalCredits} credits · {grades.length} courses</div>
      </Card>

      {showAdd && (
        <Card style={{ marginBottom: 16, background: COLORS.surface }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
            <input placeholder="Subject name" value={newG.subject}
              onChange={e => setNewG(p => ({ ...p, subject: e.target.value }))}
              style={{ gridColumn: "1 / -1", background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "8px 12px", borderRadius: 8, fontSize: 13, fontFamily: FONT, outline: "none" }} />
            <select value={newG.credits} onChange={e => setNewG(p => ({ ...p, credits: Number(e.target.value) }))}
              style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "8px 12px", borderRadius: 8, fontSize: 13, fontFamily: FONT }}>
              {[1, 2, 3, 4, 5].map(c => <option key={c} value={c}>{c} Credits</option>)}
            </select>
            <select value={newG.grade} onChange={e => setNewG(p => ({ ...p, grade: e.target.value, points: gradeMap[e.target.value] || 0 }))}
              style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text, padding: "8px 12px", borderRadius: 8, fontSize: 13, fontFamily: FONT }}>
              {Object.keys(gradeMap).map(g => <option key={g} value={g}>{g} ({gradeMap[g]})</option>)}
            </select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { if (newG.subject) { setGrades(p => [...p, { ...newG, id: Date.now() }]); setNewG({ subject: "", credits: 3, grade: "A", points: 9 }); setShowAdd(false); }}}
              style={{ background: COLORS.accent, border: "none", color: "#000", fontSize: 12, fontWeight: 700, padding: "7px 16px", borderRadius: 7, cursor: "pointer", fontFamily: FONT }}>Add</button>
            <button onClick={() => setShowAdd(false)} style={{ background: COLORS.border, border: "none", color: COLORS.textMuted, fontSize: 12, padding: "7px 14px", borderRadius: 7, cursor: "pointer", fontFamily: FONT }}>Cancel</button>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {grades.map(g => (
          <Card key={g.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: `${gradeColors[g.grade] || COLORS.textMuted}22`,
              border: `1px solid ${gradeColors[g.grade] || COLORS.textMuted}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: MONO, fontWeight: 700, color: gradeColors[g.grade] || COLORS.textMuted, fontSize: 13,
            }}>{g.grade}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, marginBottom: 2 }}>{g.subject}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>{g.credits} Credits</div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, color: gradeColors[g.grade] || COLORS.textMuted }}>{g.points}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Timetable ────────────────────────────────────────────────────────────────

function TimetableView({ timetable, subjects }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const today = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date("2026-05-27").getDay()];
  const [activeDay, setActiveDay] = useState(today === "Sun" || today === "Sat" ? "Mon" : today);

  const subjectColors = Object.fromEntries(subjects.map(s => [s.name, s.color]));

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <SectionHeader title="Timetable" />
      {/* Day selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {days.map(d => (
          <button key={d} onClick={() => setActiveDay(d)} style={{
            flex: 1, padding: "10px 0",
            background: activeDay === d ? COLORS.accent : COLORS.card,
            border: `1px solid ${activeDay === d ? COLORS.accent : COLORS.border}`,
            color: activeDay === d ? "#000" : d === today ? COLORS.accent : COLORS.textMuted,
            fontSize: 12, fontWeight: 600, borderRadius: 10, cursor: "pointer", fontFamily: FONT,
          }}>
            {d}
            {d === today && <span style={{ display: "block", fontSize: 9, marginTop: 2, opacity: 0.7 }}>today</span>}
          </button>
        ))}
      </div>

      {/* Classes */}
      <div style={{ position: "relative", paddingLeft: 60 }}>
        <div style={{ position: "absolute", left: 24, top: 0, bottom: 0, width: 1, background: COLORS.border }} />
        {(timetable[activeDay] || []).map((cls, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 16 }}>
            <div style={{
              position: "absolute", left: -46, top: 4,
              fontSize: 11, color: COLORS.textMuted, fontFamily: MONO, width: 40, textAlign: "right",
            }}>{cls.time}</div>
            <div style={{
              position: "absolute", left: -29, top: 6,
              width: 8, height: 8, borderRadius: "50%",
              background: subjectColors[cls.subject] || COLORS.accent,
              border: `2px solid ${COLORS.bg}`,
            }} />
            <Card style={{ padding: 14, borderLeft: `3px solid ${subjectColors[cls.subject] || COLORS.accent}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>{cls.subject}</div>
              <div style={{ display: "flex", gap: 12, fontSize: 11, color: COLORS.textMuted }}>
                <span>📍 {cls.room}</span>
                <span>⏱ {cls.duration}h</span>
              </div>
            </Card>
          </div>
        ))}
        {(!timetable[activeDay] || timetable[activeDay].length === 0) && (
          <div style={{ color: COLORS.textMuted, fontSize: 14, padding: "40px 0", textAlign: "center" }}>No classes scheduled</div>
        )}
      </div>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────

export default function StudentOS() {
  const [page, setPage] = useState("dashboard");
  const [data, setData] = useState(initialData);

  const setSubjects = fn => setData(d => ({ ...d, subjects: fn(d.subjects) }));
  const setAssignments = fn => setData(d => ({ ...d, assignments: fn(d.assignments) }));
  const setGrades = fn => setData(d => ({ ...d, grades: fn(d.grades) }));

  const views = {
    dashboard: <Dashboard data={data} onNav={setPage} />,
    attendance: <AttendanceView subjects={data.subjects} setSubjects={setSubjects} />,
    assignments: <AssignmentsView assignments={data.assignments} setAssignments={setAssignments} />,
    exams: <ExamsView exams={data.exams} />,
    gpa: <GPAView grades={data.grades} setGrades={setGrades} />,
    timetable: <TimetableView timetable={data.timetable} subjects={data.subjects} />,
  };

  return (
    <>
      <style>{globalStyle}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: COLORS.bg }}>
        <Sidebar active={page} onNav={setPage} profile={data.profile} />
        <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto", maxWidth: 960 }}>
          {views[page]}
        </main>
      </div>
    </>
  );
}
