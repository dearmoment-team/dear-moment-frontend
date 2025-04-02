'use client';

import { LoginFormDataType } from "@/admin/_types/login"
import { useForm } from "react-hook-form"

export const useLogin = () => {
    const methods = useForm<LoginFormDataType>({
        defaultValues: {
            loginId: '',
            password: ''
        }
    })

    const {reset} = methods

    const onSubmit = async (data: LoginFormDataType) => {
        try {
            console.log(data)
            reset()
        } catch (error) {
            console.error(error)
        }
    }

    return {
        ...methods,
        onSubmit
    }
}