// This module is also copied into the .cache directory some modules copied there
// from cache-dir can also use this module.
export default (moduleName, err) => {
  // PnP will return the following code when a require is allowed per the
  // dependency tree rules but the requested file doesn't exist
  if (
    err.code === `QUALIFIED_PATH_RESOLUTION_FAILED` ||
    err.pnpCode === `QUALIFIED_PATH_RESOLUTION_FAILED`
  ) {
    return true
  }

  const regex = new RegExp(
    `Error:\\s(\\S+\\s)?[Cc]annot find module\\s.${moduleName.replace(
      /[-/\\^$*+?.()|[\]{}]/g,
      `\\$&`
    )}`
  )
  const firstLine = err.toString().replace(/\\\\/g, '\\').split(`\n`)[0];
  return regex.test(firstLine)
}
