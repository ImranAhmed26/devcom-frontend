export interface JobTag {
  label: string;
  bgColor: string;
  textColor: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  description: string;
  tags: JobTag[];
}

export const JOB_BOARD_DATA = {
  titleBar: {
    title: 'Job Board',
    description: 'Discover jobs shared by your peers and the community.',
  },

  searchBar: {
    placeholder: 'Search jobs...',
    categories: [
      { value: '', label: 'All Categories' },
      { value: 'frontend', label: 'Frontend' },
      { value: 'backend', label: 'Backend' },
      { value: 'fullstack', label: 'Full Stack' },
    ],
    experienceLevels: [
      { value: '', label: 'Experience Level' },
      { value: 'entry', label: 'Entry Level' },
      { value: 'mid', label: 'Mid Level' },
      { value: 'senior', label: 'Senior Level' },
    ],
    programmingLanguages: [
      { value: 'all', label: 'All Languages' },
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'csharp', label: 'C#' },
      { value: 'cpp', label: 'C++' },
      { value: 'ruby', label: 'Ruby' },
      { value: 'php', label: 'PHP' },
      { value: 'swift', label: 'Swift' },
      { value: 'kotlin', label: 'Kotlin' },
      { value: 'go', label: 'Go' },
    ],
  },

  buttons: {
    apply: {
      label: 'Apply',
      className:
        'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors',
    },
    save: {
      label: 'Save',
      className:
        'text-blue-600 hover:text-blue-700 font-semibold py-2 px-6 rounded-lg border border-blue-600 hover:border-blue-700 transition-colors',
    },
  },
};
