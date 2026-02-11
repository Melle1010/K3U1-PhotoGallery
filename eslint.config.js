import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended, // Detta aktiverar ESLints standardregler
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
                ...globals.browser,
            },
        },
        rules: {
            "no-unused-vars": "warn", 
            "no-undef": "error",     
        },
    },
];