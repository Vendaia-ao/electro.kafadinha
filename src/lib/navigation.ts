export const navigateToSection = (sectionId: string) => {
  // Check if we're on the home page
  if (window.location.pathname === '/') {
    // We're on home, just scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    // We're on another page, navigate to home with hash
    window.location.href = `/#${sectionId}`;
  }
};

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
