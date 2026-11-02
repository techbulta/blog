// Site-wide settings: links, author details and the YouTube band videos.
export const site = {
  name: 'Bulta',
  url: 'https://bulta.lk',
  description: 'Practical guides on development, DevOps and AI.',
  author: {
    name: 'Sandaruwan',
    initial: 'S',
    bio: 'Associate Technical Lead working with Java, Spring Boot, Kubernetes and GCP. Creator of Bulta and the @techbulta YouTube channel.',
  },
  links: {
    youtube: 'https://www.youtube.com/@techbulta',
    facebook: 'https://www.facebook.com/profile.php?id=100068528005352',
    // TODO: confirm the LinkedIn profile URL.
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/techbulta',
    rss: '/rss.xml',
  },
  // TODO: replace with two real @techbulta video IDs (the part after "watch?v=").
  videos: [
    { id: '', title: 'Latest video' },
    { id: '', title: 'Popular video' },
  ],
  // Form endpoint for the newsletter. Set REACT_APP_NEWSLETTER_ENDPOINT in .env.
  newsletterEndpoint: process.env.REACT_APP_NEWSLETTER_ENDPOINT || '',
};
