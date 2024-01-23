import type { CollectionConfig } from 'payload/types'

import { tenant } from '../../fields/tenant'
import { loggedIn } from './access/loggedIn'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'

export const OpeningTimes: CollectionConfig = {
  slug: 'opening-times',
  admin: {
    useAsTitle: 'day',
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
      name: 'day',
      type: 'select',
      required: true,
      hasMany: false,
      label: {
        de: 'Tag',
        en: 'Day',
      },
      options: [
        {
          label: {
            de: 'Montag',
            en: 'Monday',
          },
          value: 'monday',
        },
        {
          label: {
            de: 'Dienstag',
            en: 'Tuesday',
          },
          value: 'tuesday',
        },
        {
          label: {
            de: 'Mittwoch',
            en: 'Wednesday',
          },
          value: 'wednesday',
        },
        {
          label: {
            de: 'Donnerstag',
            en: 'Thursday',
          },
          value: 'thursday',
        },
        {
          label: {
            de: 'Freitag',
            en: 'Friday',
          },
          value: 'friday',
        },
        {
          label: {
            de: 'Samstag',
            en: 'Saturday',
          },
          value: 'saturday',
        },
        {
          label: {
            de: 'Sonntag',
            en: 'Sunday',
          },
          value: 'sunday',
        },
      ],
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
              displayFormat: 'H:mm:ss',
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
