import {H3Error, setCookie} from 'h3';
import {prisma} from "~~/server/service/prisma.service";
import {verifySchema} from "~~/server/schemas/auth.schemas";
import { z } from 'zod';
import {UserResponse} from "#shared/types/auth.types";

export default defineEventHandler(async (event): Promise<UserResponse | H3Error> => {
    try {
        const body = await readBody(event);
        const { email, code } = verifySchema.parse(body);

        // Ищем пользователя
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return  createError({ statusCode: 404, message: 'Пользователь не найден' });
        }

        // Проверяем код
        const verificationCode = await prisma.emailVerificationCode.findFirst({
            where: {
                userId: user.id,
                used: false,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!verificationCode) {
            return  createError({ statusCode: 400, message: 'Код подтверждения не найден. Пожалуйста, запросите новый код.' });
        }

        // Лимит попыток ввода кода (например, 5 попыток)
        const now = new Date();
        const attempts = verificationCode.attempts || 0;
        const lastAttempt = verificationCode.lastAttempt || new Date(0);

        // Проверяем, не превышено ли максимальное количество попыток
        if (attempts >= 5) {
            // Проверяем, истекло ли время ограничения (например, 1 минута)
            if (now.getTime() - lastAttempt.getTime() < 60 * 1000) {
                return createError({ statusCode: 429, message: 'Превышено количество попыток ввода кода. Пожалуйста, подождите минуту и попробуйте снова.' });
            } else {
                // Сбрасываем счетчик попыток после истечения времени ограничения
                await prisma.emailVerificationCode.update({
                    where: { id: verificationCode.id },
                    data: {
                        attempts: 0,
                    },
                });
            }
        }


        // Обновляем количество попыток и время последней попытки
        await prisma.emailVerificationCode.update({
            where: { id: verificationCode.id },
            data: {
                attempts: attempts + 1,
                lastAttempt: now,
            },
        });

        // Проверяем, не истек ли код
        if (verificationCode.expiresAt < now) {
            return  createError({ statusCode: 400, message: 'Срок действия кода истек. Пожалуйста, запросите новый код.' });
        }

        // Проверяем, совпадает ли код
        if (verificationCode.code !== code) {
            return  createError({ statusCode: 400, message: 'Неверный код подтверждения.' });
        }

        // Помечаем код как использованный
        await prisma.emailVerificationCode.update({
            where: { id: verificationCode.id },
            data: { used: true },
        });

        // Обновляем информацию о пользователе
        const userUpdateData = await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
            },
        });
        const token = generateToken(user.id)
        // Устанавливаем cookie с флагом httpOnly
        setCookie(event, 'auth_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 21, // 7 дней
        });

        return {
            id: userUpdateData.id,
            email: userUpdateData.email,
            role: userUpdateData.role,
        };

    } catch (error) {
        // if (error instanceof z.ZodError) {
        //     throw createError({
        //         statusCode: 400,
        //         message: error.map((err) => err.message).join(', '),
        //     });
        // }
        throw error;
    }

});