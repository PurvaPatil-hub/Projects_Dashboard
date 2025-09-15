// DOM Elements
const projectItems = document.querySelectorAll(".project-item");
const welcomeScreen = document.getElementById("welcome");
const projectContent = document.getElementById("project-content");
const projectFrame = document.getElementById("project-frame");
const projectTitle = document.getElementById("project-title");
const externalLink = document.getElementById("external-link");

// Mobile menu elements
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileOverlay = document.getElementById("mobileOverlay");
const sidebar = document.getElementById("sidebar");

// Mobile menu functionality
function toggleMobileMenu() {
  const isOpen = sidebar.classList.contains("open");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  sidebar.classList.add("open");
  mobileOverlay.classList.add("active");
  mobileMenuToggle.innerHTML = "✕";
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  sidebar.classList.remove("open");
  mobileOverlay.classList.remove("active");
  mobileMenuToggle.innerHTML = "☰";
  document.body.style.overflow = "";
}

// Event listeners for mobile menu
mobileMenuToggle.addEventListener("click", toggleMobileMenu);
mobileOverlay.addEventListener("click", closeMobileMenu);

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar.classList.contains("open")) {
    closeMobileMenu();
  }
});

// Project navigation functionality
projectItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active class from all items
    projectItems.forEach((i) => i.classList.remove("active"));

    // Add active class to clicked item
    item.classList.add("active");

    // Get project data
    const url = item.dataset.url;
    const title = item.dataset.title;

    // Update content
    projectTitle.textContent = title;
    externalLink.href = url;
    projectFrame.src = url;

    // Show project content and hide welcome
    welcomeScreen.style.display = "none";
    projectContent.style.display = "block";

    // Close mobile menu if open
    if (window.innerWidth <= 768) {
      closeMobileMenu();
    }

    // Add smooth loading effect
    projectFrame.style.opacity = "0";
    projectFrame.onload = () => {
      setTimeout(() => {
        projectFrame.style.transition = "opacity 0.3s ease";
        projectFrame.style.opacity = "1";
      }, 100);
    };
  });
});

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
    document.body.style.overflow = "";
  }
});

// Initial load animations
document.addEventListener("DOMContentLoaded", () => {
  // Animate welcome screen elements
  const welcomeElements = document.querySelectorAll(".welcome-screen > *");
  welcomeElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 200);
  });

  // Animate sidebar items
  const sidebarItems = document.querySelectorAll(".project-item");
  sidebarItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    setTimeout(() => {
      item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, (index + 1) * 150);
  });
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = "smooth";

// Prevent iframe from stealing focus on mobile
projectFrame.addEventListener("load", () => {
  if (window.innerWidth <= 768) {
    projectFrame.blur();
  }
});
