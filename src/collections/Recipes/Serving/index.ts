import type { CollectionConfig } from 'payload/types'

import { tenant } from '../../../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from '../../../access/tenants'

export const Serving: CollectionConfig = {
  slug: 'serving',
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
      en: 'Serving',
      de: 'Angebot',
    },
    plural: {
      en: 'Servings',
      de: 'Angebote',
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
      type: 'relationship',
      name: 'recipe',
      label: {
        de: 'Rezept',
        en: 'Recipe',
      },
      relationTo: 'recipes',
      required: true,
    },
    {
      type: 'relationship',
      name: 'mensas',
      label: {
        de: 'Mensas',
        en: 'Mensas',
      },
      relationTo: 'mensa-info',
      required: true,
    },
    {
      type: 'date',
      name: 'date',
      label: {
        de: 'Datum',
        en: 'Date',
      },
      required: true,
    },
    {
      type: 'checkbox',
      name: 'sold_out',
      label: {
        de: 'Ausverkauft',
        en: 'Sold Out',
      },
    },
    tenant,
  ],
}
