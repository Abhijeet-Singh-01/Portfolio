import type { SocialLink } from '../types';

export const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    label: 'Direct Contact',
    url: 'mailto:abhijeetsingh.dev.eng@gmail.com',
    handle: 'abhijeetsingh.dev.eng@gmail.com',
    iconName: 'Mail',
    isPrimary: true,
  },
  {
    name: 'GitHub',
    label: 'Code Repositories & OSS',
    url: 'https://github.com/abhijeetsingh',
    handle: 'github.com/abhijeetsingh',
    iconName: 'Github',
    isPrimary: true,
  },
  {
    name: 'LinkedIn',
    label: 'Professional Network',
    url: 'https://linkedin.com/in/abhijeetsingh',
    handle: 'linkedin.com/in/abhijeetsingh',
    iconName: 'Linkedin',
    isPrimary: true,
  },
  {
    name: 'LeetCode',
    label: 'Problem Solving & DSA',
    url: 'https://leetcode.com/abhijeetsingh',
    handle: 'leetcode.com/abhijeetsingh',
    iconName: 'Code2',
    isPrimary: false,
  },
];
