const base = import.meta.env.BASE_URL;

export const site = {
  name: 'Marcelino Jorgi',
  role: 'Creative Technologist',
  tagline: 'Building digital experiences where systems meet design.',
  email: 'marcelinojrg@gmail.com',
  nav: [
    { label: 'Work', href: `${base}#work` },
    { label: 'About', href: `${base}#about` },
    { label: 'Experience', href: `${base}#experience` },
    { label: 'Contact', href: `${base}#contact` },
  ],
  socials: [
    { label: 'GitHub', href: '[REPLACE: https://github.com/yourhandle]' },
    {
      label: 'LinkedIn',
      href: '[REPLACE: https://www.linkedin.com/in/yourhandle]',
    },
    {
      label: 'Instagram',
      href: '[REPLACE: https://www.instagram.com/yourhandle]',
    },
  ],
} as const;
