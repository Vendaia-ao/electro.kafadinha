// Centralized image map - all static image imports
// Hero images
import heroEngineer from '@/assets/hero/engineer.jpg';
import heroInstallation from '@/assets/hero/installation.jpg';

// About images
import aboutTeam from '@/assets/about/team.jpg';

// Service images
import commercialTransformer from '@/assets/services/commercial-transformer.jpg';
import commercialDistribution from '@/assets/services/commercial-distributio.jpg';
import commercialEnergyManagement from '@/assets/services/commercial-energy-management.jpg';
import residentialElectrical from '@/assets/services/residential-electrical.jpg';
import residentialWater from '@/assets/services/residential-water.jpg';
import residentialMaintenance from '@/assets/services/residential-maintenance.jpg';
import industrialHighVoltage from '@/assets/services/industrial-high-voltage.jpg';
import industrialAutomation from '@/assets/services/industrial-automation.jpg';
import industrialBackup from '@/assets/services/industrial-backup.jpg';

// Project images
import projectTalatona from '@/assets/projects/commercial-talatona.jpg';
import projectShopping from '@/assets/projects/commercial-shopping.jpg';
import projectCondominium from '@/assets/projects/residential-condominium.jpg';
import projectBenfica from '@/assets/projects/residential-benfica.jpg';
import projectFactory from '@/assets/projects/industrial-factory.jpg';
import projectIndustrialPark from '@/assets/projects/industrial-park.jpg';

// Blog images
import blogTechnology from '@/assets/blog/technology.jpg';
import blogPartnership from '@/assets/blog/partnership.jpg';
import blogMaintenance from '@/assets/blog/maintenance.jpg';

// Logo
import logo from '@/assets/logo.png';

// Image map organized by category
export const images = {
  logo,
  hero: {
    engineer: heroEngineer,
    installation: heroInstallation,
  },
  about: {
    team: aboutTeam,
  },
  services: {
    'commercial-transformer': commercialTransformer,
    'commercial-distribution': commercialDistribution,
    'commercial-energy-management': commercialEnergyManagement,
    'residential-electrical': residentialElectrical,
    'residential-water': residentialWater,
    'residential-maintenance': residentialMaintenance,
    'industrial-high-voltage': industrialHighVoltage,
    'industrial-automation': industrialAutomation,
    'industrial-backup': industrialBackup,
  },
  projects: {
    'commercial-talatona': projectTalatona,
    'commercial-shopping': projectShopping,
    'residential-condominium': projectCondominium,
    'residential-benfica': projectBenfica,
    'industrial-factory': projectFactory,
    'industrial-park': projectIndustrialPark,
  },
  blog: {
    technology: blogTechnology,
    partnership: blogPartnership,
    maintenance: blogMaintenance,
  },
} as const;

// Type for image keys
export type ImageCategory = keyof typeof images;

/**
 * Get image URL by key reference (e.g., "services/commercial-transformer")
 * Also supports external URLs (http/https) and base64 data URLs
 */
export function getImage(key: string): string {
  // If it's already a URL or base64, return as-is
  if (key.startsWith('http') || key.startsWith('data:') || key.startsWith('/')) {
    return key;
  }

  // Parse the key format: "category/name"
  const parts = key.split('/');
  
  if (parts.length === 2) {
    const [category, name] = parts;
    const categoryImages = images[category as keyof typeof images];
    
    if (categoryImages && typeof categoryImages === 'object' && name in categoryImages) {
      return (categoryImages as Record<string, string>)[name];
    }
  }

  // Try to find in flat keys (for backward compatibility)
  for (const category of Object.keys(images)) {
    const categoryImages = images[category as keyof typeof images];
    if (typeof categoryImages === 'object' && key in categoryImages) {
      return (categoryImages as Record<string, string>)[key];
    }
  }

  // Return empty string if not found
  console.warn(`Image not found for key: ${key}`);
  return '';
}

// Export individual categories for direct access
export const heroImages = images.hero;
export const aboutImages = images.about;
export const serviceImages = images.services;
export const projectImages = images.projects;
export const blogImages = images.blog;
