'use client'

import ProductResolver from '@/services/resolvers/product-resolver'
import { IProduct, IProductCreateDTO } from '@/types/meals/IProduct'
import { CentredAutoSizeBox, DynamicArea } from '@/ui/layout'
import { Submit, Form } from '@/ui/form'
import { TextField } from '@/ui/form/input'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'

const ProductCreate = () => {
    const methods = useForm<IProductCreateDTO>({ resolver: ProductResolver })
    const url = '/api/meals/products'
    const { fetcher } = useSWRConfig()
    const router = useRouter()

    const onSubmit = async (data: IProductCreateDTO) => {
        if (!fetcher) {
            return
        }
        const created = (await fetcher(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })) as IProduct

        if (created) router.push(`${created.slug}`)
    }

    return (
        <DynamicArea>
            <CentredAutoSizeBox>
                <FormProvider {...methods}>
                    <Form onSubmit={methods.handleSubmit(onSubmit)}>
                        <TextField
                            placeholder="name"
                            label="Name"
                            valueKey="name"
                        />
                        <TextField
                            placeholder="unit"
                            label="Unit"
                            valueKey="unit"
                        />
                        <TextField
                            placeholder="pricePerUnit"
                            label="Price per unit"
                            valueKey="pricePerUnit"
                        />
                        <Submit />
                    </Form>
                </FormProvider>
            </CentredAutoSizeBox>
        </DynamicArea>
    )
}

export default ProductCreate
