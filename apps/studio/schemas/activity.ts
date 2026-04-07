import { defineField, defineType } from 'sanity'

export const activity = defineType({
  name: 'activity',
  title: 'Activity',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short one-line description shown on cards',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featured',
      title: 'Featured (Top Pick)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Beach', value: 'beach' },
          { title: 'Park', value: 'park' },
          { title: 'Nature', value: 'nature' },
          { title: 'Indoor', value: 'indoor' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Event', value: 'event' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'zone',
      title: 'Zone',
      type: 'string',
      options: {
        list: [
          { title: 'North', value: 'north' },
          { title: 'South', value: 'south' },
          { title: 'Lagoa', value: 'lagoa' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'weather',
      title: 'Best weather',
      type: 'string',
      options: {
        list: [
          { title: 'Sunny days', value: 'sunny' },
          { title: 'Rainy days', value: 'rainy' },
          { title: 'Both', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'sunny',
    }),
    defineField({
      name: 'budget',
      title: 'Budget',
      type: 'string',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Paid', value: 'paid' },
        ],
        layout: 'radio',
      },
      initialValue: 'free',
    }),
    defineField({
      name: 'ageRanges',
      title: 'Age ranges',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '0–2 years', value: '0-2' },
          { title: '3–5 years', value: '3-5' },
          { title: '6–8 years', value: '6-8' },
          { title: '9–12 years', value: '9-12' },
        ],
      },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Campeche, South Floripa',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 2–4 hours',
    }),
    defineField({
      name: 'price',
      title: 'Price description',
      type: 'string',
      description: 'e.g. Free · Pedal boats R$25/hr',
    }),
    defineField({
      name: 'stroller',
      title: 'Stroller friendly',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'parking',
      title: 'Parking available',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'food',
      title: 'Food nearby',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'bestTime',
      title: 'Best time to visit',
      type: 'string',
    }),
    defineField({
      name: 'tips',
      title: 'Parent tips',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'warnings',
      title: 'Watch out for',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'kidScore',
      title: 'Kid Score',
      type: 'object',
      fields: [
        defineField({ name: 'safety', title: 'Safety (1–5)', type: 'number', validation: (r) => r.required().min(1).max(5) }),
        defineField({ name: 'fun',    title: 'Fun (1–5)',    type: 'number', validation: (r) => r.required().min(1).max(5) }),
        defineField({ name: 'access', title: 'Access (1–5)', type: 'number', validation: (r) => r.required().min(1).max(5) }),
        defineField({ name: 'budget', title: 'Budget (1–5, 5=free)', type: 'number', validation: (r) => r.required().min(1).max(5) }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'type', featured: 'featured' },
    prepare({ title, subtitle, featured }) {
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle,
      }
    },
  },
})
