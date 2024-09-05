'use client'

import TeamResolver from '@/services/resolvers/team-resolver'
import { ITeam, ITeamDTO } from '@/types/teams/ITeam'
import { Form, Submit } from '@/ui/form'
import { TextField } from '@/ui/form/input'
import { DialogBox } from '@/ui/layout'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'

const CreateTeam = () => {
    const methods = useForm<ITeamDTO>({ resolver: TeamResolver })
    const url = '/api/teams'
    const { fetcher } = useSWRConfig()
    const router = useRouter()

    const exit = () => router.push('.')

    const onSubmit = async (data: ITeamDTO) => {
        if (!fetcher) {
            return
        }
        const created = (await fetcher(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })) as ITeam

        if (created) exit()
    }

    return (
        <DialogBox onClose={exit}>
            <FormProvider {...methods}>
                <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    <TextField
                        placeholder="name"
                        label="Name"
                        valueKey="name"
                    />
                    <Submit />
                </Form>
            </FormProvider>
        </DialogBox>
    )
}

export default CreateTeam
