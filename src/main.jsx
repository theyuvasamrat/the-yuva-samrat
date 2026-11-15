import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, MapPin, Send, Users, BookOpen, Landmark, MessageCircle, ShieldCheck, ChevronDown, Instagram, Youtube, Facebook, CheckCircle2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from './supabase';
import './styles.css';

const copy = {
  en: {
    nav: ['Home', 'People’s Voice', 'Karnataka', 'Learn Politics', 'Public Opinion', 'Join Us'],
    eyebrow: 'AN INDEPENDENT PUBLIC PLATFORM', heroTitle: 'Our Karnataka.\nOur Responsibility.', heroText: 'A platform for people who care about Karnataka, ask questions and believe in a better future.', explore: 'Explore the platform', raise: 'Raise your voice', scroll: 'SCROLL TO EXPLORE',
    introLabel: 'ROOTED IN KARNATAKA', introTitle: 'A better future begins when people participate.', introText: 'From our villages to our cities, every voice matters. THE YUVA SAMRAT is a space to understand, question and take part in the issues shaping our state.',
    issueKicker: 'YOUR VOICE MATTERS', issueTitle: 'What is happening in your neighbourhood?', issueText: 'Roads, water, public services, education or healthcare. Tell us about an issue affecting your community. Our team reviews submissions before publishing anything.', issueCta: 'Report a public issue',
    karnatakaKicker: 'ONE STATE. MANY STORIES.', karnatakaTitle: 'Discover Karnataka, district by district.', karnatakaText: 'Explore the places, people, heritage and public concerns that make our state what it is.', exploreDistricts: 'Explore Karnataka',
    learnKicker: 'KNOWLEDGE IS POWER', learnTitle: 'Politics should be understood by everyone.', learnText: 'Simple, clear explanations of democracy, government, public representatives and citizens’ rights — in language everyone can understand.', learnCta: 'Start learning',
    opinionKicker: 'LET PEOPLE SPEAK', opinionTitle: 'What should Karnataka focus on next?', opinionText: 'Share your perspective on the issues that matter. These are voluntary website responses, not scientific public-opinion polls.', vote: 'Share my opinion',
    joinKicker: 'BE PART OF THE CONVERSATION', joinTitle: 'A stronger Karnataka starts with involved citizens.', joinText: 'Join a growing community of people who want to contribute ideas, highlight local issues and take part in meaningful conversations.', joinCta: 'Join the community',
    footerLine: 'Our loyalty is to the people — not to any political party or individual.', footerAbout: 'An independent public platform focused on awareness, participation and accountability.', about: 'About the platform', privacy: 'Privacy', disclaimer: 'THE YUVA SAMRAT is an independent public platform. We are not a government body or a registered political party.',
    formIssueTitle: 'Tell us about the issue', name: 'Your name (optional)', phone: 'Mobile number (optional)', district: 'District', category: 'Issue category', location: 'Area / village / city', description: 'Describe the issue', consent: 'I agree that the platform team may contact me about this submission.', submit: 'Submit issue',
    formJoinTitle: 'Join the community', fullName: 'Full name', mobile: 'Mobile number', homeDistrict: 'Your district', interest: 'How would you like to contribute?', joinConsent: 'I agree to be contacted about community participation.', submitJoin: 'Register interest',
    selectDistrict: 'Select district', selectCategory: 'Select category', selectInterest: 'Choose an area', successIssue: 'Thank you. Your issue has been submitted for review.', successJoin: 'Thank you. Your interest has been registered.', error: 'Something went wrong. Please try again.', config: 'Forms will be enabled once the website is connected to Supabase.',
    categories: ['Roads & transport', 'Water & sanitation', 'Education', 'Healthcare', 'Electricity', 'Public services', 'Environment', 'Other'], interests: ['Community contributor', 'Student contributor', 'Local issue reporter', 'Volunteer', 'Share ideas'],
    districts: ['Bagalkot','Ballari','Belagavi','Bengaluru Rural','Bengaluru Urban','Bidar','Chamarajanagar','Chikkaballapur','Chikkamagaluru','Chitradurga','Dakshina Kannada','Davanagere','Dharwad','Gadag','Hassan','Haveri','Kalaburagi','Kodagu','Kolar','Koppal','Mandya','Mysuru','Raichur','Ramanagara','Shivamogga','Tumakuru','Udupi','Uttara Kannada','Vijayanagara','Vijayapura','Yadgir']
  },
  kn: {
    nav: ['ಮುಖಪುಟ', 'ಜನರ ಧ್ವನಿ', 'ಕರ್ನಾಟಕ', 'ರಾಜಕೀಯ ತಿಳಿಯೋಣ', 'ಜನರ ಅಭಿಪ್ರಾಯ', 'ನಮ್ಮ ಜೊತೆ ಸೇರಿ'],
    eyebrow: 'ಸ್ವತಂತ್ರ ಸಾರ್ವಜನಿಕ ವೇದಿಕೆ', heroTitle: 'ನಮ್ಮ ಕರ್ನಾಟಕ.\nನಮ್ಮ ಜವಾಬ್ದಾರಿ.', heroText: 'ಕರ್ನಾಟಕದ ಬಗ್ಗೆ ಕಾಳಜಿ ಹೊಂದಿರುವ, ಪ್ರಶ್ನಿಸುವ ಮತ್ತು ಉತ್ತಮ ಭವಿಷ್ಯವನ್ನು ನಂಬುವ ಜನರ ವೇದಿಕೆ.', explore: 'ವೇದಿಕೆಯನ್ನು ಅನ್ವೇಷಿಸಿ', raise: 'ನಿಮ್ಮ ಧ್ವನಿ ಎತ್ತಿ', scroll: 'ಮುಂದುವರಿಯಲು ಸ್ಕ್ರೋಲ್ ಮಾಡಿ',
    introLabel: 'ಕರ್ನಾಟಕದ ನೆಲದಲ್ಲಿ ಬೆಳೆದ ವೇದಿಕೆ', introTitle: 'ಜನರು ಭಾಗವಹಿಸಿದಾಗಲೇ ಉತ್ತಮ ಭವಿಷ್ಯ ಆರಂಭವಾಗುತ್ತದೆ.', introText: 'ನಮ್ಮ ಹಳ್ಳಿಗಳಿಂದ ನಗರಗಳವರೆಗೆ ಪ್ರತಿಯೊಂದು ಧ್ವನಿಯೂ ಮುಖ್ಯ. ನಮ್ಮ ರಾಜ್ಯದ ಭವಿಷ್ಯವನ್ನು ರೂಪಿಸುವ ವಿಷಯಗಳನ್ನು ತಿಳಿಯಲು, ಪ್ರಶ್ನಿಸಲು ಮತ್ತು ಭಾಗವಹಿಸಲು ಇದು ಒಂದು ವೇದಿಕೆ.',
    issueKicker: 'ನಿಮ್ಮ ಧ್ವನಿ ಮುಖ್ಯ', issueTitle: 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಏನು ಸಮಸ್ಯೆ ಇದೆ?', issueText: 'ರಸ್ತೆ, ನೀರು, ಸಾರ್ವಜನಿಕ ಸೇವೆ, ಶಿಕ್ಷಣ ಅಥವಾ ಆರೋಗ್ಯ. ನಿಮ್ಮ ಸಮುದಾಯದ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಸಮಸ್ಯೆಯನ್ನು ನಮಗೆ ತಿಳಿಸಿ. ಪ್ರಕಟಿಸುವ ಮೊದಲು ನಮ್ಮ ತಂಡ ಪರಿಶೀಲಿಸುತ್ತದೆ.', issueCta: 'ಸಾರ್ವಜನಿಕ ಸಮಸ್ಯೆ ತಿಳಿಸಿ',
    karnatakaKicker: 'ಒಂದು ರಾಜ್ಯ. ಅನೇಕ ಕಥೆಗಳು.', karnatakaTitle: 'ಜಿಲ್ಲೆ ಜಿಲ್ಲೆಗೂ ಕರ್ನಾಟಕವನ್ನು ತಿಳಿಯಿರಿ.', karnatakaText: 'ನಮ್ಮ ರಾಜ್ಯದ ಹೆಮ್ಮೆ, ಜನರು, ಪರಂಪರೆ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.', exploreDistricts: 'ಕರ್ನಾಟಕವನ್ನು ಅನ್ವೇಷಿಸಿ',
    learnKicker: 'ಜ್ಞಾನವೇ ಶಕ್ತಿ', learnTitle: 'ರಾಜಕೀಯ ಎಲ್ಲರಿಗೂ ಅರ್ಥವಾಗಬೇಕು.', learnText: 'ಪ್ರಜಾಪ್ರಭುತ್ವ, ಸರ್ಕಾರ, ಜನಪ್ರತಿನಿಧಿಗಳು ಮತ್ತು ನಾಗರಿಕರ ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ಸರಳ ವಿವರಣೆಗಳು.', learnCta: 'ತಿಳಿದುಕೊಳ್ಳಿ',
    opinionKicker: 'ಜನರು ಮಾತನಾಡಲಿ', opinionTitle: 'ಕರ್ನಾಟಕದ ಮುಂದಿನ ಆದ್ಯತೆ ಏನಾಗಬೇಕು?', opinionText: 'ನಿಮಗೆ ಮುಖ್ಯವೆನಿಸುವ ವಿಷಯಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ಹಂಚಿಕೊಳ್ಳಿ. ಇವು ಸ್ವಯಂಪ್ರೇರಿತ ವೆಬ್‌ಸೈಟ್ ಪ್ರತಿಕ್ರಿಯೆಗಳು; ವೈಜ್ಞಾನಿಕ ಸಮೀಕ್ಷೆಗಳಲ್ಲ.', vote: 'ನನ್ನ ಅಭಿಪ್ರಾಯ ಹಂಚಿಕೊಳ್ಳಿ',
    joinKicker: 'ಸಂವಾದದ ಭಾಗವಾಗಿರಿ', joinTitle: 'ಸಕ್ರಿಯ ನಾಗರಿಕರಿಂದ ಬಲಿಷ್ಠ ಕರ್ನಾಟಕ ನಿರ್ಮಾಣ.', joinText: 'ಸ್ಥಳೀಯ ಸಮಸ್ಯೆಗಳನ್ನು ತಿಳಿಸಲು, ಆಲೋಚನೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಮತ್ತು ಅರ್ಥಪೂರ್ಣ ಚರ್ಚೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸಲು ನಮ್ಮ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ.', joinCta: 'ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ',
    footerLine: 'ನಮ್ಮ ನಿಷ್ಠೆ ಜನರ ಕಡೆಗೆ — ಯಾವುದೇ ರಾಜಕೀಯ ಪಕ್ಷ ಅಥವಾ ವ್ಯಕ್ತಿಯ ಕಡೆಗಲ್ಲ.', footerAbout: 'ಜಾಗೃತಿ, ಜನರ ಭಾಗವಹಿಸುವಿಕೆ ಮತ್ತು ಹೊಣೆಗಾರಿಕೆಗೆ ಆದ್ಯತೆ ನೀಡುವ ಸ್ವತಂತ್ರ ಸಾರ್ವಜನಿಕ ವೇದಿಕೆ.', about: 'ವೇದಿಕೆಯ ಬಗ್ಗೆ', privacy: 'ಗೌಪ್ಯತೆ', disclaimer: 'THE YUVA SAMRAT ಸ್ವತಂತ್ರ ಸಾರ್ವಜನಿಕ ವೇದಿಕೆ. ನಾವು ಸರ್ಕಾರಿ ಸಂಸ್ಥೆಯೂ ಅಲ್ಲ, ನೋಂದಾಯಿತ ರಾಜಕೀಯ ಪಕ್ಷವೂ ಅಲ್ಲ.',
    formIssueTitle: 'ಸಮಸ್ಯೆಯ ಬಗ್ಗೆ ತಿಳಿಸಿ', name: 'ನಿಮ್ಮ ಹೆಸರು (ಐಚ್ಛಿಕ)', phone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (ಐಚ್ಛಿಕ)', district: 'ಜಿಲ್ಲೆ', category: 'ಸಮಸ್ಯೆಯ ವರ್ಗ', location: 'ಪ್ರದೇಶ / ಗ್ರಾಮ / ನಗರ', description: 'ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ', consent: 'ಈ ಮಾಹಿತಿಗೆ ಸಂಬಂಧಿಸಿ ವೇದಿಕೆಯ ತಂಡ ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಲು ಒಪ್ಪುತ್ತೇನೆ.', submit: 'ಸಮಸ್ಯೆ ಸಲ್ಲಿಸಿ',
    formJoinTitle: 'ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ', fullName: 'ಪೂರ್ಣ ಹೆಸರು', mobile: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ', homeDistrict: 'ನಿಮ್ಮ ಜಿಲ್ಲೆ', interest: 'ನೀವು ಹೇಗೆ ಕೊಡುಗೆ ನೀಡಲು ಬಯಸುತ್ತೀರಿ?', joinConsent: 'ಸಮುದಾಯದ ಭಾಗವಹಿಸುವಿಕೆ ಕುರಿತು ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಲು ಒಪ್ಪುತ್ತೇನೆ.', submitJoin: 'ಆಸಕ್ತಿ ನೋಂದಾಯಿಸಿ',
    selectDistrict: 'ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ', selectCategory: 'ವರ್ಗ ಆಯ್ಕೆಮಾಡಿ', selectInterest: 'ಆಸಕ್ತಿ ಆಯ್ಕೆಮಾಡಿ', successIssue: 'ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಶೀಲನೆಗಾಗಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.', successJoin: 'ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ಆಸಕ್ತಿಯನ್ನು ನೋಂದಾಯಿಸಲಾಗಿದೆ.', error: 'ದೋಷ ಉಂಟಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.', config: 'Supabase ಸಂಪರ್ಕಿಸಿದ ನಂತರ ಫಾರ್ಮ್‌ಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ.',
    categories: ['ರಸ್ತೆ ಮತ್ತು ಸಾರಿಗೆ','ನೀರು ಮತ್ತು ಸ್ವಚ್ಛತೆ','ಶಿಕ್ಷಣ','ಆರೋಗ್ಯ ಸೇವೆ','ವಿದ್ಯುತ್','ಸಾರ್ವಜನಿಕ ಸೇವೆಗಳು','ಪರಿಸರ','ಇತರೆ'], interests: ['ಸಮುದಾಯ ಕೊಡುಗೆದಾರ','ವಿದ್ಯಾರ್ಥಿ ಕೊಡುಗೆದಾರ','ಸ್ಥಳೀಯ ಸಮಸ್ಯೆ ವರದಿಗಾರ','ಸ್ವಯಂಸೇವಕ','ಆಲೋಚನೆ ಹಂಚಿಕೊಳ್ಳುವುದು'],
    districts: ['ಬಾಗಲಕೋಟೆ','ಬಳ್ಳಾರಿ','ಬೆಳಗಾವಿ','ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ','ಬೆಂಗಳೂರು ನಗರ','ಬೀದರ್','ಚಾಮರಾಜನಗರ','ಚಿಕ್ಕಬಳ್ಳಾಪುರ','ಚಿಕ್ಕಮಗಳೂರು','ಚಿತ್ರದುರ್ಗ','ದಕ್ಷಿಣ ಕನ್ನಡ','ದಾವಣಗೆರೆ','ಧಾರವಾಡ','ಗದಗ','ಹಾಸನ','ಹಾವೇರಿ','ಕಲಬುರಗಿ','ಕೊಡಗು','ಕೋಲಾರ','ಕೊಪ್ಪಳ','ಮಂಡ್ಯ','ಮೈಸೂರು','ರಾಯಚೂರು','ರಾಮನಗರ','ಶಿವಮೊಗ್ಗ','ತುಮಕೂರು','ಉಡುಪಿ','ಉತ್ತರ ಕನ್ನಡ','ವಿಜಯನಗರ','ವಿಜಯಪುರ','ಯಾದಗಿರಿ']
  }
};

const image = {
  hero: '/hero-karnataka.png',
  hampi: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1200&q=85',
  people: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
  fields: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85',
  city: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1400&q=85',
  parliament: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=85'
};

function App() {
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState('');
  const [issueStatus, setIssueStatus] = useState('');
  const [joinStatus, setJoinStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [pollChoice, setPollChoice] = useState('');
  const [pollSent, setPollSent] = useState(false);
  const t = copy[lang];
  const navIds = ['home','voice','karnataka','learn','opinion','join'];

  const submitIssue = async (e) => {
    e.preventDefault(); setIssueStatus('');
    if (!supabase) { setIssueStatus('config'); return; }
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.from('public_issues').insert({
      name: f.get('name') || null, phone: f.get('phone') || null, district: f.get('district'),
      category: f.get('category'), location: f.get('location'), description: f.get('description'),
      consent: f.get('consent') === 'on', language: lang
    });
    setBusy(false);
    if (error) setIssueStatus('error'); else { setIssueStatus('success'); e.currentTarget.reset(); }
  };
  const submitJoin = async (e) => {
    e.preventDefault(); setJoinStatus('');
    if (!supabase) { setJoinStatus('config'); return; }
    const f = new FormData(e.currentTarget); setBusy(true);
    const { error } = await supabase.from('community_signups').insert({
      full_name: f.get('full_name'), mobile: f.get('mobile'), district: f.get('district'),
      interest: f.get('interest'), consent: f.get('consent') === 'on', language: lang
    });
    setBusy(false);
    if (error) setJoinStatus('error'); else { setJoinStatus('success'); e.currentTarget.reset(); }
  };
  const nav = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const toggleLang = () => { setLang(lang === 'en' ? 'kn' : 'en'); document.documentElement.lang = lang === 'en' ? 'kn' : 'en'; };

  return <div className={lang === 'kn' ? 'app kannada' : 'app'}>
    <header className="header">
      <a className="brand" href="#home" onClick={e=>{e.preventDefault();nav('home')}}><img src="/logo.jpeg" alt="THE YUVA SAMRAT logo"/><span><b>THE YUVA SAMRAT</b><small>THE VOICE OF THE PEOPLE</small></span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'}>{t.nav.map((label,i)=><button key={navIds[i]} onClick={()=>nav(navIds[i])}>{label}</button>)}</nav>
      <div className="header-actions"><button className="language" onClick={toggleLang}>{lang === 'en' ? 'ಕನ್ನಡ' : 'EN'}</button><button className="menu-toggle" aria-label="Toggle menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>

    <main>
      <section className="hero" id="home" style={{'--hero-image':`url(${image.hero})`}}>
        <div className="hero-shade"/><div className="hero-content reveal"><div className="eyebrow light"><span/> {t.eyebrow}</div><h1>{t.heroTitle.split('\n').map((line,i)=><React.Fragment key={line}>{i>0&&<br/>}{line}</React.Fragment>)}</h1><p>{t.heroText}</p><div className="hero-buttons"><button className="btn btn-red" onClick={()=>nav('voice')}>{t.explore}<ArrowRight size={17}/></button><button className="btn btn-outline" onClick={()=>setModal('issue')}>{t.raise}<ArrowUpRight size={17}/></button></div></div>
        <div className="hero-bottom"><span>{t.scroll}</span><ArrowDown size={16}/><span className="hero-location"><MapPin size={14}/> KARNATAKA, INDIA</span></div>
        <div className="hero-mark">ಕರ್ನಾಟಕ</div>
      </section>

      <section className="intro section-pad"><div className="intro-photo"><img src={image.people} alt="People coming together"/><div className="photo-caption">ONE STATE. MANY VOICES.</div></div><div className="intro-copy"><div className="eyebrow"><span/>{t.introLabel}</div><h2>{t.introTitle}</h2><p>{t.introText}</p><div className="intro-rule"><span>01</span><i/></div></div></section>

      <section className="voice-section section-pad" id="voice"><div className="voice-image"><img src={image.fields} alt="Karnataka countryside"/><div className="image-note"><span>ಜನರ ಧ್ವನಿ</span><small>THE PEOPLE'S VOICE</small></div></div><div className="voice-copy"><div className="eyebrow"><span/>{t.issueKicker}</div><h2>{t.issueTitle}</h2><p>{t.issueText}</p><button className="text-link" onClick={()=>setModal('issue')}>{t.issueCta}<ArrowUpRight size={18}/></button></div></section>

      <section className="karnataka-section" id="karnataka"><div className="section-heading"><div><div className="eyebrow light"><span/>{t.karnatakaKicker}</div><h2>{t.karnatakaTitle}</h2><p>{t.karnatakaText}</p></div><button className="btn btn-outline light-btn" onClick={()=>setModal('districts')}>{t.exploreDistricts}<ArrowRight size={17}/></button></div><div className="place-grid"><article className="place-card place-large"><img src={image.hampi} alt="Historic Karnataka architecture"/><div className="place-overlay"><small>HERITAGE & HISTORY</small><h3>Stories carved in stone.</h3></div></article><article className="place-card"><img src={image.city} alt="Karnataka city"/><div className="place-overlay"><small>OUR CITIES</small><h3>Growing together.</h3></div></article><article className="place-card"><img src={image.fields} alt="Karnataka landscape"/><div className="place-overlay"><small>OUR LAND</small><h3>Rooted in our soil.</h3></div></article></div></section>

      <section className="learn-section section-pad" id="learn"><div className="learn-copy"><div className="eyebrow"><span/>{t.learnKicker}</div><h2>{t.learnTitle}</h2><p>{t.learnText}</p><button className="text-link" onClick={()=>setModal('learn')}>{t.learnCta}<ArrowUpRight size={18}/></button></div><div className="learn-cards"><article className="learn-card"><span className="card-number">01</span><Landmark/><h3>How government works</h3><p>Understand institutions, roles and responsibilities.</p><span className="card-kannada">ಆಡಳಿತ ವ್ಯವಸ್ಥೆ</span></article><article className="learn-card dark"><span className="card-number">02</span><ShieldCheck/><h3>Rights & responsibilities</h3><p>Know your rights and how to participate as a citizen.</p><span className="card-kannada">ನಾಗರಿಕರ ಹಕ್ಕುಗಳು</span></article><article className="learn-card red"><span className="card-number">03</span><BookOpen/><h3>Democracy explained</h3><p>Make sense of elections, laws and public policy.</p><span className="card-kannada">ಪ್ರಜಾಪ್ರಭುತ್ವ</span></article></div></section>

      <section className="opinion-section section-pad" id="opinion"><div className="opinion-photo"><img src={image.parliament} alt="Democratic institution"/></div><div className="opinion-content"><div className="eyebrow"><span/>{t.opinionKicker}</div><h2>{t.opinionTitle}</h2><p>{t.opinionText}</p><div className="poll-options">{['Better public healthcare','Quality education','Jobs & opportunities','Roads and infrastructure'].map((v)=><button className={pollChoice===v?'poll-option selected':'poll-option'} key={v} onClick={()=>{setPollChoice(v);setPollSent(false)}}><span className="radio-dot"/>{v}</button>)}</div><button className="btn btn-dark" disabled={!pollChoice||pollSent} onClick={()=>setPollSent(true)}>{pollSent?'Thank you for sharing':t.vote}<ArrowRight size={16}/></button>{pollSent&&<p className="inline-success"><CheckCircle2 size={16}/> Your response has been recorded in this preview.</p>}</div></section>

      <section className="join-section" id="join"><div className="join-inner"><div className="eyebrow light"><span/>{t.joinKicker}</div><h2>{t.joinTitle}</h2><p>{t.joinText}</p><button className="btn btn-white" onClick={()=>setModal('join')}>{t.joinCta}<ArrowRight size={17}/></button><div className="join-watermark">YUVA</div></div></section>
    </main>

    <footer className="footer"><div className="footer-top"><div className="footer-brand"><img src="/logo.jpeg" alt="THE YUVA SAMRAT"/><div><b>THE YUVA SAMRAT</b><p>{t.footerAbout}</p></div></div><div className="footer-statement">“{t.footerLine}”</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} THE YUVA SAMRAT</span><span>{t.disclaimer}</span><div className="socials"><a href="#instagram" aria-label="Instagram"><Instagram size={17}/></a><a href="#youtube" aria-label="YouTube"><Youtube size={17}/></a><a href="#facebook" aria-label="Facebook"><Facebook size={17}/></a></div></div></footer>

    {modal && <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal('')}}><div className="modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={()=>setModal('')} aria-label="Close"><X/></button>
      {modal==='issue'&&<><div className="eyebrow"><span/>{t.issueKicker}</div><h2>{t.formIssueTitle}</h2><form onSubmit={submitIssue}><label>{t.name}<input name="name" maxLength="100"/></label><label>{t.phone}<input name="phone" inputMode="tel" maxLength="15"/></label><div className="form-row"><label>{t.district}<select name="district" required><option value="">{t.selectDistrict}</option>{t.districts.map(d=><option key={d}>{d}</option>)}</select></label><label>{t.category}<select name="category" required><option value="">{t.selectCategory}</option>{t.categories.map(d=><option key={d}>{d}</option>)}</select></label></div><label>{t.location}<input name="location" required maxLength="180"/></label><label>{t.description}<textarea name="description" required minLength="15" maxLength="3000" rows="4"/></label><label className="check-label"><input type="checkbox" name="consent" required/><span>{t.consent}</span></label><button className="btn btn-red submit-btn" disabled={busy}>{busy?'Submitting…':t.submit}<Send size={16}/></button></form>{issueStatus&&<div className={issueStatus==='success'?'form-message success':'form-message'}>{issueStatus==='success'?t.successIssue:issueStatus==='config'?t.config:t.error}</div>}</>}
      {modal==='join'&&<><div className="eyebrow"><span/>{t.joinKicker}</div><h2>{t.formJoinTitle}</h2><form onSubmit={submitJoin}><label>{t.fullName}<input name="full_name" required maxLength="120"/></label><label>{t.mobile}<input name="mobile" required inputMode="tel" maxLength="15"/></label><label>{t.homeDistrict}<select name="district" required><option value="">{t.selectDistrict}</option>{t.districts.map(d=><option key={d}>{d}</option>)}</select></label><label>{t.interest}<select name="interest" required><option value="">{t.selectInterest}</option>{t.interests.map(d=><option key={d}>{d}</option>)}</select></label><label className="check-label"><input type="checkbox" name="consent" required/><span>{t.joinConsent}</span></label><button className="btn btn-red submit-btn" disabled={busy}>{busy?'Submitting…':t.submitJoin}<Users size={16}/></button></form>{joinStatus&&<div className={joinStatus==='success'?'form-message success':'form-message'}>{joinStatus==='success'?t.successJoin:joinStatus==='config'?t.config:t.error}</div>}</>}
      {modal==='districts'&&<><div className="eyebrow"><span/>KARNATAKA</div><h2>Explore our districts</h2><p className="modal-intro">A district directory is planned for the next development phase. Choose a district to start exploring.</p><div className="district-list">{t.districts.map(d=><span key={d}>{d}</span>)}</div></>}
      {modal==='learn'&&<><div className="eyebrow"><span/>POLITICS EXPLAINED</div><h2>Understand the systems that shape our lives.</h2><p className="modal-intro">Our learning library will explain these topics in clear, accessible language.</p><div className="learning-list"><div><Landmark/>How Karnataka's government works</div><div><ShieldCheck/>Fundamental rights and duties</div><div><BookOpen/>How laws and budgets work</div><div><Users/>The role of local government</div></div></>}
    </div></div>}
    <div className="config-pill" title="Backend connection status"><span className={isSupabaseConfigured?'online':'offline'}/>{isSupabaseConfigured?'DATABASE CONNECTED':'PREVIEW MODE'}</div>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
