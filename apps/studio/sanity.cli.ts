import 'dotenv/config'
import {defineCliConfig} from 'sanity/cli'

const projectId = (process.env.SANITY_STUDIO_PROJECT_ID || '').trim()
const dataset = (process.env.SANITY_STUDIO_DATASET || '').trim()

console.log('SANITY_STUDIO_PROJECT_ID =', JSON.stringify(projectId))
console.log('SANITY_STUDIO_DATASET =', JSON.stringify(dataset))

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})