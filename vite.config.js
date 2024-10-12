import { defineConfig } from "vite"
import { viteMockServe } from "vite-plugin-mock"

export default defineConfig(({ command, mode }) => ({
    plugins: [
        viteMockServe({
            mockPath: "./mock",
            localEnabled: command === "serve" && mode === "mock"
        })
    ]
}))