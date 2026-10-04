export interface ProfileSection {
  readonly id: string;
  readonly index: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly description: string;
}

export const profileContent = {
  name: 'Jarrod Zywien',
  givenName: 'Jarrod',
  familyName: 'Zywien',
  summary: 'A personal résumé, experience record, and selected-work index.',
  draftNote: 'Profile content is in progress.',
  sections: [
    {
      id: 'about',
      index: '01',
      eyebrow: 'Introduction',
      heading: 'About',
      description: 'A professional introduction has not been added yet.',
    },
    {
      id: 'experience',
      index: '02',
      eyebrow: 'Career',
      heading: 'Experience',
      description: 'Experience details will appear here.',
    },
    {
      id: 'skills',
      index: '03',
      eyebrow: 'Practice',
      heading: 'Skills',
      description: 'Skills and areas of expertise will appear here.',
    },
    {
      id: 'education',
      index: '04',
      eyebrow: 'Study',
      heading: 'Education',
      description: 'Education and training details will appear here.',
    },
    {
      id: 'work',
      index: '05',
      eyebrow: 'Selected work',
      heading: 'Projects & writing',
      description: 'Selected projects and writing will appear here.',
    },
    {
      id: 'contact',
      index: '06',
      eyebrow: 'Correspondence',
      heading: 'Contact',
      description: 'Public contact details will appear here.',
    },
  ] satisfies readonly ProfileSection[],
} as const;
