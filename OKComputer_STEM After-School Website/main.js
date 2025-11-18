// STEM Academy Website JavaScript
// Main functionality for interactive components

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollReveal();
    initializeParticleBackground();
    initializeTestimonialSlider();
    initializeBenefitsChart();
    initializeProgramTabs();
    initializeRegistrationForm();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll reveal animation
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Particle background animation for hero section
function initializeParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    createParticles();
    animateParticles();
    
    window.addEventListener('resize', function() {
        resizeCanvas();
        createParticles();
    });
}

// Testimonial slider
function initializeTestimonialSlider() {
    const slider = document.getElementById('testimonials-slider');
    if (!slider) return;
    
    new Splide(slider, {
        type: 'loop',
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        arrows: false,
        pagination: true,
        gap: '2rem',
        breakpoints: {
            768: {
                gap: '1rem'
            }
        }
    }).mount();
}

// Benefits chart
function initializeBenefitsChart() {
    const chartContainer = document.getElementById('benefits-chart');
    if (!chartContainer) return;
    
    const chart = echarts.init(chartContainer);
    
    const option = {
        title: {
            text: 'STEM Education Impact by Subject',
            left: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: ['Engineering', 'Technology', 'Science', 'Mathematics'],
            axisLabel: {
                fontSize: 12
            }
        },
        yAxis: {
            type: 'value',
            name: 'Effect Size',
            axisLabel: {
                fontSize: 12
            }
        },
        series: [{
            data: [0.73, 0.52, 0.46, 0.35],
            type: 'bar',
            itemStyle: {
                color: function(params) {
                    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];
                    return colors[params.dataIndex];
                }
            },
            label: {
                show: true,
                position: 'top',
                formatter: '{c}',
                fontSize: 12,
                fontWeight: 'bold'
            }
        }],
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%',
            top: '20%'
        }
    };
    
    chart.setOption(option);
    
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Program tabs functionality
function initializeProgramTabs() {
    const tabs = document.querySelectorAll('.program-tab');
    const contents = document.querySelectorAll('.program-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetLevel = this.getAttribute('data-level');
            
            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('active');
                t.classList.add('bg-gray-100', 'text-gray-700');
            });
            this.classList.add('active');
            this.classList.remove('bg-gray-100', 'text-gray-700');
            
            // Show corresponding content
            contents.forEach(content => {
                content.classList.add('hidden');
            });
            
            const targetContent = document.getElementById(targetLevel + '-program');
            if (targetContent) {
                targetContent.classList.remove('hidden');
                
                // Animate content appearance
                anime({
                    targets: targetContent,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            }
        });
    });
}

// Registration form functionality
function initializeRegistrationForm() {
    const form = document.getElementById('registration-form');
    if (!form) return;
    
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const progressBar = document.getElementById('progress-bar');
    const currentStepSpan = document.getElementById('current-step');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    let currentStep = 1;
    const totalSteps = steps.length;
    
    // Grade level change handler
    const gradeLevelSelect = document.getElementById('grade-level');
    if (gradeLevelSelect) {
        gradeLevelSelect.addEventListener('change', updateProgramOptions);
    }
    
    function updateProgramOptions() {
        const gradeLevel = gradeLevelSelect.value;
        const programOptions = document.getElementById('program-options');
        const courseSelection = document.getElementById('course-selection');
        
        if (!gradeLevel || !programOptions) return;
        
        let programs = [];
        let level = '';
        
        if (['K', '1', '2', '3', '4', '5', '6'].includes(gradeLevel)) {
            level = 'elementary';
            programs = [
                { name: 'Science Discovery', price: 150, icon: '🔬' },
                { name: 'Mathematical Thinking', price: 150, icon: '📊' },
                { name: 'Technology Basics', price: 180, icon: '💻' }
            ];
        } else if (['7', '8', '9'].includes(gradeLevel)) {
            level = 'junior';
            programs = [
                { name: 'Advanced Science', price: 200, icon: '⚛️' },
                { name: 'Engineering & Robotics', price: 220, icon: '🤖' },
                { name: 'Data Science', price: 190, icon: '📈' }
            ];
        } else if (['10', '11', '12'].includes(gradeLevel)) {
            level = 'senior';
            programs = [
                { name: 'Advanced Science', price: 250, icon: '🧬' },
                { name: 'Computer Science', price: 280, icon: '💻' },
                { name: 'Engineering Design', price: 270, icon: '🚀' }
            ];
        }
        
        // Update program options
        programOptions.innerHTML = programs.map(program => `
            <div class="course-card border-2 border-gray-200 rounded-xl p-6" data-program="${program.name}" data-price="${program.price}">
                <div class="text-center">
                    <div class="text-4xl mb-4">${program.icon}</div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">${program.name}</h3>
                    <p class="text-blue-600 font-semibold mb-4">$${program.price}/month</p>
                    <div class="text-sm text-gray-600">
                        Click to select this program
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers to program cards
        document.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', function() {
                document.querySelectorAll('.course-card').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                
                // Show course selection
                courseSelection.classList.remove('hidden');
                updateCourseOptions(this.getAttribute('data-program'), level);
                updateSummary();
            });
        });
        
        updateScheduleOptions(level);
    }
    
    function updateCourseOptions(programName, level) {
        const courseOptions = document.getElementById('course-options');
        let courses = [];
        
        if (level === 'elementary') {
            courses = [
                { name: 'Hands-on Experiments', price: 50 },
                { name: 'Basic Programming', price: 60 },
                { name: 'Math Games & Puzzles', price: 45 },
                { name: 'Nature Studies', price: 40 }
            ];
        } else if (level === 'junior') {
            courses = [
                { name: 'Laboratory Skills', price: 70 },
                { name: 'Robotics Programming', price: 80 },
                { name: 'Data Analysis', price: 65 },
                { name: 'Engineering Projects', price: 75 }
            ];
        } else if (level === 'senior') {
            courses = [
                { name: 'AP Exam Prep', price: 90 },
                { name: 'Research Methods', price: 85 },
                { name: 'Advanced Programming', price: 95 },
                { name: 'Capstone Project', price: 100 }
            ];
        }
        
        courseOptions.innerHTML = courses.map(course => `
            <div class="course-card border border-gray-200 rounded-lg p-4" data-course="${course.name}" data-price="${course.price}">
                <div class="flex items-center justify-between">
                    <span class="font-medium">${course.name}</span>
                    <span class="text-blue-600 font-semibold">+$${course.price}</span>
                </div>
            </div>
        `).join('');
        
        // Add click handlers to course cards
        document.querySelectorAll('#course-options .course-card').forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('selected');
                updateSummary();
            });
        });
    }
    
    function updateScheduleOptions(level) {
        const scheduleOptions = document.getElementById('schedule-options');
        let schedules = [];
        
        if (level === 'elementary') {
            schedules = [
                'Monday 4:00-6:00 PM',
                'Wednesday 4:00-6:00 PM',
                'Saturday 10:00 AM-12:00 PM',
                'Saturday 2:00-4:00 PM'
            ];
        } else if (level === 'junior') {
            schedules = [
                'Tuesday 4:30-7:30 PM',
                'Thursday 4:30-7:30 PM',
                'Saturday 10:00 AM-1:00 PM',
                'Sunday 1:00-4:00 PM'
            ];
        } else if (level === 'senior') {
            schedules = [
                'Monday 6:00-10:00 PM',
                'Wednesday 6:00-10:00 PM',
                'Saturday 2:00-6:00 PM',
                'Sunday 9:00 AM-1:00 PM'
            ];
        }
        
        scheduleOptions.innerHTML = schedules.map(schedule => `
            <div class="schedule-slot border border-gray-200 rounded-lg p-4" data-schedule="${schedule}">
                <div class="flex items-center justify-between">
                    <span class="font-medium">${schedule}</span>
                    <span class="text-gray-500">${level === 'elementary' ? '2 hours' : level === 'junior' ? '3 hours' : '4 hours'}</span>
                </div>
            </div>
        `).join('');
        
        // Add click handlers to schedule slots
        document.querySelectorAll('.schedule-slot').forEach(slot => {
            slot.addEventListener('click', function() {
                document.querySelectorAll('.schedule-slot').forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
                updateSummary();
            });
        });
    }
    
    function updateSummary() {
        const firstName = document.getElementById('first-name').value || 'Student';
        const lastName = document.getElementById('last-name').value || 'Name';
        const selectedProgram = document.querySelector('.course-card.selected');
        const selectedCourses = document.querySelectorAll('#course-selection .course-card.selected');
        const selectedSchedule = document.querySelector('.schedule-slot.selected');
        
        document.getElementById('summary-student').textContent = `${firstName} ${lastName}`;
        
        if (selectedProgram) {
            document.getElementById('summary-program').textContent = selectedProgram.getAttribute('data-program');
        }
        
        if (selectedCourses.length > 0) {
            const courseNames = Array.from(selectedCourses).map(c => c.getAttribute('data-course'));
            document.getElementById('summary-courses').textContent = courseNames.join(', ');
        }
        
        if (selectedSchedule) {
            document.getElementById('summary-schedule').textContent = selectedSchedule.getAttribute('data-schedule');
        }
        
        // Calculate total
        let total = 0;
        if (selectedProgram) {
            total += parseInt(selectedProgram.getAttribute('data-price'));
        }
        selectedCourses.forEach(course => {
            total += parseInt(course.getAttribute('data-price'));
        });
        
        document.getElementById('summary-total').textContent = `$${total}`;
    }
    
    function showStep(step) {
        // Hide all steps
        steps.forEach(s => {
            s.classList.remove('active');
        });
        
        // Show current step
        const currentStepElement = document.querySelector(`[data-step="${step}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        // Update step indicators
        stepIndicators.forEach((indicator, index) => {
            const stepNum = index + 1;
            indicator.classList.remove('active', 'completed');
            
            if (stepNum === step) {
                indicator.classList.add('active');
            } else if (stepNum < step) {
                indicator.classList.add('completed');
            }
        });
        
        // Update progress bar
        const progress = (step / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
        currentStepSpan.textContent = step;
        
        // Update navigation buttons
        prevBtn.classList.toggle('hidden', step === 1);
        nextBtn.classList.toggle('hidden', step === totalSteps);
        submitBtn.classList.toggle('hidden', step !== totalSteps);
        
        // Update button text
        if (step === totalSteps) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
        
        currentStep = step;
    }
    
    // Navigation button handlers
    nextBtn.addEventListener('click', function() {
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
        }
    });
    
    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const termsAgreement = document.getElementById('terms-agreement');
        if (!termsAgreement.checked) {
            alert('Please agree to the Terms and Conditions to continue.');
            return;
        }
        
        // Show success modal
        const successModal = document.getElementById('success-modal');
        successModal.classList.remove('hidden');
        
        // Reset form after successful submission
        setTimeout(() => {
            form.reset();
            showStep(1);
        }, 3000);
    });
    
    // Close modal handler
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('success-modal').classList.add('hidden');
        });
    }
    
    // Initialize form
    showStep(1);
}

// Initialize animations
function initializeAnimations() {
    // Animate statistics on scroll
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const number = card.querySelector('.text-2xl');
                    if (number) {
                        animateNumber(number);
                    }
                }
            });
        });
        
        statCards.forEach(card => observer.observe(card));
    }
}

// Animate numbers
function animateNumber(element) {
    const finalNumber = element.textContent;
    const isPercentage = finalNumber.includes('%');
    const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
    
    let currentNumber = 0;
    const increment = numericValue / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        
        element.textContent = isPercentage ? 
            Math.floor(currentNumber) + '%' : 
            Math.floor(currentNumber) + (finalNumber.includes('+') ? '+' : '');
    }, 30);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Reinitialize components that need resize handling
    const chart = echarts.getInstanceByDom(document.getElementById('benefits-chart'));
    if (chart) {
        chart.resize();
    }
}, 250));