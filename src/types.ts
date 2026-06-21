/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  pricingRange: string;
  estimatedTime: string;
  seoTitle: string;
  seoDescription: string;
  faqs: FAQItem[];
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Neighborhood {
  name: string;
  slug: string;
  isOfficial: boolean;
  region: string;
  customHeading?: string;
  customText?: string;
}

export interface SurroundingCity {
  name: string;
  slug: string;
  distanceKm: number;
}

export interface BlogPost {
  title: string;
  slug: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  content: string; // Markdown or simple blocks
  tags: string[];
  imageUrl?: string;
}

export interface RepairCase {
  id: string;
  title: string;
  hardware: string;
  symptom: string;
  solution: string;
  imageUrlBefore: string;
  imageUrlAfter: string;
  notes: string;
}
