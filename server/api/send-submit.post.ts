import { z } from 'zod'

const bookingBotToken = '8047984268:AAHG4Vqc4rsUezydALb7_faeNx5l8mmNAoU'
const bookingBotChatID = -1002432017175

const submitSchema = z.object({
  text: z.string().trim().min(1).max(4096)
})

export default defineEventHandler(async (event) => {
  const { text } = await readValidatedBody(event, body => submitSchema.parse(body))

  try {
    const response = await $fetch<{ ok: boolean }>(`https://api.telegram.org/bot${bookingBotToken}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: bookingBotChatID,
        text
      },
      retry: 0,
      timeout: 10000
    })

    if (!response.ok) {
      throw new Error('Telegram rejected the message')
    }
  } catch {
    throw createError({
      statusCode: 502,
      message: 'Не удалось отправить заявку. Попробуйте позже.'
    })
  }

  return { success: true }
})
