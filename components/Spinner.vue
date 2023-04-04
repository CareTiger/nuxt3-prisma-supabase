<template>
    <div>
        <div class="relative z-10" role="dialog">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="grid h-screen place-items-center">

                    <div class="bg-transparent transition-all sm:w-full sm:max-w-sm">

                        <!-- Spinner -->
                        <div class="h-48 w-48 mx-auto">
                            <svg class="w-full h-full text-green-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                                <circle class="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>