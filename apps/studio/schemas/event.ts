import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title_pt',
      title: 'Título (Português)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title_en', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'is_published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'image',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description_en',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description_pt',
      title: 'Descrição (Português)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'is_recurring',
      title: 'Recurring / ongoing event',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'date_start',
      title: 'Start date & time',
      type: 'datetime',
      hidden: ({ document }) => !!document?.is_recurring,
    }),
    defineField({
      name: 'date_end',
      title: 'End date & time',
      type: 'datetime',
      hidden: ({ document }) => !!document?.is_recurring,
    }),
    defineField({
      name: 'recurring_description_en',
      title: 'Schedule (English)',
      type: 'string',
      description: 'e.g. Every Saturday 9am–12pm',
      hidden: ({ document }) => !document?.is_recurring,
    }),
    defineField({
      name: 'recurring_description_pt',
      title: 'Horário (Português)',
      type: 'string',
      description: 'ex: Todo sábado 9h–12h',
      hidden: ({ document }) => !document?.is_recurring,
    }),
    defineField({
      name: 'location_name',
      title: 'Place name',
      type: 'string',
    }),
    defineField({
      name: 'price_type',
      title: 'Price type',
      type: 'string',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Paid', value: 'paid' },
          { title: 'Varies', value: 'varies' },
        ],
        layout: 'radio',
      },
      initialValue: 'free',
    }),
    defineField({
      name: 'price_description_en',
      title: 'Price details (English)',
      type: 'string',
      hidden: ({ document }) => document?.price_type === 'free',
    }),
    defineField({
      name: 'age_min',
      title: 'Age min',
      type: 'number',
    }),
    defineField({
      name: 'age_max',
      title: 'Age max',
      type: 'number',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title_en',
      subtitle: 'date_start',
      published: 'is_published',
      media: 'image',
    },
    prepare({ title, subtitle, published, media }) {
      return {
        title: `${published ? '' : '🔒 '}${title}`,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString('en-AU') : 'Recurring',
        media,
      }
    },
  },
})
