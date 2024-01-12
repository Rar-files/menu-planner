import { NextResponse } from 'next/server'

export const BadRequest = (paramName: string) =>
    NextResponse.json({ message: `${paramName} is required` }, { status: 400 })

export const NotFound = (messagePrefix: string) =>
    NextResponse.json(
        { message: `${messagePrefix} not found` },
        { status: 404 }
    )

export const Ok = (data: any | null = null) => {
    if (data === null) return NextResponse.json({ status: 200 })

    return NextResponse.json(data, { status: 200 })
}

export const Created = (data: any) => NextResponse.json(data, { status: 201 })

export const Unauthorized = () =>
    NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

export const Forbidden = () =>
    NextResponse.json({ message: 'Forbidden' }, { status: 403 })
