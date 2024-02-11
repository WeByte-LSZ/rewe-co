/**
 * Global project information
 */
import getConfig from 'next/config';

export const { publicRuntimeConfig } = getConfig();

export const datavisSpecification = {
  name: publicRuntimeConfig?.name,
  description: publicRuntimeConfig?.description,
  version: publicRuntimeConfig?.version,
  dependencies: publicRuntimeConfig?.dependencies
}
