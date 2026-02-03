"use client";
import { AppShell, Group } from "@mantine/core";
import { LogoLink } from "@/components/LogoLink";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import { SearchToggle } from "@/components/SearchToggle";

export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppShell header={{ height: 60 }} padding="sm">
            <AppShell.Header>
                <Group h="100%" px="sm" justify="space-between">
                    <LogoLink />
                    <Group>
                        <SearchToggle />
                        <ColorSchemeToggle />
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}
