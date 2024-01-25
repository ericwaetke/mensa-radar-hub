import { viteBundler } from '@payloadcms/bundler-vite'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload/config'

import { OpeningTimes } from './collections/OpeningTimes'
import { Recipe } from './collections/Recipes/Recipe'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'
import { MensaInfo } from './collections/MensaInfo'
import { Additives } from './collections/Recipes/Additives'
import { Allergens } from './collections/Recipes/Allergens'
import { Serving } from './collections/Recipes/Serving'

export default buildConfig({
  collections: [Users, Tenants, OpeningTimes, Recipe, MensaInfo, Additives, Allergens, Serving],
  globals: [],
  admin: {
    bundler: viteBundler(),
    vite: (config) => ({
      ...config,
      server: {
        ...config.server,
        proxy: {
          ...config.server.proxy,
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            ws: true,
          },
        },
      },
    })
  },
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
