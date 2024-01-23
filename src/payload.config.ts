import { webpackBundler } from '@payloadcms/bundler-webpack'
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
import { MensaInfo } from './globals/MensaInfo'

export default buildConfig({
  collections: [Users, Tenants, OpeningTimes, Recipe],
  globals: [MensaInfo],
  admin: {
    bundler: webpackBundler(),
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, './dotenv.js'),
        },
      },
    }),
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
