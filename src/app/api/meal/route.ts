import { prisma } from '@/services/prisma'
import {
    BadRequest,
    Created,
    Forbidden,
    NotFound,
    Ok,
    Unauthorized,
} from '../predefined-responses'
import { IMealCreateDTO } from '@/types/meals/IMeal'
import { MapIngredientsArray } from './map-ingredients-array'
import { NextResponse } from 'next/server'
import { GetMealSlug } from './get-meal-slug'
import { useServerAuth } from '@/hooks/auth/useServerAuth'

export const GET = async () => {
    const meals = await prisma.meal.findMany({})

    if (!meals) return NotFound('Meals table')

    return Ok(meals)
}

export const POST = async (request: Request) => {
    const { isLoggedIn, hasAdminPermission } = await useServerAuth()
    if (isLoggedIn()) return Unauthorized()
    if (hasAdminPermission()) return Forbidden()

    if (request.headers.get('content-type') !== 'application/json')
        return BadRequest('Body of application/json type')

    const body: IMealCreateDTO = await request.json()
    const ingredients = await MapIngredientsArray(body.ingredients).catch(
        ({ message }) => NotFound(message)
    )

    if (ingredients instanceof NextResponse) return ingredients

    const createdMeal = await prisma.meal.create({
        include: {
            ingredients: {
                include: {
                    product: true,
                },
            },
        },
        data: {
            ...body,
            slug: GetMealSlug({ ...body }),
            ingredients: {
                create: ingredients,
            },
        },
    })

    return Created(createdMeal)
}
