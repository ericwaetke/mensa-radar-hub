import type { CollectionConfig } from 'payload/types'

import { tenant } from '../../fields/tenant'
import { tenantAdmins } from './access/tenantAdmins'
import { tenants } from './access/tenants'
import formatSlug from './hooks/formatSlug'
import { loggedIn } from './access/loggedIn'

export const MensaInfo: CollectionConfig = {
	slug: 'mensa-info',
	admin: {
		// defaultColumns: ['day', 'from', 'to', 'updatedAt'],
		group: {
			de: 'Mensa Informationen',
			en: 'Canteen Information',
		},
		useAsTitle: 'name',
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
				beforeValidate: [formatSlug('name')],
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
					fields: [
						{
							name: 'latitude',
							type: 'number',
							label: {
								de: 'Breitengrad',
								en: 'Latitude',
							},
							required: true,
						},
						{
							name: 'longitude',
							type: 'number',
							label: {
								de: 'Längengrad',
								en: 'Longitude',
							},
							required: true,
						},
					],
				},
				{
					type: 'row',
					fields: [
						{
							name: 'street',
							type: 'text',
							label: {
								de: 'Straße',
								en: 'Street',
							},
						},
						{
							name: 'houseNumber',
							type: 'text',
							admin: {
								width: '25%',
							},
							label: {
								de: 'Hausnummer',
								en: 'House Number',
							},
						},
					]
				},
				{
					type: 'row',
					fields: [
						{
							name: 'zipCode',
							type: 'text',
							admin: {
								width: '25%',
							},
							label: {
								de: 'Postleitzahl',
								en: 'Zip Code',
							},
						},
						{
							name: 'city',
							type: 'text',
							label: {
								de: 'Stadt',
								en: 'City',
							},
						}
					]
				}
			],
		},
		{
			type: 'collapsible',
			label: {
				de: 'Öffnungszeiten',
				en: 'Opening Times',
			},
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					type: 'relationship',
					name: 'monday',
					relationTo: 'opening-times',
					hasMany: true,
					label: {
						de: 'Montag',
						en: 'Monday',
					},
				},
				{
					type: 'relationship',
					name: 'tuesday',
					relationTo: 'opening-times',
					hasMany: true,
					label: {
						de: 'Dienstag',
						en: 'Tuesday',
					},
				},
				{
					type: 'relationship',
					name: 'wednesday',
					relationTo: 'opening-times',
					hasMany: true,
					label: {
						de: 'Mittwoch',
						en: 'Wednesday',
					},
				},
				{
					type: 'relationship',
					name: 'thursday',
					relationTo: 'opening-times',
					hasMany: true,
					label: {
						de: 'Donnerstag',
						en: 'Thursday',
					},
				},
				{
					type: 'relationship',
					name: 'friday',
					relationTo: 'opening-times',
					hasMany: true,
					label: {
						de: 'Freitag',
						en: 'Friday',
					},
				},
				{
					type: 'relationship',
					name: 'saturday',
					relationTo: 'opening-times',
					hasMany: true,
					label: {
						de: 'Samstag',
						en: 'Saturday',
					},
				},
				{
					type: 'relationship',
					name: 'sunday',
					relationTo: 'opening-times',
					hasMany: true,
					label: {
						de: 'Sonntag',
						en: 'Sunday',
					},
				}
			]
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