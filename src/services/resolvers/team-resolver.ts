import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const teamSchema = yup.object().shape({
    name: yup.string().required(),
})

const TeamResolver = yupResolver(teamSchema)

export default TeamResolver
