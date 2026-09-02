export type FAQCategoryId = 'general' | 'stacks' | 'database' | 'tooling' | 'devops' | 'config';

export interface FAQItem {
  id: string;
  category: FAQCategoryId;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: FAQCategoryId;
  label: string;
}
