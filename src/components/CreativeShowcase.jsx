import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/CreativeShowcase.css";

const campaigns = [
  {
    title: "קמפיין לובי לובי",
    description: "מיתוג חדש שמחבר בין נדל״ן לקריאייטיב - פרויקט שהפך לסטנדרט בתעשייה",
    link: "/lobby-lobby",
    icon: "🏢",
    stats: "2.5M+ צפיות"
  },
  {
    title: "קמפיין דיגיטל 360",
    description: "מיתוג במספר – כי מיקום זה הכל. אסטרטגיה דיגיטלית מלאה שהניבה תוצאות מדהימות",
    link: "/campaign-2",
    icon: "🎯",
    stats: "150% עלייה במכירות"
  },
  {
    title: "קמפיין קלאסי פלוס",
    description: "תמ״א? לא רק – זה סיפור של מיתוג. גישה חדשנית לשיווק פרויקטי התחדשות עירונית",
    link: "/classic-campaign",
    icon: "🏗️",
    stats: "95% שיעור המרה"
  },
  {
    title: "קמפיין צומת העיר",
    description: "אבוחצירא 2 – איפה שהעיר מדברת. מיתוג מקום שהפך לסמל עירוני",
    link: "/crossroad-campaign",
    icon: "🌟",
    stats: "פרס זהב בתחרות"
  },
];

const CreativeShowcase = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Simulate loading effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (link) => {
    // Add click animation before navigation
    setTimeout(() => {
      navigate(link);
    }, 200);
  };

  const handleContactClick = () => {
    // Add smooth scroll or navigation effect
    navigate("/contact");
  };

  return (
    <div className={`showcase-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Animated Background */}
      <div className="animated-bg"></div>
      
      {/* Floating Elements */}
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>

      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>🚀 פרסום קריאיטיבי שמשנה את המשחק</h1>
          <p className="subtitle">
            מה עומד מאחורי היצירות שלנו? שיתופים קטנים על תהליכים גדולים
            <br />
            <strong>שמביאים תוצאות מדהימות</strong>
          </p>
          <div className="hero-cta">
            <button 
              className="hero-button"
              onClick={() => document.querySelector('.grid-section').scrollIntoView({ behavior: 'smooth' })}
            >
              גלה את הפרויקטים שלנו
            </button>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid-section">
          <h2 className="section-title">💎 הפרויקטים המובילים שלנו</h2>
          
          <div className="grid">
            {campaigns.map((item, index) => (
              <div
                key={index}
                className={`card ${hoveredCard === index ? 'hovered' : ''}`}
                onClick={() => handleCardClick(item.link)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-icon">
                  {item.icon}
                </div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <div className="card-stats">
                  <span className="stats-badge">{item.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <h2 className="section-title">📊 המספרים מדברים בעד עצמם</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">פרויקטים מוצלחים</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">שביעות רצון לקוחות</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">תמיכה מקצועית</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">שנות ניסיון</div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h2 className="section-title">💬 מה הלקוחות שלנו אומרים</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "הצוות הכי מקצועי שעבדתי איתו. הם הבינו בדיוק מה אנחנו צריכים והביאו תוצאות מעבר לציפיות"
              </div>
              <div className="testimonial-author">
                <strong>דני כהן</strong> - מנכ"ל חברת בנייה
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "הקמפיין שלהם הכפיל את המכירות שלנו תוך 3 חודשים. פשוט מדהים!"
              </div>
              <div className="testimonial-author">
                <strong>שרה לוי</strong> - מנהלת שיווק
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "יצירתיות ברמה אחרת. כל פרויקט איתם זה חוויה חדשה ומרגשת"
              </div>
              <div className="testimonial-author">
                <strong>מיכאל רוזן</strong> - יזם נדל"ן
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h2>🎨  ?מוכנים ליצור משהו מדהים יחד  </h2>
          <p>
            השאירו פרטים ונחזור אליכם תוך 24 שעות
            <br />
            <strong>עם הצעה מותאמת אישית ללא התחייבות</strong>
          </p>
          <div className="contact-benefits">
            <div className="benefit-item">✅ ייעוץ ראשוני חינם</div>
            <div className="benefit-item">✅ אסטרטגיה מותאמת אישית</div>
            <div className="benefit-item">✅ תמיכה מלאה לאורך הדרך</div>
          </div>
          <button 
            className="contact-button"
            onClick={handleContactClick}
          >
            בואו נתחיל לעבוד!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreativeShowcase;
