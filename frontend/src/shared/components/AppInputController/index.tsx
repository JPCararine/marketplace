import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import AppInput, { AppInputProps } from "../AppInput";

interface AppInputControllerProps<T extends FieldValues> extends Omit<AppInputProps, "value" | "onChangeText" | "error"> {
    control: Control<T>;
    name: Path<T>;
    errors?: FieldErrors<T>;

}

export default function AppInputController<T extends FieldValues>({ control, name, errors, ...rest }: AppInputControllerProps<T>) {
    return (
        <Controller 
        control={control}
        name={name}
        render={({ field, fieldState, formState }) => 
        <AppInput 
        {...rest}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        error={fieldState.error?.message}
        isDisabled={formState.isSubmitting || rest.isDisabled}
        />}
        />
    )
}