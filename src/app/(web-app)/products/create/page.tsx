'use client'

import ProductResolver from '@/services/resolvers/product-resolver'
import ContentBox from '@/ui/content-box'
import DynamicArea from '@/ui/dynamic-area'
import Form from '@/ui/form'
import TextField from '@/ui/form/input/text-field'
import Submit from '@/ui/form/submit'
import { FormProvider, useForm } from 'react-hook-form'

const ProductCreate = () => {
    const methods = useForm({ resolver: ProductResolver })

    const onSubmit = (data: any) => {
        console.log(data)
        methods.reset()
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
