import type { CollectionConfig } from 'payload/types'

import { tenant } from '../../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const OpeningTimes: CollectionConfig = {
  slug: 'opening-times',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['day', 'from', 'to', 'updatedAt'],
    group: {
      de: 'Mensa Informationen',
      en: 'Canteen Information',
    },
  },
  labels: {
    singular: {
      en: 'Opening Time',
      de: 'Öffnungszeit',
    },
    plural: {
      en: 'Opening Times',
      de: 'Öffnungszeiten',
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
      name: "title",
      type: "text",
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData["title"];
          },
        ],
        afterRead: [
          ({ data, context }) => {
            const { from, to } = data
            const fromDate = new Date(from)
            const toDate = new Date(to)
            const fromHours = fromDate.getHours()
            const fromMinutes = fromDate.getMinutes()
            const toHours = toDate.getHours()
            const toMinutes = toDate.getMinutes()
            return `${fromHours}:${String(fromMinutes).padStart(2, '0')} - ${toHours}:${String(toMinutes).padStart(2, '0')}`

          },
        ],
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'from',
          label: {
            de: 'Von',
            en: 'From',
          },
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
              displayFormat: 'H:mm',
              timeIntervals: 15,
              timeFormat: 'H:mm',
            },
          },
        },
        {
          name: 'to',
          label: {
            de: 'Bis',
            en: 'To',
          },
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'timeOnly',
              displayFormat: 'H:mm',
              timeIntervals: 15,
              timeFormat: 'H:mm',
            },
          },
        },
      ],
    },
    tenant,
  ],
}
