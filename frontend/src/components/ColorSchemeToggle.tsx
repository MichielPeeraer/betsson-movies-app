import {
    ActionIcon,
    useMantineColorScheme,
    useComputedColorScheme,
    Tooltip,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./ColorSchemeToggle.module.css";

export function ColorSchemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const isDark = computedColorScheme === "dark";

    return (
        <Tooltip label={`${isDark ? "Light" : "Dark"} mode`}>
            <ActionIcon
                variant="default"
                size="input-sm"
                onClick={() => setColorScheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
            >
                <IconSun className={cx(classes.light)} stroke={1.5} />
                <IconMoon className={cx(classes.dark)} stroke={1.5} />
            </ActionIcon>
        </Tooltip>
    );
}
