import { JsonSchema } from '@jsonforms/core';

const linkedinPattern = '^https:\\/\\/(?:www\\.)?linkedin\\.com\\/(?:company\\/[a-zA-Z0-9-]{3,100}|in\\/[a-zA-Z0-9-]{5,100})\\/?$';
const websitePattern = '^https?:\\/\\/(?:www\\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,}(?:\\/.*)?$';
const emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
const moneyPattern = '^\\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\\.[0-9]{2})?$';

export const pitchInformationSchema: JsonSchema = {
  type: 'object',
  title: 'Pitch Information',
  description: 'Please provide information about your startup',
  properties: {
    startupName: {
      type: 'string',
      minLength: 3,
      maxLength: 100,
      pattern: '^[A-Za-z0-9][A-Za-z0-9 .-]*[A-Za-z0-9]$',
      title: 'Startup Name',
      description: 'Legal name of your startup',
      errorMessage: {
        pattern: 'Name must start and end with alphanumeric characters and can contain spaces, dots, and hyphens',
        minLength: 'Name must be at least 3 characters long',
        maxLength: 'Name cannot exceed 100 characters'
      }
    },
    industry: {
      type: 'string',
      enum: [
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'E-commerce',
        'Manufacturing',
        'Real Estate',
        'Energy',
        'Transportation',
        'Other'
      ],
      title: 'Industry',
      description: 'Primary industry sector',
      errorMessage: {
        enum: 'Please select a valid industry'
      }
    },
    oneLiner: {
      type: 'string',
      minLength: 10,
      maxLength: 150,
      title: 'One-liner',
      description: 'Brief description of your startup (elevator pitch)',
      errorMessage: {
        minLength: 'One-liner must be at least 10 characters long',
        maxLength: 'One-liner cannot exceed 150 characters'
      }
    },
    problem: {
      type: 'string',
      minLength: 50,
      maxLength: 500,
      title: 'Problem',
      description: 'What problem are you solving?',
      errorMessage: {
        minLength: 'Problem description must be at least 50 characters long',
        maxLength: 'Problem description cannot exceed 500 characters'
      }
    },
    solution: {
      type: 'string',
      minLength: 50,
      maxLength: 500,
      title: 'Solution',
      description: 'How are you solving the problem?',
      errorMessage: {
        minLength: 'Solution description must be at least 50 characters long',
        maxLength: 'Solution description cannot exceed 500 characters'
      }
    },
    targetMarket: {
      type: 'object',
      title: 'Target Market',
      properties: {
        marketSize: {
          type: 'string',
          pattern: moneyPattern,
          title: 'Total Addressable Market (TAM)',
          description: 'Total market size in millions USD',
          errorMessage: {
            pattern: 'Please enter a valid amount in USD format (e.g., $1,000,000,000)'
          }
        },
        sam: {
          type: 'string',
          pattern: moneyPattern,
          title: 'Serviceable Addressable Market (SAM)',
          description: 'Serviceable market size in millions USD',
          errorMessage: {
            pattern: 'Please enter a valid amount in USD format (e.g., $1,000,000,000)'
          }
        },
        som: {
          type: 'string',
          pattern: moneyPattern,
          title: 'Serviceable Obtainable Market (SOM)',
          description: 'Target market share in millions USD',
          errorMessage: {
            pattern: 'Please enter a valid amount in USD format (e.g., $1,000,000,000)'
          }
        },
        customerSegments: {
          type: 'array',
          title: 'Customer Segments',
          items: {
            type: 'string',
            minLength: 5,
            maxLength: 100
          },
          minItems: 1,
          maxItems: 5,
          uniqueItems: true,
          errorMessage: {
            minItems: 'Please add at least one customer segment',
            maxItems: 'Cannot add more than 5 customer segments',
            uniqueItems: 'Each customer segment must be unique'
          }
        }
      },
      required: ['marketSize', 'sam', 'som', 'customerSegments'],
      errorMessage: {
        required: {
          marketSize: 'Market size is required',
          sam: 'Serviceable market size is required',
          som: 'Target market share is required',
          customerSegments: 'Customer segments are required'
        }
      }
    },
    businessModel: {
      type: 'object',
      title: 'Business Model',
      properties: {
        revenueStreams: {
          type: 'array',
          title: 'Revenue Streams',
          items: {
            type: 'object',
            properties: {
              source: {
                type: 'string',
                title: 'Revenue Source'
              },
              model: {
                type: 'string',
                enum: [
                  'Subscription',
                  'One-time Purchase',
                  'Usage-based',
                  'Licensing',
                  'Advertising',
                  'Other'
                ]
              }
            },
            required: ['source', 'model']
          },
          minItems: 1,
          maxItems: 5,
          uniqueItems: true,
          errorMessage: {
            minItems: 'Please add at least one revenue stream',
            maxItems: 'Cannot add more than 5 revenue streams',
            uniqueItems: 'Each revenue stream must be unique'
          }
        },
        costStructure: {
          type: 'array',
          title: 'Key Costs',
          items: {
            type: 'string',
            minLength: 10,
            maxLength: 200
          },
          minItems: 1,
          maxItems: 5,
          uniqueItems: true,
          errorMessage: {
            minItems: 'Please add at least one cost item',
            maxItems: 'Cannot add more than 5 cost items',
            uniqueItems: 'Each cost item must be unique'
          }
        }
      },
      required: ['revenueStreams', 'costStructure'],
      errorMessage: {
        required: {
          revenueStreams: 'Revenue streams are required',
          costStructure: 'Key costs are required'
        }
      }
    },
    competitiveAdvantage: {
      type: 'array',
      title: 'Competitive Advantages',
      description: 'What makes your solution unique?',
      items: {
        type: 'object',
        properties: {
          advantage: {
            type: 'string',
            title: 'Advantage',
            minLength: 20,
            maxLength: 200
          },
          description: {
            type: 'string',
            minLength: 20,
            maxLength: 200
          }
        },
        required: ['advantage', 'description']
      },
      minItems: 1,
      maxItems: 5,
      uniqueItems: true,
      errorMessage: {
        minItems: 'Please add at least one competitive advantage',
        maxItems: 'Cannot add more than 5 competitive advantages',
        uniqueItems: 'Each competitive advantage must be unique'
      }
    },
    metrics: {
      type: 'object',
      title: 'Key Metrics',
      properties: {
        currentUsers: {
          type: 'number',
          title: 'Current Users/Customers',
          minimum: 0,
          errorMessage: {
            minimum: 'Number of users cannot be negative',
            type: 'Please enter a valid number'
          }
        },
        monthlyGrowthRate: {
          type: 'number',
          title: 'Monthly Growth Rate (%)',
          minimum: 0,
          maximum: 1000,
          errorMessage: {
            minimum: 'Growth rate cannot be negative',
            maximum: 'Growth rate cannot exceed 1000%',
            type: 'Please enter a valid number'
          }
        },
        monthlyRevenue: {
          type: 'number',
          title: 'Monthly Revenue (USD)',
          minimum: 0,
          errorMessage: {
            minimum: 'Revenue cannot be negative',
            type: 'Please enter a valid number'
          }
        }
      },
      required: ['currentUsers', 'monthlyGrowthRate', 'monthlyRevenue'],
      errorMessage: {
        required: {
          currentUsers: 'Number of users is required',
          monthlyGrowthRate: 'Growth rate is required',
          monthlyRevenue: 'Revenue is required'
        }
      }
    },
    linkedProfiles: {
      type: 'object',
      properties: {
        website: {
          type: 'string',
          pattern: websitePattern,
          title: 'Website',
          description: 'Your startup\'s website URL',
          errorMessage: {
            pattern: 'Please enter a valid website URL starting with http:// or https:// (e.g., https://example.com)'
          }
        },
        linkedin: {
          type: 'string',
          pattern: linkedinPattern,
          title: 'LinkedIn Profile',
          description: 'Company or founder LinkedIn profile URL',
          errorMessage: {
            pattern: 'Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/company/yourcompany or https://linkedin.com/in/yourname)'
          }
        },
        crunchbase: {
          type: 'string',
          title: 'Crunchbase Profile',
          description: 'Your startup\'s Crunchbase profile URL'
        }
      },
      required: ['website'],
      errorMessage: {
        required: {
          website: 'Website URL is required'
        }
      }
    }
  },
  required: [
    'startupName',
    'industry',
    'oneLiner',
    'problem',
    'solution',
    'targetMarket',
    'businessModel',
    'competitiveAdvantage',
    'metrics',
    'linkedProfiles'
  ],
  errorMessage: {
    required: {
      startupName: 'Startup name is required',
      industry: 'Industry is required',
      oneLiner: 'One-liner is required',
      problem: 'Problem description is required',
      solution: 'Solution description is required',
      targetMarket: 'Target market information is required',
      businessModel: 'Business model information is required',
      competitiveAdvantage: 'Competitive advantages are required',
      metrics: 'Key metrics are required',
      linkedProfiles: 'Linked profiles are required'
    }
  }
};
