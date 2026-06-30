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

// ── Topic Database (Batch 1 — one course per category, all years) ─────────────
// Format: TOPICS[courseName][year][subjectName] = [topic1, topic2, ...]
export const TOPICS = {
  "BHMS": {
    "1st Year": {
      "Anatomy": ["Osteology - Upper Limb","Osteology - Lower Limb","Myology - Upper Limb","Myology - Lower Limb","Thorax & Abdomen","Head & Neck","Neuroanatomy Basics"],
      "Physiology": ["Cell Physiology","Blood & Body Fluids","Cardiovascular System","Respiratory System","Renal Physiology","Nervous System","Endocrine System"],
      "Biochemistry": ["Carbohydrate Metabolism","Protein Metabolism","Lipid Metabolism","Enzymes","Vitamins & Minerals","Nucleic Acids","Acid-Base Balance"],
      "Organon of Medicine": ["Aphorisms 1-10","Aphorisms 11-30","Vital Force Concept","Disease Theory","Drug Proving","Case Taking Method","Miasms Introduction"],
      "Homoeopathic Pharmacy": ["Sources of Drugs","Methods of Potentisation","Dosage Forms","Drug Storage","Mother Tinctures","Triturations","Drug Strength Calculation"],
      "Homoeopathic Materia Medica": ["Aconitum Napellus","Belladonna","Bryonia Alba","Nux Vomica","Pulsatilla","Rhus Toxicodendron","Sulphur"],
    },
    "2nd Year": {
      "Pathology & Microbiology": ["Cell Injury & Adaptation","Inflammation & Repair","Neoplasia","Bacteriology Basics","Virology Basics","Immunology","Systemic Pathology"],
      "Forensic Medicine & Toxicology": ["Medical Jurisprudence","Identification & Age Estimation","Asphyxial Deaths","Injuries & Wounds","Common Poisons","Medicolegal Autopsy","Sexual Offences"],
      "Organon of Medicine": ["Chronic Disease Theory","Susceptibility","Drug Selection","Posology","Second Prescription","Antidotes","Obstacles to Cure"],
      "Homoeopathic Materia Medica": ["Calcarea Carbonica","Lycopodium","Natrum Muriaticum","Phosphorus","Sepia","Arsenicum Album","Silicea"],
      "Community Medicine": ["Epidemiology Basics","Communicable Diseases","Maternal & Child Health","Nutrition","Environmental Health","Health Education","National Health Programs"],
    },
    "3rd Year": {
      "Practice of Medicine": ["Fever","Respiratory Disorders","Cardiovascular Disorders","GI Disorders","Renal Disorders","CNS Disorders","Endocrine Disorders"],
      "Surgery": ["Wound Healing","Surgical Infections","Fractures & Dislocations","Tumours","Burns Management","Pre/Post-op Care","Shock"],
      "Obstetrics & Gynaecology": ["Antenatal Care","Normal Labour","Postnatal Care","Menstrual Disorders","Infertility","Fibroid Uterus","Pelvic Infections"],
      "Organon of Medicine": ["Aggravation & Amelioration","Direction of Cure","Repertorisation Basics","Single Remedy Principle","Minimum Dose","Suppressions","Case Analysis"],
      "Homoeopathic Materia Medica": ["Mercurius","Carbo Veg","Ignatia","Causticum","Kali Carbonicum","Argentum Nitricum","China"],
      "ENT & Ophthalmology": ["Ear Disorders","Nose & Sinus Disorders","Throat Disorders","Eye Refractive Errors","Conjunctivitis","Cataract Basics","Glaucoma Basics"],
    },
    "Final Year": {
      "Practice of Medicine": ["Diabetes Mellitus","Hypertension","Tuberculosis","Liver Disorders","Anaemia","Arthritis","Skin Disorders"],
      "Surgery": ["Acute Abdomen","Hernia","Urological Disorders","Vascular Disorders","Orthopaedic Trauma","Oncosurgery Basics","Anaesthesia Basics"],
      "Obstetrics & Gynaecology": ["High Risk Pregnancy","Obstetric Emergencies","Contraception","Menopause","Ovarian Tumours","PCOS","Gynaecological Surgery Basics"],
      "Organon of Medicine": ["Vital Force in Disease","Theory of Chronic Miasms","Psora Detail","Sycosis Detail","Syphilis Detail","Case Management","Follow-up Principles"],
      "Homoeopathic Materia Medica": ["Thuja Occidentalis","Medorrhinum","Tuberculinum","Psorinum","Lachesis","Apis Mellifica","Hepar Sulphuris"],
      "Paediatrics": ["Growth & Development","Neonatal Care","Common Childhood Illnesses","Immunization Schedule","Nutritional Disorders","Congenital Anomalies","Paediatric Emergencies"],
      "Community Medicine": ["Health Planning in India","Demography","Disaster Management","Occupational Health","School Health","Family Welfare Programs","Biostatistics Basics"],
    },
  },

  "B.Tech / B.E. Computer Science": {
    "1st Year": {
      "Engineering Mathematics I": ["Matrices & Determinants","Differential Calculus","Integral Calculus","Vector Calculus","Differential Equations"],
      "Engineering Physics": ["Wave Optics","Quantum Mechanics Basics","Laser & Fiber Optics","Semiconductor Physics","Crystal Structures"],
      "Engineering Chemistry": ["Water Chemistry","Polymers","Fuels & Combustion","Corrosion","Spectroscopy Basics"],
      "Basic Electrical Engineering": ["DC Circuits","AC Fundamentals","Electrical Machines Basics","Measuring Instruments","Safety & Earthing"],
      "Engineering Graphics": ["Orthographic Projections","Isometric Views","Sectional Views","Dimensioning","CAD Basics"],
      "Programming in C": ["Variables & Data Types","Control Structures","Functions","Arrays & Strings","Pointers","File Handling"],
    },
    "2nd Year": {
      "Data Structures": ["Arrays & Linked Lists","Stacks & Queues","Trees & BSTs","Graphs","Sorting Algorithms","Hashing"],
      "Discrete Mathematics": ["Set Theory","Relations & Functions","Propositional Logic","Graph Theory","Combinatorics"],
      "Digital Electronics": ["Boolean Algebra","Logic Gates","Combinational Circuits","Sequential Circuits","Counters & Registers"],
      "Computer Organization & Architecture": ["CPU Architecture","Memory Hierarchy","Instruction Sets","Pipelining","I/O Organization"],
      "Object Oriented Programming": ["Classes & Objects","Inheritance","Polymorphism","Encapsulation","Exception Handling"],
      "Database Management Systems": ["ER Modeling","Relational Model","SQL Basics","Normalization","Transactions & Concurrency"],
    },
    "3rd Year": {
      "Operating Systems": ["Process Management","CPU Scheduling","Memory Management","Deadlocks","File Systems"],
      "Computer Networks": ["OSI & TCP/IP Model","Routing Algorithms","Network Security Basics","Application Layer Protocols","Wireless Networks"],
      "Algorithm Design & Analysis": ["Greedy Algorithms","Dynamic Programming","Divide & Conquer","Backtracking","NP-Completeness"],
      "Software Engineering": ["SDLC Models","Requirements Engineering","Software Design","Testing Strategies","Project Management"],
      "Web Technologies": ["HTML/CSS Basics","JavaScript Fundamentals","Backend Frameworks","REST APIs","Web Security Basics"],
      "Theory of Computation": ["Finite Automata","Regular Languages","Context-Free Grammars","Pushdown Automata","Turing Machines"],
    },
    "4th Year": {
      "Machine Learning": ["Supervised Learning","Unsupervised Learning","Neural Networks Basics","Model Evaluation","Feature Engineering"],
      "Cloud Computing": ["Cloud Service Models","Virtualization","Cloud Storage","Containerization Basics","Cloud Security"],
      "Information Security": ["Cryptography Basics","Network Security","Web Application Security","Security Protocols","Ethical Hacking Basics"],
      "Compiler Design": ["Lexical Analysis","Syntax Analysis","Semantic Analysis","Code Generation","Code Optimization"],
      "Project Work": ["Problem Identification","Literature Review","System Design","Implementation","Testing & Documentation"],
    },
  },

  "BBA": {
    "1st Year": {
      "Principles of Management": ["Management Functions","Planning & Decision Making","Organizing","Leadership Theories","Controlling"],
      "Business Economics": ["Demand & Supply","Market Structures","National Income","Inflation","Fiscal Policy"],
      "Financial Accounting": ["Accounting Principles","Journal & Ledger","Trial Balance","Financial Statements","Depreciation"],
      "Business Communication": ["Verbal Communication","Written Communication","Business Letters","Presentation Skills","Negotiation"],
      "Business Mathematics": ["Ratios & Proportions","Interest Calculations","Matrices Basics","Linear Equations","Statistics Basics"],
    },
    "2nd Year": {
      "Marketing Management": ["Marketing Mix","Consumer Behaviour","Market Segmentation","Branding","Digital Marketing Basics"],
      "Human Resource Management": ["Recruitment & Selection","Training & Development","Performance Appraisal","Compensation","Employee Relations"],
      "Financial Management": ["Capital Budgeting","Working Capital Management","Cost of Capital","Dividend Policy","Financial Ratios"],
      "Operations Management": ["Production Planning","Inventory Management","Quality Control","Supply Chain Basics","Process Design"],
      "Business Law": ["Contract Law","Sale of Goods Act","Company Law Basics","Consumer Protection","Negotiable Instruments"],
      "Organisational Behaviour": ["Individual Behaviour","Group Dynamics","Motivation Theories","Organizational Culture","Conflict Management"],
    },
    "3rd Year": {
      "Strategic Management": ["Strategy Formulation","SWOT Analysis","Competitive Strategy","Strategy Implementation","Strategic Control"],
      "Entrepreneurship Development": ["Idea Generation","Business Plan Writing","Funding Sources","Startup Challenges","Scaling a Business"],
      "International Business": ["Globalization","Trade Theories","Foreign Exchange","Export-Import Procedures","International Marketing"],
      "Project Management": ["Project Planning","Scheduling Techniques","Risk Management","Resource Allocation","Project Closure"],
      "Business Ethics": ["Ethical Theories","Corporate Governance","CSR","Ethical Dilemmas","Sustainability"],
      "Research Methodology": ["Research Design","Data Collection","Sampling Methods","Data Analysis","Report Writing"],
    },
  },

  "BCA": {
    "1st Year": {
      "Programming in C": ["Basics of C","Control Statements","Functions","Arrays","Pointers","Structures"],
      "Mathematics I": ["Algebra","Trigonometry","Calculus Basics","Matrices","Probability Basics"],
      "Digital Electronics": ["Number Systems","Logic Gates","Boolean Algebra","Combinational Circuits","Flip-Flops"],
      "PC Software & Office Automation": ["Word Processing","Spreadsheets","Presentations","Database Basics","Internet Basics"],
      "Communication Skills": ["Grammar Basics","Listening Skills","Speaking Skills","Group Discussion","Report Writing"],
    },
    "2nd Year": {
      "Data Structures": ["Arrays & Lists","Stacks & Queues","Linked Lists","Trees","Sorting & Searching"],
      "Database Management Systems": ["ER Diagrams","SQL Queries","Normalization","Joins","Transactions"],
      "OOP with C++": ["Classes & Objects","Constructors & Destructors","Inheritance","Polymorphism","Operator Overloading"],
      "Operating Systems": ["Process Scheduling","Memory Management","File Systems","Deadlocks","Threads"],
      "Discrete Mathematics": ["Set Theory","Logic","Relations","Graph Theory Basics","Combinatorics Basics"],
      "Computer Networks": ["Network Topologies","OSI Model","TCP/IP","Routing Basics","Network Security Basics"],
    },
    "3rd Year": {
      "Software Engineering": ["SDLC","Requirements Analysis","Design Concepts","Testing","Maintenance"],
      "Web Technologies": ["HTML & CSS","JavaScript","PHP Basics","Web Servers","Web Security Basics"],
      "Java Programming": ["Java Basics","OOP in Java","Exception Handling","Collections","Multithreading"],
      "Computer Graphics & Multimedia": ["Graphics Primitives","Transformations","2D/3D Concepts","Animation Basics","Multimedia Tools"],
      "Project Work": ["Requirement Gathering","System Design","Coding","Testing","Documentation"],
    },
  },

  "B.Com": {
    "1st Year": {
      "Financial Accounting": ["Accounting Concepts","Journal Entries","Ledger Posting","Trial Balance","Final Accounts"],
      "Business Economics": ["Demand Analysis","Supply Analysis","Market Equilibrium","Cost Concepts","Revenue Concepts"],
      "Business Mathematics & Statistics": ["Ratios & Percentages","Simple & Compound Interest","Measures of Central Tendency","Correlation","Index Numbers"],
      "Business Communication": ["Business Letters","Report Writing","Presentation Skills","Listening Skills","Interview Skills"],
      "Business Law": ["Indian Contract Act","Sale of Goods Act","Partnership Act","Negotiable Instruments Act","Consumer Protection Act"],
    },
    "2nd Year": {
      "Corporate Accounting": ["Share Capital","Debentures","Final Accounts of Companies","Amalgamation","Internal Reconstruction"],
      "Cost Accounting": ["Cost Concepts","Material Costing","Labour Costing","Overheads","Cost Sheets"],
      "Income Tax Law & Practice": ["Residential Status","Income from Salary","Income from House Property","Deductions","Tax Computation"],
      "Company Law": ["Formation of Company","Memorandum & Articles","Share Capital Provisions","Directors","Winding Up"],
      "Banking Theory & Practice": ["Banking System in India","Types of Accounts","Negotiable Instruments","RBI Functions","Digital Banking"],
    },
    "3rd Year": {
      "Advanced Accounting": ["Branch Accounting","Departmental Accounts","Hire Purchase","Insurance Claims","Partnership Accounts"],
      "Auditing & Assurance": ["Audit Process","Internal Control","Vouching","Verification","Audit Report"],
      "Financial Management": ["Capital Budgeting","Cost of Capital","Working Capital","Dividend Decisions","Leverage Analysis"],
      "Management Accounting": ["Budgetary Control","Standard Costing","Marginal Costing","Ratio Analysis","Fund Flow Statement"],
      "Entrepreneurship Development": ["Entrepreneurial Traits","Business Plan","Funding Options","MSME Schemes","Case Studies"],
    },
  },

  "BA English": {
    "1st Year": {
      "British Literature I": ["Chaucer's Works","Shakespeare's Sonnets","Metaphysical Poetry","Restoration Drama","18th Century Novel"],
      "Indian Writing in English I": ["Raja Rao","R.K. Narayan","Kamala Das","Nissim Ezekiel","A.K. Ramanujan"],
      "Linguistics": ["Phonetics","Morphology","Syntax Basics","Semantics","Sociolinguistics Basics"],
      "Communication Skills": ["Listening Skills","Speaking Skills","Reading Comprehension","Writing Skills","Presentation Skills"],
      "History I": ["Ancient Civilizations","Medieval History Basics","Renaissance","Reformation","Age of Exploration"],
    },
    "2nd Year": {
      "British Literature II": ["Romantic Poetry","Victorian Novel","Modernist Poetry","Bloomsbury Group","War Poets"],
      "American Literature": ["Transcendentalism","Mark Twain","Walt Whitman","Modern American Drama","Harlem Renaissance"],
      "Literary Theory & Criticism": ["Formalism","Structuralism","Marxist Criticism","Feminist Criticism","Postcolonial Theory"],
      "Drama": ["Greek Tragedy","Shakespearean Drama","Absurd Theatre","Modern Indian Drama","Contemporary Drama"],
      "Indian Writing in English II": ["Salman Rushdie","Arundhati Roy","Vikram Seth","Jhumpa Lahiri","Amitav Ghosh"],
    },
    "3rd Year": {
      "Postcolonial Literature": ["Concepts of Postcolonialism","African Literature","Caribbean Literature","Indian Postcolonial Fiction","Diaspora Writing"],
      "Modern Literature": ["Stream of Consciousness","Existentialism in Literature","Modernist Techniques","Postmodern Fiction","Magical Realism"],
      "Research Methodology": ["Research Design","Literature Review","Citation Styles","Thesis Writing","Plagiarism Awareness"],
      "Dissertation / Project": ["Topic Selection","Literature Survey","Draft Writing","Revision","Final Submission"],
    },
  },

  "B.Pharm": {
    "1st Year": {
      "Pharmaceutics I": ["Pharmaceutical Calculations","Powders & Granules","Tablets Basics","Capsules","Liquid Dosage Forms"],
      "Pharmaceutical Chemistry I": ["Atomic Structure","Periodic Table","Acids & Bases","Chemical Bonding","Inorganic Reactions"],
      "Pharmacognosy I": ["Plant Classification","Cell Structure","Crude Drugs Introduction","Carbohydrates","Glycosides"],
      "Human Anatomy & Physiology": ["Cell Structure","Skeletal System","Muscular System","Cardiovascular System","Respiratory System"],
      "Remedial Mathematics": ["Algebra Basics","Trigonometry","Differentiation","Integration","Statistics Basics"],
    },
    "2nd Year": {
      "Pharmaceutics II": ["Suspensions","Emulsions","Ointments & Creams","Suppositories","Sterile Products Basics"],
      "Pharmaceutical Chemistry II": ["Organic Reactions","Stereochemistry","Aromatic Compounds","Heterocyclic Chemistry","Drug Synthesis Basics"],
      "Pharmacognosy II": ["Alkaloids","Tannins","Volatile Oils","Resins","Lipids"],
      "Pathophysiology": ["Inflammation","Fever","Diabetes Basics","Hypertension Basics","Cancer Basics"],
      "Environmental Sciences": ["Ecosystems","Biodiversity","Pollution Types","Environmental Laws","Sustainable Development"],
    },
    "3rd Year": {
      "Pharmaceutics III": ["Tablet Coating","Controlled Release Systems","Packaging","Stability Testing","GMP Basics"],
      "Pharmaceutical Chemistry III": ["Drug Design Basics","Structure Activity Relationship","Medicinal Chemistry of Analgesics","Antibiotics Chemistry","Antihypertensives"],
      "Pharmacology I": ["Pharmacokinetics","Pharmacodynamics","Autonomic Nervous System Drugs","CNS Drugs Basics","Cardiovascular Drugs"],
      "Pharmacognosy III": ["Enzymes","Vitamins","Marine Drugs","Herbal Drug Technology","Quality Control of Herbals"],
      "Pharmaceutical Jurisprudence": ["Drugs & Cosmetics Act","Pharmacy Act","Narcotic Drugs Act","Medical Termination of Pregnancy Act","Consumer Protection Act"],
      "Industrial Pharmacy I": ["Tablet Manufacturing","Capsule Manufacturing","Quality Assurance","Validation Basics","Scale-up Techniques"],
    },
    "4th Year": {
      "Novel Drug Delivery Systems": ["Liposomes","Nanoparticles","Transdermal Systems","Targeted Drug Delivery","Implants"],
      "Pharmacology II": ["Chemotherapy Basics","Antimicrobials","Antivirals","Anticancer Drugs","Immunopharmacology"],
      "Pharmacognosy IV": ["Biotechnology in Pharmacognosy","Plant Tissue Culture","Standardization of Herbals","Nutraceuticals","Cosmeceuticals"],
      "Biopharmaceutics & Pharmacokinetics": ["Drug Absorption","Drug Distribution","Bioavailability","Compartment Models","Drug Interactions"],
      "Pharmaceutical Biotechnology": ["rDNA Technology","Monoclonal Antibodies","Vaccines","Gene Therapy Basics","Biosimilars"],
      "Hospital & Clinical Pharmacy": ["Hospital Pharmacy Organization","Drug Distribution Systems","Patient Counselling","Adverse Drug Reactions","Therapeutic Drug Monitoring"],
      "Biostatistics & Research Methodology": ["Data Types","Hypothesis Testing","Clinical Trial Design","Research Ethics","Report Writing"],
    },
  },

  "B.Sc Nursing": {
    "1st Year": {
      "Anatomy": ["Skeletal System","Muscular System","Cardiovascular System","Nervous System","Digestive System"],
      "Physiology": ["Cell Physiology","Blood Physiology","Respiratory Physiology","Renal Physiology","Endocrine Physiology"],
      "Nutrition & Biochemistry": ["Macronutrients","Micronutrients","Balanced Diet","Therapeutic Diets","Metabolism Basics"],
      "Nursing Foundations": ["Nursing Process","Vital Signs","Personal Hygiene","Bed Making","Infection Control"],
      "Psychology": ["Personality Theories","Learning Theories","Stress & Coping","Defense Mechanisms","Developmental Psychology Basics"],
    },
    "2nd Year": {
      "Medical-Surgical Nursing I": ["Pre/Post-operative Care","Wound Care","Respiratory Disorders Nursing","Cardiac Disorders Nursing","Pain Management"],
      "Pharmacology": ["Drug Administration Routes","Antibiotics","Analgesics","Cardiovascular Drugs","Drug Calculation"],
      "Pathology & Genetics": ["Cell Injury","Inflammation","Neoplasia","Genetic Disorders Basics","Hereditary Patterns"],
      "Community Health Nursing I": ["Primary Health Care","Health Promotion","Epidemiology Basics","Family Health Care","School Health"],
      "Communication & Educational Technology": ["Therapeutic Communication","Patient Education","Teaching Methods","AV Aids","Health Education Materials"],
    },
    "3rd Year": {
      "Medical-Surgical Nursing II": ["Neurological Disorders Nursing","Renal Disorders Nursing","Endocrine Disorders Nursing","Oncology Nursing","Critical Care Basics"],
      "Child Health Nursing": ["Growth & Development","Neonatal Care","Common Childhood Illnesses","Immunization","Paediatric Emergencies"],
      "Mental Health Nursing": ["Mental Status Examination","Anxiety Disorders","Mood Disorders","Schizophrenia","Therapeutic Milieu"],
      "Midwifery & Obstetric Nursing": ["Antenatal Care","Normal Labour","Postnatal Care","High Risk Pregnancy","Family Planning"],
    },
    "4th Year": {
      "Midwifery & Obstetric Nursing": ["Obstetric Emergencies","Newborn Resuscitation","Lactation Management","Infertility Basics","Menopause Care"],
      "Community Health Nursing II": ["National Health Programs","Disaster Nursing","Occupational Health Nursing","Environmental Health","Health Care Delivery System"],
      "Management of Nursing Services & Education": ["Nursing Administration","Staffing","Quality Assurance","Curriculum Development","Clinical Teaching"],
      "Research & Statistics in Nursing": ["Research Process","Sampling Techniques","Data Analysis Basics","Evidence Based Practice","Report Writing"],
    },
  },

  "LLB (3 Year)": {
    "1st Year": {
      "Constitutional Law I": ["Preamble & Basic Structure","Fundamental Rights","Directive Principles","Union Executive","Parliament"],
      "Law of Contracts I": ["Offer & Acceptance","Consideration","Capacity to Contract","Free Consent","Void Agreements"],
      "Family Law I": ["Hindu Marriage Act","Hindu Succession Act","Muslim Personal Law Basics","Adoption Laws","Maintenance Laws"],
      "Law of Torts & Consumer Protection": ["General Defences","Negligence","Defamation","Strict Liability","Consumer Protection Act Basics"],
      "Legal Methods & Research": ["Sources of Law","Legal Research Techniques","Citation Methods","Case Briefing","Legal Writing"],
    },
    "2nd Year": {
      "Constitutional Law II": ["State Executive","Judiciary","Emergency Provisions","Amendment Procedure","Centre-State Relations"],
      "Law of Contracts II": ["Indemnity & Guarantee","Bailment & Pledge","Agency","Sale of Goods","Partnership Basics"],
      "Criminal Law I": ["General Principles of IPC","Offences Against Body","Offences Against Property","Criminal Conspiracy","Abetment"],
      "Administrative Law": ["Delegated Legislation","Natural Justice","Judicial Review","Administrative Tribunals","Right to Information"],
      "Company Law": ["Incorporation","Memorandum & Articles","Share Capital","Directors' Duties","Winding Up Basics"],
      "Environmental Law": ["Environment Protection Act","Water Pollution Act","Air Pollution Act","Forest Conservation","Public Interest Litigation"],
    },
    "3rd Year": {
      "Criminal Law II": ["Offences Against State","Offences Against Public Tranquility","Sexual Offences","Defamation under IPC","Punishments under IPC"],
      "Civil Procedure Code": ["Jurisdiction of Courts","Pleadings","Suits","Execution of Decrees","Appeals & Revisions"],
      "Criminal Procedure Code": ["Arrest","Investigation","Charge","Trial Procedures","Bail Provisions"],
      "Law of Evidence": ["Relevancy of Facts","Burden of Proof","Witnesses","Documentary Evidence","Presumptions"],
      "Arbitration & ADR": ["Arbitration Agreement","Arbitral Tribunal","Conciliation","Mediation","Enforcement of Awards"],
      "Moot Court & Trial Advocacy": ["Drafting Pleadings","Oral Advocacy Skills","Cross Examination Techniques","Case Analysis","Court Etiquette"],
    },
  },

  "B.Ed": {
    "1st Year": {
      "Childhood & Growing Up": ["Stages of Development","Cognitive Development","Socio-Emotional Development","Adolescence","Individual Differences"],
      "Contemporary India & Education": ["Indian Constitution & Education","Equality & Education","RTE Act","Education Policies","Diversity in Classroom"],
      "Learning & Teaching": ["Learning Theories","Motivation in Learning","Teaching Methods","Classroom Management","Assessment Basics"],
      "Language Across the Curriculum": ["Language Acquisition","Multilingualism","Reading & Writing Skills","Language Across Subjects","Communication in Classroom"],
      "Understanding Disciplines & Subjects": ["Nature of Disciplines","Curriculum Organization","Subject Pedagogy Basics","Interdisciplinary Approach","Knowledge Construction"],
      "Pedagogy of School Subject I": ["Subject Content Analysis","Lesson Planning","Teaching Aids","Subject-specific Methods","Evaluation Techniques"],
    },
    "2nd Year": {
      "Knowledge & Curriculum": ["Philosophical Bases of Curriculum","Curriculum Development Process","Curriculum Evaluation","Hidden Curriculum","Curriculum Reforms"],
      "Assessment for Learning": ["Formative Assessment","Summative Assessment","Test Construction","Grading Systems","Continuous Comprehensive Evaluation"],
      "Creating Inclusive School": ["Inclusive Education Concept","Children with Special Needs","Gender Sensitivity","Adaptive Teaching","Barrier-free Environment"],
      "Drama & Art in Education": ["Role of Drama in Learning","Creative Expression","Art Integration","Theatre Techniques","Aesthetic Development"],
      "Critical Understanding of ICT": ["ICT Tools in Education","Digital Pedagogy","E-content Development","Online Assessment Tools","Digital Citizenship"],
      "Pedagogy of School Subject II": ["Advanced Subject Pedagogy","Unit Planning","Resource Development","Peer Teaching","Reflective Practice"],
      "School Internship": ["Lesson Observation","Practice Teaching","Classroom Management Practice","Feedback & Reflection","Portfolio Development"],
    },
  },

  "B.Sc Agriculture": {
    "1st Year": {
      "Fundamentals of Agronomy": ["Soil-Plant-Water Relationship","Cropping Systems","Tillage Practices","Weed Management","Crop Growth Stages"],
      "Agricultural Botany": ["Plant Morphology","Plant Anatomy","Plant Taxonomy Basics","Plant Reproduction","Cell Biology Basics"],
      "Agricultural Physics": ["Soil Physical Properties","Soil Water Movement","Climate & Weather Basics","Solar Radiation","Evapotranspiration"],
      "Agricultural Chemistry": ["Soil Chemistry Basics","Plant Nutrients","Fertilizers","Soil pH & EC","Organic Matter in Soil"],
      "Soil Science": ["Soil Formation","Soil Classification","Soil Fertility","Soil Erosion","Soil Testing"],
      "Introduction to Agricultural Economics": ["Demand & Supply in Agriculture","Farm Management Basics","Agricultural Marketing","Agricultural Policy","Cost of Production"],
    },
    "2nd Year": {
      "Crop Production": ["Cereal Crops","Pulse Crops","Oilseed Crops","Cash Crops","Crop Rotation"],
      "Agricultural Entomology": ["Insect Morphology","Pest Classification","Integrated Pest Management","Beneficial Insects","Pesticide Application"],
      "Plant Pathology": ["Disease Cycle","Fungal Diseases","Bacterial Diseases","Viral Diseases","Disease Management"],
      "Agricultural Microbiology": ["Soil Microorganisms","Nitrogen Fixation","Biofertilizers","Composting","Biocontrol Agents"],
      "Genetics & Plant Breeding": ["Mendelian Genetics","Plant Breeding Methods","Hybridization","Mutation Breeding","Variety Development"],
      "Farm Machinery & Power": ["Tillage Equipment","Sowing Equipment","Irrigation Equipment","Harvesting Equipment","Tractor Basics"],
    },
    "3rd Year": {
      "Agronomy of Field Crops": ["Wheat Cultivation","Rice Cultivation","Sugarcane Cultivation","Cotton Cultivation","Maize Cultivation"],
      "Horticulture": ["Fruit Production","Vegetable Production","Floriculture Basics","Landscaping Basics","Post-harvest Horticulture"],
      "Agricultural Extension": ["Extension Methods","Communication in Extension","Adoption of Innovation","Rural Development Programs","Extension Education Theories"],
      "Irrigation & Drainage": ["Irrigation Methods","Water Requirement of Crops","Drainage Systems","Micro-irrigation","Water Use Efficiency"],
      "Post Harvest Technology": ["Harvesting Techniques","Storage Methods","Processing Basics","Packaging","Value Addition"],
      "Agricultural Meteorology": ["Weather Parameters","Climate Change Impact","Crop-Weather Relationship","Weather Forecasting","Agro-climatic Zones"],
    },
    "4th Year": {
      "Farming Systems": ["Integrated Farming Systems","Mixed Farming","Crop-Livestock Integration","Sustainable Farming","Farm Planning"],
      "Organic Farming": ["Organic Farming Principles","Composting Methods","Biopesticides","Organic Certification","Organic Crop Management"],
      "Seed Technology": ["Seed Production","Seed Quality Testing","Seed Certification","Seed Storage","Seed Processing"],
      "Agricultural Marketing": ["Marketing Channels","Price Determination","Market Information Systems","Agricultural Trade","Export-Import in Agriculture"],
      "Entrepreneurship Development": ["Agri-business Planning","Funding for Agri-startups","Value Chain Development","Risk Management","Case Studies"],
      "Research Methodology & Project": ["Research Design","Field Experimentation","Data Analysis","Report Writing","Project Presentation"],
    },
  },

  "B.Arch": {
    "1st Year": {
      "Architectural Design I": ["Design Fundamentals","Space Planning Basics","Form & Function","Scale & Proportion","Basic Design Exercises"],
      "Building Construction I": ["Foundation Types","Brick Masonry","Stone Masonry","Doors & Windows","Roofing Basics"],
      "Theory of Architecture": ["Elements of Architecture","Principles of Design","Architectural Vocabulary","Spatial Concepts","Aesthetics Basics"],
      "History of Architecture I": ["Ancient Egyptian Architecture","Greek Architecture","Roman Architecture","Indian Temple Architecture","Mughal Architecture"],
      "Graphics & Visual Arts": ["Freehand Drawing","Perspective Drawing","Rendering Techniques","Color Theory","Composition"],
    },
    "2nd Year": {
      "Architectural Design II": ["Residential Design","Site Planning","Circulation Design","Climate Responsive Design","Material Selection"],
      "Building Construction II": ["RCC Construction Basics","Steel Construction Basics","Staircases","Damp Proofing","Flooring Systems"],
      "History of Architecture II": ["Gothic Architecture","Renaissance Architecture","Colonial Architecture in India","Art Nouveau","Modern Movement Origins"],
      "Climatology & Building Science": ["Solar Geometry","Thermal Comfort","Ventilation Principles","Acoustics Basics","Daylighting"],
      "Structural Systems I": ["Loads on Structures","Beams & Columns","Trusses","Load Path Concepts","Structural Materials"],
    },
    "3rd Year": {
      "Architectural Design III": ["Institutional Building Design","Multi-storey Design","Circulation Systems","Accessibility Design","Sustainable Design Basics"],
      "Building Construction III": ["Pre-fabrication","Curtain Walls","Advanced Roofing Systems","Sound Insulation","Fire Safety Systems"],
      "Urban Design": ["Urban Morphology","Public Spaces","Urban Form Theories","Streetscape Design","Urban Renewal"],
      "Interior Architecture": ["Space Planning for Interiors","Furniture Design Basics","Lighting Design","Material & Finishes","Interior Detailing"],
      "Structural Systems II": ["Frame Structures","Shell Structures","Space Frames","Earthquake Resistant Design Basics","Foundation Design Basics"],
    },
    "4th Year": {
      "Architectural Design IV": ["Large Scale Complex Design","Mixed-use Development","Healthcare Facility Design","Educational Facility Design","High-rise Design Basics"],
      "Professional Practice": ["Architect's Role & Responsibilities","Contracts & Tendering","Building Bye-laws","Professional Ethics","Project Management Basics"],
      "Landscape Architecture": ["Site Analysis","Planting Design","Hardscape Elements","Water Features","Landscape Sustainability"],
      "Urban Planning": ["Master Planning","Zoning Regulations","Transportation Planning","Land Use Planning","Smart Cities Concepts"],
    },
    "5th Year": {
      "Thesis / Dissertation": ["Topic Selection & Research","Site Analysis","Concept Development","Design Development","Final Presentation"],
      "Professional Practice II": ["Construction Contracts","Cost Estimation","Project Scheduling","Quality Control","Dispute Resolution"],
      "Architectural Criticism": ["Critical Theory in Architecture","Case Study Analysis","Architectural Journalism","Contemporary Debates","Writing about Architecture"],
    },
  },

  "BHM (Bachelor of Hotel Management)": {
    "1st Year": {
      "Food Production I": ["Kitchen Basics","Knife Skills","Stocks & Sauces","Vegetable Cookery","Egg Cookery"],
      "Food & Beverage Service I": ["F&B Service Equipment","Types of Service","Order Taking","Menu Basics","Beverage Basics"],
      "Front Office Operations I": ["Reservation Process","Check-in/Check-out","Guest Relations","Front Office Equipment","Telephone Etiquette"],
      "Housekeeping I": ["Housekeeping Organization","Cleaning Equipment","Room Layouts","Guest Room Cleaning","Public Area Cleaning"],
      "Hotel Engineering": ["HVAC Basics","Electrical Systems Basics","Plumbing Basics","Fire Safety Systems","Energy Conservation"],
      "Communication Skills": ["Guest Communication","Telephone Skills","Email Etiquette","Cross-cultural Communication","Conflict Resolution"],
    },
    "2nd Year": {
      "Food Production II": ["Indian Cuisine Basics","Bakery & Confectionery","Larder Work","Soups","Sandwiches"],
      "Food & Beverage Service II": ["Wine & Spirits Basics","Cocktails","Banquet Service","Room Service","Specialized Service Styles"],
      "Front Office Operations II": ["Night Audit","Revenue Management Basics","Guest Complaint Handling","Group Reservations","Front Office Reports"],
      "Housekeeping II": ["Linen Management","Laundry Operations","Pest Control","Interior Decoration Basics","Horticulture Basics"],
      "Nutrition & Food Science": ["Macronutrients","Micronutrients","Food Spoilage","Food Safety","Menu Planning for Nutrition"],
      "Accountancy": ["Hotel Accounting Basics","Cost Control","Budgeting","Financial Statements","Revenue & Expense Tracking"],
    },
    "3rd Year": {
      "Food Production III": ["International Cuisines","Garde Manger","Patisserie","Volume Catering","Menu Costing"],
      "Food & Beverage Management": ["F&B Cost Control","Outlet Management","Purchasing & Storage","Menu Engineering","Staff Scheduling"],
      "Hotel Marketing": ["Marketing Mix in Hospitality","Sales Strategies","Digital Marketing for Hotels","Brand Management","Guest Loyalty Programs"],
      "Human Resource Management": ["Recruitment in Hospitality","Training Programs","Performance Management","Labour Laws Basics","Employee Welfare"],
      "Financial Management": ["Capital Budgeting Basics","Working Capital","Cost Analysis","Financial Ratios","Investment Decisions"],
      "Industrial Training": ["On-job Training","Department Rotation","Skill Application","Industry Exposure","Training Report"],
    },
    "4th Year": {
      "Strategic Management": ["Strategy Formulation in Hospitality","Competitive Analysis","Strategic Planning Tools","Strategy Implementation","Performance Evaluation"],
      "Facility Planning & Design": ["Hotel Layout Planning","Space Standards","Sustainable Design in Hotels","Equipment Planning","Renovation Planning"],
      "Entrepreneurship in Hospitality": ["Business Plan for Hospitality Venture","Funding Options","Restaurant Startup Basics","Risk Assessment","Case Studies"],
      "International Cuisine": ["French Cuisine","Italian Cuisine","Asian Cuisine","Middle Eastern Cuisine","Fusion Cuisine"],
      "Research Methodology": ["Research Design in Hospitality","Data Collection Methods","Industry Analysis","Report Writing","Presentation Skills"],
      "Project Work": ["Topic Selection","Industry Study","Data Analysis","Recommendations","Final Presentation"],
    },
  },
};

// Helper: get topics for a course, year and subject. Returns empty array if not found.
export function getTopics(courseName, year, subjectName) {
  return TOPICS[courseName]?.[year]?.[subjectName] || [];
}

// Helper: get all topics for every subject in a course+year, flattened with subject labels
export function getAllTopicsForCourse(courseName, year) {
  const yearData = TOPICS[courseName]?.[year];
  if (!yearData) return [];
  const result = [];
  Object.entries(yearData).forEach(([subject, topics]) => {
    topics.forEach(topic => result.push({ subject, topic }));
  });
  return result;
}
