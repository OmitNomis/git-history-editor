import { useToast } from "@chakra-ui/react";

export const CustomToast = {
    error: (title: string, description: string) => {
        const toast = useToast();
        toast({
            title,
            description,
            status: "error",
            duration: 3000,
            variant: 'top-accent',
            isClosable: true,
            position: "top"
        });
    },
    success: (title: string, description: string) => {
        const toast = useToast();
        toast({
            title,
            description,
            status: "success",
            duration: 3000,
            variant: 'top-accent',
            isClosable: true,
            position: "top"
        });
    }
}