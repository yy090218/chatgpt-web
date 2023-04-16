/**
 * 是否需要权限
 */
export const isPermissionRequired = () => {
  return !!process.env.MONGOOSE_DB_ADDRESS
}
