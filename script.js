import PhotoSwipe from 'https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js';

document.addEventListener('DOMContentLoaded', function() {
  // Page Loader
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });


  // Initialize EmailJS
  emailjs.init("jwAK1lWQGhjwf2PL8");

  // Header scroll effect
  const header = document.querySelector('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  
  // Set initial state
  handleScroll();


  // Typewriter effect for hero section
  const name = "Muhammad Saad";
  const element = document.querySelector('.highlight');
  let i = 0;
  
  function typeWriter() {
    if (i < name.length) {
      element.textContent += name.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  
  element.textContent = '';
  typeWriter();

  // Navigation and Menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');
  const orderBtn = document.querySelector('.menu-order-btn .btn');

  // Toggle menu
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      if (navMenu) navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking links or order button
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  if (orderBtn) orderBtn.addEventListener('click', closeMenu);

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('nav') && !e.target.classList.contains('hamburger')) {
      closeMenu();
    }
  });

  function closeMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        history.pushState(null, null, targetId);
      }
    });
  });

  // Animate Skills on Scroll
  const skillsSection = document.querySelector('.skills-experience');
  if (skillsSection) {
    const progressBars = document.querySelectorAll('.skills-experience .progress');
    
    const animateSkills = () => {
      progressBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (barPosition < screenPosition) {
          const progress = bar.getAttribute('data-progress');
          bar.style.width = `${progress}%`;
        }
      });
    };

    // Initial check in case the section is already in view
    animateSkills();

    // Animate on scroll
    window.addEventListener('scroll', animateSkills);
  }

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      emailjs.sendForm('service_jsn6z3m', 'template_pyqy19b', this)
        .then(function() {
          alert('Message sent successfully!');
          contactForm.reset();
        }, function(error) {
          alert('Failed to send message. Please try again.');
          console.error('EmailJS Error:', error);
        })
        .finally(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        });
    });
  }

  // Footer Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const messageDiv = document.getElementById('newsletter-message');

      // Basic email validation
      if (!emailInput.value || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
        messageDiv.textContent = 'Please enter a valid email.';
        messageDiv.className = 'form-message error';
        messageDiv.style.display = 'block';
        setTimeout(() => { messageDiv.style.display = 'none'; }, 3000);
        return;
      }

      // Simulate a successful subscription
      messageDiv.textContent = 'Thank you for subscribing!';
      messageDiv.className = 'form-message success';
      messageDiv.style.display = 'block';
      
      newsletterForm.reset();

      // Hide the message after 3 seconds
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 3000);
    });
  }


  // Service data - Add this near the top of your script
const services = {
  'Frontend Development': {
    description: `
      <h4>Transform Your Digital Presence</h4>
      <p><strong>I specialize in creating beautiful, responsive, and interactive user interfaces</strong> that deliver exceptional user experiences. My frontend development services focus on performance, accessibility, and pixel-perfect implementation of designs.</p>
      
      <h4>Comprehensive Frontend Solutions</h4>
      <p>Whether you need a simple landing page or a complex single-page application, I can build it with <strong>clean, maintainable code</strong> that follows best practices. My approach includes:</p>
      <ul>
        <li><strong>Mobile-first responsive design</strong> that works flawlessly on all devices</li>
        <li><strong>Performance optimization</strong> for fast loading and smooth interactions</li>
        <li><strong>Cross-browser compatibility</strong> ensuring consistent experience</li>
        <li><strong>Accessibility standards</strong> (WCAG) for inclusive design</li>
        <li><strong>Modern animations</strong> and transitions that enhance UX</li>
      </ul>
      
      <h4>Collaborative Design Process</h4>
      <p>I work closely with designers to ensure the final product matches the vision while maintaining technical feasibility. My process includes:</p>
      <ul>
        <li>Design system implementation</li>
        <li>Component-based architecture</li>
        <li>Responsive breakpoint planning</li>
        <li>Performance budgeting</li>
      </ul>
    `,
    technologies: [
      { name: 'HTML5', icon: 'fab fa-html5' },
      { name: 'CSS3', icon: 'fab fa-css3-alt' },
      { name: 'JavaScript', icon: 'fab fa-js' },
      { name: 'React', icon: 'fab fa-react' },
      { name: 'Vue.js', icon: 'fab fa-vuejs' },
      { name: 'Angular', icon: 'fab fa-angular' },
      { name: 'TypeScript', icon: 'fas fa-code' },
      { name: 'Tailwind CSS', icon: 'fas fa-wind' },
      { name: 'Bootstrap', icon: 'fab fa-bootstrap' },
      { name: 'Sass', icon: 'fab fa-sass' }
     ]
  },
  'Backend Development': {
    description: `
      <h4>Powerful Server-Side Solutions</h4>
      <p>I build <strong>robust, scalable backend systems</strong> that power your applications. My backend services ensure your application performs well under load, remains secure, and can grow with your business needs.</p>
      
      <h4>End-to-End Backend Services</h4>
      <p>From API development to database design, I handle all aspects of server-side development with a focus on:</p>
      <ul>
        <li><strong>RESTful API design</strong> and implementation following best practices</li>
        <li><strong>Authentication systems</strong> with JWT, OAuth, and session management</li>
        <li><strong>Database architecture</strong> with optimization for performance</li>
        <li><strong>Server configuration</strong> for production environments</li>
        <li><strong>Performance monitoring</strong> with logging and analytics</li>
      </ul>
      
      <h4>Security-First Approach</h4>
      <p>I focus on writing <strong>clean, well-documented code</strong> with proper error handling and security considerations built in from the start. This includes:</p>
      <ul>
        <li>Input validation and sanitization</li>
        <li>Rate limiting and DDoS protection</li>
        <li>Data encryption at rest and in transit</li>
        <li>Regular security audits</li>
      </ul>
    `,
    technologies: [
      { name: 'Node.js', icon: 'fab fa-node' },
      { name: 'Express', icon: 'fas fa-server' },
      { name: 'PHP', icon: 'fab fa-php' },
      { name: 'Laravel', icon: 'images/laravel.webp' },
      { name: 'Django', icon: 'fab fa-python' },
      { name: 'MongoDB', icon: 'fas fa-database' },
      { name: 'MySQL', icon: 'fas fa-database' },
      { name: 'PostgreSQL', icon: 'fas fa-database' },
      { name: 'Firebase', icon: 'fas fa-fire' },
      { name: 'GraphQL', icon: 'fas fa-project-diagram' }
  ]
  },
  'Full Stack Solutions': {
    description: `
      <h4>Complete Web Application Development</h4>
      <p>I provide <strong>end-to-end web application development</strong> using the MERN stack (MongoDB, Express, React, Node.js) and other modern technologies. This comprehensive approach ensures seamless integration between all components.</p>
      
      <h4>Full Lifecycle Development</h4>
      <p>My full stack services cover every aspect of your application:</p>
      <ul>
        <li><strong>Application architecture</strong> planning and implementation</li>
        <li><strong>Database design</strong> with proper relationships and indexing</li>
        <li><strong>API development</strong> with thorough documentation</li>
        <li><strong>UI/UX implementation</strong> with responsive design</li>
        <li><strong>Authentication flows</strong> for secure access</li>
        <li><strong>CI/CD pipelines</strong> for automated deployment</li>
      </ul>
      
      <h4>Why Choose Full Stack Development?</h4>
      <p>By handling both frontend and backend development, I can:</p>
      <ul>
        <li>Optimize the entire application workflow</li>
        <li>Ensure seamless component integration</li>
        <li>Reduce communication overhead</li>
        <li>Deliver faster with coordinated development</li>
        <li>Maintain consistency across the stack</li>
      </ul>
    `,
    technologies: [
      { name: 'MERN', icon: 'fas fa-layer-group' },
      { name: 'MEAN', icon: 'fas fa-layer-group' },
      { name: 'Next.js', icon: 'fas fa-globe' },
      { name: 'Nuxt.js', icon: 'fab fa-vuejs' },
      { name: 'Docker', icon: 'fab fa-docker' },
      { name: 'AWS', icon: 'fab fa-aws' },
      { name: 'JWT', icon: 'fas fa-key' },
      { name: 'Redux', icon: 'fas fa-code-branch' },
      { name: 'Webpack', icon: 'fas fa-cube' },
      { name: 'Git', icon: 'fab fa-git-alt' }
    ]
  }
};

// Service Modal Elements
const serviceModal = document.getElementById('service-modal');
const serviceModalTitle = document.getElementById('service-modal-title');
const serviceModalDescription = document.querySelector('.service-modal-description');
const techGrid = document.querySelector('.tech-grid');
const closeServiceModalBtn = document.querySelector('.close-service-modal');

// Function to show service modal
function showServiceModal() {
  serviceModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  // Trigger reflow to enable CSS transition
  void serviceModal.offsetWidth;
  serviceModal.classList.add('modal-open');
}

// Function to hide service modal
function hideServiceModal() {
  serviceModal.classList.remove('modal-open');
  setTimeout(() => {
    serviceModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
}

// Function to open service modal with specific service data
function openServiceModal(serviceName) {
  const service = services[serviceName];
  if (!service) return;
  
  // Set modal title
  serviceModalTitle.textContent = serviceName;
  
  // Set service description
  serviceModalDescription.innerHTML = service.description || '<p>No description available.</p>';
  
  // Clear and populate technologies grid
  techGrid.innerHTML = '';
  if (service.technologies && service.technologies.length > 0) {
    service.technologies.forEach(tech => {
      const techItem = document.createElement('div');
      techItem.className = 'tech-item';
      techItem.innerHTML = `
        <i class="${tech.icon}"></i>
        <h4>${tech.name}</h4>
      `;
      techGrid.appendChild(techItem);
    });
  } else {
    techGrid.innerHTML = '<p>No technologies listed for this service.</p>';
  }
  
  // Show modal
  showServiceModal();
}

// Add click events to "Learn More" buttons
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', function(e) {
    e.preventDefault();
    const serviceName = this.dataset.service;
    if (serviceName) openServiceModal(serviceName);
  });
});

// Close modal when clicking X button
closeServiceModalBtn.addEventListener('click', function(e) {
  e.preventDefault();
  hideServiceModal();
});

// Close modal when clicking outside content
serviceModal.addEventListener('click', function(e) {
  if (e.target === serviceModal) {
    hideServiceModal();
  }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && serviceModal.style.display === 'block') {
    hideServiceModal();
  }
});

  // Portfolio Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const loadMoreBtn = document.getElementById('load-more-btn');
  
  // Project data with detailed descriptions
  const projects = {
     'Visual Sharing Platform': {
    images: ['images/full-stack/visual1.webp',
                'images/full-stack/visual2.webp',
                'images/full-stack/visual3.webp',
                'images/full-stack/visual4.webp'
    ],
     description: `
      <p>A Pinterest-inspired visual content platform built with PHP, MySQL, and modern JavaScript, designed for seamless image sharing and discovery.</p>
      <ul class="features-list">
        <li><span>✨ Pinterest-Style Grid:</span> Authentic masonry layout with dynamic column balancing and smooth hover effects</li>
        <li><span>✅ Full User System:</span> Secure registration/login with password hashing and session management</li>
        <li><span>🎯 Content Management:</span> Drag-and-drop uploads, automatic thumbnails, and responsive image handling</li>
        <li><span>📱 Fully Responsive:</span> Perfectly adapted for all devices from mobile to desktop</li>
        <li><span>💎 Modern UI/UX:</span> Clean card design with animated overlays, lazy loading, and intuitive navigation</li>
        <li><span>⚡ Performance Optimized:</span> Efficient database queries, minimized assets, and progressive image loading</li>
        <li><span>🔒 Secure Architecture:</span> Protected file uploads, prepared statements, and input validation</li>
      </ul>
      <p class="closing-note">Ideal for building communities around visual content with a beautiful, engaging interface! 🖼️</p>
    `,
    links: {
      demo: "https://visualshare.ct.ws/",
      github: "https://github.com/m-saad-1/VisualShare"
    },
      type: "Fullstack",
      complexity: "Complex"
    },
   


  'FunnelFlow': {
  "images": ["images/front-end/funnelflow.webp"],
  "description": `
    <p>A professional sales funnel builder landing page with a clean green theme featuring:</p>
    <ul class="features-list">
      <li><span>🚀 Instant Pages:</span> Quickly launch beautiful responsive landing pages using ready-made templates and blocks</li>
      <li><span>🤖 Sales Automation:</span> Automated email sequences and actions that nurture leads and convert them into customers</li>
      <li><span>📈 Analytics Dashboard:</span> Real-time stats and insights to optimize funnels and track conversions</li>
      <li><span>🛠️ Drag & Drop Builder:</span> Build and customize funnels without coding using an intuitive editor</li>
      <li><span>🔗 Integrations:</span> Connect easily with CRMs, payment processors, and third-party tools</li>
      <li><span>💬 Dedicated Support:</span> Access to expert support to help you succeed with funnel building</li>
      <li><span>💳 Pricing Plans:</span> Starter, Professional, and Enterprise tiers with free trial options</li>
      <li><span>🌟 Testimonials:</span> Customer success stories highlighting ease of use and powerful analytics</li>
    </ul>
    <p class="closing-note">Designed to help coaches, marketers, and entrepreneurs grow their business effortlessly with high-converting funnels! 🌱</p>
  `,
  "links": {
    "demo": "https://funnel-flow.netlify.app",
    "github": "https://github.com/m-saad-1/funnel-flow"
  },
  type: "Frontend",
  complexity: "Small"
},


  'Helping-Desk System': {
  images: ['images/full-stack/help1.webp',
    'images/full-stack/help2.webp',
    'images/full-stack/help3.webp',
    'images/full-stack/help4.webp',
    'images/full-stack/help5.webp',
    'images/full-stack/help6.webp'
  ],
  description: `
    <p>A comprehensive help desk ticket management system built with PHP, JavaScript, and MySQL.</p>
    <ul class="features-list">
      <li><span>🎫 Ticket Management:</span> Create, track, and resolve support tickets efficiently</li>
      <li><span>👥 User Roles:</span> Admin, staff, and customer roles with different permissions</li>
      <li><span>📊 Dashboard:</span> Analytics and overview of ticket statuses and response times</li>
      <li><span>🔔 Notifications:</span> Real-time updates for ticket status changes</li>
      <li><span>📝 Knowledge Base:</span> Integrated solution database for common issues</li>
      <li><span>🔒 Secure Authentication:</span> Protected login system with password hashing</li>
    </ul>
    <p class="closing-note">Perfect for businesses needing an internal support system or customer service platform! 🛠️</p>
  `,
  links: {
    demo: "https://helping-desk.ct.ws/",
    github: "https://github.com/m-saad-1/helping-desk"
  },
  type: "Fullstack",
  complexity: "Complex"
},
       'Men Fashion Hub': {
    images: ['images/full-stack/fashionhub1.webp', 'images/full-stack/fashionhub2.webp', 
      'images/full-stack/fashionhub3.webp',
      'images/full-stack/fashionhub4.webp',
      'images/full-stack/fashionhub5.webp',
      'images/full-stack/fashionhub7.webp',
      'images/full-stack/fashionhub8.webp',
      'images/full-stack/fashionhub9.webp'        
      ],
  description: `
    <p>A sleek, high-performance Men’s Fashion E-Commerce Store built with modern web technologies, designed to deliver a premium shopping experience.</p>
    <ul class="features-list">
      <li><span>👕 Product Showcase:</span> Beautifully organized product listings with filters, categories, and real-time search</li>
      <li><span>🛍️ Interactive Shopping:</span> Seamless add-to-cart, wishlist, and checkout flow with live order updates</li>
      <li><span>🔐 Secure Authentication:</span> User registration, login, and profile management with password protection</li>
      <li><span>💳 Integrated Payments:</span> Smooth Stripe/PayPal checkout with promo code support</li>
      <li><span>🌓 Dark/Light Mode:</span> Elegant theme toggle with saved preferences</li>
      <li><span>📱 Fully Responsive:</span> Optimized layout for mobile, tablet, and desktop</li>
      <li><span>📦 Admin Dashboard:</span> Manage products, orders, and users with insightful sales reports</li>
      <li><span>✨ Modern UI:</span> Clean layout with stylish animations, transitions, and intuitive UX</li>
    </ul>
    <p class="closing-note">📈 Perfect for launching a polished, feature-rich fashion store with real-time e-commerce capabilities! 🚀</p>
  `,
  links: {
    demo: "https://fashionhub.ct.ws",
    github: "https://github.com/m-saad-1/Men-Fashion-Hub"
  },
      type: "Fullstack",
      complexity: "Complex"
    },
    'Bug Solving Platform': {
      images: ['images/full-stack/devbug1.webp', 
        'images/full-stack/devbug2.webp',
        'images/full-stack/devbug3.webp',
        'images/full-stack/devbug4.webp',
        'images/full-stack/devbug5.webp',
        'images/full-stack/devbug6.webp',
        'images/full-stack/devbug7.webp',
        'images/full-stack/devbug8.webp' 
      ],
      description: `
        <p>A collaborative space where developers post bugs with code snippets and receive crowd-sourced solutions.</p>
        <ul class="features-list">
          <li><span>✨ Community-Driven Platform:</span> A collaborative space where developers post bugs with code snippets and receive crowd-sourced solutions.</li>
          <li><span>✅ Full-Featured User System:</span> Secure registration/login, password hashing, and a comprehensive personal dashboard with activity charts and stats.</li>
          <li><span>🎯 Advanced Content Management:</span> Detailed bug reports with priority levels, tags, and multiple file/image uploads. Users can post rich solutions with code, which bug owners can approve.</li>
          <li><span>💬 Rich Interaction & Gamification:</span> AJAX-powered comments with replies, solution voting, and a reputation system with ranks and leaderboards to reward helpful contributors.</li>
          <li><span>🔔 Real-Time Engagement:</span> A complete notification system for new comments, solutions, and approvals, plus a one-on-one real-time chat system for direct user messaging.</li>
          <li><span>📱 Fully Responsive & Modern UI:</span> A clean, card-based design that's perfectly adapted for all devices, featuring dynamic modals, interactive filters, and asynchronous actions.</li>
          <li><span>⚡ Performance Optimized:</span> Efficient database queries using PDO, lazy loading elements, and a focus on a smooth, fast user experience.</li>
          <li><span>🔒 Secure & Robust Architecture:</span> Built with security in mind, featuring prepared statements to prevent SQL injection, input validation, and secure file handling.</li>
        </ul>
        <p class="closing-note">Ideal for building a knowledge-sharing community where developers can learn, collaborate, and grow their skills by solving real-world problems together! 🐞</p>
      `,
      links: {
        demo: "https://devbug.ct.ws",
    github: "https://github.com/m-saad-1/DevBug"
      },
      type: "Fullstack",
      complexity: "Complex"
    },
   
    'Registration System': {
    images: ['images/back-end/registration.webp'],
    description: `
      <p>A secure, professional authentication system built with PHP featuring:</p>
      <ul class="features-list">
        <li><span>🔐 User Authentication:</span> Robust login/signup system with password hashing and session management</li>
        <li><span>📝 Form Validation:</span> Real-time error detection with clear feedback for all fields</li>
        <li><span>💎 Modern UI:</span> Clean, minimalist design with subtle animations and professional styling</li>
        <li><span>📱 Fully Responsive:</span> Flawless experience across all devices with adaptive layouts</li>
        <li><span>✨ Enhanced UX:</span> Loading states, error handling, and success feedback</li>
      </ul>
      <p class="closing-note">Perfect for implementing secure user authentication with a polished, professional interface! 🚀</p>
    `,
    links: {
      demo: "https://user-auth.ct.ws/",
      github: "https://github.com/m-saad-1/User-auth"
    },
      type: "Backend",
      complexity: "Moderate"
    },
   'Modern MERN Contact Form': {
    images: ['images/back-end/contact.webp'],
    description: `
      <p>A secure, user-friendly contact form built with the MERN stack (MongoDB, Express, React, Node.js), designed for seamless communication.</p>
      <ul class="features-list">
        <li><span>📩 Effortless Submission:</span> Clean form with fields for name, email, and message, backed by MERN's full-stack capabilities</li>
        <li><span>🔒 Secure Data Handling:</span> Server-side validation and encryption for safe storage and transmission</li>
        <li><span>✨ Real-Time Validation:</span> Instant feedback for errors in email format or empty fields</li>
        <li><span>📱 Fully Responsive:</span> Adapts perfectly to all devices with a polished UI</li>
        <li><span>💬 User Feedback:</span> Clear success/error messages upon submission</li>
        <li><span>📧 Multi-Channel Support:</span> Includes displayed email and phone for alternative contact</li>
      </ul>
      <p class="closing-note">Ideal for businesses or portfolios needing a reliable, modern way to connect with users! 🚀</p>
    `,
    links: {
      demo: "https://your-contact-form-demo.com",
      github: "https://github.com/yourusername/mern-contact-form"
    },
      type: "Backend",
      complexity: "Moderate"
    },
   'Interactive Quizz App': {
    images: ['images/front-end/quiz-app.webp'],
    description: `
      <p>A dynamic, interactive quiz application built with React featuring:</p>
      <ul class="features-list">
        <li><span>🎯 Quiz Functionality:</span> Multiple-choice questions with randomized order, real-time scoring, and progress tracking</li>
        <li><span>⏱️ Timer Options:</span> Configurable time limits per question</li>
        <li><span>🌓 Dark/Light Mode:</span> Smooth theme switching with persistent user preferences</li>
        <li><span>📱 Responsive Design:</span> Works flawlessly on all devices</li>
        <li><span>✨ Modern UI:</span> Clean animations and transitions for an engaging experience</li>
      </ul>
      <p class="closing-note">Perfect for testing knowledge with a polished, user-friendly interface! 🚀</p>
    `,
    links: {
      demo: "https://quiz-app-demo.com",
      github: "https://github.com/yourusername/quiz-app"
    },
      type: "Frontend",
      complexity: "Moderate"
    },
    'Interactive landing page': {
    images: ['images/front-end/interactive.webp'],
    description: `
      <p>A sleek, high-performance landing page built with HTML, CSS, and JavaScript, designed to captivate users and drive engagement.</p>
      <ul class="features-list">
        <li><span>✨ Hero Section:</span> Eye-catching animated headline, particle background effect, and smooth scroll-down interaction</li>
        <li><span>✅ Dynamic About Section:</span> Animated counters, responsive layout, and engaging feature highlights</li>
        <li><span>🎯 Interactive Features:</span> Tabs, sliders, hover effects, and scroll-triggered animations</li>
        <li><span>📱 Fully Responsive:</span> Optimized for all devices (mobile, tablet, desktop)</li>
        <li><span>💎 Modern UI/UX:</span> Clean design, smooth transitions, and micro-interactions</li>
        <li><span>⚡ Performance Optimized:</span> Fast loading, minimal dependencies, and efficient animations</li>
      </ul>
      <p class="closing-note">Perfect for showcasing products, services, or portfolios with a polished, engaging experience! 🚀</p>
    `,
     links: {
      demo: "https://naxus.netlify.app/",
      github: "https://github.com/m-saad-1/Naxus-Landing-page"
    },
      type: "Frontend",
      complexity: "Small"
    },
    'MERN Multi-Step Form': {
          images: ['images/back-end/step1.webp',
            'images/back-end/step2.webp',
            'images/back-end/step3.webp',
            'images/back-end/step4.webp',
            'images/back-end/step5.webp',
            'images/back-end/step6.webp',
            'images/back-end/step7.webp',
            'images/back-end/step8.webp'
          ],
          description: `
            <p>A dynamic, multi-step form application built with modern web technologies for seamless user data collection.</p>
    <ul class="features-list">
      <li><span>🔄 Step-by-Step Flow:</span> Intuitive 5-step process with progress tracking</li>
      <li><span>🔒 Secure Validation:</span> Real-time error checking for all field types</li>
      <li><span>📱 Responsive Design:</span> Fully adaptable to all devices and screen sizes</li>
      <li><span>🤖 Smart Logic:</span> Conditional fields that adapt to user selections</li>
      <li><span>📝 Summary Review:</span> Final confirmation page with all submitted data</li>
      <li><span>✨ Modern UI:</span> Clean interface with smooth animations and transitions</li>
    </ul>
    <p class="closing-note">Perfect for service registrations, complex data collection, and user onboarding processes! 🚀</p>
  `,
  links: {
    demo: "https://multistep-form-demo.com",
    github: "https://github.com/m-saad-1/Multiple-steps-form"
  },
      type: "Backend",
      complexity: "Moderate"
    },
    'Performance Marketing Platform': {
      images: ['images/front-end/boosteraffix.webp'],
    description: `
      <p>A high-conversion performance marketing platform built with HTML, CSS, and JavaScript, designed to attract premium publishers and advertisers.</p>
      <ul class="features-list">
        <li><span>✨ Dual-Audience Hero:</span> Animated traffic visualization with floating elements and gradient overlays that emphasize growth</li>
        <li><span>✅ Publisher Network Showcase:</span> Real media brand logos with interactive hover states and credibility-building stats</li>
        <li><span>🎯 Conversion-Focused CTAs:</span> Strategic publisher/advertiser signup sections with benefit-driven copy</li>
        <li><span>📱 Performance-Optimized:</span> Fully responsive layouts with intelligent mobile adaptation and fast loading</li>
        <li><span>💎 Data Visualization:</span> Animated ROI metrics, testimonial cards, and dashboard-style tech displays</li>
        <li><span>⚡ Marketing-Focused UI:</span> Clean conversion paths, micro-interactions, and scroll-triggered social proof elements</li>
      </ul>
      <p class="closing-note">Ideal for performance marketing networks seeking to onboard premium partners with a polished, results-driven experience! 🚀</p>
    `,
    links: {
      demo: "https://boosteraffix.netlify.app",
      github: "https://github.com/m-saad-1/BoosterAffix"
      },
      type: "Frontend",
      complexity: "Small"
    },
     'Responsive Portfolio Website': {
          images: ['images/front-end/portfolio.webp'],
          description: `
            <p>A modern, responsive portfolio website designed to showcase your work and skills effectively.</p>
            <ul class="features-list">
              <li><span>🌐 Responsive Design:</span> Adapts seamlessly to all screen sizes</li>
              <li><span>🎨 Customizable Layout:</span> Flexible sections for projects, skills, and contact information</li>
              <li><span>📸 Image Gallery:</span> Showcase your work with a beautiful image grid</li>
              <li><span>📞 Contact Form:</span> Easy way for potential clients to reach you</li>
              <li><span>🚀 Fast Loading:</span> Optimized for performance and user experience</li>
            </ul>
            <p class="closing-note">Ideal for freelancers, designers, and developers looking to make a strong online impression! 🚀</p>
          `,
          links: {
      demo: "https://thomasjeferson.netlify.app ",
      github: "https://github.com/m-saad-1/Thomas-jeferson-Portfolio"
    },
      type: "Frontend",
      complexity: "Small"
    }
  };

  // Modal functionality
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.querySelector('.modal-description');
  const modalLinks = document.querySelector('.project-links');
  const modalGrid = document.querySelector('.modal-grid');
  const closeModalBtn = document.querySelector('.close-modal');

  // Function to show modal
  function showModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Trigger reflow to enable CSS transition
    void modal.offsetWidth;
    modal.classList.add('modal-open');
  }

  // Function to hide modal
  function hideModal() {
    modal.classList.remove('modal-open');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300); // Match this with CSS transition duration
  }

  // Function to open project modal
  function openProjectModal(title) {
    const project = projects[title];
    if (!project) return;
    
    // Set modal title
    modalTitle.textContent = title;
    
    // Clear previous content
    modalDescription.innerHTML = '';
    modalLinks.innerHTML = '';
    modalGrid.innerHTML = '';
    
    // Remove any existing complexity badge to prevent duplication
    const existingBadge = modal.querySelector('.complexity-badge');
    if (existingBadge) {
      existingBadge.remove();
    }
    // Set project description
    if (project.description) {
      modalDescription.innerHTML = project.description;
    } else {
      modalDescription.innerHTML = '<p>Project description not available.</p>';
    }

    // Set project complexity
    if (project.complexity) {
        const complexitySpan = document.createElement('span');
        complexitySpan.className = `complexity-badge complexity-${project.complexity.toLowerCase()}`;
        complexitySpan.textContent = project.complexity;
        modalTitle.after(complexitySpan);
    }
    
    // Set project links
    if (project.links) {
      if (project.links.demo) {
        const demoLink = document.createElement('a');
        demoLink.href = project.links.demo;
        demoLink.className = 'demo-btn';
        demoLink.target = '_blank';
        demoLink.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
        modalLinks.appendChild(demoLink);
      }
      
      if (project.links.github) {
        const githubLink = document.createElement('a');
        githubLink.href = project.links.github;
        githubLink.className = 'github-btn';
        githubLink.target = '_blank';
        githubLink.innerHTML = '<i class="fab fa-github"></i> View Code';
        modalLinks.appendChild(githubLink);
      }
    }
    
    // Set project images
    if (project.images && project.images.length > 0) {
      project.images.forEach((imgSrc, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'modal-image-container skeleton'; 
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = title;
        img.style.cursor = 'zoom-in';
        img.style.opacity = '0'; 

        img.addEventListener('load', () => {
          imgContainer.classList.remove('skeleton');
          img.style.opacity = '1';
        });

        img.onerror = function() {
          imgContainer.classList.remove('skeleton');
          imgContainer.innerHTML = `<p class="image-error">Image not found: ${imgSrc}</p>`;
          console.error('Image failed to load:', imgSrc);
        };
        
        img.addEventListener('click', () => {
          openPhotoSwipe(project.images, index);
        });

        imgContainer.appendChild(img);
        modalGrid.appendChild(imgContainer);
      });
    } else {
      modalGrid.innerHTML = '<p class="image-error">No images available for this project.</p>';
    }
    
    // Show modal
    showModal();
  }

  // Function to initialize and open PhotoSwipe
  async function openPhotoSwipe(imageSources, index) {
    const slides = await Promise.all(imageSources.map(async (src) => {
      // We need to get the image dimensions for PhotoSwipe
      const img = new Image();
      img.src = src;
      await img.decode();
      return {
        src: src,
        width: img.naturalWidth,
        height: img.naturalHeight,
        alt: 'Project image'
      };
    }));

    const lightbox = new PhotoSwipe({
      dataSource: slides,
      pswpModule: PhotoSwipe,
      index: index,
    });

    lightbox.init();
  }

  // Add click events to portfolio items
  portfolioCards.forEach(card => {
    card.addEventListener('click', function() {
      const title = this.querySelector('h3').textContent;
      openProjectModal(title);
    });
  });

  // Close modal when clicking X button
  closeModalBtn.addEventListener('click', function(e) {
    e.preventDefault();
    hideModal();
  });

  // Close modal when clicking outside content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      hideModal();
    }
  });

  // Close modal with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      hideModal();
    }
  });

  // Portfolio filtering and load more functionality
  let visibleCards = 6; 
  
  function filterPortfolio(category) {
    let count = 0;
    
    portfolioCards.forEach(card => {
      card.style.display = 'none';
      
      if (category === 'all' || card.dataset.category === category) {
        if (count < visibleCards) {
          card.style.display = 'block';
          count++;
        }
      }
    });
    
    // Show/hide load more button
    if (loadMoreBtn) {
      if (category === 'all') {
        const totalCards = document.querySelectorAll('.portfolio-card').length;
        loadMoreBtn.style.display = totalCards <= visibleCards ? 'none' : 'block';
      } else {
        loadMoreBtn.style.display = 'none';
      }
    }
  }

  // Load More functionality
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default scroll behavior
      visibleCards += 3;
      filterPortfolio('all');
      
      // Hide button if all cards are visible
      const totalCards = document.querySelectorAll('.portfolio-card').length;
      if (visibleCards >= totalCards) {
        loadMoreBtn.style.display = 'none';
      }
      
      // Scroll to the newly loaded cards
      // const lastVisibleCard = document.querySelector('.portfolio-card[style="display: block;"]:last-child');
      // if (lastVisibleCard) {
      //   lastVisibleCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      // }
    });
  }

  // Initialize filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Reset visible cards when switching filters
      if (this.dataset.filter === 'all') {
        visibleCards = 6;
      }
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Apply filter
      filterPortfolio(this.dataset.filter);
    });
  });

  // Skeleton Loading for Portfolio Images
    const lazyImages = document.querySelectorAll('.lazy-img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (!src) return;

                img.src = src;
                img.addEventListener('load', () => {
                    const skeleton = img.parentElement;
                    skeleton.style.background = 'none';
                    skeleton.classList.remove('skeleton');
                    img.style.opacity = '1';
                });

                observer.unobserve(img);
            }
        });
    }, { rootMargin: "0px 0px 200px 0px" }); // Start loading images 200px before they enter the viewport

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

  // Initialize with 'All' filter
  filterPortfolio('all');

  // Tech Slider Population
  const techSlider = document.querySelector('.tech-slider');
  if (techSlider) {
    const allTechIcons = [];
    for (const serviceName in services) {
      if (services.hasOwnProperty(serviceName)) {
        services[serviceName].technologies.forEach(tech => {
          // Add only if not already present to avoid duplicates
          if (!allTechIcons.some(item => item.name === tech.name)) {
            allTechIcons.push(tech);
          }
        });
      }
    }

    // Duplicate icons to ensure continuous loop effect
    const duplicatedTechIcons = [...allTechIcons, ...allTechIcons];

    duplicatedTechIcons.forEach(tech => {
      let iconElement;
      if (tech.icon.startsWith('images/')) {
        iconElement = document.createElement('img');
        iconElement.src = tech.icon;
        iconElement.alt = tech.name;
        iconElement.classList.add('tech-icon-img'); // Add a class for styling images
      } else {
        iconElement = document.createElement('i');
        iconElement.className = `tech-icon ${tech.icon}`;
      }
      iconElement.title = tech.name;
      techSlider.appendChild(iconElement);
    });
  }
});

function initParticles() {
  if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
          "particles": {
              "number": {
                  "value": 80,
                  "density": {
                      "enable": true,
                      "value_area": 800
                  }
              },
              "color": {
                  "value": "#4361ee"
              },
              "shape": {
                  "type": "circle",
                  "stroke": {
                      "width": 0,
                      "color": "#000000"
                  },
                  "polygon": {
                      "nb_sides": 5
                  }
              },
              "opacity": {
                  "value": 0.5,
                  "random": false,
                  "anim": {
                      "enable": false,
                      "speed": 1,
                      "opacity_min": 0.1,
                      "sync": false
                  }
              },
              "size": {
                  "value": 3,
                  "random": true,
                  "anim": {
                      "enable": false,
                      "speed": 40,
                      "size_min": 0.1,
                      "sync": false
                  }
              },
              "line_linked": {
                  "enable": true,
                  "distance": 150,
                  "color": "#4361ee",
                  "opacity": 0.4,
                  "width": 1
              },
              "move": {
                  "enable": true,
                  "speed": 2,
                  "direction": "none",
                  "random": false,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                  }
              }
          },
          "interactivity": {
              "detect_on": "canvas",
              "events": {
                  "onhover": {
                      "enable": true,
                      "mode": "grab"
                  },
                  "onclick": {
                      "enable": true,
                      "mode": "push"
                  },
                  "resize": true
              },
              "modes": {
                  "grab": {
                      "distance": 140,
                      "line_linked": {
                          "opacity": 1
                      }
                  },
                  "bubble": {
                      "distance": 400,
                      "size": 40,
                      "duration": 2,
                      "opacity": 8,
                      "speed": 3
                  },
                  "repulse": {
                      "distance": 200,
                      "duration": 0.4
                  },
                  "push": {
                      "particles_nb": 4
                  },
                  "remove": {
                      "particles_nb": 2
                  }
              }
          },
          "retina_detect": true
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher for Dark Mode
    const themeToggleInput = document.getElementById('checkbox');
    const body = document.body;

    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            if (themeToggleInput) themeToggleInput.checked = false; // Unchecked for dark mode
        } else {
            body.classList.remove('dark-mode');
            if (themeToggleInput) themeToggleInput.checked = true; // Checked for light mode
        }
    };

    if (themeToggleInput) themeToggleInput.addEventListener('change', () => {
        if (themeToggleInput.checked) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    applyTheme(); // Apply theme on initial load

    // Intersection Observer for Particles.js
    const heroSection = document.getElementById('hero');
    let particlesInitialized = false;

    const particleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!particlesInitialized) {
                    initParticles();
                    particlesInitialized = true;
                }
                if (window.pJSDom && window.pJSDom[0]) {
                    window.pJSDom[0].pJS.fn.particlesStart();
                }
            } else {
                if (window.pJSDom && window.pJSDom[0]) {
                    window.pJSDom[0].pJS.fn.particlesStop();
                }
            }
        });
    }, { threshold: 0.1 });

    if (heroSection) {
        particleObserver.observe(heroSection);
    }
});
