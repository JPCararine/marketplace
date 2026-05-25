import * as yup from "yup";

export const loginScheme = yup.object({
    

    email: yup.string().email("Email inválido").required("Email é obrigatório"),

    password: yup.string().required("Senha é obrigatória"),

});

export type LoginFormData = yup.InferType<typeof loginScheme>;