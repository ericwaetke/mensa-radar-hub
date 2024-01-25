import type { Access } from 'payload/types'

import { isSuperAdmin } from '../utilities/isSuperAdmin'

export const tenants: Access = ({ req: { user }, doc }) =>
  // individual documents
  (doc?.tenant?.id && user?.tenants[0]?.tenant?.id === doc.tenant.id) ||
  (!user?.tenants[0]?.tenant?.id && isSuperAdmin(user)) || {
    // list of documents
    tenant: {
      equals: user?.tenants[0]?.tenant?.id,
    },
  }

