<template>
    <div
        class="text-slate-800 bg-slate-100 dark:bg-slate-800 dark:text-white font-Poppins"
    >
        <div class="max-w-7xl min-h-screen mx-auto flex flex-col">
            <SiteNavbar />
            <div class="grow">
                <slot />
            </div>
            <SiteFooter />
        </div>
    </div>
</template>
<style>
html {
    font-family: Poppins, sans-serif;
}
</style>
