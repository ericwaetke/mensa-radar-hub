import type { CollectionConfig } from 'payload/types'

import { tenant } from '../../../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from '../../../access/tenants'

export const Recipe: CollectionConfig = {
  slug: 'recipes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['updatedAt'],
    group: {
      de: 'Rezepte',
      en: 'Recipes',
    },
  },
  labels: {
    singular: {
      en: 'Recipe',
      de: 'Rezept',
    },
    plural: {
      en: 'Recipes',
      de: 'Rezepte',
    },
  },
  access: {
    read: tenants,
    create: loggedIn,
    update: tenantAdmins,
    delete: tenantAdmins,
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      required: true,
      label: {
        de: 'Essenstitel',
        en: 'Meal Title',
      },
    },
    {
      type: 'select',
      name: 'diet',
      label: {
        de: 'Diät',
        en: 'Diet',
      },
      required: true,
      options: [
        {
          label: {
            de: 'Vegetarisch',
            en: 'Vegetarian',
          },
          value: 'vegetarian',
        },
        {
          label: {
            de: 'Vegan',
            en: 'Vegan',
          },
          value: 'vegan',
        },
        {
          label: {
            de: 'Fleisch',
            en: 'Meat',
          },
          value: 'meat',
        },
        {
          label: {
            de: 'Fisch',
            en: 'Fish',
          },
          value: 'fish',
        },
      ],
    },
    {
      type: 'group',
      name: 'price',
      label: {
        de: 'Preis',
        en: 'Price',
      },
      admin: {
        width: '100%',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'number',
              name: 'students',
              label: {
                de: 'Studierende',
                en: 'Student',
              },
              admin: {
                step: 0.01,
                width: '33%',
              },
            },
            {
              type: 'number',
              name: 'employee',
              label: {
                de: 'Mirarbeitende',
                en: 'Employee',
              },
              admin: {
                step: 0.01,
                width: '33%',
              },
            },
            {
              type: 'number',
              name: 'other',
              label: {
                de: 'Sonstige',
                en: 'Other',
              },
              admin: {
                step: 0.01,
                width: '33%',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'nutrients',
      label: {
        de: 'Nährwerte',
        en: 'Nutrients',
      },
      admin: {
        width: '100%',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'number',
              name: 'calories',
              label: {
                de: 'Kalorien',
                en: 'Calories',
              },
              admin: {
                width: '50%',
              },
            },
            {
              type: 'number',
              name: 'protein',
              label: {
                de: 'Protein',
                en: 'Protein',
              },
              admin: {
                width: '50%',
              },
            },
            {
              type: 'number',
              name: 'carbs',
              label: {
                de: 'Kohlenhydrate',
                en: 'Carbs',
              },
              admin: {
                width: '50%',
              },
            },
            {
              type: 'number',
              name: 'fat',
              label: {
                de: 'Fett',
                en: 'Fat',
              },
              admin: {
                width: '50%',
              },
            },
            {
              type: 'number',
              name: 'fat_saturated',
              label: {
                de: 'Gesättigte Fettsäuren',
                en: 'Saturated Fat',
              },
              admin: {
                width: '50%',
              },
            },
            {
              type: 'number',
              name: 'sugar',
              label: {
                de: 'Zucker',
                en: 'Sugar',
              },
              admin: {
                width: '50%',
              },
            },
            {
              type: 'number',
              name: 'salt',
              label: {
                de: 'Salz',
                en: 'Salt',
              },
              admin: {
                width: '50%',
                style: {
                  marginBottom: 0,
                  maxWidth: '50%',
                },
              },
            },
          ],
        },
      ],
    },
    {
      type: 'relationship',
      name: 'additives',
      relationTo: 'additives',
      label: {
        de: 'Zusatzstoffe',
        en: 'Additives',
      },
      hasMany: true,
    },
    {
      type: 'relationship',
      name: 'allergens',
      relationTo: 'allergens',
      label: {
        de: 'Allergene',
        en: 'Allergens',
      },
      hasMany: true,
    },
    tenant,
  ],
}
