import { tv, type VariantProps } from "tailwind-variants";
import { colors } from "../../../styles/colors";

export const buttonVariants = tv({
    slots: {
        container: "w-full h-[48px] rounded-lg border flex-row items-center px-4",
        text: "text-base font-semibold",
        icon: "",
    },
    variants: {
        variant: {
            fill: {
                container: "bg-purple-base border-purple-base",
                text: "text-white",
                icon: colors.white,
            },

            outline: {
                container: "bg-white border-purple-base",
                text: "text-purple-base",
                icon: colors["purple-base"],
            },
            
        },
    },
    defaultVariants: {
        variant: "fill"
    }
})