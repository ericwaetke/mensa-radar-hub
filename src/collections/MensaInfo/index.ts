import type { CollectionConfig } from 'payload/types'

import { tenant } from '../../fields/tenant'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'
import formatSlug from './hooks/formatSlug'

export const MensaInfo: CollectionConfig = {
  slug: 'mensa-info',
  admin: {
    // defaultColumns: ['day', 'from', 'to', 'updatedAt'],
    group: {
      de: 'Mensa Informationen',
      en: 'Canteen Information',
    },
  },
  labels: {
    singular: {
      en: 'Canteen',
      de: 'Mensa',
    },
    plural: {
      en: 'Canteens',
      de: 'Mensen',
    },
  },
  access: {
    read: tenants,
    // create: loggedIn,
    update: tenantAdmins,
    // delete: tenantAdmins,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        de: 'Mensa Name',
        en: 'Mensa Name',
      },
      required: true,
    },
    // Slug
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'address',
      type: 'group',
      label: {
        de: 'Adresse',
        en: 'Address',
      },
      fields: [
        {
          type: 'row',
          label: {
            de: 'Mensa Standort',
            en: 'Mensa Location',
          },
          fields: [
            {
              name: 'latitude',
              type: 'text',
              label: {
                de: 'Breitengrad',
                en: 'Latitude',
              },
              required: true,
            },
            {
              name: 'longitude',
              type: 'text',
              label: {
                de: 'Längengrad',
                en: 'Longitude',
              },
              required: true,
            },
          ],
        },
      ],
    },
    // Mensa Description
    {
      name: 'description',
      type: 'richText',
      label: {
        de: 'Beschreibung',
        en: 'Description',
      },
      required: true,
    },
    tenant,
  ],
}
