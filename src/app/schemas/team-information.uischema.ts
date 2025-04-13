import { ControlElement, Layout } from '@jsonforms/core';

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

export const teamInformationUISchema: Categorization = {
  type: 'Categorization',
  elements: [
    {
      type: 'Category',
      label: 'Team Overview',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/teamSize',
          options: {
            detail: 'Total number of team members'
          }
        },
        {
          type: 'Control',
          scope: '#/properties/openPositions',
          options: {
            detail: 'Number of positions you are currently hiring for'
          }
        }
      ]
    },
    {
      type: 'Category',
      label: 'Founders',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/founders',
          options: {
            detail: 'List all co-founders',
            addButtonLabel: 'Add Co-founder',
            removeButtonLabel: 'Remove',
            elementLabelProp: 'name'
          }
        }
      ]
    },
    {
      type: 'Category',
      label: 'Key Team Members',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/keyHires',
          options: {
            detail: 'List key team members and their roles',
            addButtonLabel: 'Add Team Member',
            removeButtonLabel: 'Remove',
            elementLabelProp: 'name'
          }
        }
      ]
    },
    {
      type: 'Category',
      label: 'Open Positions',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/openRoles',
          options: {
            detail: 'List current job openings',
            addButtonLabel: 'Add Position',
            removeButtonLabel: 'Remove',
            elementLabelProp: 'title'
          }
        }
      ]
    },
    {
      type: 'Category',
      label: 'Company Culture',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/culture/properties/values',
          options: {
            detail: 'List your company values',
            addButtonLabel: 'Add Value',
            removeButtonLabel: 'Remove'
          }
        },
        {
          type: 'Control',
          scope: '#/properties/culture/properties/benefits',
          options: {
            detail: 'List employee benefits',
            addButtonLabel: 'Add Benefit',
            removeButtonLabel: 'Remove'
          }
        },
        {
          type: 'Control',
          scope: '#/properties/culture/properties/workStyle',
          options: {
            format: 'radio',
            detail: 'Select your primary work style'
          }
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
