export type SocialIcon = 'brand-github' | 'brand-linkedin' | 'brand-instagram' | 'brand-spotify' | 'music';

export interface Social {
  id: string;
  label: string;
  url: string;
  icon: SocialIcon;
}

// Array order is display order everywhere (Contact list, JSON-LD sameAs).
export const socials: Social[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/TeijeKoolenbrander/', icon: 'brand-github' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/teije-koolenbrander-359759263/', icon: 'brand-linkedin' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/tkoolenbrander/', icon: 'brand-instagram' },
  { id: 'spotify', label: 'Spotify', url: 'https://open.spotify.com/user/31iortitby7776a52zxl6zz4lnru', icon: 'brand-spotify' },
  { id: 'netease', label: 'NetEase Cloud Music', url: 'https://music.163.com/#/user/home?id=2139063693', icon: 'music' },
];

export const socialById = (id: string): Social => {
  const s = socials.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown social: ${id}`);
  return s;
};
