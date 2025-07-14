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
// הוסיפי את הקוד הזה לקומפוננטה שלך

useEffect(() => {
  // Mouse trail effect
  const createMouseTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);
    return trail;
  };

  const trails = [];
  const maxTrails = 5;

  const handleMouseMove = (e) => {
    // Create new trail element
    const trail = createMouseTrail();
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    
    trails.push(trail);

    // Remove old trails
    if (trails.length > maxTrails) {
      const oldTrail = trails.shift();
      if (oldTrail && oldTrail.parentNode) {
        oldTrail.parentNode.removeChild(oldTrail);
      }
    }

    // Fade out and remove trail after animation
    setTimeout(() => {
      if (trail && trail.parentNode) {
        trail.style.opacity = '0';
        setTimeout(() => {
          if (trail && trail.parentNode) {
            trail.parentNode.removeChild(trail);
          }
        }, 300);
      }
    }, 200);
  };

  // Animated numbers counter
  const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalNumber = parseInt(target.textContent);
          let currentNumber = 0;
          const increment = finalNumber / 50; // 50 steps
          const duration = 2000; // 2 seconds
          const stepTime = duration / 50;

          const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
              target.textContent = finalNumber;
              clearInterval(counter);
              
              // Add bounce animation
              target.classList.add('animated-number');
              setTimeout(() => {
                target.classList.remove('animated-number');
              }, 600);
            } else {
              target.textContent = Math.floor(currentNumber);
            }
          }, stepTime);

          observer.unobserve(target);
        }
      });
    }, observerOptions);

    numbers.forEach(number => {
      observer.observe(number);
    });
  };

  // Staggered card animations
  const animateCards = () => {
    const cards = document.querySelectorAll('.card, .testimonial-card, .stat-item');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
      card.style.transition = 'all 0.6s ease-out';
      observer.observe(card);
    });
  };

  // Enhanced hover effects for cards
  const enhanceCardHovers = () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hovered');
        
        // Add subtle rotation based on mouse position
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          
          card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('hovered');
        card.style.transform = '';
      });
    });
  };

  // Parallax effect for floating elements
  const addParallaxEffect = () => {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.3;
        element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  };

  // Smooth reveal animations
  const addRevealAnimations = () => {
    const elements = document.querySelectorAll('.hero-section, .section-title, .contact-section');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.8s ease-out';
      observer.observe(element);
    });
  };

  // Initialize all effects
  document.addEventListener('mousemove', handleMouseMove);
  animateNumbers();
  animateCards();
  enhanceCardHovers();
  const removeParallax = addParallaxEffect();
  addRevealAnimations();

  // Cleanup function
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    removeParallax();
    
    // Clean up any remaining trails
    trails.forEach(trail => {
      if (trail && trail.parentNode) {
        trail.parentNode.removeChild(trail);
      }
    });
  };
}, []);

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
