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