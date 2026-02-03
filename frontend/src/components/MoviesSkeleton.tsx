import { Card, Skeleton, Group, Stack, SimpleGrid } from "@mantine/core";

export function MovieCardSkeleton() {
    return (
        <Card shadow="md" radius="md" h="100%">
            <Card.Section>
                <Skeleton height={350} />
            </Card.Section>
            <Stack p="sm" gap="xs" h="100%">
                <Skeleton height={20} width="70%" radius="xl" />
                <Group gap="xs">
                    <Skeleton height={18} width={50} radius="xl" />
                    <Skeleton height={18} width={60} radius="xl" />
                </Group>
                <Group justify="space-between" mt="auto">
                    <Skeleton height={15} width={40} radius="xl" />
                    <Skeleton height={15} width={60} radius="xl" />
                </Group>
            </Stack>
        </Card>
    );
}

export function MoviesGridSkeleton() {
    return (
        <SimpleGrid
            cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
            spacing="xl"
            mt="lg"
            w="100%"
        >
            {Array.from({ length: 12 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
            ))}
        </SimpleGrid>
    );
}
