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