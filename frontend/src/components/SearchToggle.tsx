"use client";
import {
    ActionIcon,
    Modal,
    Stack,
    Tooltip,
    Button,
    Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { SearchFilter } from "@/components/SearchFilter";
import { GenreFilter } from "@/components/GenreFilter";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

export function SearchToggle() {
    const [opened, { open, close }] = useDisclosure(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // Determine if any filters are active (q or g)
    const hasFilters = searchParams.has("q") || searchParams.has("g");

    const handleClearAll = () => {
        startTransition(() => {
            // Pushing the pathname without any params effectively clears everything
            router.push(pathname);
        });
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Search & Filter">
                <Stack>
                    <SearchFilter />
                    <GenreFilter />

                    {hasFilters && (
                        <>
                            <Divider
                                label="Danger Zone"
                                labelPosition="center"
                            />
                            <Button
                                variant="light"
                                color="red"
                                leftSection={<IconTrash size={16} />}
                                onClick={handleClearAll}
                                loading={isPending}
                                fullWidth
                            >
                                Clear all filters
                            </Button>
                        </>
                    )}
                </Stack>
            </Modal>

            <Tooltip label="Search & Filter">
                <ActionIcon
                    variant="default"
                    size="input-sm"
                    onClick={open}
                    aria-label="Search and Filter"
                >
                    <IconSearch stroke={1.5} />
                </ActionIcon>
            </Tooltip>
        </>
    );
}
