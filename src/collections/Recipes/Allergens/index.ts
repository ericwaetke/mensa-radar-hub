import { CollectionConfig } from "payload/types";

export const Allergens: CollectionConfig = {
	slug: "allergens",
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
			de: "Allergen",
			en: "Allergen",
		},
		plural: {
			de: "Allergene",
			en: "Allergens",
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
