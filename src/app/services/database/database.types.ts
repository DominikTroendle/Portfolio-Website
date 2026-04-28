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

export type ContactData = {
  email: string;
  emailError: string;
  eyebrow: string;
  introduction: string;
  lengthError: string;
  message: string;
  privacyAfter: string;
  privacyBefore: string;
  privacyError: string;
  privacyHighlighted: string;
  prompt: string;
  promptHighlighted: string;
  requiredError: string;
  subheadline: string;
  submit: string;
  title: string;
  form: ContactFormField[];
}

export type ContactFormField = {
  id: string;
  placeholder: string;
  placeholderError: string;
  text: string;
  type: 'text' | 'email';
}

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

export type LegalInline =
  | LegalInlineText
  | LegalInlineLink
  | LegalInlineSpan;

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

export type PrivacyData = {
    title: string;
    sections: PrivacySection[];
}

export type PrivacySection = {
    content: PrivacyBlock[];
}

export type PrivacyBlock = 
  | PrivacyHeadlineBlock
  | PrivacySubheadlineBlock
  | PrivacyTitleBlock
  | PrivacyListBlock
  | PrivacyParagraphBlock;

export type PrivacyHeadlineBlock = {
    type: 'headline';
    text: string;
}

export type PrivacySubheadlineBlock = {
    type: 'subheadline';
    text: string;
}

export type PrivacyTitleBlock = {
    type: 'title';
    text: string;
}

export type PrivacyListBlock = {
    type: 'list';
    items: string[];
}

export type PrivacyParagraphBlock = {
    type: 'paragraph';
    inlines: PrivacyInline[];
}

export type PrivacyInline =
  | PrivacyInlineText
  | PrivacyInlineLink
  | PrivacyInlineSpan;

  export type PrivacyInlineText = {
    type: 'text';
    value: string;
  }

  export type PrivacyInlineLink = {
    type: 'link';
    value: string;
    href: string;
  }

  export type PrivacyInlineSpan = {
    type: 'span';
    value: string;
  }