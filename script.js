// Image Slider Functionality
class ImageSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.slideInterval = null;
        this.slideDuration = 5000; // 5 seconds
        this.nextButton = document.getElementById('sliderNextBtn');
        this.projectIndicator = document.getElementById('projectIndicator');

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // Create indicators for all slides
        this.createIndicators();
        
        // Start auto-slide
        this.startAutoSlide();
        
        // Add click handlers to indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Add next button click handler
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.stopAutoSlide());
            sliderContainer.addEventListener('mouseleave', () => this.startAutoSlide());
        }

        // Add click handlers to project slides
        this.addProjectClickHandlers();

        // Initialize project indicator
        this.updateProjectIndicator();
    }

    addProjectClickHandlers() {
        const projectSlides = document.querySelectorAll('.slide.project-slide');
        projectSlides.forEach((slide) => {
            slide.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectNumber = slide.getAttribute('data-project');
                this.openProject(projectNumber);
            });
        });
    }

    openProject(projectNumber) {
        // Map project indices to URL slugs
        const projectSlugs = {
            0: 'insightful-ux',
            1: 'gw-compare',
            2: 'securita-chatbot',
            3: 'smart-bundleup',
            4: 'what-the-ball-hears'
        };
        
        const projectIndex = parseInt(projectNumber);
        const slug = projectSlugs[projectIndex];
        
        if (slug) {
            // Navigate directly to the project page
            window.location.href = `projects/${slug}.html`;
        }
    }

    createIndicators() {
        const indicatorsContainer = document.querySelector('.slider-indicators');
        if (!indicatorsContainer) return;

        // Clear existing indicators
        indicatorsContainer.innerHTML = '';

        // Create indicators for each slide
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('data-slide', index);
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        this.indicators = document.querySelectorAll('.indicator');
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.remove('active');
        }

        // Set new slide
        this.currentSlide = index;

        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.add('active');
        }

        // Update project indicator
        this.updateProjectIndicator();

        // Restart auto-slide
        this.restartAutoSlide();
    }

    updateProjectIndicator() {
        if (this.projectIndicator) {
            const projectNumber = this.currentSlide + 1;
            this.projectIndicator.textContent = `Selected Project: #${projectNumber}`;
        }
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    startAutoSlide() {
        this.stopAutoSlide(); // Clear any existing interval
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideDuration);
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

// Tab Navigation Functionality
class TabNavigation {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        this.testimonialSlider = null;
        this.init();
    }

    setTestimonialSlider(slider) {
        this.testimonialSlider = slider;
    }

    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });
    }

    switchTab(tabName) {
        // Special handling for Resume tab - open Google Drive link
        if (tabName === 'resume') {
            window.open('https://drive.google.com/file/d/1UHqWd-CmrVfj1IAGsLlAftJlkEl2gLeS/view?usp=drive_link', '_blank');
            return; // Don't switch tabs, just open the link
        }

        // Remove active class from all buttons and panes
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to clicked button and corresponding pane
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        const activePane = document.getElementById(tabName);

        if (activeButton) activeButton.classList.add('active');
        if (activePane) activePane.classList.add('active');

        // Toggle left column view based on active tab
        const sliderContainer = document.getElementById('sliderContainer');
        const singlePhotoContainer = document.getElementById('singlePhotoContainer');
        const testimonialSliderContainer = document.getElementById('testimonialSliderContainer');
        
        if (tabName === 'about') {
            // Show single photo for About page
            if (sliderContainer) sliderContainer.style.display = 'none';
            if (singlePhotoContainer) {
                singlePhotoContainer.style.display = 'flex';
                // Update image to about-photo.jpg for About tab
                const aboutImage = document.getElementById('singlePhotoImage');
                const overlay = document.getElementById('singlePhotoOverlay');
                if (aboutImage) {
                    aboutImage.src = 'images/about-photo.jpg';
                    aboutImage.alt = 'About Photo';
                }
                // Hide overlay on About page
                if (overlay) overlay.style.display = 'none';
            }
            // Hide featured badge on About page
            const featuredBadge = document.getElementById('featuredBadge');
            if (featuredBadge) featuredBadge.style.display = 'none';
            if (testimonialSliderContainer) testimonialSliderContainer.style.display = 'none';
        } else if (tabName === 'testimonials') {
            // Show testimonial slider for Testimonials page
            if (sliderContainer) sliderContainer.style.display = 'none';
            if (singlePhotoContainer) singlePhotoContainer.style.display = 'none';
            const projectsSliderContainer = document.getElementById('projectsSliderContainer');
            if (projectsSliderContainer) projectsSliderContainer.style.display = 'none';
            if (testimonialSliderContainer) testimonialSliderContainer.style.display = 'block';
            // Stop projects slider when switching away
            if (window.projectsSliderInstance) {
                window.projectsSliderInstance.stopAutoSlide();
            }
            // Update testimonial content and restart slider when switching to this tab
            if (this.testimonialSlider) {
                setTimeout(() => {
                    // Re-query elements in case they weren't ready
                    this.testimonialSlider.slides = document.querySelectorAll('.testimonial-slide');
                    this.testimonialSlider.indicators = document.querySelectorAll('#testimonialSliderContainer .indicator');
                    this.testimonialSlider.nextButton = document.getElementById('testimonialSliderNextBtn');
                    this.testimonialSlider.updateTestimonialContent();
                    this.testimonialSlider.startAutoSlide();
                }, 100);
            }
        } else if (tabName === 'projects') {
            // Show projects slider for Projects page
            if (sliderContainer) sliderContainer.style.display = 'none';
            if (singlePhotoContainer) singlePhotoContainer.style.display = 'none';
            const projectsSliderContainer = document.getElementById('projectsSliderContainer');
            if (projectsSliderContainer) {
                projectsSliderContainer.style.display = 'block';
            }
            if (testimonialSliderContainer) testimonialSliderContainer.style.display = 'none';
            // Stop testimonial slider when switching away
            if (this.testimonialSlider) {
                this.testimonialSlider.stopAutoSlide();
            }
            // Stop image slider when on projects page
            const imageSlider = window.imageSliderInstance;
            if (imageSlider) {
                imageSlider.stopAutoSlide();
            }
            // Start projects slider
            if (window.projectsSliderInstance) {
                window.projectsSliderInstance.startAutoSlide();
            }
        } else if (tabName === 'about') {
            // Update image back to about-photo.jpg for About tab
            if (singlePhotoContainer) {
                const aboutImage = singlePhotoContainer.querySelector('img');
                if (aboutImage) {
                    aboutImage.src = 'images/about-photo.jpg';
                    aboutImage.alt = 'About Photo';
                }
            }
            // Stop projects slider when switching away
            if (window.projectsSliderInstance) {
                window.projectsSliderInstance.stopAutoSlide();
            }
        } else {
            // Show regular slider for Home page
            if (sliderContainer) sliderContainer.style.display = 'block';
            if (singlePhotoContainer) singlePhotoContainer.style.display = 'none';
            const projectsSliderContainer = document.getElementById('projectsSliderContainer');
            if (projectsSliderContainer) projectsSliderContainer.style.display = 'none';
            if (testimonialSliderContainer) testimonialSliderContainer.style.display = 'none';
            // Stop testimonial slider when switching away
            if (this.testimonialSlider) {
                this.testimonialSlider.stopAutoSlide();
            }
            // Stop projects slider when switching away
            if (window.projectsSliderInstance) {
                window.projectsSliderInstance.stopAutoSlide();
            }
            // Update project indicator when switching to home tab
            if (tabName === 'home') {
                const imageSlider = window.imageSliderInstance;
                if (imageSlider && imageSlider.updateProjectIndicator) {
                    imageSlider.updateProjectIndicator();
                }
                // Restart slider on home page
                if (imageSlider) {
                    imageSlider.startAutoSlide();
                }
            }
        }

        // Apply custom shape only to home page
        const leftColumn = document.querySelector('.left-column');
        if (leftColumn) {
            if (tabName === 'home') {
                leftColumn.classList.add('home-shape');
            } else {
                leftColumn.classList.remove('home-shape');
            }
        }
    }
}

// Projects Slider Functionality
class ProjectsSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.projects-slide');
        this.indicators = document.querySelectorAll('#projectsSliderContainer .indicator');
        this.slideInterval = null;
        this.slideDuration = 4000; // 4 seconds
        this.isPaused = false;
        this.projectRows = document.querySelectorAll('.project-row');
        this.featuredBadge = document.getElementById('projectsFeaturedBadge');

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // Set initial slide
        this.showSlide(0);

        // Add hover handlers to slides
        this.slides.forEach((slide, index) => {
            slide.addEventListener('mouseenter', () => {
                const projectsTab = document.getElementById('projects');
                if (!projectsTab || !projectsTab.classList.contains('active')) {
                    return;
                }
                this.pauseAutoSlide();
                this.hoverProject(index);
            });

            slide.addEventListener('mouseleave', () => {
                const projectsTab = document.getElementById('projects');
                if (!projectsTab || !projectsTab.classList.contains('active')) {
                    return;
                }
                this.resumeAutoSlide();
            });
        });

        // Add hover handlers to project rows
        this.projectRows.forEach((row, index) => {
            row.addEventListener('mouseenter', () => {
                const projectsTab = document.getElementById('projects');
                if (!projectsTab || !projectsTab.classList.contains('active')) {
                    return;
                }
                this.pauseAutoSlide();
                this.hoverProject(index);
            });

            row.addEventListener('mouseleave', () => {
                const projectsTab = document.getElementById('projects');
                if (!projectsTab || !projectsTab.classList.contains('active')) {
                    return;
                }
                this.resumeAutoSlide();
            });

            // Add click handler to navigate to project page
            row.addEventListener('click', () => {
                this.navigateToProject(index);
            });
        });

        // Add click handlers to project slides
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                this.navigateToProject(index);
            });
        });
    }

    navigateToProject(index) {
        // Map project indices to URL slugs
        const projectSlugs = {
            0: 'insightful-ux',
            1: 'gw-compare',
            2: 'securita-chatbot',
            3: 'smart-bundleup',
            4: 'what-the-ball-hears'
        };
        
        const slug = projectSlugs[index];
        if (slug) {
            window.location.href = `projects/${slug}.html`;
        }
    }

    showSlide(index) {
        if (this.slides.length === 0) return;

        // Remove active class from all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove active class from all indicators
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Add active class to current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
            this.currentSlide = index;

            // Update featured badge
            const isFeatured = this.slides[index].getAttribute('data-project-featured') === 'true';
            if (this.featuredBadge) {
                if (isFeatured) {
                    this.featuredBadge.style.display = 'flex';
                } else {
                    this.featuredBadge.style.display = 'none';
                }
            }
        }

        // Add active class to corresponding indicator and restart animation
        if (this.indicators[index]) {
            const indicator = this.indicators[index];
            // Remove active class to reset animation
            indicator.classList.remove('active', 'paused');
            // Force reflow to ensure the class removal is processed
            requestAnimationFrame(() => {
                // Re-add active class to restart animation
                indicator.classList.add('active');
            });
        }
    }

    nextSlide() {
        if (this.slides.length === 0) return;
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    hoverProject(index) {
        // Show the corresponding slide
        this.showSlide(index);

        // Add hover class to slide for overlay
        if (this.slides[index]) {
            this.slides[index].classList.add('project-hovered');
        }

        // Highlight corresponding table row
        this.projectRows.forEach((row, rowIndex) => {
            if (rowIndex === index) {
                row.style.backgroundColor = '#F5F5F5';
            } else {
                row.style.backgroundColor = '';
            }
        });
    }

    pauseAutoSlide() {
        this.isPaused = true;
        this.stopAutoSlide();
        // Pause the indicator animation
        this.indicators.forEach(indicator => {
            if (indicator.classList.contains('active')) {
                indicator.classList.add('paused');
            }
        });
    }

    resumeAutoSlide() {
        this.isPaused = false;
        // Remove hover classes
        this.slides.forEach(slide => {
            slide.classList.remove('project-hovered');
        });
        // Reset row backgrounds
        this.projectRows.forEach(row => {
            row.style.backgroundColor = '';
        });
        // Resume the indicator animation
        this.indicators.forEach(indicator => {
            if (indicator.classList.contains('active')) {
                indicator.classList.remove('paused');
            }
        });
        this.startAutoSlide();
    }

    startAutoSlide() {
        if (this.isPaused) return;
        this.stopAutoSlide(); // Clear any existing interval
        this.slideInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, this.slideDuration);
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Testimonial Slider Functionality
class TestimonialSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.indicators = document.querySelectorAll('#testimonialSliderContainer .indicator');
        this.slideInterval = null;
        this.slideDuration = 5000; // 5 seconds
        this.nextButton = document.getElementById('testimonialSliderNextBtn');
        this.testimonialData = [
            {
                name: 'Jennifer Fisher',
                role: 'UX Architect - Guidewire Software'
            },
            {
                name: 'Priyanjali Mittal',
                role: 'UX Designer - Guidewire Software'
            },
            {
                name: 'Andrii Khmelkov',
                role: 'Staff Software Engineer - Delos Insurance Solutions'
            }
        ];

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // Add next button click handler
        if (this.nextButton) {
            this.nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.nextSlide();
            });
        }

        // Add click handlers to indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.goToSlide(index);
            });
        });

        // Pause on hover
        const sliderContainer = document.getElementById('testimonialSliderContainer');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.stopAutoSlide());
            sliderContainer.addEventListener('mouseleave', () => {
                // Only restart if testimonials tab is active
                const testimonialsTab = document.getElementById('testimonials');
                if (testimonialsTab && testimonialsTab.classList.contains('active')) {
                    this.startAutoSlide();
                }
            });
        }

        // Start auto-slide only if testimonials tab is active
        const testimonialsTab = document.getElementById('testimonials');
        if (testimonialsTab && testimonialsTab.classList.contains('active')) {
            this.startAutoSlide();
        }
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.remove('active');
        }

        // Set new slide
        this.currentSlide = index;

        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.add('active');
        }

        // Update testimonial content
        this.updateTestimonialContent();

        // Restart auto-slide
        this.restartAutoSlide();
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    previousSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    updateTestimonialContent() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');

        // Update testimonial cards visibility
        testimonialCards.forEach((card, index) => {
            if (index === this.currentSlide) {
                card.style.display = 'flex';
                card.classList.add('active');
            } else {
                card.style.display = 'none';
                card.classList.remove('active');
            }
        });
    }

    startAutoSlide() {
        this.stopAutoSlide();
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideDuration);
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

// Scroll Detection for Auto Tab/Slider Navigation
class ScrollNavigation {
    constructor(tabNavigation, testimonialSlider) {
        this.tabNavigation = tabNavigation;
        this.testimonialSlider = testimonialSlider;
        this.rightColumn = document.querySelector('.right-column');
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.tabOrder = ['home', 'about', 'projects', 'testimonials', 'resume'];
        this.testimonialScrollTimeout = null;
        this.testimonialScrollCooldown = false;
        this.lastScrollTime = 0;
        this.scrollAccumulator = 0;
        
        this.init();
    }

    init() {
        if (!this.rightColumn) return;

        // Handle wheel events (mouse wheel and trackpad) with throttling
        // Only for testimonials tab slider navigation
        this.rightColumn.addEventListener('wheel', (e) => {
            this.handleScroll(e);
        }, { passive: false });
    }

    handleScroll(e) {
        // For testimonials tab, advance slider instead of switching tabs
        const testimonialsTab = document.getElementById('testimonials');
        if (testimonialsTab && testimonialsTab.classList.contains('active')) {
            // Prevent default scroll
            e.preventDefault();
            
            // Throttle testimonial slider navigation
            const now = Date.now();
            const timeSinceLastScroll = now - this.lastScrollTime;
            
            // Only process if enough time has passed (800ms cooldown)
            if (timeSinceLastScroll < 800) {
                return;
            }
            
            // Check if we're in cooldown
            if (this.testimonialScrollCooldown) {
                return;
            }
            
            // Clear any existing timeout
            if (this.testimonialScrollTimeout) {
                clearTimeout(this.testimonialScrollTimeout);
            }
            
            // Accumulate scroll delta
            this.scrollAccumulator += e.deltaY;
            
            // Only trigger if accumulated scroll is significant (more than 50px)
            if (Math.abs(this.scrollAccumulator) > 50) {
                // Set cooldown
                this.testimonialScrollCooldown = true;
                this.lastScrollTime = now;
                
                // Scroll down = next slide, scroll up = previous slide
                if (this.scrollAccumulator > 0) {
                    // Scrolling down - go to next testimonial
                    if (this.testimonialSlider) {
                        this.testimonialSlider.nextSlide();
                    }
                } else {
                    // Scrolling up - go to previous testimonial
                    if (this.testimonialSlider) {
                        this.testimonialSlider.previousSlide();
                    }
                }
                
                // Reset accumulator
                this.scrollAccumulator = 0;
                
                // Reset cooldown after delay
                this.testimonialScrollTimeout = setTimeout(() => {
                    this.testimonialScrollCooldown = false;
                }, 1000); // 1 second cooldown between slider changes
            }
            
            return;
        }

        // For other tabs, allow normal scrolling - no auto tab switching
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const imageSlider = new ImageSlider();
    window.imageSliderInstance = imageSlider; // Store instance globally for tab switching
    const tabNavigation = new TabNavigation();
    
    // Initialize testimonial slider
    const testimonialSlider = new TestimonialSlider();
    tabNavigation.setTestimonialSlider(testimonialSlider);
    
    // Initialize projects slider
    const projectsSlider = new ProjectsSlider();
    window.projectsSliderInstance = projectsSlider; // Store instance globally for tab switching
    
    // Initialize scroll navigation
    new ScrollNavigation(tabNavigation, testimonialSlider);
    
    // Initialize testimonial content on page load if testimonials tab is active
    if (document.getElementById('testimonials')?.classList.contains('active')) {
        testimonialSlider.updateTestimonialContent();
    }
    
    // Ensure initial state shows slider (Home tab is active by default)
    const sliderContainer = document.getElementById('sliderContainer');
    const singlePhotoContainer = document.getElementById('singlePhotoContainer');
    const projectsSliderContainer = document.getElementById('projectsSliderContainer');
    const testimonialSliderContainer = document.getElementById('testimonialSliderContainer');
    if (sliderContainer) sliderContainer.style.display = 'block';
    if (singlePhotoContainer) singlePhotoContainer.style.display = 'none';
    if (projectsSliderContainer) projectsSliderContainer.style.display = 'none';
    if (testimonialSliderContainer) testimonialSliderContainer.style.display = 'none';
    
    // Apply home shape on initial load (home tab is active by default)
    const leftColumn = document.querySelector('.left-column');
    if (leftColumn) {
        leftColumn.classList.add('home-shape');
    }
    
    // Add click handler for "View projects" button
    const viewProjectsBtn = document.getElementById('viewProjectsBtn');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', () => {
            tabNavigation.switchTab('projects');
        });
    }

    // Initialize Design Values Accordion
    function initAccordion() {
        const designValueItems = document.querySelectorAll('.design-value-item');
        designValueItems.forEach((item) => {
            const header = item.querySelector('.value-header');
            if (header) {
                // Remove existing listeners by cloning
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
                
                newHeader.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Close other items
                    designValueItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    // Toggle current item
                    item.classList.toggle('active');
                });
                newHeader.style.cursor = 'pointer';
            }
        });
    }
    
    // Initialize accordion on page load
    initAccordion();
    
    // Re-initialize when About tab is opened
    const aboutTab = document.getElementById('about');
    if (aboutTab) {
        const observer = new MutationObserver(() => {
            if (aboutTab.classList.contains('active')) {
                setTimeout(initAccordion, 100);
            }
        });
        observer.observe(aboutTab, { attributes: true, attributeFilter: ['class'] });
    }

    // Handle hash-based navigation (e.g., index.html#projects)
    function handleHashNavigation() {
        const hash = window.location.hash.substring(1); // Remove the #
        if (hash && ['home', 'projects', 'about', 'testimonials'].includes(hash)) {
            tabNavigation.switchTab(hash);
        }
    }

    // Check hash on page load
    handleHashNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);


});

// Function to add new images to the slider (call this after uploading images)
function addSlideToSlider(imagePath, altText = '') {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (!sliderWrapper) return;

    const slide = document.createElement('div');
    slide.className = 'slide';
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = altText;
    slide.appendChild(img);
    sliderWrapper.appendChild(slide);

    // Reinitialize slider to include new slide
    new ImageSlider();
}

// Export function for external use
window.addSlideToSlider = addSlideToSlider;
