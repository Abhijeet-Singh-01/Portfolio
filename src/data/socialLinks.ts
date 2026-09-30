import type { SocialLink } from '../types';

export const siteLinks = {
  email: {
    name: 'Email',
    label: 'Direct contact',
    accessibilityLabel: 'Email Abhijeet Singh',
    url: 'mailto:abhijeetsingh01122006@gmail.com?subject=Hello%20Abhijeet',
    handle: 'abhijeetsingh01122006@gmail.com',
    iconName: 'Mail',
    isPrimary: true,
  },
  github: {
    name: 'GitHub',
    label: 'Code repositories',
    accessibilityLabel: 'GitHub (opens in new tab)',
    url: 'https://github.com/Abhijeet-Singh-01',
    handle: 'github.com/Abhijeet-Singh-01',
    iconName: 'Github',
    isPrimary: true,
    openInNewTab: true,
  },
  linkedin: {
    name: 'LinkedIn',
    label: 'Professional profile',
    accessibilityLabel: 'LinkedIn (opens in new tab)',
    url: 'https://www.linkedin.com/in/abhijeet-singh-988276330/',
    handle: 'linkedin.com/in/abhijeet-singh-988276330',
    iconName: 'Linkedin',
    isPrimary: true,
    openInNewTab: true,
  },
  leetcode: {
    name: 'LeetCode',
    label: 'Problem solving profile',
    accessibilityLabel: 'LeetCode (opens in new tab)',
    url: 'https://leetcode.com/u/1_abhi/',
    handle: 'leetcode.com/u/1_abhi',
    iconName: 'Code2',
    openInNewTab: true,
  },
  resume: {
    name: 'Resume',
    label: 'Download resume (PDF)',
    accessibilityLabel: "Download Abhijeet Singh's resume (PDF)",
    url: '/resume.pdf',
    handle: 'Abhijeet Singh Resume',
    iconName: 'FileText',
    download: 'Abhijeet-Singh-Resume.pdf',
  },
} satisfies Record<string, SocialLink>;

export const socialLinks: SocialLink[] = [
  siteLinks.email,
  siteLinks.github,
  siteLinks.linkedin,
  siteLinks.leetcode,
  siteLinks.resume,
];

export const projectLinks = {
  solisiqSource: 'https://github.com/Abhijeet-Singh-01/SolisIQ',
};

export const sameAsLinks = [siteLinks.github.url, siteLinks.linkedin.url, siteLinks.leetcode.url];
