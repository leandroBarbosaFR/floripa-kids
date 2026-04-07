import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './schemas'

export default defineConfig({
  name: 'floripa-with-kids',
  title: 'Floripa with Kids',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('⭐ Top Picks')
              .child(
                S.documentList()
                  .title('Featured Activities')
                  .filter('_type == "activity" && featured == true'),
              ),
            S.listItem()
              .title('🏖️ All Activities')
              .child(S.documentTypeList('activity').title('Activities')),
            S.divider(),
            S.listItem()
              .title('🎉 Events')
              .child(S.documentTypeList('event').title('Events')),
            S.divider(),
            S.listItem()
              .title('🏷️ Categories')
              .child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemas },
})
