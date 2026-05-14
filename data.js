const DOCTORS = [
  // Family Medicine
  { id:1, name:"Dr. Sarah Cohen", specialty:"Family Medicine", emoji:"👩‍⚕️", clinic:"Tel Aviv Central Clinic", address:"12 Dizengoff St, Tel Aviv", languages:["Hebrew","English","Russian"], rating:4.9, reviews:312, experience:18, bio:"Experienced family physician specializing in preventive care and chronic disease management.", available:true, slots:["08:00","08:30","09:00","10:30","11:00","14:00","15:30"] },
  { id:2, name:"Dr. Moshe Levi", specialty:"Family Medicine", emoji:"👨‍⚕️", clinic:"Jerusalem North Clinic", address:"5 Ben Yehuda St, Jerusalem", languages:["Hebrew","Arabic","English"], rating:4.7, reviews:198, experience:22, bio:"General practitioner with a holistic approach to family health.", available:true, slots:["09:00","10:00","11:00","13:00","14:30","16:00"] },
  { id:3, name:"Dr. Noa Shapiro", specialty:"Family Medicine", emoji:"👩‍⚕️", clinic:"Haifa Bay Clinic", address:"3 Hanassi Blvd, Haifa", languages:["Hebrew","English"], rating:4.8, reviews:245, experience:12, bio:"Dedicated to comprehensive care for patients of all ages.", available:false, slots:["08:30","09:30","11:30","13:30","15:00"] },
  { id:4, name:"Dr. Yosef Mizrahi", specialty:"Family Medicine", emoji:"👨‍⚕️", clinic:"Beer Sheva Central", address:"18 Rager Blvd, Beer Sheva", languages:["Hebrew","French"], rating:4.6, reviews:167, experience:15, bio:"Community-focused family doctor with expertise in lifestyle medicine.", available:true, slots:["08:00","09:30","11:00","14:00","16:30"] },

  // Cardiology
  { id:5, name:"Dr. Amir Katz", specialty:"Cardiology", emoji:"🫀", clinic:"Ichilov Heart Center", address:"6 Weizmann St, Tel Aviv", languages:["Hebrew","English"], rating:4.9, reviews:421, experience:25, bio:"Leading cardiologist specializing in interventional cardiology and heart failure.", available:true, slots:["10:00","11:00","13:30","15:00"] },
  { id:6, name:"Dr. Rachel Goldstein", specialty:"Cardiology", emoji:"👩‍⚕️", clinic:"Hadassah Cardiac Unit", address:"Ein Kerem, Jerusalem", languages:["Hebrew","English","Yiddish"], rating:4.8, reviews:356, experience:20, bio:"Expert in echocardiography and preventive cardiology.", available:true, slots:["08:30","10:30","12:00","14:30"] },
  { id:7, name:"Dr. Dan Ben-David", specialty:"Cardiology", emoji:"👨‍⚕️", clinic:"Rambam Cardiology", address:"HaAliya St, Haifa", languages:["Hebrew","Russian","English"], rating:4.7, reviews:289, experience:17, bio:"Specialist in arrhythmias and cardiac electrophysiology.", available:true, slots:["09:00","11:00","13:00","15:30","16:00"] },

  // Dermatology
  { id:8, name:"Dr. Liora Avraham", specialty:"Dermatology", emoji:"🔬", clinic:"Skin & Beauty Clinic TLV", address:"24 Gordon St, Tel Aviv", languages:["Hebrew","English","Spanish"], rating:4.9, reviews:534, experience:16, bio:"Renowned dermatologist for medical and cosmetic skin conditions.", available:true, slots:["08:00","09:00","10:00","11:00","14:00","15:00","16:00"] },
  { id:9, name:"Dr. Ilan Peretz", specialty:"Dermatology", emoji:"👨‍⚕️", clinic:"Jerusalem Derm Center", address:"9 King George St, Jerusalem", languages:["Hebrew","English"], rating:4.6, reviews:198, experience:14, bio:"Expert in psoriasis, eczema, and skin cancer screening.", available:true, slots:["09:30","10:30","12:00","14:30","16:00"] },
  { id:10, name:"Dr. Maya Stern", specialty:"Dermatology", emoji:"👩‍⚕️", clinic:"North Derm Institute", address:"15 Moriah Ave, Haifa", languages:["Hebrew","English","Arabic"], rating:4.8, reviews:312, experience:11, bio:"Specializes in pediatric dermatology and allergic skin disorders.", available:false, slots:["08:30","10:00","13:00","15:00"] },

  // Orthopedics
  { id:11, name:"Dr. Roni Friedman", specialty:"Orthopedics", emoji:"🦴", clinic:"Sport & Bone Clinic", address:"31 Allenby St, Tel Aviv", languages:["Hebrew","English"], rating:4.8, reviews:445, experience:21, bio:"Specialized in sports medicine, knee and shoulder reconstruction.", available:true, slots:["09:00","10:30","12:00","14:00","16:00"] },
  { id:12, name:"Dr. Shlomo Birnbaum", specialty:"Orthopedics", emoji:"👨‍⚕️", clinic:"Hadassah Orthopedics", address:"Ein Kerem, Jerusalem", languages:["Hebrew","English","German"], rating:4.7, reviews:378, experience:28, bio:"Expert in spinal surgery and joint replacement.", available:true, slots:["08:00","11:00","13:30","15:00"] },
  { id:13, name:"Dr. Tali Rotem", specialty:"Orthopedics", emoji:"👩‍⚕️", clinic:"Haifa Bone Center", address:"7 Nordau Ave, Haifa", languages:["Hebrew","English"], rating:4.6, reviews:211, experience:13, bio:"Focuses on pediatric orthopedics and fracture management.", available:true, slots:["09:30","11:00","13:00","15:30","16:30"] },

  // Neurology
  { id:14, name:"Dr. Eli Oren", specialty:"Neurology", emoji:"🧠", clinic:"Sourasky Neurology Dept", address:"6 Weizmann St, Tel Aviv", languages:["Hebrew","English"], rating:4.9, reviews:502, experience:23, bio:"Specialist in epilepsy, migraine, and neurodegenerative diseases.", available:true, slots:["10:00","11:30","13:00","15:00"] },
  { id:15, name:"Dr. Hana Greenfeld", specialty:"Neurology", emoji:"👩‍⚕️", clinic:"Hadassah Neurology", address:"Ein Kerem, Jerusalem", languages:["Hebrew","English","Russian"], rating:4.8, reviews:367, experience:19, bio:"Expert in multiple sclerosis and neuroimmunology.", available:true, slots:["08:30","10:00","12:30","14:00","16:00"] },

  // Gynecology
  { id:16, name:"Dr. Yael Dagan", specialty:"Gynecology", emoji:"👩‍⚕️", clinic:"Women's Health TLV", address:"14 Rothschild Blvd, Tel Aviv", languages:["Hebrew","English"], rating:4.9, reviews:678, experience:20, bio:"Comprehensive women's health, fertility, and minimally invasive surgery.", available:true, slots:["08:00","09:30","11:00","13:00","14:30","16:00"] },
  { id:17, name:"Dr. Miriam Elias", specialty:"Gynecology", emoji:"👩‍⚕️", clinic:"Jerusalem Women Clinic", address:"22 Jaffa Rd, Jerusalem", languages:["Hebrew","English","Arabic","French"], rating:4.8, reviews:489, experience:16, bio:"Specialist in high-risk pregnancy and prenatal care.", available:true, slots:["09:00","10:30","12:00","14:00","15:30"] },

  // Pediatrics
  { id:18, name:"Dr. Avi Nachum", specialty:"Pediatrics", emoji:"👶", clinic:"Kids First Clinic TLV", address:"5 Ibn Gabirol St, Tel Aviv", languages:["Hebrew","English"], rating:4.9, reviews:823, experience:19, bio:"Dedicated pediatrician specializing in developmental medicine and vaccines.", available:true, slots:["08:00","08:30","09:00","09:30","10:00","14:00","14:30","15:00"] },
  { id:19, name:"Dr. Batya Schwartz", specialty:"Pediatrics", emoji:"👩‍⚕️", clinic:"Schneider Children's", address:"14 Kaplan St, Petah Tikva", languages:["Hebrew","English","Yiddish"], rating:4.8, reviews:612, experience:24, bio:"Expert in pediatric infectious diseases and allergy.", available:true, slots:["09:00","10:00","11:00","13:30","14:30","15:30"] },
  { id:20, name:"Dr. Noam Tal", specialty:"Pediatrics", emoji:"👨‍⚕️", clinic:"Haifa Children Clinic", address:"20 Horev St, Haifa", languages:["Hebrew","Arabic","English"], rating:4.7, reviews:398, experience:15, bio:"Pediatric specialist with focus on neonatal care and development.", available:false, slots:["08:30","10:00","11:30","14:00","15:30"] },

  // Psychiatry
  { id:21, name:"Dr. Tamar Lior", specialty:"Psychiatry", emoji:"🧩", clinic:"Mind Wellness TLV", address:"8 Sheinkin St, Tel Aviv", languages:["Hebrew","English"], rating:4.8, reviews:287, experience:17, bio:"Specializes in anxiety, depression, ADHD, and PTSD treatment.", available:true, slots:["10:00","11:30","13:00","14:30","16:00"] },
  { id:22, name:"Dr. Gideon Frank", specialty:"Psychiatry", emoji:"👨‍⚕️", clinic:"Jerusalem Psych Institute", address:"3 Strauss St, Jerusalem", languages:["Hebrew","English","Russian"], rating:4.7, reviews:234, experience:22, bio:"Cognitive behavioral therapy and psychopharmacology expert.", available:true, slots:["09:00","10:30","12:00","15:00","16:30"] },

  // Ophthalmology
  { id:23, name:"Dr. Ziv Koren", specialty:"Ophthalmology", emoji:"👁️", clinic:"Vision Plus TLV", address:"19 Ben Gurion Ave, Tel Aviv", languages:["Hebrew","English"], rating:4.9, reviews:445, experience:20, bio:"Laser eye surgery, cataract, and retinal disease specialist.", available:true, slots:["08:00","09:30","11:00","13:00","14:30","16:00"] },
  { id:24, name:"Dr. Iris Blum", specialty:"Ophthalmology", emoji:"👩‍⚕️", clinic:"Eye Care Jerusalem", address:"17 Hillel St, Jerusalem", languages:["Hebrew","English","French"], rating:4.8, reviews:378, experience:15, bio:"Expert in pediatric ophthalmology and strabismus surgery.", available:true, slots:["09:00","10:30","12:00","14:00","15:30"] },

  // ENT
  { id:25, name:"Dr. Roy Hadad", specialty:"ENT", emoji:"👂", clinic:"Ear Nose Throat Center", address:"26 Dizengoff St, Tel Aviv", languages:["Hebrew","English"], rating:4.7, reviews:312, experience:18, bio:"Head and neck surgery, sinus, and hearing loss specialist.", available:true, slots:["08:30","10:00","11:30","13:00","15:00","16:30"] },
  { id:26, name:"Dr. Shira Ben-Ami", specialty:"ENT", emoji:"👩‍⚕️", clinic:"North ENT Clinic", address:"4 Balfour St, Haifa", languages:["Hebrew","English","Russian"], rating:4.6, reviews:198, experience:12, bio:"Specializes in tonsillitis, sleep apnea, and voice disorders.", available:true, slots:["09:00","10:30","12:00","14:30","16:00"] },

  // Gastroenterology
  { id:27, name:"Dr. Omer Harel", specialty:"Gastroenterology", emoji:"🔎", clinic:"GI Clinic TLV", address:"35 Rothschild Blvd, Tel Aviv", languages:["Hebrew","English"], rating:4.8, reviews:356, experience:16, bio:"Expert in inflammatory bowel disease, colonoscopy, and liver disease.", available:true, slots:["10:00","11:30","13:00","14:30","16:00"] },
  { id:28, name:"Dr. Dina Cohen", specialty:"Gastroenterology", emoji:"👩‍⚕️", clinic:"Hadassah GI Dept", address:"Ein Kerem, Jerusalem", languages:["Hebrew","English"], rating:4.7, reviews:267, experience:20, bio:"Specialist in celiac disease and nutritional gastroenterology.", available:false, slots:["09:00","10:30","12:00","14:00"] },

  // Endocrinology
  { id:29, name:"Dr. Nurit Ben-Or", specialty:"Endocrinology", emoji:"⚗️", clinic:"Diabetes & Thyroid Center", address:"11 Weizmann St, Tel Aviv", languages:["Hebrew","English"], rating:4.9, reviews:423, experience:21, bio:"Leading expert in diabetes, thyroid disorders, and hormonal diseases.", available:true, slots:["09:00","10:00","11:30","13:00","14:30","16:00"] },
  { id:30, name:"Dr. Uri Peled", specialty:"Endocrinology", emoji:"👨‍⚕️", clinic:"Endocrine Clinic North", address:"8 Horev St, Haifa", languages:["Hebrew","English","Russian"], rating:4.7, reviews:289, experience:15, bio:"Expert in metabolic syndrome, obesity medicine, and adrenal disorders.", available:true, slots:["08:30","10:30","12:00","15:00","16:30"] },

  // Oncology
  { id:31, name:"Dr. Lea Manor", specialty:"Oncology", emoji:"🎗️", clinic:"Oncology Center TLV", address:"6 Weizmann St, Tel Aviv", languages:["Hebrew","English"], rating:5.0, reviews:512, experience:26, bio:"Breast and gynecological oncology specialist with cutting-edge immunotherapy expertise.", available:true, slots:["10:00","11:00","13:00","15:00"] },
  { id:32, name:"Dr. Avi Shapira", specialty:"Oncology", emoji:"👨‍⚕️", clinic:"Sheba Oncology", address:"Ramat Gan, Tel HaShomer", languages:["Hebrew","English","French"], rating:4.9, reviews:445, experience:24, bio:"Hematological oncology and bone marrow transplant specialist.", available:true, slots:["09:00","11:00","13:30","15:30"] },

  // Urology
  { id:33, name:"Dr. Benny Alon", specialty:"Urology", emoji:"🏥", clinic:"Urology Institute TLV", address:"3 Trumpeldor St, Tel Aviv", languages:["Hebrew","English"], rating:4.8, reviews:334, experience:19, bio:"Robotic surgery, prostate, and kidney stone specialist.", available:true, slots:["08:00","09:30","11:00","13:30","15:00","16:30"] },
  { id:34, name:"Dr. Ronit Gabay", specialty:"Urology", emoji:"👩‍⚕️", clinic:"Women's Urology Clinic", address:"14 Jabotinsky St, Ramat Gan", languages:["Hebrew","English"], rating:4.7, reviews:245, experience:14, bio:"Expert in female urology, incontinence, and pelvic floor disorders.", available:true, slots:["09:00","10:30","12:00","14:00","15:30"] },

  // Rheumatology
  { id:35, name:"Dr. Adam Rosenberg", specialty:"Rheumatology", emoji:"🦴", clinic:"Rheumatology Center TLV", address:"22 Ibn Gabirol St, Tel Aviv", languages:["Hebrew","English"], rating:4.8, reviews:312, experience:18, bio:"Autoimmune disease, lupus, and rheumatoid arthritis specialist.", available:true, slots:["10:00","11:30","13:00","14:30","16:00"] },
  { id:36, name:"Dr. Hila Vered", specialty:"Rheumatology", emoji:"👩‍⚕️", clinic:"Jerusalem Rheum Clinic", address:"7 King George St, Jerusalem", languages:["Hebrew","English","Russian"], rating:4.6, reviews:198, experience:13, bio:"Focuses on fibromyalgia, osteoporosis, and inflammatory arthritis.", available:false, slots:["09:00","10:30","12:00","14:00"] },

  // Pulmonology
  { id:37, name:"Dr. Sagi Dror", specialty:"Pulmonology", emoji:"🫁", clinic:"Lung Health Center", address:"16 Arlozorov St, Tel Aviv", languages:["Hebrew","English"], rating:4.7, reviews:267, experience:16, bio:"Asthma, COPD, and sleep apnea specialist with bronchoscopy expertise.", available:true, slots:["09:00","10:30","12:00","14:30","16:00"] },
  { id:38, name:"Dr. Nira Oz", specialty:"Pulmonology", emoji:"👩‍⚕️", clinic:"Carmel Lung Clinic", address:"2 Zvulun St, Haifa", languages:["Hebrew","English"], rating:4.8, reviews:312, experience:20, bio:"Specializes in interstitial lung disease and pulmonary hypertension.", available:true, slots:["08:30","10:00","11:30","13:00","15:00","16:30"] },

  // Nephrology
  { id:39, name:"Dr. Kobi Stern", specialty:"Nephrology", emoji:"🫘", clinic:"Kidney Care Center", address:"9 Shaul Hamelech, Tel Aviv", languages:["Hebrew","English"], rating:4.8, reviews:289, experience:22, bio:"Chronic kidney disease, dialysis, and transplant medicine expert.", available:true, slots:["10:00","11:30","13:30","15:00"] },
  { id:40, name:"Dr. Efrat Levy", specialty:"Nephrology", emoji:"👩‍⚕️", clinic:"Rambam Nephrology", address:"HaAliya St, Haifa", languages:["Hebrew","English","Russian"], rating:4.7, reviews:234, experience:17, bio:"Specializes in hypertensive nephropathy and glomerulonephritis.", available:true, slots:["09:00","10:30","12:30","14:00","15:30"] },

  // Hematology
  { id:41, name:"Dr. Tal Erez", specialty:"Hematology", emoji:"🩸", clinic:"Blood Disorders Institute", address:"6 Weizmann St, Tel Aviv", languages:["Hebrew","English"], rating:4.9, reviews:378, experience:23, bio:"Expert in anemia, blood clotting disorders, and lymphoma.", available:true, slots:["09:30","11:00","13:00","14:30","16:00"] },
  { id:42, name:"Dr. Michal Bar", specialty:"Hematology", emoji:"👩‍⚕️", clinic:"Hadassah Hematology", address:"Ein Kerem, Jerusalem", languages:["Hebrew","English"], rating:4.8, reviews:312, experience:19, bio:"Specializes in bone marrow disorders and stem cell transplantation.", available:true, slots:["08:30","10:00","12:00","14:00","15:30"] },

  // Allergy & Immunology
  { id:43, name:"Dr. Gal Haviv", specialty:"Allergy & Immunology", emoji:"🌿", clinic:"AllergyMed TLV", address:"13 Balfour St, Tel Aviv", languages:["Hebrew","English"], rating:4.8, reviews:345, experience:14, bio:"Comprehensive allergy testing, immunotherapy, and asthma management.", available:true, slots:["08:00","09:30","11:00","13:00","14:30","16:00"] },
  { id:44, name:"Dr. Orly Kagan", specialty:"Allergy & Immunology", emoji:"👩‍⚕️", clinic:"Immune Balance Clinic", address:"5 Herzl St, Rehovot", languages:["Hebrew","English"], rating:4.7, reviews:223, experience:11, bio:"Food allergy, eczema, and primary immunodeficiency specialist.", available:true, slots:["09:00","10:30","12:00","14:00","16:00"] },

  // Sports Medicine
  { id:45, name:"Dr. Yonatan Gal", specialty:"Sports Medicine", emoji:"🏃", clinic:"SportMed Center", address:"22 Pinkas St, Tel Aviv", languages:["Hebrew","English"], rating:4.9, reviews:456, experience:15, bio:"Team physician for elite athletes, sports injury and performance medicine.", available:true, slots:["07:30","08:30","09:30","10:30","15:00","16:00","17:00"] },
  { id:46, name:"Dr. Keren Dvir", specialty:"Sports Medicine", emoji:"👩‍⚕️", clinic:"Athletic Health Haifa", address:"10 Sderot HaNassi, Haifa", languages:["Hebrew","English"], rating:4.8, reviews:312, experience:12, bio:"Biomechanics, rehabilitation, and injury prevention specialist.", available:true, slots:["08:00","09:30","11:00","14:00","15:30","17:00"] },

  // Plastic Surgery
  { id:47, name:"Dr. Sharon Even", specialty:"Plastic Surgery", emoji:"✨", clinic:"Aesthetic & Reconstructive", address:"33 Gordon St, Tel Aviv", languages:["Hebrew","English"], rating:4.9, reviews:567, experience:22, bio:"Reconstructive surgery, burn care, and aesthetic procedures.", available:true, slots:["10:00","11:30","13:00","14:30","16:00"] },

  // Geriatrics
  { id:48, name:"Dr. Miriam Tzur", specialty:"Geriatrics", emoji:"🌟", clinic:"Senior Care Center", address:"4 Achad Haam St, Tel Aviv", languages:["Hebrew","English","Yiddish","Russian"], rating:4.9, reviews:389, experience:27, bio:"Comprehensive geriatric assessment, dementia and falls prevention.", available:true, slots:["09:00","10:30","12:00","14:00","15:30"] },

  // Pain Management
  { id:49, name:"Dr. Amos Sela", specialty:"Pain Management", emoji:"💊", clinic:"Pain Relief Center TLV", address:"17 Habarzel St, Tel Aviv", languages:["Hebrew","English"], rating:4.8, reviews:445, experience:20, bio:"Chronic pain, back pain, and neuropathy management specialist.", available:true, slots:["08:30","10:00","11:30","13:00","14:30","16:30"] },
  { id:50, name:"Dr. Dorit Har-Nof", specialty:"Pain Management", emoji:"👩‍⚕️", clinic:"Healing Arts Jerusalem", address:"12 Emek Refaim, Jerusalem", languages:["Hebrew","English","French"], rating:4.7, reviews:312, experience:16, bio:"Integrative pain medicine, fibromyalgia and cancer pain specialist.", available:false, slots:["09:00","11:00","13:30","15:00"] },
];

const SPECIALTIES = [...new Set(DOCTORS.map(d => d.specialty))].sort();
