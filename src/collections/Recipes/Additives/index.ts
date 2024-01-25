import { CollectionConfig } from "payload/types";

export const Additives: CollectionConfig = {
	slug: "additives",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["updatedAt"],
		group: {
			de: 'Rezepte',
			en: 'Recipes',
		},
	},
	labels: {
		singular: {
			de: "Zusatzstoff",
			en: "Additive",
		},
		plural: {
			de: "Zusatzstoffe",
			en: "Additives",
		},
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Name",
			required: true,
		},
		{
			name: "description",
			type: "textarea",
			label: "Description",
			required: false,
		},
	],
}
