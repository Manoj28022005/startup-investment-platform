import { JsonSchema } from '@jsonforms/core';

const linkedinPattern = '^https:\\/\\/(?:www\\.)?linkedin\\.com\\/in\\/[a-zA-Z0-9-]{5,100}\\/?$';
const companyLinkedinPattern = '^https:\\/\\/(?:www\\.)?linkedin\\.com\\/company\\/[a-zA-Z0-9-]{3,100}\\/?$';
const namePattern = '^[A-Z][a-z]{1,49}(?: [A-Z][a-z]{1,49})*$';
const emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

export const teamInformationSchema: JsonSchema = {
  type: 'object',
  title: 'Team Information',
  description: 'Tell us about your team and key members',
  properties: {
    teamSize: {
      type: 'integer',
      minimum: 1,
      maximum: 1000,
      title: 'Team Size',
      description: 'Total number of team members',
      errorMessage: {
        type: 'Team size must be a whole number',
        minimum: 'Team must have at least 1 member',
        maximum: 'Team size cannot exceed 1000'
      }
    },
    founders: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            pattern: namePattern,
            minLength: 3,
            maxLength: 100,
            title: 'Full Name',
            description: 'Founder\'s full name (First Last)',
            errorMessage: {
              pattern: 'Please enter a valid name (e.g., John Smith)',
              minLength: 'Name must be at least 3 characters long',
              maxLength: 'Name cannot exceed 100 characters'
            }
          },
          role: {
            type: 'string',
            enum: ['CEO', 'CTO', 'CFO', 'COO', 'CMO', 'Other'],
            title: 'Role',
            description: 'Founder\'s role in the company',
            errorMessage: 'Please select a valid role'
          },
          email: {
            type: 'string',
            pattern: emailPattern,
            title: 'Email',
            description: 'Professional email address',
            errorMessage: {
              pattern: 'Please enter a valid email address'
            }
          },
          linkedin: {
            type: 'string',
            pattern: linkedinPattern,
            title: 'LinkedIn Profile',
            description: 'Personal LinkedIn profile URL (https://linkedin.com/in/username)',
            errorMessage: {
              pattern: 'Please enter a valid LinkedIn profile URL starting with https://linkedin.com/in/ (e.g., https://linkedin.com/in/johnsmith)'
            }
          },
          experience: {
            type: 'integer',
            minimum: 0,
            maximum: 50,
            title: 'Years of Experience',
            description: 'Years of relevant industry experience',
            errorMessage: {
              type: 'Experience must be a whole number',
              minimum: 'Experience cannot be negative',
              maximum: 'Experience cannot exceed 50 years'
            }
          },
          expertise: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'Technology',
                'Sales',
                'Marketing',
                'Finance',
                'Operations',
                'Product',
                'Design',
                'Research',
                'Other'
              ]
            },
            minItems: 1,
            maxItems: 5,
            uniqueItems: true,
            title: 'Areas of Expertise',
            description: 'Key areas of expertise (no duplicates)',
            errorMessage: {
              minItems: 'Please specify at least one area of expertise',
              maxItems: 'Cannot exceed 5 areas of expertise',
              uniqueItems: 'Each expertise must be unique'
            }
          }
        },
        required: ['name', 'role', 'email', 'linkedin', 'experience', 'expertise'],
        errorMessage: {
          required: {
            name: 'Founder\'s name is required',
            role: 'Founder\'s role is required',
            email: 'Email is required',
            linkedin: 'LinkedIn profile is required',
            experience: 'Years of experience is required',
            expertise: 'Areas of expertise are required'
          }
        }
      },
      minItems: 1,
      maxItems: 10,
      title: 'Founders',
      description: 'List of company founders',
      errorMessage: {
        minItems: 'Please add at least one founder',
        maxItems: 'Cannot exceed 10 founders'
      }
    },
    keyHires: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            pattern: namePattern,
            minLength: 3,
            maxLength: 100,
            title: 'Full Name',
            description: 'Team member\'s full name (First Last)',
            errorMessage: {
              pattern: 'Please enter a valid name (e.g., John Smith)',
              minLength: 'Name must be at least 3 characters long',
              maxLength: 'Name cannot exceed 100 characters'
            }
          },
          position: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            title: 'Position',
            description: 'Current position in the company',
            errorMessage: {
              minLength: 'Position must be at least 2 characters long',
              maxLength: 'Position cannot exceed 50 characters'
            }
          },
          department: {
            type: 'string',
            enum: [
              'Engineering',
              'Product',
              'Design',
              'Marketing',
              'Sales',
              'Finance',
              'Operations',
              'HR',
              'Other'
            ],
            title: 'Department',
            description: 'Team member\'s department',
            errorMessage: 'Please select a valid department'
          },
          email: {
            type: 'string',
            pattern: emailPattern,
            title: 'Email',
            description: 'Professional email address',
            errorMessage: {
              pattern: 'Please enter a valid email address'
            }
          },
          linkedin: {
            type: 'string',
            pattern: linkedinPattern,
            title: 'LinkedIn Profile',
            description: 'LinkedIn profile URL (https://linkedin.com/in/username)',
            errorMessage: {
              pattern: 'Please enter a valid LinkedIn profile URL starting with https://linkedin.com/in/ (e.g., https://linkedin.com/in/johnsmith)'
            }
          },
          startDate: {
            type: 'string',
            format: 'date',
            title: 'Start Date',
            description: 'Team member\'s start date (YYYY-MM-DD)',
            errorMessage: {
              format: 'Please enter a valid date in YYYY-MM-DD format'
            }
          }
        },
        required: ['name', 'position', 'department', 'email', 'linkedin', 'startDate'],
        errorMessage: {
          required: {
            name: 'Team member\'s name is required',
            position: 'Position is required',
            department: 'Department is required',
            email: 'Email is required',
            linkedin: 'LinkedIn profile is required',
            startDate: 'Start date is required'
          }
        }
      },
      maxItems: 20,
      title: 'Key Team Members',
      description: 'List of key team members',
      errorMessage: {
        maxItems: 'Cannot add more than 20 team members'
      }
    },
    openPositions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            minLength: 5,
            maxLength: 100,
            title: 'Job Title',
            description: 'Job title of the open position',
            errorMessage: {
              minLength: 'Job title must be at least 5 characters long',
              maxLength: 'Job title cannot exceed 100 characters'
            }
          },
          department: {
            type: 'string',
            enum: [
              'Engineering',
              'Product',
              'Design',
              'Marketing',
              'Sales',
              'Finance',
              'Operations',
              'HR',
              'Other'
            ],
            title: 'Department',
            description: 'Department of the open position',
            errorMessage: 'Please select a valid department'
          },
          level: {
            type: 'string',
            enum: [
              'Intern',
              'Entry Level',
              'Mid Level',
              'Senior',
              'Lead',
              'Manager',
              'Director'
            ],
            title: 'Experience Level',
            description: 'Experience level of the open position',
            errorMessage: 'Please select a valid experience level'
          },
          remote: {
            type: 'boolean',
            title: 'Remote Position',
            description: 'Is this a remote position?'
          },
          priority: {
            type: 'integer',
            minimum: 1,
            maximum: 5,
            title: 'Hiring Priority',
            description: '1 = Lowest Priority, 5 = Highest Priority',
            errorMessage: {
              minimum: 'Priority must be at least 1',
              maximum: 'Priority cannot exceed 5',
              type: 'Please enter a valid number'
            }
          }
        },
        required: ['title', 'department', 'level', 'priority'],
        errorMessage: {
          required: {
            title: 'Job title is required',
            department: 'Department is required',
            level: 'Experience level is required',
            priority: 'Hiring priority is required'
          }
        }
      },
      maxItems: 15,
      title: 'Open Positions',
      description: 'List of current job openings',
      errorMessage: {
        maxItems: 'Cannot add more than 15 open positions'
      }
    },
    culture: {
      type: 'object',
      title: 'Company Culture',
      properties: {
        values: {
          type: 'array',
          items: {
            type: 'string',
            minLength: 2,
            maxLength: 50
          },
          minItems: 3,
          maxItems: 7,
          uniqueItems: true,
          title: 'Core Values',
          description: 'Company core values (no duplicates)',
          errorMessage: {
            minItems: 'Please add at least 3 core values',
            maxItems: 'Cannot exceed 7 core values',
            uniqueItems: 'Each core value must be unique'
          }
        },
        benefits: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              'Health Insurance',
              'Dental Insurance',
              'Vision Insurance',
              'Life Insurance',
              'Stock Options',
              'Remote Work',
              'Flexible Hours',
              'Unlimited PTO',
              'Professional Development',
              'Gym Membership',
              'Other'
            ]
          },
          minItems: 1,
          maxItems: 11,
          uniqueItems: true,
          title: 'Employee Benefits',
          description: 'Company benefits (no duplicates)',
          errorMessage: {
            minItems: 'Please select at least one benefit',
            maxItems: 'Cannot select more than 11 benefits',
            uniqueItems: 'Each benefit must be unique'
          }
        },
        workSchedule: {
          type: 'string',
          enum: [
            'Fully Remote',
            'Hybrid',
            'In-Office',
            'Flexible'
          ],
          title: 'Work Schedule',
          description: 'Company work schedule',
          errorMessage: 'Please select a valid work schedule'
        },
        linkedin: {
          type: 'string',
          pattern: companyLinkedinPattern,
          title: 'Company LinkedIn Page',
          description: 'Company LinkedIn page URL (https://linkedin.com/company/companyname)',
          errorMessage: {
            pattern: 'Please enter a valid LinkedIn company page URL starting with https://linkedin.com/company/ (e.g., https://linkedin.com/company/microsoft)'
          }
        }
      },
      required: ['values', 'benefits', 'workSchedule', 'linkedin'],
      errorMessage: {
        required: {
          values: 'Core values are required',
          benefits: 'Employee benefits are required',
          workSchedule: 'Work schedule is required',
          linkedin: 'Company LinkedIn page is required'
        }
      }
    }
  },
  required: ['teamSize', 'founders', 'culture'],
  errorMessage: {
    required: {
      teamSize: 'Team size is required',
      founders: 'Founder information is required',
      culture: 'Company culture is required'
    }
  }
};
