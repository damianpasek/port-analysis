const { env } = process

export default {
  env: env.NODE_ENV,
  port: env.PORT || 4000,
}
