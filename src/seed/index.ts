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
  const [cafenerds, stwpotsdam] = await Promise.all([
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
            tenant: cafenerds.id,
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
            tenant: cafenerds.id,
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
            tenant: stwpotsdam.id,
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
            tenant: stwpotsdam.id,
            roles: ['user'],
          },
        ],
      },
    }),
  ])

  // Create Mensen
  await Promise.all([
    await payload.create({
      collection: 'mensa-info',
      data: {
        name: 'Mensa Golm',
        slug: 'mensa-golm',
        address: {
          street: 'Am Neuen Palais',
          houseNumber: '10',
          city: 'Potsdam',
          zipCode: '14469',
          longitude: 52.4005,
          latitude: 13.0188,
        },
        description: [{ "children": [{ "text": "Dies ist die Mensa Golm" }] }],
        id: 1,
        tenant: cafenerds.id,
      },
    }),
    await payload.create({
      collection: 'mensa-info',
      data: {
        name: 'Mensa Griebnitzsee',
        slug: 'mensa-griebnitzsee',
        address: {
          street: 'August-Bebel-Str.',
          houseNumber: '89',
          city: 'Potsdam',
          zipCode: '14482',
          longitude: 52.4005,
          latitude: 13.0188,
        },
        description: [{ "children": [{ "text": "Dies ist die Mensa Griebnitzsee" }] }],
        id: 2,
        tenant: stwpotsdam.id,
      },
    }),
    await payload.create({
      collection: 'mensa-info',
      data: {
        name: 'Mensa Brandenburg an der Havel',
        slug: 'mensa-brandenburg',
        address: {
          street: 'Magdeburger Str.',
          houseNumber: '50',
          city: 'Brandenburg an der Havel',
          zipCode: '14770',
          longitude: 52.4005,
          latitude: 13.0188,
        },
        description: [{ "children": [{ "text": "Dies ist die Mensa Brandenburg" }] }],
        id: 3,
        tenant: stwpotsdam.id,
      },
    }),
  ])
}
