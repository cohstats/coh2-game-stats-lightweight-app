import { Header, createStyles, Box, Group } from "@mantine/core"
import { appWindow } from "@tauri-apps/api/window"
import { Link, useLocation } from "react-router-dom"
import logo from "./assets/logo/32x32.png"
import { Routes } from "./Router"

export interface WindowTitleBarProps {
    children?: React.ReactNode
}

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: "flex",
        flexFlow: "column",
        height: "100vh",
    },
    header: {
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.fn.darken(theme.colors.blue[9], 0.9)
                : theme.fn.lighten(theme.colors.blue[1], 0.7),
        flex: "0 1 auto",
    },
    children: {
        flex: "1 1 auto",
        overflowY: "auto",
    },
    link: {
        display: "block",
        lineHeight: 1,
        padding: "8px 8px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
        userSelect: "none",
        cursor: "pointer",

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.fn.darken(theme.colors.blue[9], 0.7)
                    : theme.fn.lighten(theme.colors.blue[9], 0.7),
        },
    },
    windowButton: {
        padding: "8px 12px",
    },
    closeButton: {
        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.red[8]
                    : theme.colors.red[7],
        },
    },
}))

export const WindowTitleBar: React.FC<WindowTitleBarProps> = ({ children }) => {
    const { classes, cx } = useStyles()
    const location = useLocation()
    return (
        <div className={classes.wrapper}>
            <Header
                height={35}
                className={classes.header}
                data-tauri-drag-region
            >
                <Group data-tauri-drag-region position="apart" pl="xs">
                    <Group data-tauri-drag-region spacing={4}>
                        <img data-tauri-drag-region src={logo} width={20} />
                        <Link to={Routes.GAME} className={classes.link}>
                            Game
                        </Link>
                        <Link to={Routes.SETTINGS} className={classes.link}>
                            Settings
                        </Link>
                        <Link to={Routes.ABOUT} className={classes.link}>
                            About
                        </Link>
                    </Group>
                    <Group data-tauri-drag-region spacing={0}>
                        <a
                            onClick={() => appWindow.minimize()}
                            className={cx(classes.link, classes.windowButton)}
                        >
                            ─
                        </a>
                        <a
                            onClick={() => appWindow.toggleMaximize()}
                            className={cx(classes.link, classes.windowButton)}
                        >
                            ☐
                        </a>
                        <a
                            onClick={() => appWindow.close()}
                            className={cx(
                                classes.link,
                                classes.windowButton,
                                classes.closeButton
                            )}
                        >
                            X
                        </a>
                    </Group>
                </Group>
            </Header>
            <Box className={classes.children}>
                {location.pathname === Routes.ABOUT ? "true" : "false"}
                {children}
            </Box>
        </div>
    )
}
