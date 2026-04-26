export type OverlayTechnology = {
  src: string;
  text: string;
}

export type OverlayProject = {
  github: string;
  previewSrc: string;
  text: string;
  title: string;
  url: string;
  technologies: OverlayTechnology[];
}