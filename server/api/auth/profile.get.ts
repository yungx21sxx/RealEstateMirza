export default defineEventHandler(async (event: any) => {
  const user = event.context.user

  if (!user) {
    throw createError({ statusCode: 401, message: 'Пользователь не авторизован' })
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role
  }
})
