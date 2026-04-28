// Shared
export type HeaderData = {
  items: HeaderItem[];
};

export type HeaderItem = {
  fragment: string;
  text: string;
};

export type FooterData = {
  copyright: string;
  role: string;
  location: string;
  links: FooterLink[];
};

export type FooterLink = {
  href: string;
  target: string;
  text: string;
};

// Main content
export type AboutData = {
  eyebrow: string;
  introduction: string;
  title: string;
  details: AboutDetail[];
};

export type AboutDetail = {
  src: string;
  text: string;
};

export type AtfData = {
  email: string;
  github: string;
  headline: string;
  linkedin: string;
  ribbonTracks: string[];
  subheadline: string;
  buttons: AtfButton[];
};

export type AtfButton = {
  fragment: string;
  text: string;
};

export type SkillsData = {
  contact: string;
  contactButton: string;
  eyebrow: string;
  introduction: string;
  subheadlineBefore: string;
  subheadlineHighlighted: string;
  title: string;
  growthMindset: Mindset;
  growthSkills: GrowthSkill[];
  skills: Skill[];
};

export type Mindset = {
  firstLine: string;
  introduction: string;
  secondLine: string;
  src: string;
};

export type GrowthSkill = {
  src: string;
  text: string;
};

export type Skill = {
  label: string;
  src: string;
};

// Legal / Privacy
export type LegalData = {
  title: string;
  sections: LegalSection[];
};

export type LegalSection = {
  content: LegalBlock[];
};

export type LegalBlock =
  | LegalHeadlineblock
  | LegalListBlock
  | LegalParagraphBlock;

export type LegalHeadlineblock = {
  type: 'headline';
  text: string;
};

export type LegalListBlock = {
  type: 'list';
  items: string[];
};

export type LegalParagraphBlock = {
  type: 'paragraph';
  inlines: LegalInline[];
};

export type LegalInline = LegalInlineText | LegalInlineLink | LegalInlineSpan;

export type LegalInlineText = {
  type: 'text';
  value: string;
};

export type LegalInlineLink = {
  type: 'link';
  value: string;
  href: string;
};

export type LegalInlineSpan = {
  type: 'span';
  value: string;
};
