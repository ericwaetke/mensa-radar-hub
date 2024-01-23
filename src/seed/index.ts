import type { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  // create super admin
  await payload.create({
    collection: 'users',
    data: {
      email: 'demo@payloadcms.com',
      password: 'demo',
      roles: ['super-admin'],
    },
  })

  // create tenants, use `*.localhost.com` so that accidentally forgotten changes the hosts file are acceptable
  const [abc, bbc] = await Promise.all([
    await payload.create({
      collection: 'tenants',
      data: {
        name: 'Cafe Nerds',
      },
    }),
    await payload.create({
      collection: 'tenants',
      data: {
        name: 'Studentenwerk Potsdam',
      },
    }),
  ])

  // create tenant-scoped admins and users
  await Promise.all([
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@abc.com',
        password: 'test',
        roles: ['user'],
        tenants: [
          {
            tenant: abc.id,
            roles: ['admin'],
          },
        ],
      },
    }),
    await payload.create({
      collection: 'users',
      data: {
        email: 'user@abc.com',
        password: 'test',
        roles: ['user'],
        tenants: [
          {
            tenant: abc.id,
            roles: ['user'],
          },
        ],
      },
    }),
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@bbc.com',
        password: 'test',
        roles: ['user'],
        tenants: [
          {
            tenant: bbc.id,
            roles: ['admin'],
          },
        ],
      },
    }),
    await payload.create({
      collection: 'users',
      data: {
        email: 'user@bbc.com',
        password: 'test',
        roles: ['user'],
        tenants: [
          {
            tenant: bbc.id,
            roles: ['user'],
          },
        ],
      },
    }),
  ])
}
