import type { AfterLoginHook } from 'payload/dist/collections/config/types'

export const recordLastLoggedInTenant: AfterLoginHook = async ({ req, user }) => {
  if (user.roles.includes('super-admin')) return user
  try {
    const relatedOrg = await req.payload.find({
      collection: 'tenants',
      depth: 0,
      limit: 100,
    })
    console.log('relatedOrg', relatedOrg)

    const tenant = relatedOrg.docs.find(({ id }) => id === user.tenants[0].tenant)

    if (tenant) {
      console.log('tenant', tenant.id)
      await req.payload.update({
        id: user.id,
        collection: 'users',
        data: {
          lastLoggedInTenant: tenant.id,
        },
      }).catch((err) => {
        console.log('err', err)
      }).then((res) => {
        console.log('res', res)
      })
    }
  } catch (err: unknown) {
    req.payload.logger.error(`Error recording last logged in tenant for user ${user.id}: ${err}`)
  }

  return user
}
