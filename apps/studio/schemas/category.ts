import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name_en',
      title: 'Name (English)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name_pt',
      title: 'Nome (Português)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (emoji)',
      type: 'string',
      description: 'Paste an emoji, e.g. 🏖️',
    }),
    defineField({
      name: 'color',
      title: 'Color (hex)',
      type: 'string',
      description: 'e.g. #0EA5E9',
    }),
  ],
  preview: {
    select: { title: 'name_en', subtitle: 'name_pt', icon: 'icon' },
    prepare({ title, subtitle, icon }) {
      return { title: `${icon ?? ''} ${title}`, subtitle }
    },
  },
})
