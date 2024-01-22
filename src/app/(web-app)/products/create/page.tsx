'use client'

import ProductResolver from '@/services/resolvers/product-resolver'
import { IProduct, IProductCreateDTO } from '@/types/IProduct'
import ContentBox from '@/ui/content-box'
import DynamicArea from '@/ui/dynamic-area'
import Form from '@/ui/form'
import TextField from '@/ui/form/input/text-field'
import Submit from '@/ui/form/submit'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import useSWR, { useSWRConfig } from 'swr'

const ProductCreate = () => {
    const methods = useForm<IProductCreateDTO>({ resolver: ProductResolver })
    const url = '/api/product'
    const { fetcher } = useSWRConfig()
    const router = useRouter()

    const onSubmit = async (data: IProductCreateDTO) => {
        if (!fetcher) {
            console.log('Error data post')
            return
        }
        const created = (await fetcher(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })) as IProduct

        router.push(`${created.slug}`)
    }

    return (
        <DynamicArea>
            <ContentBox>
                <FormProvider {...methods}>
                    <Form onSubmit={methods.handleSubmit(onSubmit)}>
                        <TextField
                            placeholder="name"
                            label="Name"
                            name="name"
                        />
                        <TextField
                            placeholder="unit"
                            label="Unit"
                            name="unit"
                        />
                        <TextField
                            placeholder="pricePerUnit"
                            label="Price per unit"
                            name="pricePerUnit"
                        />
                        <Submit />
                    </Form>
                </FormProvider>
            </ContentBox>
        </DynamicArea>
    )
}

export default ProductCreate
