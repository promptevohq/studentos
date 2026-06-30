// ── StudentOS Course Database ─────────────────────────────────────────────────
// Standard subjects per course and year based on official Indian university syllabi

export const COURSE_CATEGORIES = [
  "Medical & Health Sciences",
  "Engineering & Technology",
  "Science",
  "Commerce & Management",
  "Arts & Humanities",
  "Computer & IT",
  "Law",
  "Education",
  "Agriculture",
  "Architecture & Design",
  "Hotel & Hospitality",
  "Pharmacy",
];

export const COURSES = {
  "Medical & Health Sciences": {
    "BHMS": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "Final Year"],
      subjects: {
        "1st Year": ["Anatomy", "Physiology", "Biochemistry", "Organon of Medicine", "Homoeopathic Pharmacy", "Homoeopathic Materia Medica"],
        "2nd Year": ["Pathology & Microbiology", "Forensic Medicine & Toxicology", "Organon of Medicine", "Homoeopathic Materia Medica", "Community Medicine"],
        "3rd Year": ["Practice of Medicine", "Surgery", "Obstetrics & Gynaecology", "Organon of Medicine", "Homoeopathic Materia Medica", "ENT & Ophthalmology"],
        "Final Year": ["Practice of Medicine", "Surgery", "Obstetrics & Gynaecology", "Organon of Medicine", "Homoeopathic Materia Medica", "Paediatrics", "Community Medicine"],
      }
    },
    "MBBS": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "Final Year"],
      subjects: {
        "1st Year": ["Anatomy", "Physiology", "Biochemistry"],
        "2nd Year": ["Pathology", "Microbiology", "Pharmacology", "Forensic Medicine & Toxicology"],
        "3rd Year": ["Community Medicine", "Ophthalmology", "ENT", "Medicine", "Surgery", "Obstetrics & Gynaecology"],
        "Final Year": ["Medicine", "Surgery", "Obstetrics & Gynaecology", "Paediatrics", "Community Medicine", "Orthopaedics", "Dermatology & Venereology", "Psychiatry"],
      }
    },
    "BDS": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "Final Year"],
      subjects: {
        "1st Year": ["Anatomy", "Physiology", "Biochemistry", "Dental Anatomy & Histology", "Dental Materials"],
        "2nd Year": ["Oral Pathology & Microbiology", "Pharmacology", "General Medicine", "General Surgery", "Oral Medicine & Radiology"],
        "3rd Year": ["Conservative Dentistry & Endodontics", "Oral Surgery", "Periodontology", "Orthodontics", "Prosthodontics"],
        "Final Year": ["Conservative Dentistry", "Oral & Maxillofacial Surgery", "Periodontology", "Orthodontics", "Prosthodontics", "Pedodontics", "Community Dentistry"],
      }
    },
    "BAMS": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "Final Year"],
      subjects: {
        "1st Year": ["Sanskrit", "Padartha Vigyana", "Rachana Sharir", "Kriya Sharir", "Maulik Siddhanta"],
        "2nd Year": ["Dravyaguna Vigyana", "Rasa Shastra & Bhaishajya Kalpana", "Charaka Samhita", "Roganidana", "Vikriti Vigyana"],
        "3rd Year": ["Kayachikitsa", "Panchkarma", "Shalya Tantra", "Shalakya Tantra", "Prasuti Tantra & Stri Roga"],
        "Final Year": ["Kayachikitsa", "Rasayana & Vajikarna", "Shalya Tantra", "Shalakya Tantra", "Swasthavritta & Yoga", "Agad Tantra"],
      }
    },
    "BUMS": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "Final Year"],
      subjects: {
        "1st Year": ["Arabic & Persian", "Kulliyat", "Tashreeh ul Badan", "Physiology", "Biochemistry"],
        "2nd Year": ["Ilmul Advia", "Ilmul Amraz", "Moalijat", "Pharmacognosy"],
        "3rd Year": ["Moalijat", "Surgery", "Ilmul Qabalat", "Preventive Medicine"],
        "Final Year": ["Moalijat", "Surgery", "Ilmul Qabalat", "Tib-e-Qanuni", "Community Medicine"],
      }
    },
    "B.Sc Nursing": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Anatomy", "Physiology", "Nutrition & Biochemistry", "Nursing Foundations", "Psychology", "Microbiology", "Introduction to Computers"],
        "2nd Year": ["Medical-Surgical Nursing I", "Pharmacology", "Pathology & Genetics", "Community Health Nursing I", "Communication & Educational Technology"],
        "3rd Year": ["Medical-Surgical Nursing II", "Child Health Nursing", "Mental Health Nursing", "Midwifery & Obstetric Nursing"],
        "4th Year": ["Midwifery & Obstetric Nursing", "Community Health Nursing II", "Management of Nursing Services & Education", "Research & Statistics in Nursing"],
      }
    },
    "GNM": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Anatomy & Physiology", "Microbiology", "Psychology & Sociology", "Fundamentals of Nursing", "First Aid", "Community Health Nursing"],
        "2nd Year": ["Medical-Surgical Nursing", "Pharmacology", "Psychiatric Nursing", "Child Health Nursing"],
        "3rd Year": ["Midwifery & Gynaecology", "Community Health Nursing", "Nursing Administration & Ward Management"],
      }
    },
    "B.Sc MLT": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Anatomy & Physiology", "Biochemistry", "Microbiology", "Haematology", "Basic Laboratory Sciences"],
        "2nd Year": ["Clinical Biochemistry", "Clinical Microbiology", "Histopathology & Cytology", "Blood Banking & Transfusion Medicine"],
        "3rd Year": ["Advanced Clinical Biochemistry", "Molecular Diagnostics", "Immunology & Serology", "Research Methodology & Biostatistics"],
      }
    },
    "BNYS": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "Final Year"],
      subjects: {
        "1st Year": ["Anatomy", "Physiology", "Biochemistry", "History & Philosophy of Naturopathy", "Yoga Philosophy & Practice"],
        "2nd Year": ["Pathology", "Microbiology", "Pharmacology", "Naturopathic Dietetics", "Hydrotherapy"],
        "3rd Year": ["Principles of Naturopathy", "Yoga Therapy", "Physiotherapy", "Community Medicine", "Mud Therapy & Massotherapy"],
        "Final Year": ["Clinical Naturopathy", "Advanced Yoga Therapy", "Research Methodology", "Hospital Administration", "Community Health"],
      }
    },
  },

  "Pharmacy": {
    "B.Pharm": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Pharmaceutics I", "Pharmaceutical Chemistry I", "Pharmacognosy I", "Human Anatomy & Physiology", "Communication Skills", "Remedial Mathematics"],
        "2nd Year": ["Pharmaceutics II", "Pharmaceutical Chemistry II", "Pharmacognosy II", "Pathophysiology", "Computer Applications", "Environmental Sciences"],
        "3rd Year": ["Pharmaceutics III", "Pharmaceutical Chemistry III", "Pharmacology I", "Pharmacognosy III", "Pharmaceutical Jurisprudence", "Industrial Pharmacy I"],
        "4th Year": ["Novel Drug Delivery Systems", "Pharmacology II", "Pharmacognosy IV", "Biopharmaceutics & Pharmacokinetics", "Pharmaceutical Biotechnology", "Hospital & Clinical Pharmacy", "Biostatistics & Research Methodology"],
      }
    },
    "D.Pharm": {
      duration: 2,
      years: ["1st Year", "2nd Year"],
      subjects: {
        "1st Year": ["Pharmaceutics I", "Pharmaceutical Chemistry I", "Pharmacognosy", "Human Anatomy & Physiology", "Health Education & Community Pharmacy"],
        "2nd Year": ["Pharmaceutics II", "Pharmaceutical Chemistry II", "Pharmacology & Toxicology", "Pharmaceutical Jurisprudence", "Drug Store & Business Management", "Hospital & Clinical Pharmacy"],
      }
    },
    "Pharm.D": {
      duration: 6,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "6th Year (Internship)"],
      subjects: {
        "1st Year": ["Human Anatomy & Physiology", "Pharmaceutics", "Medicinal Biochemistry", "Pharmaceutical Organic Chemistry", "Pharmaceutical Inorganic Chemistry"],
        "2nd Year": ["Pathophysiology", "Pharmaceutical Microbiology", "Pharmacognosy & Phytopharmaceuticals", "Pharmacology I", "Community Pharmacy & Management"],
        "3rd Year": ["Pharmacology II", "Pharmaceutical Analysis", "Pharmacotherapeutics I", "Pharmaceutical Jurisprudence", "Biopharmaceutics & Pharmacokinetics"],
        "4th Year": ["Pharmacotherapeutics II", "Pharmacotherapeutics III", "Hospital Pharmacy", "Clinical Pharmacy", "Pharmacoepidemiology & Pharmacoeconomics"],
        "5th Year": ["Clinical Research", "Medication Therapy Management", "Evidence Based Medicine", "Pharmacy Practice Research"],
        "6th Year (Internship)": ["Clinical Clerkship", "Patient Counselling", "Drug Information Services"],
      }
    },
  },

  "Engineering & Technology": {
    "B.Tech / B.E. Computer Science": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Engineering Mathematics I", "Engineering Physics", "Engineering Chemistry", "Basic Electrical Engineering", "Engineering Graphics", "Programming in C"],
        "2nd Year": ["Data Structures", "Discrete Mathematics", "Digital Electronics", "Computer Organization & Architecture", "Object Oriented Programming", "Database Management Systems"],
        "3rd Year": ["Operating Systems", "Computer Networks", "Algorithm Design & Analysis", "Software Engineering", "Web Technologies", "Theory of Computation"],
        "4th Year": ["Machine Learning", "Cloud Computing", "Information Security", "Compiler Design", "Project Work", "Elective I", "Elective II"],
      }
    },
    "B.Tech / B.E. Information Technology": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Engineering Mathematics I", "Engineering Physics", "Engineering Chemistry", "Basic Electronics", "Engineering Graphics", "Programming Fundamentals"],
        "2nd Year": ["Data Structures & Algorithms", "Digital Logic Design", "Database Systems", "OOP with Java", "Computer Networks I", "Mathematics II"],
        "3rd Year": ["Operating Systems", "Software Engineering", "Web Development", "Network Security", "Mobile Application Development", "Data Warehousing & Mining"],
        "4th Year": ["Cloud Computing", "Artificial Intelligence", "IoT & Embedded Systems", "Project Management", "Project Work", "Elective I"],
      }
    },
    "B.Tech / B.E. Electronics & Communication": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Engineering Mathematics I", "Engineering Physics", "Engineering Chemistry", "Basic Electrical Engineering", "Engineering Graphics", "Programming in C"],
        "2nd Year": ["Electronic Devices & Circuits", "Signals & Systems", "Digital Electronics", "Network Analysis", "Electromagnetic Theory", "Analog Circuits"],
        "3rd Year": ["Communication Systems", "Microprocessors & Microcontrollers", "VLSI Design", "Digital Signal Processing", "Control Systems", "Antenna & Wave Propagation"],
        "4th Year": ["Wireless Communications", "Embedded Systems", "Optical Fiber Communication", "Advanced Communication Systems", "Project Work", "Elective I"],
      }
    },
    "B.Tech / B.E. Electrical Engineering": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Engineering Mathematics I", "Engineering Physics", "Engineering Chemistry", "Basic Electrical Engineering", "Engineering Graphics", "Workshop Practice"],
        "2nd Year": ["Circuit Analysis", "Electromagnetic Theory", "Electronic Devices", "Electrical Machines I", "Mathematics II", "Signals & Systems"],
        "3rd Year": ["Electrical Machines II", "Power Systems I", "Control Systems", "Power Electronics", "Microprocessors", "Measurements & Instrumentation"],
        "4th Year": ["Power Systems II", "High Voltage Engineering", "Drives & Control", "Switchgear & Protection", "Project Work", "Elective I"],
      }
    },
    "B.Tech / B.E. Mechanical Engineering": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Engineering Mathematics I", "Engineering Physics", "Engineering Chemistry", "Engineering Graphics", "Basic Electrical Engineering", "Workshop Technology"],
        "2nd Year": ["Engineering Thermodynamics", "Material Science & Metallurgy", "Fluid Mechanics", "Manufacturing Processes", "Strength of Materials", "Kinematics of Machinery"],
        "3rd Year": ["Heat & Mass Transfer", "Machine Design", "Industrial Engineering & Management", "Dynamics of Machinery", "Metrology & Quality Control", "CAD/CAM"],
        "4th Year": ["Finite Element Analysis", "Refrigeration & Air Conditioning", "Power Plant Engineering", "Mechatronics", "Project Work", "Elective I"],
      }
    },
    "B.Tech / B.E. Civil Engineering": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Engineering Mathematics I", "Engineering Physics", "Engineering Chemistry", "Engineering Graphics", "Mechanics of Solids", "Surveying I"],
        "2nd Year": ["Fluid Mechanics", "Structural Analysis I", "Building Materials & Construction", "Soil Mechanics", "Concrete Technology", "Transportation Engineering I"],
        "3rd Year": ["Design of Steel Structures", "Design of RCC Structures", "Geotechnical Engineering", "Environmental Engineering", "Hydrology & Water Resources", "Surveying II"],
        "4th Year": ["Advanced Structural Design", "Construction Management", "Irrigation Engineering", "Foundation Engineering", "Project Work", "Elective I"],
      }
    },
    "B.Tech / B.E. Chemical Engineering": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Engineering Mathematics I", "Engineering Physics", "Engineering Chemistry", "Basic Electrical Engineering", "Engineering Graphics", "Introduction to Chemical Engineering"],
        "2nd Year": ["Fluid Mechanics", "Heat Transfer", "Mass Transfer I", "Chemical Thermodynamics", "Organic Chemistry", "Numerical Methods"],
        "3rd Year": ["Mass Transfer II", "Chemical Reaction Engineering", "Process Dynamics & Control", "Plant Design & Economics", "Petroleum Refining", "Industrial Chemistry"],
        "4th Year": ["Chemical Process Safety", "Environmental Engineering", "Biochemical Engineering", "Polymer Technology", "Project Work", "Elective I"],
      }
    },
    "B.Tech / B.E. Biotechnology": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Engineering Mathematics", "Engineering Physics", "Engineering Chemistry", "Cell Biology", "Biochemistry I", "Introduction to Biotechnology"],
        "2nd Year": ["Genetics & Molecular Biology", "Microbiology", "Biochemistry II", "Bioprocess Engineering I", "Immunology", "Bioinformatics"],
        "3rd Year": ["Genetic Engineering", "Bioprocess Engineering II", "Animal Cell Technology", "Plant Biotechnology", "Industrial Biotechnology", "Biostatistics"],
        "4th Year": ["Pharmaceutical Biotechnology", "Environmental Biotechnology", "Nanobiotechnology", "Biosafety & Bioethics", "Project Work", "Elective I"],
      }
    },
    "Diploma Engineering (CS/IT)": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Applied Mathematics", "Applied Physics", "Applied Chemistry", "Basic Computer Skills", "English Communication", "Engineering Drawing"],
        "2nd Year": ["Data Structures", "Database Management", "Web Design", "OOP Concepts", "Operating Systems", "Computer Networks Basics"],
        "3rd Year": ["Advanced Programming", "Software Engineering", "Mobile App Development", "Project Work", "Elective I", "Industrial Training"],
      }
    },
  },

  "Science": {
    "B.Sc Physics": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Mechanics & Properties of Matter", "Electricity & Magnetism", "Mathematics I", "Chemistry I", "Computer Applications", "Environmental Science"],
        "2nd Year": ["Optics", "Thermal & Statistical Physics", "Electronics", "Mathematics II", "Modern Physics", "Mathematical Physics"],
        "3rd Year": ["Quantum Mechanics", "Nuclear & Particle Physics", "Solid State Physics", "Spectroscopy", "Electromagnetic Theory", "Advanced Electronics"],
      }
    },
    "B.Sc Chemistry": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Inorganic Chemistry I", "Organic Chemistry I", "Physical Chemistry I", "Mathematics I", "Physics I", "Environmental Science"],
        "2nd Year": ["Inorganic Chemistry II", "Organic Chemistry II", "Physical Chemistry II", "Analytical Chemistry", "Biochemistry", "Mathematics II"],
        "3rd Year": ["Inorganic Chemistry III", "Organic Chemistry III", "Physical Chemistry III", "Industrial Chemistry", "Environmental Chemistry", "Spectroscopy"],
      }
    },
    "B.Sc Biology / Zoology / Botany": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Cell Biology & Genetics", "Biochemistry", "Microbiology", "Ecology & Environmental Science", "Chemistry", "Computer Applications"],
        "2nd Year": ["Animal / Plant Physiology", "Developmental Biology", "Molecular Biology", "Biotechnology", "Immunology", "Biostatistics"],
        "3rd Year": ["Evolution & Systematics", "Taxonomy", "Bioinformatics", "Neuroscience", "Endocrinology", "Research Methodology"],
      }
    },
    "B.Sc Mathematics": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Calculus", "Algebra I", "Differential Equations", "Physics I", "Computer Applications", "Environmental Science"],
        "2nd Year": ["Real Analysis", "Linear Algebra", "Abstract Algebra", "Mechanics", "Probability & Statistics", "Numerical Methods"],
        "3rd Year": ["Complex Analysis", "Topology", "Number Theory", "Mathematical Methods", "Operations Research", "Graph Theory"],
      }
    },
    "B.Sc Computer Science": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Programming in C", "Mathematics I", "Digital Electronics", "Environmental Science", "English Communication", "Office Automation"],
        "2nd Year": ["Data Structures", "Database Management", "OOP with C++/Java", "Operating Systems", "Discrete Mathematics", "Computer Networks"],
        "3rd Year": ["Software Engineering", "Web Technologies", "Artificial Intelligence", "Computer Graphics", "Project Work", "Elective I"],
      }
    },
    "B.Sc Statistics": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Descriptive Statistics", "Probability Theory", "Mathematics I", "Computer Applications", "Economics I", "Environmental Science"],
        "2nd Year": ["Statistical Inference", "Sampling Theory", "Mathematics II", "Economics II", "Operations Research", "Demography"],
        "3rd Year": ["Advanced Statistical Inference", "Design of Experiments", "Econometrics", "Actuarial Statistics", "Biostatistics", "Time Series Analysis"],
      }
    },
    "B.Sc Microbiology": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Bacteriology", "Biochemistry", "Cell Biology", "Chemistry", "Environmental Science", "Computer Applications"],
        "2nd Year": ["Virology", "Mycology & Parasitology", "Immunology", "Microbial Genetics", "Biostatistics", "Industrial Microbiology"],
        "3rd Year": ["Medical Microbiology", "Food Microbiology", "Environmental Microbiology", "Biotechnology", "Research Methodology", "Bioinformatics"],
      }
    },
    "B.Sc Biotechnology": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Cell Biology & Genetics", "Biochemistry", "Microbiology", "Chemistry", "Mathematics / Biostatistics", "Environmental Science"],
        "2nd Year": ["Molecular Biology", "Immunology", "Genetic Engineering", "Plant Biotechnology", "Animal Biotechnology", "Bioinformatics"],
        "3rd Year": ["Industrial Biotechnology", "Pharmaceutical Biotechnology", "Environmental Biotechnology", "Bioethics & Biosafety", "Research Methodology", "Project Work"],
      }
    },
  },

  "Commerce & Management": {
    "B.Com": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Financial Accounting", "Business Economics", "Business Mathematics & Statistics", "Business Communication", "Business Law", "Environmental Studies"],
        "2nd Year": ["Corporate Accounting", "Cost Accounting", "Business Statistics", "Income Tax Law & Practice", "Company Law", "Banking Theory & Practice"],
        "3rd Year": ["Advanced Accounting", "Auditing & Assurance", "Financial Management", "Management Accounting", "Business Ethics & Corporate Governance", "Entrepreneurship Development"],
      }
    },
    "B.Com Hons": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Financial Accounting", "Business Laws", "Business Mathematics", "Business Economics I", "English Communication", "Environmental Studies"],
        "2nd Year": ["Corporate Accounting", "Income Tax", "Cost Accounting", "Business Economics II", "Business Statistics", "Company Law"],
        "3rd Year": ["Financial Management", "Auditing", "Management Accounting", "Direct Tax Laws", "Indirect Tax Laws", "Research Methodology"],
      }
    },
    "BBA": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Principles of Management", "Business Economics", "Financial Accounting", "Business Communication", "Business Mathematics", "Environmental Studies"],
        "2nd Year": ["Marketing Management", "Human Resource Management", "Financial Management", "Operations Management", "Business Law", "Organisational Behaviour"],
        "3rd Year": ["Strategic Management", "Entrepreneurship Development", "International Business", "Project Management", "Business Ethics", "Research Methodology"],
      }
    },
    "MBA": {
      duration: 2,
      years: ["1st Year", "2nd Year"],
      subjects: {
        "1st Year": ["Management Concepts & OB", "Managerial Economics", "Financial Management", "Marketing Management", "Human Resource Management", "Operations Management", "Business Research Methods", "Business Communication"],
        "2nd Year": ["Strategic Management", "International Business", "Entrepreneurship & Innovation", "Business Ethics & Corporate Governance", "Elective I", "Elective II", "Project Work"],
      }
    },
    "CA Foundation": {
      duration: 1,
      years: ["Foundation"],
      subjects: {
        "Foundation": ["Principles & Practice of Accounting", "Business Laws & Business Correspondence", "Business Mathematics & Logical Reasoning", "Business Economics & Business & Commercial Knowledge"],
      }
    },
    "CA Intermediate": {
      duration: 1,
      years: ["Group I", "Group II"],
      subjects: {
        "Group I": ["Accounting", "Corporate & Other Laws", "Taxation", "Cost & Management Accounting"],
        "Group II": ["Advanced Accounting", "Auditing & Assurance", "Enterprise Information Systems & Strategic Management", "Financial Management & Economics for Finance"],
      }
    },
  },

  "Arts & Humanities": {
    "BA English": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["British Literature I", "Indian Writing in English I", "Linguistics", "Communication Skills", "History I", "Environmental Studies"],
        "2nd Year": ["British Literature II", "American Literature", "Literary Theory & Criticism", "Drama", "Indian Writing in English II", "Second Language"],
        "3rd Year": ["Postcolonial Literature", "Modern Literature", "Research Methodology", "Dissertation / Project", "Elective I", "Elective II"],
      }
    },
    "BA Economics": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Microeconomics I", "Macroeconomics I", "Mathematics for Economics I", "Indian Economy I", "Statistics for Economics", "Environmental Studies"],
        "2nd Year": ["Microeconomics II", "Macroeconomics II", "Development Economics", "International Economics", "Public Finance", "Econometrics"],
        "3rd Year": ["Advanced Microeconomics", "Advanced Macroeconomics", "Financial Economics", "Environmental Economics", "Research Methods", "Project Work"],
      }
    },
    "BA History": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Ancient Indian History", "World History I", "Introduction to Archaeology", "Political Science I", "Environmental Studies", "Communication Skills"],
        "2nd Year": ["Medieval Indian History", "Modern World History", "Historical Methodology", "Political Science II", "Sociology I", "Geography"],
        "3rd Year": ["Modern Indian History", "Contemporary World", "History of Science & Technology", "Research Methodology", "Dissertation", "Elective I"],
      }
    },
    "BA Political Science": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Introduction to Political Theory", "Indian Government & Politics I", "Comparative Politics I", "History I", "Environmental Studies", "Communication Skills"],
        "2nd Year": ["Political Theory II", "Indian Government & Politics II", "International Relations I", "Comparative Politics II", "Public Administration I", "History II"],
        "3rd Year": ["Contemporary Political Theory", "Indian Foreign Policy", "International Relations II", "Public Administration II", "Research Methodology", "Dissertation"],
      }
    },
    "BA Psychology": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Introduction to Psychology", "Biological Bases of Behaviour", "Statistics for Psychology", "Sociology I", "Environmental Studies", "Communication Skills"],
        "2nd Year": ["Social Psychology", "Developmental Psychology", "Cognitive Psychology", "Personality & Assessment", "Research Methods", "Abnormal Psychology"],
        "3rd Year": ["Clinical Psychology", "Counselling Psychology", "Organisational Psychology", "Health Psychology", "Dissertation", "Elective I"],
      }
    },
    "BA Sociology": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Introduction to Sociology", "Society in India I", "Sociological Theory I", "Economics I", "Environmental Studies", "Communication Skills"],
        "2nd Year": ["Sociological Theory II", "Society in India II", "Sociology of Gender", "Social Research Methods", "Urban Sociology", "Political Sociology"],
        "3rd Year": ["Advanced Sociological Theory", "Sociology of Development", "Sociology of Religion", "Research Methodology", "Dissertation", "Elective I"],
      }
    },
    "BA Geography": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Physical Geography I", "Human Geography I", "Cartography & Map Reading", "Environmental Studies", "Mathematics / Statistics", "Communication Skills"],
        "2nd Year": ["Physical Geography II", "Human Geography II", "Regional Geography of India", "Remote Sensing & GIS", "Economic Geography", "Climatology"],
        "3rd Year": ["Urban Geography", "Agricultural Geography", "Geography of Resources", "Research Methodology", "Dissertation", "Elective I"],
      }
    },
  },

  "Computer & IT": {
    "BCA": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Programming in C", "Mathematics I", "Digital Electronics", "PC Software & Office Automation", "Communication Skills", "Environmental Studies"],
        "2nd Year": ["Data Structures", "Database Management Systems", "OOP with C++", "Operating Systems", "Discrete Mathematics", "Computer Networks"],
        "3rd Year": ["Software Engineering", "Web Technologies", "Java Programming", "Computer Graphics & Multimedia", "Project Work", "Elective I"],
      }
    },
    "MCA": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Advanced Mathematics", "Data Structures & Algorithms", "Computer Architecture", "OOP with Java", "Database Management Systems", "Operating Systems"],
        "2nd Year": ["Computer Networks", "Software Engineering", "Compiler Design", "Artificial Intelligence", "Web Technologies", "Mobile Computing"],
        "3rd Year": ["Cloud Computing", "Machine Learning", "Information Security", "Data Science", "Project Work", "Elective I"],
      }
    },
    "M.Sc Computer Science": {
      duration: 2,
      years: ["1st Year", "2nd Year"],
      subjects: {
        "1st Year": ["Advanced Algorithms", "Advanced Database Systems", "Computer Networks", "Machine Learning", "Research Methodology", "Elective I"],
        "2nd Year": ["Deep Learning", "Cloud & Distributed Computing", "Information Security", "Big Data Analytics", "Project Work", "Elective II"],
      }
    },
    "Diploma in Computer Applications": {
      duration: 1,
      years: ["Semester 1", "Semester 2"],
      subjects: {
        "Semester 1": ["Fundamentals of Computers", "MS Office", "Programming in C", "Internet & Email", "Tally / Accounting Software"],
        "Semester 2": ["Database Management", "Web Design", "Programming in Java / Python", "Project Work", "Communication Skills"],
      }
    },
  },

  "Law": {
    "LLB (3 Year)": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Constitutional Law I", "Law of Contracts I", "Family Law I", "Law of Torts & Consumer Protection", "Legal Methods & Research"],
        "2nd Year": ["Constitutional Law II", "Law of Contracts II", "Criminal Law I", "Administrative Law", "Company Law", "Environmental Law"],
        "3rd Year": ["Criminal Law II", "Civil Procedure Code", "Criminal Procedure Code", "Law of Evidence", "Arbitration & ADR", "Moot Court & Trial Advocacy"],
      }
    },
    "BA LLB (5 Year)": {
      duration: 5,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"],
      subjects: {
        "1st Year": ["Legal Methods", "History I", "Political Science I", "Economics I", "English I", "Environmental Studies"],
        "2nd Year": ["Constitutional Law", "Law of Contracts", "Sociology", "Political Science II", "History II", "Family Law"],
        "3rd Year": ["Criminal Law", "Tort Law", "Administrative Law", "Jurisprudence", "Company Law", "Labour Law"],
        "4th Year": ["Civil Procedure Code", "Criminal Procedure Code", "Evidence Law", "Property Law", "Intellectual Property Law", "International Law"],
        "5th Year": ["Arbitration & ADR", "Environmental Law", "Taxation Law", "Cyber Law", "Moot Court", "Clinical Legal Education"],
      }
    },
    "LLM": {
      duration: 2,
      years: ["1st Year", "2nd Year"],
      subjects: {
        "1st Year": ["Legal Theory & Jurisprudence", "Constitutional Law (Advanced)", "Research Methodology", "Specialisation Paper I", "Specialisation Paper II"],
        "2nd Year": ["Comparative Law", "International Law (Advanced)", "Specialisation Paper III", "Specialisation Paper IV", "Dissertation"],
      }
    },
  },

  "Education": {
    "B.Ed": {
      duration: 2,
      years: ["1st Year", "2nd Year"],
      subjects: {
        "1st Year": ["Childhood & Growing Up", "Contemporary India & Education", "Learning & Teaching", "Language Across the Curriculum", "Understanding Disciplines & Subjects", "Pedagogy of School Subject I"],
        "2nd Year": ["Knowledge & Curriculum", "Assessment for Learning", "Creating Inclusive School", "Drama & Art in Education", "Critical Understanding of ICT", "Pedagogy of School Subject II", "School Internship"],
      }
    },
    "D.El.Ed / D.Ed": {
      duration: 2,
      years: ["1st Year", "2nd Year"],
      subjects: {
        "1st Year": ["Child Development & Learning", "Curriculum & Pedagogy", "Teaching of Languages", "Teaching of Mathematics", "Teaching of Environmental Studies", "School Health & Education"],
        "2nd Year": ["Teaching of Science", "Teaching of Social Studies", "Work & Education", "Peace Education", "ICT in Education", "School Internship & Practice Teaching"],
      }
    },
    "M.Ed": {
      duration: 2,
      years: ["1st Year", "2nd Year"],
      subjects: {
        "1st Year": ["Philosophical Foundations of Education", "Sociological Foundations of Education", "Educational Psychology", "Curriculum Studies", "Research Methodology in Education", "Educational Technology"],
        "2nd Year": ["Educational Administration & Management", "Comparative Education", "Guidance & Counselling", "Specialisation Paper I", "Specialisation Paper II", "Dissertation"],
      }
    },
  },

  "Agriculture": {
    "B.Sc Agriculture": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Fundamentals of Agronomy", "Agricultural Botany", "Agricultural Physics", "Agricultural Chemistry", "Soil Science", "Introduction to Agricultural Economics"],
        "2nd Year": ["Crop Production", "Agricultural Entomology", "Plant Pathology", "Agricultural Microbiology", "Genetics & Plant Breeding", "Farm Machinery & Power"],
        "3rd Year": ["Agronomy of Field Crops", "Horticulture", "Agricultural Extension", "Irrigation & Drainage", "Post Harvest Technology", "Agricultural Meteorology"],
        "4th Year": ["Farming Systems", "Organic Farming", "Seed Technology", "Agricultural Marketing", "Entrepreneurship Development", "Research Methodology & Project"],
      }
    },
    "B.Tech Agricultural Engineering": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Engineering Mathematics", "Engineering Physics", "Engineering Chemistry", "Engineering Drawing", "Agronomy Fundamentals", "Workshop Practice"],
        "2nd Year": ["Fluid Mechanics", "Strength of Materials", "Thermodynamics", "Soil & Water Conservation Engineering", "Irrigation Engineering", "Farm Machinery I"],
        "3rd Year": ["Farm Machinery II", "Post Harvest Engineering", "Greenhouse Technology", "Agricultural Process Engineering", "Renewable Energy in Agriculture", "GIS & Remote Sensing"],
        "4th Year": ["Food Technology", "Agricultural Structures", "Precision Agriculture", "Project Work", "Agricultural Economics", "Elective I"],
      }
    },
  },

  "Architecture & Design": {
    "B.Arch": {
      duration: 5,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"],
      subjects: {
        "1st Year": ["Architectural Design I", "Building Construction I", "Theory of Architecture", "History of Architecture I", "Graphics & Visual Arts", "Workshop I"],
        "2nd Year": ["Architectural Design II", "Building Construction II", "History of Architecture II", "Climatology & Building Science", "Structural Systems I", "Computer Applications"],
        "3rd Year": ["Architectural Design III", "Building Construction III", "Urban Design", "Interior Architecture", "Structural Systems II", "Services in Buildings I"],
        "4th Year": ["Architectural Design IV", "Professional Practice", "Landscape Architecture", "Services in Buildings II", "Elective I", "Urban Planning"],
        "5th Year": ["Thesis / Dissertation", "Professional Practice II", "Architectural Criticism", "Advanced Structural Systems", "Elective II", "Seminar"],
      }
    },
    "B.Des": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Design Fundamentals", "Drawing & Visualisation", "Material Studies", "Design History & Theory", "Photography & Digital Media", "Workshop Practice"],
        "2nd Year": ["Design Process & Methods", "Typography & Graphic Design", "Product Design", "Interaction Design", "Research Methods", "Elective I"],
        "3rd Year": ["Advanced Studio Practice", "Communication Design", "UI/UX Design", "Design for Sustainability", "Entrepreneurship in Design", "Elective II"],
        "4th Year": ["Graduation Project I", "Graduation Project II", "Professional Practice", "Design Dissertation", "Elective III", "Industry Internship"],
      }
    },
    "B.Sc Fashion Design": {
      duration: 3,
      years: ["1st Year", "2nd Year", "3rd Year"],
      subjects: {
        "1st Year": ["Elements of Fashion Design", "Textile Science", "Pattern Making I", "Fashion Drawing & Illustration", "History of Fashion", "Sewing & Garment Construction"],
        "2nd Year": ["Fashion Design Studio", "Pattern Making II", "Textile Testing & Quality Control", "Fashion Merchandising", "Computer Aided Design", "Draping"],
        "3rd Year": ["Advanced Fashion Design", "Fashion Marketing", "Collection Development", "Fashion Styling & Photography", "Entrepreneurship in Fashion", "Graduation Collection"],
      }
    },
  },

  "Hotel & Hospitality": {
    "BHM (Bachelor of Hotel Management)": {
      duration: 4,
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      subjects: {
        "1st Year": ["Food Production I", "Food & Beverage Service I", "Front Office Operations I", "Housekeeping I", "Hotel Engineering", "Communication Skills"],
        "2nd Year": ["Food Production II", "Food & Beverage Service II", "Front Office Operations II", "Housekeeping II", "Nutrition & Food Science", "Accountancy"],
        "3rd Year": ["Food Production III", "Food & Beverage Management", "Hotel Marketing", "Human Resource Management", "Financial Management", "Industrial Training"],
        "4th Year": ["Strategic Management", "Facility Planning & Design", "Entrepreneurship in Hospitality", "International Cuisine", "Research Methodology", "Project Work"],
      }
    },
    "Diploma in Hotel Management": {
      duration: 2,
      years: ["1st Year", "2nd Year"],
      subjects: {
        "1st Year": ["Food Production", "Food & Beverage Service", "Front Office", "Housekeeping", "Communication Skills", "Basic Computers"],
        "2nd Year": ["Advanced Food Production", "Restaurant Management", "Hotel Accounting", "Tourism & Travel Management", "Industrial Training", "Project Work"],
      }
    },
  },
};

// Helper: get all course names for a category
export function getCourseNames(category) {
  return Object.keys(COURSES[category] || {});
}

// Helper: get years for a course
export function getCourseYears(category, courseName) {
  return COURSES[category]?.[courseName]?.years || [];
}

// Helper: get subjects for a course and year
export function getCourseSubjects(category, courseName, year) {
  return COURSES[category]?.[courseName]?.subjects?.[year] || [];
}
