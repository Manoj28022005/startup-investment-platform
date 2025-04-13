import { ControlElement, JsonFormsUISchemaRegistryEntry, Layout, UISchemaElement } from '@jsonforms/core';

interface FormControl extends ControlElement {
  options?: {
    showUnfocusedDescription?: boolean;
    detail?: string;
    format?: string;
    multi?: boolean;
    addButtonLabel?: string;
    removeButtonLabel?: string;
    elementLabelProp?: string;
  };
}

interface FormLayout extends Layout {
  type: 'HorizontalLayout' | 'VerticalLayout';
  elements: (FormControl | FormLayout)[];
}

interface Category extends Layout {
  type: 'Category';
  label: string;
  elements: (FormControl | FormLayout)[];
}

interface Categorization extends Layout {
  type: 'Categorization';
  elements: Category[];
  options?: {
    variant?: 'stepper';
    showNavButtons?: boolean;
    showUnfocusedDescription?: boolean;
    hideRequiredAsterisk?: boolean;
    margin?: 'dense';
  };
}

export const pitchInformationUISchema: Categorization = {
  type: 'Categorization',
  elements: [
    {
      type: 'Category',
      label: 'Basic Information',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/startupName',
          options: {
            showUnfocusedDescription: true,
            detail: 'Enter your startup name as it appears in official documents'
          }
        },
        {
          type: 'Control',
          scope: '#/properties/industry',
          options: {
            format: 'radio',
            detail: 'Select the primary industry your startup operates in'
          }
        },
        {
          type: 'Control',
          scope: '#/properties/oneLiner',
          options: {
            multi: true,
            detail: 'A compelling one-line description of your startup'
          }
        }
      ]
    },
    {
      type: 'Category',
      label: 'Problem & Solution',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/problem',
          options: {
            multi: true,
            detail: 'Describe the problem you are solving in detail'
          }
        },
        {
          type: 'Control',
          scope: '#/properties/solution',
          options: {
            multi: true,
            detail: 'Explain how your solution addresses this problem'
          }
        }
      ]
    },
    {
      type: 'Category',
      label: 'Market Analysis',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/targetMarket/properties/marketSize',
              options: {
                detail: 'Total addressable market size in millions USD'
              }
            },
            {
              type: 'Control',
              scope: '#/properties/targetMarket/properties/sam',
              options: {
                detail: 'Serviceable addressable market size in millions USD'
              }
            },
            {
              type: 'Control',
              scope: '#/properties/targetMarket/properties/som',
              options: {
                detail: 'Serviceable obtainable market size in millions USD'
              }
            }
          ]
        },
        {
          type: 'Control',
          scope: '#/properties/targetMarket/properties/customerSegments',
          options: {
            detail: 'List your key customer segments',
            addButtonLabel: 'Add Customer Segment',
            removeButtonLabel: 'Remove',
            elementLabelProp: 'segment'
          }
        }
      ]
    },
    {
      type: 'Category',
      label: 'Business Model',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/businessModel/properties/revenueStreams',
          options: {
            detail: 'How do you make money?',
            addButtonLabel: 'Add Revenue Stream',
            removeButtonLabel: 'Remove',
            elementLabelProp: 'source'
          }
        },
        {
          type: 'Control',
          scope: '#/properties/businessModel/properties/costStructure',
          options: {
            detail: 'What are your main costs?',
            addButtonLabel: 'Add Cost Item',
            removeButtonLabel: 'Remove',
            elementLabelProp: 'item'
          }
        }
      ]
    },
    {
      type: 'Category',
      label: 'Competitive Edge',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/competitiveAdvantage',
          options: {
            detail: 'What makes your solution unique?',
            addButtonLabel: 'Add Competitive Advantage',
            removeButtonLabel: 'Remove'
          }
        }
      ]
    },
    {
      type: 'Category',
      label: 'Key Metrics',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/metrics/properties/currentUsers',
              options: {
                detail: 'Current number of active users'
              }
            },
            {
              type: 'Control',
              scope: '#/properties/metrics/properties/monthlyGrowthRate',
              options: {
                detail: 'Monthly user growth rate in percentage'
              }
            },
            {
              type: 'Control',
              scope: '#/properties/metrics/properties/monthlyRevenue',
              options: {
                detail: 'Monthly revenue in USD'
              }
            }
          ]
        }
      ]
    },
    {
      type: 'Category',
      label: 'Online Presence',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/linkedProfiles/properties/website',
              options: {
                detail: 'Your company website URL'
              }
            },
            {
              type: 'Control',
              scope: '#/properties/linkedProfiles/properties/linkedin',
              options: {
                detail: 'Your company LinkedIn profile'
              }
            },
            {
              type: 'Control',
              scope: '#/properties/linkedProfiles/properties/crunchbase',
              options: {
                detail: 'Your company Crunchbase profile'
              }
            }
          ]
        }
      ]
    }
  ],
  options: {
    variant: 'stepper',
    showNavButtons: true,
    showUnfocusedDescription: true,
    hideRequiredAsterisk: false,
    margin: 'dense'
  }
};
