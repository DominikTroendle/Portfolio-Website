export type HeaderData = {
    items: HeaderItems[];
}

export type HeaderItems = {
    fragment: string;
    text: string;
}

export type FooterData = {
    copyright: string;
    role: string;
    location: string;
    links: FooterLinks[];
}

export type FooterLinks = {
    href: string;
    target: string;
    text: string;
}

export type AboutData = {
    eyebrow: string;
    introduction: string;
    title: string;
    details: AboutDetails[];
}

export type AboutDetails = {
    src: string;
    text: string;
}

export type AtfData = {
    email: string;
    github: string;
    headline: string;
    linkedin: string;
    ribbonTracks: string[];
    subheadline: string;
    buttons: AtfButtons[];
}

export type AtfButtons = {
    fragment: string;
    text: string;
}

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
}

export type Mindset = {
    firstLine: string;
    introduction: string;
    secondLine: string;
    src: string;
}

export type GrowthSkill = {
    src: string;
    text: string;
}

export type Skill = {
    label: string;
    src: string;
}