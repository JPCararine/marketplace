import * as yup from "yup";

export interface ProfileFormData {
    name: string;
    email: string;
    phone: string;
    avatarUri?: string;
    password?: string;
    newPassword?: string;
}

export const profileScheme: yup.ObjectSchema<ProfileFormData> = yup.object({
    name: yup.string().required("Nome é obrigatório").min(4, "Nome deve ter pelo menos 4 caracteres"),

    email: yup.string().email("Email inválido").required("Email é obrigatório"),

    phone: yup.string().required("Telefone é obrigatório").matches(
        /^\d{11}$/,
        "Telefone deve ter 11 dígitos (DDD + número)"
    ),

    password: yup.string().optional(),

    newPassword: yup
        .string()
        .transform((value) => value === "" ? undefined : value)
        .optional()
        .min(6, "Senha deve ter pelo menos 6 caracteres"),

    avatarUri: yup.string().optional(),
});