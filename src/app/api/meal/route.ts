import { prisma } from '@/services/prisma'
import { BadRequest, Created, NotFound, Ok } from '../predefined-responses'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/auth'
import { IMealCreateDTO } from '@/types/IMeal'
import { CheckIsAdmin } from '../auth/check-auth-status'
import { MapIngredientsArray } from './map-ingredients-array'
import { NextResponse } from 'next/server'
import { GetMealSlug } from './get-meal-slug'

export const GET = async () => {
    const meals = await prisma.meal.findMany({})

    if (!meals) return NotFound('Meals table')

    return Ok(meals)
}

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions)
    const isAdminStatus = await CheckIsAdmin(session)
    if (isAdminStatus !== true) return isAdminStatus

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
